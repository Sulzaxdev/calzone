"use client";

import React, { useState, useRef } from "react";
import { Download, ClipboardCheck, Home, Ruler } from "lucide-react";

import jsPDF from "jspdf";

export function HouseSurveyCostCalculator() {
    const [propertyValue, setPropertyValue] = useState<string>("350000");
    const [bedrooms, setBedrooms] = useState<string>("3");
    const [surveyType, setSurveyType] = useState<"level1" | "level2" | "level3">("level2");
    const [propertyAge, setPropertyAge] = useState<"newbuild" | "pre2000" | "pre1950" | "pre1900">("pre2000");

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const processResults = () => {
        const val = parseFloat(propertyValue);
        const beds = parseInt(bedrooms);

        if (isNaN(val) || isNaN(beds) || val <= 0 || beds <= 0) return null;

        // Base price depending on survey type
        let basePrice = 0;
        switch (surveyType) {
            case "level1":
                basePrice = 250;
                break;
            case "level2":
                basePrice = 400;
                break;
            case "level3":
                basePrice = 700;
                break;
        }

        // Additions based on property value (higher value = higher liability logic)
        let valueModifier = 0;
        if (val > 250000) valueModifier += 50;
        if (val > 500000) valueModifier += 100;
        if (val > 750000) valueModifier += 150;
        if (val > 1000000) valueModifier += 250;
        if (val > 2000000) valueModifier += 500;

        // Additions based on bedrooms
        let bedModifier = (beds - 1) * 30; // e.g., 3 beds = +£60

        // Additions based on age (older properties require more thorough checks)
        let ageModifier = 0;
        if (propertyAge === "pre2000") ageModifier += 30;
        if (propertyAge === "pre1950") ageModifier += 80;
        if (propertyAge === "pre1900") ageModifier += 150;

        // Note: Level 1 on pre-1900 doesn't make much sense, often surveyors charge more or refuse
        if (surveyType === "level1" && propertyAge === "pre1900") {
            ageModifier += 50; // Extra penalisation if they force it
        }

        const totalCost = basePrice + valueModifier + bedModifier + ageModifier;
        const totalInclVat = totalCost * 1.2;

        return {
            basePrice: basePrice.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            complexityAdditions: (valueModifier + bedModifier + ageModifier).toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            subtotal: totalCost.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            vat: (totalCost * 0.2).toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            estimatedTotal: totalInclVat.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
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
            pdf.text("House Survey Cost Estimate", 15, 20);
            
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
            pdf.save("house-survey-cost-report.pdf");
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
                    <ClipboardCheck className="w-6 h-6 text-green-500" />
                    Property Details
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Estimated Property Value</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">£</span>
                            <input type="number" step="5000" value={propertyValue} onChange={(e) => setPropertyValue(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-8 pr-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-green-500/20" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Number of Bedrooms</label>
                        <div className="relative">
                            <input type="number" min="1" max="15" step="1" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-green-500/20" />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Property Age</label>
                    <select value={propertyAge} onChange={(e) => setPropertyAge(e.target.value as any)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-green-500/20">
                        <option value="newbuild">New Build (Post 2010)</option>
                        <option value="pre2000">Modern (1950 - 2010)</option>
                        <option value="pre1950">Pre-War (1900 - 1950)</option>
                        <option value="pre1900">Period Property (Pre 1900)</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Survey Type Required</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <button onClick={() => setSurveyType("level1")} className={`p-4 rounded-xl border text-left transition-all ${surveyType === "level1" ? "border-green-500 bg-green-50 dark:bg-green-900/10" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"}`}>
                            <span className="block font-bold text-slate-900 dark:text-white mb-1">Level 1: Condition</span>
                            <span className="text-xs text-slate-500 leading-tight block">Basic traffic light rating. For standard, new-ish properties.</span>
                        </button>
                        <button onClick={() => setSurveyType("level2")} className={`p-4 rounded-xl border text-left transition-all ${surveyType === "level2" ? "border-green-500 bg-green-50 dark:bg-green-900/10" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"}`}>
                            <span className="block font-bold text-slate-900 dark:text-white mb-1">Level 2: Homebuyer</span>
                            <span className="text-xs text-slate-500 leading-tight block">Most common. Covers visible issues, damp, and condition.</span>
                        </button>
                        <button onClick={() => setSurveyType("level3")} className={`p-4 rounded-xl border text-left transition-all ${surveyType === "level3" ? "border-green-500 bg-green-50 dark:bg-green-900/10" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"}`}>
                            <span className="block font-bold text-slate-900 dark:text-white mb-1">Level 3: Building</span>
                            <span className="text-xs text-slate-500 leading-tight block">Comprehensive structural survey. Vital for old/run-down homes.</span>
                        </button>
                    </div>
                </div>
            </div>

            {results && (
                <div className="mt-8 bg-green-50 flex flex-col items-center justify-center dark:bg-green-900/10 rounded-2xl p-6 sm:p-8 border border-green-100 dark:border-green-800/50 relative z-10 text-center">
                    <span className="block text-green-800 dark:text-green-300 font-bold mb-2 uppercase tracking-wide text-sm">
                        Estimated Survey Cost
                    </span>
                    <span className="text-5xl md:text-6xl font-black text-green-600 dark:text-green-500 mb-4 block">
                        {results.estimatedTotal}
                    </span>
                    <span className="inline-block mt-2 font-medium text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-4 py-1.5 rounded-full text-sm">
                        Includes VAT
                    </span>

                    <div className="w-full grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-green-200 dark:border-green-800/50 text-sm text-left">
                        <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-green-100 dark:border-green-900/50 flex flex-col">
                            <span className="text-slate-500 font-bold text-xs uppercase mb-1">Base Price (Level)</span>
                            <span className="font-bold text-slate-800 dark:text-slate-200">{results.basePrice}</span>
                        </div>
                        <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-green-100 dark:border-green-900/50 flex flex-col">
                            <span className="text-slate-500 font-bold text-xs uppercase mb-1">Size/Value Additions</span>
                            <span className="font-bold text-slate-800 dark:text-slate-200">{results.complexityAdditions}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
