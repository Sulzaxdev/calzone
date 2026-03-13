
import { Scissors, Activity, PoundSterling, HeartPulse, ShieldCheck, FileText, CheckCircle2, AlertTriangle, Syringe, Plane } from "lucide-react";
import { HairTransplantCalculatorForm } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { Metadata } from "next";
import { RelatedTools } from "@/components/layout/related-tools";

export const metadata: Metadata = {
    title: "Hair Transplant Graft Calculator UK & Turkey Costs",
    description: "Estimate how many grafts you need for a hair transplant (FUE/FUT). Compare average costs in the UK vs medical tourism in Turkey.",
    alternates: {
        canonical: "/hair-transplant-graft-calculator-uk"
    }
};

export default function HairTransplantPage() {
    const faqs = [
        {
            question: "How many grafts do I need?",
            answer: "It depends completely on your level of hair loss (measured by the Norwood Scale) and your donor area's density. A receding hairline might need 1,000 to 2,000 grafts, while restoring the crown and front could require 3,000 to 5,000 grafts."
        },
        {
            question: "What is the difference between FUE and FUT?",
            answer: "FUE (Follicular Unit Extraction) involves removing individual hair follicles one by one, leaving tiny, unnoticeable dot scars. FUT (Follicular Unit Transplantation) involves removing a strip of skin from the back of the head, leaving a linear scar, but is often cheaper and sometimes yields more grafts in a single sitting."
        },
        {
            question: "Why is Turkey so much cheaper than the UK?",
            answer: "Turkey has become the global hub for hair transplants due to lower domestic labor costs, favorable exchange rates, and heavy government subsidies for medical tourism. Clinics often perform high volumes of surgeries, allowing them to offer 'all-inclusive' package deals."
        },
        {
            question: "Are hair transplants permanent?",
            answer: "Yes, transplanted hair from the back of your head is genetically resistant to the DHT hormone that causes male pattern baldness. However, you can still lose your existing non-transplanted native hair over time if you don't take preventative medication (like Finasteride or Minoxidil)."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <BreadcrumbSchema items={[
                { name: "Home", item: "/" },
                { name: "Health & Aesthetics", item: "/health-fitness" },
                { name: "Hair Transplant Estimator", item: "/hair-transplant-graft-calculator-uk" }
            ]} />
            
            <section className="container mx-auto px-4 pt-16 text-center max-w-4xl">
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50/50 dark:bg-sky-950/20 text-sky-600 dark:text-sky-400 text-[10px] font-black uppercase tracking-widest mb-6 border border-sky-100 dark:border-sky-900/40">
                    <CheckCircle2 className="w-3 h-3" /> Based on 2024/2025 Global Clinic Averages
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tighter">
                    Hair Transplant <span className="text-sky-600 italic">Graft Estimator</span>
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto opacity-90 font-medium">
                    Map out your restoration. Estimate the number of grafts you need and compare standard clinic costs in the UK against medical tourism prices in Turkey.
                </p>
            </section>

            <HairTransplantCalculatorForm />

            {/* SEO Content Section */}
            <section className="container mx-auto px-4 max-w-6xl mt-24 space-y-20">
                
                {/* 1. Guide */}
                <div className="bg-white/90 dark:bg-card/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-10 md:p-16 rounded-[3rem] shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-sky-100/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 mb-10 flex items-center gap-4 tracking-tight relative z-10">
                        <FileText className="w-10 h-10 text-sky-600" />
                        The Ultimate Guide to Hair Restoration
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-16 text-slate-700 dark:text-slate-300 relative z-10">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-black flex items-center gap-2 text-slate-800 dark:text-slate-200 mb-4">
                                    <Syringe className="w-6 h-6 text-emerald-500" /> FUE vs. FUT: Which is better?
                                </h3>
                                <p className="leading-relaxed text-lg pb-4">
                                    The two main techniques for hair transplantation differ primarily in how the donor hair is extracted from the back of your head.
                                </p>
                                <div className="space-y-6">
                                    <div className="bg-sky-50 dark:bg-sky-900/10 p-6 rounded-2xl border border-sky-100 dark:border-sky-800/50">
                                        <h4 className="font-bold text-sky-900 dark:text-sky-400 mb-2 flex items-center gap-2">Follicular Unit Extraction (FUE)</h4>
                                        <p className="text-sm">Follicles are 'punched' out individually. Recovery is faster, and it leaves tiny dot scars that are invisible even with short haircuts. It is the dominant method worldwide today.</p>
                                    </div>
                                    <div className="bg-slate-100 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50">
                                        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Follicular Unit Transplantation (FUT)</h4>
                                        <p className="text-sm">A strip of skin is cut from the back of the scalp and stitched up. Dissected under a microscope, this method can yield higher graft survival rates but leaves a permanent linear scar.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <div className="bg-slate-100/50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
                                <h4 className="font-black text-slate-500 uppercase text-[10px] tracking-[0.2em] mb-6">The Norwood Scale Demystified</h4>
                                <div className="space-y-4">
                                    <p className="text-sm leading-relaxed mb-4">
                                        Surgeons use the Norwood Scale (Stages 1 to 7) to classify male pattern baldness. Here's a rough guide to graft requirements:
                                    </p>
                                    <ul className="space-y-3">
                                        <li className="flex justify-between text-sm border-b border-slate-200 dark:border-slate-700 pb-2">
                                            <span className="font-bold">Norwood 2-3 (Receding Hairline)</span>
                                            <span className="text-sky-600 dark:text-sky-400 font-bold">1,000 - 2,000</span>
                                        </li>
                                         <li className="flex justify-between text-sm border-b border-slate-200 dark:border-slate-700 pb-2">
                                            <span className="font-bold">Norwood 4-5 (Front + Crown split)</span>
                                            <span className="text-sky-600 dark:text-sky-400 font-bold">2,500 - 4,000</span>
                                        </li>
                                         <li className="flex justify-between text-sm">
                                            <span className="font-bold">Norwood 6-7 (Extensive Loss)</span>
                                            <span className="text-sky-600 dark:text-sky-400 font-bold">5,000+ (Multiple surgeries)</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. UK vs Turkey Section */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-10 bg-slate-900 text-white rounded-[2.5rem] shadow-2xl group hover:-translate-y-2 transition-transform duration-500">
                        <PoundSterling className="w-12 h-12 text-rose-400 mb-6" />
                        <h3 className="text-2xl font-black mb-4 tracking-tight">Staying in the UK</h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-4">
                            Opting for a Harley Street or regional UK clinic ensures CQC (Care Quality Commission) regulation, easier follow-ups if complications arise, and direct contact with your surgeon.
                        </p>
                        <p className="text-sky-300 font-bold text-sm">Cost: Usually £2.50 to £5.00 PER graft.</p>
                    </div>
                    <div className="p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm group hover:-translate-y-2 transition-transform duration-500">
                        <Plane className="w-12 h-12 text-emerald-500 mb-6" />
                        <h3 className="text-2xl font-black mb-4 tracking-tight">Medical Tourism (Turkey)</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-4">
                            Istanbul offers luxury "all-inclusive" packages covering the surgery, 5-star hotels, and VIP airport transfers. Quality varies wildly, so deep research into the specific surgeon (not just the clinic brand) is vital.
                        </p>
                        <p className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">Cost: Usually £1,500 to £3,000 fixed package.</p>
                    </div>
                </div>

                {/* 4. FAQ Section */}
                <FAQAccordion faqs={faqs} title="Hair Transplant FAQs" />

                {/* Final Medical Disclaimer */}
                <div className="bg-red-50/50 dark:bg-red-950/20 p-12 rounded-[3rem] border border-red-100 dark:border-red-900/30 flex flex-col md:flex-row gap-8 items-center text-center md:text-left shadow-sm">
                    <AlertTriangle className="w-16 h-16 text-red-600 shrink-0" />
                    <div>
                        <h4 className="text-2xl font-black text-red-800 dark:text-red-400 mb-3 tracking-tight">Medical Disclaimer</h4>
                        <p className="text-sm text-red-700 dark:text-red-300 leading-relaxed font-medium">
                            This calculator provides rough estimates based on global averages. Every head is different. Only a qualified hair restoration surgeon can assess your donor area capacity and provide an accurate graft count and quote. This tool does not constitute medical advice.
                        </p>
                    </div>
                </div>

            </section>

            <RelatedTools currentCategory="Health" currentSlug="/hair-transplant-graft-calculator-uk" />
            
            <CalculatorSchema 
                title="Hair Transplant Graft Calculator UK & Turkey Costs"
                description="Estimate how many grafts you need for a hair transplant (FUE/FUT). Compare average costs in the UK vs medical tourism in Turkey."
                slug="/hair-transplant-graft-calculator-uk"
                faqs={faqs}
            />
        </div>
    );
}
