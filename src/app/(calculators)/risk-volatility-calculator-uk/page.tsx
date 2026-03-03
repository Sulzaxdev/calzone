import { RiskVolatilityCalculator } from "./calculator";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { Metadata } from "next";
import { TrendingUp, Activity, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
    title: "Risk & Volatility Calculator: Standard Deviation & Beta (UK)",
    description: "Analyze stock risk and market volatility with our free UK calculator. Calculate Standard Deviation and Beta for FTSE 100 shares and portfolios to measure investment risk.",
    keywords: "Risk and Volatility Calculator, Standard Deviation Calculator UK, Beta Calculator for Stocks, Stock Risk Calculator, Investment Volatility Calculator, Share Risk Calculator UK, Portfolio Risk Calculator, how to calculate beta of a stock, standard deviation formula finance, FTSE 100 beta calculation",
};

export default function RiskVolatilityPage() {
    const faqs = [
        {
            question: "Is a high beta stock always a bad investment?",
            answer: "Not necessarily. A high beta (above 1) simply means the stock is more volatile than the market. For aggressive investors seeking higher returns, high beta stocks are preferred. However, for conservative investors, they represent higher risk and potential for larger losses."
        },
        {
            question: "What is the difference between Standard Deviation and Beta?",
            answer: "Standard Deviation measures the 'total risk' or total price fluctuation of a stock. Beta measures 'systematic risk'—how much the stock moves in relation to the broader market (like the FTSE 100). You can have a volatile stock with low beta if its movements don't correlate with the market."
        },
        {
            question: "What is considered a 'safe' volatility level?",
            answer: "Typically, a standard deviation of 0-5% is considered low risk (often seen in government bonds or stable blue-chips), 5-15% is moderate, and 15%+ is considered high risk. However, this depends on your investment horizon and risk tolerance."
        },
        {
            question: "How does the FTSE 100 affect my stock's beta?",
            answer: "In the UK, the FTSE 100 is the standard benchmark. If your stock's price moves exactly in sync with the FTSE 100, its beta will be 1.0. If it crashes harder when the index dips, its beta is likely higher than 1."
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Header Section */}
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-[1.1]">
                    Risk & Volatility <span className="text-primary italic">Calculator</span>
                </h1>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
                    Analyze the risk profile of your UK stock portfolio. Calculate Standard Deviation and Beta to understand market sensitivity and historical volatility.
                </p>
            </div>

            {/* Calculator Component */}
            <div className="mb-24">
                <RiskVolatilityCalculator />
            </div>

            {/* SEO Content Section */}
            <div className="grid lg:grid-cols-2 gap-16 mb-24">
                <div className="space-y-8">
                    <section>
                        <h2 className="text-3xl font-black tracking-tight mb-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            Understanding Stock Volatility
                        </h2>
                        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                            <p>
                                Risk and Volatility are the two most critical metrics for any serious investor, especially when navigating the <strong>London Stock Exchange</strong>. Volatility represents the degree of variation in trading prices over time. In finance, we primarily use two metrics to quantify this: <strong>Standard Deviation</strong> and <strong>Beta</strong>.
                            </p>
                            <p>
                                High volatility often indicates a high-risk-high-reward scenario, while low volatility suggests stability and capital preservation. Our calculator helps you differentiate between internal asset risk and broader market-related risk.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-2xl font-bold tracking-tight mb-3">1. Standard Deviation (Total Risk)</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-4 font-medium">
                            Standard deviation measures how much a stock's returns deviate from its average (mean) return. A higher deviation means the price swings are wider, making the investment more unpredictable.
                        </p>
                        <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                            <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-3">Risk Interpretation Table</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                                    <span className="font-bold">0 – 5%</span>
                                    <span className="text-green-500 font-black">Low Risk</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 py-2">
                                    <span className="font-bold">5 – 15%</span>
                                    <span className="text-orange-500 font-black">Moderate Risk</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="font-bold">15% +</span>
                                    <span className="text-red-500 font-black">High Risk</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-3xl font-black tracking-tight mb-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                                <Activity className="w-6 h-6" />
                            </div>
                            What is Beta (β)?
                        </h2>
                        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                            <p>
                                Beta measures a stock's sensitivity to the broader market, usually the <strong>FTSE 100</strong> for UK investors. It tells you if a stock moves more or less than the index.
                            </p>
                            <ul className="list-none space-y-4 p-0">
                                <li className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                    <div className="text-xl font-black text-primary">β=1</div>
                                    <div>
                                        <p className="font-bold mb-0 text-slate-900 dark:text-white leading-none">Market Correlation</p>
                                        <span className="text-xs">Moves exactly in line with the market index.</span>
                                    </div>
                                </li>
                                <li className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                    <div className="text-xl font-black text-red-500">β&gt;1</div>
                                    <div>
                                        <p className="font-bold mb-0 text-slate-900 dark:text-white leading-none">Aggressive</p>
                                        <span className="text-xs">More volatile than the market (e.g. tech or growth stocks).</span>
                                    </div>
                                </li>
                                <li className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                    <div className="text-xl font-black text-green-500">β&lt;1</div>
                                    <div>
                                        <p className="font-bold mb-0 text-slate-900 dark:text-white leading-none">Defensive</p>
                                        <span className="text-xs">Less volatile than the market (e.g. utilities or staples).</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>

            {/* FAQS Section */}
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-black tracking-tight mb-2">Frequently Asked Questions</h2>
                    <p className="text-slate-500 font-medium">Essential knowledge for managing investment risk.</p>
                </div>
                <FAQAccordion faqs={faqs} />
            </div>

            <div className="mt-24 p-8 rounded-[3rem] bg-slate-950 text-white relative overflow-hidden group">
                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-black mb-4 italic">Start Your Risk Audit <span className="text-primary">Today</span></h2>
                        <p className="text-slate-400 font-medium leading-relaxed">
                            Understanding your exposure is the first step to becoming a successful long-term investor. Whether you are trading FTSE 100 blue chips or AIM growth stocks, knowing your Beta helps you stay calm during market storms.
                        </p>
                    </div>
                    <div className="flex justify-center md:justify-end">
                        <div className="w-32 h-32 rounded-full border-4 border-primary/30 flex items-center justify-center animate-pulse">
                            <ShieldAlert className="w-16 h-16 text-primary" />
                        </div>
                    </div>
                </div>
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px] opacity-50 group-hover:opacity-100 transition-opacity"></div>
            </div>
        </div>
    );
}
