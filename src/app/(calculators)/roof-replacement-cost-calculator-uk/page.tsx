"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home } from "lucide-react";

export default function RoofCostCalculator() {
    const [area, setArea] = useState("");
    const [material, setMaterial] = useState("concrete_tiles");

    const [result, setResult] = useState<{ min: number; max: number } | null>(null);

    const calculateCost = (e: React.FormEvent) => {
        e.preventDefault();
        const sqMeter = parseFloat(area);

        if (sqMeter > 0) {
            // Very rough UK averages per sq meter (including labor, materials, scaffolding, waste)
            let ratePerSqm = 0;

            switch (material) {
                case "flat_felt":
                    ratePerSqm = 60; break;
                case "flat_rubber":
                    ratePerSqm = 90; break;
                case "flat_fibreglass":
                    ratePerSqm = 100; break;
                case "concrete_tiles":
                    ratePerSqm = 160; break;
                case "clay_tiles":
                    ratePerSqm = 190; break;
                case "natural_slate":
                    ratePerSqm = 220; break;
                default:
                    ratePerSqm = 160;
            }

            // Add standard baseline cost for small jobs / scaffolding setup (e.g. £1000 minimum overhead)
            let baseCost = (sqMeter * ratePerSqm) + 1000;

            // Calculate a range (+/- 15% for variance in location/complexity)
            setResult({
                min: Math.round(baseCost * 0.85),
                max: Math.round(baseCost * 1.15)
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <CalculatorCard
                title="Roof Replacement Cost Calculator"
                description="Estimate the cost of replacing your roof in the UK based on area and material type."
                hasResult={!!result}
            >
                <form onSubmit={calculateCost} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="area">Roof Area (Square Meters)</Label>
                        <Input
                            id="area"
                            type="number"
                            placeholder="e.g. 60"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            required
                        />
                        <p className="text-xs text-muted-foreground mt-1">Found by multiplying roof length by width/slope.</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="material">Roof Material</Label>
                        <Select value={material} onValueChange={setMaterial}>
                            <SelectTrigger id="material">
                                <SelectValue placeholder="Select material" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="concrete_tiles">Concrete Tiles (Pitched)</SelectItem>
                                <SelectItem value="clay_tiles">Clay Tiles (Pitched)</SelectItem>
                                <SelectItem value="natural_slate">Natural Slate (Pitched)</SelectItem>
                                <SelectItem value="flat_felt">Felt (Flat Roof)</SelectItem>
                                <SelectItem value="flat_rubber">EPDM Rubber (Flat Roof)</SelectItem>
                                <SelectItem value="flat_fibreglass">Fibreglass / GRP (Flat Roof)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button type="submit" className="w-full text-lg h-12">Estimate Replacement Cost</Button>
                </form>

                {result && (
                    <div className="mt-8 p-6 rounded-xl bg-orange-50 dark:bg-orange-950/30 text-center animate-in zoom-in-95 duration-300">
                        <div className="flex justify-center items-center gap-2 mb-4">
                            <Home className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                            <h3 className="text-xl font-bold text-orange-800 dark:text-orange-200">Estimated Total Cost</h3>
                        </div>
                        <div className="text-4xl font-extrabold mb-2 text-orange-600 dark:text-orange-400">
                            £{result.min.toLocaleString()} - £{result.max.toLocaleString()}
                        </div>
                        <p className="text-sm font-medium text-orange-700 dark:text-orange-300 max-w-sm mx-auto">
                            Includes estimates for materials, labor, scaffolding, and waste disposal. Prices vary widely by region.
                        </p>
                    </div>
                )}
            </CalculatorCard>
        </div>
    );
}
