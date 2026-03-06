import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, session.user.email))
    .limit(1);

  return NextResponse.json({ user });
}
