import { Trees, Ruler, Hammer, Layers } from "lucide-react";
import { DeckingCostCalculator } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { RelatedTools } from "@/components/layout/related-tools";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Decking Cost Calculator UK 2026 | Composite vs Softwood Prices",
    description: "Calculate how much it costs to build garden decking in the UK. Compare the prices of softwood pine, hardwood, and composite boards including carpenter labour.",
    alternates: {
        canonical: "/decking-cost-calculator-uk"
    }
};

export default function DeckingCostPage() {
    const faqs = [
        {
            question: "Is composite decking worth the extra money?",
            answer: "In the UK's wet climate, composite decking is almost universally considered worth the premium. While softwood pine is 50% cheaper to purchase, it absorbs water, warps, splinters, and rots within 10 years. Worse, pine decking requires scrubbing and oiling every single spring (which costs £50 in oil and a weekend of your time). Composite decking never rots and requires zero maintenance beyond occasionally hosing it down."
        },
        {
            question: "How long does it take a professional to build a deck?",
            answer: "For a standard 15m² ground-level deck, a competent carpenter/fitter will take 2 days (One day to build the heavy timber subframe to ensure it is level, and one day fixing the top boards down). If the deck is elevated on steep ground, the timeframe drastically increases because deep post holes must be dug and filled with concrete first."
        },
        {
            question: "Do I need planning permission for decking?",
            answer: "Usually, no. In the UK, putting up decking falls under Permitted Development provided that: The decking is no more than 30cm above the ground, and together with other extensions/outbuildings, it does not cover more than 50% of the garden area."
        },
        {
            question: "What is decking grooved side up vs flat side up?",
            answer: "It is a massive misconception in the UK that the grooved side of timber decking faces upwards for 'grip'. The grooves are actually designed to face *downwards* to allow airflow between the board and the joist to prevent wet rot. Flat side up is the correct, architecturally intended way to lay timber decking. It is entirely personal preference, but laying grooves up traps dirt and algae, making them incredibly slippery in winter."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <BreadcrumbSchema items={[
                { name: "Home", item: "/" },
                { name: "Home & Property", item: "/home-property" },
                { name: "Decking Cost Calculator", item: "/decking-cost-calculator-uk" }
            ]} />
            <CalculatorSchema
                title="Garden Decking Cost Calculator UK"
                description="Easily estimate how much a carpenter will charge to build a timber or composite decking structure in your UK garden."
                slug="/decking-cost-calculator-uk"
                faqs={faqs}
            />

            {/* Hero */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-semibold mb-6">
                        <Trees className="w-4 h-4" />
                        Landscaping
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Decking Cost Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        A realistic breakdown of timber costs, composite upgrades, and carpenter day rates to help you budget accurately for your new garden deck.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Calculator Component */}
                <div className="max-w-4xl mx-auto">
                    <DeckingCostCalculator />
                </div>

                {/* SEO Content */}
                <section className="mt-20 max-w-4xl mx-auto space-y-12">
                    <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <Layers className="w-8 h-8 text-green-500" />
                            A Guide to Garden Decking
                        </h2>

                        <div className="space-y-8 text-slate-700 dark:text-slate-300">
                            <p className="text-lg leading-relaxed">
                                Decking is one of the most popular ways to create a level, usable seating area in a sloping or uneven UK garden. It is generally faster to build than a stone patio (which requires immense groundworks and wet mortar) and creates a softer, warmer aesthetic that bridges the gap between the house and the lawn.
                            </p>

                            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl border border-green-100 dark:border-green-900/40">
                                <h3 className="text-xl font-bold text-green-900 dark:text-green-200 mb-4 flex items-center gap-2">
                                    The Hidden Cost: The Subframe
                                </h3>
                                <p className="mb-4 text-sm text-green-800 dark:text-green-300">
                                    Many homeowners look at the price of decking boards in B&Q (e.g., £20 a square metre) and assume an area of 10 square metres will cost £200. This ignores the most important and expensive part of the deck: the structure underneath.
                                </p>
                                <p className="text-sm text-green-800 dark:text-green-300 font-medium">
                                    The boards you stand on are purely cosmetic. You are actually paying a carpenter to build a highly robust scaffolding of thick treated timber joists that floats exactly level above the dirt. This subframe requires structural screws, joist hangers, concrete pads, and heavy 6x2 inch lumber. Often, the frame costs just as much as the top boards.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Comparing Materials</h3>

                                <div className="space-y-6">
                                    <div className="border border-slate-200 dark:border-slate-800 p-5 rounded-2xl">
                                        <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">Softwood (Treated Pine)</h4>
                                        <p className="leading-relaxed text-sm">The default option for 80% of UK gardens. The timber is pressure treated with preservatives (giving it a slight green tint initially) to prevent immediate rot. <br /><br /><strong>Pros:</strong> Very cheap, easy for the builder to cut, offers a natural look. <br /><strong>Cons:</strong> High maintenance. If you don't scrub and paint it with decking oil every year, the British winter will turn it slippery, grey, and eventually rotten within 10 years.</p>
                                    </div>

                                    <div className="border border-slate-200 dark:border-slate-800 p-5 rounded-2xl">
                                        <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">Hardwood (Oak, Balau, Teak)</h4>
                                        <p className="leading-relaxed text-sm">Sourced from slow-growing trees. <br /><br /><strong>Pros:</strong> Absolutely beautiful tight grain, incredibly strong, naturally resists rot much better than pine. <br /><strong>Cons:</strong> Extremely expensive. The wood is so hard that the carpenter must pre-drill every single screw hole, adding significant labour time to your bill.</p>
                                    </div>

                                    <div className="border border-slate-200 dark:border-slate-800 p-5 rounded-2xl">
                                        <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">Composite Decking</h4>
                                        <p className="leading-relaxed text-sm">Made from a baked mixture of recycled wood fibres and plastic polymers. <br /><br /><strong>Pros:</strong> The holy grail of low maintenance. It never rots, never splinters, and never needs painting. It just stays looking perfect year after year. <br /><strong>Cons:</strong> The most expensive upfront option (though it pays for itself by saving you 15 years of buying wood oil). Can get quite hot on bare feet in direct mid-summer sun.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <FAQAccordion faqs={faqs} title="Decking Details FAQs" />
                </section>
            </div>
            <RelatedTools currentCategory="Home & Property" currentSlug="/decking-cost-calculator-uk" />
        </div>
    );
}
