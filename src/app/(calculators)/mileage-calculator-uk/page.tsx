"use client";

import { useState, useRef } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Car, Download } from "lucide-react";

import jsPDF from "jspdf";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { RelatedTools } from "@/components/layout/related-tools";

export default function MileageCalculator() {
    const [miles, setMiles] = useState("");
    const [rate, setRate] = useState("45"); // UK standard AMAP rate

    const [result, setResult] = useState<{ amount: string } | null>(null);
    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const calculateMileage = (e: React.FormEvent) => {
        e.preventDefault();
        const m = parseFloat(miles);
        const r = parseFloat(rate);

        if (m > 0 && r > 0) {
            const total = (m * r) / 100; // rate in pence -> pounds
            setResult({ amount: total.toFixed(2) });
        }
    };

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
            pdf.text("Mileage Claim Report", 15, 20);
            
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
            pdf.save("Mileage-Claim-Report.pdf");
        } catch (err) {
            console.error("Failed to export", err);
        } finally {
            if (exportButton) exportButton.style.opacity = '1';
            setIsExporting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
            <BreadcrumbSchema items={[
                { name: "Home", item: "/" },
                { name: "Automotive", item: "/automotive" },
                { name: "Mileage Calculator", item: "/mileage-calculator-uk" }
            ]} />
            <CalculatorSchema
                title="Mileage Reimbursement Calculator | HMRC AMAP Claim Estimator"
                description="Calculate your tax-free mileage claim amount for business travel using official HMRC AMAP rates. Support for cars, vans, motorcycles, and bicycles."
                slug="/mileage-calculator-uk"
            />
            <div className="h-20 bg-white dark:bg-slate-950"></div>

            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
                        <Car className="w-4 h-4" />
                        UK Business Travel
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Mileage Reimbursement Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Calculate your tax-free mileage claim amount for business travel using official HMRC AMAP rates.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <CalculatorCard
                    title="Mileage Calculator"
                    description="Enter your business miles driven and the reimbursement rate to see your total allowable claim."
                    hasResult={!!result}
                >
                    <form onSubmit={calculateMileage} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="miles">Business Miles Driven</Label>
                            <Input
                                id="miles"
                                type="number"
                                placeholder="e.g. 150"
                                value={miles}
                                onChange={(e) => setMiles(e.target.value)}
                                className="h-12 text-lg"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="rate">Reimbursement Rate (pence per mile)</Label>
                            <Input
                                id="rate"
                                type="number"
                                step="0.1"
                                placeholder="e.g. 45"
                                value={rate}
                                onChange={(e) => setRate(e.target.value)}
                                className="h-12 text-lg"
                                required
                            />
                            <p className="text-xs text-muted-foreground mt-1">HMRC standard rate for first 10,000 miles is 45p.</p>
                        </div>

                        <Button type="submit" className="w-full text-lg h-12">Calculate Claim</Button>
                    </form>

                    {result && (
                        <div className="space-y-4">
                            <div
                                ref={calculatorRef}
                                className="mt-8 p-6 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 text-center animate-in zoom-in-95 duration-300"
                            >
                                <div className="flex justify-center items-center gap-2 mb-4">
                                    <Car className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                    <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-200">Reimbursement Amount</h3>
                                </div>
                                <div className="text-5xl font-extrabold mb-2 text-indigo-600 dark:text-indigo-400">
                                    £{result.amount}
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
                                    Export Claim to PDF
                                </Button>
                            </div>
                        </div>
                    )}
                </CalculatorCard>

                <div className="mt-24">
                    <article className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400">
                        <h2>How Mileage Claims Work in the UK</h2>
                        <p>
                            If you use your own personal vehicle for business journeys (excluding your standard commute to a permanent workplace), you are legally entitled to receive tax-free reimbursement for the miles driven.
                            This is formally known by HMRC as <strong>Approved Mileage Allowance Payments (AMAP)</strong>.
                        </p>

                        <h3>Current HMRC AMAP Rates (2024/25)</h3>
                        <p>
                            The government sets standard rates that employers can pay employees completely tax-free. If your employer pays exactly this rate, you don't need to report it to HMRC.
                        </p>
                        <ul>
                            <li><strong>Cars and Vans:</strong> 45p per mile for the first 10,000 business miles in a tax year.</li>
                            <li><strong>Cars and Vans (over 10,000 miles):</strong> drops to 25p per mile thereafter.</li>
                            <li><strong>Motorcycles:</strong> a flat 24p per mile regardless of distance.</li>
                            <li><strong>Bicycles:</strong> a flat 20p per mile.</li>
                        </ul>

                        <h3>What if my employer pays less than 45p?</h3>
                        <p>
                            Many employers choose to pay less than the HMRC recommended rate (e.g., they might only reimburse you 15p per mile). If this happens, you can claim tax relief on the difference.
                        </p>
                        <p>
                            For example, if you drive 1,000 miles and your employer pays 15p, you receive £150. However, the HMRC 45p limit allows for £450. You can claim tax relief on the remaining £300 difference. If you are a basic rate (20%) taxpayer, you would receive £60 back from HMRC as a tax refund.
                        </p>

                        <h3>Can I claim for regular commuting?</h3>
                        <p>
                            <strong>No.</strong> Ordinary commuting between your home and your permanent workplace is almost never classified as a business journey under UK tax law. You can only claim for travel to temporary workplaces (like a client's site), moving between two different workplaces, or travelling to a business meeting/conference.
                        </p>

                        <h3>Record Keeping</h3>
                        <p>
                            To successfully make a mileage claim (whether from your employer or directly from HMRC via a Self-Assessment tax return / P87 form), you must maintain accurate, contemporaneous records. This means logging the date of travel, the start and end postcodes of the journey, the purpose of the business trip, and the total miles driven.
                        </p>
                    </article>
                </div>
            </div>
            <RelatedTools currentCategory="Automotive" currentSlug="/mileage-calculator-uk" />
        </div>
    );
}
