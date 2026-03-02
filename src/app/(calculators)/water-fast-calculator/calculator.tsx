"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    RotateCcw,
    Droplets,
    Scale,
    AlertTriangle,
    Info,
    CheckCircle2,
    TrendingDown,
    Flame,
    ShieldAlert,
    Calendar
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function WaterFastCalculatorForm() {
    const [duration, setDuration] = useState("");
    const [weight, setWeight] = useState("");
    const [gender, setGender] = useState<"male" | "female">("male");
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [unit, setUnit] = useState<"metric" | "imperial">("metric");

    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState("");

    const calculateFast = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const days = parseFloat(duration);
        const wKg = unit === "metric" ? parseFloat(weight) : parseFloat(weight) * 0.453592;
        const hCm = unit === "metric" ? parseFloat(height) : parseFloat(height) * 2.54;
        const ageNum = parseFloat(age);

        if (days > 0 && wKg > 0 && hCm > 0 && ageNum > 0) {
            // Calculate BMR (Mifflin-St Jeor)
            let bmr = 0;
            if (gender === "male") {
                bmr = 10 * wKg + 6.25 * hCm - 5 * ageNum + 5;
            } else {
                bmr = 10 * wKg + 6.25 * hCm - 5 * ageNum - 161;
            }

            // Water Fast Dynamics
            // Phase 1 (Day 1-2): Glycogen depletion (mostly water). Approx 0.8kg per day.
            // Phase 2 (Day 3+): Fat oxidation. Energy provided by fat. 
            // 1kg fat = 7700 kcal. 
            // Daily fat loss = bmr / 7700.

            let totalLoss = 0;
            let fatLoss = 0;
            let waterLoss = 0;

            for (let i = 1; i <= Math.ceil(days); i++) {
                const fraction = i <= days ? 1 : days % 1;
                if (i <= 2) {
                    waterLoss += 0.8 * fraction;
                    fatLoss += (bmr * 0.4 / 7700) * fraction; // Partial fat loss during transition
                } else {
                    fatLoss += (bmr / 7700) * fraction;
                    waterLoss += 0.05 * fraction; // Minimal water loss after depletion
                }
            }

            totalLoss = fatLoss + waterLoss;

            const formatWeight = (kg: number) => {
                return unit === "metric" ? `${kg.toFixed(2)} kg` : `${(kg * 2.20462).toFixed(2)} lbs`;
            };

            setResult({
                totalLoss: formatWeight(totalLoss),
                fatLoss: formatWeight(fatLoss),
                waterLoss: formatWeight(waterLoss),
                bmr: bmr.toFixed(0),
                days: days
            });
        } else {
            setError("Please fill in all fields correctly.");
        }
    };

    const handleClear = () => {
        setDuration(""); setWeight(""); setAge(""); setHeight(""); setResult(null); setError("");
    };

    return (
        <CalculatorCard
            title="Water Fast Weight Estimator"
            description="Estimate potential weight loss (Fat vs. Water) during a metabolic fast. Includes Mifflin-St Jeor BMR integration and glycogen depletion modeling."
            hasResult={!!result}
        >
            <form onSubmit={calculateFast} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <Label className="text-sm font-bold uppercase tracking-widest text-slate-500">Fast Duration (Days)</Label>
                        <div className="relative">
                            <Input
                                type="number"
                                placeholder="3"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="h-16 text-2xl font-black rounded-2xl pl-14"
                                required
                            />
                            <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-primary w-6 h-6" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <Label className="text-sm font-bold uppercase tracking-widest text-slate-500">Current Weight ({unit === 'metric' ? 'kg' : 'lbs'})</Label>
                        <div className="relative flex gap-2">
                            <Input
                                type="number"
                                placeholder={unit === 'metric' ? '80' : '175'}
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                className="h-16 text-2xl font-black rounded-2xl pl-14 flex-1"
                                required
                            />
                            <Scale className="absolute left-5 top-1/2 -translate-y-1/2 text-primary w-6 h-6" />
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setUnit(unit === 'metric' ? 'imperial' : 'metric')}
                                className="h-16 px-4 font-bold text-xs uppercase"
                            >
                                {unit === 'metric' ? 'KG' : 'LBS'}
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase opacity-60">Gender</Label>
                        <div className="grid grid-cols-2 gap-2">
                            <Button
                                type="button"
                                variant={gender === 'male' ? 'default' : 'outline'}
                                onClick={() => setGender('male')}
                                className="h-12 rounded-xl"
                            >Male</Button>
                            <Button
                                type="button"
                                variant={gender === 'female' ? 'default' : 'outline'}
                                onClick={() => setGender('female')}
                                className="h-12 rounded-xl"
                            >Female</Button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="age" className="text-xs font-bold uppercase opacity-60">Age</Label>
                        <Input
                            id="age"
                            type="number"
                            placeholder="30"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="h-12 rounded-xl font-bold"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="height" className="text-xs font-bold uppercase opacity-60">Height ({unit === 'metric' ? 'cm' : 'in'})</Label>
                        <Input
                            id="height"
                            type="number"
                            placeholder={unit === 'metric' ? '175' : '69'}
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="h-12 rounded-xl font-bold"
                            required
                        />
                    </div>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-950/30 text-red-600 rounded-xl text-sm font-medium border border-red-200 dark:border-red-900/50 flex items-center gap-2 animate-shake">
                        <AlertTriangle className="w-5 h-5 shrink-0" />
                        {error}
                    </div>
                )}

                <div className="flex gap-4 pt-4">
                    <Button type="button" variant="outline" onClick={handleClear} className="h-14 px-6 rounded-2xl">
                        <RotateCcw className="w-5 h-5" />
                    </Button>
                    <Button type="submit" className="flex-1 h-14 text-lg font-black shadow-xl shadow-primary/20 rounded-2xl bg-linear-to-r from-primary to-blue-600 hover:scale-[1.02] transition-transform">
                        Calculate Fat Loss
                    </Button>
                </div>
            </form>

            {result && (
                <div className="mt-10 animate-in zoom-in-95 duration-500">
                    <div className="p-10 rounded-[3rem] bg-linear-to-br from-blue-50 to-indigo-50/50 dark:from-slate-900/80 dark:to-blue-950/20 border border-blue-100 dark:border-blue-900/50 text-center relative overflow-hidden shadow-2xl shadow-blue-500/5">

                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>

                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-blue-500 mb-2 mt-4">Projected Total Weight Loss</h3>
                        <div className="text-7xl font-black text-slate-900 dark:text-white mt-4 mb-4 tabular-nums drop-shadow-sm">
                            {result.totalLoss}
                        </div>
                        <div className="inline-flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-full text-xs font-black uppercase tracking-widest mb-10 shadow-lg shadow-blue-500/20">
                            <Droplets className="w-4 h-4" /> {result.days} Day Fast
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white/80 dark:bg-black/30 p-8 rounded-[2rem] border border-white/40 dark:border-blue-900/20 shadow-sm text-left">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2.5 rounded-xl bg-orange-100 dark:bg-orange-950/40 text-orange-600">
                                        <Flame className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-sm font-black uppercase tracking-widest text-slate-400">Pure Fat Loss</h4>
                                </div>
                                <div className="text-4xl font-black text-slate-800 dark:text-orange-400 mb-2">{result.fatLoss}</div>
                                <p className="text-xs text-slate-500 font-medium leading-relaxed">Estimated fat oxidized based on your BMR of {result.bmr} kcal/day.</p>
                            </div>

                            <div className="bg-white/80 dark:bg-black/30 p-8 rounded-[2rem] border border-white/40 dark:border-blue-900/20 shadow-sm text-left">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-950/40 text-blue-600">
                                        <Droplets className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-sm font-black uppercase tracking-widest text-slate-400">Water & Glycogen</h4>
                                </div>
                                <div className="text-4xl font-black text-slate-800 dark:text-blue-400 mb-2">{result.waterLoss}</div>
                                <p className="text-xs text-slate-500 font-medium leading-relaxed">Most initial weight loss is water stored with glycogen. This often returns after refeeding.</p>
                            </div>
                        </div>

                        <div className="mt-10 p-6 bg-red-100/50 dark:bg-red-950/30 rounded-3xl border border-red-200 dark:border-red-900/50 text-left flex gap-5">
                            <ShieldAlert className="w-8 h-8 text-red-600 shrink-0" />
                            <div>
                                <h5 className="font-black text-red-900 dark:text-red-400 text-sm uppercase tracking-wide">Fasting Safety Alert</h5>
                                <p className="text-xs text-red-800 dark:text-red-300/80 leading-relaxed mt-1">
                                    Water fasting for more than 48 hours should be done under medical supervision. Watch for electrolyte imbalances, dizziness, or fainting. Always supplement with electrolytes (sodium, potassium, magnesium).
                                </p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                                            <Info className="w-5 h-5 mx-auto" />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent className="max-w-xs text-center">
                                        Calculations use the Mifflin-St Jeor formula and metabolic phase modeling. Individual results vary significantly based on activity level and metabolic health.
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                </div>
            )}
        </CalculatorCard>
    );
}
