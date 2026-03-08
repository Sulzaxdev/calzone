import { Dog, Activity, Scissors } from "lucide-react";
import { DogCalorieCalculator } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "Dog Calorie Calculator UK | Find Your Dog's Daily KCAL Needs",
    description: "Calculate how much you should be feeding your dog based on their weight, life stage, and whether they are neutered. Medical RER and DER formulas used.",
};

export default function DogCaloriePage() {
    const faqs = [
        {
            question: "How do you calculate dog calories?",
            answer: "Veterinarians use a two-step formula. First, they find the Resting Energy Requirement (RER) using the formula: 70 × (Weight in kg)^0.75. Second, they multiply that RER by an activity or life-stage multiplier to get the Daily Energy Requirement (DER)."
        },
        {
            question: "Does neutering really affect a dog's calories?",
            answer: "Yes, significantly. Neutering or spaying removes sex hormones which slows the dog's metabolism down by up to 20%. A neutered adult dog needs fewer calories than an 'intact' dog of the exact same size."
        },
        {
            question: "How many treats can my dog have?",
            answer: "Veterinarians recommend that treats should make up no more than 10% of your dog's total daily caloric intake. If your dog gets 1,000 calories a day, only 100 calories should come from treats."
        },
        {
            question: "What if my dog is overweight?",
            answer: "If your dog needs to lose weight, you should select the 'Weight Loss / Obesity Prone' multiplier (1.0). You should also input your dog's *ideal* target body weight rather than their current obese body weight to find the right deficit."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <CalculatorSchema
                title="Dog Calorie Calculator UK"
                description="Determine the right amount of calories for your dog's breed and size."
                slug="/dog-calorie-calculator-uk"
                faqs={faqs}
            />

            {/* Hero */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-sm font-semibold mb-6">
                        <Dog className="w-4 h-4" />
                        Pets & Vets
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Dog Calorie Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Stop guessing with food bag scoops. Calculate the exact veterinary-approved daily calories your dog needs to stay healthy and active based on their weight and life stage.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Calculator Component */}
                <div className="max-w-4xl mx-auto">
                    <DogCalorieCalculator />
                </div>

                {/* SEO Content */}
                <section className="mt-20 max-w-4xl mx-auto space-y-12">
                    <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <Activity className="w-8 h-8 text-amber-500" />
                            How Canine Nutrition Works
                        </h2>

                        <div className="space-y-8 text-slate-700 dark:text-slate-300">
                            <p className="text-lg leading-relaxed">
                                Pet obesity is a growing crisis in the UK, with studies suggesting up to 50% of pet dogs are overweight. The primary issue is that the serving sizes listed on the back of commercial dog food bags are often generalized and can sometimes overestimate requirements to sell more food. By calculating your dog's specific biological needs, you can keep them at a healthy weight.
                            </p>

                            <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-2xl border border-amber-100 dark:border-amber-900/40">
                                <h3 className="text-xl font-bold text-amber-900 dark:text-amber-200 mb-4 flex items-center gap-2">
                                    <Scissors className="w-6 h-6 text-amber-500" /> The Impact of Spaying / Neutering
                                </h3>
                                <p className="mb-4 text-sm text-amber-800 dark:text-amber-300">
                                    One of the biggest nutritional mistakes dog owners make is continuing to feed their dogs the same amount of food after they have been "fixed".
                                </p>
                                <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed mb-4">
                                    Spaying (females) or neutering (moles) fundamentally changes a dog's hormonal profile. Removing reproductive hormones slows down their basal metabolic rate. Therefore, if you feed a neutered dog the same amount you did when they were intact, they will gain weight. This is why our calculator requires you to specify if they are neutered or intact.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">The Veterinary Formula (RER)</h3>
                                <p className="leading-relaxed">
                                    Unlike human BMR, which uses height and age, a dog's resting energy is calculated purely on an allometric scaling of their body weight using exponents.
                                </p>
                                <div className="bg-slate-100 dark:bg-slate-900 p-5 rounded-2xl border-l-4 border-amber-500">
                                    <p className="font-bold text-slate-900 dark:text-white mb-2">Resting Energy Requirement (RER)</p>
                                    <p className="font-mono text-sm bg-white dark:bg-black p-2 rounded inline-block mb-2">
                                        RER = 70 × (Body Weight in kg)^0.75
                                    </p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        This calculates the calories your dog would need if it were lying in a crate doing absolutely nothing all day. We then multiply this by a lifestyle factor (usually 1.6 for a normal walk-twice-a-day pet dog).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <FAQAccordion faqs={faqs} title="Dog Nutrition FAQs" />
                </section>
            </div>
        </div>
    );
}
