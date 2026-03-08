"use client";

import React, { useState, useRef } from "react";
import { Calculator, Download, Info, CheckCircle2, FileText, PieChart, PoundSterling } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function SalaryCalculatorClient() {
    const [grossAnnual, setGrossAnnual] = useState<string>("35000");
    const [pensionPercent, setPensionPercent] = useState<string>("5");
    const [isExporting, setIsExporting] = useState(false);
    const [studentLoanPlan2, setStudentLoanPlan2] = useState<boolean>(false);

    const calculatorRef = useRef<HTMLDivElement>(null);

    // Constants (2024/2025 & 2025/2026 tax year approximation for UK)
    const PERSONAL_ALLOWANCE_BASE = 12570;
    const BASIC_RATE_LIMIT = 50270;
    const HIGHER_RATE_LIMIT = 125140;

    const NI_PRIMARY_THRESHOLD = 12570;
    const NI_UPPER_EARNINGS_LIMIT = 50270;

    const STUD_LOAN_PLAN2_THRESHOLD = 27295;

    // Perform calculations
    const gross = parseFloat(grossAnnual) || 0;
    const pensionRate = parseFloat(pensionPercent) || 0;

    // 1. Pension
    const pensionYearly = (gross * pensionRate) / 100;
    const adjustedGrossForTax = gross - pensionYearly;

    // 2. Personal Allowance Taper
    let personalAllowance = PERSONAL_ALLOWANCE_BASE;
    if (adjustedGrossForTax > 100000) {
        const excess = adjustedGrossForTax - 100000;
        personalAllowance = Math.max(0, PERSONAL_ALLOWANCE_BASE - (excess / 2));
    }

    // 3. Tax Calculation
    const taxableIncome = Math.max(0, adjustedGrossForTax - personalAllowance);
    let taxYearly = 0;

    if (taxableIncome > 0) {
        const basicBandRange = 37700;
        if (taxableIncome <= basicBandRange) {
            taxYearly += taxableIncome * 0.20;
        } else {
            taxYearly += basicBandRange * 0.20;
            const higherBandIncome = taxableIncome - basicBandRange;
            const higherBandRange = HIGHER_RATE_LIMIT - PERSONAL_ALLOWANCE_BASE - basicBandRange;

            if (higherBandIncome <= higherBandRange) {
                taxYearly += higherBandIncome * 0.40;
            } else {
                taxYearly += higherBandRange * 0.40;
                const additionalIncome = higherBandIncome - higherBandRange;
                taxYearly += additionalIncome * 0.45;
            }
        }
    }

    // 4. National Insurance (Class 1)
    let niYearly = 0;
    if (gross > NI_PRIMARY_THRESHOLD) {
        if (gross <= NI_UPPER_EARNINGS_LIMIT) {
            niYearly = (gross - NI_PRIMARY_THRESHOLD) * 0.08;
        } else {
            niYearly = ((NI_UPPER_EARNINGS_LIMIT - NI_PRIMARY_THRESHOLD) * 0.08) + ((gross - NI_UPPER_EARNINGS_LIMIT) * 0.02);
        }
    }

    // 5. Student Loan (Plan 2)
    let studentLoanYearly = 0;
    if (studentLoanPlan2 && gross > STUD_LOAN_PLAN2_THRESHOLD) {
        studentLoanYearly = (gross - STUD_LOAN_PLAN2_THRESHOLD) * 0.09;
    }

    // 6. Net Take Home
    const deductionsYearly = taxYearly + niYearly + pensionYearly + studentLoanYearly;
    const netYearly = gross - deductionsYearly;

    const exportPDF = async () => {
        if (!calculatorRef.current) return;
        setIsExporting(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 100));
            const canvas = await html2canvas(calculatorRef.current, {
                scale: 2,
                backgroundColor: "#ffffff",
                windowWidth: calculatorRef.current.scrollWidth,
                windowHeight: calculatorRef.current.scrollHeight,
            });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.setFontSize(20);
            pdf.text("UK Salary Calculation Report", 15, 15);
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 15, 22);
            pdf.addImage(imgData, "PNG", 15, 30, pdfWidth - 30, pdfHeight - 30);
            pdf.save("Salary-Breakdown.pdf");
        } catch (error) {
            console.error("Failed to generate PDF", error);
        } finally {
            setIsExporting(false);
        }
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(val);
    };

    return (
        <div className="lg:col-span-12">
            <div
                ref={calculatorRef}
                className="bg-white dark:bg-slate-950 rounded-[2rem] p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 dark:border-slate-800 overflow-hidden relative"
            >
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex justify-between items-center mb-8 relative z-10">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Your Details
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
                        Export PDF
                    </button>
                </div>

                <div className="space-y-6 relative z-10">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                            Gross Annual Salary (£)
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xl">£</span>
                            <input
                                type="number"
                                value={grossAnnual}
                                onChange={(e) => setGrossAnnual(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-10 pr-4 text-2xl font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                Workplace Pension (%)
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={pensionPercent}
                                    onChange={(e) => setPensionPercent(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all pr-10"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center pt-6">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    checked={studentLoanPlan2}
                                    onChange={(e) => setStudentLoanPlan2(e.target.checked)}
                                />
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                    Add Student Loan (Plan 2)
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Results Panel */}
                <div className="mt-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 relative z-10">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                        <PieChart className="w-4 h-4" />
                        Annual Breakdown
                    </h3>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800">
                            <span className="text-slate-600 dark:text-slate-400 font-medium">Gross Salary</span>
                            <span className="font-bold text-slate-900 dark:text-white text-lg">
                                {formatCurrency(gross)}
                            </span>
                        </div>

                        <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800 text-rose-500">
                            <span className="font-medium">Income Tax</span>
                            <span className="font-bold">- {formatCurrency(taxYearly)}</span>
                        </div>

                        <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800 text-rose-500">
                            <span className="font-medium">National Insurance</span>
                            <span className="font-bold">- {formatCurrency(niYearly)}</span>
                        </div>

                        {pensionYearly > 0 && (
                            <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800 text-amber-500">
                                <span className="font-medium">Pension ({pensionRate}%)</span>
                                <span className="font-bold">- {formatCurrency(pensionYearly)}</span>
                            </div>
                        )}

                        {studentLoanPlan2 && studentLoanYearly > 0 && (
                            <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800 text-amber-500">
                                <span className="font-medium">Student Loan (Plan 2)</span>
                                <span className="font-bold">- {formatCurrency(studentLoanYearly)}</span>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-2 gap-4">
                            <div>
                                <span className="block text-slate-800 dark:text-slate-200 font-black text-xl">Take-Home Pay</span>
                                <span className="text-sm text-slate-500">What hits your bank account</span>
                            </div>
                            <div className="text-right">
                                <span className="block font-black text-green-600 dark:text-green-400 text-3xl">
                                    {formatCurrency(netYearly)} <span className="text-lg">/ yr</span>
                                </span>
                                <span className="text-sm font-bold text-slate-500">
                                    {formatCurrency(netYearly / 12)} / month
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
