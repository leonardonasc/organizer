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
        <div className="flex flex-col w-full p-6 bg-neutral-900 h-full rounded-lg">
            <div className="flex justify-between text-xs text-neutral-400 mb-5">
                <span className="flex items-center gap-x-2"><GaugeIcon size={15} /> Dashboard</span>
                <span>Last updated: 3 hours ago</span>
            </div>

            <div>
                <h1 className="text-2xl text-neutral-200">Welcome, {session?.user?.name}!</h1>
            </div>

            <div className="flex gap-x-3">
                <Card className="flex-1 mt-4 bg-neutral-900 h-60"></Card>
                <Card className="flex-1 mt-4 bg-neutral-900"></Card>
                <Card className="flex-1 mt-4 bg-neutral-900"></Card>
            </div>
        </div>
    )
}
