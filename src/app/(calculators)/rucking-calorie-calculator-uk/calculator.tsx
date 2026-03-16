"use client";

import React, { useState, useRef } from "react";
import { Download, Mountain, Activity, Backpack } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function RuckingCalorieCalculator() {
    const [bodyWeight, setBodyWeight] = useState<string>("80");
    const [packWeight, setPackWeight] = useState<string>("15");
    const [distance, setDistance] = useState<string>("5");
    const [unit, setUnit] = useState<"km" | "miles">("km");
    const [terrain, setTerrain] = useState<string>("flat");

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const processResults = () => {
        const bw = parseFloat(bodyWeight);
        const pw = parseFloat(packWeight);
        const dist = parseFloat(distance);

        if (isNaN(bw) || isNaN(pw) || isNaN(dist)) return null;

        // Convert distance to km for standard calculation
        const distKm = unit === "miles" ? dist * 1.60934 : dist;
        const totalWeight = bw + pw;

        // Simplified Calorie Burn for Rucking formula: 
        // ~ 0.75 to 1.1 kcal per kg of total body+pack weight per kilometer depending on terrain

        // Base multiplier per total kg per km
        // Flat pavement/track = 0.75
        // Grass/Dirt = 0.85
        // Hills/Mountains = 1.1

        let terrainMultiplier = 0.75;
        if (terrain === "dirt") terrainMultiplier = 0.85;
        if (terrain === "hills") terrainMultiplier = 1.1;

        const calories = totalWeight * distKm * terrainMultiplier;

        // Reference: Without pack (just body weight) on flat
        const caloriesWithoutPack = bw * distKm * 0.75;
        const extraBecauseOfPack = calories - caloriesWithoutPack;

        return {
            calories: Math.round(calories).toLocaleString(),
            basewalking: Math.round(caloriesWithoutPack).toLocaleString(),
            bonus: Math.round(extraBecauseOfPack).toLocaleString(),
            totalKg: totalWeight,
            distUnits: dist
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
            pdf.text("Rucking Calorie Report", 15, 20);
            
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 15, 28);
            
            pdf.setDrawColor(226, 232, 240);
            pdf.line(15, 32, pdfWidth - 15, 32);

            pdf.addImage(imgData, "PNG", 15, 40, pdfWidth - 30, (canvas.height * (pdfWidth - 30)) / canvas.width);
            pdf.save("rucking-calorie-report.pdf");
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
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-500/10 dark:bg-green-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-center mb-8 relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <Backpack className="w-6 h-6 text-green-500" />
                    Ruck Calorie Output
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Your Body Weight (kg)</label>
                    <input type="number" value={bodyWeight} onChange={(e) => setBodyWeight(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-green-500/20" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Backpack/Ruck Weight (kg)</label>
                    <input type="number" value={packWeight} onChange={(e) => setPackWeight(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-green-500/20" />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Distance Rucked</label>
                    <div className="flex gap-2">
                        <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-green-500/20" />
                        <select value={unit} onChange={(e) => setUnit(e.target.value as "km" | `miles`)} className="w-28 bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-3 px-4 font-bold text-slate-700 dark:text-slate-300 outline-none">
                            <option value="km">km</option>
                            <option value="miles">miles</option>
                        </select>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Terrain Type</label>
                    <select value={terrain} onChange={(e) => setTerrain(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-green-500/20 cursor-pointer">
                        <option value="flat">Standard Pavement / Tarmac / Flat Park</option>
                        <option value="dirt">Dirt Trails / Grass / Sand (Higher resistance)</option>
                        <option value="hills">Significant Hills / Mountain Terrain</option>
                    </select>
                </div>
            </div>

            {results && (
                <div className="mt-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 relative z-10">
                    <div className="bg-green-600 dark:bg-green-700 p-8 rounded-2xl text-center shadow-lg shadow-green-500/20 mb-8 border border-green-500 dark:border-green-600">
                        <span className="block text-green-100 font-bold mb-2 uppercase tracking-wide text-sm flex justify-center items-center gap-2">
                            <Activity className="w-4 h-4" /> Total Calories Burned
                        </span>
                        <span className="text-6xl md:text-7xl font-black text-white">{results.calories}</span>
                        <span className="block mt-1 font-medium text-green-100/90 italic">kcal</span>
                    </div>

                    <div className="space-y-3">
                        <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center text-sm">
                            <span className="font-bold text-slate-600 dark:text-slate-400">Walking Normally (No Pack):</span>
                            <span className="font-black text-slate-900 dark:text-white">~{results.basewalking} kcal</span>
                        </div>
                        <div className="bg-slate-100 dark:bg-slate-900/80 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center text-sm">
                            <span className="font-bold text-slate-600 dark:text-slate-400">Bonus Burn from {packWeight}kg Ruck:</span>
                            <span className="font-black text-green-600 dark:text-green-400">+{results.bonus} kcal</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
