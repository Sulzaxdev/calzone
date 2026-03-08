import { Truck, MapPin, Clock, ShieldCheck } from "lucide-react";
import { CarTowingCostCalculator } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "Car Towing Cost Calculator UK 2026 | Recovery & Transport Fees",
    description: "Estimate the cost of towing a car in the UK. Calculator covers emergency roadside recovery, pre-booked transport, vehicle sizes, and distance-based fees.",
};

export default function CarTowingCostPage() {
    const faqs = [
        {
            question: "How much does a tow truck cost per mile in the UK?",
            answer: "Most recovery operators charge a flat 'call-out' fee between £60 and £120, followed by a distance rate. This distance rate typically ranges from £1.50 to £2.50 per mile. Some companies have a minimum charge that covers the first 10 or 20 miles regardless of distance."
        },
        {
            question: "Is car recovery more expensive at night or on weekends?",
            answer: "Yes. Many independent recovery specialists apply a surcharge for out-of-office hours, which usually starts after 6pm and covers all of Saturday and Sunday. This surcharge can add 30% to 50% to the standard daytime call-out fee."
        },
        {
            question: "Will insurance pay for my car to be towed?",
            answer: "If you have specific 'Breakdown Cover' (e.g. AA, RAC, or Green Flag), then recovery is usually free. If you don't have breakdown cover but have comprehensive car insurance, you should check your policy. Standard insurance usually only covers towing if it's the result of an accident, not a mechanical breakdown."
        },
        {
            question: "Can I tow a car myself with a rope in the UK?",
            answer: "Yes, but there are strict rules. The distance between the two vehicles must not exceed 4.5 metres. The towed car MUST have a visible 'ON TOW' sign on the rear. Crucially, the steering and brakes on the towed car must be fully functional, and the driver inside it must be a licensed driver."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <CalculatorSchema
                title="Car Towing Cost Calculator UK"
                description="Our car towing cost calculator provides instant estimates for UK vehicle recovery and transport based on distance, vehicle type, and urgency."
                slug="/car-towing-cost-calculator-uk"
                faqs={faqs}
            />

            {/* Hero Section */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
                        <Truck className="w-4 h-4" />
                        Vehicle Recovery
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        UK Car Towing Cost Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Stranded on the roadside or need to transport a vehicle across the country? Get a realistic estimate of recovery and towing fees in seconds.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                <div className="max-w-4xl mx-auto">
                    <CarTowingCostCalculator />
                </div>

                {/* Information Sections */}
                <div className="mt-20 max-w-4xl mx-auto space-y-16">
                    <section className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-sm">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 border-b border-slate-100 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <ShieldCheck className="w-8 h-8 text-blue-500" />
                            Guide to Car Recovery & Transport
                        </h2>

                        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
                            <p className="text-lg text-slate-600 dark:text-slate-400">
                                Vehicle recovery costs in the UK are rarely fixed. Unlike a standard taxi fare, a recovery operator has to factor in the weight of your vehicle, the time it takes to secure it on a flatbed, and the safety risks of working beside high-speed traffic.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-blue-500" />
                                        Call-out vs Per Mile
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        The <strong>Call-out fee</strong> covers the driver's time, fuel to reach you, and the loading process. If you are only moving the car 200 yards, you will still pay this full fee. The <strong>Per Mile rate</strong> covers the actual transport to your destination.
                                    </p>
                                </div>
                                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-blue-500" />
                                        Timing is Everything
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Breaking down on a Tuesday afternoon is much cheaper than a Sunday night. Emergency operators work 24/7, but night-shift drivers and weekend premiums significantly increase the operational costs, which are passed on to the customer.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-3xl border border-blue-100 dark:border-blue-800/50">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Hidden Factors That Affect Price</h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-6">
                                    While the calculator above provides a strong baseline, several factors can lead to additional charges:
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex gap-4">
                                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-1">
                                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                                        </div>
                                        <div>
                                            <span className="font-bold text-slate-900 dark:text-white block">Keys Lost or Steering Locked</span>
                                            <span className="text-sm text-slate-600 dark:text-slate-400">If the car cannot be steered or put in neutral, the operator may need to use 'skates' or a crane, which usually adds £50-£100 to the bill.</span>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-1">
                                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                                        </div>
                                        <div>
                                            <span className="font-bold text-slate-900 dark:text-white block">Motorway Surcharges</span>
                                            <span className="text-sm text-slate-600 dark:text-slate-400">Recovering a vehicle from a live lane of a motorway is a high-risk operation requiring specialized safety lights and often a quicker response, often commanding a premium.</span>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-1">
                                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                                        </div>
                                        <div>
                                            <span className="font-bold text-slate-900 dark:text-white block">Vehicle Size</span>
                                            <span className="text-sm text-slate-600 dark:text-slate-400">Large vans or heavy 4x4s require much larger recovery trucks with higher fuel consumption and stricter weight limits, increasing the per-mile fee.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <FAQAccordion faqs={faqs} title="Towing & Recovery FAQs" />
                </div>
            </div>
        </div>
    );
}
