import { Activity, Zap, Fuel, BatteryCharging } from "lucide-react";
import { PetrolVsElectricCalculator } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "Petrol vs Electric Car Running Cost Calculator | EV vs ICE UK",
    description: "Compare the real-world fuel and charging costs of petrol, diesel, and electric cars to see if going electric will actually save you money.",
};

export default function PetrolVsElectricPage() {
    const faqs = [
        {
            question: "Is it cheaper to charge an EV than buy petrol?",
            answer: "It depends heavily on where you charge it. If you charge at home on a standard electricity tariff, an EV costs about 7p per mile (equivalent to an 85 MPG petrol car). If you use a special overnight EV tariff, it drops to ~2p per mile (unbeatable). However, if you rely entirely on ultra-rapid public motorway chargers, an EV can be significantly more expensive to run per mile than a standard diesel."
        },
        {
            question: "What is an EV tariff?",
            answer: "Energy suppliers like Octopus and OVO offer specific tariffs for EV owners. These tariffs drop the price of your home electricity to as low as 7p per kWh between midnight and 5 AM. You plug your car in, tell it to charge while you sleep, and your fuel costs drop by 75% compared to the daytime cap."
        },
        {
            question: "Do electric cars have cheaper maintenance?",
            answer: "Yes. Electric cars have no engine oil, spark plugs, timing belts, or complicated multi-gear transmissions to break. They also use regenerative braking, meaning the actual brake pads wear down incredibly slowly (often lasting for over 100,000 miles). Maintenance is mostly just tires and wiper fluid."
        },
        {
            question: "What does 'miles per kWh' mean?",
            answer: "It's the EV equivalent of Miles Per Gallon (MPG). It measures efficiency. A large electric SUV might get 2.5 miles/kWh, while a sleek aerodynamic electric saloon can get 4.5 miles/kWh. The higher the number, the further it goes on a single 'unit' of electricity."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <CalculatorSchema
                title="Petrol vs Electric Car Running Cost Calculator UK"
                description="Find out if petrol or electric power is truly cheaper for your specific mileage and charging setup."
                slug="/petrol-vs-electric-car-running-cost-calculator-uk"
                faqs={faqs}
            />

            {/* Hero */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
                        <BatteryCharging className="w-4 h-4" />
                        Motoring & Vehicles
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Petrol vs Electric Cost Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Cut through the noise. We calculate exactly how much it costs to fuel a combustion car versus charging a battery electric vehicle, based on your specific tariff.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Calculator Component */}
                <div className="max-w-4xl mx-auto">
                    <PetrolVsElectricCalculator />
                </div>

                {/* SEO Content */}
                <section className="mt-20 max-w-4xl mx-auto space-y-12">
                    <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <Zap className="w-8 h-8 text-blue-500" />
                            The Truth About EV Running Costs
                        </h2>

                        <div className="space-y-8 text-slate-700 dark:text-slate-300">
                            <p className="text-lg leading-relaxed">
                                Five years ago, driving an electric car cost practically nothing. Supermarkets offered free charging, public rapid chargers cost pennies, and home electricity was incredibly cheap. Today, the landscape is much more complex, and blind assumptions can be costly.
                            </p>

                            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/40">
                                <h3 className="text-xl font-bold text-blue-900 dark:text-blue-200 mb-4 flex items-center gap-2">
                                    <Fuel className="w-6 h-6 text-blue-500" /> The Charging Location Trap
                                </h3>
                                <p className="mb-4 text-sm text-blue-800 dark:text-blue-300">
                                    The financial argument for an EV almost entirely collapses if you do not have a driveway or dedicated off-street parking where you can install a home charger.
                                </p>
                                <p className="text-sm text-blue-800 dark:text-blue-300">
                                    Why? Because a public rapid charger on the M1 motorway currently charges around <strong>75p to 85p per kWh</strong>. At that price, an EV costs roughly 22p per mile to drive. A standard petrol VW Golf doing 45 MPG costs about 16p per mile to drive. If you rely on public rapid charging, <strong>petrol is significantly cheaper</strong>.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">How to Win with Electric</h3>
                                <p className="leading-relaxed">
                                    To unlock the massive financial benefits of an EV, you must be able to charge at home, overnight, on a bespoke EV electricity tariff.
                                </p>
                                <p className="leading-relaxed">
                                    Companies like Octopus Energy offer tariffs that plunge your electricity rate down from ~24p to <strong>7p per kWh</strong> between 11:30 PM and 5:30 AM.
                                </p>
                                <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 my-4 text-center">
                                    <span className="block font-bold mb-2">Cost to drive 10,000 miles:</span>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="block text-slate-500 mb-1">Petrol (45 MPG)</span>
                                            <span className="font-bold text-lg text-slate-800 dark:text-slate-200">£1,460</span>
                                        </div>
                                        <div>
                                            <span className="block text-slate-500 mb-1">EV (Home EV Tariff)</span>
                                            <span className="font-bold text-lg text-green-600">£200</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="leading-relaxed text-sm italic font-medium">
                                    When utilized correctly, an EV charger on your driveway essentially acts as a petrol pump that sells fuel for £0.20 a litre.
                                </p>
                            </div>
                        </div>
                    </div>

                    <FAQAccordion faqs={faqs} title="EV Running Cost FAQs" />
                </section>
            </div>
        </div>
    );
}
