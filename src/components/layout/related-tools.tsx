import Link from "next/link";
import { categories } from "@/lib/calculators";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

interface RelatedToolsProps {
    currentCategory: string;
    currentSlug: string;
}

export function RelatedTools({ currentCategory, currentSlug }: RelatedToolsProps) {
    const category = categories.find((c) => c.title === currentCategory);

    if (!category) return null;

    // Filter out the current tool and take the first 4
    const relatedCalcs = category.calculators
        .filter((calc) => calc.href !== currentSlug)
        .slice(0, 4);

    if (relatedCalcs.length === 0) return null;

    return (
        <section className="container mx-auto px-4 max-w-7xl mt-20 mb-12">
            <div className="flex items-center gap-4 mb-10">
                <div className="h-8 w-1.5 bg-primary rounded-full"></div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">
                    Related <span className="text-primary tracking-widest text-sm align-middle ml-2">[{category.title}]</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedCalcs.map((calc) => (
                    <Link key={calc.name} href={calc.href} className="group">
                        <Card className="p-5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 group-hover:border-primary/50 flex flex-col h-full justify-between">
                            <div>
                                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                    {calc.name}
                                </h3>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                    Tool
                                </span>
                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
    );
}
