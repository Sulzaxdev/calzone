"use client";

import React, { useState, useRef } from "react";
import { Calculator, Download, Info, CheckCircle2, FileText, Home, ArrowUpRight } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function HouseExtensionCostCalculator() {
    const [sqRMs, setSqRMs] = useState<number>(30); // Square Metres
    const [storey, setStorey] = useState<"single" | "double">("single");
    const [finishQuality, setFinishQuality] = useState<"basic" | "standard" | "premium">("standard");
    const [location, setLocation] = useState<"london" | "outside">("outside");

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    // Cost logic based on UK 2024 averages
    const calculateCost = () => {
        let baseCostPerSqm = 0;

        if (storey === "single") {
            if (finishQuality === "basic") baseCostPerSqm = 1800;
            if (finishQuality === "standard") baseCostPerSqm = 2200;
            if (finishQuality === "premium") baseCostPerSqm = 2800;
        } else {
            // Double storey isn't quite double the cost per floor since foundation & roof is shared
            if (finishQuality === "basic") baseCostPerSqm = 2400;
            if (finishQuality === "standard") baseCostPerSqm = 2900;
            if (finishQuality === "premium") baseCostPerSqm = 3500;
        }

        // London/South East Weighting
        if (location === "london") {
            baseCostPerSqm = baseCostPerSqm * 1.25; // 25% premium in London
        }

        const buildCost = baseCostPerSqm * sqRMs;
        const architectFees = buildCost * 0.10; // ~10% for architect
        const vat = buildCost * 0.20; // 20% VAT on build

        const padding = buildCost * 0.10; // 10% contingency

        return {
            buildCost,
            architectFees,
            vat,
            contingency: padding,
            totalMin: buildCost + architectFees + vat,
            totalMax: buildCost + architectFees + vat + padding
        };
    };

    const costs = calculateCost();

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(val);
    };

    const exportPDF = async () => {
        if (!calculatorRef.current) return;
        setIsExporting(true);

        const exportButton = calculatorRef.current.parentNode?.querySelector('button[onClick*="exportPDF"]');
        if (exportButton instanceof HTMLElement) exportButton.style.opacity = '0';

        try {
            await new Promise((resolve) => setTimeout(resolve, 150));
            const canvas = await html2canvas(calculatorRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
                windowWidth: calculatorRef.current.scrollWidth,
                windowHeight: calculatorRef.current.scrollHeight,
            });
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            
            pdf.setFontSize(22);
            pdf.setTextColor(15, 23, 42);
            pdf.text("House Extension Report", 15, 20);
            
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 15, 28);
            
            pdf.setDrawColor(226, 232, 240);
            pdf.line(15, 32, pdfWidth - 15, 32);

            pdf.addImage(imgData, "PNG", 15, 40, pdfWidth - 30, (canvas.height * (pdfWidth - 30)) / canvas.width);
            pdf.save("house-extension-report.pdf");
        } catch (error) {
            console.error("Failed to generate PDF", error);
        } finally {
            if (exportButton instanceof HTMLElement) exportButton.style.opacity = '1';
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
                        <Home className="w-4 h-4" />
                        Home property Toolkit
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        UK House Extension Cost Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Get an instant breakdown of how much an extension will cost, factoring in VAT, architect fees, and regional premiums.
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
                                Extension Specs
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
                                    Size in Square Metres (m²)
                                </label>
                                <input
                                    type="number"
                                    value={sqRMs || ""}
                                    onChange={(e) => setSqRMs(Number(e.target.value))}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 px-4 text-xl font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                />
                                <p className="text-xs text-slate-500 mt-2">Example: A 5x6m single-story extension is 30m².</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                        Storey Type
                                    </label>
                                    <select
                                        value={storey}
                                        onChange={(e) => setStorey(e.target.value as any)}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                                    >
                                        <option value="single">Single Storey</option>
                                        <option value="double">Two Storey</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                        Location
                                    </label>
                                    <select
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value as any)}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                                    >
                                        <option value="outside">Outside London</option>
                                        <option value="london">London / SE (+25% premium)</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                    Finish Quality
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        onClick={() => setFinishQuality("basic")}
                                        className={`p-3 text-sm text-center rounded-xl border-2 transition-all ${finishQuality === "basic" ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300 font-bold" : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-200 dark:hover:border-blue-900/50"}`}
                                    >
                                        Basic
                                    </button>
                                    <button
                                        onClick={() => setFinishQuality("standard")}
                                        className={`p-3 text-sm text-center rounded-xl border-2 transition-all ${finishQuality === "standard" ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300 font-bold" : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-200 dark:hover:border-blue-900/50"}`}
                                    >
                                        Standard
                                    </button>
                                    <button
                                        onClick={() => setFinishQuality("premium")}
                                        className={`p-3 text-sm text-center rounded-xl border-2 transition-all ${finishQuality === "premium" ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300 font-bold" : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-200 dark:hover:border-blue-900/50"}`}
                                    >
                                        Premium
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Results Panel */}
                        <div className="mt-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 relative z-10">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                                <ArrowUpRight className="w-4 h-4" />
                                Estimated Breakdown
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800">
                                    <span className="text-slate-600 dark:text-slate-400 font-medium">Core Build Cost</span>
                                    <span className="font-bold text-slate-900 dark:text-white">
                                        {formatCurrency(costs.buildCost)}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800 text-slate-500">
                                    <span className="font-medium">Architect & Planning (~10%)</span>
                                    <span className="font-bold">
                                        {formatCurrency(costs.architectFees)}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800 text-rose-500">
                                    <span className="font-medium">VAT Element (20%)</span>
                                    <span className="font-bold">
                                        + {formatCurrency(costs.vat)}
                                    </span>
                                </div>

                                <div className="flex flex-col pt-2 gap-4">
                                    <span className="block text-slate-800 dark:text-slate-200 font-black text-xl">Predicted Total:</span>
                                    <div className="text-left bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/50">
                                        <span className="block font-black text-blue-600 dark:text-blue-400 text-3xl sm:text-4xl">
                                            {formatCurrency(costs.totalMin)} <span className="text-xl font-medium text-slate-500">- {formatCurrency(costs.totalMax)}</span>
                                        </span>
                                        <span className="text-sm font-bold text-blue-800/60 dark:text-blue-200/60 mt-2 block">
                                            The higher number includes a 10% safety contingency fund. Always have a contingency when building.
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
                            <Info className="w-5 h-5 text-blue-500" /> Key Considerations
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">VAT Applicability</p>
                                    <p className="text-xs text-slate-500 mt-1">For standard residential extensions, Labour and Materials are generally subject to 20% VAT unless the property has been empty for over 2 years.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Hidden Costs</p>
                                    <p className="text-xs text-slate-500 mt-1">Don't forget to account for moving manholes, deep foundations for unstable soil, and Party Wall Agreements if building near a neighbor.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* --- SEO Deep Content Section --- */}
            <div className="container mx-auto px-4 max-w-4xl mt-24">
                <article className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400">
                    <h2>How Much Does an Extension Cost in the UK (2024)?</h2>
                    <p>
                        Building an extension is one of the most effective ways to add value and space to your property, but budgeting accurately is critical. A standard 30sqm single-story extension outside of London will typically start from £55,000 to £70,000+ depending on the level of finish.
                    </p>

                    <h3>Single Storey vs Double Storey</h3>
                    <p>
                        A common misconception is that a two-story extension will cost double the price of a single-story. It doesn't.
                    </p>
                    <p>
                        The most expensive elements of an extension are the <strong>foundations</strong> and the <strong>roof</strong>. Because a two-story extension uses the same foundation footprint and the same roof size as a single-story extension, the cost per square metre is usually cheaper on the second floor. Our calculator automatically adjusts the rate per square metre based on the storey you select.
                    </p>

                    <h3>Basic vs Premium Finish</h3>
                    <ul>
                        <li><strong>Basic (£1,500 - £1,800/m²):</strong> Plastered walls, standard radiators, uPVC windows, basic lighting, DIY decorating.</li>
                        <li><strong>Standard (£2,000 - £2,400/m²):</strong> Mid-range kitchens/bathrooms, bifold doors, underfloor heating, finished flooring.</li>
                        <li><strong>Premium (£2,500 - £3,000+/m²):</strong> High-end custom glazing (e.g., roof lanterns, oversized sliders), smart home integrations, premium hardwood flooring, luxury bespoke kitchens.</li>
                    </ul>

                    <h3>Don't Forget About VAT</h3>
                    <p>
                        When receiving quotes from builders, strictly clarify whether they are quoting <strong>inclusive or exclusive of VAT</strong>. 20% is a huge sum on a build project. Our calculator explicitly breaks out the 20% VAT element so you aren't hit with unexpected surprises.
                    </p>

                    <h3>The Contingency Fund</h3>
                    <p>
                        As seen in the calculator results, we always calculate a 10% contingency into your maximum range. Groundworks can reveal unexpected pipes. Soil types might require deeper trenches. You might decide you prefer the more expensive tiles midway through the build. Always secure a contingency fund before breaking ground.
                    </p>
                </article>
            </div>
        </div>
    );
}
