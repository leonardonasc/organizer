"use client";

import Loading from "@/components/loading";
import Separator from "@/components/separator";
import { Button } from "@/components/ui/button";
import { ChromeIcon } from "@/components/ui/chrome";
import { Field, FieldDescription, FieldLabel, FieldSet } from "@/components/ui/field";
import { GithubIcon } from "@/components/ui/github";
import { Input } from "@/components/ui/input";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const { data: session, status } = useSession();

    const [changeForm, setChangeForm] = useState<"login" | "register">("register");

    if (status === "authenticated") {
        redirect("/dashboard");
    } else if (status === "loading") {
        return <div className='flex justify-center items-center min-h-screen'><Loading /></div>;
    }

    return (
        <div className="flex gap-x-2 bg-neutral-950">
            <div className="w-[60%] bg-neutral-900 rounded-3xl p-20 my-2">
                Get started
            </div>
            <div className="min-h-screen w-[40%] flex flex-col justify-center items-center gap-y-8 px-40">
                <div className="flex flex-col items-center mb-4">
                    <h1 className="text-2xl text-neutral-200">Sign Up Account</h1>
                    <h2 className="text-sm text-neutral-400">You can sign in with your socials or register below</h2>
                </div>
                <div className="flex w-full gap-x-2 justify-center">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() =>
                            signIn("github", { callbackUrl: "/" })
                        }
                    >
                        GitHub <GithubIcon />
                    </Button>

                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() =>
                            signIn("github", { callbackUrl: "/" })
                        }
                    >
                        Google <ChromeIcon />
                    </Button>
                </div>

                <div className="w-full flex">

                    <Separator />
                    <span className="text-sm text-neutral-500 font-semibold mx-2">OR</span>
                    <Separator />
                </div>

                <div className="w-fit p-1 flex items-center justify-center gap-x-2 border rounded-full">
                    <Button className="w-20 rounded-full" variant={changeForm === "login" ? "default" : "outline"} onClick={() => setChangeForm("login")}>Log in</Button>
                    <Button className="w-20 rounded-full" variant={changeForm === "register" ? "default" : "outline"} onClick={() => setChangeForm("register")}>Register</Button>
                </div>


                {/* form */}
                {changeForm === "register" ? (
                    <FieldSet className="w-full h-100">
                        <div className="grid grid-cols-2 gap-x-2">
                            <Field>
                                <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                                <Input id="firstName" autoComplete="off" placeholder="John" />
                                {/* <FieldDescription>This appears on invoices and emails.</FieldDescription> */}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                                <Input id="lastName" autoComplete="off" placeholder="Doe" />
                            </Field>
                        </div>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input id="email" autoComplete="off" placeholder="john.doe@example.com" />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input id="password" type="password" placeholder="********" />
                            <FieldDescription>Must be at least 8 characters long</FieldDescription>
                        </Field>
                        <Button className="w-full mt-4">Sign Up</Button>
                        <span className="text-sm text-center text-neutral-500">Already have an account?
                            <Button variant={"link"} onClick={() => setChangeForm("login")}>Log in</Button>
                        </span>
                    </FieldSet>
                ) : (
                    <FieldSet className="w-full h-100">
                        <div className="grid grid-cols-1 gap-y-6">
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input id="email" autoComplete="off" placeholder="john.doe@example.com" />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <Input id="password" type="password" placeholder="********" />
                                <FieldDescription>Forgot your password?</FieldDescription>
                            </Field>
                            <Button className="w-full mt-4">Log in</Button>
                        </div>

                    </FieldSet>

                )}
            </div>
        </div>
    );
}