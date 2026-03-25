"use client";

import React, { useState, useRef } from "react";
import { Download, Bone, Dog, Activity } from "lucide-react";

import jsPDF from "jspdf";

export function DogCalorieCalculator() {
    const [weight, setWeight] = useState<string>("15");
    const [activityLevel, setActivityLevel] = useState<string>("1.6"); // Neutered normal

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const processResults = () => {
        const w = parseFloat(weight);
        const mult = parseFloat(activityLevel);

        if (isNaN(w) || isNaN(mult) || w <= 0) return null;

        // Resting Energy Requirement (RER)
        // RER = 70 * (body weight in kg)^0.75
        const rer = 70 * Math.pow(w, 0.75);

        // Daily Energy Requirement (DER) / Maintenance Energy Requirement (MER)
        const der = rer * mult;

        return {
            rer: Math.round(rer),
            der: Math.round(der),
            weightStr: w.toString()
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
            pdf.text("Dog Calorie Report", 15, 20);
            
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
            pdf.save("dog-calorie-report.pdf");
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
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-center mb-8 relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <Dog className="w-6 h-6 text-amber-500" />
                    Dog Energy Needs
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
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Dog's Weight (kg)</label>
                    <input type="number" step="0.5" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500/20" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Life Stage & Activity</label>
                    <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500/20">
                        <option value="1.0">Weight Loss Goal / Prone to Obesity</option>
                        <option value="1.2">Senior Dog / Inactive Adult</option>
                        <option value="1.6">Typical Neutered/Spayed Adult</option>
                        <option value="1.8">Typical Intact Adult</option>
                        <option value="2.0">Light Working Dog / Very Active</option>
                        <option value="3.0">Growing Puppy (4 - 12 Months)</option>
                        <option value="4.0">Working/Racing Dog (Heavy duty)</option>
                    </select>
                </div>
            </div>

            {results && (
                <div className="mt-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 relative z-10">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                        <Activity className="w-4 h-4" /> Nutrition Guidelines
                    </h3>

                    <div className="bg-amber-100 dark:bg-amber-900/30 p-8 rounded-2xl text-center mb-8 border border-amber-200 dark:border-amber-800/50">
                        <span className="block text-amber-800 dark:text-amber-300 font-bold mb-2 uppercase tracking-wide text-sm flex justify-center items-center gap-2">
                            <Bone className="w-4 h-4" /> Recommended Daily Calories
                        </span>
                        <span className="text-6xl md:text-7xl font-black text-amber-600 dark:text-amber-500">{results.der}</span>
                        <span className="block mt-1 font-medium text-amber-700/80 dark:text-amber-400/80 italic">kcal / day</span>
                    </div>

                    <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4">
                        <div>
                            <span className="text-slate-600 dark:text-slate-400 font-bold block mb-1">Resting Energy Requirement (RER):</span>
                            <span className="text-sm text-slate-500 max-w-sm block flex-1">
                                A {results.weightStr}kg dog burns <strong>{results.rer} kcal</strong> simply resting all day (like human BMR).
                            </span>
                        </div>
                        <div className="text-2xl font-black text-slate-900 dark:text-white px-4 border-l border-slate-200 dark:border-slate-800 hidden sm:block">
                            {results.rer}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
