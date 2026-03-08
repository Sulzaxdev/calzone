import { TrendingDown, Activity, ArrowDownRight } from "lucide-react";
import { PercentageDecreaseCalculator } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "Percentage Decrease Calculator UK | Calculate Drop & Difference",
    description: "Easily calculate the percentage drop between two numbers. Perfect for tracking price drops, weight loss, metric reductions, or negative financial growth.",
};

export default function PercentageDecreasePage() {
    const faqs = [
        {
            question: "How do I calculate a percentage decrease?",
            answer: "First, find the absolute difference between your starting value and your ending value. Then, divide that difference by the starting value. Finally, multiply the result by 100 to get your percentage. (Start - End) ÷ Start × 100."
        },
        {
            question: "Why does the order of the numbers matter?",
            answer: "Percentage changes are always relative to the original (starting) value. Dropping from 100 to 50 is a 50% decrease. However, going from 50 to 100 is a 100% increase, even though the absolute difference is 50 in both scenarios."
        },
        {
            question: "What if my end number is HIGHER than my start number?",
            answer: "If your ending value is higher than your starting value, our calculator will automatically detect the mathematical shift and display the result as a Percentage Increase instead."
        },
        {
            question: "Can I use this for business metrics?",
            answer: "Yes! This tool is frequently used to track year-over-year revenue drops, reductions in website traffic, lower utility bills, shrinking overhead costs, and other Key Performance Indicators (KPIs)."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <CalculatorSchema
                title="Percentage Decrease Calculator UK"
                description="Easily calculate the percentage drop between two numbers."
                slug="/percentage-decrease-calculator-uk"
                faqs={faqs}
            />

            {/* Hero */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-semibold mb-6">
                        <ArrowDownRight className="w-4 h-4" />
                        Maths & Analytics
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Percentage Decrease Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Quickly find out exactly how much a number has dropped by percentage. Ideal for tracking metric reductions, price drops, or weight loss progress.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Calculator Component */}
                <div className="max-w-4xl mx-auto">
                    <PercentageDecreaseCalculator />
                </div>

                {/* SEO Content */}
                <section className="mt-20 max-w-4xl mx-auto space-y-12">
                    <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <Activity className="w-8 h-8 text-red-500" />
                            Understanding Percentage Drops
                        </h2>

                        <div className="space-y-8 text-slate-700 dark:text-slate-300">
                            <p className="text-lg leading-relaxed">
                                A percentage decrease calculation is a powerful metric that allows you to standardize how much a value has shrunk over time. By looking at the relative percentage rather than just raw numbers, you gain better context for interpreting data trends.
                            </p>

                            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl border border-red-100 dark:border-red-900/40">
                                <h3 className="text-xl font-bold text-red-900 dark:text-red-200 mb-4 flex items-center gap-2">
                                    <TrendingDown className="w-6 h-6 text-red-500" /> The Decrease Formula
                                </h3>
                                <p className="mb-4 text-sm text-red-800 dark:text-red-300">
                                    The mathematical formula for finding a percentage decrease is based entirely on comparing the <em>absolute change</em> to the <em>original starting point</em>:
                                </p>
                                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-red-200 dark:border-red-800 text-center font-mono font-bold text-lg text-slate-800 dark:text-slate-200">
                                    Percentage Decrease = ((Starting Value - Final Value) ÷ Starting Value) × 100
                                </div>
                                <p className="mt-4 text-sm text-red-800 dark:text-red-300">
                                    <strong>Example:</strong> If your monthly electricity bill drops from £80 down to £60.<br />
                                    1. Find the difference: 80 - 60 = 20<br />
                                    2. Divide by the start: 20 ÷ 80 = 0.25<br />
                                    3. Convert to percentage: 0.25 × 100 = <strong>25% Decrease!</strong>
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Common Real-World Uses</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li><strong>Weight Loss:</strong> "I weighed 90kg, and now I weigh 80kg." (11.1% decrease). Tracking percentages is often more motivating than looking at raw kilos.</li>
                                    <li><strong>Finance & Investing:</strong> Knowing how far a stock portfolio has dropped during a bear market.</li>
                                    <li><strong>Retail & Sales:</strong> "Last month we sold 500 units, this month we sold 400." (20% decrease in sales).</li>
                                    <li><strong>Energy Efficiency:</strong> Gauging how much gas or electricity you have saved after installing a new boiler or insulation.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <FAQAccordion faqs={faqs} title="Percentage Decrease FAQs" />
                </section>
            </div>
        </div>
    );
}
