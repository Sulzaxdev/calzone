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
import html2canvas from "html2canvas";
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

        const exportButton = calculatorRef.current.querySelector('button[onClick*="exportPDF"]');
        if (exportButton instanceof HTMLElement) exportButton.style.opacity = '0';

        try {
            await new Promise((resolve) => setTimeout(resolve, 150));
            const canvas = await html2canvas(calculatorRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
                windowWidth: calculatorRef.current.scrollWidth,
                windowHeight: calculatorRef.current.scrollHeight,
            });

            const imgData = canvas.toDataURL("image/png");
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

            pdf.addImage(imgData, "PNG", 15, 40, pdfWidth - 30, (canvas.height * (pdfWidth - 30)) / canvas.width);
            pdf.save("Road-Tax-Calculation.pdf");
        } catch (err) {
            console.error("Failed to export", err);
        } finally {
            if (exportButton instanceof HTMLElement) exportButton.style.opacity = '1';
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
                        <h2>Understanding UK Road Tax (VED) Rates for 2024/2025</h2>
                        <p>
                            Vehicle Excise Duty (VED), commonly known as "road tax" or "car tax", is an annual tax paid to the UK Government for using your vehicle on public roads. The amount you pay depends entirely on <strong>when your car was registered, its fuel type, and its CO2 emissions</strong>.
                        </p>

                        <h3>First-Year Rates vs. Standard Rates</h3>
                        <p>
                            When a brand-new car is registered in the UK, the first time you pay road tax (the "First-Year Rate"), the amount is heavily tied to the vehicle's CO2 emissions. A high-polluting petrol or diesel car can cost over £2,600 to tax for the first 12 months, whereas lower-emission vehicles cost significantly less.
                        </p>
                        <p>
                            <strong>From the second year onwards</strong>, the vast majority of drivers move onto a flat "Standard Rate". For the 2024/25 tax year, the flat rate is typically £190 per year for standard petrol and diesel cars, and £180 for alternative fuel vehicles (hybrids).
                        </p>

                        <h3>The Expensive Car Surcharge</h3>
                        <p>
                            If you buy a premium vehicle with a "list price" (the published price of the car before any discounts, but including factory-fitted options) of <strong>more than £40,000</strong>, you must pay an 'Expensive Car Surcharge'.
                        </p>
                        <ul>
                            <li>The surcharge is currently <strong>£390 per year</strong>.</li>
                            <li>It is paid on top of your standard rate.</li>
                            <li>You must pay it for 5 consecutive years (years 2 through 6 of the car's life).</li>
                        </ul>

                        <h3>Do Electric Vehicles Pay Tax?</h3>
                        <p>
                            Currently, fully electric vehicles (EVs) are exempt from Vehicle Excise Duty. However, the UK Government has announced that <strong>from April 2025</strong>, electric vehicles will also be required to pay road tax. They will move to the standard rate of £190 per year (subject to inflation adjustments), and the £40,000 expensive car surcharge will also begin applying to premium EVs.
                        </p>

                        <h3>How to find your CO2 emissions</h3>
                        <p>
                            If you are unsure of your car's emissions, you can find the exact figure on your vehicle's V5C registration certificate (logbook) under section 'V.7 CO2 (g/km)'.
                        </p>
                    </article>
                </div>
            </div>
        </div>
    );
}
