"use client";

import React, { useState, useRef } from "react";
import { Download, Baby, Info, UserRound, ArrowRight } from "lucide-react";

import jsPDF from "jspdf";

export function PregnancyBmiCalculator() {
    const [preWeight, setPreWeight] = useState<string>("65");
    const [currentWeight, setCurrentWeight] = useState<string>("70");
    const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");

    const [height, setHeight] = useState<string>("165");
    const [heightUnit, setHeightUnit] = useState<"cm" | "in">("cm");

    const [weeksPregnant, setWeeksPregnant] = useState<string>("20");

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const calculateBMI = (w: number, h: number, wUnit: string, hUnit: string) => {
        let weightKg = w;
        if (wUnit === "lbs") weightKg = w * 0.453592;

        let heightM = h / 100;
        if (hUnit === "in") heightM = h * 0.0254;

        if (heightM <= 0) return 0;
        return weightKg / (heightM * heightM);
    };

    const getGuideline = (preBmi: number) => {
        if (preBmi < 18.5) return { category: "Underweight", gainKg: "12.5 - 18 kg", gainLbs: "28 - 40 lbs" };
        if (preBmi >= 18.5 && preBmi <= 24.9) return { category: "Normal Weight", gainKg: "11.5 - 16 kg", gainLbs: "25 - 35 lbs" };
        if (preBmi >= 25 && preBmi <= 29.9) return { category: "Overweight", gainKg: "7 - 11.5 kg", gainLbs: "15 - 25 lbs" };
        return { category: "Obese", gainKg: "5 - 9 kg", gainLbs: "11 - 20 lbs" };
    };

    const processResults = () => {
        const pWeight = parseFloat(preWeight);
        const cWeight = parseFloat(currentWeight);
        const h = parseFloat(height);

        if (!pWeight || !cWeight || !h) return null;

        const preBmi = calculateBMI(pWeight, h, weightUnit, heightUnit);
        const currentBmi = calculateBMI(cWeight, h, weightUnit, heightUnit);

        const guideline = getGuideline(preBmi);

        let weightGain = cWeight - pWeight;
        const gainStr = `${weightGain.toFixed(1)} ${weightUnit}`;

        return {
            preBmi: preBmi.toFixed(1),
            currentBmi: currentBmi.toFixed(1),
            guideline,
            gainStr,
            weightGain
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
            pdf.text("Pregnancy BMI & Weight Gain Report", 15, 20);
            
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
            pdf.save("pregnancy-bmi-report.pdf");
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
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-500/10 dark:bg-pink-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-center mb-8 relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <Baby className="w-6 h-6 text-pink-500" />
                    Pregnancy Details
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
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Pre-Pregnancy Weight</label>
                    <div className="flex">
                        <input
                            type="number"
                            value={preWeight}
                            onChange={(e) => setPreWeight(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-l-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500/20"
                        />
                        <select
                            value={weightUnit}
                            onChange={(e) => setWeightUnit(e.target.value as "kg" | "lbs")}
                            className="bg-slate-100 dark:bg-slate-800 border-y border-r border-slate-200 dark:border-slate-800 rounded-r-xl px-4 font-bold text-slate-700 dark:text-slate-300 outline-none"
                        >
                            <option value="kg">kg</option>
                            <option value="lbs">lbs</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Current Weight</label>
                    <div className="flex">
                        <input
                            type="number"
                            value={currentWeight}
                            onChange={(e) => setCurrentWeight(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-l-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500/20"
                        />
                        <div className="bg-slate-100 dark:bg-slate-800 border-y border-r border-slate-200 dark:border-slate-800 rounded-r-xl px-4 flex items-center font-bold text-slate-700 dark:text-slate-300">
                            {weightUnit}
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Height</label>
                    <div className="flex">
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-l-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500/20"
                        />
                        <select
                            value={heightUnit}
                            onChange={(e) => setHeightUnit(e.target.value as "cm" | "in")}
                            className="bg-slate-100 dark:bg-slate-800 border-y border-r border-slate-200 dark:border-slate-800 rounded-r-xl px-4 font-bold text-slate-700 dark:text-slate-300 outline-none"
                        >
                            <option value="cm">cm</option>
                            <option value="in">inches</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Weeks Pregnant <span className="text-slate-400 font-normal">(Optional)</span></label>
                    <input
                        type="number"
                        value={weeksPregnant}
                        onChange={(e) => setWeeksPregnant(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500/20"
                    />
                </div>
            </div>

            {results && (
                <div className="mt-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 relative z-10">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                        <Info className="w-4 h-4" /> Recommended Weight Gain
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                            <span className="block text-sm text-slate-500 mb-1">Pre-Pregnancy BMI</span>
                            <span className="text-4xl font-black text-slate-900 dark:text-white">{results.preBmi}</span>
                            <span className="block mt-2 text-sm font-semibold text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/30 px-3 py-1 rounded-lg inline-block">
                                {results.guideline.category}
                            </span>
                        </div>

                        <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                            <span className="block text-sm text-slate-500 mb-1">Total Target Weight Gain</span>
                            <span className="text-3xl font-black text-slate-900 dark:text-white">
                                {weightUnit === "kg" ? results.guideline.gainKg : results.guideline.gainLbs}
                            </span>
                            <span className="block mt-2 text-sm text-slate-600 dark:text-slate-400">
                                Recommended for entire pregnancy based on your starting BMI.
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col md:flex-row items-center gap-4 bg-pink-50 dark:bg-pink-900/10 p-5 rounded-xl border border-pink-100 dark:border-pink-900/30">
                        <div className="flex-1">
                            <span className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Current Weight Gain</span>
                            <span className="text-2xl font-black text-pink-600 dark:text-pink-400">
                                {results.weightGain > 0 ? "+" : ""}{results.gainStr}
                            </span>
                        </div>
                        <div className="hidden md:block">
                            <ArrowRight className="text-pink-300" />
                        </div>
                        <div className="flex-1 text-sm text-slate-600 dark:text-slate-400">
                            You are at <strong>Week {weeksPregnant || "X"}</strong>. Most weight is typically gained in the 2nd and 3rd trimesters. Consult your midwife regarding your personal trajectory.
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
