import { Car, Info, Receipt } from "lucide-react";
import { UsedCarTaxCalculator } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "Used Car Tax Calculator UK | DVLA VED Check",
    description: "Check exactly how much Vehicle Excise Duty (Road Tax) you will pay on a used car before you buy it. Prevent nasty hidden surprises.",
};

export default function UsedCarTaxPage() {
    const faqs = [
        {
            question: "Why do older cars have cheaper tax?",
            answer: "It creates a confusing paradox. Between 2001 and 2017, the UK taxed cars purely on CO2 emissions to encourage buying greener cars. This meant highly efficient diesel hatchbacks got £0 or £20 tax bills. In 2017, the rules changed to a flat rate system because too many people were buying efficient cars, leaving a massive hole in the government budget."
        },
        {
            question: "What is the Expensive Car Surcharge?",
            answer: "If you buy a used car registered after 1 April 2017 that had an original brand-new list price of over £40,000 (even if you bought it second hand for £15,000), you must pay an annual £410 surcharge on top of the standard £190 flat rate. This applies for 5 years after the first year of registration."
        },
        {
            question: "Is road tax transferable to a new owner?",
            answer: "No. The DVLA changed the rules in 2014. Road tax stays with the driver, not the car. When you buy a used car, it is instantly untaxed (even if the previous owner paid for the year). You must tax it before driving it away, and the previous owner will get a refund for any full remaining months."
        },
        {
            question: "Will Electric Cars (EVs) always be free to tax?",
            answer: "No. The £0 road tax incentive for EVs is coming to an end. From April 2025, zero-emission vehicles will lose their exemption and be moved into the standard flat rate band (currently £180/£190) to ensure they contribute to road maintenance as their market share grows."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <CalculatorSchema
                title="Used Car Tax Calculator UK"
                description="Estimate the DVLA Vehicle Excise Duty (road tax) for any second hand car in the UK."
                slug="/used-car-tax-calculator-uk"
                faqs={faqs}
            />

            {/* Hero */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-semibold mb-6">
                        <Receipt className="w-4 h-4" />
                        Motoring & Vehicles
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Used Car Tax Check
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Don't get caught out by aggressive road tax bands. Check exactly how much the DVLA will charge you annually before you hand over cash for a used car.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Calculator Component */}
                <div className="max-w-4xl mx-auto">
                    <UsedCarTaxCalculator />
                </div>

                {/* SEO Content */}
                <section className="mt-20 max-w-4xl mx-auto space-y-12">
                    <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <Car className="w-8 h-8 text-purple-500" />
                            Understanding The Total Chaos of UK Road Tax
                        </h2>

                        <div className="space-y-8 text-slate-700 dark:text-slate-300">
                            <p className="text-lg leading-relaxed">
                                Vehicle Excise Duty (VED) in the UK isn't one system; it's practically three completely different overlapping systems depending on the exact date a car's plates were first screwed on. It's the number one financial trap second-hand buyers fall straight into.
                            </p>

                            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-2xl border border-purple-100 dark:border-purple-900/40">
                                <h3 className="text-xl font-bold text-purple-900 dark:text-purple-200 mb-4 flex items-center gap-2">
                                    <Info className="w-6 h-6 text-purple-500" /> The Secret "Used Car" Tax Loophole
                                </h3>
                                <p className="mb-4 text-sm text-purple-800 dark:text-purple-300">
                                    If you want cheap driving, older isn't always worse. A 2015 Ford Fiesta 1.0 EcoBoost pumps out less than 100g/km of CO2, meaning it sits in the golden 'Band A' and costs exactly £0 a year to tax.
                                </p>
                                <p className="text-sm text-purple-800 dark:text-purple-300">
                                    The exact same model built <strong>after April 2017</strong> gets swept into the new 'Flat Rate' system, meaning the owner suddenly gets a bill for £190 every single year. The cars are mechanically identical, but the date alone costs the post-2017 model nearly £2,000 more over a decade.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">The 3 Eras of UK Motoring Tax</h3>
                                <div className="space-y-4">
                                    <div className="border border-slate-200 dark:border-slate-800 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                                        <h4 className="font-bold flex justify-between items-center mb-1">
                                            <span>Era 1: Pre-March 2001</span>
                                            <span className="text-xs bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded text-slate-700 dark:text-slate-300">Dead Simple</span>
                                        </h4>
                                        <p className="text-sm">The glory days. Tax was purely based on engine size. Over 1549cc? Huge bill. Under? Small bill. Pollution didn't factor into it.</p>
                                    </div>
                                    <div className="border border-slate-200 dark:border-slate-800 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                                        <h4 className="font-bold flex justify-between items-center mb-1">
                                            <span>Era 2: 2001 to April 2017</span>
                                            <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded">The Golden Loophole</span>
                                        </h4>
                                        <p className="text-sm">Tax based entirely on CO2 emissions to push the public toward "clean" diesel. If a car slipped into Band A (under 100g/km), it was tax-free for life. This is the era budget hunters look for.</p>
                                    </div>
                                    <div className="border border-slate-200 dark:border-slate-800 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                                        <h4 className="font-bold flex justify-between items-center mb-1">
                                            <span>Era 3: Post April 2017</span>
                                            <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-2 py-1 rounded">The Treasury Strikes Back</span>
                                        </h4>
                                        <p className="text-sm">Cars were getting too efficient. The government introduced a punitive high 'first year' emissions tax (which the first buyer pays), followed by a flat rate generic fee for all normal petrol/diesels for everyone else thereafter.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <FAQAccordion faqs={faqs} title="Vehicle Excise Duty Check FAQs" />
                </section>
            </div>
        </div>
    );
}
