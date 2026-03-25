"use client";

import React, { useState, useRef } from "react";
import { Download, Home, Ruler, Plus, Briefcase, MapPin } from "lucide-react";

import jsPDF from "jspdf";

export function LoftConversionCostCalculator() {
    const [area, setArea] = useState<string>("30");
    const [conversionType, setConversionType] = useState<"rooflight" | "dormer" | "hiptogable" | "mansard">("dormer");
    const [finishLevel, setFinishLevel] = useState<"standard" | "premium">("standard");
    const [addBathroom, setAddBathroom] = useState<boolean>(true);
    const [location, setLocation] = useState<"standard" | "london">("standard");

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const processResults = () => {
        const sqMetres = parseFloat(area);

        if (isNaN(sqMetres) || sqMetres < 10) return null;

        // Base price per m² depending on the type of conversion
        // (Approximate UK prices for 2026)
        let basePricePerSqm = 0;
        let fixedCosts = 0; // Scaffolding, planning etc.

        switch (conversionType) {
            case "rooflight":
                basePricePerSqm = 900;
                fixedCosts = 4000;
                break;
            case "dormer":
                basePricePerSqm = 1400;
                fixedCosts = 6000;
                break;
            case "hiptogable":
                basePricePerSqm = 1600;
                fixedCosts = 7500;
                break;
            case "mansard":
                basePricePerSqm = 1800;
                fixedCosts = 8500;
                break;
        }

        let buildCost = sqMetres * basePricePerSqm + fixedCosts;

        // Premium finish adds 25% to build cost
        if (finishLevel === "premium") {
            buildCost *= 1.25;
        }

        // Bathroom addition
        let bathroomCost = 0;
        if (addBathroom) {
            bathroomCost = finishLevel === "premium" ? 7500 : 5000;
        }

        // Location multiplier
        const locationMultiplier = location === "london" ? 1.25 : 1.0;

        let subtotal = (buildCost + bathroomCost) * locationMultiplier;

        // Professional fees (architects, structural engineer, building regs) ≈ 10%
        let profFees = subtotal * 0.10;

        let totalInclVat = (subtotal + profFees) * 1.2;

        return {
            buildCost: (buildCost * locationMultiplier).toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            bathroomCost: (bathroomCost * locationMultiplier).toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            profFees: profFees.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            vat: ((subtotal + profFees) * 0.2).toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            estimatedTotal: totalInclVat.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            costPerSqmTotal: (totalInclVat / sqMetres).toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 })
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
            pdf.text("Loft Conversion Cost Report", 15, 20);
            
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
            pdf.save("loft-conversion-report.pdf");
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
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

            <div className="flex justify-between items-center mb-10 relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <Home className="w-6 h-6 text-purple-500" />
                    Property Specs
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                            <Ruler className="w-4 h-4 text-slate-400" /> Loft Area (m²)
                        </label>
                        <div className="relative">
                            <input type="number" min="10" step="1" value={area} onChange={(e) => setArea(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 pr-16 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500/20" />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">m²</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Type of Conversion</label>
                        <select value={conversionType} onChange={(e) => setConversionType(e.target.value as any)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500/20">
                            <option value="rooflight">Roof Light / Velux (Cheapest)</option>
                            <option value="dormer">Dormer (Most Common)</option>
                            <option value="hiptogable">Hip-to-Gable</option>
                            <option value="mansard">Mansard (Most Expensive)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-slate-400" /> Location
                        </label>
                        <select value={location} onChange={(e) => setLocation(e.target.value as any)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500/20">
                            <option value="standard">Standard UK Rates</option>
                            <option value="london">London & South East (+25%)</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 border-b border-slate-200 dark:border-slate-800 pb-2">Finish & Extras</label>

                        <div className="mt-4">
                            <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
                                <button
                                    onClick={() => setFinishLevel("standard")}
                                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${finishLevel === "standard" ? 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                                >
                                    Standard Finish
                                </button>
                                <button
                                    onClick={() => setFinishLevel("premium")}
                                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${finishLevel === "premium" ? 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                                >
                                    Premium Finish
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
                        <label className="flex flex-col gap-1 cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${addBathroom ? "bg-purple-500 border-purple-500" : "border-slate-300 dark:border-slate-700"}`}>
                                    {addBathroom && <span className="text-white text-xs font-bold">✓</span>}
                                </div>
                                <span className="font-bold text-slate-800 dark:text-slate-200">Add an En-suite Bathroom</span>
                            </div>
                            <span className="text-xs text-slate-500 pl-8">Includes plumbing, waste routing, and standard suite.</span>
                            <button className="hidden" onClick={() => setAddBathroom(!addBathroom)}></button>
                        </label>
                    </div>
                </div>
            </div>

            {results && (
                <div className="mt-10 bg-purple-50 dark:bg-purple-900/10 rounded-2xl p-6 sm:p-8 border border-purple-100 dark:border-purple-800/50 relative z-10">
                    <div className="text-center mb-8">
                        <span className="block text-purple-800 dark:text-purple-300 font-bold mb-2 uppercase tracking-wide text-sm">
                            Estimated Total Build Cost
                        </span>
                        <span className="text-5xl md:text-6xl font-black text-purple-600 dark:text-purple-500">
                            {results.estimatedTotal}
                        </span>
                        <span className="block mt-2 text-sm font-medium text-purple-700 dark:text-purple-400">
                            Includes VAT & Professional Fees
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mt-8 border-t border-purple-200 dark:border-purple-900/30 pt-6">
                        <div className="flex justify-between items-center bg-white dark:bg-slate-950 p-3 rounded-xl border border-purple-100 dark:border-purple-900/50">
                            <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><Home className="w-4 h-4" /> Build Cost</span>
                            <span className="font-bold text-slate-900 dark:text-white">{results.buildCost}</span>
                        </div>
                        {addBathroom && (
                            <div className="flex justify-between items-center bg-white dark:bg-slate-950 p-3 rounded-xl border border-purple-100 dark:border-purple-900/50">
                                <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><Plus className="w-4 h-4" /> En-suite</span>
                                <span className="font-bold text-slate-900 dark:text-white">{results.bathroomCost}</span>
                            </div>
                        )}
                        <div className="flex justify-between items-center bg-white dark:bg-slate-950 p-3 rounded-xl border border-purple-100 dark:border-purple-900/50">
                            <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><Briefcase className="w-4 h-4" /> Prof. Fees (10%)</span>
                            <span className="font-bold text-slate-900 dark:text-white">{results.profFees}</span>
                        </div>
                        <div className="flex justify-between items-center bg-white dark:bg-slate-950 p-3 rounded-xl border border-purple-100 dark:border-purple-900/50">
                            <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">VAT (20%)</span>
                            <span className="font-bold text-slate-900 dark:text-white">{results.vat}</span>
                        </div>
                    </div>

                    <div className="mt-4 text-center">
                        <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">Roughly {results.costPerSqmTotal} per square metre</p>
                    </div>
                </div>
            )}
        </div>
    );
}
