import { Activity, ShieldCheck, HeartPulse } from "lucide-react";
import { FrailtyCalculatorForm } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "Frailty Score Calculator UK | Assess Physical Decline & FRAIL Scale",
    description: "Calculate your clinical Frailty Score using the validated FRAIL scale. Assess physical decline, fatigue, and mobility risks with our advanced UK health calculator.",
};

export default function FrailtyPage() {
    const frailtyFaqs = [
        {
            question: "What is the FRAIL scale?",
            answer: "The FRAIL scale is a widely validated, 5-point clinical screening tool. It stands for Fatigue, Resistance, Ambulation, Illnesses, and Loss of weight. It's used by geriatricians globally to quickly identify individuals at risk of adverse health outcomes due to physical decline."
        },
        {
            question: "Is frailty a normal part of aging?",
            answer: "No. While age increases the risk of frailty, it is not an inevitable consequence of getting older. Many individuals remain robust into their 80s and 90s. Frailty is a specific clinical syndrome characterized by a loss of physiological reserve."
        },
        {
            question: "Can frailty be reversed?",
            answer: "Yes, especially in the 'Pre-frail' stage. Targeted interventions, primarily resistance training (strength exercises), increased protein intake, and medical review of prescriptions (to reduce side effects that cause fatigue) can significantly reverse frailty."
        },
        {
            question: "Why is unintentional weight loss dangerous?",
            answer: "Unintentional weight loss in older adults often indicates sarcopenia (rapid loss of muscle mass) or malabsorption. Losing muscle mass directly reduces strength, balance, and metabolic rate, accelerating the pathway to frailty and increasing fall risks."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <CalculatorSchema
                title="Frailty Score Calculator UK | Assess Physical Decline"
                description="Use the FRAIL scale to assess physical vulnerability, mobility decline, and future health risks."
                slug="/frailty-score-calculator-uk"
                faqs={frailtyFaqs}
            />

            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <FrailtyCalculatorForm />

                {/* Massive Authority SEO Content Section */}
                <section className="mt-16 max-w-4xl mx-auto space-y-12">
                    <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-lg">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <ShieldCheck className="w-8 h-8 text-indigo-500" />
                            Understanding The FRAIL Scale & Clinical Frailty
                        </h2>

                        <div className="space-y-10 text-slate-700 dark:text-slate-300">

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                    <Activity className="w-6 h-6 text-blue-500" /> What is Frailty?
                                </h3>
                                <p className="text-lg leading-relaxed">
                                    Frailty is a medical syndrome characterized by a sharp decline in physical reserve and function across multiple physiological systems. This decline reduces a person's ability to cope with everyday or acute stressors.
                                </p>
                                <p className="leading-relaxed">
                                    Unlike isolated diseases (like diabetes or arthritis), frailty is systemic. A minor stressor—like a mild infection or a minor fall—can trigger disproportionate, severe, and rapid deterioration in a frail individual.
                                </p>
                            </div>

                            <div className="bg-indigo-50 dark:bg-indigo-950/30 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/50">
                                <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-200 mb-4 flex items-center gap-2">
                                    <HeartPulse className="w-6 h-6 text-indigo-500" /> Why Screening Matters
                                </h3>
                                <p className="text-sm text-indigo-800 dark:text-indigo-300">
                                    Identifying frailty early (in the pre-frail stage) is critical because it is <strong>highly actionable and often reversible</strong>. Interventions like progressive resistance training, nutritional therapy (upping protein intake), and cognitive-behavioral support can shift an individual from 'pre-frail' back to 'robust'.
                                </p>
                            </div>

                            {/* Core Pillars */}
                            <div className="space-y-4 pt-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6">The 5 Components of the FRAIL Scale</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-slate-100 dark:bg-slate-900/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                                        <h4 className="font-bold flex items-center gap-2 mb-2">1. Fatigue</h4>
                                        <p className="text-sm">Feeling exhausted most of the time is a primary indicator of systemic decline and a lack of physiological energy reserves.</p>
                                    </div>
                                    <div className="bg-slate-100 dark:bg-slate-900/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                                        <h4 className="font-bold flex items-center gap-2 mb-2">2. Resistance</h4>
                                        <p className="text-sm">Difficulty climbing stairs highlights sarcopenia (muscle loss) in the crucial lower-body muscle groups.</p>
                                    </div>
                                    <div className="bg-slate-100 dark:bg-slate-900/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                                        <h4 className="font-bold flex items-center gap-2 mb-2">3. Ambulation</h4>
                                        <p className="text-sm">The inability to walk short distances (100m) unassisted indicates a severe loss of cardiovascular and musculoskeletal capacity.</p>
                                    </div>
                                    <div className="bg-slate-100 dark:bg-slate-900/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                                        <h4 className="font-bold flex items-center gap-2 mb-2">4. Illnesses</h4>
                                        <p className="text-sm">Having 5 or more chronic conditions (comorbidities) exponentially increases frailty risk due to polypharmacy and systemic strain.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Medical Disclaimer */}
                            <div className="bg-slate-100 dark:bg-slate-900 text-xs text-slate-500 p-4 rounded-lg italic mt-8 border border-slate-200 dark:border-slate-800">
                                Disclaimer: The FRAIL scale is a validated screening tool but is not a substitute for a comprehensive geriatric assessment. If you or a loved one score as Pre-frail or Frail, please consult a healthcare professional, physical therapist, or geriatrician to develop a safe intervention plan.
                            </div>

                            {/* FAQs Section */}
                            <FAQAccordion faqs={frailtyFaqs} title="Frequently Asked Questions" />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
