"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, User, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState, useRef, useEffect } from "react";
import { allCalculators, categories } from "@/lib/calculators";

export function Header() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredCalculators = allCalculators.filter(calc =>
        calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.desc.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);

    return (
        <header className="absolute top-0 z-100 w-full pt-4 px-4 sm:px-0">
            <div className="mx-auto w-full md:w-[95%] lg:w-[85%] rounded-[2rem] bg-black/10 dark:bg-black/30 backdrop-blur-md border border-white/20 px-4 sm:px-6 flex h-16 items-center justify-between shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] relative z-100">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2 mr-2 md:mr-8">
                        <div className="relative w-full h-full rounded-xl flex items-center justify-center overflow-hidden drop-shadow-md bg-transparent  ">
                            <Image
                                src="/logo.png"
                                alt="CalZone Logo"
                                width={152}
                                height={52}
                                className="object-contain p-1"
                            />
                        </div>

                    </Link>

                    <nav className="hidden xl:flex items-center gap-6 text-sm font-medium">

                        <Link href="/" className="transition-colors hover:text-white/80 text-white font-semibold drop-shadow-md">About us</Link>


                        <Link href="/" className="transition-colors hover:text-white/80 text-white font-semibold drop-shadow-md">For clients</Link>
                        <Link href="/" className="transition-colors hover:text-white/80 text-white font-semibold drop-shadow-md">Career</Link>
                        {/* Explore Mega Menu Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center transition-colors hover:text-white/80 text-white font-semibold drop-shadow-md py-4">
                                Explore
                                <ChevronDown className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" />
                            </button>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:block pt-2">
                                <div className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 w-[800px] max-w-[90vw] grid grid-cols-3 gap-6 transform-gpu before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-b-white/95 dark:before:border-b-slate-950/95">
                                    {categories.map((category) => (
                                        <div key={category.title}>
                                            {(category.title === "General Health / Lifestyle" || category.title === "Fitness & Diet" || category.title === "Finance & Driving") ? (
                                                <Link
                                                    href={category.title === "General Health / Lifestyle" ? "/general-health" : category.title === "Fitness & Diet" ? "/fitness-diet" : "/finance-driving"}
                                                    className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 text-sm hover:text-primary transition-colors"
                                                >
                                                    <div className="[&>svg]:w-4 [&>svg]:h-4">
                                                        {category.icon}
                                                    </div>
                                                    {category.title}
                                                </Link>
                                            ) : (
                                                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 text-sm">
                                                    <div className="[&>svg]:w-4 [&>svg]:h-4">
                                                        {category.icon}
                                                    </div>
                                                    {category.title}
                                                </h3>
                                            )}
                                            <ul className="space-y-2">
                                                {category.calculators.slice(0, 5).map((calc, index) => (
                                                    <li key={index}>
                                                        <Link
                                                            href={calc.href}
                                                            className="text-xs text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors line-clamp-1"
                                                        >
                                                            {calc.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                                {category.calculators.length > 5 && (
                                                    <li>
                                                        <Link
                                                            href={
                                                                category.title === "General Health / Lifestyle" ? "/general-health" :
                                                                    category.title === "Fitness & Diet" ? "/fitness-diet" : "/"
                                                            }
                                                            className="text-xs font-medium text-primary hover:underline"
                                                        >
                                                            + {category.calculators.length - 5} more
                                                        </Link>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <Link href="/blog" className="transition-colors hover:text-white/80 text-white font-semibold drop-shadow-md">Blog</Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    {/* Search Bar */}
                    <div ref={searchRef} className="flex relative items-center">
                        <div className="absolute left-3 text-white/80 pointer-events-none z-10">
                            <Search className="w-4 h-4" />
                        </div>

                        {/* Auto-suggestion ghost text */}
                        <div className="absolute inset-x-0 inset-y-0 flex items-center pl-9 pr-4 text-sm pointer-events-none select-none z-0 overflow-hidden rounded-full">
                            <span className="opacity-0 whitespace-pre">{searchQuery}</span>
                            {searchQuery && filteredCalculators.length > 0 && filteredCalculators[0].name.toLowerCase().startsWith(searchQuery.toLowerCase()) && (
                                <span className="text-white/40 whitespace-pre">
                                    {filteredCalculators[0].name.slice(searchQuery.length)}
                                </span>
                            )}
                        </div>

                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setShowResults(true);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Tab" && searchQuery && filteredCalculators.length > 0 && filteredCalculators[0].name.toLowerCase().startsWith(searchQuery.toLowerCase())) {
                                    e.preventDefault();
                                    setSearchQuery(filteredCalculators[0].name);
                                }
                            }}
                            onFocus={() => setShowResults(true)}
                            className="relative z-10 w-32 md:w-48 lg:w-64 h-10 pl-9 pr-4 rounded-full border border-white/20 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm backdrop-blur-sm shadow-inner bg-transparent"
                        />

                        {/* The actual background for the input since input is transparent for ghost text */}
                        <div className="absolute inset-0 bg-black/20 dark:bg-black/40 rounded-full border border-white/20 backdrop-blur-sm -z-10 pointer-events-none"></div>

                        {/* Search Dropdown */}
                        {showResults && searchQuery.length > 0 && (
                            <div className="absolute top-12 right-0 md:left-0 w-64 md:w-full bg-white/20 dark:bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden py-2 flex flex-col gap-1 z-100 transform-gpu">
                                {filteredCalculators.length > 0 ? (
                                    filteredCalculators.map(calc => (
                                        <Link
                                            href={calc.href}
                                            key={calc.name}
                                            onClick={() => {
                                                setShowResults(false);
                                                setSearchQuery("");
                                            }}
                                            className="px-4 py-2 hover:bg-white/20 dark:hover:bg-white/10 transition-colors text-white text-left block"
                                        >
                                            <p className="text-sm font-semibold">{calc.name}</p>
                                            <p className="text-xs text-white/70 truncate">{calc.desc}</p>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="px-4 py-3 text-sm text-white/70 text-center">No calculators found.</div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="opacity-80 hover:opacity-100 transition-opacity">
                        <ThemeToggle />
                    </div>

                    <Link href="/login" className="opacity-80 hover:opacity-100 transition-opacity flex items-center justify-center bg-white/10 hover:bg-white/20 p-2 rounded-full border border-white/20">
                        <User className="w-5 h-5 text-white" />
                        <span className="sr-only">User</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}
