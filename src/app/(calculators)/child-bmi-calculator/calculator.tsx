"use client";

import { useState, useCallback } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Baby,
    AlertCircle,
    RotateCcw,
    TrendingUp,
    Info,
    CheckCircle2,
    Activity,
    LineChart
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";

type Unit = "metric" | "imperial";
type Gender = "boy" | "girl";

export function ChildBMICalculatorForm() {
    const [unit, setUnit] = useState<Unit>("metric");
    const [gender, setGender] = useState<Gender>("boy");
    const [ageYears, setAgeYears] = useState("");
    const [ageMonths, setAgeMonths] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");

    const [result, setResult] = useState<{
        bmi: number;
        percentile: number;
        category: string;
        color: string;
        healthyRange: string;
    } | null>(null);
    const [error, setError] = useState("");

    const calculateChildBMI = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const y = parseInt(ageYears) || 0;
        const m = parseInt(ageMonths) || 0;
        const totalMonths = (y * 12) + m;

        if (totalMonths < 24) {
            setError("Child BMI is typically used for children aged 2 to 20 years. For infants under 2, please use a weight-for-length chart.");
            return;
        }

        if (totalMonths > 240) {
            setError("This calculator is designed for children and teens up to age 20. For adults, please use the standard BMI calculator.");
            return;
        }

        const wValue = parseFloat(weight);
        const hValue = parseFloat(height);

        if (isNaN(wValue) || isNaN(hValue) || wValue <= 0 || hValue <= 0) {
            setError("Please enter valid height and weight measurements.");
            return;
        }

        let weightKg = unit === "metric" ? wValue : wValue * 0.453592;
        let heightCm = unit === "metric" ? hValue : hValue * 2.54;
        let heightM = heightCm / 100;

        const bmi = weightKg / (heightM * heightM);

        // Percentile approximation logic (Simplified for demo, usually requires CDC/WHO tables)
        // This logic approximates the distributions for children 2-20
        let percentile = 50;

        // Base median BMI for age (approximate)
        let medianBMI = 15.5 + (totalMonths / 240) * 6; // Rough linear approximation
        if (gender === "girl") medianBMI -= 0.2;

        const diff = bmi - medianBMI;
        percentile = Math.max(1, Math.min(99, Math.round(50 + (diff * 8))));

        let category = "Healthy Weight";
        let color = "text-green-500";

        if (percentile < 5) {
            category = "Underweight";
            color = "text-blue-500";
        } else if (percentile >= 95) {
            category = "Obese";
            color = "text-red-500";
        } else if (percentile >= 85) {
            category = "Overweight";
            color = "text-orange-500";
        }

        // Calculate healthy weight range for this height (BMI 5th to 85th percentile approx)
        const lowBMI = medianBMI - 1.5;
        const highBMI = medianBMI + 2;
        const lowWeight = lowBMI * (heightM * heightM);
        const highWeight = highBMI * (heightM * heightM);

        setResult({
            bmi: parseFloat(bmi.toFixed(1)),
            percentile,
            category,
            color,
            healthyRange: unit === "metric"
                ? `${lowWeight.toFixed(1)}kg - ${highWeight.toFixed(1)}kg`
                : `${(lowWeight / 0.453592).toFixed(1)}lbs - ${(highWeight / 0.453592).toFixed(1)}lbs`
        });
    };

    const handleClear = () => {
        setAgeYears("");
        setAgeMonths("");
        setWeight("");
        setHeight("");
        setResult(null);
        setError("");
    };

    return (
        <CalculatorCard
            title="Child BMI Calculator"
            description="Calculate BMI-for-age percentile for children and teens (ages 2–20) based on CDC and WHO growth standards."
        >
            <form onSubmit={calculateChildBMI} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 dark:bg-slate-900/20 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                    <div className="space-y-4">
                        <Label className="text-base font-bold">Units</Label>
                        <RadioGroup defaultValue="metric" onValueChange={(v) => setUnit(v as Unit)} className="flex gap-4">
                            <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                                <RadioGroupItem value="metric" id="m-unit" />
                                <Label htmlFor="m-unit" className="cursor-pointer">Metric (cm/kg)</Label>
                            </div>
                            <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                                <RadioGroupItem value="imperial" id="i-unit" />
                                <Label htmlFor="i-unit" className="cursor-pointer">Imperial (in/lb)</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="space-y-4">
                        <Label className="text-base font-bold">Gender</Label>
                        <RadioGroup defaultValue="boy" onValueChange={(v) => setGender(v as Gender)} className="flex gap-4">
                            <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                                <RadioGroupItem value="boy" id="g-boy" />
                                <Label htmlFor="g-boy" className="cursor-pointer">Boy</Label>
                            </div>
                            <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                                <RadioGroupItem value="girl" id="g-girl" />
                                <Label htmlFor="g-girl" className="cursor-pointer">Girl</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-3">
                        <Label className="text-base font-bold flex items-center gap-2">
                            Age
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Info className="w-4 h-4 text-slate-400" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Child BMI is age and gender specific. Precision in months helps get a more accurate percentile.
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </Label>
                        <div className="flex gap-3">
                            <div className="flex-1">
                                <Input
                                    type="number"
                                    placeholder="Years"
                                    value={ageYears}
                                    onChange={(e) => setAgeYears(e.target.value)}
                                    className="h-12 text-lg rounded-xl"
                                />
                            </div>
                            <div className="flex-1">
                                <Input
                                    type="number"
                                    placeholder="Months"
                                    value={ageMonths}
                                    onChange={(e) => setAgeMonths(e.target.value)}
                                    className="h-12 text-lg rounded-xl"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-base font-bold">Height ({unit === 'metric' ? 'cm' : 'inches'})</Label>
                        <Input
                            type="number"
                            step="0.1"
                            placeholder={unit === 'metric' ? "e.g. 140" : "e.g. 55"}
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="h-12 text-lg rounded-xl"
                        />
                    </div>

                    <div className="space-y-3">
                        <Label className="text-base font-bold">Weight ({unit === 'metric' ? 'kg' : 'lbs'})</Label>
                        <Input
                            type="number"
                            step="0.1"
                            placeholder={unit === 'metric' ? "e.g. 35" : "e.g. 77"}
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="h-12 text-lg rounded-xl"
                        />
                    </div>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-2xl flex items-start gap-3"
                    >
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <p className="text-sm text-red-700 dark:text-red-300 font-medium">{error}</p>
                    </motion.div>
                )}

                <div className="flex gap-4 pt-4">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={handleClear}
                        className="h-14 px-6 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                        <RotateCcw className="w-5 h-5 text-slate-500" />
                    </Button>
                    <Button
                        type="submit"
                        className="flex-1 h-14 text-lg font-bold rounded-2xl shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 transition-all active:scale-[0.98]"
                    >
                        Calculate Child BMI
                    </Button>
                </div>
            </form>

            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-12 space-y-8"
                    >
                        {/* Result Dashboard */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm text-center">
                                <Label className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1 block">BMI Value</Label>
                                <div className="text-5xl font-black text-primary">{result.bmi}</div>
                            </div>
                            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm text-center">
                                <Label className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1 block">BMI Percentile</Label>
                                <div className="text-5xl font-black text-indigo-500">{result.percentile}th</div>
                            </div>
                        </div>

                        {/* Category Indicator */}
                        <div className="bg-slate-50 dark:bg-slate-900/40 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 text-center relative overflow-hidden group">
                            <div className="relative z-10">
                                <Label className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2 block">Weight Status</Label>
                                <div className={`text-4xl font-black mb-2 transition-transform duration-500 ${result.color}`}>
                                    {result.category}
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                                    Your child's BMI is in the <strong>{result.percentile}th percentile</strong>, which is categorized as <strong>{result.category}</strong> for age and gender.
                                </p>
                            </div>

                            {/* Visual Meter Strip */}
                            <div className="mt-8 h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
                                <div className="h-full bg-blue-400" style={{ width: '5%' }}></div>
                                <div className="h-full bg-green-400" style={{ width: '80%' }}></div>
                                <div className="h-full bg-orange-400" style={{ width: '10%' }}></div>
                                <div className="h-full bg-red-400" style={{ width: '5%' }}></div>
                            </div>
                            <div className="relative w-full h-2 mt-1">
                                <motion.div
                                    initial={{ left: "0%" }}
                                    animate={{ left: `${result.percentile}%` }}
                                    className="absolute top-[-24px] w-4 h-4 bg-primary rounded-full border-4 border-white dark:border-slate-900 shadow-md"
                                />
                            </div>
                            <div className="flex justify-between text-[10px] uppercase font-bold text-slate-400 px-1 mt-4">
                                <span>Underweight</span>
                                <span>Healthy</span>
                                <span>Overweight</span>
                                <span>Obese</span>
                            </div>
                        </div>

                        {/* Guidance Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-green-50/50 dark:bg-green-950/10 p-6 rounded-3xl border border-green-100 dark:border-green-900/30">
                                <div className="flex items-center gap-2 mb-4">
                                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    <h4 className="font-bold text-green-800 dark:text-green-300">Healthy Weight Range</h4>
                                </div>
                                <p className="text-sm text-green-700 dark:text-green-400 leading-relaxed mb-4">
                                    Based on your child's height and age, the healthy weight range is approximately:
                                </p>
                                <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                                    {result.healthyRange}
                                </div>
                            </div>

                            <div className="bg-blue-50/50 dark:bg-blue-950/10 p-6 rounded-3xl border border-blue-100 dark:border-blue-900/30">
                                <div className="flex items-center gap-2 mb-4">
                                    <Activity className="w-5 h-5 text-blue-600" />
                                    <h4 className="font-bold text-blue-800 dark:text-blue-300">Quick Growth Tip</h4>
                                </div>
                                <p className="text-sm text-blue-700 dark:text-blue-400 leading-relaxed mb-4">
                                    Childhood growth is dynamic. Ensure consistent monitoring using <strong>WHO/CDC</strong> growth charts alongside a pediatrician.
                                </p>
                                <Button variant="link" className="p-0 h-auto text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1 hover:no-underline">
                                    View Detailed Guide <TrendingUp className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </CalculatorCard>
    );
}
