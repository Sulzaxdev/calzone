"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

export default function CarInsuranceCalculator() {
    const [age, setAge] = useState("");
    const [carValue, setCarValue] = useState("");
    const [yearsNoClaims, setYearsNoClaims] = useState("");

    const [result, setResult] = useState<{ premium: number } | null>(null);

    const calculateEstimate = (e: React.FormEvent) => {
        e.preventDefault();
        const a = parseInt(age);
        const val = parseFloat(carValue);
        const ncb = parseInt(yearsNoClaims);

        if (a > 0 && val > 0 && ncb >= 0) {
            // Extremely generic rough formula for demo purposes
            // Base rate
            let base = 600;

            // Age modifier
            if (a < 21) base *= 2.5;
            else if (a < 25) base *= 1.8;
            else if (a < 30) base *= 1.3;
            else if (a > 70) base *= 1.2;

            // Value modifier (add 2% of car value)
            base += (val * 0.02);

            // No claims discount (approx 10% per year, maxing at 65% for 9+ years)
            let ncbDiscount = ncb * 0.10;
            if (ncbDiscount > 0.65) ncbDiscount = 0.65;

            base = base * (1 - ncbDiscount);

            setResult({ premium: Math.round(base) });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <CalculatorCard
                title="Car Insurance Estimator"
                description="Get a rough ball-park figure for comprehensive car insurance based on generic age and value metrics."
            >
                <form onSubmit={calculateEstimate} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="age">Driver Age</Label>
                            <Input
                                id="age"
                                type="number"
                                placeholder="e.g. 35"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="ncb">Years No Claims</Label>
                            <Input
                                id="ncb"
                                type="number"
                                placeholder="e.g. 5"
                                value={yearsNoClaims}
                                onChange={(e) => setYearsNoClaims(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="value">Estimated Car Value (£)</Label>
                        <Input
                            id="value"
                            type="number"
                            placeholder="e.g. 15000"
                            value={carValue}
                            onChange={(e) => setCarValue(e.target.value)}
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full text-lg h-12">Estimate Premium</Button>
                </form>

                {result && (
                    <div className="mt-8 p-6 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-center animate-in zoom-in-95 duration-300">
                        <div className="flex justify-center items-center gap-2 mb-4">
                            <ShieldCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200">Estimated Annual Premium</h3>
                        </div>
                        <div className="text-4xl font-extrabold mb-2 text-blue-600 dark:text-blue-400">
                            ~£{result.premium.toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground mt-4 max-w-sm mx-auto">
                            This is a demonstration estimator and does NOT reflect real quotes from insurers. It ignores critical factors like postcode, occupation, and vehicle insurance group.
                        </p>
                    </div>
                )}
            </CalculatorCard>
        </div>
    );
}
