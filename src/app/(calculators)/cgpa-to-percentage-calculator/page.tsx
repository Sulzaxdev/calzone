import CGPACalculator from "./calculator";
import Link from "next/link";
import { GraduationCap, Info, HelpCircle, CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { SocialShare } from "@/components/ui/social-share";
import { FAQAccordion } from "@/components/ui/faq-accordion";

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

                <section className="mt-20 max-w-6xl mx-auto space-y-16">
                    <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 md:p-20 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none transition-all">
                        {/* Title and Intro */}
                        <div className="space-y-8 mb-16">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-3xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shadow-inner">
                                    <GraduationCap className="w-8 h-8 text-[#1e5eb8]" />
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                                    Global Grading: <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-[#1e5eb8]">CGPA to Percentage Decoded</span>
                                </h2>
                            </div>
                            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl font-medium">
                                Converting your Cumulative Grade Point Average (CGPA) to a percentage is more than just a math problem—it's a critical step in translating your academic success for global opportunities.
                            </p>
                        </div>

                        {/* Detailed Long-Form Sections */}
                        <div className="space-y-24">
                            {/* Section 1: The Multiplier Mystery */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">01</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">The 9.5 Multiplier Explained</h3>
                                </div>
                                <div className="grid lg:grid-cols-2 gap-16">
                                    <div className="space-y-8">
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            The most common question students ask is: "Why multiply by 9.5 and not 10?" This standard was popularized by major academic boards like CBSE. The 9.5 factor was derived by calculating the mean of the top 5% of candidates' marks over a period of 20 years. 
                                        </p>
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            Using a direct 10x multiplier would often lead to an "inflation" of scores that doesn't accurately reflect the difficulty of the exams. The 9.5 factor provides a statistically sound bridge between the GPA and the raw percentage, ensuring your grade is respected by both local and international institutions.
                                        </p>
                                    </div>
                                    <div className="bg-blue-50/50 dark:bg-blue-900/10 p-10 rounded-[3rem] border border-blue-100 dark:border-blue-800/50 flex flex-col justify-center">
                                        <div className="text-center space-y-4">
                                            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest font-mono">The Standard Calculation</div>
                                            <div className="text-3xl md:text-4xl font-black text-[#1e5eb8] font-mono">
                                                Percentage (%) =<br/>
                                                <span className="text-5xl md:text-6xl text-slate-900 dark:text-white">CGPA × 9.5</span>
                                            </div>
                                            <div className="pt-4 text-xs text-slate-400">Example: 8.4 CGPA = 79.8%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: University Specifics */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">02</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">University Variations</h3>
                                </div>
                                <div className="prose prose-slate dark:prose-invert max-w-none">
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                        While 9.5 is the most common multiplier, it's not universal. Different universities use different systems based on their specific historical grading curves. Our calculator supports multiple scales to ensure you get the right number for your specific needs.
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-12 my-12">
                                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 shadow-sm">
                                            <h4 className="text-xl font-bold mb-4">Engineering & Technical Schools</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed">
                                                Many technical universities use a direct (CGPA - 0.75) × 10 formula or specific conversion tables provided on the back of the official transcript. Always cross-reference our results with your official university guidelines.
                                            </p>
                                        </div>
                                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 shadow-sm">
                                            <h4 className="text-xl font-bold mb-4">International Equivalencies</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed">
                                                When applying to schools in the UK or US, your percentage is often converted again into a 4.0 scale or a "First Class / Second Class" classification. Precision at this stage prevents errors in your final application.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Professional Impact */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">03</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">The Career Link</h3>
                                </div>
                                <div className="grid md:grid-cols-3 gap-8">
                                    {[
                                        { title: "Public Sector Exams", effect: "Many government jobs require a minimum 60% or 65% aggregate, regardless of your CGPA." },
                                        { title: "MNC Recruitment", effect: "Global firms like Google or Deloitte often use percentage cutoffs to filter thousands of entry-level applications." },
                                        { title: "Visa Documentation", effect: "For many European and Australian visas, a clear percentage conversion is required to prove academic eligibility." }
                                    ].map((item, i) => (
                                        <div key={i} className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-inner">
                                            <h4 className="font-black text-[#1e5eb8] mb-4 uppercase text-sm tracking-widest">{item.title}</h4>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.effect}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* FAQ Section */}
                            <div className="pt-20">
                                <FAQAccordion faqs={[
                                    {
                                        question: "Is this formula valid for all universities?",
                                        answer: "While the 9.5 multiplier is standard for boards like CBSE, some universities use different factors or specific conversion tables. Always check your official marksheet for university-specific guidelines."
                                    },
                                    {
                                        question: "How do I convert a 4.0 GPA to percentage?",
                                        answer: "On a 4.0 scale, the common conversion is (GPA / 4.0) × 100. For example, a 3.5 GPA is 87.5%."
                                    },
                                    {
                                        question: "What is the difference between SGPA and CGPA?",
                                        answer: "SGPA is your grade average for a single semester. CGPA is the cumulative average of all your semesters. To calculate CGPA, you must average your SGPAs weighted by their respective credits."
                                    },
                                    {
                                        question: "Why does my percentage look lower than my CGPA?",
                                        answer: "The 9.5 factor accounts for the grading curve and ensures that a high CGPA doesn't lead to an unrealistically high percentage that isn't supported by the underlying mark distribution."
                                    }
                                ]} />
                            </div>
                        </div>

                        {/* CTA Footer */}
                        <div className="mt-24 p-12 rounded-[3.5rem] bg-linear-to-br from-[#1e5eb8] to-blue-800 text-white shadow-2xl relative overflow-hidden text-center md:text-left">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                                <div className="space-y-6 max-w-xl">
                                    <h3 className="text-3xl md:text-4xl font-black tracking-tight">Need More Academic Tools?</h3>
                                    <p className="text-blue-100 text-lg leading-relaxed">
                                        Calculate your cumulative progress or prepare for your final exams with our specialized education tools.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    <Link href="/sgpa-to-cgpa-calculator" className="px-12 py-6 bg-white text-[#1e5eb8] rounded-[2rem] font-black text-xl hover:scale-105 transition-transform shadow-xl whitespace-nowrap">
                                        SGPA to CGPA
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
