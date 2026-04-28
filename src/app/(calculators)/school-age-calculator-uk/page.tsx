"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Calculator, Download, Info, CheckCircle2, FileText, School, GraduationCap, HelpCircle, ChevronDown } from "lucide-react";

import jsPDF from "jspdf";

export default function SchoolAgeCalculator() {
    // English/Welsh school dates based around Sept 1st cut-off
    const [dobYear, setDobYear] = useState<string>("2018");
    const [dobMonth, setDobMonth] = useState<string>("5");
    const [dobDay, setDobDay] = useState<string>("15");

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const calculateSchoolYears = () => {
        const year = parseInt(dobYear);
        const month = parseInt(dobMonth);
        const day = parseInt(dobDay);

        if (!year || !month || !day) return null;

        // The "school cohort" year starts in September. 
        // If born between Sep 1st Year X, to Aug 31st Year X+1, their academic cohort is Year X.
        let cohortStartYear = year;
        if (month > 8) {
            // Born Sept - Dec, they are the older kids in the cohort that starts that same calendar year
            cohortStartYear = year;
        } else {
            // Born Jan - Aug, they are the younger kids in the cohort that started the PREVIOUS calendar year
            cohortStartYear = year - 1;
        }

        // Example: Child born May 2018. cohortStartYear = 2017. 
        // The child turns 4 between Sept 2021 and Aug 2022.
        // Therefore Starts Reception in Sept of (cohortStartYear + 4) -> 2021.

        const startsReception = cohortStartYear + 4;
        const startsSecondary = cohortStartYear + 11; // Year 7
        const gcseYear = cohortStartYear + 15; // Year 11 summer
        const aLevelYear = cohortStartYear + 17; // Year 13 summer

        // Current Academic Year logic
        const today = new Date();
        const currentMonth = today.getMonth(); // 0 is Jan, 8 is Sept
        let currentAcademicYearStart = today.getFullYear();
        if (currentMonth < 8) {
            currentAcademicYearStart -= 1;
        }

        const yearsSinceReceptionStart = currentAcademicYearStart - startsReception;
        let currentYearString = "Not yet in school";

        if (yearsSinceReceptionStart === 0) currentYearString = "Reception";
        else if (yearsSinceReceptionStart >= 1 && yearsSinceReceptionStart <= 6) currentYearString = `Year ${yearsSinceReceptionStart}`;
        else if (yearsSinceReceptionStart >= 7 && yearsSinceReceptionStart <= 13) currentYearString = `Year ${yearsSinceReceptionStart} (Secondary)`;
        else if (yearsSinceReceptionStart > 13) currentYearString = "Finished Sixth Form (Year 13)";

        return {
            startedReception: startsReception,
            startsSecondary,
            gcseYear,
            aLevelYear,
            currentYearString,
            birthCohortClassStr: `Sept ${cohortStartYear} - Aug ${cohortStartYear + 1}`
        };
    };

    const results = calculateSchoolYears();

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
            pdf.text("UK School Age / Year Report", 15, 20);
            
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
            pdf.save("school-year-report.pdf");
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
                        <GraduationCap className="w-4 h-4" />
                        UK Parenting Toolkit
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        UK School Age Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Enter your child's date of birth below to instantly calculate their current UK school year, when they start secondary school, and their GCSE year.
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
                                Child's Details
                            </h2>
                            <button
                                onClick={exportPDF}
                                disabled={isExporting}
                                data-pdf-export-ignore
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
                                    Date of Birth
                                </label>
                                <div className="grid grid-cols-3 gap-4">
                                    <select
                                        value={dobDay}
                                        onChange={(e) => setDobDay(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 px-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                                    >
                                        <option value="">Day</option>
                                        {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                                            <option key={d} value={d}>{d}</option>
                                        ))}
                                    </select>

                                    <select
                                        value={dobMonth}
                                        onChange={(e) => setDobMonth(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 px-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                                    >
                                        <option value="">Month</option>
                                        <option value="0">January</option>
                                        <option value="1">February</option>
                                        <option value="2">March</option>
                                        <option value="3">April</option>
                                        <option value="4">May</option>
                                        <option value="5">June</option>
                                        <option value="6">July</option>
                                        <option value="7">August</option>
                                        <option value="8">September</option>
                                        <option value="9">October</option>
                                        <option value="10">November</option>
                                        <option value="11">December</option>
                                    </select>

                                    <select
                                        value={dobYear}
                                        onChange={(e) => setDobYear(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 px-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                                    >
                                        <option value="">Year</option>
                                        {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - 25 + i).map((y) => (
                                            <option key={y} value={y}>{y}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Results Panel */}
                        {results && (
                            <div className="mt-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 relative z-10">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                                    <School className="w-4 h-4" />
                                    Education Timeline (England & Wales)
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex flex-col pt-2 gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                                        <span className="block text-slate-800 dark:text-slate-200 font-black text-xl">Current Educational Year:</span>
                                        <div className="text-left bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/50">
                                            <span className="block font-black text-blue-600 dark:text-blue-400 text-3xl">
                                                {results.currentYearString}
                                            </span>
                                            <span className="text-sm font-bold text-blue-800/60 dark:text-blue-200/60 mt-2 block">
                                                Part of the {results.birthCohortClassStr} school cohort.
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-800">
                                        <span className="text-slate-600 dark:text-slate-400 font-medium">Joined Reception:</span>
                                        <span className="font-bold text-slate-900 dark:text-white">
                                            September {results.startedReception}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-800">
                                        <span className="text-slate-600 dark:text-slate-400 font-medium">Starts Secondary (Year 7):</span>
                                        <span className="font-bold text-slate-900 dark:text-white">
                                            September {results.startsSecondary}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-800">
                                        <span className="text-slate-600 dark:text-slate-400 font-medium">Takes GCSEs (Year 11):</span>
                                        <span className="font-bold text-slate-900 dark:text-white">
                                            Summer {results.gcseYear}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-slate-600 dark:text-slate-400 font-medium">A-Levels / Leaving (Year 13):</span>
                                        <span className="font-bold text-slate-900 dark:text-white">
                                            Summer {results.aLevelYear}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Col: SEO Highlights Sidebar */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white dark:bg-slate-950 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-4 dark:text-white">
                            <Info className="w-5 h-5 text-blue-500" /> Key School Dates
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Cut-off Date: August 31st</p>
                                    <p className="text-xs text-slate-500 mt-1">In England and Wales, if your child is born on Aug 31st, they will be the youngest in their class. If they are born Sep 1st, they will be the oldest.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Reception Year</p>
                                    <p className="text-xs text-slate-500 mt-1">Children in the UK start Reception in the September following their 4th birthday.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Scotland / Northern Ireland</p>
                                    <p className="text-xs text-slate-500 mt-1">Note: Scotland and NI have completely different naming systems (e.g., P1 to P7, then S1 to S6) and cut-off dates.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* --- SEO Deep Content Section --- */}
            <section className="mt-32 max-w-6xl mx-auto space-y-16 px-4">
                <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 md:p-20 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none transition-all">
                    {/* Header */}
                    <div className="space-y-8 mb-16">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-3xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shadow-inner">
                                <School className="w-8 h-8 text-blue-600" />
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                                The UK Education <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Roadmap: Ages 4 to 18</span>
                            </h2>
                        </div>
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl font-medium">
                            Navigating the UK school system requires understanding the critical "August 31st" boundary. This guide breaks down every milestone from Reception to A-Levels.
                        </p>
                    </div>

                    {/* Detailed Long-Form Sections */}
                    <div className="space-y-24">
                        {/* Section 1: The Cut-Off */}
                        <div className="space-y-12">
                            <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">01</span>
                                <h3 className="text-4xl font-black text-slate-900 dark:text-white">The September 1st Rule</h3>
                            </div>
                            <div className="grid lg:grid-cols-2 gap-16">
                                <div className="space-y-8">
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                        In England and Wales, a child's academic cohort is determined by their age on August 31st. This creates a unique dynamic where the "oldest" child in a class (born September 1st) is nearly a full year older than the "youngest" child (born August 31st).
                                    </p>
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                        This age gap is most noticeable in the early years, particularly in physical development and social maturity. Our calculator uses this precise logic to determine which "Year Group" your child belongs to, helping you plan for admissions deadlines and Key Stage assessments years in advance.
                                    </p>
                                </div>
                                <div className="bg-blue-50/50 dark:bg-blue-900/10 p-10 rounded-[3rem] border border-blue-100 dark:border-blue-800/50 flex flex-col justify-center">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0" />
                                            <span className="font-bold dark:text-white">Reception Start: Age 4 (turning 5)</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0" />
                                            <span className="font-bold dark:text-white">Year 7 Start: Age 11 (turning 12)</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0" />
                                            <span className="font-bold dark:text-white">Year 11 (GCSEs): Age 15 (turning 16)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Key Stages Breakdown */}
                        <div className="space-y-12">
                            <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">02</span>
                                <h3 className="text-4xl font-black text-slate-900 dark:text-white">Key Stages Explained</h3>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {[
                                    { ks: "KS1", years: "Year 1 - 2", focus: "Phonics screening and basic literacy/numeracy." },
                                    { ks: "KS2", years: "Year 3 - 6", focus: "SATs preparation and core subject expansion." },
                                    { ks: "KS3", years: "Year 7 - 9", focus: "Subject specialization and GCSE option choices." },
                                    { ks: "KS4", years: "Year 10 - 11", focus: "GCSE examinations and career planning." }
                                ].map((item, i) => (
                                    <div key={i} className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
                                        <div className="text-blue-600 font-black text-2xl mb-2">{item.ks}</div>
                                        <div className="font-bold text-slate-900 dark:text-white mb-4">{item.years}</div>
                                        <p className="text-sm text-slate-500 leading-relaxed">{item.focus}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Section 3: The Summer Born Policy */}
                        <div className="space-y-12">
                            <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">03</span>
                                <h3 className="text-4xl font-black text-slate-900 dark:text-white">Summer Born Dilemma</h3>
                            </div>
                            <div className="prose prose-slate dark:prose-invert max-w-none">
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Parents of children born between April 1st and August 31st often worry about their child being the youngest in the class. In England, the government allows parents to request that their "summer-born" child starts Reception a year later than their peers.
                                </p>
                                <div className="grid md:grid-cols-2 gap-12 my-12">
                                    <div className="p-10 rounded-[2.5rem] bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800">
                                        <h4 className="text-xl font-bold mb-4 text-indigo-700">Deferring Entry</h4>
                                        <p className="text-sm leading-relaxed">
                                            This means starting school later in the same academic year (e.g., starting in January instead of September). The child remains in their original birth cohort.
                                        </p>
                                    </div>
                                    <div className="p-10 rounded-[2.5rem] bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800">
                                        <h4 className="text-xl font-bold mb-4 text-indigo-700">Delaying Entry</h4>
                                        <p className="text-sm leading-relaxed">
                                            This involves starting Reception a full year later. The child joins the cohort below them. This requires approval from the local admission authority.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 4: Regional Differences */}
                        <div className="space-y-12">
                            <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">04</span>
                                <h3 className="text-4xl font-black text-slate-900 dark:text-white">UK Regional Variations</h3>
                            </div>
                            <div className="grid md:grid-cols-3 gap-8 text-center">
                                <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 shadow-sm">
                                    <div className="text-3xl mb-4">🏴󠁧󠁢󠁳󠁣󠁴󠁿</div>
                                    <h4 className="font-bold mb-2 dark:text-white">Scotland</h4>
                                    <p className="text-xs text-slate-500">Uses Primary 1 to 7 and S1 to S6. Cut-off is late February.</p>
                                </div>
                                <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 shadow-sm">
                                    <div className="text-3xl mb-4">🏴󠁧󠁢󠁷󠁬󠁳󠁿</div>
                                    <h4 className="font-bold mb-2 dark:text-white">Wales</h4>
                                    <p className="text-xs text-slate-500">Similar to England but with a unique focus on the Welsh language and new curriculum standards.</p>
                                </div>
                                <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 shadow-sm">
                                    <div className="text-3xl mb-4">🇬🇧</div>
                                    <h4 className="font-bold mb-2 dark:text-white">Northern Ireland</h4>
                                    <p className="text-xs text-slate-500">Starts P1 at age 4. Cut-off is July 1st, making it the earliest in the UK.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <div className="container mx-auto px-4 max-w-4xl mt-24">
                <div className="bg-white dark:bg-slate-950 rounded-[2.5rem] p-8 sm:p-12 border border-slate-100 dark:border-slate-800 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <HelpCircle className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="grid gap-6">
                        <details className="group cursor-pointer">
                            <summary className="list-none flex items-center justify-between p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all border border-transparent hover:border-blue-100 dark:hover:border-blue-800">
                                <span className="font-bold text-slate-900 dark:text-white pr-4">What is a UK School Age Calculator?</span>
                                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
                            </summary>
                            <div className="px-6 pb-6 pt-4 text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                A UK School Age Calculator is an online tool that determines a child’s school year group and starting age based on their date of birth and UK education system rules.
                            </div>
                        </details>

                        <details className="group cursor-pointer">
                            <summary className="list-none flex items-center justify-between p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all border border-transparent hover:border-blue-100 dark:hover:border-blue-800">
                                <span className="font-bold text-slate-900 dark:text-white pr-4">At what age do children start school in the UK?</span>
                                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
                            </summary>
                            <div className="px-6 pb-6 pt-4 text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                Children usually start school in Reception at age 4 to 5, depending on their date of birth and the academic year cutoff of 1st September.
                            </div>
                        </details>

                        <details className="group cursor-pointer">
                            <summary className="list-none flex items-center justify-between p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all border border-transparent hover:border-blue-100 dark:hover:border-blue-800">
                                <span className="font-bold text-slate-900 dark:text-white pr-4">How does the UK school year system work?</span>
                                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
                            </summary>
                            <div className="px-6 pb-6 pt-4 text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                The UK school year runs from 1st September to 31st August. Children born within this period are grouped into the same academic year.
                            </div>
                        </details>

                        <details className="group cursor-pointer">
                            <summary className="list-none flex items-center justify-between p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all border border-transparent hover:border-blue-100 dark:hover:border-blue-800">
                                <span className="font-bold text-slate-900 dark:text-white pr-4">Can I delay my child’s school start?</span>
                                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
                            </summary>
                            <div className="px-6 pb-6 pt-4 text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                Yes, in some cases parents can defer school entry, especially for children born between April and August, subject to local authority approval.
                            </div>
                        </details>

                        <details className="group cursor-pointer">
                            <summary className="list-none flex items-center justify-between p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all border border-transparent hover:border-blue-100 dark:hover:border-blue-800">
                                <span className="font-bold text-slate-900 dark:text-white pr-4">Is this calculator accurate?</span>
                                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
                            </summary>
                            <div className="px-6 pb-6 pt-4 text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                Yes, the calculator follows standard UK education guidelines, but final placement decisions are made by local schools or councils.
                            </div>
                        </details>
                    </div>
                </div>
            </div>
        </div>
    );
}
