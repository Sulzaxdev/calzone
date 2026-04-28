import MarksPercentageCalculator from "./calculator";
import Link from "next/link";
import { GraduationCap, Percent, ChevronRight, CheckCircle2 } from "lucide-react";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export default function MarksPercentPage() {
    const faqs = [
        {
            question: "How do I calculate my marks percentage?",
            answer: "The formula is simple: (Obtained Marks / Total Marks) × 100. For example, if you scored 450 out of 500, your percentage is (450/500) × 100 = 90%."
        },
        {
            question: "What is a good marks percentage?",
            answer: "In most academic systems, 60% and above is considered First Division, while 75% and above is considered Distinction. However, 'good' depends on your specific school or competitive environment."
        },
        {
            question: "Can I use this for multiple subjects?",
            answer: "Yes. You should add up all your obtained marks from all subjects and divide by the total possible marks across all those subjects."
        },
        {
            question: "Why is percentage used instead of just marks?",
            answer: "Percentage provides a standardized way to compare performance across different exams or subjects that may have different total marks."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <div className="container mx-auto px-4 pt-12">
                <MarksPercentageCalculator />

                <section className="mt-20 max-w-6xl mx-auto space-y-16">
                    <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 md:p-20 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none transition-all">
                        {/* Title and Intro */}
                        <div className="space-y-8 mb-16">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shadow-inner">
                                    <Percent className="w-8 h-8 text-emerald-600" />
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                                    Academic Performance: <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Marks Percentage Deep Dive</span>
                                </h2>
                            </div>
                            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl font-medium">
                                Percentages are the universal language of academic achievement. They provide a standardized way to measure performance across different subjects, schools, and even countries.
                            </p>
                        </div>

                        {/* Detailed Long-Form Sections */}
                        <div className="space-y-24">
                            {/* Section 1: The Mathematics */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">01</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">The Percentage Formula</h3>
                                </div>
                                <div className="grid lg:grid-cols-2 gap-16">
                                    <div className="space-y-8">
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            Calculating your marks percentage is a fundamental skill for every student. The formula is: **(Marks Obtained / Total Possible Marks) × 100**. While it seems simple, applying it across multiple subjects requires careful calculation of the cumulative totals.
                                        </p>
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            For example, if you scored 85, 90, and 75 in three subjects each out of 100, your total marks obtained is 250 and total marks is 300. (250/300) × 100 = 83.33%. Our calculator automates this for you, allowing you to focus on your studies rather than the math behind your grades.
                                        </p>
                                    </div>
                                    <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-10 rounded-[3rem] border border-emerald-100 dark:border-emerald-800/50 flex flex-col justify-center">
                                        <div className="text-center space-y-4">
                                            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">The Core Formula</div>
                                            <div className="text-3xl md:text-4xl font-black text-emerald-600">
                                                <span className="border-b-4 border-emerald-200 pb-1">Obtained</span><br/>
                                                <div className="mt-2 text-slate-300">÷</div>
                                                <span className="pt-1">Total</span><br/>
                                                <div className="mt-4 text-slate-400">× 100</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Grading Divisions */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">02</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">Academic Divisions & Standards</h3>
                                </div>
                                <div className="prose prose-slate dark:prose-invert max-w-none">
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                        In many educational systems (such as those in the UK, India, and Commonwealth countries), percentages are used to categorize students into "Divisions" or "Classes." Understanding these benchmarks is key for college applications and job requirements.
                                    </p>
                                    <div className="grid md:grid-cols-3 gap-8 my-12">
                                        {[
                                            { range: "75% - 100%", label: "Distinction / First Class with Merit", color: "bg-emerald-500" },
                                            { range: "60% - 74%", label: "First Division / First Class", color: "bg-blue-500" },
                                            { range: "45% - 59%", label: "Second Division / Second Class", color: "bg-amber-500" }
                                        ].map((item, i) => (
                                            <div key={i} className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 shadow-sm text-center">
                                                <div className={`w-12 h-1.5 mx-auto mb-4 rounded-full ${item.color}`} />
                                                <h4 className="text-2xl font-black mb-2">{item.range}</h4>
                                                <p className="text-slate-500 text-sm leading-tight">{item.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Percentage vs. GPA */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">03</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">Why Use Percentage Over GPA?</h3>
                                </div>
                                <div className="grid md:grid-cols-2 gap-12">
                                    <div className="p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                        <h4 className="text-xl font-bold mb-6 text-emerald-600">The Granularity Advantage</h4>
                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                            Percentages offer more precision than a GPA. While two students might both have a 3.7 GPA, their raw percentages could be 89.5% and 92.4%. For highly competitive roles, this level of detail matters to recruiters and admissions officers.
                                        </p>
                                    </div>
                                    <div className="p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                        <h4 className="text-xl font-bold mb-6 text-emerald-600">Cross-Subject Comparison</h4>
                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                            A percentage allows you to quickly see how you performed in a 25-mark quiz versus a 100-mark final exam. It normalizes all scores to a base of 100, providing an instant "at-a-glance" performance review.
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
                        <div className="mt-24 p-12 rounded-[3.5rem] bg-linear-to-br from-emerald-600 to-teal-700 text-white shadow-2xl relative overflow-hidden text-center md:text-left">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                                <div className="space-y-6 max-w-xl">
                                    <h3 className="text-3xl md:text-4xl font-black tracking-tight">GPA Requirement?</h3>
                                    <p className="text-emerald-100 text-lg leading-relaxed">
                                        Applying abroad? Most US universities require your marks on a 4.0 GPA scale. Convert your percentage now.
                                    </p>
                                </div>
                                <Link href="/gpa-calculator" className="px-12 py-6 bg-white text-emerald-600 rounded-[2rem] font-black text-xl hover:scale-105 transition-transform shadow-xl whitespace-nowrap">
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

