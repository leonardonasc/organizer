"use client";

import { signIn, useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";


export default function Home() {
  console.log("ENV CHECK:", {
    url: process.env.TURSO_CONNECTION_URL,
    token: !!process.env.TURSO_AUTH_TOKEN,
  })

  const { data: session } = useSession();

  if (!session) {
    redirect("/login");
  }
}
