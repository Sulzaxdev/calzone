
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculateDentalImplantCost } from "@/lib/dental-implant-logic";
import { Microscope, Download, Sparkles, AlertCircle, Stethoscope } from "lucide-react";

export function DentalImplantCalculatorForm() {
    const [numImplants, setNumImplants] = useState<number>(1);
    const [material, setMaterial] = useState<'standard' | 'premium' | 'zirconia'>('standard');
    const [boneGraft, setBoneGraft] = useState<boolean>(false);
    const [sinusLift, setSinusLift] = useState<boolean>(false);
    const [extractions, setExtractions] = useState<number>(0);
    const [result, setResult] = useState<any>(null);

    const handleCalculate = () => {
        const res = calculateDentalImplantCost(numImplants, material, boneGraft, sinusLift, extractions);
        setResult(res);
    };

    return (
        <section className="container mx-auto px-4 pt-10">
            <div className="grid lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
                <Card className="rounded-[2rem] border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden bg-white dark:bg-slate-900">
                    <CardHeader className="bg-blue-50/50 dark:bg-blue-950/10 border-b border-slate-100 dark:border-slate-800 p-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                                <Microscope className="w-6 h-6" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-black tracking-tight uppercase">Cost Estimator</CardTitle>
                                <CardDescription>Personalize your UK dental treatment estimate</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Number of Implants</Label>
                                <Input type="number" min={1} value={numImplants} onChange={(e) => setNumImplants(Number(e.target.value))} className="h-12 font-bold rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Material Type</Label>
                                <Select onValueChange={(v: any) => setMaterial(v)} defaultValue="standard">
                                    <SelectTrigger className="h-12 font-bold rounded-xl">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="standard">Standard Titanium</SelectItem>
                                        <SelectItem value="premium">Premium Brand</SelectItem>
                                        <SelectItem value="zirconia">Zirconia (Metal-Free)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-4 pt-2">
                            <div className="flex items-center space-x-3 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <Checkbox id="boneGraft" checked={boneGraft} onCheckedChange={(v: any) => setBoneGraft(v)} />
                                <Label htmlFor="boneGraft" className="text-sm font-bold cursor-pointer">Needs Bone Graft? (+£400-£800)</Label>
                            </div>
                            <div className="flex items-center space-x-3 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <Checkbox id="sinusLift" checked={sinusLift} onCheckedChange={(v: any) => setSinusLift(v)} />
                                <Label htmlFor="sinusLift" className="text-sm font-bold cursor-pointer">Needs Sinus Lift? (+£600-£1500)</Label>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Number of Extractions Needed</Label>
                            <Input type="number" min={0} value={extractions} onChange={(e) => setExtractions(Number(e.target.value))} className="h-12 font-bold rounded-xl" />
                        </div>

                        <Button onClick={handleCalculate} className="w-full h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 text-lg font-bold shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98]">
                            Calculate UK Dental Costs
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {result ? (
                        <Card className="rounded-[2.5rem] border-2 border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <CardContent className="p-10 text-center relative z-10">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest mb-6">
                                    <Sparkles className="w-3 h-3" /> UK Average Quote
                                </div>
                                <h3 className="text-lg font-bold text-slate-600 dark:text-slate-400 mb-2 italic">Estimated Total Cost</h3>
                                <div className="text-5xl md:text-6xl font-black text-emerald-600 dark:text-emerald-400 mb-8 tracking-tighter">
                                    £{result.lowEstimate.toLocaleString()} – £{result.highEstimate.toLocaleString()}
                                </div>
                                
                                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-emerald-100 dark:border-emerald-900/40 mb-8">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Base Cost ({numImplants} Implants)</span>
                                        <span className="font-bold">£{(result.lowEstimate - (result.additionalCosts.boneGraft || 0) - (result.additionalCosts.sinusLift || 0) - (result.additionalCosts.extractions || 0)).toLocaleString()}+</span>
                                    </div>
                                    <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-3">
                                        {result.additionalCosts.boneGraft && <div className="flex justify-between text-xs font-medium text-slate-500"><span>Bone Graft Estimate</span><span>Included</span></div>}
                                        {result.additionalCosts.sinusLift && <div className="flex justify-between text-xs font-medium text-slate-500"><span>Sinus Lift Estimate</span><span>Included</span></div>}
                                        {result.additionalCosts.extractions > 0 && <div className="flex justify-between text-xs font-medium text-slate-500"><span>Extractions ({extractions})</span><span>Included</span></div>}
                                    </div>
                                </div>

                                <Button onClick={() => window.print()} className="w-full h-14 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold gap-2">
                                    <Download className="w-5 h-5" /> Export PDF Quote
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="h-full bg-slate-100/50 dark:bg-slate-900/30 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center p-12 min-h-[440px]">
                            <Stethoscope className="w-16 h-16 text-slate-300 mb-4" />
                            <h3 className="text-lg font-bold text-slate-400">Treatment Plan Pending</h3>
                            <p className="text-sm text-slate-400 max-w-xs">Enter your dental requirements to generate a localized UK price estimate.</p>
                        </div>
                    )}

                    <div className="bg-blue-50 dark:bg-blue-950/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-900/30 flex gap-6">
                        <AlertCircle className="w-12 h-12 text-blue-600 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-black text-blue-900 dark:text-blue-400 uppercase text-xs tracking-widest mb-2">UK Market Insight</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                Private dental costs in London can be 30-50% higher than in the North of England or Wales. Always compare clinic-specific pricing.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
