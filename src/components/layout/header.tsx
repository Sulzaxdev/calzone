"use client";

import Link from "next/link";
import { Activity } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="mx-auto w-[90%] md:w-[80%] rounded-full bg-white/40 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] px-6 flex h-16 items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="relative w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center overflow-hidden">
                            <div className="absolute w-[120%] h-[2px] bg-primary transform -rotate-45"></div>
                        </div>
                        <span className="font-extrabold text-foreground tracking-wide text-lg">CalZone.</span>
                    </Link>
                </div>

                <div className="flex items-center">
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                        <Link href="/" className="bg-white dark:bg-white/10 text-foreground px-4 py-2 font-semibold shadow-sm rounded-xl">Home</Link>
                        <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/80 font-semibold">About us</Link>
                        <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/80 font-semibold">Explore</Link>
                        <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/80 font-semibold">For clients</Link>
                        <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/80 font-semibold">Career</Link>
                        <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/80 font-semibold">Blog</Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
