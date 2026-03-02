import { Metadata } from "next";
import { VisceralFatCalculatorForm } from "./calculator";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import {
    AlertTriangle,
    Heart,
    Zap,
    Scale,
    Activity,
    Info,
    Dumbbell,
    Utensils,
    CheckCircle2
} from "lucide-react";

export const metadata: Metadata = {
    title: "Visceral Fat Calculator | Check Dangerous Belly Fat Level Online",
    description: "Estimate your visceral fat level (VFL) with our professional calculator. Understand metabolic risk, heart disease probability, and how to reduce hidden abdominal fat.",
    keywords: "Visceral Fat Calculator Online, Check Belly Fat Level, Dangerous Belly Fat Test, Abdominal Fat Risk Calculator, Central Obesity Calculator, Metabolic Risk Test",
};

export default function VisceralFatCalculatorPage() {
    return (
        <div className="container py-10 space-y-12">
            {/* Hero Section */}
            <section className="text-center space-y-4 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 text-xs font-bold uppercase tracking-wider mb-2">
                    <AlertTriangle className="w-3 h-3" /> Metabolic Health Tool
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
                    Visceral Fat <span className="text-rose-500">Calculator</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed transition-colors">
                    Visceral fat is the "hidden" fat stored deep inside your belly, wrapped around your liver, pancreas, and intestines. Unlike the fat you can pinch (subcutaneous), visceral fat is metabolically active and directly linked to serious health risks.
                </p>
            </section>

            {/* Calculator Component */}
            <VisceralFatCalculatorForm />

            {/* Educational Content Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-10">
                    <section className="space-y-6">
                        <h2 className="text-3xl font-bold flex items-center gap-3">
                            <Activity className="text-rose-500" /> Why Visceral Fat is Dangerous
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { title: "Insulin Resistance", desc: "Releases inflammatory cytokines that interfere with insulin, leading to Type 2 Diabetes.", icon: Zap },
                                { title: "Heart Disease", desc: "Directly contributes to plaque buildup in arteries and chronic high blood pressure.", icon: Heart },
                                { title: "Metabolic Syndrome", desc: "A cluster of conditions including high cholesterol and systemic inflammation.", icon: Scale },
                                { title: "Fatty Liver", desc: "Excess fat can infiltrate the liver, leading to non-alcoholic fatty liver disease (NAFLD).", icon: Activity },
                            ].map((risk, i) => (
                                <div key={i} className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
                                    <risk.icon className="w-6 h-6 text-rose-500 mb-2" />
                                    <h3 className="font-bold">{risk.title}</h3>
                                    <p className="text-sm text-muted-foreground">{risk.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-rose-50 dark:bg-rose-950/20 p-8 rounded-3xl border border-rose-100 dark:border-rose-900/50 space-y-6">
                        <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100">The 4-Step Fat Reduction Plan</h2>
                        <div className="space-y-4">
                            {[
                                { step: "1", title: "Prioritize HIIT & Strength", desc: "High-Intensity Interval Training is proven to burn visceral fat faster than steady-state cardio. Building muscle boosts your resting metabolic rate.", icon: Dumbbell },
                                { step: "2", title: "Eliminate Liquid Sugars", desc: "Fructose (found in soda and juices) is a primary driver of visceral fat accumulation. Replace with water or green tea.", icon: Utensils },
                                { step: "3", title: "Focus on Fiber", desc: "Soluble fiber helps slow down digestion and reduces the amount of fat your body absorbs around the organs.", icon: CheckCircle2 },
                                { step: "4", title: "Manage Cortisol", desc: "Chronic stress releases cortisol, which signals the body to store fat in the abdominal cavity. Aim for 7-9 hours of quality sleep.", icon: Activity },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center font-black shrink-0">
                                        {item.step}
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-rose-900 dark:text-rose-100">{item.title}</h4>
                                        <p className="text-sm text-rose-800/80 dark:text-rose-200/80">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <aside className="space-y-8">
                    <div className="p-6 bg-slate-900 text-white rounded-3xl space-y-4 shadow-xl">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <Info className="text-blue-400" /> Risk Guidelines
                        </h3>
                        <div className="space-y-4 text-sm">
                            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                                <p className="font-bold text-blue-400 mb-1">Waist Circumference</p>
                                <p>Men: &gt; 102cm (40 in) = High Risk</p>
                                <p>Women: &gt; 88cm (35 in) = High Risk</p>
                            </div>
                            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                                <p className="font-bold text-emerald-400 mb-1">Waist-to-Height Ratio</p>
                                <p>Target: &lt; 0.50</p>
                                <p>Keep your waist less than half your height for optimal longevity.</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl space-y-4">
                        <h3 className="font-bold italic">Medical Disclaimer</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            This calculator provides an anthropometric estimation based on verified regression models (BMI/Waist correlation). However, it cannot replace the accuracy of a DEXA scan or MRI. If your results are in the "High" or "Very High" range, we strongly recommend consulting a physician for a comprehensive metabolic panel.
                        </p>
                    </div>
                </aside>
            </div>

            {/* FAQs */}
            <section className="max-w-4xl mx-auto py-10">
                <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
                <FAQAccordion faqs={[
                    {
                        question: "What is a healthy visceral fat level?",
                        answer: "On a standard VFL scale of 1 to 20, a healthy level is typically between 1 and 9. Levels from 10 to 13 are considered moderate or 'borderline,' while levels 14 and above indicate a high health risk."
                    },
                    {
                        question: "Can I have visceral fat if I am thin?",
                        answer: "Yes. This is often called 'TOFI' (Thin Outside, Fat Inside). Even if your BMI is normal, a high waist-to-height ratio can indicate that you are storing dangerous fat around your internal organs due to poor diet or lack of exercise."
                    },
                    {
                        question: "How long does it take to lose visceral fat?",
                        answer: "The good news is that visceral fat is usually the first to go when you start a healthy lifestyle. Unlike subcutaneous fat, it responds quickly to exercise (especially HIIT) and sugar reduction. Significant reductions can often be seen within 4–12 weeks."
                    },
                    {
                        question: "How does the calculator estimate levels without a scan?",
                        answer: "Our calculator uses anthropometric regression. Research shows that for most people, the combination of Age, BMI, and Waist-to-Height Ratio (WHtR) provides a strong statistical correlation to direct measurements from DEXA scans."
                    }
                ]} />
            </section>
        </div>
    );
}
