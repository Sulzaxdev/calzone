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

const HOURLY_RATES = {
    apprentice: 60,
    standard: 100,
    premium: 150,
};

const formSchema = z.object({
    artistLevel: z.enum(["apprentice", "standard", "premium"]),
    hours: z.number().min(1).max(100).int(),
    color: z.boolean(),
    customDesign: z.boolean(),
});

type ResultData = {
    estimatedCost: number;
    rateUsed: number;
};

export default function TattooCostCalculator() {
    const [result, setResult] = useState<ResultData | null>(null);

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            artistLevel: "standard",
            hours: 2,
            color: false,
            customDesign: true,
        },
    });

    const artistLevel = watch("artistLevel");
    const color = watch("color");
    const customDesign = watch("customDesign");

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        let rate = HOURLY_RATES[values.artistLevel];

        // Premiums for color (+10/hr) and custom drawing fee (flat)
        if (values.color) rate += 10;

        let totalCost = rate * values.hours;
        if (values.customDesign && values.artistLevel !== "apprentice") {
            totalCost += 50; // Flat drawing fee usually baked into deposits
        }

        setResult({
            estimatedCost: totalCost,
            rateUsed: rate,
        });
    };

    return (
        <CalculatorCard
            title="Tattoo Cost Estimator"
            description="Calculate rough ink pricing based on UK hourly rates and session length."
            hasResult={!!result}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">

                    <div className="space-y-2">
                        <Label>Artist Experience Level</Label>
                        <Select onValueChange={(val) => setValue("artistLevel", val as "apprentice" | "standard" | "premium")} defaultValue={artistLevel}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select experience" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="apprentice">Apprentice / Junior (£60/hr)</SelectItem>
                                <SelectItem value="standard">Standard Studio Artist (£100/hr)</SelectItem>
                                <SelectItem value="premium">Premium / In-Demand (£150+/hr)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="hours">Estimated Session Length (Hours)</Label>
                        <Input
                            id="hours"
                            type="number"
                            min={1}
                            max={100}
                            {...register("hours", { valueAsNumber: true })}
                        />
                        {errors.hours && <p className="text-sm text-destructive">{errors.hours.message?.toString()}</p>}
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="color"
                                className="w-4 h-4 rounded text-primary border-gray-300"
                                checked={color}
                                onChange={(e) => setValue("color", e.target.checked)}
                            />
                            <Label htmlFor="color" className="cursor-pointer">Full Colour Tattoo</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="custom"
                                className="w-4 h-4 rounded text-primary border-gray-300"
                                checked={customDesign}
                                onChange={(e) => setValue("customDesign", e.target.checked)}
                            />
                            <Label htmlFor="custom" className="cursor-pointer">Custom Drawn Design</Label>
                        </div>
                    </div>
                </div>

                <Button type="submit" className="w-full">
                    Estimate Tattoo Cost
                </Button>
            </form>

            {result && (
                <div className="mt-8 p-6 bg-muted/50 rounded-lg space-y-4 text-center">
                    <h3 className="text-xl font-bold">Estimated Session Cost</h3>

                    <div className="text-4xl font-extrabold text-primary py-2">
                        £{result.estimatedCost.toLocaleString()}
                    </div>

                    <div className="flex items-start gap-2 text-xs text-muted-foreground bg-card p-3 rounded text-left border shadow-sm mx-auto max-w-[280px]">
                        <Info className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                        <p>
                            Calculated at roughly £{result.rateUsed}/hr. Note that artists quote by the piece, day rate (usually £400-£800), or strictly hourly depending on the studio.
                        </p>
                    </div>
                </div>
            )}
        </CalculatorCard>
    );
}
