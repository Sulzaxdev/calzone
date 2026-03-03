"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, RotateCcw, TrendingUp, Receipt, ShieldCheck, Landmark, Info, Coins } from "lucide-react";
import { CalculatorCard } from "@/components/calculator-card";

const formSchema = z.object({
    dividendIncome: z.coerce.number().min(0, "Income must be 0 or greater"),
    otherIncome: z.coerce.number().min(0, "Other income must be 0 or greater"),
    personalAllowance: z.coerce.number().min(0, "Allowance must be 0 or greater").default(12570),
});

type FormValues = z.infer<typeof formSchema>;
type FormInput = z.input<typeof formSchema>;

interface CalculationResult {
    totalDividend: number;
    taxFreeAllowance: number;
    taxableDividend: number;
    taxDue: number;
    effectiveRate: number;
    breakdown: {
        basic: { amount: number; tax: number; rate: number };
        higher: { amount: number; tax: number; rate: number };
        additional: { amount: number; tax: number; rate: number };
    };
}

export function DividendTaxCalculatorForm() {
    const [result, setResult] = useState<CalculationResult | null>(null);

    const form = useForm<FormInput>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            dividendIncome: 0,
            otherIncome: 0,
            personalAllowance: 12570,
        },
    });

    const onSubmit: SubmitHandler<FormInput> = (values) => {
        const validatedValues = values as FormValues;
        const { dividendIncome, otherIncome, personalAllowance } = validatedValues;

        // HMRC 2024/25 & 2025/26 Rules
        const DIVIDEND_ALLOWANCE = 500;
        const BASIC_THRESHOLD = 37700;
        const HIGHER_THRESHOLD = 125140;

        const BASIC_RATE = 0.0875;
        const HIGHER_RATE = 0.3375;
        const ADDITIONAL_RATE = 0.3935;

        // 1. Determine how much personal allowance is left after other income
        const remainingPersonalAllowance = Math.max(0, personalAllowance - otherIncome);

        // 2. Portion of dividend that is truly tax-free (Personal Allowance + Dividend Allowance)
        // Note: Dividend allowance is always available even if PA is used up.
        const taxFreeAmount = Math.min(dividendIncome, remainingPersonalAllowance + DIVIDEND_ALLOWANCE);
        const taxableAmount = Math.max(0, dividendIncome - taxFreeAmount);

        // 3. Tax Band Calculation (Layered)
        // We calculate where the 'non-tax-free' dividend starts in the tax bands
        let currentPosition = Math.max(0, otherIncome + taxFreeAmount);
        let remainingToTax = taxableAmount;
        let totalTax = 0;

        const breakdown = {
            basic: { amount: 0, tax: 0, rate: 8.75 },
            higher: { amount: 0, tax: 0, rate: 33.75 },
            additional: { amount: 0, tax: 0, rate: 39.35 },
        };

        // Basic Rate Band
        if (remainingToTax > 0 && currentPosition < BASIC_THRESHOLD + personalAllowance) {
            const spaceInBand = (BASIC_THRESHOLD + personalAllowance) - currentPosition;
            const amountInBand = Math.min(remainingToTax, spaceInBand);
            const tax = amountInBand * BASIC_RATE;

            breakdown.basic.amount = amountInBand;
            breakdown.basic.tax = tax;
            totalTax += tax;
            remainingToTax -= amountInBand;
            currentPosition += amountInBand;
        }

        // Higher Rate Band
        if (remainingToTax > 0 && currentPosition < HIGHER_THRESHOLD + personalAllowance) {
            const spaceInBand = (HIGHER_THRESHOLD + personalAllowance) - currentPosition;
            const amountInBand = Math.min(remainingToTax, spaceInBand);
            const tax = amountInBand * HIGHER_RATE;

            breakdown.higher.amount = amountInBand;
            breakdown.higher.tax = tax;
            totalTax += tax;
            remainingToTax -= amountInBand;
            currentPosition += amountInBand;
        }

        // Additional Rate Band
        if (remainingToTax > 0) {
            const tax = remainingToTax * ADDITIONAL_RATE;
            breakdown.additional.amount = remainingToTax;
            breakdown.additional.tax = tax;
            totalTax += tax;
        }

        setResult({
            totalDividend: dividendIncome,
            taxFreeAllowance: taxFreeAmount,
            taxableDividend: taxableAmount,
            taxDue: totalTax,
            effectiveRate: dividendIncome > 0 ? (totalTax / dividendIncome) * 100 : 0,
            breakdown
        });
    };

    const resetForm = () => {
        form.reset();
        setResult(null);
    };

    return (
        <CalculatorCard
            title="UK Dividend Tax Calculator"
            description="Calculate your tax liability on dividend income based on your income tax band and the current tax-free allowance."
            icon={<Receipt className="w-6 h-6" />}
            heroImage="/uk_stock_market_hero.png"
            hasResult={!!result}
        >
            <div className="grid lg:grid-cols-5 gap-8 items-start">
                {/* Input Card */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <Coins className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Dividend <span className="text-primary italic">Expert</span></h2>
                            <p className="text-sm text-slate-500 font-medium uppercase tracking-widest text-left text-wrap">HMRC Compliant Calculator</p>
                        </div>
                    </div>

                    <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="dividendIncome" className="text-xs font-bold uppercase tracking-widest text-slate-500">Total Dividends (£)</Label>
                                <Input
                                    id="dividendIncome"
                                    type="number"
                                    step="0.01"
                                    placeholder="e.g. 5000"
                                    className="rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-primary h-12 text-lg font-bold text-primary"
                                    {...form.register("dividendIncome")}
                                />
                                {form.formState.errors.dividendIncome && (
                                    <p className="text-red-500 text-xs font-medium">{form.formState.errors.dividendIncome.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="otherIncome" className="text-xs font-bold uppercase tracking-widest text-slate-500">Other Taxable Income (£)</Label>
                                <Input
                                    id="otherIncome"
                                    type="number"
                                    step="0.01"
                                    placeholder="e.g. 30000"
                                    className="rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-primary h-12"
                                    {...form.register("otherIncome")}
                                />
                                <p className="text-[10px] text-slate-400 italic">Salary, Pension, Rental etc.</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="personalAllowance" className="text-xs font-bold uppercase tracking-widest text-slate-500">Personal Allowance (£)</Label>
                                <Input
                                    id="personalAllowance"
                                    type="number"
                                    step="1"
                                    placeholder="12570"
                                    className="rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-primary h-12"
                                    {...form.register("personalAllowance")}
                                />
                                <p className="text-[10px] text-slate-400 italic">Standard is £12,570</p>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button type="submit" className="flex-1 rounded-2xl h-14 text-lg font-black uppercase tracking-tighter shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all">
                                Calculate Tax
                            </Button>
                            <Button type="button" variant="outline" onClick={resetForm} className="w-14 h-14 rounded-2xl border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800">
                                <RotateCcw className="w-5 h-5" />
                            </Button>
                        </div>
                    </form>

                    {/* Pro Tip */}
                    <div className="p-6 rounded-3xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/50">
                        <div className="flex gap-3">
                            <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                            <div>
                                <h4 className="text-sm font-bold text-amber-900 dark:text-amber-100 mb-1 tracking-tight">ISA Optimization</h4>
                                <p className="text-xs text-amber-800/70 dark:text-amber-300/60 leading-relaxed">
                                    Dividends received within an ISA (Individual Savings Account) are completely tax-free and do not need to be declared to HMRC.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Card */}
                <div className="lg:col-span-2 space-y-6">
                    <div className={`p-8 rounded-[2.5rem] transition-all duration-500 border-none relative overflow-hidden h-full ${result ? 'bg-slate-900 text-white shadow-2xl scale-100' : 'bg-slate-200/50 dark:bg-slate-900/50 text-slate-400 scale-95 opacity-60'}`}>
                        {result ? (
                            <div className="relative z-10 space-y-8 animate-in fade-in zoom-in duration-500">
                                <div className="flex items-center justify-between">
                                    <Receipt className="w-8 h-8 text-primary" />
                                    <div className="px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-[10px] font-black uppercase tracking-widest text-primary text-wrap">HMRC Analysis</div>
                                </div>

                                <div className="text-left">
                                    <h3 className="text-4xl font-black mb-1">£{result.taxDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Total Dividend Tax Due</p>
                                </div>

                                <div className="space-y-3">
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center text-left">
                                        <div className="flex items-center gap-3">
                                            <ShieldCheck className="w-5 h-5 text-green-400" />
                                            <span className="text-sm font-medium">Tax-Free Amount</span>
                                        </div>
                                        <span className="font-bold">£{result.taxFreeAllowance.toLocaleString()}</span>
                                    </div>

                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center text-left">
                                        <div className="flex items-center gap-3">
                                            <TrendingUp className="w-5 h-5 text-primary" />
                                            <span className="text-sm font-medium">Effective Rate</span>
                                        </div>
                                        <span className="font-bold text-primary">{result.effectiveRate.toFixed(2)}%</span>
                                    </div>
                                </div>

                                {/* Breakdown */}
                                <div className="space-y-2 pt-4 border-t border-white/10">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Tax Band Distribution</p>

                                    {result.breakdown.basic.amount > 0 && (
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-slate-400">Basic Rate (8.75%)</span>
                                            <span className="font-semibold">£{result.breakdown.basic.tax.toFixed(2)}</span>
                                        </div>
                                    )}
                                    {result.breakdown.higher.amount > 0 && (
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-slate-400">Higher Rate (33.75%)</span>
                                            <span className="font-semibold">£{result.breakdown.higher.tax.toFixed(2)}</span>
                                        </div>
                                    )}
                                    {result.breakdown.additional.amount > 0 && (
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-slate-400">Additional Rate (39.35%)</span>
                                            <span className="font-semibold">£{result.breakdown.additional.tax.toFixed(2)}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="pt-6 border-t border-white/10">
                                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-left">
                                        <Landmark className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                                        <p className="text-[11px] leading-relaxed text-slate-400">
                                            Calculated based on 2024/25 tax rules. If your dividend income exceeds £10,000, specialized filing is required.
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
                                <p className="text-sm max-w-xs mx-auto">Enter your dividend and other income to see your estimated UK tax liability.</p>
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
