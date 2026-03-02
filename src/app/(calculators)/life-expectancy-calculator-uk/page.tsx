import { HeartPulse, Brain, Zap, Moon } from "lucide-react";
import { LifeExpectancyCalculatorForm } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "Life Expectancy Calculator UK | Biological Age & Longevity Test",
    description: "Calculate your biological age and estimate your life expectancy based on sleep, diet, exercise, and stress levels with our advanced UK longevity calculator.",
};

export default function LifeExpectancyPage() {
    const lifeFaqs = [
        {
            question: "What is the difference between biological age and chronological age?",
            answer: "Chronological age is strictly the number of years you have been alive. Biological age (or epigenetic age) is how old your cells and organs 'act'. Poor lifestyle choices accelerate cellular decay, making your biological age higher than your real age. Healthy choices can actually reverse this, making your body younger than your chronological age."
        },
        {
            question: "How much does smoking actually reduce life expectancy?",
            answer: "According to decades of clinical data, continuous heavy smoking reduces life expectancy by an average of 10 full years. However, quitting before age 40 can recover almost all of those lost years, proving that the body's repair mechanisms are incredibly resilient."
        },
        {
            question: "Can sleep deprivation really shorten my lifespan?",
            answer: "Yes. Chronic sleep deprivation (regularly sleeping less than 6 hours a night) prevents the brain's glymphatic system from clearing out neurotoxins. It heavily elevates cortisol levels, radically increasing the risk for stroke, Alzheimer's, and sudden heart attacks."
        },
        {
            question: "Is this calculator medically diagnostic?",
            answer: "No. This tool is an educational estimator based on broad population-level health data and actuarial averages. It highlights the massive impact of lifestyle choices on longevity but cannot account for specific genetic conditions or sudden illnesses."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <CalculatorSchema
                title="Life Expectancy Calculator UK | Biological Age & Longevity"
                description="Estimate your biological age and life expectancy using clinical data on sleep, exercise, smoking, and dietary habits."
                slug="/life-expectancy-calculator-uk"
                faqs={lifeFaqs}
            />

            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <LifeExpectancyCalculatorForm />

                {/* Massive Authority SEO Content Section */}
                <section className="mt-16 max-w-4xl mx-auto space-y-12">
                    <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-lg">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <HeartPulse className="w-8 h-8 text-rose-500" />
                            The Science of Biological Aging & Longevity
                        </h2>

                        <div className="space-y-10 text-slate-700 dark:text-slate-300">

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                    <Brain className="w-6 h-6 text-purple-500" /> Defining Life Expectancy
                                </h3>
                                <p className="text-lg leading-relaxed">
                                    Life expectancy isn't a fixed, genetic destiny. While your DNA provides a baseline, modern epigenetic science has proven that your daily habits act as switches—turning healthy genes on, and disease-causing genes off.
                                </p>
                                <p className="leading-relaxed">
                                    This calculator analyzes the heaviest hitters in all-cause mortality: <strong>cardiovascular strain (smoking, alcohol, stress), cellular repair capacity (sleep), and metabolic function (diet, exercise)</strong> to estimate your biological trajectory.
                                </p>
                            </div>

                            <div className="bg-rose-50 dark:bg-rose-950/30 p-6 rounded-2xl border border-rose-100 dark:border-rose-900/50">
                                <h3 className="text-xl font-bold text-rose-900 dark:text-rose-200 mb-4 flex items-center gap-2">
                                    <Zap className="w-6 h-6 text-rose-500" /> The Plasticity of Aging
                                </h3>
                                <p className="text-sm text-rose-800 dark:text-rose-300">
                                    The most crucial takeaway from longevity research is that aging is plastic—it can be sped up or slowed down. Even if you have engaged in poor habits for decades, stopping smoking, cutting out binge drinking, and introducing 30 minutes of daily Zone-2 cardio triggers immediate systemic repair mechanisms capable of reclaiming years of life.
                                </p>
                            </div>

                            {/* Core Pillars */}
                            <div className="space-y-4 pt-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6">The Four Pillars of Longevity</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-slate-100 dark:bg-slate-900/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                                        <h4 className="font-bold flex items-center gap-2 mb-2"><Moon className="w-4 h-4 text-indigo-500" /> 1. Deep Sleep</h4>
                                        <p className="text-sm">Sleep is the body's only period for deep neurological repair. Less than 6 hours chronically doubles stroke risk.</p>
                                    </div>
                                    <div className="bg-slate-100 dark:bg-slate-900/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                                        <h4 className="font-bold flex items-center gap-2 mb-2"><HeartPulse className="w-4 h-4 text-green-500" /> 2. Consistent Movement</h4>
                                        <p className="text-sm">150 minutes of aerobic exercise per week heavily fortifies heart muscle and maintains metabolic flexibility.</p>
                                    </div>
                                    <div className="bg-slate-100 dark:bg-slate-900/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                                        <h4 className="font-bold flex items-center gap-2 mb-2"><Brain className="w-4 h-4 text-orange-500" /> 3. Stress Management</h4>
                                        <p className="text-sm">Unchecked cortisol destroys tissue over time. Managing stress proactively prevents rapid cellular aging.</p>
                                    </div>
                                    <div className="bg-slate-100 dark:bg-slate-900/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                                        <h4 className="font-bold flex items-center gap-2 mb-2"><Zap className="w-4 h-4 text-yellow-500" /> 4. Nutrient Density</h4>
                                        <p className="text-sm">Eliminating ultra-processed foods prevents the systemic inflammation that drives almost all aging-related diseases.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Medical Disclaimer */}
                            <div className="bg-slate-100 dark:bg-slate-900 text-xs text-slate-500 p-4 rounded-lg italic mt-8 border border-slate-200 dark:border-slate-800">
                                Disclaimer: This Life Expectancy and Biological Age estimator is strictly for educational and self-reflection purposes. It utilizes generalized actuarial adjustments and cannot factor in personal genetics, family medical history, or sudden illness. It does not replace professional medical advice, checkups, or physician diagnoses.
                            </div>

                            {/* FAQs Section */}
                            <FAQAccordion faqs={lifeFaqs} title="Frequently Asked Questions (Longevity)" />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
