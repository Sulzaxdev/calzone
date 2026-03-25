"use client";

import React, { useState, useRef } from "react";
import { Calculator, Download, Info, CheckCircle2, FileText, School, GraduationCap } from "lucide-react";

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
            <div className="container mx-auto px-4 max-w-4xl mt-24">
                <article className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400">
                    <h2>How Does the UK School Year System Work?</h2>
                    <p>
                        The structure of school years, key stages, and transition ages can be confusing, especially if you have recently moved to the UK or have your first pre-school aged child. The English and Welsh system is built around a single, rigid age-boundary: midnight on the 31st of August.
                    </p>

                    <h3>The September 1st Cut-Off</h3>
                    <p>
                        The school year officially runs from September 1st through to August 31st of the following calendar year. This means that a child born on August 31st will start school a full year earlier than a child born essentially the next morning on September 1st.
                    </p>
                    <p>
                        Because of this, children born in autumn (Sept, Oct, Nov) are the oldest and most developmentally advanced upon joining Reception, whereas "Summer born" babies (June, July, August) are the youngest.
                    </p>

                    <h3>Primary School (Ages 4 - 11)</h3>
                    <p>Primary schools cover children from the ages of 4 up to 11. It is broken down into:</p>
                    <ul>
                        <li><strong>Early Years Foundation Stage (EYFS):</strong> Reception (Turns 5 during the yr)</li>
                        <li><strong>Key Stage 1 (KS1):</strong> Year 1 (Turns 6) and Year 2 (Turns 7)</li>
                        <li><strong>Key Stage 2 (KS2):</strong> Year 3 through to Year 6 (Turns 11). Children sit their final SATs at the end of Year 6.</li>
                    </ul>

                    <h3>Secondary School (Ages 11 - 16)</h3>
                    <p>After finishing Year 6, children transition to "big school", officially known as Secondary School or High School.</p>
                    <ul>
                        <li><strong>Key Stage 3 (KS3):</strong> Year 7 through to Year 9.</li>
                        <li><strong>Key Stage 4 (KS4):</strong> Year 10 and Year 11. This is the crucial stage where students study for and ultimately sit their GCSE examinations in summer.</li>
                    </ul>

                    <h3>Further Education / Sixth Form (Ages 16 - 18)</h3>
                    <p>
                        By UK law, teenagers must stay in some form of education or approved apprenticeship until they are 18. If they follow the traditional academic path, they will remain at a Sixth Form or College for <strong>Year 12 and Year 13</strong>, culminating in A-Level exams.
                    </p>
                </article>
            </div>
        </div>
    );
}
