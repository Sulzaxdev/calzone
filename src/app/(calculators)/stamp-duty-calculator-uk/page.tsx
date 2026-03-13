
import { Home, Receipt, AlertCircle, TrendingUp, Info, Building, FileText, Globe } from "lucide-react";
import { StampDutyCalculatorForm } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { Metadata } from "next";
import { RelatedTools } from "@/components/layout/related-tools";

export const metadata: Metadata = {
    title: "Stamp Duty Calculator UK 2026 | New Rates & Thresholds",
    description: "Calculate your Stamp Duty Land Tax (SDLT) for 2026. Get exact HMRC estimates for first-time buyers, additional properties, and non-UK residents.",
    alternates: {
        canonical: "/stamp-duty-calculator-uk"
    }
};

export default function StampDutyPage() {
    const faqs = [
        {
            question: "What is the Stamp Duty threshold for first-time buyers?",
            answer: "Currently, first-time buyers in England and Northern Ireland pay no Stamp Duty on properties up to £425,000. They pay 5% on the portion between £425,001 and £625,000. If the property costs more than £625,000, standard SDLT rates apply to the entire amount."
        },
        {
            question: "When do I have to pay the 3% additional property surcharge?",
            answer: "You must pay the 3% surcharge if you buy an additional residential property (like a holiday home or buy-to-let) for £40,000 or more, and you already own another residential property globally. There are exceptions if you are replacing your main residence."
        },
        {
            question: "Do non-UK residents pay more Stamp Duty?",
            answer: "Yes, non-UK residents face a 2% surcharge on top of all other applicable Stamp Duty rates. This applies even if you are a UK citizen living abroad, depending on how many days you've spent in the UK."
        },
        {
            question: "When is Stamp Duty paid to HMRC?",
            answer: "You must file an SDLT return and pay the tax due within 14 days of completing the purchase of the property. Your conveyancer or solicitor usually handles this for you on completion day."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <BreadcrumbSchema items={[
                { name: "Home", item: "/" },
                { name: "Property", item: "/property" },
                { name: "Stamp Duty Calculator 2026", item: "/stamp-duty-calculator-uk" }
            ]} />
            
            <section className="container mx-auto px-4 pt-16 text-center max-w-4xl">
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50/50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 text-[10px] font-black uppercase tracking-widest mb-6 border border-rose-100 dark:border-rose-900/40">
                    <Building className="w-3 h-3" /> Updated for 2024-2026 HMRC Rules
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tighter">
                    Stamp Duty <span className="text-rose-600 italic">Calculator UK</span>
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto opacity-90 font-medium">
                    Instantly calculate your SDLT liability. Discover your exact tax bands for first-time buying, moving home, or investing in additional properties.
                </p>
            </section>

            <StampDutyCalculatorForm />

            {/* SEO Content Section */}
            <section className="container mx-auto px-4 max-w-6xl mt-24 space-y-20">
                
                {/* 1. Guide */}
                <div className="bg-white/90 dark:bg-card/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-10 md:p-16 rounded-[3rem] shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-rose-100/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 mb-10 flex items-center gap-4 tracking-tight relative z-10">
                        <FileText className="w-10 h-10 text-rose-600" />
                        Understanding UK Property Taxes
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-16 text-slate-700 dark:text-slate-300 relative z-10">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-black flex items-center gap-2 text-slate-800 dark:text-slate-200 mb-4">
                                    <Receipt className="w-6 h-6 text-emerald-500" /> How is Stamp Duty Calculated?
                                </h3>
                                <p className="leading-relaxed text-lg">
                                    Stamp Duty Land Tax (SDLT) is a progressive tax paid when purchasing property or land in England and Northern Ireland. Taking a 'slice' approach, you only pay the designated tax rate on the portion of the property price falling within that specific tax band.
                                </p>
                            </div>
                            <div className="bg-rose-50/50 dark:bg-rose-900/10 p-8 rounded-3xl border border-rose-100 dark:border-rose-800">
                                <h4 className="font-black text-rose-900 dark:text-rose-400 uppercase text-xs tracking-widest mb-4">The 'Slice' System Explained</h4>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="p-1.5 mt-0.5 bg-rose-500 rounded-md text-white"><Home className="w-3 h-3" /></div>
                                        <div>
                                            <span className="text-sm font-bold block">£0 to £250,000 = 0% Tax</span>
                                            <span className="text-xs text-slate-500">The initial chunk of property value is tax-free for most buyers.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="p-1.5 mt-0.5 bg-rose-500 rounded-md text-white"><Home className="w-3 h-3" /></div>
                                        <div>
                                            <span className="text-sm font-bold block">£250,001 to £925,000 = 5% Tax</span>
                                            <span className="text-xs text-slate-500">You only pay 5% on the amount that exceeds £250,000.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <div className="bg-slate-100/50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
                                <h4 className="font-black text-slate-500 uppercase text-[10px] tracking-[0.2em] mb-6">First-Time Buyer Advantages</h4>
                                <div className="space-y-4">
                                    <p className="text-sm leading-relaxed mb-4">
                                        To help people get onto the property ladder, HMRC offers generous relief for first-time buyers, saving them thousands of pounds.
                                    </p>
                                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-900/30">
                                        <h5 className="font-bold text-emerald-900 dark:text-emerald-400 mb-1 text-xs uppercase tracking-widest">Key Threshold</h5>
                                        <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">Zero SDLT up to £425,000.</p>
                                    </div>
                                    <p className="text-xs text-slate-500 italic mt-2">
                                        Note: If the property costs more than £625,000, you lose first-time buyer relief entirely and pay standard rates.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Surcharges Section */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-10 bg-slate-900 text-white rounded-[2.5rem] shadow-2xl group hover:-translate-y-2 transition-transform duration-500">
                        <TrendingUp className="w-12 h-12 text-rose-400 mb-6" />
                        <h3 className="text-2xl font-black mb-4 tracking-tight">The 3% Additional Property Surcharge</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            If you're buying a second home, a buy-to-let investment, or purchasing through a limited company, you will usually face a 3% surcharge on every tax band starting from £40,000. 
                        </p>
                    </div>
                    <div className="p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm group hover:-translate-y-2 transition-transform duration-500">
                        <Globe className="w-12 h-12 text-blue-500 mb-6" />
                        <h3 className="text-2xl font-black mb-4 tracking-tight">Non-UK Resident Surcharge</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Introduced in 2021, overseas buyers must pay a 2% surcharge on top of all other SDLT rates. This applies to expats who haven't spent at least 183 days in the UK during the 12 months before buying.
                        </p>
                    </div>
                </div>

                {/* 4. FAQ Section */}
                <FAQAccordion faqs={faqs} title="Stamp Duty FAQs" />

            </section>

            <RelatedTools currentCategory="Property" currentSlug="/stamp-duty-calculator-uk" />
            
            <CalculatorSchema 
                title="Stamp Duty Calculator UK 2026 | New Rates & Thresholds"
                description="Calculate your Stamp Duty Land Tax (SDLT) for 2026. Get exact HMRC estimates for first-time buyers, additional properties, and non-UK residents."
                slug="/stamp-duty-calculator-uk"
                faqs={faqs}
            />
        </div>
    );
}

