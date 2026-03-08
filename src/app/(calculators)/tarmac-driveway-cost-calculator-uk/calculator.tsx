"use client";

import React, { useState, useRef } from "react";
import { Download, Truck, CarFront } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function TarmacDrivewayCostCalculator() {
    const [length, setLength] = useState<string>("5");
    const [width, setWidth] = useState<string>("4");

    // Core parameters
    const [currentState, setCurrentState] = useState<"grass" | "overlay" | "existing">("existing");
    const [tarmacType, setTarmacType] = useState<"black" | "red" | "sma">("black");
    const [location, setLocation] = useState<"london" | "standard">("standard");

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const processResults = () => {
        const l = parseFloat(length);
        const w = parseFloat(width);

        if (isNaN(l) || isNaN(w) || l <= 0 || w <= 0) return null;

        const area = l * w; // Area in square metres

        // Base prices per square meter (approx UK 2026 rates)
        let prepCostPerSqm = 0;
        let tarmacCostPerSqm = 0;

        // Preparation Costs
        switch (currentState) {
            case "grass":
                prepCostPerSqm = 65; // High cost: excavation, membrane, 150mm MOT Type 1 sub-base
                break;
            case "existing":
                prepCostPerSqm = 35; // Break up old drive, remove waste, minor sub-base repairs
                break;
            case "overlay":
                prepCostPerSqm = 10; // Clean, weed kill, apply binder (only if base is perfect)
                break;
        }

        // Tarmac Materials & Laying
        switch (tarmacType) {
            case "black":
                tarmacCostPerSqm = 50; // Standard SMA/base + wearing course
                break;
            case "red":
                tarmacCostPerSqm = 75; // Red pigment is significantly more expensive
                break;
            case "sma":
                tarmacCostPerSqm = 60; // Stone Mastic Asphalt (highly durable)
                break;
        }

        let totalPrep = area * prepCostPerSqm;
        let totalTarmac = area * tarmacCostPerSqm;

        // Overhead/Fixed costs (site setup, digger hire, skip hire)
        let fixedCosts = 350; // Skip hire (8 yard)
        if (currentState === "grass" || currentState === "existing") {
            fixedCosts += 450; // Mini digger & dumper hire + delivery
        }

        // Location multiplier
        const locationMultiplier = location === "london" ? 1.3 : 1.0;

        const subtotal = (totalPrep + totalTarmac + fixedCosts) * locationMultiplier;

        // Add 20% VAT to get final consumer price
        const totalInclVat = subtotal * 1.2;

        return {
            area: area.toFixed(1),
            prepCost: (totalPrep * locationMultiplier).toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            tarmacCost: (totalTarmac * locationMultiplier).toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            fixedCosts: (fixedCosts * locationMultiplier).toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            subtotal: subtotal.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            vat: (subtotal * 0.2).toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            estimatedTotal: totalInclVat.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            costPerSqmTotal: (totalInclVat / area).toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 })
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
            pdf.text("Tarmac Driveway Cost Report", 15, 15);
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 15, 22);
            pdf.addImage(imgData, "PNG", 15, 30, pdfWidth - 30, pdfHeight - 30);
            pdf.save("tarmac-driveway-cost-report.pdf");
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
            <div className="absolute top-0 left-0 w-96 h-96 bg-zinc-500/10 dark:bg-zinc-500/5 rounded-full blur-3xl pointer-events-none -translate-x-1/3 -translate-y-1/3"></div>

            <div className="flex justify-between items-center mb-10 relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <Truck className="w-6 h-6 text-zinc-600" />
                    Driveway Specifications
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

            <div className="space-y-8 relative z-10">

                {/* Dimensions */}
                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2"><CarFront className="w-4 h-4" /> Driveway Size (Metres)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Length (m)</label>
                            <input type="number" step="0.1" value={length} onChange={(e) => setLength(e.target.value)} className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-zinc-500/20" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Width (m)</label>
                            <input type="number" step="0.1" value={width} onChange={(e) => setWidth(e.target.value)} className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-zinc-500/20" />
                        </div>
                    </div>
                </div>

                {/* Excavation */}
                <div>
                    <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">What is the current state of the driveway?</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button onClick={() => setCurrentState("grass")} className={`p-4 rounded-xl border text-left transition-all ${currentState === "grass" ? "border-zinc-500 bg-zinc-50 dark:bg-zinc-900/50" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"}`}>
                            <span className="block font-bold text-slate-900 dark:text-white mb-1">Grass / Garden</span>
                            <span className="text-xs text-slate-500 leading-tight block">Requires full soil excavation and new stone sub-base.</span>
                        </button>
                        <button onClick={() => setCurrentState("existing")} className={`p-4 rounded-xl border text-left transition-all ${currentState === "existing" ? "border-zinc-500 bg-zinc-50 dark:bg-zinc-900/50" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"}`}>
                            <span className="block font-bold text-slate-900 dark:text-white mb-1">Old Paving / Concrete</span>
                            <span className="text-xs text-slate-500 leading-tight block">Requires breaking up and removal, base may be okay.</span>
                        </button>
                        <button onClick={() => setCurrentState("overlay")} className={`p-4 rounded-xl border text-left transition-all ${currentState === "overlay" ? "border-zinc-500 bg-zinc-50 dark:bg-zinc-900/50" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"}`}>
                            <span className="block font-bold text-slate-900 dark:text-white mb-1">Existing Tarmac</span>
                            <span className="text-xs text-slate-500 leading-tight block">Base is flawless, just applying fresh top coat (Overlay).</span>
                        </button>
                    </div>
                </div>

                {/* Tarmac Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">Tarmac Finish Type</label>
                        <select value={tarmacType} onChange={(e) => setTarmacType(e.target.value as any)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-zinc-500/20">
                            <option value="black">Standard Black Macadam</option>
                            <option value="sma">Premium SMA (Highly Durable Black)</option>
                            <option value="red">Red Tarmac</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">Location</label>
                        <select value={location} onChange={(e) => setLocation(e.target.value as any)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-zinc-500/20">
                            <option value="standard">Standard UK Rates</option>
                            <option value="london">London & South East (Higher Rates)</option>
                        </select>
                    </div>
                </div>
            </div>

            {results && (
                <div className="mt-12 bg-slate-900 rounded-2xl p-6 sm:p-8 text-white relative z-10 shadow-2xl">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Estimated Cost Breakdown</h3>

                    <div className="flex items-baseline gap-2 mb-8 border-b border-slate-800 pb-8">
                        <span className="text-5xl md:text-6xl font-black text-white">{results.estimatedTotal}</span>
                        <span className="text-slate-400 font-medium">Incl. VAT</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm mb-6">
                        <div className="flex justify-between items-center py-2 border-b border-slate-800/50">
                            <span className="text-slate-400">Total Area</span>
                            <span className="font-bold">{results.area} m²</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-800/50">
                            <span className="text-slate-400">Excavation & Prep</span>
                            <span className="font-bold">{results.prepCost}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-800/50">
                            <span className="text-slate-400">Tarmac Material & Lay</span>
                            <span className="font-bold">{results.tarmacCost}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-800/50">
                            <span className="text-slate-400">Plant Hire (Skips/Digger)</span>
                            <span className="font-bold">{results.fixedCosts}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-slate-400">Subtotal (Excl. VAT)</span>
                            <span className="font-bold text-slate-300">{results.subtotal}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-slate-400">VAT (20%)</span>
                            <span className="font-bold text-slate-300">{results.vat}</span>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 p-4 rounded-xl flex items-start gap-3 mt-4 border border-slate-700/50">
                        <div className="p-2 bg-zinc-700/50 rounded-lg">
                            <CarFront className="w-5 h-5 text-zinc-300" />
                        </div>
                        <div>
                            <p className="font-bold text-white mb-1">Total Cost per m² ≈ {results.costPerSqmTotal}</p>
                            <p className="text-xs text-slate-400 leading-relaxed">This is a rough estimate. Dropping kerbs, rerouting drainage, and removing massive hidden tree roots will incur significant extra costs.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
