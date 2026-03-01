"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Boilerplate data for heat pump estimations based on UK averages
const PUMP_TYPES = {
    air: { name: "Air Source Heat Pump", base: 8000, max: 15000 },
    ground: { name: "Ground Source Heat Pump", base: 14000, max: 25000 },
    water: { name: "Water Source Heat Pump", base: 10000, max: 20000 },
};

const BEDROOM_MODIFIERS = {
    1: 1.0,
    2: 1.15,
    3: 1.3,
    4: 1.5,
    5: 1.7,
};

const formSchema = z.object({
    type: z.enum(["air", "ground", "water"]),
    bedrooms: z.number().min(1).max(10).int(),
    grantEligibility: z.boolean(),
});

type ResultData = {
    estimatedCost: number;
    grantSavings: number;
    finalCost: number;
};

export default function HeatPumpCostCalculator() {
    const [result, setResult] = useState<ResultData | null>(null);

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: "air",
            bedrooms: 3,
            grantEligibility: true, // Assuming Boiler Upgrade Scheme
        },
    });

    const type = watch("type");
    const grantEligibility = watch("grantEligibility");

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        // Basic calculation logic
        const selectedType = PUMP_TYPES[values.type];
        const modifier = BEDROOM_MODIFIERS[values.bedrooms as keyof typeof BEDROOM_MODIFIERS] || 1.8;

        // Calculate raw cost
        const rawCost = selectedType.base * modifier;

        // UK BUS (Boiler Upgrade Scheme) gives £7,500 off AS and GS heat pumps
        const grantSavings = values.grantEligibility ? 7500 : 0;

        // Final Cost
        const finalCost = Math.max(0, rawCost - grantSavings);

        setResult({
            estimatedCost: rawCost,
            grantSavings,
            finalCost,
        });
    };

    return (
        <CalculatorCard
            title="Heat Pump Cost Calculator"
            description="Estimate the installation cost of a new heat pump in the UK, including potential grants."
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">

                    <div className="space-y-2">
                        <Label>Type of Heat Pump</Label>
                        <Select onValueChange={(val) => setValue("type", val as "air" | "ground" | "water")} defaultValue={type}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="air">Air Source (ASHP)</SelectItem>
                                <SelectItem value="ground">Ground Source (GSHP)</SelectItem>
                                <SelectItem value="water">Water Source (WSHP)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bedrooms">Number of Bedrooms (1-10)</Label>
                        <Input
                            id="bedrooms"
                            type="number"
                            min={1}
                            max={10}
                            {...register("bedrooms", { valueAsNumber: true })}
                        />
                        {errors.bedrooms && <p className="text-sm text-destructive">{errors.bedrooms.message?.toString()}</p>}
                    </div>

                    <div className="space-y-2 flex items-center gap-2 pt-2">
                        <input
                            type="checkbox"
                            id="grant"
                            className="w-4 h-4 rounded text-primary border-gray-300"
                            checked={grantEligibility}
                            onChange={(e) => setValue("grantEligibility", e.target.checked)}
                        />
                        <Label htmlFor="grant" className="cursor-pointer">Apply £7,500 Boiler Upgrade Scheme Grant</Label>
                    </div>

                </div>

                <Button type="submit" className="w-full">
                    Estimate Cost
                </Button>
            </form>

            {result && (
                <div className="mt-8 p-6 bg-muted/50 rounded-lg space-y-4">
                    <h3 className="text-xl font-bold text-center">Estimated Installation Cost</h3>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-muted-foreground">Original Estimate:</div>
                        <div className="text-right font-medium">£{result.estimatedCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>

                        <div className="text-green-600 font-medium">Government Grant:</div>
                        <div className="text-right text-green-600 font-medium">-£{result.grantSavings.toLocaleString()}</div>

                        <div className="col-span-2 border-t pt-2 mt-2"></div>

                        <div className="text-lg font-bold">Total Cost:</div>
                        <div className="text-lg font-bold text-right text-primary">£{result.finalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                    </div>

                    <p className="text-xs text-muted-foreground text-center mt-4">
                        *This is a rough estimate. Actual costs vary based on property insulation, required radiator upgrades, and specific installer rates.
                    </p>
                </div>
            )}
        </CalculatorCard>
    );
}
