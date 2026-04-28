import PercentageToCGPACalculator from "./calculator";
import Link from "next/link";
import { GraduationCap, ArrowRightLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export default function PercentToCgpaPage() {
    const faqs = [
        {
            question: "How do I convert percentage to CGPA?",
            answer: "The most common formula for a 10.0 scale is: CGPA = Percentage / 9.5. For example, if you have 76%, your CGPA would be 76 / 9.5 = 8.0."
        },
        {
            question: "Is this the same for all universities?",
            answer: "No. Some universities use a direct division by 10 (CGPA = % / 10), while others have specific conversion tables. Always verify with your institution's specific policy."
        },
        {
            question: "What is a good CGPA?",
            answer: "On a 10.0 scale, a CGPA above 8.0 is generally considered very good, while above 9.0 is excellent. On a 4.0 scale, above 3.5 is considered high."
        },
        {
            question: "Why do universities use CGPA instead of percentage?",
            answer: "CGPA allows for a more nuanced assessment of a student's performance over time, reducing the impact of a single bad exam and focusing on consistent academic achievement."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <div className="container mx-auto px-4 pt-12">
                <PercentageToCGPACalculator />

                <section className="mt-20 max-w-6xl mx-auto space-y-16">
                    <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 md:p-20 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none transition-all">
                        {/* Title and Intro */}
                        <div className="space-y-8 mb-16">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-3xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shadow-inner">
                                    <ArrowRightLeft className="w-8 h-8 text-blue-600" />
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                                    Reverse Conversion: <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Percentage to CGPA Guide</span>
                                </h2>
                            </div>
                            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl font-medium">
                                While many schools provide results in percentages, modern professional and academic standards increasingly favor the Cumulative Grade Point Average (CGPA). Converting your percentage back to a CGPA is essential for standardized applications.
                            </p>
                        </div>

                        {/* Detailed Long-Form Sections */}
                        <div className="space-y-24">
                            {/* Section 1: The Inverse Formula */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">01</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">The Reverse 9.5 Formula</h3>
                                </div>
                                <div className="grid lg:grid-cols-2 gap-16">
                                    <div className="space-y-8">
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            To convert your percentage into a CGPA on a 10-point scale, the most widely accepted method is dividing your percentage by 9.5. This is the exact inverse of the formula used by major academic boards to convert CGPA to percentage.
                                        </p>
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            For instance, if your overall percentage is 85.5%, your CGPA calculation would be: **85.5 ÷ 9.5 = 9.0**. This standardized approach ensures that your academic record remains consistent across different platforms and application portals. Our calculator automates this precision, providing you with an instant, accurate result.
                                        </p>
                                    </div>
                                    <div className="bg-blue-50/50 dark:bg-blue-900/10 p-10 rounded-[3rem] border border-blue-100 dark:border-blue-800/50 flex flex-col justify-center">
                                        <div className="text-center space-y-4">
                                            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest font-mono">The Calculation</div>
                                            <div className="text-3xl md:text-4xl font-black text-blue-600 font-mono">
                                                CGPA = <br/>
                                                <div className="mt-4 border-t-2 border-blue-200 pt-4">
                                                    Percentage (%)<br/>
                                                    <div className="text-slate-300 my-2">÷ 9.5</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Why Convert? */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">02</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">Why CGPA Matters Now</h3>
                                </div>
                                <div className="prose prose-slate dark:prose-invert max-w-none">
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                        The shift from percentages to CGPA is part of a global trend toward a more holistic assessment of student performance. CGPA reduces the intense pressure of raw marks and provides a more stable metric for long-term academic evaluation.
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-12 my-12">
                                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 shadow-sm">
                                            <h4 className="text-xl font-bold mb-4">Standardized Recruitment</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed">
                                                Multinational corporations (MNCs) often use automated Applicant Tracking Systems (ATS) that require grades in a CGPA format (usually 4.0 or 10.0 scale). Failing to provide the correct format can lead to your application being filtered out prematurely.
                                            </p>
                                        </div>
                                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 shadow-sm">
                                            <h4 className="text-xl font-bold mb-4">International Education</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed">
                                                When applying for Master's or PhD programs abroad, your raw percentage is often less important than your converted CGPA. Admissions committees use it to compare you against applicants from diverse grading systems.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Professional Resume Tips */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">03</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">Resume Optimization</h3>
                                </div>
                                <div className="grid md:grid-cols-3 gap-8">
                                    {[
                                        { title: "Dual Reporting", effect: "For maximum clarity, list both your raw percentage and the converted CGPA on your CV." },
                                        { title: "Scaling Proof", effect: "Always mention the scale (e.g., 'on a 10.0 scale') to avoid confusion with the 4.0 US scale." },
                                        { title: "Methodology", effect: "If space permits, add a small footnote explaining the conversion factor (e.g., 'Converted using the 9.5 factor')." }
                                    ].map((item, i) => (
                                        <div key={i} className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-inner">
                                            <h4 className="font-black text-blue-600 mb-4 uppercase text-sm tracking-widest">{item.title}</h4>
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
                        <div className="mt-24 p-12 rounded-[3.5rem] bg-linear-to-br from-blue-600 to-indigo-700 text-white shadow-2xl relative overflow-hidden text-center md:text-left">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                                <div className="space-y-6 max-w-xl">
                                    <h3 className="text-3xl md:text-4xl font-black tracking-tight">Need to calculate SGPA?</h3>
                                    <p className="text-blue-100 text-lg leading-relaxed">
                                        Calculate your semester progress or convert between different GPA scales with our full suite of tools.
                                    </p>
                                </div>
                                <Link href="/sgpa-to-percentage-calculator" className="px-12 py-6 bg-white text-blue-600 rounded-[2rem] font-black text-xl hover:scale-105 transition-transform shadow-xl whitespace-nowrap">
                                    SGPA to %
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

