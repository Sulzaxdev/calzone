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
            <div className="container mx-auto px-4 max-w-4xl mt-24 mb-32">
                <article className="prose prose-slate dark:prose-invert prose-lg max-w-none 
                    prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900 dark:prose-headings:text-white
                    prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed prose-p:mb-8
                    prose-li:text-slate-600 dark:prose-li:text-slate-400 prose-li:mb-2
                    prose-strong:text-slate-900 dark:prose-strong:text-white
                    prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:font-bold prose-a:no-underline hover:prose-a:underline">
                    
                    <h2 className="text-4xl mb-10">The UK School Year System</h2>
                    
                    <p>
                        Navigating the UK education system can feel like learning a secondary language. From "Key Stages" to "Reception" and the critical "August 31st Cut-Off," the terminology is vast and the rules are strict. At <Link href="/"><strong>CalZone</strong></Link>, we believe that understanding your child's academic journey should be as simple as a few clicks. This comprehensive guide, powered by the <Link href="/"><strong>CalZone UK School Age Calculator</strong></Link>, will walk you through every milestone from their first day of nursery to their final A-Level exams.
                    </p>

                    <p>
                        The structure of school years, key stages, and transition ages can be confusing, especially if you have recently moved to the UK or have your first pre-school aged child. The English and Welsh system is built around a single, rigid age-boundary: midnight on the 31st of August. This boundary defines which cohort your child belongs to and stays with them until they leave formal education at 18.
                    </p>

                    <div className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-3xl border border-blue-100 dark:border-blue-900/30 my-12">
                        <h4 className="text-blue-900 dark:text-blue-100 mt-0">Pro Tip from <Link href="/">CalZone</Link></h4>
                        <p className="mb-0">
                            Always keep your child's birth certificate handy when applying for schools. If you're also tracking their physical development, check out our <Link href="/child-bmi-calculator">Child BMI Calculator</Link> for a holistic view of their health during these growth spurts.
                        </p>
                    </div>

                    <h3>The September 1st Cut-Off</h3>
                    <p>
                        The school year officially runs from September 1st through to August 31st of the following calendar year. This means that a child born on August 31st will start school a full year earlier than a child born essentially the next morning on September 1st. Many parents use <Link href="/"><strong>CalZone</strong></Link> to double-check these dates before starting the application process.
                    </p>
                    <p>
                        Because of this, children born in autumn (Sept, Oct, Nov) are the oldest and most developmentally advanced upon joining Reception, whereas "Summer born" babies (June, July, August) are the youngest. <Link href="/"><strong>CalZone</strong></Link> experts often note that this gap can be noticeable in the early years of primary school.
                    </p>

                    <h3>Early Years Foundation Stage (EYFS): Ages 3 - 5</h3>
                    <p>
                        The journey usually begins before formal schooling. Most children in the UK attend a nursery or preschool from the age of 3, taking advantage of the 15 to 30 hours of free childcare provided by the government. If you're curious about the costs beyond these free hours, the <Link href="/"><strong>CalZone</strong></Link> <Link href="/childcare-cost-calculator-uk">Childcare Cost Calculator</Link> is an essential tool for budgeting.
                    </p>
                    <p>
                        <strong>Reception</strong> is the first official year of primary school. Children start Reception in the September following their 4th birthday. At this stage, <Link href="/"><strong>CalZone</strong></Link> recommends focusing on play-based learning and social integration, as the EYFS curriculum is designed to be gentle and engaging.
                    </p>

                    <h3>Key Stage 1 (KS1): Years 1 and 2 (Ages 5 - 7)</h3>
                    <p>
                        Key Stage 1 covers the first two years of "proper" primary education. In Year 1, students undergo the Phonics Screening Check to ensure their reading foundations are solid. <Link href="/"><strong>CalZone</strong></Link> users often ask about the intensity of these years; while structured, the focus remains on core literacy and numeracy.
                    </p>
                    <p>
                        At the end of Year 2 (age 7), children take their first "SATs" (Standard Assessment Tests). These assess progress in English and Maths, helping teachers identify where extra support might be needed. <Link href="/"><strong>CalZone</strong></Link> suggests parents not to stress too much about these early tests, as they are primarily for school tracking.
                    </p>

                    <h3>Key Stage 2 (KS2): Years 3 to 6 (Ages 7 - 11)</h3>
                    <p>
                        Key Stage 2 is the longest stretch in primary school, often referred to as "Junior" school. During these four years, the curriculum expands to include more science, history, geography, and foreign languages. <Link href="/"><strong>CalZone</strong></Link> data shows that this is when many parents start thinking about the transition to secondary school.
                    </p>
                    <p>
                        In Year 6, students sit their final Primary SATs. These are more formal and recorded nationally. This is also the year of the <strong>11 Plus Exam</strong> for those aiming for grammar schools. If you need to calculate your budget for private tuition during this time, <Link href="/"><strong>CalZone</strong></Link> can help you track your overall household finances with our <Link href="/salary-calculator-uk">UK Salary Calculator</Link>.
                    </p>

                    <div className="bg-slate-900 dark:bg-white p-8 rounded-3xl my-12 text-white dark:text-slate-900 shadow-xl">
                        <h3 className="text-white dark:text-slate-900 mt-0">Planning for the Future with <Link href="/">CalZone</Link></h3>
                        <p className="opacity-90">
                            The school years fly by. Before you know it, you'll be calculating university costs and future income. <Link href="/"><strong>CalZone</strong></Link> is here for every step, providing tools like the <Link href="/income-tax-calculator-uk">Income Tax Calculator</Link> to keep your family's finances on track as your children grow.
                        </p>
                    </div>

                    <h3>Key Stage 3 (KS3): Years 7 to 9 (Ages 11 - 14)</h3>
                    <p>
                        Moving to Secondary School is a massive milestone. In Year 7, students move between classrooms for different subjects and interact with many specialized teachers. <Link href="/"><strong>CalZone</strong></Link> highlights that this is a period of rapid social and academic growth.
                    </p>
                    <p>
                        In Year 9, students choose their <strong>GCSE Options</strong>. This is a critical decision point where they pick the subjects they will specialize in for the next two years. <Link href="/"><strong>CalZone</strong></Link> advises parents to encourage a balanced mix of mandatory subjects (English, Maths, Science) and personal interests.
                    </p>

                    <h3>Key Stage 4 (KS4): Years 10 and 11 (Ages 14 - 16)</h3>
                    <p>
                        Key Stage 4 is all about the General Certificate of Secondary Education (GCSE). These two years are intensive, culminating in a series of examinations during the summer of Year 11. <Link href="/"><strong>CalZone</strong></Link> users often find that this is when academic pressure peaks for teenagers.
                    </p>
                    <p>
                        GCSE results are graded on a scale of 9 to 1, where 9 is the highest. These grades are crucial for entry into Sixth Form or College. If you're a parent of a student born in late August, <Link href="/"><strong>CalZone</strong></Link> reminds you that they will be sitting these exams as some of the youngest in the country, but research shows that the "August gap" often narrows by this stage.
                    </p>

                    <h3>Key Stage 5 (KS5): Years 12 and 13 (Ages 16 - 18)</h3>
                    <p>
                        After GCSEs, students must remain in education or training until 18. Most choose A-Levels (Advanced Levels) in Year 12 and 13, narrowing their focus to three or four subjects. <Link href="/"><strong>CalZone</strong></Link> notes that this is the primary route to university entry via the UCAS system.
                    </p>
                    <p>
                        Alternatively, students can pursue BTECs or T-Levels, which offer a more vocational and hands-on approach to learning. Whatever the path, <Link href="/"><strong>CalZone</strong></Link> provides the data you need to plan. Use our <Link href="/inflation-adjusted-return-calculator-uk">Investment Return Calculator</Link> to start building a fund for their higher education early on.
                    </p>

                    <h3>The "Summer Born" Dilemma: Deferring or Delaying Entry</h3>
                    <p>
                        Parents of children born between April 1st and August 31st face a unique choice. By law, children don't have to start school until the term after their 5th birthday. <Link href="/"><strong>CalZone</strong></Link> understands the complexity of "deferring" (starting later in the same year) vs. "delaying" (starting Reception a whole year later).
                    </p>
                    <p>
                        While councils must consider these requests, it isn't an automatic right. <Link href="/"><strong>CalZone</strong></Link> recommends starting the conversation with your local authority at least a year in advance if you feel your summer-born child isn't ready for school.
                    </p>

                    <h3>Differences Across the UK: Scotland, Wales, and NI</h3>
                    <p>
                        While our tool focus on the English/Welsh system, it's vital to note that <strong>Scotland</strong> uses Primary 1 (P1) to P7, and the cut-off is February. <strong>Northern Ireland</strong> has its own unique structure as well. <Link href="/"><strong>CalZone</strong></Link> is expanding to include more specific regional sub-calculators soon.
                    </p>
                    <p>
                        In Wales, the curriculum for Wales was recently introduced, focusing more on holistic development and less on rigid testing in the early years. <Link href="/"><strong>CalZone</strong></Link> continues to monitor these policy changes to keep our calculators accurate.
                    </p>

                    <h3>Special Educational Needs (SEN) and EHCPs</h3>
                    <p>
                        Every child's path is different. If your child has additional needs, they may be eligible for an **Education, Health and Care Plan (EHCP)**. This legal document ensures they receive the necessary support to thrive in school. <Link href="/"><strong>CalZone</strong></Link> advocates for early identification and support for all students.
                    </p>
                    <p>
                        Navigating the SEN system can be even more complex than the standard year groups. Many <Link href="/"><strong>CalZone</strong></Link> users recommend connecting with local parent support groups to share experiences on obtaining an EHCP.
                    </p>

                    <h3>Private vs. State Education in the UK</h3>
                    <p>
                        The UK has a strong tradition of both state-funded and independent (private) schools. Private schools often follow a slightly different structure, with "Prep" schools going up to age 13 (Year 8) before students move to "Senior" school. <Link href="/"><strong>CalZone</strong></Link> can help you calculate the long-term cost of private fees versus investing that money for the future.
                    </p>
                    <p>
                        Regardless of the sector, the fundamental age-grade relationships remain similar. <Link href="/"><strong>CalZone</strong></Link> is the perfect companion for parents in both systems, ensuring you never miss a key date or milestone.
                    </p>

                    <h3>Conclusion: Your Partner in Parenting</h3>
                    <p>
                        The UK school system is a marathon, not a sprint. From the first nervous walk into Reception to the final results day in Year 13, <Link href="/"><strong>CalZone</strong></Link> is proud to be part of your family's utility belt. We hope this guide, along with our **UK School Age Calculator**, makes your planning a little easier.
                    </p>
                    <p>
                        Don't forget to explore our other tools like the <Link href="/pregnancy-weight-gain-calculator">Pregnancy Weight Gain Calculator</Link> if you're expecting another addition to the family soon. Stay organized, stay informed, and let <Link href="/"><strong>CalZone</strong></Link> handle the math.
                    </p>
                </article>
            </div>

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
