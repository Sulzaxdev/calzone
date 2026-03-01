"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircle, Moon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function SleepDebtCalculator() {
    const [targetHours, setTargetHours] = useState("8");

    // Array of 7 days
    const [actualSleep, setActualSleep] = useState<string[]>(Array(7).fill(""));
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const [result, setResult] = useState<{ debt: number; message: string; color: string } | null>(null);

    const calculateSleepDebt = (e: React.FormEvent) => {
        e.preventDefault();
        const target = parseFloat(targetHours);
        if (!target) return;

        let totalActual = 0;
        let validDays = 0;

        actualSleep.forEach(hours => {
            const h = parseFloat(hours);
            if (!isNaN(h)) {
                totalActual += h;
                validDays++;
            }
        });

        if (validDays > 0) {
            const weeklyTarget = target * validDays;
            const debt = weeklyTarget - totalActual;

            let message = "";
            let color = "";

            if (debt <= 0) {
                message = "No sleep debt! You are well rested.";
                color = "text-green-500";
            } else if (debt <= 4) {
                message = "Minor sleep debt. A quick nap or sleeping early tonight can help.";
                color = "text-yellow-500";
            } else if (debt <= 10) {
                message = "Moderate sleep debt. Aim for an extra hour of sleep each night this week.";
                color = "text-orange-500";
            } else {
                message = "Severe sleep debt. Your cognitive performance and health may be significantly impaired.";
                color = "text-red-500";
            }

            setResult({ debt: parseFloat(debt.toFixed(1)), message, color });
        }
    };

    const handleSleepChange = (index: number, value: string) => {
        const newSleep = [...actualSleep];
        newSleep[index] = value;
        setActualSleep(newSleep);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <CalculatorCard
                title="Sleep Debt Calculator"
                description="Track your sleep over the past 7 days to calculate your accumulated sleep debt and understand its impact."
            >
                <form onSubmit={calculateSleepDebt} className="space-y-6">
                    <div className="space-y-2 pb-4 border-b">
                        <Label htmlFor="target" className="text-base font-semibold text-primary">Your Sleep Target (hours per night)</Label>
                        <Input
                            id="target"
                            type="number"
                            step="0.5"
                            placeholder="e.g. 8"
                            className="max-w-xs"
                            value={targetHours}
                            onChange={(e) => setTargetHours(e.target.value)}
                            required
                        />
                        <p className="text-sm text-muted-foreground">Most adults need 7-9 hours of sleep per night.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Moon className="h-5 w-5 text-primary" />
                            <Label className="text-base font-semibold">Actual Sleep (past 7 days)</Label>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {days.map((day, index) => (
                                <div key={day} className="space-y-1">
                                    <Label htmlFor={`day-${index}`} className="text-xs font-medium text-muted-foreground">{day}</Label>
                                    <Input
                                        id={`day-${index}`}
                                        type="number"
                                        step="0.5"
                                        placeholder="hours"
                                        value={actualSleep[index]}
                                        onChange={(e) => handleSleepChange(index, e.target.value)}
                                        required
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button type="submit" className="w-full text-lg h-12">Calculate Sleep Debt</Button>
                </form>

                {result && (
                    <div className="mt-8 p-6 rounded-xl bg-muted/50 text-center animate-in zoom-in-95 duration-300">
                        <div className="flex justify-center items-center gap-2 mb-2">
                            <h3 className="text-lg font-medium">Your Accumulated Sleep Debt</h3>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="w-56 text-xs">Sleep debt is the difference between the amount of sleep you should be getting and the amount you actually get.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        {result.debt <= 0 ? (
                            <div className="text-5xl font-extrabold mb-4 text-green-500">
                                0 <span className="text-2xl font-normal text-muted-foreground">hours</span>
                            </div>
                        ) : (
                            <div className={`text-5xl font-extrabold mb-4 ${result.color}`}>
                                {result.debt} <span className="text-2xl font-normal text-muted-foreground">hours</span>
                            </div>
                        )}

                        <p className="text-base font-medium text-foreground/80 max-w-sm mx-auto">
                            {result.message}
                        </p>
                    </div>
                )}
            </CalculatorCard>
        </div>
    );
}
