import { ArchitectsFeeForm } from "./calculator";
import { Metadata } from "next";
import {
    Wallet,
    Home,
    Building2,
    ShieldCheck,
    Info,
    TrendingUp,
    Zap,
    HelpCircle,
    AlertCircle,
    HardHat,
    Ruler
} from "lucide-react";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata: Metadata = {
    title: "Architects Fee Calculator UK | Professional Design Cost Estimator",
    description: "Calculate expected architect fees for your UK construction project. Estimate percentage-based fees for new builds, renovations, and extensions based on RIBA benchmarks.",
    keywords: ["Architect Fees UK", "Architect Cost Calculator", "RIBA Fees Estimate", "Building Design Cost", "Extension Architect Fees", "Residential Architect Costs"],
};

export default function ArchitectsFeePage() {
    const faqs = [
        {
            question: "How are architect fees typically calculated in the UK?",
            answer: "Most UK architects charge a percentage of the total construction cost, typically ranging from 7% to 15% for residential projects. Alternatively, some may charge fixed fees for smaller jobs or hourly rates for consultation."
        },
        {
            question: "Why are fees higher for renovations than new builds?",
            answer: "Renovations involve more complexity, such as 'opening up' existing structures, dealing with unknowns, and matching new materials to old ones. This requires more time for site visits and detailed drawing sets."
        },
        {
            question: "What is included in the architect's fee?",
            answer: "Typically, this covers initial design, planning applications, building regulations drawings, and construction oversight. However, structural engineering fees and planning application costs are usually separate."
        },
        {
            question: "Can I save money by not using an architect?",
            answer: "For simple extensions, a draughtsman or structural engineer might suffice. However, for complex designs or projects requiring planning permission in restricted areas, an architect's expertise can prevent costly mistakes and add significant value to the property."
        }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 lg:py-20">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold text-sm mb-6 border border-indigo-100 dark:border-indigo-800 animate-fade-in">
                    <Building2 className="w-4 h-4" />
                    Build Economics Suite
                </div>
                <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                    Architects <span className="text-primary italic">Fee Calculator</span>
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Estimate professional design and management costs based on current RIBA benchmarks and UK industry standards.
                </p>
            </div>

            {/* Main Calculator Form */}
            <div className="mb-20">
                <ArchitectsFeeForm />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                <div className="space-y-6">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-3">
                        <Ruler className="w-8 h-8 text-primary" />
                        Professional Benchmarks
                    </h2>
                    <div className="prose prose-slate dark:prose-invert max-w-none space-y-4">
                        <p>
                            Architect fees are highly dependent on project volume and complexity. Larger commercial projects often have lower percentages (5-8%) while bespoke residential work demands more detail (10-15%).
                        </p>
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                            <h3 className="text-lg font-black mb-4 uppercase tracking-widest text-slate-400">Typical Fee Scales</h3>
                            <ul className="space-y-4 text-sm font-medium">
                                <li className="flex items-center gap-3">
                                    <div className="w-24 text-center py-1 rounded bg-green-100 dark:bg-green-900/50 text-green-700 font-black">New Build</div>
                                    <span className="text-slate-600 dark:text-slate-400">7% - 10% of total cost</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-24 text-center py-1 rounded bg-orange-100 dark:bg-orange-900/50 text-orange-700 font-black">Renovation</div>
                                    <span className="text-slate-600 dark:text-slate-400">10% - 12% of total cost</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-24 text-center py-1 rounded bg-red-100 dark:bg-red-900/50 text-red-700 font-black">Extension</div>
                                    <span className="text-slate-600 dark:text-slate-400">12% - 15% of total cost</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="bg-indigo-500/5 dark:bg-indigo-500/10 p-10 rounded-[3.5rem] border border-indigo-500/10 relative overflow-hidden h-full flex flex-col justify-center shadow-xl shadow-indigo-500/5">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl opacity-50"></div>
                    <h2 className="text-2xl font-black mb-8 flex items-center gap-3 text-indigo-600 dark:text-indigo-400 tracking-tight">
                        <ShieldCheck className="w-7 h-7" />
                        Why Use an Architect?
                    </h2>
                    <ul className="space-y-6">
                        <li className="flex gap-4">
                            <div className="mt-1 p-1 bg-green-100 dark:bg-green-900/40 rounded-full"><TrendingUp className="w-5 h-5 text-green-600" /></div>
                            <p className="text-slate-700 dark:text-slate-300 font-medium leading-snug"><strong>Value Creation:</strong> Good design can increase the final value of your property by significantly more than the architect's fee.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="mt-1 p-1 bg-green-100 dark:bg-green-900/40 rounded-full"><TrendingUp className="w-5 h-5 text-green-600" /></div>
                            <p className="text-slate-700 dark:text-slate-300 font-medium leading-snug"><strong>Planning Navigation:</strong> Architects understand local planning policies and can navigate complex approvals.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="mt-1 p-1 bg-green-100 dark:bg-green-900/40 rounded-full"><TrendingUp className="w-5 h-5 text-green-600" /></div>
                            <p className="text-slate-700 dark:text-slate-300 font-medium leading-snug"><strong>Cost Control:</strong> Detailed drawings help prevent builder "extras" and scope creep during construction.</p>
                        </li>
                    </ul>
                </div>
            </div>

            {/* FAQ Section */}
            <section className="mb-20">
                <h2 className="text-3xl font-black mb-12 text-center flex items-center justify-center gap-3">
                    <HelpCircle className="w-8 h-8 text-primary" />
                    Frequently Asked Questions
                </h2>
                <FAQAccordion faqs={faqs} />
            </section>

            {/* Warning */}
            <div className="p-8 rounded-[2.5rem] bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 flex gap-6 items-center">
                <AlertCircle className="w-12 h-12 text-amber-600 shrink-0" />
                <p className="text-sm text-amber-900 dark:text-amber-400 font-bold leading-relaxed">
                    Disclaimer: These estimates are based on industry averages. Architects may charge significantly more for bespoke projects, or less for repeat work. Always request a detailed fee proposal.
                </p>
            </div>
        </div>
    );
}
