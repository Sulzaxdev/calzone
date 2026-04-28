import { BarChart3, Calculator, AlignCenter, Link } from "lucide-react";
import { AveragePercentageCalculator } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "Average Percentage Calculator UK | Find the Mean",
    description: "Calculate the mathematical mean average of multiple percentage values. Quickly input an unlimited list of percentages to find the overall average.",
};

export default function AveragePercentagePage() {
    const faqs = [
        {
            question: "How do you calculate the average of percentages?",
            answer: "To find the simple mean average of a list of percentages, you add all the percentage values together, and then divide that total sum by the number of percentages you inputted."
        },
        {
            question: "Is averaging percentages mathematically accurate?",
            answer: "It depends! If all the percentages apply to 'base populations' of the exact same size, a simple average is perfectly accurate. However, if the percentages represent groups of vastly different sizes (e.g. 50% of 10 people, and 10% of 10,000 people), you would technically need a 'Weighted Average Calculator' instead."
        },
        {
            question: "Can I enter negative percentages?",
            answer: "Yes. Negative percentages (such as indicating negative growth or stock market drops) can be entered using a minus symbol (-) and will be accurately calculated in the mean result."
        },
        {
            question: "Is there a limit to how many I can add?",
            answer: "You can keep clicking the 'Add Another' button to add as many input fields as you require to complete your data set."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <CalculatorSchema
                title="Average Percentage Calculator UK"
                description="Calculate the average of multiple percentages instantly."
                slug="/average-percentage-calculator-uk"
                faqs={faqs}
            />

            {/* Hero */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-semibold mb-6">
                        <AlignCenter className="w-4 h-4" />
                        Maths & Logic
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Average Percentage Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        A quick, simple tool to find the mean (average) across a list of multiple percentage data points. Just add your numbers below.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Calculator Component */}
                <div className="max-w-4xl mx-auto">
                    <AveragePercentageCalculator />
                </div>

            {/* --- SEO Deep Content Section --- */}
            <section className="mt-32 max-w-6xl mx-auto space-y-16 px-4">
                <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 md:p-20 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none transition-all">
                    {/* Header */}
                    <div className="space-y-8 mb-16">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-3xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shadow-inner border border-purple-200 dark:border-purple-800">
                                <AlignCenter className="w-8 h-8 text-purple-600" />
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                                Statistical Clarity: <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Averaging Percentages Right</span>
                            </h2>
                        </div>
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl font-medium">
                            Whether you're tracking quarterly growth or student test performance, finding the "mean" percentage is a fundamental analytical task. However, the math behind it can be deceptively simple—or dangerously misleading.
                        </p>
                    </div>

                    {/* Detailed Long-Form Sections */}
                    <div className="space-y-24">
                        {/* Section 1: The Arithmetic Mean */}
                        <div className="space-y-12">
                            <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">01</span>
                                <h3 className="text-4xl font-black text-slate-900 dark:text-white">The Arithmetic Average</h3>
                            </div>
                            <div className="grid lg:grid-cols-2 gap-16">
                                <div className="space-y-8">
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                        The simple average (arithmetic mean) of percentages is calculated by summing all individual values and dividing by the total count. This approach is perfectly valid when each percentage applies to a "base" or "population" of the same size.
                                    </p>
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                        For example, if you have three test scores out of 100 (80%, 90%, and 70%), the simple average of 80% tells you exactly how you performed relative to the total possible marks. Our calculator makes this process instant, allowing you to add an unlimited number of data points for complex datasets.
                                    </p>
                                </div>
                                <div className="bg-purple-50/50 dark:bg-purple-900/10 p-10 rounded-[3rem] border border-purple-100 dark:border-purple-800/50 flex flex-col justify-center">
                                    <div className="text-center space-y-4">
                                        <div className="text-sm font-bold text-slate-500 uppercase tracking-widest font-mono">The Arithmetic Formula</div>
                                        <div className="text-2xl md:text-3xl font-black text-purple-600 font-mono">
                                            Mean = <br/>
                                            <div className="mt-4 border-t-2 border-purple-200 pt-4">
                                                Σ(Percentage Values)<br/>
                                                <div className="text-slate-300 my-2">÷</div>
                                                Number of Entries
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: The Weighted Average Pitfall */}
                        <div className="space-y-12">
                            <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">02</span>
                                <h3 className="text-4xl font-black text-slate-900 dark:text-white">The "Weighted" Danger Zone</h3>
                            </div>
                            <div className="prose prose-slate dark:prose-invert max-w-none">
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                    A common mistake in statistics is using a simple average when the "weights" of the percentages are different. If you average 100% of a small group with 0% of a massive group, the result (50%) is mathematically correct but practically useless.
                                </p>
                                <div className="grid md:grid-cols-2 gap-12 my-12">
                                    <div className="p-10 rounded-[2.5rem] bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800 shadow-sm">
                                        <h4 className="text-xl font-bold mb-4 text-indigo-700">When to use Simple Average</h4>
                                        <ul className="text-sm space-y-3 list-none p-0">
                                            <li className="flex gap-2">✅ <span className="text-slate-600 dark:text-slate-400">All tests have the same total marks.</span></li>
                                            <li className="flex gap-2">✅ <span className="text-slate-600 dark:text-slate-400">Comparing growth rates of similar companies.</span></li>
                                            <li className="flex gap-2">✅ <span className="text-slate-600 dark:text-slate-400">Daily survey results with fixed sample sizes.</span></li>
                                        </ul>
                                    </div>
                                    <div className="p-10 rounded-[2.5rem] bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-800 shadow-sm">
                                        <h4 className="text-xl font-bold mb-4 text-red-700">When it fails</h4>
                                        <ul className="text-sm space-y-3 list-none p-0">
                                            <li className="flex gap-2">❌ <span className="text-slate-600 dark:text-slate-400">Averaging interest rates on different loan amounts.</span></li>
                                            <li className="flex gap-2">❌ <span className="text-slate-600 dark:text-slate-400">Combining profit margins of different products.</span></li>
                                            <li className="flex gap-2">❌ <span className="text-slate-600 dark:text-slate-400">City-wide voting results with varying populations.</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Real World Applications */}
                        <div className="space-y-12">
                            <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">03</span>
                                <h3 className="text-4xl font-black text-slate-900 dark:text-white">Business & Academic Use</h3>
                            </div>
                            <div className="grid md:grid-cols-3 gap-8">
                                {[
                                    { title: "Quarterly Growth", content: "Investors use this to see the average monthly ROI or growth rate across a fiscal year." },
                                    { title: "Academic Tracking", content: "Teachers calculate class averages to determine the difficulty of an exam relative to the cohort." },
                                    { title: "Survey Normalization", content: "Market researchers average percentage scores to find the general sentiment across demographics." }
                                ].map((item, i) => (
                                    <div key={i} className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-inner">
                                        <h4 className="font-black text-purple-600 mb-4 uppercase text-sm tracking-widest">{item.title}</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div className="pt-20">
                            <FAQAccordion faqs={faqs} title="Average Percentage Deep Dive FAQs" />
                        </div>
                    </div>

                    {/* CTA Footer */}
                    <div className="mt-24 p-12 rounded-[3.5rem] bg-linear-to-br from-purple-600 to-indigo-700 text-white shadow-2xl relative overflow-hidden text-center md:text-left">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="space-y-6 max-w-xl">
                                <h3 className="text-3xl md:text-4xl font-black tracking-tight">Need a Grade Calculation?</h3>
                                <p className="text-purple-100 text-lg leading-relaxed">
                                    If you're averaging student grades, you might need a more specialized tool for UK degree classifications.
                                </p>
                            </div>
                            <Link href="/university-grade-calculator-uk" className="px-12 py-6 bg-white text-purple-600 rounded-[2rem] font-black text-xl hover:scale-105 transition-transform shadow-xl whitespace-nowrap">
                                University Calculator
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            </div>
        </div>
    );
}
