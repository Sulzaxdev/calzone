"use client";

import React, { useState, useRef } from "react";
import { Download, Home, Zap, ThermometerSnowflake, DollarSign } from "lucide-react";

import jsPDF from "jspdf";

export function CavityWallInsulationCalculator() {
    const [propertyType, setPropertyType] = useState<"detached" | "semi" | "terraced" | "bungalow" | "flat">("semi");
    const [storeys, setStoreys] = useState<number>(2);
    const [material, setMaterial] = useState<"beads" | "wool" | "foam">("beads");
    const [areaOverride, setAreaOverride] = useState<string>("");

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const processResults = () => {
        // Estimated wall areas (sqm) based on UK property averages
        let wallArea = 0;
        switch (propertyType) {
            case "detached": wallArea = 120 * (storeys / 2); break;
            case "semi": wallArea = 85 * (storeys / 2); break;
            case "terraced": wallArea = 55 * (storeys / 2); break;
            case "bungalow": wallArea = 90; break;
            case "flat": wallArea = 40; break;
        }

        // Use override if provided
        if (areaOverride && !isNaN(parseFloat(areaOverride))) {
            wallArea = parseFloat(areaOverride);
        }

        // Material Rates (per sqm)
        // Beads: £22-£26, Wool: £18-£22, Foam: £45-£60
        let materialRate = 0;
        switch (material) {
            case "beads": materialRate = 24; break;
            case "wool": materialRate = 20; break;
            case "foam": materialRate = 55; break;
        }

        const baselineCost = wallArea * materialRate;
        // Scaffolding / Access surcharge for 3+ storeys
        const accessSurcharge = storeys >= 3 ? 400 : 0;

        const subtotal = baselineCost + accessSurcharge;
        const vat = subtotal * 0.2; // 20% VAT (Note: Some green grants may zero-rate VAT, but 20 is standard)
        const total = subtotal + vat;

        // Savings Estimates (Based on Energy Saving Trust 2024-2025 figures)
        let annualSaving = 0;
        switch (propertyType) {
            case "detached": annualSaving = 450; break;
            case "semi": annualSaving = 260; break;
            case "terraced": annualSaving = 160; break;
            case "bungalow": annualSaving = 190; break;
            case "flat": annualSaving = 110; break;
        }

        const paybackYears = total / (annualSaving || 1);

        return {
            wallArea: wallArea.toFixed(1),
            materialRate: materialRate.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }),
            installationCost: subtotal.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }),
            vat: vat.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }),
            totalCost: total.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }),
            annualSaving: annualSaving.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }),
            paybackPeriod: paybackYears.toFixed(1)
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
            pdf.text("Cavity Wall Insulation Report", 15, 20);
            
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
            pdf.save("cavity-wall-report.pdf");
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
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

            <div className="flex justify-between items-center mb-10 relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <ThermometerSnowflake className="w-6 h-6 text-emerald-500" />
                    Property Details
                </h2>
                <button
                    onClick={exportPDF}
                    disabled={isExporting}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
                >
                    {isExporting ? <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div> : <Download className="w-4 h-4" />}
                    Export
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Property Type</label>
                        <select
                            value={propertyType}
                            onChange={(e) => setPropertyType(e.target.value as any)}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/20"
                        >
                            <option value="detached">Detached House</option>
                            <option value="semi">Semi-Detached</option>
                            <option value="terraced">Mid-Terrace</option>
                            <option value="bungalow">Bungalow</option>
                            <option value="flat">Grd/Mid Floor Flat</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Number of Storeys</label>
                        <div className="flex gap-2">
                            {[1, 2, 3].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => setStoreys(num)}
                                    className={`flex-1 py-3 rounded-xl border text-sm font-bold transition-all ${storeys === num
                                            ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900"
                                            : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                                        }`}
                                >
                                    {num} {num === 1 ? 'Storey' : 'Storeys'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center justify-between">
                            <span>Estimated Wall Area (m²)</span>
                            <span className="text-[10px] text-slate-400">Override below</span>
                        </label>
                        <input
                            type="number"
                            value={areaOverride || results.wallArea}
                            onChange={(e) => setAreaOverride(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/20"
                            placeholder={results.wallArea}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                            Insulation Material
                        </label>
                        <div className="space-y-2">
                            {(['beads', 'wool', 'foam'] as const).map((mat) => (
                                <button
                                    key={mat}
                                    onClick={() => setMaterial(mat)}
                                    className={`w-full p-3 rounded-xl border text-left transition-all ${material === mat
                                            ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10"
                                            : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                                        }`}
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <span className={`font-bold text-sm ${material === mat ? "text-emerald-700 dark:text-emerald-300" : "text-slate-900 dark:text-white"}`}>
                                            {mat === 'beads' ? 'EPS Beads' : mat === 'wool' ? 'Glass/Mineral Wool' : 'Injected Foam'}
                                        </span>
                                        <span className="text-[10px] font-bold text-slate-400">
                                            {mat === 'beads' ? '£24/m²' : mat === 'wool' ? '£20/m²' : '£55/m²'}
                                        </span>
                                    </div>
                                    <span className="text-[10px] text-slate-500 block leading-tight">
                                        {mat === 'beads' ? 'Most modern, best airflow.' : mat === 'wool' ? 'Budget friendly, standard.' : 'Fills all cracks, premium.'}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {results && (
                <div className="mt-10 bg-slate-900 rounded-2xl p-6 sm:p-8 text-white relative z-10 shadow-xl border border-slate-800">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
                        <div className="relative">
                            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Estimated Installation Cost</h3>
                            <div className="text-5xl font-black text-white mb-2">{results.totalCost}</div>
                            <div className="flex flex-col gap-2 mt-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Installation Subtotal</span>
                                    <span className="font-bold">{results.installationCost}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">VAT (20%)</span>
                                    <span className="font-bold">{results.vat}</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 lg:pt-0 lg:pl-8">
                            <h3 className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">Energy Saving Forecast</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                                    <div className="text-[10px] font-bold text-emerald-300 uppercase mb-1 flex items-center gap-1">
                                        <Zap className="w-3 h-3" /> Annual Saving
                                    </div>
                                    <div className="text-2xl font-black text-white">{results.annualSaving}</div>
                                </div>
                                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1">
                                        <Home className="w-3 h-3" /> Area Count
                                    </div>
                                    <div className="text-2xl font-black text-white">{results.wallArea}m²</div>
                                </div>
                            </div>
                            <div className="mt-6 flex items-end gap-3">
                                <div>
                                    <span className="text-slate-500 text-[10px] font-bold uppercase block mb-1">Estimated Payback Period</span>
                                    <div className="text-3xl font-black text-white">{results.paybackPeriod} <span className="text-sm font-normal text-slate-500 uppercase tracking-widest">Years</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
