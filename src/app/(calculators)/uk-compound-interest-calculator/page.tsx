import { CompoundCalculatorForm } from "./calculator";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Compound Interest Calculator UK | Wealth Growth & SIP Tracker",
    description: "Use our free Compound Interest Calculator to project long-term investment growth. Support for monthly contributions (SIP), various compounding frequencies, and inflation adjustments.",
    keywords: ["Compound Interest Calculator UK", "Investment Growth Tracker", "SIP Calculator", "Compounding Frequency", "Wealth Planning UK"],
};

export default function CompoundInterestPage() {
    return (
        <div className="max-w-7xl mx-auto">
            <CompoundCalculatorForm />

            <div className="mt-16 px-4 md:px-0">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <h2 className="text-3xl font-bold mb-6">The Power of Compound Interest: Wealth's Greatest Tool</h2>
                    <p>
                        Albert Einstein famously called compound interest the "eighth wonder of the world." It's the process where the interest you earn on an investment earns interest on itself, leading to exponential growth over time. For UK investors, this is the engine behind ISA and SIPP wealth building.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 my-10">
                        <div className="bg-primary/5 dark:bg-primary/10 p-8 rounded-[2rem] border border-primary/20">
                            <h3 className="text-2xl font-black mb-4 mt-0 text-primary">The SIP Strategy</h3>
                            <p className="text-sm leading-relaxed">A Systematic Investment Plan (SIP) involves adding a fixed amount to your portfolio every month. Even a small £100 monthly contribution, when compounded at 7% over 30 years, can grow into a substantial nest egg of over <strong>£120,000</strong>.</p>
                        </div>
                        <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
                            <h3 className="text-2xl font-black mb-4 mt-0 text-amber-400 italic">Inflation Warning</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">While compounding makes you "richer" in nominal terms, inflation erodes your purchasing power. If inflation averages 2-3%, your real growth is lower. Our calculator includes an <strong>Inflation Adjustment</strong> to show you what your money might be worth in "today's prices."</p>
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold mt-8 mb-4">Compounding Frequency Matters</h3>
                    <p>
                        How often your interest is calculated changes the final outcome. The more frequent the compounding (Daily vs. Yearly), the higher the effective yield.
                    </p>
                    <ul>
                        <li><strong>Yearly:</strong> Standard for many UK savings accounts.</li>
                        <li><strong>Monthly:</strong> Common for mortgages and credit cards, and many investment funds.</li>
                        <li><strong>Daily:</strong> The most aggressive form of compounding often seen in high-yield cash accounts.</li>
                    </ul>

                    <h3 className="text-2xl font-bold mt-8 mb-4">A Long-Term Game</h3>
                    <p>
                        The "Curve" of compound interest starts slow. In the first 10 years, your contributions do most of the heavy lifting. Between years 20 and 30, the interest begins to dwarf the contributions. Patience and time are your biggest allies in the UK stock market.
                    </p>
                </div>

                <FAQAccordion
                    title="Compound Interest & Wealth Growth FAQs"
                    faqs={[
                        {
                            question: "What is the difference between Simple and Compound interest?",
                            answer: "Simple interest is calculated only on the principal (the original amount). Compound interest is calculated on the principal PLUS all previously earned interest."
                        },
                        {
                            question: "How does the 'Rule of 72' work?",
                            answer: "It's a quick way to see how many years it takes to double your money. Divide 72 by your expected interest rate. At 8%, your money doubles in 9 years (72 ÷ 8 = 9)."
                        },
                        {
                            question: "What interest rate should I use for UK stocks?",
                            answer: "While markets vary, a long-term average of 5% to 7% (after inflation) is often considered a realistic projection for a diversified portfolio like the FTSE All-Share or an S&P 500 tracker."
                        },
                        {
                            question: "Does compounding apply to dividends?",
                            answer: "Yes, provided you reinvest them! Dividends are a massive part of compounding. If you take the cash out, you significantly reduce the long-term growth potential."
                        }
                    ]}
                />
            </div>
        </div>
    );
}
