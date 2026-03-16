
"use client";

import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { calculateUnfairDismissal } from "@/lib/unfair-dismissal-logic";
import { Scale, Gavel, PoundSterling, Download, AlertCircle, CalendarClock, Briefcase } from "lucide-react";

export function UnfairDismissalCalculatorForm() {
    const [ageAtDismissal, setAgeAtDismissal] = useState<number>(45);
    const [yearsOfService, setYearsOfService] = useState<number>(10);
    const [grossWeeklyPay, setGrossWeeklyPay] = useState<number>(800);
    const [result, setResult] = useState<any>(null);
    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const handleCalculate = () => {
        const res = calculateUnfairDismissal(ageAtDismissal, yearsOfService, grossWeeklyPay);
        setResult(res);
    };

    const exportPDF = async () => {
        const currentRef = calculatorRef.current;
        if (!currentRef) return;
        setIsExporting(true);

        const ignoreElements = currentRef.querySelectorAll('[data-pdf-export-ignore]');
        ignoreElements.forEach(el => {
            if (el instanceof HTMLElement) el.style.opacity = '0';
        });

        try {
            await new Promise((resolve) => setTimeout(resolve, 150));
            const canvas = await html2canvas(currentRef, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
                windowWidth: currentRef.scrollWidth,
                windowHeight: currentRef.scrollHeight,
            });
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            
            // Professional Header
            pdf.setFontSize(22);
            pdf.setTextColor(15, 23, 42);
            pdf.text("Unfair Dismissal Basic Award Report", 15, 20);
            
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()} | CalZone.uk`, 15, 28);
            
            pdf.setDrawColor(226, 232, 240);
            pdf.line(15, 32, pdfWidth - 15, 32);

            pdf.addImage(imgData, "PNG", 15, 40, pdfWidth - 30, (canvas.height * (pdfWidth - 30)) / canvas.width);
            pdf.save("unfair-dismissal-report.pdf");
        } catch (error) {
            console.error("Failed to generate PDF", error);
        } finally {
            ignoreElements.forEach(el => {
                if (el instanceof HTMLElement) el.style.opacity = '1';
            });
            setIsExporting(false);
        }
    };

    return (
        <section className="container mx-auto px-4 pt-10">
            <div className="grid lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
                {/* Input Card */}
                <Card ref={calculatorRef} className="rounded-[2rem] border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden bg-white dark:bg-slate-900 border relative">
                    <CardHeader className="bg-slate-50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-800 p-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                                <Gavel className="w-6 h-6" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100 uppercase">Employment Details</CardTitle>
                                <CardDescription>Enter details as of your final day of work</CardDescription>
                            </div>
                        </div>
                        <Button
                            onClick={exportPDF}
                            disabled={isExporting || !result || !result.success}
                            data-pdf-export-ignore
                            className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl px-4 h-10 transition-all"
                        >
                            {isExporting ? <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div> : <Download className="w-4 h-4 mr-2" />}
                            {isExporting ? "" : "Export PDF"}
                        </Button>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                        <div className="space-y-3">
                            <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Age at Dismissal</Label>
                            <Input 
                                type="number" 
                                value={ageAtDismissal} 
                                onChange={(e) => setAgeAtDismissal(Number(e.target.value))}
                                className="h-14 font-bold rounded-2xl text-xl text-slate-700 dark:text-slate-200"
                            />
                        </div>

                        <div className="space-y-3">
                            <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Full Years of Continuous Service</Label>
                            <p className="text-xs text-slate-500 font-medium pb-2">Must be at least 2 years in most cases.</p>
                            <Input 
                                type="number" 
                                value={yearsOfService} 
                                onChange={(e) => setYearsOfService(Number(e.target.value))}
                                className="h-14 font-bold rounded-2xl text-xl text-slate-700 dark:text-slate-200"
                            />
                        </div>

                        <div className="space-y-3">
                            <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Gross Weekly Pay (£)</Label>
                            <p className="text-xs text-slate-500 font-medium pb-2">Your pay before tax and national insurance.</p>
                            <Input 
                                type="number" 
                                value={grossWeeklyPay} 
                                onChange={(e) => setGrossWeeklyPay(Number(e.target.value))}
                                className="h-14 font-bold rounded-2xl text-xl text-slate-700 dark:text-slate-200"
                            />
                        </div>

                        <Button 
                            onClick={handleCalculate}
                            data-pdf-export-ignore
                            className="w-full h-16 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-lg font-bold shadow-xl shadow-indigo-500/20 text-white transition-all active:scale-[0.98]"
                        >
                            <Scale className="w-5 h-5 mr-2" /> Calculate Basic Award
                        </Button>
                    </CardContent>
                </Card>

                {/* Results Section */}
                <div className="space-y-6">
                    {result ? (
                        <Card className={`rounded-[2.5rem] border-2 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 ${result.success ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20' : 'border-red-500 bg-red-50 dark:bg-red-950/20'}`}>
                             <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl pointer-events-none ${result.success ? 'bg-indigo-500/10' : 'bg-red-500/10'}`}></div>
                            <CardContent className="p-10 relative z-10 text-center">
                                {result.success ? (
                                    <>
                                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest mb-6 border border-indigo-400">
                                            <CalendarClock className="w-3 h-3" /> Basic Award Estimate
                                        </div>
                                        
                                        <h3 className="text-lg font-bold text-slate-600 dark:text-slate-400 mb-2 italic">Minimum Statutory Payout</h3>
                                        <div className="text-6xl md:text-7xl font-black text-indigo-600 dark:text-indigo-400 mb-8 tracking-tighter">
                                            £{result.basicAward.toLocaleString()}
                                        </div>

                                        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-indigo-100 dark:border-indigo-900/40 p-6 mb-8 text-left space-y-4">
                                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2">Calculation Breakdown</h4>
                                            
                                            <div className="flex justify-between items-center text-sm py-1">
                                                <span className="font-medium text-slate-600 dark:text-slate-400">Years Counted (Max 20)</span>
                                                <span className="font-bold text-slate-900 dark:text-slate-100">{result.yearsCounted} </span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm text-slate-600 dark:text-slate-400 py-1">
                                                <span className="font-medium flex items-center gap-2">Weekly Pay (Capped)</span>
                                                <span className="font-bold">£{result.weeklyPayCapped}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm text-slate-600 dark:text-slate-400 py-1">
                                                <span className="font-medium flex items-center gap-2">Total Age Multiplier</span>
                                                <span className="font-bold">x {result.ageMultiplierTotal}</span>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="p-6">
                                        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-red-900 dark:text-red-400 mb-2">Claim Ineligible</h3>
                                        <p className="text-red-700 dark:text-red-300 font-medium">{result.errorMsg}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="h-full bg-slate-100/50 dark:bg-slate-900/30 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center p-12 min-h-[500px]">
                            <Briefcase className="w-16 h-16 text-slate-300 mb-4" />
                            <h3 className="text-lg font-bold text-slate-400">Awaiting Details</h3>
                            <p className="text-sm text-slate-400 max-w-xs mt-2">Enter your age, length of service, and weekly pay to estimate your unfair dismissal basic award payout.</p>
                        </div>
                    )}

                    <div className="bg-rose-50 dark:bg-rose-950/20 p-6 rounded-3xl border border-rose-100 dark:border-rose-900/30 flex gap-4">
                        <AlertCircle className="w-8 h-8 text-rose-600 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-rose-900 dark:text-rose-400 text-sm">Compensatory Award Not Included</h4>
                            <p className="text-xs text-rose-800 dark:text-rose-400 leading-relaxed max-w-sm mt-1">
                                This only calculates the "Basic Award" which is similar to redundancy pay. It does NOT include the "Compensatory Award" which covers your actual loss of earnings (capped at your annual salary or £115,115).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

