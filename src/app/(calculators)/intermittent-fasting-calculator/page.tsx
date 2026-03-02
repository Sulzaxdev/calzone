import { IntermittentFastingForm } from "./calculator";
import { Metadata } from "next";
import {
    Clock,
    Utensils,
    Moon,
    Apple,
    CheckCircle2,
    Info,
    TrendingUp,
    Brain,
    Zap,
    HelpCircle
} from "lucide-react";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata: Metadata = {
    title: "Intermittent Fasting Calculator UK | Plan 16:8, OMAD & 20:4 Schedules",
    description: "Free Intermittent Fasting Calculator (UK). Plan your 16:8, 18:6, or OMAD schedules. Calculate your eating and fasting windows for weight loss and metabolic health.",
    keywords: ["Intermittent Fasting Calculator", "16:8 Fasting Schedule", "OMAD Calculator", "Fasting Window Planner", "Weight Loss Fasting", "Metabolic Health UK"],
};

export default function IntermittentFastingPage() {
    const faqs = [
        {
            question: "Can I drink coffee or tea during the fasting window?",
            answer: "Yes, black coffee, plain tea, and water are allowed and will not break your fast. Avoid adding sugar, milk, or cream, as these contain calories that spike insulin and disrupt the fasting state."
        },
        {
            question: "What is the best protocol for beginners?",
            answer: "The **16:8 protocol** is the most popular starting point. It involves fasting for 16 hours and eating during an 8-hour window (e.g., 12 PM to 8 PM). It is generally easy to maintain and fits most social schedules."
        },
        {
            question: "Does intermittent fasting help with weight loss?",
            answer: "Intermittent fasting helps weight loss primarily by reducing a person's overall calorie intake and by lowering insulin levels, which makes stored body fat more accessible for energy."
        },
        {
            question: "Should I work out while fasting?",
            answer: "Exercising in a fasted state can accelerate fat burning, but it may take 2-4 weeks for your body to adapt. Beginners should start with low-intensity cardio and monitor how they feel."
        },
        {
            question: "What happens during a 16-hour fast?",
            answer: "Around hour 12, insulin levels drop significantly. By hour 16, your body increases fat oxidation and begins mild autophagy—a process where cells clear out damaged components."
        }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 lg:py-20">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-bold text-sm mb-6 border border-orange-100 dark:border-orange-800 animate-fade-in">
                    <Clock className="w-4 h-4" />
                    Metabolic Timing Tool
                </div>
                <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                    Intermittent Fasting <span className="text-primary italic">Calculator</span>
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Unlock the power of metabolic flexibility. Our FastPlan™ tool helps you schedule your eating and fasting windows with precision, backed by chronobiology research.
                </p>
            </div>

            {/* Main Calculator Form */}
            <div className="mb-20">
                <IntermittentFastingForm />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                        <Brain className="w-8 h-8 text-primary" />
                        The Fasting Spectrum
                    </h2>
                    <div className="prose prose-slate dark:prose-invert max-w-none space-y-4">
                        <p>
                            Intermittent Fasting (IF) is not a diet, but an eating pattern. It focuses on *when* you eat rather than *what* you eat. By cycling between periods of eating and fasting, you give your digestive system a break and trigger metabolic switches.
                        </p>
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <h3 className="text-lg font-bold mb-2">Key Metabolic Milestones</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex gap-2"><strong className="text-primary">4-8 Hours:</strong> Blood sugar drops, insulin decreases.</li>
                                <li className="flex gap-2"><strong className="text-primary">12 Hours:</strong> Fat burning (ketosis) begins to ramp up.</li>
                                <li className="flex gap-2"><strong className="text-primary">16+ Hours:</strong> Autophagy (cellular cleanup) initiates.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="bg-orange-500/5 dark:bg-orange-500/10 p-8 rounded-3xl border border-orange-500/10 relative overflow-hidden h-full flex flex-col justify-center">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl opacity-50"></div>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-orange-600 dark:text-orange-400">
                        <Zap className="w-6 h-6" />
                        Core Benefits
                    </h2>
                    <ul className="space-y-4">
                        <li className="flex gap-3">
                            <div className="mt-1"><CheckCircle2 className="w-5 h-5 text-orange-500" /></div>
                            <p className="text-slate-700 dark:text-slate-300"><strong>Insulin Sensitivity:</strong> Lower insulin levels make body fat more accessible.</p>
                        </li>
                        <li className="flex gap-3">
                            <div className="mt-1"><CheckCircle2 className="w-5 h-5 text-orange-500" /></div>
                            <p className="text-slate-700 dark:text-slate-300"><strong>Cellular Repair:</strong> Fasting triggers autophagy, removing waste from cells.</p>
                        </li>
                        <li className="flex gap-3">
                            <div className="mt-1"><CheckCircle2 className="w-5 h-5 text-orange-500" /></div>
                            <p className="text-slate-700 dark:text-slate-300"><strong>Brain Health:</strong> May increase BDNF, a hormone that aids new nerve cell growth.</p>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Protocols Guide */}
            <section className="bg-slate-50 dark:bg-slate-900/40 rounded-[3rem] p-10 lg:p-16 mb-20 border border-slate-100 dark:border-slate-800">
                <h2 className="text-3xl font-black text-center mb-12 uppercase tracking-tight">Standard Protocols Comparison</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                        <div className="text-primary font-black text-2xl mb-2">16:8</div>
                        <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-slate-400">The Gold Standard</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Skip breakfast or late-night snacks. Easy to socialise and maintain long-term.</p>
                    </div>
                    <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm ring-2 ring-primary/20">
                        <div className="text-primary font-black text-2xl mb-2">OMAD</div>
                        <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-slate-400">One Meal A Day</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Highly efficient for weight loss but requires discipline. Usually a 1-hour eating window.</p>
                    </div>
                    <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                        <div className="text-primary font-black text-2xl mb-2">5:2</div>
                        <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-slate-400">Weekly Cycle</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Eat normally for 5 days, restrict to 500-600 calories for 2 non-consecutive days.</p>
                    </div>
                </div>

                <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-950/20 rounded-2xl border border-blue-200 dark:border-blue-900/50 flex gap-4">
                    <Info className="w-6 h-6 text-blue-600 shrink-0" />
                    <p className="text-sm text-blue-800 dark:text-blue-400 font-medium">
                        <strong>Pro Tip:</strong> Start with a 12:12 window and gradually increase the fasting duration by 1 hour every few days to avoid intense hunger pangs and 'keto flu' symptoms.
                    </p>
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

            {/* Food Selection */}
            <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                    <h2 className="text-3xl font-black mb-6">What to eat?</h2>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                        Intermittent fasting isn't an excuse to binge on junk food. To see the best results, focus on nutrient-dense foods during your eating window:
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                            <Apple className="w-5 h-5 text-green-500" /> High-quality proteins (Chicken, Fish, Tofu)
                        </li>
                        <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                            <Apple className="w-5 h-5 text-green-500" /> Healthy fats (Avocado, Nuts, Olive Oil)
                        </li>
                        <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                            <Apple className="w-5 h-5 text-green-500" /> Complex carbohydrates (Quinoa, Sweet Potatoes)
                        </li>
                    </ul>
                </div>
                <div className="order-1 md:order-2 bg-slate-100 dark:bg-slate-800 aspect-square rounded-[3rem] flex items-center justify-center p-12 italic border border-slate-200 dark:border-slate-700 text-center text-slate-400">
                    [Premium Illustration: Balanced Meal Visualization]
                </div>
            </section>

            {/* Alert */}
            <div className="p-8 rounded-[3rem] bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50 text-center">
                <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2 uppercase tracking-widest">Medical Disclaimer</h3>
                <p className="text-sm text-red-600 dark:text-red-300/80 leading-relaxed max-w-2xl mx-auto">
                    Intermittent fasting is not suitable for everyone, including those who are pregnant, breastfeeding, have a history of eating disorders, or type 1 diabetics. Always consult your GP or a qualified nutritionist before changing your eating patterns.
                </p>
            </div>
        </div>
    );
}
