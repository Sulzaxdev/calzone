import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ChevronRight, Coffee, BookOpen, PenTool, Brain, Sparkles, Percent, Cpu } from "lucide-react";
import { categories } from "@/lib/calculators";

export const metadata = {
    title: "Misc & Lifestyle Hub | Education & Life Analytics",
    description: "Navigate life's varied metrics with our specialized calculators. Precision tools for university grades, tattoo pricing, and everyday curiosities.",
};

export default function MiscLifestyleLandingPage() {
    const category = categories.find(c => c.title === "Misc & Lifestyle");

    if (!category) return null;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/10 pb-20 overflow-x-hidden pt-12">
            {/* --- UNIQUE HERO SECTION --- */}
            <section className="relative w-full min-h-[600px] flex items-center pt-24 pb-16 overflow-hidden">
                {/* Background Layer */}
                <div className="absolute inset-0 z-0 bg-slate-900">
                    <Image
                        src="/misc_lifestyle_hero.png"
                        alt="Misc & Lifestyle Intelligence"
                        fill
                        priority
                        className="object-cover object-center brightness-[0.6] dark:brightness-[0.3]"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-slate-50 dark:to-slate-950/50"></div>
                </div>

                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Hero Text */}
                        <div className="animate-in slide-in-from-left duration-700">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold mb-6 tracking-widest uppercase">
                                <Sparkles className="w-4 h-4 text-fuchsia-400" />
                                Lifestyle Intelligence v2.0
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight drop-shadow-2xl">
                                Curated <br />
                                <span className="text-fuchsia-400 italic">Curiosity.</span>
                            </h1>
                            <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-xl drop-shadow-lg">
                                Measure the unmeasurable. From calculating complex university degree classifications to estimating the cost of custom body art, our diverse tools provide clarity exactly where you need it.
                            </p>

                            {/* UNIQUE INFORMATION BAR */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-5 rounded-2xl group hover:bg-white/20 transition-all">
                                    <BookOpen className="w-8 h-8 text-fuchsia-400 mb-3" />
                                    <h3 className="text-white font-bold text-sm mb-1 line-clamp-1">Academic Scaling</h3>
                                    <p className="text-white/60 text-xs leading-relaxed">
                                        Analyze university module weightings to project your final degree classification.
                                    </p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-5 rounded-2xl group hover:bg-white/20 transition-all">
                                    <PenTool className="w-8 h-8 text-cyan-400 mb-3" />
                                    <h3 className="text-white font-bold text-sm mb-1 line-clamp-1">Creative Estimations</h3>
                                    <p className="text-white/60 text-xs leading-relaxed">
                                        Calibrated pricing models for bespoke services like tattoo artistry and design.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* FLOATING DATA CARD */}
                        <div className="hidden lg:block relative group animate-in zoom-in duration-1000">
                            <div className="absolute -inset-4 bg-fuchsia-500/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl overflow-hidden">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-fuchsia-500/20 flex items-center justify-center border border-fuchsia-500/30">
                                            <Coffee className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-lg">Lifestyle Analytics</h4>
                                            <p className="text-white/50 text-xs">Dynamic metric tracking</p>
                                        </div>
                                    </div>
                                    <Percent className="w-6 h-6 text-white/30 animate-pulse" />
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold text-white/70 uppercase">
                                            <span>Academic Confidence Limit</span>
                                            <span className="text-fuchsia-400">95%</span>
                                        </div>
                                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-fuchsia-400 w-[95%] rounded-full shadow-[0_0_15px_rgba(232,121,249,0.5)]"></div>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-fuchsia-500/10 rounded-2xl border border-fuchsia-500/20">
                                        <span className="text-[10px] font-bold text-fuchsia-400 uppercase tracking-widest block mb-1">Strategic Insight</span>
                                        <p className="text-white/80 text-xs leading-relaxed italic">
                                            "Proactive academic tracking allows UK students to adjust their study focus in real-time, significantly improving their chances of achieving a First-Class Honours degree."
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
                    <div className="h-10 w-2 bg-fuchsia-500 rounded-full"></div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter">
                        Precision Calculators <span className="text-fuchsia-500 tracking-widest text-sm align-middle ml-2">[{category.calculators.length}]</span>
                    </h2>
                </div>

                {/* Calculators Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.calculators.map((calc) => (
                        <Link key={calc.name} href={calc.href} className="group">
                            <Card className="h-full p-8 bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group-hover:border-fuchsia-500/50 flex flex-col">
                                <div className="mb-6 w-14 h-14 rounded-2xl bg-fuchsia-500/10 flex items-center justify-center text-fuchsia-500 group-hover:scale-110 transition-transform duration-300">
                                    {calc.name.toLowerCase().includes('grade') || calc.name.toLowerCase().includes('university') ? <BookOpen className="w-7 h-7" /> : calc.name.toLowerCase().includes('tattoo') ? <PenTool className="w-7 h-7" /> : <Brain className="w-7 h-7" />}
                                </div>

                                <div className="mb-4">
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-fuchsia-500 transition-colors">
                                        {calc.name}
                                    </h2>
                                    <div className="h-1 w-12 bg-fuchsia-500/30 rounded-full group-hover:w-20 transition-all duration-300"></div>
                                </div>

                                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed grow">
                                    {calc.desc}
                                </p>

                                <div className="mt-auto flex items-center justify-between">
                                    <span className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                        Lifestyle Tool
                                    </span>
                                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-fuchsia-500 group-hover:text-white transition-all duration-300">
                                        <ChevronRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Footer Insight Card */}
                <div className="mt-16 bg-linear-to-br from-fuchsia-500/10 via-transparent to-fuchsia-500/5 border border-fuchsia-500/20 p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                        <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl shadow-xl group-hover:rotate-12 transition-transform duration-500">
                            <Cpu className="w-12 h-12 text-fuchsia-500" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Curiosity Meets Computation</h3>
                            <p className="text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                                We believe precision shouldn't be limited to just finance and fitness. Our miscellaneous calculators bring the same level of granular detail and algorithmic accuracy to the niche corners of daily life.
                            </p>
                        </div>
                    </div>
                    {/* Decorative Blob */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                </div>
            </div>
        </div>
    );
}
