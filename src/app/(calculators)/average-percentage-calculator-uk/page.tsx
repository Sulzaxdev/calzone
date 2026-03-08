import { BarChart3, Calculator, AlignCenter } from "lucide-react";
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

                {/* SEO Content */}
                <section className="mt-20 max-w-4xl mx-auto space-y-12">
                    <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <BarChart3 className="w-8 h-8 text-purple-500" />
                            Averaging Percentages the Right Way
                        </h2>

                        <div className="space-y-8 text-slate-700 dark:text-slate-300">
                            <p className="text-lg leading-relaxed">
                                Averaging out a set of numerical percentages follows the same standard "Mean" mathematical formula as averaging regular whole numbers. This is useful for compiling student tests, finding an average quarterly growth metric, or standardizing survey results.
                            </p>

                            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-2xl border border-purple-100 dark:border-purple-900/40">
                                <h3 className="text-xl font-bold text-purple-900 dark:text-purple-200 mb-4 flex items-center gap-2">
                                    <Calculator className="w-6 h-6 text-purple-500" /> The Formula
                                </h3>
                                <p className="mb-4 text-sm text-purple-800 dark:text-purple-300">
                                    Our calculator uses the arithmetic mean logic:
                                </p>
                                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-purple-200 dark:border-purple-800 text-center font-mono font-bold text-lg text-slate-800 dark:text-slate-200">
                                    Sum of all Percentages ÷ Number of Entries = Average
                                </div>
                                <p className="mt-4 text-sm text-purple-800 dark:text-purple-300">
                                    <strong>Example:</strong> Taking the average of three test scores: 72%, 85%, and 90%.<br />
                                    1. Add them: 72 + 85 + 90 = 247<br />
                                    2. Count entries: We have 3 scores.<br />
                                    3. Divide: 247 ÷ 3 = <strong>82.33% Average!</strong>
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Warning: Beware the "Weighted" Trap</h3>
                                <p className="leading-relaxed">
                                    While this calculator is perfectly accurate for raw numbers, be extremely careful when averaging percentages that represent real-world populations or sample sizes of vastly different scales.
                                </p>
                                <div className="bg-slate-100 dark:bg-slate-900 p-5 rounded-2xl border-l-4 border-orange-500">
                                    <p className="text-sm">
                                        <strong>The Pitfall Example:</strong><br />
                                        If 100% of City A (Population: 10) voted "Yes", and 0% of City B (Population: 1,000,000) voted "Yes". <br />
                                        The simple average between 100% and 0% is <strong>50%</strong>.<br />
                                        However, the actual holistic truth is that out of 1,000,010 people, only 10 voted yes, making the true "weighted" average essentially <strong>0.001%</strong>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <FAQAccordion faqs={faqs} title="Average Percentage FAQs" />
                </section>
            </div>
        </div>
    );
}
