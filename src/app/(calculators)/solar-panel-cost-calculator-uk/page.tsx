import { Sun, Battery, Wallet } from "lucide-react";
import { SolarPanelCostCalculator } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "Solar Panel Cost Calculator UK 2026 | PV & Battery Estimates",
    description: "Calculate the exact cost of installing solar panels and battery storage in the UK. Discover how much you can save on energy bills with 0% VAT.",
};

export default function SolarPanelCostPage() {
    const faqs = [
        {
            question: "Do I pay VAT on solar panels in the UK?",
            answer: "No. The UK Government introduced a 0% VAT rate on Energy Saving Materials (ESMs) in 2022. This applies to solar panels, battery storage, and heat pumps. This zero-rate is confirmed to remain in place until at least March 2027, saving homeowners thousands compared to the old 20% rate."
        },
        {
            question: "Is it worth getting a battery with my solar panels?",
            answer: "In almost all modern cases, yes. Historically, the 'Smart Export Guarantee' (SEG) paid you to send excess energy back to the grid. However, energy companies now charge you ~28p to buy electricity but only pay you ~5p-15p when you export it back. Because of this massive disparity, it makes far more financial sense to store your daytime solar energy in a battery and consume it yourself at night, avoiding the 28p tariff entirely."
        },
        {
            question: "How long is the payback period for solar panels?",
            answer: "With the current high cost of electricity in the UK, the payback period for a standard 4kW system with a 5kWh battery is typically between 7 and 10 years depending on your consumption habits. Given that solar panels last 25+ years, they offer a very strong Return on Investment (ROI)."
        },
        {
            question: "Do I need planning permission for solar panels in the UK?",
            answer: "Usually, no. Unless you live in a Listed Building or a Conservation area, solar panels placed on your roof fall under 'Permitted Development' and can be installed immediately. You do, however, need to notify the DNO (Distribution Network Operator) if your inverter is larger than 3.68kW."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <CalculatorSchema
                title="Solar Panel Cost Calculator UK"
                description="Estimate the cost of a full Solar PV system including panels, hybrid inverters, battery storage, scaffolding, and labour."
                slug="/solar-panel-cost-calculator-uk"
                faqs={faqs}
            />

            {/* Hero */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-sm font-semibold mb-6">
                        <Sun className="w-4 h-4" />
                        Energy Renewables
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Solar Panel Cost Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Find out how much it costs to switch your home to solar energy in 2026. Calculate the price of panels, batteries, and see your estimated annual savings.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Calculator Component */}
                <div className="max-w-4xl mx-auto">
                    <SolarPanelCostCalculator />
                </div>

                {/* SEO Content */}
                <section className="mt-20 max-w-4xl mx-auto space-y-12">
                    <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <Wallet className="w-8 h-8 text-amber-500" />
                            Guide to Buying Solar Panels in the UK
                        </h2>

                        <div className="space-y-8 text-slate-700 dark:text-slate-300">
                            <p className="text-lg leading-relaxed">
                                Since the global energy crisis drastically raised the Ofgem price cap, hundreds of thousands of UK homeowners have turned to Solar PV as a way to insulate themselves against erratic electricity bills. Furthermore, the 0% VAT initiative introduced by the government means there has never been a cheaper time to buy the hardware.
                            </p>

                            <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-2xl border border-amber-100 dark:border-amber-900/40">
                                <h3 className="text-xl font-bold text-amber-900 dark:text-amber-200 mb-4 flex items-center gap-2">
                                    <Battery className="w-6 h-6 text-amber-500" /> Why Battery Storage is NOW Essential
                                </h3>
                                <p className="mb-4 text-sm text-amber-800 dark:text-amber-300">
                                    Five years ago, people bought solar panels without batteries because you could sell energy back to the grid for a high price. That is no longer true.
                                </p>
                                <p className="text-sm text-amber-800 dark:text-amber-300">
                                    Today, maximum savings are achieved through 'Load Shifting'. The panels generate electricity while you are at work. If you have no battery, that energy goes to the grid and you get paid pennies. When you come home and turn the TV on, you have to buy the energy *back* from the grid at 28p/kWh. A battery acts like a sponge, absorbing your free daylight electricity so you can slowly discharge it during the dark evening, meaning your house technically stays entirely 'off the grid'.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">How Many Panels Do You Need?</h3>

                                <div className="space-y-6">
                                    <div className="border border-slate-200 dark:border-slate-800 p-5 rounded-2xl">
                                        <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">3 kW System (~8 modern panels)</h4>
                                        <p className="leading-relaxed text-sm">Perfect for smaller terraces, bungalows, or households of 1-2 people who have relatively low electricity demands and limited unshaded roof space. Usually paired with a smaller 3-5kWh battery to cover the overnight baseload (fridge, router, tv).</p>
                                    </div>

                                    <div className="border border-slate-200 dark:border-slate-800 p-5 rounded-2xl">
                                        <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">4 kW System (~10 modern panels)</h4>
                                        <p className="leading-relaxed text-sm">Historically, the most common residential installation. This fits perfectly across the rear elevation of a standard UK 3-bedroom semi-detached house. Will generate roughly 3,500 kWh of energy per year, heavily offsetting the average UK household consumption.</p>
                                    </div>

                                    <div className="border border-slate-200 dark:border-slate-800 p-5 rounded-2xl">
                                        <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">6 kW+ System (~15+ modern panels)</h4>
                                        <p className="leading-relaxed text-sm">These highly powerful systems are becoming extremely popular for homeowners future-proofing their properties. If you intend to run an Electric Vehicle (EV) charger or a Heat Pump in the near future, your electricity demand will triple. Putting as many panels on the roof as possible now is far cheaper than upgrading a 4kW system later.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <FAQAccordion faqs={faqs} title="Renewable Energy FAQs" />
                </section>
            </div>
        </div>
    );
}
