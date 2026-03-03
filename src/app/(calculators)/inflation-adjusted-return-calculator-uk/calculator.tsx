"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Scale,
    TrendingDown,
    TrendingUp,
    Info,
    BarChart3,
    RotateCcw,
    ShieldAlert,
    ArrowDownRight,
    Flame,
    Zap,
    History
} from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalculatorCard } from "@/components/calculator-card";
import { Slider } from "@/components/ui/slider";

const formSchema = z.object({
    initialInvestment: z.coerce.number().min(1, "Minimum £1 required"),
    nominalReturn: z.coerce.number().min(-100, "Must be at least -100%").max(1000),
    inflationRate: z.coerce.number().min(-50, "Deflation limit -50%").max(100),
    years: z.coerce.number().min(1, "Min 1 year").max(50),
});

type FormValues = z.infer<typeof formSchema>;

type Result = {
    realReturnPercent: number;
    nominalFutureValue: number;
    realFutureValue: number;
    inflationLoss: number;
    purchasingPowerRatio: number;
};

export function InflationAdjustedCalculator() {
    const [result, setResult] = useState<Result | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            initialInvestment: 10000,
            nominalReturn: 7,
            inflationRate: 4,
            years: 5,
        },
    });

    const calculateRealReturn = (values: FormValues) => {
        const P = values.initialInvestment;
        const R_nom = values.nominalReturn / 100;
        const I = values.inflationRate / 100;
        const t = values.years;

        // Formula: Real Return = (1 + Nominal) / (1 + Inflation) - 1
        const realReturnPercent = ((1 + R_nom) / (1 + I) - 1) * 100;

        const nominalFutureValue = P * Math.pow(1 + R_nom, t);
        const realFutureValue = P * Math.pow(1 + (realReturnPercent / 100), t);
        const inflationLoss = nominalFutureValue - realFutureValue;
        const purchasingPowerRatio = (realFutureValue / nominalFutureValue) * 100;

        setResult({
            realReturnPercent,
            nominalFutureValue,
            realFutureValue,
            inflationLoss,
            purchasingPowerRatio,
        });
    };

    const watchedValue = form.watch();
    useEffect(() => {
        const subscription = form.watch((value) => {
            if (value.initialInvestment && value.nominalReturn !== undefined && value.inflationRate !== undefined && value.years) {
                calculateRealReturn(value as FormValues);
            }
        });
        return () => subscription.unsubscribe();
    }, [form.watch]);

    useEffect(() => {
        calculateRealReturn(form.getValues());
    }, []);

    const onSubmit = (values: FormValues) => {
        calculateRealReturn(values);
    };

    return (
        <CalculatorCard
            title="Inflation Adjusted Return Calculator"
            description="Calculate your 'Real' profit after UK inflation. Discover if your investment is actually growing your purchasing power or just keeping up with costs."
            icon={<Flame className="w-6 h-6" />}
            heroImage="/uk_stock_market_hero.png"
            hasResult={!!result}
        >
            <div className="grid lg:grid-cols-5 gap-8 items-start">
                <div className="lg:col-span-3 space-y-8">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                            <Scale className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Real <span className="text-primary italic">Yields</span></h2>
                            <p className="text-sm text-slate-500 font-medium uppercase tracking-widest leading-none">Purchasing Power Audit</p>
                        </div>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="initialInvestment"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Initial Investment (£)</FormLabel>
                                        <FormControl>
                                            <Input type="number" className="h-12 rounded-xl text-lg font-bold" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="nominalReturn"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Nominal Annual Return (%)</FormLabel>
                                            <FormControl>
                                                <div className="space-y-3">
                                                    <Slider
                                                        min={-10} max={25} step={0.5}
                                                        value={[field.value]}
                                                        onValueChange={(val) => field.onChange(val[0])}
                                                    />
                                                    <Input type="number" className="h-10 rounded-xl font-bold" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormDescription className="text-[10px] italic">Growth before inflation.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="inflationRate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">UK Inflation Rate (%)</FormLabel>
                                            <FormControl>
                                                <div className="space-y-3">
                                                    <Slider
                                                        min={0} max={15} step={0.1}
                                                        value={[field.value]}
                                                        onValueChange={(val) => field.onChange(val[0])}
                                                    />
                                                    <Input type="number" step="0.1" className="h-10 rounded-xl font-bold text-orange-500" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormDescription className="text-[10px] italic">Target: 2% (BoE Average).</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="years"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Duration (Years)</FormLabel>
                                        <FormControl>
                                            <Input type="number" className="h-12 rounded-xl font-bold" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <Button type="submit" className="flex-1 rounded-2xl h-14 bg-primary text-white font-black uppercase tracking-widest shadow-xl">
                                    Calculate Real Gain
                                </Button>
                                <Button type="button" variant="outline" onClick={() => { form.reset(); setResult(null); }} className="w-14 h-14 rounded-2xl">
                                    <RotateCcw className="w-5 h-5" />
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>

                <div className="lg:col-span-2">
                    {result && (
                        <div className="p-8 rounded-[2.5rem] bg-slate-950 text-white shadow-2xl relative overflow-hidden h-full flex flex-col justify-center space-y-8 animate-in fade-in zoom-in duration-500">
                            <div className="text-center relative z-10">
                                <div className="inline-block p-4 bg-orange-500/20 rounded-full mb-4">
                                    <TrendingUp className="w-10 h-10 text-orange-500" />
                                </div>
                                <h3 className="text-5xl font-black mb-1 italic tracking-tighter">
                                    {result.realReturnPercent.toFixed(2)}%
                                </h3>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Actual Real Annual Return</p>
                            </div>

                            <div className="space-y-4 relative z-10">
                                <div className="p-5 bg-white/5 rounded-3xl border border-white/10 flex justify-between items-center">
                                    <div>
                                        <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Nominal Value</span>
                                        <span className="text-lg font-black line-through opacity-50">£{result.nominalFutureValue.toLocaleString('en-GB', { maximumFractionDigits: 0 })}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] font-bold text-primary uppercase block mb-1">Real Wealth</span>
                                        <span className="text-2xl font-black text-white">£{result.realFutureValue.toLocaleString('en-GB', { maximumFractionDigits: 0 })}</span>
                                    </div>
                                </div>

                                <div className="p-5 bg-red-500/5 rounded-3xl border border-red-500/10 flex justify-between items-center text-left">
                                    <div>
                                        <span className="text-[10px] font-bold text-red-500 uppercase block mb-1">Inflation Penalty</span>
                                        <span className="text-xl font-black text-red-400">-£{result.inflationLoss.toLocaleString('en-GB', { maximumFractionDigits: 0 })}</span>
                                    </div>
                                    <div className="p-2 bg-red-500/10 rounded-full">
                                        <Flame className="w-6 h-6 text-red-500" />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10 relative z-10">
                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                                    <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                    <p className="text-[11px] leading-relaxed text-slate-400 font-medium">
                                        Your £{watchedValue.initialInvestment.toLocaleString()} in {watchedValue.years} years will have the buying power of <span className="text-white font-bold">£{result.realFutureValue.toLocaleString('en-GB', { maximumFractionDigits: 0 })}</span> in today's money. This is {result.purchasingPowerRatio.toFixed(1)}% of the face value.
                                    </p>
                                </div>
                            </div>

                            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[100px]"></div>
                        </div>
                    )}
                </div>
            </div>
        </CalculatorCard>
    );
}
