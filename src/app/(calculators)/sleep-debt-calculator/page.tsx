"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircle, Moon, BookOpen, HelpCircle, Activity, Clock, TrendingDown } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CalculatorSchema } from "@/components/seo/calculator-schema";

export default function SleepDebtCalculator() {
    const [targetHours, setTargetHours] = useState("8");

    // Array of 7 days
    const [actualSleep, setActualSleep] = useState<string[]>(Array(7).fill(""));
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const [result, setResult] = useState<{ debt: number; message: string; color: string } | null>(null);

    const calculateSleepDebt = (e: React.FormEvent) => {
        e.preventDefault();
        const target = parseFloat(targetHours);
        if (!target) return;

        let totalActual = 0;
        let validDays = 0;

        actualSleep.forEach(hours => {
            const h = parseFloat(hours);
            if (!isNaN(h)) {
                totalActual += h;
                validDays++;
            }
        });

        if (validDays > 0) {
            const weeklyTarget = target * validDays;
            const debt = weeklyTarget - totalActual;

            let message = "";
            let color = "";

            if (debt <= 0) {
                message = "No sleep debt! You are well rested.";
                color = "text-green-500";
            } else if (debt <= 4) {
                message = "Minor sleep debt. A quick nap or sleeping early tonight can help.";
                color = "text-yellow-500";
            } else if (debt <= 10) {
                message = "Moderate sleep debt. Aim for an extra hour of sleep each night this week.";
                color = "text-orange-500";
            } else {
                message = "Severe sleep debt. Your cognitive performance and health may be significantly impaired.";
                color = "text-red-500";
            }

            setResult({ debt: parseFloat(debt.toFixed(1)), message, color });
        }
    };

    const handleSleepChange = (index: number, value: string) => {
        const newSleep = [...actualSleep];
        newSleep[index] = value;
        setActualSleep(newSleep);
    };

    const sleepFaqs = [
        {
            question: "What is sleep debt?",
            answer: "Sleep debt is the accumulated difference between the amount of sleep your body requires and the amount you actually get. Over time, missing even an hour of sleep per night builds a debt that impairs cognitive and physical function."
        },
        {
            question: "Can I catch up on sleep debt on weekends?",
            answer: "While sleeping in on weekends can help you feel better in the short term, it does not fully reverse the profound metabolic and cognitive impairments caused by chronic sleep deprivation during the week."
        },
        {
            question: "How long does it take to recover from sleep debt?",
            answer: "Recovery depends on the severity of the debt. A few hours of missed sleep can usually be recovered in a couple of days with extra sleep. However, chronic sleep debt may require weeks of consistent, high-quality sleep to fully resolve."
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <CalculatorSchema
                title="Sleep Debt Calculator | Calculate Your Lost Sleep"
                description="Use our free sleep debt calculator to find out how many hours of sleep you owe your body. Track your 7-day sleep cycle and learn how to recover effectively."
                slug="/sleep-debt-calculator"
                faqs={sleepFaqs}
            />
            <CalculatorCard
                title="Sleep Debt Calculator"
                description="Track your sleep over the past 7 days to calculate your accumulated sleep debt and understand its impact."
                hasResult={!!result}
            >
                <form onSubmit={calculateSleepDebt} className="space-y-6">
                    <div className="space-y-2 pb-4 border-b">
                        <Label htmlFor="target" className="text-base font-semibold text-primary">Your Sleep Target (hours per night)</Label>
                        <Input
                            id="target"
                            type="number"
                            step="0.5"
                            placeholder="e.g. 8"
                            className="max-w-xs"
                            value={targetHours}
                            onChange={(e) => setTargetHours(e.target.value)}
                            required
                        />
                        <p className="text-sm text-muted-foreground">Most adults need 7-9 hours of sleep per night.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Moon className="h-5 w-5 text-primary" />
                            <Label className="text-base font-semibold">Actual Sleep (past 7 days)</Label>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {days.map((day, index) => (
                                <div key={day} className="space-y-1">
                                    <Label htmlFor={`day-${index}`} className="text-xs font-medium text-muted-foreground">{day}</Label>
                                    <Input
                                        id={`day-${index}`}
                                        type="number"
                                        step="0.5"
                                        placeholder="hours"
                                        value={actualSleep[index]}
                                        onChange={(e) => handleSleepChange(index, e.target.value)}
                                        required
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button type="submit" className="w-full text-lg h-12">Calculate Sleep Debt</Button>
                </form>

                {result && (
                    <div className="mt-8 p-6 rounded-xl bg-muted/50 text-center animate-in zoom-in-95 duration-300">
                        <div className="flex justify-center items-center gap-2 mb-2">
                            <h3 className="text-lg font-medium">Your Accumulated Sleep Debt</h3>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="w-56 text-xs">Sleep debt is the difference between the amount of sleep you should be getting and the amount you actually get.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        {result.debt <= 0 ? (
                            <div className="text-5xl font-extrabold mb-4 text-green-500">
                                0 <span className="text-2xl font-normal text-muted-foreground">hours</span>
                            </div>
                        ) : (
                            <div className={`text-5xl font-extrabold mb-4 ${result.color}`}>
                                {result.debt} <span className="text-2xl font-normal text-muted-foreground">hours</span>
                            </div>
                        )}

                        <p className="text-base font-medium text-foreground/80 max-w-sm mx-auto">
                            {result.message}
                        </p>
                    </div>
                )}
            </CalculatorCard>

            {/* Massive SEO Content Section */}
            <section className="mt-16 max-w-4xl mx-auto space-y-12">
                <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-lg">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                        <BookOpen className="w-8 h-8 text-indigo-500" />
                        Understanding Sleep Debt: Causes, Symptoms & Recovery
                    </h2>

                    <div className="space-y-10 text-slate-700 dark:text-slate-300">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                <HelpCircle className="w-6 h-6 text-indigo-500" /> What Exactly is Sleep Debt?
                            </h3>
                            <p className="text-lg leading-relaxed">
                                <strong>Sleep debt</strong> (or sleep deficit) is the cumulative effect of not getting enough sleep over consecutive days. When your body requires 8 hours of sleep but you only get 6, you accumulate 2 hours of sleep debt. Over a week, this can easily build into a systemic deficiency.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                    <Activity className="w-6 h-6 text-red-500" /> Immediate Impacts
                                </h3>
                                <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
                                    <li>Reduced cognitive function & focus</li>
                                    <li>Slower reaction times</li>
                                    <li>Irritability and mood swings</li>
                                    <li>Increased appetite and cravings</li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                    <TrendingDown className="w-6 h-6 text-orange-500" /> Long-Term Risks
                                </h3>
                                <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
                                    <li>Insulin resistance & weight gain</li>
                                    <li>Weakened immune system</li>
                                    <li>Higher risk of cardiovascular disease</li>
                                    <li>Premature biological aging</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-indigo-50 dark:bg-indigo-950/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/30">
                            <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-300 mb-4 flex items-center gap-2">
                                <Clock className="w-6 h-6" /> How to Pay Back Your Sleep Debt
                            </h3>
                            <p className="mb-4">You can't pay back a huge 15-hour sleep debt by sleeping 23 hours in one day. Your body doesn't work like a bank account. Recovery must be structured:</p>
                            <ul className="space-y-3">
                                <li className="flex gap-2"><strong className="text-indigo-600 dark:text-indigo-400">1. Take Naps:</strong> A 20-minute power nap in the afternoon can safely repay acute daily debt.</li>
                                <li className="flex gap-2"><strong className="text-indigo-600 dark:text-indigo-400">2. Sleep In (Slightly):</strong> On weekends, allow yourself an extra 1-2 hours of sleep, but don't overdo it or you'll ruin your circadian rhythm.</li>
                                <li className="flex gap-2"><strong className="text-indigo-600 dark:text-indigo-400">3. Go to Bed Earlier:</strong> Incrementally go to bed 15-30 minutes earlier over the course of a week to slowly chip away at the debt.</li>
                            </ul>
                        </div>

                        {/* FAQs Section */}
                        <div className="space-y-6 pt-8 border-t border-slate-200 dark:border-slate-800">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                <HelpCircle className="w-6 h-6 text-indigo-500" /> Frequently Asked Questions
                            </h3>
                            <div className="grid md:grid-cols-1 gap-6">
                                {sleepFaqs.map((faq, idx) => (
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
