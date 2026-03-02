"use client";

import React, { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Ruler, Info, Target, TrendingDown } from "lucide-react";
import { calculateWhtr, WhtrInputs, WhtrResult } from "@/lib/whtr-logic";

export function WhtrCalculatorForm() {
    const [unit, setUnit] = useState<"metric" | "imperial">("metric");

    // Metric state
    const [heightCm, setHeightCm] = useState("");
    const [waistCm, setWaistCm] = useState("");

    // Imperial state
    const [heightFt, setHeightFt] = useState("");
    const [heightIn, setHeightIn] = useState("");
    const [waistIn, setWaistIn] = useState("");

    const [error, setError] = useState("");
    const [result, setResult] = useState<WhtrResult | null>(null);

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        let inputs: WhtrInputs;

        if (unit === "metric") {
            const h = parseFloat(heightCm);
            const w = parseFloat(waistCm);
            if (!h || !w || h <= 0 || w <= 0) {
                setError("Please enter valid positive numbers for height and waist.");
                return;
            }
            inputs = {
                height: h,
                heightUnit: "cm",
                waist: w,
                waistUnit: "cm"
            };
        } else {
            const ft = parseFloat(heightFt) || 0;
            const inc = parseFloat(heightIn) || 0;
            const h = ft * 12 + inc;
            const w = parseFloat(waistIn);
            if (h <= 0 || !w || w <= 0) {
                setError("Please enter valid positive numbers for height and waist.");
                return;
            }
            inputs = {
                height: h,
                heightUnit: "in",
                waist: w,
                waistUnit: "in"
            };
        }

        const res = calculateWhtr(inputs);
        setResult(res);
    };

    const getRiskColors = (risk: string) => {
        switch (risk) {
            case "Underweight risk": return "text-blue-500 bg-blue-500/10 border-blue-200 dark:border-blue-900";
            case "Healthy": return "text-green-500 bg-green-500/10 border-green-200 dark:border-green-900";
            case "Increased Risk": return "text-yellow-600 dark:text-yellow-500 bg-yellow-500/10 border-yellow-200 dark:border-yellow-900";
            case "High Risk": return "text-red-500 bg-red-500/10 border-red-200 dark:border-red-900";
            default: return "text-primary bg-primary/10 border-primary/20";
        }
    };

    return (
        <CalculatorCard
            title="Waist-to-Height Ratio (WHtR)"
            description="A superior indicator for central obesity and cardiovascular risk compared to standard BMI."
            hasResult={!!result}
        >
            <Tabs defaultValue="metric" onValueChange={(val) => {
                setUnit(val as "metric" | "imperial");
                setResult(null);
                setError("");
            }} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-100 dark:bg-slate-900/50 p-1 rounded-2xl">
                    <TabsTrigger value="metric" className="rounded-xl">Metric (cm)</TabsTrigger>
                    <TabsTrigger value="imperial" className="rounded-xl">Imperial (ft, in)</TabsTrigger>
                </TabsList>

                <form onSubmit={handleCalculate} className="space-y-6">
                    <TabsContent value="metric" className="space-y-6 animate-in fade-in transition-all duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <div className="space-y-3">
                                <Label className="font-semibold flex items-center gap-2">
                                    <Ruler className="w-4 h-4 text-primary" /> Height (cm)
                                </Label>
                                <Input
                                    type="number"
                                    placeholder="e.g. 175"
                                    value={heightCm}
                                    onChange={(e) => setHeightCm(e.target.value)}
                                    className="h-12 text-lg"
                                    required={unit === "metric"}
                                />
                            </div>
                            <div className="space-y-3">
                                <Label className="font-semibold flex items-center gap-2">
                                    <Ruler className="w-4 h-4 text-orange-500" /> Waist (cm)
                                </Label>
                                <Input
                                    type="number"
                                    placeholder="e.g. 80"
                                    value={waistCm}
                                    onChange={(e) => setWaistCm(e.target.value)}
                                    className="h-12 text-lg"
                                    required={unit === "metric"}
                                />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="imperial" className="space-y-6 animate-in fade-in transition-all duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <div className="space-y-3">
                                <Label className="font-semibold flex items-center gap-2">
                                    <Ruler className="w-4 h-4 text-primary" /> Height (ft)
                                </Label>
                                <Input
                                    type="number"
                                    placeholder="5"
                                    value={heightFt}
                                    onChange={(e) => setHeightFt(e.target.value)}
                                    className="h-12 text-lg"
                                    required={unit === "imperial"}
                                />
                            </div>
                            <div className="space-y-3">
                                <Label className="font-semibold">Height (in)</Label>
                                <Input
                                    type="number"
                                    placeholder="9"
                                    value={heightIn}
                                    onChange={(e) => setHeightIn(e.target.value)}
                                    className="h-12 text-lg"
                                    required={unit === "imperial"}
                                />
                            </div>
                            <div className="space-y-3">
                                <Label className="font-semibold flex items-center gap-2">
                                    <Ruler className="w-4 h-4 text-orange-500" /> Waist (in)
                                </Label>
                                <Input
                                    type="number"
                                    placeholder="32"
                                    value={waistIn}
                                    onChange={(e) => setWaistIn(e.target.value)}
                                    className="h-12 text-lg"
                                    required={unit === "imperial"}
                                />
                            </div>
                        </div>
                    </TabsContent>

                    {error && (
                        <div className="p-4 bg-red-50 dark:bg-red-950/30 text-red-600 rounded-xl text-sm font-medium border border-red-200 dark:border-red-900/50 flex items-center gap-2">
                            <Info className="w-5 h-5 auto" />
                            {error}
                        </div>
                    )}

                    <Button type="submit" size="lg" className="w-full text-lg h-14 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all font-semibold">
                        Calculate WHtR
                    </Button>
                </form>
            </Tabs>

            {result && (
                <div className="mt-10 space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                    <div className={`p-8 rounded-3xl border text-center ${getRiskColors(result.riskLevel)}`}>
                        <h3 className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">Your Waist-to-Height Ratio</h3>
                        <div className="text-7xl font-black mb-4 drop-shadow-sm">
                            {result.ratio}
                        </div>
                        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full font-bold text-lg bg-white/50 dark:bg-black/20 border border-current/20 shadow-sm">
                            {result.riskLevel}
                        </div>
                    </div>

                    {/* Visual Risk Band */}
                    <div className="px-2">
                        <div className="w-full h-3 rounded-full flex overflow-hidden mb-2">
                            <div className="bg-blue-400 h-full" style={{ width: "40%" }}></div>
                            <div className="bg-green-500 h-full" style={{ width: "10%" }}></div>
                            <div className="bg-yellow-500 h-full" style={{ width: "10%" }}></div>
                            <div className="bg-red-500 h-full flex-1"></div>
                        </div>
                        <div className="flex justify-between text-xs font-bold text-muted-foreground">
                            <span>0.0</span>
                            <span className="pl-6">0.40</span>
                            <span>0.50</span>
                            <span>0.60+</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                        <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
                            <h4 className="font-semibold flex items-center gap-2 text-slate-800 dark:text-slate-200 mb-4">
                                <Target className="w-5 h-5 text-green-500" />
                                Ideal Waist Calculation
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Based on the golden rule (Height × 0.5), your ideal waist should be under:</p>
                            <div className="text-3xl font-bold text-green-600 dark:text-green-500">
                                {unit === 'metric' ? `${result.idealWaistCm} cm` : `${result.idealWaistIn} in`}
                            </div>
                        </div>

                        {result.differenceCm > 0 && (
                            <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/50 p-6 rounded-2xl shadow-sm">
                                <h4 className="font-semibold flex items-center gap-2 text-orange-800 dark:text-orange-200 mb-4">
                                    <TrendingDown className="w-5 h-5 text-orange-500" />
                                    Target Difference
                                </h4>
                                <p className="text-sm text-orange-700 dark:text-orange-300 mb-2">To reach a Healthy WHtR, you should aim to reduce your waist by roughly:</p>
                                <div className="text-3xl font-bold text-orange-600 dark:text-orange-500">
                                    {unit === 'metric' ? `${result.differenceCm} cm` : `${result.differenceIn} in`}
                                </div>
                            </div>
                        )}

                        {result.differenceCm <= 0 && (
                            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/50 p-6 rounded-2xl shadow-sm">
                                <h4 className="font-semibold flex items-center gap-2 text-green-800 dark:text-green-200 mb-4">
                                    <TrendingDown className="w-5 h-5 text-green-500" />
                                    Target Difference
                                </h4>
                                <p className="text-sm text-green-700 dark:text-green-300 mb-2">Excellent! Your waist is currently sitting comfortably below the maximum healthy threshold.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </CalculatorCard>
    );
}
