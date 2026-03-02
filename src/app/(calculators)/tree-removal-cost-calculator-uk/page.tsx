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

const TREE_SIZES = {
    small: { base: 150, max: 300, name: "Small (up to 15ft)" },
    medium: { base: 300, max: 600, name: "Medium (15ft - 30ft)" },
    large: { base: 600, max: 1500, name: "Large (30ft - 60ft)" },
    xlarge: { base: 1500, max: 3000, name: "Extra Large (Over 60ft)" },
};

const formSchema = z.object({
    size: z.enum(["small", "medium", "large", "xlarge"]),
    stumpRemoval: z.boolean(),
    wasteDisposal: z.boolean(),
    easyAccess: z.boolean(),
});

type ResultData = {
    minCost: number;
    maxCost: number;
};

export default function TreeRemovalCostCalculator() {
    const [result, setResult] = useState<ResultData | null>(null);

    const { register, handleSubmit, setValue, watch } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            size: "medium",
            stumpRemoval: false,
            wasteDisposal: true,
            easyAccess: true,
        },
    });

    const size = watch("size");
    const stumpRemoval = watch("stumpRemoval");
    const wasteDisposal = watch("wasteDisposal");
    const easyAccess = watch("easyAccess");

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const selectedSize = TREE_SIZES[values.size];

        let minE = selectedSize.base;
        let maxE = selectedSize.max;

        // Optional Add-ons
        if (values.stumpRemoval) {
            minE += 80;
            maxE += 250;
        }

        if (values.wasteDisposal) {
            minE += 50;
            maxE += 150;
        }

        // Access modifier
        if (!values.easyAccess) {
            minE *= 1.3;
            maxE *= 1.4;
        }

        setResult({
            minCost: Math.floor(minE),
            maxCost: Math.ceil(maxE),
        });
    };

    return (
        <CalculatorCard
            title="Tree Removal Cost"
            description="Estimate the cost of hiring a tree surgeon (arborist) in the UK to fell and remove a tree."
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">

                    <div className="space-y-2">
                        <Label>Estimated Tree Size</Label>
                        <Select onValueChange={(val) => setValue("size", val as "small" | "medium" | "large" | "xlarge")} defaultValue={size}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="small">Small (up to 15ft)</SelectItem>
                                <SelectItem value="medium">Medium (15ft - 30ft)</SelectItem>
                                <SelectItem value="large">Large (30ft - 60ft)</SelectItem>
                                <SelectItem value="xlarge">Extra Large (Over 60ft)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="stump"
                                className="w-4 h-4 rounded text-primary border-gray-300"
                                checked={stumpRemoval}
                                onChange={(e) => setValue("stumpRemoval", e.target.checked)}
                            />
                            <Label htmlFor="stump" className="cursor-pointer">Stump Grinding / Removal</Label>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="waste"
                                className="w-4 h-4 rounded text-primary border-gray-300"
                                checked={wasteDisposal}
                                onChange={(e) => setValue("wasteDisposal", e.target.checked)}
                            />
                            <Label htmlFor="waste" className="cursor-pointer">Waste Disposal (Log/chipping removal)</Label>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="access"
                                className="w-4 h-4 rounded text-primary border-gray-300"
                                checked={easyAccess}
                                onChange={(e) => setValue("easyAccess", e.target.checked)}
                            />
                            <Label htmlFor="access" className="cursor-pointer">Easy Property Access for Machinery</Label>
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

                    <div className="flex items-start gap-2 text-xs text-muted-foreground bg-card p-3 rounded text-left shadow-sm mx-auto mt-2">
                        <Info className="w-5 h-5 shrink-0 mt-0.5 text-primary" />
                        <p>
                            Prices vary significantly based on location and risk (e.g., proximity to power lines or buildings). This excludes checking for TPO (Tree Preservation Orders).
                        </p>
                    </div>
                </div>
            )}
        </CalculatorCard>
    );
}
