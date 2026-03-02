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
import { AlertCircle } from "lucide-react";

const MATERIAL_COSTS = {
    upvc: 300,
    aluminum: 450,
    wood: 550,
};

const WINDOW_TYPES = {
    casement: 1,
    sash: 1.3,
    bay: 1.6,
};

const formSchema = z.object({
    material: z.enum(["upvc", "aluminum", "wood"]),
    style: z.enum(["casement", "sash", "bay"]),
    quantity: z.number().min(1).max(30).int(),
});

type ResultData = {
    minCost: number;
    maxCost: number;
};

export default function DoubleGlazingCostCalculator() {
    const [result, setResult] = useState<ResultData | null>(null);

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            material: "upvc",
            style: "casement",
            quantity: 4,
        },
    });

    const material = watch("material");
    const style = watch("style");

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const baseWindowCost = MATERIAL_COSTS[values.material];
        const styleModifier = WINDOW_TYPES[values.style];

        // Average cost per window based on material and style
        const averageCost = baseWindowCost * styleModifier;
        const totalAverage = averageCost * values.quantity;

        // Provide a 15% +/- range
        setResult({
            minCost: Math.floor(totalAverage * 0.85),
            maxCost: Math.ceil(totalAverage * 1.15),
        });
    };

    return (
        <CalculatorCard
            title="Double Glazing Cost Calculator"
            description="Get a rough estimate for replacing your windows based on UK averages."
            hasResult={!!result}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">

                    <div className="space-y-2">
                        <Label>Frame Material</Label>
                        <Select onValueChange={(val) => setValue("material", val as "upvc" | "aluminum" | "wood")} defaultValue={material}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select material" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="upvc">uPVC (Most common)</SelectItem>
                                <SelectItem value="aluminum">Aluminum</SelectItem>
                                <SelectItem value="wood">Timber / Wood</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Window Style</Label>
                        <Select onValueChange={(val) => setValue("style", val as "casement" | "sash" | "bay")} defaultValue={style}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select style" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="casement">Standard Casement</SelectItem>
                                <SelectItem value="sash">Sash Window</SelectItem>
                                <SelectItem value="bay">Bay Window</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="quantity">Number of Windows</Label>
                        <Input
                            id="quantity"
                            type="number"
                            min={1}
                            max={30}
                            {...register("quantity", { valueAsNumber: true })}
                        />
                        {errors.quantity && <p className="text-sm text-destructive">{errors.quantity.message?.toString()}</p>}
                    </div>

                </div>

                <Button type="submit" className="w-full">
                    Estimate Cost
                </Button>
            </form>

            {result && (
                <div className="mt-8 p-6 bg-muted/50 rounded-lg space-y-4">
                    <h3 className="text-xl font-bold text-center">Estimated Price Range</h3>

                    <div className="flex justify-center items-center gap-2 text-2xl font-extrabold text-primary">
                        <span>£{result.minCost.toLocaleString()}</span>
                        <span className="text-muted-foreground font-normal">-</span>
                        <span>£{result.maxCost.toLocaleString()}</span>
                    </div>

                    <div className="flex items-start gap-3 text-sm text-muted-foreground bg-card p-4 rounded-md border shadow-sm">
                        <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <p>
                            This is a national average estimate including typical installation costs. Access difficulties, scaffolding, or premium glass (like acoustic or solar-control) will increase these costs.
                        </p>
                    </div>
                </div>
            )}
        </CalculatorCard>
    );
}
