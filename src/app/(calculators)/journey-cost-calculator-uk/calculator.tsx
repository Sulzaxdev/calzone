"use client";

import React, { useState, useRef } from "react";
import { Download, MapPin, Fuel, Coins } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function JourneyCostCalculator() {
    const [distance, setDistance] = useState<string>("150");
    const [fuelEfficiency, setFuelEfficiency] = useState<string>("45"); // mpg
    const [fuelPrice, setFuelPrice] = useState<string>("1.45"); // £ per litre
    const [isReturnTrip, setIsReturnTrip] = useState<boolean>(true);
    const [passengers, setPassengers] = useState<string>("1");

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const processResults = () => {
        const d = parseFloat(distance);
        const eff = parseFloat(fuelEfficiency);
        const price = parseFloat(fuelPrice);
        const pass = parseInt(passengers);

        if (isNaN(d) || isNaN(eff) || isNaN(price) || isNaN(pass) || pass < 1) return null;

        const totalDistance = isReturnTrip ? d * 2 : d;

        // Convert MPG to fuel required in Litres
        // 1 UK Gallon = 4.54609 Litres
        const gallonsRequired = totalDistance / eff;
        const litresRequired = gallonsRequired * 4.54609;

        const totalFuelCost = litresRequired * price;
        const costPerPassenger = totalFuelCost / pass;

        return {
            totalDistance: totalDistance.toLocaleString('en-GB'),
            totalFuelCost: totalFuelCost.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }),
            costPerPassenger: costPerPassenger.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }),
            litresRequired: litresRequired.toFixed(1),
            gallonsRequired: gallonsRequired.toFixed(1),
            costPerMile: (totalFuelCost / totalDistance).toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })
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
            pdf.text("Journey Fuel Cost Report", 15, 15);
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 15, 22);
            pdf.addImage(imgData, "PNG", 15, 30, pdfWidth - 30, pdfHeight - 30);
            pdf.save("journey-cost-report.pdf");
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
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

            <div className="flex justify-between items-center mb-8 relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-blue-500" />
                    Trip Details
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mb-8">
                <div className="md:col-span-2 flex gap-4 bg-slate-100 dark:bg-slate-900 p-2 rounded-2xl w-fit mx-auto border border-slate-200 dark:border-slate-800">
                    <button
                        onClick={() => setIsReturnTrip(false)}
                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${!isReturnTrip ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                    >
                        One-Way
                    </button>
                    <button
                        onClick={() => setIsReturnTrip(true)}
                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${isReturnTrip ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                    >
                        Return Trip
                    </button>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Distance (One-Way)</label>
                    <div className="relative">
                        <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 pr-16 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20" />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">miles</span>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Number of People in Car</label>
                    <input type="number" min="1" step="1" value={passengers} onChange={(e) => setPassengers(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Car Fuel Economy (MPG)</label>
                    <div className="relative">
                        <input type="number" value={fuelEfficiency} onChange={(e) => setFuelEfficiency(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 pr-16 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20" />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">MPG</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">UK avg is ~40-50 MPG</p>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Fuel Price</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">£</span>
                        <input type="number" step="0.01" value={fuelPrice} onChange={(e) => setFuelPrice(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-8 pr-20 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20" />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">per litre</span>
                    </div>
                </div>
            </div>

            {results && (
                <div className="mt-8 bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-6 sm:p-8 border border-blue-100 dark:border-blue-800/50 relative z-10">
                    <div className="text-center mb-8">
                        <span className="block text-blue-800 dark:text-blue-300 font-bold mb-2 uppercase tracking-wide text-sm">
                            Estimated Total Fuel Cost
                        </span>
                        <span className="text-5xl md:text-6xl font-black text-blue-600 dark:text-blue-500">
                            {results.totalFuelCost}
                        </span>
                        {parseInt(passengers) > 1 && (
                            <span className="block mt-2 font-medium text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 w-fit mx-auto px-4 py-1.5 rounded-full text-sm">
                                {results.costPerPassenger} per person
                            </span>
                        )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-blue-100 dark:border-blue-800 text-center">
                            <MapPin className="w-4 h-4 text-slate-400 mx-auto mb-1" />
                            <span className="block text-[10px] font-bold text-slate-500 uppercase">Total Distance</span>
                            <span className="font-bold text-slate-800 dark:text-slate-200">{results.totalDistance} mi</span>
                        </div>
                        <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-blue-100 dark:border-blue-800 text-center">
                            <Fuel className="w-4 h-4 text-slate-400 mx-auto mb-1" />
                            <span className="block text-[10px] font-bold text-slate-500 uppercase">Litres Needed</span>
                            <span className="font-bold text-slate-800 dark:text-slate-200">{results.litresRequired} L</span>
                        </div>
                        <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-blue-100 dark:border-blue-800 text-center">
                            <Fuel className="w-4 h-4 text-slate-400 mx-auto mb-1" />
                            <span className="block text-[10px] font-bold text-slate-500 uppercase">Gallons Needed</span>
                            <span className="font-bold text-slate-800 dark:text-slate-200">{results.gallonsRequired} gal</span>
                        </div>
                        <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-blue-100 dark:border-blue-800 text-center">
                            <Coins className="w-4 h-4 text-slate-400 mx-auto mb-1" />
                            <span className="block text-[10px] font-bold text-slate-500 uppercase">Cost Per Mile</span>
                            <span className="font-bold text-slate-800 dark:text-slate-200">{results.costPerMile}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
