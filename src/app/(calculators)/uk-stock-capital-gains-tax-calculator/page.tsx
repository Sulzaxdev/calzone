import { Receipt, Info, BookOpen, AlertCircle, HelpCircle, TrendingUp, Landmark, History, PieChart, ShieldCheck, ChevronRight, PoundSterling, Calculator } from "lucide-react";
import { CGTCalculatorForm } from "@/app/(calculators)/uk-stock-capital-gains-tax-calculator/calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "UK Capital Gains Tax (CGT) Calculator | Shares & Investments Guide",
    description: "Calculate your UK Capital Gains Tax (CGT) on shares and investments. Expert guide on HMRC rules, annual allowances, and tax-efficient selling strategies.",
};

export default function CGTCalculatorPage() {
    const cgtFaqs = [
        {
            question: "What is the CGT allowance for the 2024/25 tax year?",
            answer: "For the 2024/25 tax year, the annual exempt amount (allowance) for individuals is £3,000. This is the amount of profit you can make before you start paying Capital Gains Tax."
        },
        {
            question: "Do I pay CGT on stocks held in an ISA?",
            answer: "No. Stocks and shares held within an Individual Savings Account (ISA) or a pension (SIPP) are exempt from Capital Gains Tax, regardless of how much profit you make."
        },
        {
            question: "What are the CGT rates for shares in the UK?",
            answer: "For the 2024/25 tax year, CGT on profits from shares is 10% for basic rate taxpayers and 20% for higher or additional rate taxpayers. (Note: different rates apply to residential property)."
        },
        {
            question: "Can I carry forward losses to future years?",
            answer: "Yes, you can report investment losses to HMRC to reduce your total taxable gains in the same year, or carry them forward to offset against future gains indefinitely, provided they are reported within 4 years."
        },
        {
            question: "What is the '30-day rule' (Bed & Breakfasting)?",
            answer: "The 30-day rule prevents you from selling shares to realize a loss or use your allowance and then immediately buying them back. If you buy the same shares back within 30 days, the new purchase price is matched against the sale price for tax purposes."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <CalculatorSchema
                title="UK Capital Gains Tax (CGT) Calculator | Shares & Investments Guide"
                description="Calculate your UK Capital Gains Tax (CGT) on shares and investments. Expert guide on HMRC rules, annual allowances, and tax-efficient selling strategies."
                slug="/uk-stock-capital-gains-tax-calculator"
                faqs={cgtFaqs}
            />
            {/* The Interactive Calculator Component */}
            <CGTCalculatorForm />

            {/* Massive SEO Content Section */}
            <section className="container mx-auto px-4 max-w-7xl mt-12 space-y-12">

                {/* 1. Primary Guide Section */}
                <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-lg">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                        <BookOpen className="w-8 h-8 text-blue-600" />
                        UK Capital Gains Tax: The Definitive Guide for Investors
                    </h2>

                    <div className="space-y-12 text-slate-700 dark:text-slate-300">
                        {/* Intro */}
                        <div className="grid md:grid-cols-2 gap-8 items-start">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                    <HelpCircle className="w-6 h-6 text-blue-500" /> What is Capital Gains Tax (CGT)?
                                </h3>
                                <p className="text-lg leading-relaxed">
                                    <strong>Capital Gains Tax (CGT)</strong> is a tax on the profit (the 'gain') you make when you sell (or 'dispose of') an asset that has increased in value. It's the gain you make that is taxed, not the total amount of money you receive.
                                </p>
                                <p className="leading-relaxed">
                                    In the context of the UK stock market, CGT applies when you sell shares, ETFs, or units in a unit trust held outside of tax-wrapped accounts like ISAs or Pensions. HMRC sets specific rules for how these gains are calculated, including how to handle multiple purchases of the same stock through "pooling."
                                </p>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4 uppercase text-xs tracking-widest">HMRC CGT Calculation Formula</h4>
                                <div className="space-y-4">
                                    <div>
                                        <span className="block text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">Step 1: Calculate Total Gain</span>
                                        <code className="bg-white dark:bg-black px-3 py-2 rounded-lg text-sm block border border-slate-200 dark:border-slate-700">Gain = Selling Price – Buying Price – Allowable Costs</code>
                                    </div>
                                    <p className="text-xs text-slate-500 italic">*Allowable costs include brokerage fees and stamp duty.</p>
                                    <div>
                                        <span className="block text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">Step 2: Apply Allowance</span>
                                        <code className="bg-white dark:bg-black px-3 py-2 rounded-lg text-sm block border border-slate-200 dark:border-slate-700">Taxable Gain = Gain – Annual Allowance</code>
                                    </div>
                                    <div>
                                        <span className="block text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">Step 3: Calculate Tax Due</span>
                                        <code className="bg-white dark:bg-black px-3 py-2 rounded-lg text-sm block border border-slate-200 dark:border-slate-700">Tax = Taxable Gain × CGT Rate (10% or 20%)</code>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Allowance Section */}
                        <div className="bg-blue-50/50 dark:bg-blue-950/10 border border-blue-100 dark:border-blue-900/30 p-8 rounded-[2rem] space-y-6">
                            <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-300 flex items-center gap-2">
                                <Landmark className="w-6 h-6 text-blue-500" /> The Annual Exempt Amount (Allowance)
                            </h3>
                            <p className="leading-relaxed">
                                Every UK tax resident has an annual 'tax-free' allowance for capital gains. This means you only pay tax if your total gains in a tax year exceed this limit.
                            </p>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
                                    <span className="text-xs font-bold text-slate-500 uppercase block mb-1">Tax Year 2022/23</span>
                                    <span className="text-3xl font-black text-slate-900 dark:text-white">£12,300</span>
                                </div>
                                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
                                    <span className="text-xs font-bold text-slate-500 uppercase block mb-1">Tax Year 2023/24</span>
                                    <span className="text-3xl font-black text-slate-900 dark:text-white">£6,000</span>
                                </div>
                                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-primary/30 text-center ring-2 ring-primary/20">
                                    <span className="text-xs font-bold text-primary uppercase block mb-1">Tax Year 2024/25</span>
                                    <span className="text-3xl font-black text-primary">£3,000</span>
                                </div>
                            </div>
                            <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-100 dark:border-amber-900/30 flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                <p className="text-sm text-amber-800 dark:text-amber-400">
                                    <strong>Important Note:</strong> The CGT allowance has been significantly reduced in recent years. Effective tax planning, such as utilizing ISAs and timing the sale of assets, is more critical than ever.
                                </p>
                            </div>
                        </div>

                        {/* Professional Rules Section */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                <TrendingUp className="w-6 h-6 text-green-500" /> Advanced Logic: HMRC Matching Rules
                            </h3>
                            <p>When selling shares, you might have bought them at different times and prices. HMRC uses specific "matching rules" to determine which cost price to use:</p>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
                                    <h4 className="font-bold mb-2 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div> Same Day Rule
                                    </h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Shares bought on the same day as the sale are matched first.</p>
                                </div>
                                <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
                                    <h4 className="font-bold mb-2 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div> 30-Day Rule
                                    </h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Shares bought within 30 days after the sale are matched next (prevents 'wash sales').</p>
                                </div>
                                <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
                                    <h4 className="font-bold mb-2 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div> Section 104 Pool
                                    </h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">All other shares are put into a "pool" with an average cost price calculated across all purchases.</p>
                                </div>
                            </div>
                        </div>

                        {/* CGT Rates Table */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                <PieChart className="w-6 h-6 text-purple-500" /> CGT Rates for Shares & Investments (2024/25)
                            </h3>
                            <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-slate-100 dark:bg-slate-800">
                                        <tr>
                                            <th className="p-4 font-bold text-slate-900 dark:text-slate-100">Taxpayer Band</th>
                                            <th className="p-4 font-bold text-slate-900 dark:text-slate-100">Income Tax Rate</th>
                                            <th className="p-4 font-bold text-slate-900 dark:text-slate-100">CGT Rate (Shares)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                        <tr>
                                            <td className="p-4">Basic Rate</td>
                                            <td className="p-4">20%</td>
                                            <td className="p-4 font-bold text-blue-600 dark:text-blue-400">10%</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4">Higher Rate</td>
                                            <td className="p-4">40%</td>
                                            <td className="p-4 font-bold text-red-600 dark:text-red-400">20%</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4">Additional Rate</td>
                                            <td className="p-4">45%</td>
                                            <td className="p-4 font-bold text-red-600 dark:text-red-400">20%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* History & Context */}
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="md:col-span-2 space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                    <History className="w-6 h-6 text-slate-500" /> Evolution of UK CGT
                                </h3>
                                <p>
                                    Capital Gains Tax was first introduced in the UK in 1965 by Chancellor James Callaghan to prevent people from avoiding Income Tax by converting income into capital gains. Since then, it has seen numerous reforms, including the 'Taper Relief' of the late 90s and the 'Indexation Allowance' (which was removed for individuals in 2008).
                                </p>
                                <p>
                                    The current system focuses on a flat rate based on your income tax band, making it simpler but removing the protection against inflation that indexation once provided.
                                </p>
                            </div>
                            <div className="bg-slate-900 text-white p-6 rounded-2xl flex flex-col justify-center items-center text-center shadow-xl">
                                <PoundSterling className="w-12 h-12 text-primary mb-4" />
                                <h4 className="font-bold text-lg mb-2">Did you know?</h4>
                                <p className="text-sm text-slate-400">ISA contributions effectively 'shield' your investments from CGT forever. Maximizing your £20,000 annual ISA limit is the single most effective way to legally avoid CGT on future profits.</p>
                            </div>
                        </div>

                        {/* FAQ Accordion */}
                        <FAQAccordion faqs={cgtFaqs} title="Capital Gains Tax (CGT) Frequently Asked Questions" />

                        {/* When to Pay Section */}
                        <div className="space-y-6 pt-8 border-t border-slate-200 dark:border-slate-800 text-center max-w-3xl mx-auto">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">When do you pay CGT?</h3>
                            <p className="leading-relaxed">
                                Unlike Income Tax which is often deducted at source (PAYE), you must usually report and pay Capital Gains Tax yourself through a <strong>Self Assessment tax return</strong>. The deadline is 31 January following the end of the tax year in which you made the gain.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                                <div className="px-6 py-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
                                    <Calculator className="w-5 h-5 text-primary" />
                                    <span className="font-bold text-sm">Calculate</span>
                                </div>
                                <div className="px-6 py-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3 text-slate-400">
                                    <Receipt className="w-5 h-5" />
                                    <span className="font-bold text-sm">Declare</span>
                                </div>
                                <div className="px-6 py-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3 text-slate-400">
                                    <PoundSterling className="w-5 h-5" />
                                    <span className="font-bold text-sm">Pay</span>
                                </div>
                            </div>
                        </div>

                        {/* Final Disclaimer */}
                        <div className="mt-12 bg-red-100/50 dark:bg-red-950/20 p-8 rounded-3xl border border-red-200 dark:border-red-900/30 flex gap-6 items-start">
                            <ShieldCheck className="w-10 h-10 text-red-600 shrink-0 mt-1" />
                            <div>
                                <h4 className="text-xl font-bold text-red-800 dark:text-red-400">Financial & Tax Disclaimer</h4>
                                <p className="text-sm text-red-700 dark:text-red-300 mt-2 leading-relaxed font-medium">
                                    The results provided by this CGT Calculator are estimates for educational and planning purposes only. They do not constitute professional tax or financial advice.
                                    <br /><br />
                                    Tax laws are complex and subject to change. Factors such as residence, domicile, and other income can affect your actual tax liability. Always consult with a qualified tax advisor or accountant before making significant financial decisions or filing your tax return with HMRC.
                                    <br /><br />
                                    CalZone and its creators accept no liability for any loss or damage arising from the use of this information.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
