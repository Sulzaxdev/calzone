"use client";

import { useState, useRef } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, RotateCcw, Download, Plus, Trash2, GraduationCap, Percent, BookOpen } from "lucide-react";
import { GradingScale, cgpaToPercentage, percentageToCgpa, calculateGpa, SubjectGrade } from "@/lib/grade-logic";
import jsPDF from "jspdf";
import { motion, AnimatePresence } from "framer-motion";

interface GradeCalculatorProps {
    mode: "cgpa-to-percent" | "percent-to-cgpa" | "gpa-calc" | "marks-to-percent";
    title: string;
    description: string;
}

export function GradeCalculator({ mode, title, description }: GradeCalculatorProps) {
    const [scale, setScale] = useState<GradingScale>(10.0);
    const [inputValue, setInputValue] = useState("");
    const [totalMarks, setTotalMarks] = useState("");
    const [subjects, setSubjects] = useState<SubjectGrade[]>([
        { id: "1", name: "Subject 1", grade: "A1", credits: 4 }
    ]);
    const [history, setHistory] = useState<any[]>([]);
    const [result, setResult] = useState<any>(null);
    const [isExporting, setIsExporting] = useState(false);
    const resultRef = useRef<HTMLDivElement>(null);

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();
        let calcResult = null;

        if (mode === "cgpa-to-percent") {
            const val = parseFloat(inputValue);
            if (val > scale) return;
            const percent = cgpaToPercentage(val, scale);
            calcResult = { value: percent.toFixed(2), unit: "%", label: "Percentage" };
            setHistory([{ id: Date.now(), input: val, result: calcResult.value, scale, type: "CGPA to %" }, ...history]);
        } else if (mode === "percent-to-cgpa") {
            const val = parseFloat(inputValue);
            if (val > 100) return;
            const cgpa = percentageToCgpa(val, scale);
            calcResult = { value: cgpa.toFixed(2), unit: "", label: "CGPA" };
            setHistory([{ id: Date.now(), input: val, result: calcResult.value, scale, type: "% to CGPA" }, ...history]);
        } else if (mode === "gpa-calc") {
            const gpa = calculateGpa(subjects);
            calcResult = { value: gpa.toFixed(2), unit: "", label: "Overall GPA" };
        } else if (mode === "marks-to-percent") {
            const obtained = parseFloat(inputValue);
            const total = parseFloat(totalMarks);
            if (total > 0) {
                const percent = (obtained / total) * 100;
                calcResult = { value: percent.toFixed(2), unit: "%", label: "Marks Percentage" };
            }
        }

        setResult(calcResult);
    };

    const addSubject = () => {
        setSubjects([...subjects, { id: Date.now().toString(), name: `Subject ${subjects.length + 1}`, grade: "A1", credits: 4 }]);
    };

    const removeSubject = (id: string) => {
        setSubjects(subjects.filter(s => s.id !== id));
    };

    const updateSubject = (id: string, field: keyof SubjectGrade, value: any) => {
        setSubjects(subjects.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const exportPDF = async () => {
        if (!resultRef.current) return;
        setIsExporting(true);
        try {
            const pdf = new jsPDF("p", "mm", "a4");
            pdf.setFontSize(20);
            pdf.text(title, 15, 20);
            pdf.setFontSize(12);
            pdf.text(`Result: ${result.value}${result.unit}`, 15, 30);
            // Add table or other details
            pdf.save(`${title.replace(/\s+/g, '-')}.pdf`);
        } catch (err) {
            console.error(err);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <CalculatorCard title={title} description={description} hasResult={!!result}>
            <form onSubmit={handleCalculate} className="space-y-8">
                {mode !== "gpa-calc" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {mode !== "marks-to-percent" && (
                            <div className="space-y-2">
                                <Label>Grading Scale</Label>
                                <Select value={scale.toString()} onValueChange={(v) => setScale(parseFloat(v) as GradingScale)}>
                                    <SelectTrigger className="h-12">
                                        <SelectValue placeholder="Select Scale" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="4.0">4.0 Scale (US)</SelectItem>
                                        <SelectItem value="5.0">5.0 Scale</SelectItem>
                                        <SelectItem value="10.0">10.0 Scale (Standard)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label>{mode === "cgpa-to-percent" ? "Enter CGPA" : mode === "percent-to-cgpa" ? "Enter Percentage" : "Marks Obtained"}</Label>
                            <Input 
                                type="number" 
                                step="0.01" 
                                value={inputValue} 
                                onChange={(e) => setInputValue(e.target.value)} 
                                placeholder="e.g. 8.5" 
                                className="h-12"
                                required
                            />
                        </div>
                        {mode === "marks-to-percent" && (
                            <div className="space-y-2">
                                <Label>Total Marks</Label>
                                <Input 
                                    type="number" 
                                    value={totalMarks} 
                                    onChange={(e) => setTotalMarks(e.target.value)} 
                                    placeholder="e.g. 500" 
                                    className="h-12"
                                    required
                                />
                            </div>
                        )}
                    </div>
                )}

                {mode === "gpa-calc" && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center mb-4">
                            <Label className="text-lg font-bold">Subject Wise Grades</Label>
                            <Button type="button" variant="outline" size="sm" onClick={addSubject} className="gap-2">
                                <Plus className="w-4 h-4" /> Add Subject
                            </Button>
                        </div>
                        <AnimatePresence>
                            {subjects.map((sub, index) => (
                                <motion.div 
                                    key={sub.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800"
                                >
                                    <div className="md:col-span-2">
                                        <Input 
                                            value={sub.name} 
                                            onChange={(e) => updateSubject(sub.id, "name", e.target.value)} 
                                            placeholder="Subject Name"
                                        />
                                    </div>
                                    <Select value={sub.grade} onValueChange={(v) => updateSubject(sub.id, "grade", v)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {["A1", "A2", "B1", "B2", "C1", "C2", "D", "E"].map(g => (
                                                <SelectItem key={g} value={g}>{g}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <div className="flex gap-2">
                                        <Input 
                                            type="number" 
                                            value={sub.credits} 
                                            onChange={(e) => updateSubject(sub.id, "credits", parseFloat(e.target.value))} 
                                            placeholder="Credits"
                                        />
                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeSubject(sub.id)} className="text-red-500 hover:bg-red-50">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => {setResult(null); setInputValue("");}} className="h-14 px-6">
                        <RotateCcw className="w-5 h-5" />
                    </Button>
                    <Button type="submit" className="flex-1 h-14 text-lg font-bold shadow-lg shadow-primary/20 bg-[#1e5eb8] hover:bg-[#164a93]">
                        Calculate Result
                    </Button>
                </div>
            </form>

            {result && (
                <div ref={resultRef} className="mt-12 p-8 rounded-3xl bg-linear-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950/20 border border-blue-100 dark:border-slate-800 text-center animate-in slide-in-from-bottom-4 duration-500">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-800 text-[#1e5eb8] dark:text-blue-400 text-xs font-black uppercase tracking-widest mb-4 shadow-sm">
                        <GraduationCap className="w-4 h-4" /> {result.label}
                    </div>
                    <div className="text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">
                        {result.value}<span className="text-3xl text-slate-400">{result.unit}</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Calculation complete based on your inputs.</p>
                </div>
            )}

            {history.length > 0 && (
                <div className="mt-12 space-y-4">
                    <h4 className="font-bold flex items-center gap-2"><BookOpen className="w-5 h-5 text-indigo-500" /> Calculation History</h4>
                    <div className="rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
                        <Table>
                            <TableHeader className="bg-slate-50 dark:bg-slate-900">
                                <TableRow>
                                    <TableHead>Input</TableHead>
                                    <TableHead>Result</TableHead>
                                    <TableHead>Scale</TableHead>
                                    <TableHead>Type</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {history.map((h) => (
                                    <TableRow key={h.id}>
                                        <TableCell className="font-bold">{h.input}</TableCell>
                                        <TableCell className="text-indigo-600 font-bold">{h.result}</TableCell>
                                        <TableCell>{h.scale}</TableCell>
                                        <TableCell className="text-xs font-medium uppercase text-slate-400">{h.type}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}
        </CalculatorCard>
    );
}
