import { Flame, Info, Calculator, BookOpen } from "lucide-react";
import { HeartAgeCalculatorForm } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "Heart Age Calculator UK | Check Your Cardiovascular Risk",
    description: "Calculate your estimated heart age and determine your 10-year cardiovascular risk using the clinically validated Framingham Risk Score. Includes actionable health tips.",
};

export default function HeartAgePage() {
    const heartAgeFaqs = [
        {
            question: "What does 'Heart Age' mean?",
            answer: "Your heart age is an estimated calculation of your cardiovascular system's health compared to your chronological age. If your heart age is higher than your actual age, it means your current lifestyle and health metrics put you at a greater risk for a cardiovascular event (like a heart attack or stroke)."
        },
        {
            question: "How accurate is this calculator?",
            answer: "This calculator is built upon the Framingham Risk Score, one of the most widely used and clinically validated cardiovascular risk models in the world. However, it is an estimation tool for educational purposes and cannot replace a laboratory risk assessment performed by your GP."
        },
        {
            question: "Why does my Cholesterol matter so much?",
            answer: "High levels of LDL (bad cholesterol) and low levels of HDL (good cholesterol) lead to plaque buildup in your arteries over time (atherosclerosis). This dramatically increases the pressure your heart needs to exert, raising your risk of heart disease."
        },
        {
            question: "What is a 'moderate' or 'high' risk?",
            answer: "A 10-year risk percentage under 5% is low risk. 5% to 7.4% is borderline. 7.5% to 19.9% is intermediate (where doctors often strongly suggest lifestyle changes), and 20% or higher is considered High Risk, often requiring immediate medical intervention."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <CalculatorSchema
                title="Heart Age Calculator UK | Check Your Cardiovascular Risk"
                description="Calculate your estimated heart age and determine your 10-year cardiovascular risk using the clinically validated Framingham Risk Score."
                slug="/heart-age-calculator-uk"
                faqs={heartAgeFaqs}
            />

            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <HeartAgeCalculatorForm />

                {/* Authority SEO Content Section */}
                <section className="mt-16 max-w-4xl mx-auto space-y-12">
                    <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-lg">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <Flame className="w-8 h-8 text-rose-500" />
                            Understanding Cardiovascular Risk
                        </h2>

                        <div className="space-y-10 text-slate-700 dark:text-slate-300">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                    <Info className="w-6 h-6 text-blue-500" /> The Science of Heart Age
                                </h3>
                                <p className="text-lg leading-relaxed">
                                    The concept of "Heart Age" was pioneered by the <strong>Framingham Heart Study</strong>—a long-term cardiovascular cohort study initiated in 1948 by the National Heart, Lung, and Blood Institute.
                                </p>
                                <p className="leading-relaxed">
                                    Instead of just giving you a percentage that feels abstract, converting your cardiovascular risk into a "Heart Age" instantly reveals how your lifestyle choices are impacting your longevity. If you are 40 years old with a heart age of 52, your vascular system has aged an entire extra decade due to risk factors like smoking, hypertension, or high cholesterol.
                                </p>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                                    <Calculator className="w-6 h-6 text-slate-500" /> How It Works
                                </h3>
                                <p className="mb-4">Our calculator aggregates multiple scientifically validated physiological markers to determine your 10-year risk profile:</p>
                                <ul className="list-disc list-inside space-y-2 mb-4 text-slate-600 dark:text-slate-400">
                                    <li><strong>Lipid Profile:</strong> Total Cholesterol and HDL (High-Density Lipoprotein).</li>
                                    <li><strong>Vascular Pressure:</strong> Systolic blood pressure (the main driving force pushing blood through your arteries).</li>
                                    <li><strong>Metabolic Factors:</strong> Diabetes status heavily multiplies cardiovascular risk.</li>
                                    <li><strong>Lifestyle:</strong> Smoking instantly degrades arterial walls and is assigned the highest point penalty in the model.</li>
                                </ul>
                                <p>This risk percentage is then cross-referenced against the baseline risk of an ideal patient of your chronological age (non-smoker, normal blood pressure, optimal cholesterol, no diabetes). The disparity determines your Heart Age.</p>
                            </div>

                            {/* Data Sources & Methodology */}
                            <div className="space-y-4 pt-8 border-t border-slate-200 dark:border-slate-800">
                                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-indigo-500" /> Data Sources & Methodology
                                </h3>
                                <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-2">
                                    <li><strong>Framingham Heart Study:</strong> Original algorithms mapping systolic BP and cholesterol points to 10-year CVD events.</li>
                                    <li><strong>American Heart Association (AHA) & ACC:</strong> Risk categorization thresholds (Low, Borderline, Intermediate, High).</li>
                                    <li><strong>NHS Health Check:</strong> UK standards for interpreting baseline cardiovascular health in primary care.</li>
                                </ul>
                            </div>

                            {/* Medical Disclaimer */}
                            <div className="bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50 p-6 rounded-xl">
                                <h4 className="font-bold text-red-800 dark:text-red-200 mb-2">Important Medical Disclaimer</h4>
                                <p className="text-sm text-red-700 dark:text-red-300 m-0">
                                    This tool is designed strictly for educational purposes and provides an estimation of risk based on statistical population models. It does not provide a medical diagnosis or absolute prediction. <strong>If your results indicate a high risk, or if you are experiencing chest pain, shortness of breath, or dizziness, seek immediate medical attention or consult your GP.</strong>
                                </p>
                            </div>

                            {/* FAQs Section */}
                            <FAQAccordion faqs={heartAgeFaqs} title="Frequently Asked Questions" />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
