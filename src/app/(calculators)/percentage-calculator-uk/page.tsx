"use client";

import React, { useState, useRef } from "react";
import { Download, Info, CheckCircle2, FileText, Percent, ArrowRight } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function PercentageCalculator() {
    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    // Type 1: What is X% of Y?
    const [calc1X, setCalc1X] = useState("20");
    const [calc1Y, setCalc1Y] = useState("150");
    const calc1Result = (parseFloat(calc1X) / 100) * parseFloat(calc1Y);

    // Type 2: X is what percent of Y?
    const [calc2X, setCalc2X] = useState("30");
    const [calc2Y, setCalc2Y] = useState("150");
    const calc2Result = (parseFloat(calc2X) / parseFloat(calc2Y)) * 100;

    // Type 3: Percentage Change from X to Y
    const [calc3X, setCalc3X] = useState("100");
    const [calc3Y, setCalc3X_Y] = useState("120");
    const calc3Diff = parseFloat(calc3Y) - parseFloat(calc3X);
    const calc3Result = (calc3Diff / parseFloat(calc3X)) * 100;

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
            pdf.text("Percentage Calculations", 15, 15);
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 15, 22);
            pdf.addImage(imgData, "PNG", 15, 30, pdfWidth - 30, pdfHeight - 30);
            pdf.save("Percentage-Calculation.pdf");
        } catch (error) {
            console.error("Failed to export", error);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
            <div className="h-20 bg-white dark:bg-slate-950"></div>

            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
                        <Percent className="w-4 h-4" />
                        Everyday Maths
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Percentage Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Quickly calculate percentages off, percentage increases or decreases, and find out what fraction one number is of another.
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
                                Calculations
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

                        <div className="space-y-10 relative z-10">

                            {/* Type 1 */}
                            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-4">What is <span className="text-blue-500">X%</span> of <span className="text-blue-500">Y</span>?</h3>
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <div className="relative w-full sm:w-32">
                                        <input
                                            type="number"
                                            value={calc1X}
                                            onChange={(e) => setCalc1X(e.target.value)}
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                                    </div>
                                    <span className="text-slate-400 font-bold shrink-0">of</span>
                                    <div className="w-full sm:w-32">
                                        <input
                                            type="number"
                                            value={calc1Y}
                                            onChange={(e) => setCalc1Y(e.target.value)}
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                                        />
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-300 hidden sm:block shrink-0 mx-2" />
                                    <div className="w-full sm:flex-1 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl py-3 px-4 text-center">
                                        <span className="font-black text-blue-600 dark:text-blue-400 text-xl">
                                            {!isNaN(calc1Result) ? calc1Result.toLocaleString("en-GB", { maximumFractionDigits: 4 }) : "0"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Type 2 */}
                            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-4"><span className="text-blue-500">X</span> is what percent of <span className="text-blue-500">Y</span>?</h3>
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <div className="w-full sm:w-32">
                                        <input
                                            type="number"
                                            value={calc2X}
                                            onChange={(e) => setCalc2X(e.target.value)}
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                                        />
                                    </div>
                                    <span className="text-slate-400 font-bold shrink-0">is</span>
                                    <div className="w-full sm:w-32">
                                        <input
                                            type="number"
                                            value={calc2Y}
                                            onChange={(e) => setCalc2Y(e.target.value)}
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                                        />
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-300 hidden sm:block shrink-0 mx-2" />
                                    <div className="w-full sm:flex-1 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl py-3 px-4 text-center">
                                        <span className="font-black text-blue-600 dark:text-blue-400 text-xl">
                                            {!isNaN(calc2Result) ? calc2Result.toLocaleString("en-GB", { maximumFractionDigits: 4 }) + "%" : "0%"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Type 3 */}
                            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-4">Percentage change from <span className="text-blue-500">X</span> to <span className="text-blue-500">Y</span></h3>
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <div className="w-full sm:w-32">
                                        <input
                                            type="number"
                                            value={calc3X}
                                            onChange={(e) => setCalc3X(e.target.value)}
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                                        />
                                    </div>
                                    <span className="text-slate-400 font-bold shrink-0">to</span>
                                    <div className="w-full sm:w-32">
                                        <input
                                            type="number"
                                            value={calc3Y}
                                            onChange={(e) => setCalc3X_Y(e.target.value)}
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                                        />
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-300 hidden sm:block shrink-0 mx-2" />
                                    <div className="w-full sm:flex-1 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl py-3 px-4 text-center">
                                        <span className={`font-black text-xl ${isNaN(calc3Result) ? "text-slate-400" : calc3Result > 0 ? "text-green-600 dark:text-green-400" : calc3Result < 0 ? "text-rose-600 dark:text-rose-400" : "text-blue-600 dark:text-blue-400"}`}>
                                            {!isNaN(calc3Result) && calc3Result > 0 ? "+" : ""}
                                            {!isNaN(calc3Result) ? calc3Result.toLocaleString("en-GB", { maximumFractionDigits: 4 }) + "%" : "0%"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white dark:bg-slate-950 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-4 dark:text-white">
                            <Info className="w-5 h-5 text-blue-500" /> Common Formulas
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">X% of Y</p>
                                    <p className="text-xs text-slate-500 font-mono bg-slate-100 dark:bg-slate-800 p-1 rounded inline-block mt-2">Y * (X / 100)</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">X as a % of Y</p>
                                    <p className="text-xs text-slate-500 font-mono bg-slate-100 dark:bg-slate-800 p-1 rounded inline-block mt-2">(X / Y) * 100</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">% Change from X to Y</p>
                                    <p className="text-xs text-slate-500 font-mono bg-slate-100 dark:bg-slate-800 p-1 rounded inline-block mt-2">((Y - X) / X) * 100</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-linear-to-br from-indigo-600 to-blue-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-600/20">
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-3">
                            <FileText className="w-5 h-5 text-blue-200" /> Save your Data
                        </h3>
                        <p className="text-sm text-blue-100 mb-6 leading-relaxed">
                            Applying percentage changes to business margins? Calculate your differences and click the export button to save an organized PDF of your calculations.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-4xl mt-24">
                <article className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400">
                    <h2>How to Calculate Percentages</h2>
                    <p>
                        The word "percentage" comes from the Latin <em>per centum</em>, meaning "by the hundred". It is simply a ratio expressed as a fraction of 100. Whether you are trying to calculate a 20% discount on a commercial invoice, or figuring out your body fat percentage increase over the holidays, our <strong>Percentage Calculator</strong> handles the heavy lifting instantly.
                    </p>

                    <h3>Finding X% of Y</h3>
                    <p>
                        This is the most common real-world percentage problem. For instance, what is 15% of £250? To solve this manually, you convert the percentage into a decimal by dividing by 100 (15 / 100 = 0.15). You then multiply the base number by this decimal (250 × 0.15 = 37.5).
                    </p>

                    <h3>Finding what percentage one number is of another</h3>
                    <p>
                        If you scored 45 marks out of a possible 60 on an exam, what is your percentage grade?
                    </p>
                    <p>
                        The mathematical approach is to divide the part by the whole to get a decimal (45 ÷ 60 = 0.75). You then multiply by 100 to shift the decimal point two places to the right, yielding 75%.
                    </p>

                    <h3>Calculating Percentage Increase or Decrease</h3>
                    <p>
                        Percentage difference (or sequence change) is heavily used in finance, stock market tracking, and science to measure growth or decay over time.
                    </p>
                    <ul>
                        <li><strong>Step 1:</strong> Find the absolute difference between the two values (New Value - Old Value).</li>
                        <li><strong>Step 2:</strong> Divide that difference by the <em>Old Value</em>.</li>
                        <li><strong>Step 3:</strong> Multiply the final decimal by 100.</li>
                    </ul>
                    <p>
                        If your rent increased from £1,200 to £1,350, the difference is £150. Dividing 150 by 1,200 gives 0.125. Multiply by 100, and you see your rent suffered a 12.5% increase.
                    </p>

                </article>
            </div>
        </div>
    );
}
