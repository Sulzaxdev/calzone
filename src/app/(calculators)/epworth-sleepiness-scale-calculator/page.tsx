import { EpworthSleepinessForm } from "./calculator";
import { Metadata } from "next";
import {
    Moon,
    Bed,
    Stethoscope,
    CheckCircle2,
    Info,
    TrendingUp,
    Brain,
    Zap,
    HelpCircle,
    AlertCircle
} from "lucide-react";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata: Metadata = {
    title: "Epworth Sleepiness Scale Calculator UK | Online ESS Screening",
    description: "Free Epworth Sleepiness Scale (ESS) Calculator. Test your daytime sleepiness level using the standardized 8-question clinical tool. Screen for Sleep Apnoea and Insomnia.",
    keywords: ["Epworth Sleepiness Scale", "ESS Calculator", "Sleep Apnoea Screening", "Daytime Sleepiness Test", "Sleep Disorder Test UK", "Sleep Hygiene Tips"],
};

export default function EpworthSleepinessPage() {
    const faqs = [
        {
            question: "What is a 'normal' score on the Epworth Sleepiness Scale?",
            answer: "A score of 0 to 10 is generally considered within the normal range for adults. However, if you feel consistently tired despite a normal score, you should still investigate your sleep quality with a professional."
        },
        {
            question: "Can this tool diagnose Obstructive Sleep Apnoea (OSA)?",
            answer: "No. While a high score (11 or above) is a strong indicator of daytime sleepiness often caused by OSA, a definitive diagnosis requires a clinical 'Sleep Study' (Polysomnography) ordered by a doctor."
        },
        {
            question: "Why am I so sleepy despite sleeping 8 hours?",
            answer: "Sleep *duration* is only half the equation. Sleep *quality* is equally important. Conditions like Sleep Apnoea, Restless Leg Syndrome, or environmental factors (light/noise) can prevent you from entering deep REM cycles."
        },
        {
            question: "Is daytime sleepiness the same as fatigue?",
            answer: "No. Sleepiness is the physical urge or tendency to fall asleep. Fatigue is a more general feeling of lack of energy or exhaustion, which can be caused by stress, depression, or underlying medical conditions like anaemia."
        },
        {
            question: "What should I do if my score is high?",
            answer: "If you score 11 or higher, you should make an appointment with your GP. Print or screenshot your result to show them. They may refer you to a sleep clinic for further evaluation."
        }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 lg:py-20">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold text-sm mb-6 border border-indigo-100 dark:border-indigo-800 animate-fade-in">
                    <Moon className="w-4 h-4" />
                    Sleep Medicine Suite
                </div>
                <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                    Epworth Sleepiness <span className="text-primary italic">Scale</span>
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    The global gold-standard for measuring daytime sleepiness. Use this clinical validated tool to assess if your tiredness indicates a deeper sleep disorder.
                </p>
            </div>

            {/* Main Calculator Form */}
            <div className="mb-20">
                <EpworthSleepinessForm />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                <div className="space-y-6">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-3">
                        <Stethoscope className="w-8 h-8 text-primary" />
                        Clinical Significance
                    </h2>
                    <div className="prose prose-slate dark:prose-invert max-w-none space-y-4">
                        <p>
                            Developed by Dr. Murray Johns in 1990, the ESS is used worldwide to differentiate between simple tiredness and **Excessive Daytime Sleepiness (EDS)**.
                        </p>
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                            <h3 className="text-lg font-black mb-4 uppercase tracking-widest text-slate-400">Score Interpretation</h3>
                            <ul className="space-y-4 text-sm font-medium">
                                <li className="flex items-center gap-3">
                                    <div className="w-12 text-center py-1 rounded bg-green-100 dark:bg-green-900/50 text-green-700 font-black">0-10</div>
                                    <span className="text-slate-600 dark:text-slate-400">Normal Range</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-12 text-center py-1 rounded bg-orange-100 dark:bg-orange-900/50 text-orange-700 font-black">11-12</div>
                                    <span className="text-slate-600 dark:text-slate-400">Mild Excessive Sleepiness</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-12 text-center py-1 rounded bg-red-100 dark:bg-red-900/50 text-red-700 font-black">13-15</div>
                                    <span className="text-slate-600 dark:text-slate-400">Moderate Excessive Sleepiness</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-12 text-center py-1 rounded bg-red-600 text-white font-black">16+</div>
                                    <span className="text-slate-600 dark:text-slate-400">Severe Excessive Sleepiness</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="bg-indigo-500/5 dark:bg-indigo-500/10 p-10 rounded-[3.5rem] border border-indigo-500/10 relative overflow-hidden h-full flex flex-col justify-center shadow-xl shadow-indigo-500/5">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl opacity-50"></div>
                    <h2 className="text-2xl font-black mb-8 flex items-center gap-3 text-indigo-600 dark:text-indigo-400 tracking-tight">
                        <Zap className="w-7 h-7" />
                        Why it Matters
                    </h2>
                    <ul className="space-y-6">
                        <li className="flex gap-4">
                            <div className="mt-1 p-1 bg-green-100 dark:bg-green-900/40 rounded-full"><CheckCircle2 className="w-5 h-5 text-green-600" /></div>
                            <p className="text-slate-700 dark:text-slate-300 font-medium leading-snug"><strong>Safety First:</strong> High sleepiness significantly increases the risk of accidents while driving or operating machinery.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="mt-1 p-1 bg-green-100 dark:bg-green-900/40 rounded-full"><CheckCircle2 className="w-5 h-5 text-green-600" /></div>
                            <p className="text-slate-700 dark:text-slate-300 font-medium leading-snug"><strong>Work Performance:</strong> EDS impacts concentration, memory, and cognitive decision-making during the day.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="mt-1 p-1 bg-green-100 dark:bg-green-900/40 rounded-full"><CheckCircle2 className="w-5 h-5 text-green-600" /></div>
                            <p className="text-slate-700 dark:text-slate-300 font-medium leading-snug"><strong>Health Complications:</strong> Chronic sleep disorders are linked to heart disease, weight gain, and depression.</p>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Sleep Hygiene Tips */}
            <section className="bg-slate-900 text-white rounded-[4rem] p-12 lg:p-20 mb-20 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                    <Moon className="w-60 h-60" />
                </div>
                <h2 className="text-3xl font-black mb-12 text-center uppercase tracking-widest text-primary">Optimize Your Sleep Hygiene</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-xl font-bold">
                            <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/20">1</div>
                            Stick to a Schedule
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed pl-14">Go to bed and wake up at the same time every day, even on weekends. This stabilizes your circadian rhythm.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-xl font-bold">
                            <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/20">2</div>
                            Ditch the Screen
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed pl-14">Blue light from phones and laptops suppresses melatonin production. Stop using screens at least 60 minutes before bed.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-xl font-bold">
                            <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/20">3</div>
                            Cool and Dark
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed pl-14">The ideal sleep temperature is around 18°C. Ensure your room is completely dark to promote deep cycles.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-xl font-bold">
                            <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/20">4</div>
                            Watch Your Intake
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed pl-14">Avoid caffeine after 2 PM and alcohol before bed. While alcohol can help you fall asleep, it destroys sleep quality.</p>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-20">
                <h2 className="text-3xl font-black mb-12 text-center flex items-center justify-center gap-3">
                    <HelpCircle className="w-8 h-8 text-primary" />
                    Frequently Asked Questions
                </h2>
                <FAQAccordion faqs={faqs} />
            </section>

            {/* Warning */}
            <div className="p-8 rounded-[2.5rem] bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 flex gap-6 items-center">
                <AlertCircle className="w-12 h-12 text-amber-600 shrink-0" />
                <p className="text-sm text-amber-900 dark:text-amber-400 font-bold leading-relaxed">
                    If you frequently fall asleep while driving or in the middle of a conversation, please do not wait for a calculator result. Seek medical attention immediately.
                </p>
            </div>
        </div>
    );
}
