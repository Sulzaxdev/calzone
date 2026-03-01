"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: values.email,
                password: values.password,
            });

            if (res?.error) {
                setError("Invalid email or password");
            } else {
                router.push("/");
                router.refresh();
            }
        } catch (err) {
            setError("An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container max-w-md mx-auto py-12 px-4">
            <CalculatorCard
                title="Welcome Back"
                description="Sign in to save your calculator history and preferences."
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                {...register("email")}
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                {...register("password")}
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive">{errors.password.message}</p>
                            )}
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 text-sm text-destructive-foreground bg-destructive/90 rounded-md">
                            {error}
                        </div>
                    )}

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Signing in..." : "Sign in"}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground mt-4">
                        Don't have an account?{" "}
                        <Link href="/register" className="text-primary hover:underline font-medium">
                            Create one
                        </Link>
                    </p>
                </form>
            </CalculatorCard>
        </div>
    );
}
