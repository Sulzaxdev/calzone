"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    AlertCircle,
    RotateCcw,
    CheckCircle2,
    TrendingUp,
    Info,
    Timer,
    Heart,
    Activity,
    Ruler
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function VO2MaxCalculatorForm() {
    const [testType, setTestType] = useState<"rockport" | "cooper">("rockport");
    const [gender, setGender] = useState<"male" | "female">("male");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [unit, setUnit] = useState<"metric" | "imperial">("metric");

    // Rockport state
    const [walkTimeMin, setWalkTimeMin] = useState("");
    const [walkTimeSec, setWalkTimeSec] = useState("");
    const [heartRate, setHeartRate] = useState("");

    // Cooper state
    const [distance, setDistance] = useState("");
    const [distUnit, setDistUnit] = useState<"meters" | "miles">("meters");

    const [error, setError] = useState("");
    const [result, setResult] = useState<any>(null);

    const calculateVO2Max = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        let vo2Value = 0;

        if (testType === "rockport") {
            const wLbs = unit === "metric" ? parseFloat(weight) * 2.20462 : parseFloat(weight);
            const timeMin = parseFloat(walkTimeMin) + (parseFloat(walkTimeSec) || 0) / 60;
            const hr = parseFloat(heartRate);
            const ageNum = parseFloat(age);
            const gVal = gender === "male" ? 1 : 0;

            if (wLbs > 0 && timeMin > 0 && hr > 0 && ageNum > 0) {
                // Rockport Formula: 132.853 - (0.0769 x weight) - (0.3877 x age) + (6.315 x gender) - (3.2649 x time) - (0.1565 x heart rate)
                vo2Value = 132.853 - (0.0769 * wLbs) - (0.3877 * ageNum) + (6.315 * gVal) - (3.2649 * timeMin) - (0.1565 * hr);
            } else {
                setError("Please fill in all fields with valid positive numbers.");
                return;
            }
        } else {
            const dMeters = distUnit === "miles" ? parseFloat(distance) * 1609.34 : parseFloat(distance);
            if (dMeters > 0) {
                // Cooper Formula: (distance in meters - 504.9) / 44.73
                vo2Value = (dMeters - 504.9) / 44.73;
            } else {
                setError("Please enter a valid distance.");
                return;
            }
        }

        if (vo2Value > 0) {
            let category = "";
            let color = "";
            let statusColor = "";
            const ageNum = parseFloat(age) || 30;

            // Simplified categories based on ACSM guidelines (approximate for general purpose)
            const getCategory = (val: number, isMale: boolean) => {
                if (isMale) {
                    if (val < 30) return { cat: "Poor", color: "text-red-500", status: "red" };
                    if (val < 35) return { cat: "Fair", color: "text-orange-500", status: "orange" };
                    if (val < 42) return { cat: "Good", color: "text-yellow-500", status: "yellow" };
                    if (val < 52) return { cat: "Excellent", color: "text-green-500", status: "green" };
                    return { cat: "Superior", color: "text-blue-500", status: "blue" };
                } else {
                    if (val < 26) return { cat: "Poor", color: "text-red-500", status: "red" };
                    if (val < 31) return { cat: "Fair", color: "text-orange-500", status: "orange" };
                    if (val < 38) return { cat: "Good", color: "text-yellow-500", status: "yellow" };
                    if (val < 48) return { cat: "Excellent", color: "text-green-500", status: "green" };
                    return { cat: "Superior", color: "text-blue-500", status: "blue" };
                }
            };

            const ranking = getCategory(vo2Value, gender === "male");

            setResult({
                vo2: vo2Value.toFixed(1),
                category: ranking.cat,
                color: ranking.color,
                statusColor: ranking.status,
                pct: Math.min(100, (vo2Value / 60) * 100)
            });
        } else {
            setError("The calculated value is outside a realistic range. Please check your inputs.");
        }
    };

    const handleClear = () => {
        setAge(""); setWeight(""); setWalkTimeMin(""); setWalkTimeSec(""); setHeartRate(""); setDistance(""); setResult(null); setError("");
    };

    return (
        <CalculatorCard
            title="VO2 Max Calculator"
            description="Estimate your maximal oxygen uptake (VO2 Max) using the Rockport Walking Test or Cooper 12-Minute Run Test."
            hasResult={!!result}
        >
            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-900/50 rounded-2xl">
                    <button
                        onClick={() => { setTestType("rockport"); setResult(null); }}
                        className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold transition-all ${testType === 'rockport' ? 'bg-white dark:bg-slate-800 shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                    >
                        <Timer className="w-4 h-4" />
                        Rockport Walk
                    </button>
                    <button
                        onClick={() => { setTestType("cooper"); setResult(null); }}
                        className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold transition-all ${testType === 'cooper' ? 'bg-white dark:bg-slate-800 shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                    >
                        <Activity className="w-4 h-4" />
                        Cooper Run
                    </button>
                </div>

                <form onSubmit={calculateVO2Max} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="font-semibold">Gender</Label>
                            <div className="flex gap-4">
                                <Button
                                    type="button"
                                    variant={gender === "male" ? "default" : "outline"}
                                    onClick={() => setGender("male")}
                                    className="flex-1 h-12 rounded-xl"
                                >
                                    Male
                                </Button>
                                <Button
                                    type="button"
                                    variant={gender === "female" ? "default" : "outline"}
                                    onClick={() => setGender("female")}
                                    className="flex-1 h-12 rounded-xl"
                                >
                                    Female
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="age" className="font-semibold">Age</Label>
                            <Input
                                id="age"
                                type="number"
                                placeholder="30"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="h-12 text-lg rounded-xl"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="weight" className="font-semibold">Weight ({unit === 'metric' ? 'kg' : 'lbs'})</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="weight"
                                    type="number"
                                    placeholder={unit === 'metric' ? '70' : '155'}
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    className="h-12 text-lg rounded-xl flex-1"
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => setUnit(unit === 'metric' ? 'imperial' : 'metric')}
                                    className="h-12 px-3 text-xs uppercase font-bold"
                                >
                                    {unit === 'metric' ? 'KG' : 'LBS'}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {testType === "rockport" ? (
                        <div className="space-y-6 animate-in fade-in transition-all duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="font-semibold flex items-center gap-2">
                                        <Timer className="w-4 h-4" />
                                        1-Mile Walk Time
                                    </Label>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            type="number"
                                            placeholder="Min"
                                            value={walkTimeMin}
                                            onChange={(e) => setWalkTimeMin(e.target.value)}
                                            className="h-12 text-lg rounded-xl flex-1"
                                            required={testType === "rockport"}
                                        />
                                        <span className="font-bold">:</span>
                                        <Input
                                            type="number"
                                            placeholder="Sec"
                                            value={walkTimeSec}
                                            onChange={(e) => setWalkTimeSec(e.target.value)}
                                            className="h-12 text-lg rounded-xl flex-1"
                                            required={testType === "rockport"}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="heartRate" className="font-semibold flex items-center gap-2">
                                        <Heart className="w-4 h-4" />
                                        Post-Walk Heart Rate (BPM)
                                    </Label>
                                    <Input
                                        id="heartRate"
                                        type="number"
                                        placeholder="120"
                                        value={heartRate}
                                        onChange={(e) => setHeartRate(e.target.value)}
                                        className="h-12 text-lg rounded-xl"
                                        required={testType === "rockport"}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-in fade-in transition-all duration-300">
                            <div className="space-y-2">
                                <Label htmlFor="distance" className="font-semibold flex items-center gap-2">
                                    <Ruler className="w-4 h-4" />
                                    12-Minute Distance ({distUnit})
                                </Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="distance"
                                        type="number"
                                        placeholder={distUnit === 'meters' ? '2400' : '1.5'}
                                        value={distance}
                                        onChange={(e) => setDistance(e.target.value)}
                                        className="h-12 text-lg rounded-xl flex-1"
                                        required={testType === "cooper"}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => setDistUnit(distUnit === 'meters' ? 'miles' : 'meters')}
                                        className="h-12 px-3 text-xs uppercase font-bold"
                                    >
                                        {distUnit}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="p-4 bg-red-50 dark:bg-red-950/30 text-red-600 rounded-xl text-sm font-medium border border-red-200 dark:border-red-900/50 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            {error}
                        </div>
                    )}

                    <div className="flex gap-4 pt-4">
                        <Button type="button" variant="outline" onClick={handleClear} className="h-14 px-6 rounded-xl">
                            <RotateCcw className="w-5 h-5" />
                        </Button>
                        <Button type="submit" className="flex-1 h-14 text-lg font-bold shadow-lg shadow-primary/20 rounded-xl">
                            Calculate VO2 Max
                        </Button>
                    </div>
                </form>

                {result && (
                    <div className="mt-4 animate-in slide-in-from-bottom-4 duration-500">
                        <div className="p-8 rounded-3xl bg-linear-to-br from-slate-50 to-blue-50 dark:from-slate-900/50 dark:to-blue-900/20 border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden">
                            <div className="absolute top-4 right-4">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Info className="h-5 w-5 text-slate-400 cursor-help" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="w-48 text-xs">VO2 Max is the maximum rate of oxygen consumption measured during incremental exercise.</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>

                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Estimated VO2 Max</h3>
                            <div className={`text-7xl font-black mb-4 ${result.color} drop-shadow-sm`}>
                                {result.vo2}
                                <span className="text-xl ml-2 font-medium opacity-60">mL/kg/min</span>
                            </div>

                            <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full font-bold text-lg mb-8 border transition-all ${result.statusColor === 'green' ? 'bg-green-100 border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-800' :
                                    result.statusColor === 'yellow' ? 'bg-yellow-100 border-yellow-200 text-yellow-700 dark:bg-yellow-900/30 dark:border-yellow-800' :
                                        result.statusColor === 'orange' ? 'bg-orange-100 border-orange-200 text-orange-700 dark:bg-orange-900/30 dark:border-orange-800' :
                                            result.statusColor === 'red' ? 'bg-red-100 border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-800' :
                                                'bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800'
                                }`}>
                                {(result.category === 'Excellent' || result.category === 'Superior') && <CheckCircle2 className="w-5 h-5" />}
                                {result.category} Fitness
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                                <div className="bg-white/60 dark:bg-black/30 p-5 rounded-2xl shadow-sm border border-white/40 dark:border-white/5">
                                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1 flex items-center gap-2 text-sm uppercase tracking-wide">
                                        <TrendingUp className="w-4 h-4 text-primary" />
                                        What It Means
                                    </h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {result.category === 'Superior' || result.category === 'Excellent' ? 'You have exceptional cardiovascular health. Keep up the high-intensity training.' :
                                            result.category === 'Good' ? 'Your fitness is above average. Consistent cardio can push you into the next bracket.' :
                                                result.category === 'Fair' ? 'You have moderate fitness. Focus on increasing your aerobic capacity.' :
                                                    'Consider gradual aerobic training (brisk walking, cycling) to improve heart health.'}
                                    </p>
                                </div>

                                <div className="bg-white/60 dark:bg-black/30 p-5 rounded-2xl shadow-sm border border-white/40 dark:border-white/5">
                                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1 flex items-center gap-2 text-sm uppercase tracking-wide">
                                        <Info className="w-4 h-4 text-primary" />
                                        Next Steps
                                    </h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Monitor your V02 max over time. Improvements in cardio fitness are associated with better long-term health outcomes.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 px-4">
                                <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
                                    <div className="h-full bg-red-500" style={{ width: '25%' }}></div>
                                    <div className="h-full bg-orange-500" style={{ width: '15%' }}></div>
                                    <div className="h-full bg-yellow-400" style={{ width: '20%' }}></div>
                                    <div className="h-full bg-green-500" style={{ width: '20%' }}></div>
                                    <div className="h-full bg-blue-500 flex-1"></div>
                                </div>
                                <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                                    <span>Poor</span>
                                    <span>Fair</span>
                                    <span>Good</span>
                                    <span>Excellent</span>
                                    <span>Superior</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </CalculatorCard>
    );
}
