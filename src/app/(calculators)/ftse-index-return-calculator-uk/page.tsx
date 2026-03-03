import { FTSEIndexReturnCalculator } from "./calculator";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { Metadata } from "next";
import { BarChart3, LineChart, PieChart, Info, Search, History, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
    title: "FTSE 100 & 250 Return Calculator: Calculate UK Index Performance",
    description: "Analyze historical returns for the FTSE 100 and FTSE 250 indices. Calculate CAGR, total returns, and benchmark your UK stock market investments with our free backtesting tool.",
    keywords: "FTSE 100 Return Calculator, FTSE 250 Return Calculator, UK Index Return Calculator, LSE Historical Returns, FTSE CAGR Calculator, UK Stock Market Performance, how much did the FTSE 100 return in 10 years, UK index backtesting tool",
};

export default function FTSEIndexReturnPage() {
    const faqs = [
        {
            question: "What is the historical average return of the FTSE 100?",
            answer: "Historically, the FTSE 100 has provided a price return of around 5-7% per year. However, when dividends are reinvested (Total Return), the annualized growth often improves to 8-10% depending on the specific time period studied."
        },
        {
            question: "FTSE 100 vs FTSE 250: Which performs better?",
            answer: "The FTSE 100 consists of the largest 100 companies on the London Stock Exchange, many of which are international giants. The FTSE 250 focuses on mid-sized companies with more UK domestic exposure. Historically, the FTSE 250 has shown higher growth potential but with significantly higher volatility."
        },
        {
            question: "Does this calculator include dividends?",
            answer: "This calculator specifically measures 'Price Return' based on index levels. Dividends (which average ~3.5% for the FTSE 100) are not included in the primary index level but are a crucial part of an investor's total return. A 'Total Return Index' version would show higher results."
        },
        {
            question: "How do I find historical index levels?",
            answer: "You can find historical levels for FTSE indices on financial news sites like Bloomberg, Yahoo Finance, or the London Stock Exchange (LSE) website. Look for historical data tables for a specific date range."
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Header Section */}
            <div className="text-center mb-16 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black tracking-widest uppercase text-primary mb-4">
                    Market Intelligence
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-[1.1]">
                    FTSE <span className="text-primary italic">Index</span> Returns
                </h1>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
                    Analyze the performance of the UK's most tracked indices. Calculate Compound Annual Growth Rates (CAGR) and benchmark your portfolio against the <strong>London Stock Exchange</strong>.
                </p>
            </div>

            {/* Calculator Component */}
            <div className="mb-24">
                <FTSEIndexReturnCalculator />
            </div>

            {/* SEO Content Section */}
            <div className="grid lg:grid-cols-2 gap-16 mb-24 items-start">
                <div className="space-y-12">
                    <section>
                        <h2 className="text-3xl font-black tracking-tight mb-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <Search className="w-6 h-6" />
                            </div>
                            Understanding FTSE Indices
                        </h2>
                        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                            <p>
                                The <strong>Financial Times Stock Exchange (FTSE)</strong> indices are the primary benchmarks for the UK stock market. When people say "the market is up," they are usually referring to the <strong>FTSE 100</strong>, which represents the 100 largest companies by market capitalization listed on the London Stock Exchange.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
                                <div className="p-6 rounded-[2rem] bg-slate-950 text-white relative overflow-hidden">
                                    <h4 className="text-primary font-black uppercase tracking-widest text-xs mb-2">FTSE 100</h4>
                                    <p className="text-sm italic opacity-80">Global conglomerates, stable dividends, lower growth.</p>
                                    <div className="absolute -bottom-4 -right-4 opacity-10"><LineChart className="w-16 h-16" /></div>
                                </div>
                                <div className="p-6 rounded-[2rem] bg-slate-950 text-white relative overflow-hidden">
                                    <h4 className="text-primary font-black uppercase tracking-widest text-xs mb-2">FTSE 250</h4>
                                    <p className="text-sm italic opacity-80">Mid-sized UK companies, domestic focus, higher historical growth.</p>
                                    <div className="absolute -bottom-4 -right-4 opacity-10"><BarChart3 className="w-16 h-16" /></div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-3xl font-black tracking-tight mb-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <PieChart className="w-6 h-6" />
                            </div>
                            Why Use CAGR?
                        </h2>
                        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                            <p>
                                Total return is often misleading over long periods. <strong>Compound Annual Growth Rate (CAGR)</strong> provides a smoother, annualised view of how an index performed. It answers the question: <i>"What was the steady annual interest rate needed to grow the start value to the end value?"</i>
                            </p>
                            <ul className="list-disc pl-5 mt-6 space-y-3 decoration-primary">
                                <li><strong>Eliminates Volatility Bias:</strong> Shows the geometric mean of growth.</li>
                                <li><strong>Better Benchmarking:</strong> Compare an index directly to a savings account rate.</li>
                                <li><strong>Realistic Planning:</strong> Helps forecast future wealth based on historical norms.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[3rem]">
                        <h3 className="text-xl font-black uppercase mb-4 italic flex items-center gap-2">
                            <Info className="w-5 h-5 text-primary" /> Investor Note
                        </h3>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed">
                            Remember that past performance is never a guarantee of future results. The UK market has unique sector exposures (like Banking, Mining, and Staples) which may perform differently than other global markets like the US (Tech-heavy S&P 500).
                        </p>
                    </section>
                </div>
            </div>

            {/* FAQS Section */}
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-black tracking-tight mb-2 uppercase italic underline decoration-primary decoration-4 underline-offset-8">Market Insights & FAQ</h2>
                    <p className="text-slate-500 font-medium mt-4">Essential knowledge for every UK index investor.</p>
                </div>
                <FAQAccordion faqs={faqs} />
            </div>

            <div className="mt-24 p-12 rounded-[4rem] bg-slate-950 text-white relative overflow-hidden group shadow-2xl shadow-primary/20 transition-all hover:-translate-y-1">
                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <History className="w-12 h-12 text-primary mb-6 animate-pulse" />
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight italic">Analyze the <br />Past to Predict the <span className="text-primary italic underline underline-offset-12">Future</span>.</h2>
                        <p className="text-slate-400 font-medium leading-relaxed text-lg opacity-80">
                            "The stock market is a device for transferring money from the impatient to the patient." — Warren Buffett
                        </p>
                    </div>
                    <div className="flex justify-center md:justify-end">
                        <div className="w-64 h-64 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-3xl relative">
                            <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping opacity-20"></div>
                            <div className="p-8 bg-primary/20 rounded-full border border-primary/40 group-hover:scale-110 transition-transform duration-700">
                                <TrendingUp className="w-24 h-24 text-primary" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
            </div>
        </div>
    );
}
