import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { db, wishlists, wishlistItems } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: wishlistId } = await params;

  try {
    const wishlist = await db
      .select({
        id: wishlists.id,
        title: wishlists.title,
        description: wishlists.description,
        visibility: wishlists.visibility,
        createdAt: wishlists.createdAt,
      })
      .from(wishlists)
      .where(eq(wishlists.id, wishlistId))
      .limit(1);

    if (!wishlist.length) {
      return NextResponse.json(
        { error: "Wishlist not found" },
        { status: 404 },
      );
    }

    const items = await db
      .select()
      .from(wishlistItems)
      .where(eq(wishlistItems.wishlistId, wishlistId));

    return NextResponse.json({
      ...wishlist[0],
      items,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error fetching wishlist:", errorMessage);
    console.error("Full error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: errorMessage },
      { status: 500 },
    );
  }
}
