"use client";

import React, { useState, useRef } from "react";
import { Calculator, Download, Info, CheckCircle2, Plane, Car, FileText } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function PetTransportCalculator() {
    const [transportType, setTransportType] = useState<"domestic" | "eu" | "international">("domestic");
    const [petSize, setPetSize] = useState<"cat" | "small-dog" | "medium-dog" | "large-dog">("small-dog");
    const [includeCrate, setIncludeCrate] = useState<boolean>(true);
    const [doorToDoor, setDoorToDoor] = useState<boolean>(false);

    const [isExporting, setIsExporting] = useState(false);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const calculateCost = () => {
        let baseTransport = 0;
        let healthDocs = 0;
        let crateCost = 0;
        let groundTransport = 0; // Door to door pickup

        // Base flight/pet courier cost averages
        if (transportType === "domestic") {
            // UK domestic courier
            if (petSize === "cat") baseTransport = 150;
            if (petSize === "small-dog") baseTransport = 200;
            if (petSize === "medium-dog") baseTransport = 250;
            if (petSize === "large-dog") baseTransport = 350;

            healthDocs = 0; // No health docs needed domestically
        } else if (transportType === "eu") {
            // UK to EU via Eurotunnel/Ferry courier
            if (petSize === "cat") baseTransport = 600;
            if (petSize === "small-dog") baseTransport = 750;
            if (petSize === "medium-dog") baseTransport = 900;
            if (petSize === "large-dog") baseTransport = 1200;

            healthDocs = 200; // Animal Health Certificate (AHC) + Rabies Vaccine standard price
        } else {
            // International Flight (Manifest cargo)
            if (petSize === "cat") baseTransport = 1200;
            if (petSize === "small-dog") baseTransport = 1500;
            if (petSize === "medium-dog") baseTransport = 2500;
            if (petSize === "large-dog") baseTransport = 3500;

            healthDocs = 350; // Export Health Certificate (EHC) + DEFRA paperwork
        }

        // Crate mapping
        if (includeCrate) {
            if (petSize === "cat") crateCost = 40;
            if (petSize === "small-dog") crateCost = 60;
            if (petSize === "medium-dog") crateCost = 120;
            if (petSize === "large-dog") crateCost = 250; // IATA compliant wooden/custom
        }

        // Door to door collection
        if (doorToDoor) {
            if (transportType === "domestic") groundTransport = 0; // Already included in domestic courier
            else groundTransport = 300; // Average cost to hire animal taxi to Heathrow/Gatwick from within ~2 hrs
        }

        const totalMin = baseTransport + healthDocs + crateCost + groundTransport;
        const totalMax = totalMin * 1.25; // 25% variable buffer

        return {
            baseTransport,
            healthDocs,
            crateCost,
            groundTransport,
            totalMin,
            totalMax
        };
    };

    const costs = calculateCost();

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(val);
    };

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
            pdf.text("UK Pet Transport Estimate", 15, 15);
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 15, 22);
            pdf.addImage(imgData, "PNG", 15, 30, pdfWidth - 30, pdfHeight - 30);
            pdf.save("Pet-Transport-Estimate.pdf");
        } catch (error) {
            console.error("Failed to generate PDF", error);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
            <div className="h-20 bg-white dark:bg-slate-950"></div>

            {/* Hero Section */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
                        <Plane className="w-4 h-4" />
                        Pets & Travel Toolkit
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        UK Pet Transport Cost Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Estimate the true cost of transporting your dog or cat domestically within the UK, moving them to Europe, or flying them internationally.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Col: Calculator App */}
                <div className="lg:col-span-7">
                    <div
                        ref={calculatorRef}
                        className="bg-white dark:bg-slate-950 rounded-[2rem] p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 dark:border-slate-800 overflow-hidden relative"
                    >
                        <div className="flex justify-between items-center mb-8 relative z-10">
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Journey Details
                            </h2>
                            <button
                                onClick={exportPDF}
                                disabled={isExporting}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
                            >
                                {isExporting ? (
                                    <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent shrink-0 rounded-full animate-spin"></div>
                                ) : (
                                    <Download className="w-4 h-4" />
                                )}
                                Export
                            </button>
                        </div>

                        <div className="space-y-6 relative z-10">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                    Transport Destination
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <button
                                        onClick={() => setTransportType("domestic")}
                                        className={`p-3 text-sm text-center rounded-xl border-2 transition-all ${transportType === "domestic" ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300 font-bold" : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-200 dark:hover:border-blue-900/50"}`}
                                    >
                                        UK Domestic
                                    </button>
                                    <button
                                        onClick={() => setTransportType("eu")}
                                        className={`p-3 text-sm text-center rounded-xl border-2 transition-all ${transportType === "eu" ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300 font-bold" : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-200 dark:hover:border-blue-900/50"}`}
                                    >
                                        UK to EU
                                    </button>
                                    <button
                                        onClick={() => setTransportType("international")}
                                        className={`p-3 text-sm text-center rounded-xl border-2 transition-all ${transportType === "international" ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300 font-bold" : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-200 dark:hover:border-blue-900/50"}`}
                                    >
                                        Rest of World
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                    Pet Size & Type
                                </label>
                                <select
                                    value={petSize}
                                    onChange={(e) => setPetSize(e.target.value as any)}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 px-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                                >
                                    <option value="cat">Cat / Kitten</option>
                                    <option value="small-dog">Small Dog (e.g. Pug, Spaniel, Terrier) &lt; 15kg</option>
                                    <option value="medium-dog">Medium Dog (e.g. Labrador, Collie) 15-30kg</option>
                                    <option value="large-dog">Large/Giant Dog (e.g. Mastiff, Great Dane) 30kg+</option>
                                </select>
                            </div>

                            <div className="space-y-3 pt-2">
                                <label className="flex items-start gap-4 cursor-pointer bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:bg-slate-100 transition-colors">
                                    <div className="pt-1">
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                            checked={includeCrate}
                                            onChange={(e) => setIncludeCrate(e.target.checked)}
                                        />
                                    </div>
                                    <div>
                                        <span className="block text-sm font-bold text-slate-900 dark:text-white">
                                            I need an IATA Compliant Travel Crate
                                        </span>
                                        <span className="block text-xs text-slate-600 dark:text-slate-400 mt-1">
                                            If flying or using a courier, pets must travel in hard plastic or custom wooden airline-approved crates.
                                        </span>
                                    </div>
                                </label>

                                {transportType !== "domestic" && (
                                    <label className="flex items-start gap-4 cursor-pointer bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:bg-slate-100 transition-colors">
                                        <div className="pt-1">
                                            <input
                                                type="checkbox"
                                                className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                checked={doorToDoor}
                                                onChange={(e) => setDoorToDoor(e.target.checked)}
                                            />
                                        </div>
                                        <div>
                                            <span className="block text-sm font-bold text-slate-900 dark:text-white">
                                                Include UK Ground Pet Taxi (Home to Airport)
                                            </span>
                                            <span className="block text-xs text-slate-600 dark:text-slate-400 mt-1">
                                                Adds a chauffeured pet taxi service to collect your pet from home and take them to London Heathrow/Gatwick cargo terminals.
                                            </span>
                                        </div>
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* Results Panel */}
                        <div className="mt-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 relative z-10">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Estimated Quotation
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800">
                                    <span className="text-slate-600 dark:text-slate-400 font-medium">Core Freight / Travel Booking</span>
                                    <span className="font-bold text-slate-900 dark:text-white">
                                        {formatCurrency(costs.baseTransport)}
                                    </span>
                                </div>

                                {costs.healthDocs > 0 && (
                                    <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800">
                                        <span className="text-slate-600 dark:text-slate-400 font-medium">Veterinary Docs & Vet Fees</span>
                                        <span className="font-bold text-slate-900 dark:text-white">
                                            {formatCurrency(costs.healthDocs)}
                                        </span>
                                    </div>
                                )}

                                {costs.crateCost > 0 && (
                                    <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800">
                                        <span className="text-slate-600 dark:text-slate-400 font-medium">IATA Travel Crate</span>
                                        <span className="font-bold text-slate-900 dark:text-white">
                                            {formatCurrency(costs.crateCost)}
                                        </span>
                                    </div>
                                )}

                                {costs.groundTransport > 0 && (
                                    <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800">
                                        <span className="text-slate-600 dark:text-slate-400 font-medium">Door-to-Airport Ground Taxi</span>
                                        <span className="font-bold text-slate-900 dark:text-white">
                                            {formatCurrency(costs.groundTransport)}
                                        </span>
                                    </div>
                                )}

                                <div className="flex flex-col pt-2 gap-4">
                                    <span className="block text-slate-800 dark:text-slate-200 font-black text-xl">Total Agency Estimate:</span>
                                    <div className="text-left bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/50">
                                        <span className="block font-black text-blue-600 dark:text-blue-400 text-3xl sm:text-4xl">
                                            {formatCurrency(costs.totalMin)} <span className="text-xl font-medium text-slate-500">- {formatCurrency(costs.totalMax)}</span>
                                        </span>
                                        <span className="text-sm font-bold text-blue-800/60 dark:text-blue-200/60 mt-2 block">
                                            Flight costs are highly volatile. Large dogs flying to Australia or New Zealand can significantly exceed these averages due to strict quarantine logistics.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Col: SEO Highlights Sidebar */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white dark:bg-slate-950 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-4 dark:text-white">
                            <Info className="w-5 h-5 text-blue-500" /> Key Transport Types
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Manifest Cargo</p>
                                    <p className="text-xs text-slate-500 mt-1">When departing the UK by air, pets are legally required to fly as 'Manifest Cargo' in the hold. They cannot fly in the cabin during outbound flights.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Road Courier (EU)</p>
                                    <p className="text-xs text-slate-500 mt-1">Many specialized companies offer climate-controlled vans to drive your pets through the Eurotunnel directly into France, Spain, and beyond. This is less stressful than flying.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* --- SEO Deep Content Section --- */}
            <div className="container mx-auto px-4 max-w-4xl mt-24">
                <article className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400">
                    <h2>How Much Does Pet Transport Cost from the UK?</h2>
                    <p>
                        Whether you are relocating abroad permanently, buying a puppy from an interstate breeder, or heading on a long-term holiday, moving pets requires serious logistical planning.
                    </p>

                    <h3>Why is Flying Pets Out of the UK So Expensive?</h3>
                    <p>
                        The United Kingdom has some of the strictest pet travel regulations in the world. Crucially, <strong>pets are not allowed to fly in the cabin when departing on commercial flights from the UK</strong> (with rare exceptions for registered assistance dogs). All pets must travel in the temperature-controlled hold as "Manifest Cargo."
                    </p>
                    <p>
                        This requires booking freight through certified cargo agencies, meaning you cannot simply buy a pet ticket alongside your passenger ticket on an airline's website. You are paying commercial freight rates, which are calculated via <em>volumetric weight</em>. This is why flying a Great Dane is exponentially more expensive than flying a Chihuahua—the giant crate takes up an immense amount of cargo volume.
                    </p>

                    <h3>Veterinary Certificates (AHC & EHC)</h3>
                    <p>
                        Since Brexit, the old UK Pet Passports are no longer valid for travel into the European Union.
                    </p>
                    <ul>
                        <li><strong>For the EU:</strong> You now require an <strong>Animal Health Certificate (AHC)</strong>. This must be issued by an Official Veterinarian (OV) within 10 days of travel. Because of the sheer length of the document (approx 10 pages) and the legal sign-offs required, vets typically charge between £150 and £250 for this single document.</li>
                        <li><strong>For Rest of World:</strong> You require an <strong>Export Health Certificate (EHC)</strong>. This guarantees your pet meets the specific disease requirements of the destination country. Prices vary heavily depending on the blood tests required by the receiving nation (e.g., Australia requires months of rabies titer testing).</li>
                    </ul>

                    <h3>IATA Compliant Travel Crates</h3>
                    <p>
                        Your pet cannot travel in a soft carrier or a wire cage. They must be in a solid, IATA-approved plastic (or reinforced wooden) travel crate. The crate must be rigidly secured with metal nuts and bolts—not plastic clips—and it must be large enough for the dog to stand up, turn around, and lie down comfortably without touching the roof.
                    </p>
                </article>
            </div>
        </div>
    );
}
