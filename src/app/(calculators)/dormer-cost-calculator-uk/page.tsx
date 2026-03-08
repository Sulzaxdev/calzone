"use client";

import React, { useState, useRef } from "react";
import { Calculator, Download, Info, CheckCircle2, FileText, Home, ArrowUpRight } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function DormerCostCalculator() {
    const [dormerType, setDormerType] = useState<"flat" | "gable" | "l-shaped">("flat");
    const [size, setSize] = useState<"small" | "medium" | "large">("medium");
    const [includeBathroom, setIncludeBathroom] = useState<boolean>(false);

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    // Costs (UK averages 2024 per type and size in square metres: small ~15m2, medium ~25m2, large ~35m2)
    // Flat roof: £1400/m2, Gable: £1700/m2, L-Shaped: £1600/m2 
    const calculateCost = () => {
        let baseCost = 0;
        let sqm = 25;

        // Base square meterage map
        if (size === "small") sqm = 15;
        if (size === "medium") sqm = 25;
        if (size === "large") sqm = 35;

        // Base rate map
        let ratePerSqm = 1400;
        if (dormerType === "flat") ratePerSqm = 1400;
        if (dormerType === "gable") ratePerSqm = 1750;
        if (dormerType === "l-shaped") ratePerSqm = 1600;

        baseCost = ratePerSqm * sqm;

        // Additions
        const bathroomCost = includeBathroom ? 4500 : 0; // ~4.5k for a standard new en-suite plumbing, tiles, suite
        const vat = (baseCost + bathroomCost) * 0.20;

        const totalMin = baseCost + bathroomCost + vat;
        const totalMax = totalMin * 1.15; // 15% contingency/variance

        return {
            baseCost,
            bathroomCost,
            vat,
            totalMin,
            totalMax
        };
    };

    const costs = calculateCost();

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(val);
    };

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
            pdf.text("UK Dormer Loft Conversion Estimate", 15, 15);
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 15, 22);
            pdf.addImage(imgData, "PNG", 15, 30, pdfWidth - 30, pdfHeight - 30);
            pdf.save("Dormer-Cost-Estimate.pdf");
        } catch (error) {
            console.error("Failed to generate PDF", error);
        } finally {
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
                        Dormer Cost Calculator (UK)
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        A dormer loft conversion instantly adds massive living space and value to your home. Calculate the estimated costs based on your roof type and requirements.
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
                                Conversion Specs
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
                                    Dormer Style
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <button
                                        onClick={() => setDormerType("flat")}
                                        className={`p-4 text-sm text-center rounded-xl border-2 transition-all ${dormerType === "flat" ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300 font-bold" : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-200 dark:hover:border-blue-900/50"}`}
                                    >
                                        <span className="block mb-1">⬛</span>
                                        Flat Roof
                                    </button>
                                    <button
                                        onClick={() => setDormerType("gable")}
                                        className={`p-4 text-sm text-center rounded-xl border-2 transition-all ${dormerType === "gable" ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300 font-bold" : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-200 dark:hover:border-blue-900/50"}`}
                                    >
                                        <span className="block mb-1">🏠</span>
                                        Pitched / Gable
                                    </button>
                                    <button
                                        onClick={() => setDormerType("l-shaped")}
                                        className={`p-4 text-sm text-center rounded-xl border-2 transition-all ${dormerType === "l-shaped" ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300 font-bold" : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-200 dark:hover:border-blue-900/50"}`}
                                    >
                                        <span className="block mb-1">📐</span>
                                        L-Shaped
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                    Overall Size Needed
                                </label>
                                <select
                                    value={size}
                                    onChange={(e) => setSize(e.target.value as any)}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 px-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                                >
                                    <option value="small">Small (~15m²) - Good for 1 bedroom/office</option>
                                    <option value="medium">Medium (~25m²) - Good for bedroom + en-suite</option>
                                    <option value="large">Large (~35m²+) - Full length conversion</option>
                                </select>
                            </div>

                            <div className="pt-2">
                                <label className="flex items-start gap-4 cursor-pointer bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:bg-slate-100 transition-colors">
                                    <div className="pt-1">
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                            checked={includeBathroom}
                                            onChange={(e) => setIncludeBathroom(e.target.checked)}
                                        />
                                    </div>
                                    <div>
                                        <span className="block text-base font-bold text-slate-900 dark:text-white">
                                            Include En-suite Bathroom?
                                        </span>
                                        <span className="block text-sm text-slate-600 dark:text-slate-400 mt-1">
                                            Installing plumbing, soil pipes, and a fully fitted bathroom suite generally adds £4,000 - £6,000 to the build.
                                        </span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Results Panel */}
                        <div className="mt-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 relative z-10">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                                <ArrowUpRight className="w-4 h-4" />
                                Outline Cost Breakdown
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800">
                                    <span className="text-slate-600 dark:text-slate-400 font-medium">Core Conversion Labour & Material</span>
                                    <span className="font-bold text-slate-900 dark:text-white">
                                        {formatCurrency(costs.baseCost)}
                                    </span>
                                </div>

                                {includeBathroom && (
                                    <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800 text-blue-500 dark:text-blue-400">
                                        <span className="font-medium">Plumbing & En-suite Fit</span>
                                        <span className="font-bold">
                                            + {formatCurrency(costs.bathroomCost)}
                                        </span>
                                    </div>
                                )}

                                <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800 text-rose-500">
                                    <span className="font-medium">Total VAT (20%)</span>
                                    <span className="font-bold">
                                        + {formatCurrency(costs.vat)}
                                    </span>
                                </div>

                                <div className="flex flex-col pt-2 gap-4">
                                    <span className="block text-slate-800 dark:text-slate-200 font-black text-xl">Total Expected Range:</span>
                                    <div className="text-left bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/50">
                                        <span className="block font-black text-blue-600 dark:text-blue-400 text-3xl sm:text-4xl">
                                            {formatCurrency(costs.totalMin)} <span className="text-xl font-medium text-slate-500">- {formatCurrency(costs.totalMax)}</span>
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
                            <Info className="w-5 h-5 text-blue-500" /> Dormer Guide
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Flat Roof Dormers</p>
                                    <p className="text-xs text-slate-500 mt-1">The most common style. It gives the maximum amount of headroom and floor space internally and is generally the cheapest to build.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Planning Permission</p>
                                    <p className="text-xs text-slate-500 mt-1">Most dormer conversions fall under permitted development if they are at the rear of the property (and you aren't in a conservation area).</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Party Wall Agreements</p>
                                    <p className="text-xs text-slate-500 mt-1">If you live in a semi-detached or terraced house, you will need to serve a Party Wall Notice to your neighbors before structural timber works begin.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* --- SEO Deep Content Section --- */}
            <div className="container mx-auto px-4 max-w-4xl mt-24">
                <article className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400">
                    <h2>Everything You Need to Know About Dormer Loft Conversions (UK)</h2>
                    <p>
                        A dormer loft conversion is one of the most popular ways to extend a house in the UK. Unlike a Velux or "rooflight" conversion—where the original roofline remains completely untouched and windows are simply added—a dormer actually alters the shape of the roof to create vertical walls and a horizontal ceiling. It drastically increases the usable floor space and headroom.
                    </p>

                    <h3>Types of Dormers</h3>
                    <p>
                        The final cost is heavily dictated by the shape and style of the dormer you install:
                    </p>
                    <ul>
                        <li><strong>Flat Roof Dormer:</strong> This is a box-like structure built directly out of the pitched roof. While not always the most aesthetically pleasing from the outside, it provides the maximum amount of internal space.</li>
                        <li><strong>Gabled / Pitched Roof Dormer:</strong> Also known as a "dog-house" dormer, these feature a traditional triangular roof. They look fantastic from the outside and blend seamlessly with period properties, but they offer less internal headroom and are significantly more expensive to build due to the complex roofing angles.</li>
                        <li><strong>L-Shaped Dormer:</strong> Highly common on Victorian terraced properties. It involves building two connecting dormers: one on the main roof, and one on the rear outrigger roof. This essentially creates an entire top floor containing multiple bedrooms and a bathroom.</li>
                    </ul>

                    <h3>What's Included in the Build Cost?</h3>
                    <p>
                        The calculation ranges provided above are estimates for "builder-finished" conversions. This typically includes:
                    </p>
                    <ul>
                        <li><strong>Scaffolding and structural supports:</strong> Including steel beams (RSJs).</li>
                        <li><strong>Carpentry:</strong> Building the dormer timber frame, roof, and floor joists.</li>
                        <li><strong>Insulation & Plasterboarding:</strong> Fully insulated to modern Building Regulations.</li>
                        <li><strong>Stairs:</strong> A custom-built, regulation-compliant staircase from the first floor.</li>
                        <li><strong>Electrics:</strong> Wiring, sockets, and recessed spot lighting.</li>
                    </ul>
                    <p>
                        <strong>What isn't usually included:</strong> Carpet/hardwood finishing, painting and decorating, and premium fixtures.
                    </p>

                    <h3>Do you need Planning Permission?</h3>
                    <p>
                        A massive advantage of dormer conversions in the UK is that they often fall under <strong>Permitted Development Rights (PD)</strong>. This means you do not need formal planning permission, provided your design meets the following criteria:
                    </p>
                    <ol>
                        <li>The dormer is not facing the highway (i.e. it is built at the back of the property).</li>
                        <li>You don't exceed the volume limit. (Your total roof space allowance is 40 cubic metres for terraced houses, and 50 cubic metres for detached/semi-detached).</li>
                        <li>You are not altering the building higher than the highest part of the existing roof.</li>
                    </ol>
                    <p>
                        Even if it falls under PD, you must still comply with <strong>Building Regulations</strong>, which ensures the floor can hold weight, fire safety rules are met, and the stairs are structurally sound.
                    </p>
                </article>
            </div>
        </div>
    );
}
