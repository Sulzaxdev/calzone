import Link from "next/link";
import { PregnancyBMIForm } from "./calculator";
import {
    Activity,
    Baby,
    ShieldAlert,
    Heart,
    ChevronRight,
    CheckCircle2,
    Info,
    HelpCircle,
    ArrowRight
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { allCalculators } from "@/lib/calculators";

export const metadata = {
    title: "Pregnancy BMI Calculator | Healthy Weight Gain Guide",
    description: "Calculate your pre-pregnancy BMI and discover the medically recommended weight gain range. Track your pregnancy journey with our scientific intelligence tools.",
};

export default function PregnancyBMIPage() {
    const relatedCalculators = allCalculators
        .filter(c => c.href !== "/pregnancy-bmi" && (c.name.toLowerCase().includes("bmi") || c.name.toLowerCase().includes("calorie") || c.name.toLowerCase().includes("weight")))
        .slice(0, 3);

    return (
        <div className="animate-in fade-in duration-700">
            {/* HERO & CALCULATOR SECTION (Handled by CalculatorCard inside PregnancyBMIForm) */}
            <section className="container mx-auto px-4 pb-12">
                <PregnancyBMIForm />
            </section>

            {/* CONTENT & INFORMATION SECTION */}
            <section className="container mx-auto px-4 py-16 max-w-5xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                                <span className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-xl">
                                    <Activity className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                                </span>
                                What is Pregnancy BMI?
                            </h2>
                            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed">
                                <p>
                                    Pregnancy BMI measures a woman's <strong>Body Mass Index before pregnancy</strong>. This vital health metric is used by healthcare providers to determine three critical factors for a healthy pregnancy:
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 list-none p-0">
                                    <li className="flex items-start gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                                        <span>Healthy pre-pregnancy weight range</span>
                                    </li>
                                    <li className="flex items-start gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                                        <span>Recommended weight gain targets</span>
                                    </li>
                                    <li className="flex items-start gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                                        <span>Risk level assessment for mother & baby</span>
                                    </li>
                                    <li className="flex items-start gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                                        <span>Nutrition and personalized health planning</span>
                                    </li>
                                </ul>
                                <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-400 text-amber-800 dark:text-amber-200 text-sm flex gap-3">
                                    <ShieldAlert className="w-5 h-5 shrink-0" />
                                    <p><strong>⚠️ Important Note:</strong> During pregnancy, your targets are set based on your <strong>pre-pregnancy weight</strong>, not your current weight as you progress through trimesters.</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                                <span className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                                    <Heart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </span>
                                Why Precision Matters?
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400">
                                Tracking your BMI category helps healthcare professionals manage risks associated with:
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                                {[
                                    "Gestational diabetes",
                                    "High blood pressure",
                                    "Preterm birth",
                                    "Cesarean delivery",
                                    "Low birth weight",
                                    "Macrosomia (Large baby)"
                                ].map((risk, i) => (
                                    <div key={i} className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                                        <p className="text-[11px] font-black uppercase text-slate-400 mb-1">Risk Factor</p>
                                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{risk}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* FAQ SECTION */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                                <HelpCircle className="w-6 h-6 text-primary" />
                                <h2 className="text-3xl font-extrabold tracking-tight">Pregnancy BMI FAQ</h2>
                            </div>
                            <Accordion type="single" collapsible className="w-full space-y-4">
                                <AccordionItem value="item-1" className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden px-4 sm:px-6">
                                    <AccordionTrigger className="text-left font-bold py-6 hover:no-underline hover:text-primary transition-colors">
                                        Is BMI accurate during pregnancy?
                                    </AccordionTrigger>
                                    <AccordionContent className="text-slate-600 dark:text-slate-400 pb-6">
                                        BMI is a useful screening tool for health guidelines, but it doesn't account for individual factors like bone density or muscle mass. It is most accurate when used to set initial weight gain targets based on your pre-pregnancy baseline.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2" className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden px-4 sm:px-6">
                                    <AccordionTrigger className="text-left font-bold py-6 hover:no-underline hover:text-primary transition-colors">
                                        Should I calculate BMI using current weight?
                                    </AccordionTrigger>
                                    <AccordionContent className="text-slate-600 dark:text-slate-400 pb-6">
                                        No. Standard BMI ranges are not designed for pregnant bodies. You should use the pre-pregnancy weight to determine your category, and then track your growth against the recommended gain for that category.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3" className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden px-4 sm:px-6">
                                    <AccordionTrigger className="text-left font-bold py-6 hover:no-underline hover:text-primary transition-colors">
                                        How much weight should I gain if I am carrying twins?
                                    </AccordionTrigger>
                                    <AccordionContent className="text-slate-600 dark:text-slate-400 pb-6">
                                        Weight gain targets for multiples (twins or triplets) are higher. This calculator focuses on singleton pregnancies. For multiples, a normal BMI (18.5–24.9) usually targets 17–25 kg of gain. Please consult your specialist.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>

                    {/* Sidebar / Medical Sidebar Column */}
                    <div className="space-y-8">
                        {/* MEDICAL DISCLAIMER */}
                        <div className="p-8 rounded-3xl bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 relative overflow-hidden group">
                            <div className="absolute -top-12 -left-12 opacity-5 translate-y-4 group-hover:translate-y-2 transition-transform duration-700">
                                <ShieldAlert className="w-32 h-32" />
                            </div>
                            <div className="relative z-10 space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400 text-[10px] font-black uppercase tracking-widest">
                                    <ShieldAlert className="w-3 h-3" />
                                    Medical Disclaimer
                                </div>
                                <h3 className="text-xl font-bold text-red-700 dark:text-red-400">Consult Your Doctor</h3>
                                <p className="text-red-600/80 dark:text-red-400/80 text-sm leading-relaxed">
                                    This calculator is for educational purposes only and does not replace professional medical advice. Always consult your healthcare provider or midwife for personalized health plans.
                                </p>
                            </div>
                        </div>

                        {/* RELATED CALCULATORS */}
                        <div className="p-8 rounded-3xl bg-slate-900 dark:bg-slate-900 border border-slate-800 text-white space-y-6">
                            <h3 className="text-xl font-bold border-b border-white/10 pb-4">Up Next</h3>
                            <div className="space-y-4">
                                {relatedCalculators.map((calc) => (
                                    <Link key={calc.name} href={calc.href} className="flex items-center justify-between group p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-primary/20 rounded-lg text-primary group-hover:scale-110 transition-transform">
                                                <Activity className="w-4 h-4" />
                                            </div>
                                            <span className="text-sm font-semibold">{calc.name}</span>
                                        </div>
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                    </Link>
                                ))}
                            </div>
                            <Button variant="outline" className="w-full border-white/20 hover:bg-white text-white hover:text-slate-900 font-bold py-6 rounded-2xl transition-all" asChild>
                                <Link href="/">Explore All Tools</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
