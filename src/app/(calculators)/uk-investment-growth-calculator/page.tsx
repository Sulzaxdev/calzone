import { Metadata } from "next";
import { InvestmentGrowthCalculatorForm } from "./calculator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
    TrendingUp,
    ShieldCheck,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    Landmark,
    HelpCircle,
    Calculator,
    BarChart3,
    ArrowUpRight,
    PieChart,
    Coins
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Investment Growth Calculator UK | Compound Interest Projections",
    description: "Calculate your potential investment returns with our UK compound growth tool. Model lump sums, monthly contributions, and long-term wealth growth.",
    keywords: "investment growth calculator uk, compound interest calculator uk, stock investment calculator uk, investment return calculator uk, long term investment calculator"
};

export default function InvestmentGrowthCalculatorPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Hero Section with Calculator */}
            <InvestmentGrowthCalculatorForm />

            <div className="mt-16 grid lg:grid-cols-3 gap-8">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-12">

                    {/* H1 & What is Compound Growth Section */}
                    <section>
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3 tracking-tight">
                            <TrendingUp className="w-10 h-10 text-primary" />
                            Investment Growth <span className="text-primary italic">Calculator UK</span>
                        </h1>
                        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-600 dark:text-slate-400">
                            <p className="text-lg leading-relaxed">
                                Investment Growth Calculator yeh calculate karta hai ke agar aap <strong>X amount invest</strong> karein aur use <strong>Y% annual return</strong> par long-term hold karein, to compounding ki wajah se aapki wealth kitni grow hogi.
                            </p>

                            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-10 border border-slate-200 dark:border-slate-800 relative overflow-hidden">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight flex items-center gap-2 relative z-10">
                                    <PieChart className="w-6 h-6 text-primary" />
                                    What is Compound Growth?
                                </h2>
                                <p className="relative z-10 mb-6 font-medium">
                                    Compounding is the process where the value of an investment increases because the earnings on an investment, both capital gains and interest, earn interest as time passes.
                                </p>
                                <div className="grid sm:grid-cols-2 gap-4 relative z-10">
                                    <div className="p-4 bg-white dark:bg-black/40 rounded-2xl border border-slate-200 dark:border-white/10">
                                        <p className="text-[10px] font-black text-primary uppercase mb-1">Simple Interest</p>
                                        <p className="text-xs italic">Only the original sum earns money.</p>
                                    </div>
                                    <div className="p-4 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20">
                                        <p className="text-[10px] font-black text-white/80 uppercase mb-1 underline">Compound Interest</p>
                                        <p className="text-xs font-bold italic">Your "Money's Money" makes more money.</p>
                                    </div>
                                </div>
                                <ArrowUpRight className="absolute -right-8 -bottom-8 w-48 h-48 text-primary/5 dark:text-primary/10 -rotate-12" />
                            </div>
                        </div>
                    </section>

                    {/* How it's Calculated */}
                    <section>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 tracking-tight flex items-center gap-3">
                            <Calculator className="w-8 h-8 text-primary" />
                            How Returns Are <span className="text-primary italic">Calculated</span>
                        </h2>
                        <div className="space-y-6">
                            <div className="p-8 rounded-[2rem] bg-slate-950 text-white border border-white/10 group transition-all">
                                <h4 className="text-xs font-black text-primary uppercase tracking-widest mb-4">The Mathematics of Wealth</h4>
                                <div className="text-xl font-mono font-bold italic mb-4">Final Value = Initial × (1 + r)^n</div>
                                <div className="text-xs text-slate-400 space-y-1">
                                    <p>• <strong>r</strong> = annual return rate (decimal e.g. 0.07)</p>
                                    <p>• <strong>n</strong> = number of years</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="relative p-8 rounded-3xl bg-white dark:bg-black/20 border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <h3 className="text-lg font-bold mb-2 tracking-tight">Example Scenario</h3>
                                    <p className="text-xs text-slate-500 mb-4 italic">£10,000 at 8% for 10 years</p>
                                    <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 font-mono text-sm font-black text-primary italic">
                                        £21,589 Final Value
                                    </div>
                                    <p className="mt-4 text-[11px] text-slate-400 leading-relaxed">
                                        Even without adding more money, your initial £10k has more than doubled due to the <strong>exponential nature</strong> of compounding.
                                    </p>
                                </div>
                                <div className="p-8 rounded-3xl bg-linear-to-br from-primary/5 to-transparent border border-primary/20">
                                    <h3 className="text-lg font-bold mb-2 tracking-tight italic">Monthly Influence</h3>
                                    <p className="text-xs text-slate-500 mb-4 italic">Adding £100/month</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Adding just £100 monthly to that same investment would boost your final value to <strong>£39,973</strong> — nearly 4x your initial investment.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section className="space-y-6">
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3 tracking-tight">
                            <HelpCircle className="w-8 h-8 text-primary" />
                            Investment <span className="text-primary italic">FAQ</span>
                        </h2>
                        <Accordion type="single" collapsible className="w-full space-y-3">
                            <AccordionItem value="item-1" className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-black/20 rounded-2xl px-6 py-1">
                                <AccordionTrigger className="hover:no-underline font-bold text-left py-4 text-slate-900 dark:text-white tracking-tight">What is a realistic annual return in the UK?</AccordionTrigger>
                                <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4 leading-relaxed">
                                    Historically, the <strong>FTSE 100</strong> has provided an average total return of around <strong>6–8%</strong> annually over several decades. However, global markets (like the S&P 500) have historically trended slightly higher at 8–10%.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2" className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-black/20 rounded-2xl px-6 py-1">
                                <AccordionTrigger className="hover:no-underline font-bold text-left py-4 text-slate-900 dark:text-white tracking-tight">Should I adjust for inflation?</AccordionTrigger>
                                <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4 leading-relaxed">
                                    Yes. If you expect 7% growth and inflation is 3%, you should model your <strong>Real Return</strong> as 4% to understand the actual purchasing power of your money in the future.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3" className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-black/20 rounded-2xl px-6 py-1">
                                <AccordionTrigger className="hover:no-underline font-bold text-left py-4 text-slate-900 dark:text-white tracking-tight">How does an ISA help with compounding?</AccordionTrigger>
                                <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4 leading-relaxed">
                                    Inside an <strong>ISA</strong>, you pay no tax on capital gains or dividends. This "tax friction" can otherwise eat up 1-2% of your returns annually, which SIGNIFICANTLY impacts your final value over 20-30 years.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </section>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-8">
                    <Card className="rounded-[2.5rem] border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-xl overflow-hidden sticky top-24">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-black uppercase tracking-tighter flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-primary" />
                                Growth Trends
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="p-4 bg-slate-50 dark:bg-black/40 rounded-2xl border border-slate-100 dark:border-white/10">
                                <h4 className="text-xs font-black text-slate-400 uppercase mb-2 tracking-widest leading-none">Market Insight</h4>
                                <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300 italic font-medium">
                                    "Compounding is the eighth wonder of the world. He who understands it, earns it... he who doesn't, pays it." – Albert Einstein
                                </p>
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-xs font-black uppercase tracking-widest px-1">Optimization Tools</h4>
                                <div className="grid gap-2">
                                    {[
                                        { name: "Stocks ISA Calculator", href: "/uk-stocks-shares-isa-calculator" },
                                        { name: "SDRT Calculator", href: "/uk-shares-stamp-duty-calculator" }
                                    ].map((tool) => (
                                        <Link
                                            key={tool.name}
                                            href={tool.href}
                                            className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5 hover:border-primary/50 transition-all group"
                                        >
                                            <span className="text-sm font-bold tracking-tight">{tool.name}</span>
                                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <Link
                                href="/uk-stocks-investments"
                                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-primary text-white text-xs font-black uppercase tracking-widest transition-all hover:bg-primary/90 shadow-lg shadow-primary/20"
                            >
                                <Coins className="w-4 h-4" />
                                Investment Hub
                            </Link>
                        </CardContent>
                    </Card>

                    <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white border border-white/10 relative overflow-hidden group">
                        <ShieldCheck className="w-10 h-10 text-primary mb-4" />
                        <h4 className="text-lg font-bold italic tracking-tight mb-2">E-E-A-T Compliance</h4>
                        <p className="text-[10px] leading-relaxed text-slate-400">
                            Projections are based on standard compounding math used by major UK investment platforms. Remember that investments can go down as well as up.
                        </p>
                        {/* Decorative Blur */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
