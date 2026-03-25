"use client";

import React, { useState, useRef } from "react";
import { Download, BedDouble, Heart, Activity } from "lucide-react";

import jsPDF from "jspdf";

export function RestingCalorieCalculator() {
    const [age, setAge] = useState<string>("30");
    const [gender, setGender] = useState<"male" | "female">("male");
    const [weight, setWeight] = useState<string>("75");
    const [height, setHeight] = useState<string>("180");
    const [formula, setFormula] = useState<"mifflin" | "harris">("mifflin");

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const processResults = () => {
        const a = parseInt(age);
        const w = parseFloat(weight);
        const h = parseFloat(height);

        if (isNaN(a) || isNaN(w) || isNaN(h)) return null;

        let bmr = 0;

        if (formula === "mifflin") {
            // Mifflin-St Jeor Equation
            if (gender === "male") {
                bmr = 10 * w + 6.25 * h - 5 * a + 5;
            } else {
                bmr = 10 * w + 6.25 * h - 5 * a - 161;
            }
        } else {
            // Revised Harris-Benedict Equation (Roza & Shizgal)
            if (gender === "male") {
                bmr = 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a);
            } else {
                bmr = 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a);
            }
        }

        // Just calculating Resting Metabolic Rate (BMR)
        // We can also show general TDEE benchmarks for context
        return {
            bmr: Math.round(bmr).toLocaleString(),
            bmrRaw: Math.round(bmr),
            sedentary: Math.round(bmr * 1.2).toLocaleString(),
            hourly: Math.round(bmr / 24)
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
            pdf.text("Resting Metabolic Rate Report", 15, 20);
            
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
            pdf.save("resting-calorie-report.pdf");
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
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-center mb-8 relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <BedDouble className="w-6 h-6 text-blue-500" />
                    Resting Calories (BMR)
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
                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Biological Sex</label>
                    <div className="grid grid-cols-2 gap-4">
                        <label className={`cursor-pointer rounded-xl border-2 p-3 text-center font-bold transition-all ${gender === "male" ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-500"}`}>
                            <input type="radio" name="gender" value="male" checked={gender === "male"} onChange={() => setGender("male")} className="hidden" /> Male
                        </label>
                        <label className={`cursor-pointer rounded-xl border-2 p-3 text-center font-bold transition-all ${gender === "female" ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-500"}`}>
                            <input type="radio" name="gender" value="female" checked={gender === "female"} onChange={() => setGender("female")} className="hidden" /> Female
                        </label>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Age</label>
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Weight (kg)</label>
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Height (cm)</label>
                    <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Calculation Formula</label>
                    <select value={formula} onChange={(e) => setFormula(e.target.value as "mifflin" | "harris")} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20">
                        <option value="mifflin">Mifflin-St Jeor (Most modern & accurate)</option>
                        <option value="harris">Harris-Benedict (Original 1919 / 1984)</option>
                    </select>
                </div>
            </div>

            {results && (
                <div className="mt-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 relative z-10">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                        <Heart className="w-4 h-4" /> Your Minimum Energy Needs
                    </h3>

                    <div className="bg-blue-600 dark:bg-blue-500 p-8 rounded-2xl text-white text-center shadow-lg shadow-blue-500/20 mb-6 border border-blue-500 dark:border-blue-400">
                        <span className="block text-blue-200 font-bold mb-2 uppercase tracking-wide text-sm">Resting Calories (BMR)</span>
                        <span className="text-6xl md:text-7xl font-black">{results.bmr}</span>
                        <span className="block mt-1 font-medium text-blue-100 italic">kcal / day</span>
                        <p className="mt-4 text-sm text-blue-100 opacity-90 max-w-sm mx-auto">
                            If you stayed in bed all day and did absolutely zero physical activity, your body would burn this just to keep you alive.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <span className="text-slate-600 dark:text-slate-400 font-bold">Hourly Burn Rate:</span>
                            <span className="text-xl font-black text-slate-900 dark:text-white">{results.hourly} kcal/hr</span>
                        </div>
                        <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <span className="text-slate-600 dark:text-slate-400 font-bold flex items-center gap-2">
                                <Activity className="w-4 h-4 text-emerald-500" />
                                Sedentary Total:
                            </span>
                            <span className="text-xl font-black text-slate-900 dark:text-white">{results.sedentary} kcal</span>
                        </div>
                    </div>
                    <p className="mt-4 text-xs text-slate-500 text-center">
                        *Sedentary Total (TDEE) assumes a basic office lifestyle with no intentional exercise (BMR × 1.2).
                    </p>
                </div>
            )}
        </div>
    );
}
