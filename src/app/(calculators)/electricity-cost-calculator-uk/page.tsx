import { Lightbulb, Zap, Plug } from "lucide-react";
import { ElectricityCostCalculator } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "Electricity Cost Calculator UK | Appliance Running Costs",
    description: "Calculate exactly how much it costs to run any electrical appliance in your home based on the current UK energy price cap.",
};

export default function ElectricityCostPage() {
    const faqs = [
        {
            question: "What is a 'kWh' (Kilowatt-hour)?",
            answer: "A Kilowatt-hour (kWh) is the universal unit your energy supplier uses to bill you. It simply means running a 1,000 Watt (1kW) appliance constantly for 1 hour. So if you run a 2,000W electric heater for one hour, you have used 2 kWh."
        },
        {
            question: "Why do kettles cost so much to run?",
            answer: "Kettles are incredibly powerful (usually drawing 2,000 to 3,000 Watts) so they can boil water quickly. However, because they only run for 2-3 minutes at a time, their actual cost per use is only a few pence. It's high power, but extreme low time."
        },
        {
            question: "Which household appliances use the most electricity?",
            answer: "Things that generate heat use massive amounts of power. Tumble dryers, electric fan heaters, immersion water heaters, and electric ovens are the biggest culprits on your bill. In contrast, running a TV or a laptop uses incredibly little electricity."
        },
        {
            question: "How do I find out how many Watts my appliance uses?",
            answer: "Look for a small silver or black sticker on the back or bottom of the appliance (or etched into the plastic plug). By law, it must state the maximum power draw in Watts (W) or Kilowatts (kW)."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <CalculatorSchema
                title="Electricity Cost Calculator UK"
                description="Find exactly how much each appliance contributes to your monthly energy bill."
                slug="/electricity-cost-calculator-uk"
                faqs={faqs}
            />

            {/* Hero */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-sm font-semibold mb-6">
                        <Lightbulb className="w-4 h-4" />
                        Home Finance & Energy
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Appliance Electricity Cost Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Track down the energy vampires in your home. Enter the wattage of any appliance to see exactly how much it adds to your monthly electricity bill.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Calculator Component */}
                <div className="max-w-4xl mx-auto">
                    <ElectricityCostCalculator />
                </div>

                {/* SEO Content */}
                <section className="mt-20 max-w-4xl mx-auto space-y-12">
                    <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <Zap className="w-8 h-8 text-yellow-500" />
                            Beating the UK Energy Price Cap
                        </h2>

                        <div className="space-y-8 text-slate-700 dark:text-slate-300">
                            <p className="text-lg leading-relaxed">
                                UK electricity prices have surged over the past few years. Understanding exactly where your electricity is going is the fastest way to slash your direct debit and keep more money in your bank account every month.
                            </p>

                            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-2xl border border-yellow-100 dark:border-yellow-900/40">
                                <h3 className="text-xl font-bold text-yellow-900 dark:text-yellow-200 mb-4 flex items-center gap-2">
                                    <Plug className="w-6 h-6 text-yellow-500" /> The "Heating" Rule of Thumb
                                </h3>
                                <p className="mb-4 text-sm text-yellow-800 dark:text-yellow-300">
                                    If an appliance exists to generate heat, it is incredibly expensive to run. Generating heat electrically requires massive amounts of power.
                                </p>
                                <p className="text-sm text-yellow-800 dark:text-yellow-300">
                                    Running a classic 2,000W electric fan heater for just 4 hours a day will add <strong>nearly £60 a month</strong> to your electricity bill. By comparison, leaving a modern big-screen TV on for exactly the same amount of time costs less than £4 a month.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">The Worst Offenders In Your Home</h3>
                                <div className="space-y-4">
                                    <div className="border border-slate-200 dark:border-slate-800 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                                        <h4 className="font-bold flex justify-between items-center mb-1 text-red-600 dark:text-red-400">
                                            1. Tumble Dryers
                                        </h4>
                                        <p className="text-sm">They draw up to 2,500W constantly for hours at a time. A single load of drying can cost nearly £1. An air-dryer rack costs £0.</p>
                                    </div>
                                    <div className="border border-slate-200 dark:border-slate-800 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                                        <h4 className="font-bold flex justify-between items-center mb-1 text-orange-600 dark:text-orange-400">
                                            2. Immersion Heaters
                                        </h4>
                                        <p className="text-sm">These draw a massive 3,000W to heat your hot water tank. Leaving this switched on 24/7 (rather than timing it) is the #1 cause of £300+ monthly winter bills.</p>
                                    </div>
                                    <div className="border border-slate-200 dark:border-slate-800 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                                        <h4 className="font-bold flex justify-between items-center mb-1 text-yellow-600 dark:text-yellow-500">
                                            3. Old Fridge Freezers
                                        </h4>
                                        <p className="text-sm">They don't draw much power (usually ~300W), but because they run 24 hours a day, 365 days a year, an inefficient 15-year-old fridge can stealthily add £100+ to your annual bill.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <FAQAccordion faqs={faqs} title="Electricity & Appliance FAQs" />
                </section>
            </div>
        </div>
    );
}
