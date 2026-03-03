import { Metadata } from "next";
import { DividendYieldCalculatorForm } from "./calculator";
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
    Coins,
    Percent
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Dividend Yield Calculator UK | Annual Share Income Calculator",
    description: "Calculate the dividend yield of any UK or international stock. Understand yield formulas, evaluate high-yield risks, and project your annual investment income.",
    keywords: "dividend yield calculator uk, dividend yield formula explained, uk share dividend calculator, stock dividend return calculator, how to calculate dividend yield uk"
};

export default function DividendYieldCalculatorPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Hero Section with Calculator */}
            <DividendYieldCalculatorForm />

            <div className="mt-16 grid lg:grid-cols-3 gap-8">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-12">

                    {/* H1 & What is Dividend Yield Section */}
                    <section>
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3 tracking-tight">
                            <Percent className="w-10 h-10 text-primary" />
                            Dividend Yield <span className="text-primary italic">Calculator UK</span>
                        </h1>
                        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-600 dark:text-slate-400">
                            <p className="text-lg leading-relaxed">
                                Dividend Yield Calculator yeh batata hai ke kisi share ki price ke muqable me aapko kitna <strong>% dividend income</strong> mil rahi hai. Yeh income investors ke liye ek fundamental metric hai.
                            </p>

                            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight flex items-center gap-2">
                                    <PieChart className="w-6 h-6 text-primary" />
                                    What is Dividend Yield?
                                </h2>
                                <p className="mb-4">
                                    Dividend yield ek percentage return hota hai jo company ke annual dividend aur current share price ke comparison me calculate hota hai.
                                </p>
                                <ul className="grid sm:grid-cols-2 gap-3 list-none p-0">
                                    {[
                                        "Zyada yield = Zyada income",
                                        "Asset price ke relative return",
                                        "UK FTSE companies yield for dynamic income",
                                        "Risk vs Reward evaluation tool"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                                            <CheckCircle2 className="w-4 h-4 text-primary" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Calculation Logic */}
                    <section>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 tracking-tight flex items-center gap-3">
                            <Calculator className="w-8 h-8 text-primary" />
                            Dividend Yield <span className="text-primary italic">Formula Explained</span>
                        </h2>
                        <div className="space-y-6">
                            <div className="p-10 rounded-[2.5rem] bg-slate-950 text-white border border-white/10 shadow-2xl relative overflow-hidden group">
                                <span className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-4 block">The Core Formula</span>
                                <p className="text-3xl font-black italic tracking-tighter mb-4 leading-none">
                                    Dividend Yield (%) = <br />
                                    (Dividend Per Share ÷ Share Price) × 100
                                </p>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 font-mono text-sm text-slate-400 italic">
                                    Example: (£0.50 ÷ £10) × 100 = <span className="text-primary font-black">5% Yield</span>
                                </div>
                                <ArrowUpRight className="absolute -right-4 -top-4 w-32 h-32 text-white/5 group-hover:text-primary/10 transition-colors" />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="p-6 rounded-3xl bg-white dark:bg-black/20 border border-slate-200 dark:border-slate-800">
                                    <h4 className="font-bold mb-2 flex items-center gap-2 tracking-tight">
                                        <Coins className="w-4 h-4 text-primary" />
                                        Case Study: BP (Style)
                                    </h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        Annual Dividend = £0.30 <br />
                                        Share Price = £5 <br />
                                        <strong>Result: 6% Yield</strong>
                                    </p>
                                </div>
                                <div className="p-6 rounded-3xl bg-white dark:bg-black/20 border border-slate-200 dark:border-slate-800">
                                    <h4 className="font-bold mb-2 flex items-center gap-2 tracking-tight italic">
                                        <Landmark className="w-4 h-4 text-amber-500" />
                                        UK Market Context
                                    </h4>
                                    <p className="text-xs text-slate-500 leading-relaxed italic">
                                        UK me FTSE 100 companies historically strong dividend culture rakhte hain, aksar 3–5% ke darmiyaan average yield dete hain.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Yield Interpretation */}
                    <section>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tighter">
                            Yield <span className="text-primary italic">Interpretation Table</span>
                        </h2>
                        <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
                            <table className="w-full text-left">
                                <thead className="bg-slate-100 dark:bg-slate-800">
                                    <tr>
                                        <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px]">Yield % Range</th>
                                        <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px]">Market Interpretation</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                                    <tr>
                                        <td className="px-6 py-4 font-bold">1% – 2.5%</td>
                                        <td className="px-6 py-4 text-slate-500 italic">Moderate growth stock income</td>
                                    </tr>
                                    <tr className="bg-slate-50/50 dark:bg-slate-900/30">
                                        <td className="px-6 py-4 font-bold">3% – 5.5%</td>
                                        <td className="px-6 py-4 text-green-600 dark:text-green-400 font-bold italic">Healthy & Stable Income</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-bold text-amber-500">6%+</td>
                                        <td className="px-6 py-4 text-amber-600 dark:text-amber-400 font-bold italic">High Yield (Check sustainability)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section className="space-y-6">
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3 tracking-tight">
                            <HelpCircle className="w-8 h-8 text-primary" />
                            Dividend <span className="text-primary italic">FAQ</span>
                        </h2>
                        <Accordion type="single" collapsible className="w-full space-y-3">
                            <AccordionItem value="item-1" className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-black/20 rounded-2xl px-6 py-1">
                                <AccordionTrigger className="hover:no-underline font-bold text-left py-4 text-slate-900 dark:text-white tracking-tight">Is a higher yield always better?</AccordionTrigger>
                                <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4 leading-relaxed">
                                    Not necessarily. An extremely high yield can sometimes be a warning sign (a "yield trap") where the share price has collapsed because investors expect the dividend to be <strong>cut or cancelled</strong>.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2" className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-black/20 rounded-2xl px-6 py-1">
                                <AccordionTrigger className="hover:no-underline font-bold text-left py-4 text-slate-900 dark:text-white tracking-tight">How often are dividends usually paid?</AccordionTrigger>
                                <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4 leading-relaxed">
                                    In the UK, many large companies pay dividends <strong>twice a year</strong> (interim and final). However, some follow the US model and pay <strong>quarterly</strong>.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </section>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-8">
                    <Card className="rounded-[2.5rem] border-primary/20 bg-primary/5 shadow-xl shadow-primary/5 overflow-hidden sticky top-24">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-black uppercase tracking-tighter flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-primary" />
                                Income Strategy
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="p-5 bg-white dark:bg-black/40 rounded-2xl border border-primary/10 transition-all hover:bg-white/80 dark:hover:bg-black/60">
                                <h4 className="text-xs font-black text-primary uppercase mb-2">Yield Insight</h4>
                                <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                                    Yield is dynamic. If share prices fall but the dividend remains the same, the yield goes UP. This is why valuation is critical for income seeking investors.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-xs font-black uppercase tracking-widest px-1">Optimization Tools</h4>
                                <div className="grid gap-2">
                                    {[
                                        { name: "Dividend Tax Cal.", href: "/uk-dividend-tax-calculator" },
                                        { name: "Investment Growth", href: "/uk-investment-growth-calculator" }
                                    ].map((tool) => (
                                        <Link
                                            key={tool.name}
                                            href={tool.href}
                                            className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all group"
                                        >
                                            <span className="text-sm font-bold tracking-tight">{tool.name}</span>
                                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <Link
                                href="/uk-stocks-investments"
                                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-black uppercase tracking-widest transition-all hover:opacity-90"
                            >
                                <TrendingUp className="w-4 h-4 text-primary" />
                                Investment Hub
                            </Link>
                        </CardContent>
                    </Card>

                    <div className="p-8 rounded-[2.5rem] bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-slate-500">Investor Guide</h4>
                        <p className="text-[11px] leading-relaxed italic text-slate-600 dark:text-slate-400">
                            "When a yield exceeds 8% in the FTSE 100, professional analysts often look for signs of a pending dividend cut. High yields must be backed by stable cash flows."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
