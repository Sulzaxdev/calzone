
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { calculateCGT, CGTAssetType, CGTTaxBand } from "@/lib/cgt-logic";
import { Calculator, Landmark, PoundSterling, Download, AlertCircle, Percent } from "lucide-react";

export function CGTCalculatorForm() {
    const [purchasePrice, setPurchasePrice] = useState<number>(150000);
    const [salePrice, setSalePrice] = useState<number>(250000);
    const [costs, setCosts] = useState<number>(5000);
    const [assetType, setAssetType] = useState<CGTAssetType>('residential');
    const [taxBand, setTaxBand] = useState<CGTTaxBand>('higher');
    const [result, setResult] = useState<any>(null);

    const handleCalculate = () => {
        const res = calculateCGT(purchasePrice, salePrice, costs, assetType, taxBand);
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
                                <Landmark className="w-6 h-6" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100 uppercase">Capital Gains Tax</CardTitle>
                                <CardDescription>Enter asset sale details (2024/25 rules)</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                        
                        <div className="space-y-4">
                            <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500">1. Select Asset Type</Label>
                            <RadioGroup value={assetType} onValueChange={(v: any) => setAssetType(v)} className="grid grid-cols-2 gap-3">
                                <div>
                                    <RadioGroupItem value="residential" id="residential" className="peer sr-only" />
                                    <Label
                                        htmlFor="residential"
                                        className="flex flex-col items-center justify-between rounded-xl border-2 border-slate-200 bg-transparent p-4 hover:bg-slate-50 hover:text-slate-900 peer-data-[state=checked]:border-rose-500 peer-data-[state=checked]:bg-rose-50 dark:border-slate-800 dark:hover:bg-slate-800 dark:peer-data-[state=checked]:border-rose-500 dark:peer-data-[state=checked]:bg-rose-950/30 cursor-pointer transition-all text-center"
                                    >
                                        <span className="block font-bold mb-1 text-sm">Property</span>
                                        <span className="block text-[10px] text-slate-500 font-medium">Buy-to-let or 2nd home</span>
                                    </Label>
                                </div>
                                <div>
                                    <RadioGroupItem value="other" id="other" className="peer sr-only" />
                                    <Label
                                        htmlFor="other"
                                        className="flex flex-col items-center justify-between rounded-xl border-2 border-slate-200 bg-transparent p-4 hover:bg-slate-50 hover:text-slate-900 peer-data-[state=checked]:border-rose-500 peer-data-[state=checked]:bg-rose-50 dark:border-slate-800 dark:hover:bg-slate-800 dark:peer-data-[state=checked]:border-rose-500 dark:peer-data-[state=checked]:bg-rose-950/30 cursor-pointer transition-all text-center"
                                    >
                                        <span className="block font-bold mb-1 text-sm">Shares/Other</span>
                                        <span className="block text-[10px] text-slate-500 font-medium">Stocks, Crypto, Assets</span>
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="space-y-4 border-t border-slate-100 dark:border-slate-800 pt-4">
                            <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500">2. Income Tax Band</Label>
                            <RadioGroup value={taxBand} onValueChange={(v: any) => setTaxBand(v)} className="grid grid-cols-2 gap-3">
                                <div>
                                    <RadioGroupItem value="basic" id="basic" className="peer sr-only" />
                                    <Label
                                        htmlFor="basic"
                                        className="flex flex-col items-center justify-between rounded-xl border-2 border-slate-200 bg-transparent p-4 hover:bg-slate-50 hover:text-slate-900 peer-data-[state=checked]:border-rose-500 peer-data-[state=checked]:bg-rose-50 dark:border-slate-800 dark:hover:bg-slate-800 dark:peer-data-[state=checked]:border-rose-500 dark:peer-data-[state=checked]:bg-rose-950/30 cursor-pointer transition-all text-center"
                                    >
                                        <span className="block font-bold mb-1 text-sm">Basic Rate</span>
                                        <span className="block text-[10px] text-slate-500 font-medium">Income under £50k</span>
                                    </Label>
                                </div>
                                <div>
                                    <RadioGroupItem value="higher" id="higher" className="peer sr-only" />
                                    <Label
                                        htmlFor="higher"
                                        className="flex flex-col items-center justify-between rounded-xl border-2 border-slate-200 bg-transparent p-4 hover:bg-slate-50 hover:text-slate-900 peer-data-[state=checked]:border-rose-500 peer-data-[state=checked]:bg-rose-50 dark:border-slate-800 dark:hover:bg-slate-800 dark:peer-data-[state=checked]:border-rose-500 dark:peer-data-[state=checked]:bg-rose-950/30 cursor-pointer transition-all text-center"
                                    >
                                        <span className="block font-bold mb-1 text-sm">Higher/Add Rate</span>
                                        <span className="block text-[10px] text-slate-500 font-medium">Income over £50k</span>
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                         <div className="grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-800 pt-4">
                            <div className="space-y-2">
                                <Label className="text-[11px] font-bold text-slate-500 uppercase">Purchase Price (£)</Label>
                                <Input 
                                    type="number" 
                                    value={purchasePrice} 
                                    onChange={(e) => setPurchasePrice(Number(e.target.value))}
                                    className="h-12 font-bold rounded-xl text-slate-700 dark:text-slate-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[11px] font-bold text-slate-500 uppercase">Sale Price (£)</Label>
                                <Input 
                                    type="number" 
                                    value={salePrice} 
                                    onChange={(e) => setSalePrice(Number(e.target.value))}
                                    className="h-12 font-bold rounded-xl text-slate-700 dark:text-slate-200"
                                />
                            </div>
                        </div>

                         <div className="space-y-2">
                            <Label className="text-[11px] font-bold text-slate-500 uppercase">Deductible Costs & Fees (£)</Label>
                             <p className="text-[10px] text-slate-500 mb-2">Legal fees, stamp duty paid on purchase, agent fees, or capital improvements.</p>
                            <Input 
                                type="number" 
                                value={costs} 
                                onChange={(e) => setCosts(Number(e.target.value))}
                                className="h-12 font-bold rounded-xl text-slate-700 dark:text-slate-200"
                            />
                        </div>


                        <Button 
                            onClick={handleCalculate}
                            className="w-full h-16 rounded-2xl bg-rose-600 hover:bg-rose-700 text-lg font-bold shadow-xl shadow-rose-500/20 text-white transition-all active:scale-[0.98]"
                        >
                            <Calculator className="w-5 h-5 mr-2" /> Calculate CGT
                        </Button>
                    </CardContent>
                </Card>

                {/* Results Section */}
                <div className="space-y-6">
                    {result ? (
                        <Card className={`rounded-[2.5rem] border-2 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 border-rose-500 bg-rose-50/50 dark:bg-rose-950/20`}>
                             <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl pointer-events-none bg-rose-500/10`}></div>
                            <CardContent className="p-10 relative z-10 text-center">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest mb-6 border border-rose-400">
                                    <Percent className="w-3 h-3" /> Tax Band: {result.taxRateApplied}
                                </div>
                                
                                <h3 className="text-lg font-bold text-slate-600 dark:text-slate-400 mb-2 italic">Capital Gains Tax Bill</h3>
                                <div className="text-6xl md:text-7xl font-black text-rose-600 dark:text-rose-400 mb-8 tracking-tighter">
                                    £{result.finalTaxDue.toLocaleString()}
                                </div>

                                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-rose-100 dark:border-rose-900/40 p-6 mb-8 text-left space-y-4">
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2">Calculation Breakdown</h4>
                                    
                                     <div className="flex justify-between items-center text-sm py-1">
                                        <span className="font-medium text-slate-600 dark:text-slate-400">Total Profit (Gross Gain)</span>
                                        <span className="font-bold text-slate-900 dark:text-slate-100">£{result.totalGain.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm py-1">
                                        <span className="font-medium text-slate-600 dark:text-slate-400">Tax-Free Allowance Used</span>
                                        <span className="font-bold text-emerald-600 dark:text-emerald-400">- £{result.allowanceUsed.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm py-1 border-t border-slate-100 dark:border-slate-800 pt-2">
                                        <span className="font-bold text-slate-600 dark:text-slate-400">Net Taxable Gain</span>
                                        <span className="font-black text-slate-900 dark:text-slate-100">£{result.taxableGain.toLocaleString()}</span>
                                    </div>
                                   
                                </div>

                                 <Button 
                                    onClick={() => window.print()}
                                    className="w-full h-14 rounded-xl bg-slate-900 dark:bg-white hover:bg-slate-800 text-white dark:text-slate-900 font-bold gap-2"
                                >
                                    <Download className="w-5 h-5" /> Export PDF Summary
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="h-full bg-slate-100/50 dark:bg-slate-900/30 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center p-12 min-h-[500px]">
                            <Landmark className="w-16 h-16 text-slate-300 mb-4" />
                            <h3 className="text-lg font-bold text-slate-400">Awaiting Details</h3>
                            <p className="text-sm text-slate-400 max-w-xs mt-2">Enter your purchase price, sale price, and deductible costs to generate your estimated tax bill.</p>
                        </div>
                    )}

                    <div className="bg-sky-50 dark:bg-sky-950/20 p-6 rounded-3xl border border-sky-100 dark:border-sky-900/30 flex gap-4">
                        <AlertCircle className="w-8 h-8 text-sky-600 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-sky-900 dark:text-sky-400 text-sm">Main Residence Exemption</h4>
                            <p className="text-xs text-sky-800 dark:text-sky-400 leading-relaxed max-w-sm mt-1">
                                You do NOT usually pay CGT when you sell your main home (the one you live in) due to Private Residence Relief (PRR). This tool is for second homes, rentals, or investments like shares.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
