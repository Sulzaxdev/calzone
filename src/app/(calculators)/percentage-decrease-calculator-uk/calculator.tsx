"use client";

import React, { useState, useRef } from "react";
import { Download, TrendingDown, ArrowDownRight, Activity } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function PercentageDecreaseCalculator() {
    const [startValue, setStartValue] = useState<string>("150");
    const [endValue, setEndValue] = useState<string>("120");

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const processResults = () => {
        const start = parseFloat(startValue);
        const end = parseFloat(endValue);

        if (isNaN(start) || isNaN(end) || start === 0) return null;

        const difference = start - end;
        const percentageDecrease = (difference / start) * 100;

        let type = "Decrease";
        let finalPercentage = percentageDecrease;

        if (percentageDecrease < 0) {
            type = "Increase";
            finalPercentage = Math.abs(percentageDecrease);
        }

        return {
            startNum: start.toLocaleString(),
            endNum: end.toLocaleString(),
            difference: Math.abs(difference).toLocaleString(),
            percentage: finalPercentage.toFixed(2),
            type
        };
    };

    const results = processResults();

    const exportPDF = async () => {
        if (!calculatorRef.current) return;
        setIsExporting(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 100));
            const canvas = await html2canvas(calculatorRef.current, { scale: 2, backgroundColor: "#ffffff" });
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.setFontSize(20);
            pdf.text("Percentage Decrease Report", 15, 15);
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 15, 22);
            pdf.addImage(imgData, "PNG", 15, 30, pdfWidth - 30, pdfHeight - 30);
            pdf.save("percentage-decrease-report.pdf");
        } catch (error) {
            console.error("Failed to generate PDF", error);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div
            ref={calculatorRef}
            className="bg-white dark:bg-slate-950 rounded-[2rem] p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 dark:border-slate-800 relative overflow-hidden"
        >
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-red-500/10 dark:bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-center mb-8 relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <TrendingDown className="w-6 h-6 text-red-500" />
                    Calculate Decrease
                </h2>
                <button
                    onClick={exportPDF}
                    disabled={isExporting}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
                >
                    {isExporting ? <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div> : <Download className="w-4 h-4" />}
                    Export
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Original Target / Start Value</label>
                    <input
                        type="number"
                        value={startValue}
                        onChange={(e) => setStartValue(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-red-500/20"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">New Target / End Value</label>
                    <input
                        type="number"
                        value={endValue}
                        onChange={(e) => setEndValue(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-red-500/20"
                    />
                </div>
            </div>

            {results && (
                <div className="mt-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 relative z-10">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                        <Activity className="w-4 h-4" /> Result summary
                    </h3>

                    <div className={`p-8 rounded-2xl border ${results.type === "Decrease" ? "bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900/40" : "bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900/40"}`}>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="text-center">
                                <span className={`block text-sm font-bold mb-1 ${results.type === "Decrease" ? "text-red-800 dark:text-red-300" : "text-green-800 dark:text-green-300"}`}>
                                    Percentage {results.type}
                                </span>
                                <span className={`text-5xl font-black ${results.type === "Decrease" ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>
                                    {results.type === "Decrease" ? "-" : "+"}{results.percentage}%
                                </span>
                            </div>

                            <div className="hidden md:block h-16 w-px bg-slate-200 dark:bg-slate-700"></div>

                            <div className="text-center md:text-left">
                                <span className={`block text-sm font-bold mb-1 ${results.type === "Decrease" ? "text-red-800 dark:text-red-300" : "text-green-800 dark:text-green-300"}`}>
                                    Absolute Difference
                                </span>
                                <span className="text-3xl font-black text-slate-900 dark:text-white">
                                    {results.difference}
                                </span>
                                <span className="block mt-1 text-sm text-slate-500">
                                    (from {results.startNum} to {results.endNum})
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
