import { ChildBMICalculatorForm } from "./calculator";
import {
    Activity,
    Baby,
    BookOpen,
    Calculator,
    TrendingUp,
    Info,
    Stethoscope,
    Users,
    ShieldAlert,
    Microscope,
    History,
    Apple,
    Flame,
    Navigation,
    Scale,
    HeartPulse,
    AlertCircle,
    Brain,
    HelpCircle,
    Moon
} from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Child BMI Calculator | Percentile Chart & Healthy Weight Guide",
    description: "Calculate your child's BMI-for-age percentile with high precision. Understand WHO/CDC growth charts, height predictors, and healthy lifestyle tips for children and teens (2–20 years).",
};

export default function ChildBMIPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            {/* 1. Calculator Section */}
            <ChildBMICalculatorForm />

            {/* 2. Massive SEO Content Section */}
            <section className="container mx-auto px-4 max-w-7xl mt-12 space-y-12">

                {/* Intro Card */}
                <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-xl">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="bg-primary/10 p-3 rounded-2xl">
                            <Baby className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-100">
                            Child BMI vs Adult BMI: What You Need to Know
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 text-slate-700 dark:text-slate-300">
                        <div className="space-y-6">
                            <p className="text-lg leading-relaxed">
                                Child BMI is significantly different from adult BMI. In adults, BMI is a static range (e.g., 25+ is overweight). However, children are constantly growing, and their body composition changes rapidly by age and gender.
                            </p>
                            <p className="text-lg leading-relaxed">
                                This is why medical professionals use <strong>BMI-for-age percentiles</strong>. These percentiles compare your child's BMI to thousands of other children of the same exact age and gender to determine if they are growing at a healthy rate.
                            </p>
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-3xl border border-blue-100 dark:border-blue-800">
                                <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-2 flex items-center gap-2">
                                    <Info className="w-5 h-5" /> International Standards
                                </h3>
                                <p className="text-sm">
                                    Our system utilizes internationally recognized growth standards from the <strong>World Health Organization (WHO)</strong> and the <strong>Centers for Disease Control (CDC)</strong>.
                                </p>
                            </div>
                        </div>

                        <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full translate-x-10 -translate-y-10" />
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <TrendingUp className="w-6 h-6 text-primary" /> Key Differences
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between border-b border-white/10 pb-4">
                                    <span className="text-slate-400">Feature</span>
                                    <span className="font-bold">Adults vs Children</span>
                                </div>
                                <div className="flex justify-between border-b border-white/10 pb-4">
                                    <span className="text-slate-400">Scale</span>
                                    <span className="font-bold">Fixed vs Percentile</span>
                                </div>
                                <div className="flex justify-between border-b border-white/10 pb-4">
                                    <span className="text-slate-400">Gender</span>
                                    <span className="font-bold">Generic vs Specific</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Growth Charts</span>
                                    <span className="font-bold text-primary">Required</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Calculation Methodology */}
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-lg">
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <Calculator className="w-7 h-7 text-indigo-500" />
                            How Child BMI is Calculated
                        </h3>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="bg-slate-100 dark:bg-slate-800 w-10 h-10 rounded-full flex items-center justify-center font-bold text-primary shrink-0">1</div>
                                <div>
                                    <h4 className="font-bold text-lg mb-2 uppercase tracking-tight">The Basic Formula</h4>
                                    <p className="text-slate-600 dark:text-slate-400 mb-4">The initial BMI calculation for children follows the same mathematical principles as adults:</p>
                                    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row justify-around items-center gap-6">
                                        <div className="text-center">
                                            <span className="block text-xs font-bold text-slate-400 uppercase mb-2">Metric</span>
                                            <code className="text-indigo-600 font-mono text-lg">Weight (kg) ÷ Height (m²)</code>
                                        </div>
                                        <div className="text-center">
                                            <span className="block text-xs font-bold text-slate-400 uppercase mb-2">Imperial</span>
                                            <code className="text-indigo-600 font-mono text-lg">(Weight (lb) × 703) ÷ Height (in²)</code>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-slate-100 dark:bg-slate-800 w-10 h-10 rounded-full flex items-center justify-center font-bold text-primary shrink-0">2</div>
                                <div>
                                    <h4 className="font-bold text-lg mb-2 uppercase tracking-tight font-urdu">⚠️ The Percentile Step (Crucial)</h4>
                                    <p className="text-slate-600 dark:text-slate-400">Unlike adults, the raw BMI number is NOT the final result. We must cross-reference this value with the child's exact age and gender on a growth chart to find their <strong className="text-slate-900 dark:text-slate-100">Percentile Range</strong>.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-indigo-600 text-white p-10 rounded-[2.5rem] shadow-2xl space-y-6 relative overflow-hidden">
                        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 blur-[100px] rounded-full" />
                        <h3 className="text-2xl font-bold leading-tight">Understanding Percentiles (2024 Guidelines)</h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
                                <span className="block text-sm font-bold opacity-60 mb-1">Below 5th</span>
                                <span className="text-xl font-black">Underweight</span>
                            </div>
                            <div className="p-4 bg-green-500 rounded-2xl border border-white/20 shadow-lg">
                                <span className="block text-sm font-bold opacity-80 mb-1">5th – 84th</span>
                                <span className="text-xl font-black">Healthy Weight</span>
                            </div>
                            <div className="p-4 bg-orange-500 rounded-2xl border border-white/20">
                                <span className="block text-sm font-bold opacity-80 mb-1">85th – 94th</span>
                                <span className="text-xl font-black">Overweight</span>
                            </div>
                            <div className="p-4 bg-red-500 rounded-2xl border border-white/20">
                                <span className="block text-sm font-bold opacity-80 mb-1">95th & Above</span>
                                <span className="text-xl font-black">Obese</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Deep Health Context - Age Range & Examples */}
                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] overflow-hidden">
                    <div className="grid md:grid-cols-2">
                        <div className="p-12 space-y-8 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="bg-indigo-100 dark:bg-indigo-900/40 p-3 rounded-2xl">
                                    <History className="w-6 h-6 text-indigo-600" />
                                </div>
                                <h3 className="text-2xl font-bold italic">Age-Specific Rules</h3>
                            </div>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="text-sm font-black text-slate-400 py-2">0-2Y</div>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">BMI is not used. Pediatricians utilize <strong>Weight-for-length</strong> charts to measure early nutrition and density.</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="text-sm font-black text-indigo-500 py-2">2-20Y</div>
                                    <p className="text-slate-900 dark:text-slate-100 leading-relaxed font-semibold">BMI-for-age percentiles are the clinical standard for tracking adiposity and metabolic risk.</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-12 space-y-8 bg-white dark:bg-card/30">
                            <div className="flex items-center gap-3">
                                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl">
                                    <Brain className="w-6 h-6 text-slate-600" />
                                </div>
                                <h3 className="text-2xl font-bold">A Real-World Example</h3>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                                <p className="mb-4 font-mono text-sm text-slate-500 uppercase tracking-widest">Scenario Analysis</p>
                                <ul className="space-y-4">
                                    <li className="flex justify-between border-b pb-2"><span className="text-slate-500">Age:</span> <span className="font-bold">8 Years</span></li>
                                    <li className="flex justify-between border-b pb-2"><span className="text-slate-500">Gender:</span> <span className="font-bold">Boy</span></li>
                                    <li className="flex justify-between border-b pb-2"><span className="text-slate-500">BMI:</span> <span className="font-bold">17.75</span></li>
                                    <li className="flex justify-between text-indigo-600 font-bold"><span className="font-bold">Percentile:</span> <span>60th (Healthy)</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Advanced Features & Usage Guide */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-lg">
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <Navigation className="w-7 h-7 text-blue-500" />
                            How to Use for Accuracy
                        </h3>
                        <div className="space-y-4">
                            {[
                                "Measure weight accurately at home without shoes.",
                                "Measure height standing straight against a wall.",
                                "Enter age with month precision (e.g., 5 years 6 months).",
                                "Select the correct biological gender for chart calibration.",
                                "Analyze the result percentile alongside family genetics.",
                                "Download your PDF report for your next pediatrician visit."
                            ].map((step, i) => (
                                <div key={i} className="flex gap-4 items-center group">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center text-sm font-black shrink-0 group-hover:scale-110 transition-transform">
                                        {i + 1}
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 font-medium">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 rounded-[2.5rem]">
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Stethoscope className="w-7 h-7 text-red-500" />
                            Clinical Warning Signs
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                            While growth is individual, certain patterns on a BMI chart warrant a professional consultation:
                        </p>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="p-5 bg-white dark:bg-card rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                                <AlertCircle className="w-6 h-6 text-orange-500" />
                                <span className="font-bold text-sm">Sudden jump above 95th Percentile</span>
                            </div>
                            <div className="p-5 bg-white dark:bg-card rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                                <AlertCircle className="w-6 h-6 text-blue-500" />
                                <span className="font-bold text-sm">Consistent drop below 5th Percentile</span>
                            </div>
                            <div className="p-5 bg-white dark:bg-card rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                                <Activity className="w-6 h-6 text-indigo-500" />
                                <span className="font-bold text-sm">Weight gain faster than height growth</span>
                            </div>
                            <div className="p-5 bg-white dark:bg-card rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                                <Users className="w-6 h-6 text-slate-400" />
                                <span className="font-bold text-sm">Family history of high blood pressure</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-12 rounded-[3.5rem] shadow-lg">
                    <h3 className="text-3xl font-black mb-12 flex items-center gap-3">
                        <HelpCircle className="w-10 h-10 text-primary" />
                        Frequently Asked Questions
                    </h3>
                    <div className="grid md:grid-cols-2 gap-12">
                        {[
                            {
                                q: "Can my child be healthy but in a high percentile?",
                                a: "Yes. Muscle mass and bone density (especially in athletic teens) can push the BMI higher without representing excess fat. Always look at the child's overall activity and diet."
                            },
                            {
                                q: "Should I put my child on a diet if they are in the 95th percentile?",
                                a: "Never restrict a child's calories without medical supervision. Focus on increasing physical activity and improving 'Whole Food' nutrition rather than restriction."
                            },
                            {
                                q: "How often should I check their BMI percentile?",
                                a: "Routine checks every 6 months are sufficient unless your pediatrician recommends more frequent monitoring due to specific health concerns."
                            },
                            {
                                q: "Is BMI accurate for toddlers?",
                                a: "BMI is clinically used from age 2. Before that, weight-for-length and head circumference are more reliable markers for developmental progress."
                            }
                        ].map((faq, i) => (
                            <div key={i} className="space-y-4 group">
                                <h4 className="text-lg font-black text-slate-900 dark:text-slate-100 flex gap-2">
                                    <span className="text-primary opacity-40">Q.</span> {faq.q}
                                </h4>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed border-l-2 border-slate-100 dark:border-slate-800 pl-4 group-hover:border-primary transition-colors">
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Current Health Context & Global Trends */}
                <div className="bg-slate-900 text-white p-12 md:p-16 rounded-[4rem] relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full" />
                    <div className="relative z-10 text-center space-y-8">
                        <div className="flex justify-center">
                            <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-md border border-white/10">
                                <Microscope className="w-12 h-12 text-primary" />
                            </div>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black max-w-4xl mx-auto leading-tight">
                            The Modern Childhood Growth Crisis: 2024 Context
                        </h2>
                        <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            Global health agencies (WHO/CDC) report a significant rise in childhood obesity due to increased <strong>Screen Time</strong> and <strong>Ultra-Processed Foods</strong>. Current recommendations emphasize 60 minutes of daily physical play and eliminating sugary beverages.
                        </p>
                        <div className="grid sm:grid-cols-3 gap-6 pt-8">
                            <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                                <Flame className="w-8 h-8 text-primary mb-4 mx-auto" />
                                <span className="block font-black text-xl mb-1">60 Min</span>
                                <span className="text-xs text-slate-500 uppercase">Daily Activity</span>
                            </div>
                            <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                                <Apple className="w-8 h-8 text-green-500 mb-4 mx-auto" />
                                <span className="block font-black text-xl mb-1">Whole Foods</span>
                                <span className="text-xs text-slate-500 uppercase">Nutrient Density</span>
                            </div>
                            <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                                <Moon className="w-8 h-8 text-blue-400 mb-4 mx-auto" />
                                <span className="block font-black text-xl mb-1">Adequate Sleep</span>
                                <span className="text-xs text-slate-500 uppercase">Recovery Growth</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Final Medical Disclaimer */}
                <div className="bg-red-50 dark:bg-red-950/20 p-8 rounded-[2rem] border border-red-200 dark:border-red-900/30 flex flex-col md:flex-row gap-6 items-center">
                    <ShieldAlert className="w-12 h-12 text-red-600 shrink-0" />
                    <div className="text-center md:text-left">
                        <h4 className="font-black text-red-800 dark:text-red-400 uppercase tracking-widest text-sm mb-2">Strict Medical Disclaimer</h4>
                        <p className="text-sm text-red-700 dark:text-red-300 leading-relaxed">
                            This Child BMI Calculator provides educational estimates based on standard growth charts. It <strong>is not</strong> a medical diagnosis. Always consult with a qualified pediatrician for clinical health assessments and growth tracking.
                        </p>
                    </div>
                </div>

            </section>
        </div>
    );
}
