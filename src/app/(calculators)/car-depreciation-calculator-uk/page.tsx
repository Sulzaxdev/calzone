import { CarFront, TrendingDown, Clock } from "lucide-react";
import { CarDepreciationCalculator } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "Car Depreciation Calculator UK | Vehicle Value Loss",
    description: "Calculate how much value your car will lose over time. See the hidden cost of motoring and year-by-year depreciation schedules.",
};

export default function CarDepreciationPage() {
    const faqs = [
        {
            question: "How much does a new car depreciate in the first year?",
            answer: "A brand new car loses an average of 15% to 30% of its value the second you drive it off the forecourt and complete its first year. By the end of year three, the average car has lost around 40% to 50% of its initial value."
        },
        {
            question: "Why do luxury cars depreciate faster?",
            answer: "High-end luxury cars (like BMWs, Range Rovers, and Mercedes) often lose value faster because their maintenance costs are incredibly high out-of-warranty. Second-hand buyers are terrified of huge repair bills for complex electronics, driving the resale price into the ground."
        },
        {
            question: "Which cars hold their value the best?",
            answer: "Reliable, economical cars with massive mass-market appeal tend to hold their value exceptionally well. Brands like Toyota and Honda are famous for slow depreciation because second-hand buyers trust them to run forever without breaking down."
        },
        {
            question: "Is depreciation a real cost?",
            answer: "Absolutely. While you don't 'pay' it month by month in cash, depreciation is the single largest cost of owning a car. If you buy a car for £20,000 and sell it 3 years later for £10,000, that car has cost you £10,000 (plus insurance, fuel, and tax) just to park on your drive."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <CalculatorSchema
                title="Car Depreciation Calculator UK"
                description="Estimate how much your vehicle will depreciate in value over the years."
                slug="/car-depreciation-calculator-uk"
                faqs={faqs}
            />

            {/* Hero */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-semibold mb-6">
                        <TrendingDown className="w-4 h-4" />
                        Motoring Finance
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Car Depreciation Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Revealing the hidden cost of driving. See exactly how much your car's value melts away every single year you own it.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Calculator Component */}
                <div className="max-w-4xl mx-auto">
                    <CarDepreciationCalculator />
                </div>

                {/* SEO Content */}
                <section className="mt-20 max-w-4xl mx-auto space-y-12">
                    <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <Clock className="w-8 h-8 text-red-500" />
                            The Silent Expense
                        </h2>

                        <div className="space-y-8 text-slate-700 dark:text-slate-300">
                            <p className="text-lg leading-relaxed">
                                Most people calculate the cost of a car by adding up the finance payments, fuel, insurance, and road tax. But they completely ignore the massive elephant in the room: Depreciation.
                            </p>

                            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl border border-red-100 dark:border-red-900/40">
                                <h3 className="text-xl font-bold text-red-900 dark:text-red-200 mb-4 flex items-center gap-2">
                                    <CarFront className="w-6 h-6 text-red-500" /> The "New Car Smell" Premium
                                </h3>
                                <p className="text-sm text-red-800 dark:text-red-300">
                                    Driving a brand-new car off the dealership lot is notoriously one of the worst financial moves you can make. The moment the tires touch public tarmac, the car transitions from "New" to "Used." That single moment instantly wipes thousands of pounds off its value, because the next buyer will demand a massive discount for taking a second-hand car.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Strategies To Beat Depreciation</h3>
                                <ul className="list-disc pl-5 space-y-4 marker:text-red-500">
                                    <li>
                                        <strong>Buy 3 Years Old:</strong> By the time a car hits its 3rd birthday, the steepest part of the depreciation curve has already happened. The original owner took the massive financial hit, and you get a relatively modern car that now depreciate slowly.
                                    </li>
                                    <li>
                                        <strong>Avoid Niche Specs:</strong> A bright yellow car with lime green interior trim might reflect your personality, but it destroys resale value. Buyers want neutral colours (Grey, Black, Silver, White) rendering them easier to sell.
                                    </li>
                                    <li>
                                        <strong>Keep It Forever:</strong> If you buy a car and drive it into the ground over 15 years, depreciation stops mattering. You extract the full utility value out of the machine.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <FAQAccordion faqs={faqs} title="Depreciation FAQs" />
                </section>
            </div>
        </div>
    );
}
