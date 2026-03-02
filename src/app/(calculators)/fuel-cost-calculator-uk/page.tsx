"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Fuel, FuelIcon } from "lucide-react";

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
            <CalculatorCard
                title="Fuel Cost Calculator"
                description="Calculate how much a journey will cost in fuel based on your vehicle's MPG and current petrol/diesel prices."
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
                            placeholder="e.g. 145.9"
                            value={fuelPrice}
                            onChange={(e) => setFuelPrice(e.target.value)}
                            required
                        />
                        <p className="text-xs text-muted-foreground mt-1">Average UK price format (e.g. 145.9p = £1.45/L)</p>
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
        </div>
    );
}
