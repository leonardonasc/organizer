import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { SignInSchema } from "./lib/validations/auth";
import { compare } from "bcryptjs";

const githubClientId = process.env.AUTH_GITHUB_ID ?? process.env.GITHUB_ID;
const githubClientSecret =
  process.env.AUTH_GITHUB_SECRET ?? process.env.GITHUB_SECRET;

if (!githubClientId || !githubClientSecret) {
  throw new Error(
    "Missing GitHub OAuth credentials. Set AUTH_GITHUB_ID and AUTH_GITHUB_SECRET in your environment.",
  );
}

export const { handlers, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Github({
      clientId: githubClientId,
      clientSecret: githubClientSecret,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = SignInSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .limit(1)
          .get();

        if (!user?.passwordHash) return null;

        const isValid = await compare(password, user.passwordHash);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});
