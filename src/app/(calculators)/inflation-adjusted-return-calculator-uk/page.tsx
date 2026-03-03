import { InflationAdjustedCalculator } from "./calculator";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { Metadata } from "next";
import { Flame, Scale, ShieldAlert, History, Zap } from "lucide-react";

export const metadata: Metadata = {
    title: "UK Inflation Adjusted Return Calculator: Calculate Real Returns",
    description: "Calculate the real rate of return on your investments after UK inflation. Use our free tool to see your actual purchasing power growth and inflation impact on your UK portfolio.",
    keywords: "Inflation Adjusted Return Calculator UK, Real Return Calculator UK, Inflation Adjusted Investment Calculator, Real Rate of Return Calculator, UK Inflation Investment Calculator, how to calculate real return, nominal vs real return difference",
};

export default function InflationAdjustedPage() {
    const faqs = [
        {
            question: "Is a 10% return still 10% after inflation?",
            answer: "No. If your investment grows by 10% but the cost of living (inflation) grows by 6%, your 'Real' return is only about 3.77%. You have more money, but that money buys significantly less than it would have in the past."
        },
        {
            question: "Where can I find the current UK inflation rate?",
            answer: "Official UK inflation data (CPI and RPI) is published monthly by the Office for National Statistics (ONS). The Bank of England also provides historical data and future inflation targets (currently 2%)."
        },
        {
            question: "Why is real return more important than nominal return?",
            answer: "Nominal return is just a number on a screen. Real return represents your actual wealth growth—the ability to buy more goods and services. For long-term goals like retirement, failing to account for inflation is the biggest risk to your standard of living."
        },
        {
            question: "What is 'Purchasing Power'?",
            answer: "Purchasing power is the value of a currency expressed in terms of the amount of goods or services that one unit of money can buy. Inflation erodes purchasing power, meaning you need more pounds today to buy what one pound bought yesterday."
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Header Section */}
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-[1.1]">
                    Inflation <span className="text-primary italic">Adjusted</span> Return
                </h1>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
                    Don't let inflation stealthily erode your wealth. Calculate your <strong>Real Rate of Return</strong> to see how much your UK investment is actually growing in terms of buying power.
                </p>
            </div>

            {/* Calculator Component */}
            <div className="mb-24">
                <InflationAdjustedCalculator />
            </div>

            {/* SEO Content Section */}
            <div className="grid lg:grid-cols-2 gap-16 mb-24 items-start">
                <div className="space-y-8">
                    <section>
                        <h2 className="text-3xl font-black tracking-tight mb-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                                <Flame className="w-6 h-6" />
                            </div>
                            The Silent Wealth Killer
                        </h2>
                        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                            <p>
                                Inflation is the rate at which the general level of prices for goods and services is rising. In the UK, this is primarily measured by the <strong>Consumer Price Index (CPI)</strong>. If your investment returns don't beat the inflation rate, you are effectively losing money every year.
                            </p>
                            <p className="bg-slate-100 dark:bg-slate-900 p-6 rounded-2xl border-l-4 border-primary italic">
                                "A 7% return in a 5% inflation environment is actually only a 1.9% real gain. It's the difference between growing rich and just standing still."
                            </p>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-2xl font-bold tracking-tight mb-4">Nominal vs. Real Return</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                                <span className="text-[10px] font-black uppercase text-slate-500 block mb-1">Nominal Return</span>
                                <p className="text-sm font-medium">The percentage growth of your money without accounting for price increases.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20">
                                <span className="text-[10px] font-black uppercase text-primary block mb-1">Real Return</span>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">The actual increase in your purchasing power after inflation is subtracted.</p>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-3xl font-black tracking-tight mb-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <Scale className="w-6 h-6" />
                            </div>
                            The Exact Formula
                        </h2>
                        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                            <p>
                                While many people use the simple approximation (Nominal - Inflation), professional UK financial analysts use the <strong>Fisher Equation</strong> for precision:
                            </p>
                            <div className="my-6 p-8 bg-slate-950 text-white rounded-[2rem] border border-white/10 relative overflow-hidden group">
                                <div className="text-center relative z-10">
                                    <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4">FISHER EQUATION</p>
                                    <p className="text-2xl md:text-3xl font-mono text-primary font-black italic">
                                        Real Return = (1 + N) / (1 + I) - 1
                                    </p>
                                </div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl opacity-20"></div>
                            </div>
                            <p className="text-sm italic">Where N = Nominal Return and I = Inflation Rate.</p>
                        </div>
                    </section>

                    <section className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl">
                        <div className="flex items-center gap-4 mb-4">
                            <History className="w-6 h-6 text-slate-400" />
                            <h3 className="text-lg font-black uppercase tracking-tight">UK Historical Context</h3>
                        </div>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed">
                            Historically, UK inflation has averaged around 2-3% annually. However, during periods of economic shock, it has spiked as high as 10%+. This means that cash in a low-interest savings account often yields a <strong>negative real return</strong>, where your money buys less every single year despite earning "interest".
                        </p>
                    </section>
                </div>
            </div>

            {/* FAQS Section */}
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-black tracking-tight mb-2 italic underline decoration-primary/30">Investor Guide: FAQs</h2>
                    <p className="text-slate-500 font-medium">Be smarter with your money by understanding the metrics that matter.</p>
                </div>
                <FAQAccordion faqs={faqs} />
            </div>

            <div className="mt-24 p-12 rounded-[3.5rem] bg-slate-950 text-white relative overflow-hidden group border border-white/5 transition-all hover:border-primary/20">
                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black tracking-widest uppercase text-primary mb-6">
                            <ShieldAlert className="w-3.5 h-3.5" /> Inflation Protection
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Protect Your <br /><span className="text-primary italic">Wealth</span> Potential</h2>
                        <p className="text-slate-400 font-medium leading-relaxed text-lg italic opacity-85">
                            "The goal isn't to have more money. The goal is to be able to buy what you want, when you want it, for the rest of your life."
                        </p>
                    </div>
                    <div className="flex justify-center md:justify-end">
                        <div className="relative">
                            <div className="w-56 h-56 rounded-[3rem] bg-linear-to-br from-primary/20 to-orange-500/20 border border-white/10 flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform duration-700">
                                <Zap className="w-24 h-24 text-primary" />
                            </div>
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-[1.5rem] bg-slate-800 border border-white/10 flex items-center justify-center -rotate-12 group-hover:rotate-0 transition-transform duration-700 delay-75">
                                <Flame className="w-10 h-10 text-orange-500" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-primary/20 rounded-full blur-[100px] opacity-40"></div>
            </div>
        </div>
    );
}
