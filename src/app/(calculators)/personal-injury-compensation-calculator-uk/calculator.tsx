
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculatePersonalInjury, InjuryType, INJURY_BRACKETS } from "@/lib/personal-injury-logic";
import { Calculator, Scale, PoundSterling, Stethoscope, AlertTriangle, ArrowRight, Gavel, FileText } from "lucide-react";

export function PersonalInjuryCalculatorForm() {
    const [injuryType, setInjuryType] = useState<InjuryType>('whiplash_moderate');
    const [lossOfEarnings, setLossOfEarnings] = useState<number>(0);
    const [medicalExpenses, setMedicalExpenses] = useState<number>(0);
    const [otherExpenses, setOtherExpenses] = useState<number>(0);
    
    const [result, setResult] = useState<any>(null);

    const handleCalculate = () => {
        const res = calculatePersonalInjury(injuryType, lossOfEarnings, medicalExpenses, otherExpenses);
        setResult(res);
    };

    return (
        <section className="container mx-auto px-4 pt-10">
            <div className="grid lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
                {/* Input Card */}
                <Card className="rounded-[2rem] border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden bg-white dark:bg-slate-900 border">
                    <CardHeader className="bg-slate-50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-800 p-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                                <Scale className="w-6 h-6" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100 uppercase">Injury Estimator</CardTitle>
                                <CardDescription>Check JCG compensation brackets</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                        
                        <div className="space-y-4">
                            <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500">1. Type of Injury (General Damages)</Label>
                            <p className="text-[10px] text-slate-400">Select the closest match to your primary injury.</p>
                            <Select value={injuryType} onValueChange={(v: InjuryType) => setInjuryType(v)}>
                                <SelectTrigger className="h-14 font-bold rounded-xl text-slate-700 dark:text-slate-200 bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900 focus:ring-indigo-500">
                                    <SelectValue placeholder="Select an injury" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="whiplash_minor">Whiplash (Recovered within 3 months)</SelectItem>
                                    <SelectItem value="whiplash_moderate">Whiplash (Up to 2 years recovery)</SelectItem>
                                    <SelectItem value="broken_arm">Broken Arm / Forearm Fracture</SelectItem>
                                    <SelectItem value="broken_leg">Broken Leg / Tibia Fracture</SelectItem>
                                    <SelectItem value="minor_hand">Minor Hand / Finger Injury</SelectItem>
                                    <SelectItem value="broken_nose">Broken Nose</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-4 border-t border-slate-100 dark:border-slate-800 pt-6">
                            <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500 block mb-2">2. Financial Losses (Special Damages)</Label>
                            <p className="text-[10px] text-slate-400 mb-4">Enter any actual money you have lost or spent as a direct result of the accident.</p>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold text-slate-500 uppercase">Loss of Earnings (£)</Label>
                                    <Input 
                                        type="number" 
                                        value={lossOfEarnings} 
                                        onChange={(e) => setLossOfEarnings(Number(e.target.value))}
                                        className="h-12 font-bold rounded-xl text-slate-700 dark:text-slate-200"
                                        placeholder="0"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold text-slate-500 uppercase">Medical Expenses (£)</Label>
                                    <Input 
                                        type="number" 
                                        value={medicalExpenses} 
                                        onChange={(e) => setMedicalExpenses(Number(e.target.value))}
                                        className="h-12 font-bold rounded-xl text-slate-700 dark:text-slate-200"
                                        placeholder="0"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label className="text-[10px] font-bold text-slate-500 uppercase">Other Expenses (Travel, Care) (£)</Label>
                                    <Input 
                                        type="number" 
                                        value={otherExpenses} 
                                        onChange={(e) => setOtherExpenses(Number(e.target.value))}
                                        className="h-12 font-bold rounded-xl text-slate-700 dark:text-slate-200"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                        </div>

                        <Button 
                            onClick={handleCalculate}
                            className="w-full h-16 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-lg font-bold shadow-xl shadow-indigo-500/20 text-white transition-all active:scale-[0.98]"
                        >
                            <Calculator className="w-5 h-5 mr-2" /> Estimate Claim Target
                        </Button>
                    </CardContent>
                </Card>

                {/* Results Section */}
                <div className="space-y-6">
                    {result ? (
                        <Card className={`rounded-[2.5rem] border-2 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20`}>
                             <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl pointer-events-none bg-indigo-500/10`}></div>
                            <CardContent className="p-10 relative z-10 text-center">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest mb-6 border border-indigo-400">
                                    <Gavel className="w-3 h-3" /> Estimated Settlement Range
                                </div>
                                
                                <h3 className="text-lg font-bold text-slate-600 dark:text-slate-400 mb-2 italic">Total Compensation</h3>
                                <div className="text-4xl md:text-5xl font-black text-indigo-600 dark:text-indigo-400 mb-8 tracking-tighter">
                                    {result.totalLow === result.totalHigh 
                                        ? `£${result.totalLow.toLocaleString()}`
                                        : `£${result.totalLow.toLocaleString()} - £${result.totalHigh.toLocaleString()}`
                                    }
                                </div>

                                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-indigo-100 dark:border-indigo-900/40 p-6 mb-8 text-left space-y-4">
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2">Claim Breakdown</h4>
                                    
                                     <div className="flex justify-between items-center text-sm py-1">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-slate-600 dark:text-slate-400">General Damages</span>
                                            <span className="text-[10px] text-slate-400 italic">For pain, suffering & amenity loss</span>
                                        </div>
                                        <span className="font-bold text-slate-900 dark:text-slate-100">
                                            {result.generalDamagesLow === result.generalDamagesHigh 
                                                ? `£${result.generalDamagesLow.toLocaleString()}`
                                                : `£${result.generalDamagesLow.toLocaleString()} - £${result.generalDamagesHigh.toLocaleString()}`
                                            }
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm py-1 border-t border-slate-100 dark:border-slate-800 pt-2">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-slate-600 dark:text-slate-400">Special Damages</span>
                                            <span className="text-[10px] text-slate-400 italic">Reimbursement for financial losses</span>
                                        </div>
                                        <span className="font-bold text-slate-900 dark:text-slate-100">
                                            + £{result.specialDamages.toLocaleString()}
                                        </span>
                                    </div>
                                   
                                </div>

                                 <Button 
                                    onClick={() => window.print()}
                                    className="w-full h-14 rounded-xl bg-slate-900 dark:bg-white hover:bg-slate-800 text-white dark:text-slate-900 font-bold gap-2"
                                >
                                    <FileText className="w-5 h-5" /> Download Report for Solicitor
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="h-full bg-slate-100/50 dark:bg-slate-900/30 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center p-12 min-h-[500px]">
                            <Scale className="w-16 h-16 text-slate-300 mb-4" />
                            <h3 className="text-lg font-bold text-slate-400">Awaiting Details</h3>
                            <p className="text-sm text-slate-400 max-w-xs mt-2">Select your injury type and out-of-pocket expenses to see a typical Judicial College Guidelines bracket.</p>
                        </div>
                    )}

                    <div className="bg-sky-50 dark:bg-sky-950/20 p-6 rounded-3xl border border-sky-100 dark:border-sky-900/30 flex gap-4">
                        <AlertTriangle className="w-8 h-8 text-sky-600 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-sky-900 dark:text-sky-400 text-sm">No Win, No Fee Deductions</h4>
                            <p className="text-xs text-sky-800 dark:text-sky-400 leading-relaxed max-w-sm mt-1">
                                Be aware that if you use a "No Win, No Fee" solicitor (a CFA), they took a success fee from your final compensation payout. By law, this is capped at a maximum of 25% of your payout for personal injuries.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
