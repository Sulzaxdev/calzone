"use client";

import React, { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Info, Brain, Activity, Heart, Clock, Apple, Cigarette, Moon } from "lucide-react";
import { calculateLifeExpectancy, LifeExpectancyInputs, LifeExpectancyResult } from "@/lib/life-expectancy-logic";

export function LifeExpectancyCalculatorForm() {
    const [inputs, setInputs] = useState<Partial<LifeExpectancyInputs>>({
        gender: "female",
        smoking: "never",
        alcohol: "occasional",
        dietQuality: "average",
        stressLevel: "moderate"
    });

    const [error, setError] = useState("");
    const [result, setResult] = useState<LifeExpectancyResult | null>(null);

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!inputs.currentAge || inputs.currentAge < 18 || inputs.currentAge > 100) {
            setError("Please enter a valid age between 18 and 100.");
            return;
        }
        if (inputs.exerciseHoursPerWeek === undefined || inputs.exerciseHoursPerWeek < 0) {
            setError("Please enter valid exercise hours.");
            return;
        }
        if (!inputs.sleepHours || inputs.sleepHours < 2 || inputs.sleepHours > 16) {
            setError("Please enter valid average sleep hours (2-16).");
            return;
        }

        const res = calculateLifeExpectancy(inputs as LifeExpectancyInputs);
        setResult(res);
    };

    const updateInput = (key: keyof LifeExpectancyInputs, value: any) => {
        setInputs(prev => ({ ...prev, [key]: value }));
        setResult(null);
    };

    return (
        <CalculatorCard
            title="Life Expectancy Calculator"
            description="Estimate your biological age and longevity based on your daily habits, sleep, and lifestyle."
            hasResult={!!result}
        >
            <form onSubmit={handleCalculate} className="space-y-8 animate-in fade-in transition-all duration-300">
                {/* 1. Basic Stats */}
                <div className="space-y-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                        <Info className="w-5 h-5 text-blue-500" /> Basic Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <Label className="font-semibold">Current Age</Label>
                            <Input
                                type="number"
                                placeholder="e.g. 35"
                                value={inputs.currentAge || ""}
                                onChange={(e) => updateInput("currentAge", parseInt(e.target.value))}
                                className="h-12 text-lg bg-white dark:bg-slate-900"
                                required
                            />
                        </div>
                        <div className="space-y-3">
                            <Label className="font-semibold block mb-2">Biological Sex</Label>
                            <RadioGroup
                                value={inputs.gender}
                                onValueChange={(val) => updateInput("gender", val)}
                                className="flex gap-4"
                            >
                                <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 px-4 py-3 rounded-xl border flex-1">
                                    <RadioGroupItem value="female" id="female" />
                                    <Label htmlFor="female" className="cursor-pointer font-medium">Female</Label>
                                </div>
                                <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 px-4 py-3 rounded-xl border flex-1">
                                    <RadioGroupItem value="male" id="male" />
                                    <Label htmlFor="male" className="cursor-pointer font-medium">Male</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                </div>

                {/* 2. Vitals & Habits */}
                <div className="space-y-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                        <Heart className="w-5 h-5 text-red-500" /> Core Habits
                    </h3>

                    {/* Smoking */}
                    <div className="space-y-3">
                        <Label className="font-semibold flex items-center gap-2">
                            <Cigarette className="w-4 h-4 text-orange-500" /> Smoking Status
                        </Label>
                        <RadioGroup
                            value={inputs.smoking}
                            onValueChange={(val) => updateInput("smoking", val)}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
                        >
                            {[
                                { val: "never", label: "Never Smoked" },
                                { val: "former", label: "Former Smoker" },
                                { val: "current_light", label: "Light (<10/day)" },
                                { val: "current_heavy", label: "Heavy (10+/day)" }
                            ].map((opt) => (
                                <div key={opt.val} className="flex items-center space-x-2 bg-white dark:bg-slate-900 px-3 py-3 rounded-xl border">
                                    <RadioGroupItem value={opt.val} id={`smoke-${opt.val}`} />
                                    <Label htmlFor={`smoke-${opt.val}`} className="cursor-pointer font-medium text-sm">{opt.label}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <div className="space-y-3">
                            <Label className="font-semibold flex items-center gap-2">
                                <Activity className="w-4 h-4 text-green-500" /> Exercise (Hours/Week)
                            </Label>
                            <Input
                                type="number"
                                placeholder="e.g. 3"
                                step="0.5"
                                value={inputs.exerciseHoursPerWeek === undefined ? "" : inputs.exerciseHoursPerWeek}
                                onChange={(e) => updateInput("exerciseHoursPerWeek", parseFloat(e.target.value))}
                                className="h-12 bg-white dark:bg-slate-900"
                                required
                            />
                        </div>
                        <div className="space-y-3">
                            <Label className="font-semibold flex items-center gap-2">
                                <Moon className="w-4 h-4 text-indigo-500" /> Average Sleep (Hours/Night)
                            </Label>
                            <Input
                                type="number"
                                placeholder="e.g. 7.5"
                                step="0.5"
                                value={inputs.sleepHours || ""}
                                onChange={(e) => updateInput("sleepHours", parseFloat(e.target.value))}
                                className="h-12 bg-white dark:bg-slate-900"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* 3. Diet & Mental */}
                <div className="space-y-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                        <Apple className="w-5 h-5 text-green-500" /> Lifestyle & Stress
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <Label className="font-semibold">Diet Quality</Label>
                            <RadioGroup
                                value={inputs.dietQuality}
                                onValueChange={(val) => updateInput("dietQuality", val)}
                                className="space-y-2"
                            >
                                <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 p-3 rounded-xl border">
                                    <RadioGroupItem value="poor" id="diet-poor" />
                                    <Label htmlFor="diet-poor" className="cursor-pointer text-sm">Poor (Highly Processed, Fast Food)</Label>
                                </div>
                                <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 p-3 rounded-xl border">
                                    <RadioGroupItem value="average" id="diet-avg" />
                                    <Label htmlFor="diet-avg" className="cursor-pointer text-sm">Average (Mixed Diet)</Label>
                                </div>
                                <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 p-3 rounded-xl border">
                                    <RadioGroupItem value="excellent" id="diet-excel" />
                                    <Label htmlFor="diet-excel" className="cursor-pointer text-sm">Excellent (Whole Foods, Mediterranean)</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="space-y-3">
                            <Label className="font-semibold flex items-center gap-2">
                                <Brain className="w-4 h-4 text-purple-500" /> Chronic Stress Level
                            </Label>
                            <RadioGroup
                                value={inputs.stressLevel}
                                onValueChange={(val) => updateInput("stressLevel", val)}
                                className="space-y-2"
                            >
                                <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 p-3 rounded-xl border">
                                    <RadioGroupItem value="low" id="stress-low" />
                                    <Label htmlFor="stress-low" className="cursor-pointer text-sm">Low (Relaxed, Good Coping)</Label>
                                </div>
                                <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 p-3 rounded-xl border">
                                    <RadioGroupItem value="moderate" id="stress-mod" />
                                    <Label htmlFor="stress-mod" className="cursor-pointer text-sm">Moderate (Typical Work/Life Stress)</Label>
                                </div>
                                <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 p-3 rounded-xl border">
                                    <RadioGroupItem value="high" id="stress-high" />
                                    <Label htmlFor="stress-high" className="cursor-pointer text-sm">High (Chronic, Overwhelming)</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                        <Label className="font-semibold">Alcohol Consumption</Label>
                        <RadioGroup
                            value={inputs.alcohol}
                            onValueChange={(val) => updateInput("alcohol", val)}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
                        >
                            {[
                                { val: "never", label: "Never" },
                                { val: "occasional", label: "Occasional" },
                                { val: "moderate", label: "Moderate (1-2/day)" },
                                { val: "heavy", label: "Heavy (3+/day)" }
                            ].map((opt) => (
                                <div key={opt.val} className="flex items-center space-x-2 bg-white dark:bg-slate-900 px-3 py-3 rounded-xl border">
                                    <RadioGroupItem value={opt.val} id={`alc-${opt.val}`} />
                                    <Label htmlFor={`alc-${opt.val}`} className="cursor-pointer font-medium text-sm">{opt.label}</Label>
                                </div>
                            ))}
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
                    Estimate Life Expectancy
                </Button>
            </form>

            {result && (
                <div className="mt-12 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-8 rounded-3xl bg-linear-to-br from-indigo-500 to-purple-600 text-white shadow-xl text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-20">
                                <Clock className="w-24 h-24" />
                            </div>
                            <h3 className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2 relative z-10">Estimated Life Expectancy</h3>
                            <div className="text-7xl font-black mb-2 relative z-10 drop-shadow-md">
                                {result.finalExpectancy}
                            </div>
                            <p className="text-xl font-medium text-indigo-100 relative z-10">Years</p>
                        </div>

                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-sm flex flex-col justify-center">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Your Biological Age</h3>
                            <div className={`text-6xl font-black mb-2 ${result.biologicalAge < (inputs.currentAge || 0) ? 'text-green-500' : result.biologicalAge > (inputs.currentAge || 0) ? 'text-red-500' : 'text-slate-700 dark:text-slate-300'}`}>
                                {result.biologicalAge}
                            </div>
                            <p className="text-sm text-slate-500">
                                {result.biologicalAge < (inputs.currentAge || 0)
                                    ? `Great! Your habits make your body act ${(inputs.currentAge! - result.biologicalAge).toFixed(1)} years younger.`
                                    : result.biologicalAge > (inputs.currentAge || 0)
                                        ? `Your habits are accelerating cellular aging by ${(result.biologicalAge - inputs.currentAge!).toFixed(1)} years.`
                                        : "Your biological age aligns perfectly with your chronological age."}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-blue-500" /> Personalized Longevity Insights
                        </h4>
                        <ul className="space-y-3">
                            {result.insights.map((insight, i) => (
                                <li key={i} className="flex gap-3 text-sm text-slate-700 dark:text-slate-300">
                                    <div className="min-w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
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
