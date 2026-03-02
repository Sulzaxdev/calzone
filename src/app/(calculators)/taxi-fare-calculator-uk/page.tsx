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
import { Car } from "lucide-react";

// Rough estimations for UK taxi structures.
const TARIFFS = {
    standard: { drop: 3.00, perMile: 2.00, waitPerMin: 0.30, name: "Standard (Daytime)" },
    premium: { drop: 4.00, perMile: 2.80, waitPerMin: 0.50, name: "Premium (Nights/Weekends)" },
    london: { drop: 3.80, perMile: 3.50, waitPerMin: 0.60, name: "London (Black Cab / TfL)" },
};

const formSchema = z.object({
    distance: z.number().min(0.5).max(500),
    tariff: z.enum(["standard", "premium", "london"]),
    waitMins: z.number().min(0).max(120),
    tipPercent: z.number().min(0).max(50),
});

type ResultData = {
    fare: number;
    tip: number;
    total: number;
};

export default function TaxiFareCalculator() {
    const [result, setResult] = useState<ResultData | null>(null);

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            distance: 5,
            tariff: "standard",
            waitMins: 0,
            tipPercent: 10,
        },
    });

    const tariff = watch("tariff");

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const selectedTariff = TARIFFS[values.tariff];

        // Calculate metered fare
        const meteredFare = selectedTariff.drop + (values.distance * selectedTariff.perMile) + (values.waitMins * selectedTariff.waitPerMin);

        // Add tip
        const tipAmount = meteredFare * (values.tipPercent / 100);
        const total = meteredFare + tipAmount;

        setResult({
            fare: Number(meteredFare.toFixed(2)),
            tip: Number(tipAmount.toFixed(2)),
            total: Number(total.toFixed(2)),
        });
    };

    return (
        <CalculatorCard
            title="UK Taxi Fare Estimator"
            description="Calculate an estimated cab fare based on distance, tariffs, and potential waiting times."
            hasResult={!!result}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">

                    <div className="space-y-2">
                        <Label htmlFor="distance">Distance in Miles</Label>
                        <Input
                            id="distance"
                            type="number"
                            step={0.1}
                            min={0.5}
                            max={500}
                            {...register("distance", { valueAsNumber: true })}
                        />
                        {errors.distance && <p className="text-sm text-destructive">{errors.distance.message?.toString()}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Tariff Type</Label>
                        <Select onValueChange={(val) => setValue("tariff", val as "standard" | "premium" | "london")} defaultValue={tariff}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select tariff" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="standard">Standard Daytime</SelectItem>
                                <SelectItem value="premium">Nights, Sundays, & Holidays</SelectItem>
                                <SelectItem value="london">London (TfL Black Cab average)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="waitMins">Waiting Time in Traffic (Minutes)</Label>
                        <Input
                            id="waitMins"
                            type="number"
                            min={0}
                            max={120}
                            {...register("waitMins", { valueAsNumber: true })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tipPercent">Tip (%)</Label>
                        <Input
                            id="tipPercent"
                            type="number"
                            min={0}
                            max={50}
                            {...register("tipPercent", { valueAsNumber: true })}
                        />
                    </div>

                </div>

                <Button type="submit" className="w-full">
                    Estimate Fare
                </Button>
            </form>

            {result && (
                <div className="mt-8 p-6 bg-muted/50 rounded-lg space-y-4">
                    <h3 className="text-xl font-bold flex items-center justify-center gap-2">
                        <Car className="w-5 h-5" /> Estimated Total
                    </h3>

                    <div className="text-center text-4xl font-extrabold text-primary py-2">
                        £{result.total.toFixed(2)}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mt-4 p-4 bg-background rounded-md border text-muted-foreground">
                        <div className="text-left font-medium">Meter Fare:</div>
                        <div className="text-right text-foreground font-semibold">£{result.fare.toFixed(2)}</div>

                        <div className="text-left font-medium">Tip Added:</div>
                        <div className="text-right text-foreground font-semibold">£{result.tip.toFixed(2)}</div>
                    </div>

                    <p className="text-xs text-muted-foreground text-center mt-2">
                        *This is an estimate. Fares vary significantly by specific council licensing authorities and local cab firm policies.
                    </p>
                </div>
            )}
        </CalculatorCard>
    );
}
