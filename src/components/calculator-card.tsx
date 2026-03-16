"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, ArrowRight, Sparkles } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { allCalculators } from "@/lib/calculators";
import Link from "next/link";

interface CalculatorCardProps {
    title: string;
    description: string;
    children: React.ReactNode;
    hasResult?: boolean;
    icon?: React.ReactNode;
    heroImage?: string;
}

export function CalculatorCard({ title, description, children, hasResult, icon, heroImage }: CalculatorCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isExporting, setIsExporting] = useState(false);
    const pathname = usePathname();

    const handleDownloadPdf = async () => {
        if (!cardRef.current) return;
        setIsExporting(true);

        // Hide the export button and other noise
        const ignoreElements = cardRef.current.querySelectorAll('[data-pdf-export-ignore]');
        ignoreElements.forEach(el => {
            if (el instanceof HTMLElement) el.style.opacity = '0';
        });

        try {
            await new Promise((resolve) => setTimeout(resolve, 150));
            
            const canvas = await html2canvas(cardRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
                windowWidth: cardRef.current.scrollWidth,
                windowHeight: cardRef.current.scrollHeight,
            });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            
            // Professional Header
            pdf.setFontSize(22);
            pdf.setTextColor(15, 23, 42);
            pdf.text(title, 15, 20);
            
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()} | CalZone.uk`, 15, 28);
            
            pdf.setDrawColor(226, 232, 240);
            pdf.line(15, 32, pdfWidth - 15, 32);

            pdf.addImage(imgData, "PNG", 15, 40, pdfWidth - 30, (canvas.height * (pdfWidth - 30)) / canvas.width);
            pdf.save(`${title.replace(/\s+/g, '-').toLowerCase()}-report.pdf`);
        } catch (error) {
            console.error("Failed to generate PDF:", error);
        } finally {
            ignoreElements.forEach(el => {
                if (el instanceof HTMLElement) el.style.opacity = '1';
            });
            setIsExporting(false);
        }
    };

    return (
        <div className="w-full">
            {/* FULL BLEED DYNAMIC HERO SECTION WITH IMAGE */}
            <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] pt-40 pb-32 mb-16 border-b border-primary/10 dark:border-primary/5 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={heroImage || "/heroimage.jpg"}
                        alt="Background"
                        fill
                        priority
                        className="object-cover object-center brightness-[0.3]"
                    />
                </div>
                <div className="container mx-auto px-4 text-center max-w-7xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="space-y-4"
                    >
                        {icon && (
                            <div className="flex justify-center mb-6">
                                <div className="p-4 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20 text-white">
                                    {icon}
                                </div>
                            </div>
                        )}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg">
                            {title}
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                            {description}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* CALCULATOR FORM CARD */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                className="max-w-5xl mx-auto w-full mb-12 px-4 sm:px-0 relative z-10"
            >
                <div className="flex justify-between items-end mb-4 px-1">
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-2 bg-white/50 dark:bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
                        <FileText className="w-4 h-4 text-primary" />
                        Calculation Tool
                    </span>
                </div>

                <div ref={cardRef} className="rounded-3xl bg-white dark:bg-card border border-slate-200/80 dark:border-border shadow-2xl shadow-primary/5 overflow-hidden p-1 relative">
                    <Card className="border-0 shadow-none bg-transparent relative z-10">
                        {/* We removed CardHeader because the title and description are now in the Hero Section above! */}
                        <CardContent className="pt-8 pb-8 px-4 sm:px-8">
                            {children}

                            {hasResult && (
                                <div className="mt-12 flex justify-center animate-in fade-in zoom-in duration-500">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        onClick={handleDownloadPdf}
                                        disabled={isExporting}
                                        data-pdf-export-ignore
                                        className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-md rounded-2xl px-8 h-12 font-bold disabled:opacity-50"
                                    >
                                        {isExporting ? <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div> : <Download className="w-5 h-5" />}
                                        {isExporting ? "Generating PDF..." : "Export Detailed Report (PDF)"}
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* GLOBAL RELATED CALCULATORS MODULE */}
                {pathname && (
                    <div className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-12 pb-8">
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
                            <Sparkles className="w-6 h-6 text-primary" /> Tools You Might Need
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {(() => {
                                const currentIndex = allCalculators.findIndex(c => c.href === pathname);
                                if (currentIndex === -1) return null;

                                // Deterministic sequential interlinking (Great for SEO Crawling)
                                const related = [
                                    allCalculators[(currentIndex + 1) % allCalculators.length],
                                    allCalculators[(currentIndex + 2) % allCalculators.length],
                                    allCalculators[(currentIndex + 3) % allCalculators.length],
                                ].filter(Boolean);

                                return related.map(calc => (
                                    <Link
                                        key={calc.href}
                                        href={calc.href}
                                        className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl hover:border-primary/50 hover:shadow-lg transition-all flex flex-col justify-between"
                                    >
                                        <div>
                                            <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{calc.name}</h4>
                                            <p className="text-sm text-slate-500 line-clamp-2">{calc.desc}</p>
                                        </div>
                                        <div className="mt-4 flex items-center gap-1 text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
                                            Calculate Now <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </Link>
                                ));
                            })()}
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
