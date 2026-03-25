"use client";

import React, { useState, useRef } from "react";
import { Calculator, Download, Plus, Minus, Info, CheckCircle2, FileText, PieChart } from "lucide-react";

import jsPDF from "jspdf";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { RelatedTools } from "@/components/layout/related-tools";

export default function VATCalculator() {
    const [netAmount, setNetAmount] = useState<string>("");
    const [grossAmount, setGrossAmount] = useState<string>("");
    const [vatAmount, setVatAmount] = useState<string>("");
    const [vatRate, setVatRate] = useState<number>(20);
    const [activeTab, setActiveTab] = useState<"add" | "remove">("add");
    const [isExporting, setIsExporting] = useState(false);

    const calculatorRef = useRef<HTMLDivElement>(null);

    // Logic to handle Add VAT
    const handleAddVat = (amount: string, rate: number = vatRate) => {
        const val = parseFloat(amount.replace(/,/g, ""));
        if (isNaN(val)) {
            setVatAmount("");
            setGrossAmount("");
            return;
        }
        const vat = (val * rate) / 100;
        const gross = val + vat;
        setVatAmount(vat.toFixed(2));
        setGrossAmount(gross.toFixed(2));
    };

    // Logic to handle Remove VAT
    const handleRemoveVat = (amount: string, rate: number = vatRate) => {
        const val = parseFloat(amount.replace(/,/g, ""));
        if (isNaN(val)) {
            setVatAmount("");
            setNetAmount("");
            return;
        }
        const net = val / (1 + rate / 100);
        const vat = val - net;
        setVatAmount(vat.toFixed(2));
        setNetAmount(net.toFixed(2));
    };

    const onNetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setNetAmount(val);
        if (activeTab === "add") {
            handleAddVat(val);
        }
    };

    const onGrossChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setGrossAmount(val);
        if (activeTab === "remove") {
            handleRemoveVat(val);
        }
    };

    const switchTab = (tab: "add" | "remove") => {
        setActiveTab(tab);
        if (tab === "add") {
            setGrossAmount("");
            handleAddVat(netAmount);
        } else {
            setNetAmount("");
            handleRemoveVat(grossAmount);
        }
    };

    const changeRate = (rate: number) => {
        setVatRate(rate);
        if (activeTab === "add") {
            handleAddVat(netAmount, rate);
        } else {
            handleRemoveVat(grossAmount, rate);
        }
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
            pdf.text("VAT Calculation Report", 15, 20);
            
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
            pdf.save("VAT-Calculation-Report.pdf");
        } catch (err) {
            console.error("Failed to export", err);
        } finally {
            if (exportButton) exportButton.style.opacity = '1';
            setIsExporting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
            <BreadcrumbSchema items={[
                { name: "Home", item: "/" },
                { name: "Finance", item: "/finance-driving" },
                { name: "VAT Calculator", item: "/vat-calculator-uk" }
            ]} />
            <CalculatorSchema
                title="VAT Calculator UK | Add or Remove UK Value Added Tax"
                description="Instantly add or remove Value Added Tax from any amount. Select current UK rates (20%, 5%, or 0%) to find gross, net, and total tax amounts instantly."
                slug="/vat-calculator-uk"
            />
            {/* Post-Header Spacer */}
            <div className="h-20 bg-white dark:bg-slate-950"></div>

            {/* Hero Section */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
                        <Calculator className="w-4 h-4" />
                        UK Finance Toolkit
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        VAT Calculator UK
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Instantly add or remove Value Added Tax from any amount. Select current UK rates (20%, 5%, or 0%) to find gross, net, and total tax amounts instantly.
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
                        {/* Soft decorative background glow */}
                        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 relative z-10">
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Tax Calculation
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

                        {/* Mode Toggles */}
                        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-8 relative z-10 w-full sm:w-auto">
                            <button
                                onClick={() => switchTab("add")}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold text-sm transition-all ${activeTab === "add"
                                    ? "bg-white dark:bg-slate-900 text-blue-600 shadow-sm"
                                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                                    }`}
                            >
                                <Plus className="w-4 h-4" /> Add VAT
                            </button>
                            <button
                                onClick={() => switchTab("remove")}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold text-sm transition-all ${activeTab === "remove"
                                    ? "bg-white dark:bg-slate-900 text-blue-600 shadow-sm"
                                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                                    }`}
                            >
                                <Minus className="w-4 h-4" /> Remove VAT
                            </button>
                        </div>

                        {/* Main Input */}
                        <div className="mb-8 relative z-10">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                {activeTab === "add" ? "Amount excluding VAT (Net)" : "Amount including VAT (Gross)"}
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xl">£</span>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    value={activeTab === "add" ? netAmount : grossAmount}
                                    onChange={activeTab === "add" ? onNetChange : onGrossChange}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-10 pr-4 text-2xl font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700"
                                />
                            </div>
                        </div>

                        {/* VAT Rate Selection */}
                        <div className="mb-10 relative z-10">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
                                UK VAT Rate
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {[20, 5, 0].map((rate) => (
                                    <button
                                        key={rate}
                                        onClick={() => changeRate(rate)}
                                        className={`py-3 rounded-xl border font-bold text-[15px] transition-all ${vatRate === rate
                                            ? "bg-blue-50 border-blue-600 text-blue-700 dark:bg-blue-900/20 dark:border-blue-500 dark:text-blue-400 shadow-sm ring-1 ring-blue-600/20"
                                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400 dark:hover:border-slate-700"
                                            }`}
                                    >
                                        {rate}% {rate === 20 ? "(Standard)" : rate === 5 ? "(Reduced)" : "(Zero)"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Results Panel */}
                        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 relative z-10">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                                <PieChart className="w-4 h-4" />
                                Calculation Breakdown
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800">
                                    <span className="text-slate-600 dark:text-slate-400 font-medium">Net Amount (ex. VAT)</span>
                                    <span className="font-bold text-slate-900 dark:text-white text-lg">
                                        £{netAmount ? Number(netAmount).toLocaleString("en-GB", { minimumFractionDigits: 2 }) : "0.00"}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800">
                                    <span className="text-slate-600 dark:text-slate-400 font-medium">VAT Element ({vatRate}%)</span>
                                    <span className="font-bold text-rose-500 text-lg">
                                        + £{vatAmount ? Number(vatAmount).toLocaleString("en-GB", { minimumFractionDigits: 2 }) : "0.00"}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-slate-800 dark:text-slate-200 font-black text-xl">Gross Amount (inc. VAT)</span>
                                    <span className="font-black text-blue-600 dark:text-blue-400 text-3xl">
                                        £{grossAmount ? Number(grossAmount).toLocaleString("en-GB", { minimumFractionDigits: 2 }) : "0.00"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Col: SEO Highlights Sidebar */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white dark:bg-slate-950 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-4 dark:text-white">
                            <Info className="w-5 h-5 text-blue-500" /> Quick VAT Facts
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Standard Rate (20%)</p>
                                    <p className="text-xs text-slate-500 mt-1">Applies to most goods and services in the UK.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Reduced Rate (5%)</p>
                                    <p className="text-xs text-slate-500 mt-1">For some goods/services like children's car seats and home energy.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Zero Rate (0%)</p>
                                    <p className="text-xs text-slate-500 mt-1">Books, most food, and children's clothing. Still VAT-taxable but at 0%.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-600/20">
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-3">
                            <FileText className="w-5 h-5 text-blue-200" /> Export Your Data
                        </h3>
                        <p className="text-sm text-blue-100 mb-6 leading-relaxed">
                            Need a record for your bookkeeping? Once you've entered your amounts, click the <strong>Export PDF</strong> button in the calculator to instantly download a shareable report.
                        </p>
                        <Link
                            href="/about"
                            className="inline-block px-4 py-2 bg-white text-blue-600 text-sm font-bold rounded-xl hover:bg-blue-50 transition-colors"
                        >
                            Read our Methodology
                        </Link>
                    </div>
                </div>
            </div>

            {/* --- SEO Deep Content Section --- */}
            <div className="container mx-auto px-4 max-w-4xl mt-24">
                <article className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400">
                    <h2>The Ultimate UK VAT Guide (2026 Updated)</h2>
                    <p>
                        Value Added Tax (VAT) is a consumption tax placed on a product whenever value is added at each stage of the supply chain, from production to the point of sale. If you're a consumer in the UK, you pay VAT on most goods and services. If you're a business owner, understanding how to calculate, add, and remove VAT is a critical daily bookkeeping requirement.
                    </p>
                    <p>
                        Our <strong>Free VAT Calculator UK</strong> above allows you to effortlessly toggle between adding specific VAT percentages or extracting the VAT amount (reverse VAT calculation) from a total cost.
                    </p>

                    <h3>How to manually calculate adding 20% VAT</h3>
                    <p>
                        If you want to know the math behind our calculator, finding the gross amount when you only have the net is straightforward. To add the standard 20% UK VAT rate to a net figure:
                    </p>
                    <ul>
                        <li><strong>Method 1:</strong> Multiply your Net Amount by 1.20. (E.g., £100 × 1.20 = £120 Gross)</li>
                        <li><strong>Method 2:</strong> Divide your Net Amount by 100, multiply it by 20 to find the VAT element, then add it to the original Net Amount.</li>
                    </ul>

                    <h3>How to extract (remove) 20% VAT from a Gross Total</h3>
                    <p>
                        Reverse calculating VAT is slightly different and is a common pitfall. You cannot simply deduct 20% from the Gross Amount. To find the VAT-exclusive Net Amount from a VAT-inclusive Gross amount:
                    </p>
                    <ul>
                        <li><strong>Calculating the Net:</strong> Divide the Gross Amount by 1.20. (E.g., £120 ÷ 1.20 = £100 Net)</li>
                        <li><strong>Calculating the VAT Element only:</strong> Divide the Gross Amount by 6. (E.g., £120 ÷ 6 = £20 VAT)</li>
                    </ul>

                    <h3>Current UK VAT Rates</h3>
                    <p>The UK government, via HMRC, currently dictates three main rates of VAT:</p>
                    <div className="overflow-x-auto not-prose">
                        <table className="min-w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mt-6 mb-8 text-sm">
                            <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-left">
                                <tr>
                                    <th className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">VAT Rate</th>
                                    <th className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">Percentage</th>
                                    <th className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">Applies to</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                <tr>
                                    <td className="py-3 px-4 font-semibold">Standard Rate</td>
                                    <td className="py-3 px-4">20%</td>
                                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Most goods and services (e.g., electronics, streaming services, consultancy).</td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4 font-semibold">Reduced Rate</td>
                                    <td className="py-3 px-4">5%</td>
                                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Children's car seats, mobility aids for older people, some home energy forms.</td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4 font-semibold">Zero Rate</td>
                                    <td className="py-3 px-4">0%</td>
                                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Most food, children's clothes, books, newspapers. (Input VAT can still be reclaimed).</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3>Exempt vs Zero-Rated: What's the difference?</h3>
                    <p>
                        It is a common misconception that "Exempt" and "Zero-Rated" mean the same thing. While both result in no VAT being charged to the final consumer, they have vastly different implications for a business's VAT returns.
                    </p>
                    <p>
                        <strong>Zero-Rated Goods</strong> are VAT-taxable; the rate just happens to be 0%. Because they are taxable, businesses selling zero-rated goods can register for VAT and reclaim the VAT they paid on their own expenses (Input VAT).
                    </p>
                    <p>
                        <strong>Exempt Goods</strong> are totally outside the VAT system. Examples include postage stamps, healthcare services, and insurance. If your business ONLY sells exempt goods, you cannot register for VAT, and therefore cannot reclaim VAT on your business expenses.
                    </p>

                    <hr className="my-10 border-slate-200 dark:border-slate-800" />

                    <h2>Frequently Asked Questions</h2>
                    <div className="space-y-6 mt-8">
                        <div>
                            <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">When must I register for VAT in the UK?</h4>
                            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                                You must register your business for VAT with HMRC if your VAT-taxable turnover exceeds the threshold over any rolling 12-month period. As of the 2025/2026 tax year, the VAT registration threshold is £90,000.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">Is there a difference in VAT between Ireland and the UK?</h4>
                            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                                Yes. While Northern Ireland has specific rules due to the Windsor Framework, the Republic of Ireland has its own set of VAT rates (Standard 23%, Reduced 13.5% and 9%). Our calculator specifically relies on UK HMRC rates.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">Can I change the VAT rate in the calculator?</h4>
                            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                                Absolutely! While the majority of queries rely on the 20% Standard UK Rate, you can instantly swap to 5% or 0% utilizing the segmented controls right above the result breakdown pane.
                            </p>
                        </div>
                    </div>
                </article>
            </div>
            <RelatedTools currentCategory="Finance" currentSlug="/vat-calculator-uk" />
        </div>
    );
}
