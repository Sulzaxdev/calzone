"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plane } from "lucide-react";

export default function HolidayCalculator() {
    const [flights, setFlights] = useState("");
    const [accommodation, setAccommodation] = useState("");
    const [dailyBudget, setDailyBudget] = useState("");
    const [days, setDays] = useState("");
    const [excursions, setExcursions] = useState("");
    const [insurance, setInsurance] = useState("");

    const [result, setResult] = useState<{ total: string; perPerson: string } | null>(null);

    const calculateCost = (e: React.FormEvent) => {
        e.preventDefault();

        const f = parseFloat(flights) || 0;
        const a = parseFloat(accommodation) || 0;
        const dBudget = parseFloat(dailyBudget) || 0;
        const numDays = parseFloat(days) || 0;
        const exc = parseFloat(excursions) || 0;
        const ins = parseFloat(insurance) || 0;

        const total = f + a + (dBudget * numDays) + exc + ins;

        if (total > 0) {
            setResult({
                total: total.toFixed(2),
                perPerson: "N/A" // Simple version, could add adults/children
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <CalculatorCard
                title="Holiday Cost Calculator"
                description="Estimate the total budget required for your next vacation or holiday."
            >
                <form onSubmit={calculateCost} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="flights">Travel / Flights (£)</Label>
                            <Input
                                id="flights"
                                type="number"
                                placeholder="e.g. 500"
                                value={flights}
                                onChange={(e) => setFlights(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="accommodation">Accommodation (£)</Label>
                            <Input
                                id="accommodation"
                                type="number"
                                placeholder="e.g. 800"
                                value={accommodation}
                                onChange={(e) => setAccommodation(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="days">Duration (Days)</Label>
                            <Input
                                id="days"
                                type="number"
                                placeholder="e.g. 7"
                                value={days}
                                onChange={(e) => setDays(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dailyBudget">Daily Spending Budget (£)</Label>
                            <Input
                                id="dailyBudget"
                                type="number"
                                placeholder="e.g. 100"
                                value={dailyBudget}
                                onChange={(e) => setDailyBudget(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="excursions">Excursions & Activities (£)</Label>
                            <Input
                                id="excursions"
                                type="number"
                                placeholder="e.g. 200"
                                value={excursions}
                                onChange={(e) => setExcursions(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="insurance">Travel Insurance (£)</Label>
                            <Input
                                id="insurance"
                                type="number"
                                placeholder="e.g. 50"
                                value={insurance}
                                onChange={(e) => setInsurance(e.target.value)}
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full text-lg h-12">Calculate Holiday Cost</Button>
                </form>

                {result && (
                    <div className="mt-8 p-6 rounded-xl bg-sky-50 dark:bg-sky-950/30 text-center animate-in zoom-in-95 duration-300">
                        <div className="flex justify-center items-center gap-2 mb-4">
                            <Plane className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                            <h3 className="text-xl font-bold text-sky-800 dark:text-sky-200">Total Estimated Cost</h3>
                        </div>
                        <div className="text-5xl font-extrabold mb-2 text-sky-600 dark:text-sky-400">
                            £{result.total}
                        </div>
                        <p className="text-sm font-medium text-sky-700 dark:text-sky-300">
                            Includes daily spending for {days} days.
                        </p>
                    </div>
                )}
            </CalculatorCard>
        </div>
    );
}
