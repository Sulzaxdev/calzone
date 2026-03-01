"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Baby } from "lucide-react";

export default function ChildGrowthCalculator() {
    const [gender, setGender] = useState<"boy" | "girl">("boy");
    const [ageMonths, setAgeMonths] = useState("");
    const [weight, setWeight] = useState(""); // kg
    const [height, setHeight] = useState(""); // cm

    const [result, setResult] = useState<{
        bmi: string;
        status: string;
        avgWeight: string;
        avgHeight: string;
    } | null>(null);

    const calculateGrowth = (e: React.FormEvent) => {
        e.preventDefault();

        const m = parseInt(ageMonths);
        const w = parseFloat(weight);
        const h = parseFloat(height);

        if (m > 0 && w > 0 && h > 0) {
            // Basic BMI Calculation
            const heightInMeters = h / 100;
            const bmi = w / (heightInMeters * heightInMeters);

            // Highly simplified "average" estimates (NOT MEDICAL ADVICE)
            // Real CDC/WHO charts require complex statistical tables.
            // These are extremely rough linear approximations for demonstration purposes.
            let estWeight = 0;
            let estHeight = 0;

            if (m <= 12) {
                estWeight = gender === "boy" ? 3.3 + (m * 0.6) : 3.2 + (m * 0.55);
                estHeight = gender === "boy" ? 50 + (m * 2) : 49 + (m * 1.9);
            } else if (m <= 60) {
                const years = m / 12;
                estWeight = gender === "boy" ? 9.5 + (years * 2) : 9 + (years * 1.9);
                estHeight = gender === "boy" ? 75 + (years * 6) : 74 + (years * 6);
            } else {
                const years = m / 12;
                estWeight = gender === "boy" ? 18 + ((years - 5) * 2.5) : 17.5 + ((years - 5) * 2.5);
                estHeight = gender === "boy" ? 110 + ((years - 5) * 6) : 109 + ((years - 5) * 6);
            }

            // Simplified BMI-for-age categories (rough guide)
            let status = "Healthy Weight";
            if (bmi < 14) status = "Underweight";
            else if (bmi > 18) status = "Risk of Overweight";
            else if (bmi > 20) status = "Overweight";

            setResult({
                bmi: bmi.toFixed(1),
                status,
                avgWeight: estWeight.toFixed(1),
                avgHeight: estHeight.toFixed(1)
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <CalculatorCard
                title="Child Growth Estimator"
                description="Estimate where your child stands compared to simplified average growth charts. (Always consult a pediatrician for actual medical advice)."
            >
                <form onSubmit={calculateGrowth} className="space-y-6">
                    <div className="space-y-3">
                        <Label>Child's Gender</Label>
                        <RadioGroup defaultValue="boy" onValueChange={(val) => setGender(val as "boy" | "girl")} className="flex gap-4">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="boy" id="boy" />
                                <Label htmlFor="boy">Boy</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="girl" id="girl" />
                                <Label htmlFor="girl">Girl</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="age">Age (in months)</Label>
                            <Input
                                id="age"
                                type="number"
                                placeholder="e.g. 24"
                                value={ageMonths}
                                onChange={(e) => setAgeMonths(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="height">Height (cm)</Label>
                            <Input
                                id="height"
                                type="number"
                                step="0.1"
                                placeholder="e.g. 85"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="weight">Weight (kg)</Label>
                            <Input
                                id="weight"
                                type="number"
                                step="0.1"
                                placeholder="e.g. 12"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full text-lg h-12">Estimate Growth</Button>
                </form>

                {result && (
                    <div className="mt-8 p-6 rounded-xl bg-purple-50 dark:bg-purple-950/30 text-center animate-in zoom-in-95 duration-300">
                        <div className="flex justify-center items-center gap-2 mb-4">
                            <Baby className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200">Growth Estimates</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-left border-b border-purple-200 dark:border-purple-800 pb-4 mb-4">
                            <div>
                                <span className="block text-sm text-purple-700 dark:text-purple-300">Estimated Average Weight for Age:</span>
                                <span className="text-xl font-bold text-purple-900 dark:text-purple-100">{result.avgWeight} kg</span>
                            </div>
                            <div>
                                <span className="block text-sm text-purple-700 dark:text-purple-300">Estimated Average Height for Age:</span>
                                <span className="text-xl font-bold text-purple-900 dark:text-purple-100">{result.avgHeight} cm</span>
                            </div>
                        </div>
                        <div>
                            <span className="block text-sm text-purple-700 dark:text-purple-300">Your Child's BMI:</span>
                            <span className="text-3xl font-extrabold text-purple-600 dark:text-purple-400">{result.bmi}</span>
                            <span className="block text-lg font-medium text-purple-800 dark:text-purple-200 mt-1">{result.status}</span>
                        </div>
                    </div>
                )}
            </CalculatorCard>
        </div>
    );
}
