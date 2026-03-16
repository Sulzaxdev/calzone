"use client";

import React, { useState, useRef } from "react";
import { Download, Dumbbell, Activity, Utensils } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function CalorieGainCalculator() {
    const [age, setAge] = useState<string>("25");
    const [gender, setGender] = useState<"male" | "female">("male");
    const [weight, setWeight] = useState<string>("70");
    const [height, setHeight] = useState<string>("175");
    const [activityMultiplier, setActivityMultiplier] = useState<string>("1.55"); // Moderate
    const [gainGoal, setGainGoal] = useState<string>("500"); // Kcal surplus

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const processResults = () => {
        const a = parseInt(age);
        const w = parseFloat(weight);
        const h = parseFloat(height);
        const act = parseFloat(activityMultiplier);
        const surplus = parseInt(gainGoal);

        if (isNaN(a) || isNaN(w) || isNaN(h) || isNaN(act)) return null;

        // Mifflin-St Jeor Equation for BMR
        let bmr = 0;
        if (gender === "male") {
            bmr = 10 * w + 6.25 * h - 5 * a + 5;
        } else {
            bmr = 10 * w + 6.25 * h - 5 * a - 161;
        }

        // TDEE (Maintenance Calories)
        const tdee = Math.round(bmr * act);

        // Bulk / Gain Calories
        const targetCalories = tdee + surplus;

        // Simple Macros for Bulking (Roughly: Protein 2.2g/kg (or ~25%), Fat 25%, Carbs 50%)
        // 1g Protein = 4 kcal, 1g Carbs = 4 kcal, 1g Fat = 9 kcal
        const proteinCals = targetCalories * 0.25;
        const fatCals = targetCalories * 0.25;
        const carbsCals = targetCalories * 0.50;

        const proteinGrams = Math.round(proteinCals / 4);
        const fatGrams = Math.round(fatCals / 9);
        const carbsGrams = Math.round(carbsCals / 4);

        return {
            bmr: Math.round(bmr).toLocaleString(),
            maintenance: tdee.toLocaleString(),
            target: targetCalories.toLocaleString(),
            macros: {
                protein: proteinGrams,
                fat: fatGrams,
                carbs: carbsGrams
            }
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
            pdf.text("Weight Gain Calorie Report", 15, 20);
            
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 15, 28);
            
            pdf.setDrawColor(226, 232, 240);
            pdf.line(15, 32, pdfWidth - 15, 32);

            pdf.addImage(imgData, "PNG", 15, 40, pdfWidth - 30, (canvas.height * (pdfWidth - 30)) / canvas.width);
            pdf.save("weight-gain-calorie-report.pdf");
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
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-center mb-8 relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <Dumbbell className="w-6 h-6 text-orange-500" />
                    Bulking Calculator
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
                        <label className={`cursor-pointer rounded-xl border-2 p-3 text-center font-bold transition-all ${gender === "male" ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-500"}`}>
                            <input type="radio" name="gender" value="male" checked={gender === "male"} onChange={() => setGender("male")} className="hidden" /> Male
                        </label>
                        <label className={`cursor-pointer rounded-xl border-2 p-3 text-center font-bold transition-all ${gender === "female" ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-500"}`}>
                            <input type="radio" name="gender" value="female" checked={gender === "female"} onChange={() => setGender("female")} className="hidden" /> Female
                        </label>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Age</label>
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500/20" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Weight (kg)</label>
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500/20" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Height (cm)</label>
                    <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500/20" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Daily Activity Level</label>
                    <select value={activityMultiplier} onChange={(e) => setActivityMultiplier(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500/20">
                        <option value="1.2">Sedentary (Office job, no exercise)</option>
                        <option value="1.375">Light Activity (Exercise 1-3 days/week)</option>
                        <option value="1.55">Moderate Activity (Exercise 3-5 days/week)</option>
                        <option value="1.725">Very Active (Exercise 6-7 days/week)</option>
                        <option value="1.9">Extra Active (Physical job + training)</option>
                    </select>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Weight Gain Speed (Surplus)</label>
                    <select value={gainGoal} onChange={(e) => setGainGoal(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500/20">
                        <option value="250">Lean Bulk (+250 kcal/day) ~ 0.25kg gain/week</option>
                        <option value="500">Standard Bulk (+500 kcal/day) ~ 0.5kg gain/week</option>
                        <option value="750">Aggressive Bulk (+750 kcal/day) ~ 0.75kg gain/week</option>
                        <option value="1000">Dirty Bulk (+1000 kcal/day) ~ 1kg gain/week</option>
                    </select>
                </div>
            </div>

            {results && (
                <div className="mt-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 relative z-10">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                        <Activity className="w-4 h-4" /> Nutrition Targets
                    </h3>

                    <div className="bg-orange-600 dark:bg-orange-500 p-8 rounded-2xl text-white text-center shadow-lg shadow-orange-500/20 mb-8 border border-orange-500 dark:border-orange-400">
                        <span className="block text-orange-200 font-bold mb-2 uppercase tracking-wide text-sm">Daily Target Calories</span>
                        <span className="text-6xl md:text-7xl font-black">{results.target}</span>
                        <span className="block mt-1 font-medium text-orange-100 italic">kcal / day</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
                            <span className="block text-slate-500 dark:text-slate-400 text-sm font-bold mb-1">Protein (25%)</span>
                            <span className="text-2xl font-black text-slate-900 dark:text-white">{results.macros.protein}g</span>
                        </div>
                        <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
                            <span className="block text-slate-500 dark:text-slate-400 text-sm font-bold mb-1">Fats (25%)</span>
                            <span className="text-2xl font-black text-slate-900 dark:text-white">{results.macros.fat}g</span>
                        </div>
                        <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
                            <span className="block text-slate-500 dark:text-slate-400 text-sm font-bold mb-1">Carbs (50%)</span>
                            <span className="text-2xl font-black text-slate-900 dark:text-white">{results.macros.carbs}g</span>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-orange-50 dark:bg-orange-900/10 p-5 rounded-xl border border-orange-100 dark:border-orange-900/30">
                        <div className="text-slate-600 dark:text-slate-400 text-sm">
                            <Utensils className="w-4 h-4 inline-block mr-2" />
                            <strong>Maintenance Calories (TDEE):</strong> The number of calories to stay the same weight is <strong>{results.maintenance} kcal</strong>.
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
