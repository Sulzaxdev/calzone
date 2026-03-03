"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Coins,
    TrendingUp,
    Info,
    LineChart,
    PieChart,
    RotateCcw,
    Zap,
    ArrowUpRight,
    Milestone,
    Wallet
} from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalculatorCard } from "@/components/calculator-card";
import { Slider } from "@/components/ui/slider";

const formSchema = z.object({
    monthlyInvestment: z.coerce.number().min(1, "Minimum £1 required"),
    expectedReturn: z.coerce.number().min(0.1, "Return must be positive").max(100),
    durationYears: z.coerce.number().min(1, "Minimum 1 year").max(50),
});

type FormValues = z.infer<typeof formSchema>;

type Result = {
    totalInvested: number;
    estimatedReturns: number;
    totalValue: number;
    profitPercentage: number;
};

export function SIPCalculator() {
    const [result, setResult] = useState<Result | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            monthlyInvestment: 250,
            expectedReturn: 8,
            durationYears: 10,
        },
    });

    const calculateSIP = (values: FormValues) => {
        const P = values.monthlyInvestment;
        const annualRate = values.expectedReturn;
        const years = values.durationYears;

        const r = (annualRate / 100) / 12;
        const n = years * 12;

        // FV = P × [ (1 + r)^n - 1 ] / r × (1 + r)
        const totalValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
        const totalInvested = P * n;
        const estimatedReturns = totalValue - totalInvested;
        const profitPercentage = (estimatedReturns / totalInvested) * 100;

        setResult({
            totalInvested,
            estimatedReturns,
            totalValue,
            profitPercentage,
        });
    };

    // Auto-calculate on mount and change
    const watchedValues = form.watch();
    useEffect(() => {
        const subscription = form.watch((value) => {
            if (value.monthlyInvestment && value.expectedReturn && value.durationYears) {
                calculateSIP(value as FormValues);
            }
        });
        return () => subscription.unsubscribe();
    }, [form.watch]);

    // Initial calculation
    useEffect(() => {
        calculateSIP(form.getValues());
    }, []);

    const onSubmit = (values: FormValues) => {
        calculateSIP(values);
    };

    return (
        <CalculatorCard
            title="SIP / Monthly Investment Calculator"
            description="Project the future value of your monthly savings. See how compound interest turns regular contributions into significant wealth."
            icon={<Wallet className="w-6 h-6" />}
            heroImage="/uk_stock_market_hero.png"
            hasResult={!!result}
        >
            <div className="grid lg:grid-cols-5 gap-8 items-start">
                <div className="lg:col-span-3 space-y-8">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <Coins className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Wealth <span className="text-primary italic">Planner</span></h2>
                            <p className="text-sm text-slate-500 font-medium uppercase tracking-widest leading-none">Systematic Investment Plan</p>
                        </div>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y- gap-4">
                            <div className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="monthlyInvestment"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex justify-between items-end mb-2">
                                                <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Monthly Contribution (£)</FormLabel>
                                                <span className="text-xl font-black text-primary italic">£{field.value.toLocaleString()}</span>
                                            </div>
                                            <FormControl>
                                                <div className="space-y-4">
                                                    <Slider
                                                        min={10}
                                                        max={5000}
                                                        step={10}
                                                        value={[field.value]}
                                                        onValueChange={(val) => field.onChange(val[0])}
                                                        className="py-4"
                                                    />
                                                    <Input type="number" className="h-12 rounded-xl text-lg font-bold" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid md:grid-cols-2 gap-8">
                                    <FormField
                                        control={form.control}
                                        name="expectedReturn"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex justify-between items-end mb-2">
                                                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Expected Annual Return (%)</FormLabel>
                                                    <span className="text-xl font-black text-slate-900 dark:text-white italic">{field.value}%</span>
                                                </div>
                                                <FormControl>
                                                    <div className="space-y-4">
                                                        <Slider
                                                            min={1}
                                                            max={25}
                                                            step={0.5}
                                                            value={[field.value]}
                                                            onValueChange={(val) => field.onChange(val[0])}
                                                            className="py-4"
                                                        />
                                                        <Input type="number" step="0.5" className="h-12 rounded-xl font-bold" {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="durationYears"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex justify-between items-end mb-2">
                                                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Investment Duration (Years)</FormLabel>
                                                    <span className="text-xl font-black text-slate-900 dark:text-white italic">{field.value}yr</span>
                                                </div>
                                                <FormControl>
                                                    <div className="space-y-4">
                                                        <Slider
                                                            min={1}
                                                            max={50}
                                                            step={1}
                                                            value={[field.value]}
                                                            onValueChange={(val) => field.onChange(val[0])}
                                                            className="py-4"
                                                        />
                                                        <Input type="number" className="h-12 rounded-xl font-bold" {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>

                <div className="lg:col-span-2">
                    {result && (
                        <div className="p-8 rounded-[2.5rem] bg-slate-950 text-white shadow-2xl relative overflow-hidden h-full flex flex-col justify-center space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="text-center relative z-10">
                                <div className="inline-block p-4 bg-primary/20 rounded-full mb-4">
                                    <TrendingUp className="w-10 h-10 text-primary" />
                                </div>
                                <h3 className="text-5xl font-black mb-1 italic tracking-tighter text-white">
                                    £{result.totalValue.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
                                </h3>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Estimated Future Value</p>
                            </div>

                            <div className="space-y-4 relative z-10">
                                <div className="p-5 bg-white/5 rounded-3xl border border-white/10 flex justify-between items-center transition-all hover:bg-white/10">
                                    <div>
                                        <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Total Invested</span>
                                        <span className="text-2xl font-black">£{result.totalInvested.toLocaleString()}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Wealth Gained</span>
                                        <span className="text-2xl font-black text-primary">+£{result.estimatedReturns.toLocaleString('en-GB', { maximumFractionDigits: 0 })}</span>
                                    </div>
                                </div>

                                <div className="p-5 bg-white/5 rounded-3xl border border-white/10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                            <Zap className="w-4 h-4 text-primary" />
                                        </div>
                                        <span className="text-[11px] font-black uppercase tracking-widest">Growth Performance</span>
                                    </div>
                                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden flex">
                                        <div
                                            className="h-full bg-slate-700 transition-all duration-1000"
                                            style={{ width: `${(result.totalInvested / result.totalValue) * 100}%` }}
                                        ></div>
                                        <div
                                            className="h-full bg-primary transition-all duration-1000"
                                            style={{ width: `${(result.estimatedReturns / result.totalValue) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between mt-3 px-1">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Invested</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                                            <span className="text-[9px] font-bold text-primary uppercase tracking-widest">Profit ({result.profitPercentage.toFixed(0)}%)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10 relative z-10">
                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                                    <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                    <p className="text-[11px] leading-relaxed text-slate-400 font-medium">
                                        Compounding is the 8th wonder of the world. By investing <span className="text-white font-bold">£{watchedValues.monthlyInvestment}</span> for <span className="text-white font-bold">{watchedValues.durationYears} years</span>, your money makes more money than you did!
                                    </p>
                                </div>
                            </div>

                            <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
                        </div>
                    )}
                </div>
            </div>
        </CalculatorCard>
    );
}
