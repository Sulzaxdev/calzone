import { Metadata } from "next";
import { StocksSharesISACalculatorForm } from "./calculator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
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
    TrendingUp
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Stocks & Shares ISA Calculator UK | Tax-Free Investment Projections",
    description: "Calculate the value of your Stocks & Shares ISA over time. Model your £20,000 allowance, project compound growth, and understand tax-free investment benefits in the UK.",
    keywords: "stocks and shares isa calculator uk, isa allowance calculator, tax-free investment calculator uk, isa growth projection tool, uk stocks isa returns"
};

export default function StocksSharesISACalculatorPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Hero Section with Calculator */}
            <StocksSharesISACalculatorForm />

            <div className="mt-16 grid lg:grid-cols-3 gap-8">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-12">

                    {/* H1 & Overview Section */}
                    <section>
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3 tracking-tight">
                            <ShieldCheck className="w-10 h-10 text-primary" />
                            Stocks & Shares <span className="text-primary italic">ISA Calculator</span>
                        </h1>
                        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-600 dark:text-slate-400">
                            <p className="text-lg leading-relaxed">
                                UK me <strong>Stocks & Shares ISA</strong> sabse powerful investment tool hai kyunke isme aapki sari growth aur dividends <strong>Tax-Free</strong> hote hain. Hamara calculator aapko batayega ke aapka paisa kitna grow ho sakta hai.
                            </p>

                            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-10 border border-slate-200 dark:border-slate-800 relative overflow-hidden group">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight flex items-center gap-2 relative z-10">
                                    <Landmark className="w-6 h-6 text-primary" />
                                    The Power of ISA Shelter
                                </h2>
                                <p className="relative z-10 mb-6 font-medium">
                                    Har individual ko UK me £20,000 ki annual ISA allowance milti hai. Is envelope ke andar:
                                </p>
                                <div className="grid sm:grid-cols-2 gap-4 relative z-10">
                                    <div className="p-5 bg-white dark:bg-black/40 rounded-2xl border border-slate-200 dark:border-white/10 flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                        <div>
                                            <p className="font-bold text-sm">No Capital Gains Tax</p>
                                            <p className="text-[10px] text-slate-500 italic">Be it £100 or £1,000,000 in profit.</p>
                                        </div>
                                    </div>
                                    <div className="p-5 bg-white dark:bg-black/40 rounded-2xl border border-slate-200 dark:border-white/10 flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                        <div>
                                            <p className="font-bold text-sm">No Dividend Tax</p>
                                            <p className="text-[10px] text-slate-500 italic">All income is 100% yours.</p>
                                        </div>
                                    </div>
                                </div>
                                <ArrowUpRight className="absolute -right-8 -bottom-8 w-48 h-48 text-primary/5 dark:text-primary/10 -rotate-12 transition-transform group-hover:rotate-0 duration-700" />
                            </div>
                        </div>
                    </section>

                    {/* ISA Rules */}
                    <section>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 tracking-tight flex items-center gap-3">
                            <Calculator className="w-8 h-8 text-primary" />
                            ISA Allowance <span className="text-primary italic">Rules (2025/26)</span>
                        </h2>
                        <div className="space-y-6">
                            <div className="p-8 rounded-3xl bg-slate-950 text-white border border-white/10 shadow-xl">
                                <div className="grid sm:grid-cols-3 gap-6">
                                    <div className="text-center p-4 border border-white/10 rounded-2xl">
                                        <p className="text-[10px] font-black uppercase text-primary mb-1">Max Allowance</p>
                                        <p className="text-2xl font-black italic">£20,000</p>
                                    </div>
                                    <div className="text-center p-4 border border-white/10 rounded-2xl">
                                        <p className="text-[10px] font-black uppercase text-primary mb-1">Tax Year End</p>
                                        <p className="text-2xl font-black italic">5th April</p>
                                    </div>
                                    <div className="text-center p-4 border border-white/10 rounded-2xl">
                                        <p className="text-[10px] font-black uppercase text-primary mb-1">Growth Tax</p>
                                        <p className="text-2xl font-black italic">0%</p>
                                    </div>
                                </div>
                            </div>

                            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight italic">Why the 5th April matters?</h3>
                                <p>
                                    ISA allowance "use it or lose it" basis par hoti hai. Agar aapne 5th April tak apni £20k limit use nahi ki, to woh carry forward nahi hogi. Naye tax year (6th April) me dobara £20,000 ki fresh limit milti hai.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Comparison Section */}
                    <section>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tighter">
                            ISA vs. <span className="text-primary italic">Standard Brokerage</span>
                        </h2>
                        <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
                            <table className="w-full text-left">
                                <thead className="bg-slate-100 dark:bg-slate-800">
                                    <tr>
                                        <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px]">Feature</th>
                                        <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px]">ISA Account</th>
                                        <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px]">General Account</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm italic">
                                    <tr>
                                        <td className="px-6 py-4 font-bold">Capital Gains</td>
                                        <td className="px-6 py-4 text-green-600 font-black">None</td>
                                        <td className="px-6 py-4">Up to 24%</td>
                                    </tr>
                                    <tr className="bg-slate-50/50 dark:bg-slate-900/30">
                                        <td className="px-6 py-4 font-bold">Dividend Tax</td>
                                        <td className="px-6 py-4 text-green-600 font-black">None</td>
                                        <td className="px-6 py-4">Up to 39.35%</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-bold">Withdrawals</td>
                                        <td className="px-6 py-4 text-green-600 font-black">Tax-Free</td>
                                        <td className="px-6 py-4">Taxable Gains</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section className="space-y-6">
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3 tracking-tight">
                            <HelpCircle className="w-8 h-8 text-primary" />
                            ISA Investment <span className="text-primary italic">FAQ</span>
                        </h2>
                        <Accordion type="single" collapsible className="w-full space-y-3">
                            <AccordionItem value="item-1" className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-black/20 rounded-2xl px-6 py-1">
                                <AccordionTrigger className="hover:no-underline font-bold text-left py-4 text-slate-900 dark:text-white tracking-tight">Can I have multiple ISAs?</AccordionTrigger>
                                <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4 leading-relaxed">
                                    Yes, you can have multiple of different types (Cash, Stocks & Shares, Lifetime). However, your <strong>COMBINED</strong> annual contribution across all of them cannot exceed £20,000.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2" className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-black/20 rounded-2xl px-6 py-1">
                                <AccordionTrigger className="hover:no-underline font-bold text-left py-4 text-slate-900 dark:text-white tracking-tight">What can I invest in within a Stocks & Shares ISA?</AccordionTrigger>
                                <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4 leading-relaxed">
                                    Most UK brokers allow you to invest in a wide range of assets: individual stocks (UK/US/International), Funds, ETFs, and Investment Trusts.
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
                                <TrendingUp className="w-5 h-5 text-primary" />
                                Growth Model
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="p-4 bg-slate-50 dark:bg-black/40 rounded-2xl border border-slate-100 dark:border-white/10">
                                <h4 className="text-xs font-black text-slate-400 uppercase mb-2 tracking-widest leading-none">ISA Tip</h4>
                                <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300 italic font-medium">
                                    "Compound interest is most effective in an ISA because 100% of your earnings stay in the account, rather than a portion being taken by HMRC every year."
                                </p>
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-xs font-black uppercase tracking-widest px-1">Related Tools</h4>
                                <div className="grid gap-2">
                                    {[
                                        { name: "SDRT Calculator", href: "/uk-shares-stamp-duty-calculator" },
                                        { name: "Dividend Tax Cal.", href: "/uk-dividend-tax-calculator" }
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
                                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-linear-to-r from-slate-900 to-slate-800 dark:from-white dark:to-slate-200 text-white dark:text-slate-950 text-xs font-black uppercase tracking-widest transition-all hover:opacity-90 shadow-lg shadow-black/20"
                            >
                                <Coins className="w-4 h-4 text-primary" />
                                Investment Hub
                            </Link>
                        </CardContent>
                    </Card>

                    <div className="p-8 rounded-[2.5rem] bg-amber-500 text-white border border-amber-400 relative overflow-hidden group">
                        <AlertCircle className="w-10 h-10 mb-4" />
                        <h4 className="text-lg font-black italic tracking-tighter mb-2">Important Notice</h4>
                        <p className="text-[10px] leading-relaxed font-bold uppercase tracking-widest opacity-80">
                            Capital at Risk. Tax rules can change. This calculator is for educational illustration only.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
