import { Flame, Info, Ruler, BookOpen, AlertTriangle } from "lucide-react";
import { WhtrCalculatorForm } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "Waist-to-Height Ratio (WHtR) Calculator | Central Obesity Test UK",
    description: "Calculate your Waist-to-Height Ratio (WHtR). A superior health indicator compared to BMI for detecting central obesity and heart disease risk.",
};

export default function WhtrPage() {
    const whtrFaqs = [
        {
            question: "Why is WHtR considered better than BMI?",
            answer: "BMI only considers overall weight and height, meaning it cannot distinguish between dense muscle mass and fat. WHtR specifically measures central obesity (abdominal fat), which is medically proven to be a far higher predictor of cardiovascular disease and Type 2 diabetes."
        },
        {
            question: "How do I measure my waist correctly?",
            answer: "Stand straight and breathe normally. Wrap a flexible measuring tape directly around your bare stomach, keeping it completely level with your navel (belly button). Do not suck your stomach in, and ensure the tape is snug but not pinching."
        },
        {
            question: "What is the 'Golden Rule' of WHtR?",
            answer: "The globally recognized medical guideline is simple: keep your waist circumference to less than half of your height. If your WHtR is 0.50 or higher, you enter the increased risk category for metabolic syndrome."
        },
        {
            question: "Is this ratio accurate for athletes?",
            answer: "Yes, significantly more so than BMI. Athletes often have a high BMI due to muscle mass, falsely categorizing them as 'Overweight.' Because WHtR focuses solely on visceral abdominal fat, an athlete will correctly score in the 'Healthy' range."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <CalculatorSchema
                title="Waist-to-Height Ratio (WHtR) Calculator | Central Obesity Test UK"
                description="Calculate your Waist-to-Height Ratio (WHtR) to accurately determine your risk for heart disease and central obesity."
                slug="/waist-to-height-ratio-calculator"
                faqs={whtrFaqs}
            />

            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <WhtrCalculatorForm />

                {/* Massive Authority SEO Content Section */}
                <section className="mt-16 max-w-4xl mx-auto space-y-12">
                    <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-lg">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <Flame className="w-8 h-8 text-orange-500" />
                            Understanding The Waist-to-Height Ratio (WHtR)
                        </h2>

                        <div className="space-y-10 text-slate-700 dark:text-slate-300">

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                    <Info className="w-6 h-6 text-blue-500" /> What is Central Obesity?
                                </h3>
                                <p className="text-lg leading-relaxed">
                                    Not all body fat is created equal. While fat stored around your hips and thighs (subcutaneous fat) is generally benign, fat stored deep within your abdominal cavity (visceral fat) wraps around critical organs like the liver and pancreas.
                                </p>
                                <p className="leading-relaxed">
                                    This "central obesity" actively secretes inflammatory hormones into your bloodstream, drastically increasing your risk for <strong>Heart Disease, Interrupted Sleep (Apnea), Type 2 Diabetes, and Stroke</strong>. The WHtR is explicitly designed to detect this dangerous visceral fat.
                                </p>
                            </div>

                            <div className="bg-blue-50 dark:bg-blue-950/30 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/50">
                                <h3 className="text-xl font-bold text-blue-900 dark:text-blue-200 mb-4 flex items-center gap-2">
                                    <Ruler className="w-6 h-6 text-blue-500" /> The Golden Rule
                                </h3>
                                <p className="text-xl font-medium text-blue-800 dark:text-blue-300 text-center italic py-4">
                                    "Keep your waist circumference to less than half your height."
                                </p>
                                <p className="text-sm text-blue-700 dark:text-blue-400">
                                    If your ratio crosses 0.50, your visceral fat levels have exceeded the safety threshold. At 0.60, the medical risk multiplies significantly, demanding immediate lifestyle interventions.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                <div className="space-y-3">
                                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">The Problem with BMI</h3>
                                    <ul className="space-y-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 p-4 rounded-xl border border-red-100 dark:border-red-900/50">
                                        <li className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 shrink-0" /> Relies only on total mass & height.</li>
                                        <li className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 shrink-0" /> Penalizes dense, healthy muscle.</li>
                                        <li className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 shrink-0" /> Cannot detect hidden abdominal fat.</li>
                                    </ul>
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">The WHtR Advantage</h3>
                                    <ul className="space-y-2 text-sm text-green-700 dark:text-green-500 bg-green-50 dark:bg-green-950/20 p-4 rounded-xl border border-green-100 dark:border-green-900/50">
                                        <li className="flex items-center gap-2"><span className="text-lg">✓</span> Directly targets central obesity.</li>
                                        <li className="flex items-center gap-2"><span className="text-lg">✓</span> Accurate for athletes & weightlifters.</li>
                                        <li className="flex items-center gap-2"><span className="text-lg">✓</span> Independent of age and gender biases.</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Health Tips / Reduction Strategies */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Strategies to Reduce Visceral Fat</h3>
                                <ul className="list-disc list-inside space-y-3 text-slate-600 dark:text-slate-400">
                                    <li><strong>Eliminate Liquid Calories:</strong> Sugary drinks, including fruit juices, are rapidly converted by the liver directly into visceral fat.</li>
                                    <li><strong>Prioritize Sleep:</strong> Chronic sleep deprivation (under 6 hours) chronically elevates cortisol, a stress hormone that directs fat storage squarely to the abdomen.</li>
                                    <li><strong>High-Intensity Interval Training (HIIT):</strong> Clinical trials show rigorous, short burst exercises burn intra-abdominal fat exponentially faster than steady-state cardio.</li>
                                    <li><strong>Control Carbohydrate Intake:</strong> Excessive refined carbohydrates spike insulin levels; a lower-carb approach shifts the body toward burning stored abdominal fats.</li>
                                </ul>
                            </div>

                            {/* Data Sources & Methodology */}
                            <div className="space-y-4 pt-8 border-t border-slate-200 dark:border-slate-800">
                                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-indigo-500" /> Data Sources & Medical Citations
                                </h3>
                                <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-2">
                                    <li><strong>National Institute for Health and Care Excellence (NICE):</strong> Recommends WHtR as a direct diagnostic tool for identifying health risks connected to central adiposity.</li>
                                    <li><strong>World Health Organization (WHO):</strong> Correlates central obesity directly to elevated cardiometabolic risk across broad global populations.</li>
                                </ul>
                            </div>

                            {/* Medical Disclaimer */}
                            <div className="bg-slate-100 dark:bg-slate-900 text-xs text-slate-500 p-4 rounded-lg italic">
                                Disclaimer: This Waist-to-Height Ratio calculator is designed for educational health tracking and population-based risk estimation. It is not intended to provide a specific medical diagnosis. Always consult with your general practitioner before undertaking drastic dietary shifts or beginning high-impact fitness routines.
                            </div>

                            {/* FAQs Section */}
                            <FAQAccordion faqs={whtrFaqs} title="Frequently Asked Questions (WHtR)" />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
