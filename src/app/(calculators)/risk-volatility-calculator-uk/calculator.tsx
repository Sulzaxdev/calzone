"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Activity,
    TrendingUp,
    Info,
    BarChart3,
    Plus,
    Trash2,
    RotateCcw,
    Zap,
    ShieldAlert,
    ArrowUpRight,
    LineChart
} from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalculatorCard } from "@/components/calculator-card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const pricePointSchema = z.object({
    stockPrice: z.coerce.number().min(0.0001, "Price must be positive"),
    marketPrice: z.coerce.number().min(0.0001, "Price must be positive"),
});

const formSchema = z.object({
    dataPoints: z.array(pricePointSchema).min(3, "At least 3 data points required for volatility analysis"),
});

type FormValues = z.infer<typeof formSchema>;

type Results = {
    avgReturn: number;
    standardDeviation: number;
    variance: number;
    beta: number;
    riskLevel: "Low" | "Moderate" | "High";
    marketVolatility: number;
};

export function RiskVolatilityCalculator() {
    const [results, setResults] = useState<Results | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            dataPoints: [
                { stockPrice: 100, marketPrice: 7000 },
                { stockPrice: 105, marketPrice: 7100 },
                { stockPrice: 102, marketPrice: 7050 },
                { stockPrice: 110, marketPrice: 7200 },
                { stockPrice: 108, marketPrice: 7150 },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "dataPoints",
    });

    const calculateReturns = (prices: number[]) => {
        const returns = [];
        for (let i = 1; i < prices.length; i++) {
            returns.push(((prices[i] - prices[i - 1]) / prices[i - 1]) * 100);
        }
        return returns;
    };

    const calculateStats = (returns: number[]) => {
        const n = returns.length;
        const avg = returns.reduce((a, b) => a + b, 0) / n;
        const variance = returns.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / (n - 1);
        const stdDev = Math.sqrt(variance);
        return { avg, variance, stdDev };
    };

    const calculateCovariance = (returns1: number[], returns2: number[], avg1: number, avg2: number) => {
        const n = returns1.length;
        let sum = 0;
        for (let i = 0; i < n; i++) {
            sum += (returns1[i] - avg1) * (returns2[i] - avg2);
        }
        return sum / (n - 1);
    };

    const onSubmit = (values: FormValues) => {
        const stockPrices = values.dataPoints.map(p => p.stockPrice);
        const marketPrices = values.dataPoints.map(p => p.marketPrice);

        const stockReturns = calculateReturns(stockPrices);
        const marketReturns = calculateReturns(marketPrices);

        const stockStats = calculateStats(stockReturns);
        const marketStats = calculateStats(marketReturns);

        const covariance = calculateCovariance(stockReturns, marketReturns, stockStats.avg, marketStats.avg);
        const beta = covariance / marketStats.variance;

        let riskLevel: "Low" | "Moderate" | "High" = "Moderate";
        if (stockStats.stdDev < 5) riskLevel = "Low";
        else if (stockStats.stdDev > 15) riskLevel = "High";

        setResults({
            avgReturn: stockStats.avg,
            standardDeviation: stockStats.stdDev,
            variance: stockStats.variance,
            beta: beta,
            riskLevel: riskLevel,
            marketVolatility: marketStats.stdDev,
        });
    };

    return (
        <CalculatorCard
            title="Risk & Volatility Calculator"
            description="Measure your portfolio's Standard Deviation and Beta. Analyze stock risk relative to the FTSE 100 or global indices."
            icon={<ShieldAlert className="w-6 h-6" />}
            heroImage="/uk_stock_market_hero.png"
            hasResult={!!results}
        >
            <div className="grid lg:grid-cols-5 gap-8 items-start">
                <div className="lg:col-span-3 space-y-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <Activity className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Risk <span className="text-primary italic">Audit</span></h2>
                            <p className="text-sm text-slate-500 font-medium uppercase tracking-widest leading-none">Security Volatility Analysis</p>
                        </div>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800">
                                <div className="flex justify-between items-center mb-4">
                                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Price History Data</Label>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="rounded-full h-8 font-bold border-primary text-primary hover:bg-primary/5"
                                        onClick={() => append({ stockPrice: 0, marketPrice: 0 })}
                                    >
                                        <Plus className="w-3 h-3 mr-1" /> Add Entry
                                    </Button>
                                </div>

                                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {fields.map((item, index) => (
                                        <div key={item.id} className="grid grid-cols-12 gap-3 items-center group">
                                            <div className="col-span-1 text-[10px] font-bold text-slate-400">#{index + 1}</div>
                                            <div className="col-span-5">
                                                <div className="relative">
                                                    <Input
                                                        type="number"
                                                        step="0.01"
                                                        placeholder="Stock Price"
                                                        {...form.register(`dataPoints.${index}.stockPrice` as const)}
                                                        className="h-10 rounded-xl bg-white dark:bg-slate-950 border-slate-200"
                                                    />
                                                    <span className="absolute right-3 top-2.5 text-[10px] font-bold opacity-30">STK</span>
                                                </div>
                                            </div>
                                            <div className="col-span-5">
                                                <div className="relative">
                                                    <Input
                                                        type="number"
                                                        step="0.01"
                                                        placeholder="Market Index"
                                                        {...form.register(`dataPoints.${index}.marketPrice` as const)}
                                                        className="h-10 rounded-xl bg-white dark:bg-slate-950 border-slate-200"
                                                    />
                                                    <span className="absolute right-3 top-2.5 text-[10px] font-bold opacity-30">MKT</span>
                                                </div>
                                            </div>
                                            <div className="col-span-1">
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => remove(index)}
                                                    className="h-8 w-8 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {form.formState.errors.dataPoints && (
                                    <p className="text-red-500 text-xs mt-2 font-bold italic">{form.formState.errors.dataPoints.message}</p>
                                )}
                                <p className="text-[10px] text-slate-400 mt-4 italic">*Enter historical prices (Daily/Weekly/Monthly) for both the stock and market benchmark (e.g. FTSE 100).</p>
                            </div>

                            <div className="flex gap-4">
                                <Button type="submit" className="flex-1 h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-widest hover:bg-primary/90 shadow-lg shadow-primary/20">
                                    Analyze Volatility
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => { form.reset(); setResults(null); }}
                                    className="w-14 h-14 rounded-2xl border-slate-200 dark:border-slate-800 text-slate-400"
                                >
                                    <RotateCcw className="w-5 h-5" />
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>

                <div className="lg:col-span-2">
                    <div className={`p-8 rounded-[2.5rem] transition-all duration-500 relative overflow-hidden h-full flex flex-col justify-center ${results ? 'bg-slate-950 text-white shadow-2xl' : 'bg-slate-100 dark:bg-slate-900/80 text-slate-400'}`}>
                        {results ? (
                            <div className="relative z-10 space-y-8 animate-in fade-in zoom-in duration-500">
                                <div className="text-center">
                                    <div className="inline-block p-4 bg-primary/20 rounded-full mb-4">
                                        <TrendingUp className="w-10 h-10 text-primary" />
                                    </div>
                                    <h3 className="text-5xl font-black mb-1 italic tracking-tighter">{results.beta.toFixed(2)}</h3>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Calculated Stock <span className="text-primary italic">Beta</span></p>
                                </div>

                                <div className="grid grid-cols-1 gap-3">
                                    <div className="p-4 bg-white/5 rounded-3xl border border-white/10 flex justify-between items-center">
                                        <div>
                                            <span className="text-[10px] font-bold text-slate-500 uppercase block mb-0.5">Volatilty (Std Dev)</span>
                                            <span className="text-2xl font-black text-white">{results.standardDeviation.toFixed(2)}%</span>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${results.riskLevel === 'Low' ? 'bg-green-500/20 text-green-400' : results.riskLevel === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'}`}>
                                            {results.riskLevel} Risk
                                        </div>
                                    </div>

                                    <div className="p-4 bg-white/5 rounded-3xl border border-white/10">
                                        <span className="text-[10px] font-bold text-slate-500 uppercase block mb-2 text-center">Benchmark Comparison</span>
                                        <div className="flex justify-between items-end gap-4 h-12">
                                            <div className="flex-1 flex flex-col items-center">
                                                <div className="w-full bg-primary/20 rounded-t-lg transition-all duration-1000" style={{ height: `${Math.min(100, (results.standardDeviation / results.marketVolatility) * 50)}%` }}></div>
                                                <span className="text-[9px] font-black mt-1">STOCK</span>
                                            </div>
                                            <div className="flex-1 flex flex-col items-center">
                                                <div className="w-full bg-slate-700/50 rounded-t-lg h-1/2"></div>
                                                <span className="text-[9px] font-black mt-1">MARKET</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 rounded-3xl bg-primary/10 border border-primary/20">
                                    <div className="flex gap-3">
                                        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <p className="text-[11px] leading-relaxed text-slate-400 font-medium">
                                            {results.beta > 1 ?
                                                `Aggressive Profile: For every 1% the market moves, this stock tends to move ${results.beta.toFixed(2)}%. High potential for outperformance but increased downside risk.` :
                                                `Defensive Profile: This stock is less sensitive to market swings. Ideal for capital preservation and dividend stability.`
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                                <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center mb-4">
                                    <BarChart3 className="w-10 h-10 text-slate-300" />
                                </div>
                                <h3 className="text-xl font-bold uppercase tracking-tight">Volatility Analysis</h3>
                                <p className="text-sm max-w-xs mx-auto text-slate-500 leading-relaxed font-medium">Import your historical price points to visualize risk metrics and correlate performance against major market indices.</p>
                            </div>
                        )}
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-50"></div>
                    </div>
                </div>
            </div>
        </CalculatorCard>
    );
}
