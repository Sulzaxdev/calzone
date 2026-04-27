import { History, Apple, Flame, Navigation, Scale, HeartPulse, AlertCircle, Brain, HelpCircle, Moon, BookOpen, Activity, TrendingUp, ShieldAlert } from "lucide-react";
import { ChildGrowthCalculatorForm } from "./calculator";
import Link from "next/link";

export const metadata = {
    title: "Child Growth Estimator UK | Percentiles & Height Predictor",
    description: "Calculate your child's height, weight, and BMI percentiles using our free UK Child Growth Estimator. Predict adult height and understand growth charts easily.",
};

export default function ChildGrowthPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            {/* The Interactive Calculator Component */}
            <ChildGrowthCalculatorForm />

            {/* Deep Fit Advice & Content Section */}
            <section className="container mx-auto px-4 max-w-7xl mt-12">
                <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-lg">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                        <BookOpen className="w-8 h-8 text-blue-500" />
                        Child Growth Estimator Guide
                    </h2>

                    <div className="space-y-10 text-slate-700 dark:text-slate-300">
                        {/* Intro */}
                        <div>
                            <p className="text-lg leading-relaxed mb-4">
                                A <strong>Child Growth Estimator</strong> is an essential health tool that helps parents and medical professionals calculate a child's height, weight, BMI, and growth percentiles. By comparing your child's measurements against standardized global growth charts, you can easily track their developmental milestones.
                            </p>
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800/30">
                                <h3 className="font-bold text-blue-800 dark:text-blue-300 flex items-center gap-2 mb-2">
                                    <Activity className="w-5 h-5" /> What Does It Measure?
                                </h3>
                                <ul className="list-disc list-inside space-y-2 text-sm md:text-base ml-2 mb-4">
                                    <li><strong>Age:</strong> Evaluates infants (0–24 months) and children/teens (2–18 years).</li>
                                    <li><strong>Gender:</strong> Growth charts are specifically calibrated for Boys and Girls separately.</li>
                                    <li><strong>Height & Weight:</strong> Tracks primary physical development metrics.</li>
                                </ul>
                                <Link href="/child-bmi-calculator" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline group">
                                    Try specialized Child BMI Calculator <TrendingUp className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>

                        {/* Percentiles Explained */}
                        <div className="grid md:grid-cols-2 gap-8 items-start">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                    <Scale className="w-6 h-6 text-indigo-500" /> What is a Growth Percentile?
                                </h3>
                                <p className="leading-relaxed">
                                    A percentile simply tells you where your child ranks compared to others of the exact same age and gender. It is a comparative score, not a grade.
                                </p>
                                <ul className="space-y-3 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <li className="flex items-start gap-3">
                                        <span className="text-indigo-500 font-bold w-12 shrink-0">50th</span>
                                        <span>Exactly average. Half of children are taller/heavier, half are shorter/lighter.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-indigo-500 font-bold w-12 shrink-0">75th</span>
                                        <span>Your child is taller or heavier than 75% of kids their age.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-indigo-500 font-bold w-12 shrink-0">10th</span>
                                        <span>Your child is in the lower range, smaller than 90% of their peers.</span>
                                    </li>
                                </ul>
                                <p className="text-sm font-semibold text-green-600 dark:text-green-400 mt-2">
                                    * Normal, healthy range is generally considered anywhere between the 5th and 95th percentiles.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">How It Is Calculated</h3>
                                <p className="leading-relaxed">
                                    The system takes your child's data and cross-references it with massive statistical databases. The two most common global references are:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mt-2">
                                    <li><strong>WHO Growth Charts:</strong> World Health Organization standards are primarily used for infants and toddlers (0-2 years) to establish ideal international growth patterns under optimal conditions.</li>
                                    <li><strong>CDC Growth Charts:</strong> Centers for Disease Control references are highly popular for older children (2-18 years) to map continued development.</li>
                                </ul>
                                <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-xl">
                                    <span className="font-semibold block mb-1">BMI Calculation:</span>
                                    <code className="text-sm bg-white dark:bg-black px-2 py-1 rounded text-primary">BMI = weight (kg) / height (m²)</code>
                                </div>
                            </div>
                        </div>

                        {/* When to be concerned */}
                        <div className="bg-orange-50 dark:bg-orange-950/20 p-8 rounded-3xl border border-orange-200 dark:border-orange-900/30">
                            <h3 className="text-2xl font-bold text-orange-800 dark:text-orange-400 flex items-center gap-2 mb-4">
                                <AlertCircle className="w-6 h-6" /> When Should You Be Concerned?
                            </h3>
                            <p className="mb-4 text-orange-900 dark:text-orange-200">While every child grows at their own unique pace, pediatricians generally look for "red flags" on the growth chart that might indicate underlying issues:</p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <ul className="list-disc list-inside space-y-2 text-orange-800 dark:text-orange-300">
                                    <li>A sudden, drastic drop across multiple percentile curves.</li>
                                    <li>Dropping consistently below the 5th percentile.</li>
                                </ul>
                                <ul className="list-disc list-inside space-y-2 text-orange-800 dark:text-orange-300">
                                    <li>Spiking consistently above the 95th percentile (concerning for weight).</li>
                                    <li>An inconsistent or erratic growth pattern over several years.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Adult Height Predictor */}
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-4">
                                <HeartPulse className="w-6 h-6 text-red-500" /> Advanced Feature: Adult Height Prediction
                            </h3>
                            <p className="leading-relaxed mb-4">
                                Genetics play a massive role in how tall a child will eventually be. Our calculator uses the widely established <strong>Mid-Parental Height Formula</strong> to give you a rough estimate of your child's final adult stature:
                            </p>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-slate-100 dark:bg-slate-800/50 p-6 rounded-2xl">
                                    <span className="font-bold text-blue-600 dark:text-blue-400 uppercase text-sm tracking-wider block mb-2">For Boys</span>
                                    <p className="font-mono text-sm">(Father's Height + Mother's Height + 13cm) / 2</p>
                                </div>
                                <div className="bg-slate-100 dark:bg-slate-800/50 p-6 rounded-2xl">
                                    <span className="font-bold text-pink-600 dark:text-pink-400 uppercase text-sm tracking-wider block mb-2">For Girls</span>
                                    <p className="font-mono text-sm">(Father's Height + Mother's Height - 13cm) / 2</p>
                                </div>
                            </div>
                            <p className="text-sm text-slate-500 mt-4 italic">Note: These formulas provide an estimate. Environmental factors, nutrition, and general health also significantly impact final grown height.</p>
                        </div>

                        {/* Medical Disclaimer */}
                        <div className="mt-12 bg-red-50 dark:bg-red-950/20 p-6 rounded-xl border border-red-200 dark:border-red-900/30 flex gap-4 items-start">
                            <ShieldAlert className="w-6 h-6 text-red-600 shrink-0 mt-1" />
                            <div>
                                <h4 className="font-bold text-red-800 dark:text-red-400">Important Medical Disclaimer</h4>
                                <p className="text-sm text-red-700 dark:text-red-300 mt-1">This Child Growth Estimator provides educational estimates based on simplified generic curves and mathematical formulas. It is <strong>not</strong> a substitute for professional medical advice, diagnosis, or treatment. Always consult your pediatrician or a qualified healthcare provider for proper evaluation and tracking of your child's growth and development.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
