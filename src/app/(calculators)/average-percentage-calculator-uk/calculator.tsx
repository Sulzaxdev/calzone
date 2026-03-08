"use client";

import React, { useState, useRef } from "react";
import { Download, Percent, BarChart3, Plus, Trash2 } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function AveragePercentageCalculator() {
    const [percentages, setPercentages] = useState<{ id: string, value: string }[]>([
        { id: "1", value: "10" },
        { id: "2", value: "20" },
        { id: "3", value: "30" }
    ]);

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const addInput = () => {
        setPercentages([...percentages, { id: Math.random().toString(), value: "" }]);
    };

    const updateInput = (id: string, newValue: string) => {
        setPercentages(percentages.map(p => p.id === id ? { ...p, value: newValue } : p));
    };

    const removeInput = (id: string) => {
        if (percentages.length > 2) {
            setPercentages(percentages.filter(p => p.id !== id));
        }
    };

    const processResults = () => {
        const validNumbers = percentages
            .map(p => parseFloat(p.value))
            .filter(n => !isNaN(n));

        if (validNumbers.length === 0) return null;

        const sum = validNumbers.reduce((a, b) => a + b, 0);
        const average = sum / validNumbers.length;

        return {
            average: average.toFixed(2),
            count: validNumbers.length,
            sum: sum.toFixed(2)
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
            pdf.text("Average Percentage Report", 15, 15);
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 15, 22);
            pdf.addImage(imgData, "PNG", 15, 30, pdfWidth - 30, pdfHeight - 30);
            pdf.save("average-percentage-report.pdf");
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
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-center mb-8 relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-purple-500" />
                    Calculate Average
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

            <div className="flex flex-col md:flex-row gap-10 relative z-10 w-full">
                {/* Left side: Inputs */}
                <div className="w-full md:w-1/2 space-y-4">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Enter Percentages</label>
                    <div className="space-y-3 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
                        {percentages.map((p, index) => (
                            <div key={p.id} className="flex items-center gap-3">
                                <span className="text-slate-400 font-medium w-6 text-right">{index + 1}.</span>
                                <div className="relative flex-1">
                                    <input
                                        type="number"
                                        value={p.value}
                                        onChange={(e) => updateInput(p.id, e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 pr-10 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500/20"
                                        placeholder="e.g. 25"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                                </div>
                                <button
                                    onClick={() => removeInput(p.id)}
                                    disabled={percentages.length <= 2}
                                    className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-red-500 rounded-xl transition-colors disabled:opacity-30 disabled:hover:text-slate-400"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={addInput}
                        className="w-full mt-4 flex justify-center items-center gap-2 py-3 border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700/50 rounded-xl text-slate-500 dark:text-slate-400 font-semibold transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Add Another Percentage
                    </button>
                </div>

                {/* Right side: Results */}
                <div className="w-full md:w-1/2">
                    {results && (
                        <div className="bg-slate-50 dark:bg-slate-900/50 h-full rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 flex flex-col justify-center">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-8 text-center flex items-center justify-center gap-2">
                                <Percent className="w-4 h-4" /> Mean Average Result
                            </h3>

                            <div className="text-center bg-purple-50 dark:bg-purple-900/20 py-10 px-4 rounded-2xl border border-purple-100 dark:border-purple-900/40">
                                <span className="text-5xl md:text-6xl font-black text-purple-600 dark:text-purple-400">
                                    {results.average}%
                                </span>
                                <span className="block mt-4 text-sm font-semibold text-purple-800/80 dark:text-purple-300/80">
                                    Based on {results.count} valid inputs.
                                </span>
                                <span className="block mt-1 text-xs text-slate-500 dark:text-slate-500">
                                    (Sum: {results.sum}% divided by {results.count})
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
