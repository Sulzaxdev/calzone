import { PortfolioCalculatorForm } from "./calculator";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Portfolio Return Calculator UK | Annual Return & CAGR Tracker",
    description: "Track your total investment performance with our Portfolio Return Calculator. Calculate simple annual returns, weighted average ROI, and CAGR for UK portfolios.",
    keywords: ["Portfolio Return Calculator UK", "Investment Return Tracker", "CAGR Calculator", "Annual ROI Calculator", "Wealth Growth UK"],
};

export default function PortfolioReturnPage() {
    return (
        <div className="max-w-7xl mx-auto">
            <PortfolioCalculatorForm />

            <div className="mt-16 px-4 md:px-0">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <h2 className="text-3xl font-bold mb-6">Analyzing Portfolio Returns: Total Wealth Performance</h2>
                    <p>
                        Successful investing is about more than just picking winners; it's about understanding your <strong>Total Portfolio Return</strong>. This calculator helps you see the "Big Picture" of your net wealth growth across multiple assets like UK shares, bonds, and cash.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 my-10">
                        <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
                            <h3 className="text-xl font-bold mb-3 mt-0 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> Simple Return</h3>
                            <p className="text-sm">The most basic way to measure growth. If you start with £10,000 and end with £11,500, you have a 15% return. Perfect for checking performance over a single year.</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
                            <h3 className="text-xl font-bold mb-3 mt-0 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-400"></span> CAGR (Compounded Annual Growth)</h3>
                            <p className="text-sm">When investing for 3, 5, or 10 years, simple average returns can be misleading. CAGR gives you the 'smoothed' annual growth rate needed to get from your start to your end value.</p>
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold mt-8 mb-4">The Weighted Return Secret</h3>
                    <p>
                        If 80% of your money is in a "Safe" bond yielding 3% and 20% is in a "Growth" stock yielding 15%, your return isn't the average (9%). It's the <strong>Weighted Return</strong>:
                    </p>
                    <code className="text-lg block bg-slate-100 dark:bg-black/20 p-4 rounded-xl mb-6">
                        (0.80 × 3%) + (0.20 × 15%) = 5.4%
                    </code>

                    <h3 className="text-2xl font-bold mt-8 mb-4">What's a Good Return?</h3>
                    <p>
                        Historically, the <strong>FTSE 100</strong> has returned roughly 5-7% annually (including dividends) over long periods. If your portfolio is outperforming this after fees and taxes, your strategy is effectively beating the "market average".
                    </p>
                </div>

                <FAQAccordion
                    title="Portfolio Return Performance FAQs"
                    faqs={[
                        {
                            question: "Should I include dividends in my return calculation?",
                            answer: "Yes! Total Return = Price Appreciation + Dividends. Many investors forget that dividends often account for 30-50% of long-term UK stock market returns."
                        },
                        {
                            question: "How does inflation affect my returns?",
                            answer: "Inflation reduces your 'Real' return. If your portfolio returns 8% and inflation is 3%, your 'Real' increase in purchasing power is only 5%."
                        },
                        {
                            question: "What is a 'Benchmark'?",
                            answer: "A benchmark is a standard (like the FTSE 100 or S&P 500) that you compare your results against to see if your active management is actually adding value."
                        },
                        {
                            question: "Is CAGR or Simple Return more accurate?",
                            answer: "CAGR is far better for long-term planning because it accounts for the compounding effect and provides a consistent annual percentage regardless of year-to-year volatility."
                        }
                    ]}
                />
            </div>
        </div>
    );
}
