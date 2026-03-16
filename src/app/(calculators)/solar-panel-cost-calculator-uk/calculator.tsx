"use client";

import React, { useState, useRef } from "react";
import { Download, SunMedium, BatteryCharging, Zap } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function SolarPanelCostCalculator() {
    const [systemSize, setSystemSize] = useState<string>("4"); // 4kW is standard
    const [roofType, setRoofType] = useState<"standard" | "slate" | "flat">("standard");
    const [batteryStorage, setBatteryStorage] = useState<"none" | "small" | "large">("small");

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const processResults = () => {
        const kw = parseFloat(systemSize);
        if (isNaN(kw) || kw <= 0) return null;

        // Base price of solar panels + installation per kW
        // Standard UK market rate (approx £1,000 - £1,200 per kW)
        const pricePerKw = 1100;
        let panelsCost = kw * pricePerKw;

        // Roof modifier
        let roofModifier = 0;
        if (roofType === "slate") {
            // Slate is fragile and requires specialist solar flashings
            roofModifier = kw * 150;
        } else if (roofType === "flat") {
            // Flat roofs require angled A-frames and heavy ballast
            roofModifier = kw * 200;
        }

        // Battery storage
        let batteryCost = 0;
        if (batteryStorage === "small") {
            batteryCost = 3500; // e.g. 5kWh battery
        } else if (batteryStorage === "large") {
            batteryCost = 5500; // e.g. 10kWh battery
        }

        const scaffoldingCost = 600;

        const totalCost = panelsCost + roofModifier + batteryCost + scaffoldingCost;

        // Solar panels currently enjoy 0% VAT in the UK until March 2027
        const vat = 0;
        const finalPrice = totalCost + vat;

        // Estimated generation based on 850kWh per 1kW installed (UK average)
        const annualGenerationKwh = kw * 850;
        const currentElecPrice = 0.28; // pence per unit
        const annualSavings = annualGenerationKwh * currentElecPrice;

        return {
            panelsCost: panelsCost.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            roofModifier: roofModifier > 0 ? roofModifier.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }) : "£0",
            batteryCost: batteryCost > 0 ? batteryCost.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }) : "£0",
            scaffoldingCost: scaffoldingCost.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            vat: vat.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            estimatedTotal: finalPrice.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            annualSavings: annualSavings.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            panelCount: Math.ceil((kw * 1000) / 400), // Assuming 400W modern panels
            generation: annualGenerationKwh.toLocaleString('en-GB') + " kWh"
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
            pdf.text("Solar Panel Cost Estimate", 15, 20);
            
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 15, 28);
            
            pdf.setDrawColor(226, 232, 240);
            pdf.line(15, 32, pdfWidth - 15, 32);

            pdf.addImage(imgData, "PNG", 15, 40, pdfWidth - 30, (canvas.height * (pdfWidth - 30)) / canvas.width);
            pdf.save("solar-panel-cost-report.pdf");
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
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

            <div className="flex justify-between items-center mb-10 relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <SunMedium className="w-6 h-6 text-amber-500" />
                    Solar PV Requirements
                </h2>
                <button
                    onClick={exportPDF}
                    disabled={isExporting}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
                >
                    {isExporting ? <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div> : <Download className="w-4 h-4" />}
                    Export
                </button>
            </div>

            <div className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Desired System Size</label>
                        <select value={systemSize} onChange={(e) => setSystemSize(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500/20">
                            <option value="3">3 kW (Small House / ~8 Panels)</option>
                            <option value="4">4 kW (Standard 3-Bed House / ~10 Panels)</option>
                            <option value="5">5 kW (Large Demand / ~12 Panels)</option>
                            <option value="6">6 kW (Very High Demand / ~15 Panels)</option>
                            <option value="8">8 kW (EV Charger & Heat Pump / ~20 Panels)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Battery Storage</label>
                        <select value={batteryStorage} onChange={(e) => setBatteryStorage(e.target.value as any)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500/20">
                            <option value="none">No Battery (Grid Export Only)</option>
                            <option value="small">Small Battery (~5kWh / Night-time baseload)</option>
                            <option value="large">Large Battery (~10kWh / Heavy usage)</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">What kind of roof do you have?</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button onClick={() => setRoofType("standard")} className={`p-4 rounded-xl border text-left transition-all ${roofType === "standard" ? "border-amber-500 bg-amber-50 dark:bg-amber-900/10" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"}`}>
                            <span className="block font-bold text-slate-900 dark:text-white mb-1">Standard Pitched</span>
                            <span className="text-xs text-slate-500 leading-tight block">Concrete interlocking tiles. Fastest to install.</span>
                        </button>
                        <button onClick={() => setRoofType("slate")} className={`p-4 rounded-xl border text-left transition-all ${roofType === "slate" ? "border-amber-500 bg-amber-50 dark:bg-amber-900/10" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"}`}>
                            <span className="block font-bold text-slate-900 dark:text-white mb-1">Natural Slate</span>
                            <span className="text-xs text-slate-500 leading-tight block">Fragile. Requires special flashing hooks & extra labour.</span>
                        </button>
                        <button onClick={() => setRoofType("flat")} className={`p-4 rounded-xl border text-left transition-all ${roofType === "flat" ? "border-amber-500 bg-amber-50 dark:bg-amber-900/10" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"}`}>
                            <span className="block font-bold text-slate-900 dark:text-white mb-1">Flat Roof</span>
                            <span className="text-xs text-slate-500 leading-tight block">Needs heavy mounting A-frames/ballast to catch sunlight.</span>
                        </button>
                    </div>
                </div>
            </div>

            {results && (
                <div className="mt-8 bg-amber-50 dark:bg-amber-900/10 rounded-2xl p-6 sm:p-8 border border-amber-100 dark:border-amber-800/50 relative z-10">
                    <div className="flex flex-col items-center justify-center text-center">
                        <span className="block text-amber-800 dark:text-amber-300 font-bold mb-2 uppercase tracking-wide text-sm">
                            Total Installation Cost
                        </span>
                        <span className="text-5xl md:text-6xl font-black text-amber-600 dark:text-amber-500 mb-4 block">
                            {results.estimatedTotal}
                        </span>
                        <span className="inline-flex items-center gap-1 mt-1 font-medium text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-full text-xs">
                            <Zap className="w-3 h-3" /> 0% VAT Applied (UK Govt scheme)
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-6 border-t border-amber-200 dark:border-amber-800/50">
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Cost Breakdown</h4>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-600 dark:text-slate-400">Panels, Inverter & Labour</span>
                                <span className="font-bold text-slate-900 dark:text-white">{results.panelsCost}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-600 dark:text-slate-400">Scaffolding (1-2 elevations)</span>
                                <span className="font-bold text-slate-900 dark:text-white">{results.scaffoldingCost}</span>
                            </div>
                            {batteryStorage !== "none" && (
                                <div className="flex justify-between items-center text-sm">
                                    <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400"><BatteryCharging className="w-4 h-4 text-emerald-500" /> Battery Storage</span>
                                    <span className="font-bold text-slate-900 dark:text-white">{results.batteryCost}</span>
                                </div>
                            )}
                            {roofType !== "standard" && (
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-600 dark:text-slate-400 text-red-500">Complex Roof Surcharge</span>
                                    <span className="font-bold text-red-600 dark:text-red-400">+{results.roofModifier}</span>
                                </div>
                            )}
                        </div>

                        <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-amber-100 dark:border-amber-900/50 flex flex-col justify-center">
                            <span className="text-slate-500 font-bold text-xs uppercase mb-1 flex justify-between">
                                Estimated Generation <span>(~{results.panelCount} Panels)</span>
                            </span>
                            <span className="font-black text-2xl text-slate-800 dark:text-slate-200">{results.generation} <span className="text-sm font-medium text-slate-500">/ yr</span></span>
                            <p className="text-xs text-slate-500 mt-2">
                                At current 28p/kWh energy cap, this could save you roughly <strong className="text-green-600 dark:text-green-400">{results.annualSavings}</strong> a year if you consume all you generate (via a battery).
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
