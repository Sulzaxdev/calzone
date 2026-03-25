"use client";

import React, { useState, useRef } from "react";
import { Calculator, Download, Info, CheckCircle2, FileText, Flame, PoundSterling } from "lucide-react";

import jsPDF from "jspdf";

export default function GasBillCalculator() {
    const [previousRead, setPreviousRead] = useState<number>(0);
    const [currentRead, setCurrentRead] = useState<number>(0);
    const [meterType, setMeterType] = useState<"metric" | "imperial">("metric"); // metric = m3, imperial = ft3
    const [unitRate, setUnitRate] = useState<number>(6.04); // pence per kWh
    const [standingCharge, setStandingCharge] = useState<number>(29.60); // pence per day
    const [days, setDays] = useState<number>(31);

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    // Calculate UK Gas 
    // metric: units * 1.02264 (volume correction) * 39.5 (calorific value) / 3.6 (conversion to kWh)
    const unitsUsed = Math.max(0, currentRead - previousRead);

    let kwh = 0;
    if (meterType === "metric") {
        kwh = (unitsUsed * 1.02264 * 39.5) / 3.6;
    } else {
        kwh = (unitsUsed * 2.83 * 1.02264 * 39.5) / 3.6;
    }

    const usageCostPence = kwh * unitRate;
    const standingCostPence = days * standingCharge;
    const totalPence = usageCostPence + standingCostPence;

    const vatPence = totalPence * 0.05; // 5% VAT on domestic energy
    const finalBillPounds = (totalPence + vatPence) / 100;

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(val);
    };

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
            pdf.text("UK Gas Bill Estimate", 15, 20);
            
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
            pdf.save("Gas-Bill-Estimate.pdf");
        } catch (err) {
            console.error("Failed to export", err);
        } finally {
            if (exportButton) exportButton.style.opacity = '1';
            setIsExporting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
            <div className="h-20 bg-white dark:bg-slate-950"></div>

            {/* Hero Section */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-sm font-semibold mb-6">
                        <Flame className="w-4 h-4" />
                        Home Finance Toolkit
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        UK Gas Bill Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Convert your meter readings into kWh and calculate exactly what your next gas bill should be, including 5% VAT and daily standing charges.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Col: Calculator App */}
                <div className="lg:col-span-7">
                    <div
                        ref={calculatorRef}
                        className="bg-white dark:bg-slate-950 rounded-[2rem] p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 dark:border-slate-800 overflow-hidden relative"
                    >
                        <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="flex justify-between items-center mb-8 relative z-10">
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Enter Readings
                            </h2>
                            <button
                                onClick={exportPDF}
                                disabled={isExporting}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
                            >
                                {isExporting ? (
                                    <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent shrink-0 rounded-full animate-spin"></div>
                                ) : (
                                    <Download className="w-4 h-4" />
                                )}
                                Export
                            </button>
                        </div>

                        <div className="space-y-6 relative z-10">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                        Previous Reading
                                    </label>
                                    <input
                                        type="number"
                                        value={previousRead || ""}
                                        onChange={(e) => setPreviousRead(Number(e.target.value))}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 px-4 text-xl font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                        Current Reading
                                    </label>
                                    <input
                                        type="number"
                                        value={currentRead || ""}
                                        onChange={(e) => setCurrentRead(Number(e.target.value))}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 px-4 text-xl font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                    Meter Type
                                </label>
                                <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
                                    <button
                                        onClick={() => setMeterType("metric")}
                                        className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${meterType === "metric" ? "bg-white dark:bg-slate-700 text-orange-600 dark:text-orange-400 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
                                    >
                                        Metric (M³)
                                    </button>
                                    <button
                                        onClick={() => setMeterType("imperial")}
                                        className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${meterType === "imperial" ? "bg-white dark:bg-slate-700 text-orange-600 dark:text-orange-400 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
                                    >
                                        Imperial (ft³)
                                    </button>
                                </div>
                                <p className="text-xs text-slate-500 mt-2 indent-1">If your meter has 4 main digits, it is likely Imperial. If it has 5, it is likely Metric.</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                        Unit Rate (pence/kWh)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={unitRate}
                                        onChange={(e) => setUnitRate(Number(e.target.value))}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                        Standing Charge (p/day)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={standingCharge}
                                        onChange={(e) => setStandingCharge(Number(e.target.value))}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                    Billing Period (Days)
                                </label>
                                <input
                                    type="number"
                                    value={days}
                                    onChange={(e) => setDays(Number(e.target.value))}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                                />
                            </div>
                        </div>

                        {/* Results Panel */}
                        <div className="mt-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 relative z-10">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                                <PoundSterling className="w-4 h-4" />
                                Bill Summary
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800">
                                    <span className="text-slate-600 dark:text-slate-400 font-medium">Estimated kWh Used</span>
                                    <span className="font-bold text-slate-900 dark:text-white">
                                        {kwh.toFixed(2)} kWh
                                    </span>
                                </div>

                                <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800">
                                    <span className="text-slate-600 dark:text-slate-400 font-medium">Gas Used Cost</span>
                                    <span className="font-bold text-slate-900 dark:text-white">
                                        £{(usageCostPence / 100).toFixed(2)}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800">
                                    <span className="text-slate-600 dark:text-slate-400 font-medium">Standing Charge Total</span>
                                    <span className="font-bold text-slate-900 dark:text-white">
                                        £{(standingCostPence / 100).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800 text-slate-500">
                                    <span className="font-medium">VAT (5%)</span>
                                    <span className="font-bold">
                                        £{(vatPence / 100).toFixed(2)}
                                    </span>
                                </div>

                                <div className="flex flex-col pt-2 gap-4">
                                    <span className="block text-slate-800 dark:text-slate-200 font-black text-xl">Estimated Total Bill:</span>
                                    <div className="text-left bg-orange-50 dark:bg-orange-900/20 p-6 rounded-2xl border border-orange-100 dark:border-orange-900/50">
                                        <span className="block font-black text-orange-600 dark:text-orange-400 text-3xl sm:text-4xl">
                                            {formatCurrency(finalBillPounds)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Col: SEO Highlights Sidebar */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white dark:bg-slate-950 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-4 dark:text-white">
                            <Info className="w-5 h-5 text-orange-500" /> Gas Bill Factors
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Metric vs Imperial</p>
                                    <p className="text-xs text-slate-500 mt-1">Older imperial meters measure in cubic feet, whilst new metric ones use cubic meters. The conversion calculation varies heavily between them.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Calorific Value</p>
                                    <p className="text-xs text-slate-500 mt-1">This figure (usually between 37.5 - 43.0) reflects the heating power of the gas supplied to your area.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">VAT</p>
                                    <p className="text-xs text-slate-500 mt-1">Domestic energy in the UK is subject to a reduced VAT rate of 5%, not the standard 20%.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* --- SEO Deep Content Section --- */}
            <div className="container mx-auto px-4 max-w-4xl mt-24">
                <article className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400">
                    <h2>How to Calculate Your UK Gas Bill Manually</h2>
                    <p>
                        Unlike electricity, which is metered directly in kilowatt-hours (kWh) — the unit you are billed for — gas meters measure volume. To figure out how much you owe, you have to convert the volume of gas your meter recorded (in either cubic meters or cubic feet) into kWh.
                    </p>

                    <h3>The UK Standard Gas Conversion Formula</h3>
                    <p>
                        The formula used by energy companies can look daunting. Here is exactly what is happening in the background of our calculator:
                    </p>
                    <ol>
                        <li><strong>Find the volume:</strong> Subtract your previous reading from your current reading.</li>
                        <li><strong>Convert Imperial (If Applicable):</strong> If you have an older meter measuring in hundreds of cubic feet (ft³), you must multiply the volume by 2.83 to convert it to cubic meters (m³).</li>
                        <li><strong>Volume Correction Factor:</strong> Multiply by 1.02264 (This accounts for temperature and pressure changes).</li>
                        <li><strong>Calorific Value:</strong> Multiply by your local calorific value (usually ~39.5). This represents the energy density of the gas.</li>
                        <li><strong>Convert to kWh:</strong> Divide the final number by 3.6.</li>
                    </ol>

                    <h3>What Are Standing Charges?</h3>
                    <p>
                        Your standing charge is a fixed daily cost that you pay regardless of whether you use any gas at all. It covers the cost of maintaining the pipes, running the national grid, and meter maintenance. Therefore, your total bill is your <code>(Total kWh * Unit Rate) + (Days in Billing Period * Daily Standing Charge)</code>.
                    </p>

                    <h3>Why is my bill an estimate?</h3>
                    <p>
                        Your supplier will use exact decimal figures for the Calorific Value specific to your region on the exact day. Our calculator uses the UK national average of 39.5 to give you an extremely accurate estimate, but the final penny amount may differ slightly from your official bill.
                    </p>
                </article>
            </div>
        </div>
    );
}
