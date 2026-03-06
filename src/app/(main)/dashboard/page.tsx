"use client";

import Loading from "@/components/loading";
import { GaugeIcon } from "@/components/ui/gauge";
import { useMe } from "@/hooks/use-me";

export default function DashboardPage() {

    const { me, loading } = useMe();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loading />
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            <div className="flex justify-between text-xs text-neutral-500 font-semibold">
                <span className="flex items-center gap-x-2"><GaugeIcon size={15} /> Dashboard</span>
                <span>Last updated: 3 hours ago</span>
            </div>

            <div className="my-6">
                <h1 className="text-2xl text-neutral-200">Welcome, {me?.name ?? "Guest"}!</h1>
            </div>
        </div>
    )
}
