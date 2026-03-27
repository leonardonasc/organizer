import { auth } from "@/auth";
import { db, users, wishlists, wishlistItems } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

type CreateWishlistItemBody = {
  name?: string;
  description?: string;
  value?: number;
  url?: string;
  image?: string;
};

type UpdateWishlistItemBody = {
  name?: string;
  description?: string;
  value?: number | null;
  url?: string;
  image?: string;
};

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
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

  const { id: wishlistId } = await params;

  const [wishlist] = await db
    .select({ id: wishlists.id })
    .from(wishlists)
    .where(and(eq(wishlists.id, wishlistId), eq(wishlists.userId, user.id)))
    .limit(1);

  if (!wishlist) {
    return NextResponse.json({ error: "Wishlist not found" }, { status: 404 });
  }

  const body = (await request.json()) as CreateWishlistItemBody;
  const name = body.name?.trim();

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const parsedValue =
    typeof body.value === "number" && Number.isFinite(body.value)
      ? body.value
      : null;

  const [item] = await db
    .insert(wishlistItems)
    .values({
      id: crypto.randomUUID(),
      wishlistId,
      name,
      description: body.description?.trim() || null,
      value: parsedValue,
      url: body.url?.trim() || null,
      image: body.image?.trim() || null,
      createdAt: new Date(),
    })
    .returning();

  return NextResponse.json(item, { status: 201 });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
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

  const { id: wishlistId } = await params;
  const { searchParams } = new URL(request.url);
  const itemId = searchParams.get("id");

  if (!itemId) {
    return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
  }

  const [wishlist] = await db
    .select({ id: wishlists.id })
    .from(wishlists)
    .where(and(eq(wishlists.id, wishlistId), eq(wishlists.userId, user.id)))
    .limit(1);

  if (!wishlist) {
    return NextResponse.json({ error: "Wishlist not found" }, { status: 404 });
  }

  const deletedItem = await db
    .delete(wishlistItems)
    .where(
      and(
        eq(wishlistItems.id, itemId),
        eq(wishlistItems.wishlistId, wishlistId),
      ),
    )
    .returning();

  if (deletedItem.length === 0) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Item deleted successfully" });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
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

  const { id: wishlistId } = await params;
  const { searchParams } = new URL(request.url);
  const itemId = searchParams.get("id");

  if (!itemId) {
    return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
  }

  const [wishlist] = await db
    .select({ id: wishlists.id })
    .from(wishlists)
    .where(and(eq(wishlists.id, wishlistId), eq(wishlists.userId, user.id)))
    .limit(1);

  if (!wishlist) {
    return NextResponse.json({ error: "Wishlist not found" }, { status: 404 });
  }

  const body = (await request.json()) as UpdateWishlistItemBody;
  const name = body.name?.trim();

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const parsedValue =
    typeof body.value === "number" && Number.isFinite(body.value)
      ? body.value
      : null;

  const updatedItem = await db
    .update(wishlistItems)
    .set({
      name,
      description: body.description?.trim() || null,
      value: parsedValue,
      url: body.url?.trim() || null,
      image: body.image?.trim() || null,
    })
    .where(
      and(
        eq(wishlistItems.id, itemId),
        eq(wishlistItems.wishlistId, wishlistId),
      ),
    )
    .returning();

  if (updatedItem.length === 0) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  return NextResponse.json(updatedItem[0], { status: 200 });
}
