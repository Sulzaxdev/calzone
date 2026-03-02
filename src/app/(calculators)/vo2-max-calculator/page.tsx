import { VO2MaxCalculatorForm } from "./calculator";
import { Metadata } from "next";
import {
    Heart,
    Activity,
    Timer,
    Award,
    CheckCircle2,
    Info,
    TrendingUp,
    Microscope,
    HelpCircle
} from "lucide-react";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata: Metadata = {
    title: "VO2 Max Calculator UK | Estimate Fitness with Rockport & Cooper Tests",
    description: "Free VO2 Max Calculator for UK users. Estimate your maximal oxygen uptake using the Rockport 1-Mile Walk or Cooper 12-Minute Run tests. Track your cardiovascular fitness level.",
    keywords: ["VO2 Max Calculator", "VO2 Max Test UK", "Rockport Walking Test", "Cooper Run Test", "Cardiovascular Fitness", "Fitness Level Estimation"],
};

export default function VO2MaxCalculatorPage() {
    const faqs = [
        {
            question: "What is VO2 Max and why does it matter?",
            answer: "VO2 Max (Maximal Oxygen Uptake) represents the maximum amount of oxygen your body can use during intense exercise. It is widely considered the best indicator of cardiovascular fitness and aerobic endurance. Generally, a higher VO2 Max indicates a better-conditioned heart and lungs."
        },
        {
            question: "How accurate are these estimation tests?",
            answer: "The Rockport and Cooper tests are validated sub-maximal and field tests that provide a very good estimate (usually within 5-10% of a lab test) without needing expensive specialized equipment. They are excellent for tracking progress over time."
        },
        {
            question: "Which test should I choose: Rockport or Cooper?",
            answer: "The **Rockport Walk Test** is ideal for beginners, older adults, or those returning to exercise, as it only requires brisk walking. The **Cooper 12-Minute Run Test** is better suited for established runners or those with a higher baseline fitness level who can safely maintain a high-intensity effort for 12 minutes."
        },
        {
            question: "What is a 'good' VO2 Max for my age?",
            answer: "VO2 Max naturally declines with age. For a 30-year-old male, a 'Good' score is typically 40-44 mL/kg/min. For a 30-year-old female, it is roughly 34-38 mL/kg/min. Athletes often have scores in the 60s, 70s, or even 80s."
        },
        {
            question: "How can I improve my VO2 Max?",
            answer: "High-Intensity Interval Training (HIIT), consistent aerobic exercise (Zone 2 training), and progressive overload in your cardio workouts are the most effective ways to boost your VO2 Max over several months."
        }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 lg:py-20">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-sm mb-6 border border-blue-100 dark:border-blue-800 animate-fade-in">
                    <Activity className="w-4 h-4" />
                    Aerobic Fitness Suite
                </div>
                <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                    VO2 Max <span className="text-primary italic">Calculator</span>
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    The definitive metric for your cardiovascular health. Estimate your maximal oxygen consumption using validated field tests and see how you rank against national benchmarks.
                </p>
            </div>

            {/* Main Calculator Form */}
            <div className="mb-20">
                <VO2MaxCalculatorForm />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                        <Microscope className="w-8 h-8 text-primary" />
                        The Science Explained
                    </h2>
                    <div className="prose prose-slate dark:prose-invert max-w-none space-y-4">
                        <p>
                            VO2 Max is measured in **millilitres of oxygen used in one minute per kilogram of body weight (mL/kg/min)**. It measures the efficiency with which your heart pumps blood and how effectively your muscles extract and use oxygen.
                        </p>
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <h3 className="text-lg font-bold mb-2">The Formulas We Use</h3>
                            <ul className="space-y-2 text-sm italic">
                                <li><strong>Rockport:</strong> 132.853 - (0.0769 × Weight) - (0.3877 × Age) + (6.315 × Gender) - (3.2649 × Time) - (0.1565 × HR)</li>
                                <li><strong>Cooper:</strong> (Distance in meters − 504.9) ÷ 44.73</li>
                            </ul>
                        </div>
                        <p className="text-sm text-slate-500">
                            *Note: Gender factor in Rockport is 1 for Male, 0 for Female. Weight is calculated in lbs, and Time in fractional minutes.
                        </p>
                    </div>
                </div>

                <div className="bg-primary/5 dark:bg-primary/10 p-8 rounded-3xl border border-primary/10 relative overflow-hidden h-full flex flex-col justify-center">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-primary" />
                        Why Track VO2 Max?
                    </h2>
                    <ul className="space-y-4">
                        <li className="flex gap-3">
                            <div className="mt-1"><CheckCircle2 className="w-5 h-5 text-green-500" /></div>
                            <p className="text-slate-700 dark:text-slate-300"><strong>Longevity:</strong> Higher VO2 Max is strongly correlated with a lower risk of all-cause mortality.</p>
                        </li>
                        <li className="flex gap-3">
                            <div className="mt-1"><CheckCircle2 className="w-5 h-5 text-green-500" /></div>
                            <p className="text-slate-700 dark:text-slate-300"><strong>Training Efficiency:</strong> Knowing your level helps you set accurate training heart rate zones.</p>
                        </li>
                        <li className="flex gap-3">
                            <div className="mt-1"><CheckCircle2 className="w-5 h-5 text-green-500" /></div>
                            <p className="text-slate-700 dark:text-slate-300"><strong>Metabolic Health:</strong> Improves insulin sensitivity and mitochondrial density.</p>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Guide Section */}
            <section className="bg-slate-50 dark:bg-slate-900/40 rounded-[3rem] p-10 lg:p-16 mb-20 border border-slate-100 dark:border-slate-800">
                <h2 className="text-3xl font-black text-center mb-12">How to Perform the Tests Safely</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-bold uppercase tracking-widest">
                            Level: Beginner to Intermediate
                        </div>
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                            <Timer className="w-6 h-6 text-blue-500" />
                            Rockport Walk Test
                        </h3>
                        <ol className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed list-decimal pl-5">
                            <li>Find a flat 1-mile (1609m) track or use a GPS watch/app.</li>
                            <li>Warm up for 5 minutes with light walking.</li>
                            <li>Walk the mile as <strong>fast as possible</strong> without jogging or running.</li>
                            <li>Immediately record the time in minutes and seconds.</li>
                            <li>Immediately take your heart rate for 15 seconds (multiply by 4) or use a monitor.</li>
                        </ol>
                    </div>

                    <div className="space-y-6 border-slate-200 dark:border-slate-800 pl-0 md:pl-12 lg:pl-12 border-l-0 md:border-l">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg text-xs font-bold uppercase tracking-widest">
                            Level: Advanced / Fit
                        </div>
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                            <Activity className="w-6 h-6 text-red-500" />
                            Cooper 12-Minute Test
                        </h3>
                        <ol className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed list-decimal pl-5">
                            <li>Warm up with dynamic stretching and a light jog.</li>
                            <li>Run as far as you can in exactly 12 minutes.</li>
                            <li>Pacing is key; don't sprint and burn out early.</li>
                            <li>Measure the total distance reached in meters (e.g., 2400m).</li>
                            <li>Cool down properly after finishing.</li>
                        </ol>
                    </div>
                </div>

                <div className="mt-12 p-6 bg-amber-50 dark:bg-amber-950/20 rounded-2xl border border-amber-200 dark:border-amber-900/50 flex gap-4">
                    <Info className="w-6 h-6 text-amber-600 shrink-0" />
                    <p className="text-sm text-amber-800 dark:text-amber-400 font-medium">
                        <strong>Safety Warning:</strong> These tests require maximum effort. If you have pre-existing heart conditions, respiratory issues, or are over 45 and physically inactive, consult a GP before performing these fitness assessments.
                    </p>
                </div>
            </section>

            {/* Benchmarks Section */}
            <section className="mb-20">
                <h2 className="text-3xl font-black mb-8 text-center">Fitness Benchmarks (Male/Female)</h2>
                <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-900 text-slate-500 uppercase text-xs font-bold tracking-widest">
                                <th className="p-5 border-b border-slate-200 dark:border-slate-800">Category</th>
                                <th className="p-5 border-b border-slate-200 dark:border-slate-800 text-blue-600">Male (30-39)</th>
                                <th className="p-5 border-b border-slate-200 dark:border-slate-800 text-pink-500">Female (30-39)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 whitespace-nowrap">
                            <tr>
                                <td className="p-5 font-bold text-blue-600">Superior</td>
                                <td className="p-5">52.5+</td>
                                <td className="p-5">48+</td>
                            </tr>
                            <tr>
                                <td className="p-5 font-bold text-green-600">Excellent</td>
                                <td className="p-5">44.0 - 52.4</td>
                                <td className="p-5">38.0 - 47.9</td>
                            </tr>
                            <tr>
                                <td className="p-5 font-bold text-yellow-600">Good</td>
                                <td className="p-5">35.0 - 43.9</td>
                                <td className="p-5">31.0 - 37.9</td>
                            </tr>
                            <tr>
                                <td className="p-5 font-bold text-orange-600">Fair</td>
                                <td className="p-5">30.0 - 34.9</td>
                                <td className="p-5">26.0 - 30.9</td>
                            </tr>
                            <tr>
                                <td className="p-5 font-bold text-red-600">Poor</td>
                                <td className="p-5">&lt; 30.0</td>
                                <td className="p-5">&lt; 26.0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="mt-4 text-xs text-slate-500 text-center uppercase tracking-widest font-bold">
                    Data based on ACSM Physical Fitness Guidelines
                </p>
            </section>

            {/* FAQ Section */}
            <section className="mb-20">
                <h2 className="text-3xl font-black mb-12 text-center flex items-center justify-center gap-3">
                    <HelpCircle className="w-8 h-8 text-primary" />
                    Common Questions
                </h2>
                <FAQAccordion faqs={faqs} />
            </section>

            {/* Trust Quote */}
            <div className="p-12 rounded-[3rem] bg-slate-900 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Award className="w-40 h-40" />
                </div>
                <p className="text-2xl font-serif italic mb-6">
                    "Your VO2 Max is your physiological potential. While some of it is genetic, most of it is earned through consistent, quality training."
                </p>
                <p className="font-bold text-primary uppercase tracking-widest text-sm">— Calzone Health Methodology</p>
            </div>
        </div>
    );
}
