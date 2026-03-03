"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, RotateCcw, TrendingUp, Receipt, ShieldCheck, ArrowRightLeft, Info } from "lucide-react";
import { CalculatorCard } from "@/components/calculator-card";

const formSchema = z.object({
    purchasePrice: z.coerce.number().min(0.01, "Purchase price must be greater than 0"),
    sellingPrice: z.coerce.number().min(0.01, "Selling price must be greater than 0"),
    fees: z.coerce.number().min(0, "Fees cannot be negative"),
    allowance: z.coerce.number().min(0, "Allowance cannot be negative"),
    taxBand: z.enum(["basic", "higher"]),
});

type FormValues = z.infer<typeof formSchema>;
type FormInput = z.input<typeof formSchema>;

export function CGTCalculatorForm() {
    const [result, setResult] = useState<{
        gain: number;
        taxableGain: number;
        taxDue: number;
        rate: number;
    } | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            purchasePrice: 10000,
            sellingPrice: 15000,
            fees: 100,
            allowance: 3000,
            taxBand: "higher",
        },
    });

    const onSubmit: SubmitHandler<FormValues> = (values) => {
        const gain = values.sellingPrice - values.purchasePrice - values.fees;
        const taxableGain = Math.max(0, gain - values.allowance);
        const rate = values.taxBand === "basic" ? 0.10 : 0.20;
        const taxDue = taxableGain * rate;

        setResult({
            gain,
            taxableGain,
            taxDue,
            rate: rate * 100,
        });
    };

    const resetForm = () => {
        form.reset();
        setResult(null);
    };

    return (
        <CalculatorCard
            title="UK Capital Gains Tax (CGT)"
            description="Calculate your estimated liability on shares and investment sales for the 2024/25 tax year."
            icon={<Receipt className="w-6 h-6" />}
            heroImage="/uk_stock_market_hero.png"
            hasResult={!!result}
        >
            <div className="grid lg:grid-cols-5 gap-8 items-start">
                {/* Input Card */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <Calculator className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">CGT Engine <span className="text-primary italic">2025/26</span></h2>
                            <p className="text-sm text-slate-500 font-medium uppercase tracking-widest text-left">Share & Investment Calculator</p>
                        </div>
                    </div>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="purchasePrice" className="text-xs font-bold uppercase tracking-widest text-slate-500">Purchase Price (£)</Label>
                                <Input
                                    id="purchasePrice"
                                    type="number"
                                    step="0.01"
                                    placeholder="e.g. 10000"
                                    className="rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-primary h-12 text-lg font-bold"
                                    {...form.register("purchasePrice")}
                                />
                                {form.formState.errors.purchasePrice && (
                                    <p className="text-red-500 text-xs font-medium">{form.formState.errors.purchasePrice.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="sellingPrice" className="text-xs font-bold uppercase tracking-widest text-slate-500">Selling Price (£)</Label>
                                <Input
                                    id="sellingPrice"
                                    type="number"
                                    step="0.01"
                                    placeholder="e.g. 15000"
                                    className="rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-primary h-12 text-lg font-bold text-primary"
                                    {...form.register("sellingPrice")}
                                />
                                {form.formState.errors.sellingPrice && (
                                    <p className="text-red-500 text-xs font-medium">{form.formState.errors.sellingPrice.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="fees" className="text-xs font-bold uppercase tracking-widest text-slate-500">Total Fees (£) <span className="text-[10px] normal-case font-normal">(Brokerage/Duty)</span></Label>
                                <Input
                                    id="fees"
                                    type="number"
                                    step="0.01"
                                    placeholder="e.g. 100"
                                    className="rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-primary h-12"
                                    {...form.register("fees")}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="allowance" className="text-xs font-bold uppercase tracking-widest text-slate-500">CGT Allowance (£)</Label>
                                <Input
                                    id="allowance"
                                    type="number"
                                    step="1"
                                    placeholder="3000"
                                    className="rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-primary h-12 font-semibold"
                                    {...form.register("allowance")}
                                />
                                <p className="text-[10px] text-slate-400 italic">2024/25 Allowance is £3,000</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Taxpayer Status</Label>
                            <Select
                                onValueChange={(val) => form.setValue("taxBand", val as "basic" | "higher")}
                                defaultValue={form.getValues("taxBand")}
                            >
                                <SelectTrigger className="rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 h-12 font-semibold capitalize">
                                    <SelectValue placeholder="Select tax band" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="basic">Basic Rate (10% CGT)</SelectItem>
                                    <SelectItem value="higher">Higher/Additional Rate (20% CGT)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button type="submit" className="flex-1 rounded-2xl h-14 text-lg font-black uppercase tracking-tighter shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all">
                                Calculate Liability
                            </Button>
                            <Button type="button" variant="outline" onClick={resetForm} className="w-14 h-14 rounded-2xl border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800">
                                <RotateCcw className="w-5 h-5" />
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Results Card */}
                <div className="lg:col-span-2 space-y-6">
                    <div className={`p-8 rounded-[2.5rem] transition-all duration-500 border-none relative overflow-hidden h-full ${result ? 'bg-slate-900 text-white shadow-2xl scale-100' : 'bg-slate-200/50 dark:bg-slate-900/50 text-slate-400 scale-95 opacity-60'}`}>
                        {result ? (
                            <div className="relative z-10 space-y-8 animate-in fade-in zoom-in duration-500">
                                <div className="flex items-center justify-between">
                                    <Receipt className="w-8 h-8 text-primary" />
                                    <div className="px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-[10px] font-black uppercase tracking-widest text-primary">Live Estimate</div>
                                </div>

                                <div className="text-left">
                                    <h3 className="text-4xl font-black mb-1">£{result.taxDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Estimated Tax Liability</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center text-left">
                                        <div className="flex items-center gap-3">
                                            <TrendingUp className="w-5 h-5 text-green-400" />
                                            <span className="text-sm font-medium">Total Gain</span>
                                        </div>
                                        <span className="font-bold">£{result.gain.toLocaleString()}</span>
                                    </div>

                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center text-left">
                                        <div className="flex items-center gap-3">
                                            <ArrowRightLeft className="w-5 h-5 text-blue-400" />
                                            <span className="text-sm font-medium">Taxable Amount</span>
                                        </div>
                                        <span className="font-bold text-amber-400">£{result.taxableGain.toLocaleString()}</span>
                                    </div>

                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center text-left">
                                        <div className="flex items-center gap-3">
                                            <ShieldCheck className="w-5 h-5 text-primary" />
                                            <span className="text-sm font-medium">Applied Rate</span>
                                        </div>
                                        <span className="font-black text-primary">{result.rate}%</span>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/10">
                                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-primary/10 border border-primary/20 text-left">
                                        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <p className="text-[11px] leading-relaxed text-slate-300">
                                            This calculation assumes you have not utilized your £{String(form.getValues("allowance") || 0)} allowance elsewhere this tax year. Capital losses from previous years may further reduce this liability.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                                <div className="w-20 h-20 rounded-full bg-slate-300 dark:bg-slate-800 flex items-center justify-center mb-4">
                                    <Calculator className="w-10 h-10 text-slate-400 dark:text-slate-600" />
                                </div>
                                <h3 className="text-xl font-bold uppercase tracking-tighter">Ready to Calculate</h3>
                                <p className="text-sm max-w-xs mx-auto">Enter your portfolio disposal details to see your estimated UK Capital Gains tax liability.</p>
                            </div>
                        )}

                        {/* Background Decorative Element */}
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
                    </div>
                </div>
            </div>
        </CalculatorCard>
    );
}
