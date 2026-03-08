import { Baby, Milk, Activity } from "lucide-react";
import { BreastfeedingCalorieCalculator } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "Breastfeeding Calorie Calculator UK | Postpartum Intake",
    description: "Calculate how many calories you burn producing breast milk and how many you need to consume to safely maintain supply while losing postpartum weight.",
};

export default function BreastfeedingCaloriePage() {
    const faqs = [
        {
            question: "How many calories does breastfeeding burn?",
            answer: "Producing breast milk is a highly metabolically demanding process. On average, a mother exclusively breastfeeding an infant from 0-6 months will burn between 400 to 500 extra calories per day. This is roughly the equivalent of a light 4-mile run!"
        },
        {
            question: "Can I cut calories to lose weight while nursing?",
            answer: "Yes, but you must be careful. Extreme diets (cutting more than 500 calories a day) can crash your milk supply. Medical professionals generally advise waiting 6-8 weeks postpartum until milk supply regulates before intentionally cutting calories, and never dropping below 1,500 - 1,800 total calories per day while nursing."
        },
        {
            question: "Do I burn fewer calories pumping vs nursing?",
            answer: "No, the act of drawing the milk out is not what burns the vast majority of the calories. It is the biological synthesis (production) of the milk inside the body that requires the energy. Therefore, exclusively pumping burns the same amount of calories as exclusively nursing from the breast."
        },
        {
            question: "What happens to calories when the baby starts solids?",
            answer: "When your baby begins eating solid foods around 6 months (weaning), their intake of breastmilk subtly decreases over time. As they drink less, your body produces less, dropping the daily calorie burn from ~500 extra calories down to roughly ~300-400 extra calories."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <CalculatorSchema
                title="Breastfeeding Calorie Calculator UK"
                description="Find out your exact caloric needs while nursing a baby to protect your milk supply while managing postpartum weight loss."
                slug="/breastfeeding-calorie-calculator-uk"
                faqs={faqs}
            />

            {/* Hero */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-sm font-semibold mb-6">
                        <Milk className="w-4 h-4" />
                        Postpartum Health
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Breastfeeding Calorie Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Producing milk requires a massive amount of energy. Discover exactly how many extra calories you are burning every day, and what you should eat to protect your supply while safely managing 'baby weight'.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Calculator Component */}
                <div className="max-w-4xl mx-auto">
                    <BreastfeedingCalorieCalculator />
                </div>

                {/* SEO Content */}
                <section className="mt-20 max-w-4xl mx-auto space-y-12">
                    <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <Activity className="w-8 h-8 text-pink-500" />
                            Nutrition, Milk Supply & Weight Loss
                        </h2>

                        <div className="space-y-8 text-slate-700 dark:text-slate-300">
                            <p className="text-lg leading-relaxed">
                                Feeding a newborn represents one of the most metabolically intensive periods in a human adult's life. The caloric demand placed on your body to synthesize carbohydrates, proteins, and fats into nutrient-dense milk is roughly equivalent to running for 45 minutes to an hour every single day.
                            </p>

                            <div className="bg-pink-50 dark:bg-pink-900/20 p-6 rounded-2xl border border-pink-100 dark:border-pink-900/40">
                                <h3 className="text-xl font-bold text-pink-900 dark:text-pink-200 mb-4 flex items-center gap-2">
                                    <Baby className="w-6 h-6 text-pink-500" /> The Secret to the "Breastfeeding Diet"
                                </h3>
                                <p className="mb-4 text-sm text-pink-800 dark:text-pink-300">
                                    Many people tell pregnant women, "The weight will just fall off when you breastfeed." For some, this is true. However, because breastfeeding burns ~500 calories, it simultaneously triggers a massive spike in hunger hormones. If that 500-calorie deficit is immediately replaced by eating extra snacks throughout the day (which is incredibly common when sleep-deprived), weight loss stalls.
                                </p>
                                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-pink-200 dark:border-pink-800 text-center font-bold text-sm text-slate-800 dark:text-slate-200">
                                    Tracking your baseline maintenance calories + nursing calories helps you understand exactly where your balance is.
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">The Danger of Strict Dieting Postpartum</h3>
                                <p className="leading-relaxed">
                                    A woman's body prioritizes survival over everything else. If a mother aggressively drops her calories too low in a desperate attempt to lose pregnancy weight quickly, her body will perceive a state of famine.
                                </p>
                                <p className="leading-relaxed">
                                    During a perceived famine, the body shuts down biologically "expensive" processes—and producing highly nutritious milk is at the very top of that list. This is why aggressive diets (like eating 1200 calories) reliably cause milk supply to crash within days.
                                </p>
                                <p className="leading-relaxed text-sm italic border-l-4 border-pink-500 pl-4">
                                    To safely lose weight while nursing, experts recommend a deficit of no more than 300-500 calories below your Total Daily Caloric Need (TDEE + Nursing Cost). This allows for a steady half-kilo (1lb) a week loss without endangering your milk production.
                                </p>
                            </div>
                        </div>
                    </div>

                    <FAQAccordion faqs={faqs} title="Nursing & Nutrition FAQs" />
                </section>
            </div>
        </div>
    );
}
