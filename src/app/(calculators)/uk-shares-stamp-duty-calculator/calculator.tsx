"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Receipt,
    Info,
    Coins,
    Calculator,
    History,
    TrendingUp,
    AlertCircle,
    Download,
    CheckCircle2
} from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalculatorCard } from "@/components/calculator-card";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
    sharePrice: z.coerce.number().min(0.01, "Price per share must be positive"),
    sharesToBuy: z.coerce.number().min(1, "Number of shares must be at least 1"),
});

type FormValues = z.infer<typeof formSchema>;

export function StampDutyCalculatorForm() {
    const [result, setResult] = useState<{
        purchaseValue: number;
        stampDuty: number;
        totalCost: number;
    } | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            sharePrice: 0,
            sharesToBuy: 0,
        },
    });

    const onSubmit = (values: FormValues) => {
        const purchaseValue = values.sharePrice * values.sharesToBuy;
        const stampDuty = purchaseValue * 0.005; // 0.5% SDRT

        setResult({
            purchaseValue,
            stampDuty,
            totalCost: purchaseValue + stampDuty,
        });
    };

    return (
        <CalculatorCard
            title="Stamp Duty Calculator (UK Shares)"
            description="Calculate the 0.5% Stamp Duty Reserve Tax (SDRT) payable when purchasing UK-registered stocks."
            icon={<Coins className="w-6 h-6" />}
            heroImage="/uk_stock_market_hero.png"
            hasResult={!!result}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="sharesToBuy"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Number of Shares</FormLabel>
                                    <FormControl>
                                        <Input type="number" step="1" placeholder="e.g. 1000" className="rounded-xl border-slate-200 focus:ring-primary shadow-sm h-12" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="sharePrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Price Per Share (£)</FormLabel>
                                    <FormControl>
                                        <Input type="number" step="0.0001" placeholder="e.g. 2.50" className="rounded-xl border-slate-200 focus:ring-primary shadow-sm h-12" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" className="w-full h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-widest hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all">
                        Calculate Tax
                    </Button>
                </form>
            </Form>

            {result && (
                <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="p-8 rounded-[2.5rem] bg-slate-950 text-white border border-white/10 relative overflow-hidden group">
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                            <div>
                                <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">Total Stamp Duty Due</p>
                                <h3 className="text-5xl font-black tracking-tighter italic">
                                    £{result.stampDuty.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </h3>
                            </div>
                            <Button
                                variant="outline"
                                className="h-12 px-6 rounded-xl border-white/20 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest gap-2"
                                onClick={() => window.print()}
                            >
                                <Download className="w-4 h-4" />
                                Export Report
                            </Button>
                        </div>
                        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">Purchase Value</span>
                            <span className="text-xl font-bold dark:text-white">£{result.purchaseValue.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</span>
                        </div>
                        <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">Total Cost (inc. Tax)</span>
                            <span className="text-xl font-bold dark:text-white">£{result.totalCost.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</span>
                        </div>
                    </div>

                    <div className="p-6 rounded-3xl bg-linear-to-r from-primary/5 to-transparent border border-primary/20 group">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                                <Info className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-bold mb-1 tracking-tight">HMRC Rule Applied: 0.5% SDRT</p>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">
                                    Stamp Duty Reserve Tax (SDRT) is automatically rounded down to the nearest penny for electronic trades. This applies to UK-registered company shares.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </CalculatorCard>
    );
}
