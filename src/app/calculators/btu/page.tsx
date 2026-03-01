"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Flame } from "lucide-react";

export default function BTUCalculator() {
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("2.4"); // Standard UK ceiling
    const [unit, setUnit] = useState<"meters" | "feet">("meters");
    const [insulation, setInsulation] = useState("average");

    const [result, setResult] = useState<{ btu: number; kw: string } | null>(null);

    const calculateBTU = (e: React.FormEvent) => {
        e.preventDefault();

        let l = parseFloat(length);
        let w = parseFloat(width);
        let h = parseFloat(height);

        if (isNaN(l) || isNaN(w) || isNaN(h)) return;

        if (unit === "meters") {
            // rough conversion to feet
            l *= 3.28084;
            w *= 3.28084;
            h *= 3.28084;
        }

        const volume = l * w * h;
        let multiplier = 4; // average

        if (insulation === "poor") multiplier = 5;
        if (insulation === "good") multiplier = 3.5;

        const btu = Math.round(volume * multiplier);
        const kw = (btu / 3412.142).toFixed(2); // 1 kW = 3412.142 BTUs

        setResult({ btu, kw });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <CalculatorCard
                title="BTU Radiator Calculator"
                description="Calculate the British Thermal Units (BTU) and Watts needed to effectively heat a room."
            >
                <form onSubmit={calculateBTU} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="unit">Measurement Unit</Label>
                        <Select value={unit} onValueChange={(v) => setUnit(v as "meters" | "feet")}>
                            <SelectTrigger id="unit">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="meters">Meters</SelectItem>
                                <SelectItem value="feet">Feet</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="length">Length</Label>
                            <Input id="length" type="number" step="0.1" value={length} onChange={(e) => setLength(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="width">Width</Label>
                            <Input id="width" type="number" step="0.1" value={width} onChange={(e) => setWidth(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="height">Height</Label>
                            <Input id="height" type="number" step="0.1" value={height} onChange={(e) => setHeight(e.target.value)} required />
                        </div>
                    </div>

                    <div className="space-y-2 border-t pt-4">
                        <Label htmlFor="insulation">Room Insulation</Label>
                        <Select value={insulation} onValueChange={setInsulation}>
                            <SelectTrigger id="insulation">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="poor">Poor (Single glazed, no wall insulation)</SelectItem>
                                <SelectItem value="average">Average (Double glazed, standard walls)</SelectItem>
                                <SelectItem value="good">Good (Modern build, high insulation)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button type="submit" className="w-full text-lg h-12">Calculate BTU</Button>
                </form>

                {result && (
                    <div className="mt-8 p-6 rounded-xl bg-orange-50 dark:bg-orange-950/30 text-center animate-in zoom-in-95 duration-300">
                        <div className="flex justify-center items-center gap-2 mb-4">
                            <Flame className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                            <h3 className="text-xl font-bold text-orange-800 dark:text-orange-200">Heating Requirement</h3>
                        </div>
                        <div className="text-5xl font-extrabold mb-2 text-orange-600 dark:text-orange-400">
                            {result.btu.toLocaleString()} <span className="text-lg font-normal">BTU/hr</span>
                        </div>
                        <p className="text-sm font-medium text-orange-700 dark:text-orange-300">
                            Equivalent to {result.kw} kW or {(parseFloat(result.kw) * 1000).toFixed(0)} Watts.
                        </p>
                    </div>
                )}
            </CalculatorCard>
        </div>
    );
}
