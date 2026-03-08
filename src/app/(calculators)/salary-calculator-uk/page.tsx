"use client";

import React, { useState, useRef } from "react";
import { Calculator, Download, Info, CheckCircle2, FileText, PieChart, PoundSterling } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Link from "next/link";

export default function SalaryCalculator() {
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
    const adjustedGrossForTax = gross - pensionYearly; // assuming salary sacrifice or net pay arrangement for simplicity

    // 2. Personal Allowance Taper (Goes down £1 for every £2 over £100,000)
    let personalAllowance = PERSONAL_ALLOWANCE_BASE;
    if (adjustedGrossForTax > 100000) {
        const excess = adjustedGrossForTax - 100000;
        personalAllowance = Math.max(0, PERSONAL_ALLOWANCE_BASE - (excess / 2));
    }

    // 3. Tax Calculation
    const taxableIncome = Math.max(0, adjustedGrossForTax - personalAllowance);
    let taxYearly = 0;

    if (taxableIncome > 0) {
        // Basic Rate (20% up to £37,700 of taxable income, which maps to £50,270 gross typically)
        const basicBandRange = 37700;
        if (taxableIncome <= basicBandRange) {
            taxYearly += taxableIncome * 0.20;
        } else {
            taxYearly += basicBandRange * 0.20;
            const higherBandIncome = taxableIncome - basicBandRange;

            // Higher Rate (40% up from basic band to £125,140)
            const higherBandRange = HIGHER_RATE_LIMIT - PERSONAL_ALLOWANCE_BASE - basicBandRange; // roughly £74,870

            if (higherBandIncome <= higherBandRange) {
                taxYearly += higherBandIncome * 0.40;
            } else {
                taxYearly += higherBandRange * 0.40;
                const additionalIncome = higherBandIncome - higherBandRange;
                taxYearly += additionalIncome * 0.45;
            }
        }
    }

    // 4. National Insurance (Class 1) - using standard 8% main rate for 24/25
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
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
            <div className="h-20 bg-white dark:bg-slate-950"></div>

            {/* Hero Section */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
                        <PoundSterling className="w-4 h-4" />
                        UK Finance Toolkit
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        UK Salary & Take-Home Pay Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Find out exactly how much you take home after Income Tax, National Insurance, Pension contributions, and Student Loans under current UK standards.
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

                {/* Right Col: SEO Highlights Sidebar */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white dark:bg-slate-950 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-4 dark:text-white">
                            <Info className="w-5 h-5 text-blue-500" /> UK Tax Highlights
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Tax-Free Allowance</p>
                                    <p className="text-xs text-slate-500 mt-1">In the UK, your first £12,570 earned is entirely tax-free (Standard Tax Code).</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">National Insurance Rate</p>
                                    <p className="text-xs text-slate-500 mt-1">Class 1 National Insurance was reduced to 8% for main rate earners.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">The £100k Tax Trap</p>
                                    <p className="text-xs text-slate-500 mt-1">Earnings over £100,000 cause your tax-free allowance to scale down by £1 for every £2 earned.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-linear-to-br from-indigo-600 to-blue-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-600/20">
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-3">
                            <FileText className="w-5 h-5 text-blue-200" /> Export Breakdowns
                        </h3>
                        <p className="text-sm text-blue-100 mb-6 leading-relaxed">
                            Negotiating a new job offer? Need proof of net income for a mortgage application? Download your detailed salary breakdown into a clean PDF using the button in the calculator.
                        </p>
                    </div>
                </div>
            </div>

            {/* --- SEO Deep Content Section --- */}
            <div className="container mx-auto px-4 max-w-4xl mt-24">
                <article className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400">
                    <h2>The Complete UK Salary & Tax Guide</h2>
                    <p>
                        Understanding your paycheck can sometimes feel like trying to decipher a foreign language. The jump from Gross Salary (what your employer pays you on paper) to Net Salary (what actually lands in your bank account) is intercepted by several UK taxation bodies, primarily HMRC. This page acts as your ultimate <strong>Take-Home Pay Calculator</strong> to help you budget properly.
                    </p>

                    <h3>How UK Income Tax is Calculated</h3>
                    <p>
                        The UK operates on a progressive or "marginal" tax system. This means that you do not pay a flat tax rate on your entire salary. Instead, your income is divided into specific bands, and each band is taxed at a different percentage.
                    </p>
                    <div className="overflow-x-auto not-prose my-6">
                        <table className="min-w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm">
                            <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-left">
                                <tr>
                                    <th className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">Band</th>
                                    <th className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">Taxable Income Range (Above £12,570)</th>
                                    <th className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">Tax Rate</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                <tr>
                                    <td className="py-3 px-4 font-semibold">Personal Allowance</td>
                                    <td className="py-3 px-4">Up to £12,570</td>
                                    <td className="py-3 px-4">0%</td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4 font-semibold">Basic Rate</td>
                                    <td className="py-3 px-4">£12,571 to £50,270</td>
                                    <td className="py-3 px-4">20%</td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4 font-semibold">Higher Rate</td>
                                    <td className="py-3 px-4">£50,271 to £125,140</td>
                                    <td className="py-3 px-4">40%</td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4 font-semibold">Additional Rate</td>
                                    <td className="py-3 px-4">Over £125,140</td>
                                    <td className="py-3 px-4">45%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3>National Insurance (NI) Contributions</h3>
                    <p>
                        National Insurance is a secondary tax that all UK workers pay to qualify for certain state benefits, primarily the State Pension. Recent fiscal policies have reduced the main rate of Class 1 National Insurance from 12% to 10% and most recently down to <strong>8%</strong>.
                    </p>
                    <p>
                        You only pay NI on earnings above the Primary Threshold (£12,570 per year). Between £12,570 and £50,270 you pay 8%. On earnings above £50,270, the rate drops significantly to just 2%.
                    </p>

                    <h3>Workplace Pensions and Auto-Enrolment</h3>
                    <p>
                        By law, employers in the UK must automatically enrol you into a workplace pension scheme if you are aged between 22 and State Pension age and earn more than £10,000 a year.
                    </p>
                    <ul>
                        <li>The minimum total contribution is 8%.</li>
                        <li>Usually, the employer pays 3% and the employee pays 5%.</li>
                    </ul>
                    <p>
                        In our calculator, you can adjust the "Workplace Pension (%)" slider or input according to what you actually contribute. Many large corporations offer matching schemes, where if you put in 8%, they put in 8%. Note that pension contributions are technically tax-deductible, meaning they lower your total taxable income (which this calculator accounts for when making basic assumptions).
                    </p>

                    <h3>Student Loan Repayments (Plan 2)</h3>
                    <p>
                        If you graduated from a UK university after 2012, you are likely on a Plan 2 Student Loan. You are required to pay back 9% of everything you earn <strong>over £27,295</strong> per year.
                    </p>
                    <p>
                        For example, if you earn £30,000 a year, you are £2,705 over the threshold. You will pay 9% of £2,705 over the course of the year, which comes to £243.45 annually.
                    </p>

                </article>
            </div>
        </div>
    );
}
