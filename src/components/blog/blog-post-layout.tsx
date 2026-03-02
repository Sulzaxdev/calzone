import { ReactNode } from "react";
import Link from "next/link";
import { CalendarIcon, User, Clock, Calculator } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { CalculatorSchema } from "@/components/seo/calculator-schema"; // we can reuse FAQ logic if needed

interface BlogPostLayoutProps {
    title: string;
    description: string;
    date: string;
    author: string;
    readTime: string;
    category: string;
    slug: string;
    // The calculator this post is directly supporting
    relatedCalculator?: {
        name: string;
        href: string;
        description: string;
    };
    // E-E-A-T: Sources and citations
    sources?: {
        title: string;
        url: string;
    }[];
    children: ReactNode;
}

export function BlogPostLayout({
    title,
    description,
    date,
    author,
    readTime,
    category,
    slug,
    relatedCalculator,
    sources,
    children
}: BlogPostLayoutProps) {
    const breadcrumbs = [
        { name: "Home", item: "/" },
        { name: "Blog", item: "/blog" },
        { name: title, item: `/blog/${slug}` }
    ];

    // Basic Article Schema
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "author": {
            "@type": "Person",
            "name": author,
        },
        "datePublished": date,
        "dateModified": date,
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <BreadcrumbSchema items={breadcrumbs} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />

            {/* Breadcrumb Navigation (Visual) */}
            <nav className="flex text-sm text-slate-500 mb-8 space-x-2">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <span>/</span>
                <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
                <span>/</span>
                <span className="text-slate-900 dark:text-slate-100 font-medium truncate">{title}</span>
            </nav>

            <div className="grid lg:grid-cols-[1fr_300px] gap-12 items-start">

                {/* Main Article Content */}
                <article className="min-w-0">
                    {/* Header */}
                    <header className="mb-10 space-y-6 border-b border-slate-200 dark:border-slate-800 pb-10">
                        <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full">
                            {category}
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-slate-50 leading-tight">
                            {title}
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                            {description}
                        </p>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-medium pt-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                                    <User className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                                </div>
                                {author}
                            </div>
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4" />
                                {new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {readTime} min read
                            </div>
                        </div>
                    </header>

                    {/* Prose styling for the MDX or raw React children */}
                    <div className="prose prose-slate dark:prose-invert prose-lg max-w-none 
                                    prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                                    prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                                    prose-a:text-primary hover:prose-a:text-primary/80 prose-a:no-underline
                                    prose-li:marker:text-primary prose-img:rounded-2xl">
                        {children}
                    </div>

                    {/* Sources & References (E-E-A-T Signal) */}
                    {sources && sources.length > 0 && (
                        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 text-xs font-bold font-serif text-slate-600 dark:text-slate-400">i</span>
                                Sources & References
                            </h3>
                            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                                {sources.map((source, idx) => (
                                    <li key={idx} className="flex gap-2 items-start">
                                        <span className="text-slate-400 font-mono">[{idx + 1}]</span>
                                        <a
                                            href={source.url}
                                            target="_blank"
                                            rel="nofollow noopener noreferrer"
                                            className="hover:text-primary transition-colors underline decoration-slate-300 dark:decoration-slate-700 underline-offset-4"
                                        >
                                            {source.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Footer Calculator Link if exists */}
                    {relatedCalculator && (
                        <div className="mt-16 p-8 rounded-3xl bg-primary/5 border border-primary/20 text-center">
                            <Calculator className="w-12 h-12 text-primary mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">{relatedCalculator.name}</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-6">{relatedCalculator.description}</p>
                            <Link href={relatedCalculator.href} className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                                Open Calculator Free
                            </Link>
                        </div>
                    )}
                </article>

                {/* Sidebar */}
                <aside className="space-y-8 hidden lg:block">
                    {/* Auto TOC */}
                    <TableOfContents />

                    {/* Sticky Call to Action Sidebar */}
                    {relatedCalculator && (
                        <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-xl sticky top-[450px]">
                            <h4 className="font-bold text-xl mb-2 flex items-center gap-2">
                                <Calculator className="w-5 h-5 text-primary" />
                                Try It Yourself
                            </h4>
                            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                                Stop guessing. Use our free algorithmic {relatedCalculator.name.toLowerCase()} for exact numbers in seconds.
                            </p>
                            <Link href={relatedCalculator.href} className="block w-full text-center bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-3 rounded-lg font-bold transition-all shadow-lg">
                                Calculate Now
                            </Link>
                        </div>
                    )}
                </aside>

            </div>
        </div>
    );
}
