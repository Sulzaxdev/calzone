import { WaterFastCalculatorForm } from "./calculator";
import { Metadata } from "next";
import {
    Droplets,
    Scale,
    AlertTriangle,
    ShieldAlert,
    CheckCircle2,
    Info,
    TrendingDown,
    Flame,
    Zap,
    HelpCircle,
    Thermometer,
    Stethoscope
} from "lucide-react";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata: Metadata = {
    title: "Water Fasting Weight Loss Calculator | Estimate Fat vs Water Loss",
    description: "Free Water Fasting Calculator. Estimate how much fat and water weight you may lose during a fast. Includes safety guides, electrolyte advice, and refeeding protocols.",
    keywords: ["Water Fasting Calculator", "Water Fast Weight Loss", "Fat Loss vs Water Weight", "Fasting Safety UK", "Electrolytes for Fasting", "Refeeding Protocol"],
};

export default function WaterFastCalculatorPage() {
    const faqs = [
        {
            question: "How much weight will I lose on a 3-day water fast?",
            answer: "Most people lose between 1.5kg and 3kg in 3 days. However, a significant portion of this is water weight stored with glycogen. Expect only about 0.5kg to 0.7kg of actual fat loss during a 72-hour fast."
        },
        {
            question: "Are electrolytes necessary during a water fast?",
            answer: "Absolutely. For any fast longer than 24-48 hours, you must supplement with sodium, potassium, and magnesium. Lack of electrolytes can lead to headaches, dizziness, heart palpitations, and muscle cramps."
        },
        {
            question: "Will I lose muscle during a water fast?",
            answer: "Short-term fasting (1-5 days) is generally muscle-sparing due to increased growth hormone levels. However, weight training and adequate protein intake before and after the fast are recommended to maintain muscle mass."
        },
        {
            question: "How should I break a water fast safely?",
            answer: "The longer the fast, the more careful the 'refeeding' must be. Start with small, easily digestible foods like bone broth, steamed vegetables, or diluted fruit juices. Avoid large meals or heavy carbs immediately after fasting to prevent 'Refeeding Syndrome'."
        },
        {
            question: "Can I exercise during a water fast?",
            answer: "Light activity like walking or gentle yoga is fine. Avoid high-intensity lifting or sprinting, as your glycogen stores are depleted and your blood pressure may drop during sudden exertion."
        }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 lg:py-20">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-sm mb-6 border border-blue-100 dark:border-blue-800 animate-fade-in">
                    <Droplets className="w-4 h-4" />
                    Metabolic Reset Tool
                </div>
                <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                    Water Fast <span className="text-primary italic">Estimator</span>
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Estimate your body's transition into ketosis and autophagy. Our tool models the weight loss curve, distinguishing between glycogen-bound water and long-term fat oxidation.
                </p>
            </div>

            {/* Main Calculator Form */}
            <div className="mb-20">
                <WaterFastCalculatorForm />
            </div>

            {/* Safety Alert (Prominent) */}
            <div className="p-10 rounded-[3rem] bg-linear-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/10 border border-red-200 dark:border-red-900/50 mb-20 shadow-xl shadow-red-500/5">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="p-4 bg-red-600 text-white rounded-[2rem] shadow-lg shadow-red-600/20">
                        <ShieldAlert className="w-12 h-12" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-red-900 dark:text-red-400 mb-4 uppercase tracking-tight">Crucial Safety Protocol</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h4 className="font-bold flex items-center gap-2 text-red-700 dark:text-red-300">
                                    <Thermometer className="w-5 h-5" /> Warnings Signs
                                </h4>
                                <ul className="text-sm text-red-800 dark:text-red-300/80 space-y-2 list-disc pl-5">
                                    <li>Extreme pulse fluctuations (heart palpitations)</li>
                                    <li>Severe, persistent dizziness or fainting</li>
                                    <li>Chest pain or shortness of breath</li>
                                    <li>Mental confusion or severe lethargy</li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h4 className="font-bold flex items-center gap-2 text-red-700 dark:text-red-300">
                                    <Stethoscope className="w-5 h-5" /> Who Should NOT Fast?
                                </h4>
                                <ul className="text-sm text-red-800 dark:text-red-300/80 space-y-2 list-disc pl-5">
                                    <li>Individuals with eating disorders</li>
                                    <li>Pregnant or breastfeeding women</li>
                                    <li>Anyone under 18 or over 70</li>
                                    <li>People with Type 1 Diabetes or Kidney issues</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                <div className="space-y-6">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-3">
                        <Flame className="w-8 h-8 text-primary" />
                        Metabolic Phases
                    </h2>
                    <div className="prose prose-slate dark:prose-invert max-w-none space-y-4">
                        <p>
                            When you stop consuming calories, your body undergoes a predictable hormonal shift. Understanding these phases helps manage expectations and maintain safety.
                        </p>
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <h3 className="text-lg font-bold mb-4">Weight Loss Timeline</h3>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="w-16 h-10 bg-blue-100 dark:bg-blue-900/50 rounded flex items-center justify-center font-bold text-blue-600">D1-2</div>
                                    <p className="text-sm"><strong>Glycogen Depletion:</strong> High weight loss (mostly water). Insulin drops. Hunger peaks.</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-16 h-10 bg-orange-100 dark:bg-orange-950/50 rounded flex items-center justify-center font-bold text-orange-600">D3-5</div>
                                    <p className="text-sm"><strong>Ketosis transition:</strong> Fat burning becomes primary. Hunger usually fades. Autophagy increases.</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-16 h-10 bg-green-100 dark:bg-green-950/50 rounded flex items-center justify-center font-bold text-green-600">D7+</div>
                                    <p className="text-sm"><strong>Deep Autophagy:</strong> Maximum cellular repair. Requires strict medical supervision.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-500/5 dark:bg-blue-500/10 p-8 rounded-[3rem] border border-blue-500/10 relative overflow-hidden h-full flex flex-col justify-center">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl opacity-50"></div>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-blue-600 dark:text-blue-400 tracking-tight">
                        <Droplets className="w-6 h-6" />
                        The Electrolyte Stack
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 italic">Essential for any fast over 48 hours to prevent "Fasting Flu" and heart stress:</p>
                    <ul className="space-y-4">
                        <li className="flex gap-3 items-center">
                            <div className="p-1 px-2 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-xs">Na</div>
                            <p className="text-slate-700 dark:text-slate-300"><strong>Sodium:</strong> 3-5g per day (Pink Himalayan or Sea Salt).</p>
                        </li>
                        <li className="flex gap-3 items-center">
                            <div className="p-1 px-2 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-xs">K</div>
                            <p className="text-slate-700 dark:text-slate-300"><strong>Potassium:</strong> 2-3g per day (No-Salt or Potassium Chloride).</p>
                        </li>
                        <li className="flex gap-3 items-center">
                            <div className="p-1 px-2 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-xs">Mg</div>
                            <p className="text-slate-700 dark:text-slate-300"><strong>Magnesium:</strong> 300-400mg before bed (Magnesium Glycinate).</p>
                        </li>
                    </ul>
                </div>
            </div>

            {/* FAQ Section */}
            <section className="mb-20">
                <h2 className="text-3xl font-black mb-12 text-center flex items-center justify-center gap-3">
                    <HelpCircle className="w-8 h-8 text-primary" />
                    Common Questions
                </h2>
                <FAQAccordion faqs={faqs} />
            </section>

            {/* Trust Quote */}
            <div className="p-12 rounded-[3.5rem] bg-slate-100 dark:bg-slate-900 text-center relative overflow-hidden border border-slate-200 dark:border-slate-800">
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
                <p className="text-2xl font-serif italic mb-6 text-slate-800 dark:text-slate-200 leading-relaxed max-w-2xl mx-auto">
                    "Fasting is not just about weight loss; it is about metabolic flexibility—teaching your body how to switch from sugar-burning to fat-burning."
                </p>
                <p className="font-bold text-primary uppercase tracking-widest text-sm">— Calzone Health Methodology</p>
            </div>

            {/* Mini Disclaimer */}
            <div className="mt-12 text-center">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                    ESTIMATIONS ONLY • ALWAYS CONSULT A DOCTOR • NOT FOR MEDICAL ADVICE
                </p>
            </div>
        </div>
    );
}
