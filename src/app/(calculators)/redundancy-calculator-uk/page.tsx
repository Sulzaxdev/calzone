"use client";

import React, { useState, useRef } from "react";
import { Download, Info, CheckCircle2, FileText, PieChart, Briefcase } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function RedundancyCalculator() {
    const [age, setAge] = useState<string>("35");
    const [yearsWorked, setYearsWorked] = useState<string>("5");
    const [weeklyPay, setWeeklyPay] = useState<string>("800");

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    // UK Gov Statutory Caps (April 2024 limits)
    const MAX_WEEKLY_PAY_CAP = 700;
    const MAX_YEARS_CAPPED = 20;

    // Logic
    const currentAge = parseInt(age, 10) || 0;
    const totalYears = Math.min(parseInt(yearsWorked, 10) || 0, MAX_YEARS_CAPPED);
    const rawWeekly = parseFloat(weeklyPay) || 0;

    const actualWeeklyPay = Math.min(rawWeekly, MAX_WEEKLY_PAY_CAP);

    let totalPayout = 0;
    let calculationBreakdown = [];

    if (currentAge > 0 && totalYears >= 2) {
        let yearsRemainingToCalculate = totalYears;
        let ageCursor = currentAge;

        while (yearsRemainingToCalculate > 0) {
            yearsRemainingToCalculate--;
            ageCursor--; // Look back at the age they were during that working year

            if (ageCursor >= 41) {
                totalPayout += actualWeeklyPay * 1.5;
                calculationBreakdown.push("1.5 weeks (Aged 41+)");
            } else if (ageCursor >= 22) {
                totalPayout += actualWeeklyPay * 1.0;
                calculationBreakdown.push("1.0 week (Aged 22 to 40)");
            } else {
                totalPayout += actualWeeklyPay * 0.5;
                calculationBreakdown.push("0.5 weeks (Under 22)");
            }
        }
    }

    const isCapped = rawWeekly > MAX_WEEKLY_PAY_CAP;
    const isEligible = totalYears >= 2;

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
            pdf.text("Statutory Redundancy Report", 15, 15);
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 15, 22);
            pdf.addImage(imgData, "PNG", 15, 30, pdfWidth - 30, pdfHeight - 30);
            pdf.save("Redundancy-Calculation.pdf");
        } catch (error) {
            console.error("Failed to export", error);
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

            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
                        <Briefcase className="w-4 h-4" />
                        UK Employment Rights
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Statutory Redundancy Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Find out exactly how much Statutory Redundancy Pay (SRP) you are legally entitled to under UK employment law if you are laid off.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-7">
                    <div
                        ref={calculatorRef}
                        className="bg-white dark:bg-slate-950 rounded-[2rem] p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 dark:border-slate-800 relative overflow-hidden"
                    >
                        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="flex justify-between items-center mb-8 relative z-10">
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Your Employment Details
                            </h2>
                            <button
                                onClick={exportPDF}
                                disabled={isExporting || !isEligible}
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                        Age at Redundancy
                                    </label>
                                    <input
                                        type="number"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 px-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 text-xl font-mono transition-all"
                                    />
                                    <p className="text-xs text-slate-500 mt-2 ml-1">Your exact age when notice ends.</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                        Full Years Worked
                                    </label>
                                    <input
                                        type="number"
                                        value={yearsWorked}
                                        onChange={(e) => setYearsWorked(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 px-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 text-xl font-mono transition-all"
                                    />
                                    <p className="text-xs text-slate-500 mt-2 ml-1">Must be 2 or more to qualify.</p>
                                </div>
                            </div>

                            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 mt-4">
                                    Gross Weekly Pay (£)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xl">£</span>
                                    <input
                                        type="number"
                                        step="10"
                                        value={weeklyPay}
                                        onChange={(e) => setWeeklyPay(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-10 pr-4 text-2xl font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-2 ml-1">Before tax and deductions. Excludes overtime.</p>
                            </div>
                        </div>

                        {/* Results Panel */}
                        <div className="mt-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 relative z-10">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                                <PieChart className="w-4 h-4" />
                                Statutory Payout Summary
                            </h3>

                            {!isEligible ? (
                                <div className="bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-800 rounded-xl p-6 text-center">
                                    <p className="text-rose-600 dark:text-rose-400 font-bold">You are not eligible for Statutory Redundancy Pay.</p>
                                    <p className="text-sm text-rose-500 mt-2">You must have continuously worked for your employer for at least 2 full years to qualify under UK law.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                                        <span className="font-medium">Calculated Weekly Limit</span>
                                        <span className="font-bold flex items-center gap-2">
                                            {isCapped && <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">Capped</span>}
                                            {formatCurrency(actualWeeklyPay)}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                                        <span className="font-medium">Qualifying Years</span>
                                        <span className="font-bold">{totalYears} {totalYears === MAX_YEARS_CAPPED && "(Max allowed)"}</span>
                                    </div>

                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-2 gap-4">
                                        <div>
                                            <span className="block text-slate-800 dark:text-slate-200 font-black text-xl">Total Statutory Pay</span>
                                            <span className="text-sm text-slate-500">Tax-free up to £30K</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="block font-black text-blue-600 dark:text-blue-400 text-4xl">
                                                {formatCurrency(totalPayout)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>

                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white dark:bg-slate-950 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-4 dark:text-white">
                            <Info className="w-5 h-5 text-blue-500" /> Redundancy Rules
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Statutory vs Contractual</p>
                                    <p className="text-xs text-slate-500 mt-1">This calculator computes the strict Government minimum (Statutory). Check your employment contract, as your employer might offer an enhanced contractual redundancy package.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">The £700 Cap</p>
                                    <p className="text-xs text-slate-500 mt-1">If you earn £1,500 a week, the government formula still caps your mathematical weekly pay at £700 (Current 2024/25 limit).</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Tax-Free Advantage</p>
                                    <p className="text-xs text-slate-500 mt-1">Redundancy payments are completely exempt from Income Tax and National Insurance up to £30,000.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-linear-to-br from-indigo-600 to-blue-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-600/20">
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-3">
                            <FileText className="w-5 h-5 text-blue-200" /> Save for Records
                        </h3>
                        <p className="text-sm text-blue-100 mb-6 leading-relaxed">
                            If your HR department has issued a redundancy letter, generate a PDF report here to double-check that their financial offer maps mathematically to your legal rights.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-4xl mt-24">
                <article className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400">
                    <h2>The Ultimate Guide to UK Statutory Redundancy Pay</h2>
                    <p>
                        Losing your job due to company restructuring or downsizing is incredibly stressful. However, if you are legally classed as an employee and have been with your current employer for 2 years or more, the UK Government demands that you are given financial cushioning. Our <strong>Redundancy Calculator</strong> determines the rigid minimum amount your employer MUST pay you.
                    </p>

                    <h3>How Age Impacts the Calculation</h3>
                    <p>
                        The government structures redundancy payouts across three age-brackets. The calculation "looks backwards" from the exact date your notice period ends. For every full year you worked for the company, you receive a specific multiple of your weekly pay depending on how old you were <em>during that specific year</em>.
                    </p>

                    <ul>
                        <li><strong>Under 22:</strong> You get 0.5 weeks' pay for each full year.</li>
                        <li><strong>Aged 22 to 40:</strong> You get 1 full week's pay for each full year.</li>
                        <li><strong>Aged 41 and over:</strong> You get 1.5 weeks' pay for each full year.</li>
                    </ul>

                    <p>
                        For example, if you are 42 years old and have worked for a firm for 3 years: you worked year 3 when you were 41 (granting 1.5 weeks), year 2 when you were 40 (granting 1.0 week), and year 1 when you were 39 (granting 1.0 week). Your total multiple is 3.5 weeks' pay.
                    </p>

                    <h3>The "Weekly Pay Limit" Trap</h3>
                    <p>
                        The most common shock for high-earning professionals is the Statutory Cap. The government limits the maximum "weekly pay" variable to £700 (applicable from 6 April 2024 to 5 April 2025).
                    </p>
                    <p>
                        If you earn a gross salary of £70,000 per year, your true weekly pay is roughly £1,346. However, when HR runs the statutory equation legally demanded by the government, they will cap your variable at £700. This is why standard statutory redundancy payouts often look far smaller than individuals anticipate.
                    </p>

                    <h3>Are Redundancy Payouts Taxable?</h3>
                    <p>
                        One of the bright spots of UK redundancy law is that <strong>genuine redundancy payouts are tax-free up to £30,000</strong>. You will not have Income Tax or National Insurance deducted from this sum.
                    </p>
                    <p>
                        <em>Please note:</em> Normal pay owed to you, such as your final month's salary, paid notice period (if you are put on garden leave), and accrued but untaken holiday pay are completely separate from your redundancy payout. These normal earnings WILL be taxed identically to your standard paycheck via PAYE.
                    </p>

                </article>
            </div>
        </div>
    );
}
