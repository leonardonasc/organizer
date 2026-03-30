import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { db, users, wishlists, wishlistItems } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { WishCreate } from "@/types/api";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [user] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, session.user.email))
    .limit(1);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const body = (await request.json()) as WishCreate;
  const name = body.title?.trim();
  const visibility = body.visibility === "public" ? "public" : "private";

  if (!name) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const [wishlist] = await db
    .insert(wishlists)
    .values({
      id: crypto.randomUUID(),
      title: name,
      description: body.description ?? null,
      userId: user.id,
      visibility,
    })
    .returning();
  return NextResponse.json(wishlist);
}

export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [user] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, session.user.email))
    .limit(1);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const rows = await db
    .select({
      wishlistId: wishlists.id,
      wishlistTitle: wishlists.title,
      wishlistDescription: wishlists.description,
      wishlistVisibility: wishlists.visibility,
      wishlistCreatedAt: wishlists.createdAt,

      itemId: wishlistItems.id,
      itemName: wishlistItems.name,
      itemDescription: wishlistItems.description,
      itemValue: wishlistItems.value,
      itemUrl: wishlistItems.url,
      itemImage: wishlistItems.image,
      itemWishlistId: wishlistItems.wishlistId,
    })
    .from(wishlists)
    .leftJoin(wishlistItems, eq(wishlistItems.wishlistId, wishlists.id))
    .where(eq(wishlists.userId, user.id));
  const grouped = new Map<string, any>();

  for (const row of rows) {
    if (!grouped.has(row.wishlistId)) {
      grouped.set(row.wishlistId, {
        id: row.wishlistId,
        title: row.wishlistTitle,
        description: row.wishlistDescription ?? undefined,
        visibility: row.wishlistVisibility,
        createdAt: row.wishlistCreatedAt,
        userId: user.id,
        wishItems: [],
      });
    }

    if (row.itemId) {
      grouped.get(row.wishlistId).wishItems.push({
        id: row.itemId,
        name: row.itemName,
        description: row.itemDescription ?? undefined,
        value: row.itemValue ?? 0,
        url: row.itemUrl ?? "",
        image: row.itemImage ?? undefined,
        wishlistId: row.itemWishlistId,
      });
    }
  }

  return NextResponse.json({ wishlists: Array.from(grouped.values()) });
}

export async function DELETE(request: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [user] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, session.user.email))
    .limit(1);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const wishlistId = searchParams.get("id");

  if (!wishlistId) {
    return NextResponse.json(
      { error: "Wishlist ID is required" },
      { status: 400 },
    );
  }

  const deletedWishlist = await db
    .delete(wishlists)
    .where(eq(wishlists.id, wishlistId))
    .returning();

  if (deletedWishlist.length === 0) {
    return NextResponse.json({ error: "Wishlist not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Wishlist deleted successfully" });
}

export async function PUT(request: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [user] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, session.user.email))
    .limit(1);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const wishlistId = searchParams.get("id");
  const body = (await request.json()) as { title?: string };
  const title = body.title?.trim();

  if (!wishlistId) {
    return NextResponse.json(
      { error: "Wishlist ID is required" },
      { status: 400 },
    );
  }

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const [updatedWishlist] = await db
    .update(wishlists)
    .set({ title })
    .where(and(eq(wishlists.id, wishlistId), eq(wishlists.userId, user.id)))
    .returning();

  if (!updatedWishlist) {
    return NextResponse.json({ error: "Wishlist not found" }, { status: 404 });
  }

  return NextResponse.json(updatedWishlist);
}
