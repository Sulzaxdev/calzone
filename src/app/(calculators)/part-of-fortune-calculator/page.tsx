import PartOfFortuneCalculator from "./calculator";
import Link from "next/link";

export default function PartOfFortunePage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <div className="container mx-auto px-4 pt-12">
                <PartOfFortuneCalculator />
                <section className="mt-20 max-w-5xl mx-auto">
                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 md:p-16 border border-slate-200 dark:border-slate-800">
                        <h2 className="text-3xl font-black mb-6">Finding Your Joy</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                            Calculated from the Sun, Moon, and Ascendant, this point reveals where you can find the greatest harmony and prosperity.
                        </p>
                        <p className="text-sm">Prosperity starts with a good budget. Check our <Link href="/vat-calculator-uk" className="text-indigo-600 underline">VAT Calculator</Link>.</p>
                    </div>
                </section>
            </div>
        </div>
    );
}
