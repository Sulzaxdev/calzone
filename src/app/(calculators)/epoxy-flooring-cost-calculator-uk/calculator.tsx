"use client";

import React, { useState, useRef } from "react";
import { Download, Layers, Ruler, Paintbrush, Hammer } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function EpoxyFlooringCostCalculator() {
    const [area, setArea] = useState<string>("30"); // 30m2 is a decent sized double garage
    const [floorCondition, setFloorCondition] = useState<"good" | "average" | "poor">("average");
    const [epoxyType, setEpoxyType] = useState<"solid" | "flake" | "metallic">("flake");
    const [needsTopcoat, setNeedsTopcoat] = useState<boolean>(true);

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const processResults = () => {
        const a = parseFloat(area);
        if (isNaN(a) || a <= 0) return null;

        // Preparation Costs (crucial for resin)
        // Good = Light sweep & acid etch (£5/m2)
        // Average = Diamond grinding to remove old paint/sealers (£15/m2)
        // Poor = Diamond grinding + crack repairing + DPM (Damp Proof Membrane) or levelling compound (£35/m2)
        let prepCostPerSqm = 0;
        switch (floorCondition) {
            case "good": prepCostPerSqm = 5; break;
            case "average": prepCostPerSqm = 18; break; // Diamond grinding
            case "poor": prepCostPerSqm = 40; break;
        }
        const flatPrepCost = a * prepCostPerSqm;

        // Epoxy Resin Materials
        let epoxyCostPerSqm = 0;
        switch (epoxyType) {
            case "solid": epoxyCostPerSqm = 15; break; // Standard 2-part trade epoxy (Primer + 2 colour coats)
            case "flake": epoxyCostPerSqm = 35; break; // Full broadcast decorative PVA flakes built up over basecoat
            case "metallic": epoxyCostPerSqm = 50; break; // High-build designer metallic pigments manipulated by hand
        }
        const materialsCost = a * epoxyCostPerSqm;

        // Topcoat (Polyurethane or Polyaspartic UV stable clear coat)
        const topcoatCost = needsTopcoat ? a * 15 : 0;

        const totalMaterialsAndPrep = flatPrepCost + materialsCost + topcoatCost;

        // Labour (Specialist Resin Contractors)
        // Resin must be done in stages with strict curing times.
        // Day 1: Grind/Prep/Prime. Day 2: Basecoat & Flake. Day 3: Sweep & Topcoat.
        // It's rarely a 1-day job, regardless of size, due to chemistry.
        let daysRequired = 3;
        if (epoxyType === "metallic" || floorCondition === "poor") {
            daysRequired = 4; // Extra day for intricate swirling or fixing a terrible floor slab
        }

        // Large areas naturally take longer to physically roll/squeegee
        if (a > 60) daysRequired += 1;
        if (a > 100) daysRequired += 1;

        const dailyRate = 450; // Specialist two-man team or lead+labourer with expensive grinders
        const labourCost = daysRequired * dailyRate;

        // Extra costs
        const consumables = 150; // Rollers, spiked shoes, tape, mixing buckets (these are single use with resin)

        const subtotal = totalMaterialsAndPrep + labourCost + consumables;
        const vat = subtotal * 0.2; // Assuming VAT registered specialist
        const estimatedTotal = subtotal + vat;

        return {
            prepCost: flatPrepCost.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            resinCost: (materialsCost + topcoatCost).toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            labourCost: labourCost.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            consumables: consumables.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            daysRequired,
            subtotal: subtotal.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            vat: vat.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            estimatedTotal: estimatedTotal.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            costPerSqm: (estimatedTotal / a).toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 })
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
            pdf.text("Epoxy Flooring Report", 15, 20);
            
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 15, 28);
            
            pdf.setDrawColor(226, 232, 240);
            pdf.line(15, 32, pdfWidth - 15, 32);

            pdf.addImage(imgData, "PNG", 15, 40, pdfWidth - 30, (canvas.height * (pdfWidth - 30)) / canvas.width);
            pdf.save("epoxy-flooring-cost-report.pdf");
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
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none -translate-x-1/3 -translate-y-1/3"></div>

            <div className="flex justify-between items-center mb-10 relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <Layers className="w-6 h-6 text-purple-500" />
                    Resin Floor Specifications
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
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                            <Ruler className="w-4 h-4" /> Total Floor Area (m²)
                        </label>
                        <input
                            type="number"
                            step="1"
                            min="1"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-bold text-xl text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500/20"
                        />
                        <p className="text-xs text-slate-500 mt-3 font-medium">Standard UK single garage is ~15m². Double garage is ~30m².</p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Concrete Subfloor Condition</label>
                        <select value={floorCondition} onChange={(e) => setFloorCondition(e.target.value as any)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500/20">
                            <option value="good">Good (Bare concrete, no paint, perfectly smooth)</option>
                            <option value="average">Average (Old flaking paint, minor stains. Needs grinding)</option>
                            <option value="poor">Poor (Cracked, severely pitted, heavily oiled or damp)</option>
                        </select>
                        {floorCondition === "poor" && (
                            <p className="text-xs text-red-500 font-bold mt-2">Will require heavy grinding, epoxy mortar crack repairs, and a Damp Proof Membrane (DPM) primer before finishing.</p>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Finish Style</label>
                        <div className="grid grid-cols-1 gap-2">
                            <button onClick={() => setEpoxyType("solid")} className={`p-3 rounded-xl border text-left transition-all ${epoxyType === "solid" ? "border-purple-500 bg-purple-50 dark:bg-purple-900/10" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"}`}>
                                <span className="block font-bold text-slate-900 dark:text-white text-sm">Solid Colour Trade Epoxy</span>
                                <span className="text-xs text-slate-500">Smooth, industrial factory floor look. Most affordable.</span>
                            </button>
                            <button onClick={() => setEpoxyType("flake")} className={`p-3 rounded-xl border text-left transition-all ${epoxyType === "flake" ? "border-purple-500 bg-purple-50 dark:bg-purple-900/10" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"}`}>
                                <span className="block font-bold text-slate-900 dark:text-white text-sm">Decorative Flake System</span>
                                <span className="text-xs text-slate-500">PVC flakes scattered into the basecoat. Adds texture, grip, and hides dirt incredibly well. Top-tier garage finish.</span>
                            </button>
                            <button onClick={() => setEpoxyType("metallic")} className={`p-3 rounded-xl border text-left transition-all ${epoxyType === "metallic" ? "border-purple-500 bg-purple-50 dark:bg-purple-900/10" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"}`}>
                                <span className="block font-bold text-slate-900 dark:text-white text-sm">Metallic / 3D Marble Effect</span>
                                <span className="text-xs text-slate-500">High-end showroom finish mimicking liquid marble. Hand-swirled by artisans. Exquisite but highly expensive.</span>
                            </button>
                        </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
                        <label className="flex flex-col gap-1 cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${needsTopcoat ? "bg-purple-500 border-purple-500" : "border-slate-300 dark:border-slate-700"}`}>
                                    {needsTopcoat && <span className="text-white text-xs font-bold">✓</span>}
                                </div>
                                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">UV-Stable Polyurethane Clear Topcoat</span>
                            </div>
                            <span className="text-xs text-slate-500 pl-8">Highly recommended. Pure epoxy will turn severely yellow over time if exposed to sunlight (e.g., when the garage door is open). A PU topcoat seals it.</span>
                            <button className="hidden" onClick={() => setNeedsTopcoat(!needsTopcoat)}></button>
                        </label>
                    </div>
                </div>
            </div>

            {results && (
                <div className="mt-10 bg-slate-900 rounded-2xl p-6 sm:p-8 text-white relative z-10 shadow-xl overflow-hidden">
                    <div className="absolute bottom-0 right-0 p-8 opacity-20 pointer-events-none">
                        <Paintbrush className="w-48 h-48 text-purple-500" />
                    </div>

                    <div className="relative z-10">
                        <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-6">Commercial Estimate</h3>

                        <div className="flex items-baseline gap-2 mb-8 border-b border-slate-800 pb-6">
                            <span className="text-5xl md:text-6xl font-black text-white">{results.estimatedTotal}</span>
                            <span className="text-slate-400 font-medium text-sm">Incl. VAT</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                            <div className="flex justify-between items-center py-2 border-b border-slate-800/50">
                                <span className="text-slate-400">Surface Prep & Diamond Grinding</span>
                                <span className="font-bold">{results.prepCost}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-slate-800/50">
                                <span className="text-slate-400">Resins, Pigments & Clear Coats ({area}m²)</span>
                                <span className="font-bold">{results.resinCost}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-slate-800/50">
                                <span className="text-slate-400">Specialist Labour (~{results.daysRequired} days)</span>
                                <span className="font-bold">{results.labourCost}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-slate-800/50">
                                <span className="text-slate-400">Mixing Tools & Consumables</span>
                                <span className="font-bold">{results.consumables}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 text-slate-300 pt-4">
                                <span>Subtotal</span>
                                <span>{results.subtotal}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 text-purple-400 font-bold pt-4 mt-2 border-t border-purple-500/30">
                                <span>Fitted Price Per Sqm</span>
                                <span>{results.costPerSqm} / m²</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
