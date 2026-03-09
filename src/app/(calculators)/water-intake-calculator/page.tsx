"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Droplets, BookOpen, Calculator, Target, Info, Flame, Scale, TrendingDown, HelpCircle, Activity } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { LearnMore } from "@/components/seo/learn-more";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { RelatedTools } from "@/components/layout/related-tools";

export default function WaterIntakeCalculator() {
    const [unit, setUnit] = useState<"metric" | "imperial">("metric");

    const [kg, setKg] = useState("");
    const [lbs, setLbs] = useState("");
    const [exerciseMins, setExerciseMins] = useState("30");
    const [isHot, setIsHot] = useState<"yes" | "no">("no");

    const [result, setResult] = useState<{ amount: string; unitStr: string; cups: string } | null>(null);

    const calculateWater = (e: React.FormEvent) => {
        e.preventDefault();
        let weightKg = 0;

        if (unit === "metric") {
            weightKg = parseFloat(kg);
        } else {
            weightKg = parseFloat(lbs) * 0.453592;
        }

        if (weightKg > 0) {
            // Baseline: 35ml per kg of body weight
            let waterMl = weightKg * 35;

            // Exercise: add 500ml per 60 mins of exercise
            const exercise = parseInt(exerciseMins) || 0;
            waterMl += (exercise / 60) * 500;

            // Environment: add 500ml if hot
            if (isHot === "yes") {
                waterMl += 500;
            }

            if (unit === "metric") {
                const liters = (waterMl / 1000).toFixed(1);
                const cups = Math.round(waterMl / 250).toString();
                setResult({ amount: liters, unitStr: "Liters", cups });
            } else {
                const ounces = (waterMl / 29.5735).toFixed(0);
                const cups = Math.round(parseInt(ounces) / 8).toString();
                setResult({ amount: ounces, unitStr: "fl oz", cups });
            }
        }
    };

    const waterFaqs = [
        {
            question: "Is 8 glasses of water a day accurate?",
            answer: "The '8 glasses a day' rule is a reasonable general guideline, but it lacks scientific precision. Hydration needs vary wildly based on an individual's mass, physical activity rate, and local climate. A personalized calculation is vastly superior."
        },
        {
            question: "Does tea or coffee count towards my intake?",
            answer: "Yes. While caffeine has a mild diuretic effect, the water volume in tea and coffee significantly outweighs the fluid lost. However, pure water remains the best, calorie-free way to meet your hydration targets."
        },
        {
            question: "Can you drink too much water?",
            answer: "Yes. Drinking excessive amounts of water rapidly can lead to a dangerous condition called hyponatremia, where the sodium levels in your blood become critically diluted. Never drink multiple liters in a short span."
        },
        {
            question: "How do I know if I'm hydrated enough?",
            answer: "The easiest and most reliable biological indicator is urine colour. Pale, straw-coloured urine suggests healthy hydration. Dark yellow or amber indicates a need for immediate fluid intake."
        }
    ];

    const blogLinks = [
        {
            title: "The Ultimate Guide to Daily Hydration",
            description: "Learn how proper hydration boosts metabolic rate, cognition, and physical performance.",
            href: "/blog/daily-hydration-guide",
            category: "Health"
        },
        {
            title: "Hydration Myths Debunked",
            description: "Are you over-hydrating? We break down the real science behind the 8-glasses-a-day myth.",
            href: "/blog/hydration-myths",
            category: "Science"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <BreadcrumbSchema items={[
                { name: "Home", item: "/" },
                { name: "Fitness & Diet", item: "/fitness-diet" },
                { name: "Water Intake Calculator", item: "/water-intake-calculator" }
            ]} />
            <CalculatorSchema
                title="Water Intake Calculator | Daily Hydration Planner"
                description="Calculate exactly how much water you should drink daily based on your weight, exercise routine, and local climate."
                slug="/water-intake-calculator"
                faqs={waterFaqs}
            />
            <CalculatorCard
                title="Water Intake Calculator"
                description="Calculate your daily hydration needs based on your body weight, activity level, and environment."
                hasResult={!!result}
            >
                <Tabs defaultValue="metric" onValueChange={(val) => {
                    setUnit(val as "metric" | "imperial");
                    setResult(null);
                }} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="metric">Metric (kg, L)</TabsTrigger>
                        <TabsTrigger value="imperial">Imperial (lbs, oz)</TabsTrigger>
                    </TabsList>

                    <form onSubmit={calculateWater} className="space-y-6">
                        <TabsContent value="metric" className="mt-0">
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

                        <TabsContent value="imperial" className="mt-0">
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

                        <div className="space-y-2">
                            <Label htmlFor="exercise">Daily Exercise (minutes)</Label>
                            <Input
                                id="exercise"
                                type="number"
                                placeholder="e.g. 30"
                                value={exerciseMins}
                                onChange={(e) => setExerciseMins(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-3">
                            <Label>Is the climate hot or dry?</Label>
                            <div className="flex gap-4">
                                <Button
                                    type="button"
                                    variant={isHot === "yes" ? "default" : "outline"}
                                    onClick={() => setIsHot("yes")}
                                    className="flex-1"
                                >
                                    Yes
                                </Button>
                                <Button
                                    type="button"
                                    variant={isHot === "no" ? "default" : "outline"}
                                    onClick={() => setIsHot("no")}
                                    className="flex-1"
                                >
                                    No
                                </Button>
                            </div>
                        </div>

                        <Button type="submit" className="w-full text-lg h-12">Calculate Hydration</Button>
                    </form>
                </Tabs>

                {result && (
                    <div className="mt-8 p-6 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-center animate-in zoom-in-95 duration-300">
                        <div className="flex justify-center items-center gap-2 mb-2">
                            <Droplets className="h-6 w-6 text-blue-500" />
                            <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200">Daily Target</h3>
                        </div>
                        <div className="text-5xl font-extrabold mb-2 text-blue-600 dark:text-blue-400">
                            {result.amount} <span className="text-2xl font-normal text-blue-800/60 dark:text-blue-200/60">{result.unitStr}</span>
                        </div>
                        <p className="text-lg font-medium text-blue-700 dark:text-blue-300">
                            Approximately {result.cups} cups per day
                        </p>
                    </div>
                )}
            </CalculatorCard>

            {/* Massive SEO Content Section */}
            <section className="mt-16 max-w-4xl mx-auto space-y-12">
                <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-lg">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                        <Droplets className="w-8 h-8 text-blue-500" />
                        The Science of Precision Hydration
                    </h2>

                    <div className="space-y-10 text-slate-700 dark:text-slate-300">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                <Info className="w-6 h-6 text-blue-500" /> Do You Really Need 8 Glasses?
                            </h3>
                            <p className="text-lg leading-relaxed">
                                The human body is roughly 60% water. However, the exact amount of daily water required to maintain optimal cellular function, blood volume, and temperature regulation is highly individualized. The universal "8 glasses a day" rule is outdated; your true requirement scales directly with your body mass, how much you sweat, and the ambient temperature.
                            </p>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                            <h3 className="text-xl font-bold text-blue-900 dark:text-blue-300 mb-4 flex items-center gap-2">
                                <Calculator className="w-6 h-6 text-blue-500" /> How We Calculate Your Needs
                            </h3>
                            <p className="mb-4">Our personalized hydration algorithm is built on clinical baseline guidelines, adjusted for active fluid loss:</p>
                            <ul className="space-y-3">
                                <li className="flex gap-2"><strong className="text-blue-600 dark:text-blue-400">1. Baseline Intake:</strong> 35 ml of water for every kilogram of body weight.</li>
                                <li className="flex gap-2"><strong className="text-blue-600 dark:text-blue-400">2. Exercise Adjustment:</strong> We add an extra 500 ml for every 60 minutes of reported physical activity to replace sweat.</li>
                                <li className="flex gap-2"><strong className="text-blue-600 dark:text-blue-400">3. Climate Adjustment:</strong> An additional 500 ml is added during hot or dry conditions to counteract increased insensible water loss (evaporation through skin and breathing).</li>
                            </ul>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 items-start">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                    <Target className="w-6 h-6 text-green-500" /> A Real UK Example
                                </h3>
                                <p className="leading-relaxed">
                                    Consider Mark, an 80kg male living in London. It's a mild day, but he plans to run for 45 minutes.
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
                                    <li><strong>Baseline:</strong> 80kg × 35ml = 2.8 Litres.</li>
                                    <li><strong>Exercise:</strong> (45 mins ÷ 60) × 500ml = 375ml.</li>
                                    <li><strong>Climate:</strong> No hot weather adjustment (+0ml).</li>
                                    <li><strong>Total Need:</strong> Roughly 3.2 Litres for the day.</li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                    <Activity className="w-6 h-6 text-red-500" /> Why It Matters
                                </h3>
                                <p className="leading-relaxed">
                                    Failing to meet dynamic hydration needs leads to immediate cognitive decline. A mere 2% drop in body water can impair memory, focus, and mood. In athletes, this same 2% drop causes a severe reduction in muscular endurance and strength. Over time, chronic under-hydration increases the risk of kidney stones and urinary tract infections.
                                </p>
                            </div>
                        </div>

                        {/* FAQs Section */}
                        <div className="space-y-6 pt-8 border-t border-slate-200 dark:border-slate-800">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                <HelpCircle className="w-6 h-6 text-blue-500" /> Frequently Asked Questions
                            </h3>
                            <div className="grid md:grid-cols-1 gap-6">
                                {waterFaqs.map((faq, idx) => (
                                    <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800">
                                        <h5 className="font-bold text-slate-900 dark:text-slate-100 mb-2">{faq.question}</h5>
                                        <p className="text-sm">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
}
