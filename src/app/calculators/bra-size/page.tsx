"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function BraSizeCalculator() {
    const [unit, setUnit] = useState<"inches" | "cm">("inches");

    const [underbust, setUnderbust] = useState("");
    const [bust, setBust] = useState("");

    const [result, setResult] = useState<{ size: string; message: string } | null>(null);

    const calculateBraSize = (e: React.FormEvent) => {
        e.preventDefault();

        let u = parseFloat(underbust);
        let b = parseFloat(bust);

        if (isNaN(u) || isNaN(b) || u <= 0 || b <= 0) return;

        // Convert cm to inches for calculation (US Standard)
        if (unit === "cm") {
            u = u / 2.54;
            b = b / 2.54;
        }

        // Band size calculation (standard US method: +4/5 rule)
        // Add 4 to even numbers, 5 to odd numbers
        let band = Math.round(u);
        if (band % 2 === 0) {
            band += 4;
        } else {
            band += 5;
        }

        // Cup size calculation
        const difference = Math.round(b - band);
        let cup = "AA";

        if (difference <= 0) cup = "AA";
        else if (difference === 1) cup = "A";
        else if (difference === 2) cup = "B";
        else if (difference === 3) cup = "C";
        else if (difference === 4) cup = "D";
        else if (difference === 5) cup = "DD";
        else if (difference === 6) cup = "DDD/F";
        else if (difference === 7) cup = "G";
        else if (difference === 8) cup = "H";
        else if (difference === 9) cup = "I";
        else cup = "J+";

        setResult({
            size: `${band}${cup}`,
            message: "This is based on standard US sizing (+4 method). Trying on sizes is always the best way to ensure perfect fit."
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <CalculatorCard
                title="Bra Size Calculator"
                description="Calculate your estimated US bra size based on your bust and underbust measurements."
            >
                <Tabs defaultValue="inches" onValueChange={(val) => {
                    setUnit(val as "inches" | "cm");
                    setResult(null);
                }} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="inches">Inches (in)</TabsTrigger>
                        <TabsTrigger value="cm">Centimeters (cm)</TabsTrigger>
                    </TabsList>

                    <form onSubmit={calculateBraSize} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="underbust">Underbust Measurement</Label>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <AlertCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="w-48 text-xs">Measure snugly around your ribcage, directly under the bust.</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <Input
                                    id="underbust"
                                    type="number"
                                    step="0.1"
                                    placeholder={`e.g. ${unit === 'inches' ? '32' : '81'}`}
                                    value={underbust}
                                    onChange={(e) => setUnderbust(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="bust">Bust Measurement</Label>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <AlertCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="w-48 text-xs">Measure loosely around the fullest part of your bust.</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <Input
                                    id="bust"
                                    type="number"
                                    step="0.1"
                                    placeholder={`e.g. ${unit === 'inches' ? '36' : '91'}`}
                                    value={bust}
                                    onChange={(e) => setBust(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-full text-lg h-12">Calculate Size</Button>
                    </form>
                </Tabs>

                {result && (
                    <div className="mt-8 p-6 rounded-xl bg-pink-50 dark:bg-pink-950/30 text-center animate-in zoom-in-95 duration-300">
                        <h3 className="text-lg font-medium text-pink-800 dark:text-pink-200 mb-2">Your Estimated Size</h3>
                        <div className="text-6xl font-extrabold mb-4 text-pink-600 dark:text-pink-400">
                            {result.size}
                        </div>
                        <p className="text-sm font-medium text-pink-700 dark:text-pink-300 max-w-sm mx-auto">
                            {result.message}
                        </p>
                    </div>
                )}
            </CalculatorCard>
        </div>
    );
}
