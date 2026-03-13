
import { PiggyBank, ShieldCheck, BookOpen, AlertCircle, Info, Landmark, LineChart, ChevronRight, Activity, TrendingUp, Sparkles } from "lucide-react";
import { PensionDrawdownCalculatorForm } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { Metadata } from "next";
import { RelatedTools } from "@/components/layout/related-tools";

export const metadata: Metadata = {
    title: "Pension Drawdown Calculator UK | Estimate Retirement Income",
    description: "Use our free Pension Drawdown Calculator to plan your UK retirement income. Estimate how long your pension pot will last, tax-free cash, and compound growth.",
    alternates: {
        canonical: "/pension-drawdown-calculator-uk"
    }
};

export default function PensionDrawdownPage() {
    const faqs = [
        {
            question: "What is Pension Drawdown?",
            answer: "Pension drawdown (or flexi-access drawdown) allows you to leave your pension fund invested while taking income directly from it. You can vary the income you take, unlike an annuity which pays a fixed amount."
        },
        {
            question: "How much tax-free cash can I take?",
            answer: "Under current UK rules, you can usually take up to 25% of your pension pot tax-free. The maximum tax-free cash is currently capped at £268,275. The remaining 75% stays invested and is subject to income tax when withdrawn."
        },
        {
            question: "What happens to a drawdown pension when I die?",
            answer: "If you die before age 75, your beneficiaries can inherit the remaining drawdown fund completely tax-free. If you die after age 75, they will pay income tax on withdrawals at their marginal rate."
        },
        {
            question: "Is pension drawdown risky?",
            answer: "Yes, because your money remains invested in the stock market. If your investments perform poorly or you withdraw too much, your pot could run out before you die."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <BreadcrumbSchema items={[
                { name: "Home", item: "/" },
                { name: "Finance", item: "/finance-driving" },
                { name: "Pension Drawdown Calculator UK", item: "/pension-drawdown-calculator-uk" }
            ]} />
            
            <section className="container mx-auto px-4 pt-16 text-center max-w-4xl">
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-6 border border-indigo-100 dark:border-indigo-900/40">
                    <ShieldCheck className="w-3 h-3" /> UK HMRC Guidelines Applied
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tighter">
                    Pension Drawdown <span className="text-indigo-600 italic">Calculator</span>
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto opacity-90 font-medium">
                    Map out your financial future. Model your retirement income, calculate tax-free cash, and estimate how long your pot will sustain your lifestyle.
                </p>
            </section>

            <PensionDrawdownCalculatorForm />

            {/* SEO Content Section */}
            <section className="container mx-auto px-4 max-w-6xl mt-24 space-y-20">
                
                {/* 1. Complete Drawdown Guide */}
                <div className="bg-white/90 dark:bg-card/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-10 md:p-16 rounded-[3rem] shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 mb-10 flex items-center gap-4 tracking-tight relative z-10">
                        <BookOpen className="w-10 h-10 text-indigo-600" />
                        Mastering Flexi-Access Drawdown in the UK
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-16 text-slate-700 dark:text-slate-300 relative z-10">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-black flex items-center gap-2 text-slate-800 dark:text-slate-200 mb-4">
                                    <TrendingUp className="w-6 h-6 text-emerald-500" /> What makes drawdown powerful?
                                </h3>
                                <p className="leading-relaxed text-lg">
                                    Introduced in the 2015 "Pension Freedoms," flexi-access drawdown revolutionised UK retirement. Instead of being locked into buying an annuity (a guaranteed income for life), you gain total control over your invested capital.
                                </p>
                            </div>
                            <div className="bg-indigo-50/50 dark:bg-indigo-900/10 p-8 rounded-3xl border border-indigo-100 dark:border-indigo-800">
                                <h4 className="font-black text-indigo-900 dark:text-indigo-400 uppercase text-xs tracking-widest mb-4">The 3 Pillars of Drawdown</h4>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3">
                                        <div className="p-1.5 bg-indigo-500 rounded-md text-white"><Sparkles className="w-3 h-3" /></div>
                                        <span className="text-sm font-bold">1. Unlimited Flexibility on Withdrawals</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="p-1.5 bg-indigo-500 rounded-md text-white"><Sparkles className="w-3 h-3" /></div>
                                        <span className="text-sm font-bold">2. Potential for Compound Market Growth</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="p-1.5 bg-indigo-500 rounded-md text-white"><Sparkles className="w-3 h-3" /></div>
                                        <span className="text-sm font-bold">3. Superior Inheritance Tax Efficiency</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <div className="bg-slate-100/50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
                                <h4 className="font-black text-slate-500 uppercase text-[10px] tracking-[0.2em] mb-6">Tax-Free Cash (PCLS) Rules</h4>
                                <div className="space-y-4">
                                    <p className="text-sm leading-relaxed mb-4">
                                        Most individuals can withdraw 25% of their total pot as a 'Pension Commencement Lump Sum' (PCLS). This money is completely free from Income Tax and Capital Gains Tax.
                                    </p>
                                    <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900/30">
                                        <h5 className="font-bold text-amber-900 dark:text-amber-400 mb-1 text-xs uppercase tracking-widest">2026 Lifetime Cap</h5>
                                        <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">Max Tax-Free Amount: £268,275</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Advanced Strategy Section */}
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-10 bg-slate-900 text-white rounded-[2.5rem] shadow-2xl group hover:-translate-y-2 transition-transform duration-500">
                        <LineChart className="w-12 h-12 text-indigo-400 mb-6" />
                        <h3 className="text-2xl font-black mb-4 tracking-tight">Sequence of Returns Risk</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Withdrawing from a falling market (like during a recession) depletes your pot exceptionally fast. Diversification and 'cash buffers' are critical to surviving market downturns.
                        </p>
                    </div>
                    <div className="p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm group hover:-translate-y-2 transition-transform duration-500">
                        <Landmark className="w-12 h-12 text-emerald-500 mb-6" />
                        <h3 className="text-2xl font-black mb-4 tracking-tight">Tax Bracket Management</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Drawdown withdrawals are taxed as standard income. Smart retirees withdraw just enough to stay in the Basic Rate (20%) tax bracket, avoiding Higher Rate (40%) taxes.
                        </p>
                    </div>
                    <div className="p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm group hover:-translate-y-2 transition-transform duration-500">
                        <AlertCircle className="w-12 h-12 text-blue-500 mb-6" />
                        <h3 className="text-2xl font-black mb-4 tracking-tight">The 4% Rule Myth</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Historically, withdrawing 4% annually meant your pot wouldn't run out. In 2026's economic climate, many UK financial advisors now recommend a safer 3% to 3.5% withdrawal rate.
                        </p>
                    </div>
                </div>

                {/* 4. FAQ Section */}
                <FAQAccordion faqs={faqs} title="Pension Drawdown Questions" />

                {/* Final Medical Disclaimer */}
                <div className="bg-red-50/50 dark:bg-red-950/20 p-12 rounded-[3rem] border border-red-100 dark:border-red-900/30 flex flex-col md:flex-row gap-8 items-center text-center md:text-left shadow-sm">
                    <AlertCircle className="w-16 h-16 text-red-600 shrink-0" />
                    <div>
                        <h4 className="text-2xl font-black text-red-800 dark:text-red-400 mb-3 tracking-tight">Financial Advice Warning</h4>
                        <p className="text-sm text-red-700 dark:text-red-300 leading-relaxed font-medium">
                            This calculator generates hypothetical projections based on steady annual growth and inflation. Real stock markets are volatile and do not grow in straight lines. Pension drawdown carries significant risk of capital loss. You should seek independent advice from an FCA-regulated advisor before accessing your pension funds.
                        </p>
                    </div>
                </div>
            </section>

            <RelatedTools currentCategory="Finance" currentSlug="/pension-drawdown-calculator-uk" />
            
            <CalculatorSchema 
                title="Pension Drawdown Calculator UK | Estimate Retirement Income"
                description="Use our free Pension Drawdown Calculator to plan your UK retirement income. Estimate how long your pension pot will last, tax-free cash, and compound growth."
                slug="/pension-drawdown-calculator-uk"
                faqs={faqs}
            />
        </div>
    );
}
