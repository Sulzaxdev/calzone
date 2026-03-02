"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Scale,
    RotateCcw,
    Target,
    Weight,
    Info,
    ArrowRight,
    CheckCircle2,
    AlertCircle
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Unit = "metric" | "imperial";

export function ReverseBMICalculatorForm() {
    const [unit, setUnit] = useState<Unit>("metric");
    const [height, setHeight] = useState("");
    const [targetBmi, setTargetBmi] = useState("");

    const [result, setResult] = useState<{
        weight: number;
        category: string;
        color: string;
    } | null>(null);
    const [error, setError] = useState("");

    const calculateTargetWeight = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const hValue = parseFloat(height);
        const bmiValue = parseFloat(targetBmi);

        if (isNaN(hValue) || isNaN(bmiValue) || hValue <= 0 || bmiValue <= 0) {
            setError("Please enter valid height and target BMI values.");
            return;
        }

        let heightM = unit === "metric" ? hValue / 100 : (hValue * 2.54) / 100;

        // Weight (kg) = BMI * height(m)^2
        const targetWeightKg = bmiValue * (heightM * heightM);

        let category = "Healthy";
        let color = "text-green-500";

        if (bmiValue < 18.5) {
            category = "Underweight";
            color = "text-blue-500";
        } else if (bmiValue >= 30) {
            category = "Obese";
            color = "text-red-500";
        } else if (bmiValue >= 25) {
            category = "Overweight";
            color = "text-orange-500";
        }

        setResult({
            weight: unit === "metric" ? targetWeightKg : targetWeightKg / 0.453592,
            category,
            color
        });
    };

    const handleClear = () => {
        setHeight("");
        setTargetBmi("");
        setResult(null);
        setError("");
    };

    return (
        <CalculatorCard
            title="Reverse BMI Calculator"
            description="Find the exact weight you need to reach a specific target BMI (Body Mass Index)."
        >
            <form onSubmit={calculateTargetWeight} className="space-y-6">
                <div className="bg-slate-50/50 dark:bg-slate-900/20 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                    <div className="space-y-4">
                        <Label className="text-base font-bold">Measurement Units</Label>
                        <RadioGroup defaultValue="metric" onValueChange={(v) => { setUnit(v as Unit); setResult(null); }} className="flex gap-4">
                            <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                                <RadioGroupItem value="metric" id="r-metric" />
                                <Label htmlFor="r-metric" className="cursor-pointer">Metric (cm/kg)</Label>
                            </div>
                            <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                                <RadioGroupItem value="imperial" id="r-imperial" />
                                <Label htmlFor="r-imperial" className="cursor-pointer">Imperial (in/lb)</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-3">
                        <Label className="text-base font-bold flex items-center gap-2">
                            Height ({unit === 'metric' ? 'cm' : 'inches'})
                        </Label>
                        <Input
                            type="number"
                            step="0.1"
                            placeholder={unit === 'metric' ? "e.g. 175" : "e.g. 69"}
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="h-12 text-lg rounded-xl"
                            required
                        />
                    </div>

                    <div className="space-y-3">
                        <Label className="text-base font-bold flex items-center gap-2">
                            Target BMI
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Info className="w-4 h-4 text-slate-400" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        A healthy BMI range is typically between 18.5 and 24.9.
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </Label>
                        <Input
                            type="number"
                            step="0.1"
                            placeholder="e.g. 22.0"
                            value={targetBmi}
                            onChange={(e) => setTargetBmi(e.target.value)}
                            className="h-12 text-lg rounded-xl font-bold text-primary"
                            required
                        />
                    </div>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-2xl flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <p className="text-sm text-red-700 dark:text-red-300 font-medium">{error}</p>
                    </div>
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
                        className="flex-1 h-14 text-lg font-bold rounded-2xl shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 transition-all"
                    >
                        Find My Target Weight
                    </Button>
                </div>
            </form>

            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-12 space-y-6"
                    >
                        <div className="bg-primary/5 dark:bg-primary/10 p-8 rounded-[2.5rem] border border-primary/10 dark:border-primary/20 text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full translate-x-10 -translate-y-10" />

                            <Label className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2 block">Required Weight</Label>
                            <div className="text-6xl font-black text-primary mb-2">
                                {result.weight.toFixed(1)} <span className="text-2xl font-medium text-slate-400">{unit === 'metric' ? 'kg' : 'lbs'}</span>
                            </div>

                            <div className="flex items-center justify-center gap-2 mt-4">
                                <span className="text-slate-500 text-sm">Target Status:</span>
                                <span className={`font-black text-lg ${result.color}`}>{result.category}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                                <div className="bg-indigo-100 dark:bg-indigo-900/40 p-3 rounded-2xl">
                                    <Target className="w-6 h-6 text-indigo-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase">Target BMI</p>
                                    <p className="font-black text-slate-900 dark:text-slate-100">{targetBmi}</p>
                                </div>
                            </div>
                            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                                <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-2xl">
                                    <Scale className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase">Health Category</p>
                                    <p className={`font-black ${result.color}`}>{result.category}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-50/50 dark:bg-green-950/10 p-6 rounded-3xl border border-green-100 dark:border-green-900/30">
                            <div className="flex items-center gap-3 mb-2">
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                                <h4 className="font-bold text-green-800 dark:text-green-300">Target Achievability</h4>
                            </div>
                            <p className="text-sm text-green-700 dark:text-green-400 leading-relaxed">
                                reaching a BMI of {targetBmi} requires weighing exactly {result.weight.toFixed(1)}{unit === 'metric' ? 'kg' : 'lbs'}. Consult with a nutritionist to create a sustainable plan to reach this target.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </CalculatorCard>
    );
}
