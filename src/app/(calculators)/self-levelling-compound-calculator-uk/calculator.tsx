"use client";

import React, { useState, useRef } from "react";
import { Download, Ruler, HardHat, Package } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function SelfLevellingCompoundCalculator() {
    const [length, setLength] = useState<string>("5");
    const [width, setWidth] = useState<string>("4");
    const [depth, setDepth] = useState<string>("3"); // in mm

    // Most 20kg bags cover ~5m2 at 3mm depth. 
    // Which means 1 bag = 15 litres or 0.015 cubic meters.
    // So usually you need about 1.5kg of compound per 1mm thickness per 1 square metre.
    const [coverageRatio, setCoverageRatio] = useState<string>("1.5"); // kg per mm per m2
    const [bagSize, setBagSize] = useState<string>("20");
    const [bagPrice, setBagPrice] = useState<string>("15.50");

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const processResults = () => {
        const l = parseFloat(length);
        const w = parseFloat(width);
        const d = parseFloat(depth);
        const cover = parseFloat(coverageRatio);
        const bs = parseFloat(bagSize);
        const bp = parseFloat(bagPrice);

        if (isNaN(l) || isNaN(w) || isNaN(d) || isNaN(cover) || isNaN(bs) || isNaN(bp)) return null;
        if (bs <= 0) return null;

        const area = l * w; // m2
        const totalKgRequired = area * d * cover;

        // You can't buy half a bag
        const bagsNeeded = Math.ceil(totalKgRequired / bs);

        const totalCost = bagsNeeded * bp;

        return {
            area: area.toFixed(2),
            totalKg: Math.round(totalKgRequired).toString(),
            bags: bagsNeeded.toString(),
            cost: totalCost.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        };
    };

    const results = processResults();

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
                backgroundColor: "#ffffff",
                windowWidth: calculatorRef.current.scrollWidth,
                windowHeight: calculatorRef.current.scrollHeight,
            });
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            
            pdf.setFontSize(22);
            pdf.setTextColor(15, 23, 42);
            pdf.text("Floor Levelling Report", 15, 20);
            
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 15, 28);
            
            pdf.setDrawColor(226, 232, 240);
            pdf.line(15, 32, pdfWidth - 15, 32);

            pdf.addImage(imgData, "PNG", 15, 40, pdfWidth - 30, (canvas.height * (pdfWidth - 30)) / canvas.width);
            pdf.save("self-levelling-compound-report.pdf");
        } catch (error) {
            console.error("Failed to generate PDF", error);
        } finally {
            if (exportButton instanceof HTMLElement) exportButton.style.opacity = '1';
            setIsExporting(false);
        }
    };

    return (
        <div
            ref={calculatorRef}
            className="bg-white dark:bg-slate-950 rounded-[2rem] p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 dark:border-slate-800 relative overflow-hidden"
        >
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-stone-500/10 dark:bg-stone-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-center mb-8 relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <Ruler className="w-6 h-6 text-stone-500" />
                    Compound Estimator
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 border-b border-slate-200 dark:border-slate-800 pb-8 mb-8">
                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Room Length (metres)</label>
                    <input type="number" step="0.1" value={length} onChange={(e) => setLength(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-stone-500/20" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Room Width (metres)</label>
                    <input type="number" step="0.1" value={width} onChange={(e) => setWidth(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-stone-500/20" />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Average Depth Required (mm)</label>
                    <div className="relative">
                        <input type="number" step="1" value={depth} onChange={(e) => setDepth(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 pr-12 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-stone-500/20" />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">mm</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Always round up. If your floor slopes from 2mm to 8mm, use 5mm average.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                <div className="md:col-span-3">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-2">
                        <HardHat className="w-4 h-4 text-stone-500" /> Optional: Adjust Product Settings
                    </h3>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Compound Coverage Ratio</label>
                    <div className="relative">
                        <input type="number" step="0.1" value={coverageRatio} onChange={(e) => setCoverageRatio(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-2 px-3 text-sm font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-stone-500/20" />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">Default 1.5kg per 1mm per m&sup2;</p>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Bag Weight (kg)</label>
                    <input type="number" step="1" value={bagSize} onChange={(e) => setBagSize(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-2 px-3 text-sm font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-stone-500/20" />
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Price per Bag (£)</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">£</span>
                        <input type="number" step="0.01" value={bagPrice} onChange={(e) => setBagPrice(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-2 pl-7 pr-3 text-sm font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-stone-500/20" />
                    </div>
                </div>
            </div>

            {results && (
                <div className="mt-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 relative z-10">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                        <Package className="w-4 h-4" /> Material Requirements
                    </h3>

                    <div className="bg-stone-800 dark:bg-stone-700 p-8 rounded-2xl text-center shadow-lg shadow-stone-900/10 mb-8 border border-stone-700 dark:border-stone-600">
                        <span className="block text-stone-300 font-bold mb-2 uppercase tracking-wide text-sm">
                            Total Bags Needed
                        </span>
                        <span className="text-6xl md:text-7xl font-black text-white">{results.bags}</span>
                        <span className="block mt-1 font-medium text-stone-300/80 italic">bags of {bagSize}kg</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                            <span className="block text-slate-500 dark:text-slate-400 text-xs font-bold uppercase mb-1">Total Floor Area</span>
                            <span className="text-xl font-black text-slate-900 dark:text-white">{results.area} m&sup2;</span>
                        </div>
                        <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                            <span className="block text-slate-500 dark:text-slate-400 text-xs font-bold uppercase mb-1">Total Dry Weight</span>
                            <span className="text-xl font-black text-slate-900 dark:text-white">{results.totalKg} kg</span>
                        </div>
                        <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800 text-center border-l-4 border-l-stone-500">
                            <span className="block text-stone-600 dark:text-stone-400 text-xs font-bold uppercase mb-1">Estimated Cost</span>
                            <span className="text-xl font-black text-stone-800 dark:text-stone-100">£{results.cost}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
