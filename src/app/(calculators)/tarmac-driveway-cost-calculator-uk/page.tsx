import { Truck, Route, AlertCircle } from "lucide-react";
import { TarmacDrivewayCostCalculator } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "Tarmac Driveway Cost Calculator UK 2026 | Price Estimator",
    description: "Estimate the cost of a new tarmac driveway in the UK. Includes excavation, sub-base prep, materials, and labour based on 2026 trade prices.",
};

export default function TarmacDrivewayCostPage() {
    const faqs = [
        {
            question: "How much does a tarmac driveway cost per square metre?",
            answer: "In 2026, a brand new tarmac driveway (excavating grass/soil, adding a type-1 sub-base, and laying the tarmac) costs roughly £100 to £130 per square metre including VAT. If you are just 'overlaying' existing flawless tarmac, it can cost as little as £60 per square metre."
        },
        {
            question: "What is an 'overlay' in tarmacing?",
            answer: "An overlay is when contractors simply pour and roll a new thin layer of tarmac directly over an existing tarmac driveway. This is significantly cheaper because there is no digging or skipping of waste required. However, it can ONLY be done if the current driveway has zero structural damage or sinking."
        },
        {
            question: "Do I need planning permission for a tarmac driveway?",
            answer: "Since 2008, laws regarding front gardens and driveways changed to prevent flooding. If your new driveway is over 5 square metres and made of an impermeable material (like standard tarmac), you MUST have planning permission OR ensure the water drains into a lawn/border to soak naturally, rather than running into the street drains. Some contractors offer permeable tarmac to bypass this."
        },
        {
            question: "How long does a tarmac driveway last?",
            answer: "If laid professionally with a proper 150mm MOT Type 1 sub-base, a tarmac driveway should easily last between 15 and 20 years. Tarmac is incredibly resilient to weather but can soften slightly in extreme heat."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <CalculatorSchema
                title="Tarmac Driveway Cost Calculator UK"
                description="Get an accurate estimate for installing a tarmac or asphalt driveway."
                slug="/tarmac-driveway-cost-calculator-uk"
                faqs={faqs}
            />

            {/* Hero */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-300 text-sm font-semibold mb-6">
                        <Truck className="w-4 h-4" />
                        Home & Garden Property
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Tarmac Driveway Cost Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Tarmac (asphalt) is still one of the most cost-effective, durable ways to park your cars. Use our estimator to find out the real cost of paving your front garden.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Calculator Component */}
                <div className="max-w-4xl mx-auto">
                    <TarmacDrivewayCostCalculator />
                </div>

                {/* SEO Content */}
                <section className="mt-20 max-w-4xl mx-auto space-y-12">
                    <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <Route className="w-8 h-8 text-zinc-600" />
                            Guide to Buying a Tarmac Driveway
                        </h2>

                        <div className="space-y-8 text-slate-700 dark:text-slate-300">
                            <p className="text-lg leading-relaxed">
                                Tarmac provides an incredibly smooth, durable, and weather-resistant surface for parking. When compared to block paving or resin, it remains the undisputed champion of value for money. However, a common misconception is that the tarmac itself is the expensive part.
                            </p>

                            <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                                    <AlertCircle className="w-6 h-6 text-zinc-600" /> The Secret Cost: The Sub-Base
                                </h3>
                                <p className="mb-4 text-sm">
                                    A tarmac driveway is only as good as what lies beneath it. The biggest cost of a new driveway is almost never the hot black stuff poured on top—it is the brutal physical labour and plant hire required to dig out tons of earth.
                                </p>
                                <p className="text-sm">
                                    If you are converting a front lawn into a driveway, a contractor must bring in a mini digger, excavate down at least 150-200mm, hire multiple skips to dispose of the soil, lay a weed membrane, and then import and compact tons of crushed stone (MOT Type 1). Only after all this does the tarmac arrive. This is why "grass to drive" conversions cost significantly more than breaking up old, failing concrete.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Types of Tarmac/Asphalt</h3>
                                <div className="space-y-4">
                                    <div className="border border-slate-200 dark:border-slate-800 p-4 rounded-xl">
                                        <h4 className="font-bold flex justify-between items-center mb-1 text-slate-900 dark:text-slate-100">
                                            Standard Black Macadam
                                        </h4>
                                        <p className="text-sm">The standard product used for decades. It usually consists of a heavier structural "base course", followed by a finer, smoother "wearing course" on top.</p>
                                    </div>
                                    <div className="border border-slate-200 dark:border-slate-800 p-4 rounded-xl">
                                        <h4 className="font-bold flex justify-between items-center mb-1 text-slate-900 dark:text-slate-100">
                                            SMA (Stone Mastic Asphalt)
                                        </h4>
                                        <p className="text-sm">A more modern, premium variation. It has a higher concentration of coarse aggregates and binders, making it less prone to scuffing and wheel-rutting from heavy modern SUVs. Highly recommended.</p>
                                    </div>
                                    <div className="border border-slate-200 dark:border-slate-800 p-4 rounded-xl">
                                        <h4 className="font-bold flex justify-between items-center mb-1 text-red-600 dark:text-red-400">
                                            Red Tarmac
                                        </h4>
                                        <p className="text-sm">Mechanically identical, but red pigment is added during the heating process at the plant. Unsurprisingly, this custom pigmentation significantly increases the cost of the material.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <FAQAccordion faqs={faqs} title="Driveway & Paving FAQs" />
                </section>
            </div>
        </div>
    );
}
