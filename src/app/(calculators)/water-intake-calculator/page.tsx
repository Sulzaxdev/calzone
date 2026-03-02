"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Droplets } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function WaterIntakeCalculator() {
    const [unit, setUnit] = useState<"metric" | "imperial">("metric");

    const [kg, setKg] = useState("");
    const [lbs, setLbs] = useState("");
    const [exerciseMins, setExerciseMins] = useState("30");
    const [isHot, setIsHot] = useState<"yes" | "no">("no");

    const [result, setResult] = useState<{ amount: string; unitStr: string; cups: string } | null>(null);

    const calculateWater = (e: React.FormEvent) => {
        e.preventDefault();
        let weightKg = 0;

        if (unit === "metric") {
            weightKg = parseFloat(kg);
        } else {
            weightKg = parseFloat(lbs) * 0.453592;
        }

        if (weightKg > 0) {
            // Baseline: 35ml per kg of body weight
            let waterMl = weightKg * 35;

            // Exercise: add 500ml per 60 mins of exercise
            const exercise = parseInt(exerciseMins) || 0;
            waterMl += (exercise / 60) * 500;

            // Environment: add 500ml if hot
            if (isHot === "yes") {
                waterMl += 500;
            }

            if (unit === "metric") {
                const liters = (waterMl / 1000).toFixed(1);
                const cups = Math.round(waterMl / 250).toString();
                setResult({ amount: liters, unitStr: "Liters", cups });
            } else {
                const ounces = (waterMl / 29.5735).toFixed(0);
                const cups = Math.round(parseInt(ounces) / 8).toString();
                setResult({ amount: ounces, unitStr: "fl oz", cups });
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <CalculatorCard
                title="Water Intake Calculator"
                description="Calculate your daily hydration needs based on your body weight, activity level, and environment."
            >
                <Tabs defaultValue="metric" onValueChange={(val) => {
                    setUnit(val as "metric" | "imperial");
                    setResult(null);
                }} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="metric">Metric (kg, L)</TabsTrigger>
                        <TabsTrigger value="imperial">Imperial (lbs, oz)</TabsTrigger>
                    </TabsList>

                    <form onSubmit={calculateWater} className="space-y-6">
                        <TabsContent value="metric" className="mt-0">
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

                        <TabsContent value="imperial" className="mt-0">
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

                        <div className="space-y-2">
                            <Label htmlFor="exercise">Daily Exercise (minutes)</Label>
                            <Input
                                id="exercise"
                                type="number"
                                placeholder="e.g. 30"
                                value={exerciseMins}
                                onChange={(e) => setExerciseMins(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-3">
                            <Label>Is the climate hot or dry?</Label>
                            <div className="flex gap-4">
                                <Button
                                    type="button"
                                    variant={isHot === "yes" ? "default" : "outline"}
                                    onClick={() => setIsHot("yes")}
                                    className="flex-1"
                                >
                                    Yes
                                </Button>
                                <Button
                                    type="button"
                                    variant={isHot === "no" ? "default" : "outline"}
                                    onClick={() => setIsHot("no")}
                                    className="flex-1"
                                >
                                    No
                                </Button>
                            </div>
                        </div>

                        <Button type="submit" className="w-full text-lg h-12">Calculate Hydration</Button>
                    </form>
                </Tabs>

                {result && (
                    <div className="mt-8 p-6 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-center animate-in zoom-in-95 duration-300">
                        <div className="flex justify-center items-center gap-2 mb-2">
                            <Droplets className="h-6 w-6 text-blue-500" />
                            <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200">Daily Target</h3>
                        </div>
                        <div className="text-5xl font-extrabold mb-2 text-blue-600 dark:text-blue-400">
                            {result.amount} <span className="text-2xl font-normal text-blue-800/60 dark:text-blue-200/60">{result.unitStr}</span>
                        </div>
                        <p className="text-lg font-medium text-blue-700 dark:text-blue-300">
                            Approximately {result.cups} cups per day
                        </p>
                    </div>
                )}
            </CalculatorCard>
        </div>
    );
}
