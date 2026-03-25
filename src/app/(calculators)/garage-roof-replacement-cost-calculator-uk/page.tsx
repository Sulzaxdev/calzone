"use client";

import React, { useState, useRef } from "react";
import { Calculator, Download, Info, CheckCircle2, FileText, Home, PoundSterling } from "lucide-react";

import jsPDF from "jspdf";
import Link from "next/link";

export default function GarageRoofCostCalculator() {
    const [garageSize, setGarageSize] = useState<"single" | "double">("single");
    const [material, setMaterial] = useState<"felt" | "epdm" | "fibreglass" | "metal">("felt");
    const [asbestosRemoval, setAsbestosRemoval] = useState<boolean>(false);
    const [isExporting, setIsExporting] = useState(false);

    const calculatorRef = useRef<HTMLDivElement>(null);

    // Approximate UK Cost logic
    let baseCost = 0;

    // Base cost depending on size and material
    if (garageSize === "single") {
        if (material === "felt") baseCost = 800; // £800 - £1200
        if (material === "epdm") baseCost = 1100; // £1100 - £1500
        if (material === "fibreglass") baseCost = 1300; // £1300 - £1800
        if (material === "metal") baseCost = 1500; // £1500 - £2500
    } else {
        if (material === "felt") baseCost = 1400;
        if (material === "epdm") baseCost = 1800;
        if (material === "fibreglass") baseCost = 2200;
        if (material === "metal") baseCost = 2500;
    }

    const maxCost = baseCost * 1.4; // 40% variance for realistic ranges

    // Asbestos removal costs (approx £50 - £80 per sq meter, single is ~15sqm, double is ~30sqm)
    const asbestosCostMin = asbestosRemoval ? (garageSize === "single" ? 750 : 1300) : 0;
    const asbestosCostMax = asbestosRemoval ? (garageSize === "single" ? 1200 : 2000) : 0;

    const totalMin = baseCost + asbestosCostMin;
    const totalMax = maxCost + asbestosCostMax;

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
            pdf.text("Garage Roof Replacement Report", 15, 20);
            
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
            pdf.save("garage-roof-report.pdf");
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
                        <Home className="w-4 h-4" />
                        Home & Property Toolkit
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Garage Roof Replacement Cost Estimator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Leaky roof? Get a quick, realistic estimate for replacing your garage roof in the UK based on size, material choices, and potential asbestos removal.
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
                                Roof Details
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
                                    Garage Size
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setGarageSize("single")}
                                        className={`p-4 rounded-xl border-2 text-center transition-all ${garageSize === "single" ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300 font-bold" : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-200 dark:hover:border-blue-900/50 hover:bg-slate-50 dark:hover:bg-slate-900/50"}`}
                                    >
                                        Single Garage
                                        <span className="block text-xs font-normal opacity-70 mt-1">~15 sq metres</span>
                                    </button>
                                    <button
                                        onClick={() => setGarageSize("double")}
                                        className={`p-4 rounded-xl border-2 text-center transition-all ${garageSize === "double" ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300 font-bold" : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-200 dark:hover:border-blue-900/50 hover:bg-slate-50 dark:hover:bg-slate-900/50"}`}
                                    >
                                        Double Garage
                                        <span className="block text-xs font-normal opacity-70 mt-1">~30 sq metres</span>
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                    Roofing Material
                                </label>
                                <select
                                    value={material}
                                    onChange={(e) => setMaterial(e.target.value as any)}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 px-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                                >
                                    <option value="felt">Standard Roofing Felt (Budget)</option>
                                    <option value="epdm">EPDM / Rubber (Popular, Durable)</option>
                                    <option value="fibreglass">Fibreglass / GRP (Longest Lasting)</option>
                                    <option value="metal">Metal Sheeting (Corrugated/Box Profile)</option>
                                </select>
                            </div>

                            <div className="pt-2">
                                <label className="flex items-start gap-4 cursor-pointer bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:bg-slate-100 transition-colors">
                                    <div className="pt-1">
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                            checked={asbestosRemoval}
                                            onChange={(e) => setAsbestosRemoval(e.target.checked)}
                                        />
                                    </div>
                                    <div>
                                        <span className="block text-base font-bold text-slate-900 dark:text-white">
                                            Asbestos Removal Required?
                                        </span>
                                        <span className="block text-sm text-slate-600 dark:text-slate-400 mt-1">
                                            Does your current roof contain asbestos sheets? Specialist removal and disposal adds significant cost.
                                        </span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Results Panel */}
                        <div className="mt-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 relative z-10">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                                <PoundSterling className="w-4 h-4" />
                                Estimated Cost Breakdown
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800">
                                    <span className="text-slate-600 dark:text-slate-400 font-medium capitalize">
                                        {material} Roof Installation
                                    </span>
                                    <span className="font-bold text-slate-900 dark:text-white">
                                        {formatCurrency(baseCost)} - {formatCurrency(maxCost)}
                                    </span>
                                </div>

                                {asbestosRemoval && (
                                    <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800 text-rose-500">
                                        <span className="font-medium">Specialist Asbestos Removal</span>
                                        <span className="font-bold">
                                            + {formatCurrency(asbestosCostMin)} - {formatCurrency(asbestosCostMax)}
                                        </span>
                                    </div>
                                )}

                                <div className="flex flex-col pt-2 gap-4">
                                    <span className="block text-slate-800 dark:text-slate-200 font-black text-xl">Total Estimated Range:</span>
                                    <div className="text-left bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/50">
                                        <span className="block font-black text-blue-600 dark:text-blue-400 text-3xl sm:text-4xl">
                                            {formatCurrency(totalMin)} - {formatCurrency(totalMax)}
                                        </span>
                                        <span className="text-sm font-bold text-blue-800/60 dark:text-blue-200/60 mt-2 block">
                                            Includes basic materials, labor, and standard waste disposal. Excludes major joist repairs.
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
                            <Info className="w-5 h-5 text-blue-500" /> Material Quick Guide
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Felt (Budget Option)</p>
                                    <p className="text-xs text-slate-500 mt-1">Cheapest to install, but typically only lasts 10-15 years before needing repairs.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">EPDM Rubber (Best Value)</p>
                                    <p className="text-xs text-slate-500 mt-1">Installed in a single seam-free piece. Highly waterproof and lasts up to 50 years.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Fibreglass/GRP (Premium)</p>
                                    <p className="text-xs text-slate-500 mt-1">Extremely tough, visually appealing, and very long-lasting. Costs the most to install.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-linear-to-br from-indigo-600 to-blue-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-600/20">
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-3">
                            <FileText className="w-5 h-5 text-blue-200" /> Export For Quotes
                        </h3>
                        <p className="text-sm text-blue-100 mb-6 leading-relaxed">
                            Generate this estimate as a PDF. Take it to 3 different local roofers to ensure you aren't being overcharged when requesting formal quotes.
                        </p>
                    </div>
                </div>
            </div>

            {/* --- SEO Deep Content Section --- */}
            <div className="container mx-auto px-4 max-w-4xl mt-24">
                <article className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400">
                    <h2>How Much Does it Cost to Replace a Garage Roof in the UK?</h2>
                    <p>
                        A leaking garage roof presents a massive danger to the structure of the garage itself and any items stored inside. Depending on the size of your garage and the material you choose, a full replacement can cost anywhere from £800 to over £3,000. Use our calculator above for an instant estimate, or read on to understand exactly where those costs come from.
                    </p>

                    <h3>1. Size of the Garage</h3>
                    <p>
                        The most obvious cost factor is the area of the roof. Roofers price jobs per square metre (m²).
                    </p>
                    <ul>
                        <li><strong>Single Garage:</strong> Usually around 3 metres by 5 metres (15m²).</li>
                        <li><strong>Double Garage:</strong> Usually around 6 metres by 5 metres (30m²).</li>
                    </ul>

                    <h3>2. Choosing the Right Roofing Material</h3>
                    <p>
                        The material you choose will heavily dictate the final invoice:
                    </p>
                    <ul>
                        <li><strong>Traditional Felt:</strong> The most common flat roofing material in the UK for older garages. It is applied in layers with hot bitumen or torched on. While cheap initially, it is prone to blistering in the sun and cracking in the winter. Life expectancy: 10–15 years.</li>
                        <li><strong>EPDM (Rubber Roofing):</strong> EPDM has rapidly replaced felt as the go-to flat roof product. It's often installed as one single, seamless sheet which drastically cuts down the risk of leaks at joints. It handles UK weather brilliantly. Life expectancy: 40–50 years.</li>
                        <li><strong>GRP (Fibreglass):</strong> Glass Reinforced Plastic is extremely tough (you can safely walk on it) and has no seams. It involves painting resins and laying fibreglass matting. It looks the smartest but requires dry weather to cure properly, and costs the most. Life expectancy: 30+ years.</li>
                    </ul>

                    <h3>3. The Danger (and Cost) of Asbestos</h3>
                    <p>
                        If your garage was built before the year 2000, there is a very high chance the corrugated roof sheets contain white asbestos (chrysotile).
                    </p>
                    <p>
                        You cannot just throw asbestos sheets into a standard skip. They must be carefully dismantled (without breaking them), double-wrapped in heavy-duty polythene, and transported to a licensed hazardous waste facility. Because of the PPE, breathing apparatus, and legal disposal fees required, removing an asbestos garage roof will easily add <strong>£750 to £2000</strong> to your overall bill. Do not attempt to strip an asbestos roof yourself.
                    </p>

                    <h3>Do I Need Planning Permission?</h3>
                    <p>
                        In almost all cases in the UK, simply replacing the existing roof on a standalone garage falls under <strong>Permitted Development</strong>, meaning you do not need planning permission. However, if you are significantly increasing the height of the roof (for example, converting a flat roof into a pitched roof), you should check with your local council's planning portal.
                    </p>

                </article>
            </div>
        </div>
    );
}
