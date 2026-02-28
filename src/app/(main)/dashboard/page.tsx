"use client";

import { Card } from "@/components/ui/card";
import { GaugeIcon } from "@/components/ui/gauge";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function DashboardPage() {

    const { data: session } = useSession();

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="flex flex-col">
            <div className="flex justify-between text-xs text-neutral-500 font-semibold">
                <span className="flex items-center gap-x-2"><GaugeIcon size={15} /> Dashboard</span>
                <span>Last updated: 3 hours ago</span>
            </div>

            <div className="my-6">
                <h1 className="text-2xl text-neutral-200">Welcome, {session?.user?.name}!</h1>
            </div>
        </div>
    )
}
