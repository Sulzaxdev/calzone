"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function BMRCalculator() {
    const [unit, setUnit] = useState<"metric" | "imperial">("metric");
    const [gender, setGender] = useState<"male" | "female">("male");
    const [age, setAge] = useState("");

    // Metric
    const [cm, setCm] = useState("");
    const [kg, setKg] = useState("");

    // Imperial
    const [ft, setFt] = useState("");
    const [inVal, setInVal] = useState("");
    const [lbs, setLbs] = useState("");

    const [result, setResult] = useState<number | null>(null);

    const calculateBMR = (e: React.FormEvent) => {
        e.preventDefault();
        let weightKg = 0;
        let heightCm = 0;
        const ageNum = parseInt(age);

        if (unit === "metric") {
            weightKg = parseFloat(kg);
            heightCm = parseFloat(cm);
        } else {
            weightKg = parseFloat(lbs) * 0.453592;
            heightCm = ((parseFloat(ft) || 0) * 12 + parseFloat(inVal)) * 2.54;
        }

        if (weightKg > 0 && heightCm > 0 && ageNum > 0) {
            let bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum;
            bmr += gender === "male" ? 5 : -161;
            setResult(Math.round(bmr));
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <CalculatorCard
                title="BMR Calculator"
                description="Calculate your Basal Metabolic Rate (BMR) - the number of calories your body needs to accomplish its most basic (basal) life-sustaining functions."
            >
                <Tabs defaultValue="metric" onValueChange={(val) => {
                    setUnit(val as "metric" | "imperial");
                    setResult(null);
                }} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="metric">Metric (kg, cm)</TabsTrigger>
                        <TabsTrigger value="imperial">Imperial (lbs, ft)</TabsTrigger>
                    </TabsList>

                    <form onSubmit={calculateBMR} className="space-y-6">
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

                        <TabsContent value="metric" className="space-y-4 mt-0">
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

                        <TabsContent value="imperial" className="space-y-4 mt-0">
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

                        <Button type="submit" className="w-full text-lg h-12">Calculate BMR</Button>
                    </form>
                </Tabs>

                {result && (
                    <div className="mt-8 p-6 rounded-xl bg-muted/50 text-center animate-in zoom-in-95 duration-300">
                        <div className="flex justify-center items-center gap-2 mb-2">
                            <h3 className="text-lg font-medium">Your BMR is</h3>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="w-48 text-xs">Mifflin-St Jeor Equation is used for this calculation, considered the most accurate standard.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="text-5xl font-extrabold mb-2 text-primary">
                            {result.toLocaleString()} <span className="text-2xl font-normal text-muted-foreground">kcal/day</span>
                        </div>
                    </div>
                )}
            </CalculatorCard>
        </div>
    );
}
