import { Bath, Droplets, Hammer } from "lucide-react";
import { SmallBathroomRenovationCostCalculator } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "Small Bathroom Renovation Cost Calculator UK 2026",
    description: "Calculate the total cost of refitting a small UK bathroom. Estimate prices for tiling, plumbing labour, suites, and waste removal based on 2026 trade rates.",
};

export default function SmallBathroomRenovationCostPage() {
    const faqs = [
        {
            question: "How much does a plumber charge per day in the UK?",
            answer: "In 2026, a qualified independent plumber or bathroom fitter typically charges between £220 and £300 per day outside of London. In London and the South East, expect day rates to exceed £350. A full bathroom refit generally takes one fitter about 5 to 7 days."
        },
        {
            question: "Is it cheaper to fully tile or half-tile a bathroom?",
            answer: "Half-tiling (often called 'wet area only' tiling) is significantly cheaper. You only tile around the bath/shower enclosure and behind the basin. The rest of the walls are simply skimmed and painted with moisture-resistant bathroom paint. This halves your tile material costs and drastically cuts the tiler's labour time."
        },
        {
            question: "Why does moving the toilet cost extra?",
            answer: "Moving a toilet or shower layout requires rerouting the 'soil pipe' (the large waste pipe). In most UK houses, this involves ripping up floorboards, cutting joists, and drilling new large holes through external brickwork. This adds days of labour compared to simply swapping old suites for new ones in the exact same positions."
        },
        {
            question: "Do I need planning permission for a new bathroom?",
            answer: "No, replacing a bathroom or installing a new en-suite in an existing room is considered Permitted Development and does not require planning permission. However, if you are messing with drainage or adding new ventilation, you may require Building Regulations sign-off, though most qualified fitters can self-certify this work."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <CalculatorSchema
                title="Small Bathroom Renovation Cost Calculator UK"
                description="Estimate the fully fitted cost of a new small bathroom or en-suite in the UK, including tradesmen labour and suite quality."
                slug="/small-bathroom-renovation-cost-calculator-uk"
                faqs={faqs}
            />

            {/* Hero */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 text-sm font-semibold mb-6">
                        <Hammer className="w-4 h-4" />
                        Home Improvements
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Small Bathroom Cost Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        A realistic estimator for stripping out and refitting a standard small UK bathroom or en-suite. Budget accurately for materials, plumbing, and tiling.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Calculator Component */}
                <div className="max-w-4xl mx-auto">
                    <SmallBathroomRenovationCostCalculator />
                </div>

                {/* SEO Content */}
                <section className="mt-20 max-w-4xl mx-auto space-y-12">
                    <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <Bath className="w-8 h-8 text-cyan-500" />
                            Guide to Bathroom Renovation Costs
                        </h2>

                        <div className="space-y-8 text-slate-700 dark:text-slate-300">
                            <p className="text-lg leading-relaxed">
                                UK bathrooms are notoriously small. The standard footprint of an upstairs family bathroom in a typical semi-detached house is roughly 2m by 2m (4 square metres). Despite their size, refitting a bathroom is technically complex because it requires three separate trades: a plumber, an electrician, and a plasterer/tiler working in a very confined space.
                            </p>

                            <div className="bg-cyan-50 dark:bg-cyan-900/20 p-6 rounded-2xl border border-cyan-100 dark:border-cyan-900/40">
                                <h3 className="text-xl font-bold text-cyan-900 dark:text-cyan-200 mb-4 flex items-center gap-2">
                                    <Droplets className="w-6 h-6 text-cyan-500" /> The Shocking Reality of "Cheap" Suites
                                </h3>
                                <p className="mb-4 text-sm text-cyan-800 dark:text-cyan-300">
                                    You can often see complete bathroom suites (Toilet, Basin, Bath) advertised in DIY stores for £300. This leads homeowners to vastly underestimate the cost of a refit.
                                </p>
                                <p className="text-sm text-cyan-800 dark:text-cyan-300 font-medium">
                                    In reality, the 'Suite' makes up less than 20% of your total bill. The true costs lie in:
                                    <br /><br />
                                    • <strong>Labour:</strong> Removing the old heavy iron bath, dragging it downstairs, and spending 6 days putting the new room together.<br />
                                    • <strong>Sub-materials:</strong> Copper pipes, plastic waste pipes, sealants, plasterboard, cement board, tile adhesive, and grout (which can easily cost £400+ alone).<br />
                                    • <strong>Waste Disposal:</strong> Hiring an 8-yard skip for the old plaster and tiles (£250-£350).
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Tips to Reduce the Cost</h3>

                                <div className="space-y-6">
                                    <div className="border border-slate-200 dark:border-slate-800 p-5 rounded-2xl">
                                        <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">1. Don't move the plumbing</h4>
                                        <p className="leading-relaxed text-sm">Keep the toilet, shower, and sink precisely where they are. Swapping like-for-like means the fitter can utilise the existing water feeds and waste pipes without ripping up the floorboards. Moving a toilet even one metre across a room could add two days of labour to your bill.</p>
                                    </div>

                                    <div className="border border-slate-200 dark:border-slate-800 p-5 rounded-2xl">
                                        <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">2. Strip it out yourself</h4>
                                        <p className="leading-relaxed text-sm">Bathroom fitters charge £250 a day. Ripping off old tiles, unscrewing old cabinets, and carrying the rubbish outside into a skip takes about one to two days. If you are physically able to do this demolition work yourself over a weekend before the plumber arrives, you instantly save hundreds of pounds in labour.</p>
                                    </div>

                                    <div className="border border-slate-200 dark:border-slate-800 p-5 rounded-2xl">
                                        <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">3. Use shower panels instead of tiles</h4>
                                        <p className="leading-relaxed text-sm">Tiles are cheap to buy but incredibly expensive and time-consuming to install. Using modern PVC shower wall panels instead of tiles inside a shower enclosure drastically reduces fitting time, completely eliminates grout mould, and is highly cost-effective.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <FAQAccordion faqs={faqs} title="Bathroom Renovation FAQs" />
                </section>
            </div>
        </div>
    );
}
