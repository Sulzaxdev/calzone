import Link from "next/link";
import { BookOpen, ArrowRight, ExternalLink } from "lucide-react";

export interface BlogLink {
    title: string;
    description: string;
    href: string;
    category?: string;
}

interface LearnMoreProps {
    title?: string;
    description?: string;
    links: BlogLink[];
}

export function LearnMore({
    title = "Learn More About This Calculator",
    description = "Dive deeper into the science, guidelines, and expert tips behind this tool.",
    links
}: LearnMoreProps) {
    if (!links || links.length === 0) return null;

    return (
        <div className="mt-12 bg-white dark:bg-card/50 border border-slate-200 dark:border-slate-800 p-8 md:p-10 rounded-3xl shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

            <div className="relative z-10 space-y-8">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-3">
                        <BookOpen className="w-8 h-8 text-primary" />
                        {title}
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        {description}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {links.map((link, idx) => (
                        <Link
                            key={idx}
                            href={link.href}
                            className="group block p-6 rounded-2xl bg-slate-50 hover:bg-white dark:bg-slate-900/50 hover:dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-primary/30 transition-all hover:shadow-md"
                        >
                            {link.category && (
                                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                                    {link.category}
                                </span>
                            )}
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2 group-hover:text-primary transition-colors flex justify-between items-start gap-4">
                                {link.title}
                                <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-primary shrink-0 mt-1 opacity-50 group-hover:opacity-100 transition-all" />
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
                                {link.description}
                            </p>
                            <span className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                Read Full Guide <ArrowRight className="w-4 h-4" />
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
