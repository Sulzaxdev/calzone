"use client";

import React, { useState, useRef } from "react";
import { Download, Bath, Droplets, PaintRoller } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function SmallBathroomRenovationCostCalculator() {
    const [bathroomSize, setBathroomSize] = useState<"very_small" | "standard">("standard"); // very_small ~2sqm, standard ~4sqm
    const [quality, setQuality] = useState<"budget" | "mid" | "luxury">("mid");
    const [tilingLevel, setTilingLevel] = useState<"partial" | "full">("partial");
    const [newPlumbing, setNewPlumbing] = useState<boolean>(false); // moving pipes around

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const processResults = () => {
        // Base area assumptions
        const floorArea = bathroomSize === "very_small" ? 2.5 : 4.5;
        const wallArea = bathroomSize === "very_small" ? 12 : 18; // rough estimate of wall surface

        // Material Costs (Suite: Toilet, Basin, Bath/Shower)
        let suiteCost = 0;
        switch (quality) {
            case "budget": suiteCost = 400; break;
            case "mid": suiteCost = 1000; break;
            case "luxury": suiteCost = 2500; break;
        }

        // Tiling Costs (Materials + Labour)
        let tileMaterialPricePsm = quality === "budget" ? 20 : quality === "mid" ? 40 : 80;
        let tilingArea = tilingLevel === "full" ? wallArea + floorArea : (wallArea / 2) + floorArea;

        let tilingMaterialCost = tilingArea * tileMaterialPricePsm;
        let tilerLabourCost = tilingArea * 60; // Approx £60 per sqm for laying tiles
        let tilingTotal = tilingMaterialCost + tilerLabourCost;

        // Plumbing & General Labour
        // Typical bathroom refit takes about 5-8 days for a single plumber/fitter
        let fitterDays = bathroomSize === "very_small" ? 5 : 6;
        if (newPlumbing) fitterDays += 2; // Rerouting pipes takes longer
        if (tilingLevel === "full") fitterDays += 1;

        const dailyFitterRate = 250;
        let plumbingLabourTotal = fitterDays * dailyFitterRate;

        // Strip out / Skip hire / Waste
        const wasteRemoval = 300;

        // Extras (Radiator/Towel rail, lighting, extractor fan, building materials)
        let extrasMaterials = quality === "budget" ? 300 : quality === "mid" ? 500 : 1000;
        let electricianCost = 250; // Usually half a day for spot lights/extractor

        const totalCost = suiteCost + tilingTotal + plumbingLabourTotal + wasteRemoval + extrasMaterials + electricianCost;

        // Vat assumption (if using VAT registered company, else ignore. For standard trade, let's assume +20%)
        const vat = totalCost * 0.2;
        const estimatedTotal = totalCost + vat;

        return {
            suiteCost: suiteCost.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            tilingTotal: tilingTotal.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            labourTotal: (plumbingLabourTotal + electricianCost).toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            wasteAndExtras: (wasteRemoval + extrasMaterials).toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            subtotal: totalCost.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            vat: vat.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            estimatedTotal: estimatedTotal.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            fitterDays
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
            pdf.text("Bathroom Renovation Estimate", 15, 15);
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 15, 22);
            pdf.addImage(imgData, "PNG", 15, 30, pdfWidth - 30, pdfHeight - 30);
            pdf.save("bathroom-renovation-report.pdf");
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
            <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -translate-x-1/3 -translate-y-1/3"></div>

            <div className="flex justify-between items-center mb-10 relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <Bath className="w-6 h-6 text-cyan-500" />
                    Bathroom Specifications
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
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Space Size</label>
                        <select value={bathroomSize} onChange={(e) => setBathroomSize(e.target.value as any)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500/20">
                            <option value="very_small">Very Small / En-suite (~2.5 m²)</option>
                            <option value="standard">Standard Small Bathroom (~4.5 m²)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Suite Quality & Fittings</label>
                        <div className="grid grid-cols-1 gap-2">
                            <button onClick={() => setQuality("budget")} className={`p-3 rounded-xl border text-left transition-all ${quality === "budget" ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/10" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"}`}>
                                <span className="block font-bold text-slate-900 dark:text-white text-sm">Budget Grade</span>
                                <span className="text-xs text-slate-500">Basic white suite from DIY stores, budget brassware.</span>
                            </button>
                            <button onClick={() => setQuality("mid")} className={`p-3 rounded-xl border text-left transition-all ${quality === "mid" ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/10" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"}`}>
                                <span className="block font-bold text-slate-900 dark:text-white text-sm">Mid-Range (Standard)</span>
                                <span className="text-xs text-slate-500">Branded sanitaryware, better taps, good quality shower.</span>
                            </button>
                            <button onClick={() => setQuality("luxury")} className={`p-3 rounded-xl border text-left transition-all ${quality === "luxury" ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/10" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"}`}>
                                <span className="block font-bold text-slate-900 dark:text-white text-sm">Luxury / Designer</span>
                                <span className="text-xs text-slate-500">Wall-hung toilet, rainfall shower, designer tiles, underfloor heating.</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Tiling Extent</label>
                        <select value={tilingLevel} onChange={(e) => setTilingLevel(e.target.value as any)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500/20">
                            <option value="partial">Wet Areas Only (Half-tiled / Painted walls)</option>
                            <option value="full">Floor to Ceiling Tiling (Fully tiled)</option>
                        </select>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
                        <label className="flex flex-col gap-1 cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${newPlumbing ? "bg-cyan-500 border-cyan-500" : "border-slate-300 dark:border-slate-700"}`}>
                                    {newPlumbing && <span className="text-white text-xs font-bold">✓</span>}
                                </div>
                                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">Rerouting Plumbing Layout</span>
                            </div>
                            <span className="text-xs text-slate-500 pl-8">Check this if you are moving the toilet, sink, or shower to a different wall. Leaves require lifting floorboards to alter pipework.</span>
                            <button className="hidden" onClick={() => setNewPlumbing(!newPlumbing)}></button>
                        </label>
                    </div>
                </div>
            </div>

            {results && (
                <div className="mt-10 bg-cyan-50 dark:bg-cyan-900/10 rounded-2xl p-6 sm:p-8 border border-cyan-100 dark:border-cyan-800/50 relative z-10">
                    <div className="text-center mb-8">
                        <span className="block text-cyan-800 dark:text-cyan-300 font-bold mb-2 uppercase tracking-wide text-sm">
                            Total Refit Estimate
                        </span>
                        <span className="text-5xl md:text-6xl font-black text-cyan-600 dark:text-cyan-500">
                            {results.estimatedTotal}
                        </span>
                        <span className="block mt-2 font-medium text-cyan-700 dark:text-cyan-400">
                            Incl. VAT & Skip Hire
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-cyan-100 dark:border-cyan-900/50">
                            <h4 className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200 mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
                                <Droplets className="w-4 h-4 text-cyan-500" /> Material Costs
                            </h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between"><span className="text-slate-500">Bathroom Suite</span><span className="font-medium text-slate-900 dark:text-white">{results.suiteCost}</span></div>
                                <div className="flex justify-between"><span className="text-slate-500">Tiles & Adhesives</span><span className="font-medium text-slate-900 dark:text-white">{results.tilingTotal}</span></div>
                                <div className="flex justify-between"><span className="text-slate-500">Misc Materials/Skip</span><span className="font-medium text-slate-900 dark:text-white">{results.wasteAndExtras}</span></div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-cyan-100 dark:border-cyan-900/50">
                            <h4 className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200 mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
                                <PaintRoller className="w-4 h-4 text-cyan-500" /> Labour Costs
                            </h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between"><span className="text-slate-500">Plumber/Electrician</span><span className="font-medium text-slate-900 dark:text-white">{results.labourTotal}</span></div>
                                <div className="flex justify-between"><span className="text-slate-500">Estimated Duration</span><span className="font-medium text-slate-900 dark:text-white">{results.fitterDays} Days</span></div>
                                <div className="flex justify-between text-cyan-600 dark:text-cyan-400 pt-2 font-bold"><span className="">Subtotal Excl VAT</span><span className="">{results.subtotal}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
