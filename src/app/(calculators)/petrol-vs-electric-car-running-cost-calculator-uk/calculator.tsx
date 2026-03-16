"use client";

import React, { useState, useRef } from "react";
import { Download, Zap, Fuel, Activity } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function PetrolVsElectricCalculator() {
    const [annualMileage, setAnnualMileage] = useState<string>("10000");

    // Petrol
    const [petrolMpg, setPetrolMpg] = useState<string>("45");
    const [petrolPrice, setPetrolPrice] = useState<string>("1.45"); // £ per litre

    // EV
    const [evEconomy, setEvEconomy] = useState<string>("3.5"); // miles per kWh
    const [electricityPrice, setElectricityPrice] = useState<string>("24.5"); // pence per kWh
    const [chargingType, setChargingType] = useState<string>("home");

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const handleChargingTypeChange = (val: string) => {
        setChargingType(val);
        if (val === "home_standard") setElectricityPrice("24.5");
        else if (val === "home_ev_tariff") setElectricityPrice("7.0");
        else if (val === "public_fast") setElectricityPrice("50");
        else if (val === "public_ultra") setElectricityPrice("75");
    };

    const processResults = () => {
        const miles = parseFloat(annualMileage);
        const mpg = parseFloat(petrolMpg);
        const pPrice = parseFloat(petrolPrice);
        const evEcon = parseFloat(evEconomy);
        const ePrice = parseFloat(electricityPrice) / 100; // convert pence to £

        if (isNaN(miles) || isNaN(mpg) || isNaN(pPrice) || isNaN(evEcon) || isNaN(ePrice)) return null;
        if (mpg <= 0 || evEcon <= 0) return null;

        // UK Gallon = 4.54609 Litres
        // Petrol cost:
        const gallonsNeeded = miles / mpg;
        const litresNeeded = gallonsNeeded * 4.54609;
        const petrolCost = litresNeeded * pPrice;

        // EV cost:
        const kwhNeeded = miles / evEcon;
        const evCost = kwhNeeded * ePrice;

        const savings = Math.max(0, petrolCost - evCost);

        const isEvCheaper = evCost < petrolCost;

        return {
            petrolCost: petrolCost.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
            evCost: evCost.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
            savings: savings.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
            isEvCheaper,
            petrolPerMile: (petrolCost / miles * 100).toFixed(1), // pence
            evPerMile: (evCost / miles * 100).toFixed(1) // pence
        };
    };

    const results = processResults();

    const exportPDF = async () => {
        if (!calculatorRef.current) return;
        setIsExporting(true);

        const exportButton = calculatorRef.current.querySelector('button[onClick*="exportPDF"]');
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
            pdf.text("Petrol vs EV Running Cost Report", 15, 20);
            
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()} | CalZone.uk`, 15, 28);
            
            pdf.setDrawColor(226, 232, 240);
            pdf.line(15, 32, pdfWidth - 15, 32);

            pdf.addImage(imgData, "PNG", 15, 40, pdfWidth - 30, (canvas.height * (pdfWidth - 30)) / canvas.width);
            pdf.save("petrol-vs-ev-cost-report.pdf");
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
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-center mb-8 relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <Activity className="w-6 h-6 text-blue-500" />
                    Fuel Comparison
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

            <div className="mb-8 relative z-10">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Annual Mileage</label>
                <div className="relative max-w-xs">
                    <input type="number" value={annualMileage} onChange={(e) => setAnnualMileage(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-4 pr-16 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">miles</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 border-t border-slate-200 dark:border-slate-800 pt-8">

                {/* Petrol Side */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold mb-4">
                        <Fuel className="w-5 h-5 text-orange-500" /> Petrol / Diesel Car
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Fuel Economy (MPG)</label>
                        <input type="number" step="1" value={petrolMpg} onChange={(e) => setPetrolMpg(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 text-sm font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500/20" />
                        <p className="text-[10px] text-slate-500 mt-1">Average UK car is ~45 mpg</p>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Fuel Price (£ per Litre)</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">£</span>
                            <input type="number" step="0.01" value={petrolPrice} onChange={(e) => setPetrolPrice(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-7 pr-4 text-sm font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500/20" />
                        </div>
                    </div>
                </div>

                {/* EV Side */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold mb-4">
                        <Zap className="w-5 h-5 text-blue-500" /> Electric Car
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Efficiency (Miles per kWh)</label>
                        <input type="number" step="0.1" value={evEconomy} onChange={(e) => setEvEconomy(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 text-sm font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20" />
                        <p className="text-[10px] text-slate-500 mt-1">Average EV is ~3.5 miles/kWh</p>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Electricity Cost (pence per kWh)</label>
                        <select value={chargingType} onChange={(e) => handleChargingTypeChange(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 text-sm font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 mb-2 cursor-pointer">
                            <option value="custom">Custom Rate ({electricityPrice}p)</option>
                            <option value="home_standard">Home: Standard Cap (~24.5p)</option>
                            <option value="home_ev_tariff">Home: Smart EV Tariff (~7p off-peak)</option>
                            <option value="public_fast">Public: Lamppost / Fast (~50p)</option>
                            <option value="public_ultra">Public: Ultra-Rapid / Motorway (~75p)</option>
                        </select>
                        <div className="flex gap-2 items-center">
                            <input type="number" step="0.1" value={electricityPrice} onChange={(e) => { setElectricityPrice(e.target.value); setChargingType("custom"); }} className="w-24 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-2 px-3 text-sm font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20" />
                            <span className="text-sm font-bold text-slate-600 dark:text-slate-400">p/kWh</span>
                        </div>
                    </div>
                </div>

            </div>

            {results && (
                <div className="mt-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 relative z-10">
                    {results.isEvCheaper ? (
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-8 rounded-2xl text-center shadow-lg shadow-blue-500/10 mb-8 border border-blue-200 dark:border-blue-800/50">
                            <span className="block text-blue-800 dark:text-blue-300 font-bold mb-2 uppercase tracking-wide text-sm">
                                Annual Savings By Going Electric
                            </span>
                            <span className="text-6xl md:text-7xl font-black text-blue-600 dark:text-blue-500">£{results.savings}</span>
                            <span className="block mt-1 font-medium text-blue-700/80 dark:text-blue-400/80 italic">per {parseInt(annualMileage).toLocaleString()} miles</span>
                        </div>
                    ) : (
                        <div className="bg-orange-100 dark:bg-orange-900/30 p-8 rounded-2xl text-center shadow-lg shadow-orange-500/10 mb-8 border border-orange-200 dark:border-orange-800/50">
                            <span className="block text-orange-800 dark:text-orange-300 font-bold mb-2 uppercase tracking-wide text-sm">
                                Annual Extra Cost By Going Electric
                            </span>
                            <span className="text-6xl md:text-7xl font-black text-orange-600 dark:text-orange-500 text-center mx-auto">£{(parseFloat(results.evCost.replace(/,/g, '')) - parseFloat(results.petrolCost.replace(/,/g, ''))).toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                            <span className="mt-2 text-sm font-medium text-orange-700 dark:text-orange-300 bg-orange-200 dark:bg-orange-800/50 inline-block px-3 py-1 rounded-full">
                                Warning: Public charging is making EVs more expensive to run than petrol.
                            </span>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center">
                            <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase mb-2 flex items-center gap-1"><Fuel className="w-3 h-3" /> Annual Petrol Cost</span>
                            <span className="text-2xl font-black text-slate-900 dark:text-white">£{results.petrolCost}</span>
                            <span className="text-xs text-slate-400 font-semibold mt-1">{results.petrolPerMile}p per mile</span>
                        </div>
                        <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center border-b-4 border-b-blue-500">
                            <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase mb-2 flex items-center gap-1"><Zap className="w-3 h-3" /> Annual Electric Cost</span>
                            <span className="text-2xl font-black text-slate-900 dark:text-white">£{results.evCost}</span>
                            <span className="text-xs text-slate-400 font-semibold mt-1">{results.evPerMile}p per mile</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
