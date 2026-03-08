"use client";

import React, { useState, useRef } from "react";
import { Download, Percent, Tag, ShoppingBag } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function PercentageOffCalculator() {
    const [originalPrice, setOriginalPrice] = useState<string>("150");
    const [discount, setDiscount] = useState<string>("20");

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const processResults = () => {
        const price = parseFloat(originalPrice);
        const percent = parseFloat(discount);

        if (isNaN(price) || isNaN(percent)) return null;

        const amountSaved = price * (percent / 100);
        const finalPrice = price - amountSaved;

        return {
            originalFormatted: price.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }),
            savedFormatted: amountSaved.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }),
            finalFormatted: finalPrice.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }),
            percentString: `${percent}%`
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
            pdf.text("Percentage Off Calculator", 15, 15);
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 15, 22);
            pdf.addImage(imgData, "PNG", 15, 30, pdfWidth - 30, pdfHeight - 30);
            pdf.save("percentage-off-report.pdf");
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
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-500/10 dark:bg-green-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-center mb-8 relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <Tag className="w-6 h-6 text-green-500" />
                    Calculate Discount
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
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Original Price / Amount</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">£</span>
                        <input
                            type="number"
                            value={originalPrice}
                            onChange={(e) => setOriginalPrice(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-10 pr-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-green-500/20"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Percentage Off</label>
                    <div className="relative">
                        <input
                            type="number"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 pr-10 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-green-500/20"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                    </div>
                </div>
            </div>

            {results && (
                <div className="mt-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 relative z-10">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4" /> Result summary
                    </h3>

                    <div className="flex flex-col md:flex-row gap-6 items-center w-full">
                        <div className="flex-1 bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 w-full md:w-auto">
                            <span className="block text-sm text-slate-500 mb-1">Amount Saved</span>
                            <span className="text-3xl font-black text-slate-900 dark:text-white">{results.savedFormatted}</span>
                            <span className="block mt-2 text-sm text-slate-400">({results.percentString} taken off)</span>
                        </div>
                        <div className="text-slate-300 dark:text-slate-700 font-bold text-2xl hidden md:block">
                            =
                        </div>
                        <div className="flex-1 bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl border border-green-100 dark:border-green-900/40 w-full md:w-auto">
                            <span className="block text-sm text-green-800 dark:text-green-300 font-bold mb-1">Final Payment Price</span>
                            <span className="text-4xl font-black text-green-600 dark:text-green-400 w-full break-words">{results.finalFormatted}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
