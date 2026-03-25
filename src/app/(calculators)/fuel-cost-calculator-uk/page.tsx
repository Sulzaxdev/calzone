"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Fuel, FuelIcon } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { RelatedTools } from "@/components/layout/related-tools";

export default function FuelCostCalculator() {
    const [distance, setDistance] = useState("100");
    const [fuelEfficiency, setFuelEfficiency] = useState("45"); // MPG (UK standard)
    const [fuelPrice, setFuelPrice] = useState("145.9"); // Price per litre in pence (UK standard)

    const [result, setResult] = useState<{ totalCost: string; totalLitres: string; } | null>(null);

    const calculateCost = (e: React.FormEvent) => {
        e.preventDefault();

        // Parse values
        const d = parseFloat(distance);
        const mpg = parseFloat(fuelEfficiency); // Miles Per Gallon (UK)
        const pricePencePerLitre = parseFloat(fuelPrice);

        if (d > 0 && mpg > 0 && pricePencePerLitre > 0) {
            // UK Gallon converting to Litres: 1 UK Gallon = 4.54609 Litres
            const gallonsNeeded = d / mpg;
            const litresNeeded = gallonsNeeded * 4.54609;

            const pricePerLitreInPounds = pricePencePerLitre / 100;
            const totalCostPounds = litresNeeded * pricePerLitreInPounds;

            setResult({
                totalCost: totalCostPounds.toFixed(2),
                totalLitres: litresNeeded.toFixed(1)
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <BreadcrumbSchema items={[
                { name: "Home", item: "/" },
                { name: "Automotive", item: "/automotive" },
                { name: "Fuel Cost Calculator", item: "/fuel-cost-calculator-uk" }
            ]} />
            <CalculatorSchema
                title="Fuel Cost Calculator UK | Journey Price & MPG Estimator 2026"
                description="Calculate how much a journey will cost in fuel based on your vehicle's MPG and current petrol/diesel prices in 2026."
                slug="/fuel-cost-calculator-uk"
            />
            <div className="max-w-4xl mx-auto">
                <CalculatorCard
                    title="Fuel Cost Calculator UK"
                    description="Calculate how much a journey will cost in fuel based on your vehicle's MPG and current petrol/diesel prices."
                    hasResult={!!result}
                >
                    <form onSubmit={calculateCost} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="distance">Journey Distance (Miles)</Label>
                            <Input
                                id="distance"
                                type="number"
                                placeholder="e.g. 150"
                                value={distance}
                                onChange={(e) => setDistance(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="efficiency">Vehicle Fuel Efficiency (MPG)</Label>
                            <Input
                                id="efficiency"
                                type="number"
                                step="0.1"
                                placeholder="e.g. 45.0"
                                value={fuelEfficiency}
                                onChange={(e) => setFuelEfficiency(e.target.value)}
                                required
                            />
                            <p className="text-xs text-muted-foreground mt-1">UK Miles Per Gallon</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price">Fuel Price (Pence per Litre)</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.1"
                                placeholder="e.g. 155.0"
                                value={fuelPrice}
                                onChange={(e) => setFuelPrice(e.target.value)}
                                required
                            />
                            <p className="text-xs text-muted-foreground mt-1">Average UK price format (e.g. 155.0p = £1.55/L)</p>
                        </div>

                        <Button type="submit" className="w-full text-lg h-12">Calculate Journey Cost</Button>
                    </form>

                    {result && (
                        <div className="mt-8 p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-center animate-in zoom-in-95 duration-300">
                            <div className="flex justify-center items-center gap-2 mb-4">
                                <Fuel className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                                <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-200">Journey Cost Estimate</h3>
                            </div>
                            <div className="text-5xl font-extrabold mb-4 text-emerald-600 dark:text-emerald-400">
                                £{result.totalCost}
                            </div>
                            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300 max-w-sm mx-auto">
                                You will use approximately <span className="font-bold">{result.totalLitres} litres</span> of fuel for this trip.
                            </p>
                        </div>
                    )}
                </CalculatorCard>

                {/* --- DETAILED GUIDE SECTION --- */}
                <div className="mt-16 prose prose-slate dark:prose-invert max-w-none bg-white dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 border-b border-primary/20 pb-4">
                        Understanding Your Journey Fuel Costs in 2026
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                        With UK fuel prices reaching new benchmarks in 2026, planning your travel budget has never been more important. Whether you are a daily commuter or heading out on a cross-country road trip, knowing exactly how much you'll spend at the pump allows for smarter financial management.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 my-10">
                        <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 font-sans">
                            <h3 className="font-bold text-xl mb-3 text-primary">Petrol Prices (2026)</h3>
                            <p className="text-sm m-0">Average petrol rates currently sit at <strong>£1.55 per litre</strong> across the UK. Prices often fluctuate by 2-5p depending on supermarket competition and global oil supply.</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 font-sans">
                            <h3 className="font-bold text-xl mb-3 text-primary">Diesel Prices (2026)</h3>
                            <p className="text-sm m-0">Diesel tends to remain slightly more expensive, averaging <strong>£1.60 per litre</strong>. This is influenced by industrial demand and specific UK refining logistics.</p>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-12 mb-6">How Our Fuel Cost Calculator Works</h2>
                    <p>
                        Our algorithm uses the UK standard for fuel measurement and economy. To get an accurate result, we follow this sequence:
                    </p>
                    <ol>
                        <li><strong>Gallons Needed:</strong> We take your total distance (Miles) and divide it by your vehicle's MPG (Miles Per Gallon).</li>
                        <li><strong>Litres Conversion:</strong> Since UK fuel is sold in litres but economy is measured in MPG, we convert gallons to litres using the official UK ratio: <strong>1 UK Gallon = 4.54609 Litres</strong>.</li>
                        <li><strong>Price Computation:</strong> Finally, we multiply the total litres needed by your local price per litre to find the total GBP (£) cost.</li>
                    </ol>

                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-12 mb-6">3 Ways to Improve Your Fuel Economy (MPG)</h2>
                    <p>
                        If you find your journey costs are too high, consider these proven methods to boost your vehicle's efficiency:
                    </p>
                    <ul>
                        <li><strong>Smooth Driving Patterns:</strong> Rapid acceleration and sudden braking can reduce your MPG by as much as 15%. Maintaining a steady pace, especially on A-roads and Motorways, is the most effective way to save fuel.</li>
                        <li><strong>Maintain Tyre Pressure:</strong> Under-inflated tyres increase friction and rolling resistance, forcing the engine to work harder. Check your PSI every month to ensure you are meeting the manufacturer's specification.</li>
                        <li><strong>Remove Excess Weight:</strong> Carrying a roof rack you don't use or keeping heavy items in the boot can drag down your economy. Every 50kg of extra weight can reduce your efficiency by about 1-2%.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-12 mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4 not-prose">
                        <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 font-sans">
                            <h4 className="font-bold mb-2">Should I fill up at the supermarket or a brand station?</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Supermarkets like Tesco, ASDA, and Sainsbury's often use fuel as a 'loss leader' and may be 5-10p cheaper than premium stations like Shell or BP. For most daily drivers, the supermarket option is the best way to save.</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 font-sans">
                            <h4 className="font-bold mb-2">How much of my fuel cost is tax?</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">In the UK, roughly 55-60% of the price per litre is tax. This includes <strong>Fuel Duty</strong> (a fixed levy) and <strong>VAT (20%)</strong> which is applied to the total sum.</p>
                        </div>
                    </div>
                </div>
            </div>
            <RelatedTools currentCategory="Automotive" currentSlug="/fuel-cost-calculator-uk" />
        </div>
    );
}
