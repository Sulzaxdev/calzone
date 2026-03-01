"use client";

import Link from "next/link";
import { Activity } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto px-4 flex h-14 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <Activity className="h-6 w-6 text-primary" />
                        <span className="font-bold text-lg hidden sm:inline-block">HealthCalc Pro</span>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                        <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">General</Link>
                        <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">Fitness</Link>
                        <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">Sleep</Link>
                    </nav>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
