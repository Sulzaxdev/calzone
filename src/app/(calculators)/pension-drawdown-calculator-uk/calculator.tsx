
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { calculatePensionDrawdown } from "@/lib/pension-drawdown-logic";
import { PiggyBank, RefreshCcw, Landmark, Download, Info } from "lucide-react";

export function PensionDrawdownCalculatorForm() {
    const [potSize, setPotSize] = useState<number>(250000);
    const [takeTaxFreeCash, setTakeTaxFreeCash] = useState<boolean>(true);
    const [annualWithdrawal, setAnnualWithdrawal] = useState<number>(10000);
    const [annualGrowthRate, setAnnualGrowthRate] = useState<number>(4.0);
    const [inflationRate, setInflationRate] = useState<number>(2.0);
    const [result, setResult] = useState<any>(null);

    const handleCalculate = () => {
        const res = calculatePensionDrawdown(potSize, takeTaxFreeCash, annualWithdrawal, annualGrowthRate, inflationRate);
        setResult(res);
    };

    return (
        <section className="container mx-auto px-4 pt-10">
            <div className="grid lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
                {/* User Input Section */}
                <Card className="rounded-[2rem] border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden bg-white dark:bg-slate-900 border">
                    <CardHeader className="bg-slate-50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-800 p-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                                <PiggyBank className="w-6 h-6" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">Drawdown Planner</CardTitle>
                                <CardDescription>Enter your pension details to model your retirement</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Current Pension Pot Size (£)</Label>
                                <Input 
                                    type="number" 
                                    value={potSize} 
                                    onChange={(e) => setPotSize(Number(e.target.value))}
                                    className="h-14 font-bold rounded-xl text-lg text-indigo-700 dark:text-indigo-400"
                                />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
                                <div>
                                    <Label className="text-sm font-bold text-slate-800 dark:text-slate-200">Take 25% Tax-Free Cash?</Label>
                                    <p className="text-xs text-slate-500">Usually max capped at £268,275</p>
                                </div>
                                <Switch 
                                    checked={takeTaxFreeCash}
                                    onCheckedChange={setTakeTaxFreeCash}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Regular Annual Withdrawal (£)</Label>
                                <Input 
                                    type="number" 
                                    value={annualWithdrawal} 
                                    onChange={(e) => setAnnualWithdrawal(Number(e.target.value))}
                                    className="h-14 font-bold rounded-xl text-lg"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Expected Growth (%)</Label>
                                    <Input 
                                        type="number" 
                                        step="0.1"
                                        value={annualGrowthRate} 
                                        onChange={(e) => setAnnualGrowthRate(Number(e.target.value))}
                                        className="h-12 font-bold rounded-xl"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Est. Inflation (%)</Label>
                                    <Input 
                                        type="number" 
                                        step="0.1"
                                        value={inflationRate} 
                                        onChange={(e) => setInflationRate(Number(e.target.value))}
                                        className="h-12 font-bold rounded-xl"
                                    />
                                </div>
                            </div>
                        </div>

                        <Button 
                            onClick={handleCalculate}
                            className="w-full h-16 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-lg font-bold shadow-xl shadow-indigo-500/20 transition-all active:scale-[0.98]"
                        >
                            <RefreshCcw className="w-5 h-5 mr-2" /> Calculate Drawdown
                        </Button>
                    </CardContent>
                </Card>

                {/* Results Section */}
                <div className="space-y-6">
                    {result ? (
                        <Card className="rounded-[2.5rem] border-2 border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                             <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
                            <CardContent className="p-10 relative z-10 text-center">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest mb-6 border border-indigo-400">
                                    <Landmark className="w-3 h-3" /> Projection Result
                                </div>
                                
                                <h3 className="text-lg font-bold text-slate-600 dark:text-slate-400 mb-2 italic">Your pension could last for</h3>
                                <div className="text-6xl md:text-7xl font-black text-indigo-600 dark:text-indigo-400 mb-8 tracking-tighter">
                                    {result.yearsLasted > 90 ? "100+" : result.yearsLasted} <span className="text-3xl text-indigo-400">Years</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-8 text-left">
                                    <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-indigo-100 dark:border-indigo-900/40">
                                        <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tax-Free Cash Dump</span>
                                        <span className="text-xl font-black text-slate-900 dark:text-slate-100">£{result.taxFreeCash.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                    </div>
                                    <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-indigo-100 dark:border-indigo-900/40">
                                        <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Drawdown Pot</span>
                                        <span className="text-xl font-black text-slate-900 dark:text-slate-100">£{result.remainingPot.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                    </div>
                                </div>

                                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-4 rounded-2xl flex items-center justify-between mb-8 border border-indigo-200 dark:border-indigo-800">
                                    <span className="text-sm font-bold text-indigo-900 dark:text-indigo-400 uppercase tracking-tight">Total Combined Value Withdrawn:</span>
                                    <span className="text-lg font-black text-indigo-700 dark:text-indigo-300">£{result.totalWithdrawn.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                </div>

                                <Button className="w-full h-14 rounded-xl bg-slate-900 dark:bg-white hover:bg-slate-800 text-white dark:text-slate-900 font-bold gap-2">
                                    <Download className="w-5 h-5" /> Export Detailed Schedule
                                </Button>
                                <p className="mt-4 text-[11px] text-slate-500 font-medium leading-relaxed uppercase tracking-widest text-left">
                                    *Model includes {inflationRate}% inflationary increasing withdrawals and {annualGrowthRate}% investment growth assumptions.
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="h-full bg-slate-100/50 dark:bg-slate-900/30 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center p-12 min-h-[500px]">
                            <PiggyBank className="w-16 h-16 text-slate-300 mb-4" />
                            <h3 className="text-lg font-bold text-slate-400">Projection Pending</h3>
                            <p className="text-sm text-slate-400 max-w-xs mt-2">Adjust your pension figures to see how long your retirement fund could realistically last.</p>
                        </div>
                    )}

                    <div className="bg-emerald-50 dark:bg-emerald-950/20 p-6 rounded-3xl border border-emerald-100 dark:border-emerald-900/30 flex gap-4">
                        <Info className="w-8 h-8 text-emerald-600 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-emerald-900 dark:text-emerald-400">Pensions are Tax-Friendly</h4>
                            <p className="text-sm text-emerald-800 dark:text-emerald-400 leading-relaxed max-w-sm mt-1">
                                Any investment growth inside a drawdown pension wraps around completely tax-free under current UK HMRC rules.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
