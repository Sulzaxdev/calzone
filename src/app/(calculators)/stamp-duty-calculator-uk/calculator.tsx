
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { calculateSDLT } from "@/lib/stamp-duty-logic";
import { Home, Receipt, PoundSterling, Download, AlertCircle } from "lucide-react";

export function StampDutyCalculatorForm() {
    const [propertyValue, setPropertyValue] = useState<number>(350000);
    const [buyerType, setBuyerType] = useState<'first-time' | 'next-home' | 'additional-property'>('next-home');
    const [isNonResident, setIsNonResident] = useState<boolean>(false);
    const [result, setResult] = useState<any>(null);

    const handleCalculate = () => {
        const res = calculateSDLT(propertyValue, buyerType, isNonResident);
        setResult(res);
    };

    return (
        <section className="container mx-auto px-4 pt-10">
            <div className="grid lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
                {/* Input Card */}
                <Card className="rounded-[2rem] border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden bg-white dark:bg-slate-900 border">
                    <CardHeader className="bg-slate-50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-800 p-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                                <Home className="w-6 h-6" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100 uppercase">Property Details</CardTitle>
                                <CardDescription>Enter the purchase price and buyer status</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                        <div className="space-y-3">
                            <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Purchase Price (£)</Label>
                            <Input 
                                type="number" 
                                value={propertyValue} 
                                onChange={(e) => setPropertyValue(Number(e.target.value))}
                                className="h-16 font-black rounded-2xl text-2xl text-rose-700 dark:text-rose-400 placeholder:text-slate-300"
                            />
                        </div>

                        <div className="space-y-4">
                            <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Buyer Status</Label>
                            <RadioGroup value={buyerType} onValueChange={(v: any) => setBuyerType(v)} className="grid gap-3">
                                <div>
                                    <RadioGroupItem value="first-time" id="first-time" className="peer sr-only" />
                                    <Label
                                        htmlFor="first-time"
                                        className="flex flex-col items-center justify-between rounded-xl border-2 border-slate-200 bg-transparent p-4 hover:bg-slate-50 hover:text-slate-900 peer-data-[state=checked]:border-rose-600 peer-data-[state=checked]:bg-rose-50 dark:border-slate-800 dark:hover:bg-slate-800 dark:peer-data-[state=checked]:border-rose-500 dark:peer-data-[state=checked]:bg-rose-950/30 cursor-pointer transition-all"
                                    >
                                        <div className="w-full text-left">
                                            <span className="block font-bold mb-1 text-sm">First-Time Buyer</span>
                                            <span className="block text-xs text-slate-500 font-medium">Never owned a property anywhere in the world. (Relief up to £625k)</span>
                                        </div>
                                    </Label>
                                </div>
                                <div>
                                    <RadioGroupItem value="next-home" id="next-home" className="peer sr-only" />
                                    <Label
                                        htmlFor="next-home"
                                        className="flex flex-col items-center justify-between rounded-xl border-2 border-slate-200 bg-transparent p-4 hover:bg-slate-50 hover:text-slate-900 peer-data-[state=checked]:border-rose-600 peer-data-[state=checked]:bg-rose-50 dark:border-slate-800 dark:hover:bg-slate-800 dark:peer-data-[state=checked]:border-rose-500 dark:peer-data-[state=checked]:bg-rose-950/30 cursor-pointer transition-all"
                                    >
                                        <div className="w-full text-left">
                                            <span className="block font-bold mb-1 text-sm">Moving Home (Standard)</span>
                                            <span className="block text-xs text-slate-500 font-medium">Selling your main residence to buy a new one.</span>
                                        </div>
                                    </Label>
                                </div>
                                <div>
                                    <RadioGroupItem value="additional-property" id="additional-property" className="peer sr-only" />
                                    <Label
                                        htmlFor="additional-property"
                                        className="flex flex-col items-center justify-between rounded-xl border-2 border-slate-200 bg-transparent p-4 hover:bg-slate-50 hover:text-slate-900 peer-data-[state=checked]:border-rose-600 peer-data-[state=checked]:bg-rose-50 dark:border-slate-800 dark:hover:bg-slate-800 dark:peer-data-[state=checked]:border-rose-500 dark:peer-data-[state=checked]:bg-rose-950/30 cursor-pointer transition-all"
                                    >
                                        <div className="w-full text-left">
                                            <span className="block font-bold mb-1 text-sm">Additional Property / Buy-to-Let</span>
                                            <span className="block text-xs text-slate-500 font-medium">Buying a second home or an investment property. (3% Surcharge applies)</span>
                                        </div>
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
                            <div>
                                <Label className="text-sm font-bold text-slate-800 dark:text-slate-200">Non-UK Resident?</Label>
                                <p className="text-xs text-slate-500">Adds an extra 2% surcharge.</p>
                            </div>
                            <Switch 
                                checked={isNonResident}
                                onCheckedChange={setIsNonResident}
                            />
                        </div>

                        <Button 
                            onClick={handleCalculate}
                            className="w-full h-16 rounded-2xl bg-rose-600 hover:bg-rose-700 text-lg font-bold shadow-xl shadow-rose-500/20 transition-all active:scale-[0.98]"
                        >
                            <Receipt className="w-5 h-5 mr-2" /> Calculate Total SDLT
                        </Button>
                    </CardContent>
                </Card>

                {/* Results Section */}
                <div className="space-y-6">
                    {result ? (
                        <Card className="rounded-[2.5rem] border-2 border-rose-500 bg-rose-50/50 dark:bg-rose-950/20 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                             <div className="absolute -top-10 -right-10 w-40 h-40 bg-rose-500/10 rounded-full blur-2xl pointer-events-none"></div>
                            <CardContent className="p-10 relative z-10 text-center">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest mb-6 border border-rose-400">
                                    <PoundSterling className="w-3 h-3" /> HM Revenue & Customs Estimate
                                </div>
                                
                                <h3 className="text-lg font-bold text-slate-600 dark:text-slate-400 mb-2 italic">Total Stamp Duty to Pay</h3>
                                <div className="text-6xl md:text-7xl font-black text-rose-600 dark:text-rose-400 mb-8 tracking-tighter">
                                    £{result.totalTax.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                </div>

                                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-rose-100 dark:border-rose-900/40 p-6 mb-8 text-left space-y-4">
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2">Tax Band Breakdown</h4>
                                    {result.bands.map((band: any, i: number) => (
                                        <div key={i} className="flex justify-between items-center text-sm">
                                            <span className="font-medium text-slate-600 dark:text-slate-400">{band.range} <span className="opacity-50">(@ {band.rateStr})</span></span>
                                            <span className="font-bold text-slate-900 dark:text-slate-100">£{Math.floor(band.taxInBand).toLocaleString()}</span>
                                        </div>
                                    ))}
                                    {result.totalTax === 0 && (
                                        <div className="text-center py-4 text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/30 rounded-xl">
                                            Woohoo! You pay zero Stamp Duty. 🎉
                                        </div>
                                    )}
                                </div>

                                <Button onClick={() => window.print()} className="w-full h-14 rounded-xl bg-slate-900 dark:bg-white hover:bg-slate-800 text-white dark:text-slate-900 font-bold gap-2">
                                    <Download className="w-5 h-5" /> Export PDF Quote
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="h-full bg-slate-100/50 dark:bg-slate-900/30 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center p-12 min-h-[500px]">
                            <Receipt className="w-16 h-16 text-slate-300 mb-4" />
                            <h3 className="text-lg font-bold text-slate-400">Awaiting Price Data</h3>
                            <p className="text-sm text-slate-400 max-w-xs mt-2">Enter the property purchase price and your buying status to see the HMRC stamp duty breakdown.</p>
                        </div>
                    )}

                    <div className="bg-amber-50 dark:bg-amber-950/20 p-6 rounded-3xl border border-amber-100 dark:border-amber-900/30 flex gap-4">
                        <AlertCircle className="w-8 h-8 text-amber-600 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-amber-900 dark:text-amber-400 text-sm">Are you buying in Wales or Scotland?</h4>
                            <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed max-w-sm mt-1">
                                This calculator is for England and Northern Ireland. Scotland uses LBTT and Wales uses LTT, which have different tax bands.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
