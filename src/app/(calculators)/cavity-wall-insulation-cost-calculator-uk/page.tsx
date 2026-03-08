import { ThermometerSnowflake, Zap, Home, ShieldCheck, Leaf } from "lucide-react";
import { CavityWallInsulationCalculator } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "Cavity Wall Insulation Cost Calculator UK 2026 | Energy Savings",
    description: "Estimate the cost of cavity wall insulation for your UK home. Calculate potential energy bill savings, payback periods, and install costs for beads vs wool.",
};

export default function CavityWallInsulationPage() {
    const faqs = [
        {
            question: "How much can I save with cavity wall insulation in 2026?",
            answer: "According to the Energy Saving Trust, a detached house can save around £450 - £480 per year on heating bills. A semi-detached house typically saves about £260 per year. With energy prices remaining high, the 'payback period' where the insulation pays for itself is often less than 5 years."
        },
        {
            question: "What is the best material for cavity wall insulation?",
            answer: "EPS Beads (Expanded Polystyrene) are widely considered the best modern choice. They offer excellent thermal performance and allow the cavity to 'breathe', reducing risk of damp. Mineral wool is a cheaper, traditional alternative, while injected foam is used for specialized cases or where extra structural stability or air sealing is needed."
        },
        {
            question: "Is my house suitable for cavity wall insulation?",
            answer: "Generally, homes built between 1920 and 1990 have cavity walls. If your house was built before 1920, it likely has solid walls. You can check by looking at the brick pattern: if all bricks are laid lengthways (stretchers), it's likely a cavity wall. If you see the ends of bricks (headers), it's likely solid."
        },
        {
            question: "Does cavity wall insulation cause damp?",
            answer: "If installed correctly in a suitable wall, it should not cause damp. However, if the cavity is already bridged by debris (mortar snots) or if the property is in a high-exposure area for driving rain, insulation can sometimes transfer moisture to the inner wall. A professional pre-install survey is essential."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <CalculatorSchema
                title="Cavity Wall Insulation Cost Calculator UK"
                description="Estimate the cost of cavity wall insulation for your UK property. Calculate installation fees and annual energy savings."
                slug="/cavity-wall-insulation-cost-calculator-uk"
                faqs={faqs}
            />

            {/* Hero Section */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-6">
                        <Leaf className="w-4 h-4" />
                        Eco-Efficiency
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Cavity Wall Insulation Cost Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        One of the most cost-effective ways to improve your home's energy rating. Calculate the install cost and see how much you could save on your annual bills.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                <div className="max-w-4xl mx-auto">
                    <CavityWallInsulationCalculator />
                </div>

                {/* Information Sections */}
                <div className="mt-20 max-w-4xl mx-auto space-y-16">
                    <section className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-sm">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 border-b border-slate-100 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <ShieldCheck className="w-8 h-8 text-emerald-500" />
                            Benefits of Cavity Wall Insulation
                        </h2>

                        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                About <strong>35% of heat loss</strong> in an uninsulated home occurs through the walls. Cavity wall insulation acts as a thermal blanket, significantly reducing the amount of energy required to keep your home warm in winter and cool in summer.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                                        <Zap className="w-5 h-5" />
                                        Rapid ROI
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Unlike solar panels or heat pumps which take 10-15 years to pay back, cavity wall insulation often pays for itself in <strong>3 to 5 years</strong> through energy savings alone, making it a top priority for home improvement.
                                    </p>
                                </div>
                                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                                        <Home className="w-5 h-5" />
                                        Home Comfort
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Insulation doesn't just save money; it stops 'cold spots' and drafts. Warm walls mean you can keep your thermostat lower while feeling just as comfortable as you did previously at a higher setting.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-8 rounded-3xl border border-emerald-100 dark:border-emerald-800/50">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 italic flex items-center gap-2">
                                    <Leaf className="w-6 h-6" /> Eco-Tip
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Check if you are eligible for the <strong>Great British Insulation Scheme (GBIS)</strong> or <strong>ECO4</strong> grants. Many low-income households or those in lower council tax bands with low EPC ratings can get cavity wall insulation <strong>completely free</strong> or heavily subsidized.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Installation Process</h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    The process is non-intrusive and usually takes less than half a day.
                                </p>
                                <ol className="list-decimal pl-6 space-y-2 text-slate-600 dark:text-slate-400">
                                    <li><strong>Survey:</strong> An installer drills a small hole to check the cavity with a borescope.</li>
                                    <li><strong>Drilling:</strong> A series of small holes (approx 22mm) are drilled in the external mortar according to a set pattern.</li>
                                    <li><strong>Injection:</strong> The insulation material is blown into the cavity under pressure.</li>
                                    <li><strong>Filling:</strong> The holes are filled with mortar that matches your existing wall.</li>
                                </ol>
                            </div>
                        </div>
                    </section>

                    <FAQAccordion faqs={faqs} title="Insulation & Savings FAQs" />
                </div>
            </div>
        </div>
    );
}
