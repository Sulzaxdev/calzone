"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";

export default function MileageCalculator() {
    const [miles, setMiles] = useState("");
    const [rate, setRate] = useState("45"); // UK standard AMAP rate

    const [result, setResult] = useState<{ amount: string } | null>(null);

    const calculateMileage = (e: React.FormEvent) => {
        e.preventDefault();
        const m = parseFloat(miles);
        const r = parseFloat(rate);

        if (m > 0 && r > 0) {
            const total = (m * r) / 100; // rate in pence -> pounds
            setResult({ amount: total.toFixed(2) });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <CalculatorCard
                title="Mileage Reimbursement Calculator"
                description="Calculate your tax-free mileage claim amount for business travel."
            >
                <form onSubmit={calculateMileage} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="miles">Business Miles Driven</Label>
                        <Input
                            id="miles"
                            type="number"
                            placeholder="e.g. 150"
                            value={miles}
                            onChange={(e) => setMiles(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="rate">Reimbursement Rate (pence per mile)</Label>
                        <Input
                            id="rate"
                            type="number"
                            step="0.1"
                            placeholder="e.g. 45"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                            required
                        />
                        <p className="text-xs text-muted-foreground mt-1">HMRC standard rate for first 10,000 miles is 45p.</p>
                    </div>

                    <Button type="submit" className="w-full text-lg h-12">Calculate Claim</Button>
                </form>

                {result && (
                    <div className="mt-8 p-6 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 text-center animate-in zoom-in-95 duration-300">
                        <div className="flex justify-center items-center gap-2 mb-4">
                            <Car className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                            <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-200">Reimbursement Amount</h3>
                        </div>
                        <div className="text-5xl font-extrabold mb-2 text-indigo-600 dark:text-indigo-400">
                            £{result.amount}
                        </div>
                    </div>
                )}
            </CalculatorCard>
        </div>
    );
}
