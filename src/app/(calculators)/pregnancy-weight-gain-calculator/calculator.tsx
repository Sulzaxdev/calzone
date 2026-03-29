"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    RotateCcw,
    CheckCircle2,
    Timer,
    Scale,
    Info,
    Calendar,
    Baby,
    Sparkles
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

const formSchema = z.object({
    height: z.coerce.number().min(120, "Min height 120cm").max(220, "Max height 220cm"),
    weight: z.coerce.number().min(30, "Min weight 30kg").max(200, "Max weight 200kg"),
    unit: z.enum(["metric", "imperial"]),
    week: z.coerce.number().min(0).max(42).default(0),
    currentWeight: z.coerce.number().optional(),
});

type FormValues = z.infer<typeof formSchema>;
type FormInput = z.input<typeof formSchema>;

export function PregnancyBMIForm() {
    const [unit, setUnit] = useState<"metric" | "imperial">("metric");
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FormInput, any, FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            unit: "metric",
            week: 0,
        },
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setLoading(true);
        try {
            const response = await fetch("/api/pregnancy-weight-gain-calculator", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const resData = await response.json();
            if (resData.success) {
                setResult({
                    ...resData,
                    week: data.week,
                    currentWeight: data.currentWeight,
                    initialWeight: data.weight
                });
            }
        } catch (error) {
            console.error("Calculation failed", error);
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        reset({
            unit: unit,
            week: 0,
            height: undefined,
            weight: undefined,
            currentWeight: undefined
        });
        setResult(null);
    };

    const currentWeek = Number(watch("week") || 0);

    return (
        <CalculatorCard
            title="Pregnancy Weight Gain Calculator"
            description="Assess your pre-pregnancy BMI and find your healthy weight gain range by week based on NHS and IoM guidelines."
            hasResult={!!result}
        >
            <div className="max-w-3xl mx-auto">
                <Tabs defaultValue="metric" onValueChange={(val) => {
                    const selectedUnit = val as "metric" | "imperial";
                    setUnit(selectedUnit);
                    setValue("unit", selectedUnit);
                    setResult(null);
                    reset({
                        unit: selectedUnit,
                        week: 0,
                    });
                }} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8 bg-pink-50 dark:bg-pink-950/20 p-1 rounded-2xl border border-pink-100 dark:border-pink-900/30">
                        <TabsTrigger value="metric" className="rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-pink-600 dark:data-[state=active]:text-pink-400">Metric (cm, kg)</TabsTrigger>
                        <TabsTrigger value="imperial" className="rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400">Imperial (in, lbs)</TabsTrigger>
                    </TabsList>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="height" className="font-medium flex items-center gap-2">
                                    Pre-pregnancy Height ({unit === "metric" ? "cm" : "in"})
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger type="button">
                                                <Info className="w-4 h-4 text-slate-400" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="w-48 text-xs">Your height remains constant. This is used for standard BMI calculation.</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </Label>
                                <Input
                                    id="height"
                                    type="number"
                                    step="any"
                                    placeholder={unit === "metric" ? "e.g. 165" : "e.g. 65"}
                                    {...register("height")}
                                    className={`h-12 text-lg border-slate-200 dark:border-slate-800 rounded-xl focus:ring-pink-500/20 ${errors.height ? 'border-red-500' : ''}`}
                                />
                                {errors.height && <p className="text-xs text-red-500 mt-1">{errors.height.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="weight" className="font-medium flex items-center gap-2">
                                    Pre-pregnancy Weight ({unit === "metric" ? "kg" : "lbs"})
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger type="button">
                                                <Info className="w-4 h-4 text-slate-400" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="w-48 text-xs">Medical guidelines use your weight BEFORE pregnancy to set growth targets.</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </Label>
                                <Input
                                    id="weight"
                                    type="number"
                                    step="any"
                                    placeholder={unit === "metric" ? "e.g. 60" : "e.g. 132"}
                                    {...register("weight")}
                                    className={`h-12 text-lg border-slate-200 dark:border-slate-800 rounded-xl focus:ring-pink-500/20 ${errors.weight ? 'border-red-500' : ''}`}
                                />
                                {errors.weight && <p className="text-xs text-red-500 mt-1">{errors.weight.message}</p>}
                            </div>
                        </div>

                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 space-y-6">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="w-4 h-4 text-pink-500" />
                                <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Optional: Tracking</h4>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <Label htmlFor="week" className="font-medium flex items-center justify-between">
                                        <span>Current Week of Pregnancy</span>
                                        <span className="text-pink-600 dark:text-pink-400 font-semibold bg-pink-50 dark:bg-pink-900/30 px-2 py-0.5 rounded text-xs">Week {currentWeek}</span>
                                    </Label>
                                    <div className="space-y-4">
                                        <Input
                                            id="week"
                                            type="range"
                                            min="0"
                                            max="42"
                                            {...register("week")}
                                            className="accent-pink-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                                        />
                                        <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                                            <span>CONCEPTION</span>
                                            <span>TRIMESTER 2</span>
                                            <span>TRIMESTER 3</span>
                                            <span>DUE</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <Label htmlFor="currentWeight" className="font-medium">
                                        Current Weight ({unit === "metric" ? "kg" : "lbs"})
                                    </Label>
                                    <Input
                                        id="currentWeight"
                                        type="number"
                                        step="any"
                                        placeholder="Current reading..."
                                        {...register("currentWeight")}
                                        className="h-12 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-pink-500/20"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button type="button" variant="outline" onClick={handleClear} className="h-14 px-6 border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all">
                                <RotateCcw className="w-5 h-5" />
                            </Button>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="flex-1 h-14 text-lg font-semibold shadow-xl shadow-pink-500/10 bg-linear-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white rounded-2xl transition-all"
                            >
                                {loading ? "Analyzing..." : "Calculate Pregnancy Plan"}
                            </Button>
                        </div>
                    </form>
                </Tabs>

                {result && (
                    <div className="mt-12 animate-in slide-in-from-bottom-8 duration-700">
                        <div className="p-8 md:p-10 rounded-[2.5rem] bg-linear-to-br from-white to-pink-50/30 dark:from-slate-900 dark:to-pink-900/10 border border-pink-100 dark:border-pink-900/30 shadow-2xl shadow-pink-500/5 relative overflow-hidden text-center">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-100/50 dark:bg-pink-900/20 rounded-full blur-3xl"></div>
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-xs font-bold uppercase tracking-widest mb-6">
                                    <Baby className="w-4 h-4" />
                                    Pregnancy Profile
                                </div>

                                <h3 className="text-slate-500 dark:text-slate-400 font-semibold text-sm uppercase tracking-[0.2em] mb-2">Pre-Pregnancy BMI</h3>
                                <div className="text-8xl font-bold mb-4 bg-linear-to-b from-slate-900 to-slate-700 dark:from-white dark:to-slate-400 bg-clip-text text-transparent drop-shadow-sm">
                                    {result.bmi}
                                </div>

                                <div className={`inline-flex items-center gap-2 px-8 py-2.5 rounded-2xl font-bold text-xl mb-10 border shadow-lg transition-all ${result.color === 'green' ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-800' :
                                    result.color === 'yellow' ? 'bg-yellow-50 border-yellow-200 text-yellow-700 dark:bg-yellow-900/30 dark:border-yellow-800' :
                                        result.color === 'red' ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-800' :
                                            'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800'
                                    }`}>
                                    {result.category}
                                    <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
                                    <span className="text-xs opacity-70 ml-2">{result.riskLevel}</span>
                                </div>

                                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-10">
                                    <div className="bg-white dark:bg-black/40 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center">
                                        <Scale className="w-10 h-10 text-pink-500 mb-4" />
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Recommended Gain</h4>
                                        <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">{result.weightGain}</p>
                                        <p className="text-[10px] text-slate-400 mt-3 leading-relaxed uppercase font-semibold">Based on clinical standards for your pre-pregnancy BMI category.</p>
                                    </div>

                                    <div className="bg-white dark:bg-black/40 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center">
                                        <Timer className="w-10 h-10 text-blue-500 mb-4" />
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Current Status</h4>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">Week {result.week || 0}</p>
                                            {result.currentWeight && (
                                                <p className="text-sm font-semibold text-slate-500">
                                                    +{Math.max(0, result.currentWeight - result.initialWeight).toFixed(1)} {unit === "metric" ? "kg" : "lbs"} Gained
                                                </p>
                                            )}
                                        </div>
                                        <div className="w-full mt-6 scale-90">
                                            <Progress value={(result.week / 40) * 100} className="h-2 bg-slate-100 dark:bg-slate-800 accent-pink-500" />
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full p-6 bg-linear-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-950 rounded-[2rem] text-white text-left overflow-hidden relative">
                                    <div className="absolute -right-8 -bottom-8 opacity-10"><Baby className="w-32 h-32" /></div>
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-2 mb-4 text-pink-400 text-xs font-semibold uppercase tracking-widest">
                                            <Calendar className="w-4 h-4" />
                                            Expected Progression
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                            <div>
                                                <p className="text-xs font-semibold text-white/50 mb-1">TRIMESTER 1</p>
                                                <p className="text-sm font-medium">0.5 – 2.0 kg total</p>
                                                <div className="mt-2 h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                                                    <div className={`h-full bg-pink-500 ${result.week > 0 ? 'w-full' : 'w-0'}`}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-white/50 mb-1">TRIMESTER 2</p>
                                                <p className="text-sm font-medium">~0.5 kg / week</p>
                                                <div className="mt-2 h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                                                    <div className={`h-full bg-pink-500 ${result.week > 13 ? 'w-full' : result.week > 0 ? 'w-1/3' : 'w-0'}`}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-white/50 mb-1">TRIMESTER 3</p>
                                                <p className="text-sm font-medium">~0.5 kg / week</p>
                                                <div className="mt-2 h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                                                    <div className={`h-full bg-pink-500 ${result.week > 27 ? 'w-full' : 'w-0'}`}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-12 space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                        <Scale className="w-5 h-5 text-primary" />
                        <h3 className="text-xl font-semibold">Standard Weight Gain Guidelines</h3>
                    </div>
                    <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 uppercase text-[10px] font-bold tracking-widest">
                                <tr>
                                    <th className="px-6 py-4">Pre-Pregnancy BMI</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Recommended Gain</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                <tr className={result?.color === 'blue' ? "bg-blue-50/50 dark:bg-blue-900/10" : ""}>
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">&lt; 18.5</td>
                                    <td className="px-6 py-4 text-blue-600 dark:text-blue-400 font-semibold">Underweight</td>
                                    <td className="px-6 py-4 font-semibold">12.5 – 18 kg</td>
                                </tr>
                                <tr className={result?.color === 'green' ? "bg-green-50/50 dark:bg-green-900/10" : ""}>
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">18.5 – 24.9</td>
                                    <td className="px-6 py-4 text-green-600 dark:text-green-400 font-semibold">Normal</td>
                                    <td className="px-6 py-4 font-semibold">11.5 – 16 kg</td>
                                </tr>
                                <tr className={result?.color === 'yellow' ? "bg-yellow-50/50 dark:bg-yellow-900/10" : ""}>
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">25.0 – 29.9</td>
                                    <td className="px-6 py-4 text-yellow-600 dark:text-yellow-400 font-semibold">Overweight</td>
                                    <td className="px-6 py-4 font-semibold">7.0 – 11.5 kg</td>
                                </tr>
                                <tr className={result?.color === 'red' ? "bg-red-50/50 dark:bg-red-900/10" : ""}>
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">≥ 30.0</td>
                                    <td className="px-6 py-4 text-red-600 dark:text-red-400 font-semibold">Obese</td>
                                    <td className="px-6 py-4 font-semibold">5.0 – 9 kg</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </CalculatorCard>
    );
}
