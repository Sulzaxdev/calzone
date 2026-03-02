"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Baby, AlertCircle, RotateCcw, TrendingUp } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type Unit = "metric" | "imperial";
type Gender = "boy" | "girl";

export function ChildGrowthCalculatorForm() {
    const [unit, setUnit] = useState<Unit>("metric");
    const [gender, setGender] = useState<Gender>("boy");
    const [ageYears, setAgeYears] = useState("");
    const [ageMonths, setAgeMonths] = useState("");

    // Child Measurements
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");

    // Parent Measurements (Adult Height Prediction)
    const [dadHeight, setDadHeight] = useState("");
    const [momHeight, setMomHeight] = useState("");

    const [error, setError] = useState("");
    const [result, setResult] = useState<any>(null);

    const calculateGrowth = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        let y = parseInt(ageYears) || 0;
        let m = parseInt(ageMonths) || 0;
        let totalMonths = (y * 12) + m;

        if (totalMonths === 0 || totalMonths > 216) { // Max 18 years
            setError("Please enter a valid age between 1 month and 18 years.");
            return;
        }

        let w = parseFloat(weight);
        let h = parseFloat(height);

        if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
            setError("Please enter valid height and weight measurements.");
            return;
        }

        // Convert to metric for internal calculations
        let wKg = unit === "metric" ? w : w * 0.453592;
        let hCm = unit === "metric" ? h : h * 2.54;
        let heightInMeters = hCm / 100;

        // BMI
        const bmi = wKg / (heightInMeters * heightInMeters);

        // Highly simplified "average" estimates (NOT MEDICAL ADVICE - requires CDC tables for exact percentiles)
        // Using standard linear approximations for demonstration.
        let estWeight = 0;
        let estHeight = 0;
        let weightPercentile = 50;
        let heightPercentile = 50;

        if (totalMonths <= 12) {
            estWeight = gender === "boy" ? 3.3 + (totalMonths * 0.6) : 3.2 + (totalMonths * 0.55);
            estHeight = gender === "boy" ? 50 + (totalMonths * 2) : 49 + (totalMonths * 1.9);
        } else if (totalMonths <= 60) {
            const yearsFloat = totalMonths / 12;
            estWeight = gender === "boy" ? 9.5 + (yearsFloat * 2) : 9 + (yearsFloat * 1.9);
            estHeight = gender === "boy" ? 75 + (yearsFloat * 6) : 74 + (yearsFloat * 6);
        } else {
            const yearsFloat = totalMonths / 12;
            estWeight = gender === "boy" ? 18 + ((yearsFloat - 5) * 2.5) : 17.5 + ((yearsFloat - 5) * 2.5);
            estHeight = gender === "boy" ? 110 + ((yearsFloat - 5) * 6) : 109 + ((yearsFloat - 5) * 6);
        }

        // Faux Percentile calculation based on standard deviation approximations
        const weightDiffPct = ((wKg - estWeight) / estWeight) * 100;
        weightPercentile = Math.max(1, Math.min(99, Math.round(50 + (weightDiffPct * 1.5))));

        const heightDiffPct = ((hCm - estHeight) / estHeight) * 100;
        heightPercentile = Math.max(1, Math.min(99, Math.round(50 + (heightDiffPct * 2.5))));

        let status = "Healthy Weight";
        if (bmi < 14) status = "Underweight";
        else if (bmi > 18.5 && totalMonths < 120) status = "Risk of Overweight";
        else if (bmi > 21) status = "Overweight";
        else if (weightPercentile > 95) status = "Obese";

        // Adult Height Prediction (Mid-Parental Height Formula)
        let predictedHeightCm = 0;
        let dadH = parseFloat(dadHeight);
        let momH = parseFloat(momHeight);

        if (!isNaN(dadH) && !isNaN(momH) && dadH > 0 && momH > 0) {
            let dadCm = unit === "metric" ? dadH : dadH * 2.54;
            let momCm = unit === "metric" ? momH : momH * 2.54;

            if (gender === "boy") {
                predictedHeightCm = (dadCm + momCm + 13) / 2;
            } else {
                predictedHeightCm = (dadCm + momCm - 13) / 2;
            }
        }

        setResult({
            bmi: bmi.toFixed(1),
            status,
            weightPercentile,
            heightPercentile,
            predictedHeightStr: predictedHeightCm > 0 ?
                (unit === "metric" ? `${predictedHeightCm.toFixed(1)} cm` : `${(predictedHeightCm / 2.54).toFixed(1)} inches`)
                : null
        });
    };

    const handleClear = () => {
        setAgeYears(""); setAgeMonths(""); setWeight(""); setHeight(""); setDadHeight(""); setMomHeight(""); setResult(null); setError("");
    };

    return (
        <CalculatorCard
            title="Child Growth Estimator"
            description="Estimate height, weight, and BMI percentiles based on simplified generic growth charts. Optionally predict adult height using parental data."
        >
            <form onSubmit={calculateGrowth} className="space-y-8">
                {/* Top Toggles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div className="space-y-4">
                        <Label>Measurement Unit</Label>
                        <RadioGroup defaultValue="metric" onValueChange={(val) => { setUnit(val as Unit); setResult(null); }} className="flex gap-4">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="metric" id="metric" />
                                <Label htmlFor="metric">Metric (cm / kg)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="imperial" id="imperial" />
                                <Label htmlFor="imperial">Imperial (in / lbs)</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="space-y-4">
                        <Label>Child's Gender</Label>
                        <RadioGroup defaultValue="boy" onValueChange={(val) => setGender(val as Gender)} className="flex gap-4">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="boy" id="boy" />
                                <Label htmlFor="boy">Boy</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="girl" id="girl" />
                                <Label htmlFor="girl">Girl</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>

                {/* Child Age */}
                <div>
                    <Label className="font-semibold text-slate-700 dark:text-slate-300 mb-2 block">Child's Age</Label>
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            type="number"
                            placeholder="Years (0-18)"
                            value={ageYears}
                            onChange={(e) => setAgeYears(e.target.value)}
                            className="h-12"
                        />
                        <Input
                            type="number"
                            placeholder="Months (0-11)"
                            value={ageMonths}
                            onChange={(e) => setAgeMonths(e.target.value)}
                            max="11"
                            className="h-12"
                        />
                    </div>
                </div>

                {/* Child Measurements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label className="font-semibold text-slate-700 dark:text-slate-300">Height / Length ({unit === 'metric' ? 'cm' : 'inches'})</Label>
                        <Input
                            type="number"
                            step="0.1"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="h-12 text-lg"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="font-semibold text-slate-700 dark:text-slate-300">Weight ({unit === 'metric' ? 'kg' : 'lbs'})</Label>
                        <Input
                            type="number"
                            step="0.1"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="h-12 text-lg"
                            required
                        />
                    </div>
                </div>

                {/* Optional Parent Measurements */}
                <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                        <Label className="font-semibold text-slate-700 dark:text-slate-300">Adult Height Prediction (Optional)</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <AlertCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="w-48 text-xs">Uses the Mid-Parental Height formula to estimate the child's final adult height based on genetics.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-sm">Father's Height ({unit === 'metric' ? 'cm' : 'inches'})</Label>
                            <Input
                                type="number"
                                step="0.1"
                                value={dadHeight}
                                onChange={(e) => setDadHeight(e.target.value)}
                                className="h-10"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm">Mother's Height ({unit === 'metric' ? 'cm' : 'inches'})</Label>
                            <Input
                                type="number"
                                step="0.1"
                                value={momHeight}
                                onChange={(e) => setMomHeight(e.target.value)}
                                className="h-10"
                            />
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-950/30 text-red-600 rounded-lg text-sm font-medium flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        {error}
                    </div>
                )}

                <div className="flex gap-4 pt-4">
                    <Button type="button" variant="outline" onClick={handleClear} className="h-14 px-6">
                        <RotateCcw className="w-5 h-5" />
                    </Button>
                    <Button type="submit" className="flex-1 h-14 text-lg font-bold shadow-lg shadow-primary/20">
                        Analyze Growth
                    </Button>
                </div>
            </form>

            {/* RESULTS */}
            {result && (
                <div className="mt-10 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="p-8 rounded-3xl bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-900/30 text-center">
                        <div className="flex justify-center items-center gap-2 mb-6">
                            <Baby className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-200">Growth Assessment</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            <div className="bg-white/60 dark:bg-black/30 p-5 rounded-2xl shadow-sm border border-white/40">
                                <p className="text-sm font-semibold text-slate-500 mb-1 uppercase tracking-wide">Height Percentile</p>
                                <p className="text-4xl font-black text-slate-800 dark:text-slate-100">{result.heightPercentile}<span className="text-xl font-medium text-slate-500 ml-1">th</span></p>
                                <p className="text-xs text-slate-500 mt-2">Taller than {result.heightPercentile}% of peers</p>
                            </div>
                            <div className="bg-white/60 dark:bg-black/30 p-5 rounded-2xl shadow-sm border border-white/40">
                                <p className="text-sm font-semibold text-slate-500 mb-1 uppercase tracking-wide">Weight Percentile</p>
                                <p className="text-4xl font-black text-slate-800 dark:text-slate-100">{result.weightPercentile}<span className="text-xl font-medium text-slate-500 ml-1">th</span></p>
                                <p className="text-xs text-slate-500 mt-2">Heavier than {result.weightPercentile}% of peers</p>
                            </div>
                        </div>

                        <div className="bg-white/60 dark:bg-black/30 p-6 rounded-2xl shadow-sm border border-white/40 mb-6 flex flex-col items-center justify-center">
                            <p className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wide">Current Category</p>
                            <p className={`text-3xl font-black ${result.status === 'Healthy Weight' ? 'text-green-600' : 'text-orange-500'}`}>{result.status}</p>
                            <p className="text-sm text-slate-500 mt-2">Calculated BMI: {result.bmi}</p>
                        </div>

                        {result.predictedHeightStr && (
                            <div className="bg-indigo-100/50 dark:bg-indigo-900/30 p-6 rounded-2xl shadow-sm border border-indigo-200 dark:border-indigo-800/50">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                    <p className="text-sm font-semibold text-indigo-800 dark:text-indigo-200 uppercase tracking-wide">Adult Height Prediction</p>
                                </div>
                                <p className="text-3xl font-black text-indigo-700 dark:text-indigo-300">{result.predictedHeightStr}</p>
                                <p className="text-xs text-indigo-600/70 dark:text-indigo-400/70 mt-2">Based on Mid-Parental Genetic Formula</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </CalculatorCard>
    );
}
