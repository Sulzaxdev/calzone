
import { HeartPulse, Home, AlertTriangle, FileText, BadgePercent, ShieldAlert, Coins } from "lucide-react";
import { CareHomeFeesCalculatorForm } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { Metadata } from "next";
import { RelatedTools } from "@/components/layout/related-tools";

export const metadata: Metadata = {
    title: "Care Home Fees Calculator UK | Funding Eligibility & Means Test",
    description: "Will the Local Authority pay for your care home? Calculate your assessable assets against the UK Capital Limits to see if you must self-fund or if you qualify for council support.",
    alternates: {
        canonical: "/care-home-fees-calculator-uk"
    }
};

export default function CareHomePage() {
    const faqs = [
        {
            question: "Do I have to sell my house to pay for care?",
            answer: "It depends. Your home is NOT included in the financial assessment if your husband, wife, civil partner, or a dependent relative currently lives there. If no one qualifying lives there, the value of the property is treated as capital. If this pushes you over the Upper Capital Limit, you must usually self-fund. Some councils offer a 'Deferred Payment Agreement' so you don't have to sell the house immediately."
        },
        {
            question: "What is tariff income?",
            answer: "If your capital falls between the Lower and Upper Capital Limits (e.g., between £14,250 and £23,250 in England), the Local Authority will help fund your care. However, you must make a contribution from your capital. This is called 'tariff income' and is calculated as £1 per week for every £250 you have above the lower limit."
        },
        {
            question: "What if my money runs out?",
            answer: "If you start as a self-funder but your savings drop below the Upper Capital Limit, you should contact your Local Authority immediately. They will reassess you and may step in to help fund your care from that point onwards."
        },
        {
            question: "Are there any NHS funded care options?",
            answer: "Yes. If your need for care is primarily health-related (a severe medical condition rather than just old age or social care needs), you may qualify for NHS Continuing Healthcare (CHC). This covers 100% of care home fees, totally free, and is not means-tested. It is famously difficult to qualify for."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <BreadcrumbSchema items={[
                { name: "Home", item: "/" },
                { name: "Health & Care", item: "/health" },
                { name: "Care Home Fees Calculator UK", item: "/care-home-fees-calculator-uk" }
            ]} />
            
            <section className="container mx-auto px-4 pt-16 text-center max-w-4xl">
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fuchsia-50/50 dark:bg-fuchsia-950/20 text-fuchsia-600 dark:text-fuchsia-400 text-[10px] font-black uppercase tracking-widest mb-6 border border-fuchsia-100 dark:border-fuchsia-900/40">
                    <HeartPulse className="w-3 h-3" /> Elderly Care & Local Authority Means Test
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tighter">
                    Care Home Fees <span className="text-fuchsia-600 italic">Funding Calculator</span>
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto opacity-90 font-medium">
                    Calculate your total assessable assets against your nation's Capital Limits to see if you will be a "self-funder" or if the local council will step in to help.
                </p>
            </section>

            <CareHomeFeesCalculatorForm />

            {/* SEO Content Section */}
            <section className="container mx-auto px-4 max-w-6xl mt-24 space-y-20">
                
                {/* 1. Guide */}
                <div className="bg-white/90 dark:bg-card/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-10 md:p-16 rounded-[3rem] shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-100/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 mb-10 flex items-center gap-4 tracking-tight relative z-10">
                        <FileText className="w-10 h-10 text-fuchsia-600" />
                        Understanding UK Care Home Funding
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-16 text-slate-700 dark:text-slate-300 relative z-10">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-black flex items-center gap-2 text-slate-800 dark:text-slate-200 mb-4">
                                    <Coins className="w-6 h-6 text-fuchsia-500" /> The Means Test: Upper vs Lower Capital Limits
                                </h3>
                                <p className="leading-relaxed text-lg pb-4">
                                    When someone needs to move into a residential care home, the local council will conduct a financial assessment (the means test) to decide who pays.
                                </p>
                                <p className="leading-relaxed text-lg">
                                    They look at your **capital** (savings, investments, and sometimes property) and compare it against two national limits. If you have assets above the upper limit, you get zero help with fees.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <div className="bg-slate-100/50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
                                <h4 className="font-black text-slate-500 uppercase text-[10px] tracking-[0.2em] mb-6">How Your Assets Dictate Who Pays</h4>
                                <div className="space-y-6">
                                     <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900/30">
                                        <h5 className="font-bold text-amber-900 dark:text-amber-400 mb-1 text-sm flex items-center gap-2">Above the Upper Limit</h5>
                                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                                            You are a **Self-Funder**. You must pay the full cost of your care home fees until your savings dwindle down to the limit. Care homes are extremely expensive (averaging £800-£1,400 per week), so this can drain an estate rapidly.
                                        </p>
                                    </div>
                                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-900/30">
                                        <h5 className="font-bold text-emerald-900 dark:text-emerald-400 mb-1 text-sm flex items-center gap-2">Below the Lower Limit</h5>
                                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                                            The Council steps in to fully fund the capital side of your care. Note: All of your state and private pensions (minus a small £30.15/week Personal Expenses Allowance) will still be taken to contribute towards the fees.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. FAQ Section */}
                <FAQAccordion faqs={faqs} title="Care Funding FAQs" />

                 {/* Final Legal Disclaimer */}
                <div className="bg-slate-100/50 dark:bg-slate-900/50 p-12 rounded-[3rem] border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-8 items-center text-center md:text-left shadow-sm">
                    <ShieldAlert className="w-16 h-16 text-slate-400 shrink-0" />
                    <div>
                        <h4 className="text-2xl font-black text-slate-800 dark:text-slate-200 mb-3 tracking-tight">Financial Disclaimer</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                            This calculator provides a simplified guide to Local Authority means testing for residential care in the UK. Care funding is highly complex. The value of investment bonds, certain types of trusts, and 50% of jointly owned assets can have varied treatments. You should always seek professional advice from an independent financial adviser who specialises in care funding (often called SOLLA accredited advisers).
                        </p>
                    </div>
                </div>

            </section>

            <RelatedTools currentCategory="Home & Property" currentSlug="/care-home-fees-calculator-uk" />
            
            <CalculatorSchema 
                title="Care Home Fees Calculator UK | Funding Eligibility & Means Test"
                description="Will the Local Authority pay for your care home? Calculate your assessable assets against the UK Capital Limits to see if you must self-fund or if you qualify for council support."
                slug="/care-home-fees-calculator-uk"
                faqs={faqs}
            />
        </div>
    );
}
