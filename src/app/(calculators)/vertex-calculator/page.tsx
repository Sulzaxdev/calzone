import VertexCalculator from "./calculator";
import Link from "next/link";

export default function VertexPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <div className="container mx-auto px-4 pt-12">
                <VertexCalculator />
                <section className="mt-20 max-w-5xl mx-auto">
                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 md:p-16 border border-slate-200 dark:border-slate-800">
                        <h2 className="text-3xl font-black mb-6">A Point of Destiny</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                            The Vertex is often activated by major life events or meeting important people. It feels like a 'turning point'.
                        </p>
                        <p className="text-sm">Don't leave your health to fate! Try our <Link href="/bmi-calculator-uk" className="text-indigo-600 underline">BMI Calculator</Link>.</p>
                    </div>
                </section>
            </div>
        </div>
    );
}
