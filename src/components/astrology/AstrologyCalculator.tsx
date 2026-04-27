"use client";

import { useState, useRef, useEffect } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw, Download, Search, MapPin, Loader2, Sparkles, Sun, Moon, ArrowUpRight } from "lucide-react";
import { calculateAstrology, AstrologyResults } from "@/lib/astrology-logic";
import { searchCities, CityLocation } from "@/lib/geocoding";
import jsPDF from "jspdf";
import { motion, AnimatePresence } from "framer-motion";

interface AstrologyCalculatorProps {
    type: "sun" | "moon" | "rising" | "big-three" | "venus" | "chiron" | "lilith" | "north-node" | "part-of-fortune" | "vertex";
    title: string;
    description: string;
}

export function AstrologyCalculator({ type, title, description }: AstrologyCalculatorProps) {
    const [name, setName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [birthTime, setBirthTime] = useState("12:00");
    const [cityQuery, setCityQuery] = useState("");
    const [selectedCity, setSelectedCity] = useState<CityLocation | null>(null);
    const [cities, setCities] = useState<CityLocation[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState<AstrologyResults | null>(null);
    const [isExporting, setIsExporting] = useState(false);
    const resultRef = useRef<HTMLDivElement>(null);

    // Debounced city search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (cityQuery.length >= 3 && !selectedCity) {
                setIsSearching(true);
                const results = await searchCities(cityQuery);
                setCities(results);
                setIsSearching(false);
            } else {
                setCities([]);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [cityQuery, selectedCity]);

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!birthDate || !birthTime || !selectedCity) {
            setError("Please fill in all required fields including birth city.");
            return;
        }

        try {
            const dateObj = new Date(`${birthDate}T${birthTime}`);
            const results = calculateAstrology(dateObj, selectedCity.lat, selectedCity.lon);
            setResult(results);
        } catch (err) {
            setError("Error calculating astrology signs. Please check your inputs.");
        }
    };

    const handleClear = () => {
        setName("");
        setBirthDate("");
        setBirthTime("12:00");
        setCityQuery("");
        setSelectedCity(null);
        setResult(null);
        setError("");
    };

    const exportPDF = async () => {
        if (!resultRef.current) return;
        setIsExporting(true);
        try {
            const { toPng } = await import('html-to-image');
            const imgData = await toPng(resultRef.current, { pixelRatio: 2, backgroundColor: "#ffffff" });
            const pdf = new jsPDF("p", "mm", "a4");
            pdf.setFontSize(22);
            pdf.text(`${title} Report`, 15, 20);
            pdf.setFontSize(10);
            pdf.text(`Name: ${name || "Anonymous"} | Birth Date: ${birthDate} ${birthTime} | City: ${selectedCity?.name}`, 15, 28);
            pdf.addImage(imgData, "PNG", 15, 40, 180, 180 * 0.75);
            pdf.save(`${title.replace(/\s+/g, '-')}.pdf`);
        } catch (err) {
            console.error("PDF export failed", err);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <CalculatorCard title={title} description={description} hasResult={!!result}>
            <form onSubmit={handleCalculate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Your Name (Optional)</Label>
                        <Input id="name" placeholder="e.g. John Doe" value={name} onChange={(e) => setName(e.target.value)} className="h-12" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="birthDate">Birth Date *</Label>
                        <Input id="birthDate" type="date" required value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="h-12" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="birthTime">Birth Time *</Label>
                        <Input id="birthTime" type="time" required value={birthTime} onChange={(e) => setBirthTime(e.target.value)} className="h-12" />
                    </div>
                    <div className="space-y-2 relative">
                        <Label htmlFor="city">Birth City *</Label>
                        <div className="relative">
                            <Input 
                                id="city" 
                                placeholder="Search City..." 
                                value={selectedCity ? selectedCity.name : cityQuery} 
                                onChange={(e) => {
                                    setCityQuery(e.target.value);
                                    setSelectedCity(null);
                                }} 
                                className="h-12 pl-10" 
                                required
                            />
                            <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                            {isSearching && <Loader2 className="absolute right-3 top-3.5 h-5 w-5 animate-spin text-slate-400" />}
                        </div>
                        <AnimatePresence>
                            {cities.length > 0 && !selectedCity && (
                                <motion.div 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl max-h-60 overflow-y-auto"
                                >
                                    {cities.map((city, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2 text-sm"
                                            onClick={() => {
                                                setSelectedCity(city);
                                                setCityQuery(city.name);
                                                setCities([]);
                                            }}
                                        >
                                            <MapPin className="h-4 w-4 text-slate-400" />
                                            <span>{city.name}, {city.country}</span>
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-950/30 text-red-600 rounded-xl text-sm border border-red-200 dark:border-red-900/50 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        {error}
                    </div>
                )}

                <div className="flex gap-4 pt-4">
                    <Button type="button" variant="outline" onClick={handleClear} className="h-14 px-6">
                        <RotateCcw className="w-5 h-5" />
                    </Button>
                    <Button type="submit" className="flex-1 h-14 text-lg font-bold shadow-lg shadow-primary/20 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                        Calculate {title}
                    </Button>
                </div>
            </form>

            {result && (
                <div className="mt-12 animate-in slide-in-from-bottom-4 duration-500">
                    <div ref={resultRef} className="p-8 rounded-[2.5rem] bg-linear-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950/30 border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden">
                        <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-purple-400/10 rounded-full blur-3xl"></div>
                        
                        <Sparkles className="w-8 h-8 text-indigo-500 mx-auto mb-6" />
                        
                        <div className="space-y-8 relative z-10">
                            {type === "big-three" || type === "sun" ? (
                                <div className="group">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-black uppercase tracking-widest mb-4">
                                        <Sun className="w-3.5 h-3.5" /> Sun Sign
                                    </div>
                                    <div className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter group-hover:scale-105 transition-transform">
                                        {result.sun}
                                    </div>
                                </div>
                            ) : null}

                            {type === "big-three" || type === "moon" ? (
                                <div className="group border-t border-slate-200 dark:border-slate-800 pt-8">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest mb-4">
                                        <Moon className="w-3.5 h-3.5" /> Moon Sign
                                    </div>
                                    <div className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter group-hover:scale-105 transition-transform">
                                        {result.moon}
                                    </div>
                                </div>
                            ) : null}

                            {type === "big-three" || type === "rising" ? (
                                <div className="group border-t border-slate-200 dark:border-slate-800 pt-8">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest mb-4">
                                        <ArrowUpRight className="w-3.5 h-3.5" /> Rising Sign
                                    </div>
                                    <div className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter group-hover:scale-105 transition-transform">
                                        {result.rising}
                                    </div>
                                </div>
                            ) : null}

                            {type === "venus" && (
                                <div className="group">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-xs font-black uppercase tracking-widest mb-4">Venus Sign</div>
                                    <div className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter">{result.venus}</div>
                                </div>
                            )}

                            {type === "part-of-fortune" && (
                                <div className="group">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-widest mb-4">Part of Fortune</div>
                                    <div className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter">{result.partOfFortune}</div>
                                </div>
                            )}
                            
                            {/* Generic fallback for others */}
                            {["chiron", "lilith", "north-node", "vertex"].includes(type) && (
                                <div className="group">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-black uppercase tracking-widest mb-4">{title}</div>
                                    <div className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter">Coming Soon</div>
                                    <p className="mt-4 text-slate-500 text-sm">We are refining the astronomical precision for this specific point. Check back shortly!</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end pt-6">
                        <Button
                            onClick={exportPDF}
                            disabled={isExporting}
                            variant="secondary"
                            className="rounded-2xl h-12 px-8 font-bold gap-2"
                        >
                            {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                            Export Report to PDF
                        </Button>
                    </div>
                </div>
            )}
        </CalculatorCard>
    );
}
