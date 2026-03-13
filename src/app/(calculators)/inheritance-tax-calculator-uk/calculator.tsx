
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { calculateIHT } from "@/lib/inheritance-tax-logic";
import { Heart, Landmark, PoundSterling, Download, AlertCircle, Users } from "lucide-react";

export function InheritanceTaxCalculatorForm() {
    const [totalEstateValue, setTotalEstateValue] = useState<number>(850000);
    const [propertyValue, setPropertyValue] = useState<number>(450000);
    const [isMarried, setIsMarried] = useState<boolean>(true);
    const [passingToDescendants, setPassingToDescendants] = useState<boolean>(true);
    const [result, setResult] = useState<any>(null);

    const handleCalculate = () => {
        const res = calculateIHT(totalEstateValue, propertyValue, isMarried, passingToDescendants);
        setResult(res);
    };

    return (
        <section className="container mx-auto px-4 pt-10">
            <div className="grid lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
                {/* Input Card */}
                <Card className="rounded-[2rem] border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden bg-white dark:bg-slate-900 border">
                    <CardHeader className="bg-slate-50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-800 p-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                                <Heart className="w-6 h-6" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100 uppercase">Estate Details</CardTitle>
                                <CardDescription>Enter the value of assets to be passed on</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                        <div className="space-y-3">
                            <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Total Value of Estate (£)</Label>
                            <p className="text-xs text-slate-500 font-medium">Include property, savings, stocks, and valuable possessions.</p>
                            <Input 
                                type="number" 
                                value={totalEstateValue} 
                                onChange={(e) => setTotalEstateValue(Number(e.target.value))}
                                className="h-16 font-black rounded-2xl text-2xl text-purple-700 dark:text-purple-400 placeholder:text-slate-300"
                            />
                        </div>

                        <div className="space-y-3">
                            <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Main Residence Value (£)</Label>
                            <p className="text-xs text-slate-500 font-medium">How much of the total estate is made up of your main home?</p>
                            <Input 
                                type="number" 
                                value={propertyValue} 
                                onChange={(e) => setPropertyValue(Number(e.target.value))}
                                className="h-16 font-black rounded-2xl text-2xl text-purple-700 dark:text-purple-400 placeholder:text-slate-300"
                            />
                        </div>

                        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
                                <div className="flex gap-4 items-center">
                                     <Users className="w-6 h-6 text-slate-400" />
                                    <div>
                                        <Label className="text-sm font-bold text-slate-800 dark:text-slate-200">Are you married or in a civil partnership?</Label>
                                        <p className="text-xs text-slate-500 mt-1">Spouses can pass on their £325k allowance if unused, doubling your tax-free limit.</p>
                                    </div>
                                </div>
                                <Switch 
                                    checked={isMarried}
                                    onCheckedChange={setIsMarried}
                                />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
                                <div className="flex gap-4 items-center">
                                    <Heart className="w-6 h-6 text-slate-400" />
                                    <div>
                                        <Label className="text-sm font-bold text-slate-800 dark:text-slate-200">Are you leaving your home to direct descendants?</Label>
                                        <p className="text-xs text-slate-500 mt-1">e.g., Children or grandchildren. This unlocks the Residence Nil-Rate Band (£175k).</p>
                                    </div>
                                </div>
                                <Switch 
                                    checked={passingToDescendants}
                                    onCheckedChange={setPassingToDescendants}
                                />
                            </div>
                        </div>

                        <Button 
                            onClick={handleCalculate}
                            className="w-full h-16 rounded-2xl bg-purple-600 hover:bg-purple-700 text-lg font-bold shadow-xl shadow-purple-500/20 transition-all active:scale-[0.98]"
                        >
                            <Landmark className="w-5 h-5 mr-2" /> Calculate Tax Due
                        </Button>
                    </CardContent>
                </Card>

                {/* Results Section */}
                <div className="space-y-6">
                    {result ? (
                        <Card className="rounded-[2.5rem] border-2 border-purple-500 bg-purple-50/50 dark:bg-purple-950/20 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                             <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>
                            <CardContent className="p-10 relative z-10 text-center">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500 text-white text-[10px] font-black uppercase tracking-widest mb-6 border border-purple-400">
                                    <PoundSterling className="w-3 h-3" /> HM Revenue & Customs Estimate
                                </div>
                                
                                <h3 className="text-lg font-bold text-slate-600 dark:text-slate-400 mb-2 italic">Estimated Inheritance Tax Bill (40%)</h3>
                                <div className="text-6xl md:text-7xl font-black text-purple-600 dark:text-purple-400 mb-8 tracking-tighter">
                                    £{result.taxDue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                </div>

                                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-purple-100 dark:border-purple-900/40 p-6 mb-8 text-left space-y-4">
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2">Estate & Allowance Breakdown</h4>
                                    
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-medium text-slate-600 dark:text-slate-400">Total Estate Value</span>
                                        <span className="font-bold text-slate-900 dark:text-slate-100">£{result.taxableEstate.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm text-emerald-600 dark:text-emerald-400">
                                        <span className="font-medium">Total Tax-Free Allowances (-)</span>
                                        <span className="font-bold">£{result.allowancesUsed.totalAllowance.toLocaleString()}</span>
                                    </div>
                                    
                                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-sm">
                                        <span className="font-bold text-slate-800 dark:text-slate-200">Taxable Amount</span>
                                        <span className="font-black text-rose-600 dark:text-rose-400">£{result.totalTaxable.toLocaleString()}</span>
                                    </div>

                                    {result.taxDue === 0 && (
                                        <div className="text-center py-4 mt-4 text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/30 rounded-xl">
                                            Your estate is fully within tax-free allowances!
                                        </div>
                                    )}
                                </div>

                                <Button onClick={() => window.print()} className="w-full h-14 rounded-xl bg-slate-900 dark:bg-white hover:bg-slate-800 text-white dark:text-slate-900 font-bold gap-2">
                                    <Download className="w-5 h-5" /> Export PDF Summary
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="h-full bg-slate-100/50 dark:bg-slate-900/30 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center p-12 min-h-[500px]">
                            <Landmark className="w-16 h-16 text-slate-300 mb-4" />
                            <h3 className="text-lg font-bold text-slate-400">Awaiting Estate Data</h3>
                            <p className="text-sm text-slate-400 max-w-xs mt-2">Enter your total estate value and home worth to see your potential tax liability.</p>
                        </div>
                    )}

                    <div className="bg-amber-50 dark:bg-amber-950/20 p-6 rounded-3xl border border-amber-100 dark:border-amber-900/30 flex gap-4">
                        <AlertCircle className="w-8 h-8 text-amber-600 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-amber-900 dark:text-amber-400 text-sm">7-Year Gift Rule</h4>
                            <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed max-w-sm mt-1">
                                Have you given away large sums of money recently? Gifts given within 7 years of death may still be subject to Inheritance Tax on a sliding scale.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

