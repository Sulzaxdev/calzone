"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    ShieldCheck,
    Info,
    Coins,
    Calculator,
    TrendingUp,
    Download,
    Landmark,
    PieChart,
    CheckCircle2,
    AlertCircle
} from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalculatorCard } from "@/components/calculator-card";
import { Progress } from "@/components/ui/progress";

const MAX_ISA_ALLOWANCE = 20000;

const formSchema = z.object({
    currentInvested: z.coerce.number().min(0).max(MAX_ISA_ALLOWANCE, `Max allowance is £${MAX_ISA_ALLOWANCE}`),
    monthlyContribution: z.coerce.number().min(0),
    annualReturn: z.coerce.number().min(0),
    years: z.coerce.number().min(1).max(50),
});

type FormValues = z.infer<typeof formSchema>;

export function StocksSharesISACalculatorForm() {
    const [result, setResult] = useState<{
        remainingAllowance: number;
        finalValue: number;
        totalGrowth: number;
        taxSaved: number; // Approximate 20% CGT/Dividend tax saved
    } | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            currentInvested: 0,
            monthlyContribution: 500,
            annualReturn: 7,
            years: 10,
        },
    });

    const onSubmit = (values: FormValues) => {
        const r = values.annualReturn / 100 / 12;
        const n = values.years * 12;
        const P = values.currentInvested;
        const PMT = values.monthlyContribution;

        const finalValue = P * Math.pow(1 + r, n) + PMT * ((Math.pow(1 + r, n) - 1) / r);
        const totalContributed = P + (PMT * n);
        const totalGrowth = finalValue - totalContributed;

        // Modelling ~20% tax efficiency (average across CGT/Dividends)
        const taxSaved = totalGrowth * 0.20;

        setResult({
            remainingAllowance: MAX_ISA_ALLOWANCE - values.currentInvested,
            finalValue,
            totalGrowth,
            taxSaved
        });
    };

    return (
        <CalculatorCard
            title="Stocks & Shares ISA Calculator"
            description="Optimize your tax-free investing. Track your annual allowance and project long-term wealth growth."
            icon={<ShieldCheck className="w-6 h-6" />}
            heroImage="/uk_stock_market_hero.png"
            hasResult={!!result}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="currentInvested"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">ISA Allowance Used This Year (£)</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input type="number" step="100" className="rounded-xl border-slate-200 focus:ring-primary h-12" {...field} />
                                            <div className="absolute right-3 top-3.5 text-[10px] font-bold text-slate-400">/ £20,000</div>
                                        </div>
                                    </FormControl>
                                    <div className="mt-2 space-y-1">
                                        <Progress value={(field.value / MAX_ISA_ALLOWANCE) * 100} className="h-1" />
                                        <p className="text-[10px] text-right text-slate-400 italic">Remaining: £{(MAX_ISA_ALLOWANCE - field.value).toLocaleString()}</p>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid md:grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="monthlyContribution"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Monthly (£)</FormLabel>
                                        <FormControl>
                                            <Input type="number" className="rounded-xl border-slate-200 focus:ring-primary h-12" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="annualReturn"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500 text-primary">Return (%)</FormLabel>
                                        <FormControl>
                                            <Input type="number" className="rounded-xl border-slate-200 focus:ring-primary h-12 text-primary font-bold" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="years"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Years</FormLabel>
                                        <FormControl>
                                            <Input type="number" className="rounded-xl border-slate-200 focus:ring-primary h-12" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-widest hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all">
                        Project ISA Wealth
                    </Button>
                </form>
            </Form>

            {result && (
                <div className="mt-10 space-y-8 animate-in fade-in zoom-in-95 duration-500">
                    <div className="p-10 rounded-[2.5rem] bg-slate-950 text-white border border-white/10 relative overflow-hidden">
                        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                            <div className="text-center md:text-left">
                                <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">Total Tax-Free Wealth</p>
                                <h3 className="text-6xl font-black tracking-tighter italic">
                                    £{result.finalValue.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                </h3>
                                <div className="mt-4 flex items-center justify-center md:justify-start gap-3">
                                    <div className="px-3 py-1 bg-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest text-primary border border-primary/20">
                                        Tax-Sheltered Assets
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                                <div className="flex gap-4 items-center mb-4">
                                    <div className="w-10 h-10 rounded-2xl bg-green-500/20 flex items-center justify-center">
                                        <TrendingUp className="w-5 h-5 text-green-400" />
                                    </div>
                                    <h4 className="text-sm font-bold tracking-tight italic">Estimated Tax Saving</h4>
                                </div>
                                <p className="text-3xl font-black text-green-400 italic">£{result.taxSaved.toLocaleString('en-GB', { maximumFractionDigits: 0 })}</p>
                                <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                                    ISA shields you from Capital Gains & Dividend Tax, potentially saving you this much compared to a standard brokerage account.
                                </p>
                            </div>
                        </div>
                        <div className="absolute -left-20 -top-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">Growth Alone</span>
                            <span className="text-xl font-bold dark:text-white">£{result.totalGrowth.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>
                        <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 col-span-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">Tax Efficiency Multiplier</span>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-primary" />
                                <p className="text-xs font-medium italic">Every £1 growth in an ISA is worth ~£1.20+ in a taxable account after taxes.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </CalculatorCard>
    );
}
