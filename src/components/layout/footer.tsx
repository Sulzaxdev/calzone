"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/calculators";
import { Github, Twitter, Linkedin, ChevronDown } from "lucide-react";

interface CategoryProp {
    title: string;
    icon: ReactNode;
    calculators: { name: string; href: string; desc: string }[];
}

function FooterCategory({ category }: { category: CategoryProp }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between font-semibold text-slate-800 dark:text-slate-200 py-3 border-b border-slate-200 dark:border-slate-800 text-left hover:text-primary dark:hover:text-primary transition-colors group"
            >
                <div className="flex items-center gap-2">
                    <div className="[&>svg]:w-4 [&>svg]:h-4 text-primary opacity-80 group-hover:opacity-100 transition-opacity">
                        {category.icon}
                    </div>
                    {category.title}
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 group-hover:text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"}`}
            >
                <ul className="space-y-4 pb-4 px-2">
                    {category.calculators.map((calc, index) => (
                        <li key={index}>
                            <Link
                                href={calc.href}
                                className="text-[14px] text-slate-500/90 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors line-clamp-1 block"
                            >
                                {calc.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export function Footer() {
    return (
        <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

                    {/* Brand & Mission Column */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link href="/" className="inline-block">
                            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-4">
                                <div className="relative w-full h-full rounded-xl flex items-center justify-center overflow-hidden drop-shadow-md bg-transparent">
                                    <Image
                                        src="/logo.png"
                                        alt="CalZone Logo"
                                        width={182}
                                        height={182}
                                        className="object-contain"
                                    />
                                </div>
                            </h2>
                        </Link>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed pr-8">
                            Your ultimate suite of fast, professional, and free calculators for health, fitness, finance, and daily life. Make data-driven decisions with ease.
                        </p>
                        <div className="flex items-center gap-4 text-slate-500">
                            <a href="#" className="hover:text-primary transition-colors bg-white dark:bg-slate-900 p-2.5 rounded-full shadow-sm border border-slate-200 dark:border-slate-800">
                                <Twitter className="w-5 h-5" />
                                <span className="sr-only">Twitter</span>
                            </a>
                            <a href="#" className="hover:text-primary transition-colors bg-white dark:bg-slate-900 p-2.5 rounded-full shadow-sm border border-slate-200 dark:border-slate-800">
                                <Github className="w-5 h-5" />
                                <span className="sr-only">GitHub</span>
                            </a>
                            <a href="#" className="hover:text-primary transition-colors bg-white dark:bg-slate-900 p-2.5 rounded-full shadow-sm border border-slate-200 dark:border-slate-800">
                                <Linkedin className="w-5 h-5" />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                        </div>
                    </div>

                    {/* Dynamic Calculator Columns */}
                    <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 self-start">
                        {categories.map((category) => (
                            <div key={category.title}>
                                {category.title === "Finance & Driving" ? (
                                    <Link
                                        href="/finance-driving"
                                        className="font-semibold text-slate-800 dark:text-slate-200 py-3 border-b border-slate-200 dark:border-slate-800 text-left hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-2 group mb-4"
                                    >
                                        <div className="[&>svg]:w-4 [&>svg]:h-4 text-primary opacity-80 group-hover:opacity-100 transition-opacity">
                                            {category.icon}
                                        </div>
                                        {category.title}
                                    </Link>
                                ) : null}
                                <FooterCategory category={category} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex flex-col md:flex-row items-center gap-2 text-center md:text-left">
                        <p>&copy; {new Date().getFullYear()} Nova Tech Studio. All rights reserved.</p>
                        <span className="hidden md:inline text-slate-300 dark:text-slate-700">|</span>
                        <p className="text-xs">Disclaimer: Tools are for informational purposes only.</p>
                    </div>

                    <div className="flex items-center gap-6 font-medium">
                        <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
