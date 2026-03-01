"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity } from "lucide-react";

export default function CalorieDeficitCalculator() {
    const [gender, setGender] = useState<"male" | "female">("male");
    const [age, setAge] = useState("");
    const [weightKg, setWeightKg] = useState("");
    const [heightCm, setHeightCm] = useState("");
    const [activity, setActivity] = useState("1.2"); // Sedentary by default
    const [targetLossPerWeek, setTargetLossPerWeek] = useState("0.5"); // kg per week

    const [result, setResult] = useState<{
        maintenance: number;
        deficit: number;
        targetCalories: number;
        safe: boolean;
    } | null>(null);

    const calculateDeficit = (e: React.FormEvent) => {
        e.preventDefault();

        const w = parseFloat(weightKg);
        const h = parseFloat(heightCm);
        const a = parseInt(age);
        const act = parseFloat(activity);
        const loss = parseFloat(targetLossPerWeek);

        if (w > 0 && h > 0 && a > 0) {
            // Mifflin-St Jeor for BMR
            let bmr = 10 * w + 6.25 * h - 5 * a;
            bmr += gender === "male" ? 5 : -161;

            // Total Daily Energy Expenditure (TDEE)
            const maintenanceCalories = Math.round(bmr * act);

            // Deficit calculation: 1kg of fat ≈ 7700 kcal
            // Daily deficit = (target loss in kg * 7700) / 7 days
            const dailyDeficit = Math.round((loss * 7700) / 7);

            const targetCalories = maintenanceCalories - dailyDeficit;

            // Minimum safe limits (1200 for women, 1500 for men)
            const minSafe = gender === "female" ? 1200 : 1500;
            const isSafe = targetCalories >= minSafe;

            setResult({
                maintenance: maintenanceCalories,
                deficit: dailyDeficit,
                targetCalories: targetCalories,
                safe: isSafe,
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <CalculatorCard
                title="Calorie Deficit Calculator"
                description="Calculate the exact daily calories you need to consume to hit your target weight loss rate."
            >
                <form onSubmit={calculateDeficit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <Label>Gender</Label>
                            <RadioGroup defaultValue="male" onValueChange={(val) => setGender(val as "male" | "female")} className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="male" id="male" />
                                    <Label htmlFor="male">Male</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="female" id="female" />
                                    <Label htmlFor="female">Female</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="age">Age (years)</Label>
                            <Input
                                id="age"
                                type="number"
                                placeholder="e.g. 30"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t pt-4">
                        <div className="space-y-2">
                            <Label htmlFor="height">Height (cm)</Label>
                            <Input
                                id="height"
                                type="number"
                                placeholder="e.g. 175"
                                value={heightCm}
                                onChange={(e) => setHeightCm(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="weight">Weight (kg)</Label>
                            <Input
                                id="weight"
                                type="number"
                                placeholder="e.g. 80"
                                value={weightKg}
                                onChange={(e) => setWeightKg(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2 border-t pt-4">
                        <Label htmlFor="activity">Activity Level</Label>
                        <Select value={activity} onValueChange={setActivity}>
                            <SelectTrigger id="activity">
                                <SelectValue placeholder="Select activity level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1.2">Sedentary (Little or no exercise)</SelectItem>
                                <SelectItem value="1.375">Lightly active (Exercise 1-3 days/week)</SelectItem>
                                <SelectItem value="1.55">Moderately active (Exercise 3-5 days/week)</SelectItem>
                                <SelectItem value="1.725">Very active (Hard exercise 6-7 days/week)</SelectItem>
                                <SelectItem value="1.9">Super active (Very hard exercise, physical job)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2 border-t pt-4">
                        <Label htmlFor="loss">Target Weight Loss (kg per week)</Label>
                        <Select value={targetLossPerWeek} onValueChange={setTargetLossPerWeek}>
                            <SelectTrigger id="loss">
                                <SelectValue placeholder="Target loss" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0.25">0.25 kg (0.5 lb) - Very Safe</SelectItem>
                                <SelectItem value="0.5">0.5 kg (1 lb) - Recommended</SelectItem>
                                <SelectItem value="0.75">0.75 kg (1.6 lbs) - Aggressive</SelectItem>
                                <SelectItem value="1.0">1.0 kg (2.2 lbs) - Very Aggressive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button type="submit" className="w-full text-lg h-12">Calculate Calories</Button>
                </form>

                {result && (
                    <div className={`mt-8 p-6 rounded-xl text-center animate-in zoom-in-95 duration-300 border ${!result.safe ? 'bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-900' : 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-900'}`}>
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <Activity className={`h-6 w-6 ${!result.safe ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`} />
                            <h3 className={`text-xl font-bold ${!result.safe ? 'text-red-800 dark:text-red-200' : 'text-green-800 dark:text-green-200'}`}>
                                Your Targets
                            </h3>
                        </div>

                        <div className="space-y-4 text-left px-4">
                            <div className="flex justify-between items-center pb-3 border-b border-foreground/10">
                                <span className="font-medium">Maintenance Calories (TDEE):</span>
                                <span className="text-xl font-bold">{result.maintenance.toLocaleString()} <span className="text-sm font-normal">kcal</span></span>
                            </div>

                            <div className="flex justify-between items-center pb-3 border-b border-foreground/10">
                                <span className="font-medium">Daily Caloric Deficit:</span>
                                <span className="text-xl font-bold text-destructive">-{result.deficit.toLocaleString()} <span className="text-sm font-normal">kcal</span></span>
                            </div>

                            <div className="flex justify-between items-center pb-4">
                                <span className="font-medium text-lg">Goal Daily Calories:</span>
                                <span className={`text-3xl font-extrabold ${!result.safe ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                                    {result.targetCalories.toLocaleString()}
                                </span>
                            </div>

                            {!result.safe && (
                                <p className="text-sm font-bold text-red-600 dark:text-red-400 mt-4 text-center bg-red-100 dark:bg-red-900/50 p-3 rounded-lg">
                                    Warning: Eating below {gender === 'female' ? 1200 : 1500} calories a day is not recommended without medical supervision. Please consider a slower weight loss target.
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </CalculatorCard>
        </div>
    );
}
