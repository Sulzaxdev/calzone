import { BedDouble, Brain, Activity } from "lucide-react";
import { RestingCalorieCalculator } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "Resting Calorie Calculator UK | BMR (Basal Metabolic Rate)",
    description: "Calculate your Resting Metabolic Rate (BMR) to find out exactly how many calories your body burns at rest just to stay alive.",
};

export default function RestingCaloriePage() {
    const faqs = [
        {
            question: "What is a Resting Calorie?",
            answer: "A resting calorie refers to the Basal Metabolic Rate (BMR). It is the absolute minimum amount of energy (calories) your body requires to perform basic, life-sustaining functions like breathing, circulating blood, cell production, and brain activity, assuming you were resting in bed for 24 hours."
        },
        {
            question: "Why should I know my resting calories?",
            answer: "Knowing your BMR is the first step to creating any diet plan. It acts as the baseline for your metabolism. You should almost never eat below your BMR for extended periods, as your body will begin to sacrifice basic biological functions and muscle mass."
        },
        {
            question: "What is the difference between BMR and TDEE?",
            answer: "BMR (Basal Metabolic Rate) is what you burn at complete rest. TDEE (Total Daily Energy Expenditure) is your BMR multiplied by your daily activity level (such as walking around the house, going to work, and working out). TDEE will always be higher than BMR."
        },
        {
            question: "Does the brain burn resting calories?",
            answer: "Yes! Despite only making up about 2% of your body weight, the brain uses roughly 20% of your resting calories just to keep neural pathways firing and managing your body systems."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <CalculatorSchema
                title="Resting Calorie Calculator UK"
                description="Find out your exact Resting Metabolic Rate (BMR)."
                slug="/resting-calorie-calculator-uk"
                faqs={faqs}
            />

            {/* Hero */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
                        <BedDouble className="w-4 h-4" />
                        Health & Metabolism
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Resting Calorie Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Discover your Basal Metabolic Rate (BMR). This is the exact number of calories your body burns every 24 hours just to keep vital organs functioning while at complete rest.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Calculator Component */}
                <div className="max-w-4xl mx-auto">
                    <RestingCalorieCalculator />
                </div>

                {/* SEO Content */}
                <section className="mt-20 max-w-4xl mx-auto space-y-12">
                    <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <Activity className="w-8 h-8 text-blue-500" />
                            Understanding The Engine of the Body
                        </h2>

                        <div className="space-y-8 text-slate-700 dark:text-slate-300">
                            <p className="text-lg leading-relaxed">
                                When people think about "burning calories", they usually picture running on a treadmill or lifting weights. In reality, the vast majority of the calories you burn every single day are used involuntarily by your internal organs. This base level of energy expenditure is your <strong>Resting Metabolic Rate</strong>.
                            </p>

                            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/40">
                                <h3 className="text-xl font-bold text-blue-900 dark:text-blue-200 mb-4 flex items-center gap-2">
                                    <Brain className="w-6 h-6 text-blue-500" /> Where do Resting Calories Go?
                                </h3>
                                <p className="mb-4 text-sm text-blue-800 dark:text-blue-300">
                                    Even if you don't move a muscle, your body is a highly demanding biological machine. Your resting calories are roughly distributed among your vital organs as follows:
                                </p>
                                <ul className="list-disc pl-5 space-y-2 font-medium text-blue-900 dark:text-blue-200">
                                    <li><strong>Liver:</strong> ~27% of your BMR</li>
                                    <li><strong>Brain:</strong> ~19% of your BMR</li>
                                    <li><strong>Skeletal Muscle (at rest):</strong> ~18% of your BMR</li>
                                    <li><strong>Kidneys:</strong> ~10% of your BMR</li>
                                    <li><strong>Heart:</strong> ~7% of your BMR</li>
                                    <li><strong>Other organs & tissues:</strong> ~19% of your BMR</li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">The Danger of Eating Below Your BMR</h3>
                                <p className="leading-relaxed">
                                    Because your Resting Calories represent the minimum energy required to keep your vital organs functioning, crash diets that demand eating 1,000 or 1,200 calories per day are often highly dangerous because they force the body to operate below its BMR.
                                </p>
                                <p className="leading-relaxed">
                                    When you consistently eat below your resting metabolic rate, your body enters "starvation mode" (adaptive thermogenesis). To protect your vital organs, it will aggressively slow down non-essential functions. This leads to fatigue, hair loss, a lowered immune system, and ultimately, a slower metabolism that makes it harder to lose fat in the long run.
                                </p>
                            </div>
                        </div>
                    </div>

                    <FAQAccordion faqs={faqs} title="Resting Calorie FAQs" />
                </section>
            </div>
        </div>
    );
}
