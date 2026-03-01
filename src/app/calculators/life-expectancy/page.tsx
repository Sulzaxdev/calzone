"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { HeartPulse } from "lucide-react";

export default function LifeExpectancyCalculator() {
    const [gender, setGender] = useState<"male" | "female">("male");
    const [age, setAge] = useState("");
    const [smoking, setSmoking] = useState("never");
    const [exercise, setExercise] = useState("rarely");

    const [result, setResult] = useState<{ yearsLeft: number; totalAge: number } | null>(null);

    const calculateLife = (e: React.FormEvent) => {
        e.preventDefault();
        const currentAge = parseInt(age);
        if (currentAge > 0) {
            // Base average life expectancy (WHO approx format)
            let expectedAge = gender === "male" ? 79 : 83;

            // If already past expected age, give them a buffer
            if (currentAge >= expectedAge) {
                expectedAge = currentAge + 5;
            }

            // Modifiers
            if (smoking === "current") expectedAge -= 8;
            if (smoking === "past") expectedAge -= 3;

            if (exercise === "frequent") expectedAge += 4;
            if (exercise === "moderate") expectedAge += 2;
            if (exercise === "rarely") expectedAge -= 2;

            // Make sure the total age isn't lower than current age
            if (expectedAge <= currentAge) {
                expectedAge = currentAge + 2;
            }

            setResult({
                totalAge: expectedAge,
                yearsLeft: expectedAge - currentAge
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <CalculatorCard
                title="Life Expectancy Calculator"
                description="Estimate your life expectancy based on basic demographic and lifestyle factors."
            >
                <form onSubmit={calculateLife} className="space-y-6">
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
                        <Label htmlFor="age">Current Age</Label>
                        <Input
                            id="age"
                            type="number"
                            placeholder="e.g. 30"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2 border-t pt-4">
                        <Label htmlFor="smoking">Smoking Status</Label>
                        <Select value={smoking} onValueChange={setSmoking}>
                            <SelectTrigger id="smoking">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="never">Never Smoked</SelectItem>
                                <SelectItem value="past">Past Smoker</SelectItem>
                                <SelectItem value="current">Current Smoker</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2 border-t pt-4">
                        <Label htmlFor="exercise">Exercise Frequency</Label>
                        <Select value={exercise} onValueChange={setExercise}>
                            <SelectTrigger id="exercise">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="frequent">Frequent (3+ times a week)</SelectItem>
                                <SelectItem value="moderate">Moderate (1-2 times a week)</SelectItem>
                                <SelectItem value="rarely">Rarely / Never</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button type="submit" className="w-full text-lg h-12">Estimate Life Expectancy</Button>
                </form>

                {result && (
                    <div className="mt-8 p-6 rounded-xl bg-pink-50 dark:bg-pink-950/30 text-center animate-in zoom-in-95 duration-300">
                        <div className="flex justify-center items-center gap-2 mb-4">
                            <HeartPulse className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                            <h3 className="text-xl font-bold text-pink-800 dark:text-pink-200">Estimated Life Expectancy</h3>
                        </div>
                        <div className="text-5xl font-extrabold mb-2 text-pink-600 dark:text-pink-400">
                            {result.totalAge} <span className="text-2xl font-medium text-pink-500">Years</span>
                        </div>
                        <p className="text-sm font-medium text-pink-700 dark:text-pink-300">
                            That's approximately {result.yearsLeft} more years to reach your goals!
                        </p>
                    </div>
                )}
            </CalculatorCard>
        </div>
    );
}
