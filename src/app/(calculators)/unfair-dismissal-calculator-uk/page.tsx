
import { Scale, Gavel, CalendarClock, AlertCircle, FileText, Briefcase, Landmark } from "lucide-react";
import { UnfairDismissalCalculatorForm } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { Metadata } from "next";
import { RelatedTools } from "@/components/layout/related-tools";

export const metadata: Metadata = {
    title: "Unfair Dismissal Compensation Calculator UK (2024)",
    description: "Estimate your Basic Award for unfair dismissal in the UK. Calculate your statutory payout based on your age, length of service, and weekly pay.",
    alternates: {
        canonical: "/unfair-dismissal-calculator-uk"
    }
};

export default function UnfairDismissalPage() {
    const faqs = [
        {
            question: "What is the difference between the Basic Award and Compensatory Award?",
            answer: "The Basic Award is a fixed statutory calculation (what this calculator estimates) designed to compensate you for the loss of your job security, similar to redundancy pay. The Compensatory Award is entirely separate and covers your actual financial losses (like lost wages and pension contributions) from the date of dismissal until you find a new job."
        },
        {
            question: "How long must I have worked there to claim?",
            answer: "In almost all cases, you must have exactly 2 years of continuous service with your employer to bring an ordinary claim for unfair dismissal to an Employment Tribunal in the UK. There are 'automatically unfair' exceptions (e.g., being fired for pregnancy or whistleblowing) that require no minimum service."
        },
        {
            question: "What is the maximum I can receive?",
            answer: "As of April 2024, the weekly pay cap used in the Basic Award calculation is £700. Since the maximum number of years you can claim is 20, and the highest multiplier is 1.5, the absolute maximum Basic Award is £21,000 (1.5 x 20 x £700)."
        },
        {
            question: "When should I use this over a Redundancy Calculator?",
            answer: "The mathematical formula for the Basic Award in unfair dismissal is identical to statutory redundancy pay. However, if you were made redundant but the process was a sham or legally flawed, you would claim unfair dismissal. The Basic Award ensures you receive at least your statutory entitlement."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <BreadcrumbSchema items={[
                { name: "Home", item: "/" },
                { name: "Legal", item: "/legal" },
                { name: "Unfair Dismissal Basic Award Calculator", item: "/unfair-dismissal-calculator-uk" }
            ]} />
            
            <section className="container mx-auto px-4 pt-16 text-center max-w-4xl">
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-6 border border-indigo-100 dark:border-indigo-900/40">
                    <Scale className="w-3 h-3" /> Updated for 2024/2025 Tribunal Limits
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tighter">
                    Unfair Dismissal <span className="text-indigo-600 italic">Estimator</span>
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto opacity-90 font-medium">
                    Calculate your statutory "Basic Award" if you have been wrongfully terminated. This formula is identical to what a UK Employment Tribunal uses.
                </p>
            </section>

            <UnfairDismissalCalculatorForm />

            {/* SEO Content Section */}
            <section className="container mx-auto px-4 max-w-6xl mt-24 space-y-20">
                
                {/* 1. Guide */}
                <div className="bg-white/90 dark:bg-card/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-10 md:p-16 rounded-[3rem] shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 mb-10 flex items-center gap-4 tracking-tight relative z-10">
                        <Gavel className="w-10 h-10 text-indigo-600" />
                        Understanding Employment Tribunal Awards
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-16 text-slate-700 dark:text-slate-300 relative z-10">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-black flex items-center gap-2 text-slate-800 dark:text-slate-200 mb-4">
                                    <Briefcase className="w-6 h-6 text-emerald-500" /> How the Basic Award is Calculated
                                </h3>
                                <p className="leading-relaxed text-lg pb-4">
                                    The basic award is a statutory calculation designed to give you a bare minimum of compensation for the unfair loss of your job. It scales based on your age and loyalty to the firm.
                                </p>
                                <div className="space-y-6">
                                    <div className="bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800/50">
                                        <h4 className="font-bold text-indigo-900 dark:text-indigo-400 mb-2 flex items-center gap-2">Age Multipliers</h4>
                                        <ul className="text-sm space-y-2">
                                            <li><strong>Over 41:</strong> 1.5 weeks' pay per year</li>
                                            <li><strong>Aged 22 to 40:</strong> 1 week's pay per year</li>
                                            <li><strong>Under 22:</strong> 0.5 week's pay per year</li>
                                        </ul>
                                    </div>
                                    <div className="bg-slate-100 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50">
                                        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">The Weekly Pay Cap</h4>
                                        <p className="text-sm">No matter how much you earned, HMRC caps the weekly pay used in this specific mathematical calculation. From April 6th, 2024, this absolute cap is £700 per week.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <div className="bg-slate-100/50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
                                <h4 className="font-black text-slate-500 uppercase text-[10px] tracking-[0.2em] mb-6">The Importance of the "Compensatory Award"</h4>
                                <div className="space-y-4">
                                    <p className="text-sm leading-relaxed mb-4">
                                        This calculator ONLY estimates your Basic Award. A successful claim at tribunal usually guarantees you the Basic Award PLUS the Compensatory Award.
                                    </p>
                                    <p className="text-sm leading-relaxed font-bold text-indigo-700 dark:text-indigo-400">
                                        The Compensatory Award is where the real money is.
                                    </p>
                                    <p className="text-sm leading-relaxed">
                                        It covers your actual financial loss. If you earned £60,000 a year, and it took you exactly 6 months to find an equivalent job after being unfairly dismissed, your Compensatory Award would be roughly £30,000 (your lost net wages).
                                    </p>
                                    <p className="text-xs italic text-slate-500 mt-4">
                                        Note: You are under a strict legal duty to "mitigate your loss" by actively searching for new employment.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* 4. FAQ Section */}
                <FAQAccordion faqs={faqs} title="Employment Tribunal FAQs" />

                 {/* Final Legal Disclaimer */}
                <div className="bg-red-50/50 dark:bg-red-950/20 p-12 rounded-[3rem] border border-red-100 dark:border-red-900/30 flex flex-col md:flex-row gap-8 items-center text-center md:text-left shadow-sm">
                    <AlertCircle className="w-16 h-16 text-red-600 shrink-0" />
                    <div>
                        <h4 className="text-2xl font-black text-red-800 dark:text-red-400 mb-3 tracking-tight">Legal Disclaimer</h4>
                        <p className="text-sm text-red-700 dark:text-red-300 leading-relaxed font-medium">
                            This calculator provides a statutory estimate of the Basic Award for unfair dismissal in Great Britain. It does not calculate the Compensatory Award. Employment law is highly complex and time-sensitive (you usually have exactly 3 months less 1 day to initiate ACAS Early Conciliation). This tool is for educational purposes only and does not constitute legal advice. Always consult an Employment Solicitor immediately if you believe you have been unfairly dismissed.
                        </p>
                    </div>
                </div>

            </section>

            <RelatedTools currentCategory="Legal" currentSlug="/unfair-dismissal-calculator-uk" />
            
            <CalculatorSchema 
                title="Unfair Dismissal Compensation Calculator UK (2024)"
                description="Estimate your Basic Award for unfair dismissal in the UK. Calculate your statutory payout based on your age, length of service, and weekly pay."
                slug="/unfair-dismissal-calculator-uk"
                faqs={faqs}
            />
        </div>
    );
}
