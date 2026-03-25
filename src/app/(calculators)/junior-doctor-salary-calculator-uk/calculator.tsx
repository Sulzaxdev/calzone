"use client";

import React, { useState, useRef } from "react";
import { Download, Stethoscope, Info, PoundSterling } from "lucide-react";

import jsPDF from "jspdf";

export function JuniorDoctorSalaryCalculator() {
    const [grade, setGrade] = useState("FY1");
    const [hours, setHours] = useState("40");
    const [weekend, setWeekend] = useState("None");
    const [night, setNight] = useState("None");

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    // Simplified Base Salaries (2023/2024 scale approximations)
    const baseSalaries: Record<string, number> = {
        "FY1": 32398,
        "FY2": 37303,
        "CT1/ST1": 43923,
        "CT2/ST2": 43923,
        "ST3": 55329,
        "ST4": 55329,
        "ST5": 55329,
        "ST6+": 63152,
    };

    const weekendAllowances: Record<string, number> = {
        "None": 0,
        "1 in 8": 0.03, // 3%
        "1 in 7": 0.04,
        "1 in 6": 0.05,
        "1 in 5": 0.075,
        "1 in 4": 0.10,
        "1 in 3": 0.15,
        "1 in 2": 0.15, // Actually caps usually, but simplified
    };

    const processResults = () => {
        const base = baseSalaries[grade] || 0;

        // Additional hours (40 base, up to 48 standard)
        const weeklyHours = parseFloat(hours);
        let additionalHoursPay = 0;
        if (weeklyHours > 40) {
            const extraHours = weeklyHours - 40;
            const hourlyRate = base / 2080; // 52 weeks * 40 hours
            additionalHoursPay = extraHours * 52 * hourlyRate;
        }

        const weekendMultiplier = weekendAllowances[weekend] || 0;
        const weekendPay = base * weekendMultiplier;

        // Night allowance (37% enhancement for night hours, simplified assumption)
        let nightPay = 0;
        if (night === "Occasional") nightPay = base * 0.02;
        if (night === "Regular") nightPay = base * 0.08;
        if (night === "Frequent") nightPay = base * 0.12;

        const totalSalary = base + additionalHoursPay + weekendPay + nightPay;

        // Rough take-home estimate (ignoring exact tax bands for simplicity, assuming ~30% deductions for Tax/NI/Pension)
        const takeHomeMonthly = (totalSalary * 0.7) / 12;

        return {
            base: base.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            additional: additionalHoursPay.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            weekend: weekendPay.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            night: nightPay.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            total: totalSalary.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
            takeHomeMonthly: takeHomeMonthly.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 })
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
            pdf.text("Junior Doctor Salary Estimate", 15, 20);
            
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
            pdf.save("doctor-salary-report.pdf");
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
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-center mb-8 relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <Stethoscope className="w-6 h-6 text-blue-500" />
                    Doctor Details
                </h2>
                <button
                    onClick={exportPDF}
                    disabled={isExporting}
                    data-pdf-export-ignore
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
                >
                    {isExporting ? <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div> : <Download className="w-4 h-4" />}
                    Export
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Grade / Nodal Point</label>
                    <select
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                        {Object.keys(baseSalaries).map(g => (
                            <option key={g} value={g}>{g}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Avg. Weekly Hours</label>
                    <select
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                        <option value="40">40 (Basic)</option>
                        <option value="42">42</option>
                        <option value="44">44</option>
                        <option value="46">46</option>
                        <option value="48">48 (Max Standard)</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Weekend Frequency</label>
                    <select
                        value={weekend}
                        onChange={(e) => setWeekend(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                        <option value="None">None</option>
                        <option value="1 in 8">1 in 8 weekends</option>
                        <option value="1 in 6">1 in 6 weekends</option>
                        <option value="1 in 4">1 in 4 weekends</option>
                        <option value="1 in 3">1 in 3 weekends</option>
                        <option value="1 in 2">1 in 2 weekends</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Night Shift Intensity</label>
                    <select
                        value={night}
                        onChange={(e) => setNight(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                        <option value="None">None</option>
                        <option value="Occasional">Occasional Nights</option>
                        <option value="Regular">Regular Nights</option>
                        <option value="Frequent">Frequent Nights (e.g. A&E)</option>
                    </select>
                </div>
            </div>

            <div className="mt-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 relative z-10">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                    <PoundSterling className="w-4 h-4" /> Estimated Salary Breakdown
                </h3>

                <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-800">
                        <span className="text-slate-600 dark:text-slate-400">Basic Salary (40 Hrs)</span>
                        <span className="font-bold text-slate-900 dark:text-white">{results.base}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-800">
                        <span className="text-slate-600 dark:text-slate-400">Additional Hours ({parseFloat(hours) - 40} extra)</span>
                        <span className="font-bold text-slate-900 dark:text-white">{results.additional}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-800">
                        <span className="text-slate-600 dark:text-slate-400">Weekend Allowance</span>
                        <span className="font-bold text-slate-900 dark:text-white">{results.weekend}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-800">
                        <span className="text-slate-600 dark:text-slate-400">Night Enhancement (Est.)</span>
                        <span className="font-bold text-slate-900 dark:text-white">{results.night}</span>
                    </div>

                    <div className="pt-4 flex flex-col md:flex-row gap-4">
                        <div className="flex-1 bg-blue-600 p-6 rounded-2xl text-white">
                            <span className="block text-blue-200 text-sm mb-1">Total Gross Salary (Annual)</span>
                            <span className="text-3xl font-black">{results.total}</span>
                        </div>
                        <div className="flex-1 bg-slate-200 dark:bg-slate-800 p-6 rounded-2xl">
                            <span className="block text-slate-500 dark:text-slate-400 text-sm mb-1">Est. Monthly Take-Home (Post Tax/NI/Pen)</span>
                            <span className="text-3xl font-black text-slate-900 dark:text-white">~{results.takeHomeMonthly}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
