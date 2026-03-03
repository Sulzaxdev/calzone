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
    TrendingUp,
    Download,
    Percent,
    ArrowUpRight,
    Landmark
} from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalculatorCard } from "@/components/calculator-card";

const formSchema = z.object({
    dividendPerShare: z.coerce.number().min(0.0001, "Dividend per share must be positive"),
    sharePrice: z.coerce.number().min(0.01, "Share price must be positive"),
});

type FormValues = z.infer<typeof formSchema>;

export function DividendYieldCalculatorForm() {
    const [result, setResult] = useState<{
        yield: number;
        dividend: number;
        price: number;
    } | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            dividendPerShare: 0,
            sharePrice: 0,
        },
    });

    const onSubmit = (values: FormValues) => {
        const yieldPercent = (values.dividendPerShare / values.sharePrice) * 100;

        setResult({
            yield: yieldPercent,
            dividend: values.dividendPerShare,
            price: values.sharePrice,
        });
    };

    return (
        <CalculatorCard
            title="UK Dividend Yield Calculator"
            description="Analyze the annual return of your investments based on dividend payouts and share price."
            icon={<TrendingUp className="w-6 h-6" />}
            heroImage="/uk_stock_market_hero.png"
            hasResult={!!result}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="dividendPerShare"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Annual Dividend Per Share (£)</FormLabel>
                                    <FormControl>
                                        <Input type="number" step="0.001" placeholder="e.g. 0.50" className="rounded-xl border-slate-200 focus:ring-primary h-12" {...field} />
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
                                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Current Share Price (£)</FormLabel>
                                    <FormControl>
                                        <Input type="number" step="0.01" placeholder="e.g. 12.50" className="rounded-xl border-slate-200 focus:ring-primary h-12" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" className="w-full h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-widest hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all">
                        Calculate Yield
                    </Button>
                </form>
            </Form>

            {result && (
                <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="p-8 rounded-[2.5rem] bg-slate-950 text-white border border-white/10 relative overflow-hidden group">
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="text-center md:text-left">
                                <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">Annual Dividend Yield</p>
                                <h3 className="text-6xl font-black tracking-tighter italic">
                                    {result.yield.toFixed(2)}%
                                </h3>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border ${result.yield > 6 ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
                                        result.yield > 3 ? 'bg-green-500/10 border-green-500/30 text-green-400' :
                                            'bg-blue-500/10 border-blue-500/30 text-blue-400'
                                        }`}>
                                        {result.yield > 6 ? 'High Yield' : result.yield > 3 ? 'Strong Yield' : 'Moderate Yield'}
                                    </span>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                className="h-12 px-6 rounded-xl border-white/20 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest gap-2"
                                onClick={() => window.print()}
                            >
                                <Download className="w-4 h-4" />
                                Export
                            </Button>
                        </div>
                        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">Yield Calculation</span>
                                <Calculator className="w-4 h-4 text-slate-300" />
                            </div>
                            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                (£{result.dividend.toFixed(3)} ÷ £{result.price.toFixed(2)}) × 100
                            </p>
                        </div>
                        <div className="p-6 rounded-3xl bg-linear-to-r from-primary/5 to-transparent border border-primary/20 group">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <TrendingUp className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold mb-1 tracking-tight">Investment Insight</p>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">
                                        For every £1,000 you invest in this stock at this price, you could expect to receive <strong>£{(1000 * result.yield / 100).toFixed(2)}</strong> in annual dividends.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </CalculatorCard>
    );
}
