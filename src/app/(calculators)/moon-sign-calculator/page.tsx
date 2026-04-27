import MoonSignCalculator from "./calculator";
import Link from "next/link";
import { Moon, Sparkles, HelpCircle, ChevronRight } from "lucide-react";

export default function MoonSignCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <div className="container mx-auto px-4 pt-12">
                <MoonSignCalculator />
                <section className="mt-20 max-w-5xl mx-auto">
                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 md:p-16 border border-slate-200 dark:border-slate-800">
                        <h2 className="text-3xl font-black mb-6">The Power of the Moon Sign</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                            While your Sun sign is who you are becoming, your Moon sign is who you already are deep down. It governs your moods, your relationship with your home, and how you nurture yourself and others.
                        </p>
                        <div className="grid md:grid-cols-2 gap-8 mb-10">
                            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/10">
                                <h3 className="font-bold mb-2">Emotional Instincts</h3>
                                <p className="text-sm">Learn why you react to stress or joy in specific ways based on your lunar placement.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/10">
                                <h3 className="font-bold mb-2">Inner Security</h3>
                                <p className="text-sm">Discover what you truly need to feel safe, loved, and grounded in life.</p>
                            </div>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400">
                            Planning a major life change? Astrology can help with mindset, but for financial planning, don't forget our <Link href="/loan-calculator-uk" className="text-blue-600 font-bold underline">Loan Calculator</Link> to stay grounded in reality.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
