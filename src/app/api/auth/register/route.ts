import { NextResponse } from "next/server";
import { SignUpSchema } from "@/lib/validations/auth";
import { db, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = SignUpSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Dados invalidos" }, { status: 400 });
  }

  const { firstName, lastName, email, password } = parsed.data;

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)
    .get();

  if (existingUser) {
    return NextResponse.json({ error: "Email já cadastrado" }, { status: 400 });
  }
  const passwordHash = await hash(password, 12);

  await db.insert(users).values({
    name: `${firstName} ${lastName}`.trim(),
    email,
    passwordHash,
  });

  return NextResponse.json(
    {
      ok: true,
      preview: { firstName, lastName, email, hasPassword: Boolean(password) },
    },
    { status: 200 },
  );
}
