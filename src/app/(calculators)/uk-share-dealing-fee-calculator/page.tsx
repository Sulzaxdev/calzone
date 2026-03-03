import { Metadata } from "next";
import { ShareDealingFeeCalculatorForm } from "./calculator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
    Receipt,
    ShieldCheck,
    TrendingUp,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    Landmark,
    HelpCircle,
    Calculator,
    Info,
    History,
    CreditCard,
    Globe,
    Briefcase,
    Percent
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Share Dealing Fee Calculator UK | Broker Commission & Platform Charges",
    description: "Calculate the total cost of trading UK and international shares. Compare broker commissions, platform fees, FX charges, and Stamp Duty to maximize your returns.",
    keywords: "share dealing fee calculator uk, uk broker commission calculator, stock trading cost calculator uk, uk trading fees calculator, online broker fee calculator uk"
};

export default function ShareDealingFeeCalculatorPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Hero Section with Calculator */}
            <ShareDealingFeeCalculatorForm />

            <div className="mt-16 grid lg:grid-cols-3 gap-8">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-12">

                    {/* H1 & Overview Section */}
                    <section>
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3 tracking-tight">
                            <CreditCard className="w-10 h-10 text-primary" />
                            Share Dealing Fee <span className="text-primary italic">Calculator UK</span>
                        </h1>
                        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-600 dark:text-slate-400">
                            <p className="text-lg leading-relaxed">
                                Agar aap UK stock market me shares buy/sell karte ho, to sirf share price hi nahi — <strong>broker commission + platform fee + other charges</strong> bhi lagte hain. Hamara calculator aapko total transaction cost dikhata hai taake aap sahi decision le sakein.
                            </p>

                            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight flex items-center gap-2">
                                    <Briefcase className="w-6 h-6 text-primary" />
                                    What Are Share Dealing Fees?
                                </h2>
                                <p className="mb-4">
                                    Jab aap broker ke through trade karte ho, to woh mutalif kism ke charges apply karte hain:
                                </p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { title: "Dealing Commission", desc: "Per-trade fixed or % fee charged by the broker." },
                                        { title: "Platform Fee", desc: "Ongoing custody charge for holding your assets." },
                                        { title: "FX Fee", desc: "Charged when buying non-GBP shares (e.g., US stocks)." },
                                        { title: "Stamp Duty", desc: "0.5% SDRT on UK-registered share purchases." }
                                    ].map((item, i) => (
                                        <div key={i} className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
                                            <h4 className="text-sm font-black uppercase text-primary mb-1">{item.title}</h4>
                                            <p className="text-xs">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Calculation Logic */}
                    <section>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 tracking-tight flex items-center gap-3">
                            <Calculator className="w-8 h-8 text-primary" />
                            Broker Commission <span className="text-primary italic">Explained</span>
                        </h2>
                        <div className="space-y-6">
                            <div className="p-8 rounded-3xl bg-slate-950 text-white border border-white/10 shadow-2xl relative overflow-hidden group">
                                <span className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-2 block">The Formula</span>
                                <p className="text-2xl font-bold italic tracking-tight mb-4">Total Cost = Commission + Platform Fee + Other Charges</p>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 font-mono text-sm leading-relaxed text-slate-300 italic transition-all group-hover:bg-white/10">
                                    Example: £9.95 (Comm) + £25 (FX) + £50 (SDRT) = <span className="text-primary font-black">£84.95 Total Fee</span>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="p-6 rounded-3xl bg-white dark:bg-black/20 border border-slate-200 dark:border-slate-800">
                                    <h4 className="font-bold mb-2 flex items-center gap-2 tracking-tight">
                                        <Percent className="w-4 h-4 text-primary" />
                                        Percentage Based
                                    </h4>
                                    <p className="text-xs text-slate-500 mb-3 italic">"0.1% per trade with Minimum £5"</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">If you buy £3,000, 0.1% is £3. But the <strong>minimum rule</strong> applies, so you pay £5.</p>
                                </div>
                                <div className="p-6 rounded-3xl bg-white dark:bg-black/20 border border-slate-200 dark:border-slate-800">
                                    <h4 className="font-bold mb-2 flex items-center gap-2 tracking-tight">
                                        <Globe className="w-4 h-4 text-amber-500" />
                                        FX Charges
                                    </h4>
                                    <p className="text-xs text-slate-500 mb-3 italic">"0.5% on US share purchase"</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">If you buy £5,000 of Apple shares, the FX fee is <strong>£25</strong> added to your cost.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Example Scenarios */}
                    <section>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tighter">
                            Example Transaction <span className="text-primary italic">Costs</span>
                        </h2>
                        <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
                            <table className="w-full text-left">
                                <thead className="bg-slate-100 dark:bg-slate-800">
                                    <tr>
                                        <th className="px-6 py-4 font-black uppercase tracking-widest text-xs">Purchase</th>
                                        <th className="px-6 py-4 font-black uppercase tracking-widest text-xs">Commission</th>
                                        <th className="px-6 py-4 font-black uppercase tracking-widest text-xs">Other Fees</th>
                                        <th className="px-6 py-4 font-black uppercase tracking-widest text-xs">Total Cost</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                                    <tr>
                                        <td className="px-6 py-4 font-bold">£1,000</td>
                                        <td className="px-6 py-4 leading-relaxed text-slate-600 italic">£9.95</td>
                                        <td className="px-6 py-4 leading-relaxed text-slate-600 italic">£0</td>
                                        <td className="px-6 py-4 font-black text-primary italic">£9.95</td>
                                    </tr>
                                    <tr className="bg-slate-50/50 dark:bg-slate-900/30">
                                        <td className="px-6 py-4 font-bold">£5,000</td>
                                        <td className="px-6 py-4 leading-relaxed text-slate-600 italic">£9.95</td>
                                        <td className="px-6 py-4 leading-relaxed text-slate-600 italic">£10 (FX)</td>
                                        <td className="px-6 py-4 font-black text-primary italic">£19.95</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-bold">£10,000</td>
                                        <td className="px-6 py-4 leading-relaxed text-slate-600 italic">0.1% (£10)</td>
                                        <td className="px-6 py-4 leading-relaxed text-slate-600 italic">£25 (FX)</td>
                                        <td className="px-6 py-4 font-black text-primary italic">£35.00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* FAQ/Comparison Section */}
                    <section className="space-y-6">
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3 tracking-tight">
                            <HelpCircle className="w-8 h-8 text-primary" />
                            Trading Cost <span className="text-primary italic">FAQ</span>
                        </h2>
                        <Accordion type="single" collapsible className="w-full space-y-3">
                            <AccordionItem value="item-1" className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-black/20 rounded-2xl px-6 py-1">
                                <AccordionTrigger className="hover:no-underline font-bold text-left py-4 text-slate-900 dark:text-white tracking-tight">Is Zero Commission really free?</AccordionTrigger>
                                <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4 leading-relaxed">
                                    Not necessarily. Many "zero commission" brokers make money through higher <strong>FX fees</strong> (when buying non-GBP shares) or larger <strong>bid-ask spreads</strong>. Always check the total cost using this calculator.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2" className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-black/20 rounded-2xl px-6 py-1">
                                <AccordionTrigger className="hover:no-underline font-bold text-left py-4 text-slate-900 dark:text-white tracking-tight">What is a Platform Fee vs. a Dealing Fee?</AccordionTrigger>
                                <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4 leading-relaxed">
                                    A <strong>Dealing Fee</strong> is charged every time you buy or sell. A <strong>Platform Fee</strong> is an ongoing charge (usually monthly or quarterly) effectively paying for the admin and holding of your investments.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3" className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-black/20 rounded-2xl px-6 py-1">
                                <AccordionTrigger className="hover:no-underline font-bold text-left py-4 text-slate-900 dark:text-white tracking-tight">Do I pay Stamp Duty on all orders?</AccordionTrigger>
                                <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4 leading-relaxed">
                                    No. Stamp Duty (0.5% SDRT) strictly applies to <strong>UK incorporated companies</strong>. US stocks, most ETFs, and AIM shares are typically exempt from this specific tax.
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
                                Broker Insights
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="p-5 bg-white dark:bg-black/40 rounded-2xl border border-primary/10 transition-all hover:bg-white/80 dark:hover:bg-black/60">
                                <h4 className="text-xs font-black text-primary uppercase mb-2">Market Trend 2026</h4>
                                <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                                    UK brokers are increasingly moving toward subscription-based models or 0.25% annual caps. For frequent traders, a fixed commission structure usually works out cheaper than a percentage model.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-xs font-black uppercase tracking-widest px-1">Next Steps</h4>
                                <div className="grid gap-2">
                                    {[
                                        { name: "Investment Growth", href: "/uk-investment-growth-calculator" },
                                        { name: "Dividend Yield", href: "/uk-dividend-yield-calculator" }
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
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-slate-500">Calculator Methodology</h4>
                        <p className="text-[11px] leading-relaxed italic text-slate-600 dark:text-slate-400">
                            "Our logic accounts for the most common UK broker fee structures, including flat-fee models (Hargreaves Lansdown / AJ Bell) and percentage-based commission rules with minimums."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
