import { Metadata } from "next";
import { DividendTaxCalculatorForm } from "./calculator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, AlertCircle, Info, Landmark, ExternalLink, Calculator, BookOpen, HelpCircle, TrendingUp, ShieldCheck, Coins, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "UK Dividend Tax Calculator 2025/26 | HMRC Allowance & Rates",
    description: "Calculate your UK dividend tax liability for the 2024/25 and 2025/26 tax years. Learn about the £500 allowance, tax bands (8.75%, 33.75%, 39.35%) and ISA benefits.",
    keywords: "dividend tax calculator uk, uk dividend tax allowance 2025/26, hmrc dividend tax, dividend tax basic rate, higher rate dividend tax uk, investment tax calculator"
};

export default function DividendTaxCalculatorPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Hero Section with Calculator */}
            <DividendTaxCalculatorForm />

            <div className="mt-16 grid lg:grid-cols-3 gap-8">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-12">

                    {/* Overview Section */}
                    <section>
                        <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3 tracking-tight">
                            <Coins className="w-10 h-10 text-primary" />
                            UK Dividend Tax <span className="text-primary italic">Overview</span>
                        </h2>
                        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
                            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                                UK me agar aapko shares se <strong>Dividend Income</strong> milti hai (company profits ka hissa), to us par bhi tax lagta hai — bas capital gains jaisa nahi, different rates apply hote hain depending on your income tax band.
                            </p>
                            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 tracking-tight">
                                    <TrendingUp className="w-6 h-6 text-primary" />
                                    How it Works: Current UK Rates & Allowances
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                                    Your tax liability is determined by your total annual dividends, your annual allowance, and your specific income tax band.
                                </p>
                                <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-slate-100 dark:bg-slate-800">
                                            <tr>
                                                <th className="px-4 py-3 font-bold uppercase tracking-wider">Tax Band</th>
                                                <th className="px-4 py-3 font-bold uppercase tracking-wider">Dividend Tax Rate</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                            <tr>
                                                <td className="px-4 py-3 font-medium">Basic Rate (up to £50,270)</td>
                                                <td className="px-4 py-3 font-bold text-primary">8.75%</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 font-medium">Higher Rate (£50,271 – £125,140)</td>
                                                <td className="px-4 py-3 font-bold text-primary">33.75%</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 font-medium">Additional Rate (over £125,140)</td>
                                                <td className="px-4 py-3 font-bold text-primary">39.35%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Logic Breakdown */}
                    <section>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3 tracking-tight">
                            <Calculator className="w-8 h-8 text-primary" />
                            Dividend Tax <span className="text-primary italic">Calculation Logic</span>
                        </h2>
                        <div className="grid gap-6">
                            {[
                                {
                                    step: "STEP 1",
                                    title: "Dividends Add Karte Ho",
                                    desc: "Pehle total dividend income add hoti hai: Total Dividend = Dividend1 + Dividend2 + ... + DividendN.",
                                    example: "Example: £1,200 + £800 = £2,000"
                                },
                                {
                                    step: "STEP 2",
                                    title: "Use Dividend Allowance Milta Hai",
                                    desc: "Har UK individual ko tax-free dividend allowance milta hai. For 2024/25 & 2025/26, this is £500 (Previously £1,000).",
                                    example: "£2,000 − £500 = £1,500 Taxable"
                                },
                                {
                                    step: "STEP 3",
                                    title: "Dividend Tax Rate Lagate Ho",
                                    desc: "Dividend taxable amount par tax lagta hai based on your income tax band (Basic, Higher, or Additional).",
                                    example: "£1,500 × 8.75% = £131.25"
                                }
                            ].map((step, idx) => (
                                <div key={idx} className="relative p-6 rounded-3xl bg-white dark:bg-black/20 border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <div className="absolute -top-3 left-6 px-3 py-1 bg-primary text-white text-[10px] font-black rounded-full uppercase tracking-widest">{step.step}</div>
                                    <h4 className="text-lg font-bold mb-2 tracking-tight mt-2">{step.title}</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{step.desc}</p>
                                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-xs font-mono font-bold text-primary italic">
                                        {step.example}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section className="space-y-6">
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3 tracking-tight">
                            <HelpCircle className="w-8 h-8 text-primary" />
                            Common Questions <span className="text-primary italic">(FAQ)</span>
                        </h2>
                        <Accordion type="single" collapsible className="w-full space-y-3">
                            <AccordionItem value="item-1" className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-black/20 rounded-2xl px-6 py-1">
                                <AccordionTrigger className="hover:no-underline font-bold text-left py-4">Do I pay tax on dividends in an ISA or Pension?</AccordionTrigger>
                                <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4 leading-relaxed">
                                    No. Dividend tax doesn’t apply on shares held in an <strong>ISA</strong> or <strong>Pension funds</strong>. This is one of the most effective ways to shield your investment income from HMRC.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2" className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-black/20 rounded-2xl px-6 py-1">
                                <AccordionTrigger className="hover:no-underline font-bold text-left py-4">When do I need to inform HMRC about dividends?</AccordionTrigger>
                                <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4 leading-relaxed">
                                    If you pay tax via Self Assessment, you declare dividend income in your tax return. Generally, if your dividends exceed the £500 allowance, you must inform HMRC either through your tax code or a Self Assessment return if they exceed £10,000.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3" className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-black/20 rounded-2xl px-6 py-1">
                                <AccordionTrigger className="hover:no-underline font-bold text-left py-4">Is Dividend Tax separate from Income Tax?</AccordionTrigger>
                                <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4 leading-relaxed">
                                    Yes, it’s a separate tax type with its own rates, but the <strong>rate you pay</strong> is determined by your total taxable income (Salary + Dividends + Other). It is separate from Capital Gains Tax (CGT).
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    <Card className="rounded-[2rem] border-primary/20 bg-primary/5 overflow-hidden sticky top-24 shadow-xl shadow-primary/5">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-black uppercase tracking-tighter flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-primary" />
                                Latest Updates
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 bg-white dark:bg-black/40 rounded-2xl border border-primary/10">
                                <p className="text-xs font-bold text-primary mb-1 uppercase tracking-widest">Recent Trend</p>
                                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
                                    Dividend Allowance was recently reduced from £2,000 to £1,000, and now to <strong>£500</strong> for the 2024/25 tax year.
                                </p>
                            </div>
                            <Link
                                href="https://www.gov.uk/tax-on-dividends"
                                target="_blank"
                                className="inline-flex items-center gap-2 text-xs font-black text-primary hover:underline group px-1"
                            >
                                Official HMRC Guidance
                                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>
                        </CardContent>
                    </Card>

                    <div className="p-8 rounded-[2.5rem] bg-slate-900 border border-white/10 text-white space-y-6 relative overflow-hidden group">
                        <div className="relative z-10">
                            <TrendingUp className="w-10 h-10 text-primary mb-4" />
                            <h3 className="text-2xl font-black italic tracking-tight leading-none mb-2">Investment Hub</h3>
                            <p className="text-sm text-slate-400 leading-relaxed font-medium mb-6">
                                Explore our full suite of premium UK investment and tax tools.
                            </p>
                            <Link
                                href="/uk-stocks-investments"
                                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-primary hover:bg-primary/90 text-sm font-black uppercase tracking-widest transition-all shadow-lg shadow-primary/20"
                            >
                                View All Tools
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        {/* Decorative blur */}
                        <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors"></div>
                    </div>

                    <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <h4 className="text-sm font-bold mb-3 flex items-center gap-2 tracking-tight">
                            <ShieldCheck className="w-4 h-4 text-primary" />
                            E-E-A-T Compliance
                        </h4>
                        <p className="text-[10px] text-slate-500 leading-relaxed">
                            This calculator is designed based on official HMRC guidance for the 2024/25 tax year. Always consult with a qualified financial advisor for personalized tax planning.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
