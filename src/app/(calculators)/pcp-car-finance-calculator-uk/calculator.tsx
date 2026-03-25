
"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { calculatePCP } from "@/lib/pcp-logic";
import { Calculator, Car, Info, Download, AlertTriangle, ArrowRight } from "lucide-react";
import jsPDF from "jspdf";

export function PCPCalculatorForm() {
    const [carPrice, setCarPrice] = useState<number>(25000);
    const [customerDeposit, setCustomerDeposit] = useState<number>(3000);
    const [dealerContribution, setDealerContribution] = useState<number>(1000);
    const [termMonths, setTermMonths] = useState<number>(48);
    const [gmfv, setGmfv] = useState<number>(10500);
    const [apr, setApr] = useState<number>(7.9);
    
    const [result, setResult] = useState<any>(null);
    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const exportPDF = async () => {
        const currentRef = calculatorRef.current;
        if (!currentRef) return;
        setIsExporting(true);

        const exportButton = currentRef.querySelector('button');
        if (exportButton) exportButton.style.opacity = '0';

        try {
            const { toPng } = await import('html-to-image');
            await new Promise((resolve) => setTimeout(resolve, 150));
            const imgData = await toPng(currentRef, {
                pixelRatio: 2,
                backgroundColor: "#ffffff",
                style: {
                    transform: 'scale(1)',
                    transformOrigin: 'top left'
                }
            });
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            
            pdf.setFontSize(22);
            pdf.setTextColor(15, 23, 42);
            pdf.text("PCP Finance Quote Report", 15, 20);
            
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 15, 28);
            
            pdf.setDrawColor(226, 232, 240);
            pdf.line(15, 32, pdfWidth - 15, 32);

            const img = new Image();
            img.src = imgData;
            await new Promise((resolve) => img.onload = resolve);
            const imgHeight = (img.height * (pdfWidth - 30)) / img.width;

            pdf.addImage(imgData, "PNG", 15, 40, pdfWidth - 30, imgHeight);
            pdf.save("PCP-Finance-Quote.pdf");
        } catch (err) {
            console.error("Failed to export", err);
        } finally {
            if (exportButton) exportButton.style.opacity = '1';
            setIsExporting(false);
        }
    };

    const handleCalculate = () => {
        const res = calculatePCP(carPrice, customerDeposit, dealerContribution, termMonths, gmfv, apr);
        setResult(res);
    };

    return (
        <section className="container mx-auto px-4 pt-10">
            <div className="grid lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
                {/* Input Card */}
                <Card className="rounded-[2rem] border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden bg-white dark:bg-slate-900 border">
                    <CardHeader className="bg-slate-50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-800 p-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-sky-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                                <Car className="w-6 h-6" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100 uppercase">PCP Finance Calculator</CardTitle>
                                <CardDescription>Enter your car deal numbers</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                        
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-[11px] font-bold text-slate-500 uppercase">1. Vehicle Cash Price (£)</Label>
                                <Input 
                                    type="number" 
                                    value={carPrice} 
                                    onChange={(e) => setCarPrice(Number(e.target.value))}
                                    className="h-12 font-bold rounded-xl text-slate-700 dark:text-slate-200"
                                />
                            </div>
                        </div>

                         <div className="grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
                            <div className="space-y-2">
                                <Label className="text-[11px] font-bold text-slate-500 uppercase">Your Deposit (£)</Label>
                                <Input 
                                    type="number" 
                                    value={customerDeposit} 
                                    onChange={(e) => setCustomerDeposit(Number(e.target.value))}
                                    className="h-12 font-bold rounded-xl text-slate-700 dark:text-slate-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[11px] font-bold text-slate-500 uppercase">Dealer Contribution (£)</Label>
                                <Input 
                                    type="number" 
                                    value={dealerContribution} 
                                    onChange={(e) => setDealerContribution(Number(e.target.value))}
                                    className="h-12 font-bold rounded-xl text-slate-700 dark:text-slate-200"
                                />
                            </div>
                        </div>

                        <div className="space-y-6 border-t border-slate-100 dark:border-slate-800 pt-6">
                             <div className="space-y-4">
                                <div className="flex justify-between">
                                    <Label className="text-[11px] font-bold text-slate-500 uppercase">Agreement Term</Label>
                                    <span className="text-sm font-black text-sky-600">{termMonths} Months</span>
                                </div>
                                <Slider
                                    value={[termMonths]}
                                    onValueChange={(val) => setTermMonths(val[0])}
                                    min={12}
                                    max={60}
                                    step={12}
                                    className="py-2"
                                />
                                <div className="flex justify-between text-xs text-slate-400 font-medium">
                                    <span>1 Yr</span>
                                    <span>2 Yrs</span>
                                    <span>3 Yrs</span>
                                    <span>4 Yrs</span>
                                    <span>5 Yrs</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
                            <div className="space-y-2">
                                <Label className="text-[11px] font-bold text-slate-500 uppercase">Guaranteed Future Value (£)</Label>
                                <Input 
                                    type="number" 
                                    value={gmfv} 
                                    onChange={(e) => setGmfv(Number(e.target.value))}
                                    className="h-12 font-bold rounded-xl text-slate-700 dark:text-slate-200"
                                    placeholder="Balloon payment"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[11px] font-bold text-slate-500 uppercase">Annual Interest Rate (APR %)</Label>
                                <Input 
                                    type="number" 
                                    value={apr} 
                                    step="0.1"
                                    onChange={(e) => setApr(Number(e.target.value))}
                                    className="h-12 font-bold rounded-xl text-slate-700 dark:text-slate-200 bg-sky-50 dark:bg-sky-950/20 border-sky-100 dark:border-sky-900 focus:ring-sky-500"
                                />
                            </div>
                        </div>


                        <Button 
                            onClick={handleCalculate}
                            className="w-full h-16 rounded-2xl bg-sky-600 hover:bg-sky-700 text-lg font-bold shadow-xl shadow-sky-500/20 text-white transition-all active:scale-[0.98]"
                        >
                            <Calculator className="w-5 h-5 mr-2" /> Calculate Finance
                        </Button>
                    </CardContent>
                </Card>

                {/* Results Section */}
                <div className="space-y-6">
                    {result ? (
                        <Card ref={calculatorRef} className={`rounded-[2.5rem] border-2 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 border-sky-500 bg-sky-50/50 dark:bg-sky-950/20`}>
                             <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl pointer-events-none bg-sky-500/10`}></div>
                            <CardContent className="p-10 relative z-10 text-center">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500 text-white text-[10px] font-black uppercase tracking-widest mb-6 border border-sky-400">
                                    <Car className="w-3 h-3" /> Monthly Instalment
                                </div>
                                
                                <h3 className="text-lg font-bold text-slate-600 dark:text-slate-400 mb-2 italic">You Pay</h3>
                                <div className="text-6xl md:text-7xl font-black text-sky-600 dark:text-sky-400 mb-2 tracking-tighter">
                                    £{result.monthlyPayment.toFixed(2)}
                                </div>
                                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-8 uppercase tracking-widest">Per month for {termMonths} months</p>

                                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-sky-100 dark:border-sky-900/40 p-6 mb-8 text-left space-y-4">
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2">The True Cost of Finance</h4>
                                    
                                     <div className="flex justify-between items-center text-sm py-1">
                                        <span className="font-medium text-slate-600 dark:text-slate-400">Total Deposit</span>
                                        <span className="font-bold text-slate-900 dark:text-slate-100">£{result.totalDeposit.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm py-1">
                                        <span className="font-medium text-slate-600 dark:text-slate-400">Total Interest (Cost of borrowing)</span>
                                        <span className="font-bold text-rose-600 dark:text-rose-400">+ £{result.totalInterest.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm py-1">
                                        <span className="font-medium text-slate-600 dark:text-slate-400">Optional Final Payment (Balloon)</span>
                                        <span className="font-bold text-slate-900 dark:text-slate-100">£{gmfv.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm py-1 border-t border-slate-100 dark:border-slate-800 pt-2">
                                        <span className="font-bold text-slate-600 dark:text-slate-400">Total Amount Payable</span>
                                        <div className="text-right">
                                            <span className="block font-black text-lg text-slate-900 dark:text-slate-100">£{result.totalAmountPayable.toFixed(2)}</span>
                                            <span className="block text-[10px] text-slate-400 uppercase">(If you keep the car)</span>
                                        </div>
                                    </div>
                                   
                                </div>

                                 <Button 
                                    onClick={exportPDF}
                                    disabled={isExporting}
                                    className="w-full h-14 rounded-xl bg-slate-900 dark:bg-white hover:bg-slate-800 text-white dark:text-slate-900 font-bold gap-2 disabled:opacity-50"
                                >
                                    {isExporting ? <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div> : <Download className="w-5 h-5" />}
                                    {isExporting ? "Generating PDF..." : "Save Quote PDF"}
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="h-full bg-slate-100/50 dark:bg-slate-900/30 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center p-12 min-h-[500px]">
                            <Car className="w-16 h-16 text-slate-300 mb-4" />
                            <h3 className="text-lg font-bold text-slate-400">Ready to Quote</h3>
                            <p className="text-sm text-slate-400 max-w-xs mt-2">Enter the vehicle price, your deposit, and the dealer's APR to see your true monthly cost.</p>
                        </div>
                    )}

                    <div className="bg-amber-50 dark:bg-amber-950/20 p-6 rounded-3xl border border-amber-100 dark:border-amber-900/30 flex gap-4">
                        <AlertTriangle className="w-8 h-8 text-amber-600 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-amber-900 dark:text-amber-400 text-sm">Beware of the Balloon</h4>
                            <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed max-w-sm mt-1">
                                Remember, with a PCP, you actually pay interest on the Guaranteed Minimum Future Value (the balloon) for the ENTIRE duration of the agreement, even though you aren't paying that chunk of capital down.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
