import { cookies } from "next/headers";
import { db, sessions } from "@/db/schema";
import { SignJWT, jwtVerify } from "jose";

const key = new TextEncoder().encode(process.env.JWT_SECRET!);

type SessionPayload = {
  sessionId: string;
  expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  return await new SignJWT({
    sessionId: payload.sessionId,
    expiresAt: payload.expiresAt.toISOString(),
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function decrypt(token: string) {
  try {
    const { payload } = await jwtVerify<SessionPayload>(token, key, {
      algorithms: ["HS256"],
    });

    if (!payload.sessionId || !payload.expiresAt) return null;

    return {
      sessionId: payload.sessionId,
      expiresAt: new Date(payload.expiresAt),
    };
  } catch {
    return null;
  }
}
export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const sessionToken = crypto.randomUUID(); // unico da sessao

  await db.insert(sessions).values({
    sessionToken,
    userId, // id do usuario
    expires: expiresAt,
  });

  const session = await encrypt({ sessionId: sessionToken, expiresAt });
  // salva session no cookie

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}
