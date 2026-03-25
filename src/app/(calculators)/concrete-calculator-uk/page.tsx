"use client";

import React, { useState, useRef } from "react";
import { Download, Info, CheckCircle2, FileText, Pickaxe, Package } from "lucide-react";

import jsPDF from "jspdf";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { RelatedTools } from "@/components/layout/related-tools";

export default function ConcreteCalculator() {
    const [length, setLength] = useState<string>("5");
    const [width, setWidth] = useState<string>("4");
    const [depth, setDepth] = useState<string>("0.15"); // 15cm is standard slab depth
    const [wastage, setWastage] = useState<string>("5"); // 5% standard waste

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    // Logic
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const d = parseFloat(depth) || 0;
    const wastePercent = parseFloat(wastage) || 0;

    // Base Volume in cubic meters (m3)
    const baseVolume = l * w * d;

    // Total Volume with wastage
    const wasteMultiplier = 1 + (wastePercent / 100);
    const totalVolume = baseVolume * wasteMultiplier;

    // Concrete weight - roughly 2400kg per cubic meter
    const totalWeightKg = totalVolume * 2400;

    // Number of standard 20kg bags
    const standardBags20kg = Math.ceil(totalWeightKg / 20);

    // Number of standard 25kg bags
    const standardBags25kg = Math.ceil(totalWeightKg / 25);

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
            pdf.text("Concrete Volume Report", 15, 20);
            
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
            pdf.save("Concrete-Calculation-Report.pdf");
        } catch (err) {
            console.error("Failed to export", err);
        } finally {
            if (exportButton) exportButton.style.opacity = '1';
            setIsExporting(false);
        }
    };

    const formatNumber = (val: number, maxDigits: number = 2) => {
        return new Intl.NumberFormat("en-GB", { maximumFractionDigits: maxDigits }).format(val);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
            <BreadcrumbSchema items={[
                { name: "Home", item: "/" },
                { name: "Construction & DIY", item: "/construction-diy" },
                { name: "Concrete Calculator", item: "/concrete-calculator-uk" }
            ]} />
            <CalculatorSchema
                title="Concrete Calculator | Volume & Bag Estimator for UK Slabs"
                description="Calculate exactly how much concrete volume (m³) you need for your slab, patio, or footings. It also estimates the number of premixed bags required."
                slug="/concrete-calculator-uk"
            />
            <div className="h-20 bg-white dark:bg-slate-950"></div>

            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
                        <Pickaxe className="w-4 h-4" />
                        UK Construction & DIY
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Concrete Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Calculate exactly how much concrete volume (m³) you need for your slab, patio, or footings. It also estimates the number of premixed bags required.
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

                        <div className="flex justify-between items-center mb-10 relative z-10">
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Measurements (in Meters)
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
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                        Length (m)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={length}
                                        onChange={(e) => setLength(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 px-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 text-xl font-mono transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                        Width (m)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={width}
                                        onChange={(e) => setWidth(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 px-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 text-xl font-mono transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                        Depth (m)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={depth}
                                        onChange={(e) => setDepth(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 px-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 text-xl font-mono transition-all"
                                    />
                                    <p className="text-xs text-slate-500 mt-2 ml-1">Example: 15cm = 0.15m</p>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                    Wastage Allowance (%)
                                </label>
                                <div className="relative md:w-1/3">
                                    <input
                                        type="number"
                                        value={wastage}
                                        onChange={(e) => setWastage(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 transition-all pr-10"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                                </div>
                            </div>
                        </div>

                        {/* Results Panel */}
                        <div className="mt-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 relative z-10">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                                <Package className="w-4 h-4" />
                                Materials Needed
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                                    <span className="font-medium">Raw Volume (No Waste)</span>
                                    <span className="font-bold">{formatNumber(baseVolume, 3)} m³</span>
                                </div>

                                <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                                    <span className="font-medium">Estimated Total Weight</span>
                                    <span className="font-bold">{formatNumber(totalWeightKg, 0)} kg</span>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-2 gap-4">
                                    <div>
                                        <span className="block text-slate-800 dark:text-slate-200 font-black text-xl">Total Volume Required</span>
                                        <span className="text-sm text-slate-500">Including {wastage}% waste margin</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="block font-black text-blue-600 dark:text-blue-400 text-4xl">
                                            {formatNumber(totalVolume, 3)} <span className="text-2xl">m³</span>
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-4">
                                    <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">20kg Premixed Bags</p>
                                        <p className="text-2xl font-black text-slate-900 dark:text-white">{standardBags20kg} <span className="text-sm text-slate-400">bags</span></p>
                                    </div>
                                    <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">25kg Premixed Bags</p>
                                        <p className="text-2xl font-black text-slate-900 dark:text-white">{standardBags25kg} <span className="text-sm text-slate-400">bags</span></p>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white dark:bg-slate-950 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-4 dark:text-white">
                            <Info className="w-5 h-5 text-blue-500" /> Laying Concrete Guide
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Minimum Depth</p>
                                    <p className="text-xs text-slate-500 mt-1">For a garden shed base or patio, 100mm (0.1m) is usually sufficient. For driveways carrying vehicles, aim for 150mm (0.15m) minimum.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Why add wastage?</p>
                                    <p className="text-xs text-slate-500 mt-1">Formwork is rarely perfectly square, the sub-base is rarely perfectly level, and spillage occurs. A 5% to 10% wastage margin prevents you from running short mid-pour.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Ready-Mix vs Bags</p>
                                    <p className="text-xs text-slate-500 mt-1">If your total volume exceeds 1.5 m³, it is vastly easier (and often cheaper) to order a ready-mix concrete lorry rather than hand-mixing hundreds of heavy bags.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-linear-to-br from-indigo-600 to-blue-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-600/20">
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-3">
                            <FileText className="w-5 h-5 text-blue-200" /> Export Materials List
                        </h3>
                        <p className="text-sm text-blue-100 mb-6 leading-relaxed">
                            Heading to B&Q, Wickes, or Travis Perkins? Generate a PDF of your exact material requirements using the button to show the builder's merchant desk exactly what you need.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-4xl mt-24">
                <article className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400">
                    <h2>How to Calculate Concrete Volume</h2>
                    <p>
                        Whether you are pouring footings for a new house extension, laying a heavy-duty driveway, or simply establishing a small 100mm slab for a wooden shed, accuracy is vital. Getting your volume measurements wrong means either frantic mid-pour trips to the DIY store or paying exorbitant fees for surplus concrete disposal. Use our <strong>Concrete Calculator</strong> to eradicate the guesswork entirely.
                    </p>

                    <h3>The Mathematics of Concrete Volume (m³)</h3>
                    <p>
                        Volume is simply a measurement of 3D space. To determine the volume of a standard rectangular or square slab, you multiply the Length, Width, and Depth together.
                    </p>
                    <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl font-mono text-center my-6">
                        Length (m) × Width (m) × Depth (m) = Volume (m³)
                    </div>
                    <p>
                        For example, if you are designing a patio that stretches 5 meters out from your house, is 4 meters wide, and 15 centimeters deep, you must first ensure all units match. Convert 15 centimeters to meters (0.15m), and compute: 5 × 4 × 0.15 = 3 cubic meters (m³).
                    </p>

                    <h3>How much does a cubic meter of concrete weigh?</h3>
                    <p>
                        The density of standard C20 or C30 structural concrete is generally considered to be roughly <strong>2,400 kilograms per cubic meter</strong>. That is 2.4 metric tonnes. This is crucial to know if you are hand-mixing it from bags, or determining if your sub-base and formwork can physically handle the hydraulic pressure and weight of wet concrete.
                    </p>

                    <h3>Bag Conversions</h3>
                    <p>
                        If you are opting to buy premixed bags (containing Portland cement, sand, and aggregate) from a British DIY store like Wickes or B&Q, they typically arrive in 20kg or 25kg formats.
                    </p>
                    <ul>
                        <li>To fill 1m³ of space, you need approximately 2,400kg.</li>
                        <li>Divided by 20kg bags, this equals <strong>120 bags per cubic meter</strong>.</li>
                        <li>Divided by 25kg bags, this equals <strong>96 bags per cubic meter</strong>.</li>
                    </ul>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-6 my-8 rounded-r-lg">
                        <h4 className="flex items-center gap-2 font-bold text-blue-800 dark:text-blue-600 mt-0">
                            When to hire a Ready-Mix Lorry?
                        </h4>
                        <p className="mb-0 text-sm text-blue-900 dark:text-blue-500">
                            Hand-mixing 120 bags of concrete (plus dragging them into your garden) is grueling, back-breaking labor that takes an entire day. Furthermore, concrete sets rapidly. If you mix too slowly, a "cold joint" forms where the old batch cures before the new batch is poured against it, creating immediate structural weakness. As a general rule of thumb, anything over <strong>1.5 cubic meters</strong> warrants calling a local line-pump or ready-mix lorry.
                        </p>
                    </div>

                </article>
            </div>
            <RelatedTools currentCategory="Construction & DIY" currentSlug="/concrete-calculator-uk" />
        </div>
    );
}
