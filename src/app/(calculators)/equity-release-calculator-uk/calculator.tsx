
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { calculateEquityRelease } from "@/lib/equity-release-logic";
import { Calculator, Download, Landmark, PieChart, Sparkles } from "lucide-react";

export function EquityReleaseCalculatorForm() {
    const [age, setAge] = useState<number>(65);
    const [propertyValue, setPropertyValue] = useState<number>(250000);
    const [mortgage, setMortgage] = useState<number>(0);
    const [result, setResult] = useState<any>(null);

    const handleCalculate = () => {
        const res = calculateEquityRelease(age, propertyValue, mortgage);
        setResult(res);
    };

    return (
        <section className="container mx-auto px-4 pt-10">
            <div className="grid lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
                {/* Input Card */}
                <Card className="rounded-[2rem] border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
                    <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 p-8">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                                <Calculator className="w-6 h-6" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-black tracking-tight">Eligibility Checker</CardTitle>
                                <CardDescription>Enter details to estimate your available equity</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <div className="space-y-2">
                            <Label className="text-sm font-bold uppercase tracking-wider text-slate-500">Your Age (Must be 55+)</Label>
                            <Input 
                                type="number" 
                                value={age} 
                                onChange={(e) => setAge(Number(e.target.value))}
                                className="h-14 text-xl font-bold rounded-xl border-slate-200"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-bold uppercase tracking-wider text-slate-500">Property Value (£)</Label>
                            <Input 
                                type="number" 
                                value={propertyValue} 
                                onChange={(e) => setPropertyValue(Number(e.target.value))}
                                className="h-14 text-xl font-bold rounded-xl border-slate-200"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-bold uppercase tracking-wider text-slate-500">Outstanding Mortgage (£)</Label>
                            <Input 
                                type="number" 
                                value={mortgage} 
                                onChange={(e) => setMortgage(Number(e.target.value))}
                                className="h-14 text-xl font-bold rounded-xl border-slate-200"
                            />
                        </div>
                        <Button 
                            onClick={handleCalculate}
                            className="w-full h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 text-lg font-bold shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98]"
                        >
                            Calculate Max Equity
                        </Button>
                    </CardContent>
                </Card>

                {/* Results Card */}
                <div className="space-y-6">
                    {result ? (
                        <Card className="rounded-[2.5rem] border-2 border-blue-500 bg-blue-50/30 dark:bg-blue-950/20 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {result.success ? (
                                <CardContent className="p-10 text-center relative z-10">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest mb-6">
                                        <Sparkles className="w-3 h-3" /> Initial Estimate
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-600 dark:text-slate-400 mb-2 italic">You could release up to</h3>
                                    <div className="text-6xl md:text-7xl font-black text-blue-600 dark:text-blue-400 mb-8 tracking-tighter">
                                        £{result.availableCash.toLocaleString()}
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/40">
                                            <span className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Interest Rate</span>
                                            <span className="text-xl font-black text-slate-800 dark:text-slate-200">~{result.interestRateEstimate}%</span>
                                        </div>
                                        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/40">
                                            <span className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Max LTV</span>
                                            <span className="text-xl font-black text-slate-800 dark:text-slate-200">{((result.maxEstimate/propertyValue)*100).toFixed(0)}%</span>
                                        </div>
                                    </div>

                                    <Button onClick={() => window.print()} className="w-full h-14 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold gap-2">
                                        <Download className="w-5 h-5" /> Export PDF Report
                                    </Button>
                                    <p className="mt-6 text-xs text-slate-500 font-medium leading-relaxed">
                                        *This is an estimate. Equity release is a complex financial product. Always consult a qualified FCA-regulated advisor.
                                    </p>
                                </CardContent>
                            ) : (
                                <CardContent className="p-12 text-center">
                                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 mx-auto mb-6">
                                        <Landmark className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Eligibility Required</h3>
                                    <p className="text-slate-500 dark:text-slate-400">Equity release in the UK is typically available for individuals aged 55 and over.</p>
                                </CardContent>
                            )}
                        </Card>
                    ) : (
                        <div className="h-full bg-slate-100/50 dark:bg-slate-900/30 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center p-12 min-h-[400px]">
                            <PieChart className="w-16 h-16 text-slate-300 mb-4" />
                            <h3 className="text-lg font-bold text-slate-400">Waiting for details...</h3>
                            <p className="text-sm text-slate-400 max-w-xs">Enter your age and property value to see how much cash you could unlock.</p>
                        </div>
                    )}

                    <div className="bg-amber-50 dark:bg-amber-950/20 p-6 rounded-3xl border border-amber-100 dark:border-amber-900/30 flex gap-4">
                        <Landmark className="w-10 h-10 text-amber-600 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-amber-900 dark:text-amber-400">UK Market Insights</h4>
                            <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed mt-1">
                                Equity release allowed UK homeowners to unlock over £3 billion in 2024. Most plans are "Lifetime Mortgages" where you remain the owner.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
