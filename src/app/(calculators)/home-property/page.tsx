import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ChevronRight, Home, Wrench, Thermometer, Hammer, PaintBucket, Layers, Zap, Percent, Activity } from "lucide-react";
import { categories } from "@/lib/calculators";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";

import { Metadata } from "next";
import { CalculatorSchema } from "@/components/seo/calculator-schema";

export const metadata: Metadata = {
    title: "Home & Property Hub | UK Renovation & Utility Analytics",
    description: "Master your property plans and renovation budgets with our premium calculators. Precision tools for roofing, heating, glazing, and general home improvement.",
    alternates: {
        canonical: "/home-property"
    }
};

export default function HomePropertyLandingPage() {
    const category = categories.find(c => c.title === "Home & Property");

    if (!category) return null;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/10 pb-20 overflow-x-hidden pt-12">
            <BreadcrumbSchema items={[
                { name: "Home", item: "/" },
                { name: "Home & Property", item: "/home-property" }
            ]} />
            <CalculatorSchema
                title="Home & Property Hub | UK Renovation & Utility Analytics"
                description="Master your property plans and renovation budgets with our premium calculators. Precision tools for roofing, heating, glazing, and general home improvement."
                slug="/home-property"
                isArticle={true}
            />
            {/* --- UNIQUE HERO SECTION --- */}
            <section className="relative w-full min-h-[600px] flex items-center pt-24 pb-16 overflow-hidden">
                {/* Background Layer */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/home_property_hero.png"
                        alt="Home & Property Analytics"
                        fill
                        priority
                        className="object-cover object-center brightness-[0.7] dark:brightness-[0.4]"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-slate-50 dark:to-slate-950/50"></div>
                </div>

                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Hero Text */}
                        <div className="animate-in slide-in-from-left duration-700">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold mb-6 tracking-widest uppercase">
                                <Zap className="w-4 h-4 text-emerald-400" />
                                Architectural Intelligence v2.0
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight drop-shadow-2xl">
                                Property <br />
                                <span className="text-emerald-400 italic">Mastery.</span>
                            </h1>
                            <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-xl drop-shadow-lg">
                                Engineer your living space. Our precision estimators handle complex UK renovation costs, heating requirements, and structural investments with clinical accuracy.
                            </p>

                            {/* UNIQUE INFORMATION BAR */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-5 rounded-2xl group hover:bg-white/20 transition-all">
                                    <Hammer className="w-8 h-8 text-emerald-400 mb-3" />
                                    <h3 className="text-white font-bold text-sm mb-1 line-clamp-1">Renovation Scaling</h3>
                                    <p className="text-white/60 text-xs leading-relaxed">
                                        Analyze structural estimates and budget accurately for extensions, roofs, and core improvements.
                                    </p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-5 rounded-2xl group hover:bg-white/20 transition-all">
                                    <Thermometer className="w-8 h-8 text-amber-400 mb-3" />
                                    <h3 className="text-white font-bold text-sm mb-1 line-clamp-1">Utility Logic</h3>
                                    <p className="text-white/60 text-xs leading-relaxed">
                                        Real-time calibration for BTU requirements, heat pumps, and insulation savings.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* FLOATING DATA CARD */}
                        <div className="hidden lg:block relative group animate-in zoom-in duration-1000">
                            <div className="absolute -inset-4 bg-emerald-500/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl overflow-hidden">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                                            <Home className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-lg">Property Analytics</h4>
                                            <p className="text-white/50 text-xs">Dynamic investment tracking</p>
                                        </div>
                                    </div>
                                    <Percent className="w-6 h-6 text-white/30 animate-pulse" />
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold text-white/70 uppercase">
                                            <span>Energy Efficiency ROI</span>
                                            <span className="text-emerald-400">up to 40%</span>
                                        </div>
                                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-400 w-[75%] rounded-full shadow-[0_0_15px_rgba(52,211,153,0.5)]"></div>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-1">Strategic Insight</span>
                                        <p className="text-white/80 text-xs leading-relaxed italic">
                                            "Upgrading to double glazing or a heat pump can drastically lower UK utility bills while increasing long-term property valuation by 3-5%."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 max-w-7xl -mt-10 relative z-20">
                {/* Secondary Title for Category Grid */}
                <div className="mb-12 flex items-center gap-4">
                    <div className="h-10 w-2 bg-emerald-500 rounded-full"></div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter">
                        Precision Calculators <span className="text-emerald-500 tracking-widest text-sm align-middle ml-2">[{category.calculators.length}]</span>
                    </h2>
                </div>

                {/* Calculators Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.calculators.map((calc) => (
                        <Link key={calc.name} href={calc.href} className="group">
                            <Card className="h-full p-8 bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group-hover:border-emerald-500/50 flex flex-col">
                                <div className="mb-6 w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform duration-300">
                                    {calc.name.toLowerCase().includes('roof') || calc.name.toLowerCase().includes('glazing') || calc.name.toLowerCase().includes('fascia') ? <Layers className="w-7 h-7" /> : calc.name.toLowerCase().includes('tree') || calc.name.toLowerCase().includes('removal') ? <Home className="w-7 h-7" /> : calc.name.toLowerCase().includes('btu') || calc.name.toLowerCase().includes('heat') ? <Thermometer className="w-7 h-7" /> : <Wrench className="w-7 h-7" />}
                                </div>

                                <div className="mb-4">
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-emerald-500 transition-colors">
                                        {calc.name}
                                    </h2>
                                    <div className="h-1 w-12 bg-emerald-500/30 rounded-full group-hover:w-20 transition-all duration-300"></div>
                                </div>

                                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed grow">
                                    {calc.desc}
                                </p>

                                <div className="mt-auto flex items-center justify-between">
                                    <span className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                        Professional Tool
                                    </span>
                                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                                        <ChevronRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Footer Insight Card */}
                <div className="mt-16 bg-linear-to-br from-emerald-500/10 via-transparent to-emerald-500/5 border border-emerald-500/20 p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                        <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl shadow-xl group-hover:rotate-12 transition-transform duration-500">
                            <Activity className="w-12 h-12 text-emerald-500" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Property Intelligence Benchmarks</h3>
                            <p className="text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                                CalZone estimators use the latest UK market analysis for material costs, labor rates, and energy efficiency ROI. Guarantee your next project is grounded in solid, reliable intelligence.
                            </p>
                        </div>
                    </div>
                    {/* Decorative Blob */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                </div>
            </div>
        </div>
    );
}
