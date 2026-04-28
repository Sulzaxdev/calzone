"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Calculator, Download, Plus, Trash2, GraduationCap, Info, HelpCircle, ChevronDown, CheckCircle2 } from "lucide-react";
import jsPDF from "jspdf";
import { motion, AnimatePresence } from "framer-motion";

const GRADE_POINTS: Record<string, number> = {
    "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7, "D+": 1.3, "D": 1.0, "F": 0.0
};

const WEIGHTS: Record<string, number> = {
    "Regular": 0, "Honors": 0.5, "AP/IB": 1.0
};

interface Subject {
    id: string;
    name: string;
    grade: string;
    credits: number;
    type: string;
}

export default function WeightedGPACalculator() {
    const [subjects, setSubjects] = useState<Subject[]>([
        { id: "1", name: "Mathematics", grade: "A", credits: 1, type: "Regular" },
        { id: "2", name: "Physics", grade: "A", credits: 1, type: "AP/IB" }
    ]);
    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const addSubject = () => {
        setSubjects([...subjects, { id: Date.now().toString(), name: `Subject ${subjects.length + 1}`, grade: "A", credits: 1, type: "Regular" }]);
    };

    const removeSubject = (id: string) => {
        if (subjects.length > 1) {
            setSubjects(subjects.filter(s => s.id !== id));
        }
    };

    const updateSubject = (id: string, field: keyof Subject, value: any) => {
        setSubjects(subjects.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const calculateGPA = () => {
        let totalUnweightedPoints = 0;
        let totalWeightedPoints = 0;
        let totalCredits = 0;

        subjects.forEach(s => {
            const basePoints = GRADE_POINTS[s.grade] || 0;
            const weight = WEIGHTS[s.type] || 0;
            
            totalUnweightedPoints += basePoints * s.credits;
            totalWeightedPoints += (basePoints + weight) * s.credits;
            totalCredits += s.credits;
        });

        return {
            unweighted: totalCredits > 0 ? totalUnweightedPoints / totalCredits : 0,
            weighted: totalCredits > 0 ? totalWeightedPoints / totalCredits : 0,
            totalCredits
        };
    };

    const results = calculateGPA();

    const exportPDF = async () => {
        if (!calculatorRef.current) return;
        setIsExporting(true);
        try {
            const pdf = new jsPDF("p", "mm", "a4");
            pdf.setFontSize(22);
            pdf.text("Weighted GPA Report", 15, 20);
            pdf.setFontSize(12);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 15, 30);
            pdf.text(`Weighted GPA: ${results.weighted.toFixed(3)}`, 15, 40);
            pdf.text(`Unweighted GPA: ${results.unweighted.toFixed(3)}`, 15, 50);
            
            pdf.save("weighted-gpa-report.pdf");
        } catch (err) {
            console.error(err);
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
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-6">
                        <GraduationCap className="w-4 h-4" />
                        Academic Tools
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Weighted GPA Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Calculate both your weighted and unweighted GPA based on course rigor. Add your classes below and see your academic standing instantly.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Col: Calculator App */}
                <div className="lg:col-span-8">
                    <div
                        ref={calculatorRef}
                        className="bg-white dark:bg-slate-950 rounded-[2rem] p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 dark:border-slate-800 overflow-hidden relative"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Course List
                            </h2>
                            <button
                                onClick={exportPDF}
                                disabled={isExporting}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
                            >
                                <Download className="w-4 h-4" />
                                Export PDF
                            </button>
                        </div>

                        <div className="space-y-4">
                            <AnimatePresence>
                                {subjects.map((sub, index) => (
                                    <motion.div
                                        key={sub.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 items-end"
                                    >
                                        <div className="md:col-span-4">
                                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Subject Name</label>
                                            <input
                                                type="text"
                                                value={sub.name}
                                                onChange={(e) => updateSubject(sub.id, "name", e.target.value)}
                                                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 text-slate-900 dark:text-white"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Grade</label>
                                            <select
                                                value={sub.grade}
                                                onChange={(e) => updateSubject(sub.id, "grade", e.target.value)}
                                                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 text-slate-900 dark:text-white"
                                            >
                                                {Object.keys(GRADE_POINTS).map(g => <option key={g} value={g}>{g}</option>)}
                                            </select>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Credits</label>
                                            <input
                                                type="number"
                                                value={sub.credits}
                                                onChange={(e) => updateSubject(sub.id, "credits", parseFloat(e.target.value) || 0)}
                                                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 text-slate-900 dark:text-white"
                                            />
                                        </div>
                                        <div className="md:col-span-3">
                                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Level</label>
                                            <select
                                                value={sub.type}
                                                onChange={(e) => updateSubject(sub.id, "type", e.target.value)}
                                                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 text-slate-900 dark:text-white font-bold"
                                            >
                                                {Object.keys(WEIGHTS).map(w => <option key={w} value={w}>{w}</option>)}
                                            </select>
                                        </div>
                                        <div className="md:col-span-1 flex justify-end">
                                            <button
                                                onClick={() => removeSubject(sub.id)}
                                                className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            
                            <button
                                onClick={addSubject}
                                className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 hover:text-indigo-500 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-all font-bold flex items-center justify-center gap-2"
                            >
                                <Plus className="w-5 h-5" /> Add Course
                            </button>
                        </div>

                        {/* Result Display */}
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-8 rounded-3xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/50 text-center">
                                <span className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-2 block">Weighted GPA</span>
                                <div className="text-6xl font-black text-indigo-600 dark:text-indigo-400 leading-none mb-2">
                                    {results.weighted.toFixed(3)}
                                </div>
                                <p className="text-sm text-indigo-800/60 dark:text-indigo-200/60 font-medium italic">Calculated on a 5.0 Scale</p>
                            </div>
                            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-center">
                                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2 block">Unweighted GPA</span>
                                <div className="text-6xl font-black text-slate-900 dark:text-white leading-none mb-2">
                                    {results.unweighted.toFixed(3)}
                                </div>
                                <p className="text-sm text-slate-500 font-medium italic">Standard 4.0 Scale</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Col: SEO Highlights Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white dark:bg-slate-950 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-6 dark:text-white">
                            <Info className="w-5 h-5 text-indigo-500" /> GPA Cheat Sheet
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-slate-50 dark:border-slate-900">
                                <span className="text-slate-500 text-sm">A (Regular)</span>
                                <span className="font-bold text-slate-900 dark:text-white">4.0</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-slate-50 dark:border-slate-900">
                                <span className="text-indigo-500 text-sm font-bold">A (Honors)</span>
                                <span className="font-bold text-indigo-600">4.5</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-slate-50 dark:border-slate-900">
                                <span className="text-purple-500 text-sm font-bold">A (AP / IB)</span>
                                <span className="font-bold text-purple-600">5.0</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                                Most US high schools use this weighting to reward students for taking more challenging courses.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- SEO Deep Content Section --- */}
            <section className="mt-32 max-w-6xl mx-auto space-y-16 px-4">
                <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 md:p-20 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none transition-all">
                    {/* Header */}
                    <div className="space-y-8 mb-16">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-3xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shadow-inner border border-indigo-200 dark:border-indigo-800">
                                <Calculator className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                                Academic Rigor: <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Understanding Weighted GPA</span>
                            </h2>
                        </div>
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl font-medium">
                            Your Grade Point Average (GPA) is the single most important number in your high school career. But for many students, the standard 4.0 scale doesn't tell the whole story.
                        </p>
                    </div>

                    {/* Detailed Long-Form Sections */}
                    <div className="space-y-24">
                        {/* Section 1: Weighted vs Unweighted */}
                        <div className="space-y-12">
                            <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">01</span>
                                <h3 className="text-4xl font-black text-slate-900 dark:text-white">Weighted vs. Unweighted</h3>
                            </div>
                            <div className="grid lg:grid-cols-2 gap-16">
                                <div className="space-y-8">
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                        An **Unweighted GPA** is the standard way to calculate your grades, where every class is treated exactly the same. An 'A' in Gym is worth the same 4.0 as an 'A' in Quantum Physics.
                                    </p>
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                        A **Weighted GPA**, however, takes the difficulty of your courses into account. By adding a "weight" (usually +0.5 for Honors and +1.0 for AP or IB classes), schools reward students who take on more academic risk. This allows GPAs to go above 4.0, often peaking at 5.0.
                                    </p>
                                </div>
                                <div className="bg-indigo-50/50 dark:bg-indigo-900/10 p-10 rounded-[3rem] border border-indigo-100 dark:border-indigo-800/50 flex flex-col justify-center">
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                                            <span className="font-bold text-slate-500">Unweighted A</span>
                                            <span className="font-black text-slate-900 dark:text-white">4.0</span>
                                        </div>
                                        <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                                            <span className="font-bold text-indigo-500">Honors A</span>
                                            <span className="font-black text-indigo-600 font-mono">4.5</span>
                                        </div>
                                        <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                                            <span className="font-bold text-purple-500">AP / IB A</span>
                                            <span className="font-black text-purple-600 font-mono">5.0</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Why Colleges Care */}
                        <div className="space-y-12">
                            <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">02</span>
                                <h3 className="text-4xl font-black text-slate-900 dark:text-white">The Admissions Strategy</h3>
                            </div>
                            <div className="prose prose-slate dark:prose-invert max-w-none">
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Colleges and universities don't just look at the final number. They look at your **academic rigor**. If a student has a 4.0 unweighted GPA but only took basic classes, they may be viewed less favorably than a student with a 3.8 who took five AP courses.
                                </p>
                                <div className="grid md:grid-cols-3 gap-8 my-12">
                                    <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 shadow-sm">
                                        <h4 className="font-bold mb-2">Class Rank</h4>
                                        <p className="text-xs text-slate-500">Many schools use weighted GPAs to determine class rank and Valedictorian status.</p>
                                    </div>
                                    <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 shadow-sm">
                                        <h4 className="font-bold mb-2">Scholarships</h4>
                                        <p className="text-xs text-slate-500">Merit-based scholarships often have specific weighted GPA requirements.</p>
                                    </div>
                                    <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 shadow-sm">
                                        <h4 className="font-bold mb-2">Recalculation</h4>
                                        <p className="text-xs text-slate-500">Many elite colleges (like the Ivy League) will recalculate your GPA using their own internal weighting system anyway.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Strategic GPA Management */}
                        <div className="space-y-12">
                            <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">03</span>
                                <h3 className="text-4xl font-black text-slate-900 dark:text-white">Strategic Planning</h3>
                            </div>
                            <div className="grid md:grid-cols-2 gap-12">
                                <div className="p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-inner">
                                    <h4 className="text-xl font-bold mb-6 text-indigo-600 uppercase tracking-widest text-sm">The "C" Trap</h4>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Be careful taking too many AP classes. A 'C' in an AP class (2.0 + 1.0 = 3.0 weighted) is the same as a 'B' in a regular class (3.0). If you are struggling, it might be better to get an 'A' in a regular class than a 'C' in an AP class to protect your unweighted average.
                                    </p>
                                </div>
                                <div className="p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-inner">
                                    <h4 className="text-xl font-bold mb-6 text-indigo-600 uppercase tracking-widest text-sm">Total Credits</h4>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Weighted GPA is heavily influenced by the number of courses you take. If you take many non-weighted electives, they will "dilute" your weighted average. Use our calculator to see the impact of adding a new course before you enroll.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div className="pt-20">
                            <div className="bg-white dark:bg-slate-950 rounded-[2.5rem] p-8 sm:p-12 border border-slate-100 dark:border-slate-800 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
                                <div className="flex items-center gap-3 mb-10">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                        <HelpCircle className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                        Frequently Asked Questions
                                    </h2>
                                </div>

                                <div className="grid gap-6">
                                    {[
                                        { q: "What is the highest possible weighted GPA?", a: "Typically a 5.0, assuming all your classes are AP or IB and you earn all A's. However, some schools use different scales that can go even higher." },
                                        { q: "Do colleges prefer weighted or unweighted GPA?", a: "They look at both, but they prioritize the 'strength of curriculum.' They want to see that you challenged yourself with hard courses and still performed well." },
                                        { q: "Does an A- count as a 4.0?", a: "Usually no. In most systems, an A- is worth 3.7 points. Our calculator uses the standard 4.0 scale for unweighted grades." },
                                        { q: "How do I calculate GPA for 1 credit vs 0.5 credit?", a: "Our calculator handles this automatically. Multiply the grade points by the credit value, sum them, and divide by total credits." }
                                    ].map((faq, i) => (
                                        <details key={i} className="group cursor-pointer">
                                            <summary className="list-none flex items-center justify-between p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all border border-transparent hover:border-indigo-100 dark:hover:border-indigo-800">
                                                <span className="font-bold text-slate-900 dark:text-white pr-4">{faq.q}</span>
                                                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
                                            </summary>
                                            <div className="px-6 pb-6 pt-4 text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                                {faq.a}
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Footer */}
                    <div className="mt-24 p-12 rounded-[3.5rem] bg-linear-to-br from-indigo-600 to-purple-700 text-white shadow-2xl relative overflow-hidden text-center md:text-left">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="space-y-6 max-w-xl">
                                <h3 className="text-3xl md:text-4xl font-black tracking-tight">Applying to UK Universities?</h3>
                                <p className="text-indigo-100 text-lg leading-relaxed">
                                    The UK system uses a different weighting based on module credits. Use our specialized UK Grade Calculator.
                                </p>
                            </div>
                            <Link href="/university-grade-calculator-uk" className="px-12 py-6 bg-white text-indigo-600 rounded-[2rem] font-black text-xl hover:scale-105 transition-transform shadow-xl whitespace-nowrap">
                                UK Grade Calculator
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
