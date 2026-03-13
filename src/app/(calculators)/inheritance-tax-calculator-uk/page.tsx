
import { Heart, Landmark, AlertCircle, TrendingUp, Info, Users, FileText, Gift, ShieldAlert, Home } from "lucide-react";
import { InheritanceTaxCalculatorForm } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { Metadata } from "next";
import { RelatedTools } from "@/components/layout/related-tools";

export const metadata: Metadata = {
    title: "Inheritance Tax Calculator UK | IHT Estimator",
    description: "Calculate your potential UK Inheritance Tax liability. Estimate the 40% tax bill on your estate, factor in spousal transfers, and understand the Residence Nil-Rate Band.",
    alternates: {
        canonical: "/inheritance-tax-calculator-uk"
    }
};

export default function InheritanceTaxPage() {
    const faqs = [
        {
            question: "What is the standard Inheritance Tax rate in the UK?",
            answer: "The standard Inheritance Tax (IHT) rate is 40%. It's only charged on the part of your estate that's above your tax-free threshold (usually £325,000, but can be higher)."
        },
        {
            question: "Do spouses or civil partners pay Inheritance Tax?",
            answer: "No. You can pass everything you own to your husband, wife, or civil partner completely free of Inheritance Tax, regardless of the amount."
        },
        {
            question: "What is the Residence Nil-Rate Band (RNRB)?",
            answer: "If you leave your main home to 'direct descendants' (children, step-children, or grandchildren), your tax-free threshold increases by up to £175,000. So a single person could have a threshold of £500,000, and a married couple could have £1,000,000."
        },
        {
            question: "What happens if I give my money away before I die?",
            answer: "Gifts given while you're alive might still be subject to IHT if you die within 7 years of making them. If you live longer than 7 years, the gift is generally tax-free. There are also smaller annual exemptions you can use."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <BreadcrumbSchema items={[
                { name: "Home", item: "/" },
                { name: "Legal", item: "/legal" },
                { name: "Inheritance Tax Calculator", item: "/inheritance-tax-calculator-uk" }
            ]} />
            
            <section className="container mx-auto px-4 pt-16 text-center max-w-4xl">
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50/50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 text-[10px] font-black uppercase tracking-widest mb-6 border border-purple-100 dark:border-purple-900/40">
                    <ShieldAlert className="w-3 h-3" /> HM Revenue & Customs Rules Applied
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tighter">
                    Inheritance Tax <span className="text-purple-600 italic">Calculator</span>
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto opacity-90 font-medium">
                    Plan your legacy. Estimate the potential 40% tax bill on your estate and see how your tax-free allowances can protect your family's wealth.
                </p>
            </section>

            <InheritanceTaxCalculatorForm />

            {/* SEO Content Section */}
            <section className="container mx-auto px-4 max-w-6xl mt-24 space-y-20">
                
                {/* 1. Guide */}
                <div className="bg-white/90 dark:bg-card/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-10 md:p-16 rounded-[3rem] shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 mb-10 flex items-center gap-4 tracking-tight relative z-10">
                        <FileText className="w-10 h-10 text-purple-600" />
                        A Plain English Guide to IHT
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-16 text-slate-700 dark:text-slate-300 relative z-10">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-black flex items-center gap-2 text-slate-800 dark:text-slate-200 mb-4">
                                    <Landmark className="w-6 h-6 text-emerald-500" /> The Dreaded 40% Tax
                                </h3>
                                <p className="leading-relaxed text-lg">
                                    Inheritance Tax is a tax on the estate (the property, money, and possessions) of someone who's died. It is famously unpopular, but you only pay the 40% rate on the parts of your estate that sit ABOVE your tax-free allowances.
                                </p>
                            </div>
                            <div className="bg-purple-50/50 dark:bg-purple-900/10 p-8 rounded-3xl border border-purple-100 dark:border-purple-800">
                                <h4 className="font-black text-purple-900 dark:text-purple-400 uppercase text-xs tracking-widest mb-4">The Allowances We All Get</h4>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="p-1.5 mt-0.5 bg-purple-500 rounded-md text-white"><Users className="w-3 h-3" /></div>
                                        <div>
                                            <span className="text-sm font-bold block">The Basic Rate Band: £325,000</span>
                                            <span className="text-xs text-slate-500">Every single person in the UK gets this allowance tax-free.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="p-1.5 mt-0.5 bg-purple-500 rounded-md text-white"><Home className="w-3 h-3" /></div>
                                        <div>
                                            <span className="text-sm font-bold block">The Residence Band: +£175,000</span>
                                            <span className="text-xs text-slate-500">Added if you give your main home to your children or grandchildren.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <div className="bg-slate-100/50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
                                <h4 className="font-black text-slate-500 uppercase text-[10px] tracking-[0.2em] mb-6">The Power of Marriage</h4>
                                <div className="space-y-4">
                                    <p className="text-sm leading-relaxed mb-4">
                                        For Inheritance Tax, marriage is incredibly powerful. Any assets passed to a spouse are completely tax-free. Furthermore, the surviving spouse inherits whatever percentage of the late partner's tax-free allowance went unused.
                                    </p>
                                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-900/30">
                                        <h5 className="font-bold text-emerald-900 dark:text-emerald-400 mb-1 text-xs uppercase tracking-widest">The £1 Million Threshold</h5>
                                        <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">By combining two £325k basic allowances and two £175k residence allowances, a married couple can currently pass on exactly £1,000,000 tax-free.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Surcharges Section */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-10 bg-slate-900 text-white rounded-[2.5rem] shadow-2xl group hover:-translate-y-2 transition-transform duration-500">
                        <Gift className="w-12 h-12 text-purple-400 mb-6" />
                        <h3 className="text-2xl font-black mb-4 tracking-tight">The 7-Year Rule (PETs)</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Potentially Exempt Transfers (PETs) mean you can gift unlimited amounts of money during your lifetime. However, if you die within 7 years of making the gift, it gets pulled back into your estate for tax calculation purposes.
                        </p>
                    </div>
                    <div className="p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm group hover:-translate-y-2 transition-transform duration-500">
                        <TrendingUp className="w-12 h-12 text-blue-500 mb-6" />
                        <h3 className="text-2xl font-black mb-4 tracking-tight">Trusts and Insurance</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Many wealthy families minimize IHT legally by placing assets into Trusts or using dedicated life insurance policies (written in trust) to cover the eventual HM Revenue & Customs bill, leaving the estate intact for heirs.
                        </p>
                    </div>
                </div>

                {/* 4. FAQ Section */}
                <FAQAccordion faqs={faqs} title="Inheritance Tax FAQs" />

                {/* Final Legal Disclaimer */}
                <div className="bg-red-50/50 dark:bg-red-950/20 p-12 rounded-[3rem] border border-red-100 dark:border-red-900/30 flex flex-col md:flex-row gap-8 items-center text-center md:text-left shadow-sm">
                    <AlertCircle className="w-16 h-16 text-red-600 shrink-0" />
                    <div>
                        <h4 className="text-2xl font-black text-red-800 dark:text-red-400 mb-3 tracking-tight">Legal Disclaimer</h4>
                        <p className="text-sm text-red-700 dark:text-red-300 leading-relaxed font-medium">
                            This calculator provides estimates based on current standard rules and rates. Estate planning is highly complex and depends on your unique personal circumstances, earlier gifts, and trust setups. This tool does not constitute legal or financial advice. We strongly recommend speaking to a qualified solicitor or independent financial advisor to plan your estate.
                        </p>
                    </div>
                </div>

            </section>

            <RelatedTools currentCategory="Legal" currentSlug="/inheritance-tax-calculator-uk" />
            
            <CalculatorSchema 
                title="Inheritance Tax Calculator UK | IHT Estimator"
                description="Calculate your potential UK Inheritance Tax liability. Estimate the 40% tax bill on your estate, factor in spousal transfers, and understand the Residence Nil-Rate Band."
                slug="/inheritance-tax-calculator-uk"
                faqs={faqs}
            />
        </div>
    );
}
