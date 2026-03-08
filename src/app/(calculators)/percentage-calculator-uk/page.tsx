import React from "react";
import { Info, CheckCircle2, FileText, Percent } from "lucide-react";
import { PercentageCalculatorClient } from "./percentage-calculator-client";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "Percentage Calculator UK | Quick Maths & Growth Estimator",
    description: "Calculate percentages, percentage increases, and decreases instantly. The perfect tool for business margins, discounts, and everyday maths.",
};

export default function PercentageCalculatorPage() {
    const percentageFaqs = [
        {
            question: "How do I calculate a percentage of a number?",
            answer: "Divide the percentage by 100 (to get a decimal) and multiply it by the total number. For example, 20% of 150 is 0.20 × 150 = 30."
        },
        {
            question: "How do I calculate percentage increase?",
            answer: "Subtract the original value from the new value, divide the result by the original value, and then multiply by 100."
        },
        {
            question: "Is there a formula for percentage decrease?",
            answer: "Yes. Subtract the new value from the original value, divide by the original value, and multiply by 100. This gives you the percentage drop."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20 mt-12">
            <BreadcrumbSchema items={[
                { name: "Home", item: "/" },
                { name: "Maths & Percentages", item: "/maths-percentages" },
                { name: "Percentage Calculator", item: "/percentage-calculator-uk" }
            ]} />
            <CalculatorSchema
                title="Percentage Calculator UK | Quick Maths & Growth Estimator"
                description="Calculate percentages, percentage increases, and decreases instantly. The perfect tool for business margins, discounts, and everyday maths."
                slug="/percentage-calculator-uk"
                faqs={percentageFaqs}
            />

            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
                        <Percent className="w-4 h-4" />
                        Everyday Maths
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Percentage Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Quickly calculate percentages off, percentage increases or decreases, and find out what fraction one number is of another.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                <PercentageCalculatorClient />

                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white dark:bg-slate-950 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-4 dark:text-white">
                            <Info className="w-5 h-5 text-blue-500" /> Common Formulas
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">X% of Y</p>
                                    <p className="text-xs text-slate-500 font-mono bg-slate-100 dark:bg-slate-800 p-1 rounded inline-block mt-2">Y * (X / 100)</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">X as a % of Y</p>
                                    <p className="text-xs text-slate-500 font-mono bg-slate-100 dark:bg-slate-800 p-1 rounded inline-block mt-2">(X / Y) * 100</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">% Change from X to Y</p>
                                    <p className="text-xs text-slate-500 font-mono bg-slate-100 dark:bg-slate-800 p-1 rounded inline-block mt-2">((Y - X) / X) * 100</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-linear-to-br from-indigo-600 to-blue-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-600/20">
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-3">
                            <FileText className="w-5 h-5 text-blue-200" /> Save your Data
                        </h3>
                        <p className="text-sm text-blue-100 mb-6 leading-relaxed">
                            Applying percentage changes to business margins? Calculate your differences and click the export button to save an organized PDF of your calculations.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-4xl mt-24">
                <article className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400">
                    <h2>How to Calculate Percentages</h2>
                    <p>
                        The word "percentage" comes from the Latin <em>per centum</em>, meaning "by the hundred". It is simply a ratio expressed as a fraction of 100. Whether you are trying to calculate a 20% discount on a commercial invoice, or figuring out your body fat percentage increase over the holidays, our <strong>Percentage Calculator</strong> handles the heavy lifting instantly.
                    </p>

                    <h3>Finding X% of Y</h3>
                    <p>
                        This is the most common real-world percentage problem. For instance, what is 15% of £250? To solve this manually, you convert the percentage into a decimal by dividing by 100 (15 / 100 = 0.15). You then multiply the base number by this decimal (250 × 0.15 = 37.5).
                    </p>

                    <h3>Finding what percentage one number is of another</h3>
                    <p>
                        If you scored 45 marks out of a possible 60 on an exam, what is your percentage grade?
                    </p>
                    <p>
                        The mathematical approach is to divide the part by the whole to get a decimal (45 ÷ 60 = 0.75). You then multiply by 100 to shift the decimal point two places to the right, yielding 75%.
                    </p>

                    <h3>Calculating Percentage Increase or Decrease</h3>
                    <p>
                        Percentage difference (or sequence change) is heavily used in finance, stock market tracking, and science to measure growth or decay over time.
                    </p>
                    <ul>
                        <li><strong>Step 1:</strong> Find the absolute difference between the two values (New Value - Old Value).</li>
                        <li><strong>Step 2:</strong> Divide that difference by the <em>Old Value</em>.</li>
                        <li><strong>Step 3:</strong> Multiply the final decimal by 100.</li>
                    </ul>
                    <p>
                        If your rent increased from £1,200 to £1,350, the difference is £150. Dividing 150 by 1,200 gives 0.125. Multiply by 100, and it shows your rent suffered a 12.5% increase.
                    </p>

                    <FAQAccordion faqs={percentageFaqs} title="Frequently Asked Questions (Maths)" />
                </article>
            </div>
        </div>
    );
}
