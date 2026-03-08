import { Baby, Clock, MapPin, ShieldCheck, HeartPulse } from "lucide-react";
import { ChildcareCostCalculator } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "Childcare Cost Calculator UK 2026 | Nursery & Nanny Fees",
    description: "Calculate your weekly and monthly childcare costs in the UK. Estimates for nurseries, childminders, and nannies, including 15 and 30 free hours funding.",
};

export default function ChildcareCostPage() {
    const faqs = [
        {
            question: "How many free childcare hours am I entitled to in the UK?",
            answer: "All 3 and 4-year-olds in England are entitled to 15 hours of free childcare per week for 38 weeks of the year (570 hours total). Working parents of 3 and 4-year-olds may be eligible for an additional 15 hours, totaling 30 hours. From September 2025, this 30-hour entitlement was expanded to include children from 9 months old for eligible working families."
        },
        {
            question: "Is it cheaper to use a nanny or a nursery in the UK?",
            answer: "For a single child, a nursery is almost always cheaper. However, because nannies charge per hour regardless of how many children they are looking after, they often become more cost-effective for families with three or more children. Nannies also offer more flexibility but require you to become an employer, handling tax and National Insurance."
        },
        {
            question: "What is the 'Tax-Free Childcare' scheme?",
            answer: "Tax-Free Childcare is a government scheme where for every £8 you pay into an online childcare account, the government adds £2 (up to £2,000 per child per year). This is effectively a 20% discount on your childcare costs and can be used alongside the 15/30 free hours entitlement."
        },
        {
            question: "What are 'consumables' charges in nurseries?",
            answer: "Many nurseries charge a daily fee (typically £5 to £15) even for the 'free' hours. This fee covers things like meals, snacks, nappies, wipes, and specialist classes (like French or music) that the government funding rate doesn't fully cover."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <CalculatorSchema
                title="Childcare Cost Calculator UK"
                description="Use our UK childcare cost calculator to estimate your nursery, childminder, or nanny expenses. Supports calculation for 15 and 30 free hours funding."
                slug="/childcare-cost-calculator-uk"
                faqs={faqs}
            />

            {/* Hero Section */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-sm font-semibold mb-6">
                        <Baby className="w-4 h-4" />
                        Family Finance
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        UK Childcare Cost Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Navigate the complexity of UK childcare fees. Estimate your out-of-pocket costs after government funding and tax-free childcare benefits.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                <div className="max-w-4xl mx-auto">
                    <ChildcareCostCalculator />
                </div>

                {/* Information Sections */}
                <div className="mt-20 max-w-4xl mx-auto space-y-16">
                    <section className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-sm">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 border-b border-slate-100 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <ShieldCheck className="w-8 h-8 text-rose-500" />
                            Guide to Childcare Costs in England
                        </h2>

                        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                Childcare is one of the biggest monthly expenses for UK families. With the government's phased expansion of free childcare hours, understanding what you'll actually pay in 2026 requires looking at child age, parent work status, and geographic location.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-rose-500" />
                                        Regional Price Variations
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        London and the South East are significantly more expensive. In 2026, a full-time nursery place in London often exceeds <strong>£1,800 per month</strong>, compared to <strong>£1,100 - £1,300</strong> in parts of Northern England.
                                    </p>
                                </div>
                                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <HeartPulse className="w-5 h-5 text-rose-500" />
                                        Age & Staff Ratios
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Babies (under 2) require a <strong>1:3 staff-to-child ratio</strong>, making them the most expensive to care for. As the child reaches age 2 (1:5) and age 3 (1:8), the cost per hour typically drops as staffing requirements relax.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-rose-50 dark:bg-rose-900/20 p-8 rounded-3xl border border-rose-100 dark:border-rose-800/50">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">How to Save on Childcare</h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-6">
                                    Beyond the 15 and 30-hour free childcare schemes, consider these additional ways to reduce your monthly bill:
                                </p>
                                <ul className="space-y-4 text-sm">
                                    <li className="flex gap-4">
                                        <div className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                                        <div>
                                            <span className="font-bold text-slate-900 dark:text-white block">Tax-Free Childcare</span>
                                            <span className="text-slate-600 dark:text-slate-400">Save up to £500 every three months per child. This is open to most working parents.</span>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                                        <div>
                                            <span className="font-bold text-slate-900 dark:text-white block">Universal Credit Childcare</span>
                                            <span className="text-slate-600 dark:text-slate-400">Low-income families can claim back up to 85% of their childcare costs through Universal Credit.</span>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                                        <div>
                                            <span className="font-bold text-slate-900 dark:text-white block">Childcare Vouchers</span>
                                            <span className="text-slate-600 dark:text-slate-400">Only applicable if you joined a scheme through your employer before October 2018.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <FAQAccordion faqs={faqs} title="Childcare & Funding FAQs" />
                </div>
            </div>
        </div>
    );
}
