"use client";

import React, { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Activity, BatteryWarning, Scaling, Footprints, Info } from "lucide-react";
import { calculateFrailtyScore, FrailtyInputs, FrailtyResult } from "@/lib/frailty-logic";

export function FrailtyCalculatorForm() {
    const [inputs, setInputs] = useState<Partial<FrailtyInputs>>({});
    const [result, setResult] = useState<FrailtyResult | null>(null);
    const [error, setError] = useState("");

    const isComplete = () => {
        return (
            inputs.fatigue !== undefined &&
            inputs.resistance !== undefined &&
            inputs.ambulation !== undefined &&
            inputs.weightLoss !== undefined &&
            inputs.illnesses !== undefined
        );
    };

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!isComplete()) {
            setError("Please answer all 5 questions to calculate your frailty score.");
            return;
        }

        const res = calculateFrailtyScore(inputs as FrailtyInputs);
        setResult(res);
    };

    const updateInput = (key: keyof FrailtyInputs, value: boolean | number) => {
        setInputs(prev => ({ ...prev, [key]: value }));
        setResult(null); // Reset result when inputs change
    };

    return (
        <CalculatorCard
            title="Frailty Score Calculator"
            description="Assess physical decline, fatigue, and mobility using the clinical FRAIL scale screening tool."
            hasResult={!!result}
        >
            <form onSubmit={handleCalculate} className="space-y-8 animate-in fade-in transition-all duration-300">

                <div className="space-y-6">
                    {/* 1. Fatigue */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <Label className="font-semibold text-lg flex items-center gap-2 mb-4">
                            <BatteryWarning className="w-5 h-5 text-orange-500" />
                            1. Fatigue
                        </Label>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">"Are you fatigued most of the time? (Do you feel tired even after resting?)"</p>
                        <RadioGroup
                            value={inputs.fatigue === undefined ? undefined : String(inputs.fatigue)}
                            onValueChange={(val) => updateInput("fatigue", val === "true")}
                            className="flex gap-4"
                        >
                            <label className={`flex-1 flex items-center space-x-2 px-4 py-3 rounded-xl border cursor-pointer transition-colors ${inputs.fatigue === true ? 'border-primary bg-primary/5' : 'bg-white dark:bg-slate-900'}`}>
                                <RadioGroupItem value="true" id="fatigue-yes" />
                                <span className="font-medium">Yes</span>
                            </label>
                            <label className={`flex-1 flex items-center space-x-2 px-4 py-3 rounded-xl border cursor-pointer transition-colors ${inputs.fatigue === false ? 'border-primary bg-primary/5' : 'bg-white dark:bg-slate-900'}`}>
                                <RadioGroupItem value="false" id="fatigue-no" />
                                <span className="font-medium">No</span>
                            </label>
                        </RadioGroup>
                    </div>

                    {/* 2. Resistance */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <Label className="font-semibold text-lg flex items-center gap-2 mb-4">
                            <Activity className="w-5 h-5 text-indigo-500" />
                            2. Resistance
                        </Label>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">"By yourself and not using aids, do you have any difficulty climbing a single flight of stairs?"</p>
                        <RadioGroup
                            value={inputs.resistance === undefined ? undefined : String(inputs.resistance)}
                            onValueChange={(val) => updateInput("resistance", val === "true")}
                            className="flex gap-4"
                        >
                            <label className={`flex-1 flex items-center space-x-2 px-4 py-3 rounded-xl border cursor-pointer transition-colors ${inputs.resistance === true ? 'border-primary bg-primary/5' : 'bg-white dark:bg-slate-900'}`}>
                                <RadioGroupItem value="true" id="res-yes" />
                                <span className="font-medium">Yes (Difficulty)</span>
                            </label>
                            <label className={`flex-1 flex items-center space-x-2 px-4 py-3 rounded-xl border cursor-pointer transition-colors ${inputs.resistance === false ? 'border-primary bg-primary/5' : 'bg-white dark:bg-slate-900'}`}>
                                <RadioGroupItem value="false" id="res-no" />
                                <span className="font-medium">No</span>
                            </label>
                        </RadioGroup>
                    </div>

                    {/* 3. Ambulation */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <Label className="font-semibold text-lg flex items-center gap-2 mb-4">
                            <Footprints className="w-5 h-5 text-blue-500" />
                            3. Ambulation
                        </Label>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">"By yourself and not using aids, do you have any difficulty walking one block (approx. 100 meters)?"</p>
                        <RadioGroup
                            value={inputs.ambulation === undefined ? undefined : String(inputs.ambulation)}
                            onValueChange={(val) => updateInput("ambulation", val === "true")}
                            className="flex gap-4"
                        >
                            <label className={`flex-1 flex items-center space-x-2 px-4 py-3 rounded-xl border cursor-pointer transition-colors ${inputs.ambulation === true ? 'border-primary bg-primary/5' : 'bg-white dark:bg-slate-900'}`}>
                                <RadioGroupItem value="true" id="amb-yes" />
                                <span className="font-medium">Yes (Difficulty)</span>
                            </label>
                            <label className={`flex-1 flex items-center space-x-2 px-4 py-3 rounded-xl border cursor-pointer transition-colors ${inputs.ambulation === false ? 'border-primary bg-primary/5' : 'bg-white dark:bg-slate-900'}`}>
                                <RadioGroupItem value="false" id="amb-no" />
                                <span className="font-medium">No</span>
                            </label>
                        </RadioGroup>
                    </div>

                    {/* 4. Illness */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <Label className="font-semibold text-lg flex items-center gap-2 mb-4">
                            <Info className="w-5 h-5 text-red-500" />
                            4. Illnesses
                        </Label>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                            Has a doctor ever told you that you have any of the following? (Hypertension, cancer, diabetes, chronic lung disease, heart attack, heart failure/angina, asthma, arthritis, stroke, kidney disease)
                        </p>
                        <RadioGroup
                            value={inputs.illnesses === undefined ? undefined : inputs.illnesses >= 5 ? "5" : "0"}
                            onValueChange={(val) => updateInput("illnesses", parseInt(val))}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <label className={`flex-1 flex items-center space-x-2 px-4 py-3 rounded-xl border cursor-pointer transition-colors ${inputs.illnesses === 0 ? 'border-primary bg-primary/5' : 'bg-white dark:bg-slate-900'}`}>
                                <RadioGroupItem value="0" id="ill-lt5" />
                                <span className="font-medium">0 to 4 Illnesses</span>
                            </label>
                            <label className={`flex-1 flex items-center space-x-2 px-4 py-3 rounded-xl border cursor-pointer transition-colors ${inputs.illnesses === 5 ? 'border-primary bg-primary/5' : 'bg-white dark:bg-slate-900'}`}>
                                <RadioGroupItem value="5" id="ill-5plus" />
                                <span className="font-medium">5 or more Illnesses</span>
                            </label>
                        </RadioGroup>
                    </div>

                    {/* 5. Loss of Weight */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <Label className="font-semibold text-lg flex items-center gap-2 mb-4">
                            <Scaling className="w-5 h-5 text-emerald-500" />
                            5. Loss of Weight
                        </Label>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">"Have you unintentionally lost more than 5% of your body weight in the last year?"</p>
                        <RadioGroup
                            value={inputs.weightLoss === undefined ? undefined : String(inputs.weightLoss)}
                            onValueChange={(val) => updateInput("weightLoss", val === "true")}
                            className="flex gap-4"
                        >
                            <label className={`flex-1 flex items-center space-x-2 px-4 py-3 rounded-xl border cursor-pointer transition-colors ${inputs.weightLoss === true ? 'border-primary bg-primary/5' : 'bg-white dark:bg-slate-900'}`}>
                                <RadioGroupItem value="true" id="wl-yes" />
                                <span className="font-medium">Yes</span>
                            </label>
                            <label className={`flex-1 flex items-center space-x-2 px-4 py-3 rounded-xl border cursor-pointer transition-colors ${inputs.weightLoss === false ? 'border-primary bg-primary/5' : 'bg-white dark:bg-slate-900'}`}>
                                <RadioGroupItem value="false" id="wl-no" />
                                <span className="font-medium">No</span>
                            </label>
                        </RadioGroup>
                    </div>

                </div>

                {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-950/30 text-red-600 rounded-xl text-sm font-medium border border-red-200 dark:border-red-900/50 flex items-center gap-2">
                        <Info className="w-5 h-5 shrink-0" />
                        {error}
                    </div>
                )}

                <Button type="submit" size="lg" className="w-full text-lg h-14 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all font-bold">
                    Calculate Frailty Score
                </Button>
            </form>

            {result && (
                <div className="mt-12 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="p-8 rounded-3xl bg-slate-100 dark:bg-slate-900 border text-center relative overflow-hidden">

                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Your FRAIL Score</h3>
                        <div className="flex justify-center items-end gap-2 mb-2">
                            <span className="text-7xl font-black text-slate-800 dark:text-slate-100 leading-none">{result.score}</span>
                            <span className="text-2xl font-bold text-slate-400 mb-1">/ 5</span>
                        </div>

                        <div className={`mt-6 inline-block px-6 py-2 rounded-full font-bold text-lg uppercase tracking-wide
                            ${result.category === 'Robust' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                result.category === 'Pre-frail' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}
                        >
                            {result.category}
                        </div>
                        <p className="mt-4 text-slate-600 dark:text-slate-400">
                            {result.description}
                        </p>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                        <h4 className="font-bold text-lg text-blue-900 dark:text-blue-300 mb-4 flex items-center gap-2">
                            <Activity className="w-5 h-5" /> Clinical Next Steps
                        </h4>
                        <ul className="space-y-3">
                            {result.clinicalInsights.map((insight, i) => (
                                <li key={i} className="flex gap-3 text-sm text-blue-800 dark:text-blue-200">
                                    <div className="min-w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                                    <span className="leading-relaxed">{insight}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </CalculatorCard>
    );
}
