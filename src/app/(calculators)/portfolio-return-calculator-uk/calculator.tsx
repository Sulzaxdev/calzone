"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
    Calculator,
    RotateCcw,
    TrendingUp,
    Info,
    PieChart,
    Plus,
    Trash2,
    ArrowUpRight,
    BarChart3
} from "lucide-react";
import { CalculatorCard } from "@/components/calculator-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const assetSchema = z.object({
    name: z.string().min(1, "Asset name required"),
    amount: z.coerce.number().min(0),
    returnRate: z.coerce.number(),
});

const formSchema = z.object({
    startValue: z.coerce.number().min(0).optional(),
    endValue: z.coerce.number().min(0).optional(),
    years: z.coerce.number().min(1).default(1),
    assets: z.array(assetSchema).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function PortfolioCalculatorForm() {
    const [mode, setMode] = useState<"performance" | "weighted">("performance");
    const [result, setResult] = useState<{
        totalReturn: number;
        annualizedReturn: number;
        totalGain: number;
        method: "Simple" | "Weighted";
    } | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            startValue: 10000,
            endValue: 11500,
            years: 1,
            assets: [{ name: "UK Stocks", amount: 6000, returnRate: 10 }, { name: "Bonds", amount: 4000, returnRate: 5 }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "assets",
    });

    const onSubmit = (values: FormValues) => {
        if (mode === "performance") {
            const start = values.startValue || 0;
            const end = values.endValue || 0;
            const years = values.years || 1;

            if (start <= 0) {
                form.setError("startValue", { message: "Start value must be greater than 0" });
                return;
            }

            const totalGain = end - start;
            const totalReturn = (totalGain / start) * 100;
            const annualizedReturn = (Math.pow(end / start, 1 / years) - 1) * 100;

            setResult({
                totalReturn,
                annualizedReturn,
                totalGain,
                method: "Simple"
            });
        } else {
            const assets = values.assets || [];
            if (assets.length === 0) return;

            const totalValue = assets.reduce((acc, curr) => acc + curr.amount, 0);
            if (totalValue <= 0) return;

            let weightedReturn = 0;
            let totalGain = 0;

            assets.forEach(asset => {
                const weight = asset.amount / totalValue;
                weightedReturn += weight * asset.returnRate;
                totalGain += asset.amount * (asset.returnRate / 100);
            });

            setResult({
                totalReturn: weightedReturn,
                annualizedReturn: weightedReturn, // For weighted, we assume annual
                totalGain: totalGain,
                method: "Weighted"
            });
        }
    };

    const resetForm = () => {
        form.reset();
        setResult(null);
    };

    return (
        <CalculatorCard
            title="Portfolio Return Calculator"
            description="Measure your investment success. Calculate simple returns, weighted multi-asset ROI, and CAGR performance over any period."
            icon={<PieChart className="w-6 h-6" />}
            heroImage="/uk_stock_market_hero.png"
            hasResult={!!result}
        >
            <div className="grid lg:grid-cols-5 gap-8 items-start">
                <div className="lg:col-span-3 space-y-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Return <span className="text-primary italic">Analytics</span></h2>
                            <p className="text-sm text-slate-500 font-medium uppercase tracking-widest leading-none">Total Wealth Performance</p>
                        </div>
                    </div>

                    <Tabs defaultValue="performance" onValueChange={(v) => setMode(v as any)} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 rounded-xl h-12 bg-slate-100 dark:bg-slate-900 border-none p-1">
                            <TabsTrigger value="performance" className="rounded-lg font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">Growth Tracking</TabsTrigger>
                            <TabsTrigger value="weighted" className="rounded-lg font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">Asset Weights</TabsTrigger>
                        </TabsList>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
                                <TabsContent value="performance" className="space-y-4 m-0">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="startValue"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Starting Value (£)</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" className="h-12 rounded-xl text-lg font-semibold" {...field} />
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
                                                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Ending Value (£)</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" className="h-12 rounded-xl text-lg font-bold text-primary" {...field} />
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
                                                    <Input type="number" min="1" className="h-12 rounded-xl" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </TabsContent>

                                <TabsContent value="weighted" className="space-y-4 m-0">
                                    <div className="space-y-3">
                                        {fields.map((item, index) => (
                                            <div key={item.id} className="grid grid-cols-12 gap-3 items-end bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-top-1">
                                                <div className="col-span-12 md:col-span-5">
                                                    <Label className="text-[10px] font-bold uppercase mb-1 block opacity-60">Asset Name</Label>
                                                    <Input {...form.register(`assets.${index}.name` as const)} placeholder="e.g. FTSE 100 ETF" className="h-10 rounded-lg" />
                                                </div>
                                                <div className="col-span-6 md:col-span-3">
                                                    <Label className="text-[10px] font-bold uppercase mb-1 block opacity-60">Amount (£)</Label>
                                                    <Input type="number" {...form.register(`assets.${index}.amount` as const)} className="h-10 rounded-lg" />
                                                </div>
                                                <div className="col-span-4 md:col-span-3">
                                                    <Label className="text-[10px] font-bold uppercase mb-1 block opacity-60">Return (%)</Label>
                                                    <Input type="number" {...form.register(`assets.${index}.returnRate` as const)} className="h-10 rounded-lg" />
                                                </div>
                                                <div className="col-span-2 md:col-span-1 flex justify-end">
                                                    <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} className="text-red-500 hover:bg-red-50 rounded-full h-8 w-8">
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                        <Button type="button" variant="outline" className="w-full h-12 rounded-2xl border-dashed border-2 dash-primary text-primary hover:bg-primary/5 font-bold" onClick={() => append({ name: "", amount: 0, returnRate: 0 })}>
                                            <Plus className="w-4 h-4 mr-2" /> Add Asset Line
                                        </Button>
                                    </div>
                                </TabsContent>

                                <div className="flex gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                    <Button type="submit" className="flex-1 rounded-2xl h-14 text-lg font-black uppercase tracking-tighter shadow-xl shadow-primary/20">
                                        Analyze Portfolio
                                    </Button>
                                    <Button type="button" variant="outline" onClick={resetForm} className="w-14 h-14 rounded-2xl border-slate-200 dark:border-slate-800">
                                        <RotateCcw className="w-5 h-5" />
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </Tabs>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className={`p-8 rounded-[2.5rem] transition-all duration-500 border-none relative overflow-hidden h-full flex flex-col justify-center ${result ? 'bg-slate-950 text-white shadow-2xl scale-100' : 'bg-slate-100 dark:bg-slate-900/50 text-slate-400 scale-95 opacity-50 shadow-inner'}`}>
                        {result ? (
                            <div className="relative z-10 space-y-8 animate-in fade-in zoom-in duration-500">
                                <div className="text-center">
                                    <div className="inline-block p-4 bg-primary/20 rounded-full mb-4">
                                        <ArrowUpRight className="w-10 h-10 text-primary" />
                                    </div>
                                    <h3 className="text-5xl font-black mb-1">{result.annualizedReturn.toFixed(2)}%</h3>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{result.method === 'Simple' ? 'Annualized CAGR' : 'Weighted Annual Return'}</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-5 bg-white/5 rounded-3xl border border-white/10 flex justify-between items-center text-left">
                                        <div>
                                            <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Total Absolute gain</span>
                                            <span className="text-2xl font-black text-green-400">£{result.totalGain.toLocaleString()}</span>
                                        </div>
                                        <p className="text-[11px] max-w-[100px] text-slate-500 italic leading-relaxed">Profit across the whole strategy period.</p>
                                    </div>

                                    <div className="p-5 bg-white/5 rounded-3xl border border-white/10 flex justify-between items-center text-left">
                                        <div>
                                            <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Total Period Return</span>
                                            <span className="text-2xl font-black text-primary">{result.totalReturn.toFixed(1)}%</span>
                                        </div>
                                        <PieChart className="w-8 h-8 opacity-20" />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/10">
                                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-primary/10 border border-primary/20 text-left">
                                        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <p className="text-[11px] leading-relaxed text-slate-400">
                                            {result.annualizedReturn > 7 ?
                                                "Exceptional performance! You are outperforming the long-term historical average of global equity markets." :
                                                "Consistent growth. Keep an eye on management fees and inflation to ensure real wealth building."
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                                <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center mb-4">
                                    <BarChart3 className="w-10 h-10 text-slate-300 dark:text-slate-600" />
                                </div>
                                <h3 className="text-xl font-bold uppercase tracking-tighter">Performance Audit</h3>
                                <p className="text-sm max-w-xs mx-auto text-slate-500">Enter your investment data to generate a detailed ROI and annualized CAGR report.</p>
                            </div>
                        )}
                        <div className="absolute -top-10 -left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
                    </div>
                </div>
            </div>
        </CalculatorCard>
    );
}
