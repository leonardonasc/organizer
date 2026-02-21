"use client";

import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function LoginPage() {

    const { data: session, status } = useSession();

    if (status === "authenticated") {
        redirect("/dashboard");
    } else if (status === "loading") {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ padding: 40 }}>
            <h1>Sign In</h1>

            <button
                onClick={() =>
                    signIn("github", { callbackUrl: "/" })
                }
            >
                Continue with GitHub
            </button>
        </div>
    );
}