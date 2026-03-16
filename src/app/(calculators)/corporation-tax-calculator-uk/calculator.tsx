
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { calculateCorporationTax } from "@/lib/corporation-tax-logic";
import { Building2, Receipt, PoundSterling, Download, AlertCircle, Percent } from "lucide-react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function CorporationTaxCalculatorForm() {
    const [grossProfit, setGrossProfit] = useState<number>(120000);
    const [allowableExpenses, setAllowableExpenses] = useState<number>(35000);
    const [result, setResult] = useState<any>(null);
    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = React.useRef<HTMLDivElement>(null);

    const exportPDF = async () => {
        if (!calculatorRef.current) return;
        setIsExporting(true);

        const exportButton = calculatorRef.current.parentNode?.querySelector('button[onClick*="exportPDF"]');
        if (exportButton instanceof HTMLElement) exportButton.style.opacity = '0';

        try {
            await new Promise((resolve) => setTimeout(resolve, 150));
            const canvas = await html2canvas(calculatorRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#fffbeb", // amber-50ish
                windowWidth: calculatorRef.current.scrollWidth,
                windowHeight: calculatorRef.current.scrollHeight,
            });
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            
            pdf.setFontSize(22);
            pdf.setTextColor(15, 23, 42);
            pdf.text("Corporation Tax Calculation Report", 15, 20);
            
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 15, 28);
            
            pdf.setDrawColor(226, 232, 240);
            pdf.line(15, 32, pdfWidth - 15, 32);

            pdf.addImage(imgData, "PNG", 15, 40, pdfWidth - 30, (canvas.height * (pdfWidth - 30)) / canvas.width);
            pdf.save("Corporation-Tax-Report.pdf");
        } catch (error) {
            console.error("Failed to export", error);
        } finally {
            if (exportButton instanceof HTMLElement) exportButton.style.opacity = '1';
            setIsExporting(false);
        }
    };

    const handleCalculate = () => {
        const res = calculateCorporationTax(grossProfit, allowableExpenses);
        setResult(res);
    };

    return (
        <section className="container mx-auto px-4 pt-10">
            <div className="grid lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
                {/* Input Card */}
                <Card className="rounded-[2rem] border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden bg-white dark:bg-slate-900 border">
                    <CardHeader className="bg-slate-50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-800 p-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                                <Building2 className="w-6 h-6" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100 uppercase">Company Accounts</CardTitle>
                                <CardDescription>Enter gross profits and business expenses</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                        <div className="space-y-3">
                            <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Gross Trading Profit (£)</Label>
                            <p className="text-xs text-slate-500 font-medium">Your total income before any expenses are deducted.</p>
                            <Input 
                                type="number" 
                                value={grossProfit} 
                                onChange={(e) => setGrossProfit(Number(e.target.value))}
                                className="h-16 font-black rounded-2xl text-2xl text-amber-700 dark:text-amber-400 placeholder:text-slate-300"
                            />
                        </div>

                        <div className="space-y-3">
                            <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Allowable Expenses (£)</Label>
                            <p className="text-xs text-slate-500 font-medium">Staff salaries, office costs, legal fees, and specific tax deductions.</p>
                            <Input 
                                type="number" 
                                value={allowableExpenses} 
                                onChange={(e) => setAllowableExpenses(Number(e.target.value))}
                                className="h-16 font-black rounded-2xl text-2xl text-slate-700 dark:text-slate-400 placeholder:text-slate-300"
                            />
                        </div>

                        <Button 
                            onClick={handleCalculate}
                            className="w-full h-16 rounded-2xl bg-amber-500 hover:bg-amber-600 text-lg font-bold shadow-xl shadow-amber-500/20 text-white transition-all active:scale-[0.98]"
                        >
                            <Receipt className="w-5 h-5 mr-2" /> Calculate Corp Tax
                        </Button>
                    </CardContent>
                </Card>

                {/* Results Section */}
                <div className="space-y-6">
                    {result ? (
                        <Card 
                            ref={calculatorRef}
                            className="rounded-[2.5rem] border-2 border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500"
                        >
                             <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
                            <CardContent className="p-10 relative z-10 text-center">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest mb-6 border border-amber-400">
                                    <Percent className="w-3 h-3" /> Effective Tax Rate: {result.effectiveRate.toFixed(1)}%
                                </div>
                                
                                <h3 className="text-lg font-bold text-slate-600 dark:text-slate-400 mb-2 italic">Final Tax Due to HMRC</h3>
                                <div className="text-6xl md:text-7xl font-black text-amber-600 dark:text-amber-400 mb-8 tracking-tighter">
                                    £{result.finalTaxDue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                </div>

                                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-amber-100 dark:border-amber-900/40 p-6 mb-8 text-left space-y-4">
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2">Calculation Breakdown</h4>
                                    
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-medium text-slate-600 dark:text-slate-400">Taxable Profit</span>
                                        <span className="font-bold text-slate-900 dark:text-100">£{result.taxableProfit.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm text-slate-600 dark:text-slate-400 py-1">
                                        <span className="font-medium flex items-center gap-2">Tax Band Applied</span>
                                        <span className="font-bold">{result.taxBand}</span>
                                    </div>
                                    
                                    {result.marginalRelief > 0 && (
                                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-sm">
                                            <span className="font-bold text-emerald-600 dark:text-emerald-400">Marginal Relief Deducted (-)</span>
                                            <span className="font-black text-emerald-600 dark:text-emerald-400">£{Math.floor(result.marginalRelief).toLocaleString()}</span>
                                        </div>
                                    )}

                                </div>

                                <Button 
                                    onClick={exportPDF} 
                                    disabled={isExporting}
                                    className="w-full h-14 rounded-xl bg-slate-900 dark:bg-white hover:bg-slate-800 text-white dark:text-slate-900 font-bold gap-2"
                                >
                                    {isExporting ? (
                                        <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent shrink-0 rounded-full animate-spin"></div>
                                    ) : (
                                        <Download className="w-5 h-5" />
                                    )}
                                    Export PDF Report
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="h-full bg-slate-100/50 dark:bg-slate-900/30 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center p-12 min-h-[500px]">
                            <Receipt className="w-16 h-16 text-slate-300 mb-4" />
                            <h3 className="text-lg font-bold text-slate-400">Awaiting Finance Data</h3>
                            <p className="text-sm text-slate-400 max-w-xs mt-2">Enter your company's gross profit and allowable expenses to view your tax bill and marginal relief.</p>
                        </div>
                    )}

                    <div className="bg-sky-50 dark:bg-sky-950/20 p-6 rounded-3xl border border-sky-100 dark:border-sky-900/30 flex gap-4">
                        <AlertCircle className="w-8 h-8 text-sky-600 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-sky-900 dark:text-sky-400 text-sm">Deadlines to Remember</h4>
                            <p className="text-xs text-sky-800 dark:text-sky-400 leading-relaxed max-w-sm mt-1">
                                You must usually pay your Corporation Tax bill exactly 9 months and 1 day after your accounting period ends.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

