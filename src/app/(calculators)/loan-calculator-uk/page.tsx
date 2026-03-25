"use client";

import React, { useState, useRef } from "react";
import { Download, Info, CheckCircle2, FileText, PieChart, CreditCard } from "lucide-react";

import jsPDF from "jspdf";
import Link from "next/link";

export default function LoanCalculator() {
    const [loanAmount, setLoanAmount] = useState<string>("10000");
    const [interestRate, setInterestRate] = useState<string>("5.5");
    const [loanTerm, setLoanTerm] = useState<string>("5");
    const [termType, setTermType] = useState<"years" | "months">("years");
    const [isExporting, setIsExporting] = useState(false);

    const calculatorRef = useRef<HTMLDivElement>(null);

    // Math Logic
    const principal = parseFloat(loanAmount) || 0;
    const annualRate = parseFloat(interestRate) || 0;
    let termInMonths = parseFloat(loanTerm) || 0;

    if (termType === "years") {
        termInMonths = termInMonths * 12;
    }

    let monthlyPayment = 0;
    let totalRepayment = 0;
    let totalInterest = 0;

    if (principal > 0 && termInMonths > 0) {
        if (annualRate > 0) {
            const monthlyRate = annualRate / 100 / 12;
            monthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termInMonths));
            totalRepayment = monthlyPayment * termInMonths;
            totalInterest = totalRepayment - principal;
        } else {
            monthlyPayment = principal / termInMonths;
            totalRepayment = principal;
            totalInterest = 0;
        }
    }

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
            pdf.text("Personal Loan Calculation Report", 15, 20);
            
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
            pdf.save("Loan-Calculation-Report.pdf");
        } catch (err) {
            console.error("Failed to export", err);
        } finally {
            if (exportButton) exportButton.style.opacity = '1';
            setIsExporting(false);
        }
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(val);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
            <div className="h-20 bg-white dark:bg-slate-950"></div>

            {/* Hero Section */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
                        <CreditCard className="w-4 h-4" />
                        UK Finance Toolkit
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Personal Loan Calculator UK
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Find out exactly how much a personal loan or car finance will cost you each month. See total interest paid and plan your debt repayments effectively.
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
                                Loan Details
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
                            {/* Loan Amount */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                    Loan Amount (£)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xl">£</span>
                                    <input
                                        type="number"
                                        value={loanAmount}
                                        onChange={(e) => setLoanAmount(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-10 pr-4 text-2xl font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Interest Rate */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                        Annual Interest Rate (APR %)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={interestRate}
                                            onChange={(e) => setInterestRate(e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 px-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all pr-12 text-xl font-mono"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xl">%</span>
                                    </div>
                                </div>

                                {/* Term */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                        Loan Term
                                    </label>
                                    <div className="flex gap-2 relative">
                                        <input
                                            type="number"
                                            value={loanTerm}
                                            onChange={(e) => setLoanTerm(e.target.value)}
                                            className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 px-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-xl font-mono"
                                        />
                                        <select
                                            value={termType}
                                            onChange={(e) => setTermType(e.target.value as "years" | "months")}
                                            className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl px-4 font-bold text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-blue-500/20"
                                        >
                                            <option value="years">Years</option>
                                            <option value="months">Months</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Results Panel */}
                        <div className="mt-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 relative z-10">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                                <PieChart className="w-4 h-4" />
                                Repayment Breakdown
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800">
                                    <span className="text-slate-600 dark:text-slate-400 font-medium">Original Loan Amount</span>
                                    <span className="font-bold text-slate-900 dark:text-white text-lg">
                                        {formatCurrency(principal)}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800 text-rose-500">
                                    <span className="font-medium">Total Interest Applied</span>
                                    <span className="font-bold">+ {formatCurrency(totalInterest)}</span>
                                </div>

                                <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
                                    <span className="font-bold">Total Amount to Repay</span>
                                    <span className="font-bold text-xl">{formatCurrency(totalRepayment)}</span>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 gap-4">
                                    <div>
                                        <span className="block text-slate-800 dark:text-slate-200 font-black text-xl">Monthly Payment</span>
                                        <span className="text-sm text-slate-500">For {Math.floor(termInMonths)} Months</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="block font-black text-blue-600 dark:text-blue-400 text-4xl">
                                            {formatCurrency(monthlyPayment)}
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
                            <Info className="w-5 h-5 text-blue-500" /> Loan Tips
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Watch the APR</p>
                                    <p className="text-xs text-slate-500 mt-1">Lenders advertise a 'Representative APR' but you might be offered a higher rate based on credit history.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Avoid Extended Terms</p>
                                    <p className="text-xs text-slate-500 mt-1">Stretching a loan over 7 or 10 years lowers monthly costs, but dramatically increases total interest.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Early Repayment Rules</p>
                                    <p className="text-xs text-slate-500 mt-1">Check if your lender charges a fee (ERC) if you try to clear your debt ahead of schedule.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-linear-to-br from-indigo-600 to-blue-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-600/20">
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-3">
                            <FileText className="w-5 h-5 text-blue-200" /> Save your Quote
                        </h3>
                        <p className="text-sm text-blue-100 mb-6 leading-relaxed">
                            Applying for a car loan or consolidating debt? Export your calculated monthly breakdown into a clean PDF using the button in the calculator to compare directly with actual bank quotes.
                        </p>
                    </div>
                </div>
            </div>

            {/* --- SEO Deep Content Section --- */}
            <div className="container mx-auto px-4 max-w-4xl mt-24">
                <article className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400">
                    <h2>The Ultimate Guide to UK Personal Loans (Updated 2026)</h2>
                    <p>
                        Whether you are funding a house extension, buying a new car, or consolidating multiple streams of aggressive credit card debt, taking out a personal loan is a serious financial commitment. The <strong>Loan Calculator UK</strong> above gives you absolute clarity on your upcoming debt structure.
                    </p>

                    <h3>How Personal Loan Interest is Calculated</h3>
                    <p>
                        In the UK, almost all personal loans operate on an <strong>amortization schedule</strong>. This means your monthly payment remains identical every single month, but the <em>composition</em> of that payment shifts over time.
                    </p>
                    <p>
                        During the first few months of a 5-year loan, a massive chunk of your £200 monthly payment is being swallowed by interest, and very little is actually knocking down the core amount you borrowed (the principal). However, by month 55, almost all of that £200 is destroying the principal, because the remaining balance generating interest is so small.
                    </p>

                    <h3>APR (Annual Percentage Rate) vs Simple Interest</h3>
                    <p>
                        The UK Financial Conduct Authority (FCA) requires lenders to display the true cost of borrowing using an APR figure. APR includes both the headline interest rate <em>and</em> any mandatory, unavoidable fees attached to the loan (like an arrangement fee).
                    </p>
                    <ul>
                        <li><strong>Representative APR:</strong> You will often see ads for loans at "5.9% Representative APR". By law, this rate only needs to be offered to 51% of successful applicants. The remaining 49% could be offered 9.9%, 15%, or higher depending on their credit score.</li>
                        <li><strong>Personal APR:</strong> This is the guaranteed rate you are actually offered after undergoing a hard credit check. This is the number you should plug into our calculator.</li>
                    </ul>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-6 my-8 rounded-r-lg">
                        <h4 className="flex items-center gap-2 font-bold text-blue-800 dark:text-blue-600 mt-0">
                            Secured vs Unsecured Loans
                        </h4>
                        <p className="mb-0 text-sm text-blue-900 dark:text-blue-500">
                            Our calculator defaults to logic used across <strong>Unsecured Personal Loans</strong>, which are the most common borrowing channel (usually between £1,000 and £35,000). Secured loans tie the debt against an asset (like your house). If you default on a secured loan, the lender can seize your home to recover the cash. Because the risk is purely on your shoulders, secured loans often carry cheaper interest rates.
                        </p>
                    </div>

                    <h3>Is it smart to take out a long-term loan?</h3>
                    <p>
                        When offered the choice between a 3-year term and a 7-year term for a £15,000 car loan, the 7-year term looks visually attractive because the monthly payment drops significantly. However, you are subjecting £15,000 to an extra 48 months of compound interest.
                    </p>
                    <p>
                        By playing with the <strong>Loan Term</strong> field in our calculator above, you can actively watch the "Total Interest Applied" number inflate as you stretch the loan duration out. The mathematical rule of thumb is to secure the shortest possible loan term that still leaves you a comfortable, safe monthly buffer in your budget.
                    </p>

                    <h3>Paying off a loan early (ERC)</h3>
                    <p>
                        Under the Consumer Credit Act, you possess a statutory right to clear a personal loan in full at any time. However, to compensate for lost interest, UK lenders are legally allowed to charge an Early Repayment Charge (ERC), which is universally capped at:
                    </p>
                    <ul>
                        <li>Up to <strong>58 days' interest</strong> (roughly two months).</li>
                    </ul>
                    <p>
                        If you come into sudden wealth, paying the 58 days of penalty interest is still mathematically cheaper than letting the loan coast for another 3 years generating continuous interest.
                    </p>

                </article>
            </div>
        </div>
    );
}
