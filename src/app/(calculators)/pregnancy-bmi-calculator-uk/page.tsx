import { Baby, Scale, Stethoscope } from "lucide-react";
import { PregnancyBmiCalculator } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "Pregnancy BMI & Weight Gain Calculator UK",
    description: "Calculate your pre-pregnancy BMI and discover the recommended healthy weight gain for your pregnancy based on UK and global health guidelines.",
};

export default function PregnancyBmiPage() {
    const faqs = [
        {
            question: "Why does my pre-pregnancy BMI matter?",
            answer: "Your pre-pregnancy Body Mass Index (BMI) sets the baseline for your recommended weight gain during pregnancy. Healthcare professionals use it to determine the healthiest target weight gain to support your baby's development while minimizing complications like gestational diabetes or preeclampsia."
        },
        {
            question: "How much weight should I gain?",
            answer: "According to general guidelines (often aligned with IOM/NICE): If you were underweight, the target is 12.5-18kg. If normal weight, 11.5-16kg. If overweight, 7-11.5kg. If obese, 5-9kg. Always follow your specific midwife or doctor's advice."
        },
        {
            question: "When should I start gaining weight?",
            answer: "Weight gain is usually minimal in the first trimester (often 1-2kg total). The majority of weight is steadily gained during the second and third trimesters as the baby, placenta, and your blood volume grow."
        },
        {
            question: "Should I diet during pregnancy to lose weight?",
            answer: "No. The NHS strongly advises against dieting to lose weight during pregnancy, as it can deprive your baby of essential nutrients. Focus on a healthy, balanced diet and safe, light exercise instead of weight loss."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <CalculatorSchema
                title="Pregnancy BMI & Weight Gain Calculator UK"
                description="Calculate your pre-pregnancy BMI and determine your recommended healthy weight gain targets for a safe pregnancy."
                slug="/pregnancy-bmi-calculator-uk"
                faqs={faqs}
            />

            {/* Hero */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-sm font-semibold mb-6">
                        <Baby className="w-4 h-4" />
                        UK Maternity Health
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Pregnancy BMI Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Calculate your pre-pregnancy BMI to find out your medically recommended weight gain range for a healthy pregnancy, aligned with standard healthcare guidelines.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Calculator Component */}
                <div className="max-w-4xl mx-auto">
                    <PregnancyBmiCalculator />
                </div>

                {/* SEO Content */}
                <section className="mt-20 max-w-4xl mx-auto space-y-12">
                    <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <Scale className="w-8 h-8 text-pink-500" />
                            Understanding Weight Gain During Pregnancy
                        </h2>

                        <div className="space-y-8 text-slate-700 dark:text-slate-300">
                            <p className="text-lg leading-relaxed">
                                Gaining weight during pregnancy is a natural, necessary, and healthy process. It indicates that your baby is growing and your body is preparing for breastfeeding and childbirth. However, gaining too little or too much weight can pose health risks for both you and your infant.
                            </p>

                            <div className="bg-pink-50 dark:bg-pink-900/20 p-6 rounded-2xl border border-pink-100 dark:border-pink-900/40">
                                <h3 className="text-xl font-bold text-pink-900 dark:text-pink-200 mb-4 flex items-center gap-2">
                                    <Stethoscope className="w-6 h-6 text-pink-500" /> What Makes Up the Weight You Gain?
                                </h3>
                                <p className="mb-4 text-sm text-pink-800 dark:text-pink-300">
                                    The weight you gain isn't just "fat". It is distributed across several vital systems supporting your baby:
                                </p>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-pink-900/80 dark:text-pink-200/80 list-disc pl-5">
                                    <li><strong>The Baby:</strong> Typically 3 to 3.5 kg</li>
                                    <li><strong>Placenta:</strong> Around 0.7 kg</li>
                                    <li><strong>Amniotic Fluid:</strong> Around 0.8 kg</li>
                                    <li><strong>Breast Tissue:</strong> Around 1 kg</li>
                                    <li><strong>Blood Supply:</strong> Around 1.5 to 2 kg</li>
                                    <li><strong>Uterus Enlargement:</strong> Around 1 kg</li>
                                    <li><strong>Fat Stores:</strong> Around 3 to 4 kg (energy for breastfeeding)</li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">UK vs Global Guidelines</h3>
                                <p className="leading-relaxed">
                                    In the UK, the National Institute for Health and Care Excellence (NICE) does not officially provide rigid weight gain targets for all women, preferring midwives to offer personalized advice. However, UK health professionals commonly refer to the <strong>Institute of Medicine (IOM) guidelines</strong>, which are universally accepted standards for pregnancy weight gain based on a woman's Pre-Pregnancy BMI.
                                </p>
                                <p className="leading-relaxed">
                                    The calculator above utilizes these IOM targets, ensuring you have a clear, evidence-based benchmark to discuss with your midwife or GP.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Risks of Being Outside the Target</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                    <div className="bg-slate-100 dark:bg-slate-900/80 p-5 rounded-2xl">
                                        <h4 className="font-bold mb-2">Gaining Too Little</h4>
                                        <p className="text-sm">Inadequate weight gain increases the risk of premature birth or having a baby with a low birth weight. Low birth weight babies may experience difficulties with feeding, fighting off infections, and hitting developmental milestones.</p>
                                    </div>
                                    <div className="bg-slate-100 dark:bg-slate-900/80 p-5 rounded-2xl">
                                        <h4 className="font-bold mb-2">Gaining Too Much</h4>
                                        <p className="text-sm">Excessive weight gain increases the risk of gestational diabetes, high blood pressure (preeclampsia), and having a larger baby (macrosomia), which can complicate labor and increase the likelihood of a cesarean section.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <FAQAccordion faqs={faqs} title="Pregnancy Weight FAQs" />
                </section>
            </div>
        </div>
    );
}
