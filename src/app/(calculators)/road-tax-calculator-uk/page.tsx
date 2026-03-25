"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, CarFront, Download, FileText, CheckCircle2, ShieldCheck } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import React, { useRef } from "react";

import jsPDF from "jspdf";

export default function RoadTaxCalculator() {
    const [vehicleType, setVehicleType] = useState<string>("petrol");
    const [co2Emissions, setCo2Emissions] = useState("");
    const [listPrice, setListPrice] = useState("");

    const [result, setResult] = useState<{ firstYear: number; standard: number; surcharge: number | null } | null>(null);

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

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
            pdf.text("Road Tax (VED) Estimate Report", 15, 20);
            
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
            pdf.save("Road-Tax-Calculation.pdf");
        } catch (err) {
            console.error("Failed to export", err);
        } finally {
            if (exportButton) exportButton.style.opacity = '1';
            setIsExporting(false);
        }
    };

    const calculateTax = (e: React.FormEvent) => {
        e.preventDefault();

        const co2 = parseInt(co2Emissions) || 0;
        const price = parseInt(listPrice) || 0;

        let firstYear = 0;
        let standard = 190; // Standard rate for petrol/diesel 2024/25

        // Very simplified UK VED logic for demonstration
        if (vehicleType === "electric") {
            firstYear = 0;
            standard = 0;
        } else if (vehicleType === "hybrid") {
            standard = 180; // £10 alternative fuel discount

            if (co2 === 0) firstYear = 0;
            else if (co2 <= 50) firstYear = 10;
            else if (co2 <= 75) firstYear = 20;
            else if (co2 <= 90) firstYear = 125;
            else if (co2 <= 100) firstYear = 165;
            else if (co2 <= 110) firstYear = 185;
            else if (co2 <= 130) firstYear = 245;
            else if (co2 <= 150) firstYear = 265;
            else if (co2 <= 170) firstYear = 670;
            else if (co2 <= 190) firstYear = 1085;
            else if (co2 <= 225) firstYear = 1555;
            else if (co2 <= 255) firstYear = 2210;
            else firstYear = 2595;

        } else { // Petrol or Diesel (assuming RDE2 compliant for simplicity)
            if (co2 === 0) firstYear = 0;
            else if (co2 <= 50) firstYear = 10;
            else if (co2 <= 75) firstYear = 30;
            else if (co2 <= 90) firstYear = 135;
            else if (co2 <= 100) firstYear = 175;
            else if (co2 <= 110) firstYear = 195;
            else if (co2 <= 130) firstYear = 255;
            else if (co2 <= 150) firstYear = 275;
            else if (co2 <= 170) firstYear = 680;
            else if (co2 <= 190) firstYear = 1095;
            else if (co2 <= 225) firstYear = 1565;
            else if (co2 <= 255) firstYear = 2220;
            else firstYear = 2605;
        }

        // Expensive car surcharge (list price > £40,000)
        let surcharge = null;
        if (price > 40000 && vehicleType !== "electric") {
            surcharge = 390; // Additional rate for 5 years
        }

        setResult({ firstYear, standard, surcharge });
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
            <div className="h-20 bg-white dark:bg-slate-950"></div>

            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
                        <CarFront className="w-4 h-4" />
                        UK Vehicle Excise Duty (VED)
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Road Tax Calculator UK
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Estimate your yearly car tax instantly. Find out your first-year rates and standard rates based on CO2 emissions and fuel type (2024/2025 limits).
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <CalculatorCard
                    title="UK Road Tax Calculator"
                    description="Estimate Vehicle Excise Duty (VED) for cars registered after April 2017 (2024/2025 rates)."
                    hasResult={!!result}
                >
                    <form onSubmit={calculateTax} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="type">Vehicle Type</Label>
                            <Select value={vehicleType} onValueChange={setVehicleType}>
                                <SelectTrigger id="type">
                                    <SelectValue placeholder="Select fuel type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="petrol">Petrol / Diesel (RDE2 compliant)</SelectItem>
                                    <SelectItem value="hybrid">Hybrid / Alternative Fuel</SelectItem>
                                    <SelectItem value="electric">Fully Electric (EV)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {vehicleType !== "electric" && (
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="co2">CO2 Emissions (g/km)</Label>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger type="button">
                                                <AlertCircle className="h-4 w-4 text-muted-foreground" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="w-48 text-xs">Found on your V5C registration document or vehicle specifications.</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <Input
                                    id="co2"
                                    type="number"
                                    placeholder="e.g. 120"
                                    value={co2Emissions}
                                    onChange={(e) => setCo2Emissions(e.target.value)}
                                    required={vehicleType !== "electric"}
                                />
                            </div>
                        )}

                        <div className="space-y-2 border-t pt-4">
                            <div className="flex items-center gap-2">
                                <Label htmlFor="price">List Price (Original RRP)</Label>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger type="button">
                                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="w-56 text-xs">If the vehicle's list price (including factory options) was over £40,000, an additional surcharge is applied for 5 years.</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-muted-foreground font-medium">£</span>
                                <Input
                                    id="price"
                                    type="number"
                                    className="pl-8"
                                    placeholder="e.g. 25000"
                                    value={listPrice}
                                    onChange={(e) => setListPrice(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-full text-lg h-12">Calculate Tax</Button>
                    </form>

                    {result && (
                        <div className="space-y-4">
                            <div
                                ref={calculatorRef}
                                className="mt-8 p-6 rounded-xl bg-orange-50 dark:bg-orange-950/30 animate-in zoom-in-95 duration-300"
                            >
                                <div className="flex items-center justify-center gap-2 mb-6">
                                    <CarFront className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                                    <h3 className="text-xl font-bold text-orange-800 dark:text-orange-200">Tax Estimate</h3>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center pb-4 border-b border-orange-200 dark:border-orange-800">
                                        <span className="font-medium text-orange-800 dark:text-orange-300">First Year Rate:</span>
                                        <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">£{result.firstYear}</span>
                                    </div>

                                    <div className="flex justify-between items-center pb-4 border-b border-orange-200 dark:border-orange-800">
                                        <span className="font-medium text-orange-800 dark:text-orange-300">Standard Rate (Years 2+):</span>
                                        <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">£{result.standard} <span className="text-sm font-normal">/ yr</span></span>
                                    </div>

                                    {result.surcharge !== null && (
                                        <div className="flex justify-between items-center pt-2">
                                            <span className="font-medium text-red-800 dark:text-red-300 flex items-center gap-2">
                                                Expensive Car Surcharge:
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger type="button">
                                                            <AlertCircle className="h-4 w-4" />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p className="w-56 text-xs">Applied from year 2 to 6. Add this to the Standard Rate.</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </span>
                                            <span className="text-xl font-bold text-red-600 dark:text-red-400">+£{result.surcharge} <span className="text-sm font-normal">/ yr</span></span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button
                                    type="button"
                                    onClick={exportPDF}
                                    disabled={isExporting}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-bold rounded-2xl transition-colors disabled:opacity-50"
                                >
                                    {isExporting ? (
                                        <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent shrink-0 rounded-full animate-spin"></div>
                                    ) : (
                                        <Download className="w-4 h-4" />
                                    )}
                                    Export Estimate to PDF
                                </Button>
                            </div>
                        </div>
                    )}
                </CalculatorCard>

                <div className="mt-24">
                    <article className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400">
                        <h2 className="text-3xl font-black mb-8 border-b pb-4">Understanding UK Road Tax (VED) Rates for 2026</h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                            Vehicle Excise Duty (VED), commonly known as <strong>"road tax"</strong> or <strong>"car tax"</strong>, is a mandatory annual levy for using UK public roads. As we move into 2026, the tax landscape has shifted significantly, particularly for owners of hybrid and electric vehicles who previously enjoyed total exemptions.
                        </p>

                        <div className="bg-primary/5 border-l-4 border-primary p-8 my-10 rounded-r-2xl font-sans">
                            <h4 className="text-xl font-bold mt-0 mb-3">2026 Budget Alert: The EV Tax Shift</h4>
                            <p className="mb-0 text-slate-700 dark:text-slate-300">
                                Starting from April 2025, the UK Government transitioned all electric vehicles (EVs) into the standard tax bracket. If your EV was registered after April 2017, you are now liable for the <strong>Standard Rate of £190 per year</strong>. Premium EVs with a list price exceeding £40,000 are also subject to the Expensive Car Surcharge.
                            </p>
                        </div>

                        <h3>How Is Your Road Tax Calculated?</h3>
                        <p>
                            For cars registered after April 1, 2017, the UK uses a two-tier system designed to penalize high-polluting vehicles while providing long-term predictable costs for the average owner:
                        </p>

                        <div className="overflow-x-auto my-10 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <table className="w-full text-left border-collapse min-w-[600px] font-sans text-sm">
                                <thead className="bg-slate-50 dark:bg-slate-950">
                                    <tr>
                                        <th className="p-4 font-bold border-b">Vehicle Type</th>
                                        <th className="p-4 font-bold border-b">First Year Rate</th>
                                        <th className="p-4 font-bold border-b">Standard Rate (2+)</th>
                                        <th className="p-4 font-bold border-b">Premium Surcharge?</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    <tr>
                                        <td className="p-4 font-semibold">Petrol / Diesel</td>
                                        <td className="p-4">Based on CO2 (up to £2,605)</td>
                                        <td className="p-4">£190 / year</td>
                                        <td className="p-4 text-red-600">Yes ({">"}£40k)</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 font-semibold">Hybrid (AFV)</td>
                                        <td className="p-4">CO2-linked (usually lower)</td>
                                        <td className="p-4">£180 / year</td>
                                        <td className="p-4 text-red-600">Yes ({">"}£40k)</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 font-semibold">Electric (EV)</td>
                                        <td className="p-4">£10 (Previously £0)</td>
                                        <td className="p-4">£190 / year</td>
                                        <td className="p-4 text-red-600">Yes ({">"}£40k)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>The "Expensive Car" Surcharge Explained</h3>
                        <p>
                            Many premium car buyers are surprised by a sudden jump in their tax bill in the second year of ownership. This is due to the <strong>Expensive Car Surcharge</strong>. 
                        </p>
                        <ul>
                            <li><strong>The Threshold:</strong> If your car had a "list price" (RRP) of over <strong>£40,000</strong> when brand new—including factory-fitted options.</li>
                            <li><strong>The Cost:</strong> You must pay an additional <strong>£390 per year</strong> for five consecutive years (from year 2 to year 6).</li>
                            <li><strong>Total Cost:</strong> For a premium petrol car, this brings your total annual road tax to <strong>£580 (£190 + £390)</strong>.</li>
                        </ul>

                        <h3>Planning for 2026? Check These Resources</h3>
                        <p>
                            Managing vehicle costs involves more than just tax. If you're currently budgeting for a vehicle change or a long-distance move, explore our other clinical-grade tools:
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4 not-prose my-10">
                            <a href="/fuel-cost-calculator-uk" className="p-6 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-primary transition-colors group">
                                <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-primary mb-2">Fuel Cost Calculator</h4>
                                <p className="text-sm text-slate-500 m-0">Estimate journey spend based on current 2026 petrol/diesel rates.</p>
                            </a>
                            <a href="/car-insurance-calculator-uk" className="p-6 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-primary transition-colors group">
                                <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-primary mb-2">Insurance Calculator</h4>
                                <p className="text-sm text-slate-500 m-0">Determine your likely premiums based on age, location, and vehicle group.</p>
                            </a>
                        </div>

                        <h3>Frequently Asked Questions</h3>
                        <div className="space-y-6 not-prose mb-12">
                            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 font-sans">
                                <h4 className="font-bold mb-2">How do I find my car's CO2 emissions?</h4>
                                <p className="text-sm m-0 text-slate-600 dark:text-slate-400">The most accurate source is your <strong>V5C Registration Certificate</strong> (Logbook). Look for category <strong>V.7</strong>. Alternatively, you can search for your vehicle on the official DVLA 'Check if a vehicle is taxed' service.</p>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 font-sans">
                                <h4 className="font-bold mb-2">Can I pay my road tax monthly?</h4>
                                <p className="text-sm m-0 text-slate-600 dark:text-slate-400">Yes, the DVLA offers a Direct Debit scheme allowing for monthly, six-monthly, or annual payments. Note that paying monthly often carries a 5% surcharge compared to a single annual payment.</p>
                            </div>
                        </div>

                    </article>
                </div>
            </div>
        </div>
    );
}
