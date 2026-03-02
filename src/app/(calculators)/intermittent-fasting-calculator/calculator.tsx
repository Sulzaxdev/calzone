"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    RotateCcw,
    Clock,
    Utensils,
    Moon,
    Info,
    CheckCircle2,
    Calendar,
    Zap
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FastingProtocol {
    name: string;
    fast: number;
    eat: number;
    description: string;
}

const protocols: FastingProtocol[] = [
    { name: "16:8", fast: 16, eat: 8, description: "The most popular method. 16 hours of fasting with an 8-hour eating window." },
    { name: "18:6", fast: 18, eat: 6, description: "A slightly more advanced approach for deeper metabolic benefits." },
    { name: "20:4", fast: 20, eat: 4, description: "Also known as the Warrior Diet. Simple 4-hour eating window." },
    { name: "OMAD", fast: 23, eat: 1, description: "One Meal A Day. Intense 23-hour fasting window." },
    { name: "12:12", fast: 12, eat: 12, description: "Beginner-friendly. Even split between eating and fasting." }
];

export function IntermittentFastingForm() {
    const [protocol, setProtocol] = useState<FastingProtocol>(protocols[0]);
    const [startHour, setStartHour] = useState("12");
    const [startMin, setStartMin] = useState("00");
    const [result, setResult] = useState<any>(null);

    const calculateSchedule = (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        const h = parseInt(startHour);
        const m = parseInt(startMin);

        // Eating window start
        const eatStart = new Date();
        eatStart.setHours(h, m, 0, 0);

        // Eating window end
        const eatEnd = new Date(eatStart);
        eatEnd.setHours(eatEnd.getHours() + protocol.eat);

        // Fasting window start (Same as eatEnd)
        const fastStart = new Date(eatEnd);

        // Fasting window end (Same as next day eatStart)
        const fastEnd = new Date(eatStart);
        fastEnd.setDate(fastEnd.getDate() + 1);

        const formatTime = (date: Date) => {
            return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true });
        };

        setResult({
            eatStart: formatTime(eatStart),
            eatEnd: formatTime(eatEnd),
            fastStart: formatTime(fastStart),
            fastEnd: formatTime(fastEnd),
            protocol: protocol.name,
            fastHours: protocol.fast,
            eatHours: protocol.eat
        });
    };

    const handleClear = () => {
        setStartHour("12");
        setStartMin("00");
        setResult(null);
    };

    return (
        <CalculatorCard
            title="FastPlan™ Intermittent Fasting"
            description="Plan your daily eating and fasting windows based on your preferred protocol. Optimize your metabolic health with precision scheduling."
            hasResult={!!result}
        >
            <div className="space-y-8">
                {/* Protocol Selection */}
                <div className="space-y-4">
                    <Label className="text-sm font-bold uppercase tracking-widest text-slate-500">1. Select Your Protocol</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                        {protocols.map((p) => (
                            <button
                                key={p.name}
                                onClick={() => { setProtocol(p); setResult(null); }}
                                className={`flex flex-col items-center justify-center py-4 px-2 rounded-2xl border transition-all ${protocol.name === p.name
                                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 ring-4 ring-primary/10'
                                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-primary/40'
                                    }`}
                            >
                                <span className="text-xl font-black">{p.name}</span>
                                <span className="text-[10px] uppercase font-bold opacity-60">F: {p.fast} E: {p.eat}</span>
                            </button>
                        ))}
                    </div>
                    <p className="text-xs text-slate-500 italic px-1">{protocol.description}</p>
                </div>

                {/* Time Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                    <div className="space-y-4">
                        <Label className="text-sm font-bold uppercase tracking-widest text-slate-500">2. When will you start eating?</Label>
                        <div className="flex items-center gap-3">
                            <div className="flex-1 space-y-2">
                                <Label htmlFor="hour" className="text-[10px] font-bold uppercase opacity-60">Hour</Label>
                                <select
                                    id="hour"
                                    value={startHour}
                                    onChange={(e) => setStartHour(e.target.value)}
                                    className="w-full h-14 bg-slate-50 dark:bg-slate-900 rounded-2xl border-slate-200 dark:border-slate-800 text-xl font-bold px-4 appearance-none focus:ring-2 focus:ring-primary shadow-sm"
                                >
                                    {Array.from({ length: 24 }).map((_, i) => (
                                        <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>
                                    ))}
                                </select>
                            </div>
                            <span className="text-2xl font-bold mt-6 text-slate-300">:</span>
                            <div className="flex-1 space-y-2">
                                <Label htmlFor="min" className="text-[10px] font-bold uppercase opacity-60">Minute</Label>
                                <select
                                    id="min"
                                    value={startMin}
                                    onChange={(e) => setStartMin(e.target.value)}
                                    className="w-full h-14 bg-slate-50 dark:bg-slate-900 rounded-2xl border-slate-200 dark:border-slate-800 text-xl font-bold px-4 appearance-none focus:ring-2 focus:ring-primary shadow-sm"
                                >
                                    {['00', '15', '30', '45'].map((m) => (
                                        <option key={m} value={m}>{m}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button type="button" variant="outline" onClick={handleClear} className="h-14 px-6 rounded-2xl border-slate-200 hover:bg-slate-50">
                            <RotateCcw className="w-5 h-5 text-slate-400" />
                        </Button>
                        <Button onClick={() => calculateSchedule()} className="flex-1 h-14 text-lg font-bold shadow-lg shadow-primary/20 rounded-2xl">
                            Generate Schedule
                        </Button>
                    </div>
                </div>

                {/* RESULTS */}
                {result && (
                    <div className="mt-4 animate-in slide-in-from-bottom-6 duration-500">
                        <div className="p-8 rounded-[2.5rem] bg-linear-to-br from-slate-50 to-orange-50/30 dark:from-slate-900/50 dark:to-orange-950/10 border border-slate-200 dark:border-slate-800 relative overflow-hidden">

                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Clock className="w-40 h-40" />
                            </div>

                            <div className="flex flex-col md:flex-row gap-8 items-center justify-between mb-10">
                                <div className="text-left">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-1 flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        Protocol Verified
                                    </h3>
                                    <p className="text-3xl font-black text-slate-900 dark:text-white">{result.protocol} Lifestyle</p>
                                </div>
                                <div className="flex gap-2">
                                    <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 border border-orange-200 dark:border-orange-800">
                                        <Utensils className="w-4 h-4" /> {result.eatHours}h Food
                                    </div>
                                    <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 border border-blue-200 dark:border-blue-800">
                                        <Moon className="w-4 h-4" /> {result.fastHours}h Fast
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white dark:bg-slate-900/80 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                                            <Utensils className="w-5 h-5" />
                                        </div>
                                        <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">Eating Window</h4>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-black">{result.eatStart}</span>
                                        <span className="text-slate-400 font-medium">to</span>
                                        <span className="text-2xl font-black text-orange-500">{result.eatEnd}</span>
                                    </div>
                                    <p className="mt-4 text-sm text-slate-500 leading-relaxed">Consume all your calories during this time. Focus on whole foods and adequate protein.</p>
                                </div>

                                <div className="bg-white dark:bg-slate-900/80 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                                            <Moon className="w-5 h-5" />
                                        </div>
                                        <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">Fasting Window</h4>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-black">{result.fastStart}</span>
                                        <span className="text-slate-400 font-medium">to</span>
                                        <span className="text-2xl font-black text-blue-500">{result.fastEnd}</span>
                                    </div>
                                    <p className="mt-4 text-sm text-slate-500 leading-relaxed">No calories. Water, black coffee, and plain tea are allowed. Your body is in repair mode.</p>
                                </div>
                            </div>

                            {/* Timeline Visual */}
                            <div className="mt-10 pt-10 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Daily Metabolism Cycle</h4>
                                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
                                        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div> Eating</div>
                                        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div> Repair</div>
                                    </div>
                                </div>
                                <div className="relative h-6 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
                                    <div className="h-full bg-blue-500 flex-1 relative group cursor-help">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className="w-full h-full"></div>
                                                </TooltipTrigger>
                                                <TooltipContent>Autophagy & Fat Oxidation</TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <div className="h-full bg-orange-500 transition-all duration-1000 flex items-center justify-center text-[10px] text-white font-bold" style={{ width: `${(protocol.eat / 24) * 100}%` }}>
                                        <div className="absolute -top-1 w-0.5 h-8 bg-white/30"></div>
                                        WINDOW
                                    </div>
                                    <div className="h-full bg-blue-500 relative flex-1"></div>
                                </div>
                                <div className="flex justify-between mt-3 px-1">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">12 AM</span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">6 AM</span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">12 PM</span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">6 PM</span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">12 AM</span>
                                </div>
                            </div>

                            <div className="mt-10 p-5 bg-primary/5 rounded-2xl border border-primary/10 flex gap-4 text-left">
                                <Zap className="w-5 h-5 text-primary shrink-0" />
                                <div>
                                    <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Metabolic Insight</h5>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                                        By fasting for {result.fastHours} hours, you trigger cellular repair processes and allow your insulin levels to drop significantly, facilitating fat burning.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </CalculatorCard>
    );
}
