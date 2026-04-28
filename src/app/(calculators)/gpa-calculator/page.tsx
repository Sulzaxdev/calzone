import GPACalculator from "./calculator";
import Link from "next/link";
import { GraduationCap, Calculator, ChevronRight, CheckCircle2 } from "lucide-react";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export default function GpaPage() {
    const faqs = [
        {
            question: "How is GPA calculated?",
            answer: "GPA is calculated by assigning a point value to each letter grade (e.g., A=4, B=3, C=2, D=1, F=0), multiplying those points by the course credits, and then dividing the total points by the total credits."
        },
        {
            question: "What is a weighted vs. unweighted GPA?",
            answer: "An unweighted GPA is on a 4.0 scale regardless of course difficulty. A weighted GPA gives extra points for Honors, AP, or IB courses (often on a 5.0 scale) to reflect the increased rigor."
        },
        {
            question: "What is a 'good' GPA for college?",
            answer: "For most universities, a 3.0 is a solid baseline, but competitive schools often look for a 3.5 or higher. However, admissions officers also consider the difficulty of your courses."
        },
        {
            question: "Can I improve my GPA in one semester?",
            answer: "While it becomes harder to shift your cumulative GPA as you earn more credits, a strong single semester can show an 'upward trend,' which is highly valued by admissions committees."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <div className="container mx-auto px-4 pt-12">
                <GPACalculator />

                <section className="mt-20 max-w-6xl mx-auto space-y-16">
                    <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 md:p-20 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none transition-all">
                        {/* Title and Intro */}
                        <div className="space-y-8 mb-16">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-3xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shadow-inner">
                                    <Calculator className="w-8 h-8 text-indigo-600" />
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                                    Academic Excellence: <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Master Your GPA Calculation</span>
                                </h2>
                            </div>
                            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl font-medium">
                                Your Grade Point Average (GPA) is the universal currency of your academic career. It summarizes years of hard work into a single, powerful number that opens doors to universities, scholarships, and careers.
                            </p>
                        </div>

                        {/* Detailed Long-Form Sections */}
                        <div className="space-y-24">
                            {/* Section 1: The GPA Formula */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">01</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">How GPA is Actually Calculated</h3>
                                </div>
                                <div className="grid lg:grid-cols-2 gap-16">
                                    <div className="space-y-8">
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            The fundamental GPA formula is deceptively simple: **Total Grade Points divided by Total Credit Hours**. However, the complexity lies in how grade points are assigned. Most institutions use a 4.0 scale where an 'A' is 4 points, a 'B' is 3, and so on. 
                                        </p>
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            For each course, you multiply the point value of your grade by the number of credits the course is worth. This gives you your "Quality Points." Summing all Quality Points and dividing by your total credits gives your GPA. Our calculator handles this weighting automatically, ensuring that high-credit courses have the appropriate impact on your final score.
                                        </p>
                                    </div>
                                    <div className="bg-indigo-50/50 dark:bg-indigo-900/10 p-10 rounded-[3rem] border border-indigo-100 dark:border-indigo-800/50">
                                        <h4 className="text-xl font-bold mb-6">Standard GPA Points:</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            {[
                                                { grade: "A (Excellent)", points: "4.0" },
                                                { grade: "B (Good)", points: "3.0" },
                                                { grade: "C (Average)", points: "2.0" },
                                                { grade: "D (Passing)", points: "1.0" },
                                                { grade: "F (Fail)", points: "0.0" },
                                                { grade: "A- (Excellent-)", points: "3.7" }
                                            ].map((item, i) => (
                                                <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 shadow-sm">
                                                    <span className="text-xs font-bold text-slate-500">{item.grade}</span>
                                                    <span className="text-sm font-black text-indigo-600">{item.points}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Weighted vs Unweighted */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">02</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">Weighted vs. Unweighted GPA</h3>
                                </div>
                                <div className="prose prose-slate dark:prose-invert max-w-none">
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                        The distinction between weighted and unweighted GPA is crucial for high school students. An **unweighted GPA** treats every class the same, regardless of difficulty. A **weighted GPA**, however, gives extra credit for more rigorous courses like Advanced Placement (AP), International Baccalaureate (IB), or Honors classes.
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-12 my-12">
                                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 shadow-sm">
                                            <h4 className="text-xl font-bold mb-4">The AP/IB Boost</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed">
                                                In a weighted system, an 'A' in an AP class might be worth 5.0 points instead of 4.0. This recognizes the extra effort required and prevents students from avoiding difficult classes just to protect their GPA.
                                            </p>
                                        </div>
                                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 shadow-sm">
                                            <h4 className="text-xl font-bold mb-4">Admissions Perspective</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed">
                                                Colleges often recalculate your GPA based on their own criteria. They look for "academic rigor"—challenging yourself with hard classes is often more important than a perfect 4.0 in easy ones.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Strategic GPA Management */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">03</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">Why Your GPA Still Matters</h3>
                                </div>
                                <div className="grid md:grid-cols-3 gap-8">
                                    {[
                                        { title: "Grad School Entry", effect: "Masters and PhD programs often have a 3.0 or 3.5 minimum cutoff for applications." },
                                        { title: "Scholarship Merit", effect: "Many scholarships require you to maintain a specific GPA to keep your funding year-over-year." },
                                        { title: "First Job Filter", effect: "Top-tier firms in finance, law, and tech use GPA as an initial filter for entry-level roles." }
                                    ].map((item, i) => (
                                        <div key={i} className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-inner">
                                            <h4 className="font-black text-indigo-600 mb-4 uppercase text-sm tracking-widest">{item.title}</h4>
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
                        <div className="mt-24 p-12 rounded-[3.5rem] bg-linear-to-br from-indigo-600 to-blue-700 text-white shadow-2xl relative overflow-hidden text-center md:text-left">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                                <div className="space-y-6 max-w-xl">
                                    <h3 className="text-3xl md:text-4xl font-black tracking-tight">Need a Percentage Breakdown?</h3>
                                    <p className="text-indigo-100 text-lg leading-relaxed">
                                        Sometimes a GPA isn't enough. Convert your marks to percentages or calculate your final grade to stay on track.
                                    </p>
                                </div>
                                <Link href="/marks-percentage-calculator" className="px-12 py-6 bg-white text-indigo-600 rounded-[2rem] font-black text-xl hover:scale-105 transition-transform shadow-xl whitespace-nowrap">
                                    Calculate Percentage
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

