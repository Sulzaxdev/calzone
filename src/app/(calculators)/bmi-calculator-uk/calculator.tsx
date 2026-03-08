"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, RotateCcw, CheckCircle2, TrendingUp, Info, Download } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function BMICalculatorForm() {
    const [unit, setUnit] = useState<"metric" | "imperial">("metric");

    // Metric state
    const [cm, setCm] = useState("");
    const [kg, setKg] = useState("");

    // Imperial state
    const [ft, setFt] = useState("");
    const [inVal, setInVal] = useState("");
    const [lbs, setLbs] = useState("");

    const [error, setError] = useState("");
    const [result, setResult] = useState<any>(null);

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const exportPDF = async () => {
        if (!calculatorRef.current) return;
        setIsExporting(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 100));
            const canvas = await html2canvas(calculatorRef.current, {
                scale: 2,
                backgroundColor: "#ffffff",
                windowWidth: calculatorRef.current.scrollWidth,
                windowHeight: calculatorRef.current.scrollHeight,
            });
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.setFontSize(20);
            pdf.text("BMI Calculation Report", 15, 15);
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 15, 22);
            pdf.addImage(imgData, "PNG", 15, 30, pdfWidth - 30, pdfHeight - 30);
            pdf.save("BMI-Calculation.pdf");
        } catch (err) {
            console.error("Failed to export", err);
        } finally {
            setIsExporting(false);
        }
    };

    const calculateBMI = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        let bmiValue = 0;
        let wKg = 0;
        let hM = 0;

        if (unit === "metric") {
            hM = parseFloat(cm) / 100;
            wKg = parseFloat(kg);
            if (hM > 0 && wKg > 0) {
                bmiValue = wKg / (hM * hM);
            } else {
                setError("Please enter valid positive measurements.");
                return;
            }
        } else {
            const hInches = (parseFloat(ft) || 0) * 12 + (parseFloat(inVal) || 0);
            const wLbs = parseFloat(lbs);
            if (hInches > 0 && wLbs > 0) {
                bmiValue = (wLbs / (hInches * hInches)) * 703;
                wKg = wLbs * 0.453592;
                hM = (hInches * 2.54) / 100;
            } else {
                setError("Please enter valid positive measurements.");
                return;
            }
        }

        if (bmiValue > 0) {
            let category = "";
            let color = "";
            let statusColor = "";

            if (bmiValue < 18.5) {
                category = "Underweight";
                color = "text-blue-500";
                statusColor = "blue";
            } else if (bmiValue < 25) {
                category = "Healthy Weight";
                color = "text-green-500";
                statusColor = "green";
            } else if (bmiValue < 30) {
                category = "Overweight";
                color = "text-yellow-500";
                statusColor = "yellow";
            } else if (bmiValue < 35) {
                category = "Obesity (Class 1)";
                color = "text-orange-500";
                statusColor = "orange";
            } else if (bmiValue < 40) {
                category = "Obesity (Class 2)";
                color = "text-red-500";
                statusColor = "red";
            } else {
                category = "Severe Obesity";
                color = "text-red-600";
                statusColor = "red";
            }

            // Ideal weight range for height (BMI 18.5 to 24.9)
            const minWeight = 18.5 * hM * hM;
            const maxWeight = 24.9 * hM * hM;

            const minWeightStr = unit === "metric" ? `${minWeight.toFixed(1)} kg` : `${(minWeight / 0.453592).toFixed(1)} lbs`;
            const maxWeightStr = unit === "metric" ? `${maxWeight.toFixed(1)} kg` : `${(maxWeight / 0.453592).toFixed(1)} lbs`;

            setResult({
                bmi: bmiValue.toFixed(1),
                category,
                color,
                statusColor,
                idealRange: `${minWeightStr} – ${maxWeightStr}`,
                pct: Math.min(100, (bmiValue / 40) * 100) // For a visual meter later
            });
        }
    };

    const handleClear = () => {
        setCm(""); setKg(""); setFt(""); setInVal(""); setLbs(""); setResult(null); setError("");
    };

    return (
        <CalculatorCard
            title="BMI Calculator"
            description="Calculate your Body Mass Index (BMI) using standard medical formulas (Metric or Imperial) to assess your weight status."
            hasResult={!!result}
        >
            <Tabs defaultValue="metric" onValueChange={(val) => {
                setUnit(val as "metric" | "imperial");
                setResult(null);
                setError("");
            }} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-100 dark:bg-slate-900/50 p-1 rounded-2xl">
                    <TabsTrigger value="metric" className="rounded-xl">Metric (cm, kg)</TabsTrigger>
                    <TabsTrigger value="imperial" className="rounded-xl">Imperial (ft, in, lbs)</TabsTrigger>
                </TabsList>

                <form onSubmit={calculateBMI} className="space-y-8">
                    <TabsContent value="metric" className="space-y-6 animate-in fade-in transition-all duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="height-cm" className="font-semibold">Height (cm)</Label>
                                <Input
                                    id="height-cm"
                                    type="number"
                                    placeholder="e.g. 175"
                                    value={cm}
                                    onChange={(e) => setCm(e.target.value)}
                                    className="h-12 text-lg"
                                    required={unit === "metric"}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="weight-kg" className="font-semibold">Weight (kg)</Label>
                                <Input
                                    id="weight-kg"
                                    type="number"
                                    placeholder="e.g. 70"
                                    value={kg}
                                    onChange={(e) => setKg(e.target.value)}
                                    className="h-12 text-lg"
                                    required={unit === "metric"}
                                />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="imperial" className="space-y-6 animate-in fade-in transition-all duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="height-ft" className="font-semibold">Feet (ft)</Label>
                                <Input
                                    id="height-ft"
                                    type="number"
                                    placeholder="5"
                                    value={ft}
                                    onChange={(e) => setFt(e.target.value)}
                                    className="h-12 text-lg"
                                    required={unit === "imperial"}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="height-in" className="font-semibold">Inches (in)</Label>
                                <Input
                                    id="height-in"
                                    type="number"
                                    placeholder="9"
                                    value={inVal}
                                    onChange={(e) => setInVal(e.target.value)}
                                    className="h-12 text-lg"
                                    required={unit === "imperial"}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="weight-lbs" className="font-semibold">Weight (lbs)</Label>
                                <Input
                                    id="weight-lbs"
                                    type="number"
                                    placeholder="150"
                                    value={lbs}
                                    onChange={(e) => setLbs(e.target.value)}
                                    className="h-12 text-lg"
                                    required={unit === "imperial"}
                                />
                            </div>
                        </div>
                    </TabsContent>

                    {error && (
                        <div className="p-4 bg-red-50 dark:bg-red-950/30 text-red-600 rounded-xl text-sm font-medium border border-red-200 dark:border-red-900/50 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            {error}
                        </div>
                    )}

                    <div className="flex gap-4 pt-4">
                        <Button type="button" variant="outline" onClick={handleClear} className="h-14 px-6">
                            <RotateCcw className="w-5 h-5" />
                        </Button>
                        <Button type="submit" className="flex-1 h-14 text-lg font-bold shadow-lg shadow-primary/20">
                            Calculate BMI
                        </Button>
                    </div>
                </form>
            </Tabs>

            {/* RESULTS RENDERING */}
            {result && (
                <div className="mt-10 animate-in slide-in-from-bottom-4 duration-500">
                    <div
                        ref={calculatorRef}
                        className="p-8 rounded-3xl bg-linear-to-br from-slate-50 to-blue-50 dark:from-slate-900/50 dark:to-blue-900/20 border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden"
                    >

                        <div className="absolute top-4 right-4">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info className="h-5 w-5 text-slate-400 cursor-help" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="w-48 text-xs">BMI provides a weight assessment but does not account for muscle mass or fat distribution.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Your Calculated BMI</h3>
                        <div className={`text-7xl font-black mb-4 ${result.color} drop-shadow-sm`}>
                            {result.bmi}
                        </div>

                        <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full font-bold text-lg mb-8 border transition-all ${result.statusColor === 'green' ? 'bg-green-100 border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-800' :
                            result.statusColor === 'yellow' ? 'bg-yellow-100 border-yellow-200 text-yellow-700 dark:bg-yellow-900/30 dark:border-yellow-800' :
                                result.statusColor === 'orange' ? 'bg-orange-100 border-orange-200 text-orange-700 dark:bg-orange-900/30 dark:border-orange-800' :
                                    result.statusColor === 'red' ? 'bg-red-100 border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-800' :
                                        'bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800'
                            }`}>
                            {result.category === 'Healthy Weight' && <CheckCircle2 className="w-5 h-5" />}
                            {result.category}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                            <div className="bg-white/60 dark:bg-black/30 p-5 rounded-2xl shadow-sm border border-white/40 dark:border-white/5">
                                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1 flex items-center gap-2 text-sm uppercase tracking-wide">
                                    <TrendingUp className="w-4 h-4 text-primary" />
                                    Healthy Range
                                </h4>
                                <p className="text-xl font-bold text-slate-700 dark:text-slate-300">{result.idealRange}</p>
                                <p className="text-xs text-slate-500 mt-2">Recommended weight for your height.</p>
                            </div>

                            <div className="bg-white/60 dark:bg-black/30 p-5 rounded-2xl shadow-sm border border-white/40 dark:border-white/5">
                                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1 flex items-center gap-2 text-sm uppercase tracking-wide">
                                    <Info className="w-4 h-4 text-primary" />
                                    Next Steps
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {result.category === 'Healthy Weight' ? 'Excellent! Maintain your current balanced diet and regular activity.' :
                                        result.category === 'Underweight' ? 'Consider focusing on nutrient-dense calorie surpluss and strength training.' :
                                            'Focus on a moderate calorie deficit and at least 150 mins of weekly exercise.'}
                                </p>
                            </div>
                        </div>

                        {/* Visual Range bar */}
                        <div className="mt-8 px-4">
                            <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
                                <div className="h-full bg-blue-400" style={{ width: '18.5%' }}></div>
                                <div className="h-full bg-green-500" style={{ width: '6.5%' }}></div>
                                <div className="h-full bg-yellow-400" style={{ width: '5%' }}></div>
                                <div className="h-full bg-orange-500" style={{ width: '5%' }}></div>
                                <div className="h-full bg-red-500 flex-1"></div>
                            </div>
                            <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                                <span>18.5</span>
                                <span>25</span>
                                <span>30</span>
                                <span>35</span>
                                <span>40+</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            onClick={exportPDF}
                            disabled={isExporting}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-bold rounded-2xl transition-colors disabled:opacity-50 shadow-sm"
                        >
                            {isExporting ? (
                                <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent shrink-0 rounded-full animate-spin"></div>
                            ) : (
                                <Download className="w-4 h-4" />
                            )}
                            Export Result to PDF
                        </button>
                    </div>
                </div>
            )}
        </CalculatorCard>
    );
}
