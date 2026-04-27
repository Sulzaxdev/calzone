import CGPACalculator from "./calculator";
import Link from "next/link";
import { GraduationCap, Info, HelpCircle, CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { SocialShare } from "@/components/ui/social-share";

export default function CgpaToPercentPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <JsonLd 
                type="WebApplication"
                name="CGPA to Percentage Calculator"
                description="Easily convert your CGPA to percentage using our free online calculator. Supports 10.0, 5.0, and 4.0 grading scales."
                url="https://www.thecalzone.co.uk"
                path="/cgpa-to-percentage-calculator"
                faqs={[
                    {
                        question: "How to convert CGPA to percentage?",
                        answer: "For a 10.0 scale, the common formula is (CGPA * 9.5). For other scales, it is usually (Obtained CGPA / Total CGPA) * 100."
                    }
                ]}
            />
            <div className="container mx-auto px-4 pt-8">
                <Breadcrumbs items={[{ label: "Education", href: "/#education-calculators" }, { label: "CGPA to Percentage" }]} />
                <CGPACalculator />
                <SocialShare title="CGPA to Percentage Calculator" />

                <section className="mt-20 max-w-5xl mx-auto space-y-12">
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 md:p-16 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                                <GraduationCap className="w-8 h-8 text-[#1e5eb8]" />
                                How to Convert CGPA to Percentage?
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                Converting your CGPA to a percentage depends on the grading scale used by your university. For most international and UK standards (10.0 scale), a common formula is used to ensure fairness across different educational boards.
                            </p>
                            
                            <div className="grid md:grid-cols-2 gap-8 pt-6">
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold">The Standard Formula (10.0 Scale)</h3>
                                    <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 font-mono text-center">
                                        <span className="text-2xl font-black text-[#1e5eb8]">Percentage = CGPA × 9.5</span>
                                    </div>
                                    <p className="text-sm text-slate-500 italic">Example: If your CGPA is 8.5, your percentage would be 8.5 × 9.5 = 80.75%.</p>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold">Why 9.5?</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                        Many academic boards (like CBSE) use the 9.5 multiplier because it historically represents the mean of the top 5% of candidates' marks. This provides a more balanced conversion than a simple multiply-by-10 logic.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 pt-12 border-t border-slate-100 dark:border-slate-800 space-y-8">
                            <h2 className="text-2xl font-black">Why Accuracy Matters in Grade Conversion</h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Accurate conversion is critical when applying for higher education, visas, or employment. Most employers and universities require your marks in a specific format (either Percentage or GPA). Using our <strong>CGPA to Percentage Calculator</strong> ensures you meet these requirements with precision.
                            </p>
                            
                            <div className="grid sm:grid-cols-3 gap-6">
                                {[
                                    { title: "University Apps", desc: "Meets international admission standards." },
                                    { title: "Job Applications", desc: "Provides clarity for HR and recruiters." },
                                    { title: "Visa Processing", desc: "Required for many student visa categories." }
                                ].map((item, i) => (
                                    <div key={i} className="p-6 rounded-3xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100/50 dark:border-blue-800">
                                        <h4 className="font-bold text-[#1e5eb8] dark:text-blue-400 mb-2">{item.title}</h4>
                                        <p className="text-xs text-slate-500">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-16 pt-12 border-t border-slate-100 dark:border-slate-800 space-y-8">
                            <h2 className="text-2xl font-black flex items-center gap-3">
                                <HelpCircle className="w-6 h-6 text-indigo-500" />
                                Frequently Asked Questions
                            </h2>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h4 className="font-bold">Is this calculator valid for all universities?</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Our tool uses the most common academic multipliers. However, some specific universities may have unique conversion charts. Always verify with your official transcript guidelines.</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-bold">What is the difference between CGPA and SGPA?</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">SGPA (Semester Grade Point Average) is for a single semester, while CGPA (Cumulative Grade Point Average) is the average of all SGPAs across all semesters.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Inter-linking Footer */}
                    <div className="p-8 rounded-[2.5rem] bg-[#1e5eb8] text-white text-center">
                        <h3 className="text-2xl font-bold mb-4">Planning Your Next Career Move?</h3>
                        <p className="opacity-80 mb-8">Once you have your grades ready, use our other professional tools to plan your future.</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/salary-calculator-uk" className="px-6 py-3 bg-white text-[#1e5eb8] rounded-2xl font-bold hover:scale-105 transition-transform">Salary Calculator</Link>
                            <Link href="/income-tax-calculator-uk" className="px-6 py-3 bg-white/10 text-white border border-white/20 rounded-2xl font-bold hover:bg-white/20 transition-colors">Tax Calculator</Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
