import Link from "next/link";
import Image from "next/image";
import { Search, ChevronRight, Calendar, User, ArrowRight } from "lucide-react";

const blogPosts = [
    {
        id: 1,
        category: "Automotive & Finance",
        title: "UK Fuel Prices & Tax Update 2026 – Petrol & Diesel Trends Explained",
        description: "Stay updated with the latest UK petrol and diesel prices. Learn how fuel duty and VAT affect what you pay at the pump in 2026.",
        image: "/blog/rising-crude-oil-and-fuel-prices-money.jpg",
        date: "Mar 25, 2026",
        author: "CalZone Team",
        slug: "uk-fuel-prices-fuel-tax-update-2026",
        featured: true
    },
    {
        id: 2,
        category: "Energy & Utilities",
        title: "UK Electricity Prices 2026 – Tariffs & Bills Explained",
        description: "Everything you need to know about the 2026 Ofgem price cap, standing charges, and how your monthly electricity bill is calculated.",
        image: "/blog/energy-cost-increase-and-saving-electricity-gas.jpg",
        date: "Mar 20, 2026",
        author: "CalZone Team",
        slug: "uk-electricity-prices-tariffs-bills-explained",
        featured: false
    },
    {
        id: 3,
        category: "Energy & Utilities",
        title: "How to Reduce Gas & Electricity Bills in UK (2026 Guide)",
        description: "Actionable strategies to lower your energy spend. From smart meters to fixed-rate tariffs, discover how to save £100s annually.",
        image: "/blog/electricity-and-gas-bills-and-red-rising.jpg",
        date: "Mar 18, 2026",
        author: "CalZone Team",
        slug: "reduce-gas-electricity-bills-uk",
        featured: false
    },
    {
        id: 4,
        category: "Energy & Utilities",
        title: "Top Renewable Energy Schemes in UK (Grants & Savings)",
        description: "Explore the Boiler Upgrade Scheme, SEG, and ECO4. Learn how to get government funding for solar panels and heat pumps in 2026.",
        image: "/blog/driving.png",
        date: "Mar 15, 2026",
        author: "CalZone Team",
        slug: "top-renewable-energy-schemes-uk",
        featured: false
    },
    {
        id: 5,
        category: "Energy & Utilities",
        title: "Winter Energy Saving Tips for UK Homes",
        description: "Prepare your home for the cold. Expert tips on insulation, thermostat control, and reducing heat loss during the UK winter months.",
        image: "/blog/health.png",
        date: "Mar 12, 2026",
        author: "CalZone Team",
        slug: "winter-energy-saving-tips-uk",
        featured: false
    },
    {
        id: 6,
        category: "Health & Fitness",
        title: "Not Losing Weight in a Calorie Deficit? (UK Guide)",
        description: "Are you eating less but the scale isn't moving? Discover the hidden reasons why your deficit might be stalled and how to fix it.",
        image: "/blog/health.png",
        date: "Mar 8, 2026",
        author: "CalZone Team",
        slug: "not-losing-weight-in-calorie-deficit-uk",
        featured: false
    }
];

const popularCalculators = [
    { name: "Income Tax Calculator UK", href: "/income-tax-calculator-uk", category: "Finance" },
    { name: "Calorie Deficit Calculator", href: "/calorie-deficit-calculator-uk", category: "Health" },
    { name: "Fuel Cost Calculator UK", href: "/fuel-cost-calculator-uk", category: "Automotive" },
    { name: "VAT Calculator UK", href: "/vat-calculator-uk", category: "Finance" },
    { name: "Mortgage Calculator UK", href: "/mortgage-calculator-uk", category: "Finance" },
    { name: "BMI Calculator UK", href: "/bmi-calculator-uk", category: "Health" }
];

const categories = [
    { name: "Energy & Utilities", count: 4 },
    { name: "Automotive & Finance", count: 1 },
    { name: "Health & Fitness", count: 1 },
    { name: "Nutrition & Diet", count: 1 }
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
                    Expert Intelligence & News
                </h1>
                <p className="max-w-3xl mx-auto text-slate-500 text-lg leading-relaxed mb-10">
                    Stay informed with our latest research, clinical insights, and expert guides on health, finance, and automotive economics.
                </p>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto relative flex items-center gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search articles..."
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
                                Latest Insights
                            </h2>
                            <div className="flex-1 h-px bg-slate-200"></div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {blogPosts.map((post) => (
                                <Link key={post.id} href={`/blog/${post.slug}`} className="group cursor-pointer">
                                    <article>
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
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* --- SIDEBAR --- */}
                    <aside className="lg:col-span-4 space-y-12">
                        {/* Categories Section */}
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tighter">
                                    Categories
                                </h2>
                                <div className="flex-1 h-px bg-slate-200"></div>
                            </div>
                            <div className="space-y-2">
                                {categories.map((category, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl cursor-default group transition-colors">
                                        <span className="text-slate-700 font-semibold group-hover:text-primary transition-colors">{category.name}</span>
                                        <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">{category.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Popular Calculators Section */}
                        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4 mb-8">
                                <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tighter">
                                    Top Calculators
                                </h2>
                                <div className="flex-1 h-px bg-slate-200"></div>
                            </div>
                            <div className="space-y-4">
                                {popularCalculators.map((calc, idx) => (
                                    <Link
                                        key={idx}
                                        href={calc.href}
                                        className="flex items-center justify-between group p-3 hover:bg-white dark:hover:bg-slate-800 rounded-2xl transition-all"
                                    >
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase font-bold text-primary tracking-wider mb-1">{calc.category}</span>
                                            <span className="font-semibold text-slate-900 group-hover:text-primary transition-colors">{calc.name}</span>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
                                <Link href="/" className="block text-center py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                                    View All Calculators
                                </Link>
                            </div>
                        </div>

                        {/* Stay Connected or similar (instead of Latest/Featured) */}
                        <div className="p-8 rounded-3xl bg-slate-900 text-white relative overflow-hidden group">
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all"></div>
                            <h4 className="text-2xl font-black mb-4 relative z-10 tracking-tight italic text-primary">CalZone Intelligence</h4>
                            <p className="text-slate-400 text-sm relative z-10 leading-relaxed font-medium">
                                We're not just calculations. We're your strategic advantage in UK finance, health, and mobility. 
                            </p>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}
