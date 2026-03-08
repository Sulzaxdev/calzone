"use client";

import React, { useState, useRef } from "react";
import { Download, Undo2, ArrowLeftRight } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function ReversePercentageCalculator() {
    const [finalValue, setFinalValue] = useState<string>("120");
    const [percentage, setPercentage] = useState<string>("20");
    const [operationType, setOperationType] = useState<"Added" | "Subtracted">("Added");

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const processResults = () => {
        const fValue = parseFloat(finalValue);
        const pct = parseFloat(percentage);

        if (isNaN(fValue) || isNaN(pct) || pct < 0) return null;

        let originalPrice = 0;
        let diff = 0;

        if (operationType === "Added") {
            // E.g. Find price before 20% VAT was added
            // 120 = Original * 1.20 --> Original = 120 / 1.20
            originalPrice = fValue / (1 + (pct / 100));
            diff = fValue - originalPrice;
        } else {
            // E.g. Find price before a 20% discount was taken off
            // 80 = Original * 0.80 --> Original = 80 / 0.80
            if (pct >= 100) return null; // Cannot reverse a 100%+ subtraction logically
            originalPrice = fValue / (1 - (pct / 100));
            diff = originalPrice - fValue;
        }

        return {
            originalFormatted: originalPrice.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            diffFormatted: diff.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            finalFormatted: fValue.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            pctString: `${pct}%`
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
            pdf.text("Reverse Percentage Report", 15, 15);
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 15, 22);
            pdf.addImage(imgData, "PNG", 15, 30, pdfWidth - 30, pdfHeight - 30);
            pdf.save("reverse-percentage-report.pdf");
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
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-yellow-500/10 dark:bg-yellow-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-center mb-8 relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <Undo2 className="w-6 h-6 text-yellow-500" />
                    Find Original Value
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Final Value (After change)</label>
                    <input
                        type="number"
                        value={finalValue}
                        onChange={(e) => setFinalValue(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/20"
                    />
                </div>

                <div className="md:col-span-1">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">The Percentage (%)</label>
                    <div className="relative">
                        <input
                            type="number"
                            value={percentage}
                            onChange={(e) => setPercentage(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 pr-10 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/20"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                    </div>
                </div>

                <div className="md:col-span-3">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Was this percentage Originally...</label>
                    <div className="grid grid-cols-2 gap-4">
                        <label className={`cursor-pointer rounded-xl border-2 p-4 text-center font-bold transition-all ${operationType === "Added" ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900"}`}>
                            <input
                                type="radio"
                                name="opType"
                                value="Added"
                                checked={operationType === "Added"}
                                onChange={() => setOperationType("Added")}
                                className="hidden"
                            />
                            Added (e.g., VAT applied)
                        </label>
                        <label className={`cursor-pointer rounded-xl border-2 p-4 text-center font-bold transition-all ${operationType === "Subtracted" ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900"}`}>
                            <input
                                type="radio"
                                name="opType"
                                value="Subtracted"
                                checked={operationType === "Subtracted"}
                                onChange={() => setOperationType("Subtracted")}
                                className="hidden"
                            />
                            Subtracted (e.g., Discount)
                        </label>
                    </div>
                </div>
            </div>

            {results && (
                <div className="mt-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 relative z-10">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                        <ArrowLeftRight className="w-4 h-4" /> Original Value
                    </h3>

                    <div className="flex flex-col items-center">
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 py-8 px-12 md:px-20 rounded-2xl border border-yellow-100 dark:border-yellow-900/40 text-center w-full">
                            <span className="block text-sm font-bold mb-2 text-yellow-800 dark:text-yellow-300">
                                Before the {results.pctString} was {operationType.toLowerCase()}, the value was:
                            </span>
                            <span className="text-5xl md:text-6xl font-black text-yellow-600 dark:text-yellow-400 w-full break-words">
                                {results.originalFormatted}
                            </span>
                        </div>

                        <div className="mt-6 flex gap-8 text-center text-sm md:text-base text-slate-600 dark:text-slate-400">
                            <div>
                                <span className="block font-bold text-slate-700 dark:text-slate-300">Difference:</span>
                                {results.diffFormatted}
                            </div>
                            <div className="w-px bg-slate-200 dark:bg-slate-800"></div>
                            <div>
                                <span className="block font-bold text-slate-700 dark:text-slate-300">Final Value:</span>
                                {results.finalFormatted}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Logic fallback */}
            {percentage && parseFloat(percentage) >= 100 && operationType === "Subtracted" && (
                <div className="mt-4 p-4 text-center rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-bold">
                    Mathematically impossible to reverse a 100%+ subtraction. The original number would have been wiped out entirely or negative.
                </div>
            )}
        </div>
    );
}
