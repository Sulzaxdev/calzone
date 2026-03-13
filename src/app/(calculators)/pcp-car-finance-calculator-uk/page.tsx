
import { Car, Info, AlertTriangle, FileText, BadgePercent, ArrowRight, ShieldAlert } from "lucide-react";
import { PCPCalculatorForm } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { Metadata } from "next";
import { RelatedTools } from "@/components/layout/related-tools";

export const metadata: Metadata = {
    title: "PCP Car Finance Calculator UK | Estimate Monthly Payments & Balloon",
    description: "Calculate your monthly car finance payments on a Personal Contract Purchase (PCP) deal. See clearly how much interest you'll pay and your final GMFV balloon payment.",
    alternates: {
        canonical: "/pcp-car-finance-calculator-uk"
    }
};

export default function PCPPage() {
    const faqs = [
        {
            question: "What does PCP stand for?",
            answer: "PCP stands for Personal Contract Purchase. It is currently the most popular way to finance a new or used car in the UK. Instead of paying off the entire value of the car, you only pay off the depreciation (the value the car loses) over the contract term."
        },
        {
            question: "How does the final 'balloon' payment work?",
            answer: "The finance company estimates what the car will be worth at the end of your agreement (say, 36 or 48 months). This is the Guaranteed Minimum Future Value (GMFV), often called the 'balloon payment'. Because you aren't paying this chunk off during your monthly instalments, your monthly payments are much lower than a standard bank loan. However, to actually own the car at the end, you MUST pay the balloon payment."
        },
        {
            question: "What are my options at the end of a PCP agreement?",
            answer: "You have three choices: 1) Hand the car back to the dealer and walk away (assuming you haven't exceeded the mileage limit and there's no damage). 2) Part-exchange it for a new car—if the car is worth more than the GMFV, you can use that 'equity' as a deposit for your next car. 3) Buy the car outright by paying the final GMFV balloon payment."
        },
        {
            question: "Is PCP cheaper than Hire Purchase (HP)?",
            answer: "Monthly payments are almost always cheaper on a PCP compared to HP because you aren't paying off the entire capital cost of the car. HOWEVER, the total cost of borrowing (the total interest paid) is usually HIGHER on a PCP because you are being charged interest on that large remaining balloon payment for the entire 3 or 4 years."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <BreadcrumbSchema items={[
                { name: "Home", item: "/" },
                { name: "Automotive Calculators", item: "/automotive" },
                { name: "PCP Car Finance Calculator UK", item: "/pcp-car-finance-calculator-uk" }
            ]} />
            
            <section className="container mx-auto px-4 pt-16 text-center max-w-4xl">
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50/50 dark:bg-sky-950/20 text-sky-600 dark:text-sky-400 text-[10px] font-black uppercase tracking-widest mb-6 border border-sky-100 dark:border-sky-900/40">
                    <Car className="w-3 h-3" /> The UK's Most Popular Car Finance Method
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tighter">
                    PCP Car Finance <span className="text-sky-600 italic">Calculator</span>
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto opacity-90 font-medium">
                    Find out the true cost of your car deal before you sign. Calculate your monthly instalments, total interest, and final balloon payment.
                </p>
            </section>

            <PCPCalculatorForm />

            {/* SEO Content Section */}
            <section className="container mx-auto px-4 max-w-6xl mt-24 space-y-20">
                
                {/* 1. Guide */}
                <div className="bg-white/90 dark:bg-card/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-10 md:p-16 rounded-[3rem] shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-sky-100/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 mb-10 flex items-center gap-4 tracking-tight relative z-10">
                        <FileText className="w-10 h-10 text-sky-600" />
                        Understanding PCP Car Finance
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-16 text-slate-700 dark:text-slate-300 relative z-10">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-black flex items-center gap-2 text-slate-800 dark:text-slate-200 mb-4">
                                    <BadgePercent className="w-6 h-6 text-sky-500" /> The Illusion of Low Payments
                                </h3>
                                <p className="leading-relaxed text-lg pb-4">
                                    Personal Contract Purchase (PCP) is heavily pushed by car dealerships because it makes expensive cars look affordable. By deferring a large chunk of the car's value to the end of the agreement (the balloon payment), your monthly payments shrink dramatically.
                                </p>
                                <p className="leading-relaxed text-lg">
                                    However, the hidden trap that catches many buyers is the total interest. Because you are only paying down part of the debt, the large remaining balloon payment generates interest every single month for the full 3 to 4 years of the agreement.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <div className="bg-slate-100/50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
                                <h4 className="font-black text-slate-500 uppercase text-[10px] tracking-[0.2em] mb-6">PCP vs HP: What's the difference?</h4>
                                <div className="space-y-6">
                                     <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-900/30">
                                        <h5 className="font-bold text-emerald-900 dark:text-emerald-400 mb-1 text-sm flex items-center gap-2">PCP (Personal Contract Purchase)</h5>
                                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">Lowest monthly payments. You generally don't own the car at the end unless you pay a massive final balloon payment. Strict mileage limits apply, and any damage beyond fair wear-and-tear will be heavily penalised if you hand the car back.</p>
                                    </div>
                                    <div className="p-4 bg-indigo-50 dark:bg-indigo-950/20 rounded-xl border border-indigo-200 dark:border-indigo-900/30">
                                        <h5 className="font-bold text-indigo-900 dark:text-indigo-400 mb-1 text-sm flex items-center gap-2">HP (Hire Purchase)</h5>
                                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">Higher monthly payments, but there's no balloon payment at the end. Once you make the final monthly payment, the car is 100% yours. Usually results in less total interest being paid overall.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. FAQ Section */}
                <FAQAccordion faqs={faqs} title="PCP Finance FAQs" />

                 {/* Final Legal Disclaimer */}
                <div className="bg-slate-100/50 dark:bg-slate-900/50 p-12 rounded-[3rem] border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-8 items-center text-center md:text-left shadow-sm">
                    <ShieldAlert className="w-16 h-16 text-slate-400 shrink-0" />
                    <div>
                        <h4 className="text-2xl font-black text-slate-800 dark:text-slate-200 mb-3 tracking-tight">Financial Disclaimer</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                            This calculator provides an estimate of your monthly car finance payments based on standard amortisation formulas typical of UK lenders. Actual quotes from a dealership may vary slightly due to daily interest compounding or documentation/option to purchase fees being rolled into the first or final payment. We are not financial advisors or a credit broker.
                        </p>
                    </div>
                </div>

            </section>

            <RelatedTools currentCategory="Automotive" currentSlug="/pcp-car-finance-calculator-uk" />
            
            <CalculatorSchema 
                title="PCP Car Finance Calculator UK | Estimate Monthly Payments & Balloon"
                description="Calculate your monthly car finance payments on a Personal Contract Purchase (PCP) deal. See clearly how much interest you'll pay and your final GMFV balloon payment."
                slug="/pcp-car-finance-calculator-uk"
                faqs={faqs}
            />
        </div>
    );
}
