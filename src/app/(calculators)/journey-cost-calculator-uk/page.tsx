import { MapPin, Coins, Navigation } from "lucide-react";
import { JourneyCostCalculator } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "Journey Fuel Cost Calculator UK | Petrol Trip Cost Calculator",
    description: "Calculate exactly how much petrol or diesel you'll need for your next road trip in the UK. Split the cost between passengers and get the per-mile cost.",
};

export default function JourneyCostPage() {
    const faqs = [
        {
            question: "How do I find out my car's MPG?",
            answer: "Most modern cars have a digital dashboard display that shows your average MPG. Alternatively, you can search your exact make, model, and year online to find the manufacturer's official combined MPG rating."
        },
        {
            question: "Why do we use MPG but buy fuel in litres?",
            answer: "It's an idiosyncrasy of the UK! We measure road distances in miles and historically used gallons (Miles Per Gallon). However, fuel is now sold in metric litres. This calculator bridges the gap automatically, knowing that exactly 4.54609 litres make up a UK gallon."
        },
        {
            question: "Does having passengers increase fuel consumption?",
            answer: "Yes, slightly. More weight in the car means the engine has to work harder. As a general rule of thumb, fuel consumption increases by about 1-2% for every 50kg of extra weight. So four adult passengers with luggage will noticeably reduce your MPG compared to driving alone."
        },
        {
            question: "Is motorway driving more fuel efficient?",
            answer: "Generally, yes. Cruising at a steady 60-70mph in top gear is highly efficient compared to stop-start city driving where you constantly accelerate in lower gears. However, driving aggressively at 80mph+ drastically reduces efficiency due to wind resistance."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <CalculatorSchema
                title="Journey Fuel Cost Calculator UK"
                description="Easily calculate the fuel cost of any road trip or daily commute based on current UK petrol and diesel prices."
                slug="/journey-cost-calculator-uk"
                faqs={faqs}
            />

            {/* Hero */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
                        <Navigation className="w-4 h-4" />
                        Travel & Vehicles
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Journey Cost Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Planning a road trip or carpooling? Calculate your exact fuel cost in seconds, figure out how many litres you need, and split the bill fairly between passengers.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Calculator Component */}
                <div className="max-w-4xl mx-auto">
                    <JourneyCostCalculator />
                </div>

                {/* SEO Content */}
                <section className="mt-20 max-w-4xl mx-auto space-y-12">
                    <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <MapPin className="w-8 h-8 text-blue-500" />
                            How to Calculate Your Trip Costs
                        </h2>

                        <div className="space-y-8 text-slate-700 dark:text-slate-300">
                            <p className="text-lg leading-relaxed">
                                Whether you're heading off on a staycation from London to Cornwall, or just trying to calculate the actual cost of your daily commute, figuring out fuel prices can feel like solving a puzzle thanks to the UK's mix of metric and imperial measurements.
                            </p>

                            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/40">
                                <h3 className="text-xl font-bold text-blue-900 dark:text-blue-200 mb-4 flex items-center gap-2">
                                    <Coins className="w-6 h-6 text-blue-500" /> The Math Explained
                                </h3>
                                <p className="mb-4 text-sm text-blue-800 dark:text-blue-300">
                                    To calculate your journey cost manually, you need to navigate the fact that your car's efficiency is measured in Miles Per Gallon (MPG), but fuel is sold in Litres.
                                </p>
                                <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300 font-medium">
                                    <li>1. Divide your total miles by your MPG to get Total Gallons needed.</li>
                                    <li>2. Multiply the Total Gallons by 4.546 (the number of litres in a UK gallon) to find total Litres.</li>
                                    <li>3. Finally, multiply the Litres by the price of fuel per litre.</li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Tips for Improving Fuel Economy on Long Trips</h3>
                                <p className="leading-relaxed">If you want to reduce how much you spend at the pump during your trip, follow these simple guidelines:</p>
                                <ul className="list-disc pl-6 space-y-3">
                                    <li><strong>Check your tyre pressure:</strong> Under-inflated tyres increase rolling resistance. Simply pumping your tyres to the correct pressure can improve MPG by up to 3%.</li>
                                    <li><strong>Remove roof boxes and racks:</strong> Aerodynamic drag is the biggest enemy of fuel efficiency at motorway speeds. An empty roof box will dramatically reduce your MPG. Take it off if you don't absolutely need it.</li>
                                    <li><strong>Drive smoothly:</strong> Anticipate traffic flow to avoid heavy braking and harsh acceleration. Maintaining a steady pace is far more efficient than constantly accelerating and decelerating.</li>
                                    <li><strong>Use Air Con wisely:</strong> At low speeds (around town), open windows instead of using A/C. But at motorway speeds, open windows create too much drag, making the A/C the more efficient choice.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <FAQAccordion faqs={faqs} title="Trip Cost FAQs" />
                </section>
            </div>
        </div>
    );
}
