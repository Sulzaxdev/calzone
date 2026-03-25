"use client";

import React, { useState, useRef } from "react";
import { Download, Percent, ArrowRight } from "lucide-react";

import jsPDF from "jspdf";

export function PercentageCalculatorClient() {
    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    // Type 1: What is X% of Y?
    const [calc1X, setCalc1X] = useState("20");
    const [calc1Y, setCalc1Y] = useState("150");
    const calc1Result = (parseFloat(calc1X) / 100) * parseFloat(calc1Y);

    // Type 2: X is what percent of Y?
    const [calc2X, setCalc2X] = useState("30");
    const [calc2Y, setCalc2Y] = useState("150");
    const calc2Result = (parseFloat(calc2X) / parseFloat(calc2Y)) * 100;

    // Type 3: Percentage Change from X to Y
    const [calc3X, setCalc3X] = useState("100");
    const [calc3Y, setCalc3X_Y] = useState("120");
    const calc3Diff = parseFloat(calc3Y) - parseFloat(calc3X);
    const calc3Result = (calc3Diff / parseFloat(calc3X)) * 100;

    const exportPDF = async () => {
        if (!calculatorRef.current) return;
        setIsExporting(true);

        const exportButton = calculatorRef.current.querySelector('button');
        if (exportButton) exportButton.style.opacity = '0';

        try {
            const { toPng } = await import('html-to-image');
            await new Promise((resolve) => setTimeout(resolve, 150));
            const imgData = await toPng(calculatorRef.current, {
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
            pdf.text("Percentage Calculation Report", 15, 20);
            
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()} | CalZone.uk`, 15, 28);
            
            pdf.setDrawColor(226, 232, 240);
            pdf.line(15, 32, pdfWidth - 15, 32);

            const img = new Image();
            img.src = imgData;
            await new Promise((resolve) => img.onload = resolve);
            const imgHeight = (img.height * (pdfWidth - 30)) / img.width;

            pdf.addImage(imgData, "PNG", 15, 40, pdfWidth - 30, imgHeight);
            pdf.save("percentage-calculation-report.pdf");
        } catch (err) {
            console.error("Failed to export", err);
        } finally {
            if (exportButton) exportButton.style.opacity = '1';
            setIsExporting(false);
        }
    };
 streams:

    return (
        <div className="lg:col-span-12">
            <div
                ref={calculatorRef}
                className="bg-white dark:bg-slate-950 rounded-[2rem] p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 dark:border-slate-800 relative overflow-hidden"
            >
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex justify-between items-center mb-10 relative z-10">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Calculations
                    </h2>
                    <button
                        onClick={exportPDF}
                        disabled={isExporting}
                        data-pdf-export-ignore
                        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
                    >
                        {isExporting ? (
                            <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent shrink-0 rounded-full animate-spin"></div>
                        ) : (
                            <Download className="w-4 h-4" />
                        )}
                        Export PDF
                    </button>
                </div>

                <div className="space-y-10 relative z-10">

                    {/* Type 1 */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-4">What is <span className="text-blue-500">X%</span> of <span className="text-blue-500">Y</span>?</h3>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="relative w-full sm:w-32">
                                <input
                                    type="number"
                                    value={calc1X}
                                    onChange={(e) => setCalc1X(e.target.value)}
                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                            </div>
                            <span className="text-slate-400 font-bold shrink-0">of</span>
                            <div className="w-full sm:w-32">
                                <input
                                    type="number"
                                    value={calc1Y}
                                    onChange={(e) => setCalc1Y(e.target.value)}
                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>
                            <ArrowRight className="w-5 h-5 text-slate-300 hidden sm:block shrink-0 mx-2" />
                            <div className="w-full sm:flex-1 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl py-3 px-4 text-center">
                                <span className="font-black text-blue-600 dark:text-blue-400 text-xl">
                                    {!isNaN(calc1Result) ? calc1Result.toLocaleString("en-GB", { maximumFractionDigits: 4 }) : "0"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Type 2 */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-4"><span className="text-blue-500">X</span> is what percent of <span className="text-blue-500">Y</span>?</h3>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="w-full sm:w-32">
                                <input
                                    type="number"
                                    value={calc2X}
                                    onChange={(e) => setCalc2X(e.target.value)}
                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>
                            <span className="text-slate-400 font-bold shrink-0">is</span>
                            <div className="w-full sm:w-32">
                                <input
                                    type="number"
                                    value={calc2Y}
                                    onChange={(e) => setCalc2Y(e.target.value)}
                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>
                            <ArrowRight className="w-5 h-5 text-slate-300 hidden sm:block shrink-0 mx-2" />
                            <div className="w-full sm:flex-1 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl py-3 px-4 text-center">
                                <span className="font-black text-blue-600 dark:text-blue-400 text-xl">
                                    {!isNaN(calc2Result) ? calc2Result.toLocaleString("en-GB", { maximumFractionDigits: 4 }) + "%" : "0%"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Type 3 */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-4">Percentage change from <span className="text-blue-500">X</span> to <span className="text-blue-500">Y</span></h3>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="w-full sm:w-32">
                                <input
                                    type="number"
                                    value={calc3X}
                                    onChange={(e) => setCalc3X(e.target.value)}
                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>
                            <span className="text-slate-400 font-bold shrink-0">to</span>
                            <div className="w-full sm:w-32">
                                <input
                                    type="number"
                                    value={calc3Y}
                                    onChange={(e) => setCalc3X_Y(e.target.value)}
                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>
                            <ArrowRight className="w-5 h-5 text-slate-300 hidden sm:block shrink-0 mx-2" />
                            <div className="w-full sm:flex-1 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl py-3 px-4 text-center">
                                <span className={`font-black text-xl ${isNaN(calc3Result) ? "text-slate-400" : calc3Result > 0 ? "text-green-600 dark:text-green-400" : calc3Result < 0 ? "text-rose-600 dark:text-rose-400" : "text-blue-600 dark:text-blue-400"}`}>
                                    {!isNaN(calc3Result) && calc3Result > 0 ? "+" : ""}
                                    {!isNaN(calc3Result) ? calc3Result.toLocaleString("en-GB", { maximumFractionDigits: 4 }) + "%" : "0%"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
