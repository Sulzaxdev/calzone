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
import { Info } from "lucide-react";

const MATERIALS = {
    felt: { cost: 50, life: "15-20 years" },
    epdm: { cost: 80, life: "30-50 years" },
    fibreglass: { cost: 90, life: "25-30 years" },
};

const formSchema = z.object({
    width: z.number().min(1).max(100),
    length: z.number().min(1).max(100),
    material: z.enum(["felt", "epdm", "fibreglass"]),
    removeOld: z.boolean(),
    insulation: z.boolean(),
});

type ResultData = {
    minCost: number;
    maxCost: number;
    area: number;
    lifespan: string;
};

export default function FlatRoofReplacementCostCalculator() {
    const [result, setResult] = useState<ResultData | null>(null);

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            width: 4,
            length: 5,
            material: "epdm",
            removeOld: true,
            insulation: false, // warm roof upgrade
        },
    });

    const material = watch("material");
    const removeOld = watch("removeOld");
    const insulation = watch("insulation");

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const area = values.width * values.length;

        // Base material & installation cost per sqm
        let pSqm = MATERIALS[values.material].cost;

        // Removing old roof adds ~£20/sqm
        if (values.removeOld) pSqm += 20;

        // Adding rigid insulation board (warm roof) adds ~£40/sqm
        if (values.insulation) pSqm += 40;

        const baseEstimate = area * pSqm;

        // Range +/- 15%
        setResult({
            minCost: Math.floor(baseEstimate * 0.85),
            maxCost: Math.ceil(baseEstimate * 1.15),
            area,
            lifespan: MATERIALS[values.material].life,
        });
    };

    return (
        <CalculatorCard
            title="Flat Roof Replacement Cost"
            description="Calculate the average UK cost of replacing a flat roof on an extension or garage."
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="width">Width (Meters)</Label>
                            <Input
                                id="width"
                                type="number"
                                min={1}
                                max={100}
                                {...register("width", { valueAsNumber: true })}
                            />
                            {errors.width && <p className="text-sm text-destructive">{errors.width.message?.toString()}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="length">Length (Meters)</Label>
                            <Input
                                id="length"
                                type="number"
                                min={1}
                                max={100}
                                {...register("length", { valueAsNumber: true })}
                            />
                            {errors.length && <p className="text-sm text-destructive">{errors.length.message?.toString()}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Covering Material</Label>
                        <Select onValueChange={(val) => setValue("material", val as "felt" | "epdm" | "fibreglass")} defaultValue={material}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select material" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="felt">Felt (Cheapest, Shortest lifespan)</SelectItem>
                                <SelectItem value="epdm">EPDM Rubber (Most popular)</SelectItem>
                                <SelectItem value="fibreglass">Fibreglass / GRP (Durable)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="remove"
                                className="w-4 h-4 rounded text-primary border-gray-300"
                                checked={removeOld}
                                onChange={(e) => setValue("removeOld", e.target.checked)}
                            />
                            <Label htmlFor="remove" className="cursor-pointer">Strip off old roof covering</Label>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="insulate"
                                className="w-4 h-4 rounded text-primary border-gray-300"
                                checked={insulation}
                                onChange={(e) => setValue("insulation", e.target.checked)}
                            />
                            <Label htmlFor="insulate" className="cursor-pointer">Upgrade to 'Warm Roof' (Adds insulation board)</Label>
                        </div>
                    </div>
                </div>

                <Button type="submit" className="w-full">
                    Estimate Cost
                </Button>
            </form>

            {result && (
                <div className="mt-8 p-6 bg-muted/50 rounded-lg space-y-4 text-center">
                    <h3 className="text-xl font-bold">Estimated Cost Range</h3>

                    <div className="flex justify-center items-center gap-2 text-3xl font-extrabold text-primary py-2">
                        <span>£{result.minCost.toLocaleString()}</span>
                        <span className="text-muted-foreground font-normal">-</span>
                        <span>£{result.maxCost.toLocaleString()}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mt-4 p-4 bg-background rounded-md border text-muted-foreground">
                        <div className="text-left font-medium">Area size:</div>
                        <div className="text-right text-foreground font-semibold">{result.area} m²</div>
                        <div className="text-left font-medium border-t pt-2">Est. Lifespan:</div>
                        <div className="text-right text-foreground font-semibold border-t pt-2">{result.lifespan}</div>
                    </div>

                    <div className="flex items-start gap-2 text-xs text-muted-foreground pt-4 mx-auto mt-2">
                        <Info className="w-4 h-4 shrink-0 mt-0.5" />
                        <p className="text-left">
                            Does not include replacement of decking boards underneath if they are rotten, which is often only discovered once the old roof is stripped.
                        </p>
                    </div>
                </div>
            )}
        </CalculatorCard>
    );
}
