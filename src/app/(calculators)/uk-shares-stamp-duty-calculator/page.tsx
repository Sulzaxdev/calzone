import { Metadata } from "next";
import { StampDutyCalculatorForm } from "./calculator";
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
    History
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Stamp Duty Calculator UK Shares (0.5% SDRT) | Free Tax Tool",
    description: "Calculate Stamp Duty Reserve Tax (SDRT) on UK share purchases. Accurate 0.5% calculation for London Stock Exchange trades with expert HMRC guidance.",
    keywords: "uk stamp duty calculator shares, stamp duty on uk shares, sdrt calculator uk, 0.5% stamp duty uk shares, uk share purchase tax calculator"
};

export default function StampDutySharesCalculatorPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Hero Section with Calculator */}
            <StampDutyCalculatorForm />

            <div className="mt-16 grid lg:grid-cols-3 gap-8">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-12">

                    {/* H1 & What is SDRT Section */}
                    <section>
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3 tracking-tight">
                            <Receipt className="w-10 h-10 text-primary" />
                            Stamp Duty Calculator UK Shares <span className="text-primary italic">(0.5% SDRT)</span>
                        </h1>
                        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-600 dark:text-slate-400">
                            <p className="text-lg leading-relaxed">
                                Agar aap UK listed shares kharidte ho, to normally aapko <strong>0.5% Stamp Duty Reserve Tax (SDRT)</strong> pay karna hota hai. Yeh tax automatically broker ke through collect hota hai aur buyer pay karta hai.
                            </p>

                            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight flex items-center gap-2">
                                    <Landmark className="w-6 h-6 text-primary" />
                                    What is Stamp Duty on UK Shares?
                                </h2>
                                <p className="mb-4">
                                    Stamp Duty Reserve Tax (SDRT) is a specific tax levied by the UK government on the transfer of electronic shares in a UK incorporated company.
                                </p>
                                <ul className="grid sm:grid-cols-2 gap-3 list-none p-0">
                                    {[
                                        "0.5% charge hota hai",
                                        "Sirf UK incorporated companies",
                                        "Automatically broker collect karta hai",
                                        "Buyer pay karta hai (seller nahi)"
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
                            How to Calculate <span className="text-primary italic">0.5% Stamp Duty</span>
                        </h2>
                        <div className="space-y-6">
                            <div className="relative p-8 rounded-3xl bg-white dark:bg-black/20 border border-slate-200 dark:border-slate-800 shadow-sm">
                                <span className="absolute -top-3 left-8 px-3 py-1 bg-primary text-white text-[10px] font-black rounded-full uppercase tracking-widest">STEP 1</span>
                                <h3 className="text-lg font-bold mb-2 tracking-tight">Total Purchase Value Calculate Karo</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Purchase Value = Number of Shares × Price Per Share</p>
                                <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 font-mono text-xs italic">
                                    1,000 shares × £2 per share = £2,000
                                </div>
                            </div>

                            <div className="relative p-8 rounded-3xl bg-white dark:bg-black/20 border border-slate-200 dark:border-slate-800 shadow-sm">
                                <span className="absolute -top-3 left-8 px-3 py-1 bg-primary text-white text-[10px] font-black rounded-full uppercase tracking-widest">STEP 2</span>
                                <h3 className="text-lg font-bold mb-2 tracking-tight">0.5% Apply Karo</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Stamp Duty = £2,000 × 0.5% (or 0.005)</p>
                                <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 font-mono text-xs italic">
                                    £2,000 × 0.005 = £10
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Comparison Table */}
                    <section>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tighter">
                            Example Calculation <span className="text-primary italic">Scenarios</span>
                        </h2>
                        <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
                            <table className="w-full text-left">
                                <thead className="bg-slate-100 dark:bg-slate-800">
                                    <tr>
                                        <th className="px-6 py-4 font-black uppercase tracking-widest text-xs">Purchase Amount</th>
                                        <th className="px-6 py-4 font-black uppercase tracking-widest text-xs">Stamp Duty (0.5%)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                                    <tr>
                                        <td className="px-6 py-4 font-bold">£1,000</td>
                                        <td className="px-6 py-4 font-black text-primary italic">£5</td>
                                    </tr>
                                    <tr className="bg-slate-50/50 dark:bg-slate-900/30">
                                        <td className="px-6 py-4 font-bold">£5,000</td>
                                        <td className="px-6 py-4 font-black text-primary italic">£25</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-bold">£10,000</td>
                                        <td className="px-6 py-4 font-black text-primary italic">£50</td>
                                    </tr>
                                    <tr className="bg-slate-50/50 dark:bg-slate-900/30">
                                        <td className="px-6 py-4 font-bold">£50,000</td>
                                        <td className="px-6 py-4 font-black text-primary italic">£250</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* FAQ/Exemptions Section */}
                    <section className="space-y-6">
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3 tracking-tight">
                            <HelpCircle className="w-8 h-8 text-primary" />
                            Exemptions & <span className="text-primary italic">Rules</span>
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-6 rounded-3xl bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900">
                                <h4 className="font-bold mb-3 flex items-center gap-2 text-green-700 dark:text-green-400 tracking-tight">
                                    <CheckCircle2 className="w-5 h-5" />
                                    Kab Stamp Duty Nahi Lagta?
                                </h4>
                                <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-400">
                                    <li>• Foreign shares (US, Europe, etc.)</li>
                                    <li>• AIM shares (usually exempt)</li>
                                    <li>• ETFs (often exempt)</li>
                                    <li>• Physical certificates &lt; £1,000</li>
                                </ul>
                            </div>
                            <div className="p-6 rounded-3xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900">
                                <h4 className="font-bold mb-3 flex items-center gap-2 text-amber-700 dark:text-amber-400 tracking-tight">
                                    <AlertCircle className="w-5 h-5" />
                                    Important Notes
                                </h4>
                                <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-400">
                                    <li>• Collected automatically via CREST</li>
                                    <li>• Applies even inside an ISA</li>
                                    <li>• Rounded down to nearest penny</li>
                                    <li>• Separate from Dealing Commission</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-8">
                    <Card className="rounded-[2.5rem] border-primary/20 bg-primary/5 shadow-xl shadow-primary/5 overflow-hidden sticky top-24">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-black uppercase tracking-tighter flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-primary" />
                                Expert Insight
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="p-5 bg-white dark:bg-black/40 rounded-2xl border border-primary/10 transition-all hover:bg-white/80 dark:hover:bg-black/60">
                                <h4 className="text-xs font-black text-primary uppercase mb-2">Latest HMRC Rules</h4>
                                <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                                    The SDRT rate remains fixed at 0.5% for 2024/25 and 2025/26. While some lobby for its removal to boost LSE liquidity, it currently remains a primary cost for UK equity investors.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-xs font-black uppercase tracking-widest px-1">Related Tax Tools</h4>
                                <div className="grid gap-2">
                                    {[
                                        { name: "Dividend Tax", href: "/uk-dividend-tax-calculator" },
                                        { name: "Capital Gains Tax", href: "/uk-stock-capital-gains-tax-calculator" }
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
                                <TrendingUp className="w-4 h-4" />
                                View Hub
                            </Link>
                        </CardContent>
                    </Card>

                    <div className="p-8 rounded-[2.5rem] bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-slate-500">Professional Tip</h4>
                        <p className="text-xs leading-relaxed italic text-slate-600 dark:text-slate-400">
                            "If you're buying AIM-listed stocks for your ISA, you can often save this 0.5% tax entirely, as many AIM shares are exempt from SDRT to encourage investment in growth companies."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
