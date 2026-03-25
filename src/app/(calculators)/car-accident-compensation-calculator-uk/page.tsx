"use client";

import React, { useState, useRef } from "react";
import { Download, Info, CheckCircle2, CarFront, ShieldAlert } from "lucide-react";

import jsPDF from "jspdf";

export default function CarAccidentCompCalculator() {
    // UK Whiplash Reforms 2021 + Judicial College Guidelines
    const [injuryType, setInjuryType] = useState<"whiplash-minor" | "whiplash-moderate" | "broken-bone" | "severe">("whiplash-minor");
    const [duration, setDuration] = useState<"under-3" | "3-6" | "6-9" | "9-12">("under-3"); // Only used for whiplash
    const [financialLoss, setFinancialLoss] = useState<number>(0);

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const calculateComp = () => {
        let minComp = 0;
        let maxComp = 0;

        if (injuryType === "whiplash-minor" || injuryType === "whiplash-moderate") {
            // New Official Injury Claim (OIC) fixed tariff for whiplash (approximate 2024 figures)
            if (duration === "under-3") {
                minComp = 240;
                maxComp = 260; // Fixed tariff is ~£240
            } else if (duration === "3-6") {
                minComp = 470;
                maxComp = 500;
            } else if (duration === "6-9") {
                minComp = 805;
                maxComp = 850;
            } else { // 9-12
                minComp = 1250;
                maxComp = 1320;
            }

            // If moderate, we assume minor psychological damage added (tariff adds a bit more)
            if (injuryType === "whiplash-moderate") {
                minComp += 20;
                maxComp += 50;
            }
        } else if (injuryType === "broken-bone") {
            // General broken bones (e.g. arm/leg) - non complex
            minComp = 6000;
            maxComp = 18000;
        } else if (injuryType === "severe") {
            // Serious head/spinal/multiple fractures
            minComp = 40000;
            maxComp = 150000;
        }

        const totalMin = minComp + financialLoss;
        const totalMax = maxComp + financialLoss;

        return {
            minComp,
            maxComp,
            financialLoss,
            totalMin,
            totalMax,
            isTariff: (injuryType === "whiplash-minor" || injuryType === "whiplash-moderate")
        };
    };

    const results = calculateComp();

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(val);
    };

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
            pdf.text("Car Accident Compensation Estimate", 15, 20);
            
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
            pdf.save("Car-Accident-Comp-Report.pdf");
        } catch (err) {
            console.error("Failed to export", err);
        } finally {
            if (exportButton) exportButton.style.opacity = '1';
            setIsExporting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
            <div className="h-20 bg-white dark:bg-slate-950"></div>

            {/* Hero Section */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
                        <CarFront className="w-4 h-4" />
                        Legal & Claims Toolkit
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Car Accident Compensation Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Estimate the value of your UK road traffic accident claim, incorporating the latest 2021 Whiplash Reform fixed tariffs and standard injury brackets.
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
                        <div className="flex justify-between items-center mb-8 relative z-10">
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Claim Details
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
                                Export
                            </button>
                        </div>

                        <div className="space-y-6 relative z-10">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                    Primary Injury Type
                                </label>
                                <select
                                    value={injuryType}
                                    onChange={(e) => setInjuryType(e.target.value as any)}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 px-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                                >
                                    <option value="whiplash-minor">Whiplash: Neck/Back strain only</option>
                                    <option value="whiplash-moderate">Whiplash + Minor Psychological trauma (e.g. driving anxiety)</option>
                                    <option value="broken-bone">Broken Bones (Arms, legs, ribs)</option>
                                    <option value="severe">Severe (Brain injury, spinal damage, multi-trauma)</option>
                                </select>
                            </div>

                            {(injuryType === "whiplash-minor" || injuryType === "whiplash-moderate") && (
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                        Recovery Duration (Whiplash Tariff)
                                    </label>
                                    <select
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value as any)}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 px-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                                    >
                                        <option value="under-3">Up to 3 months</option>
                                        <option value="3-6">3 to 6 months</option>
                                        <option value="6-9">6 to 9 months</option>
                                        <option value="9-12">9 to 12 months</option>
                                    </select>
                                    <p className="text-xs text-slate-500 mt-2">Whiplash claims lasting longer than 24 months exit the fixed tariff scheme entirely.</p>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                    Direct Financial Losses (£)
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <span className="text-slate-500 font-bold text-xl">£</span>
                                    </div>
                                    <input
                                        type="number"
                                        value={financialLoss || ""}
                                        onChange={(e) => setFinancialLoss(Number(e.target.value))}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-10 pr-4 text-xl font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-2">Loss of earnings, car hire costs, physio bills, excess on your insurance policy, etc.</p>
                            </div>
                        </div>

                        {/* Results Panel */}
                        <div className="mt-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 relative z-10">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                                <ShieldAlert className="w-4 h-4" />
                                Valuation Bracket
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800">
                                    <span className="text-slate-600 dark:text-slate-400 font-medium">General Damages (Injury Valuation)</span>
                                    <span className="font-bold text-slate-900 dark:text-white">
                                        {formatCurrency(results.minComp)} - {formatCurrency(results.maxComp)}
                                    </span>
                                </div>

                                {results.financialLoss > 0 && (
                                    <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800 text-blue-500 dark:text-blue-400">
                                        <span className="font-medium">Special Damages (Financial Losses)</span>
                                        <span className="font-bold">
                                            + {formatCurrency(results.financialLoss)}
                                        </span>
                                    </div>
                                )}

                                <div className="flex flex-col pt-2 gap-4">
                                    <span className="block text-slate-800 dark:text-slate-200 font-black text-xl">Total Expected Settlement:</span>
                                    <div className="text-left bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/50">
                                        <span className="block font-black text-blue-600 dark:text-blue-400 text-3xl sm:text-4xl">
                                            {formatCurrency(results.totalMin)} <span className="text-xl font-medium text-slate-500">- {formatCurrency(results.totalMax)}</span>
                                        </span>
                                        {results.isTariff && (
                                            <span className="text-sm font-semibold text-blue-800/60 dark:text-blue-200/60 mt-3 block bg-blue-100/50 dark:bg-blue-900/50 p-3 rounded-lg border border-blue-200 dark:border-blue-800/50">
                                                Based on the statutory Whiplash Reforms 2021 fixed tariff. Soft tissue injuries lasting less than 24 months are legally capped at these amounts in England & Wales.
                                            </span>
                                        )}
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
                            <Info className="w-5 h-5 text-blue-500" /> Essential Claim Facts
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Small Claims Track Change</p>
                                    <p className="text-xs text-slate-500 mt-1">If your whiplash injury is worth less than £5,000, it falls into the Small Claims Track. You can no longer recover your lawyer's fees from the other side. You must use the government's Official Injury Claim (OIC) portal.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">No Win, No Fee Deductions</p>
                                    <p className="text-xs text-slate-500 mt-1">Because lawyers can't recover their base fees on small claims anymore, most will deduct up to 25% from your final compensation amount to cover their costs.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* --- SEO Deep Content Section --- */}
            <div className="container mx-auto px-4 max-w-4xl mt-24">
                <article className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400">
                    <h2>Understanding the 2021 UK Whiplash Reforms</h2>
                    <p>
                        In May 2021, the UK government radically overhauled how road traffic accident (RTA) compensation is calculated and processed in England and Wales. If you have been in a car crash recently and suffered "soft tissue damage" (commonly known as whiplash), the rules are drastically different than they were a decade ago.
                    </p>

                    <h3>The End of Massive Whiplash Payouts</h3>
                    <p>
                        Previously, a minor whiplash injury that lasted a few weeks could command thousands of pounds in compensation, driving up the cost of car insurance premiums nationwide. To combat this "compensation culture," the government introduced a strict, fixed tariff.
                    </p>
                    <p>
                        If your whiplash injury heals within 24 months, your compensation is capped by law. For example, an injury lasting up to 3 months is now worth approximately £240. Under the old system, that same injury might have been valued at over £2,000.
                    </p>

                    <h3>The Official Injury Claim (OIC) Portal</h3>
                    <p>
                        Along with fixed pricing, the government increased the Small Claims Track limit for road traffic injuries from £1,000 to £5,000.
                    </p>
                    <p>
                        If your injury is worth less than £5,000, <strong>you can no longer force the at-fault driver's insurance to pay your solicitor's legal fees</strong>. To ensure normal people could still claim without needing to hire a lawyer, the government launched the free Official Injury Claim (OIC) portal. You can go online, submit your medical report, and process the claim entirely by yourself.
                    </p>

                    <h3>What about broken bones and serious injuries?</h3>
                    <p>
                        If you sustained a non-whiplash injury (such as a broken arm, a shattered knee, or severe psychological trauma outlasting 24 months), the new Whiplash Reforms do not apply to that injury. Those injuries are still valued using the traditional Judicial College Guidelines (JCG) and can command tens or hundreds of thousands of pounds depending on severity and long-term disability.
                    </p>
                    <p>
                        For these complex "multi-track" claims, you should always instruct a specialized personal injury solicitor.
                    </p>
                </article>
            </div>
        </div>
    );
}
