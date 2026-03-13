
import { Calculator, Landmark, ShieldCheck, HelpCircle, BookOpen, AlertTriangle, TrendingUp, Wallet, Home, Info, ChevronRight } from "lucide-react";
import { EquityReleaseCalculatorForm } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { Metadata } from "next";
import { RelatedTools } from "@/components/layout/related-tools";

export const metadata: Metadata = {
    title: "Equity Release Calculator UK | Calculate Lifetime Mortgage Estimates",
    description: "Use our free Equity Release Calculator to estimate how much tax-free cash you can unlock from your home. Expert guide on UK lifetime mortgages and interest rates.",
    alternates: {
        canonical: "/equity-release-calculator-uk"
    }
};

export default function EquityReleasePage() {
    const faqs = [
        {
            question: "What is Equity Release?",
            answer: "Equity release is a way for homeowners aged 55 and over to unlock some of the value (equity) tied up in their home without having to move out. The most common type is a Lifetime Mortgage."
        },
        {
            question: "Do I still own my home with equity release?",
            answer: "Yes, with a Lifetime Mortgage (the most popular type in the UK), you retain full ownership of your home and can live there for the rest of your life."
        },
        {
            question: "How is equity release repaid?",
            answer: "The loan and any rolled-up interest are usually repaid from the sale of your house when you die or move into permanent long-term care."
        },
        {
            question: "Will equity release affect my inheritance?",
            answer: "Yes, because the loan and interest are repaid from the value of your property, the amount left for your beneficiaries will be reduced."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <BreadcrumbSchema items={[
                { name: "Home", item: "/" },
                { name: "Finance", item: "/finance-driving" },
                { name: "Equity Release Calculator UK", item: "/equity-release-calculator-uk" }
            ]} />
            
            <section className="container mx-auto px-4 pt-16 text-center max-w-4xl">
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-100 dark:border-blue-900/40">
                    <ShieldCheck className="w-3 h-3" /> FCA Regulated Standards
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tighter">
                    Equity Release <span className="text-blue-600 italic">Calculator</span> UK
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto opacity-90">
                    Find out how much tax-free cash you could unlock from your property today. 
                    Based on current UK interest rates and LTV standards.
                </p>
            </section>

            <EquityReleaseCalculatorForm />

            {/* SEO Content Section */}
            <section className="container mx-auto px-4 max-w-6xl mt-24 space-y-16">
                
                {/* 1. Deep Dive Guide */}
                <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-sm">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-3 tracking-tight">
                        <BookOpen className="w-8 h-8 text-blue-600" />
                        Understanding Equity Release in the UK (2026 Guide)
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-12 text-slate-700 dark:text-slate-300">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold flex items-center gap-2 text-slate-800 dark:text-slate-200">
                                <Info className="w-6 h-6 text-blue-500" /> How It Works?
                            </h3>
                            <p className="leading-relaxed">
                                Equity release allows UK homeowners aged 55 and over to access the money (wealth) tied up in their home. You can take the money as a lump sum, several smaller amounts, or a combination of both.
                            </p>
                            <div className="p-6 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-800">
                                <h4 className="font-bold text-blue-900 dark:text-blue-400 mb-2">The 'No Negative Equity' Guarantee</h4>
                                <p className="text-sm">Modern Equity Release Council approved plans guarantee that you or your estate will never owe more than the value of your home, even if house prices drop.</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                             <div>
                                <h4 className="font-bold flex items-center gap-2 mb-4 text-slate-800 dark:text-slate-200 uppercase text-xs tracking-widest">Typical UK Usage</h4>
                                <ul className="space-y-4">
                                    {[
                                        { title: "Home Improvements", desc: "Updating kitchens or energy renewals." },
                                        { title: "Boosting Retirement Income", desc: "Supplementing a state pension." },
                                        { title: "Settling Debt", desc: "Clearing existing mortgages or personal loans." },
                                        { title: "Early Inheritance", desc: "Helping children get on the property ladder." }
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-4">
                                            <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center shrink-0 text-blue-600 text-[10px] font-bold">
                                                {i+1}
                                            </div>
                                            <div>
                                                <span className="block font-bold text-sm">{item.title}</span>
                                                <span className="text-xs text-slate-500">{item.desc}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                             </div>
                        </div>
                    </div>
                </div>

                {/* 2. Types of Equity Release */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl">
                        <Landmark className="w-12 h-12 text-blue-400 mb-6" />
                        <h3 className="text-2xl font-black mb-4 tracking-tight">1. Lifetime Mortgage</h3>
                        <p className="text-slate-400 leading-relaxed mb-6">
                            This is a loan secured against your home. You remain the owner. Interest is added to the loan and "compounds" over time. No monthly repayments are required, though some modern plans allow them to keep interest down.
                        </p>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">
                           Most Popular UK Choice
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                        <Home className="w-12 h-12 text-slate-400 mb-6" />
                        <h3 className="text-2xl font-black mb-4 tracking-tight">2. Home Reversion</h3>
                        <p className="text-slate-500 leading-relaxed mb-6">
                            You sell a part or all of your home to a reversion provider in exchange for a lump sum or regular payments. You continue living in the home as a tenant, but you no longer own the sold portion.
                        </p>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-bold">
                           Less Common
                        </div>
                    </div>
                </div>

                {/* 3. Risks and Benefits */}
                <div className="space-y-8">
                    <h2 className="text-3xl font-black text-center tracking-tight">Risks & Considerations</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-8 bg-red-50/30 dark:bg-red-950/20 rounded-3xl border border-red-100 dark:border-red-900/30">
                            <AlertTriangle className="w-8 h-8 text-red-600 mb-4" />
                            <h4 className="font-bold mb-2">Inheritance Impact</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Equity release reduces the value of your estate and the amount you can leave to your children or heirs.</p>
                        </div>
                        <div className="p-8 bg-amber-50/30 dark:bg-amber-950/20 rounded-3xl border border-amber-100 dark:border-amber-900/30">
                            <Wallet className="w-8 h-8 text-amber-600 mb-4" />
                            <h4 className="font-bold mb-2">Benefit Eligibility</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Having extra cash in your bank could affect your eligibility for means-tested state benefits like Pension Credit.</p>
                        </div>
                        <div className="p-8 bg-blue-50/30 dark:bg-blue-950/20 rounded-3xl border border-blue-100 dark:border-blue-900/30">
                            <TrendingUp className="w-8 h-8 text-blue-600 mb-4" />
                            <h4 className="font-bold mb-2">Compound Interest</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Interest is rolled up, meaning you pay interest on your interest. The debt can grow significantly over 15-20 years.</p>
                        </div>
                    </div>
                </div>

                {/* 4. FAQ Section */}
                <FAQAccordion faqs={faqs} title="Equity Release FAQ" />

                {/* Final Disclaimer */}
                <div className="bg-slate-900 text-slate-400 p-10 rounded-[3rem] text-center border border-slate-800">
                    <HelpCircle className="w-12 h-12 mx-auto mb-6 text-slate-600" />
                    <h3 className="text-white text-xl font-bold mb-4 uppercase tracking-widest text-sm">Professional Advice Warning</h3>
                    <p className="text-sm leading-relaxed max-w-3xl mx-auto italic">
                        The Equity Release Calculator provided is for illustrative purposes only. Actual figures depend on your specific circumstances, provider offers, and health status. Equity release is a long-term commitment. We strongly recommend that you seek advice from an independent financial advisor who is qualified in equity release and registered with the Financial Conduct Authority (FCA).
                    </p>
                </div>
            </section>

            <RelatedTools currentCategory="Finance" currentSlug="/equity-release-calculator-uk" />
            
            <CalculatorSchema 
                title="Equity Release Calculator UK | Calculate Lifetime Mortgage Estimates"
                description="Use our free Equity Release Calculator to estimate how much tax-free cash you can unlock from your home. Expert guide on UK lifetime mortgages and interest rates."
                slug="/equity-release-calculator-uk"
                faqs={faqs}
            />
        </div>
    );
}
