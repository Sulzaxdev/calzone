"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, GraduationCap, Link } from "lucide-react";
import { FAQAccordion } from "@/components/ui/faq-accordion";

// Using a dynamic form schema with field arrays
const formSchema = z.object({
    modules: z.array(
        z.object({
            grade: z.number().min(0).max(100, { message: "Grade must be 0-100" }),
            credits: z.number().min(1, { message: "Credits must be > 0" }),
        })
    ).min(1, { message: "Add at least one module." }),
});

type ResultData = {
    weightedAverage: number;
    classification: string;
};

export default function UniversityGradeCalculator() {
    const [result, setResult] = useState<ResultData | null>(null);

    const { register, control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            modules: [
                { grade: 70, credits: 20 },
                { grade: 65, credits: 20 },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        name: "modules",
        control,
    });

    const getClassification = (average: number) => {
        if (average >= 70) return "First Class Honours (1st)";
        if (average >= 60) return "Upper Second Class (2:1)";
        if (average >= 50) return "Lower Second Class (2:2)";
        if (average >= 40) return "Third Class (3rd)";
        return "Fail";
    };

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        let totalWeightedGrades = 0;
        let totalCredits = 0;

        values.modules.forEach((mod) => {
            totalWeightedGrades += mod.grade * mod.credits;
            totalCredits += mod.credits;
        });

        const average = totalCredits === 0 ? 0 : totalWeightedGrades / totalCredits;

        setResult({
            weightedAverage: Number(average.toFixed(2)),
            classification: getClassification(average),
        });
    };

    return (
            <section className="mt-20 max-w-6xl mx-auto space-y-16 px-4">
                <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 md:p-20 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none transition-all">
                    {/* Title and Intro */}
                    <div className="space-y-8 mb-16">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-3xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shadow-inner border border-blue-200 dark:border-blue-800">
                                <GraduationCap className="w-8 h-8 text-blue-600" />
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                                Degree Classification: <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Master Your UK University Grade</span>
                            </h2>
                        </div>
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl font-medium">
                            In the UK, your degree isn't just a number—it's a classification that defines your academic standing. Understanding how your module credits and grades combine is crucial for securing that coveted First Class Honours.
                        </p>
                    </div>

                    {/* Detailed Long-Form Sections */}
                    <div className="space-y-24">
                        {/* Section 1: The Weighting System */}
                        <div className="space-y-12">
                            <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">01</span>
                                <h3 className="text-4xl font-black text-slate-900 dark:text-white">The Weighted Credit System</h3>
                            </div>
                            <div className="grid lg:grid-cols-2 gap-16">
                                <div className="space-y-8">
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                        UK universities use a "credit-weighted" system to calculate your final grade. This means that a 40-credit dissertation has double the impact on your final classification compared to a 20-credit module. 
                                    </p>
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                        To find your average, you multiply your mark in each module by its credit value, sum those results, and then divide by the total number of credits. This weighted average is what determines your overall percentage and subsequent classification. Our calculator automates this math, allowing you to project your final result based on current performance.
                                    </p>
                                </div>
                                <div className="bg-blue-50/50 dark:bg-blue-900/10 p-10 rounded-[3rem] border border-blue-100 dark:border-blue-800/50 flex flex-col justify-center">
                                    <div className="text-center space-y-4">
                                        <div className="text-sm font-bold text-slate-500 uppercase tracking-widest font-mono">The Calculation</div>
                                        <div className="text-2xl md:text-3xl font-black text-blue-600 font-mono">
                                            Final % = <br/>
                                            <div className="mt-4 border-t-2 border-blue-200 pt-4">
                                                Σ(Module Mark × Credits)<br/>
                                                <div className="text-slate-300 my-2">÷</div>
                                                Total Credits
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Classifications Breakdown */}
                        <div className="space-y-12">
                            <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">02</span>
                                <h3 className="text-4xl font-black text-slate-900 dark:text-white">UK Degree Classifications</h3>
                            </div>
                            <div className="prose prose-slate dark:prose-invert max-w-none">
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Your final percentage translates into one of four main honours categories. Employers often use these as a primary filter for graduate schemes and entry-level professional roles.
                                </p>
                                <div className="grid md:grid-cols-2 gap-8 my-12">
                                    <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 shadow-sm border-l-8 border-l-emerald-500">
                                        <h4 className="text-xl font-bold mb-2">First Class (1st)</h4>
                                        <p className="text-slate-500 text-sm leading-relaxed">
                                            The highest level of achievement, usually requiring an average of 70% or higher. It demonstrates exceptional understanding and research capability.
                                        </p>
                                    </div>
                                    <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 shadow-sm border-l-8 border-l-blue-500">
                                        <h4 className="text-xl font-bold mb-2">Upper Second (2:1)</h4>
                                        <p className="text-slate-500 text-sm leading-relaxed">
                                            The most common requirement for top graduate jobs. Typically requires an average between 60% and 69%.
                                        </p>
                                    </div>
                                    <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 shadow-sm border-l-8 border-l-amber-500">
                                        <h4 className="text-xl font-bold mb-2">Lower Second (2:2)</h4>
                                        <p className="text-slate-500 text-sm leading-relaxed">
                                            An average between 50% and 59%. Often referred to as a "Desmond," it is still a respectable degree but may limit some career paths.
                                        </p>
                                    </div>
                                    <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 shadow-sm border-l-8 border-l-red-500">
                                        <h4 className="text-xl font-bold mb-2">Third Class (3rd)</h4>
                                        <p className="text-slate-500 text-sm leading-relaxed">
                                            The lowest honours classification, requiring an average between 40% and 49%.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Strategic Study */}
                        <div className="space-y-12">
                            <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">03</span>
                                <h3 className="text-4xl font-black text-slate-900 dark:text-white">Module Strategy</h3>
                            </div>
                            <div className="grid md:grid-cols-2 gap-12">
                                <div className="p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-inner">
                                    <h4 className="text-xl font-bold mb-6 text-blue-600 uppercase tracking-widest text-sm">Dissertation Impact</h4>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Your final year project or dissertation often carries the most weight (40 or 60 credits). Scoring high here can pull up an entire semester of lower grades. Use our calculator to see exactly what mark you need in your dissertation to jump from a 2:1 to a 1st.
                                    </p>
                                </div>
                                <div className="p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-inner">
                                    <h4 className="text-xl font-bold mb-6 text-blue-600 uppercase tracking-widest text-sm">Credit Management</h4>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Not all modules are created equal. Focus your energy on high-credit modules where every mark gained has a disproportionate effect on your overall average. Balancing your effort based on credit weighting is the smartest way to study.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div className="pt-20">
                            <FAQAccordion faqs={[
                                {
                                    question: "What is a 2:1 in percentage?",
                                    answer: "An Upper Second Class (2:1) is typically awarded for an overall average between 60.0% and 69.9%."
                                },
                                {
                                    question: "How do module credits affect my grade?",
                                    answer: "Credits act as weightings. A 30-credit module is worth 50% more than a 20-credit module in your final average calculation. You multiply each grade by its credits to get its 'weight'."
                                },
                                {
                                    question: "Do first-year grades count towards my degree?",
                                    answer: "At most UK universities, first-year results do not contribute to your final classification (often called 'Level 4'). However, they are usually a prerequisite for continuing to the second year. Second and third-year results typically carry a 1:2 or 1:3 ratio weighting."
                                },
                                {
                                    question: "What is 'Degree Algorithm'?",
                                    answer: "It is the specific set of rules your university uses to calculate your final grade. This includes how they weight different years (e.g., Year 2 vs Year 3) and whether they drop your lowest-performing module."
                                }
                            ]} />
                        </div>
                    </div>

                    {/* CTA Footer */}
                    <div className="mt-24 p-12 rounded-[3.5rem] bg-linear-to-br from-blue-600 to-indigo-700 text-white shadow-2xl relative overflow-hidden text-center md:text-left">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="space-y-6 max-w-xl">
                                <h3 className="text-3xl md:text-4xl font-black tracking-tight">Need a GPA Conversion?</h3>
                                <p className="text-blue-100 text-lg leading-relaxed">
                                    If you're applying for grad school in the US, you'll need to convert your UK honours to a 4.0 scale.
                                </p>
                            </div>
                            <Link href="/gpa-calculator" className="px-12 py-6 bg-white text-blue-600 rounded-[2rem] font-black text-xl hover:scale-105 transition-transform shadow-xl whitespace-nowrap">
                                GPA Calculator
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
    );
}
