"use client";

import React, { useState, useRef } from "react";
import { Download, Baby, Milk, Activity } from "lucide-react";

import jsPDF from "jspdf";

export function BreastfeedingCalorieCalculator() {
    const [age, setAge] = useState<string>("30");
    const [weight, setWeight] = useState<string>("70");
    const [height, setHeight] = useState<string>("165");
    const [activityMultiplier, setActivityMultiplier] = useState<string>("1.375"); // Light
    const [nursingType, setNursingType] = useState<string>("exclusive_0_6");

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const processResults = () => {
        const a = parseInt(age);
        const w = parseFloat(weight);
        const h = parseFloat(height);
        const act = parseFloat(activityMultiplier);

        if (isNaN(a) || isNaN(w) || isNaN(h) || isNaN(act)) return null;

        // Mifflin-St Jeor Equation for Women
        const bmr = 10 * w + 6.25 * h - 5 * a - 161;

        // TDEE (Maintenance Calories before nursing)
        const baseTdee = Math.round(bmr * act);

        // Nursing Calorie Costs (NHS / general pediatric guidelines)
        // Exclusive (0-6 months): ~500 kcal
        // Partial/Supplementing (0-6 months): ~250-300 kcal
        // Exclusive/Main source (6-12 months): ~400 kcal
        // Partial (6-12 months): ~200 kcal

        let nursingCost = 0;
        let nursingLabel = "";

        switch (nursingType) {
            case "exclusive_0_6":
                nursingCost = 500;
                nursingLabel = "Exclusive Breastfeeding (0-6 months)";
                break;
            case "partial_0_6":
                nursingCost = 250;
                nursingLabel = "Partial Breastfeeding / Combination (0-6 months)";
                break;
            case "exclusive_6_12":
                nursingCost = 400;
                nursingLabel = "Breastfeeding + Starting Solids (6-12 months)";
                break;
            case "toddler":
                nursingCost = 200;
                nursingLabel = "Nursing a Toddler (1 year+)";
                break;
            case "twins":
                nursingCost = 1000;
                nursingLabel = "Nursing Twins";
                break;
            default:
                nursingCost = 500;
        }

        const totalCalories = baseTdee + nursingCost;

        // Weight loss scenario (-500 from total, but shouldn't drop below 1500-1800 while nursing)
        const weightLossCals = Math.max(1800, totalCalories - 500);

        return {
            baseTdee: baseTdee.toLocaleString(),
            nursingCost: nursingCost.toLocaleString(),
            nursingLabel,
            maintenance: totalCalories.toLocaleString(),
            weightLoss: weightLossCals.toLocaleString()
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
            pdf.text("Breastfeeding Calorie Report", 15, 20);
            
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
            pdf.save("breastfeeding-calorie-report.pdf");
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
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-500/10 dark:bg-pink-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-center mb-8 relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <Baby className="w-6 h-6 text-pink-500" />
                    Nursing Calories
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
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Age</label>
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500/20" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Weight (kg) post-partum</label>
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500/20" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Height (cm)</label>
                    <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500/20" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Your Activity Level</label>
                    <select value={activityMultiplier} onChange={(e) => setActivityMultiplier(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500/20">
                        <option value="1.2">Sedentary (Little to no exercise)</option>
                        <option value="1.375">Lightly Active (Caring for baby + light walks)</option>
                        <option value="1.55">Moderately Active (Pram walks + 3 workouts/week)</option>
                        <option value="1.725">Very Active (Daily workouts)</option>
                    </select>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Breastfeeding Frequency & Stage</label>
                    <select value={nursingType} onChange={(e) => setNursingType(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500/20">
                        <option value="exclusive_0_6">Exclusive Breastfeeding / Pumping (0-6 Months)</option>
                        <option value="partial_0_6">Combination Feeding: Formula + Breastmilk (0-6 Months)</option>
                        <option value="exclusive_6_12">Breastfeeding + Starting Solid Foods (6-12 Months)</option>
                        <option value="toddler">Nursing an Older Baby/Toddler (1 Year +)</option>
                        <option value="twins">Exclusive Breastfeeding Multiples (Twins)</option>
                    </select>
                </div>
            </div>

            {results && (
                <div className="mt-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 relative z-10">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                        <Activity className="w-4 h-4" /> Recommended Caloric Intake
                    </h3>

                    <div className="bg-pink-100 dark:bg-pink-900/30 p-8 rounded-2xl text-center mb-8 border border-pink-200 dark:border-pink-800/50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4">
                            <Milk className="w-16 h-16 text-pink-200 dark:text-pink-800/20 rotate-12" />
                        </div>

                        <span className="block text-pink-800 dark:text-pink-300 font-bold mb-2 uppercase tracking-wide text-sm relative z-10">
                            Daily Calories to Maintain Supply & Weight
                        </span>
                        <span className="text-6xl md:text-7xl font-black text-pink-600 dark:text-pink-500 relative z-10">{results.maintenance}</span>
                        <span className="block mt-1 font-medium text-pink-700/80 dark:text-pink-400/80 italic relative z-10">kcal / day</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                            <span className="block text-slate-500 dark:text-slate-400 text-xs font-bold uppercase mb-1">Your Base Burn</span>
                            <span className="text-2xl font-black text-slate-900 dark:text-white">{results.baseTdee} <span className="text-sm font-normal text-slate-500">kcal</span></span>
                        </div>
                        <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                            <span className="block text-slate-500 dark:text-slate-400 text-xs font-bold uppercase mb-1">Cost of Producing Milk</span>
                            <span className="text-2xl font-black text-pink-600 dark:text-pink-500">+{results.nursingCost} <span className="text-sm font-normal text-slate-500">kcal</span></span>
                        </div>
                    </div>

                    <div className="mt-8 bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <span className="block text-slate-800 dark:text-slate-200 font-bold mb-2">Want to lose the "baby weight" safely?</span>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                            Doctors recommend waiting until your milk supply is fully established (usually 6-8 weeks postpartum) before attempting a caloric deficit.
                        </p>
                        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex justify-between items-center text-sm font-medium">
                            <span className="text-slate-600 dark:text-slate-400">Safe Weight Loss Target:</span>
                            <span className="text-lg font-bold text-slate-900 dark:text-white">{results.weightLoss} kcal/day</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
