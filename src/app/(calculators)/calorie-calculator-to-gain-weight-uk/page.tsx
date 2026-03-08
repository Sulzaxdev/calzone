import { Dumbbell, Activity, ShieldCheck } from "lucide-react";
import { CalorieGainCalculator } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "Calorie Calculator to Gain Weight | Bulking Calculator UK",
    description: "Calculate the exact number of calories and macros you need to eat every day to gain weight, build muscle, or successfully lean bulk.",
};

export default function CalorieGainPage() {
    const faqs = [
        {
            question: "How many calories do I need to gain weight?",
            answer: "To gain weight, you need to eat more calories than your body burns each day. This is called a 'caloric surplus'. A typical surplus is +300 to +500 calories above your Total Daily Energy Expenditure (TDEE)."
        },
        {
            question: "What is a 'lean bulk' vs a 'dirty bulk'?",
            answer: "A 'lean bulk' focuses on a slight caloric surplus (+250 to 300 kcal) using highly nutritious whole foods to build muscle while minimizing fat gain. A 'dirty bulk' implies eating whatever you want in a massive surplus (often +1000 kcal or more including junk food) which usually leads to rapid weight gain, but a large portion will be fat."
        },
        {
            question: "Do I need to track carbs and fats?",
            answer: "If your primary goal is muscle gain, hitting your protein target and your total calorie target are the two most important factors. How you split your carbs and fats is heavily dependent on personal preference and training intensity (carbs are useful for gym energy)."
        },
        {
            question: "Why am I not gaining weight even though I'm eating a lot?",
            answer: "Often, people overestimate how much they are actually eating. If the scale hasn't moved for 2 weeks, you are not in a surplus. You will need to increase your daily calories by another 100-200."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <CalculatorSchema
                title="Calorie Calculator to Gain Weight UK"
                description="Find out exactly how many calories and macros you need to consume to gain weight and bulk up effectively."
                slug="/calorie-calculator-to-gain-weight-uk"
                faqs={faqs}
            />

            {/* Hero */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-sm font-semibold mb-6">
                        <Dumbbell className="w-4 h-4" />
                        Fitness & Nutrition
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Bulking Calorie Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Whether you're looking to put on healthy mass, overcome a fast metabolism, or dive into a dedicated muscle-building bulk, find your exact daily caloric targets.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Calculator Component */}
                <div className="max-w-4xl mx-auto">
                    <CalorieGainCalculator />
                </div>

                {/* SEO Content */}
                <section className="mt-20 max-w-4xl mx-auto space-y-12">
                    <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <Activity className="w-8 h-8 text-orange-500" />
                            How to Gain Weight Safely with a Surplus
                        </h2>

                        <div className="space-y-8 text-slate-700 dark:text-slate-300">
                            <p className="text-lg leading-relaxed">
                                Most nutritional calculators on the internet are geared heavily towards weight loss and dieting. However, purposely gaining weight—often called 'bulking' in fitness spaces or necessary for recovery after illness—relies on the same thermodynamics: eating more than you burn. Consuming a specific, calculated <strong>Caloric Surplus</strong> is the only way to trigger weight gain.
                            </p>

                            <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-2xl border border-orange-100 dark:border-orange-900/40">
                                <h3 className="text-xl font-bold text-orange-900 dark:text-orange-200 mb-4 flex items-center gap-2">
                                    <ShieldCheck className="w-6 h-6 text-orange-500" /> Why a +500 Calorie Surplus?
                                </h3>
                                <p className="mb-4 text-sm text-orange-800 dark:text-orange-300">
                                    The biological rule of thumb is that gaining roughly half a kilogram (about 1lb) of weight requires approximately an extra 3,500 calories over a week.
                                </p>
                                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-orange-200 dark:border-orange-800 text-center font-bold text-slate-800 dark:text-slate-200">
                                    7 days × 500 extra calories = +3,500 kcal = ~0.5kg Mass Gain per Week
                                </div>
                                <p className="mt-4 text-sm text-orange-800 dark:text-orange-300">
                                    A +500 kcal surplus is generally considered the "sweet spot" for men looking to put on muscle without gaining excessive fat. For women, a slightly lower surplus of +250 to +300 is often recommended. If you go much higher than this (a 'dirty bulk'), your body cannot use the excess energy for muscle synthesis quickly enough, and the spillover is stored directly as fat.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">The Power of Macronutrients</h3>
                                <p className="leading-relaxed">
                                    Just hitting a calorie target technically makes you gain weight. But if you want that weight to be muscle tissue rather than just exclusively fat, you must pay attention to macros alongside a vigorous resistance training regime.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-center">
                                    <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                                        <h4 className="font-bold mb-2">Protein: The Builder</h4>
                                        <p className="text-sm">Critical for muscle repair. Aim for 1.6g to 2.2g per kg of bodyweight.</p>
                                    </div>
                                    <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                                        <h4 className="font-bold mb-2">Carbs: The Fuel</h4>
                                        <p className="text-sm">Fills the rest of your diet to provide intense energy for the gym and prevent fatigue.</p>
                                    </div>
                                    <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                                        <h4 className="font-bold mb-2">Fats: The Regulator</h4>
                                        <p className="text-sm">Helps regulate vital hormones like testosterone. Very calorie-dense (9 kcal/g).</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <FAQAccordion faqs={faqs} title="Weight Gain FAQs" />
                </section>
            </div>
        </div>
    );
}
