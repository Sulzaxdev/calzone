import Link from "next/link";
import Image from "next/image";
import { Search, ChevronRight, Calendar, User, ArrowRight } from "lucide-react";

const blogPosts = [
    {
        id: 1,
        category: "Health & Biometrics",
        title: "The Silent Variable: Why Your Biological Age Diverges from the Calendar",
        description: "Explore the hidden metrics of longevity. We dive deep into how our Biometric Intelligence engine tracks cellular health through simple non-invasive inputs.",
        image: "/blog/health.png",
        date: "Oct 24, 2024",
        author: "Dr. Aris Thorne",
        featured: true
    },
    {
        id: 2,
        category: "Financial Strategy",
        title: "Wealth IQ: Reclaiming £2,000 Yearly Through Micro-Optimization",
        description: "Small leaks sink big ships. Learn how our Strategic Wealth engine identifies hidden financial drains in everyday UK household expenses.",
        image: "/blog/finance.png",
        date: "Oct 20, 2024",
        author: "Sarah Sterling",
        featured: true
    },
    {
        id: 3,
        category: "Mobility & Tech",
        title: "The EV Transition: Decoding the Real Cost of Electric Mobility in 2024",
        description: "Is switching to electric truly cheaper? We break down the charging dynamics and maintenance curves using current UK energy indices.",
        image: "/blog/driving.png",
        date: "Oct 15, 2024",
        author: "Marcus Volt",
        featured: true
    }
];

const sidePosts = [
    {
        date: "August 7, 2024",
        title: "Top Hidden Gems: Must-Visit Spots This Year",
        image: "/blog/health.png" // Reusing for placeholder
    },
    {
        date: "March 23, 2024",
        title: "Bucket List: 25 Adventures for Every Traveler",
        image: "/blog/finance.png" // Reusing for placeholder
    },
    {
        date: "May 31, 2024",
        title: "Travel Like a Local: Tips for Authentic Experiences",
        image: "/blog/driving.png" // Reusing for placeholder
    }
];

export const metadata = {
    title: "CalZone Blog | Discover Our Latest Intelligence",
    description: "Stay ahead with unique insights into health, finance, and mobility. Explore our latest research and groundbreaking calculator intelligence.",
};

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-white pb-20 pt-32">
            {/* --- HERO SECTION --- */}
            <header className="container mx-auto px-4 max-w-7xl text-center mb-16">
                <div className="inline-block px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 mb-6 uppercase tracking-widest">
                    Blog
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
                    Discover our latest news
                </h1>
                <p className="max-w-3xl mx-auto text-slate-500 text-lg leading-relaxed mb-10">
                    Discover the achievements that set us apart. From groundbreaking projects to industry accolades, we take pride in our accomplishments.
                </p>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto relative flex items-center gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Input Placeholder"
                            className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-slate-900"
                        />
                    </div>
                    <button className="bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                        Find Now
                    </button>
                </div>
            </header>

            <main className="container mx-auto px-4 max-w-7xl">
                <div className="grid lg:grid-cols-12 gap-12">
                    {/* --- MAIN CONTENT --- */}
                    <div className="lg:col-span-8">
                        <div className="flex items-center gap-4 mb-10">
                            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                                intelligence is remarkable.
                            </h2>
                            <div className="flex-1 h-px bg-slate-200"></div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {blogPosts.map((post) => (
                                <article key={post.id} className="group cursor-pointer">
                                    <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 shadow-xl">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-bold text-slate-900 uppercase">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors leading-tight">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {post.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 uppercase">
                                            <Calendar className="w-4 h-4" />
                                            {post.date}
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>

                    {/* --- SIDEBAR --- */}
                    <aside className="lg:col-span-4 space-y-12">
                        {/* Featured Section */}
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tighter">
                                    Featured
                                </h2>
                                <div className="flex-1 h-px bg-slate-200"></div>
                            </div>
                            <div className="space-y-6">
                                {sidePosts.map((post, idx) => (
                                    <div key={idx} className="flex gap-4 group cursor-pointer">
                                        <div className="relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden text-sm">
                                            <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <span className="text-[10px] font-medium text-slate-400 uppercase mb-1">{post.date}</span>
                                            <h4 className="font-semibold text-sm text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                                                {post.title}
                                            </h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Latest Section */}
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tighter">
                                    Latest
                                </h2>
                                <div className="flex-1 h-px bg-slate-200"></div>
                            </div>
                            <div className="space-y-6">
                                {blogPosts.slice(0, 2).map((post) => (
                                    <div key={post.id} className="group cursor-pointer">
                                        <span className="text-[10px] font-medium text-slate-400 uppercase mb-1">{post.date}</span>
                                        <h4 className="font-semibold text-base text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                                            {post.title}
                                        </h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}
