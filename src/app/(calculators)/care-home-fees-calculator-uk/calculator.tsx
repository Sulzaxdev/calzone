
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { calculateCareHomeFees, UKNation } from "@/lib/care-home-logic";
import { Calculator, HeartPulse, Building2, AlertTriangle, ShieldCheck, Download, PiggyBank } from "lucide-react";

export function CareHomeFeesCalculatorForm() {
    const [nation, setNation] = useState<UKNation>('england');
    const [propertyValue, setPropertyValue] = useState<number>(300000);
    const [savingsValue, setSavingsValue] = useState<number>(15000);
    const [includeProperty, setIncludeProperty] = useState<boolean>(true);
    
    const [result, setResult] = useState<any>(null);

    const handleCalculate = () => {
        const res = calculateCareHomeFees(nation, propertyValue, savingsValue, includeProperty);
        setResult(res);
    };

    return (
        <section className="container mx-auto px-4 pt-10">
            <div className="grid lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
                {/* Input Card */}
                <Card className="rounded-[2rem] border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden bg-white dark:bg-slate-900 border">
                    <CardHeader className="bg-slate-50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-800 p-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-fuchsia-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                                <HeartPulse className="w-6 h-6" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100 uppercase">Care Home Funding</CardTitle>
                                <CardDescription>Check if you qualify for council support</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                        
                        <div className="space-y-4">
                            <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500">1. Select UK Nation</Label>
                            <p className="text-[10px] text-slate-400">Rules and capital limits differ dramatically across the UK.</p>
                            <RadioGroup value={nation} onValueChange={(v: any) => setNation(v)} className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {['england', 'scotland', 'wales', 'northern_ireland'].map((n) => (
                                    <div key={n}>
                                        <RadioGroupItem value={n} id={n} className="peer sr-only" />
                                        <Label
                                            htmlFor={n}
                                            className="flex flex-col items-center justify-center rounded-xl border-2 border-slate-200 bg-transparent p-3 hover:bg-slate-50 hover:text-slate-900 peer-data-[state=checked]:border-fuchsia-500 peer-data-[state=checked]:bg-fuchsia-50 dark:border-slate-800 dark:hover:bg-slate-800 dark:peer-data-[state=checked]:border-fuchsia-500 dark:peer-data-[state=checked]:bg-fuchsia-950/30 cursor-pointer transition-all text-center h-full"
                                        >
                                            <span className="block font-bold text-xs uppercase text-slate-700 dark:text-slate-300">
                                                {n.replace('_', ' ')}
                                            </span>
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 border-t border-slate-100 dark:border-slate-800 pt-6">
                            <div className="space-y-2">
                                <Label className="text-[11px] font-bold text-slate-500 uppercase">Property Value (£)</Label>
                                <Input 
                                    type="number" 
                                    value={propertyValue} 
                                    onChange={(e) => setPropertyValue(Number(e.target.value))}
                                    className="h-12 font-bold rounded-xl text-slate-700 dark:text-slate-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[11px] font-bold text-slate-500 uppercase">Cash & Savings (£)</Label>
                                <Input 
                                    type="number" 
                                    value={savingsValue} 
                                    onChange={(e) => setSavingsValue(Number(e.target.value))}
                                    className="h-12 font-bold rounded-xl text-slate-700 dark:text-slate-200"
                                />
                            </div>
                        </div>

                        <div className="flex flex-row items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-slate-50 dark:bg-slate-900/50">
                            <div className="space-y-0.5 max-w-[70%]">
                                <Label className="text-sm font-bold text-slate-900 dark:text-slate-100">Include Property in Assessment?</Label>
                                <p className="text-[10px] text-slate-500 leading-tight mt-1">
                                    Turn off if a spouse, civil partner, or dependent child still lives in the home (Property Disregard).
                                </p>
                            </div>
                            <Switch
                                checked={includeProperty}
                                onCheckedChange={setIncludeProperty}
                            />
                        </div>


                        <Button 
                            onClick={handleCalculate}
                            className="w-full h-16 rounded-2xl bg-fuchsia-600 hover:bg-fuchsia-700 text-lg font-bold shadow-xl shadow-fuchsia-500/20 text-white transition-all active:scale-[0.98]"
                        >
                            <Calculator className="w-5 h-5 mr-2" /> Check Funding Eligibility
                        </Button>
                    </CardContent>
                </Card>

                {/* Results Section */}
                <div className="space-y-6">
                    {result ? (
                        <Card className={`rounded-[2.5rem] border-2 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 ${result.selfFunded ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20' : 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20'}`}>
                             <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl pointer-events-none ${result.selfFunded ? 'bg-amber-500/10' : 'bg-emerald-500/10'}`}></div>
                            <CardContent className="p-10 relative z-10 text-center">
                                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-white text-[10px] font-black uppercase tracking-widest mb-6 border ${result.selfFunded ? 'bg-amber-500 border-amber-400' : 'bg-emerald-500 border-emerald-400'}`}>
                                    {result.selfFunded ? <AlertTriangle className="w-3 h-3" /> : <ShieldCheck className="w-3 h-3" />}
                                    {result.selfFunded ? 'Self-Funder Status' : 'Council Funded / Supported'}
                                </div>
                                
                                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">{result.selfFunded ? "You are classed as a Self-Funder" : "You qualify for Local Authority help"}</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 font-medium leading-relaxed max-w-sm mx-auto">
                                    {result.eligibilityMessage}
                                </p>

                                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 mb-8 text-left space-y-4">
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2">The Numbers (Means Test)</h4>
                                    
                                     <div className="flex justify-between items-center text-sm py-1">
                                        <span className="font-medium text-slate-600 dark:text-slate-400">Total Assessable Assets</span>
                                        <span className="font-bold text-slate-900 dark:text-slate-100">
                                            £{((includeProperty ? propertyValue : 0) + savingsValue).toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm py-1">
                                        <span className="font-medium text-slate-600 dark:text-slate-400 text-xs">Upper Capital Limit ({nation.replace('_',' ')})</span>
                                        <span className="font-bold text-slate-500 text-xs">£{result.upperCapitalLimit.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm py-1 border-t border-slate-100 dark:border-slate-800 pt-2">
                                        <span className="font-bold text-slate-600 dark:text-slate-400">Weekly Tariff Contribution</span>
                                        <span className="font-black text-slate-900 dark:text-slate-100">£{result.tariffIncome.toFixed(2)} /week</span>
                                    </div>
                                   
                                </div>

                            </CardContent>
                        </Card>
                    ) : (
                        <div className="h-full bg-slate-100/50 dark:bg-slate-900/30 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center p-12 min-h-[500px]">
                            <Building2 className="w-16 h-16 text-slate-300 mb-4" />
                            <h3 className="text-lg font-bold text-slate-400">Awaiting Assets</h3>
                            <p className="text-sm text-slate-400 max-w-xs mt-2">Enter your total assets, property value, and location to determine your status against the UK Capital Limits.</p>
                        </div>
                    )}

                    <div className="bg-fuchsia-50 dark:bg-fuchsia-950/20 p-6 rounded-3xl border border-fuchsia-100 dark:border-fuchsia-900/30 flex gap-4">
                        <PiggyBank className="w-8 h-8 text-fuchsia-600 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-fuchsia-900 dark:text-fuchsia-400 text-sm">Deprivation of Assets</h4>
                            <p className="text-xs text-fuchsia-800 dark:text-fuchsia-400 leading-relaxed max-w-sm mt-1">
                                Deliberately giving away money, properties, or placing them into a Trust to avoid care home fees is classed as "Deprivation of Assets" by local councils. They can legally reverse these transactions or treat you as if you still own the assets.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
