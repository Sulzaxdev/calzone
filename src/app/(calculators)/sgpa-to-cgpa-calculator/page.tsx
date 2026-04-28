import SGPAToCGPACalculator from "./calculator";
import Link from "next/link";
import { GraduationCap, BarChart3, ChevronRight, CheckCircle2 } from "lucide-react";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export default function SgpaToCgpaPage() {
    const faqs = [
        {
            question: "What is the difference between SGPA and CGPA?",
            answer: "SGPA (Semester Grade Point Average) is the average grade point obtained in a specific semester. CGPA (Cumulative Grade Point Average) is the average of all SGPAs across all semesters you have completed so far."
        },
        {
            question: "How is CGPA calculated from SGPA?",
            answer: "To calculate CGPA, you sum the (SGPA × Total Credits) for each semester and then divide the total sum by the total number of credits earned across all semesters."
        },
        {
            question: "Why can't I just average my SGPAs?",
            answer: "You can only average SGPAs if every semester has the exact same number of credit hours. Since most degrees have varying credit loads per semester, a weighted average is required for an accurate CGPA."
        },
        {
            question: "Can CGPA be higher than SGPA?",
            answer: "Yes, if your performance in previous semesters was better than your current semester, your CGPA could be higher than your current SGPA."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <div className="container mx-auto px-4 pt-12">
                <SGPAToCGPACalculator />
                <section className="mt-20 max-w-6xl mx-auto space-y-16">
                    <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 md:p-20 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none transition-all">
                        {/* Title and Intro */}
                        <div className="space-y-8 mb-16">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-3xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shadow-inner">
                                    <BarChart3 className="w-8 h-8 text-indigo-600" />
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                                    Academic Roadmap: <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Master Your SGPA to CGPA</span>
                                </h2>
                            </div>
                            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl font-medium">
                                Your academic journey is a marathon, not a sprint. While your SGPA measures your performance over a single semester, your CGPA is the ultimate indicator of your cumulative success.
                            </p>
                        </div>

                        {/* Detailed Long-Form Sections */}
                        <div className="space-y-24">
                            {/* Section 1: The Math of Accumulation */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">01</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">The Credit-Weighted Formula</h3>
                                </div>
                                <div className="grid lg:grid-cols-2 gap-16">
                                    <div className="space-y-8">
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            A common mistake students make is simply averaging their SGPAs. However, this is only accurate if every semester has the exact same number of credits. To get a true CGPA, you must use a weighted average: **CGPA = Σ(SGPA × Semester Credits) / Σ(Total Credits)**. 
                                        </p>
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            This means a 25-credit semester has more impact on your final grade than an 18-credit one. Our calculator handles these complex weightings automatically, giving you a precise cumulative score that matches your official transcript.
                                        </p>
                                    </div>
                                    <div className="bg-indigo-50/50 dark:bg-indigo-900/10 p-10 rounded-[3rem] border border-indigo-100 dark:border-indigo-800/50 flex flex-col justify-center">
                                        <div className="text-center space-y-4">
                                            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest font-mono">Cumulative Formula</div>
                                            <div className="text-2xl md:text-3xl font-black text-indigo-600 font-mono">
                                                CGPA = <br/>
                                                <div className="mt-4 border-t-2 border-indigo-200 pt-4">
                                                    (SGPA1 × C1) + (SGPA2 × C2) + ...<br/>
                                                    <div className="text-slate-300 my-2">÷</div>
                                                    Total Credits (C1 + C2 + ...)
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Graduation Honors */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">02</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">Tracking Graduation Honors</h3>
                                </div>
                                <div className="prose prose-slate dark:prose-invert max-w-none">
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Most universities award honors based on your final CGPA. Knowing your standing throughout your degree allows you to aim for specific benchmarks. While these vary by institution, the standard global classification is as follows:
                                    </p>
                                    <div className="grid md:grid-cols-3 gap-8 my-12">
                                        {[
                                            { title: "Summa Cum Laude", desc: "Top 1-5% of the class. Usually requires a CGPA of 3.9 - 4.0 or 9.5+.", icon: "🥇" },
                                            { title: "Magna Cum Laude", desc: "Top 10-15%. Usually requires a CGPA of 3.7 - 3.8 or 8.5+.", icon: "🥈" },
                                            { title: "Cum Laude", desc: "Top 20-25%. Usually requires a CGPA of 3.5 - 3.6 or 7.5+.", icon: "🥉" }
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

                            {/* Section 3: The Semester Bridge */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">03</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">Why Track Every Semester?</h3>
                                </div>
                                <div className="grid md:grid-cols-2 gap-12">
                                    <div className="p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                        <h4 className="text-xl font-bold mb-6 text-indigo-600">The Recovery Strategy</h4>
                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                            If you had a difficult first year, tracking your SGPA to CGPA shows you exactly how much higher you need to score in later semesters to bring your average back to your target. It helps you set realistic goals for your final years.
                                        </p>
                                    </div>
                                    <div className="p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                        <h4 className="text-xl font-bold mb-6 text-indigo-600">Scholarship Maintenance</h4>
                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                            Many scholarships require a cumulative average to be maintained rather than just a per-semester grade. Our tool prevents "GPA shocks" by keeping you informed of your running average in real-time.
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
                        <div className="mt-24 p-12 rounded-[3.5rem] bg-linear-to-br from-indigo-600 to-blue-700 text-white shadow-2xl relative overflow-hidden text-center md:text-left">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                                <div className="space-y-6 max-w-xl">
                                    <h3 className="text-3xl md:text-4xl font-black tracking-tight">Applying for a Job?</h3>
                                    <p className="text-indigo-100 text-lg leading-relaxed">
                                        Once you have your CGPA, convert it into a percentage. Many companies still use percentage cutoffs for their recruitment process.
                                    </p>
                                </div>
                                <Link href="/cgpa-to-percentage-calculator" className="px-12 py-6 bg-white text-indigo-600 rounded-[2rem] font-black text-xl hover:scale-105 transition-transform shadow-xl whitespace-nowrap">
                                    Convert to %
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
