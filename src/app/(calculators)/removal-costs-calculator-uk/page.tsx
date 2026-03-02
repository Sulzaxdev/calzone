"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Truck } from "lucide-react";

export default function RemovalCostsCalculator() {
    const [bedrooms, setBedrooms] = useState("2");
    const [distance, setDistance] = useState("25");
    const [packing, setPacking] = useState("no");

    const [result, setResult] = useState<{ min: number; max: number } | null>(null);

    const calculateCost = (e: React.FormEvent) => {
        e.preventDefault();
        const b = parseInt(bedrooms);
        const d = parseInt(distance);

        if (b > 0 && d >= 0) {
            // Very generic UK moving averages
            let baseCost = 0;

            switch (b) {
                case 1: baseCost = 600; break;
                case 2: baseCost = 850; break;
                case 3: baseCost = 1200; break;
                case 4: baseCost = 1600; break;
                default: baseCost = 2000;
            }

            // Add mileage cost over 10 miles (approx £1.50 per extra mile)
            if (d > 10) {
                baseCost += (d - 10) * 1.5;
            }

            // Professional packing service adds approx £250 per bedroom
            if (packing === "yes") {
                baseCost += (b * 250);
            }

            // Add ±15% range for regional variance
            setResult({
                min: Math.round(baseCost * 0.85),
                max: Math.round(baseCost * 1.15)
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <CalculatorCard
                title="House Removal Costs Calculator"
                description="Estimate the cost of hiring a professional removal firm for your house move in the UK."
                hasResult={!!result}
            >
                <form onSubmit={calculateCost} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="beds">Property Size</Label>
                            <Select value={bedrooms} onValueChange={setBedrooms}>
                                <SelectTrigger id="beds">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1 Bedroom</SelectItem>
                                    <SelectItem value="2">2 Bedrooms</SelectItem>
                                    <SelectItem value="3">3 Bedrooms</SelectItem>
                                    <SelectItem value="4">4 Bedrooms</SelectItem>
                                    <SelectItem value="5">5+ Bedrooms</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="distance">Moving Distance (Miles)</Label>
                            <Input
                                id="distance"
                                type="number"
                                placeholder="e.g. 25"
                                value={distance}
                                onChange={(e) => setDistance(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2 border-t pt-4">
                        <Label htmlFor="packing">Include Professional Packing Service?</Label>
                        <Select value={packing} onValueChange={setPacking}>
                            <SelectTrigger id="packing">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="yes">Yes, pack everything</SelectItem>
                                <SelectItem value="no">No, I will pack myself</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground mt-1">Packing services significantly reduce stress but increase costs.</p>
                    </div>

                    <Button type="submit" className="w-full text-lg h-12">Estimate Removal Cost</Button>
                </form>

                {result && (
                    <div className="mt-8 p-6 rounded-xl bg-slate-100 dark:bg-slate-800 text-center animate-in zoom-in-95 duration-300">
                        <div className="flex justify-center items-center gap-2 mb-4">
                            <Truck className="h-6 w-6 text-slate-700 dark:text-slate-300" />
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Estimated Quote Range</h3>
                        </div>
                        <div className="text-4xl font-extrabold mb-2 text-slate-700 dark:text-slate-200">
                            £{result.min.toLocaleString()} - £{result.max.toLocaleString()}
                        </div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2">
                            Includes loading, transit, and unloading.
                        </p>
                    </div>
                )}
            </CalculatorCard>
        </div>
    );
}
