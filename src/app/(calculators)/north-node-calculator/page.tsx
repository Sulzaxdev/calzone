import NorthNodeCalculator from "./calculator";
import Link from "next/link";

export default function NorthNodePage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <div className="container mx-auto px-4 pt-12">
                <NorthNodeCalculator />
                <section className="mt-20 max-w-5xl mx-auto">
                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 md:p-16 border border-slate-200 dark:border-slate-800">
                        <h2 className="text-3xl font-black mb-6">Your Path Forward</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                            While the South Node shows what we already know, the North Node shows where we need to go to find fulfillment and purpose.
                        </p>
                        <p className="text-sm">Need to plan your journey? Use our <Link href="/mileage-calculator-uk" className="text-indigo-600 underline">Mileage Calculator</Link>.</p>
                    </div>
                </section>
            </div>
        </div>
    );
}
