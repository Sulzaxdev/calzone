"use client";

import React, { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Ruler, Activity, Info, TrendingUp, TrendingDown, Equal } from "lucide-react";
import { calculateApeIndex, ApeIndexInputs, ApeIndexResult } from "@/lib/ape-index-logic";

export function ApeIndexCalculatorForm() {
    const [unit, setUnit] = useState<"metric" | "imperial">("metric");

    // Metric state
    const [heightCm, setHeightCm] = useState("");
    const [spanCm, setSpanCm] = useState("");

    // Imperial state
    const [heightFeet, setHeightFeet] = useState("");
    const [heightInches, setHeightInches] = useState("");
    const [spanFeet, setSpanFeet] = useState("");
    const [spanInches, setSpanInches] = useState("");

    const [result, setResult] = useState<ApeIndexResult | null>(null);
    const [error, setError] = useState("");

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        let hCm = 0;
        let sCm = 0;

        if (unit === "metric") {
            hCm = parseFloat(heightCm);
            sCm = parseFloat(spanCm);
        } else {
            const hFt = parseFloat(heightFeet) || 0;
            const hIn = parseFloat(heightInches) || 0;
            const sFt = parseFloat(spanFeet) || 0;
            const sIn = parseFloat(spanInches) || 0;

            hCm = ((hFt * 12) + hIn) * 2.54;
            sCm = ((sFt * 12) + sIn) * 2.54;
        }

        if (!hCm || hCm <= 50 || hCm >= 300) {
            setError("Please enter a valid height.");
            return;
        }
        if (!sCm || sCm <= 50 || sCm >= 350) {
            setError("Please enter a valid arm span.");
            return;
        }

        const res = calculateApeIndex({ height: hCm, armSpan: sCm });
        setResult(res);
    };

    const resetResult = () => setResult(null);

    return (
        <CalculatorCard
            title="Ape Index Calculator"
            description="Compare your arm span to your height to discover your Ape Index and your unique athletic biomechanical advantages."
            hasResult={!!result}
        >
            <form onSubmit={handleCalculate} className="space-y-8 animate-in fade-in transition-all duration-300">

                <div className="flex justify-center mb-6">
                    <RadioGroup
                        defaultValue="metric"
                        value={unit}
                        onValueChange={(val) => {
                            setUnit(val as "metric" | "imperial");
                            resetResult();
                        }}
                        className="flex p-1 bg-slate-100 dark:bg-slate-900 rounded-xl"
                    >
                        <div className="flex items-center">
                            <RadioGroupItem value="metric" id="metric" className="peer sr-only" />
                            <Label
                                htmlFor="metric"
                                className="px-6 py-2 rounded-lg cursor-pointer transition-all peer-data-[state=checked]:bg-white peer-data-[state=checked]:dark:bg-slate-800 peer-data-[state=checked]:shadow-sm font-semibold text-slate-600 peer-data-[state=checked]:text-primary"
                            >
                                Metric (cm)
                            </Label>
                        </div>
                        <div className="flex items-center">
                            <RadioGroupItem value="imperial" id="imperial" className="peer sr-only" />
                            <Label
                                htmlFor="imperial"
                                className="px-6 py-2 rounded-lg cursor-pointer transition-all peer-data-[state=checked]:bg-white peer-data-[state=checked]:dark:bg-slate-800 peer-data-[state=checked]:shadow-sm font-semibold text-slate-600 peer-data-[state=checked]:text-primary"
                            >
                                Imperial (ft/in)
                            </Label>
                        </div>
                    </RadioGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">

                    {/* Height Inputs */}
                    <div className="space-y-4">
                        <Label className="font-semibold text-lg flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                            <Ruler className="w-5 h-5 text-blue-500" /> Your Height
                        </Label>
                        {unit === "metric" ? (
                            <div className="space-y-2">
                                <Label className="text-sm text-slate-500">Height (cm)</Label>
                                <Input
                                    type="number"
                                    placeholder="e.g. 175"
                                    value={heightCm}
                                    onChange={(e) => { setHeightCm(e.target.value); resetResult(); }}
                                    className="h-12 text-lg bg-white dark:bg-slate-900"
                                    required
                                />
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-sm text-slate-500">Feet</Label>
                                    <Input
                                        type="number"
                                        placeholder="e.g. 5"
                                        value={heightFeet}
                                        onChange={(e) => { setHeightFeet(e.target.value); resetResult(); }}
                                        className="h-12 text-lg bg-white dark:bg-slate-900"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm text-slate-500">Inches</Label>
                                    <Input
                                        type="number"
                                        placeholder="e.g. 9"
                                        value={heightInches}
                                        onChange={(e) => { setHeightInches(e.target.value); resetResult(); }}
                                        className="h-12 text-lg bg-white dark:bg-slate-900"
                                        required
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Arm Span Inputs */}
                    <div className="space-y-4">
                        <Label className="font-semibold text-lg flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                            <Activity className="w-5 h-5 text-green-500" /> Your Arm Span
                        </Label>
                        {unit === "metric" ? (
                            <div className="space-y-2">
                                <Label className="text-sm text-slate-500">Wingspan (cm)</Label>
                                <Input
                                    type="number"
                                    placeholder="e.g. 182"
                                    value={spanCm}
                                    onChange={(e) => { setSpanCm(e.target.value); resetResult(); }}
                                    className="h-12 text-lg bg-white dark:bg-slate-900"
                                    required
                                />
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-sm text-slate-500">Feet</Label>
                                    <Input
                                        type="number"
                                        placeholder="e.g. 6"
                                        value={spanFeet}
                                        onChange={(e) => { setSpanFeet(e.target.value); resetResult(); }}
                                        className="h-12 text-lg bg-white dark:bg-slate-900"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm text-slate-500">Inches</Label>
                                    <Input
                                        type="number"
                                        placeholder="e.g. 0"
                                        value={spanInches}
                                        onChange={(e) => { setSpanInches(e.target.value); resetResult(); }}
                                        className="h-12 text-lg bg-white dark:bg-slate-900"
                                        required
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                </div>

                {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-950/30 text-red-600 rounded-xl text-sm font-medium border border-red-200 dark:border-red-900/50 flex items-center gap-2">
                        <Info className="w-5 h-5 shrink-0" />
                        {error}
                    </div>
                )}

                <Button type="submit" size="lg" className="w-full text-lg h-14 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all font-bold">
                    Calculate Ape Index
                </Button>
            </form>

            {result && (
                <div className="mt-12 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Difference Metric */}
                        <div className="p-8 rounded-3xl bg-linear-to-br from-blue-500 to-indigo-600 text-white text-center shadow-xl relative overflow-hidden">
                            <h3 className="text-sm font-bold uppercase tracking-widest opacity-80 mb-4">Ape Index (Difference)</h3>
                            <div className="flex justify-center items-center gap-4">
                                {result.differenceCm > 0 ? <TrendingUp className="w-10 h-10 text-green-300" /> : result.differenceCm < 0 ? <TrendingDown className="w-10 h-10 text-red-300" /> : <Equal className="w-10 h-10 text-slate-300" />}
                                <div className="text-6xl font-black">{result.differenceCm > 0 ? `+${unit === 'imperial' ? result.differenceInches : result.differenceCm}` : unit === 'imperial' ? result.differenceInches : result.differenceCm}</div>
                            </div>
                            <p className="mt-2 text-indigo-100 font-medium">{unit === "imperial" ? "Inches" : "Centimeters"}</p>
                        </div>

                        {/* Ratio Metric */}
                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center flex flex-col justify-center">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Ape Index (Ratio)</h3>
                            <div className="text-5xl font-black text-slate-800 dark:text-slate-100 mb-2">{result.ratio}</div>
                            <p className={`font-bold uppercase text-sm ${result.category === 'Positive Ape Index' ? 'text-green-500' :
                                result.category === 'Negative Ape Index' ? 'text-red-500' : 'text-blue-500'
                                }`}>
                                {result.category}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                        <p className="leading-relaxed mb-6">{result.description}</p>

                        <h4 className="font-bold text-lg mb-4 text-slate-900 dark:text-slate-100 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-indigo-500" /> Athletic Advantages
                        </h4>
                        <ul className="space-y-3">
                            {result.sportsAdvantage.map((adv, i) => (
                                <li key={i} className="flex gap-3 text-sm">
                                    <div className="min-w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                                    <span className="leading-relaxed">{adv}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </CalculatorCard>
    );
}
