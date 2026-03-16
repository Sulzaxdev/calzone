"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, RotateCcw, TrendingUp, Info, Wallet, Timer, ArrowRight, Layers, Sparkles, Download } from "lucide-react";
import { CalculatorCard } from "@/components/calculator-card";
import { Slider } from "@/components/ui/slider";
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const formSchema = z.object({
    principal: z.coerce.number().min(0, "Principal cannot be negative"),
    monthlyContribution: z.coerce.number().min(0, "Contribution cannot be negative"),
    rate: z.coerce.number().min(0, "Rate cannot be negative"),
    years: z.coerce.number().min(1, "Enter at least 1 year"),
    frequency: z.enum(["1", "4", "12", "365"]), // Annual, Quarterly, Monthly, Daily
    inflation: z.coerce.number().min(0).default(0),
});

type FormValues = z.infer<typeof formSchema>;

export function CompoundCalculatorForm() {
    const [result, setResult] = useState<{
        totalValue: number;
        totalContributions: number;
        totalInterest: number;
        realValue: number;
    } | null>(null);

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const exportPDF = async () => {
        if (!calculatorRef.current) return;
        setIsExporting(true);

        const exportButton = calculatorRef.current.parentNode?.querySelector('button[onClick*="exportPDF"]');
        if (exportButton instanceof HTMLElement) exportButton.style.opacity = '0';

        try {
            await new Promise((resolve) => setTimeout(resolve, 150));
            const canvas = await html2canvas(calculatorRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#1e293b", // slate-900 bg for dark card
                windowWidth: calculatorRef.current.scrollWidth,
                windowHeight: calculatorRef.current.scrollHeight,
            });
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            
            pdf.setFontSize(22);
            pdf.setTextColor(15, 23, 42);
            pdf.text("Compound Interest Projection", 15, 20);
            
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 15, 28);
            
            pdf.setDrawColor(226, 232, 240);
            pdf.line(15, 32, pdfWidth - 15, 32);

            pdf.addImage(imgData, "PNG", 15, 40, pdfWidth - 30, (canvas.height * (pdfWidth - 30)) / canvas.width);
            pdf.save("Compound-Interest-Projection.pdf");
        } catch (err) {
            console.error("Failed to export", err);
        } finally {
            if (exportButton instanceof HTMLElement) exportButton.style.opacity = '1';
            setIsExporting(false);
        }
    };

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            principal: 5000,
            monthlyContribution: 200,
            rate: 7,
            years: 20,
            frequency: "12",
            inflation: 2.5,
        },
    });

    const onSubmit = (values: FormValues) => {
        const P = values.principal;
        const PMT = values.monthlyContribution;
        const r = values.rate / 100;
        const n = parseInt(values.frequency);
        const t = values.years;
        const infl = values.inflation / 100;

        // Interest compounding on principal: A = P(1 + r/n)^(nt)
        const principalGrowth = P * Math.pow(1 + r / n, n * t);

        // Interest compounding on contributions: A = PMT * (((1 + r/n)^(nt) - 1) / (r/n))
        // Note: PMT is monthly, if frequency is monthly (n=12), it matches. 
        // If frequency is annual, we approximate PMT * 12 * ...
        // For simplicity and standard SIP logic: sum of annuities due or ordinary annuity.
        // We'll use Monthly payment logic for PMT since it's the most common "SIP".
        const monthlyRate = r / 12;
        const totalMonths = t * 12;
        const contributionsGrowth = PMT > 0 ? PMT * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) : 0;

        const totalValue = principalGrowth + contributionsGrowth;
        const totalContributions = P + (PMT * totalMonths);
        const totalInterest = totalValue - totalContributions;

        // Inflation adjustment (Purchasing power)
        const realValue = totalValue / Math.pow(1 + infl, t);

        setResult({
            totalValue,
            totalContributions,
            totalInterest,
            realValue
        });
    };

    const resetForm = () => {
        form.reset();
        setResult(null);
    };

    return (
        <CalculatorCard
            title="Compound Interest Calculator"
            description="Project the future size of your nest egg. Accounts for initial principal, monthly savings (SIP), and inflation."
            icon={<Sparkles className="w-6 h-6" />}
            heroImage="/uk_stock_market_hero.png"
            hasResult={!!result}
        >
            <div className="grid lg:grid-cols-5 gap-8 items-start">
                <div className="lg:col-span-3 space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-primary shadow-lg shadow-primary/20 flex items-center justify-center text-white">
                            <Layers className="w-7 h-7" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Growth <span className="text-primary italic">Projector</span></h2>
                            <p className="text-sm text-slate-500 font-medium uppercase tracking-widest">Compound AI Engine</p>
                        </div>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="principal"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Initial Investment (£)</FormLabel>
                                            <FormControl>
                                                <Input type="number" className="h-12 rounded-xl text-lg font-bold" {...field} />
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
                                            <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Monthly Addition (£)</FormLabel>
                                            <FormControl>
                                                <Input type="number" className="h-12 rounded-xl text-lg font-bold text-primary" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="rate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Annual Return (%)</FormLabel>
                                            <FormControl>
                                                <Input type="number" step="0.1" className="h-12 rounded-xl" {...field} />
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
                                            <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Duration (Years)</FormLabel>
                                            <FormControl>
                                                <Input type="number" className="h-12 rounded-xl" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="frequency"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Compounding Frequency</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="h-12 rounded-xl font-medium">
                                                        <SelectValue placeholder="Select frequency" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="1">Yearly</SelectItem>
                                                    <SelectItem value="4">Quarterly</SelectItem>
                                                    <SelectItem value="12">Monthly</SelectItem>
                                                    <SelectItem value="365">Daily</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="inflation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Expected Inflation (%)</FormLabel>
                                            <FormControl>
                                                <Input type="number" step="0.1" className="h-12 rounded-xl" {...field} />
                                            </FormControl>
                                            <FormDescription className="text-[10px]">Adjusts result for future purchasing power.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <Button onClick={() => window.print()} type="submit" className="flex-1 rounded-2xl h-14 text-lg font-black uppercase tracking-tighter shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
                                    Project Growth
                                </Button>
                                <Button type="button" variant="outline" onClick={resetForm} className="w-14 h-14 rounded-2xl border-slate-200 dark:border-slate-800">
                                    <RotateCcw className="w-5 h-5 text-slate-500" />
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div
                        ref={calculatorRef}
                        className={`p-8 rounded-[3rem] transition-all duration-700 border-none relative overflow-hidden h-full flex flex-col justify-center shadow-2xl ${result ? 'bg-slate-900 text-white translate-y-0 opacity-100' : 'bg-slate-50 dark:bg-slate-900/40 text-slate-300 translate-y-4 opacity-70'}`}
                    >
                        {result ? (
                            <div className="relative z-10 space-y-10 animate-in fade-in zoom-in duration-700">
                                <div className="text-center group">
                                    <div className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-4 opacity-80">Estimated Future Value</div>
                                    <h3 className="text-6xl font-black mb-2 tracking-tighter drop-shadow-[0_0_15px_rgba(var(--primary),0.3)]">£{Math.round(result.totalValue).toLocaleString()}</h3>
                                    <div className="h-1 w-24 bg-primary mx-auto rounded-full group-hover:w-32 transition-all"></div>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                                        <span className="text-xs text-slate-400">Total Invested</span>
                                        <span className="font-bold">£{Math.round(result.totalContributions).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                                        <span className="text-xs text-slate-400">Interest Accrued</span>
                                        <span className="font-bold text-green-400">£{Math.round(result.totalInterest).toLocaleString()}</span>
                                    </div>
                                    <div className="flex flex-col gap-2 p-5 bg-primary/10 rounded-2xl border border-primary/20 animate-pulse">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-bold text-primary">In Today's Money</span>
                                            <span className="text-xl font-black">£{Math.round(result.realValue).toLocaleString()}</span>
                                        </div>
                                        <p className="text-[9px] text-slate-400 leading-none">After adjusting for {form.getValues('inflation')}% annual inflation.</p>
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-dashed border-white/20">
                                        <Timer className="w-5 h-5 text-amber-400" />
                                        <p className="text-[10px] leading-relaxed text-slate-400">
                                            Over <strong>{form.getValues('years')} years</strong>, compounding will generate <strong>{Math.round((result.totalInterest / result.totalContributions) * 100)}%</strong> growth over your capital.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-6">
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-4 border-slate-200 dark:border-slate-700 animate-pulse">
                                        <Wallet className="w-12 h-12 text-slate-300 dark:text-slate-600" />
                                    </div>
                                    <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-primary opacity-50" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black uppercase tracking-tighter">Wealth Vision</h3>
                                    <p className="text-sm text-slate-500 max-w-xs mx-auto">Visualize your financial future. Enter your savings plan to see the explosive effect of compound growth.</p>
                                </div>
                                <ArrowRight className="w-6 h-6 text-slate-400 animate-bounce" />
                            </div>
                        )}
                        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"></div>
                    </div>

                    {result && (
                        <div className="flex justify-end pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={exportPDF}
                                disabled={isExporting}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold rounded-2xl transition-colors disabled:opacity-50 shadow-sm border border-slate-200 dark:border-slate-800"
                            >
                                {isExporting ? (
                                    <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent shrink-0 rounded-full animate-spin"></div>
                                ) : (
                                    <Download className="w-4 h-4" />
                                )}
                                Export PDF Report
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </CalculatorCard>
    );
}
