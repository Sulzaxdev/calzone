import VenusSignCalculator from "./calculator";
import Link from "next/link";
import { Heart, Sparkles, HelpCircle } from "lucide-react";

export default function VenusSignCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <div className="container mx-auto px-4 pt-12">
                <VenusSignCalculator />
                <section className="mt-20 max-w-5xl mx-auto">
                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 md:p-16 border border-slate-200 dark:border-slate-800">
                        <h2 className="text-3xl font-black mb-6">Love and Money in Astrology</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                            Your Venus sign reveals how you express affection, who you are attracted to, and your personal taste. It also influences your relationship with finances and material possessions.
                        </p>
                        <div className="grid md:grid-cols-2 gap-8 mb-10">
                            <div className="p-6 rounded-2xl bg-pink-50 dark:bg-pink-900/10">
                                <h3 className="font-bold mb-2">Relationship Style</h3>
                                <p className="text-sm">Are you intense in love, or do you value freedom? Your Venus sign has the answer.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-pink-50 dark:bg-pink-900/10">
                                <h3 className="font-bold mb-2">Aesthetics</h3>
                                <p className="text-sm">Understand your sense of style and what you find beautiful in the world.</p>
                            </div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700">
                            <h4 className="font-bold mb-4">Balance Your Life</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                Venus also governs value. While exploring your values, ensure your physical health is in balance with our <Link href="/bmi-calculator-uk" className="text-pink-600 font-bold underline">BMI Calculator</Link>.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
