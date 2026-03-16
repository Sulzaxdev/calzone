"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info, Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Rough UK cost per meter including installation
const MATERIAL_COSTS_PER_METER = {
    upvc: 100,
    wood: 130,
    aluminum: 160,
};

const formSchema = z.object({
    length: z.number().min(5).max(100).int(),
    material: z.enum(["upvc", "wood", "aluminum"]),
    scaffolding: z.boolean(),
    guttering: z.boolean(),
});

type ResultData = {
    minCost: number;
    maxCost: number;
};

export default function SoffitFasciaCostCalculator() {
    const [result, setResult] = useState<ResultData | null>(null);
    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            length: 20, // Average UK semi-detached
            material: "upvc",
            scaffolding: true,
            guttering: true,
        },
    });

    const material = watch("material");
    const scaffolding = watch("scaffolding");
    const guttering = watch("guttering");

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const baseCost = values.length * MATERIAL_COSTS_PER_METER[values.material];

        let additionalCost = 0;

        // Add Scaffolding ~£200-£400 for a side
        if (values.scaffolding) additionalCost += 300;

        // Add Guttering per meter (approx £30/m)
        if (values.guttering) additionalCost += (values.length * 30);

        const totalEstimate = baseCost + additionalCost;

        setResult({
            minCost: Math.floor(totalEstimate * 0.9),
            maxCost: Math.ceil(totalEstimate * 1.1),
        });
    };

    const exportPDF = async () => {
        if (!calculatorRef.current) return;
        setIsExporting(true);

        const exportButton = calculatorRef.current.parentNode?.querySelector('button[onClick*="exportPDF"]');
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
            pdf.text("Soffit & Fascia Report", 15, 20);
            
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 15, 28);
            
            pdf.setDrawColor(226, 232, 240);
            pdf.line(15, 32, pdfWidth - 15, 32);

            pdf.addImage(imgData, "PNG", 15, 40, pdfWidth - 30, (canvas.height * (pdfWidth - 30)) / canvas.width);
            pdf.save("soffit-fascia-report.pdf");
        } catch (error) {
            console.error("Failed to generate PDF", error);
        } finally {
            if (exportButton instanceof HTMLElement) exportButton.style.opacity = '1';
            setIsExporting(false);
        }
    };

    return (
        <div ref={calculatorRef} className="relative">
            <CalculatorCard
                title="Soffit & Fascia Cost Estimator"
                description="Estimate the cost of replacing roofline boards (fascias and soffits) in the UK."
                hasResult={!!result}
            >
                <div className="absolute top-4 right-4 z-10">
                    <Button
                        onClick={exportPDF}
                        variant="outline"
                        size="sm"
                        disabled={isExporting}
                        className="flex items-center gap-2"
                    >
                        {isExporting ? <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div> : <Download className="h-4 w-4" />}
                        Export
                    </Button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">

                    <div className="space-y-2">
                        <Label htmlFor="length">Estimated Roofline Length (Meters)</Label>
                        <Input
                            id="length"
                            type="number"
                            min={5}
                            max={100}
                            {...register("length", { valueAsNumber: true })}
                        />
                        <p className="text-xs text-muted-foreground">Typical terraced house is ~10m, semi-detached ~20m, detached ~30m+</p>
                        {errors.length && <p className="text-sm text-destructive">{errors.length.message?.toString()}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Material</Label>
                        <Select onValueChange={(val) => setValue("material", val as "upvc" | "wood" | "aluminum")} defaultValue={material}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select material" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="upvc">uPVC (Standard)</SelectItem>
                                <SelectItem value="wood">Timber</SelectItem>
                                <SelectItem value="aluminum">Aluminum</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="scaffold"
                                className="w-4 h-4 rounded text-primary border-gray-300"
                                checked={scaffolding}
                                onChange={(e) => setValue("scaffolding", e.target.checked)}
                            />
                            <Label htmlFor="scaffold" className="cursor-pointer">Includes scaffolding (needed for 2+ stories)</Label>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="gutters"
                                className="w-4 h-4 rounded text-primary border-gray-300"
                                checked={guttering}
                                onChange={(e) => setValue("guttering", e.target.checked)}
                            />
                            <Label htmlFor="gutters" className="cursor-pointer">Replace Guttering & Downpipes</Label>
                        </div>
                    </div>
                </div>

                <Button type="submit" className="w-full">
                    Estimate Cost
                </Button>
            </form>

            {result && (
                <div className="mt-8 p-6 bg-muted/50 rounded-lg space-y-4 text-center border-l-4 border-primary">
                    <h3 className="text-xl font-bold">Estimated Cost Range</h3>

                    <div className="flex justify-center items-center gap-2 text-3xl font-extrabold text-primary py-2">
                        <span>£{result.minCost.toLocaleString()}</span>
                        <span className="text-muted-foreground font-normal">-</span>
                        <span>£{result.maxCost.toLocaleString()}</span>
                    </div>

                    <div className="flex items-start gap-2 text-xs text-muted-foreground bg-card p-3 rounded text-left shadow-sm">
                        <Info className="w-5 h-5 shrink-0 mt-0.5 text-primary" />
                        <p>
                            Costs include removal of old wooden fascias. Beware "capping" where new uPVC is just nailed over old rotting wood, which is cheaper but not recommended.
                        </p>
                    </div>
                </div>
            )}
        </CalculatorCard>
        </div>
    );
}
