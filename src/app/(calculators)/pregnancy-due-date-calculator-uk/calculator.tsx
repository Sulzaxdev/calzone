"use client";

import { useState } from "react";
import { format, addDays, differenceInDays } from "date-fns";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, RotateCcw, CalendarHeart, Baby, CalendarDays } from "lucide-react";

export function PregnancyDueDateCalculatorForm() {
    const [calcMethod, setCalcMethod] = useState<"lmp" | "conception" | "ivf">("lmp");

    // Inputs
    const [dateStr, setDateStr] = useState<string>("");
    const [cycleLength, setCycleLength] = useState<string>("28");
    const [ivfType, setIvfType] = useState<string>("5"); // 3-day or 5-day transfer

    const [error, setError] = useState("");
    const [result, setResult] = useState<any>(null);

    const calculateDueDate = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!dateStr) {
            setError("Please select a date.");
            return;
        }

        const inputDate = new Date(dateStr);
        if (isNaN(inputDate.getTime())) {
            setError("Invalid date selected.");
            return;
        }

        let dueDate: Date;
        let conceptionDate: Date;

        if (calcMethod === "lmp") {
            const cycle = parseInt(cycleLength);
            if (isNaN(cycle) || cycle < 20 || cycle > 45) {
                setError("Please enter a valid cycle length between 20 and 45 days.");
                return;
            }
            // Naegele's rule adjusted for cycle length
            // Standard: +280 days from LMP
            // Adjustment: + (Cycle length - 28)
            const daysToAdd = 280 + (cycle - 28);
            dueDate = addDays(inputDate, daysToAdd);
            conceptionDate = addDays(inputDate, 14 + (cycle - 28));

        } else if (calcMethod === "conception") {
            // Conception is considered day 14 of pregnancy theoretically.
            // Full term is 280 days from LMP, so 266 days from conception.
            dueDate = addDays(inputDate, 266);
            conceptionDate = inputDate;

        } else {
            // IVF
            // 3-day transfer: due date is 263 days from transfer
            // 5-day transfer: due date is 261 days from transfer
            const daysToAdd = ivfType === "3" ? 263 : 261;
            dueDate = addDays(inputDate, daysToAdd);
            // Artificial conception date theoretically
            conceptionDate = addDays(dueDate, -266);
        }

        // Calculate current progress
        const today = new Date();
        const totalPregnancyDays = 280; // standard 40 weeks
        // Days elapsed = (Total days) - (Days remaining to due date)
        const daysRemaining = differenceInDays(dueDate, today);
        let daysElapsed = totalPregnancyDays - daysRemaining;

        // Prevent negative or > 280 if past due
        if (daysElapsed < 0) daysElapsed = 0;

        const weeksPregnant = Math.floor(daysElapsed / 7);
        const daysPregnant = daysElapsed % 7;

        let trimester = 1;
        if (weeksPregnant >= 13 && weeksPregnant < 27) trimester = 2;
        if (weeksPregnant >= 27) trimester = 3;

        // Milestones
        const tri1End = addDays(conceptionDate, (13 * 7) - 14); // 13 weeks from theoretical LMP
        const tri2End = addDays(conceptionDate, (27 * 7) - 14); // 27 weeks

        setResult({
            dueDate: format(dueDate, "MMMM do, yyyy"),
            conceptionDate: format(conceptionDate, "MMMM do, yyyy"),
            currentWeek: `${weeksPregnant} weeks, ${daysPregnant} days`,
            trimester,
            daysRemaining: daysRemaining > 0 ? daysRemaining : 0,
            progressPct: Math.min(100, Math.max(0, (daysElapsed / totalPregnancyDays) * 100)),
            milestones: {
                tri1: format(tri1End, "MMM do"),
                tri2: format(tri2End, "MMM do")
            }
        });
    };

    const handleClear = () => {
        setDateStr(""); setCycleLength("28"); setIvfType("5"); setResult(null); setError("");
    };

    return (
        <CalculatorCard
            title="Pregnancy Due Date Calculator"
            description="Calculate your Estimated Due Date (EDD), current trimester, and track important pregnancy milestones."
            hasResult={!!result}
        >
            <form onSubmit={calculateDueDate} className="space-y-6">

                {/* Method Selection */}
                <div className="space-y-2">
                    <Label htmlFor="method" className="font-semibold">Calculation Method</Label>
                    <Select value={calcMethod} onValueChange={(val: any) => { setCalcMethod(val); setResult(null); }}>
                        <SelectTrigger className="h-12 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800" id="method">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="lmp">First Day of Last Period (LMP)</SelectItem>
                            <SelectItem value="conception">Known Conception Date</SelectItem>
                            <SelectItem value="ivf">IVF Transfer Date</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Date Input */}
                    <div className="space-y-2 col-span-1 md:col-span-2">
                        <Label htmlFor="date-input" className="font-semibold">
                            {calcMethod === 'lmp' ? 'First Day of Last Period' :
                                calcMethod === 'conception' ? 'Date of Conception' :
                                    'Date of Embryo Transfer'}
                        </Label>
                        <div className="relative">
                            <CalendarDays className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                            <Input
                                id="date-input"
                                type="date"
                                value={dateStr}
                                onChange={(e) => setDateStr(e.target.value)}
                                className="h-12 pl-12 text-md"
                                required
                            />
                        </div>
                    </div>

                    {/* Dynamic Secondary Inputs */}
                    {calcMethod === "lmp" && (
                        <div className="space-y-2 col-span-1 md:col-span-2 animate-in fade-in zoom-in-95 duration-200">
                            <Label htmlFor="cycle-length" className="font-semibold">Average Cycle Length (Days)</Label>
                            <p className="text-xs text-slate-500 mb-2">Most menstrual cycles are 28 days long.</p>
                            <Input id="cycle-length" type="number" placeholder="28" value={cycleLength} onChange={(e) => setCycleLength(e.target.value)} className="h-12" required />
                        </div>
                    )}

                    {calcMethod === "ivf" && (
                        <div className="space-y-2 col-span-1 md:col-span-2 animate-in fade-in zoom-in-95 duration-200">
                            <Label htmlFor="ivf-type" className="font-semibold">Embryo Age at Transfer</Label>
                            <Select value={ivfType} onValueChange={setIvfType}>
                                <SelectTrigger className="h-12 bg-slate-50 border-slate-200 dark:bg-slate-900 dark:border-slate-800" id="ivf-type">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="3">Day 3 Embryo</SelectItem>
                                    <SelectItem value="5">Day 5 Embryo (Blastocyst)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </div>

                {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-950/30 text-red-600 rounded-xl text-sm font-medium border border-red-200 dark:border-red-900/50 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        {error}
                    </div>
                )}

                <div className="flex gap-4 pt-4">
                    <Button type="button" variant="outline" onClick={handleClear} className="h-14 px-6 border-slate-200 hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800">
                        <RotateCcw className="w-5 h-5" />
                    </Button>
                    <Button type="submit" className="flex-1 h-14 text-lg font-bold shadow-lg shadow-pink-500/20 bg-pink-600 hover:bg-pink-700 text-white">
                        Calculate Due Date
                    </Button>
                </div>
            </form>

            {/* RESULTS RENDERING */}
            {result && (
                <div className="mt-10 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="p-8 rounded-3xl bg-linear-to-br from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-900/10 border border-pink-100 dark:border-pink-900/30 text-center relative overflow-hidden">

                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Baby className="w-32 h-32" />
                        </div>

                        <h3 className="text-sm font-bold uppercase tracking-widest text-pink-500 mb-2">Estimated Due Date (EDD)</h3>
                        <div className={`text-4xl md:text-5xl font-black mb-6 text-pink-600 dark:text-pink-400 drop-shadow-sm`}>
                            {result.dueDate}
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left mb-8">
                            <div className="bg-white/60 dark:bg-black/30 p-4 rounded-2xl shadow-sm border border-white/40 dark:border-white/5">
                                <p className="text-xs text-slate-500 uppercase font-bold tracking-tight mb-1">Time Pregnant</p>
                                <p className="text-lg font-bold text-slate-800 dark:text-slate-200 leading-tight">{result.currentWeek}</p>
                            </div>
                            <div className="bg-white/60 dark:bg-black/30 p-4 rounded-2xl shadow-sm border border-white/40 dark:border-white/5">
                                <p className="text-xs text-slate-500 uppercase font-bold tracking-tight mb-1">Trimester</p>
                                <p className="text-lg font-bold text-slate-800 dark:text-slate-200">{result.trimester}{result.trimester === 1 ? 'st' : result.trimester === 2 ? 'nd' : 'rd'}</p>
                            </div>
                            <div className="bg-white/60 dark:bg-black/30 p-4 rounded-2xl shadow-sm border border-white/40 dark:border-white/5">
                                <p className="text-xs text-slate-500 uppercase font-bold tracking-tight mb-1">Days to Go</p>
                                <p className="text-lg font-bold text-slate-800 dark:text-slate-200">{result.daysRemaining}</p>
                            </div>
                            <div className="bg-white/60 dark:bg-black/30 p-4 rounded-2xl shadow-sm border border-white/40 dark:border-white/5">
                                <p className="text-xs text-slate-500 uppercase font-bold tracking-tight mb-1">Conception</p>
                                <p className="text-md font-bold text-slate-800 dark:text-slate-200 leading-tight">{result.conceptionDate}</p>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
                                <span>Conception</span>
                                <span>{result.progressPct.toFixed(0)}%</span>
                                <span>Due Date</span>
                            </div>
                            <div className="w-full h-4 bg-white dark:bg-slate-800 rounded-full overflow-hidden shadow-inner border border-slate-100 dark:border-slate-700">
                                <div
                                    className="h-full bg-linear-to-r from-pink-400 to-rose-500 rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: `${result.progressPct}%` }}
                                ></div>
                            </div>

                            {/* Trimester Markers */}
                            <div className="relative w-full h-4 text-[10px] text-slate-400 font-medium">
                                <div className="absolute left-[33%] -translate-x-1/2 flex flex-col items-center">
                                    <div className="h-2 w-px bg-slate-300 dark:bg-slate-700 mb-1"></div>
                                    <span>2nd Tri ({result.milestones.tri1})</span>
                                </div>
                                <div className="absolute left-[66%] -translate-x-1/2 flex flex-col items-center">
                                    <div className="h-2 w-px bg-slate-300 dark:bg-slate-700 mb-1"></div>
                                    <span>3rd Tri ({result.milestones.tri2})</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </CalculatorCard>
    );
}
