"use client";

import React, { useState, useRef } from "react";
import { Download, Waves, Activity, Timer } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function SwimmingCalorieCalculator() {
    const [weight, setWeight] = useState<string>("70");
    const [duration, setDuration] = useState<string>("45"); // minutes
    const [stroke, setStroke] = useState<string>("5.8"); // Default freestyle light/mod

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const processResults = () => {
        const w = parseFloat(weight);
        const mins = parseInt(duration);
        const met = parseFloat(stroke);

        if (isNaN(w) || isNaN(mins) || isNaN(met)) return null;

        // Calories burned = MET x Weight(kg) x Time(hours)
        const hours = mins / 60;
        const calories = met * w * hours;

        // Find stroke name
        let strokeName = "Swimming";
        switch (stroke) {
            case "5.8": strokeName = "Freestyle (Light/Moderate)"; break;
            case "9.8": strokeName = "Freestyle (Vigorous/Fast)"; break;
            case "4.8": strokeName = "Backstroke"; break;
            case "5.3": strokeName = "Breaststroke"; break;
            case "13.8": strokeName = "Butterfly"; break;
            case "3.5": strokeName = "Treading Water (Moderate)"; break;
            case "9.8_water_jog": strokeName = "Water Jogging/Aerobics (Vigorous)"; break;
        }

        return {
            calories: Math.round(calories).toLocaleString(),
            strokeName
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
            pdf.text("Swimming Calorie Report", 15, 15);
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 15, 22);
            pdf.addImage(imgData, "PNG", 15, 30, pdfWidth - 30, pdfHeight - 30);
            pdf.save("swimming-calorie-report.pdf");
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
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-center mb-8 relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <Waves className="w-6 h-6 text-cyan-500" />
                    Pool Calculator
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
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Weight (kg)</label>
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500/20" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Time in Pool (Minutes)</label>
                    <div className="relative">
                        <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 pr-12 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500/20" />
                        <Timer className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    </div>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Stroke / Swimming Style</label>
                    <select value={stroke} onChange={(e) => setStroke(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500/20 cursor-pointer">
                        <option value="5.8">Freestyle / Front Crawl (Light to Moderate Effort)</option>
                        <option value="9.8">Freestyle / Front Crawl (Vigorous / Fast Pace)</option>
                        <option value="5.3">Breaststroke</option>
                        <option value="4.8">Backstroke</option>
                        <option value="13.8">Butterfly</option>
                        <option value="3.5">Treading Water (Moderate / Relaxed)</option>
                        <option value="9.8_water_jog">Water Jogging / Vigorous Aquaerobics</option>
                    </select>
                </div>
            </div>

            {results && (
                <div className="mt-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 relative z-10">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                        <Activity className="w-4 h-4" /> Workout Summary
                    </h3>

                    <div className="bg-cyan-500 dark:bg-cyan-600 p-8 rounded-2xl text-center shadow-lg shadow-cyan-500/20 mb-8 border border-cyan-400 dark:border-cyan-500">
                        <span className="block text-cyan-100 font-bold mb-2 uppercase tracking-wide text-sm flex justify-center items-center gap-2">
                            Estimated Calories Burned
                        </span>
                        <span className="text-6xl md:text-7xl font-black text-white">{results.calories}</span>
                        <span className="block mt-1 font-medium text-cyan-100/90 italic">kcal</span>
                    </div>

                    <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4">
                        <div>
                            <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase block mb-1">Activity Profile</span>
                            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                {results.strokeName} for {duration} minutes
                            </span>
                        </div>
                        <div className="hidden sm:block h-10 w-px bg-slate-200 dark:bg-slate-800"></div>
                        <div>
                            <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase block mb-1">Body Weight</span>
                            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                {weight} kg
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
