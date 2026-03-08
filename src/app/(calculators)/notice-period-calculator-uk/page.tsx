"use client";

import React, { useState, useRef } from "react";
import { Calculator, Download, Info, CheckCircle2, FileText, Calendar, CalendarDays } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Link from "next/link";

export default function NoticePeriodCalculator() {
    const [resignationDate, setResignationDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [noticeLength, setNoticeLength] = useState<number>(4);
    const [noticeUnit, setNoticeUnit] = useState<"weeks" | "months">("weeks");
    const [isExporting, setIsExporting] = useState(false);

    const calculatorRef = useRef<HTMLDivElement>(null);

    // Calculate Last Working Day
    const calculateLastDay = () => {
        if (!resignationDate) return null;

        const date = new Date(resignationDate);
        if (noticeUnit === "weeks") {
            date.setDate(date.getDate() + (noticeLength * 7));
        } else if (noticeUnit === "months") {
            date.setMonth(date.getMonth() + noticeLength);
        }
        return date;
    };

    const lastDay = calculateLastDay();

    const formatDate = (date: Date | null) => {
        if (!date) return "--/--/----";
        return date.toLocaleDateString("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
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
            pdf.text("UK Notice Period Report", 15, 15);
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 15, 22);
            pdf.addImage(imgData, "PNG", 15, 30, pdfWidth - 30, pdfHeight - 30);
            pdf.save("Notice-Period-Report.pdf");
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
                        <Calendar className="w-4 h-4" />
                        UK Career Toolkit
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        UK Notice Period Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Find out exactly what your last working day will be. Simply input your resignation date and contractual notice length below.
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
                                Your Details
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
                                    Resignation Date (Handing in Notice)
                                </label>
                                <input
                                    type="date"
                                    value={resignationDate}
                                    onChange={(e) => setResignationDate(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 px-4 text-xl font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                        Notice Length
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={noticeLength}
                                        onChange={(e) => setNoticeLength(Number(e.target.value))}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    />
                                </div>
                                <div className="flex flex-col justify-end">
                                    <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
                                        <button
                                            onClick={() => setNoticeUnit("weeks")}
                                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${noticeUnit === "weeks" ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
                                        >
                                            Weeks
                                        </button>
                                        <button
                                            onClick={() => setNoticeUnit("months")}
                                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${noticeUnit === "months" ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
                                        >
                                            Months
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Results Panel */}
                        <div className="mt-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 relative z-10">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                                <CalendarDays className="w-4 h-4" />
                                Your Exit Timeline
                            </h3>

                            <div className="space-y-6">
                                <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800">
                                    <span className="text-slate-600 dark:text-slate-400 font-medium">Notice Given On</span>
                                    <span className="font-bold text-slate-900 dark:text-white">
                                        {formatDate(new Date(resignationDate))}
                                    </span>
                                </div>

                                <div className="flex flex-col pt-2 gap-4">
                                    <span className="block text-slate-800 dark:text-slate-200 font-black text-xl">Your Last Working Day will be:</span>
                                    <div className="text-left bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/50">
                                        <span className="block font-black text-blue-600 dark:text-blue-400 text-2xl sm:text-3xl">
                                            {formatDate(lastDay)}
                                        </span>
                                        <span className="text-sm font-bold text-blue-800/60 dark:text-blue-200/60 mt-2 block">
                                            Don't forget to account for any untaken annual leave which could bring this date forward!
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
                            <Info className="w-5 h-5 text-blue-500" /> Statutory vs Contractual Notice
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Statutory Notice</p>
                                    <p className="text-xs text-slate-500 mt-1">By UK law, you must give at least 1 week's notice if you have worked for your employer for 1 month or more.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Contractual Notice</p>
                                    <p className="text-xs text-slate-500 mt-1">Always check your employment contract. It almost always requires more notice than the statutory minimum (e.g. 1-3 months).</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-linear-to-br from-indigo-600 to-blue-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-600/20">
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-3">
                            <FileText className="w-5 h-5 text-blue-200" /> Export Your Dates
                        </h3>
                        <p className="text-sm text-blue-100 mb-6 leading-relaxed">
                            Once you have your calculated exit date, export it as a PDF. It can be useful to attach this calculation or use it as a reference point when drafting your formal resignation letter to HR.
                        </p>
                    </div>
                </div>
            </div>

            {/* --- SEO Deep Content Section --- */}
            <div className="container mx-auto px-4 max-w-4xl mt-24">
                <article className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400">
                    <h2>Everything You Need to Know About UK Notice Periods</h2>
                    <p>
                        Resigning from a job can be a stressful process, and calculating your exact finish date shouldn't add to that stress. Our Notice Period Calculator is designed to quickly work out your final working day based on standard UK employment practices.
                    </p>

                    <h3>How to Give Notice Properly</h3>
                    <p>
                        Once you've decided to leave, you should hand your notice in writing. This is usually done via a formal resignation letter or email to your line manager and HR department. The 'Notice Given On' date in our calculator should be the day you hand this letter in.
                    </p>
                    <ul>
                        <li><strong>Be clear about your dates:</strong> Explicitly state "my notice period is [X] weeks/months, making my final working day [Date]."</li>
                        <li><strong>Keep it professional:</strong> Regardless of why you are leaving, a polite, standard resignation letter leaves a good final impression.</li>
                    </ul>

                    <h3>What About My Annual Leave?</h3>
                    <p>
                        If you have accrued annual leave that you haven't taken yet, you generally have two options (subject to your employer's agreement):
                    </p>
                    <ol>
                        <li><strong>Take the leave during your notice period:</strong> This means your official "employment end date" stays the same, but your "last physically in the office day" gets brought forward.</li>
                        <li><strong>Get paid in lieu:</strong> You work all the way up to your calculated final day, and the employer pays you for the untaken holiday in your final paycheck.</li>
                    </ol>

                    <h3>Can I Leave Sooner? ("Gardening Leave" & PILON)</h3>
                    <p>
                        Sometimes, if you handle sensitive information or are leaving for a competitor, your employer might put you on <strong>Gardening Leave</strong>. You serve your notice period at home, fully paid, but aren't allowed to work or contact clients.
                    </p>
                    <p>
                        Alternatively, they might offer <strong>PILON (Pay In Lieu Of Notice)</strong>, where your employment ends immediately, but you receive a lump sum payment equivalent to what you would have earned during the notice period.
                    </p>

                </article>
            </div>
        </div>
    );
}
