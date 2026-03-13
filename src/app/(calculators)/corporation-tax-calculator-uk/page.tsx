
import { Building2, Receipt, PoundSterling, Landmark, AlertCircle, FileText, TrendingUp, Briefcase } from "lucide-react";
import { CorporationTaxCalculatorForm } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { Metadata } from "next";
import { RelatedTools } from "@/components/layout/related-tools";

export const metadata: Metadata = {
    title: "Corporation Tax Calculator UK (2024-2026) | Marginal Relief",
    description: "Calculate your UK limited company's Corporation Tax bill. Understand the 19% small profits rate, the 25% main rate, and exactly how Marginal Relief is applied to your profits.",
    alternates: {
        canonical: "/corporation-tax-calculator-uk"
    }
};

export default function CorporationTaxPage() {
    const faqs = [
        {
            question: "What are the Corporation Tax rates in the UK?",
            answer: "Since April 2023, there are two main rates. The 'Small Profits Rate' applies at 19% for companies with taxable profits under £50,000. The 'Main Rate' applies at 25% for companies with profits above £250,000. If your profits fall between these two numbers, you pay a blended rate via Marginal Relief."
        },
        {
            question: "How does Marginal Relief work?",
            answer: "Marginal Relief gradually increases your effective tax rate from 19% up to 25% as your profits grow from £50,000 to £250,000. HMRC applies a complex fraction (3/200) to the difference between your profit and the £250,000 upper limit to calculate the exact discount you receive off the 25% base rate."
        },
        {
            question: "What are allowable expenses?",
            answer: "Allowable expenses are legitimate business costs that you can deduct from your gross income to lower your taxable profit. Examples include employee salaries (including your own Director's salary), office rent, equipment, software subscriptions, and professional fees."
        },
        {
            question: "When is my Corporation Tax bill due?",
            answer: "For most small and medium-sized companies, the deadline to pay your Corporation Tax is 9 months and 1 day after the end of your accounting period. For example, if your financial year ends on 31 March, your tax must be paid by 1 January the following year."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <BreadcrumbSchema items={[
                { name: "Home", item: "/" },
                { name: "Business & Tax", item: "/business-tax" },
                { name: "Corporation Tax Calculator UK", item: "/corporation-tax-calculator-uk" }
            ]} />
            
            <section className="container mx-auto px-4 pt-16 text-center max-w-4xl">
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50/50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-widest mb-6 border border-amber-100 dark:border-amber-900/40">
                    <Building2 className="w-3 h-3" /> Updated for 2024/2025 HMRC Tax Year
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tighter">
                    Corporation Tax <span className="text-amber-500 italic">Calculator</span>
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto opacity-90 font-medium">
                    Instantly calculate your limited company's tax liability. We automatically apply the new 2023-2026 rules, including complex marginal relief calculations for mid-sized profits.
                </p>
            </section>

            <CorporationTaxCalculatorForm />

            {/* SEO Content Section */}
            <section className="container mx-auto px-4 max-w-6xl mt-24 space-y-20">
                
                {/* 1. Guide */}
                <div className="bg-white/90 dark:bg-card/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-10 md:p-16 rounded-[3rem] shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 mb-10 flex items-center gap-4 tracking-tight relative z-10">
                        <FileText className="w-10 h-10 text-amber-500" />
                        Understanding the Recent UK Corporate Tax Changes
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-16 text-slate-700 dark:text-slate-300 relative z-10">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-black flex items-center gap-2 text-slate-800 dark:text-slate-200 mb-4">
                                    <Landmark className="w-6 h-6 text-emerald-500" /> The End of the Flat Rate
                                </h3>
                                <p className="leading-relaxed text-lg">
                                    For many years, the UK operated a simple flat Corporation Tax rate of 19%. However, from April 1st 2023, the government introduced a much more complex tiered system designed to extract more tax from highly profitable companies while protecting small startups.
                                </p>
                            </div>
                            <div className="bg-amber-50/50 dark:bg-amber-900/10 p-8 rounded-3xl border border-amber-100 dark:border-amber-800">
                                <h4 className="font-black text-amber-900 dark:text-amber-400 uppercase text-xs tracking-widest mb-4">The Three Tax Bands Explained</h4>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="p-1.5 mt-0.5 bg-amber-500 rounded-md text-white"><Receipt className="w-3 h-3" /></div>
                                        <div>
                                            <span className="text-sm font-bold block text-slate-900 dark:text-white">Profits £0 to £50,000 (19%)</span>
                                            <span className="text-xs text-slate-500">The "Small Profits Rate". If you earn below £50k, nothing changes for you.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="p-1.5 mt-0.5 bg-amber-500 rounded-md text-white"><Receipt className="w-3 h-3" /></div>
                                        <div>
                                            <span className="text-sm font-bold block text-slate-900 dark:text-white">Profits £50,001 to £250,000 (19% - 25% blend)</span>
                                            <span className="text-xs text-slate-500">You pay a sliding scale. The closer you get to £250k, the closer your effective rate gets to 25%.</span>
                                        </div>
                                    </li>
                                     <li className="flex items-start gap-3">
                                        <div className="p-1.5 mt-0.5 bg-amber-500 rounded-md text-white"><Receipt className="w-3 h-3" /></div>
                                        <div>
                                            <span className="text-sm font-bold block text-slate-900 dark:text-white">Profits £250,000+ (25%)</span>
                                            <span className="text-xs text-slate-500">The "Main Rate". Applied to EVERY pound of profit once you cross the threshold, meaning no marginal relief.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <div className="bg-slate-100/50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
                                <h4 className="font-black text-slate-500 uppercase text-[10px] tracking-[0.2em] mb-6">How to Legally Reduce Your Corp Tax</h4>
                                <div className="space-y-6">
                                     <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-900/30">
                                        <h5 className="font-bold text-emerald-900 dark:text-emerald-400 mb-1 text-sm flex items-center gap-2"><Briefcase className="w-4 h-4"/> Salary and Pension Contributions</h5>
                                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">Paying yourself a higher salary (though this triggers Income Tax) or making direct employer contributions into a SIPP (Self-Invested Personal Pension) are fully allowable expenses that reduce taxable profit.</p>
                                    </div>
                                    <div className="p-4 bg-sky-50 dark:bg-sky-950/20 rounded-xl border border-sky-200 dark:border-sky-900/30">
                                        <h5 className="font-bold text-sky-900 dark:text-sky-400 mb-1 text-sm flex items-center gap-2"><TrendingUp className="w-4 h-4"/> R&D Tax Credits</h5>
                                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">If your company is developing new products, software, or processes, you can claim massive deductions against your corporation tax bill under the Research & Development scheme.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. FAQ Section */}
                <FAQAccordion faqs={faqs} title="Corporation Tax FAQs" />

                 {/* Final Legal Disclaimer */}
                <div className="bg-red-50/50 dark:bg-red-950/20 p-12 rounded-[3rem] border border-red-100 dark:border-red-900/30 flex flex-col md:flex-row gap-8 items-center text-center md:text-left shadow-sm">
                    <AlertCircle className="w-16 h-16 text-red-600 shrink-0" />
                    <div>
                        <h4 className="text-2xl font-black text-red-800 dark:text-red-400 mb-3 tracking-tight">Accounting Disclaimer</h4>
                        <p className="text-sm text-red-700 dark:text-red-300 leading-relaxed font-medium">
                            This calculator provides a simplified estimate of standard UK Corporation Tax liability based on the data entered. It does NOT account for associated companies (which lower the thresholds), R&D tax credits, capital allowances (like 'Full Expensing'), or previous year losses brought forward. Always consult a certified accountant or tax specialist before filing your CT600 return with HMRC.
                        </p>
                    </div>
                </div>

            </section>

            <RelatedTools currentCategory="Business" currentSlug="/corporation-tax-calculator-uk" />
            
            <CalculatorSchema 
                title="Corporation Tax Calculator UK (2024-2026) | Marginal Relief"
                description="Calculate your UK limited company's Corporation Tax bill. Understand the 19% small profits rate, the 25% main rate, and exactly how Marginal Relief is applied to your profits."
                slug="/corporation-tax-calculator-uk"
                faqs={faqs}
            />
        </div>
    );
}

