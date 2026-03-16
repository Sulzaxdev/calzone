"use client";

import React, { useState, useRef } from "react";
import { Download, BrickWall, Ruler, HardHat } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function BuildingGardenWallCostCalculator() {
    const [length, setLength] = useState<string>("10");
    const [height, setHeight] = useState<string>("1.2");
    const [wallThickness, setWallThickness] = useState<"single" | "double">("double");
    const [material, setMaterial] = useState<"standardBrick" | "premiumBrick" | "blockRender" | "naturalStone">("standardBrick");
    const [needsFoundation, setNeedsFoundation] = useState<boolean>(true);

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const processResults = () => {
        const l = parseFloat(length);
        const h = parseFloat(height);

        if (isNaN(l) || isNaN(h) || l <= 0 || h <= 0) return null;

        const areaSqm = l * h;

        // Brick/Material calculations
        let materialCostPerSqm = 0;
        let bricksPerSqm = wallThickness === "single" ? 60 : 120; // Approx 60 standard UK bricks per m2 for single skin

        switch (material) {
            case "standardBrick":
                materialCostPerSqm = bricksPerSqm * 1.0; // ~£1.00 per brick
                break;
            case "premiumBrick":
                materialCostPerSqm = bricksPerSqm * 1.8; // ~£1.80 per brick
                break;
            case "blockRender":
                materialCostPerSqm = (wallThickness === "single" ? 10 : 20) * 1.5 + 45; // Blocks are big (10 per m2) + £45/m2 for render/paint
                break;
            case "naturalStone":
                materialCostPerSqm = wallThickness === "single" ? 120 : 220; // Stone is expensive per m2
                break;
        }

        // Mortar, sand, cement, wall ties per m2
        const consumablesPerSqm = 12;

        let totalMaterialCost = areaSqm * (materialCostPerSqm + consumablesPerSqm);

        // Foundation calculation
        let foundationCost = 0;
        if (needsFoundation) {
            // Digging trench, mixing concrete, pouring strip foundation
            // Approx £90 per linear metre depending on width/depth
            foundationCost = l * 90;
        }

        // Labour calculation (Bricklayer + Labourer)
        // A brickie lays ~500 bricks a day. Or roughly 8m2 of single skin, 4m2 of double skin block per day.
        // Daily rate: £300 Brickie + £150 Labourer = £450 per day
        const dailyLabourRate = 450;
        let daysRequired = 1;

        if (material === "standardBrick" || material === "premiumBrick") {
            const totalBricks = areaSqm * bricksPerSqm;
            daysRequired = Math.max(1, Math.ceil(totalBricks / 450)); // Build in fatigue/setup time
        } else if (material === "blockRender") {
            // Blocks are faster, rendering takes an extra day or two
            daysRequired = Math.max(1, Math.ceil(areaSqm / 10)); // Block laying
            daysRequired += Math.max(1, Math.ceil(areaSqm / 15)); // Rendering
        } else {
            // Natural stone is slow and meticulous
            daysRequired = Math.max(1, Math.ceil(areaSqm / 3));
        }

        const totalLabourCost = daysRequired * dailyLabourRate;
        const wasteDisposal = 250; // Skip hire

        const subtotal = totalMaterialCost + foundationCost + totalLabourCost + wasteDisposal;
        const totalInclVat = subtotal * 1.2;

        return {
            area: areaSqm.toFixed(1),
            materialCost: totalMaterialCost.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            foundationCost: foundationCost.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            labourCost: totalLabourCost.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            daysRequired: daysRequired,
            subtotal: subtotal.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            vat: (subtotal * 0.2).toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            estimatedTotal: totalInclVat.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            costPerLinearMetre: (totalInclVat / l).toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 })
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
            pdf.text("Garden Wall Estimate", 15, 20);
            
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 15, 28);
            
            pdf.setDrawColor(226, 232, 240);
            pdf.line(15, 32, pdfWidth - 15, 32);

            pdf.addImage(imgData, "PNG", 15, 40, pdfWidth - 30, (canvas.height * (pdfWidth - 30)) / canvas.width);
            pdf.save("garden-wall-cost-report.pdf");
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
            <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-3xl pointer-events-none -translate-x-1/3 -translate-y-1/3"></div>

            <div className="flex justify-between items-center mb-10 relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <BrickWall className="w-6 h-6 text-orange-500" />
                    Wall Dimensions & Materials
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
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2"><Ruler className="w-4 h-4" /> Size (Metres)</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Length (m)</label>
                                <input type="number" step="0.5" value={length} onChange={(e) => setLength(e.target.value)} className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500/20" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Height (m)</label>
                                <input type="number" step="0.1" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500/20" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Wall Thickness</label>
                        <select value={wallThickness} onChange={(e) => setWallThickness(e.target.value as any)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500/20">
                            <option value="single">Single Skin (Half Brick thick - Not for retaining walls)</option>
                            <option value="double">Double Skin (Full Brick thick - Much stronger)</option>
                        </select>
                        {wallThickness === "single" && parseFloat(height) > 0.6 && (
                            <p className="text-xs text-red-500 font-bold mt-2">Warning: Single skin walls above 600mm high require brick pillars/piers for stability.</p>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Primary Material</label>
                        <div className="grid grid-cols-1 gap-2">
                            <button onClick={() => setMaterial("standardBrick")} className={`p-3 rounded-xl border text-left transition-all ${material === "standardBrick" ? "border-orange-500 bg-orange-50 dark:bg-orange-900/10" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"}`}>
                                <span className="block font-bold text-slate-900 dark:text-white text-sm">Standard Facing Brick</span>
                                <span className="text-xs text-slate-500">Typical red/yellow UK stock bricks. Good value.</span>
                            </button>
                            <button onClick={() => setMaterial("premiumBrick")} className={`p-3 rounded-xl border text-left transition-all ${material === "premiumBrick" ? "border-orange-500 bg-orange-50 dark:bg-orange-900/10" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"}`}>
                                <span className="block font-bold text-slate-900 dark:text-white text-sm">Premium / Reclaimed Brick</span>
                                <span className="text-xs text-slate-500">Weathered look, matches older properties perfectly.</span>
                            </button>
                            <button onClick={() => setMaterial("blockRender")} className={`p-3 rounded-xl border text-left transition-all ${material === "blockRender" ? "border-orange-500 bg-orange-50 dark:bg-orange-900/10" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"}`}>
                                <span className="block font-bold text-slate-900 dark:text-white text-sm">Blockwork + Render</span>
                                <span className="text-xs text-slate-500">Cheap breezeblocks covered in smooth painted render. Modern look.</span>
                            </button>
                            <button onClick={() => setMaterial("naturalStone")} className={`p-3 rounded-xl border text-left transition-all ${material === "naturalStone" ? "border-orange-500 bg-orange-50 dark:bg-orange-900/10" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"}`}>
                                <span className="block font-bold text-slate-900 dark:text-white text-sm">Natural Stone</span>
                                <span className="text-xs text-slate-500">Heavy, slow to build, but incredibly beautiful. Most expensive.</span>
                            </button>
                        </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
                        <label className="flex flex-col gap-1 cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${needsFoundation ? "bg-orange-500 border-orange-500" : "border-slate-300 dark:border-slate-700"}`}>
                                    {needsFoundation && <span className="text-white text-xs font-bold">✓</span>}
                                </div>
                                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">New Concrete Foundation Trench Required</span>
                            </div>
                            <span className="text-xs text-slate-500 pl-8">Uncheck only if you are building upon an existing, flawless solid concrete base capable of holding tons of weight.</span>
                            <button className="hidden" onClick={() => setNeedsFoundation(!needsFoundation)}></button>
                        </label>
                    </div>
                </div>
            </div>

            {results && (
                <div className="mt-10 bg-slate-900 rounded-2xl p-6 sm:p-8 text-white relative z-10 shadow-xl overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <BrickWall className="w-48 h-48" />
                    </div>

                    <div className="relative z-10">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">Total Estimated Cost</h3>

                        <div className="flex items-baseline gap-2 mb-8 border-b border-slate-800 pb-6">
                            <span className="text-5xl md:text-6xl font-black text-white">{results.estimatedTotal}</span>
                            <span className="text-slate-400 font-medium text-sm">Incl. VAT</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                            <div className="flex justify-between items-center py-2 border-b border-slate-800/50">
                                <span className="text-slate-400">Total Area</span>
                                <span className="font-bold">{results.area} m²</span>
                            </div>
                            {needsFoundation && (
                                <div className="flex justify-between items-center py-2 border-b border-slate-800/50">
                                    <span className="text-slate-400">Trench & Concrete Foundation</span>
                                    <span className="font-bold">{results.foundationCost}</span>
                                </div>
                            )}
                            <div className="flex justify-between items-center py-2 border-b border-slate-800/50">
                                <span className="text-slate-400">Materials (Bricks/Blocks, Sand, Cement)</span>
                                <span className="font-bold">{results.materialCost}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-slate-800/50">
                                <span className="text-slate-400">Labour (est. {results.daysRequired} days)</span>
                                <span className="font-bold">{results.labourCost}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 text-slate-300 pt-4">
                                <span>Subtotal</span>
                                <span>{results.subtotal}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 text-slate-300">
                                <span>VAT (20%)</span>
                                <span>{results.vat}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
