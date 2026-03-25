"use client";

import React, { useState, useRef } from "react";
import { Download, Car, Info, Receipt } from "lucide-react";

import jsPDF from "jspdf";

export function UsedCarTaxCalculator() {
    const [regDate, setRegDate] = useState<string>("post2017");
    const [fuelType, setFuelType] = useState<string>("petrol_diesel"); // For post 2017

    // For 2001 - 2017 cars based on CO2
    const [co2Band, setCo2Band] = useState<string>("B"); // E.g. 101-110

    // For Pre 2001 based on engine size
    const [engineSize, setEngineSize] = useState<string>("under1549");

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const processResults = () => {
        let annualRate = 0;
        let note = "";

        if (regDate === "post2017") {
            // Flat rates after Year 1 (which we assume for used cars)
            if (fuelType === "petrol_diesel") {
                annualRate = 190;
                note = "Standard flat rate for petrol/diesel cars registered after 1 April 2017. Surcharges apply if the car's list price was over £40k (£410 extra for 5 years).";
            } else if (fuelType === "hybrid") {
                annualRate = 180;
                note = "Standard flat rate for alternative fuel/hybrid cars registered after 1 April 2017. Surcharges apply if original list price > £40k.";
            } else if (fuelType === "electric") {
                annualRate = 0; // Soon to change in 2025, but currently 0 for zero emission
                note = "Zero Emission EVs currently pay £0 VED. Note: This is scheduled to change from April 2025 where EVs will start paying standard rates.";
            }
        } else if (regDate === "2001_2017") {
            // Rough approximation of common 2001-2017 VED bands based on CO2
            // A (up to 100) = £0
            // B (101-110) = £20
            // C (111-120) = £35
            // D-E (121-140) = ~£150-180
            // F-G (141-165) = ~£200-240
            // High (166+) = £300+

            switch (co2Band) {
                case "A": annualRate = 0; note = "Band A (Up to 100g/km CO2): £0. Often small city cars or early hybrids."; break;
                case "B": annualRate = 20; note = "Band B (101-110g/km CO2): £20."; break;
                case "C": annualRate = 35; note = "Band C (111-120g/km CO2): £35. Very common for efficient hatchbacks."; break;
                case "D": annualRate = 150; note = "Band D/E (121-140g/km CO2): Typical rate is roughly £150-£180 depending on exact output."; break;
                case "F": annualRate = 240; note = "Band F/G (141-165g/km CO2): Typical rate is roughly £200-£240. Often larger family cars / estates."; break;
                case "H": annualRate = 385; note = "Band H+ (166g/km+ CO2): High polluter rates range from £300 to £695+ for performance cars/SUVs."; break;
            }
        } else if (regDate === "pre2001") {
            if (engineSize === "under1549") {
                annualRate = 200; // Approx standard
                note = "Engine size strictly not over 1549cc registered before 1 March 2001.";
            } else {
                annualRate = 325; // Approx standard
                note = "Engine size over 1549cc registered before 1 March 2001.";
            }
        }

        return {
            annualRate: annualRate.toLocaleString(),
            sixMonth: Math.round(annualRate * 0.55).toLocaleString(), // DVLA ~10% surcharge for 6 months roughly, formula varies but let's approximate
            monthly: (annualRate * 1.05 / 12).toFixed(2), // 5% surcharge for Direct Debit monthly
            note
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
            pdf.text("Used Car Tax Estimate Report", 15, 20);
            
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
            pdf.save("used-car-tax-report.pdf");
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
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-center mb-8 relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <Receipt className="w-6 h-6 text-purple-500" />
                    VED Estimator
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

            <div className="space-y-6 relative z-10 border-b border-slate-200 dark:border-slate-800 pb-8 mb-8">
                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">When was the car registered?</label>
                    <select value={regDate} onChange={(e) => setRegDate(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer">
                        <option value="post2017">On or after 1 April 2017 (Flat Rate System)</option>
                        <option value="2001_2017">Between 1 March 2001 & 31 March 2017 (CO2 System)</option>
                        <option value="pre2001">Before 1 March 2001 (Engine Size System)</option>
                    </select>
                </div>

                {regDate === "post2017" && (
                    <div className="animate-in fade-in slide-in-from-top-2">
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Fuel Type</label>
                        <select value={fuelType} onChange={(e) => setFuelType(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer">
                            <option value="petrol_diesel">Petrol or Diesel</option>
                            <option value="hybrid">Alternative Fuel (Hybrid, Bioethanol, LPG)</option>
                            <option value="electric">Fully Electric (Zero Emission)</option>
                        </select>
                    </div>
                )}

                {regDate === "2001_2017" && (
                    <div className="animate-in fade-in slide-in-from-top-2">
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Official CO2 Emissions (g/km)</label>
                        <select value={co2Band} onChange={(e) => setCo2Band(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer">
                            <option value="A">Up to 100g/km (Band A - E.g. Free Tax Eco Cars)</option>
                            <option value="B">101 to 110g/km (Band B)</option>
                            <option value="C">111 to 120g/km (Band C)</option>
                            <option value="D">121 to 140g/km (Band D & E)</option>
                            <option value="F">141 to 165g/km (Band F & G)</option>
                            <option value="H">Over 165g/km (High polluting performance/SUVs)</option>
                        </select>
                    </div>
                )}

                {regDate === "pre2001" && (
                    <div className="animate-in fade-in slide-in-from-top-2">
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Engine Capacity (cc)</label>
                        <select value={engineSize} onChange={(e) => setEngineSize(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer">
                            <option value="under1549">1549cc or under</option>
                            <option value="over1549">Over 1549cc</option>
                        </select>
                    </div>
                )}
            </div>

            {results && (
                <div className="mt-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 relative z-10">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-8 rounded-2xl text-center mb-8 border border-purple-200 dark:border-purple-800/50">
                        <span className="block text-purple-800 dark:text-purple-300 font-bold mb-2 uppercase tracking-wide text-sm">
                            Estimated Annual Road Tax
                        </span>
                        <span className="text-6xl md:text-7xl font-black text-purple-600 dark:text-purple-500">£{results.annualRate}</span>
                        <span className="block mt-1 font-medium text-purple-700/80 dark:text-purple-400/80 italic">/ 12 months</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center text-sm">
                            <span className="font-bold text-slate-600 dark:text-slate-400">Monthly DD Cost:</span>
                            <span className="font-black text-slate-900 dark:text-white">~£{results.monthly}</span>
                        </div>
                        <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center text-sm">
                            <span className="font-bold text-slate-600 dark:text-slate-400">6 Month Upfront:</span>
                            <span className="font-black text-slate-900 dark:text-white">~£{results.sixMonth}</span>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <Info className="w-5 h-5 flex-shrink-0 text-purple-500 mt-0.5" />
                        <p>{results.note}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
