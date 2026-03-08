import { Waves, Activity, Flame } from "lucide-react";
import { SwimmingCalorieCalculator } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "Swimming Calorie Calculator UK | Calories Burned in Pool",
    description: "Calculate exactly how many calories you burn swimming lengths. Works for freestyle, breaststroke, butterfly, backstroke, and treading water.",
};

export default function SwimmingCaloriePage() {
    const faqs = [
        {
            question: "Which swimming stroke burns the most calories?",
            answer: "Butterfly is the undisputed king of calorie burning in the pool, burning over double the calories of a light freestyle. However, because it is so exhausting, most people can only do it for short sprints. Vigorous freestyle is usually the best stroke for sustained high-calorie burning over 30+ minutes."
        },
        {
            question: "Does swimming burn more calories than running?",
            answer: "It depends on the intensity. A moderate jog and a moderate freestyle swim burn roughly the same amount of calories. However, swimming is zero-impact, making it vastly superior for joint health and recovery while providing the same cardiovascular benefits."
        },
        {
            question: "Why do I feel so hungry after swimming?",
            answer: "Swimming in water cooler than your body temperature causes your body to expend extra energy just to stay warm. This thermal effect, combined with the full-body muscular exertion of pulling yourself through water, strongly stimulates your appetite hormones compared to sweating in a hot gym."
        },
        {
            question: "Does treading water burn calories?",
            answer: "Yes! Treading water is an excellent workout. Doing it vigorously (keeping your hands out of the water) can burn as many calories as a fast jog. Doing it moderately burns similar calories to a brisk walk."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <CalculatorSchema
                title="Swimming Calorie Calculator UK"
                description="Find out exactly how many calories you burn in the pool based on your stroke and time."
                slug="/swimming-calorie-calculator-uk"
                faqs={faqs}
            />

            {/* Hero */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 text-sm font-semibold mb-6">
                        <Waves className="w-4 h-4" />
                        Sports & Fitness
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Swimming Calorie Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Whether you are doing laps of front crawl, a leisurely breaststroke, or grueling butterfly sprints—calculate your exact energy burn in the pool.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Calculator Component */}
                <div className="max-w-4xl mx-auto">
                    <SwimmingCalorieCalculator />
                </div>

                {/* SEO Content */}
                <section className="mt-20 max-w-4xl mx-auto space-y-12">
                    <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <Flame className="w-8 h-8 text-cyan-500" />
                            The Ultimate Full-Body Burn
                        </h2>

                        <div className="space-y-8 text-slate-700 dark:text-slate-300">
                            <p className="text-lg leading-relaxed">
                                Swimming is frequently cited by fitness experts as the ultimate exercise. Water provides 800 times more resistance than air, meaning every kick, pull, and push is essentially a form of weight training mixed with intense cardiovascular conditioning.
                            </p>

                            <div className="bg-cyan-50 dark:bg-cyan-900/20 p-6 rounded-2xl border border-cyan-100 dark:border-cyan-900/40">
                                <h3 className="text-xl font-bold text-cyan-900 dark:text-cyan-200 mb-4 flex items-center gap-2">
                                    <Activity className="w-6 h-6 text-cyan-500" /> How We Calculate Pool Calories
                                </h3>
                                <p className="mb-4 text-sm text-cyan-800 dark:text-cyan-300">
                                    Our calculator uses standard scientific <strong>MET (Metabolic Equivalent of Task)</strong> values established by sports medicine researchers.
                                </p>
                                <p className="text-sm text-cyan-800 dark:text-cyan-300">
                                    A single MET represents the energy you use while sitting entirely still. A gentle backstroke has a MET of 4.8 (meaning you burn 4.8x more energy than sitting on the sofa). A vigorous Butterfly stroke has a MET of nearly 14. We multiply this MET value by your body weight and your time in the water to get a highly accurate caloric figure.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Which Stroke is Best for Weight Loss?</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                                        <h4 className="font-bold mb-2">1. Freestyle (Front Crawl)</h4>
                                        <p className="text-sm">The best overall choice. It's fast, efficient, and most people can sustain a vigorous pace for 30+ minutes without their form collapsing.</p>
                                    </div>
                                    <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                                        <h4 className="font-bold mb-2">2. Butterfly</h4>
                                        <p className="text-sm">The highest calorie burner per minute, but almost impossible to sustain for long periods. Best used as a HIIT sprint interval.</p>
                                    </div>
                                    <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                                        <h4 className="font-bold mb-2">3. Breaststroke</h4>
                                        <p className="text-sm">Excellent for cardiovascular health and targeting the inner thighs and chest, burning a steady, moderate amount of calories.</p>
                                    </div>
                                    <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                                        <h4 className="font-bold mb-2">4. Backstroke</h4>
                                        <p className="text-sm">The lowest calorie burn, but incredible for fixing posture issues caused by desk work. Great for active recovery days.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <FAQAccordion faqs={faqs} title="Swimming Facts & FAQs" />
                </section>
            </div>
        </div>
    );
}
