import LilithCalculator from "./calculator";
import Link from "next/link";

export default function LilithPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <div className="container mx-auto px-4 pt-12">
                <LilithCalculator />
                <section className="mt-20 max-w-5xl mx-auto">
                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 md:p-16 border border-slate-200 dark:border-slate-800">
                        <h2 className="text-3xl font-black mb-6">The Mystery of Lilith</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                            Lilith shows where we may feel exiled or where we refuse to compromise our true nature. It is a point of raw power.
                        </p>
                        <p className="text-sm text-slate-500">Stay balanced with our <Link href="/salary-calculator-uk" className="text-indigo-600 underline">Salary Calculator</Link>.</p>
                    </div>
                </section>
            </div>
        </div>
    );
}
