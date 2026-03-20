import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { db, users, wishlists } from "@/db/schema";
import { eq } from "drizzle-orm";
import { WishCreate, Wishlists } from "@/types/api";

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
      visibility
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

  const data = await db
    .select({
      id: wishlists.id,
      title: wishlists.title,
      description: wishlists.description,
    })
    .from(wishlists)
    .where(eq(wishlists.userId, user.id));

  return NextResponse.json({ wishlists: data });
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
