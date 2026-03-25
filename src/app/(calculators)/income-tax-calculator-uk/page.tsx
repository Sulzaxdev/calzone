"use client";

import React, { useState, useRef } from "react";
import { Calculator, Download, Info, CheckCircle2, FileText, PieChart, Landmark } from "lucide-react";

import jsPDF from "jspdf";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { RelatedTools } from "@/components/layout/related-tools";

export default function IncomeTaxCalculator() {
    const [grossIncome, setGrossIncome] = useState<string>("50000");
    const [isExporting, setIsExporting] = useState(false);

    const calculatorRef = useRef<HTMLDivElement>(null);

    // Constants for 2025/2026 UK Tax Year
    const PERSONAL_ALLOWANCE_BASE = 12570;
    const BASIC_RATE_LIMIT = 50270;
    const HIGHER_RATE_LIMIT = 125140;

    const gross = parseFloat(grossIncome) || 0;

    // 1. Personal Allowance Taper
    let personalAllowance = PERSONAL_ALLOWANCE_BASE;
    if (gross > 100000) {
        const excess = gross - 100000;
        personalAllowance = Math.max(0, PERSONAL_ALLOWANCE_BASE - (excess / 2));
    }

    // 2. Tax Calculation Breakdowns
    const taxableIncome = Math.max(0, gross - personalAllowance);

    let basicTax = 0;
    let higherTax = 0;
    let additionalTax = 0;

    const basicBandRange = 37700; // The threshold width above personal allowance to reach £50,270

    if (taxableIncome > 0) {
        if (taxableIncome <= basicBandRange) {
            basicTax = taxableIncome * 0.20;
        } else {
            basicTax = basicBandRange * 0.20;
            const higherBandIncome = taxableIncome - basicBandRange;

            const higherBandRange = HIGHER_RATE_LIMIT - PERSONAL_ALLOWANCE_BASE - basicBandRange;

            if (higherBandIncome <= higherBandRange) {
                higherTax = higherBandIncome * 0.40;
            } else {
                higherTax = higherBandRange * 0.40;
                const additionalIncome = higherBandIncome - higherBandRange;
                additionalTax = additionalIncome * 0.45;
            }
        }
    }

    const totalTax = basicTax + higherTax + additionalTax;
    const takeHome = gross - totalTax;

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
            pdf.text("UK Income Tax Report", 15, 20);
            
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
            pdf.save("income-tax-report.pdf");
        } catch (err) {
            console.error("Failed to export", err);
        } finally {
            if (exportButton) exportButton.style.opacity = '1';
            setIsExporting(false);
        }
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(val);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
            <BreadcrumbSchema items={[
                { name: "Home", item: "/" },
                { name: "Finance", item: "/finance-driving" },
                { name: "Income Tax Calculator", item: "/income-tax-calculator-uk" }
            ]} />
            <CalculatorSchema
                title="UK Income Tax Calculator | HMRC Tax Band Estimator 24/25"
                description="Discover exactly how much Income Tax you owe to HMRC. Break down your salary into the Basic, Higher, and Additional tax bands."
                slug="/income-tax-calculator-uk"
            />
            <div className="h-20 bg-white dark:bg-slate-950"></div>

            {/* Hero Section */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
                        <Landmark className="w-4 h-4" />
                        UK Tax Specialist
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        UK Income Tax Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Discover exactly how much Income Tax you owe to HMRC. Break down your salary into the Basic, Higher, and Additional tax bands.
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
                        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="flex justify-between items-center mb-8 relative z-10">
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Income Details
                            </h2>
                            <button
                                onClick={exportPDF}
                                disabled={isExporting}
                                data-pdf-export-ignore
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

                        <div className="mb-8 relative z-10">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                Gross Annual Income (£)
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xl">£</span>
                                <input
                                    type="number"
                                    value={grossIncome}
                                    onChange={(e) => setGrossIncome(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-10 pr-4 text-2xl font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
                                />
                            </div>
                        </div>

                        {/* Results Panel */}
                        <div className="mt-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 relative z-10">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                                <PieChart className="w-4 h-4" />
                                Tax Band Breakdown (HMRC)
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800">
                                    <span className="text-slate-600 dark:text-slate-400 font-medium">Personal Allowance (0%)</span>
                                    <span className="font-bold text-slate-900 dark:text-white">
                                        {formatCurrency(personalAllowance)}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800 text-rose-500">
                                    <span className="font-medium">Basic Rate Tax (20%)</span>
                                    <span className="font-bold">{formatCurrency(basicTax)}</span>
                                </div>

                                <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800 text-rose-600">
                                    <span className="font-medium">Higher Rate Tax (40%)</span>
                                    <span className="font-bold">{formatCurrency(higherTax)}</span>
                                </div>

                                <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800 text-rose-700">
                                    <span className="font-medium">Additional Rate Tax (45%)</span>
                                    <span className="font-bold">{formatCurrency(additionalTax)}</span>
                                </div>

                                <div className="flex justify-between items-center pt-2">
                                    <span className="block text-slate-800 dark:text-slate-200 font-black text-xl">Total Income Tax</span>
                                    <span className="font-black text-blue-600 dark:text-blue-400 text-3xl">
                                        {formatCurrency(totalTax)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Note */}
                        <div className="mt-6 text-sm text-slate-500 dark:text-slate-400 bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30">
                            <strong>Note:</strong> This calculates <em>Income Tax only</em>. It does not deduct National Insurance or Pension. Use our <Link href="/salary-calculator-uk" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Full Salary Calculator</Link> for total deductions.
                        </div>

                    </div>
                </div>

                {/* Right Col: SEO Highlights Sidebar */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white dark:bg-slate-950 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-4 dark:text-white">
                            <Info className="w-5 h-5 text-blue-500" /> HMRC Band Rules
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Basic Tax Rate</p>
                                    <p className="text-xs text-slate-500 mt-1">You pay 20% on the portion of your income between £12,571 and £50,270.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Higher Tax Rate</p>
                                    <p className="text-xs text-slate-500 mt-1">You pay 40% on the portion of your income between £50,271 and £125,140.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Additional Tax Rate</p>
                                    <p className="text-xs text-slate-500 mt-1">You pay 45% on any portion of your income earned above £125,140.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-600/20">
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-3">
                            <FileText className="w-5 h-5 text-blue-200" /> Save your Tax Band PDF
                        </h3>
                        <p className="text-sm text-blue-100 mb-6 leading-relaxed">
                            Export a clean, professional breakdown of exactly how your total income tax bill is constructed across the HMRC tiers.
                        </p>
                    </div>
                </div>
            </div>

            {/* --- SEO Deep Content Section --- */}
            <div className="container mx-auto px-4 max-w-4xl mt-24">
                <article className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400">
                    <h2>The Ultimate Guide to UK Income Tax (Updated 2026)</h2>
                    <p>
                        For any individual working in the UK, understanding Income Tax is crucial. Almost everyone working in the UK is subject to income tax on their earnings, but the exact amount relies on a complex tier-based system mapped out by Her Majesty's Revenue and Customs (HMRC). By using the <strong>UK Income Tax Calculator</strong> above, you can transparently view how your gross income traverses across the different tax bands.
                    </p>

                    <h3>Understanding Your Personal Allowance</h3>
                    <p>
                        The standard Personal Allowance is literally the backbone of UK taxation. Currently set at £12,570, it means the first £12,570 you earn over a standard tax year is <strong>completely free from income tax</strong>.
                    </p>
                    <p>
                        However, this allowance is not set in stone for high earners. Once your adjusted net income breaches the £100,000 mark, you suffer from the "Personal Allowance Taper" trap. For every £2 your income exceeds £100,000, your personal allowance drops by £1. Ultimately, if your income reaches £125,140 or above, your personal allowance is completely wiped out to £0.
                    </p>

                    <h3>The Progressive Tax Bands Explained</h3>
                    <p>
                        A common misconception is that entering a higher tax bracket means your <em>entire</em> salary is taxed at that higher rate. This is false. You are only taxed the higher percentage <strong>on the income within that specific band</strong>. Let's break down the bands for the current fiscal year:
                    </p>

                    <ul>
                        <li><strong>Basic Rate (20%):</strong> Applies to the taxable income between £12,571 and £50,270.</li>
                        <li><strong>Higher Rate (40%):</strong> Begins the moment your total income crosses £50,271 and caps out at £125,140.</li>
                        <li><strong>Additional Rate (45%):</strong> Any pound earned over the £125,140 mark is taxed at the highest bracket of 45%.</li>
                    </ul>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-6 my-8 rounded-r-lg">
                        <h4 className="flex items-center gap-2 font-bold text-yellow-800 dark:text-yellow-600 mt-0">
                            Scotland and Wales Variations
                        </h4>
                        <p className="mb-0 text-sm text-yellow-900 dark:text-yellow-500">
                            While our calculator handles standard UK (England and Northern Ireland) tax rates, it's important to note that Scotland sets its own distinct Income Tax bands (e.g., Starter Rate, Intermediate Rate, Top Rate). Wales currently aligns its income tax rates with England, but retains the devolved power to alter them in the future.
                        </p>
                    </div>

                    <h3>Income Tax vs. National Insurance</h3>
                    <p>
                        It is critical to distinguish between Income Tax and National Insurance. While this calculator focuses exclusively on the math surrounding <strong>Income Tax</strong>, you will also spot a deduction for National Insurance on your payslip. National Insurance (NI) goes towards state benefits, primarily your State Pension, and has an entirely different set of thresholds and percentages.
                    </p>
                    <p>
                        If you need a unified view of what your final Take-Home pay will be after Income Tax, National Insurance, and things like Student Loans or Workplace Pensions, please use our comprehensive <Link href="/salary-calculator-uk">Salary Calculator</Link>.
                    </p>

                </article>
            </div>
            <RelatedTools currentCategory="Finance" currentSlug="/income-tax-calculator-uk" />
        </div>
    );
}
