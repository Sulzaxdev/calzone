import FinalGradeCalculator from "./calculator";
import Link from "next/link";
import { GraduationCap, Target, ChevronRight, CheckCircle2 } from "lucide-react";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export default function FinalGradePage() {
    const faqs = [
        {
            question: "How do I calculate what score I need on my final?",
            answer: "The formula is: Required Final Score = (Target Grade - (Current Grade × (1 - Final Weight))) / Final Weight. For example, if you have an 80% currently and want a 90% total, and the final is worth 20%, you need (90 - (80 × 0.8)) / 0.2 = 130% (which might be impossible without extra credit!)."
        },
        {
            question: "What is 'final weight'?",
            answer: "Final weight is the percentage of your total course grade that the final exam represents. This is usually found in your course syllabus."
        },
        {
            question: "Can I use this for any target grade?",
            answer: "Yes. You can see what you need for an A, B, or just to pass the course. It helps you prioritize your study time across different subjects."
        },
        {
            question: "What if I need more than 100% on the final?",
            answer: "If the calculator says you need more than 100%, it means your target grade is mathematically impossible based on your current performance, unless your teacher offers extra credit."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <div className="container mx-auto px-4 pt-12">
                <FinalGradeCalculator />

                <section className="mt-20 max-w-6xl mx-auto space-y-16">
                    <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 md:p-20 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none transition-all">
                        {/* Title and Intro */}
                        <div className="space-y-8 mb-16">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-3xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center shadow-inner">
                                    <Target className="w-8 h-8 text-rose-600" />
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                                    Strategic Finals: <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-red-600">Master Your Final Grade</span>
                                </h2>
                            </div>
                            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl font-medium">
                                Finals week is the ultimate academic challenge. Our Final Grade Calculator is designed to give you clarity and control, helping you determine exactly what you need to achieve your goals.
                            </p>
                        </div>

                        {/* Detailed Long-Form Sections */}
                        <div className="space-y-24">
                            {/* Section 1: The Math of Finals */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">01</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">The Required Score Formula</h3>
                                </div>
                                <div className="grid lg:grid-cols-2 gap-16">
                                    <div className="space-y-8">
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            Ever wondered "What do I need on the final to get an A?" The math depends on your current grade and the "weight" of the final exam. The formula is: **Required Score = (Target - (Current × (1 - w))) / w**, where 'w' is the weight of the final as a decimal.
                                        </p>
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            For example, if you have an 85% currently, want a 90% total, and the final is worth 25%, you need a 105% on the final. This calculation tells you immediately if your goal is realistic or if you need to adjust your expectations (or look for extra credit!).
                                        </p>
                                    </div>
                                    <div className="bg-rose-50/50 dark:bg-rose-900/10 p-10 rounded-[3rem] border border-rose-100 dark:border-rose-800/50 flex flex-col justify-center">
                                        <div className="text-center space-y-4">
                                            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest font-mono">The Calculation</div>
                                            <div className="text-2xl md:text-3xl font-black text-rose-600 font-mono">
                                                Final % = <br/>
                                                <div className="mt-4 border-t-2 border-rose-200 pt-4">
                                                    Target - (Current × (1 - Weight))<br/>
                                                    <div className="text-slate-300 my-2">÷</div>
                                                    Weight
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Study Prioritization */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">02</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">Strategic Prioritization</h3>
                                </div>
                                <div className="prose prose-slate dark:prose-invert max-w-none">
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                        During finals week, time is your most valuable resource. Using this calculator for all your classes allows you to categorize them into three priority levels:
                                    </p>
                                    <div className="grid md:grid-cols-3 gap-8 my-12">
                                        {[
                                            { title: "Safe Zone", desc: "Classes where you only need a low score to maintain your current grade. Lower study priority.", icon: "✅" },
                                            { title: "The Buffer Zone", desc: "Classes where a reasonable effort will secure your target. Medium priority.", icon: "⚖️" },
                                            { title: "Critical Zone", desc: "Classes where you need a very high score to reach or protect a grade. Maximum priority.", icon: "🔥" }
                                        ].map((item, i) => (
                                            <div key={i} className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 shadow-sm text-center group hover:scale-105 transition-transform">
                                                <div className="text-4xl mb-4">{item.icon}</div>
                                                <h4 className="text-xl font-black mb-2">{item.title}</h4>
                                                <p className="text-slate-500 text-sm leading-tight">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Grade Protection */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">03</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">Protecting Your GPA</h3>
                                </div>
                                <div className="grid md:grid-cols-2 gap-12">
                                    <div className="p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                        <h4 className="text-xl font-bold mb-6 text-rose-600">The Minimum to Pass</h4>
                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                            In tough subjects, the goal might simply be to pass (usually 60% or 70%). Our calculator can show you the absolute minimum you need to score to avoid failing the course, which can provide immense peace of mind.
                                        </p>
                                    </div>
                                    <div className="p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                        <h4 className="text-xl font-bold mb-6 text-rose-600">Extra Credit Impact</h4>
                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                            If your required score is above 100%, it's time to talk to your instructor. Many offer extra credit assignments or "grade replacement" policies. Use your calculated deficit as a starting point for these conversations.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* FAQ Section */}
                            <div className="pt-20">
                                <FAQAccordion faqs={faqs} />
                            </div>
                        </div>

                        {/* CTA Footer */}
                        <div className="mt-24 p-12 rounded-[3.5rem] bg-linear-to-br from-rose-600 to-red-700 text-white shadow-2xl relative overflow-hidden text-center md:text-left">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                                <div className="space-y-6 max-w-xl">
                                    <h3 className="text-3xl md:text-4xl font-black tracking-tight">GPA at Stake?</h3>
                                    <p className="text-rose-100 text-lg leading-relaxed">
                                        Don't let one bad final ruin your cumulative standing. Check your current GPA and see how this semester will affect it.
                                    </p>
                                </div>
                                <Link href="/gpa-calculator" className="px-12 py-6 bg-white text-rose-600 rounded-[2rem] font-black text-xl hover:scale-105 transition-transform shadow-xl whitespace-nowrap">
                                    GPA Calculator
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

