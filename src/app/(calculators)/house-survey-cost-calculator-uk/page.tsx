import { ClipboardCheck, Home, Search } from "lucide-react";
import { HouseSurveyCostCalculator } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "House Survey Cost Calculator UK 2026 | Property Survey Fees",
    description: "Calculate how much a house survey costs in the UK. Get estimates for RICS Level 1, Level 2 (Homebuyer), and Level 3 (Building) surveys based on house value and age.",
};

export default function HouseSurveyCostPage() {
    const faqs = [
        {
            question: "Is a house survey a legal requirement in the UK?",
            answer: "No, it is not a legal requirement to get a house survey when buying a property. However, it is highly recommended. The legal principle of 'caveat emptor' (buyer beware) applies to property purchases in the UK. If you buy a house and discover the roof needs £15,000 of repairs the next day, you have no recourse against the seller."
        },
        {
            question: "What is the difference between a mortgage valuation and a survey?",
            answer: "A mortgage valuation is for the lender's benefit ONLY. It simply confirms to the bank that the house is worth roughly what they are lending you in case you default and they have to repossess it. It does not look for structural defects, damp, or issues that might affect you as the buyer. You should always get your own independent RICS survey."
        },
        {
            question: "Can I use the survey to renegotiate the house price?",
            answer: "Yes, absolutely. This is one of the main financial benefits of getting a survey. If your Level 2 or Level 3 survey uncovers significant hidden defects (e.g., severe damp, a failing roof, subsidence), you can ask the seller to drop the price by the estimated cost of the repairs, or ask them to fix the issues before exchange of contracts."
        },
        {
            question: "How long does a house survey take to complete?",
            answer: "The physical inspection of the property usually takes between 1 to 4 hours, depending on the size and condition of the house and the level of survey chosen. Receiving the written report typically takes an additional 3 to 10 working days, depending on how busy the surveyor is."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <CalculatorSchema
                title="House Survey Cost Calculator UK"
                description="Estimate RICS survey costs for UK properties including Level 1, Level 2, and Level 3 surveys."
                slug="/house-survey-cost-calculator-uk"
                faqs={faqs}
            />

            {/* Hero */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-semibold mb-6">
                        <Home className="w-4 h-4" />
                        Property & Buying
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        House Survey Cost Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Don't get caught out by hidden defects. Calculate how much you should budget for an independent RICS property survey before buying your next home.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Calculator Component */}
                <div className="max-w-4xl mx-auto">
                    <HouseSurveyCostCalculator />
                </div>

                {/* SEO Content */}
                <section className="mt-20 max-w-4xl mx-auto space-y-12">
                    <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <Search className="w-8 h-8 text-green-500" />
                            A Guide to UK Property Surveys
                        </h2>

                        <div className="space-y-8 text-slate-700 dark:text-slate-300">
                            <p className="text-lg leading-relaxed">
                                Buying a house is usually the biggest financial commitment you will ever make. While it might be tempting to save a few hundred pounds by skipping a survey, purchasing a property "blind" is incredibly risky. A professional Chartered Surveyor (RICS) acts as your expert eyes, identifying hidden horrors that the untrained eye would never spot.
                            </p>

                            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl border border-green-100 dark:border-green-900/40">
                                <h3 className="text-xl font-bold text-green-900 dark:text-green-200 mb-4 flex items-center gap-2">
                                    Why do prices vary so much?
                                </h3>
                                <p className="mb-4 text-sm text-green-800 dark:text-green-300">
                                    Our calculator adjusts the price based on three main factors because surveyors price their risk and time accordingly:
                                </p>
                                <ul className="space-y-2 text-sm text-green-800 dark:text-green-300 font-medium list-disc pl-5">
                                    <li><strong>The Type of Survey:</strong> A Level 3 survey involves the surveyor lifting carpets, checking in the loft, and writing a highly detailed report. It takes hours more than a basic Level 1 walkaround.</li>
                                    <li><strong>Property Value (Liability):</strong> If a surveyor misses a major structural defect on a £2,000,000 mansion, their professional indemnity insurance liability is far higher than on a £150,000 flat. They charge more to cover this increased risk.</li>
                                    <li><strong>Property Age & Size:</strong> Older properties (especially pre-1900) have complex, historical building methods (like lathe and plaster or solid walls) that require specialist knowledge and more time to inspect.</li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">The 3 Levels of RICS Survey</h3>

                                <div className="space-y-6">
                                    <div className="border-l-4 border-green-500 pl-4">
                                        <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">Level 1: Condition Report</h4>
                                        <p className="leading-relaxed text-sm">The most basic and cheapest survey. It provides a simple "traffic light" rating system indicating the condition of different parts of the property. It is only really suitable for conventional, modern properties (built in the last 10-20 years) that appear to be in reasonable condition. It explicitly does not include any advice on repairs or ongoing maintenance.</p>
                                    </div>

                                    <div className="border-l-4 border-green-500 pl-4">
                                        <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">Level 2: Homebuyer Report</h4>
                                        <p className="leading-relaxed text-sm">The absolute standard for most house purchases in the UK. This goes into much more detail than Level 1. The surveyor checks for major issues that would affect the value of the property, such as damp, timber defects (woodworm), and subsidence. It includes recommendations for repairs and ongoing maintenance. Some surveyors can also include a market valuation within a Level 2 report.</p>
                                    </div>

                                    <div className="border-l-4 border-green-500 pl-4">
                                        <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">Level 3: Building Survey (formerly Structural Survey)</h4>
                                        <p className="leading-relaxed text-sm">The most comprehensive, in-depth, and expensive survey. Highly recommended if the property is over 50 years old, has been significantly altered, is noticeably run-down, or if you plan to do major structural renovations. The surveyor will actively search for potential defects, looking under floorboards, entering attics, and testing the walls. You get a detailed breakdown of all structure, fabric, and defects, complete with estimated repair timings.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <FAQAccordion faqs={faqs} title="Property Survey FAQs" />
                </section>
            </div>
        </div>
    );
}
