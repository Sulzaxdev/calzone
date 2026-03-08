"use client";

import React, { useState, useRef } from "react";
import { Download, Truck, MapPin, Clock, AlertTriangle } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function CarTowingCostCalculator() {
    const [distance, setDistance] = useState<string>("10");
    const [vehicleType, setVehicleType] = useState<"car" | "van" | "4x4">("car");
    const [urgency, setUrgency] = useState<"emergency" | "prebooked">("emergency");
    const [timeOfDay, setTimeOfDay] = useState<"day" | "night">("day");

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const processResults = () => {
        const d = parseFloat(distance);
        if (isNaN(d) || d < 0) return null;

        // Base Call-out Charge
        // Emergency: £90-£150, Pre-booked: £50-£80
        let callOutCharge = urgency === "emergency" ? 110 : 65;

        // Distance Charge (per mile)
        // Usually £1.50 - £2.50 per mile
        const perMileRate = 2.00;
        const distanceCharge = d * perMileRate;

        // Vehicle Modifier
        let vehicleSurcharge = 0;
        if (vehicleType === "van") vehicleSurcharge = 30;
        if (vehicleType === "4x4") vehicleSurcharge = 20;

        // Time of Day Modifier
        let timeSurcharge = 0;
        if (timeOfDay === "night") {
            // Night/Weekend surcharge usually 30-50% of call-out
            timeSurcharge = callOutCharge * 0.4;
        }

        const subtotal = callOutCharge + distanceCharge + vehicleSurcharge + timeSurcharge;
        const vat = subtotal * 0.2;
        const totalInclVat = subtotal + vat;

        return {
            callOut: callOutCharge.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }),
            distanceCost: distanceCharge.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }),
            vehicleSurcharge: vehicleSurcharge > 0 ? vehicleSurcharge.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }) : "£0.00",
            timeSurcharge: timeSurcharge > 0 ? timeSurcharge.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }) : "£0.00",
            subtotal: subtotal.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }),
            vat: vat.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }),
            estimatedTotal: totalInclVat.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }),
            costPerMile: (totalInclVat / (d || 1)).toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })
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
            pdf.text("Car Towing & Recovery Estimate", 15, 15);
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 15, 22);
            pdf.addImage(imgData, "PNG", 15, 30, pdfWidth - 30, pdfHeight - 30);
            pdf.save("car-towing-cost-estimate.pdf");
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

            <div className="flex justify-between items-center mb-10 relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <Truck className="w-6 h-6 text-blue-500" />
                    Recovery Details
                </h2>
                <button
                    onClick={exportPDF}
                    disabled={isExporting}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
                >
                    {isExporting ? <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div> : <Download className="w-4 h-4" />}
                    Export
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-slate-400" /> Towing Distance (Miles)
                        </label>
                        <input
                            type="number"
                            value={distance}
                            onChange={(e) => setDistance(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20"
                            placeholder="e.g. 15"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Vehicle Type</label>
                        <div className="grid grid-cols-3 gap-2">
                            {(['car', 'van', '4x4'] as const).map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setVehicleType(type)}
                                    className={`py-3 px-2 rounded-xl border text-sm font-bold transition-all ${vehicleType === type
                                            ? "bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/20"
                                            : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
                                        }`}
                                >
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Service Urgency</label>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => setUrgency("emergency")}
                                className={`p-3 rounded-xl border text-left transition-all ${urgency === "emergency"
                                        ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10"
                                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                                    }`}
                            >
                                <span className={`block font-bold text-sm ${urgency === "emergency" ? "text-blue-700 dark:text-blue-300" : "text-slate-900 dark:text-white"}`}>Emergency Recovery</span>
                                <span className="text-[10px] text-slate-500 leading-tight">ASAP response, roadside.</span>
                            </button>
                            <button
                                onClick={() => setUrgency("prebooked")}
                                className={`p-3 rounded-xl border text-left transition-all ${urgency === "prebooked"
                                        ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10"
                                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                                    }`}
                            >
                                <span className={`block font-bold text-sm ${urgency === "prebooked" ? "text-blue-700 dark:text-blue-300" : "text-slate-900 dark:text-white"}`}>Pre-booked Transport</span>
                                <span className="text-[10px] text-slate-500 leading-tight">Scheduled in advance.</span>
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-400" /> Time of Service
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => setTimeOfDay("day")}
                                className={`py-2 px-4 rounded-xl border text-sm font-bold transition-all ${timeOfDay === "day"
                                        ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900"
                                        : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                                    }`}
                            >
                                Standard (Daytime)
                            </button>
                            <button
                                onClick={() => setTimeOfDay("night")}
                                className={`py-2 px-4 rounded-xl border text-sm font-bold transition-all ${timeOfDay === "night"
                                        ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900"
                                        : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                                    }`}
                            >
                                Night / Weekend
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {results && (
                <div className="mt-10 bg-slate-900 rounded-2xl p-6 sm:p-8 text-white relative z-10 shadow-xl border border-slate-800">
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                        <Truck className="w-32 h-32" />
                    </div>

                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-slate-800 pb-8">
                            <div>
                                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Estimated Recovery Cost</h3>
                                <div className="text-5xl font-black">{results.estimatedTotal}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Cost Per Mile</div>
                                <div className="text-xl font-bold text-blue-400">{results.costPerMile}</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-slate-800/50">
                                <span className="text-slate-400 text-sm">Call-out Fee</span>
                                <span className="font-bold">{results.callOut}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-slate-800/50">
                                <span className="text-slate-400 text-sm">Distance ({distance} miles)</span>
                                <span className="font-bold">{results.distanceCost}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-slate-800/50">
                                <span className="text-slate-400 text-sm">Vehicle Surcharge</span>
                                <span className="font-bold">{results.vehicleSurcharge}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-slate-800/50">
                                <span className="text-slate-400 text-sm">Time Surcharge</span>
                                <span className="font-bold">{results.timeSurcharge}</span>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                            <AlertTriangle className="w-5 h-5 text-blue-400 shrink-0" />
                            <p className="text-[11px] text-blue-200/80 leading-relaxed">
                                Prices are estimated based on UK averages. Factors like motorway call-outs, specialized winching (if the car is off-road), or ferry crossings may significantly increase the final quote.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
