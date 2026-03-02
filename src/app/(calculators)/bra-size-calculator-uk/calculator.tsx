"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw, CheckCircle2, ChevronRight, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type Unit = "inches" | "cm";
type System = "uk" | "us" | "eu" | "au";
type WeightChange = "none" | "gain" | "loss";

export function BraSizeCalculatorForm() {
    const [unit, setUnit] = useState<Unit>("inches");
    const [system, setSystem] = useState<System>("uk");
    const [underbust, setUnderbust] = useState("");
    const [bust, setBust] = useState("");

    // Optional / Advanced Features
    const [pregnancyMode, setPregnancyMode] = useState(false);
    const [weightChange, setWeightChange] = useState<WeightChange>("none");

    const [error, setError] = useState("");
    const [result, setResult] = useState<any>(null);

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // 1. Parse and Validate
        let u = parseFloat(underbust);
        let b = parseFloat(bust);

        if (isNaN(u) || isNaN(b)) {
            setError("Please fill in both measurements.");
            return;
        }

        if (u < 10 || b < 10) {
            setError("Measurements seem too small to be realistic. Please check your unit choice.");
            return;
        }

        if (b <= u) {
            setError("Bust measurement must be larger than underbust measurement.");
            return;
        }

        // Convert Everything to Inches for Core Math
        let uInches = unit === "cm" ? u / 2.54 : u;
        let bInches = unit === "cm" ? b / 2.54 : b;

        // 2. Base Band Calculation (Modern Raw Style = Round to nearest even for UK/US)
        // Standard traditional US/UK says add 4 or 5, but raw sizing is vastly more accurate and popular globally.
        // We will use standard +0 (nearest even number) for band. Wait! Some prefer +4. 
        // We will use standard modern +0 rounding to nearest even number.
        let rawBand = Math.round(uInches);
        let bandSize = rawBand % 2 === 0 ? rawBand : rawBand + 1;

        // Apply Adjustments to Band
        if (pregnancyMode) bandSize += 2; // Ribcage expands
        if (weightChange === "gain") bandSize += 2;
        if (weightChange === "loss") bandSize -= 2;

        // 3. Base Cup Calculation
        // Cup difference is Bust - Raw Underbust
        let cupDifference = Math.round(bInches - uInches);
        if (pregnancyMode) cupDifference += 1; // Slight cup volume increase prediction
        if (weightChange === "gain") cupDifference += 1;
        if (weightChange === "loss") cupDifference -= 1;

        if (cupDifference < 0) cupDifference = 0; // Prevent negative cups

        // 4. Cup Mapping Data
        // UK Double letters: DD, FF, GG (Standard up to K)
        const ukCups = ["AA", "A", "B", "C", "D", "DD", "E", "F", "FF", "G", "GG", "H", "HH", "J", "JJ", "K", "KK"];
        // US Cups: D, DD/E, DDD/F, G, H...
        const usCups = ["AA", "A", "B", "C", "D", "DD/E", "DDD/F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"];
        // EU Cups: A, B, C, D, E, F...
        const euCups = ["AA", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"];

        const cIndex = Math.min(Math.max(0, cupDifference), ukCups.length - 1);

        // Generate Band Sizes across systems
        const ukUsBand = bandSize;
        const auBand = Math.max(6, bandSize - 22);
        // EU Band uses underbust cm rounded to nearest 5
        let euBandBase = Math.round((uInches * 2.54) / 5) * 5;
        if (pregnancyMode) euBandBase += 5;
        if (weightChange === "gain") euBandBase += 5;
        if (weightChange === "loss") euBandBase -= 5;

        // Formatter Helper
        const formatSize = (sys: System, bnd: number, eup: number, au: number, cIdx: number) => {
            if (sys === "uk") return `${bnd}${ukCups[cIdx]}`;
            if (sys === "us") return `${bnd}${usCups[cIdx]}`;
            if (sys === "eu") return `${eup}${euCups[cIdx]}`;
            if (sys === "au") return `${au}${ukCups[cIdx]}`; // AU uses UK cup letters generally
            return "";
        };

        // Primary Size Display
        const mainSize = formatSize(system, ukUsBand, euBandBase, auBand, cIndex);

        // Sister Sizes (+1 Band/-1 Cup & -1 Band/+1 Cup) Keep relative volume same
        // Sister 1: Loose Band
        const s1BandUs = bandSize + 2;
        const s1BandEu = euBandBase + 5;
        const s1BandAu = auBand + 2;
        const s1CupIdx = Math.max(0, cIndex - 1);
        const sisterLoose = formatSize(system, s1BandUs, s1BandEu, s1BandAu, s1CupIdx);

        // Sister 2: Tight Band
        const s2BandUs = Math.max(26, bandSize - 2);
        const s2BandEu = Math.max(60, euBandBase - 5);
        const s2BandAu = Math.max(6, auBand - 2);
        const s2CupIdx = Math.min(ukCups.length - 1, cIndex + 1);
        const sisterTight = formatSize(system, s2BandUs, s2BandEu, s2BandAu, s2CupIdx);

        // All System Conversions for Reference
        const conversions = {
            uk: formatSize("uk", ukUsBand, euBandBase, auBand, cIndex),
            us: formatSize("us", ukUsBand, euBandBase, auBand, cIndex),
            eu: formatSize("eu", ukUsBand, euBandBase, auBand, cIndex),
            au: formatSize("au", ukUsBand, euBandBase, auBand, cIndex),
        };

        setResult({
            mainSize,
            sisterTight,
            sisterLoose,
            conversions,
        });
    };

    return (
        <CalculatorCard
            title="Bra Size Calculator"
            description="A highly accurate sizing tool calculating UK, US, EU, and AU sizing with Sister-Size and pregnancy adjustments."
        >
            <form onSubmit={handleCalculate} className="space-y-8">
                {/* Top Toggles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div className="space-y-2">
                        <Label>Sizing System</Label>
                        <select
                            value={system}
                            onChange={(e) => setSystem(e.target.value as System)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                        >
                            <option value="uk">UK System</option>
                            <option value="us">US System</option>
                            <option value="eu">EU System</option>
                            <option value="au">AU / NZ System</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label>Measurement Unit</Label>
                        <select
                            value={unit}
                            onChange={(e) => {
                                setUnit(e.target.value as Unit);
                                setResult(null);
                            }}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                        >
                            <option value="inches">Inches (in)</option>
                            <option value="cm">Centimeters (cm)</option>
                        </select>
                    </div>
                </div>

                {/* Primary Measurements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Label htmlFor="underbust" className="font-semibold text-slate-700 dark:text-slate-300">Underbust Measurement</Label>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <AlertCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="w-48 text-xs">Measure snugly around your ribcage, directly underneath your breasts where the band sits.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <Input
                            id="underbust"
                            type="number"
                            step="0.1"
                            placeholder={`e.g. ${unit === 'inches' ? '32' : '81'}`}
                            value={underbust}
                            onChange={(e) => setUnderbust(e.target.value)}
                            className="h-12 text-lg"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Label htmlFor="bust" className="font-semibold text-slate-700 dark:text-slate-300">Bust Measurement</Label>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <AlertCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="w-48 text-xs">Measure loosely around the fullest part of your breasts, keeping the tape parallel to the floor.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <Input
                            id="bust"
                            type="number"
                            step="0.1"
                            placeholder={`e.g. ${unit === 'inches' ? '36' : '91'}`}
                            value={bust}
                            onChange={(e) => setBust(e.target.value)}
                            className="h-12 text-lg"
                            required
                        />
                    </div>
                </div>

                {/* Advanced Features Toggle */}
                <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <h4 className="font-semibold text-sm text-slate-500 uppercase flex items-center gap-2">
                        <Info className="w-4 h-4" /> Advanced Adjustments
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex items-center space-x-3 bg-white dark:bg-card border border-slate-200 dark:border-slate-800 p-3 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                            <input
                                type="checkbox"
                                checked={pregnancyMode}
                                onChange={(e) => setPregnancyMode(e.target.checked)}
                                className="w-4 h-4 text-primary focus:ring-primary rounded border-gray-300"
                            />
                            <div className="text-sm font-medium">Pregnancy / Nursing Adjustment</div>
                        </label>

                        <div className="flex items-center bg-white dark:bg-card border border-slate-200 dark:border-slate-800 p-3 rounded-xl">
                            <Label className="mr-3 text-sm font-medium shrink-0">Weight Flux:</Label>
                            <select
                                value={weightChange}
                                onChange={(e) => setWeightChange(e.target.value as WeightChange)}
                                className="w-full text-sm bg-transparent outline-none focus:ring-0 text-slate-700 dark:text-slate-300"
                            >
                                <option value="none">None / Stable</option>
                                <option value="gain">Recent Gain</option>
                                <option value="loss">Recent Loss</option>
                            </select>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-950/30 text-red-600 rounded-lg text-sm font-medium border border-red-200 dark:border-red-900/50 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        {error}
                    </div>
                )}

                <div className="flex gap-4 pt-4">
                    <Button type="button" variant="outline" onClick={() => {
                        setUnderbust(""); setBust(""); setResult(null); setError(""); setPregnancyMode(false); setWeightChange("none");
                    }} className="h-14 px-6">
                        <RotateCcw className="w-5 h-5" />
                    </Button>
                    <Button type="submit" className="flex-1 h-14 text-lg font-bold shadow-lg shadow-primary/20">
                        Calculate Size
                    </Button>
                </div>
            </form>

            {/* INSTANT RESULT RENDERING */}
            {result && (
                <div className="mt-10 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="p-8 rounded-3xl bg-linear-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-900/20 border border-pink-100 dark:border-pink-900/30 text-center relative overflow-hidden">

                        <div className="absolute top-4 right-4 flex gap-2">
                            <span className="bg-white/50 dark:bg-black/20 px-3 py-1 rounded-full text-xs font-semibold text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800">
                                {system.toUpperCase()} SIZING
                            </span>
                        </div>

                        <h3 className="text-sm font-bold uppercase tracking-widest text-pink-500 dark:text-pink-400 mb-2">Your Recommended Size</h3>
                        <div className="text-7xl font-black mb-8 text-pink-600 dark:text-pink-400 drop-shadow-sm flex justify-center items-center gap-4">
                            {result.mainSize}
                            <CheckCircle2 className="w-10 h-10 text-green-500 hidden sm:block" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                            {/* Sister Sizes */}
                            <div className="bg-white/60 dark:bg-black/30 p-5 rounded-2xl shadow-sm border border-white/40 dark:border-white/5">
                                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                                    <ChevronRight className="w-4 h-4 text-pink-500" />
                                    Sister Sizes
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                                        <span className="text-sm text-slate-500 dark:text-slate-400">Tighter Band / Up Cup</span>
                                        <span className="font-bold text-slate-700 dark:text-slate-200">{result.sisterTight}</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                                        <span className="text-sm text-slate-500 dark:text-slate-400">Looser Band / Down Cup</span>
                                        <span className="font-bold text-slate-700 dark:text-slate-200">{result.sisterLoose}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Conversions */}
                            <div className="bg-white/60 dark:bg-black/30 p-5 rounded-2xl shadow-sm border border-white/40 dark:border-white/5">
                                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                                    <ChevronRight className="w-4 h-4 text-pink-500" />
                                    Global Conversions
                                </h4>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                                        <span className="text-slate-500">UK Sizing</span>
                                        <span className="font-semibold text-slate-700 dark:text-slate-300">{result.conversions.uk}</span>
                                    </li>
                                    <li className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2 pt-1">
                                        <span className="text-slate-500">US Sizing</span>
                                        <span className="font-semibold text-slate-700 dark:text-slate-300">{result.conversions.us}</span>
                                    </li>
                                    <li className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2 pt-1">
                                        <span className="text-slate-500">EU Sizing</span>
                                        <span className="font-semibold text-slate-700 dark:text-slate-300">{result.conversions.eu}</span>
                                    </li>
                                    <li className="flex justify-between pt-1">
                                        <span className="text-slate-500">AU/NZ Sizing</span>
                                        <span className="font-semibold text-slate-700 dark:text-slate-300">{result.conversions.au}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </CalculatorCard>
    );
}
