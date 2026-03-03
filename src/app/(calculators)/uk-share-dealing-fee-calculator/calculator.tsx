"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Receipt,
    Info,
    Coins,
    Calculator,
    BarChart3,
    TrendingUp,
    AlertCircle,
    Download,
    Percent,
    Globe,
    CreditCard
} from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalculatorCard } from "@/components/calculator-card";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
    tradeValue: z.coerce.number().min(1, "Trade value must be positive"),
    commissionFixed: z.coerce.number().min(0),
    commissionPercent: z.coerce.number().min(0),
    minCommission: z.coerce.number().min(0),
    fxFeePercent: z.coerce.number().min(0),
    includeStampDuty: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

type CalculationResult = {
    commission: number;
    fxFee: number;
    stampDuty: number;
    totalFees: number;
    totalCost: number;
    feePercentage: number;
};

export function ShareDealingFeeCalculatorForm() {
    const [result, setResult] = useState<CalculationResult | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            tradeValue: 1000,
            commissionFixed: 0,
            commissionPercent: 0,
            minCommission: 0,
            fxFeePercent: 0,
            includeStampDuty: false,
        },
    });

    const onSubmit = (values: FormValues) => {
        let commission = values.commissionFixed;
        if (values.commissionPercent > 0) {
            const calculatedComm = (values.tradeValue * values.commissionPercent) / 100;
            commission += Math.max(calculatedComm, values.minCommission);
        }

        const fxFee = (values.tradeValue * values.fxFeePercent) / 100;
        const stampDuty = values.includeStampDuty ? values.tradeValue * 0.005 : 0;
        const totalFees = commission + fxFee + stampDuty;
        const totalCost = values.tradeValue + totalFees;
        const feePercentage = (totalFees / values.tradeValue) * 100;

        setResult({
            commission,
            fxFee,
            stampDuty,
            totalFees,
            totalCost,
            feePercentage
        });
    };

    return (
        <CalculatorCard
            title="Share Dealing Fee Calculator"
            description="Analyze the total cost of your stock trades, including broker fees, commissions, and taxes."
            icon={<Receipt className="w-6 h-6" />}
            heroImage="/uk_stock_market_hero.png"
            hasResult={!!result}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="tradeValue"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Amount to Invest (£)</FormLabel>
                                    <FormControl>
                                        <Input type="number" step="0.01" placeholder="e.g. 5000" className="rounded-xl border-slate-200 focus:ring-primary shadow-sm h-12" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="commissionFixed"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Fixed Commission (£)</FormLabel>
                                        <FormControl>
                                            <Input type="number" step="0.01" className="rounded-xl border-slate-200 focus:ring-primary shadow-sm h-12" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="fxFeePercent"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">FX Fee (%)</FormLabel>
                                        <FormControl>
                                            <Input type="number" step="0.01" placeholder="0.5" className="rounded-xl border-slate-200 focus:ring-primary shadow-sm h-12" {...field} />
                                        </FormControl>
                                        <FormDescription className="text-[10px] italic">Only for non-UK shares</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="includeStampDuty"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-3 space-y-0 p-4 bg-slate-50 dark:bg-black/20 rounded-2xl border border-slate-200 dark:border-slate-800 transition-all hover:bg-slate-100">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className="w-5 h-5 rounded-md border-slate-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className="text-sm font-bold tracking-tight">Include 0.5% Stamp Duty (SDRT)</FormLabel>
                                        <p className="text-[10px] text-slate-500 leading-none italic">Applies to UK-registered shares only.</p>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" className="w-full h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-widest hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all">
                        Analyze Dealing Costs
                    </Button>
                </form>
            </Form>

            {result && (
                <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="p-8 rounded-[2.5rem] bg-slate-950 text-white border border-white/10 relative overflow-hidden group">
                        <div className="relative z-10">
                            <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">Total Transaction Costs</p>
                            <h3 className="text-5xl font-black tracking-tighter italic mb-4">
                                £{result.totalFees.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </h3>
                            <div className="flex items-center gap-4">
                                <div className="px-3 py-1 bg-white/10 rounded-full border border-white/10 text-[10px] font-black tracking-widest uppercase">
                                    {result.feePercentage.toFixed(2)}% of Investment
                                </div>
                            </div>
                        </div>
                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">Commission</span>
                            <span className="text-lg font-bold dark:text-white">£{result.commission.toFixed(2)}</span>
                        </div>
                        <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">FX Charges</span>
                            <span className="text-lg font-bold dark:text-white">£{result.fxFee.toFixed(2)}</span>
                        </div>
                        <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">Stamp Duty</span>
                            <span className="text-lg font-bold dark:text-white">£{result.stampDuty.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="p-6 rounded-3xl bg-slate-950/5 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold uppercase tracking-widest">Total Cost of Purchase</span>
                            <span className="text-2xl font-black text-primary italic">£{result.totalCost.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</span>
                        </div>
                        <div className="h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary rounded-full transition-all duration-1000"
                                style={{ width: `${Math.min(100, (result.totalFees / result.totalCost) * 100 * 20)}%` }}
                            ></div>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-2 italic">*This cost excludes future selling fees and platform management charges.</p>
                    </div>
                </div>
            )}
        </CalculatorCard>
    );
}
