"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, RotateCcw, Activity, Flame, ArrowDown, ArrowUp } from "lucide-react";

export function TDEECalculatorForm() {
    const [unit, setUnit] = useState<"metric" | "imperial">("metric");
    const [gender, setGender] = useState<"male" | "female">("male");
    const [age, setAge] = useState("");
    const [activity, setActivity] = useState("1.2");

    // Metric
    const [cm, setCm] = useState("");
    const [kg, setKg] = useState("");

    // Imperial
    const [ft, setFt] = useState("");
    const [inVal, setInVal] = useState("");
    const [lbs, setLbs] = useState("");

    const [error, setError] = useState("");
    const [result, setResult] = useState<any>(null);

    const calculateTDEE = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        let wKg = 0;
        let hCm = 0;
        const aYrs = parseInt(age);

        if (!aYrs || aYrs < 15 || aYrs > 100) {
            setError("Please enter a valid age between 15 and 100.");
            return;
        }

        if (unit === "metric") {
            hCm = parseFloat(cm);
            wKg = parseFloat(kg);
        } else {
            const hInches = (parseFloat(ft) || 0) * 12 + (parseFloat(inVal) || 0);
            const wLbs = parseFloat(lbs);
            hCm = hInches * 2.54;
            wKg = wLbs * 0.453592;
        }

        if (hCm <= 50 || wKg <= 20) {
            setError("Please enter valid positive measurements for height and weight.");
            return;
        }

        // Mifflin-St Jeor Equation
        // Men: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
        // Women: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161

        let bmr = 0;
        if (gender === "male") {
            bmr = (10 * wKg) + (6.25 * hCm) - (5 * aYrs) + 5;
        } else {
            bmr = (10 * wKg) + (6.25 * hCm) - (5 * aYrs) - 161;
        }

        const tdee = Math.round(bmr * parseFloat(activity));
        const bmrRounded = Math.round(bmr);

        setResult({
            bmr: bmrRounded,
            tdee: tdee,
            loss: tdee - 500, // Safe 1lb/week loss
            gain: tdee + 500, // Muscle gain surplus
        });
    };

    const handleClear = () => {
        setCm(""); setKg(""); setFt(""); setInVal(""); setLbs(""); setAge(""); setResult(null); setError("");
    };

    return (
        <CalculatorCard
            title="TDEE Calculator"
            description="Calculate your Total Daily Energy Expenditure (TDEE) using the highly accurate Mifflin-St Jeor equation to find out exactly how many calories you burn per day."
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

                <form onSubmit={calculateTDEE} className="space-y-6">
                    {/* Gender Selection */}
                    <div className="space-y-3">
                        <Label className="font-semibold text-slate-800 dark:text-slate-200">Biological Sex</Label>
                        <RadioGroup defaultValue="male" onValueChange={(val) => setGender(val as "male" | "female")} className="flex gap-4">
                            <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-900/50 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 flex-1">
                                <RadioGroupItem value="male" id="male" />
                                <Label htmlFor="male" className="cursor-pointer font-medium">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-900/50 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 flex-1">
                                <RadioGroupItem value="female" id="female" />
                                <Label htmlFor="female" className="cursor-pointer font-medium">Female</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="age" className="font-semibold">Age (years)</Label>
                            <Input id="age" type="number" placeholder="25" value={age} onChange={(e) => setAge(e.target.value)} className="h-12 text-lg" required />
                        </div>

                        <div className="space-y-2 col-span-1 md:col-span-2">
                            <Label htmlFor="activity" className="font-semibold">Activity Level</Label>
                            <Select value={activity} onValueChange={setActivity}>
                                <SelectTrigger className="h-12 bg-slate-50 dark:bg-slate-900 overflow-hidden text-left" id="activity">
                                    <SelectValue placeholder="Select activity level..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1.2">Sedentary (Office job, little or no exercise)</SelectItem>
                                    <SelectItem value="1.375">Light Exercise (1-2 days/week)</SelectItem>
                                    <SelectItem value="1.55">Moderate Exercise (3-5 days/week)</SelectItem>
                                    <SelectItem value="1.725">Heavy Exercise (6-7 days/week)</SelectItem>
                                    <SelectItem value="1.9">Athlete (2x per day, very active job)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <TabsContent value="metric" className="space-y-6 animate-in fade-in transition-all duration-300 mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="height-cm" className="font-semibold">Height (cm)</Label>
                                <Input id="height-cm" type="number" placeholder="175" value={cm} onChange={(e) => setCm(e.target.value)} className="h-12 text-lg" required={unit === "metric"} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="weight-kg" className="font-semibold">Weight (kg)</Label>
                                <Input id="weight-kg" type="number" placeholder="70" value={kg} onChange={(e) => setKg(e.target.value)} className="h-12 text-lg" required={unit === "metric"} />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="imperial" className="space-y-6 animate-in fade-in transition-all duration-300 mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="height-ft" className="font-semibold">Feet (ft)</Label>
                                <Input id="height-ft" type="number" placeholder="5" value={ft} onChange={(e) => setFt(e.target.value)} className="h-12 text-lg" required={unit === "imperial"} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="height-in" className="font-semibold">Inches (in)</Label>
                                <Input id="height-in" type="number" placeholder="9" value={inVal} onChange={(e) => setInVal(e.target.value)} className="h-12 text-lg" required={unit === "imperial"} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="weight-lbs" className="font-semibold">Weight (lbs)</Label>
                                <Input id="weight-lbs" type="number" placeholder="150" value={lbs} onChange={(e) => setLbs(e.target.value)} className="h-12 text-lg" required={unit === "imperial"} />
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
                            Calculate TDEE
                        </Button>
                    </div>
                </form>
            </Tabs>

            {/* RESULTS RENDERING */}
            {result && (
                <div className="mt-10 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="p-8 rounded-3xl bg-linear-to-br from-slate-50 to-blue-50 dark:from-slate-900/50 dark:to-blue-900/20 border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden">

                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Your Maintenance Calories</h3>
                        <div className={`text-6xl md:text-7xl font-black mb-4 text-blue-600 drop-shadow-sm flex items-end justify-center gap-2`}>
                            {result.tdee.toLocaleString()} <span className="text-2xl text-slate-500 font-bold mb-2">kcal/day</span>
                        </div>

                        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full font-bold text-sm mb-8 border transition-all bg-green-100 border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-800">
                            <Activity className="w-4 h-4" />
                            BMR: {result.bmr.toLocaleString()} kcal
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                            <div className="bg-white/60 dark:bg-black/30 p-5 rounded-2xl shadow-sm border border-white/40 dark:border-white/5 hover:border-orange-300 transition-colors group">
                                <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-1 flex items-center gap-2 text-sm uppercase tracking-wide">
                                    <ArrowDown className="w-4 h-4" />
                                    Weight Loss
                                </h4>
                                <p className="text-xl font-bold text-slate-800 dark:text-slate-200">{result.loss.toLocaleString()} kcal</p>
                                <p className="text-xs text-slate-500 mt-2 leading-tight">Aim for this daily to lose ~1lb (0.5kg) per week safely. (-500 kcal deficit)</p>
                            </div>

                            <div className="bg-white/60 dark:bg-black/30 p-5 rounded-2xl shadow-sm border border-white/40 dark:border-white/5 hover:border-purple-300 transition-colors group">
                                <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-1 flex items-center gap-2 text-sm uppercase tracking-wide">
                                    <ArrowUp className="w-4 h-4" />
                                    Muscle Gain
                                </h4>
                                <p className="text-xl font-bold text-slate-800 dark:text-slate-200">{(result.gain).toLocaleString()} kcal</p>
                                <p className="text-xs text-slate-500 mt-2 leading-tight">Aim for this daily to build muscle (bulking) with minimal fat. (+500 kcal surplus)</p>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </CalculatorCard>
    );
}
