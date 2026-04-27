import RisingSignCalculator from "./calculator";
import Link from "next/link";
import { ArrowUpRight, Sparkles, HelpCircle, ChevronRight } from "lucide-react";

export default function RisingSignCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <div className="container mx-auto px-4 pt-12">
                <RisingSignCalculator />
                <section className="mt-20 max-w-5xl mx-auto">
                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 md:p-16 border border-slate-200 dark:border-slate-800">
                        <h2 className="text-3xl font-black mb-6">Why Time Matters</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                            The Rising sign is the zodiac sign that was rising on the eastern horizon at the exact moment of your birth. Because the earth rotates, this sign changes every two hours, making an accurate birth time essential for this calculation.
                        </p>
                        <h3 className="text-xl font-bold mb-4">The Role of the Ascendant</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            It shapes your physical appearance, your style, and how you approach new situations. It's often called the "doorway" to your birth chart.
                        </p>
                        <div className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-2xl border border-amber-100 dark:border-amber-900/30 mb-8">
                            <h4 className="font-bold text-amber-800 dark:text-amber-400 mb-2">Did You Know?</h4>
                            <p className="text-sm">Many people identify more with their Rising sign in social settings than their Sun sign!</p>
                        </div>
                        <p className="text-sm text-slate-500 italic">
                            Understanding yourself is a journey. While exploring your cosmic identity, stay on top of your professional goals with our <Link href="/salary-calculator-uk" className="text-indigo-600 underline">Salary Calculator</Link>.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
