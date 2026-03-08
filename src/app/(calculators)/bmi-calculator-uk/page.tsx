import { Activity, Scale, ShieldAlert, BookOpen, AlertCircle, HeartPulse, HelpCircle, TrendingUp, Info, Microscope, Users, History, Brain, Apple, Flame, ChevronRight } from "lucide-react";
import { BMICalculatorForm } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "BMI Calculator UK | Healthy Weight Range & Body Mass Index",
    description: "Calculate your Body Mass Index (BMI) using our expert tool. Deep dive into weight categories, metabolic health, ethnic cut-offs, and fitness optimization.",
};

export default function BMIPage() {
    const bmiFaqs = [
        {
            question: "Can BMI be used for children?",
            answer: "Yes, but interpreted differently. For children and teens, BMI is adjusted for age and gender. It is communicated as a percentile (e.g., 85th percentile), comparing the child to a peer group of the same age and sex."
        },
        {
            question: "Why is BMI still used if it has limitations?",
            answer: "It remains the primary tool because it is inexpensive, non-invasive, and standardized globally. It allows doctors and researchers to track health trends across millions of people with high reliability."
        },
        {
            question: "Is a BMI of 27 always 'Overweight'?",
            answer: "Technically yes by WHO standards, but clinically, a doctor will check your blood pressure, lipid profile, and blood sugar. If those are perfect and you have high muscle mass, a 27 BMI may not be a health concern."
        },
        {
            question: "Does BMI account for bone density?",
            answer: "No. Individuals with high bone density (often athletes or those with specific genetic backgrounds) might weigh more, pushing their BMI higher without necessarily having excess fat."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <BreadcrumbSchema items={[
                { name: "Home", item: "/" },
                { name: "General Health", item: "/general-health" },
                { name: "BMI Calculator UK", item: "/bmi-calculator-uk" }
            ]} />
            <CalculatorSchema
                title="BMI Calculator UK | Healthy Weight Range & Body Mass Index"
                description="Calculate your Body Mass Index (BMI) using our expert tool. Deep dive into weight categories, metabolic health, ethnic cut-offs, and fitness optimization."
                slug="/bmi-calculator-uk"
                faqs={bmiFaqs}
            />
            {/* The Interactive Calculator Component */}
            <BMICalculatorForm />

            {/* Massive SEO Content Section */}
            <section className="container mx-auto px-4 max-w-7xl mt-12 space-y-12">

                {/* 1. Primary Guide Section */}
                <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-lg">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                        <BookOpen className="w-8 h-8 text-blue-500" />
                        BMI Calculator: The Definitive Guide to Body Mass Index & Metabolic Health
                    </h2>

                    <div className="space-y-12 text-slate-700 dark:text-slate-300">
                        {/* Intro */}
                        <div className="grid md:grid-cols-2 gap-8 items-start">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                    <HelpCircle className="w-6 h-6 text-blue-500" /> What is BMI?
                                </h3>
                                <p className="text-lg leading-relaxed">
                                    <strong>Body Mass Index (BMI)</strong> is a simple yet effective health measurement that determines if your weight is in a healthy range relative to your height. Used globally by organizations like the <strong>World Health Organization (WHO)</strong> and the <strong>CDC</strong>, it serves as a primary screening tool for weight-related health risks.
                                </p>
                                <p className="leading-relaxed">
                                    First developed in the early 19th century, BMI has evolved from a simple statistical tool into a cornerstone of clinical health assessments. While it doesn't measure body fat directly, research has shown that BMI is moderately correlated with more direct measures of body fat, such as skinfold thickness measurements, bioelectrical impedance, and dual-energy X-ray absorptiometry (DXA).
                                </p>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4 uppercase text-xs tracking-widest">Mathematics of BMI (Quetelet Index)</h4>
                                <div className="space-y-4">
                                    <div>
                                        <span className="block text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">Metric Standard:</span>
                                        <code className="bg-white dark:bg-black px-3 py-2 rounded-lg text-sm block border border-slate-200 dark:border-slate-700">BMI = Weight (kg) ÷ Height (m²)</code>
                                    </div>
                                    <p className="text-xs text-slate-500">The metric formula is the global clinical standard used for research and medical records.</p>
                                    <div>
                                        <span className="block text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">Imperial Standard:</span>
                                        <code className="bg-white dark:bg-black px-3 py-2 rounded-lg text-sm block border border-slate-200 dark:border-slate-700">BMI = (Weight × 703) ÷ Height²</code>
                                    </div>
                                    <p className="text-xs text-slate-500">Primarily used in the United States and territories following US customary units.</p>
                                </div>
                            </div>
                        </div>

                        {/* Categories Table */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                <Scale className="w-6 h-6 text-green-500" /> Official UK NHS & WHO BMI Categories for Adults
                            </h3>
                            <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-slate-100 dark:bg-slate-800">
                                        <tr>
                                            <th className="p-4 font-bold text-slate-900 dark:text-slate-100">BMI Range</th>
                                            <th className="p-4 font-bold text-slate-900 dark:text-slate-100">Category</th>
                                            <th className="p-4 font-bold text-slate-900 dark:text-slate-100 hidden md:table-cell">Health Risk Level</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                        <tr>
                                            <td className="p-4">Below 18.5</td>
                                            <td className="p-4 text-blue-500 font-semibold">Underweight</td>
                                            <td className="p-4 hidden md:table-cell text-slate-500 italic">Moderate (Nutritional Deficiencies)</td>
                                        </tr>
                                        <tr className="bg-green-50/30 dark:bg-green-900/10">
                                            <td className="p-4">18.5 – 24.9</td>
                                            <td className="p-4 text-green-600 font-semibold">Healthy Weight</td>
                                            <td className="p-4 hidden md:table-cell text-slate-500 italic">Minimal Risk</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4">25 – 29.9</td>
                                            <td className="p-4 text-yellow-600 font-semibold">Overweight</td>
                                            <td className="p-4 hidden md:table-cell text-slate-500 italic">Increased risk of chronic issues</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4">30 – 34.9</td>
                                            <td className="p-4 text-orange-500 font-semibold">Obesity (Class 1)</td>
                                            <td className="p-4 hidden md:table-cell text-slate-500 italic">High metabolic risk</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4">35 – 39.9</td>
                                            <td className="p-4 text-red-500 font-semibold">Obesity (Class 2)</td>
                                            <td className="p-4 hidden md:table-cell text-slate-500 italic">Very high clinical risk</td>
                                        </tr>
                                        <tr className="bg-red-50/30 dark:bg-red-900/10">
                                            <td className="p-4">40+</td>
                                            <td className="p-4 text-red-700 font-bold">Severe Obesity</td>
                                            <td className="p-4 hidden md:table-cell text-slate-500 italic">Critical / Emergency health risk</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Ethnic Variations & Cut-offs */}
                        <div className="bg-indigo-50/50 dark:bg-indigo-950/10 border border-indigo-100 dark:border-indigo-900/30 p-8 rounded-[2rem] space-y-6">
                            <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
                                <Users className="w-6 h-6 text-indigo-500" /> Ethnic Differences in BMI Interpretation
                            </h3>
                            <p className="leading-relaxed">
                                Research has indicated that the standard WHO BMI cut-offs may not accurately reflect health risks across different ethnicities. For instance, the <strong>Asian population</strong> typically has a higher percentage of body fat at a lower BMI than the Caucasian population.
                            </p>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h4 className="font-bold flex items-center gap-2 text-indigo-800 dark:text-indigo-400">
                                        <ChevronRight className="w-4 h-4" /> South & East Asian Guidelines
                                    </h4>
                                    <p className="text-sm">Many health organizations in Asia use adjusted BMI categories:</p>
                                    <ul className="text-sm space-y-1 list-disc list-inside">
                                        <li>Overweight: ≥ 23.0 kg/m²</li>
                                        <li>Obese: ≥ 25.0 kg/m²</li>
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="font-bold flex items-center gap-2 text-indigo-800 dark:text-indigo-400">
                                        <ChevronRight className="w-4 h-4" /> Why the difference?
                                    </h4>
                                    <p className="text-sm">These adjustments are made because metabolic risks like <strong>Type 2 Diabetes</strong> and <strong>Cardiovascular Disease</strong> appear at lower BMI levels in Asian individuals due to differing body fat distributions (specifically visceral fat).</p>
                                </div>
                            </div>
                        </div>

                        {/* History Section */}
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="md:col-span-2 space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                    <History className="w-6 h-6 text-slate-500" /> A Brief History of the Quetelet Index
                                </h3>
                                <p>
                                    The Body Mass Index was originally called the <strong>Quetelet Index</strong>, named after its inventor, Adolphe Quetelet. A Belgian polymath—astronomer, mathematician, statistician, and sociologist—Quetelet devised the formula between 1830 and 1850. Interestingly, he was not a doctor; he was interested in "social physics" and defining the "average man" (l'homme moyen).
                                </p>
                                <p>
                                    It wasn't until 1972 that the term "Body Mass Index" was coined by Ancel Keys, who published a landmark paper proving BMI was a superior indicator of relative body fat than simple height-weight tables. Since then, it has become the gold standard for global health surveillance.
                                </p>
                            </div>
                            <div className="bg-slate-900 text-white p-6 rounded-2xl flex flex-col justify-center items-center text-center shadow-xl">
                                <Scale className="w-12 h-12 text-primary mb-4" />
                                <h4 className="font-bold text-lg mb-2">Did you know?</h4>
                                <p className="text-sm text-slate-400">BMI was originally meant to study populations, not individual health. Modern medicine adapted it because of its high correlation with heart disease risks.</p>
                            </div>
                        </div>

                        {/* Deep Health Metrics */}
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                    <Microscope className="w-6 h-6 text-purple-500" /> BMI vs. Body Composition
                                </h3>
                                <p>Understanding the difference between <strong>weight</strong> and <strong>mass composition</strong> is vital for fitness enthusiasts and athletes.</p>
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="h-10 w-10 shrink-0 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center font-bold text-purple-600">1</div>
                                        <div>
                                            <h5 className="font-bold mb-1">Muscle is Denser</h5>
                                            <p className="text-sm">Muscle tissue is approximately 18% denser than fat tissue. A athlete with high muscle mass might have the same BMI as someone with high body fat, but their health profiles are vastly different.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="h-10 w-10 shrink-0 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center font-bold text-purple-600">2</div>
                                        <div>
                                            <h5 className="font-bold mb-1">Visceral Fat Risk</h5>
                                            <p className="text-sm">BMI cannot identify where fat is located. Fat stored around the internal organs (visceral fat) is significantly more dangerous than fat stored under the skin (subcutaneous fat).</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                    <Brain className="w-6 h-6 text-orange-400" /> The Role of Age and Gender
                                </h3>
                                <p className="text-sm leading-relaxed">
                                    Aging affects the accuracy of BMI. Elderly people often lose height and gain fat while losing muscle mass. This "sarcopenia" means an older person with a "Healthy" BMI might actually have high levels of body fat.
                                </p>
                                <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-xl border border-orange-100 dark:border-orange-900/30">
                                    <p className="text-xs font-bold text-orange-800 dark:text-orange-400 uppercase mb-1">Women vs Men</p>
                                    <p className="text-xs italic text-slate-600 dark:text-slate-400">Women typically naturally have a higher percentage of body fat than men at the same BMI value to support hormonal health and potential pregnancy.</p>
                                </div>
                            </div>
                        </div>

                        {/* Nutrition and Fitness Integration */}
                        <div className="space-y-8">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                <Activity className="w-6 h-6 text-red-500" /> Lifestyle Interventions Based on BMI
                            </h3>
                            <div className="grid md:grid-cols-4 gap-4">
                                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all">
                                    <Apple className="w-8 h-8 text-green-500 mb-3" />
                                    <h4 className="font-bold text-sm mb-2 uppercase">Balanced Nutrition</h4>
                                    <p className="text-xs text-slate-500">Focus on whole grains, lean proteins, and healthy fats to regulate metabolic markers regardless of BMI category.</p>
                                </div>
                                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all">
                                    <Flame className="w-8 h-8 text-orange-500 mb-3" />
                                    <h4 className="font-bold text-sm mb-2 uppercase">Calorie Management</h4>
                                    <p className="text-xs text-slate-500">Understand your Basal Metabolic Rate (BMR) to create a sustainable calorie deficit or surplus for weight goals.</p>
                                </div>
                                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all">
                                    <HeartPulse className="w-8 h-8 text-red-500 mb-3" />
                                    <h4 className="font-bold text-sm mb-2 uppercase">Cardio Health</h4>
                                    <p className="text-xs text-slate-500">150 minutes of moderate intensity exercise is the gold standard for reducing cardiovascular risk associated with high BMI.</p>
                                </div>
                                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all">
                                    <Activity className="w-8 h-8 text-blue-500 mb-3" />
                                    <h4 className="font-bold text-sm mb-2 uppercase">Strength Training</h4>
                                    <p className="text-xs text-slate-500">Building lean muscle mass increases metabolic rate and improves body composition even if the total weight remains stable.</p>
                                </div>
                            </div>
                        </div>

                        {/* Data Sources & Methodology */}
                        <div className="space-y-4 pt-8 border-t border-slate-200 dark:border-slate-800">
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-indigo-500" /> Data Sources & Methodology
                            </h3>
                            <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-2">
                                <li><strong>National Health Service (NHS):</strong> BMI guidelines and ethnic risk adjustments are based on official NHS clinical guidelines.</li>
                                <li><strong>World Health Organization (WHO):</strong> Global classification system for adult weight (Quetelet Index standard).</li>
                                <li><strong>Public Health England:</strong> Adult obesity data and statistical methodology applied to population health.</li>
                            </ul>
                        </div>

                        {/* FAQ Accordion */}
                        <FAQAccordion faqs={bmiFaqs} title="Frequently Asked Questions (BMI)" />

                        {/* Recent Health Trends Placeholder for more content */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                <TrendingUp className="w-6 h-6 text-blue-500" /> Leading Health Policy & Obesity Research
                            </h3>
                            <p className="leading-relaxed">
                                Recent pharmaceutical breakthroughs (like GLP-1 agonists) have placed a spotlight on obesity management. Medical professionals are shifting from "shaming the scale" to holistic "Metabolic Health". This means looking at BMI in conjunction with insulin sensitivity, heart rate variability, and inflammation markers like C-reactive protein (CRP).
                            </p>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="border-l-4 border-blue-500 pl-4 py-2">
                                    <h4 className="font-bold text-sm mb-1 uppercase tracking-tight">Digital Health Integration</h4>
                                    <p className="text-xs text-slate-500">Wearables and smart scales are making it easier for individuals to track BMI trends over months rather than one-off yearly checks.</p>
                                </div>
                                <div className="border-l-4 border-green-500 pl-4 py-2">
                                    <h4 className="font-bold text-sm mb-1 uppercase tracking-tight">Personalized Nutrition</h4>
                                    <p className="text-xs text-slate-500">AI-driven nutrition is helping people find the right diet for their specific BMI and body type to achieve long-term success.</p>
                                </div>
                                <div className="border-l-4 border-purple-500 pl-4 py-2">
                                    <h4 className="font-bold text-sm mb-1 uppercase tracking-tight">Preventative Medicine</h4>
                                    <p className="text-xs text-slate-500">Standardizing BMI tracking early in life is shown to drastically reduce the onset of Type 2 Diabetes in adulthood.</p>
                                </div>
                            </div>
                        </div>

                        {/* Final Disclaimer */}
                        <div className="mt-12 bg-red-100/50 dark:bg-red-950/20 p-8 rounded-3xl border border-red-200 dark:border-red-900/30 flex gap-6 items-start">
                            <ShieldAlert className="w-10 h-10 text-red-600 shrink-0 mt-1" />
                            <div>
                                <h4 className="text-xl font-bold text-red-800 dark:text-red-400">Strict Medical Disclaimer</h4>
                                <p className="text-sm text-red-700 dark:text-red-300 mt-2 leading-relaxed font-medium">
                                    The information provided by this BMI Calculator is for educational and general informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.
                                    <br /><br />
                                    Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition or weight management strategy. Never disregard professional medical advice or delay in seeking it because of something you have read on this website.
                                    <br /><br />
                                    Individuals under 18, pregnant or breastfeeding women, and high-performance athletes should consult specialists as standard BMI metrics may not accurately apply to their unique physiological states.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
