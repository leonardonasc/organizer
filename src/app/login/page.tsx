"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { GithubIcon } from "@/components/ui/github";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="h-full flex items-center justify-center">
            <div className="flex flex-col gap-y-2 w-100 bg-neutral-900 p-10 rounded-xl">
                <form
                    className="flex flex-col gap-y-4"
                    onSubmit={async (e) => {
                        e.preventDefault();

                        const result = await signIn("credentials", {
                            email,
                            password,
                            redirect: false,
                        });

                        if (result?.error) {
                            alert("Email ou senha inválidos");
                            return;
                        }

                        window.location.href = "/dashboard";
                    }}
                >
                    <Field>
                        <FieldLabel>Email</FieldLabel>
                        <Input type="email" placeholder="johndoe@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </Field>
                    <Field>
                        <FieldLabel>Password</FieldLabel>
                        <Input type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </Field>
                    <Button type="submit" className="w-full">Login</Button>
                    {/* already have an account */}
                    <p className="text-sm text-muted-foreground">Don't have an account? <a href="/register" className="text-primary">Register</a></p>
                    <Button type="button" variant="outline" className="mt-4" onClick={() => signIn("github", { callbackUrl: "/dashboard" })}>
                        <GithubIcon className="" />
                        Sign in with Github
                    </Button>
                </form>
            </div>
        </div>
    );
}