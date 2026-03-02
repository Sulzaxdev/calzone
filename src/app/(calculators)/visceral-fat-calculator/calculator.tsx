"use client";

import React, { useState, useEffect } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { AlertCircle, Activity, Info, TrendingDown, Target, ShieldCheck, Flame } from "lucide-react";
import { calculateVisceralFat, VisceralFatInputs, VisceralFatResult } from "@/lib/visceral-fat-logic";

export function VisceralFatCalculatorForm() {
    const [inputs, setInputs] = useState<VisceralFatInputs>({
        age: 35,
        gender: "male",
        height: 175,
        weight: 80,
        waist: 90,
        unit: "metric",
    });

    const [result, setResult] = useState<VisceralFatResult | null>(null);
    const [whatIfWeight, setWhatIfWeight] = useState(80);
    const [whatIfWaist, setWhatIfWaist] = useState(90);
    const [whatIfResult, setWhatIfResult] = useState<VisceralFatResult | null>(null);

    const handleCalculate = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const res = calculateVisceralFat(inputs);
        setResult(res);
        setWhatIfWeight(inputs.weight);
        setWhatIfWaist(inputs.waist);
    };

    // Update "What-If" analysis in real-time
    useEffect(() => {
        if (result) {
            const res = calculateVisceralFat({
                ...inputs,
                weight: whatIfWeight,
                waist: whatIfWaist
            });
            setWhatIfResult(res);
        }
    }, [whatIfWeight, whatIfWaist, result, inputs]);

    const getRiskStyles = (category: string) => {
        switch (category) {
            case "Low": return "text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800";
            case "Moderate": return "text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800";
            case "High": return "text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800";
            case "Very High": return "text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800";
            default: return "";
        }
    };

    return (
        <CalculatorCard
            title="Visceral Fat Calculator"
            description="Estimate the dangerous 'hidden' fat deep within your abdominal organs."
            hasResult={!!result}
        >
            <form onSubmit={handleCalculate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="space-y-3">
                        <Label>Age (years)</Label>
                        <Input
                            type="number"
                            min={18}
                            max={100}
                            value={inputs.age}
                            onChange={(e) => setInputs({ ...inputs, age: parseInt(e.target.value) || 0 })}
                            required
                        />
                    </div>
                    <div className="space-y-3">
                        <Label>Biological Sex</Label>
                        <RadioGroup
                            value={inputs.gender}
                            onValueChange={(val: "male" | "female") => setInputs({ ...inputs, gender: val })}
                            className="flex gap-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="male" id="vf-male" />
                                <Label htmlFor="vf-male">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="female" id="vf-female" />
                                <Label htmlFor="vf-female">Female</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="space-y-3">
                        <Label>Height (cm)</Label>
                        <Input
                            type="number"
                            value={inputs.height}
                            onChange={(e) => setInputs({ ...inputs, height: parseInt(e.target.value) || 0 })}
                            required
                        />
                    </div>
                    <div className="space-y-3">
                        <Label>Weight (kg)</Label>
                        <Input
                            type="number"
                            value={inputs.weight}
                            onChange={(e) => setInputs({ ...inputs, weight: parseInt(e.target.value) || 0 })}
                            required
                        />
                    </div>
                    <div className="space-y-3 font-semibold text-rose-600 dark:text-rose-400">
                        <Label className="text-rose-600 dark:text-rose-400">Waist (cm)</Label>
                        <Input
                            type="number"
                            className="border-rose-200 dark:border-rose-900 shadow-sm"
                            value={inputs.waist}
                            onChange={(e) => setInputs({ ...inputs, waist: parseInt(e.target.value) || 0 })}
                            required
                        />
                        <p className="text-[10px] uppercase tracking-wider opacity-70">Measure at navel level</p>
                    </div>
                </div>

                <Button type="submit" size="lg" className="w-full text-lg h-14 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all font-semibold">
                    <Activity className="mr-2 h-5 w-5" />
                    Calculate Visceral Fat Level
                </Button>
            </form>

            {result && (
                <div className="mt-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {/* Main Score Display */}
                    <div className={`p-8 rounded-3xl border-2 text-center relative overflow-hidden ${getRiskStyles(result.riskCategory)}`}>
                        <div className="relative z-10 flex flex-col items-center">
                            <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-2 opacity-80">Visceral Fat Level (VFL)</h3>
                            <div className="text-7xl md:text-9xl font-black tracking-tighter my-2 drop-shadow-sm">
                                {result.vfl}
                            </div>
                            <div className="px-4 py-1.5 rounded-full bg-white/50 dark:bg-black/20 text-sm font-bold backdrop-blur-sm">
                                {result.riskCategory} Risk
                            </div>
                            <p className="mt-4 text-sm max-w-sm mx-auto opacity-90 leading-relaxed font-medium">
                                A healthy level is usually 1–9. Levels 10–13 are moderate, and 14–20 indicate high risk.
                            </p>
                        </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: "BMI", value: result.bmi, icon: Activity, color: "text-blue-500" },
                            { label: "WHtR", value: result.whtr, icon: ShieldCheck, color: "text-emerald-500" },
                            { label: "Ideal Waist", value: `${result.idealWaist} cm`, icon: Target, color: "text-rose-500" },
                            { label: "Metabolic Risk", value: `${result.metabolicRiskScore}/100`, icon: Info, color: "text-amber-500" },
                        ].map((m, i) => (
                            <div key={i} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4">
                                <div className={`p-2 rounded-lg ${m.color} bg-current/10`}>
                                    <m.icon className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-muted-foreground font-medium">{m.label}</span>
                                    <span className="text-lg font-bold">{m.value}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* What-If Analysis Section */}
                    <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl border border-white/10 overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                            <TrendingDown className="w-32 h-32" />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <div className="flex items-center gap-2 mb-2">
                                <Flame className="w-5 h-5 text-orange-400" />
                                <h4 className="text-xl font-bold italic tracking-tight uppercase">Risk Reduction Analysis</h4>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                                See how small changes in your waist and weight could slash your visceral fat level. Moving these sliders doesn't change your current data, but models your potential.
                            </p>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-4">
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-sm font-bold uppercase tracking-widest text-slate-500">
                                            <span>Target Weight</span>
                                            <span className="text-white">{whatIfWeight} kg</span>
                                        </div>
                                        <Slider
                                            defaultValue={[inputs.weight]}
                                            max={inputs.weight + 5}
                                            min={inputs.weight - 15}
                                            step={0.5}
                                            onValueChange={(val) => setWhatIfWeight(val[0])}
                                            className="cursor-pointer"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-sm font-bold uppercase tracking-widest text-slate-500">
                                            <span>Target Waist</span>
                                            <span className="text-white">{whatIfWaist} cm</span>
                                        </div>
                                        <Slider
                                            defaultValue={[inputs.waist]}
                                            max={inputs.waist + 5}
                                            min={inputs.waist - 15}
                                            step={1}
                                            onValueChange={(val) => setWhatIfWaist(val[0])}
                                            className="cursor-pointer"
                                        />
                                    </div>
                                </div>

                                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex flex-col justify-center items-center text-center">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Projected VFL</span>
                                    <div className={`text-6xl font-black mb-4 ${whatIfResult?.vfl && whatIfResult.vfl < result.vfl ? "text-emerald-400 animate-pulse" : "text-white"}`}>
                                        {whatIfResult?.vfl}
                                    </div>
                                    <div className="text-sm font-medium text-slate-300">
                                        Risk: <span className="text-white font-bold">{whatIfResult?.riskCategory}</span>
                                    </div>
                                    {whatIfResult?.vfl && whatIfResult.vfl < result.vfl && (
                                        <div className="mt-4 text-[10px] bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-bold uppercase tracking-tighter">
                                            Improved Risk Profile
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <p className="text-xs text-center text-muted-foreground italic px-4">
                        Disclaimer: This tool calculates an anthropometric estimate. Accurate visceral fat measurement requires clinical scans (MRI/CT). Consult a healthcare provider for a professional diagnosis.
                    </p>
                </div>
            )}
        </CalculatorCard>
    );
}
