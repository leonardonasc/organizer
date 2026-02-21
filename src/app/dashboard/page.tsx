"use client";

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function DashboardPage() {

    const { data: session } = useSession();

    if (!session) {
        redirect("/login");
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {session?.user?.name}!</p>
            <button onClick={() => signOut()}>Logout</button>
        </div>
    )
}
