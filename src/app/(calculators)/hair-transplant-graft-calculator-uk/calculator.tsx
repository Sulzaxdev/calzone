
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { calculateHairTransplant, HairLossZone, Technique } from "@/lib/hair-transplant-logic";
import { Scissors, PoundSterling, Plane, Activity, CheckCircle2, Download } from "lucide-react";

export function HairTransplantCalculatorForm() {
    const [selectedZones, setSelectedZones] = useState<HairLossZone[]>(['front']);
    const [technique, setTechnique] = useState<Technique>('fue');
    const [result, setResult] = useState<any>(null);

    const handleCalculate = () => {
        const res = calculateHairTransplant(selectedZones, technique);
        setResult(res);
    };

    const toggleZone = (zone: HairLossZone) => {
        setSelectedZones(prev => 
            prev.includes(zone) 
                ? prev.filter(z => z !== zone)
                : [...prev, zone]
        );
    };

    return (
        <section className="container mx-auto px-4 pt-10">
            <div className="grid lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
                {/* Input Card */}
                <Card className="rounded-[2rem] border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden bg-white dark:bg-slate-900 border">
                    <CardHeader className="bg-slate-50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-800 p-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-sky-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                                <Activity className="w-6 h-6" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100 uppercase">Graft Estimator</CardTitle>
                                <CardDescription>Select your areas of hair loss</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                        
                        <div className="space-y-4">
                            <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500">1. Select Thinning Areas</Label>
                            <p className="text-xs text-slate-500 font-medium">Which parts of your scalp require restoration?</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <label className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${selectedZones.includes('front') ? 'border-sky-500 bg-sky-50 dark:bg-sky-900/20' : 'border-slate-200 dark:border-slate-800'}`}>
                                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full mb-3 flex items-center justify-center">
                                        <div className="w-8 h-4 bg-sky-400 rounded-t-full opacity-80 mt-[-10px]"></div>
                                    </div>
                                    <span className="font-bold text-sm">Frontal / Hairline</span>
                                    <Checkbox className="sr-only" checked={selectedZones.includes('front')} onCheckedChange={() => toggleZone('front')} />
                                </label>
                                
                                <label className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${selectedZones.includes('mid') ? 'border-sky-500 bg-sky-50 dark:bg-sky-900/20' : 'border-slate-200 dark:border-slate-800'}`}>
                                     <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full mb-3 flex items-center justify-center">
                                        <div className="w-6 h-6 bg-sky-400 rounded-full opacity-80 mt-[-15px]"></div>
                                    </div>
                                    <span className="font-bold text-sm">Mid-Scalp</span>
                                    <Checkbox className="sr-only" checked={selectedZones.includes('mid')} onCheckedChange={() => toggleZone('mid')} />
                                </label>
                                
                                <label className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${selectedZones.includes('crown') ? 'border-sky-500 bg-sky-50 dark:bg-sky-900/20' : 'border-slate-200 dark:border-slate-800'}`}>
                                     <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full mb-3 flex items-center justify-center">
                                       <div className="w-8 h-8 bg-sky-400 rounded-full opacity-80 mt-[5px]"></div>
                                    </div>
                                    <span className="font-bold text-sm">Crown (Vertex)</span>
                                    <Checkbox className="sr-only" checked={selectedZones.includes('crown')} onCheckedChange={() => toggleZone('crown')} />
                                </label>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500">2. Preferred Technique</Label>
                            <RadioGroup value={technique} onValueChange={(v: any) => setTechnique(v)} className="grid grid-cols-2 gap-3">
                                <div>
                                    <RadioGroupItem value="fue" id="fue" className="peer sr-only" />
                                    <Label
                                        htmlFor="fue"
                                        className="flex flex-col items-center justify-between rounded-xl border-2 border-slate-200 bg-transparent p-4 hover:bg-slate-50 hover:text-slate-900 peer-data-[state=checked]:border-sky-500 peer-data-[state=checked]:bg-sky-50 dark:border-slate-800 dark:hover:bg-slate-800 dark:peer-data-[state=checked]:border-sky-500 dark:peer-data-[state=checked]:bg-sky-950/30 cursor-pointer transition-all text-center"
                                    >
                                        <span className="block font-bold mb-1 text-sm">FUE (Modern)</span>
                                        <span className="block text-[10px] text-slate-500 font-medium">Individual extraction. Less scarring.</span>
                                    </Label>
                                </div>
                                <div>
                                    <RadioGroupItem value="fut" id="fut" className="peer sr-only" />
                                    <Label
                                        htmlFor="fut"
                                        className="flex flex-col items-center justify-between rounded-xl border-2 border-slate-200 bg-transparent p-4 hover:bg-slate-50 hover:text-slate-900 peer-data-[state=checked]:border-sky-500 peer-data-[state=checked]:bg-sky-50 dark:border-slate-800 dark:hover:bg-slate-800 dark:peer-data-[state=checked]:border-sky-500 dark:peer-data-[state=checked]:bg-sky-950/30 cursor-pointer transition-all text-center"
                                    >
                                        <span className="block font-bold mb-1 text-sm">FUT (Strip)</span>
                                        <span className="block text-[10px] text-slate-500 font-medium">Strip removal. Usually cheaper.</span>
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <Button 
                            onClick={handleCalculate}
                            disabled={selectedZones.length === 0}
                            className="w-full h-16 rounded-2xl bg-sky-600 hover:bg-sky-700 text-lg font-bold shadow-xl shadow-sky-500/20 transition-all active:scale-[0.98] disabled:opacity-50"
                        >
                            <Scissors className="w-5 h-5 mr-2" /> Estimate Grafts & Cost
                        </Button>
                    </CardContent>
                </Card>

                {/* Results Section */}
                <div className="space-y-6">
                    {result ? (
                        <Card className="rounded-[2.5rem] border-2 border-sky-500 bg-sky-50/50 dark:bg-sky-950/20 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                             <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-500/10 rounded-full blur-2xl pointer-events-none"></div>
                            <CardContent className="p-10 relative z-10 text-center">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500 text-white text-[10px] font-black uppercase tracking-widest mb-6 border border-sky-400">
                                    <CheckCircle2 className="w-3 h-3" /> Estimate Generated
                                </div>
                                
                                <h3 className="text-lg font-bold text-slate-600 dark:text-slate-400 mb-2 italic">Estimated Grafts Required</h3>
                                <div className="text-6xl md:text-7xl font-black text-sky-600 dark:text-sky-400 mb-2 tracking-tighter">
                                    {result.estimatedGraftsMin.toLocaleString()} - {result.estimatedGraftsMax.toLocaleString()}
                                </div>
                                <p className="text-sm font-bold text-slate-500 mb-8 uppercase tracking-widest">{technique.toUpperCase()} Technique</p>

                                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-sky-100 dark:border-sky-900/40 p-6 mb-8 text-left space-y-4">
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2">Cost Comparison</h4>
                                    
                                    <div className="flex justify-between items-center text-sm py-2">
                                        <span className="font-bold flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                            <PoundSterling className="w-4 h-4 text-emerald-500" /> Average UK Cost
                                        </span>
                                        <span className="font-black text-slate-900 dark:text-white">
                                            £{result.estimatedCostUKMin.toLocaleString()} - £{result.estimatedCostUKMax.toLocaleString()}
                                        </span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center text-sm py-2 border-t border-slate-100 dark:border-slate-800">
                                        <span className="font-bold flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                            <Plane className="w-4 h-4 text-rose-500" /> Turkey (Medical Tourism)
                                        </span>
                                        <span className="font-black text-slate-900 dark:text-white">
                                            £{result.estimatedCostTurkeyMin.toLocaleString()} - £{result.estimatedCostTurkeyMax.toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-slate-400 italic text-center mt-2">Turkey packages usually include hotel & transfers.</p>
                                </div>

                                <Button className="w-full h-14 rounded-xl bg-slate-900 dark:bg-white hover:bg-slate-800 text-white dark:text-slate-900 font-bold gap-2">
                                    <Download className="w-5 h-5" /> Save My Estimate
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="h-full bg-slate-100/50 dark:bg-slate-900/30 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center p-12 min-h-[500px]">
                            <Scissors className="w-16 h-16 text-slate-300 mb-4" />
                            <h3 className="text-lg font-bold text-slate-400">Awaiting Selections</h3>
                            <p className="text-sm text-slate-400 max-w-xs mt-2">Select the zones of your head that are thinning to generate a graft and cost estimate.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
