"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertCircle, Activity, BookOpen, Flame, Info, Target, TrendingDown, HelpCircle, Calculator } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { LearnMore } from "@/components/seo/learn-more";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export default function BMRCalculator() {
    const [unit, setUnit] = useState<"metric" | "imperial">("metric");
    const [gender, setGender] = useState<"male" | "female">("male");
    const [age, setAge] = useState("");

    // Metric
    const [cm, setCm] = useState("");
    const [kg, setKg] = useState("");

    // Imperial
    const [ft, setFt] = useState("");
    const [inVal, setInVal] = useState("");
    const [lbs, setLbs] = useState("");

    const [result, setResult] = useState<number | null>(null);

    const bmrFaqs = [
        {
            question: "What is BMR?",
            answer: "Basal Metabolic Rate (BMR) is the number of calories your body needs to accomplish its most basic (basal) life-sustaining functions, such as breathing, circulation, nutrient processing, and cell production."
        },
        {
            question: "How is BMR different from TDEE?",
            answer: "BMR is just the calories burned at rest. Total Daily Energy Expenditure (TDEE) includes your BMR plus the calories burned through physical activity and digestion (the thermic effect of food)."
        },
        {
            question: "Why use the Mifflin-St Jeor Equation?",
            answer: "Clinical studies, including those endorsed by the Academy of Nutrition and Dietetics, have found the Mifflin-St Jeor equation to be the most reliable and accurate formula for estimating resting metabolic rate in healthy adults."
        },
        {
            question: "Does BMR decrease with age?",
            answer: "Yes. As we age, we naturally lose lean muscle mass and hormonal changes occur. This lowers our resting metabolism, which is why calorie needs naturally decrease as we get older."
        }
    ];

    const blogLinks = [
        {
            title: "Understanding BMR vs TDEE",
            description: "A deep dive into the difference between your resting metabolic rate and your total daily expenditure.",
            href: "/blog/bmr-vs-tdee",
            category: "Science"
        },
        {
            title: "The Ultimate Guide to Calorie Deficits",
            description: "Learn how to calculate your TDEE, manage macros, and sustain long-term weight loss safely.",
            href: "/blog/calorie-deficit-guide",
            category: "Nutrition"
        }
    ];

    const calculateBMR = (e: React.FormEvent) => {
        e.preventDefault();
        let weightKg = 0;
        let heightCm = 0;
        const ageNum = parseInt(age);

        if (unit === "metric") {
            weightKg = parseFloat(kg);
            heightCm = parseFloat(cm);
        } else {
            weightKg = parseFloat(lbs) * 0.453592;
            heightCm = ((parseFloat(ft) || 0) * 12 + parseFloat(inVal)) * 2.54;
        }

        if (weightKg > 0 && heightCm > 0 && ageNum > 0) {
            let bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum;
            bmr += gender === "male" ? 5 : -161;
            setResult(Math.round(bmr));
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <CalculatorSchema
                title="BMR Calculator UK | Basal Metabolic Rate"
                description="Calculate your Basal Metabolic Rate (BMR) using the clinical standard Mifflin-St Jeor equation."
                slug="/bmr-calculator-to-lose-weight"
                faqs={bmrFaqs}
            />
            <CalculatorCard
                title="BMR Calculator"
                description="Calculate your Basal Metabolic Rate (BMR) - the number of calories your body needs to accomplish its most basic (basal) life-sustaining functions."
                hasResult={!!result}
            >
                <Tabs defaultValue="metric" onValueChange={(val) => {
                    setUnit(val as "metric" | "imperial");
                    setResult(null);
                }} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="metric">Metric (kg, cm)</TabsTrigger>
                        <TabsTrigger value="imperial">Imperial (lbs, ft)</TabsTrigger>
                    </TabsList>

                    <form onSubmit={calculateBMR} className="space-y-6">
                        <div className="space-y-3">
                            <Label>Gender</Label>
                            <RadioGroup defaultValue="male" onValueChange={(val) => setGender(val as "male" | "female")} className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="male" id="male" />
                                    <Label htmlFor="male">Male</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="female" id="female" />
                                    <Label htmlFor="female">Female</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="age">Age (years)</Label>
                            <Input
                                id="age"
                                type="number"
                                placeholder="e.g. 30"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                required
                            />
                        </div>

                        <TabsContent value="metric" className="space-y-4 mt-0">
                            <div className="space-y-2">
                                <Label htmlFor="height-cm">Height (cm)</Label>
                                <Input
                                    id="height-cm"
                                    type="number"
                                    placeholder="e.g. 175"
                                    value={cm}
                                    onChange={(e) => setCm(e.target.value)}
                                    required={unit === "metric"}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="weight-kg">Weight (kg)</Label>
                                <Input
                                    id="weight-kg"
                                    type="number"
                                    placeholder="e.g. 70"
                                    value={kg}
                                    onChange={(e) => setKg(e.target.value)}
                                    required={unit === "metric"}
                                />
                            </div>
                        </TabsContent>

                        <TabsContent value="imperial" className="space-y-4 mt-0">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="height-ft">Height (ft)</Label>
                                    <Input
                                        id="height-ft"
                                        type="number"
                                        placeholder="e.g. 5"
                                        value={ft}
                                        onChange={(e) => setFt(e.target.value)}
                                        required={unit === "imperial"}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="height-in">Height (in)</Label>
                                    <Input
                                        id="height-in"
                                        type="number"
                                        placeholder="e.g. 9"
                                        value={inVal}
                                        onChange={(e) => setInVal(e.target.value)}
                                        required={unit === "imperial"}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="weight-lbs">Weight (lbs)</Label>
                                <Input
                                    id="weight-lbs"
                                    type="number"
                                    placeholder="e.g. 150"
                                    value={lbs}
                                    onChange={(e) => setLbs(e.target.value)}
                                    required={unit === "imperial"}
                                />
                            </div>
                        </TabsContent>

                        <Button type="submit" className="w-full text-lg h-12">Calculate BMR</Button>
                    </form>
                </Tabs>

                {result && (
                    <div className="mt-8 p-6 rounded-xl bg-muted/50 text-center animate-in zoom-in-95 duration-300">
                        <div className="flex justify-center items-center gap-2 mb-2">
                            <h3 className="text-lg font-medium">Your BMR is</h3>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="w-48 text-xs">Mifflin-St Jeor Equation is used for this calculation, considered the most accurate standard.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="text-5xl font-extrabold mb-2 text-primary">
                            {result.toLocaleString()} <span className="text-2xl font-normal text-muted-foreground">kcal/day</span>
                        </div>
                    </div>
                )}
            </CalculatorCard>

            {/* Massive SEO Content Section */}
            <section className="mt-16 max-w-4xl mx-auto space-y-12">
                <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-lg">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                        <Flame className="w-8 h-8 text-orange-500" />
                        Understanding Your Basal Metabolic Rate (BMR)
                    </h2>

                    <div className="space-y-10 text-slate-700 dark:text-slate-300">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                <Info className="w-6 h-6 text-blue-500" /> What is Basal Metabolic Rate?
                            </h3>
                            <p className="text-lg leading-relaxed">
                                Your <strong>Basal Metabolic Rate (BMR)</strong> represents the absolute minimum number of calories your body requires to perform its most fundamental life-sustaining functions while at complete rest. This includes breathing, circulation, cell production, and nutrient processing.
                            </p>
                            <p className="leading-relaxed">
                                In almost all humans, BMR accounts for the vast majority (about 60% to 75%) of your Total Daily Energy Expenditure (TDEE). Knowing this number is the critical first step before building any weight loss, maintenance, or muscle-building nutritional plan.
                            </p>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                                <Calculator className="w-6 h-6 text-slate-500" /> How It Works (The Formula)
                            </h3>
                            <p className="mb-4">Our calculator uses the <strong>Mifflin-St Jeor equation</strong>, widely regarded by the Academy of Nutrition and Dietetics as the most accurate predictive equation for healthy adults:</p>
                            <div className="space-y-3 font-mono text-sm bg-white dark:bg-black p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                                <div>Men = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5</div>
                                <div>Women = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) - 161</div>
                            </div>
                            <p className="mt-4">This formula takes into account your biological sex, age, height, and weight to closely estimate your resting caloric burn. Note that having a high amount of lean muscle mass will result in a slightly higher actual BMR than predicted.</p>
                        </div>

                        {/* Data Sources & Methodology */}
                        <div className="space-y-4 pt-8 border-t border-slate-200 dark:border-slate-800">
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-indigo-500" /> Data Sources & Methodology
                            </h3>
                            <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-2">
                                <li><strong>Academy of Nutrition and Dietetics:</strong> Endorsement of the Mifflin-St Jeor equation for basal metabolism.</li>
                                <li><strong>National Health Service (NHS):</strong> Guidelines on resting metabolism and safe caloric intake baselines.</li>
                                <li><strong>Scientific Validation:</strong> Formula published by M.D. Mifflin and S.T. St Jeor in the American Journal of Clinical Nutrition.</li>
                            </ul>
                        </div>

                        {/* FAQs Section */}
                        <FAQAccordion faqs={bmrFaqs} title="Frequently Asked Questions (BMR)" />
                    </div>
                </div>

                <LearnMore links={blogLinks} />
            </section>
        </div>
    );
}
