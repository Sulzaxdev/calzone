import { Undo2, Search, Zap } from "lucide-react";
import { ReversePercentageCalculator } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "Reverse Percentage Calculator UK | Find Original Prices",
    description: "Calculate the original number before a percentage was added or subtracted. Ideal for calculating prices before VAT or finding pre-sale retail values.",
};

export default function ReversePercentagePage() {
    const faqs = [
        {
            question: "What is a reverse percentage calculation?",
            answer: "A reverse percentage calculation allows you to find an original 'starting' value when you only know the final amount and the percentage that was added or subtracted to get there."
        },
        {
            question: "Why can't I just subtract 20% to find a price before 20% VAT?",
            answer: "This is the most common maths mistake in retail! A 20% addition makes the full value 120%. If you subtract 20% from that final 120%, you are taking away a larger chunk than what was originally added. To correctly reverse a 20% addition, you must DIVIDE the final number by 1.20."
        },
        {
            question: "How do you reverse a percentage discount?",
            answer: "If you know a TV is on sale for £400 after a 20% discount, that means £400 represents 80% (100% - 20%) of the original price. To find the original, divide 400 by 0.80. The original price was £500."
        },
        {
            question: "What happens if I try to reverse a 100% discount?",
            answer: "Mathematically, a 100% discount means the item was free (£0). You cannot divide £0 to find the original price, the calculation is logically impossible without knowing the absolute difference."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <CalculatorSchema
                title="Reverse Percentage Calculator UK"
                description="Easily calculate the original value before an increase or decrease."
                slug="/reverse-percentage-calculator-uk"
                faqs={faqs}
            />

            {/* Hero */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 text-sm font-semibold mb-6">
                        <Undo2 className="w-4 h-4" />
                        Maths & Accounting
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Reverse Percentage Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Work backwards from a final total to discover the original starting number. Perfect for identifying the net cost of an item before VAT (20%) was added, or finding the pre-sale price of a discounted product.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Calculator Component */}
                <div className="max-w-4xl mx-auto">
                    <ReversePercentageCalculator />
                </div>

                {/* SEO Content */}
                <section className="mt-20 max-w-4xl mx-auto space-y-12">
                    <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <Search className="w-8 h-8 text-yellow-500" />
                            Working Backwards
                        </h2>

                        <div className="space-y-8 text-slate-700 dark:text-slate-300">
                            <p className="text-lg leading-relaxed">
                                Most people know how to calculate 20% of a number. However, working <em>backward</em>—trying to figure out what the original price was before that 20% was added—trips up many people, including small business owners trying to do their VAT returns.
                            </p>

                            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-2xl border border-yellow-100 dark:border-yellow-900/40">
                                <h3 className="text-xl font-bold text-yellow-900 dark:text-yellow-200 mb-4 flex items-center gap-2">
                                    <Zap className="w-6 h-6 text-yellow-500" /> The Golden Rule of Reverse Percentages
                                </h3>
                                <p className="mb-4 text-sm text-yellow-800 dark:text-yellow-300">
                                    You cannot simply subtract the percentage to find the original value. You must <strong>divide</strong> using decimals.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-yellow-200 dark:border-yellow-800">
                                        <h4 className="font-bold text-slate-900 dark:text-white mb-2">Reversing an Addition (e.g. VAT)</h4>
                                        <p className="text-sm">Divide by: <strong>1 + (Percentage ÷ 100)</strong></p>
                                        <p className="text-sm mt-2 text-slate-500"><em>Example: For 20% VAT, divide the final total by 1.20 to find the net price.</em></p>
                                    </div>
                                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-yellow-200 dark:border-yellow-800">
                                        <h4 className="font-bold text-slate-900 dark:text-white mb-2">Reversing a Deduction (e.g. Sales)</h4>
                                        <p className="text-sm">Divide by: <strong>1 - (Percentage ÷ 100)</strong></p>
                                        <p className="text-sm mt-2 text-slate-500"><em>Example: For a 25% discount, divide the final sale price by 0.75 to find original.</em></p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">The Most Common Mistake</h3>
                                <div className="bg-slate-100 dark:bg-slate-900 p-5 rounded-2xl border-l-4 border-red-500">
                                    <h4 className="font-bold mb-2">The Wrong Way</h4>
                                    <p className="text-sm mb-4">
                                        "I bought a laptop for £120. That means it includes 20% VAT. So to find out how much the VAT was, I'll just calculate 20% of 120 (which is £24), and subtract it to get the original £96." <strong>WRONG!</strong>
                                    </p>
                                    <h4 className="font-bold mb-2">The Right Way</h4>
                                    <p className="text-sm">
                                        The original price was £100. 20% of £100 is £20. So £100 + £20 VAT = £120 final price.
                                        You find this using the formula: <strong>120 ÷ 1.20 = 100</strong>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <FAQAccordion faqs={faqs} title="Reverse Percentage FAQs" />
                </section>
            </div>
        </div>
    );
}
