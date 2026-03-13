
import { Microscope, ShieldCheck, BookOpen, AlertCircle, Info, Stethoscope, HeartPulse, ChevronRight, Activity, TrendingUp, Sparkles } from "lucide-react";
import { DentalImplantCalculatorForm } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { Metadata } from "next";
import { RelatedTools } from "@/components/layout/related-tools";

export const metadata: Metadata = {
    title: "Dental Implant Cost Calculator UK | 2026 Price Estimates & Guide",
    description: "Calculate the cost of dental implants in the UK. Estimates for titanium, zirconia, bone grafts, and sinus lifts. Compare private UK dental clinic prices.",
    alternates: {
        canonical: "/dental-implant-cost-calculator-uk"
    }
};

export default function DentalImplantPage() {
    const faqs = [
        {
            question: "How much does a single dental implant cost in the UK?",
            answer: "In the UK, a single dental implant typically costs between £1,500 and £3,500 for private treatment. This includes the implant itself, the abutment, and the crown. Costs can vary significantly between London and regional clinics."
        },
        {
            question: "Does the NHS cover dental implants?",
            answer: "The NHS rarely covers dental implants. They are usually only provided if there is a clear medical need, such as following mouth cancer or severe trauma that cannot be treated with dentures or bridges."
        },
        {
            question: "How long do dental implants last?",
            answer: "With proper care and good oral hygiene, dental implants can last 25 years to a lifetime. The crown on top may need replacing every 10-15 years due to normal wear and tear."
        },
        {
            question: "Is the procedure painful?",
            answer: "The procedure is usually performed under local anaesthetic, so you shouldn't feel pain during the surgery. Most patients report minor discomfort for a few days after, which can be managed with standard over-the-counter painkillers."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <BreadcrumbSchema items={[
                { name: "Home", item: "/" },
                { name: "General Health", item: "/general-health" },
                { name: "Dental Implant Cost Calculator UK", item: "/dental-implant-cost-calculator-uk" }
            ]} />
            
            <section className="container mx-auto px-4 pt-16 text-center max-w-4xl">
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-100 dark:border-blue-900/40">
                    <ShieldCheck className="w-3 h-3" /> UK Private Dental Standards 2026
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tighter">
                    Dental Implant <span className="text-blue-600 italic">Cost</span> Calculator
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto opacity-90 font-medium">
                    Plan your dental restoration with precision. Get localized UK price estimates for implants, materials, and specialized procedures.
                </p>
            </section>

            <DentalImplantCalculatorForm />

            {/* SEO Content Section */}
            <section className="container mx-auto px-4 max-w-6xl mt-24 space-y-20">
                
                {/* 1. Definitive Price Guide */}
                <div className="bg-white/90 dark:bg-card/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-10 md:p-16 rounded-[3rem] shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 mb-10 flex items-center gap-4 tracking-tight relative z-10">
                        <BookOpen className="w-10 h-10 text-blue-600" />
                        The 2026 UK Dental Implant Cost Breakdown
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-16 text-slate-700 dark:text-slate-300 relative z-10">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-black flex items-center gap-2 text-slate-800 dark:text-slate-200 mb-4">
                                    <TrendingUp className="w-6 h-6 text-emerald-500" /> Why are costs so variable?
                                </h3>
                                <p className="leading-relaxed text-lg">
                                    Dental implant pricing in the UK isn't just about the screw. It involves highly skilled surgical time, advanced imaging (CT scans), premium materials, and laboratory fees for custom-made crowns.
                                </p>
                            </div>
                            <div className="bg-blue-50/50 dark:bg-blue-900/10 p-8 rounded-3xl border border-blue-100 dark:border-blue-800">
                                <h4 className="font-black text-blue-900 dark:text-blue-400 uppercase text-xs tracking-widest mb-4">Major Price Factors</h4>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span className="text-sm font-bold italic">Location: Central London vs Regional Clinics</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span className="text-sm font-bold italic">Brand: Nobel Biocare vs Generic Systems</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span className="text-sm font-bold italic">Expertise: Specialist Prosthodontist vs General Dentist</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <div className="bg-slate-100/50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
                                <h4 className="font-black text-slate-500 uppercase text-[10px] tracking-[0.2em] mb-6">Price Comparison Table (UK Average)</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                                        <span className="font-bold">Consultation & CT</span>
                                        <span className="text-blue-600 font-black">£150 – £350</span>
                                    </div>
                                    <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                                        <span className="font-bold">Single Titanium Implant</span>
                                        <span className="text-blue-600 font-black">£1,800 – £2,800</span>
                                    </div>
                                    <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                                        <span className="font-bold">Full Arch (All-on-4)</span>
                                        <span className="text-blue-600 font-black">£10k – £15k</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-bold">Bone Grafting</span>
                                        <span className="text-blue-600 font-black">£400 – £1,000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Advanced Technology Section */}
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-10 bg-slate-900 text-white rounded-[2.5rem] shadow-2xl group hover:-translate-y-2 transition-transform duration-500">
                        <Activity className="w-12 h-12 text-blue-400 mb-6" />
                        <h3 className="text-2xl font-black mb-4 tracking-tight">3D Guided Surgery</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Modern clinics use CBCT scans to create a 3D digital map of your jaw, ensuring sub-millimetre precision and reducing recovery time.
                        </p>
                    </div>
                    <div className="p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm group hover:-translate-y-2 transition-transform duration-500">
                        <Sparkles className="w-12 h-12 text-purple-500 mb-6" />
                        <h3 className="text-2xl font-black mb-4 tracking-tight">Zirconia vs Titanium</h3>
                        <p className="text-slate-500 text-sm leading-relaxed text-sm">
                            Titanium is the gold standard for strength, while Zirconia offers metal-free biocompatibility and superior aesthetics for thin gums.
                        </p>
                    </div>
                    <div className="p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm group hover:-translate-y-2 transition-transform duration-500">
                        <HeartPulse className="w-12 h-12 text-red-500 mb-6" />
                        <h3 className="text-2xl font-black mb-4 tracking-tight">Success Rates</h3>
                        <p className="text-slate-500 text-sm leading-relaxed text-sm">
                            UK dental implants boast a 95-98% success rate over 10 years when performed by registered GDC specialists.
                        </p>
                    </div>
                </div>

                {/* 3. Steps of the Journey */}
                <div className="space-y-12 bg-blue-600 text-white p-12 md:p-20 rounded-[4rem] relative overflow-hidden shadow-2xl shadow-blue-500/30">
                     <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mb-48 -mr-48"></div>
                     <h2 className="text-4xl font-black text-center mb-16 tracking-tighter">Your Implant Journey</h2>
                     <div className="grid md:grid-cols-4 gap-12 relative z-10">
                        {[
                            { step: "01", title: "Assessment", desc: "Consultation, X-rays, and Digital Scanning." },
                            { step: "02", title: "Placement", desc: "Surgical insertion of the implant post." },
                            { step: "03", title: "Healing", desc: "Osseointegration (usually 3-6 months)." },
                            { step: "04", title: "Restoration", desc: "Fitting of the final aesthetic crown." }
                        ].map((item, i) => (
                            <div key={i} className="text-center">
                                <div className="text-6xl font-black opacity-30 mb-4">{item.step}</div>
                                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                                <p className="text-white/70 text-sm">{item.desc}</p>
                            </div>
                        ))}
                     </div>
                </div>

                {/* 4. FAQ Section */}
                <FAQAccordion faqs={faqs} title="Dental Implant Questions" />

                {/* Final Medical Disclaimer */}
                <div className="bg-red-50/50 dark:bg-red-950/20 p-12 rounded-[3rem] border border-red-100 dark:border-red-900/30 flex flex-col md:flex-row gap-8 items-center text-center md:text-left shadow-sm">
                    <AlertCircle className="w-16 h-16 text-red-600 shrink-0" />
                    <div>
                        <h4 className="text-2xl font-black text-red-800 dark:text-red-400 mb-3 tracking-tight">Clinical Disclaimer</h4>
                        <p className="text-sm text-red-700 dark:text-red-300 leading-relaxed font-medium">
                            This calculator provides general estimates based on UK average private dental pricing. It is not a clinical diagnosis or a formal quotation. Individual biological factors, jaw bone density, and clinic-specific overheads will significantly influence the final cost. Always consult with a GDC-registered dentist for a comprehensive treatment plan and formal fee schedule.
                        </p>
                    </div>
                </div>
            </section>

            <RelatedTools currentCategory="General Health / Lifestyle" currentSlug="/dental-implant-cost-calculator-uk" />
            
            <CalculatorSchema 
                title="Dental Implant Cost Calculator UK | 2026 Price Estimates & Guide"
                description="Calculate the cost of dental implants in the UK. Estimates for titanium, zirconia, bone grafts, and sinus lifts. Compare private UK dental clinic prices."
                slug="/dental-implant-cost-calculator-uk"
                faqs={faqs}
            />
        </div>
    );
}
