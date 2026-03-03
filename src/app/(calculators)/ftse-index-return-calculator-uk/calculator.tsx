"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    TrendingUp,
    LineChart,
    PieChart,
    Info,
    RotateCcw,
    Zap,
    ArrowUpRight,
    Search,
    History,
    Calendar,
    ArrowRightLeft,
    BarChart3
} from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalculatorCard } from "@/components/calculator-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
    startValue: z.coerce.number().min(1, "Minimum level 1 required"),
    endValue: z.coerce.number().min(1, "Minimum level 1 required"),
    years: z.coerce.number().min(0.1, "Duration required").max(100),
    initialInvestment: z.coerce.number().min(1, "Minimum £1 required").default(1000),
    index: z.string().default("FTSE 100"),
});

type FormValues = z.infer<typeof formSchema>;

type Result = {
    totalReturn: number;
    cagr: number;
    finalValue: number;
    profit: number;
};

export function FTSEIndexReturnCalculator() {
    const [result, setResult] = useState<Result | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            startValue: 6000,
            endValue: 7500,
            years: 10,
            initialInvestment: 1000,
            index: "FTSE 100",
        },
    });

    const calculateFTSE = (values: FormValues) => {
        const start = values.startValue;
        const end = values.endValue;
        const years = values.years;
        const principal = values.initialInvestment;

        const totalReturn = ((end - start) / start) * 100;
        const cagr = (Math.pow(end / start, 1 / years) - 1) * 100;
        const finalValue = principal * (end / start);
        const profit = finalValue - principal;

        setResult({
            totalReturn,
            cagr,
            finalValue,
            profit,
        });
    };

    const watchedValues = form.watch();
    useEffect(() => {
        const subscription = form.watch((value) => {
            if (value.startValue && value.endValue && value.years) {
                calculateFTSE(value as FormValues);
            }
        });
        return () => subscription.unsubscribe();
    }, [form.watch]);

    useEffect(() => {
        calculateFTSE(form.getValues());
    }, []);

    const onSubmit = (values: FormValues) => {
        calculateFTSE(values);
    };

    return (
        <CalculatorCard
            title="FTSE Index Return Calculator"
            description="Benchmark your performance against the London Stock Exchange. Calculate CAGR and absolute returns for the FTSE 100 and FTSE 250 indices."
            icon={<BarChart3 className="w-6 h-6" />}
            heroImage="/uk_stock_market_hero.png"
            hasResult={!!result}
        >
            <div className="grid lg:grid-cols-5 gap-8 items-start">
                <div className="lg:col-span-3 space-y-8">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <History className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Market <span className="text-primary italic">Backtest</span></h2>
                            <p className="text-sm text-slate-500 font-medium uppercase tracking-widest leading-none">UK Index performance report</p>
                        </div>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="index"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Target Index</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="h-12 rounded-xl font-bold">
                                                        <SelectValue placeholder="Select Index" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="rounded-xl border-slate-200">
                                                    <SelectItem value="FTSE 100" className="font-bold">FTSE 100 (Blue-Chips)</SelectItem>
                                                    <SelectItem value="FTSE 250" className="font-bold">FTSE 250 (Mid-Cap)</SelectItem>
                                                    <SelectItem value="FTSE All-Share" className="font-bold">FTSE All-Share</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="initialInvestment"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Hypothetical Investment (£)</FormLabel>
                                            <FormControl>
                                                <Input type="number" className="h-12 rounded-xl text-lg font-bold" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="startValue"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex gap-2 items-center mb-1">
                                                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500 m-0">Index Start Level</FormLabel>
                                                </div>
                                                <FormControl>
                                                    <Input type="number" step="0.01" className="h-12 rounded-xl font-bold bg-white dark:bg-slate-950" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="endValue"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex gap-2 items-center mb-1">
                                                    <ArrowRightLeft className="w-3.5 h-3.5 text-primary" />
                                                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500 m-0">Index End Level</FormLabel>
                                                </div>
                                                <FormControl>
                                                    <Input type="number" step="0.01" className="h-12 rounded-xl font-bold bg-white dark:bg-slate-950 text-primary border-primary/20" {...field} />
                                                </FormControl>
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
                                            <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Time Period (Years)</FormLabel>
                                            <FormControl>
                                                <Input type="number" step="0.1" className="h-12 rounded-xl font-bold" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex gap-4">
                                <Button type="submit" className="flex-1 rounded-2xl h-14 bg-primary text-white font-black uppercase tracking-widest shadow-xl shadow-primary/20">
                                    Generate Performance Report
                                </Button>
                                <Button type="button" variant="outline" onClick={() => { form.reset(); setResult(null); }} className="w-14 h-14 rounded-2xl border-slate-200 dark:border-slate-800 text-slate-400">
                                    <RotateCcw className="w-5 h-5" />
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>

                <div className="lg:col-span-2 space-y-4">
                    {result && (
                        <div className="p-8 rounded-[2.5rem] bg-slate-950 text-white shadow-2xl relative overflow-hidden h-full flex flex-col justify-center space-y-8 animate-in fade-in zoom-in duration-500">
                            <div className="text-center relative z-10">
                                <div className="inline-block p-4 bg-primary/20 rounded-full mb-4">
                                    <LineChart className="w-10 h-10 text-primary" />
                                </div>
                                <h3 className="text-5xl font-black mb-1 italic tracking-tighter">
                                    {result.cagr.toFixed(2)}%
                                </h3>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Annualized Growth <span className="text-primary">(CAGR)</span></p>
                            </div>

                            <div className="space-y-4 relative z-10">
                                <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">Relative Returns</span>
                                            <h4 className="text-3xl font-black text-white">{result.totalReturn.toFixed(1)}%</h4>
                                        </div>
                                        <div className="p-3 bg-primary/10 rounded-2xl rotate-12">
                                            <ArrowUpRight className="w-8 h-8 text-primary" />
                                        </div>
                                    </div>

                                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: `${Math.min(100, result.totalReturn)}%` }}></div>
                                    </div>
                                </div>

                                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex justify-between items-end text-left">
                                    <div>
                                        <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Final Portfolio Value</span>
                                        <span className="text-3xl font-black text-primary">£{result.finalValue.toLocaleString('en-GB', { maximumFractionDigits: 0 })}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Net Gain</span>
                                        <span className="text-lg font-bold text-green-400">+£{result.profit.toLocaleString('en-GB', { maximumFractionDigits: 0 })}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10 relative z-10 italic">
                                <div className="flex items-start gap-3">
                                    <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                    <p className="text-[10px] leading-relaxed text-slate-500 uppercase font-black tracking-widest">
                                        Note: This model calculates price returns. Total Return including dividends for the {watchedValues.index} is typically higher by ~3-4% per year.
                                    </p>
                                </div>
                            </div>

                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] opacity-20"></div>
                        </div>
                    )}
                </div>
            </div>
        </CalculatorCard>
    );
}
