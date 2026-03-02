"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, CarFront } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function RoadTaxCalculator() {
    const [vehicleType, setVehicleType] = useState<string>("petrol");
    const [co2Emissions, setCo2Emissions] = useState("");
    const [listPrice, setListPrice] = useState("");

    const [result, setResult] = useState<{ firstYear: number; standard: number; surcharge: number | null } | null>(null);

    const calculateTax = (e: React.FormEvent) => {
        e.preventDefault();

        const co2 = parseInt(co2Emissions) || 0;
        const price = parseInt(listPrice) || 0;

        let firstYear = 0;
        let standard = 190; // Standard rate for petrol/diesel 2024/25

        // Very simplified UK VED logic for demonstration
        if (vehicleType === "electric") {
            firstYear = 0;
            standard = 0;
        } else if (vehicleType === "hybrid") {
            standard = 180; // £10 alternative fuel discount

            if (co2 === 0) firstYear = 0;
            else if (co2 <= 50) firstYear = 10;
            else if (co2 <= 75) firstYear = 20;
            else if (co2 <= 90) firstYear = 125;
            else if (co2 <= 100) firstYear = 165;
            else if (co2 <= 110) firstYear = 185;
            else if (co2 <= 130) firstYear = 245;
            else if (co2 <= 150) firstYear = 265;
            else if (co2 <= 170) firstYear = 670;
            else if (co2 <= 190) firstYear = 1085;
            else if (co2 <= 225) firstYear = 1555;
            else if (co2 <= 255) firstYear = 2210;
            else firstYear = 2595;

        } else { // Petrol or Diesel (assuming RDE2 compliant for simplicity)
            if (co2 === 0) firstYear = 0;
            else if (co2 <= 50) firstYear = 10;
            else if (co2 <= 75) firstYear = 30;
            else if (co2 <= 90) firstYear = 135;
            else if (co2 <= 100) firstYear = 175;
            else if (co2 <= 110) firstYear = 195;
            else if (co2 <= 130) firstYear = 255;
            else if (co2 <= 150) firstYear = 275;
            else if (co2 <= 170) firstYear = 680;
            else if (co2 <= 190) firstYear = 1095;
            else if (co2 <= 225) firstYear = 1565;
            else if (co2 <= 255) firstYear = 2220;
            else firstYear = 2605;
        }

        // Expensive car surcharge (list price > £40,000)
        let surcharge = null;
        if (price > 40000 && vehicleType !== "electric") {
            surcharge = 390; // Additional rate for 5 years
        }

        setResult({ firstYear, standard, surcharge });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <CalculatorCard
                title="UK Road Tax Calculator"
                description="Estimate Vehicle Excise Duty (VED) for cars registered after April 2017 (2024/2025 rates)."
                hasResult={!!result}
            >
                <form onSubmit={calculateTax} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="type">Vehicle Type</Label>
                        <Select value={vehicleType} onValueChange={setVehicleType}>
                            <SelectTrigger id="type">
                                <SelectValue placeholder="Select fuel type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="petrol">Petrol / Diesel (RDE2 compliant)</SelectItem>
                                <SelectItem value="hybrid">Hybrid / Alternative Fuel</SelectItem>
                                <SelectItem value="electric">Fully Electric (EV)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {vehicleType !== "electric" && (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Label htmlFor="co2">CO2 Emissions (g/km)</Label>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger type="button">
                                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="w-48 text-xs">Found on your V5C registration document or vehicle specifications.</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <Input
                                id="co2"
                                type="number"
                                placeholder="e.g. 120"
                                value={co2Emissions}
                                onChange={(e) => setCo2Emissions(e.target.value)}
                                required={vehicleType !== "electric"}
                            />
                        </div>
                    )}

                    <div className="space-y-2 border-t pt-4">
                        <div className="flex items-center gap-2">
                            <Label htmlFor="price">List Price (Original RRP)</Label>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger type="button">
                                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="w-56 text-xs">If the vehicle's list price (including factory options) was over £40,000, an additional surcharge is applied for 5 years.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-muted-foreground font-medium">£</span>
                            <Input
                                id="price"
                                type="number"
                                className="pl-8"
                                placeholder="e.g. 25000"
                                value={listPrice}
                                onChange={(e) => setListPrice(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full text-lg h-12">Calculate Tax</Button>
                </form>

                {result && (
                    <div className="mt-8 p-6 rounded-xl bg-orange-50 dark:bg-orange-950/30 animate-in zoom-in-95 duration-300">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <CarFront className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                            <h3 className="text-xl font-bold text-orange-800 dark:text-orange-200">Tax Estimate</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-4 border-b border-orange-200 dark:border-orange-800">
                                <span className="font-medium text-orange-800 dark:text-orange-300">First Year Rate:</span>
                                <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">£{result.firstYear}</span>
                            </div>

                            <div className="flex justify-between items-center pb-4 border-b border-orange-200 dark:border-orange-800">
                                <span className="font-medium text-orange-800 dark:text-orange-300">Standard Rate (Years 2+):</span>
                                <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">£{result.standard} <span className="text-sm font-normal">/ yr</span></span>
                            </div>

                            {result.surcharge !== null && (
                                <div className="flex justify-between items-center pt-2">
                                    <span className="font-medium text-red-800 dark:text-red-300 flex items-center gap-2">
                                        Expensive Car Surcharge:
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger type="button">
                                                    <AlertCircle className="h-4 w-4" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p className="w-56 text-xs">Applied from year 2 to 6. Add this to the Standard Rate.</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </span>
                                    <span className="text-xl font-bold text-red-600 dark:text-red-400">+£{result.surcharge} <span className="text-sm font-normal">/ yr</span></span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </CalculatorCard>
        </div>
    );
}
