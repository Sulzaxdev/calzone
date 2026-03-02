"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, BookOpen, Calculator, Target, Info, Flame, Scale, TrendingDown, HelpCircle } from "lucide-react";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { LearnMore } from "@/components/seo/learn-more";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export default function CalorieDeficitCalculator() {
    const [gender, setGender] = useState<"male" | "female">("male");
    const [age, setAge] = useState("");
    const [weightKg, setWeightKg] = useState("");
    const [heightCm, setHeightCm] = useState("");
    const [activity, setActivity] = useState("1.2"); // Sedentary by default
    const [targetLossPerWeek, setTargetLossPerWeek] = useState("0.5"); // kg per week

    const [result, setResult] = useState<{
        maintenance: number;
        deficit: number;
        targetCalories: number;
        safe: boolean;
    } | null>(null);

    const calculateDeficit = (e: React.FormEvent) => {
        e.preventDefault();

        const w = parseFloat(weightKg);
        const h = parseFloat(heightCm);
        const a = parseInt(age);
        const act = parseFloat(activity);
        const loss = parseFloat(targetLossPerWeek);

        if (w > 0 && h > 0 && a > 0) {
            // Mifflin-St Jeor for BMR
            let bmr = 10 * w + 6.25 * h - 5 * a;
            bmr += gender === "male" ? 5 : -161;

            // Total Daily Energy Expenditure (TDEE)
            const maintenanceCalories = Math.round(bmr * act);

            // Deficit calculation: 1kg of fat ≈ 7700 kcal
            // Daily deficit = (target loss in kg * 7700) / 7 days
            const dailyDeficit = Math.round((loss * 7700) / 7);

            const targetCalories = maintenanceCalories - dailyDeficit;

            // Minimum safe limits (1200 for women, 1500 for men)
            const minSafe = gender === "female" ? 1200 : 1500;
            const isSafe = targetCalories >= minSafe;

            setResult({
                maintenance: maintenanceCalories,
                deficit: dailyDeficit,
                targetCalories: targetCalories,
                safe: isSafe,
            });
        }
    };

    const calorieFaqs = [
        {
            question: "How much of a calorie deficit is safe in the UK?",
            answer: "The NHS recommends a safe and sustainable weight loss rate of 0.5kg to 1kg (1lb to 2lbs) per week. This equates to a daily calorie deficit of around 500 to 1,000 kcal. Going lower than 1,200 calories for women or 1,500 calories for men without medical supervision is generally not advised."
        },
        {
            question: "Should I include exercise calories in my deficit?",
            answer: "Our calculator uses your general 'Activity Level' to estimate an inclusive Total Daily Energy Expenditure (TDEE). Therefore, you do not need to manually subtract extra calories you burn at the gym—it's already factored in!"
        },
        {
            question: "Is all weight lost in a calorie deficit fat?",
            answer: "No. Especially in the first few weeks, a significant portion of weight loss is water weight. If your deficit is too large or you don't consume enough protein, you may also lose muscle mass alongside fat."
        },
        {
            question: "Can I eat anything as long as I am in a deficit?",
            answer: "While thermodynamics dictate that a caloric deficit will result in weight loss regardless of food source, nutrient density matters for your health, energy levels, and body composition. A balanced diet of proteins, fats, and complex carbs is heavily recommended."
        }
    ];

    const blogLinks = [
        {
            title: "The Ultimate Guide to Calorie Deficits",
            description: "Learn how to calculate your TDEE, manage macros, and sustain long-term weight loss safely.",
            href: "/blog/calorie-deficit-guide",
            category: "Nutrition"
        },
        {
            title: "Understanding BMR vs TDEE",
            description: "A deep dive into the difference between your resting metabolic rate and your total daily expenditure.",
            href: "/blog/bmr-vs-tdee",
            category: "Science"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <CalculatorSchema
                title="Calorie Deficit Calculator UK | Safe Weight Loss Planner"
                description="Calculate your exact daily caloric needs to safely lose weight. Based on the Mifflin-St Jeor equation and UK NHS weekly guidelines."
                slug="/calorie-deficit-calculator-uk"
                faqs={calorieFaqs}
            />
            <CalculatorCard
                title="Calorie Deficit Calculator"
                description="Calculate the exact daily calories you need to consume to hit your target weight loss rate."
                hasResult={!!result}
            >
                <form onSubmit={calculateDeficit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
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
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t pt-4">
                        <div className="space-y-2">
                            <Label htmlFor="height">Height (cm)</Label>
                            <Input
                                id="height"
                                type="number"
                                placeholder="e.g. 175"
                                value={heightCm}
                                onChange={(e) => setHeightCm(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="weight">Weight (kg)</Label>
                            <Input
                                id="weight"
                                type="number"
                                placeholder="e.g. 80"
                                value={weightKg}
                                onChange={(e) => setWeightKg(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2 border-t pt-4">
                        <Label htmlFor="activity">Activity Level</Label>
                        <Select value={activity} onValueChange={setActivity}>
                            <SelectTrigger id="activity">
                                <SelectValue placeholder="Select activity level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1.2">Sedentary (Little or no exercise)</SelectItem>
                                <SelectItem value="1.375">Lightly active (Exercise 1-3 days/week)</SelectItem>
                                <SelectItem value="1.55">Moderately active (Exercise 3-5 days/week)</SelectItem>
                                <SelectItem value="1.725">Very active (Hard exercise 6-7 days/week)</SelectItem>
                                <SelectItem value="1.9">Super active (Very hard exercise, physical job)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2 border-t pt-4">
                        <Label htmlFor="loss">Target Weight Loss (kg per week)</Label>
                        <Select value={targetLossPerWeek} onValueChange={setTargetLossPerWeek}>
                            <SelectTrigger id="loss">
                                <SelectValue placeholder="Target loss" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0.25">0.25 kg (0.5 lb) - Very Safe</SelectItem>
                                <SelectItem value="0.5">0.5 kg (1 lb) - Recommended</SelectItem>
                                <SelectItem value="0.75">0.75 kg (1.6 lbs) - Aggressive</SelectItem>
                                <SelectItem value="1.0">1.0 kg (2.2 lbs) - Very Aggressive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button type="submit" className="w-full text-lg h-12">Calculate Calories</Button>
                </form>

                {result && (
                    <div className={`mt-8 p-6 rounded-xl text-center animate-in zoom-in-95 duration-300 border ${!result.safe ? 'bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-900' : 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-900'}`}>
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <Activity className={`h-6 w-6 ${!result.safe ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`} />
                            <h3 className={`text-xl font-bold ${!result.safe ? 'text-red-800 dark:text-red-200' : 'text-green-800 dark:text-green-200'}`}>
                                Your Targets
                            </h3>
                        </div>

                        <div className="space-y-4 text-left px-4">
                            <div className="flex justify-between items-center pb-3 border-b border-foreground/10">
                                <span className="font-medium">Maintenance Calories (TDEE):</span>
                                <span className="text-xl font-bold">{result.maintenance.toLocaleString()} <span className="text-sm font-normal">kcal</span></span>
                            </div>

                            <div className="flex justify-between items-center pb-3 border-b border-foreground/10">
                                <span className="font-medium">Daily Caloric Deficit:</span>
                                <span className="text-xl font-bold text-destructive">-{result.deficit.toLocaleString()} <span className="text-sm font-normal">kcal</span></span>
                            </div>

                            <div className="flex justify-between items-center pb-4">
                                <span className="font-medium text-lg">Goal Daily Calories:</span>
                                <span className={`text-3xl font-extrabold ${!result.safe ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                                    {result.targetCalories.toLocaleString()}
                                </span>
                            </div>

                            {!result.safe && (
                                <p className="text-sm font-bold text-red-600 dark:text-red-400 mt-4 text-center bg-red-100 dark:bg-red-900/50 p-3 rounded-lg">
                                    Warning: Eating below {gender === 'female' ? 1200 : 1500} calories a day is not recommended without medical supervision. Please consider a slower weight loss target.
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </CalculatorCard>

            {/* Massive SEO Content Section */}
            <section className="mt-16 max-w-4xl mx-auto space-y-12">
                <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-lg">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                        <Flame className="w-8 h-8 text-orange-500" />
                        The Science of Calorie Deficits
                    </h2>

                    <div className="space-y-10 text-slate-700 dark:text-slate-300">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                <Info className="w-6 h-6 text-blue-500" /> What is a Calorie Deficit?
                            </h3>
                            <p className="text-lg leading-relaxed">
                                A <strong>calorie deficit</strong> occurs when you consume fewer calories from food and drink than your body expends to maintain basic biological functions and physical activity. By depriving the body of this immediate fuel source, it is forced to tap into stored energy reserves (primarily fat) resulting in weight loss.
                            </p>
                            <p className="leading-relaxed">
                                In the UK, the NHS generally recommends creating a deficit of around <strong>500 to 600 kcal a day</strong> to achieve a steady and safe weight loss of around 0.5kg (1lb) a week.
                            </p>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                                <Calculator className="w-6 h-6 text-slate-500" /> How It Works
                            </h3>
                            <p className="mb-4">Our calculator uses the highly accurate <strong>Mifflin-St Jeor equation</strong> to determine your Basal Metabolic Rate (BMR):</p>
                            <div className="space-y-3 font-mono text-sm bg-white dark:bg-black p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                                <div>Men = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5</div>
                                <div>Women = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) - 161</div>
                            </div>
                            <p className="mt-4">We then multiply your BMR by your selected <strong>Activity Multiplier</strong> (ranging from 1.2 to 1.9) to find your Total Daily Energy Expenditure (TDEE). Note that 1kg of fat is approximately equal to <strong>7,700 kcal</strong>.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 items-start">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                    <Target className="w-6 h-6 text-green-500" /> A Real UK Example
                                </h3>
                                <p className="leading-relaxed">
                                    Let's take Sarah from London. She is 35 years old, weighs 75kg, is 165cm tall, and works an office job (sedentary, 1.2 multiplier).
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
                                    <li>Her BMR is calculated at roughly <strong>1,460 kcal</strong>.</li>
                                    <li>Her Maintenance TDEE is <strong>1,750 kcal</strong>.</li>
                                    <li>To lose 0.5kg a week (requiring a 3,850 weekly deficit, or 550 daily), she needs to eat <strong>1,200 kcal</strong> daily.</li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                    <TrendingDown className="w-6 h-6 text-red-500" /> Why It Matters
                                </h3>
                                <p className="leading-relaxed">
                                    Guessing your daily caloric intake is the number one reason diets fail. Without a mathematically calculated target based on your specific age, biometrics, and activity level, you may unknowingly be eating at maintenance. Worse, eating too far below your TDEE can cause muscle loss, nutrient deficiencies, and metabolic adaptation (where your body burns fewer calories to survive).
                                </p>
                            </div>
                        </div>

                        {/* Data Sources & Methodology */}
                        <div className="space-y-4 pt-8 border-t border-slate-200 dark:border-slate-800">
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-indigo-500" /> Data Sources & Methodology
                            </h3>
                            <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-2">
                                <li><strong>National Health Service (NHS):</strong> Weight loss guidelines and safe deficit thresholds based on official NHS advice.</li>
                                <li><strong>Mifflin-St Jeor Equation:</strong> Clinical standard for determining Basal Metabolic Rate validated by the Academy of Nutrition and Dietetics.</li>
                                <li><strong>British Dietetic Association (BDA):</strong> Evidence-based nutrition and sustained caloric intake guidance.</li>
                            </ul>
                        </div>

                        {/* FAQs Section */}
                        <FAQAccordion faqs={calorieFaqs} title="Frequently Asked Questions" />
                    </div>
                </div>

                <LearnMore links={blogLinks} />
            </section>
        </div>
    );
}
