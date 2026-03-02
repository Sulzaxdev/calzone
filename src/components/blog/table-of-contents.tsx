"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";

interface Heading {
    id: string;
    text: string;
    level: number;
}

export function TableOfContents() {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        // Query all h2 and h3 elements within the main article content
        const elements = Array.from(document.querySelectorAll("article h2, article h3"));

        const parsedHeadings = elements.map((element) => {
            // Assign an ID if it doesn't have one (crucial for linking)
            if (!element.id) {
                element.id = element.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || `heading-${Math.random().toString(36).substr(2, 9)}`;
            }
            return {
                id: element.id,
                text: element.textContent || "",
                level: Number(element.tagName.replace("H", ""))
            };
        });

        setHeadings(parsedHeadings);

        // Set up Intersection Observer to highlight the active section while scrolling
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0px 0px -80% 0px" } // Trigger when the heading reaches the top 20% of the screen
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    if (headings.length === 0) return null;

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 sticky top-24">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <List className="w-5 h-5 text-primary" />
                Table of Contents
            </h4>
            <nav className="space-y-2">
                {headings.map((heading) => (
                    <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className={`block text-sm transition-colors ${heading.level === 3 ? "pl-4" : ""
                            } ${activeId === heading.id
                                ? "text-primary font-medium"
                                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                            }`}
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                            // Optional: Update URL hash without jumping
                            window.history.pushState(null, '', `#${heading.id}`);
                        }}
                    >
                        {heading.text}
                    </a>
                ))}
            </nav>
        </div>
    );
}
