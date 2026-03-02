"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    RotateCcw,
    Moon,
    Bed,
    Info,
    CheckCircle2,
    AlertCircle,
    HelpCircle,
    Stethoscope,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const questions = [
    "Sitting and reading",
    "Watching TV",
    "Sitting, inactive in a public place (e.g. a theatre or a meeting)",
    "As a passenger in a car for an hour without a break",
    "Lying down to rest in the afternoon when circumstances permit",
    "Sitting and talking to someone",
    "Sitting quietly after a lunch without alcohol",
    "In a car, while stopped for a few minutes in the traffic"
];

const scoringOptions = [
    { label: "0 - Never", value: 0 },
    { label: "1 - Slight", value: 1 },
    { label: "2 - Moderate", value: 2 },
    { label: "3 - High", value: 3 }
];

export function EpworthSleepinessForm() {
    const [scores, setScores] = useState<number[]>(new Array(8).fill(-1));
    const [result, setResult] = useState<any>(null);

    const handleScoreChange = (index: number, value: number) => {
        const newScores = [...scores];
        newScores[index] = value;
        setScores(newScores);
        setResult(null);
    };

    const calculateScore = (e: React.FormEvent) => {
        e.preventDefault();
        if (scores.includes(-1)) return;

        const total = scores.reduce((a, b) => a + b, 0);

        let category = "";
        let color = "";
        let statusColor = "";
        let advice = "";

        if (total <= 5) {
            category = "Lower Normal";
            color = "text-green-500";
            statusColor = "green";
            advice = "Your daytime sleepiness is within the lower normal range. Great sleep health!";
        } else if (total <= 10) {
            category = "Higher Normal";
            color = "text-yellow-500";
            statusColor = "yellow";
            advice = "You have a normal amount of daytime sleepiness, typical for most adults.";
        } else if (total <= 12) {
            category = "Mild Excessive Sleepiness";
            color = "text-orange-500";
            statusColor = "orange";
            advice = "You are experiencing mild excessive daytime sleepiness. Consider your sleep hygiene.";
        } else if (total <= 15) {
            category = "Moderate Excessive Sleepiness";
            color = "text-red-500";
            statusColor = "red";
            advice = "You have moderate excessive daytime sleepiness. It is worth discussing with a GP.";
        } else {
            category = "Severe Excessive Sleepiness";
            color = "text-red-600";
            statusColor = "red";
            advice = "Severe daytime sleepiness. You should consult a sleep specialist to rule out Sleep Apnoea.";
        }

        setResult({ total, category, color, statusColor, advice });
    };

    const handleClear = () => {
        setScores(new Array(8).fill(-1));
        setResult(null);
    };

    const allAnswered = !scores.includes(-1);

    return (
        <CalculatorCard
            title="Epworth Sleepiness Scale (ESS)"
            description="Assess your level of daytime sleepiness using the world-standard clinical screening tool for sleep disorders like Sleep Apnoea or Narcolepsy."
            hasResult={!!result}
        >
            <form onSubmit={calculateScore} className="space-y-12">
                <div className="space-y-8">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center border-b border-slate-100 dark:border-slate-800 pb-4">
                        Rate your chance of dozing in these situations:
                    </p>

                    {questions.map((q, i) => (
                        <div key={i} className="space-y-4 animate-in fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0">
                                    {i + 1}
                                </div>
                                <Label className="text-lg font-bold text-slate-800 dark:text-slate-200 leading-tight pt-1">
                                    {q}
                                </Label>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pl-12">
                                {scoringOptions.map((opt) => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => handleScoreChange(i, opt.value)}
                                        className={`py-3 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${scores[i] === opt.value
                                            ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-[1.02]'
                                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-primary/40'
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex gap-4 pt-8 border-t border-slate-100 dark:border-slate-800">
                    <Button type="button" variant="outline" onClick={handleClear} className="h-16 px-6 rounded-[2rem]">
                        <RotateCcw className="w-5 h-5" />
                    </Button>
                    <Button
                        type="submit"
                        disabled={!allAnswered}
                        className="flex-1 h-16 text-xl font-black shadow-2xl shadow-primary/20 rounded-[2rem] bg-linear-to-br from-primary to-blue-600 disabled:opacity-30 disabled:grayscale transition-all"
                    >
                        Calculate Score
                    </Button>
                </div>
            </form>

            {result && (
                <div className="mt-12 animate-in slide-in-from-bottom-8 duration-700">
                    <div className="p-10 rounded-[4rem] bg-linear-to-br from-slate-50 to-blue-50/50 dark:from-slate-900/60 dark:to-blue-950/20 border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden shadow-2xl">

                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Moon className="w-48 h-48" />
                        </div>

                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Your ESS Score</h3>
                        <div className={`text-[8rem] leading-none font-black mb-4 ${result.color} drop-shadow-sm tabular-nums`}>
                            {result.total}
                            <span className="text-xl text-slate-400 font-bold ml-2">/ 24</span>
                        </div>

                        <div className={`inline-flex items-center gap-2 px-8 py-3 rounded-full font-black text-xl mb-10 border shadow-sm transition-all ${result.statusColor === 'green' ? 'bg-green-100 border-green-200 text-green-700 dark:bg-green-900/40 dark:border-green-800' :
                            result.statusColor === 'yellow' ? 'bg-yellow-100 border-yellow-200 text-yellow-700 dark:bg-yellow-900/40 dark:border-yellow-800' :
                                result.statusColor === 'orange' ? 'bg-orange-100 border-orange-200 text-orange-700 dark:bg-orange-900/40 dark:border-orange-800' :
                                    'bg-red-100 border-red-200 text-red-700 dark:bg-red-900/40 dark:border-red-800'
                            }`}>
                            {result.statusColor === 'green' && <CheckCircle2 className="w-6 h-6" />}
                            {result.statusColor === 'red' && <AlertCircle className="w-6 h-6" />}
                            {result.category}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                            <div className="bg-white/90 dark:bg-black/40 p-8 rounded-[2.5rem] border border-white dark:border-slate-800 shadow-sm">
                                <h4 className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-primary mb-4">
                                    <Moon className="w-5 h-5" />
                                    The Verdict
                                </h4>
                                <p className="text-lg font-bold text-slate-800 dark:text-slate-200 leading-tight">{result.advice}</p>
                            </div>

                            <div className="bg-white/90 dark:bg-black/40 p-8 rounded-[2.5rem] border border-white dark:border-slate-800 shadow-sm">
                                <h4 className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-primary mb-4">
                                    <Stethoscope className="w-5 h-5" />
                                    Clinical Insight
                                </h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                    {result.total > 10
                                        ? "Scores above 10 indicate excessive daytime sleepiness. This is often associated with Sleep Apnoea, which reduces blood oxygen during the night."
                                        : "For most people, a score under 10 is considered healthy. If you still feel tired, consider your 'Sleep Hygiene' like screen time before bed."
                                    }
                                </p>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black max-w-md mx-auto">
                                This tool is a screening instrument and does not provide a formal medical diagnosis. Consult a doctor for clinical sleep studies.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </CalculatorCard>
    );
}
