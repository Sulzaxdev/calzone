"use client";

import React, { useState, useRef } from "react";
import { Download, Trees, Ruler, Hammer, Layers } from "lucide-react";

import jsPDF from "jspdf";

export function DeckingCostCalculator() {
    const [length, setLength] = useState<string>("4");
    const [width, setWidth] = useState<string>("3");
    const [material, setMaterial] = useState<"softwood" | "hardwood" | "composite">("softwood");
    const [foundation, setFoundation] = useState<"ground" | "raised">("ground");
    const [needsBalustrade, setNeedsBalustrade] = useState<boolean>(false);

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const processResults = () => {
        const l = parseFloat(length);
        const w = parseFloat(width);

        if (isNaN(l) || isNaN(w) || l <= 0 || w <= 0) return null;

        const areaSqm = l * w;
        const perimeter = 2 * (l + w); // Roughly for balustrades minus the house joining side

        // Calculate Materials Per Sqm
        // Softwood usually ~£25-£30 / m2 for boards.
        // Hardwood usually ~£60-£90 / m2.
        // Composite usually ~£50-£80 / m2.
        let boardCostPerSqm = 0;
        switch (material) {
            case "softwood": boardCostPerSqm = 28; break;
            case "composite": boardCostPerSqm = 65; break;
            case "hardwood": boardCostPerSqm = 85; break;
        }

        // Subframe costs (treated timber joists, weed membrane, screws, supports)
        // Ground level is cheaper: ~£15 / m2
        // Raised is more expensive (thicker posts, concrete postcrete, heavier joists): ~£35 / m2
        const subframeCostPerSqm = foundation === "ground" ? 18 : 38;

        const totalMaterialsCost = areaSqm * (boardCostPerSqm + subframeCostPerSqm);

        // Balustrade/Handrail (calculated per linear metre along 3 sides assuming 1 side touches house)
        // Treated timber spindles roughly £45 per linear metre
        const exposedPerimeter = l + (w * 2); // Approximation: front length, plus two side widths
        let balustradeCost = 0;
        if (needsBalustrade) {
            balustradeCost = exposedPerimeter * 50;
        }

        // Add 10% wastage to all materials
        const finalMaterialsCost = (totalMaterialsCost + balustradeCost) * 1.1;

        // Labour (Carpenter / Landscaper)
        // A pro can usually lay the subframe and board a standard 12sqm ground deck in 2 days.
        // Raised decks take 50% longer due to digging post holes.
        // Rate: ~£250/day
        const dailyRate = 250;
        let daysRequired = Math.ceil(areaSqm / 6); // roughly 6m2 per day for full build (frame + boards)
        if (foundation === "raised") daysRequired = Math.ceil(daysRequired * 1.5);
        if (needsBalustrade) daysRequired += 1; // Spindles take ages to fit securely

        daysRequired = Math.max(2, daysRequired); // Minimum 2 days for any deck
        const totalLabourCost = daysRequired * dailyRate;

        // Skip hire for waste / digging spoil
        const wasteDisposal = foundation === "raised" ? 280 : 150;

        const subtotal = finalMaterialsCost + totalLabourCost + wasteDisposal;
        const vat = subtotal * 0.2; // Assuming VAT registered builder for accuracy
        const totalInclVat = subtotal + vat;

        return {
            area: areaSqm.toFixed(1),
            materialsCost: finalMaterialsCost.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            labourCost: totalLabourCost.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            daysRequired,
            waste: wasteDisposal.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            subtotal: subtotal.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            vat: vat.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            estimatedTotal: totalInclVat.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            costPerSqm: (totalInclVat / areaSqm).toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 })
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
            pdf.text("Decking Cost Report", 15, 20);
            
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
            pdf.save("decking-cost-report.pdf");
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
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 dark:bg-green-500/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

            <div className="flex justify-between items-center mb-10 relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <Trees className="w-6 h-6 text-green-500" />
                    Decking Requirements
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
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2"><Ruler className="w-4 h-4" /> Dimensions (Metres)</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Length (m)</label>
                                <input type="number" step="0.5" value={length} onChange={(e) => setLength(e.target.value)} className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-green-500/20" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Width (m)</label>
                                <input type="number" step="0.5" value={width} onChange={(e) => setWidth(e.target.value)} className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-green-500/20" />
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 mt-4">Average UK garden deck is around 15m².</p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Structural Foundation</label>
                        <select value={foundation} onChange={(e) => setFoundation(e.target.value as any)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-green-500/20">
                            <option value="ground">Ground Level (Laid directly on flat lawn/patio)</option>
                            <option value="raised">Raised / Elevated (Requires deep timber posts & concrete)</option>
                        </select>
                        {foundation === "raised" && (
                            <p className="text-xs text-amber-600 dark:text-amber-500 font-bold mt-2 pt-1 border-t border-amber-200 dark:border-amber-900/50">Requires significantly more structural timber joists and deeper labour.</p>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Deck Board Material</label>
                        <div className="grid grid-cols-1 gap-2">
                            <button onClick={() => setMaterial("softwood")} className={`p-3 rounded-xl border text-left transition-all ${material === "softwood" ? "border-green-500 bg-green-50 dark:bg-green-900/10" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"}`}>
                                <span className="block font-bold text-slate-900 dark:text-white text-sm">Treated Softwood (Pine)</span>
                                <span className="text-xs text-slate-500">Most affordable. Requires annual oiling/staining or it will rot in ~10 years.</span>
                            </button>
                            <button onClick={() => setMaterial("composite")} className={`p-3 rounded-xl border text-left transition-all ${material === "composite" ? "border-green-500 bg-green-50 dark:bg-green-900/10" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"}`}>
                                <span className="block font-bold text-slate-900 dark:text-white text-sm">Composite (Wood/Plastic Mix)</span>
                                <span className="text-xs text-slate-500">Zero maintenance. Never rots, splinters, or needs painting. Premium modern look.</span>
                            </button>
                            <button onClick={() => setMaterial("hardwood")} className={`p-3 rounded-xl border text-left transition-all ${material === "hardwood" ? "border-green-500 bg-green-50 dark:bg-green-900/10" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"}`}>
                                <span className="block font-bold text-slate-900 dark:text-white text-sm">Natural Hardwood (Oak/Teak)</span>
                                <span className="text-xs text-slate-500">Extremely durable and beautiful natural grain. Very heavy and expensive to buy.</span>
                            </button>
                        </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
                        <label className="flex flex-col gap-1 cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${needsBalustrade ? "bg-green-500 border-green-500" : "border-slate-300 dark:border-slate-700"}`}>
                                    {needsBalustrade && <span className="text-white text-xs font-bold">✓</span>}
                                </div>
                                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">Add Handrails / Balustrades?</span>
                            </div>
                            <span className="text-xs text-slate-500 pl-8">Safety barrier around the perimeter. Required by law if raised over 600mm.</span>
                            <button className="hidden" onClick={() => setNeedsBalustrade(!needsBalustrade)}></button>
                        </label>
                    </div>
                </div>
            </div>

            {results && (
                <div className="mt-10 bg-green-50 dark:bg-green-900/10 rounded-2xl p-6 sm:p-8 border border-green-100 dark:border-green-800/50 relative z-10 overflow-hidden">
                    <div className="absolute -right-10 -bottom-10 opacity-5">
                        <Trees className="w-64 h-64 text-green-900" />
                    </div>

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <span className="block text-green-800 dark:text-green-300 font-bold mb-2 uppercase tracking-wide text-sm">
                                Total Decking Estimate
                            </span>
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-5xl font-black text-green-700 dark:text-green-500">{results.estimatedTotal}</span>
                            </div>
                            <span className="text-green-800 dark:text-green-400 font-medium text-sm">
                                Works out to approximately {results.costPerSqm} per m² fully fitted.
                            </span>

                            <div className="mt-8 space-y-4">
                                <div className="p-4 bg-white dark:bg-slate-950 rounded-xl border border-green-100 dark:border-green-900/50">
                                    <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 mb-1"><Layers className="w-4 h-4 text-green-600" /> Why {material}?</h4>
                                    <p className="text-xs text-slate-600 dark:text-slate-400">
                                        {material === "softwood" && "Cheap initially, but factor in the £50+ you'll spend every spring on decking oil and the weekend you'll lose scrubbing it."}
                                        {material === "composite" && "The smartest long-term investment. Pay £1,000 more today, save 20 hours of labour and hundreds in oil over the next decade."}
                                        {material === "hardwood" && "A luxury aesthetic that weathers into a beautiful silver-grey. Much tougher than pine, but pre-drilling holes slows the builder down."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 pt-6 md:pt-0 md:pl-6 md:border-l border-green-200 dark:border-green-800/50">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-green-200 dark:border-green-800/50 pb-2">Cost Breakdown</h4>

                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-600 dark:text-slate-400">Total Area</span>
                                <span className="font-bold text-slate-900 dark:text-white">{results.area} m²</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-600 dark:text-slate-400">Boards & Frame (incl wastage)</span>
                                <span className="font-bold text-slate-900 dark:text-white">{results.materialsCost}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-600 dark:text-slate-400">Carpenter Labour (~{results.daysRequired} days)</span>
                                <span className="font-bold text-slate-900 dark:text-white">{results.labourCost}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-600 dark:text-slate-400">Skip Hire / Postcrete Mix</span>
                                <span className="font-bold text-slate-900 dark:text-white">{results.waste}</span>
                            </div>

                            <div className="pt-4 border-t border-green-200 dark:border-green-800/50">
                                <div className="flex justify-between items-center text-sm mb-1">
                                    <span className="text-slate-500">Subtotal Excl. VAT</span>
                                    <span className="font-medium text-slate-700 dark:text-slate-300">{results.subtotal}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">VAT (20%)</span>
                                    <span className="font-medium text-slate-700 dark:text-slate-300">{results.vat}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
