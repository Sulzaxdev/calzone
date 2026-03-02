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
import { Zap } from "lucide-react";

// Standard UK rates (Pence per kWh)
const CHARGE_TYPES = {
    home_standard: { rate: 29.0, name: "Home (Standard Tariff)" },
    home_ev: { rate: 7.5, name: "Home (EV Overnight Tariff)" },
    public_slow: { rate: 45.0, name: "Public Slow/Fast (7kW-22kW)" },
    public_rapid: { rate: 75.0, name: "Public Rapid/Ultra-Rapid (50kW+)" },
};

const formSchema = z.object({
    batterySize: z.number().min(5).max(150),
    chargeStart: z.number().min(0).max(99),
    chargeEnd: z.number().min(1).max(100),
    location: z.enum(["home_standard", "home_ev", "public_slow", "public_rapid"]),
});

type ResultData = {
    kwhNeeded: number;
    cost: number;
};

export default function EVChargingCostCalculator() {
    const [result, setResult] = useState<ResultData | null>(null);

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            batterySize: 60, // Average EV like ID.3 or Model 3 SR
            chargeStart: 20,
            chargeEnd: 80,
            location: "home_standard",
        },
    });

    const location = watch("location");

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        // Validate end is greater than start
        if (values.chargeEnd <= values.chargeStart) {
            alert("End percentage must be greater than start percentage.");
            return;
        }

        const percentageToCharge = values.chargeEnd - values.chargeStart;
        const kwhNeeded = values.batterySize * (percentageToCharge / 100);

        // Adding 10% for charging losses (heat, AC/DC conversion)
        const totalKwhToDraw = kwhNeeded * 1.1;

        const rateInPence = CHARGE_TYPES[values.location].rate;
        const costInPence = totalKwhToDraw * rateInPence;

        setResult({
            kwhNeeded: Number(totalKwhToDraw.toFixed(1)),
            cost: Number((costInPence / 100).toFixed(2)),
        });
    };

    return (
        <CalculatorCard
            title="EV Charging Cost Calculator"
            description="Estimate how much it costs to charge an electric car in the UK based on battery size and charger type."
            hasResult={!!result}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">

                    <div className="space-y-2">
                        <Label htmlFor="batterySize">Usable Battery Capacity (kWh)</Label>
                        <Input
                            id="batterySize"
                            type="number"
                            step={0.1}
                            min={5}
                            max={150}
                            {...register("batterySize", { valueAsNumber: true })}
                        />
                        {errors.batterySize && <p className="text-sm text-destructive">{errors.batterySize.message?.toString()}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="chargeStart">Current Charge (%)</Label>
                            <Input
                                id="chargeStart"
                                type="number"
                                min={0}
                                max={99}
                                {...register("chargeStart", { valueAsNumber: true })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="chargeEnd">Target Charge (%)</Label>
                            <Input
                                id="chargeEnd"
                                type="number"
                                min={1}
                                max={100}
                                {...register("chargeEnd", { valueAsNumber: true })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Charging Location / Tariff</Label>
                        <Select onValueChange={(val) => setValue("location", val as "home_standard" | "home_ev" | "public_slow" | "public_rapid")} defaultValue={location}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="home_standard">Home (Standard variable ~29p/kWh)</SelectItem>
                                <SelectItem value="home_ev">Home (Off-peak EV tariff ~7.5p/kWh)</SelectItem>
                                <SelectItem value="public_slow">Public Destination / Fast (~45p/kWh)</SelectItem>
                                <SelectItem value="public_rapid">Public Rapid Highway (~75p/kWh)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                </div>

                <Button type="submit" className="w-full">
                    Calculate Cost
                </Button>
            </form>

            {result && (
                <div className="mt-8 p-6 bg-muted/50 rounded-lg space-y-4 shadow-sm border-t-4 border-primary">
                    <h3 className="text-xl font-bold flex items-center justify-center gap-2">
                        <Zap className="w-5 h-5 text-primary" /> Estimated Charging Cost
                    </h3>

                    <div className="text-center text-4xl font-extrabold text-foreground py-2">
                        £{result.cost.toFixed(2)}
                    </div>

                    <div className="flex justify-between text-sm mt-4 p-4 bg-background rounded-md border text-muted-foreground">
                        <div className="text-left font-medium">Energy Drawn (inc. 10% loss):</div>
                        <div className="text-right text-foreground font-semibold">{result.kwhNeeded} kWh</div>
                    </div>

                </div>
            )}
        </CalculatorCard>
    );
}
