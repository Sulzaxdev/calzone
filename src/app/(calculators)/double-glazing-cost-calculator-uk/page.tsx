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
import { AlertCircle, Download } from "lucide-react";

import jsPDF from "jspdf";

const MATERIAL_COSTS = {
    upvc: 300,
    aluminum: 450,
    wood: 550,
};

const WINDOW_TYPES = {
    casement: 1,
    sash: 1.3,
    bay: 1.6,
};

const formSchema = z.object({
    material: z.enum(["upvc", "aluminum", "wood"]),
    style: z.enum(["casement", "sash", "bay"]),
    quantity: z.number().min(1).max(30).int(),
});

type ResultData = {
    minCost: number;
    maxCost: number;
};

export default function DoubleGlazingCostCalculator() {
    const [result, setResult] = useState<ResultData | null>(null);
    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            material: "upvc",
            style: "casement",
            quantity: 4,
        },
    });

    const material = watch("material");
    const style = watch("style");

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const baseWindowCost = MATERIAL_COSTS[values.material];
        const styleModifier = WINDOW_TYPES[values.style];

        // Average cost per window based on material and style
        const averageCost = baseWindowCost * styleModifier;
        const totalAverage = averageCost * values.quantity;

        // Provide a 15% +/- range
        setResult({
            minCost: Math.floor(totalAverage * 0.85),
            maxCost: Math.ceil(totalAverage * 1.15),
        });
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
            pdf.text("Double Glazing Report", 15, 20);
            
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
            pdf.save("double-glazing-report.pdf");
        } catch (err) {
            console.error("Failed to export", err);
        } finally {
            if (exportButton) exportButton.style.opacity = '1';
            setIsExporting(false);
        }
    };

    return (
        <div ref={calculatorRef} className="relative">
            <CalculatorCard
                title="Double Glazing Cost Calculator"
                description="Get a rough estimate for replacing your windows based on UK averages."
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
                        <Label>Frame Material</Label>
                        <Select onValueChange={(val) => setValue("material", val as "upvc" | "aluminum" | "wood")} defaultValue={material}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select material" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="upvc">uPVC (Most common)</SelectItem>
                                <SelectItem value="aluminum">Aluminum</SelectItem>
                                <SelectItem value="wood">Timber / Wood</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Window Style</Label>
                        <Select onValueChange={(val) => setValue("style", val as "casement" | "sash" | "bay")} defaultValue={style}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select style" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="casement">Standard Casement</SelectItem>
                                <SelectItem value="sash">Sash Window</SelectItem>
                                <SelectItem value="bay">Bay Window</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="quantity">Number of Windows</Label>
                        <Input
                            id="quantity"
                            type="number"
                            min={1}
                            max={30}
                            {...register("quantity", { valueAsNumber: true })}
                        />
                        {errors.quantity && <p className="text-sm text-destructive">{errors.quantity.message?.toString()}</p>}
                    </div>

                </div>

                <Button type="submit" className="w-full">
                    Estimate Cost
                </Button>
            </form>

            {result && (
                <div className="mt-8 p-6 bg-muted/50 rounded-lg space-y-4">
                    <h3 className="text-xl font-bold text-center">Estimated Price Range</h3>

                    <div className="flex justify-center items-center gap-2 text-2xl font-extrabold text-primary">
                        <span>£{result.minCost.toLocaleString()}</span>
                        <span className="text-muted-foreground font-normal">-</span>
                        <span>£{result.maxCost.toLocaleString()}</span>
                    </div>

                    <div className="flex items-start gap-3 text-sm text-muted-foreground bg-card p-4 rounded-md border shadow-sm">
                        <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <p>
                            This is a national average estimate including typical installation costs. Access difficulties, scaffolding, or premium glass (like acoustic or solar-control) will increase these costs.
                        </p>
                    </div>
                </div>
            )}
        </CalculatorCard>
        </div>
    );
}
