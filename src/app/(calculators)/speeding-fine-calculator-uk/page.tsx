"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Clock, AlertCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function SpeedingFineCalculator() {
    const [speedLimit, setSpeedLimit] = useState("30");
    const [actualSpeed, setActualSpeed] = useState("");
    const [weeklyIncome, setWeeklyIncome] = useState("");

    const [result, setResult] = useState<{
        band: string;
        points: string;
        fineEstimate: string;
        disqualification: string;
        warning: boolean;
    } | null>(null);

    const calculateFine = (e: React.FormEvent) => {
        e.preventDefault();

        const limit = parseInt(speedLimit);
        const speed = parseInt(actualSpeed);
        const income = parseFloat(weeklyIncome) || 0; // Prevent NaN

        if (speed <= limit) {
            setResult(null); // No fine
            return;
        }

        let band = "";
        let points = "";
        let disqualification = "";
        let finePercentage = 0;
        let warningLevel = false;

        // Simplified UK Sentencing Guidelines logic
        // Band A: 1-10mph over (in 20-30 zones) or 1-15mph over (in 40-70 zones)
        // Band B: 11-20mph over (20-30 zones) or 16-25mph over
        // Band C: 21+mph over (20-30 zones) or 26+mph over

        const overLimit = speed - limit;

        if (
            (limit <= 30 && overLimit <= 10 && overLimit > 0) ||
            (limit >= 40 && overLimit <= 15 && overLimit > 0)
        ) {
            band = "Band A";
            points = "3";
            disqualification = "None";
            finePercentage = 50; // 50% of relevant weekly income
        }
        else if (
            (limit <= 30 && overLimit >= 11 && overLimit <= 20) ||
            (limit >= 40 && overLimit >= 16 && overLimit <= 25)
        ) {
            band = "Band B";
            points = "4 - 6";
            disqualification = "7 - 28 Days";
            finePercentage = 100; // 100% of relevant weekly income
            warningLevel = true;
        }
        else {
            band = "Band C";
            points = "6";
            disqualification = "7 - 56 Days";
            finePercentage = 150; // 150% of relevant weekly income
            warningLevel = true;
        }

        // Maximum fine limits
        // Typically £1,000 max (or £2,500 on motorways)
        let maxFine = limit === 70 ? 2500 : 1000;

        // Estimate fine based on income
        let calculatedFine = income > 0 ? (income * (finePercentage / 100)) : 0;

        // Cap at max limit
        if (calculatedFine > maxFine) {
            calculatedFine = maxFine;
        }

        // Minimum fine is usually £100 (Fixed Penalty Notice)
        if (calculatedFine < 100) {
            calculatedFine = 100;
        }

        setResult({
            band,
            points,
            fineEstimate: `£${Math.round(calculatedFine)}`,
            disqualification,
            warning: warningLevel
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <CalculatorCard
                title="UK Speeding Fine Calculator"
                description="Estimate the penalty guidelines and fine band if caught speeding in the UK. Values are estimates based on standard magistrates' court guidelines."
                hasResult={!!result}
            >
                <form onSubmit={calculateFine} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="limit">Speed Limit (mph)</Label>
                            <Select value={speedLimit} onValueChange={setSpeedLimit}>
                                <SelectTrigger id="limit">
                                    <SelectValue placeholder="Limit" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="20">20 mph</SelectItem>
                                    <SelectItem value="30">30 mph</SelectItem>
                                    <SelectItem value="40">40 mph</SelectItem>
                                    <SelectItem value="50">50 mph</SelectItem>
                                    <SelectItem value="60">60 mph</SelectItem>
                                    <SelectItem value="70">70 mph</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="speed">Your Speed (mph)</Label>
                            <Input
                                id="speed"
                                type="number"
                                placeholder="e.g. 42"
                                value={actualSpeed}
                                onChange={(e) => setActualSpeed(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Label htmlFor="income">Weekly Income (After Tax)</Label>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger type="button">
                                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="w-56 text-xs">Fines in court are calculated as a percentage of your relevant weekly income (capped at max limit).</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-muted-foreground font-medium">£</span>
                            <Input
                                id="income"
                                type="number"
                                className="pl-8"
                                placeholder="e.g. 500"
                                value={weeklyIncome}
                                onChange={(e) => setWeeklyIncome(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <Button type="submit" variant="destructive" className="w-full text-lg h-12">Calculate Penalty</Button>
                </form>

                {result && (
                    <div className={`mt-8 p-6 rounded-xl text-center animate-in zoom-in-95 duration-300 border ${result.warning ? 'bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-900' : 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950/30 dark:border-yellow-900'}`}>
                        <div className="flex items-center justify-center gap-2 mb-6">
                            {result.warning && <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />}
                            <h3 className={`text-xl font-bold ${result.warning ? 'text-red-800 dark:text-red-200' : 'text-yellow-800 dark:text-yellow-200'}`}>
                                Penalty Estimate ({result.band})
                            </h3>
                        </div>

                        <div className="space-y-4 text-left px-4">
                            <div className="flex justify-between items-center pb-3 border-b border-foreground/10">
                                <span className="font-medium">Estimated Fine:</span>
                                <span className="text-2xl font-bold">{result.fineEstimate}</span>
                            </div>

                            <div className="flex justify-between items-center pb-3 border-b border-foreground/10">
                                <span className="font-medium">Penalty Points:</span>
                                <span className="text-xl font-bold text-destructive">{result.points}</span>
                            </div>

                            <div className="flex justify-between items-center pb-2">
                                <span className="font-medium">Potential Disqualification:</span>
                                <span className="text-lg font-bold">{result.disqualification}</span>
                            </div>

                            <p className="text-xs text-muted-foreground mt-4 text-center">
                                Note: A Fixed Penalty Notice (FPN) is usually £100 and 3 points for minor offenses if settled out of court.
                            </p>
                        </div>
                    </div>
                )}
            </CalculatorCard>
        </div>
    );
}
