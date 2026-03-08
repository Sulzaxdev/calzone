"use client";

import React, { useState, useRef } from "react";
import { Download, Baby, Clock, MapPin, Calculator } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function ChildcareCostCalculator() {
    const [childAge, setChildAge] = useState<"under2" | "two" | "three_four">("under2");
    const [careType, setCareType] = useState<"nursery" | "childminder" | "nanny">("nursery");
    const [hoursPerWeek, setHoursPerWeek] = useState<string>("40");
    const [location, setLocation] = useState<"london" | "outside">("outside");
    const [fundedHours, setFundedHours] = useState<"none" | "15" | "30">("none");

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const processResults = () => {
        const hours = parseFloat(hoursPerWeek);
        if (isNaN(hours) || hours <= 0) return null;

        // Base Hourly Rates (UK average 2026 estimates)
        // London is typically 25-40% more expensive
        let baseHourlyRate = 0;
        switch (careType) {
            case "nursery": baseHourlyRate = 7.50; break;
            case "childminder": baseHourlyRate = 6.80; break;
            case "nanny": baseHourlyRate = 14.00; break; // Nannies are premium
        }

        if (location === "london") {
            baseHourlyRate *= 1.35;
        }

        // Apply government funding
        // Funding is usually applied for 38 weeks of the year (term time),
        // but many nurseries spread it across 51 weeks (stretched).
        let applicableFundedHours = 0;
        if (childAge === "three_four" || (childAge === "two" && fundedHours !== "none")) {
            applicableFundedHours = parseFloat(fundedHours) || 0;
        }

        // If child is 3-4, they definitely get at least 15 hours.
        if (childAge === "three_four" && fundedHours === "none") {
            applicableFundedHours = 15;
        }

        const paidHoursWeekly = Math.max(0, hours - applicableFundedHours);
        const weeklyCost = paidHoursWeekly * baseHourlyRate;

        // Add "consumables" charge (Common in UK: £5-£10 per day for food/nappies even if hours are free)
        const dailyConsumables = (hours / 8) * 7.50;
        const totalWeekly = weeklyCost + dailyConsumables;
        const monthlyAverage = (totalWeekly * 52) / 12;

        return {
            hourlyRate: baseHourlyRate.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }),
            weeklyCost: totalWeekly.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }),
            monthlyCost: monthlyAverage.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }),
            fundedHoursSaved: applicableFundedHours,
            paidHours: paidHoursWeekly.toFixed(1),
            consumables: dailyConsumables.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })
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
            pdf.text("Childcare Cost Estimate", 15, 15);
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 15, 22);
            pdf.addImage(imgData, "PNG", 15, 30, pdfWidth - 30, pdfHeight - 30);
            pdf.save("childcare-cost-report.pdf");
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
            <div className="absolute top-0 left-0 w-96 h-96 bg-rose-500/10 dark:bg-rose-500/5 rounded-full blur-3xl pointer-events-none -translate-x-1/3 -translate-y-1/3"></div>

            <div className="flex justify-between items-center mb-10 relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <Baby className="w-6 h-6 text-rose-500" />
                    Care & Funding Setup
                </h2>
                <button
                    onClick={exportPDF}
                    disabled={isExporting}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
                >
                    {isExporting ? <div className="w-4 h-4 border-2 border-rose-400 border-t-transparent rounded-full animate-spin"></div> : <Download className="w-4 h-4" />}
                    Export
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Child's Age Range</label>
                        <div className="grid grid-cols-3 gap-2">
                            {(['under2', 'two', 'three_four'] as const).map((age) => (
                                <button
                                    key={age}
                                    onClick={() => setChildAge(age)}
                                    className={`py-3 px-2 rounded-xl border text-[11px] font-bold transition-all ${childAge === age
                                            ? "bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-500/20"
                                            : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                                        }`}
                                >
                                    {age === 'under2' ? 'Under 2' : age === 'two' ? 'Age 2' : 'Ages 3-4'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Type of Care</label>
                        <select value={careType} onChange={(e) => setCareType(e.target.value as any)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-rose-500/20">
                            <option value="nursery">Day Nursery / Preschool</option>
                            <option value="childminder">Registered Childminder</option>
                            <option value="nanny">Private Nanny (Payroll/Full-time)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-400" /> Typical Hours Per Week
                        </label>
                        <input
                            type="number"
                            value={hoursPerWeek}
                            onChange={(e) => setHoursPerWeek(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-rose-500/20"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-slate-400" /> Regional Location
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            <button onClick={() => setLocation("outside")} className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all ${location === "outside" ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900" : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"}`}>Outside London</button>
                            <button onClick={() => setLocation("london")} className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all ${location === "london" ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900" : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"}`}>Inside London</button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Government Funded Hours</label>
                        <select value={fundedHours} onChange={(e) => setFundedHours(e.target.value as any)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-rose-500/20" disabled={childAge === 'under2'}>
                            <option value="none">No Funding (or Under 2)</option>
                            <option value="15">15 Hours (Standard / Targeted)</option>
                            <option value="30">30 Hours (Working Parents Eligibility)</option>
                        </select>
                        {childAge === 'under2' && (
                            <p className="text-[10px] text-slate-500 mt-2">UK standard funding currently begins from age 2 (for eligible families) and all children age 3+.</p>
                        )}
                    </div>
                </div>
            </div>

            {results && (
                <div className="mt-10 bg-rose-50 dark:bg-rose-900/10 rounded-2xl p-6 sm:p-8 border border-rose-100 dark:border-rose-800/50 relative z-10">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1">
                            <h3 className="text-rose-800 dark:text-rose-300 text-xs font-bold uppercase tracking-widest mb-4">Estimated Monthly Budget</h3>
                            <div className="text-5xl font-black text-rose-600 dark:text-rose-500 mb-2">{results.monthlyCost}</div>
                            <p className="text-slate-500 text-sm font-medium">Average of {results.weeklyCost} across 52 weeks.</p>
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-4 border-t md:border-t-0 md:border-l border-rose-200 dark:border-rose-800/50 pt-6 md:pt-0 md:pl-8">
                            <div>
                                <div className="text-slate-500 text-[10px] font-bold uppercase mb-1">Weekly Funded</div>
                                <div className="text-xl font-black text-emerald-600 dark:text-emerald-500">-{results.fundedHoursSaved} hrs</div>
                            </div>
                            <div>
                                <div className="text-slate-500 text-[10px] font-bold uppercase mb-1">Weekly Paid</div>
                                <div className="text-xl font-black text-slate-900 dark:text-white">{results.paidHours} hrs</div>
                            </div>
                            <div>
                                <div className="text-slate-500 text-[10px] font-bold uppercase mb-1">Hourly Rate</div>
                                <div className="text-xl font-black text-slate-900 dark:text-white">{results.hourlyRate}</div>
                            </div>
                            <div>
                                <div className="text-slate-500 text-[10px] font-bold uppercase mb-1">Daily Consumables</div>
                                <div className="text-xl font-black text-slate-900 dark:text-white">~{results.consumables}</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center shrink-0">
                            <Calculator className="w-5 h-5 text-rose-500" />
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed italic">
                            Funding is calculated using the "universal" 38-week entitlement spread across a full year (stretched). Nurseries often charge an additional £5-£15/day "top-up" or "consumables" fee for food, outings, and nappies which is reflected in the estimates above.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
