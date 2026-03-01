"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function BMICalculator() {
    const [unit, setUnit] = useState<"metric" | "imperial">("metric");

    // Metric state
    const [cm, setCm] = useState("");
    const [kg, setKg] = useState("");

    // Imperial state
    const [ft, setFt] = useState("");
    const [inVal, setInVal] = useState("");
    const [lbs, setLbs] = useState("");

    const [result, setResult] = useState<{ bmi: string; category: string; color: string } | null>(null);

    const calculateBMI = (e: React.FormEvent) => {
        e.preventDefault();
        let bmiValue = 0;

        if (unit === "metric") {
            const heightM = parseFloat(cm) / 100;
            const weightKg = parseFloat(kg);
            if (heightM > 0 && weightKg > 0) {
                bmiValue = weightKg / (heightM * heightM);
            }
        } else {
            const heightInches = (parseFloat(ft) || 0) * 12 + (parseFloat(inVal) || 0);
            const weightLbs = parseFloat(lbs);
            if (heightInches > 0 && weightLbs > 0) {
                bmiValue = (weightLbs / (heightInches * heightInches)) * 703;
            }
        }

        if (bmiValue > 0) {
            let category = "";
            let color = "";

            if (bmiValue < 18.5) {
                category = "Underweight";
                color = "text-blue-500";
            } else if (bmiValue < 25) {
                category = "Normal weight";
                color = "text-green-500";
            } else if (bmiValue < 30) {
                category = "Overweight";
                color = "text-yellow-500";
            } else {
                category = "Obesity";
                color = "text-red-500";
            }

            setResult({ bmi: bmiValue.toFixed(1), category, color });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <CalculatorCard
                title="BMI Calculator"
                description="Calculate your Body Mass Index (BMI) to see if you're at a healthy weight."
            >
                <Tabs defaultValue="metric" onValueChange={(val) => {
                    setUnit(val as "metric" | "imperial");
                    setResult(null);
                }} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="metric">Metric (kg, cm)</TabsTrigger>
                        <TabsTrigger value="imperial">Imperial (lbs, ft)</TabsTrigger>
                    </TabsList>

                    <form onSubmit={calculateBMI} className="space-y-6">
                        <TabsContent value="metric" className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="height-cm">Height (cm)</Label>
                                <Input
                                    id="height-cm"
                                    type="number"
                                    placeholder="e.g. 175"
                                    value={cm}
                                    onChange={(e) => setCm(e.target.value)}
                                    required={unit === "metric"}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="weight-kg">Weight (kg)</Label>
                                <Input
                                    id="weight-kg"
                                    type="number"
                                    placeholder="e.g. 70"
                                    value={kg}
                                    onChange={(e) => setKg(e.target.value)}
                                    required={unit === "metric"}
                                />
                            </div>
                        </TabsContent>

                        <TabsContent value="imperial" className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="height-ft">Height (ft)</Label>
                                    <Input
                                        id="height-ft"
                                        type="number"
                                        placeholder="e.g. 5"
                                        value={ft}
                                        onChange={(e) => setFt(e.target.value)}
                                        required={unit === "imperial"}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="height-in">Height (in)</Label>
                                    <Input
                                        id="height-in"
                                        type="number"
                                        placeholder="e.g. 9"
                                        value={inVal}
                                        onChange={(e) => setInVal(e.target.value)}
                                        required={unit === "imperial"}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="weight-lbs">Weight (lbs)</Label>
                                <Input
                                    id="weight-lbs"
                                    type="number"
                                    placeholder="e.g. 150"
                                    value={lbs}
                                    onChange={(e) => setLbs(e.target.value)}
                                    required={unit === "imperial"}
                                />
                            </div>
                        </TabsContent>

                        <Button type="submit" className="w-full text-lg h-12">Calculate BMI</Button>
                    </form>
                </Tabs>

                {result && (
                    <div className="mt-8 p-6 rounded-xl bg-muted/50 text-center animate-in zoom-in-95 duration-300">
                        <div className="flex justify-center items-center gap-2 mb-2">
                            <h3 className="text-lg font-medium">Your BMI is</h3>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="w-48 text-xs">Body Mass Index is a simple calculation using a person's height and weight.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className={`text-6xl font-extrabold mb-2 ${result.color}`}>
                            {result.bmi}
                        </div>
                        <p className="text-lg font-medium">
                            Category: <span className={result.color}>{result.category}</span>
                        </p>
                    </div>
                )}
            </CalculatorCard>
        </div>
    );
}
