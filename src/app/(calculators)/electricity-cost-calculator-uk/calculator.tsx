"use client";

import React, { useState, useRef } from "react";
import { Download, Plug, Lightbulb, Zap } from "lucide-react";

import jsPDF from "jspdf";

export function ElectricityCostCalculator() {
    const [power, setPower] = useState<string>("2000"); // Watts
    const [usageHours, setUsageHours] = useState<string>("2"); // Hours per day
    const [pricePerKwh, setPricePerKwh] = useState<string>("24.5"); // pence
    const [powerUnit, setPowerUnit] = useState<"W" | "kW">("W");

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const processResults = () => {
        const p = parseFloat(power);
        const h = parseFloat(usageHours);
        const cost = parseFloat(pricePerKwh);

        if (isNaN(p) || isNaN(h) || isNaN(cost)) return null;

        // Convert power to kW
        const kw = powerUnit === "W" ? p / 1000 : p;

        // Energy per day in kWh
        const dailyKwh = kw * h;

        // Cost per day in pence
        const dailyCostPence = dailyKwh * cost;
        const dailyCostPounds = dailyCostPence / 100;

        const monthlyCostPounds = dailyCostPounds * 30.416; // Average days in month
        const yearlyCostPounds = dailyCostPounds * 365;

        return {
            daily: dailyCostPounds.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 2 }),
            monthly: monthlyCostPounds.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 2 }),
            yearly: yearlyCostPounds.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 2 }),
            kwhPerDay: dailyKwh.toFixed(2),
            kwhPerYear: (dailyKwh * 365).toFixed(0)
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
            pdf.text("Appliance Electricity Cost Report", 15, 20);
            
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
            pdf.save("electricity-cost-report.pdf");
        } catch (err) {
            console.error("Failed to export", err);
        } finally {
            if (exportButton) exportButton.style.opacity = '1';
            setIsExporting(false);
        }
    };

    // Quick presets
    const setPreset = (w: string, h: string) => {
        setPower(w);
        setPowerUnit("W");
        setUsageHours(h);
    };

    return (
        <div
            ref={calculatorRef}
            className="bg-white dark:bg-slate-950 rounded-[2rem] p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 dark:border-slate-800 relative overflow-hidden"
        >
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-yellow-500/10 dark:bg-yellow-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-center mb-8 relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <Plug className="w-6 h-6 text-yellow-500" />
                    Appliance Cost
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

            {/* Presets */}
            <div className="mb-8 relative z-10">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Quick Presets</h3>
                <div className="flex flex-wrap gap-2">
                    <button onClick={() => setPreset("2000", "0.5")} className="px-3 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 hover:text-yellow-700 dark:hover:text-yellow-400 rounded-lg transition-colors border border-transparent hover:border-yellow-200 dark:hover:border-yellow-800">Boiler (Kettle)</button>
                    <button onClick={() => setPreset("2500", "1")} className="px-3 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 hover:text-yellow-700 dark:hover:text-yellow-400 rounded-lg transition-colors border border-transparent hover:border-yellow-200 dark:hover:border-yellow-800">Tumble Dryer</button>
                    <button onClick={() => setPreset("150", "6")} className="px-3 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 hover:text-yellow-700 dark:hover:text-yellow-400 rounded-lg transition-colors border border-transparent hover:border-yellow-200 dark:hover:border-yellow-800">Large TV</button>
                    <button onClick={() => setPreset("2000", "3")} className="px-3 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 hover:text-yellow-700 dark:hover:text-yellow-400 rounded-lg transition-colors border border-transparent hover:border-yellow-200 dark:hover:border-yellow-800">Electric Heater</button>
                    <button onClick={() => setPreset("10", "8")} className="px-3 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 hover:text-yellow-700 dark:hover:text-yellow-400 rounded-lg transition-colors border border-transparent hover:border-yellow-200 dark:hover:border-yellow-800">LED Lightbulb</button>
                    <button onClick={() => setPreset("300", "24")} className="px-3 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 hover:text-yellow-700 dark:hover:text-yellow-400 rounded-lg transition-colors border border-transparent hover:border-yellow-200 dark:hover:border-yellow-800">Fridge Freezer</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div className="md:col-span-2 text-center text-sm font-bold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400">Current UK Price Cap (approx):</span> <span className="text-yellow-600 dark:text-yellow-500">24.5p per kWh</span>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Appliance Power Rating</label>
                    <div className="flex gap-2">
                        <input type="number" value={power} onChange={(e) => setPower(e.target.value)} className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/20" />
                        <select value={powerUnit} onChange={(e) => setPowerUnit(e.target.value as "W" | "kW")} className="w-24 bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-3 px-4 font-bold text-slate-700 dark:text-slate-300 outline-none">
                            <option value="W">Watts</option>
                            <option value="kW">kW</option>
                        </select>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Check the sticker on your appliance (e.g. 2000W)</p>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Time Used Per Day (Hours)</label>
                    <input type="number" step="0.5" value={usageHours} onChange={(e) => setUsageHours(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/20" />
                </div>

                <div className="md:col-span-2 border-t border-slate-200 dark:border-slate-800 pt-6">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Your Electricity Tariff (pence per kWh)</label>
                    <div className="relative max-w-sm">
                        <input type="number" step="0.1" value={pricePerKwh} onChange={(e) => setPricePerKwh(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pr-12 pl-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/20" />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">p</span>
                    </div>
                </div>
            </div>

            {results && (
                <div className="mt-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 relative z-10">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" /> Estimated Running Cost
                    </h3>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-8 rounded-2xl text-center mb-8 border border-yellow-200 dark:border-yellow-800/50">
                        <span className="block text-yellow-800 dark:text-yellow-300 font-bold mb-2 uppercase tracking-wide text-sm">
                            Monthly Cost on Bill
                        </span>
                        <span className="text-6xl md:text-7xl font-black text-yellow-600 dark:text-yellow-500">{results.monthly}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center text-sm">
                            <span className="font-bold text-slate-600 dark:text-slate-400">Daily Cost:</span>
                            <span className="font-black text-slate-900 dark:text-white">{results.daily}</span>
                        </div>
                        <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center text-sm">
                            <span className="font-bold text-slate-600 dark:text-slate-400">Yearly Cost:</span>
                            <span className="font-black text-slate-900 dark:text-white">{results.yearly}</span>
                        </div>
                    </div>

                    <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                        <Zap className="w-5 h-5 flex-shrink-0 text-slate-400" />
                        <p>This appliance consumes roughly <strong>{results.kwhPerDay} kWh</strong> per day, adding up to <strong>{results.kwhPerYear} kWh</strong> added to your annual energy statement.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
