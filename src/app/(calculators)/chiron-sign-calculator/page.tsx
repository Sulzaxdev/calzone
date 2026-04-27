import ChironCalculator from "./calculator";
import Link from "next/link";

export default function ChironPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <div className="container mx-auto px-4 pt-12">
                <ChironCalculator />
                <section className="mt-20 max-w-5xl mx-auto">
                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 md:p-16 border border-slate-200 dark:border-slate-800">
                        <h2 className="text-3xl font-black mb-6">Understanding Chiron</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                            Chiron shows where we have a deep-seated wound that we can eventually use to heal others. It is a point of profound wisdom and vulnerability.
                        </p>
                        <p className="text-sm">Explore other tools like the <Link href="/bmi-calculator-uk" className="text-indigo-600 underline">BMI Calculator</Link> to stay healthy.</p>
                    </div>
                </section>
            </div>
        </div>
    );
}
