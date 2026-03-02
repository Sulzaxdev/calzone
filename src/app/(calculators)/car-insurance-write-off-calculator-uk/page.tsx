"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertOctagon } from "lucide-react";

export default function CarWriteOffCalculator() {
    const [marketValue, setMarketValue] = useState("");
    const [repairCost, setRepairCost] = useState("");
    const [salvageValue, setSalvageValue] = useState("");

    const [result, setResult] = useState<{
        isWriteOff: boolean;
        category: string;
        payout: number
    } | null>(null);

    const calculateWriteOff = (e: React.FormEvent) => {
        e.preventDefault();
        const market = parseFloat(marketValue);
        const repair = parseFloat(repairCost);
        const salvage = parseFloat(salvageValue) || 0; // Optional

        if (market > 0 && repair > 0) {
            // General UK Write-Off Logic (ABI Categories)
            // Usually written off if Repair Cost + Salvage Value > Market Value
            // Or simply if Repair > 50-60% of Market Value for modern cars

            const threshold = market * 0.60;
            let isWriteOff = false;
            let category = "Not a Write-Off (Repairable)";

            if (repair + salvage > market || repair > threshold) {
                isWriteOff = true;
                // Extremely basic category estimation
                if (repair > market * 1.5) {
                    category = "Category A or B (Scrap/Break for parts)";
                } else if (repair > market) {
                    category = "Category S (Structural Damage)";
                } else {
                    category = "Category N (Non-Structural Damage / Uneconomical to repair)";
                }
            }

            setResult({
                isWriteOff,
                category,
                // Assuming 0 excess for this generic estimation
                payout: isWriteOff ? market : 0
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <CalculatorCard
                title="Car Insurance Write-Off Estimator"
                description="Estimate if your vehicle is likely to be declared a total loss by your insurer based on repair costs."
                hasResult={!!result}
            >
                <form onSubmit={calculateWriteOff} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="market">Current Market Value of Car (£)</Label>
                        <Input
                            id="market"
                            type="number"
                            placeholder="e.g. 5000"
                            value={marketValue}
                            onChange={(e) => setMarketValue(e.target.value)}
                            required
                        />
                        <p className="text-xs text-muted-foreground mt-1">What the car was worth right before the accident.</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="repair">Estimated Repair Cost (£)</Label>
                        <Input
                            id="repair"
                            type="number"
                            placeholder="e.g. 3500"
                            value={repairCost}
                            onChange={(e) => setRepairCost(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="salvage">Estimated Salvage Value (£) [Optional]</Label>
                        <Input
                            id="salvage"
                            type="number"
                            placeholder="e.g. 500"
                            value={salvageValue}
                            onChange={(e) => setSalvageValue(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground mt-1">What the damaged car can be sold for as scrap/parts.</p>
                    </div>

                    <Button type="submit" variant="destructive" className="w-full text-lg h-12">Assess Damage</Button>
                </form>

                {result && (
                    <div className={`mt-8 p-6 rounded-xl text-center animate-in zoom-in-95 duration-300 border ${result.isWriteOff ? 'bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-900' : 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-900'}`}>
                        <div className="flex justify-center items-center gap-2 mb-4">
                            <AlertOctagon className={`h-6 w-6 ${result.isWriteOff ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`} />
                            <h3 className={`text-xl font-bold ${result.isWriteOff ? 'text-red-800 dark:text-red-200' : 'text-green-800 dark:text-green-200'}`}>
                                {result.isWriteOff ? 'Likely a Write-Off' : 'Likely Repairable'}
                            </h3>
                        </div>

                        <div className="space-y-2 text-left bg-background/50 p-4 rounded-lg">
                            <p className="font-medium">Estimated Status: <span className="font-bold">{result.category}</span></p>
                            {result.isWriteOff && (
                                <p className="font-medium pt-2 border-t text-red-700 dark:text-red-400">
                                    Estimated Payout (before excess): <span className="font-bold tracking-tight text-xl">£{result.payout.toLocaleString()}</span>
                                </p>
                            )}
                        </div>

                        <p className="text-xs text-muted-foreground mt-4">
                            Disclaimer: The exact threshold for a write-off varies massively by insurer (often between 50% to 100% of market value).
                        </p>
                    </div>
                )}
            </CalculatorCard>
        </div>
    );
}
