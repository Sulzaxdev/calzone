
import { Landmark, TrendingUp, AlertCircle, FileText, PoundSterling, ShieldAlert, BadgePercent, Home } from "lucide-react";
import { CGTCalculatorForm } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { Metadata } from "next";
import { RelatedTools } from "@/components/layout/related-tools";

export const metadata: Metadata = {
    title: "Capital Gains Tax Calculator UK (2024/25) | Property & Shares",
    description: "Calculate your UK Capital Gains Tax (CGT) liability for selling a second home, buy-to-let property, or shares. Updated with the latest 2024 allowance limits and 24% rate drops.",
    alternates: {
        canonical: "/capital-gains-tax-calculator-uk"
    }
};

export default function CGTPage() {
    const faqs = [
        {
            question: "Do I pay CGT on my main home?",
            answer: "Usually, no. If you sell the home you live in, you automatically get Private Residence Relief (PRR) meaning there is zero Capital Gains Tax to pay. CGT generally applies to second homes, inherited property you don't live in, buy-to-let properties, shares, and valuable assets."
        },
        {
            question: "What is the Capital Gains Tax Allowance for 2024/25?",
            answer: "The Annual Exempt Amount (your tax-free allowance) was slashed by HMRC to just £3,000 for the 2024/2025 tax year. This means you must pay tax on any profit over £3,000 made within a single tax year. Previously, this allowance was over £12,000."
        },
        {
            question: "What are the current CGT rates?",
            answer: "For residential property: Basic rate taxpayers pay 18%, while Higher/Additional rate taxpayers pay 24% (dropped from 28% in April 2024). For other assets like shares or cryptocurrency: Basic rate is 10%, and Higher rate is 20%."
        },
        {
            question: "Can I deduct my costs?",
            answer: "Yes. You should deduct 'allowable costs' from your gross profit before calculating tax. These include estate agent fees, solicitor fees when buying AND selling, stamp duty paid on the original purchase, and the cost of major capital improvements (like an extension, but not general maintenance)."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <BreadcrumbSchema items={[
                { name: "Home", item: "/" },
                { name: "Financial Calculators", item: "/finance" },
                { name: "Capital Gains Tax Calculator UK", item: "/capital-gains-tax-calculator-uk" }
            ]} />
            
            <section className="container mx-auto px-4 pt-16 text-center max-w-4xl">
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50/50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 text-[10px] font-black uppercase tracking-widest mb-6 border border-rose-100 dark:border-rose-900/40">
                    <AlertCircle className="w-3 h-3" /> Updated for 2024/2025 HMRC Tax Year
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tighter">
                    Capital Gains Tax <span className="text-rose-600 italic">Calculator</span>
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto opacity-90 font-medium">
                    Calculate your tax liability when selling an asset for profit. Fully updated with the slashed £3,000 tax-free allowance and the newly reduced 24% property rate.
                </p>
            </section>

            <CGTCalculatorForm />

            {/* SEO Content Section */}
            <section className="container mx-auto px-4 max-w-6xl mt-24 space-y-20">
                
                {/* 1. Guide */}
                <div className="bg-white/90 dark:bg-card/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-10 md:p-16 rounded-[3rem] shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-rose-100/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 mb-10 flex items-center gap-4 tracking-tight relative z-10">
                        <FileText className="w-10 h-10 text-rose-600" />
                        Understanding Capital Gains Tax in the UK
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-16 text-slate-700 dark:text-slate-300 relative z-10">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-black flex items-center gap-2 text-slate-800 dark:text-slate-200 mb-4">
                                    <BadgePercent className="w-6 h-6 text-emerald-500" /> 2024 Allowances & Rates Update
                                </h3>
                                <p className="leading-relaxed text-lg">
                                    The UK Government has significantly tightened the rules around Capital Gains Tax. Historically, sellers enjoyed a generous tax-free allowance. As of the 2024/2025 tax year, the **Annual Exempt Amount has dropped to just £3,000**.
                                </p>
                            </div>
                            <div className="bg-rose-50/50 dark:bg-rose-900/10 p-8 rounded-3xl border border-rose-100 dark:border-rose-800">
                                <h4 className="font-black text-rose-900 dark:text-rose-400 uppercase text-xs tracking-widest mb-4">The Current Tax Bands</h4>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="p-1.5 mt-0.5 bg-rose-600 rounded-md text-white"><Home className="w-3 h-3" /></div>
                                        <div>
                                            <span className="text-sm font-bold block text-slate-900 dark:text-white">Residential Property</span>
                                            <span className="text-xs text-slate-500">18% for Basic Rate taxpayers. 24% for Higher and Additional Rate taxpayers (recently dropped from 28%).</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="p-1.5 mt-0.5 bg-rose-600 rounded-md text-white"><TrendingUp className="w-3 h-3" /></div>
                                        <div>
                                            <span className="text-sm font-bold block text-slate-900 dark:text-white">Shares, Crypto & Other Assets</span>
                                            <span className="text-xs text-slate-500">10% for Basic Rate taxpayers. 20% for Higher and Additional Rate taxpayers.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <div className="bg-slate-100/50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
                                <h4 className="font-black text-slate-500 uppercase text-[10px] tracking-[0.2em] mb-6">How to Reduce Your CGT Bill Legally</h4>
                                <div className="space-y-6">
                                     <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-900/30">
                                        <h5 className="font-bold text-emerald-900 dark:text-emerald-400 mb-1 text-sm flex items-center gap-2">Spousal Transfers</h5>
                                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">You can transfer assets (like a rental property or shares) to your husband, wife, or civil partner completely tax-free. They can then sell the asset to utilize their own £3,000 tax-free allowance and potentially their lower basic tax rate.</p>
                                    </div>
                                    <div className="p-4 bg-sky-50 dark:bg-sky-950/20 rounded-xl border border-sky-200 dark:border-sky-900/30">
                                        <h5 className="font-bold text-sky-900 dark:text-sky-400 mb-1 text-sm flex items-center gap-2">Deduct Every Single Cost</h5>
                                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">Ensure you have deducted the estate agent's commission, solicitor's legal fees, stamp duty land tax paid when buying, and the cost of major capital improvements (e.g., building a conservatory).</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. FAQ Section */}
                <FAQAccordion faqs={faqs} title="Capital Gains Tax FAQs" />

                 {/* Final Legal Disclaimer */}
                <div className="bg-red-50/50 dark:bg-red-950/20 p-12 rounded-[3rem] border border-red-100 dark:border-red-900/30 flex flex-col md:flex-row gap-8 items-center text-center md:text-left shadow-sm">
                    <ShieldAlert className="w-16 h-16 text-red-600 shrink-0" />
                    <div>
                        <h4 className="text-2xl font-black text-red-800 dark:text-red-400 mb-3 tracking-tight">Tax Disclaimer</h4>
                        <p className="text-sm text-red-700 dark:text-red-300 leading-relaxed font-medium">
                            This calculator provides an estimate of your Capital Gains Tax liability based on simplified statutory assumptions. It does not account for complex scenarios such as carried-forward capital losses from previous years, Business Asset Disposal Relief (BADR), or partial Private Residence Relief. We strongly advise consulting with a qualified accountant or tax specialist before filing your self-assessment tax return with HMRC. Reporting and paying CGT on UK property must normally be done within 60 days of selling.
                        </p>
                    </div>
                </div>

            </section>

            <RelatedTools currentCategory="Finance" currentSlug="/capital-gains-tax-calculator-uk" />
            
            <CalculatorSchema 
                title="Capital Gains Tax Calculator UK (2024/25) | Property & Shares"
                description="Calculate your UK Capital Gains Tax (CGT) liability for selling a second home, buy-to-let property, or shares. Updated with the latest 2024 allowance limits and 24% rate drops."
                slug="/capital-gains-tax-calculator-uk"
                faqs={faqs}
            />
        </div>
    );
}

