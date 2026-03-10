import { Activity, Scale, ShieldAlert, BookOpen, HeartPulse, HelpCircle, TrendingUp, Info, Microscope, Flame, Apple } from "lucide-react";
import { TDEECalculatorForm } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { RelatedTools } from "@/components/layout/related-tools";

export default function TDEEPage() {
    const tdeeFaqs = [
        {
            question: "What is the difference between BMR and TDEE?",
            answer: "BMR (Basal Metabolic Rate) is the number of calories your body burns at complete rest just to keep you alive (breathing, pumping blood). TDEE (Total Daily Energy Expenditure) is your BMR plus the calories you burn through daily movement and exercise. TDEE is the total calories you need to maintain your current weight."
        },
        {
            question: "Is the Mifflin-St Jeor equation accurate?",
            answer: "Yes, clinical studies indicate that the Mifflin-St Jeor equation is the most accurate predictive equation for calculating BMR and TDEE in healthy individuals, with an error margin significantly lower than older formulas like the Harris-Benedict equation."
        },
        {
            question: "How many calories should I cut to lose weight?",
            answer: "A standard, safe and sustainable calorie deficit is 500 calories below your TDEE per day. This equates to a 3,500 calorie deficit over a week, which results in approximately 1lb (0.45kg) of fat loss per week."
        },
        {
            question: "Should I eat back the calories I burn from exercise?",
            answer: "Generally, no. Your TDEE already factors in your exercise frequency via the Activity Multiplier. Eating back active calories often leads to 'double counting' and stalls weight loss progress."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <BreadcrumbSchema items={[
                { name: "Home", item: "/" },
                { name: "Fitness & Diet", item: "/fitness-diet" },
                { name: "TDEE Calculator", item: "/tdee-calculator-uk" }
            ]} />
            <CalculatorSchema
                title="TDEE Calculator UK | Total Daily Energy Expenditure"
                description="Calculate your Total Daily Energy Expenditure (TDEE) and get personalized macro targets for weight loss or muscle gain using our expert tool."
                slug="/tdee-calculator-uk"
                faqs={tdeeFaqs}
            />
            {/* The Interactive Calculator Component */}
            <TDEECalculatorForm />

            {/* Massive SEO Organic Content Section */}
            <section className="container mx-auto px-4 max-w-7xl mt-12 space-y-12">

                {/* 1. Primary Guide Section */}
                <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-lg">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                        <Flame className="w-8 h-8 text-orange-500" />
                        TDEE: The Ultimate Guide to Total Daily Energy Expenditure
                    </h2>

                    <div className="space-y-12 text-slate-700 dark:text-slate-300">
                        {/* Intro */}
                        <div className="grid md:grid-cols-2 gap-8 items-start">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                    <HelpCircle className="w-6 h-6 text-blue-500" /> What is TDEE?
                                </h3>
                                <p className="text-lg leading-relaxed">
                                    <strong>Total Daily Energy Expenditure (TDEE)</strong> is an estimation of how many calories you burn per day when exercise is taken into account. It is the holy grail of weight management measurements.
                                </p>
                                <p className="leading-relaxed">
                                    Your body burns a specific amount of calories just living (BMR), digesting food (TEF), and moving around during the day (NEAT). By combining your physiological data with your activity levels, TDEE gives you the exact baseline number of calories you need to consume to maintain your current weight. Eating below this number causes weight loss; eating above it causes weight gain.
                                </p>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4 uppercase text-xs tracking-widest">The Mathematics of TDEE</h4>
                                <div className="space-y-4">
                                    <div>
                                        <span className="block text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">Mifflin-St Jeor Formula:</span>
                                        <code className="bg-white dark:bg-black px-3 py-2 rounded-lg block border border-slate-200 dark:border-slate-700 font-mono text-xs overflow-x-auto text-nowrap whitespace-nowrap overflow-auto hide-scrollbar">Men: (10 × kg) + (6.25 × cm) - (5 × age) + 5</code>
                                    </div>
                                    <p className="text-xs text-slate-500">Unlike the older Harris-Benedict equation, Mifflin-St Jeor is the universally recommended clinical standard by the Academy of Nutrition and Dietetics.</p>
                                    <div>
                                        <span className="block text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">Applying the Multiplier:</span>
                                        <code className="bg-white dark:bg-black px-3 py-2 rounded-lg text-sm block border border-slate-200 dark:border-slate-700">TDEE = BMR × Activity Multiplier</code>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Breakdown of Daily Burn */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                <Activity className="w-6 h-6 text-green-500" /> The 4 Pillars of Your Daily Calorie Burn
                            </h3>
                            <p>Your TDEE isn't just one block of energy; it's made up of four distinct metabolic pathways.</p>

                            <div className="grid md:grid-cols-4 gap-4">
                                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm border-t-4 border-t-blue-500">
                                    <h4 className="font-bold text-sm mb-1 uppercase text-slate-900 dark:text-white">1. BMR (70%)</h4>
                                    <p className="text-xs text-slate-500 font-medium mb-2">Basal Metabolic Rate</p>
                                    <p className="text-xs text-slate-500 leading-relaxed">The energy your body uses at deep rest to keep your heart pumping, lungs breathing, and brain functioning. This makes up the vast majority of your daily burn.</p>
                                </div>
                                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm border-t-4 border-t-green-500">
                                    <h4 className="font-bold text-sm mb-1 uppercase text-slate-900 dark:text-white">2. NEAT (15%)</h4>
                                    <p className="text-xs text-slate-500 font-medium mb-2">Non-Exercise Activity</p>
                                    <p className="text-xs text-slate-500 leading-relaxed">The calories burned from spontaneous, daily movements. Fidgeting, walking to your car, carrying groceries, or pacing while on a phone call.</p>
                                </div>
                                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm border-t-4 border-t-orange-500">
                                    <h4 className="font-bold text-sm mb-1 uppercase text-slate-900 dark:text-white">3. TEF (10%)</h4>
                                    <p className="text-xs text-slate-500 font-medium mb-2">Thermic Effect of Food</p>
                                    <p className="text-xs text-slate-500 leading-relaxed">Your body burns calories just digesting, absorbing, and breaking down the food you eat. Protein requires significantly more energy to process than fats or carbs.</p>
                                </div>
                                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm border-t-4 border-t-red-500">
                                    <h4 className="font-bold text-sm mb-1 uppercase text-slate-900 dark:text-white">4. EAT (5%)</h4>
                                    <p className="text-xs text-slate-500 font-medium mb-2">Exercise Activity</p>
                                    <p className="text-xs text-slate-500 leading-relaxed">Intentional exercise like running, lifting weights, or swimming. Surprisingly, this makes up a very small percentage of the average person's daily burn.</p>
                                </div>
                            </div>
                        </div>

                        {/* Dietary Applications */}
                        <div className="grid md:grid-cols-2 gap-12 pt-8 border-t border-slate-100 dark:border-slate-800">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                    <TrendingUp className="w-6 h-6 text-purple-500" /> How to use TDEE for Weight Loss
                                </h3>
                                <p className="leading-relaxed">
                                    To lose weight, you must be in a <strong>Calorie Deficit</strong>. This applies regardless of what diet you follow (Keto, Paleo, Vegan, intermittent fasting, etc.). The laws of thermodynamics dictate that if you consume less energy than your TDEE, your body must burn stored fat for fuel.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex gap-3">
                                        <div className="bg-purple-100 dark:bg-purple-900/50 text-purple-600 rounded-full h-6 w-6 flex items-center justify-center shrink-0 font-bold text-sm">1</div>
                                        <p className="text-sm"><strong className="text-slate-800 dark:text-slate-200">The 500 Calorie Rule:</strong> Subtracting 500 calories from your TDEE daily yields roughly 1lb (0.45kg) of fat loss per week.</p>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="bg-purple-100 dark:bg-purple-900/50 text-purple-600 rounded-full h-6 w-6 flex items-center justify-center shrink-0 font-bold text-sm">2</div>
                                        <p className="text-sm"><strong className="text-slate-800 dark:text-slate-200">Do Not Crash Diet:</strong> Eating beneath your BMR (not just TDEE) can slow your metabolism rapidly, break down muscle tissue, and disrupt hormone production.</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-indigo-50/50 dark:bg-indigo-950/10 p-8 rounded-[2rem] border border-indigo-100 dark:border-indigo-900/30 space-y-4">
                                <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
                                    <Apple className="w-6 h-6 text-indigo-500" /> Using TDEE for Muscle Gain (Bulking)
                                </h3>
                                <p className="text-sm leading-relaxed text-indigo-900 dark:text-indigo-200">
                                    Conversely, if your goal is to build muscle mass, you must eat more than your TDEE. This is known as a <strong>Calorie Surplus</strong>.
                                </p>
                                <p className="text-sm leading-relaxed text-indigo-900 dark:text-indigo-200">
                                    A "Lean Bulk" requires adding 200 to 500 calories above your TDEE. If you eat significantly more than this, your body cannot synthesize the extra calories into muscle fast enough, and the excess is stored as adipose fat. Pair this surplus with progressive overload strength training.
                                </p>
                            </div>
                        </div>

                        {/* FAQ Accordion */}
                        <FAQAccordion faqs={tdeeFaqs} title="Frequently Asked Questions (TDEE)" />

                        {/* Final Disclaimer */}
                        <div className="mt-12 bg-red-100/50 dark:bg-red-950/20 p-8 rounded-3xl border border-red-200 dark:border-red-900/30 flex gap-6 items-start">
                            <ShieldAlert className="w-10 h-10 text-red-600 shrink-0 mt-1" />
                            <div>
                                <h4 className="text-xl font-bold text-red-800 dark:text-red-400">Strict Medical Disclaimer</h4>
                                <p className="text-sm text-red-700 dark:text-red-300 mt-2 leading-relaxed font-medium">
                                    The calories provided by this TDEE calculation are highly accurate statistical estimates but should serve as a starting point. Every individual's metabolism is unique.
                                    <br /><br />
                                    Always consult with a registered dietitian or physician before undertaking any severe calorie restriction or strenuous diet protocols, especially if you have pre-existing metabolic conditions like Hypothyroidism, PCOS, or Diabetes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <RelatedTools currentCategory="Fitness & Diet" currentSlug="/tdee-calculator-uk" />
        </div>
    );
}
