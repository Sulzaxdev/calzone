import { PERatioCalculatorForm } from "./calculator";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "P/E Ratio Calculator UK | Price to Earnings Valuation Tool",
    description: "Calculate your stock's P/E ratio instantly. Compare trailing and forward price-to-earnings ratios for UK shares to identify undervalued growth opportunities.",
    keywords: ["P/E Ratio Calculator UK", "Price to Earnings Ratio", "Stock Valuation", "EPS Calculator", "LSE Share Analysis"],
};

export default function PERatioPage() {
    return (
        <div className="max-w-7xl mx-auto">
            <PERatioCalculatorForm />

            <div className="mt-16 px-4 md:px-0">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <h2 className="text-3xl font-bold mb-6">Mastering the P/E Ratio: A Guide for UK Investors</h2>
                    <p>
                        The <strong>Price-to-Earnings (P/E) ratio</strong> is perhaps the most widely used metric for valuing stocks on the London Stock Exchange (LSE). It represents the amount an investor is willing to pay for every £1 of a company's earnings.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 my-10">
                        <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl border-l-4 border-primary">
                            <h3 className="text-xl font-bold mb-3 mt-0 text-primary">The Core Formula</h3>
                            <code className="text-lg block bg-white dark:bg-black/20 p-4 rounded-xl">
                                P/E Ratio = Price Per Share ÷ Earnings Per Share (EPS)
                            </code>
                        </div>
                        <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl border-l-4 border-amber-400">
                            <h3 className="text-xl font-bold mb-3 mt-0 text-amber-500">Why It Matters</h3>
                            <p className="text-sm mb-0">
                                A high P/E often suggests high growth expectations (like tech stocks), while a low P/E might indicate a "value" stock or a company facing challenges.
                            </p>
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold mt-8 mb-4">Trailing vs. Forward P/E</h3>
                    <ul>
                        <li><strong>Trailing P/E:</strong> Uses actual earnings from the past 12 months. It is reliable but looking backwards.</li>
                        <li><strong>Forward P/E:</strong> Uses estimated future earnings. Vital for growth investing but relies on analyst forecasts.</li>
                    </ul>

                    <h3 className="text-2xl font-bold mt-8 mb-4">What is a "Good" P/E Ratio?</h3>
                    <p>
                        Context is king. A P/E of 20 might be cheap for a software company growing at 50% per year, but expensive for a utility company growing at 2%. Investors should always compare a stock's P/E to its <strong>Industry Average</strong> and its own <strong>Historical P/E</strong>.
                    </p>
                </div>

                <FAQAccordion
                    title="P/E Ratio Frequently Asked Questions"
                    faqs={[
                        {
                            question: "Can a P/E ratio be negative?",
                            answer: "Yes, if a company is losing money (Net Loss), the EPS is negative, resulting in a negative P/E. Many investors ignore P/E for loss-making companies and use Price-to-Sales (P/S) instead."
                        },
                        {
                            question: "Is a low P/E always better?",
                            answer: "Not necessarily. A very low P/E can be a 'value trap'—a company that looks cheap because its business model is failing or its earnings are expected to collapse."
                        },
                        {
                            question: "How do I find a company's EPS?",
                            answer: "EPS is found in the company's annual report or on financial news sites. It is simply the Net Profit divided by the number of shares in circulation."
                        },
                        {
                            question: "Does the P/E ratio work for ETFs?",
                            answer: "Yes, most providers give a weighted average P/E for the entire basket of stocks within the ETF."
                        }
                    ]}
                />
            </div>
        </div>
    );
}
