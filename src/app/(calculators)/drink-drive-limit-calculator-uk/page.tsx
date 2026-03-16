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
import { AlertTriangle, AlertCircle, Wine } from "lucide-react";

// Extremely rough "standard drinks / units" to BAC calculation formula (Widmark formula) for demonstration only
// r values: Men roughly ~0.68, Women ~0.55
const r_values = {
    male: 0.68,
    female: 0.55
};

const formSchema = z.object({
    gender: z.enum(["male", "female"]),
    weightKg: z.number().min(40).max(200).int(),
    unitsDrank: z.number().min(0).max(50),
    hoursSinceFirstDrink: z.number().min(0.5).max(24),
    country: z.enum(["england_wales_ni", "scotland"])
});

type ResultData = {
    estimatedBac: number;
    isOverLimit: boolean;
    limit: number;
};

export default function DrinkDriveLimitCalculator() {
    const [result, setResult] = useState<ResultData | null>(null);

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            gender: "male",
            weightKg: 80,
            unitsDrank: 4,
            hoursSinceFirstDrink: 2,
            country: "england_wales_ni"
        },
    });

    const gender = watch("gender");
    const country = watch("country");

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        // 1 UK unit = approx 8g of alcohol
        const alcoholGrams = values.unitsDrank * 8;

        // Widmark Formula simplified
        const r = r_values[values.gender];
        const weightGrams = values.weightKg * 1000;

        // Estimated Max BAC immediately after drinking
        const rawBac = (alcoholGrams / (weightGrams * r)) * 100;

        // Alcohol dissipates at roughly 0.015% BAC per hour
        const dissipation = values.hoursSinceFirstDrink * 0.015;

        const finalBac = Math.max(0, rawBac - dissipation);

        const limit = values.country === "scotland" ? 0.05 : 0.08;

        setResult({
            estimatedBac: Number(finalBac.toFixed(3)),
            isOverLimit: finalBac >= limit,
            limit: limit,
        });
    };

    return (
        <CalculatorCard
            title="Drink Drive Limit Estimator"
            description="Estimate your Blood Alcohol Concentration (BAC). Crucially: NEVER rely on this to decide if you can drive."
            hasResult={!!result}
            icon={<Wine className="w-6 h-6" />}
            heroImage="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070&auto=format&fit=crop"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">

                    <div className="space-y-2">
                        <Label>Biological Sex</Label>
                        <Select onValueChange={(val) => setValue("gender", val as "male" | "female")} defaultValue={gender}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select sex" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="weightKg">Body Weight (kg)</Label>
                        <Input
                            id="weightKg"
                            type="number"
                            min={40}
                            max={200}
                            {...register("weightKg", { valueAsNumber: true })}
                        />
                        {errors.weightKg && <p className="text-sm text-destructive">{errors.weightKg.message?.toString()}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="unitsDrank">Total UK Units Consumed</Label>
                        <p className="text-xs text-muted-foreground pb-1">e.g., 1 Pint of 4% beer = ~2.3 units</p>
                        <Input
                            id="unitsDrank"
                            type="number"
                            step={0.5}
                            min={0}
                            max={50}
                            {...register("unitsDrank", { valueAsNumber: true })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="hoursSinceFirstDrink">Hours since you started drinking</Label>
                        <Input
                            id="hoursSinceFirstDrink"
                            type="number"
                            step={0.5}
                            min={0.5}
                            max={24}
                            {...register("hoursSinceFirstDrink", { valueAsNumber: true })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Region</Label>
                        <Select onValueChange={(val) => setValue("country", val as "england_wales_ni" | "scotland")} defaultValue={country}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Region" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="england_wales_ni">England, Wales, NI (0.08% limit)</SelectItem>
                                <SelectItem value="scotland">Scotland (0.05% limit)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <Button type="submit" className="w-full" data-pdf-export-ignore>
                    Estimate BAC
                </Button>
            </form>

            {result && (
                <div className={`mt-8 p-6 rounded-lg space-y-4 text-center border-l-4 shadow-sm ${result.isOverLimit ? 'bg-destructive/10 border-destructive' : 'bg-primary/10 border-primary'}`}>
                    <h3 className="text-xl font-bold">Estimated BAC</h3>

                    <div className={`text-4xl font-extrabold pb-2 ${result.isOverLimit ? 'text-destructive' : 'text-primary'}`}>
                        {result.estimatedBac}%
                    </div>

                    <p className="text-sm text-muted-foreground font-semibold">
                        Legal Limit: {result.limit}%
                    </p>

                    <div className="flex items-start gap-2 text-xs font-semibold py-2 px-3 rounded text-left mt-2 mx-auto max-w-sm">
                        {result.isOverLimit ? (
                            <>
                                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-destructive" />
                                <p className="text-destructive">Likely OVER the legal limit to drive. Do not get behind the wheel.</p>
                            </>
                        ) : (
                            <>
                                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-primary" />
                                <p className="text-primary tracking-wide">Estimated UNDER limit, but this is a mathematical guess. The only safe limit is 0.</p>
                            </>
                        )}
                    </div>
                </div>
            )}
        </CalculatorCard>
    );
}
