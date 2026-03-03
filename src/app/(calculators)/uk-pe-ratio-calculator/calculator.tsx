"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Calculator, RotateCcw, TrendingUp, Info, BarChart3, AlertCircle, CheckCircle2 } from "lucide-react";
import { CalculatorCard } from "@/components/calculator-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formSchema = z.object({
    sharePrice: z.coerce.number().min(0.01, "Share price must be greater than 0"),
    eps: z.coerce.number().optional(),
    netIncome: z.coerce.number().optional(),
    sharesOutstanding: z.coerce.number().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function PERatioCalculatorForm() {
    const [mode, setMode] = useState<"standard" | "advanced">("standard");
    const [result, setResult] = useState<{
        peRatio: number;
        valuation: "undervalued" | "stable" | "premium" | "highly-valued";
        eps: number;
    } | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            sharePrice: 150,
            eps: 5,
            netIncome: 1000000,
            sharesOutstanding: 200000,
        },
    });

    const onSubmit = (values: FormValues) => {
        let eps = values.eps || 0;

        if (mode === "advanced" && values.netIncome && values.sharesOutstanding) {
            eps = values.netIncome / values.sharesOutstanding;
        }

        if (eps <= 0) {
            form.setError("eps", { message: "EPS must be greater than 0 for P/E calculation" });
            return;
        }

        const peRatio = values.sharePrice / eps;

        let valuation: any = "stable";
        if (peRatio < 10) valuation = "undervalued";
        else if (peRatio >= 10 && peRatio < 20) valuation = "stable";
        else if (peRatio >= 20 && peRatio < 35) valuation = "premium";
        else valuation = "highly-valued";

        setResult({
            peRatio,
            valuation,
            eps
        });
    };

    const resetForm = () => {
        form.reset();
        setResult(null);
    };

    return (
        <CalculatorCard
            title="P/E Ratio Calculator"
            description="Assess stock valuation by comparing share price to earnings. Identify if a stock is cheap or expensive relative to its profit."
            icon={<BarChart3 className="w-6 h-6" />}
            heroImage="/uk_stock_market_hero.png"
            hasResult={!!result}
        >
            <div className="grid lg:grid-cols-5 gap-8 items-start">
                <div className="lg:col-span-3 space-y-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <Calculator className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Valuation <span className="text-primary italic">Engine</span></h2>
                            <p className="text-sm text-slate-500 font-medium uppercase tracking-widest">LSE Fundamental Analysis</p>
                        </div>
                    </div>

                    <Tabs defaultValue="standard" onValueChange={(v) => setMode(v as any)} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 rounded-xl h-12 bg-slate-100 dark:bg-slate-900 overflow-hidden p-1">
                            <TabsTrigger value="standard" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm transition-all font-bold">Standard (Direct)</TabsTrigger>
                            <TabsTrigger value="advanced" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm transition-all font-bold">Advanced (Derived)</TabsTrigger>
                        </TabsList>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="sharePrice"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Current Share Price (£)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" step="0.01" className="h-12 text-lg font-bold rounded-xl" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <TabsContent value="standard" className="m-0 space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="eps"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Earnings Per Share (£)</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" step="0.01" className="h-12 text-lg rounded-xl" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </TabsContent>

                                    <TabsContent value="advanced" className="m-0 space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="netIncome"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Total Net Income (£)</FormLabel>
                                                        <FormControl>
                                                            <Input type="number" className="h-12 rounded-xl" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="sharesOutstanding"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Shares Outstanding</FormLabel>
                                                        <FormControl>
                                                            <Input type="number" className="h-12 rounded-xl" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </TabsContent>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <Button type="submit" className="flex-1 rounded-2xl h-14 text-lg font-black uppercase tracking-tighter shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all">
                                        Calculate P/E Ratio
                                    </Button>
                                    <Button type="button" variant="outline" onClick={resetForm} className="w-14 h-14 rounded-2xl border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800">
                                        <RotateCcw className="w-5 h-5" />
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </Tabs>
                </div>

                <div className="lg:col-span-2 space-y-6 h-full">
                    <div className={`p-8 rounded-[2.5rem] transition-all duration-500 border-none relative overflow-hidden h-full flex flex-col justify-center ${result ? 'bg-slate-900 text-white shadow-2xl scale-100' : 'bg-slate-200/50 dark:bg-slate-900/50 text-slate-400 scale-95 opacity-60'}`}>
                        {result ? (
                            <div className="relative z-10 space-y-8 animate-in fade-in zoom-in duration-500">
                                <div className="text-center">
                                    <div className="inline-block p-4 bg-primary/20 rounded-full mb-4">
                                        <TrendingUp className="w-10 h-10 text-primary" />
                                    </div>
                                    <h3 className="text-5xl font-black mb-1">{result.peRatio.toFixed(2)}</h3>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">P/E Ratio Score</p>
                                </div>

                                <div className="space-y-4">
                                    <div className={`p-4 rounded-2xl border flex flex-col items-center text-center gap-2 ${result.valuation === 'undervalued' ? 'bg-green-500/10 border-green-500/30 text-green-400' :
                                        result.valuation === 'stable' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' :
                                            result.valuation === 'premium' ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' :
                                                'bg-red-500/10 border-red-500/30 text-red-500'
                                        }`}>
                                        <div className="flex items-center gap-2">
                                            {result.valuation === 'undervalued' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                                            <span className="font-black uppercase tracking-widest text-sm italic">{result.valuation.replace('-', ' ')}</span>
                                        </div>
                                        <p className="text-xs opacity-70">
                                            {result.valuation === 'undervalued' && "Investors are paying very little for each £1 of profit. High potential value tool."}
                                            {result.valuation === 'stable' && "The stock is trading within a typical market valuation range."}
                                            {result.valuation === 'premium' && "The market has high expectations for the future growth of this company."}
                                            {result.valuation === 'highly-valued' && "Be cautious; the stock is trading at a significant premium over its earnings."}
                                        </p>
                                    </div>

                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center text-left">
                                        <span className="text-sm font-medium">Calculated EPS</span>
                                        <span className="font-bold">£{result.eps.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/10">
                                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-left">
                                        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <p className="text-[11px] leading-relaxed text-slate-400 italic">
                                            P/E ratios vary wildly by sector. A tech stock with a P/E of 30 might be "cheaper" than a bank with a P/E of 10 if its growth is faster.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                                <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                                    <BarChart3 className="w-10 h-10 text-slate-300 dark:text-slate-600" />
                                </div>
                                <h3 className="text-xl font-bold uppercase tracking-tighter">Valuation Analysis</h3>
                                <p className="text-sm max-w-xs mx-auto">Enter share price and earnings to visualize the stock's market valuation score.</p>
                            </div>
                        )}
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
                    </div>
                </div>
            </div>
        </CalculatorCard>
    );
}
