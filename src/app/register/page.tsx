"use client";

import { useState } from "react";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { GithubIcon } from "@/components/ui/github";
import { Input } from "@/components/ui/input";
import { useMe } from "@/hooks/use-me";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export default function RegisterPage() {
    const { me, loading } = useMe();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loading />
            </div>
        );
    }

    if (me) {
        redirect("/dashboard");
    }

    return (
        <div className="h-full flex items-center justify-center">
            <div className="flex flex-col gap-y-2 w-100 bg-neutral-900 p-10 rounded-xl">
                <form className="flex flex-col gap-y-4" onSubmit={
                    async (e) => {
                        e.preventDefault();
                        const response = await fetch("/api/auth/register", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                firstName,
                                lastName,
                                email,
                                password,
                                confirmPassword,
                            }),
                        });

                        const payload = await response.json();

                        if (!response.ok) {
                            alert(payload?.error ?? "Failed to register");
                            return;
                        }
                        window.location.href = "/login";
                    }
                }>
                    <Field>
                        <FieldLabel>First Name</FieldLabel>
                        <Input type="text" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </Field>
                    <Field>
                        <FieldLabel>Last Name</FieldLabel>
                        <Input type="text" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </Field>
                    <Field>
                        <FieldLabel>Email</FieldLabel>
                        <Input type="email" placeholder="johndoe@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </Field>
                    <Field>
                        <FieldLabel>Password</FieldLabel>
                        <Input type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </Field>
                    <Field>
                        <FieldLabel>Confirm Password</FieldLabel>
                        <Input type="password" placeholder="********" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </Field>
                    <Button type="submit" className="w-full">Register</Button>
                    <p className="text-sm text-muted-foreground">Already have an account? <a href="/login" className="text-primary">Login</a></p>
                </form>
            </div>
        </div >
    );
}