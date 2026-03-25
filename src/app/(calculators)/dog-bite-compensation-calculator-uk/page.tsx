"use client";

import React, { useState, useRef } from "react";
import { Download, Info, CheckCircle2, ShieldAlert } from "lucide-react";

import jsPDF from "jspdf";

export default function DogBiteCompCalculator() {
    const [severity, setSeverity] = useState<"minor" | "moderate" | "severe">("moderate");
    const [financialLoss, setFinancialLoss] = useState<number>(0);

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    // Judicial College Guidelines (JCG) standard ranges for animal bites / facial scarring / tissue damage (UK)
    const calculateComp = () => {
        let minComp = 0;
        let maxComp = 0;

        // General Damages (Pain, Suffering, Loss of Amenity)
        if (severity === "minor") {
            // Minor bites, superficial scarring, full recovery within months
            minComp = 1000;
            maxComp = 3500;
        } else if (severity === "moderate") {
            // Deep lacerations, noticeable permanent scarring, minor nerve damage, psychological impact
            minComp = 3500;
            maxComp = 9500;
        } else if (severity === "severe") {
            // Severe facial disfigurement, limb amputation/loss of function, profound psychological trauma (PTSD)
            minComp = 10000;
            maxComp = 35000; // Can go much higher, but keeping a realistic "norm" bracket
        }

        // Special Damages (Financial Loss)
        const totalMin = minComp + financialLoss;
        const totalMax = maxComp + financialLoss;

        return {
            minComp,
            maxComp,
            financialLoss,
            totalMin,
            totalMax
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
            pdf.text("UK Dog Bite Injury Estimate", 15, 20);
            
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
            pdf.save("Injury-Compensation-Estimate.pdf");
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
                        <ShieldAlert className="w-4 h-4" />
                        Legal & Claims Toolkit
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Dog Bite Compensation Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Estimate the value of a dog bite personal injury claim in the UK. Based on the Judicial College Guidelines (JCG) for General and Special Damages.
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
                                Incident Details
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
                                Export
                            </button>
                        </div>

                        <div className="space-y-6 relative z-10">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                    Injury Severity
                                </label>
                                <select
                                    value={severity}
                                    onChange={(e) => setSeverity(e.target.value as any)}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 px-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                                >
                                    <option value="minor">Minor (Superficial puncture, no permanent scar)</option>
                                    <option value="moderate">Moderate (Deep wound, visible scarring, minor nerve pain)</option>
                                    <option value="severe">Severe (Disfigurement, muscle/tendon loss, severe psychological trauma)</option>
                                </select>
                            </div>

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
                                <p className="text-xs text-slate-500 mt-2">Include lost wages due to time off work, private medical/therapy bills, ruined clothing, etc.</p>
                            </div>
                        </div>

                        {/* Results Panel */}
                        <div className="mt-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 relative z-10">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                                <ShieldAlert className="w-4 h-4" />
                                Claim Bracket (Estimate)
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800">
                                    <span className="text-slate-600 dark:text-slate-400 font-medium">General Damages (Pain & Suffering)</span>
                                    <span className="font-bold text-slate-900 dark:text-white">
                                        {formatCurrency(results.minComp)} - {formatCurrency(results.maxComp)}
                                    </span>
                                </div>

                                {results.financialLoss > 0 && (
                                    <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800 text-blue-500 dark:text-blue-400">
                                        <span className="font-medium">Special Damages (Losses)</span>
                                        <span className="font-bold">
                                            + {formatCurrency(results.financialLoss)}
                                        </span>
                                    </div>
                                )}

                                <div className="flex flex-col pt-2 gap-4">
                                    <span className="block text-slate-800 dark:text-slate-200 font-black text-xl">Total Expected Settlement Bracket:</span>
                                    <div className="text-left bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/50">
                                        <span className="block font-black text-blue-600 dark:text-blue-400 text-3xl sm:text-4xl">
                                            {formatCurrency(results.totalMin)} <span className="text-xl font-medium text-slate-500">- {formatCurrency(results.totalMax)}</span>
                                        </span>
                                        <span className="text-sm font-bold text-blue-800/60 dark:text-blue-200/60 mt-2 block">
                                            Note: Claims must establish liability. Most dog bite claims rely on the owner having pet insurance that includes 3rd-party liability cover.
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
                            <Info className="w-5 h-5 text-blue-500" /> Claims Guide
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Negligence</p>
                                    <p className="text-xs text-slate-500 mt-1">To claim successfully, you must prove the owner was negligent (e.g. dog off lead in public, aggressive dog unmuzzled, front door left open).</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Time Limits</p>
                                    <p className="text-xs text-slate-500 mt-1">Adults have exactly 3 years from the date of the bite to initiate court proceedings in the UK. For children, the 3-year clock starts from their 18th birthday.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* --- SEO Deep Content Section --- */}
            <div className="container mx-auto px-4 max-w-4xl mt-24">
                <article className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400">
                    <h2>How Are Dog Bite Compensation Claims Calculated in the UK?</h2>
                    <p>
                        In the UK, when you are bitten by a dog and wish to seek compensation, your solicitor will split your claim into two distinct legal categories: <strong>General Damages</strong> and <strong>Special Damages</strong>. Our calculator integrates both elements to give you a realistic estimate.
                    </p>

                    <h3>1. General Damages (The Physical & Mental Harm)</h3>
                    <p>
                        This compensates you directly for the pain, suffering, and loss of amenity caused by the animal attack. Lawyers and judges do not guess these figures. They use an official publication called the <em>Judicial College Guidelines (JCG)</em>. This lists specific injury types and attributes a financial bracket to them.
                    </p>
                    <p>
                        For dog bites, the severity is largely judged by the permanent outcome. A puncture wound that heals completely within 2 months will command a much lower settlement than a facial bite that leaves a permanent, highly visible scar. The psychological toll (such as developing a clinical fear of dogs or PTSD preventing you from visiting parks) is also heavily factored into this bracket.
                    </p>

                    <h3>2. Special Damages (Financial Losses)</h3>
                    <p>
                        This element is designed to ensure you are not left out of pocket. It calculates every penny you lost as a direct result of the bite. This can include:
                    </p>
                    <ul>
                        <li><strong>Loss of Earnings:</strong> If you could not work for three weeks because you couldn't use your hand.</li>
                        <li><strong>Medical Costs:</strong> Private physiotherapy, cosmetic surgery for scars, or private psychological counseling (e.g., CBT).</li>
                        <li><strong>Property Damage:</strong> Torn trousers, broken glasses, or ruined shoes from the attack.</li>
                    </ul>

                    <h3>Who actually pays the compensation?</h3>
                    <p>
                        A common barrier to these claims is that individual dog owners rarely have £10,000 lying around to hand over. Because of this, successful dog bite claims almost always rely on the owner having <strong>Pet Insurance</strong>. Most modern pet insurance policies include "Third-Party Liability Cover" precisely for this scenario. If the owner has no insurance and no significant assets, it may be impossible to actually extract the compensation, even if a judge rules in your favor.
                    </p>
                </article>
            </div>
        </div>
    );
}
