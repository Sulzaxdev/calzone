import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ChevronRight, Moon, Star, Clock, Brain, Activity, Percent, HeartPulse } from "lucide-react";
import { categories } from "@/lib/calculators";

export const metadata = {
    title: "Sleep Optimization Hub | Rest & Recovery Analytics",
    description: "Master your circadian rhythm and optimize recovery. Precision tools for calculating sleep debt, assessing sleepiness scales, and planning wake times.",
};

export default function SleepLandingPage() {
    const category = categories.find(c => c.title === "Sleep");

    if (!category) return null;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/20 pb-20 overflow-x-hidden pt-12">
            {/* --- UNIQUE HERO SECTION --- */}
            <section className="relative w-full min-h-[600px] flex items-center pt-24 pb-16 overflow-hidden">
                {/* Background Layer */}
                <div className="absolute inset-0 z-0 bg-slate-950">
                    <Image
                        src="/sleep_hero.png"
                        alt="Sleep & Recovery Analytics"
                        fill
                        priority
                        className="object-cover object-center brightness-[0.5] dark:brightness-[0.3]"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-slate-50 dark:to-slate-950/20"></div>
                </div>

                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Hero Text */}
                        <div className="animate-in slide-in-from-left duration-700">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 backdrop-blur-md border border-indigo-400/30 text-indigo-100 text-xs font-bold mb-6 tracking-widest uppercase">
                                <Moon className="w-4 h-4 text-indigo-400" />
                                Rest Intelligence v2.0
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight drop-shadow-2xl">
                                Deep <br />
                                <span className="text-indigo-400 italic">Recovery.</span>
                            </h1>
                            <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-xl drop-shadow-lg">
                                Engineer your rest. Our circadian analytical tools measure cumulative sleep debt and daytime fatigue to help you optimize cognitive performance and long-term health.
                            </p>

                            {/* UNIQUE INFORMATION BAR */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-indigo-950/40 backdrop-blur-xl border border-indigo-500/20 p-5 rounded-2xl group hover:bg-indigo-900/50 transition-all">
                                    <Clock className="w-8 h-8 text-indigo-400 mb-3" />
                                    <h3 className="text-white font-bold text-sm mb-1 line-clamp-1">Sleep Debt Tracking</h3>
                                    <p className="text-indigo-200/70 text-xs leading-relaxed">
                                        Calculate the exact deficit in your nightly rest and plan a clinical recovery protocol.
                                    </p>
                                </div>
                                <div className="bg-indigo-950/40 backdrop-blur-xl border border-indigo-500/20 p-5 rounded-2xl group hover:bg-indigo-900/50 transition-all">
                                    <Brain className="w-8 h-8 text-cyan-400 mb-3" />
                                    <h3 className="text-white font-bold text-sm mb-1 line-clamp-1">Cognitive Readiness</h3>
                                    <p className="text-indigo-200/70 text-xs leading-relaxed">
                                        Assess daytime sleepiness using clinical scales to determine neurological fatigue.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* FLOATING DATA CARD */}
                        <div className="hidden lg:block relative group animate-in zoom-in duration-1000">
                            <div className="absolute -inset-4 bg-indigo-500/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl overflow-hidden">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                                            <Star className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-lg">Circadian Analytics</h4>
                                            <p className="text-indigo-200/50 text-xs">Dynamic rest cycle tracking</p>
                                        </div>
                                    </div>
                                    <Percent className="w-6 h-6 text-white/30 animate-pulse" />
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold text-indigo-200/70 uppercase">
                                            <span>REM Cycle Optimization</span>
                                            <span className="text-indigo-400">Peak Efficiency</span>
                                        </div>
                                        <div className="h-2 bg-indigo-950/50 rounded-full overflow-hidden">
                                            <div className="h-full bg-indigo-400 w-[85%] rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block mb-1">Strategic Insight</span>
                                        <p className="text-indigo-100/80 text-xs leading-relaxed italic">
                                            "Consistently resolving sleep debt by just 30-45 minutes per night can dramatically reduce cortisol spikes, lower blood pressure, and improve insulin sensitivity within essentially two weeks."
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
                    <div className="h-10 w-2 bg-indigo-500 rounded-full"></div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter">
                        Precision Calculators <span className="text-indigo-500 tracking-widest text-sm align-middle ml-2">[{category.calculators.length}]</span>
                    </h2>
                </div>

                {/* Calculators Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.calculators.map((calc) => (
                        <Link key={calc.name} href={calc.href} className="group">
                            <Card className="h-full p-8 bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group-hover:border-indigo-500/50 flex flex-col">
                                <div className="mb-6 w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform duration-300">
                                    {calc.name.toLowerCase().includes('debt') ? <Clock className="w-7 h-7" /> : <Brain className="w-7 h-7" />}
                                </div>

                                <div className="mb-4">
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-indigo-500 transition-colors">
                                        {calc.name}
                                    </h2>
                                    <div className="h-1 w-12 bg-indigo-500/30 rounded-full group-hover:w-20 transition-all duration-300"></div>
                                </div>

                                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed grow">
                                    {calc.desc}
                                </p>

                                <div className="mt-auto flex items-center justify-between">
                                    <span className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                        Recovery Tool
                                    </span>
                                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                                        <ChevronRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Footer Insight Card */}
                <div className="mt-16 bg-linear-to-br from-indigo-500/10 via-transparent to-indigo-500/5 border border-indigo-500/20 p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                        <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl shadow-xl group-hover:rotate-12 transition-transform duration-500">
                            <HeartPulse className="w-12 h-12 text-indigo-500" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">The Science of Slumber</h3>
                            <p className="text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                                Treating sleep as an active, calculated process is the hallmark of top-tier cognitive and physical performance. Leverage CalZone to systematically monitor and improve your neurological downtime.
                            </p>
                        </div>
                    </div>
                    {/* Decorative Blob */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                </div>
            </div>
        </div>
    );
}
