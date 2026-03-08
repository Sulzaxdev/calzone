import { Layers, Brush, Droplets } from "lucide-react";
import { EpoxyFlooringCostCalculator } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "Epoxy Resin Flooring Cost Calculator UK 2026 | Grinding & Flake Estimates",
    description: "Calculate the cost of installing seamless epoxy resin flooring in the UK. Cover diamond grinding, flake broadcast systems, and UV stable polyaspartic topcoats.",
};

export default function EpoxyFlooringCostPage() {
    const faqs = [
        {
            question: "Why should I pay a professional when I can buy 'Garage Floor Paint' for £50?",
            answer: "Single-part paint from a DIY store is NOT epoxy. It is simply acrylic/latex paint. Within three months of driving a hot car tyre onto it, it will peel off in giant flakes (known as hot-tire pickup). True epoxy is a two-part thermosetting resin that chemically bonds to the pores of the concrete via an exothermic reaction. It is vastly superior, chemically resistant, and can last decades if correctly laid."
        },
        {
            question: "What is the crucial first step of laying an epoxy floor?",
            answer: "Floor preparation is 90% of the job. You cannot paint epoxy over an existing dirty floor. A professional installer will always use an industrial planetary diamond grinder attached to a HEPA vacuum to physically grind off the top 2mm of your concrete slab. This opens up the pores of the concrete so the resin primer can sink in and grip like superglue."
        },
        {
            question: "What happens if my concrete floor is damp?",
            answer: "If your concrete sits directly on bare earth without a damp proof membrane (common in older garages), moisture will rise through the slab as hydrostatic pressure is drawn up by the epoxy. It will literally blow blisters into the solid resin and ruin the floor within weeks. A professional will test for moisture and, if high, first lay down a specialist Liquid Liquid Damp Proof Membrane (Liquid DPM) primer."
        },
        {
            question: "Why does epoxy 'yellow' over time?",
            answer: "Standard epoxy resin has very poor UV resistance. If sunlight repeatedly hits the floor (such as through a window or open garage door), the ambering process begins, eventually turning clear epoxy into a murky yellow. To prevent this, the final topcoat should never be epoxy; it should be a UV-stable Polyurethane (PU) or Polyaspartic clear coat."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <CalculatorSchema
                title="Epoxy Resin Flooring Cost Calculator UK"
                description="Estimate the professional installation cost of an industrial-grade epoxy garage floor, complete with diamond grinding and flake broadcast finishes."
                slug="/epoxy-flooring-cost-calculator-uk"
                faqs={faqs}
            />

            {/* Hero */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-semibold mb-6">
                        <Layers className="w-4 h-4" />
                        Interior Finishes
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Epoxy Flooring Cost Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        A realistic breakdown of the true costs of a flawless resin floor, from heavy diamond-grinding machinery to multi-coat specialist chemistry.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Calculator Component */}
                <div className="max-w-4xl mx-auto">
                    <EpoxyFlooringCostCalculator />
                </div>

                {/* SEO Content */}
                <section className="mt-20 max-w-4xl mx-auto space-y-12">
                    <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <Layers className="w-8 h-8 text-purple-500" />
                            A Masterclass in Resin Flooring
                        </h2>

                        <div className="space-y-8 text-slate-700 dark:text-slate-300">
                            <p className="text-lg leading-relaxed">
                                Seamless resin flooring transforms a dingy, dusty concrete slab into a brilliant, easily washable, showroom-quality surface. While incredibly popular for high-end residential garages, the process is far closer to chemistry than painting, making it a highly skilled specialist trade.
                            </p>

                            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-2xl border border-purple-100 dark:border-purple-900/40">
                                <h3 className="text-xl font-bold text-purple-900 dark:text-purple-200 mb-4 flex items-center gap-2">
                                    Why is Resin Flooring So Expensive?
                                </h3>
                                <p className="mb-4 text-sm text-purple-800 dark:text-purple-300">
                                    Homeowners often balk when quoted £1,800 to "paint" their garage floor, because they misunderstand what the contractors are actually doing. A proper resin floor is built in thick, chemical layers over several days.
                                </p>
                                <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-300 font-medium list-disc pl-5">
                                    <li><strong>The Grinding:</strong> Contractors bring heavy £5,000 diamond grinders to strip the top profile off the concrete. This creates extreme amounts of dust and requires expensive HEPA vacuums.</li>
                                    <li><strong>The Chemistry:</strong> The material itself is not cheap. High-solids epoxy is expensive, formulated with hardeners that begin curing rapidly. A contractor has only a 30-minute 'pot life' to pour and back-roll the resin before it hardens in the bucket and is ruined permanently.</li>
                                    <li><strong>Multi-Day Curing:</strong> A coat must generally cure slightly overnight before the next coat can be applied. A high-end flake system requires a primer day, a basecoat/flake broadcast day, and a final polyaspartic clear coat day. You are paying a team to come back to your house 3 days in a row.</li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">The 3 Tiers of Epoxy</h3>

                                <div className="space-y-6">
                                    <div className="border border-slate-200 dark:border-slate-800 p-5 rounded-2xl">
                                        <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">1. Solid Colour Trade Epoxy (Cheapest)</h4>
                                        <p className="leading-relaxed text-sm">A highly durable, opaque finish (typically grey or light blue). Used universally in warehousing and light industry. While it looks clean, it highlights every tiny imperfection (like a speck of dust that falls while curing) and every shoe print immediately.</p>
                                    </div>

                                    <div className="border border-slate-200 dark:border-slate-800 p-5 rounded-2xl">
                                        <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">2. Flake Broadcast System (Best for Garages)</h4>
                                        <p className="leading-relaxed text-sm">The installer rolls out a wet epoxy base coat, and then literally throws handfuls of polyvinyl-acetate coloured flakes into the air until the floor is completely blanketed like snow (to 'rejection'). Once cured, they scrape the loose flakes off and seal it with a clear topcoat. The flake pattern hides dirt, masks minor unevenness in the concrete, and provides slight anti-slip texture.</p>
                                    </div>

                                    <div className="border border-slate-200 dark:border-slate-800 p-5 rounded-2xl">
                                        <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">3. Metallic Designer Epoxy (Most Expensive)</h4>
                                        <p className="leading-relaxed text-sm">Artisan-level work. Deep pools of clear resin mixed with highly reflective metallic mica pigments are poured onto the floor. The installer uses blowtorches and squeegees to swirl the colours together, creating a look resembling 3-dimensional flowing liquid marble. Utterly stunning, but highly complex to execute.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <FAQAccordion faqs={faqs} title="Resin Flooring FAQs" />
                </section>
            </div>
        </div>
    );
}
