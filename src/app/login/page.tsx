"use client";

import Loading from "@/components/loading";
import Separator from "@/components/separator";
import { Button } from "@/components/ui/button";
import { ChromeIcon } from "@/components/ui/chrome";
import { GithubIcon } from "@/components/ui/github";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function LoginPage() {

    const { data: session, status } = useSession();

    if (status === "authenticated") {
        redirect("/dashboard");
    } else if (status === "loading") {
        return <div className='flex justify-center items-center min-h-screen'><Loading /></div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <div className="border rounded-lg p-4 flex flex-col items-center gap-y-4 w-75">
                <h1>Sign In</h1>
                <div className="flex flex-col gap-y-3 w-full">
                    <Button
                        variant="outline"
                        onClick={() =>
                            signIn("github", { callbackUrl: "/" })
                        }
                    >
                        GitHub <GithubIcon />
                    </Button>
                    <div className="flex gap-x-1 items-center">
                        <Separator />
                        <span className="text-sm text-neutral-200">OR</span>
                        <Separator />
                    </div>
                    <Button
                        variant="outline"
                    // onClick={() =>
                    //     signIn("github", { callbackUrl: "/" })
                    // }
                    >
                        Coming soon <ChromeIcon />
                    </Button>
                </div>
            </div>
        </div>
    );
}