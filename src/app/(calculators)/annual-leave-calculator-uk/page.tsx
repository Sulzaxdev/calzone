"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";

export default function AnnualLeaveCalculator() {
    const [daysPerWeek, setDaysPerWeek] = useState("5");

    const [result, setResult] = useState<{ entitlement: string } | null>(null);

    const calculateLeave = (e: React.FormEvent) => {
        e.preventDefault();
        const days = parseFloat(daysPerWeek);

        if (days > 0 && days <= 7) {
            // UK statutory minimum is 5.6 weeks
            let holiday = days * 5.6;
            // Statutory max is 28 days
            if (holiday > 28) holiday = 28;

            setResult({ entitlement: holiday.toFixed(1) });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <CalculatorCard
                title="UK Annual Leave Calculator"
                description="Calculate your statutory minimum annual holiday entitlement based on the days you work per week."
                hasResult={!!result}
            >
                <form onSubmit={calculateLeave} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="days">Days worked per week</Label>
                        <Input
                            id="days"
                            type="number"
                            step="0.5"
                            min="0.5"
                            max="7"
                            placeholder="e.g. 5"
                            value={daysPerWeek}
                            onChange={(e) => setDaysPerWeek(e.target.value)}
                            required
                        />
                        <p className="text-xs text-muted-foreground mt-1">Include part days as fractions (e.g. 4.5).</p>
                    </div>

                    <Button type="submit" className="w-full text-lg h-12">Calculate Entitlement</Button>
                </form>

                {result && (
                    <div className="mt-8 p-6 rounded-xl bg-teal-50 dark:bg-teal-950/30 text-center animate-in zoom-in-95 duration-300">
                        <div className="flex justify-center items-center gap-2 mb-4">
                            <CalendarDays className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                            <h3 className="text-xl font-bold text-teal-800 dark:text-teal-200">Statutory Entitlement</h3>
                        </div>
                        <div className="text-5xl font-extrabold mb-2 text-teal-600 dark:text-teal-400">
                            {result.entitlement} <span className="text-2xl font-medium">Days</span>
                        </div>
                        <p className="text-sm font-medium text-teal-700 dark:text-teal-300 max-w-sm mx-auto">
                            This is the legal minimum for a full leave year in the UK. (Capped at 28 days).
                        </p>
                    </div>
                )}
            </CalculatorCard>
        </div>
    );
}
