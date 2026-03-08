import { Mountain, Activity, Backpack } from "lucide-react";
import { RuckingCalorieCalculator } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "Rucking Calorie Calculator UK | Hiking & Backpack Target",
    description: "Find out exactly how many extra calories you burn by adding weight to your backpack. Calculate your rucking, hiking, and loaded march energy expenditure.",
};

export default function RuckingCaloriePage() {
    const faqs = [
        {
            question: "What is 'Rucking'?",
            answer: "Rucking is incredibly simple: it is walking while carrying a weighted backpack. It originated from military training (marching with rucksacks) but has exploded in popularity as a civilian fitness trend because it builds strength and cardiovascular fitness simultaneously."
        },
        {
            question: "How much weight should I use for rucking?",
            answer: "If you are a beginner, start with 10% of your body weight. (So a 80kg person should start with an 8kg pack). Slowly work your way up to 20% or 30% of your body weight. You should never exceed 30% unless doing advanced training, as the risk of knee and lower back injury increases sharply."
        },
        {
            question: "Does rucking burn as many calories as running?",
            answer: "Yes! Rucking with a reasonably heavy pack (around 15kg to 20kg) can easily burn the exact same amount of calories as jogging, but it does so with significantly less impact on your knees and joints. Rucking primarily requires muscle recruitment from your glutes, hamstrings, and core."
        },
        {
            question: "What makes the terrain matter?",
            answer: "Walking on soft surfaces like dirt trails, grass, or sand requires your feet to constantly adjust and push harder against an unstable floor. This increased friction and stabilization demand can increase your total calorie burn by 10% to 20% compared to flat concrete."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <CalculatorSchema
                title="Rucking Calorie Calculator UK"
                description="Calculate the extra calories burned by adding weight to your walks."
                slug="/rucking-calorie-calculator-uk"
                faqs={faqs}
            />

            {/* Hero */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-semibold mb-6">
                        <Backpack className="w-4 h-4" />
                        Outdoor & Military Fitness
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Rucking Calorie Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Turn a normal walk into intense cardiovascular and strength training. Find out exactly how many bonus calories you burn by adding weight to your backpack.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Calculator Component */}
                <div className="max-w-4xl mx-auto">
                    <RuckingCalorieCalculator />
                </div>

                {/* SEO Content */}
                <section className="mt-20 max-w-4xl mx-auto space-y-12">
                    <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <Mountain className="w-8 h-8 text-green-600" />
                            Why Rucking is the Ultimate Workout
                        </h2>

                        <div className="space-y-8 text-slate-700 dark:text-slate-300">
                            <p className="text-lg leading-relaxed">
                                Lifting weights gets you strong. Running gets you fit. Rucking does both at the exact same time. By strapping weight to your back and walking out the front door, you engage your shoulders, core, glutes, and legs in a prolonged, calorie-torching endurance session.
                            </p>

                            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl border border-green-100 dark:border-green-900/40">
                                <h3 className="text-xl font-bold text-green-900 dark:text-green-200 mb-4 flex items-center gap-2">
                                    <Activity className="w-6 h-6 text-green-600" /> The Science of Working Under Load
                                </h3>
                                <p className="mb-4 text-sm text-green-800 dark:text-green-300">
                                    When you walk without a pack, your body has evolved to be incredibly efficient, burning minimal energy. As soon as you add a heavy load, that efficiency breaks down. You must recruit far more muscle fibres just to stabilize your spine and take a single step.
                                </p>
                                <p className="text-sm text-green-800 dark:text-green-300">
                                    Research shows that on average, a 15kg to 20kg pack can increase your base walking calorie burn by <strong>30% to 50%</strong>. For bigger guys carrying military-grade loads (30kg+), the caloric demands rival those of high-intensity long-distance running.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">How to Start Rucking Safely</h3>
                                <ul className="list-decimal pl-5 space-y-4">
                                    <li>
                                        <strong>The Gear:</strong> You don't need a fancy military rucksack to start. Any sturdy old backpack will do. For weight, wrap some dumbbells or old textbooks in a towel (so they don't dig into your back) and drop them in.
                                    </li>
                                    <li>
                                        <strong>Start Light:</strong> Ego is the enemy. Start with 5kg or 10kg. Let your shoulders, traps, and lower back adapt to carrying the load over distance. Increase the weight by 2.5kg every week or two.
                                    </li>
                                    <li>
                                        <strong>Keep it High and Tight:</strong> The number one mistake beginners make is letting the backpack hang low near their bum. Pull the shoulder straps extremely tight so the weight sits high up between your shoulder blades. Your lower back will thank you.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <FAQAccordion faqs={faqs} title="Rucking & Hiking FAQs" />
                </section>
            </div>
        </div>
    );
}
