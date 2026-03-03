import { SIPCalculator } from "./calculator";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { Metadata } from "next";
import { TrendingUp, Coins, Zap, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
    title: "SIP Calculator UK: Monthly Investment Future Value & Growth",
    description: "Calculate the future value of your monthly investments with our UK SIP calculator. See the power of compound interest for long-term wealth building in the UK stock market.",
    keywords: "SIP Calculator UK, Monthly Investment Calculator, Systematic Investment Plan Calculator, Future Value Investment Calculator, Compound Interest SIP Calculator, Mutual Fund SIP Calculator, how to calculate SIP returns, monthly compounding calculator",
};

export default function SIPCalculatorPage() {
    const faqs = [
        {
            question: "How much will a £200 monthly SIP grow in 10 years?",
            answer: "If you invest £200 per month with an expected annual return of 10%, your portfolio could grow to approximately £41,310 in 10 years. This includes £24,000 in total contributions and over £17,310 in compounded wealth!"
        },
        {
            question: "Is SIP investing safe in the UK?",
            answer: "All investing carries market risk. However, a Systematic Investment Plan (SIP) helps mitigate 'market timing' risk by using pound-cost averaging. By investing every month, you buy more shares when prices are low and fewer when they are high, which often results in a better average entry price over the long term."
        },
        {
            question: "Can I increase my monthly investment later?",
            answer: "Yes! While this basic calculator uses a fixed amount, most platforms allow 'Step-up SIPs' where you increase your contribution annually (e.g., by 5% or 10%) as your salary grows, which significantly accelerates wealth building."
        },
        {
            question: "Which is better: SIP or Lump Sum?",
            answer: "SIPs are ideal for salaried individuals to build discipline and lower risk through averaging. Lump sum investments are better if you have a large capital amount and expect the market to rise immediately. For most retail investors in the UK, a monthly SIP is the preferred stress-free method."
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Header Section */}
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-[1.1]">
                    SIP <span className="text-primary italic">Calculator</span>
                </h1>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
                    Plan your financial freedom with a Systematic Investment Plan. Visualize how consistent monthly contributions grow into a substantial UK wealth fund.
                </p>
            </div>

            {/* Calculator Component */}
            <div className="mb-24">
                <SIPCalculator />
            </div>

            {/* SEO Content Section */}
            <div className="grid lg:grid-cols-2 gap-16 mb-24">
                <div className="space-y-8">
                    <section>
                        <h2 className="text-3xl font-black tracking-tight mb-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <Coins className="w-6 h-6" />
                            </div>
                            What is a SIP?
                        </h2>
                        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                            <p>
                                A <strong>Systematic Investment Plan (SIP)</strong> is a disciplined way to invest a fixed amount of money at regular intervals—usually monthly. In the UK, this is the most common way to invest in Stocks & Shares ISAs, Index Funds (like the FTSE 100), and even Pensions.
                            </p>
                            <p>
                                Instead of trying to "time the market," a SIP allows you to benefit from <strong>Pound-Cost Averaging</strong>. You stay invested through market ups and downs, building wealth steadily over decades.
                            </p>
                        </div>
                    </section>

                    <section className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem]">
                        <h3 className="text-2xl font-bold tracking-tight mb-4 italic">The Power of Compounding</h3>
                        <p className="text-slate-600 dark:text-slate-400 font-medium mb-6">
                            Compounding happens when the returns on your investment start generating their own returns. The longer you stay invested, the more powerful this effect becomes.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                                <span className="text-[10px] font-black uppercase text-primary block mb-1">Time</span>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">Your greatest asset. Start early to maximize gains.</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                                <span className="text-[10px] font-black uppercase text-primary block mb-1">Consistency</span>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">Regular monthly habits beat erratic lump sums.</p>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-3xl font-black tracking-tight mb-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            Calculation Formula
                        </h2>
                        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                            <p className="mb-4">
                                Our calculator uses the standard Future Value formula for an annuity due, which is the mathematical basis for SIP growth:
                            </p>
                            <div className="p-6 bg-slate-950 text-primary font-mono text-center rounded-2xl border border-white/10 mb-6">
                                FV = P × [(1 + r)^n - 1] / r × (1 + r)
                            </div>
                            <ul className="list-disc pl-5 space-y-2 opacity-80 decoration-primary text-sm">
                                <li><strong>P</strong> = Monthly Investment amount</li>
                                <li><strong>r</strong> = Monthly interest rate (Annual rate / 12 / 100)</li>
                                <li><strong>n</strong> = Total number of months (Years × 12)</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-2xl font-bold tracking-tight mb-3">SIP vs Lump Sum Investment</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary transition-colors">
                                <div className="p-2 bg-primary/20 rounded-full"><ShieldCheck className="w-5 h-5 text-primary" /></div>
                                <div>
                                    <p className="font-bold text-slate-900 dark:text-white leading-none">Lower Risk</p>
                                    <span className="text-xs text-slate-500">SIP averages out the cost of acquisition over time.</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary transition-colors">
                                <div className="p-2 bg-primary/20 rounded-full"><Zap className="w-5 h-5 text-primary" /></div>
                                <div>
                                    <p className="font-bold text-slate-900 dark:text-white leading-none">Accessible</p>
                                    <span className="text-xs text-slate-500">Start with as little as £25 a month.</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* FAQS Section */}
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-black tracking-tight mb-2 uppercase">Frequently Asked Questions</h2>
                    <p className="text-slate-500 font-medium">Clear answers for your monthly investment strategy.</p>
                </div>
                <FAQAccordion faqs={faqs} />
            </div>

            <div className="mt-24 p-12 rounded-[3rem] bg-slate-950 text-white relative overflow-hidden group">
                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center text-center md:text-left">
                    <div>
                        <h2 className="text-4xl font-black mb-6 italic tracking-tight">Invest in Your <span className="text-primary underline decoration-primary/30 underline-offset-8">Future Self</span></h2>
                        <p className="text-slate-400 font-medium leading-relaxed text-lg mb-8 italic opacity-80">
                            "The best time to plant a tree was 20 years ago. The second best time is today."
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="px-5 py-2 rounded-full bg-white/10 border border-white/10 text-[10px] font-black tracking-widest uppercase">Pound-Cost Averaging</div>
                            <div className="px-5 py-2 rounded-full bg-white/10 border border-white/10 text-[10px] font-black tracking-widest uppercase">UK Target 8-10%</div>
                        </div>
                    </div>
                    <div className="flex justify-center md:justify-end">
                        <div className="w-48 h-48 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center relative scale-110 group-hover:scale-125 transition-transform duration-700">
                            <TrendingUp className="w-24 h-24 text-primary" />
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
            </div>
        </div>
    );
}
