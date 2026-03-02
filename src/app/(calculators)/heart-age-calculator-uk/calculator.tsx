"use client";

import React, { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertCircle, HeartPulse, Activity } from "lucide-react";
import { calculateHeartAge, HeartAgeInputs, HeartAgeResult } from "@/lib/heart-age-logic";

export function HeartAgeCalculatorForm() {
    const [inputs, setInputs] = useState<HeartAgeInputs>({
        age: 40,
        gender: "male",
        systolicBP: 120,
        totalCholesterol: 180,
        hdl: 50,
        smoker: false,
        diabetes: false,
        treatedBP: false,
    });

    const [result, setResult] = useState<HeartAgeResult | null>(null);

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();
        const res = calculateHeartAge(inputs);
        setResult(res);
    };

    const getRiskColor = (category: string) => {
        switch (category) {
            case "Low Risk": return "text-green-500 bg-green-500/10 border-green-200 dark:border-green-900";
            case "Borderline": return "text-yellow-500 bg-yellow-500/10 border-yellow-200 dark:border-yellow-900";
            case "Intermediate": return "text-orange-500 bg-orange-500/10 border-orange-200 dark:border-orange-900";
            case "High Risk": return "text-red-500 bg-red-500/10 border-red-200 dark:border-red-900";
            default: return "text-primary bg-primary/10 border-primary/20";
        }
    };

    const getProgressBarColor = (category: string) => {
        switch (category) {
            case "Low Risk": return "bg-green-500";
            case "Borderline": return "bg-yellow-500";
            case "Intermediate": return "bg-orange-500";
            case "High Risk": return "bg-red-500";
            default: return "bg-primary";
        }
    };

    return (
        <CalculatorCard
            title="Heart Age Calculator UI"
            description="Estimate your cardiovascular age based on your health metrics."
            hasResult={!!result}
        >
            <form onSubmit={handleCalculate} className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="space-y-3">
                        <Label>Age (years)</Label>
                        <Input
                            type="number"
                            min={20}
                            max={79}
                            value={inputs.age || ""}
                            onChange={(e) => setInputs({ ...inputs, age: parseInt(e.target.value) || 0 })}
                            required
                        />
                        <p className="text-xs text-muted-foreground">Framingham model is validated for ages 20-79.</p>
                    </div>

                    <div className="space-y-3">
                        <Label>Biological Sex</Label>
                        <RadioGroup
                            value={inputs.gender}
                            onValueChange={(val: "male" | "female") => setInputs({ ...inputs, gender: val })}
                            className="flex gap-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="male" id="g-male" />
                                <Label htmlFor="g-male">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="female" id="g-female" />
                                <Label htmlFor="g-female">Female</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="space-y-3">
                        <Label className="flex items-center gap-2"><Activity className="w-4 h-4 text-rose-500" /> Systolic Blood Pressure</Label>
                        <div className="relative">
                            <Input
                                type="number"
                                min={90}
                                max={200}
                                value={inputs.systolicBP || ""}
                                onChange={(e) => setInputs({ ...inputs, systolicBP: parseInt(e.target.value) || 0 })}
                                required
                            />
                            <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">mmHg</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label>Total Cholesterol</Label>
                        <div className="relative">
                            <Input
                                type="number"
                                min={100}
                                max={400}
                                value={inputs.totalCholesterol || ""}
                                onChange={(e) => setInputs({ ...inputs, totalCholesterol: parseInt(e.target.value) || 0 })}
                                required
                            />
                            <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">mg/dL</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label>HDL Cholesterol (Good)</Label>
                        <div className="relative">
                            <Input
                                type="number"
                                min={20}
                                max={100}
                                value={inputs.hdl || ""}
                                onChange={(e) => setInputs({ ...inputs, hdl: parseInt(e.target.value) || 0 })}
                                required
                            />
                            <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">mg/dL</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="space-y-3">
                        <Label>Do you currently smoke?</Label>
                        <RadioGroup
                            value={inputs.smoker ? "yes" : "no"}
                            onValueChange={(val) => setInputs({ ...inputs, smoker: val === "yes" })}
                            className="flex gap-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="smoke-yes" />
                                <Label htmlFor="smoke-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="smoke-no" />
                                <Label htmlFor="smoke-no">No</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="space-y-3">
                        <Label>Do you have Diabetes?</Label>
                        <RadioGroup
                            value={inputs.diabetes ? "yes" : "no"}
                            onValueChange={(val) => setInputs({ ...inputs, diabetes: val === "yes" })}
                            className="flex gap-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="diab-yes" />
                                <Label htmlFor="diab-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="diab-no" />
                                <Label htmlFor="diab-no">No</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="space-y-3">
                        <Label>Are you on Blood Pressure Medication?</Label>
                        <RadioGroup
                            value={inputs.treatedBP ? "yes" : "no"}
                            onValueChange={(val) => setInputs({ ...inputs, treatedBP: val === "yes" })}
                            className="flex gap-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="med-yes" />
                                <Label htmlFor="med-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="med-no" />
                                <Label htmlFor="med-no">No</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>

                <Button type="submit" size="lg" className="w-full text-lg h-14 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all font-semibold">
                    <HeartPulse className="mr-2 h-5 w-5" />
                    Calculate My Heart Age
                </Button>
            </form>

            {result && (
                <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className={`p-6 md:p-8 rounded-3xl border text-center ${getRiskColor(result.riskCategory)}`}>
                        <div className="flex flex-col items-center gap-2 mb-4">
                            <HeartPulse className="h-10 w-10 mb-2 opacity-80" />
                            <h3 className="text-xl md:text-2xl font-bold opacity-90">Your Estimated Heart Age</h3>
                            <div className="text-6xl md:text-8xl font-black tracking-tighter my-2 flex items-baseline gap-2">
                                {result.heartAge} <span className="text-2xl md:text-3xl font-bold opacity-50">years</span>
                            </div>
                            <p className="text-sm md:text-base font-medium opacity-80">
                                Chronological Age: {inputs.age} years
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                        <h4 className="font-bold text-lg mb-4 flex items-center justify-between">
                            <span>10-Year Cardiovascular Risk</span>
                            <span className={`px-3 py-1 rounded-full text-sm font-bold ${getRiskColor(result.riskCategory).split(" ")[0]} ${getRiskColor(result.riskCategory).split(" ")[1]}`}>
                                {result.riskCategory}
                            </span>
                        </h4>

                        <div className="w-full h-4 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mb-2 relative">
                            <div
                                className={`h-full transition-all duration-1000 ${getProgressBarColor(result.riskCategory)}`}
                                style={{ width: `${result.riskPercentage}%` }}
                            />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground font-medium">
                            <span>0%</span>
                            <span>{result.riskPercentage}% Risk of Heart Event</span>
                            <span>&gt;20%</span>
                        </div>
                    </div>

                    <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 rounded-2xl p-6">
                        <h4 className="font-bold text-blue-900 dark:text-blue-100 flex items-center gap-2 mb-4">
                            <Activity className="h-5 w-5 text-blue-500" /> Actionable Insights
                        </h4>
                        <ul className="space-y-3 text-sm text-blue-800 dark:text-blue-200">
                            {inputs.smoker && (
                                <li className="flex items-start gap-2">
                                    <AlertCircle className="h-4 w-4 shrink-0 text-red-500 mt-0.5" />
                                    <span><strong>Quit Smoking:</strong> Smoking is the single largest controllable risk factor. Quitting can drastically reduce your heart age within 1 year.</span>
                                </li>
                            )}
                            {inputs.systolicBP >= 130 && (
                                <li className="flex items-start gap-2">
                                    <AlertCircle className="h-4 w-4 shrink-0 text-orange-500 mt-0.5" />
                                    <span><strong>Manage Blood Pressure:</strong> A reading of {inputs.systolicBP} is elevated. Reduce sodium intake and engage in regular cardiovascular exercise.</span>
                                </li>
                            )}
                            {inputs.hdl < 40 && (
                                <li className="flex items-start gap-2">
                                    <AlertCircle className="h-4 w-4 shrink-0 text-orange-500 mt-0.5" />
                                    <span><strong>Boost HDL (Good) Cholesterol:</strong> Your HDL is low. Increase healthy fats (Omega-3s, nuts) and vigorous physical activity to improve it.</span>
                                </li>
                            )}
                            {result.riskCategory === "Low Risk" && (
                                <li className="flex items-start gap-2">
                                    <AlertCircle className="h-4 w-4 shrink-0 text-green-500 mt-0.5" />
                                    <span><strong>Maintain Healthy Habits:</strong> You are in a great risk category. Continue your current lifestyle and schedule routine checkups.</span>
                                </li>
                            )}
                            <li className="flex items-start gap-2 pt-2 border-t border-blue-200 dark:border-blue-800/30">
                                <span><em>Disclaimer: This calculator is for educational purposes based on the Framingham Risk Score. It does not replace professional medical advice. Always consult a physician for clinical assessment.</em></span>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </CalculatorCard>
    );
}
