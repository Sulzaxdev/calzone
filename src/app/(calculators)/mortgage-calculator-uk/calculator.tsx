"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Home,
    TrendingUp,
    Info,
    PieChart,
    Wallet,
    Building,
    Percent,
    Download
} from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CalculatorCard } from "@/components/calculator-card";
import { Slider } from "@/components/ui/slider";

import jsPDF from "jspdf";

const formSchema = z.object({
    propertyPrice: z.coerce.number().min(10000, "Minimum £10,000 required"),
    deposit: z.coerce.number().min(0, "Deposit cannot be negative"),
    interestRate: z.coerce.number().min(0.1, "Rate must be positive").max(20),
    loanTermYears: z.coerce.number().min(1, "Minimum 1 year").max(40),
}).refine((data) => data.deposit < data.propertyPrice, {
    message: "Deposit must be less than property price",
    path: ["deposit"],
});

type FormValues = z.infer<typeof formSchema>;

type Result = {
    loanAmount: number;
    monthlyEMI: number;
    totalInterest: number;
    totalRepayment: number;
};

export function MortgageCalculator() {
    const [result, setResult] = useState<Result | null>(null);
    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = React.useRef<HTMLDivElement>(null);

    const exportPDF = async () => {
        if (!calculatorRef.current) return;
        setIsExporting(true);

        const exportButton = calculatorRef.current.querySelector('button');
        if (exportButton) exportButton.style.opacity = '0';

        try {
            const { toPng } = await import('html-to-image');
            await new Promise((resolve) => setTimeout(resolve, 150));
            const imgData = await toPng(calculatorRef.current, {
                pixelRatio: 2,
                backgroundColor: "#020617",
                style: {
                    transform: 'scale(1)',
                    transformOrigin: 'top left'
                }
            });
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            
            pdf.setFontSize(22);
            pdf.setTextColor(15, 23, 42);
            pdf.text("Mortgage Calculation Report", 15, 20);
            
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()} | CalZone.uk`, 15, 28);
            
            pdf.setDrawColor(226, 232, 240);
            pdf.line(15, 32, pdfWidth - 15, 32);

            const img = new Image();
            img.src = imgData;
            await new Promise((resolve) => img.onload = resolve);
            const imgHeight = (img.height * (pdfWidth - 30)) / img.width;

            pdf.addImage(imgData, "PNG", 15, 40, pdfWidth - 30, imgHeight);
            pdf.save("Mortgage-Calculation.pdf");
        } catch (err) {
            console.error("Failed to export", err);
        } finally {
            if (exportButton) exportButton.style.opacity = '1';
            setIsExporting(false);
        }
    };

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            propertyPrice: 300000,
            deposit: 60000,
            interestRate: 5.0,
            loanTermYears: 25,
        },
    });

    const calculateMortgage = (values: FormValues) => {
        const P = values.propertyPrice - values.deposit;
        const annualRate = values.interestRate;
        const years = values.loanTermYears;

        if (P <= 0) {
            setResult(null);
            return;
        }

        const r = (annualRate / 100) / 12;
        const n = years * 12;

        let emi = 0;
        let totalRepayment = 0;
        let totalInterest = 0;

        if (r > 0) {
            // EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
            emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
            totalRepayment = emi * n;
            totalInterest = totalRepayment - P;
        } else {
            // 0% interest case
            emi = P / n;
            totalRepayment = P;
            totalInterest = 0;
        }

        setResult({
            loanAmount: P,
            monthlyEMI: emi,
            totalInterest: totalInterest,
            totalRepayment: totalRepayment,
        });
    };

    // Auto-calculate on mount and change
    const watchedValues = form.watch();
    useEffect(() => {
        const subscription = form.watch((value) => {
            if (value.propertyPrice && value.deposit !== undefined && value.interestRate && value.loanTermYears) {
                // only calculate if deposit is actually less than property price to avoid negative loan amounts throwing errors visually
                if (Number(value.deposit) < Number(value.propertyPrice)) {
                    calculateMortgage(value as FormValues);
                }
            }
        });
        return () => subscription.unsubscribe();
    }, [form.watch]);

    // Initial calculation
    useEffect(() => {
        calculateMortgage(form.getValues());
    }, []);

    const onSubmit = (values: FormValues) => {
        calculateMortgage(values);
    };

    return (
        <CalculatorCard
            title="Mortgage Calculator UK"
            description="Calculate your monthly mortgage payments, including total interest and overall repayment cost. Plan your property purchase accurately."
            icon={<Building className="w-6 h-6" />}
            heroImage="/uk_stock_market_hero.png" // using existing hero or standard one
            hasResult={!!result}
        >
            <div className="grid lg:grid-cols-5 gap-8 items-start">
                <div className="lg:col-span-3 space-y-8">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <Home className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Property <span className="text-primary italic">Finance</span></h2>
                            <p className="text-sm text-slate-500 font-medium uppercase tracking-widest leading-none">UK Mortgage Estimates</p>
                        </div>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="propertyPrice"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex justify-between items-end mb-2">
                                                <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Property Price (£)</FormLabel>
                                                <span className="text-xl font-black text-primary italic">£{field.value?.toLocaleString() || 0}</span>
                                            </div>
                                            <FormControl>
                                                <div className="space-y-4">
                                                    <Slider
                                                        min={50000}
                                                        max={1500000}
                                                        step={1000}
                                                        value={[field.value || 0]}
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

                                <FormField
                                    control={form.control}
                                    name="deposit"
                                    render={({ field }) => {
                                        const price = watchedValues.propertyPrice || 0;
                                        const percentage = price > 0 ? ((field.value || 0) / price) * 100 : 0;
                                        return (
                                            <FormItem>
                                                <div className="flex justify-between items-end mb-2">
                                                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Deposit Amount (£)</FormLabel>
                                                    <div className="text-right">
                                                        <span className="text-xl font-black text-slate-900 dark:text-white italic">£{field.value?.toLocaleString() || 0}</span>
                                                        <span className="text-xs font-bold text-slate-400 block ml-2">({percentage.toFixed(1)}%)</span>
                                                    </div>
                                                </div>
                                                <FormControl>
                                                    <div className="space-y-4">
                                                        <Slider
                                                            min={0}
                                                            max={price}
                                                            step={1000}
                                                            value={[field.value || 0]}
                                                            onValueChange={(val) => field.onChange(val[0])}
                                                            className="py-4"
                                                        />
                                                        <Input type="number" className="h-12 rounded-xl text-lg font-bold" {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        );
                                    }}
                                />

                                <div className="grid md:grid-cols-2 gap-8">
                                    <FormField
                                        control={form.control}
                                        name="interestRate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex justify-between items-end mb-2">
                                                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Interest Rate (%)</FormLabel>
                                                    <span className="text-xl font-black text-slate-900 dark:text-white italic">{field.value || 0}%</span>
                                                </div>
                                                <FormControl>
                                                    <div className="space-y-4">
                                                        <Slider
                                                            min={1}
                                                            max={15}
                                                            step={0.1}
                                                            value={[field.value || 0]}
                                                            onValueChange={(val) => field.onChange(val[0])}
                                                            className="py-4"
                                                        />
                                                        <Input type="number" step="0.1" className="h-12 rounded-xl font-bold" {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="loanTermYears"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex justify-between items-end mb-2">
                                                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Loan Term (Years)</FormLabel>
                                                    <span className="text-xl font-black text-slate-900 dark:text-white italic">{field.value || 0}yr</span>
                                                </div>
                                                <FormControl>
                                                    <div className="space-y-4">
                                                        <Slider
                                                            min={5}
                                                            max={40}
                                                            step={1}
                                                            value={[field.value || 0]}
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
                        <div className="space-y-4 h-full">
                            <div
                                ref={calculatorRef}
                                className="p-8 rounded-[2.5rem] bg-slate-950 text-white shadow-2xl relative overflow-hidden flex flex-col justify-center space-y-8 animate-in fade-in slide-in-from-right-4 duration-500"
                            >
                                <div className="text-center relative z-10">
                                    <div className="inline-block p-4 bg-primary/20 rounded-full mb-4">
                                        <TrendingUp className="w-10 h-10 text-primary" />
                                    </div>
                                    <h3 className="text-5xl font-black mb-1 italic tracking-tighter text-white">
                                        £{result.monthlyEMI.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
                                    </h3>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Monthly Payment (EMI)</p>
                                </div>

                                <div className="space-y-4 relative z-10">
                                    <div className="p-5 bg-white/5 rounded-3xl border border-white/10 flex justify-between items-center transition-all hover:bg-white/10">
                                        <div>
                                            <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Mortgage Required</span>
                                            <span className="text-2xl font-black">£{result.loanAmount.toLocaleString()}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Total Interest</span>
                                            <span className="text-2xl font-black text-red-400">£{result.totalInterest.toLocaleString('en-GB', { maximumFractionDigits: 0 })}</span>
                                        </div>
                                    </div>

                                    <div className="p-5 bg-white/5 rounded-3xl border border-white/10">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                                <PieChart className="w-4 h-4 text-primary" />
                                            </div>
                                            <span className="text-[11px] font-black uppercase tracking-widest">Repayment Breakdown</span>
                                        </div>
                                        <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden flex cursor-help">
                                            <div
                                                className="h-full bg-emerald-500 transition-all duration-1000"
                                                style={{ width: `${(result.loanAmount / result.totalRepayment) * 100}%` }}
                                                title={`Principal: £${result.loanAmount.toLocaleString()}`}
                                            ></div>
                                            <div
                                                className="h-full bg-red-400 transition-all duration-1000"
                                                style={{ width: `${(result.totalInterest / result.totalRepayment) * 100}%` }}
                                                title={`Interest: £${result.totalInterest.toLocaleString()}`}
                                            ></div>
                                        </div>
                                        <div className="flex justify-between mt-3 px-1">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Principal</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                                <span className="text-[9px] font-bold text-red-400 uppercase tracking-widest">Interest ({((result.totalInterest / result.totalRepayment) * 100).toFixed(1)}%)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/10 relative z-10 text-center">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Total Amount Repaid Over {watchedValues.loanTermYears} Years</span>
                                    <span className="text-2xl font-black text-white italic">£{result.totalRepayment.toLocaleString('en-GB', { maximumFractionDigits: 0 })}</span>
                                </div>

                                <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
                            </div>

                            <div className="flex justify-end pt-2">
                                <button
                                    onClick={exportPDF}
                                    disabled={isExporting}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-bold rounded-2xl transition-colors disabled:opacity-50"
                                >
                                    {isExporting ? (
                                        <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent shrink-0 rounded-full animate-spin"></div>
                                    ) : (
                                        <Download className="w-4 h-4" />
                                    )}
                                    Export Quote to PDF
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </CalculatorCard>
    );
}
