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
        <header className="sticky top-0 z-100 w-full border-b border-slate-200/50 dark:border-white/10 bg-white/70 dark:bg-[#110e10]/70 backdrop-blur-2xl transition-all">
            <div className="container mx-auto px-4 sm:px-6 flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2 mr-2 md:mr-8">
                        <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-transparent">
                            <Image
                                src="/logo.png"
                                alt="CalZone Logo"
                                width={130}
                                height={45}
                                className="object-contain"
                            />
                        </div>
                    </Link>

                    <nav className="hidden xl:flex items-center gap-8 text-sm font-semibold">
                       
                        <Link href="/general-health" className="transition-colors hover:text-primary text-slate-700 dark:text-slate-200">Health Calculators</Link>
                        <Link href="/finance-driving" className="transition-colors hover:text-primary text-slate-700 dark:text-slate-200">Finance Calculators</Link>
                         {/* Explore Mega Menu Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center transition-colors hover:text-primary text-slate-700 dark:text-slate-200 py-4">
                                Explore
                                <ChevronDown className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" />
                            </button>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:block pt-2">
                                <div className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 w-[800px] max-w-[90vw] grid grid-cols-3 gap-6 transform-gpu before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-b-white/95 dark:before:border-b-slate-950/95">
                                    {categories.map((category) => (
                                        <div key={category.title}>
                                            {(category.title === "General Health / Lifestyle" || category.title === "Fitness & Diet" || category.title === "Finance & Driving" || category.title === "Home & Property" || category.title === "Misc & Lifestyle" || category.title === "Sleep") ? (
                                                <Link
                                                    href={category.title === "General Health / Lifestyle" ? "/general-health" : category.title === "Fitness & Diet" ? "/fitness-diet" : category.title === "Finance & Driving" ? "/finance-driving" : category.title === "Home & Property" ? "/home-property" : category.title === "Misc & Lifestyle" ? "/misc-lifestyle" : "/sleep"}
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
                                                                    category.title === "Fitness & Diet" ? "/fitness-diet" :
                                                                        category.title === "Finance & Driving" ? "/finance-driving" :
                                                                            category.title === "Home & Property" ? "/home-property" :
                                                                                category.title === "Misc & Lifestyle" ? "/misc-lifestyle" :
                                                                                    category.title === "Sleep" ? "/sleep" : "/"
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
                        <Link href="/blog" className="transition-colors hover:text-primary text-slate-700 dark:text-slate-200">Blog</Link>
                        <Link href="/about" className="transition-colors hover:text-primary text-slate-700 dark:text-slate-200">About</Link>
                        <Link href="/disclaimer" className="transition-colors hover:text-primary text-slate-700 dark:text-slate-200">Disclaimer</Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    {/* Search Bar */}
                    <div ref={searchRef} className="flex relative items-center">
                        <div className="absolute left-3 text-slate-500 dark:text-slate-400 pointer-events-none z-10">
                            <Search className="w-4 h-4" />
                        </div>

                        {/* Auto-suggestion ghost text */}
                        <div className="absolute inset-x-0 inset-y-0 flex items-center pl-9 pr-4 text-sm pointer-events-none select-none z-0 overflow-hidden rounded-full">
                            <span className="opacity-0 whitespace-pre text-transparent">{searchQuery}</span>
                            {searchQuery && filteredCalculators.length > 0 && filteredCalculators[0].name.toLowerCase().startsWith(searchQuery.toLowerCase()) && (
                                <span className="text-slate-400 dark:text-slate-500 whitespace-pre">
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
                            className="relative z-10 w-36 md:w-56 h-9 pl-9 pr-4 rounded-full border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm backdrop-blur-sm shadow-inner bg-slate-100/50 dark:bg-black/40 hover:bg-slate-100 dark:hover:bg-black/60 focus:bg-white dark:focus:bg-black/80"
                        />

                        {/* Search Dropdown */}
                        {showResults && searchQuery.length > 0 && (
                            <div className="absolute top-12 right-0 md:left-0 w-64 md:w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden py-2 flex flex-col gap-1 z-100 transform-gpu">
                                {filteredCalculators.length > 0 ? (
                                    filteredCalculators.map(calc => (
                                        <Link
                                            href={calc.href}
                                            key={calc.name}
                                            onClick={() => {
                                                setShowResults(false);
                                                setSearchQuery("");
                                            }}
                                            className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-800 dark:text-slate-200 text-left block"
                                        >
                                            <p className="text-sm font-semibold">{calc.name}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{calc.desc}</p>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400 text-center">No calculators found.</div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <ThemeToggle />
                    </div>

                    <Link href="/login" className="flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 p-2 rounded-full border border-slate-200 dark:border-white/10 transition-colors">
                        <User className="w-4 h-4 text-slate-700 dark:text-slate-200" />
                        <span className="sr-only">User</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}
