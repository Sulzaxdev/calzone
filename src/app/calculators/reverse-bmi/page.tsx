import { ReverseBMICalculatorForm } from "./calculator";
import {
    Target,
    BookOpen,
    Info,
    TrendingUp,
    ShieldAlert,
    HelpCircle,
    ArrowRight,
    Scale,
    Weight,
    Stethoscope,
    Brain,
    Activity,
    CheckCircle2
} from "lucide-react";

export const metadata = {
    title: "Reverse BMI Calculator | Find Your Target Weight",
    description: "Use our Reverse BMI calculator to find the exact weight you need for a target BMI. Set realistic goals and understand healthy weight ranges with our expert guide.",
};

export default function ReverseBMIPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            {/* Calculator Component */}
            <ReverseBMICalculatorForm />

            {/* SEO Content Section */}
            <section className="container mx-auto px-4 max-w-7xl mt-12 space-y-12">

                {/* 1. Primary Guide Section */}
                <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-lg">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="bg-indigo-100 dark:bg-indigo-900/40 p-3 rounded-2xl">
                            <Target className="w-8 h-8 text-indigo-600" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-100">
                            Understanding Reverse BMI
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 text-slate-700 dark:text-slate-300">
                        <div className="space-y-6">
                            <p className="text-lg leading-relaxed">
                                Most people use a BMI calculator to find out their current status. A <strong>Reverse BMI Calculator</strong> works backward: you choose a "Goal BMI" and it tells you exactly how much you need to weigh to get there.
                            </p>
                            <p className="text-lg leading-relaxed">
                                This is an incredibly powerful tool for goal setting. Instead of guessing a random weight, you can base your target on clinically recognized health categories.
                            </p>
                            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-3xl border border-indigo-100 dark:border-indigo-800">
                                <h3 className="font-bold text-indigo-900 dark:text-indigo-300 mb-2 flex items-center gap-2">
                                    <Brain className="w-5 h-5" /> Goal Setting Logic
                                </h3>
                                <p className="text-sm">
                                    For most adults, a BMI between <strong>18.5 and 24.9</strong> is considered the healthy range. Setting your target BMI within this window ensures your goal weight is medically sound.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <Scale className="w-6 h-6 text-primary" /> The Reverse Formula
                            </h3>
                            <p className="leading-relaxed">
                                Under the hood, we use a algebraic transposition of the standard BMI formula. For a given height and target BMI, the required weight is:
                            </p>
                            <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden text-center">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full translate-x-10 -translate-y-10" />
                                <span className="block text-xs font-bold text-slate-500 uppercase mb-4 tracking-widest">Mathematical Proof</span>
                                <code className="text-2xl font-mono text-primary font-bold">W = BMI × H²</code>
                                <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                                    Where <strong>W</strong> is Weight (kg), <strong>BMI</strong> is your target, and <strong>H</strong> is Height in meters.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Healthy Weight Zones */}
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-lg">
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <TrendingUp className="w-7 h-7 text-green-500" />
                            Target BMI Benchmarks
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
                                <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Lower Healthy Limit</span>
                                <span className="text-2xl font-black text-blue-500">18.5 BMI</span>
                                <p className="text-sm text-slate-500 mt-2">The minimum weight considered healthy for your height.</p>
                            </div>
                            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
                                <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Ideal Median</span>
                                <span className="text-2xl font-black text-green-500">22.0 BMI</span>
                                <p className="text-sm text-slate-500 mt-2">Often considered the 'sweet spot' for most populations.</p>
                            </div>
                            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
                                <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Upper Healthy Limit</span>
                                <span className="text-2xl font-black text-orange-500">24.9 BMI</span>
                                <p className="text-sm text-slate-500 mt-2">The maximum weight before entering 'Overweight' status.</p>
                            </div>
                            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
                                <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Overweight Threshold</span>
                                <span className="text-2xl font-black text-red-500">25.0 BMI</span>
                                <p className="text-sm text-slate-500 mt-2">The point where health risks begin to slightly increase.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-primary text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 blur-[80px] rounded-full" />
                        <h3 className="text-2xl font-black mb-6 leading-tight">Why Use Reverse BMI?</h3>
                        <ul className="space-y-6">
                            <li className="flex gap-4">
                                <CheckCircle2 className="w-6 h-6 shrink-0 text-white/60" />
                                <p className="text-sm font-medium">Create medically-backed fitness goals.</p>
                            </li>
                            <li className="flex gap-4">
                                <CheckCircle2 className="w-6 h-6 shrink-0 text-white/60" />
                                <p className="text-sm font-medium">Understand your 'healthy window'.</p>
                            </li>
                            <li className="flex gap-4">
                                <CheckCircle2 className="w-6 h-6 shrink-0 text-white/60" />
                                <p className="text-sm font-medium">Track your distance from target BMI.</p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* FAQ and Guidance */}
                <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-12 rounded-[3rem] shadow-lg">
                    <h3 className="text-3xl font-black mb-12 flex items-center gap-3">
                        <HelpCircle className="w-10 h-10 text-primary" />
                        Expert Guidance
                    </h3>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h4 className="text-xl font-bold flex items-center gap-2">
                                <Stethoscope className="w-6 h-6 text-red-500" /> Medical Context
                            </h4>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                BMI is a screening tool, not a diagnostic one. If you have significant muscle mass (athletes) or are an older adult, your target BMI might need adjustment. Always consult with a healthcare professional before starting a major weight loss or weight gain journey.
                            </p>
                            <div className="p-6 bg-red-50 dark:bg-red-950/20 rounded-2xl border border-red-100 dark:border-red-900/30 font-bold text-red-800 dark:text-red-400 italic text-sm">
                                "Health is more than just a number on the scale. Focus on energy levels, blood markers, and physical capability."
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-xl font-bold flex items-center gap-2">
                                <BookOpen className="w-6 h-6 text-blue-500" /> FAQ
                            </h4>
                            <div className="space-y-4">
                                <details className="group cursor-pointer">
                                    <summary className="font-bold text-slate-900 dark:text-slate-100 list-none flex justify-between items-center bg-slate-50 dark:bg-slate-900 p-4 rounded-xl">
                                        Is a 22.0 BMI perfect for everyone?
                                        <ArrowRight className="w-4 h-4 group-open:rotate-90 transition-transform" />
                                    </summary>
                                    <p className="p-4 text-sm text-slate-500">
                                        While 22.0 is the statistical median, your specific body type, ethnicity, and genetics might mean a slightly higher or lower BMI is healthier for you.
                                    </p>
                                </details>
                                <details className="group cursor-pointer">
                                    <summary className="font-bold text-slate-900 dark:text-slate-100 list-none flex justify-between items-center bg-slate-50 dark:bg-slate-900 p-4 rounded-xl">
                                        How accurate is the weight target?
                                        <ArrowRight className="w-4 h-4 group-open:rotate-90 transition-transform" />
                                    </summary>
                                    <p className="p-4 text-sm text-slate-500">
                                        The math is 100% accurate based on the standard BMI formula. However, this doesn't account for 'Body Composition' (water vs muscle vs fat).
                                    </p>
                                </details>
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
                            This tool provides mathematical estimates and should not be used as medical advice. Your ideal weight depends on multiple factors including age, sex, and physical activity levels.
                        </p>
                    </div>
                </div>

            </section>
        </div>
    );
}


