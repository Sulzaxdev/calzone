"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    TrendingUp,
    Info,
    Calculator,
    BarChart3,
    ArrowUpRight,
    Download,
    PieChart,
    Coins,
    Calendar
} from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalculatorCard } from "@/components/calculator-card";

const formSchema = z.object({
    initialInvestment: z.coerce.number().min(0, "Initial investment must be 0 or more"),
    monthlyContribution: z.coerce.number().min(0, "Monthly contribution must be 0 or more"),
    annualReturn: z.coerce.number().min(0, "Expected return must be positive"),
    years: z.coerce.number().min(1, "Investment period must be at least 1 year").max(50, "Maximum period is 50 years"),
});

type FormValues = z.infer<typeof formSchema>;

export function InvestmentGrowthCalculatorForm() {
    const [result, setResult] = useState<{
        finalValue: number;
        totalContributed: number;
        totalGrowth: number;
        yearlyBreakdown: { year: number; balance: number }[];
    } | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            initialInvestment: 0,
            monthlyContribution: 0,
            annualReturn: 7,
            years: 10,
        },
    });

    const onSubmit = (values: FormValues) => {
        const r = values.annualReturn / 100 / 12; // Monthly rate
        const n = values.years * 12; // Total months
        const P = values.initialInvestment;
        const PMT = values.monthlyContribution;

        // Future Value of a Series Formula (Compounded Monthly)
        // FV = P(1+r)^n + PMT * [((1+r)^n - 1) / r]
        const finalValue = P * Math.pow(1 + r, n) + PMT * ((Math.pow(1 + r, n) - 1) / r);
        const totalContributed = P + (PMT * n);
        const totalGrowth = finalValue - totalContributed;

        const breakdown = [];
        for (let i = 1; i <= values.years; i++) {
            const months = i * 12;
            const balance = P * Math.pow(1 + r, months) + PMT * ((Math.pow(1 + r, months) - 1) / r);
            breakdown.push({ year: i, balance });
        }

        setResult({
            finalValue,
            totalContributed,
            totalGrowth,
            yearlyBreakdown: breakdown
        });
    };

    return (
        <CalculatorCard
            title="Investment Growth Calculator"
            description="Project the future value of your investments based on periodic contributions and expected returns."
            icon={<BarChart3 className="w-6 h-6" />}
            heroImage="/uk_stock_market_hero.png"
            hasResult={!!result}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="initialInvestment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Initial Investment (£)</FormLabel>
                                    <FormControl>
                                        <Input type="number" step="0.01" className="rounded-xl border-slate-200 focus:ring-primary h-12" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="monthlyContribution"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Monthly Contribution (£)</FormLabel>
                                    <FormControl>
                                        <Input type="number" step="0.01" className="rounded-xl border-slate-200 focus:ring-primary h-12" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="annualReturn"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500 text-primary">Expected Return (%)</FormLabel>
                                    <FormControl>
                                        <Input type="number" step="0.1" className="rounded-xl border-slate-200 focus:ring-primary h-12 text-primary font-bold" {...field} />
                                    </FormControl>
                                    <FormDescription className="text-[10px] italic">Avg FTSE 100 historical return is ~7%</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="years"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Time Horizon (Years)</FormLabel>
                                    <FormControl>
                                        <Input type="number" step="1" className="rounded-xl border-slate-200 focus:ring-primary h-12" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" className="w-full h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-widest hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all">
                        Project Growth
                    </Button>
                </form>
            </Form>

            {result && (
                <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="p-10 rounded-[2.5rem] bg-slate-950 text-white border border-white/10 relative overflow-hidden group">
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="text-center md:text-left">
                                <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">Projected Future Value</p>
                                <h3 className="text-6xl font-black tracking-tighter italic">
                                    £{result.finalValue.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                </h3>
                                <p className="text-[10px] text-slate-500 mt-2 font-bold uppercase tracking-widest">After {form.getValues('years')} Years</p>
                            </div>
                            <Button
                                variant="outline"
                                className="h-12 px-6 rounded-xl border-white/20 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest gap-2"
                                onClick={() => window.print()}
                            >
                                <Download className="w-4 h-4" />
                                Save Analysis
                            </Button>
                        </div>
                        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">Total Contributed</span>
                                <span className="text-xl font-bold dark:text-white">£{result.totalContributed.toLocaleString()}</span>
                            </div>
                            <Coins className="w-8 h-8 text-slate-300" />
                        </div>
                        <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1 text-primary">Estimated Gain</span>
                                <span className="text-xl font-bold text-primary">£{result.totalGrowth.toLocaleString()}</span>
                            </div>
                            <ArrowUpRight className="w-8 h-8 text-primary/30" />
                        </div>
                    </div>

                    <div className="p-8 rounded-[2rem] bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-slate-800">
                        <h4 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            Yearly Growth Projection
                        </h4>
                        <div className="space-y-2">
                            {result.yearlyBreakdown.filter((_, i) => i === 0 || (i + 1) % 5 === 0 || i === result.yearlyBreakdown.length - 1).map((point) => (
                                <div key={point.year} className="flex items-center gap-4">
                                    <span className="w-16 text-[10px] font-bold text-slate-400 uppercase">Year {point.year}</span>
                                    <div className="grow h-6 bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden relative group">
                                        <div
                                            className="h-full bg-primary/40 group-hover:bg-primary/60 transition-all duration-700 rounded-lg"
                                            style={{ width: `${(point.balance / result.finalValue) * 100}%` }}
                                        ></div>
                                        <span className="absolute inset-y-0 right-3 flex items-center text-[10px] font-black text-slate-600 dark:text-slate-300 italic">
                                            £{point.balance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="mt-6 text-[10px] text-slate-500 text-center italic">
                            Projections are based on fixed annual returns and do not guarantee future performance.
                        </p>
                    </div>
                </div>
            )}
        </CalculatorCard>
    );
}
