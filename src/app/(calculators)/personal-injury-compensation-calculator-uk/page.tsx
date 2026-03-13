
import { Scale, HeartPulse, AlertTriangle, FileText, BadgePercent, ShieldAlert, Gavel, Car } from "lucide-react";
import { PersonalInjuryCalculatorForm } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { Metadata } from "next";
import { RelatedTools } from "@/components/layout/related-tools";

export const metadata: Metadata = {
    title: "Personal Injury Compensation Calculator UK | Accident Claim Estimator",
    description: "Estimate how much your personal injury claim could be worth. Covering General Damages (JCG brackets) and Special Damages for whiplash, fractures, and minor injuries.",
    alternates: {
        canonical: "/personal-injury-compensation-calculator-uk"
    }
};

export default function PersonalInjuryPage() {
    const faqs = [
        {
            question: "How long do I have to make a personal injury claim in the UK?",
            answer: "Under the Limitation Act 1980, you generally have exactly 3 years from the date of the accident (or the date you became aware of the injury) to issue court proceedings. For children under 18, the 3-year clock does not start ticking until their 18th birthday."
        },
        {
            question: "What is the difference between General and Special Damages?",
            answer: "General Damages cover 'pain, suffering, and loss of amenity'. Because pain is subjective, judges use the Judicial College Guidelines (JCG) to provide a financial bracket for specific injuries. Special Damages cover actual financial losses caused by the accident, such as lost wages, travel expenses to hospitals, and physiotherapy costs."
        },
        {
            question: "How do 'No Win, No Fee' agreements work?",
            answer: "A Conditional Fee Agreement (CFA), commonly known as 'No Win, No Fee', means you don't pay your solicitor upfront. If you lose the case, you usually pay nothing. If you win, the solicitor takes a 'success fee' directly from your compensation. By law, this success fee is capped at a maximum of 25% of your payout for personal injuries."
        },
        {
            question: "What are the new Whiplash Reforms?",
            answer: "In recent years, the UK government introduced the Whiplash Reform Programme. If you suffer a minor whiplash injury in a road traffic accident that lasts less than 2 years, your compensation is now fixed to a strict, much lower legal tariff. You also cannot usually recover legal fees for claims under £5,000, forcing many to use the 'Official Injury Claim' online portal themselves."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <BreadcrumbSchema items={[
                { name: "Home", item: "/" },
                { name: "Legal Calculators", item: "/legal" },
                { name: "Personal Injury Compensation Calculator UK", item: "/personal-injury-compensation-calculator-uk" }
            ]} />
            
            <section className="container mx-auto px-4 pt-16 text-center max-w-4xl">
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-6 border border-indigo-100 dark:border-indigo-900/40">
                    <Scale className="w-3 h-3" /> Based on Judicial College Guidelines
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tighter">
                    Personal Injury <span className="text-indigo-600 italic">Calculator</span>
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto opacity-90 font-medium">
                    Estimate your potential compensation payout for an accident that wasn't your fault. See typical guideline brackets for common injuries and add your direct financial losses.
                </p>
            </section>

            <PersonalInjuryCalculatorForm />

            {/* SEO Content Section */}
            <section className="container mx-auto px-4 max-w-6xl mt-24 space-y-20">
                
                {/* 1. Guide */}
                <div className="bg-white/90 dark:bg-card/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-10 md:p-16 rounded-[3rem] shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 mb-10 flex items-center gap-4 tracking-tight relative z-10">
                        <FileText className="w-10 h-10 text-indigo-600" />
                        How Personal Injury Claims Are Calculated
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-16 text-slate-700 dark:text-slate-300 relative z-10">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-black flex items-center gap-2 text-slate-800 dark:text-slate-200 mb-4">
                                    <Gavel className="w-6 h-6 text-indigo-500" /> The Role of Judges & Guidelines
                                </h3>
                                <p className="leading-relaxed text-lg pb-4">
                                    Unlike actual financial losses (like losing a week's wages), you cannot put an exact price tag on a broken arm or a painful back. 
                                </p>
                                <p className="leading-relaxed text-lg">
                                    To ensure fairness across the UK legal system, the **Judicial College Guidelines (JCG)** publish official brackets for almost every conceivable injury. Judges, insurance companies, and solicitors use these brackets alongside medical evidence to negotiate a final settlement figure.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <div className="bg-slate-100/50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
                                <h4 className="font-black text-slate-500 uppercase text-[10px] tracking-[0.2em] mb-6">The Two Halves of Your Claim</h4>
                                <div className="space-y-6">
                                     <div className="p-4 bg-sky-50 dark:bg-sky-950/20 rounded-xl border border-sky-200 dark:border-sky-900/30">
                                        <h5 className="font-bold text-sky-900 dark:text-sky-400 mb-1 text-sm flex items-center gap-2">General Damages</h5>
                                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                                            This is compensation for the physical injury itself. It covers the pain you suffered, the treatment you endured, and any 'loss of amenity' (e.g., being unable to play your favourite sport or pick up your children).
                                        </p>
                                    </div>
                                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-900/30">
                                        <h5 className="font-bold text-emerald-900 dark:text-emerald-400 mb-1 text-sm flex items-center gap-2">Special Damages</h5>
                                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                                            This is to put you back in the financial position you would have been in if the accident hadn't happened. It covers lost wages from being off work, private medical bills, prescription costs, and travel to appointments.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. FAQ Section */}
                <FAQAccordion faqs={faqs} title="Personal Injury FAQs" />

                 {/* Final Legal Disclaimer */}
                <div className="bg-slate-100/50 dark:bg-slate-900/50 p-12 rounded-[3rem] border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-8 items-center text-center md:text-left shadow-sm">
                    <ShieldAlert className="w-16 h-16 text-slate-400 shrink-0" />
                    <div>
                        <h4 className="text-2xl font-black text-slate-800 dark:text-slate-200 mb-3 tracking-tight">Legal Disclaimer</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                            This calculator provides a rough estimate based on broad Judicial College Guidelines brackets and fixed whiplash tariffs. Every single case is unique. Your actual compensation could be significantly higher or lower depending on independent medical evidence, the severity of the ongoing symptoms, whether you held any partial blame (contributory negligence), and your solicitor's negotiation skills. This site does not provide formal legal advice.
                        </p>
                    </div>
                </div>

            </section>

            <RelatedTools currentCategory="Legal & Professional" currentSlug="/personal-injury-compensation-calculator-uk" />
            
            <CalculatorSchema 
                title="Personal Injury Compensation Calculator UK | Accident Claim Estimator"
                description="Estimate how much your personal injury claim could be worth. Covering General Damages (JCG brackets) and Special Damages for whiplash, fractures, and minor injuries."
                slug="/personal-injury-compensation-calculator-uk"
                faqs={faqs}
            />
        </div>
    );
}
