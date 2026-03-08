import { Tag, Banknote, ShoppingBag } from "lucide-react";
import { PercentageOffCalculator } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "Percentage Off Calculator UK | Calculate Discounts & Sales",
    description: "Instantly calculate how much you save during sales. Find out the final price after a percentage discount has been applied to any product or service.",
};

export default function PercentageOffPage() {
    const faqs = [
        {
            question: "How do I calculate a percentage off manually?",
            answer: "To calculate a percentage off, convert the percentage to a decimal by dividing by 100 (e.g., 20% becomes 0.20). Then, multiply the original price by that decimal to find your savings. Finally, subtract the savings from the original price to get the final cost."
        },
        {
            question: "Is '20% off' the same as 'paying 80%'?",
            answer: "Yes! If you are getting 20% off the original price, you are essentially paying 80% of the original cost. To find the final price quickly, multiply the original price by 0.80."
        },
        {
            question: "Can I use this for non-currency numbers?",
            answer: "Absolutely. Even though the calculator uses the £ symbol for convenience, the mathematical formula works for any numerical value, weight, distance, or currency."
        },
        {
            question: "How do I calculate multiple discounts (e.g., an extra 10% off)?",
            answer: "You cannot simply add the percentages together. You must apply the first discount to find the new price, and then apply the second percentage off to that new, lower price."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <CalculatorSchema
                title="Percentage Off Calculator UK"
                description="Easily calculate discounts and sales prices with our percentage off calculator."
                slug="/percentage-off-calculator-uk"
                faqs={faqs}
            />

            {/* Hero */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-semibold mb-6">
                        <Tag className="w-4 h-4" />
                        Maths & Finance
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Percentage Off Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Whether you're shopping during Black Friday, calculating trade discounts, or figuring out a negotiated invoice reduction, instantly see exactly how much you save and what your final price will be.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Calculator Component */}
                <div className="max-w-4xl mx-auto">
                    <PercentageOffCalculator />
                </div>

                {/* SEO Content */}
                <section className="mt-20 max-w-4xl mx-auto space-y-12">
                    <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <Banknote className="w-8 h-8 text-green-500" />
                            How Percentages Work in Sales
                        </h2>

                        <div className="space-y-8 text-slate-700 dark:text-slate-300">
                            <p className="text-lg leading-relaxed">
                                Retailers use percentage discounts constantly to attract customers. While seeing "25% Off!" might sound appealing, doing the mental maths on a specific price tag can be difficult, especially if the price isn't a round number. Our percentage off calculator does the heavy lifting for you.
                            </p>

                            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl border border-green-100 dark:border-green-900/40">
                                <h3 className="text-xl font-bold text-green-900 dark:text-green-200 mb-4 flex items-center gap-2">
                                    <ShoppingBag className="w-6 h-6 text-green-500" /> The Basic Formula
                                </h3>
                                <p className="mb-4 text-sm text-green-800 dark:text-green-300">
                                    If you want to manually calculate how much you are saving on an item, the formula is straightforward:
                                </p>
                                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-green-200 dark:border-green-800 text-center font-mono font-bold text-lg text-slate-800 dark:text-slate-200">
                                    Savings = Original Price × (Discount Percentage ÷ 100)
                                </div>
                                <p className="mt-4 text-sm text-green-800 dark:text-green-300">
                                    For example, if a TV costs £450 and is 15% off: <br />
                                    <strong>Savings = 450 × 0.15 = £67.50</strong><br />
                                    <strong>Final Price = 450 - 67.50 = £382.50</strong>
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Double Discounts (Stacked Sales)</h3>
                                <p className="leading-relaxed">
                                    Often during events like Boxing Day sales, a store might offer "20% off already reduced clearance items". If the clearance item was already 30% off, you are <strong>not</strong> getting 50% off overall.
                                </p>
                                <p className="leading-relaxed">
                                    You must calculate the first 30% discount. Then, you take the <em>remaining</em> price, and calculate the 20% discount on that new amount. This means the actual total discount is less than the perceived 50%.
                                </p>
                            </div>
                        </div>
                    </div>

                    <FAQAccordion faqs={faqs} title="Discount FAQs" />
                </section>
            </div>
        </div>
    );
}
