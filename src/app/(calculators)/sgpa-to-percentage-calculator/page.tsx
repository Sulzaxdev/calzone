import SGPAToPercentageCalculator from "./calculator";
import Link from "next/link";
import { GraduationCap, Percent, ChevronRight, CheckCircle2 } from "lucide-react";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export default function SgpaToPercentPage() {
    const faqs = [
        {
            question: "How do I convert SGPA to percentage?",
            answer: "For most 10.0 scale systems, the formula is: Percentage = (SGPA - 0.75) × 10. Some institutions use the standard (SGPA × 10) or (SGPA × 9.5). Our calculator supports all common academic standards."
        },
        {
            question: "Why convert SGPA instead of CGPA?",
            answer: "You may need your percentage for a specific semester when applying for internships, scholarships, or semester-wise performance analysis. It helps in identifying your growth trend."
        },
        {
            question: "Is the conversion factor the same for all semesters?",
            answer: "Yes, usually the conversion formula remains constant throughout your degree program, unless the university changes its grading policy mid-way."
        },
        {
            question: "What is a 7.5 SGPA in percentage?",
            answer: "Using the standard (SGPA - 0.75) × 10 formula, a 7.5 SGPA would be (7.5 - 0.75) × 10 = 67.5%."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <div className="container mx-auto px-4 pt-12">
                <SGPAToPercentageCalculator />

                <section className="mt-20 max-w-6xl mx-auto space-y-16">
                    <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 md:p-20 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none transition-all">
                        {/* Title and Intro */}
                        <div className="space-y-8 mb-16">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-3xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center shadow-inner">
                                    <Percent className="w-8 h-8 text-teal-600" />
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                                    Semester Success: <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">SGPA to Percentage Deep Dive</span>
                                </h2>
                            </div>
                            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl font-medium">
                                Your Semester Grade Point Average (SGPA) is the heartbeat of your academic record. Understanding how it translates to a percentage is key for scholarships, internships, and graduation planning.
                            </p>
                        </div>

                        {/* Detailed Long-Form Sections */}
                        <div className="space-y-24">
                            {/* Section 1: The Core Formula */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">01</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">The Standard Conversion Formula</h3>
                                </div>
                                <div className="grid lg:grid-cols-2 gap-16">
                                    <div className="space-y-8">
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            In many 10-point grading systems, the standard formula for converting SGPA to percentage is: **Percentage = (SGPA - 0.75) × 10**. This formula is designed to account for the grading curve and provides a realistic percentage that correlates with traditional marking systems.
                                        </p>
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            For example, if you earned an 8.25 SGPA in your second semester, the calculation would be: (8.25 - 0.75) × 10 = 75%. This specific factor ensures that a high SGPA doesn't lead to an inflated percentage, maintaining the integrity of the grading system across different academic boards. Our calculator automates this for all major standards.
                                        </p>
                                    </div>
                                    <div className="bg-teal-50/50 dark:bg-teal-900/10 p-10 rounded-[3rem] border border-teal-100 dark:border-teal-800/50 flex flex-col justify-center">
                                        <div className="text-center space-y-4">
                                            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest font-mono">The Universal Formula</div>
                                            <div className="text-3xl md:text-4xl font-black text-teal-600 font-mono">
                                                Percentage (%) =<br/>
                                                <span className="text-5xl md:text-6xl text-slate-900 dark:text-white">(SGPA - 0.75) × 10</span>
                                            </div>
                                            <div className="pt-4 text-xs text-slate-400 italic">Commonly used by Mumbai University, VTU, and CBSE.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Why Convert SGPA? */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">02</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">The Purpose of Conversion</h3>
                                </div>
                                <div className="prose prose-slate dark:prose-invert max-w-none">
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                        While your final degree uses CGPA, individual semester percentages are often required for a variety of short-term goals. Keeping track of these allows you to analyze your academic journey with greater precision.
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-12 my-12">
                                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 shadow-sm">
                                            <h4 className="text-xl font-bold mb-4">Internship Eligibility</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed">
                                                Many summer internship programs require you to submit your most recent semester's percentage. Since many recruitment portals aren't updated for SGPA scales, having your converted percentage ready is a major advantage.
                                            </p>
                                        </div>
                                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 shadow-sm">
                                            <h4 className="text-xl font-bold mb-4">Semester Trend Analysis</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed">
                                                Converting your SGPA to percentage allows you to easily visualize your growth. It's often easier to see the difference between 68% and 74% than it is between a 7.55 and a 8.15 SGPA.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Professional Application */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">03</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">Career & Documentation</h3>
                                </div>
                                <div className="grid md:grid-cols-3 gap-8">
                                    {[
                                        { title: "Campus Placement", effect: "HR filters often look for consistent first-division (60%+) performance across all semesters." },
                                        { title: "Scholarship Portals", effect: "State and national scholarship applications frequently require marks in raw percentage format." },
                                        { title: "Official Verification", effect: "When your marksheet is verified by third-party agencies, they often use these formulas to cross-check authenticity." }
                                    ].map((item, i) => (
                                        <div key={i} className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-inner">
                                            <h4 className="font-black text-teal-600 mb-4 uppercase text-sm tracking-widest">{item.title}</h4>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.effect}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* FAQ Section */}
                            <div className="pt-20">
                                <FAQAccordion faqs={faqs} />
                            </div>
                        </div>

                        {/* CTA Footer */}
                        <div className="mt-24 p-12 rounded-[3.5rem] bg-linear-to-br from-teal-600 to-emerald-700 text-white shadow-2xl relative overflow-hidden text-center md:text-left">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                                <div className="space-y-6 max-w-xl">
                                    <h3 className="text-3xl md:text-4xl font-black tracking-tight">Need your total CGPA?</h3>
                                    <p className="text-teal-100 text-lg leading-relaxed">
                                        Once you've calculated your semester percentages, use our SGPA to CGPA tool to see your overall academic standing.
                                    </p>
                                </div>
                                <Link href="/sgpa-to-cgpa-calculator" className="px-12 py-6 bg-white text-teal-600 rounded-[2rem] font-black text-xl hover:scale-105 transition-transform shadow-xl whitespace-nowrap">
                                    Calculate CGPA
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

