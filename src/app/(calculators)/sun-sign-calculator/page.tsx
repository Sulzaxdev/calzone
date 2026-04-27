import SunSignCalculator from "./calculator";
import Link from "next/link";
import { Sun, Sparkles, HelpCircle, ChevronRight } from "lucide-react";

export default function SunSignCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <div className="container mx-auto px-4 pt-12">
                <SunSignCalculator />
                <section className="mt-20 max-w-5xl mx-auto">
                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 md:p-16 border border-slate-200 dark:border-slate-800">
                        <h2 className="text-3xl font-black mb-6">What is a Sun Sign?</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                            In astrology, the Sun represents your ego, your basic personality, and the spirit that drives you. It is the most well-known part of your birth chart. While many people know their zodiac sign, calculating it with precise dates is essential for those born on the "cusp."
                        </p>
                        <h3 className="text-xl font-bold mb-4">Why Calculate Your Sun Sign?</h3>
                        <ul className="space-y-4 mb-10">
                            <li className="flex items-start gap-3"><ChevronRight className="w-5 h-5 text-indigo-500" /> Understand your core strengths.</li>
                            <li className="flex items-start gap-3"><ChevronRight className="w-5 h-5 text-indigo-500" /> Discover your natural leadership style.</li>
                            <li className="flex items-start gap-3"><ChevronRight className="w-5 h-5 text-indigo-500" /> Align your life goals with your zodiac energy.</li>
                        </ul>
                        <div className="bg-indigo-50 dark:bg-indigo-950/30 p-8 rounded-3xl">
                            <h4 className="font-bold mb-2">Looking for the Full Picture?</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Your Sun sign is just the beginning. To understand your emotions and outward persona, try our <Link href="/sun-moon-rising-calculator" className="text-indigo-600 font-bold underline">Sun, Moon, and Rising Calculator</Link>.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
