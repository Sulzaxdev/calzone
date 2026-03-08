"use client";

import React, { useState, useRef } from "react";
import { Download, Info, CheckCircle2, FileText, CarFront } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function CarTaxRefundCalculator() {
    const [annualTax, setAnnualTax] = useState<number>(190);
    const [monthsRemaining, setMonthsRemaining] = useState<number>(5);
    const [paymentMethod, setPaymentMethod] = useState<"annual" | "monthly">("annual");

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const calculateRefund = () => {
        // DVLA only refunds whole unused months.
        // They base the refund strictly on the standard 12-month rate.
        // If you paid by 6-month or Direct Debit (which includes a 5% surcharge), the surcharge is NOT REFUNDED.

        let refundAmount = 0;
        let monthlyAmount = annualTax / 12;

        if (monthsRemaining > 0) {
            refundAmount = monthlyAmount * monthsRemaining;
        }

        // If you pay monthly by DD, you don't actually get a "cash refund" for future months, you just stop paying.
        // But for calculation purposes to show the 'value' remaining:
        return {
            refundAmount,
            monthlyAmount: paymentMethod === 'monthly' ? monthlyAmount * 1.05 : monthlyAmount,
            surchargeLost: paymentMethod === 'monthly' ? (annualTax * 0.05) : 0
        };
    };

    const results = calculateRefund();

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(val);
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
            pdf.text("UK Car Tax Refund Estimate", 15, 15);
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 15, 22);
            pdf.addImage(imgData, "PNG", 15, 30, pdfWidth - 30, pdfHeight - 30);
            pdf.save("Tax-Refund-Estimate.pdf");
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
                        <CarFront className="w-4 h-4" />
                        Driving Toolkit
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        UK Car Tax Refund Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Estimate exactly how much Vehicle Excise Duty (VED) the DVLA will refund you when you sell, scrap, or SORN your vehicle.
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
                                Tax Details
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
                                    Base 12-Month Annual Tax Rate
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <span className="text-slate-500 font-bold text-xl">£</span>
                                    </div>
                                    <input
                                        type="number"
                                        value={annualTax || ""}
                                        onChange={(e) => setAnnualTax(Number(e.target.value))}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-10 pr-4 text-xl font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-2">Example: £190 for a standard petrol/diesel car under the post-2017 rules.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                    Full Unused Months Remaining
                                </label>
                                <select
                                    value={monthsRemaining}
                                    onChange={(e) => setMonthsRemaining(Number(e.target.value))}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 px-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                                >
                                    {Array.from({ length: 12 }, (_, i) => i).map((num) => (
                                        <option key={num} value={num}>{num} Full Month{num !== 1 ? 's' : ''}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                    How Did You Pay?
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <button
                                        onClick={() => setPaymentMethod("annual")}
                                        className={`p-3 text-sm text-center rounded-xl border-2 transition-all ${paymentMethod === "annual" ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300 font-bold" : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-200 dark:hover:border-blue-900/50"}`}
                                    >
                                        In one lump sum (12 months)
                                    </button>
                                    <button
                                        onClick={() => setPaymentMethod("monthly")}
                                        className={`p-3 text-sm text-center rounded-xl border-2 transition-all ${paymentMethod === "monthly" ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300 font-bold" : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-200 dark:hover:border-blue-900/50"}`}
                                    >
                                        Direct Debit (Monthly / 6 Months)
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Results Panel */}
                        <div className="mt-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 relative z-10">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                DVLA Outcome
                            </h3>

                            <div className="space-y-4">
                                {paymentMethod === "annual" ? (
                                    <div className="flex flex-col pt-2 gap-4">
                                        <span className="block text-slate-800 dark:text-slate-200 font-black text-xl">Estimated Cash Refund:</span>
                                        <div className="text-left bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl border border-green-100 dark:border-green-900/50">
                                            <span className="block font-black text-green-600 dark:text-green-400 text-3xl sm:text-4xl">
                                                {formatCurrency(results.refundAmount)}
                                            </span>
                                            <span className="text-sm font-bold text-green-800/60 dark:text-green-200/60 mt-2 block">
                                                A cheque typically arrives via post within 4 to 6 weeks.
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col pt-2 gap-4">
                                        <span className="block text-slate-800 dark:text-slate-200 font-black text-xl">Direct Debit Status:</span>
                                        <div className="text-left bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/50">
                                            <span className="block font-black text-blue-600 dark:text-blue-400 text-xl sm:text-2xl mb-2">
                                                DVLA will cancel your Direct Debit.
                                            </span>
                                            <span className="text-sm font-bold text-blue-800/60 dark:text-blue-200/60 block">
                                                Because you pay monthly, you won't receive a massive cheque. The DVLA will simply stop pulling {formatCurrency(results.monthlyAmount)} from your account next month.
                                                Note: You lose the 5% surcharge fee applied to monthly DDs.
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Col: SEO Highlights Sidebar */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white dark:bg-slate-950 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-4 dark:text-white">
                            <Info className="w-5 h-5 text-blue-500" /> VED Rules
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Tax Does Not Transfer</p>
                                    <p className="text-xs text-slate-500 mt-1">When you sell a car, you cannot legally transfer the tax to the new owner. They must tax it immediately, and you claim a refund.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Full Months Only</p>
                                    <p className="text-xs text-slate-500 mt-1">If you notify DVLA on the 3rd of the month, the DVLA keeps the tax for that entire current month. You only get refunded for subsequent months.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* --- SEO Deep Content Section --- */}
            <div className="container mx-auto px-4 max-w-4xl mt-24">
                <article className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400">
                    <h2>How Does DVLA Car Tax Refund Work in the UK?</h2>
                    <p>
                        In October 2014, the DVLA abolished the paper tax disc and introduced a new rule: Vehicle Excise Duty (VED) is no longer transferable when a vehicle changes ownership. If you sell a car with 6 months of tax remaining, the new owner must tax it fresh before driving it, and the DVLA will automatically send you (the previous keeper) a refund for any remaining full months.
                    </p>

                    <h3>When are you eligible for a Car Tax Refund?</h3>
                    <p>You will automatically trigger a refund from the DVLA when you notify them that the vehicle has been:</p>
                    <ul>
                        <li>Sold or transferred to someone else (new keeper).</li>
                        <li>Transferred to the motor trade (sold to a dealership or scrap yard).</li>
                        <li>Taken off the road using a Statutory Off Road Notification (SORN).</li>
                        <li>Exported out of the UK.</li>
                        <li>Written off by your insurance company.</li>
                        <li>Registered as exempt from vehicle tax (e.g. converting a vehicle to be used by a disabled person).</li>
                    </ul>

                    <h3>The "Full Month" Trap</h3>
                    <p>
                        The most important thing to remember is that the DVLA only refunds you for <strong>full unused months</strong>. If you sell your car on the 2nd of February, the DVLA does not pro-rata the cost for the 2 days. You completely lose the tax cost for the entirety of February. Your refund will commence from the 1st of March.
                    </p>
                    <p>
                        Furthermore, the new keeper who buys your car on the 2nd of February will be forced to pay tax for the entirety of February. Structurally, the DVLA receives a "double tax" payment from both citizens for the month in which a car changes hands. Therefore, if you are selling or buying a car, it makes financial sense to execute the transfer on the very last day of the calendar month.
                    </p>

                    <h3>Surcharges and Credit Card Fees</h3>
                    <p>
                        If you chose to pay for your road tax via monthly or six-monthly Direct Debit, the DVLA applied a 5% surcharge on top of the base 12-month rate. If you claim a refund, this 5% surcharge is <strong>not refunded</strong> under any circumstances. The DVLA explicitly bases its refund logic on the lower, base 12-month annual figure.
                    </p>
                </article>
            </div>
        </div>
    );
}
