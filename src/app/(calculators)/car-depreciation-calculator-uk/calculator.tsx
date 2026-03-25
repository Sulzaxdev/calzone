"use client";

import React, { useState, useRef } from "react";
import { Download, CarFront, TrendingDown, PoundSterling } from "lucide-react";

import jsPDF from "jspdf";

export function CarDepreciationCalculator() {
    const [purchasePrice, setPurchasePrice] = useState<string>("25000");
    const [depreciationRate, setDepreciationRate] = useState<string>("15"); // %
    const [yearsToKeep, setYearsToKeep] = useState<string>("5");

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const processResults = () => {
        const price = parseFloat(purchasePrice);
        const rate = parseFloat(depreciationRate);
        const years = parseInt(yearsToKeep);

        if (isNaN(price) || isNaN(rate) || isNaN(years) || years < 1 || years > 15) return null;

        let currentValue = price;
        const schedule = [];
        let totalLost = 0;

        for (let i = 1; i <= years; i++) {
            // New cars drop massively in year 1 (approx 20-30%). Subsequent years are around 15%.
            // For simplicity, we use the user-defined flat rate, but maybe add a heavier drop year 1 option later.
            // Let's use standard compound depreciation.

            const dropThisYear = currentValue * (rate / 100);
            currentValue = currentValue - dropThisYear;
            totalLost += dropThisYear;

            schedule.push({
                year: i,
                startValue: (currentValue + dropThisYear).toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                loss: dropThisYear.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                endValue: currentValue.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
            });
        }

        const percentageLost = ((totalLost / price) * 100).toFixed(1);

        return {
            finalValue: Math.round(currentValue).toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
            totalLost: Math.round(totalLost).toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
            percentageLost,
            schedule
        };
    };

    const results = processResults();

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
            pdf.text("Car Depreciation Report", 15, 20);
            
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
            pdf.save("car-depreciation-report.pdf");
        } catch (err) {
            console.error("Failed to export", err);
        } finally {
            if (exportButton) exportButton.style.opacity = '1';
            setIsExporting(false);
        }
    };

    return (
        <div
            ref={calculatorRef}
            className="bg-white dark:bg-slate-950 rounded-[2rem] p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 dark:border-slate-800 relative overflow-hidden"
        >
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-500/10 dark:bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-center mb-8 relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <TrendingDown className="w-6 h-6 text-red-500" />
                    Depreciation Calculator
                </h2>
                <button
                    onClick={exportPDF}
                    disabled={isExporting}
                    data-pdf-export-ignore
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
                >
                    {isExporting ? <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div> : <Download className="w-4 h-4" />}
                    Export
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Purchase Price (£)</label>
                    <div className="relative">
                        <PoundSterling className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-12 pr-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-red-500/20" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Years to Keep</label>
                    <input type="number" min="1" max="15" value={yearsToKeep} onChange={(e) => setYearsToKeep(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-red-500/20" />
                </div>

                <div className="md:col-span-3">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Annual Depreciation Rate</label>
                    <select value={depreciationRate} onChange={(e) => setDepreciationRate(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-red-500/20 cursor-pointer">
                        <option value="15">Average Standard Car (~15% per year)</option>
                        <option value="20">Luxury Car / EV (~20% per year higher drop)</option>
                        <option value="10">High Demand / Reliable (e.g. Toyota, Honda ~10%)</option>
                        <option value="30">Brand New Car (Year 1 massive drop ~30%)</option>
                    </select>
                </div>
            </div>

            {results && (
                <div className="mt-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
                            <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase mb-2 flex justify-center items-center gap-2">
                                <CarFront className="w-4 h-4" /> Estimated Value in {yearsToKeep} Years
                            </span>
                            <span className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white">£{results.finalValue}</span>
                        </div>

                        <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-100 dark:border-red-900/30 text-center">
                            <span className="text-red-600 dark:text-red-400 text-xs font-bold uppercase mb-2 flex justify-center items-center gap-2">
                                <TrendingDown className="w-4 h-4" /> Total Money Lost
                            </span>
                            <span className="text-4xl lg:text-5xl font-black text-red-600 dark:text-red-500">-£{results.totalLost}</span>
                            <span className="block mt-2 text-sm font-medium text-red-800/60 dark:text-red-300/60">
                                You lose {results.percentageLost}% of the car's initial purchase price.
                            </span>
                        </div>
                    </div>

                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
                        Year by Year Breakdown
                    </h3>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-800 text-xs uppercase text-slate-500">
                                    <th className="py-3 font-semibold">Year</th>
                                    <th className="py-3 font-semibold">Start Value</th>
                                    <th className="py-3 font-semibold text-red-500">Value Lost</th>
                                    <th className="py-3 font-semibold text-right">End Value</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {results.schedule.map((row) => (
                                    <tr key={row.year} className="border-b border-slate-100 dark:border-slate-800/50 last:border-0">
                                        <td className="py-3 font-bold text-slate-800 dark:text-slate-200">Year {row.year}</td>
                                        <td className="py-3 text-slate-600 dark:text-slate-400">£{row.startValue}</td>
                                        <td className="py-3 text-red-600 dark:text-red-400 font-medium">-£{row.loss}</td>
                                        <td className="py-3 text-right font-bold text-slate-900 dark:text-white">£{row.endValue}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
