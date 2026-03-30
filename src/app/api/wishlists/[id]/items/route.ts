import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { db, users, wishlists, wishlistItems } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { WishItemCreate } from "@/types/api";
import { request } from "https";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: wishlistId } = await params;
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, session.user.email))
      .limit(1)
      .then((rows) => rows[0]);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify wishlist belongs to user
    const wishlist = await db
      .select({ id: wishlists.id })
      .from(wishlists)
      .where(and(eq(wishlists.id, wishlistId), eq(wishlists.userId, user.id)))
      .limit(1)
      .then((rows) => rows[0]);

    if (!wishlist) {
      return NextResponse.json(
        { error: "Wishlist not found" },
        { status: 404 },
      );
    }

    const items = await db
      .select()
      .from(wishlistItems)
      .where(eq(wishlistItems.wishlistId, wishlistId));

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Error fetching wish items:", error);
    return NextResponse.json(
      { error: "Failed to fetch items", details: String(error) },
      { status: 500 },
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: wishlistId } = await params;
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, session.user.email))
      .limit(1)
      .then((rows) => rows[0]);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify wishlist belongs to user
    const wishlist = await db
      .select({ id: wishlists.id })
      .from(wishlists)
      .where(and(eq(wishlists.id, wishlistId), eq(wishlists.userId, user.id)))
      .limit(1)
      .then((rows) => rows[0]);

    if (!wishlist) {
      return NextResponse.json(
        { error: "Wishlist not found" },
        { status: 404 },
      );
    }

    const body = (await request.json()) as WishItemCreate;

    if (!body.name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const item = await db
      .insert(wishlistItems)
      .values({
        id: crypto.randomUUID(),
        wishlistId,
        name: body.name.trim(),
        description: body.description?.slice(0, 30) ?? null,
        value: body.value ?? 0,
        url: body.url ?? "",
        image: body.image ?? null,
        createdAt: new Date(),
      })
      .returning()
      .then((rows) => rows[0]);

    return NextResponse.json(item);
  } catch (error) {
    console.error("Error creating wish item:", error);
    return NextResponse.json(
      { error: "Failed to create item", details: String(error) },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: wishlistId } = await params;
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, session.user.email))
      .limit(1)
      .then((rows) => rows[0]);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get("id");

    if (!itemId) {
      return NextResponse.json(
        { error: "Item ID is required" },
        { status: 400 },
      );
    }

    // Verify wishlist belongs to user
    const wishlist = await db
      .select({ id: wishlists.id })
      .from(wishlists)
      .where(and(eq(wishlists.id, wishlistId), eq(wishlists.userId, user.id)))
      .limit(1)
      .then((rows) => rows[0]);

    if (!wishlist) {
      return NextResponse.json(
        { error: "Wishlist not found" },
        { status: 404 },
      );
    }

    const body = (await request.json()) as WishItemCreate;

    const updatedItem = await db
      .update(wishlistItems)
      .set({
        name: body.name.trim(),
        description: body.description?.slice(0, 30) ?? null,
        value: body.value ?? 0,
        url: body.url ?? "",
        image: body.image ?? null,
      })
      .where(eq(wishlistItems.id, itemId))
      .returning()
      .then((rows) => rows[0]);

    if (!updatedItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("Error updating wish item:", error);
    return NextResponse.json(
      { error: "Failed to update item", details: String(error) },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, session.user.email))
    .limit(1)
    .then((rows) => rows[0]);


if (!user) {
  return NextResponse.json({ error: "User not found" }, { status: 404 });
}

const { searchParams } = new URL(request.url);
const itemId = searchParams.get("id");

if (!itemId) {
  return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
}

// Verify wishlist item belongs to user's wishlist
const item = await db
  .select({ id: wishlistItems.id })
  .from(wishlistItems)
  .innerJoin(wishlists, eq(wishlists.id, wishlistItems.wishlistId))
  .where(
    and(
      eq(wishlistItems.id, itemId),
      eq(wishlists.userId, user.id),
    ),
  )
  .limit(1)
  .then((rows) => rows[0]);

if (!item) {
  return NextResponse.json({ error: "Item not found" }, { status: 404 });
}

await db.delete(wishlistItems).where(eq(wishlistItems.id, itemId));

return NextResponse.json({ message: "Item deleted successfully" });

}