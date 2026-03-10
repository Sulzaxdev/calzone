import { ShieldAlert, BookOpen, CalendarHeart, HelpCircle, TrendingUp, Baby } from "lucide-react";
import { PregnancyDueDateCalculatorForm } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { RelatedTools } from "@/components/layout/related-tools";

export default function PregnancyDueDatePage() {
    const dueFaqs = [
        {
            question: "How accurate is an estimated due date (EDD)?",
            answer: "An estimated due date is exactly that—an estimate. Only about 4% to 5% of babies are born exactly on their due date. However, a significant majority (around 80%) arrive within a two-week window surrounding the calculated date."
        },
        {
            question: "Why does the doctor's ultrasound date differ from my LMP date?",
            answer: "Calculators use the Last Menstrual Period (LMP) which assumes a perfect 28-day cycle with ovulation on day 14. If you ovulated early or late, the math will be slightly off. A first-trimester ultrasound is considered the most accurate method to date a pregnancy because it measures fetal development directly."
        },
        {
            question: "What does 'term' mean?",
            answer: "A pregnancy is considered 'full term' when you reach 39 weeks. 'Early term' is 37 to 38 weeks. 'Late term' is 41 weeks, and 'postterm' is 42 weeks and beyond."
        },
        {
            question: "How long is a pregnancy actually?",
            answer: "While we often say pregnancy lasts '9 months', it is actually closer to 10 lunar months. Calculating from the first day of the last menstrual period, a standard full-term pregnancy lasts 280 days, or exactly 40 weeks."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <BreadcrumbSchema items={[
                { name: "Home", item: "/" },
                { name: "General Health", item: "/general-health" },
                { name: "Pregnancy Due Date Calculator", item: "/pregnancy-due-date-calculator-uk" }
            ]} />
            <CalculatorSchema
                title="Pregnancy Due Date Calculator UK | Estimated Date of Delivery"
                description="Calculate your estimated pregnancy due date (EDD) and track your trimesters using your last period (LMP), conception date, or IVF transfer."
                slug="/pregnancy-due-date-calculator-uk"
                faqs={dueFaqs}
            />
            {/* The Interactive Calculator Component */}
            <PregnancyDueDateCalculatorForm />

            {/* Massive SEO Organic Content Section */}
            <section className="container mx-auto px-4 max-w-7xl mt-12 space-y-12">

                {/* 1. Primary Guide Section */}
                <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-lg">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                        <BookOpen className="w-8 h-8 text-pink-500" />
                        Understanding Your Estimated Due Date (EDD)
                    </h2>

                    <div className="space-y-12 text-slate-700 dark:text-slate-300">
                        {/* Intro */}
                        <div className="grid md:grid-cols-2 gap-8 items-start">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                    <HelpCircle className="w-6 h-6 text-pink-500" /> What is an EDD?
                                </h3>
                                <p className="text-lg leading-relaxed">
                                    Your <strong>Estimated Due Date (EDD)</strong>, or Estimated Date of Delivery, is the primary cornerstone of your prenatal care. It provides a timeline for healthcare providers to schedule critical developmental scans, blood tests, and prepare for birth.
                                </p>
                                <p className="leading-relaxed">
                                    Historically, predicting the specific day of a baby's arrival is complex. Even today, the EDD serves as the median point of an acceptable birth window. Any delivery between 37 weeks and 42 weeks is considered normal and healthy by modern obstetrics.
                                </p>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4 uppercase text-xs tracking-widest">The Mathematics of Pregnancy</h4>
                                <div className="space-y-4">
                                    <div>
                                        <span className="block text-sm font-semibold text-pink-600 dark:text-pink-400 mb-1">Naegele's Rule:</span>
                                        <code className="bg-white dark:bg-black px-3 py-2 rounded-lg block border border-slate-200 dark:border-slate-700 font-mono text-xs overflow-x-auto text-nowrap whitespace-nowrap overflow-auto hide-scrollbar">EDD = LMP + 7 days - 3 months + 1 year</code>
                                    </div>
                                    <p className="text-xs text-slate-500">This clinical formula, developed by German obstetrician Franz Karl Naegele, has been the global standard for dating pregnancies for over two centuries. It assumes a standard 28-day menstrual cycle.</p>
                                    <div>
                                        <span className="block text-sm font-semibold text-pink-600 dark:text-pink-400 mb-1">Adjusted Calculation:</span>
                                        <code className="bg-white dark:bg-black px-3 py-2 rounded-lg text-sm block border border-slate-200 dark:border-slate-700">Days = 280 + (Cycle Length - 28)</code>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Breakdown of Methods */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                <CalendarHeart className="w-6 h-6 text-rose-500" /> Different Calculation Methods
                            </h3>

                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm border-t-4 border-t-rose-500">
                                    <h4 className="font-bold text-sm mb-1 uppercase text-slate-900 dark:text-white">Last Menstrual Period (LMP)</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed mt-2">The most common method used by doctors. Since exact conception dates are rarely known, the first day of an individual's last period is used as a verified starting point. Pregnancy officially begins counting two weeks before conception actually happens.</p>
                                </div>
                                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm border-t-4 border-t-pink-500">
                                    <h4 className="font-bold text-sm mb-1 uppercase text-slate-900 dark:text-white">Conception Date</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed mt-2">Used when basal body temperature or ovulation tracking strips confirm the exact day of ovulation and conception. The calculator simply adds 266 days (38 weeks) directly to this date.</p>
                                </div>
                                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm border-t-4 border-t-purple-500">
                                    <h4 className="font-bold text-sm mb-1 uppercase text-slate-900 dark:text-white">IVF Transfer</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed mt-2">Due to the precise nature of medical intervention, IVF dating is highly accurate. Calculating EDD involves adding specific days to the transfer date depending on whether a 3-day or 5-day embryo (blastocyst) was used.</p>
                                </div>
                            </div>
                        </div>

                        {/* Dietary Applications */}
                        <div className="grid md:grid-cols-2 gap-12 pt-8 border-t border-slate-100 dark:border-slate-800">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                    <Baby className="w-6 h-6 text-purple-500" /> The Three Trimesters
                                </h3>
                                <p className="leading-relaxed">
                                    A standard 40-week pregnancy is broken into three distinct stages of fetal development and maternal changes.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex gap-3 items-start">
                                        <div className="bg-purple-100 dark:bg-purple-900/50 text-purple-600 rounded-full h-8 w-8 flex items-center justify-center shrink-0 font-bold text-sm mt-1">T1</div>
                                        <div>
                                            <strong className="text-slate-800 dark:text-slate-200 block">First Trimester (Weeks 1-12)</strong>
                                            <p className="text-sm mt-1">The fundamental architecture of the baby is built. By the end of twelve weeks, all basic organ systems exist. Hormonal shifts often trigger morning sickness and fatigue.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <div className="bg-purple-100 dark:bg-purple-900/50 text-purple-600 rounded-full h-8 w-8 flex items-center justify-center shrink-0 font-bold text-sm mt-1">T2</div>
                                        <div>
                                            <strong className="text-slate-800 dark:text-slate-200 block">Second Trimester (Weeks 13-26)</strong>
                                            <p className="text-sm mt-1">Usually deemed the most comfortable phase. Energy returns, and anatomical ultrasound anomalies are checked around week 20. Fetal movement (quickening) is typically felt.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <div className="bg-purple-100 dark:bg-purple-900/50 text-purple-600 rounded-full h-8 w-8 flex items-center justify-center shrink-0 font-bold text-sm mt-1">T3</div>
                                        <div>
                                            <strong className="text-slate-800 dark:text-slate-200 block">Third Trimester (Weeks 27-40+)</strong>
                                            <p className="text-sm mt-1">Rapid final growth and weight gain for the baby. Lung and brain maturity are finalized. The mother begins preparing physiologically and mechanically for labor.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-pink-50/50 dark:bg-pink-950/10 p-8 rounded-[2rem] border border-pink-100 dark:border-pink-900/30 space-y-4">
                                <h3 className="text-2xl font-bold text-pink-900 dark:text-pink-300 flex items-center gap-2">
                                    <TrendingUp className="w-6 h-6 text-pink-500" /> When Are Babies Actually Born?
                                </h3>
                                <p className="text-sm leading-relaxed text-pink-900 dark:text-pink-200">
                                    Only a fraction of pregnancies culminate precisely on the EDD. Modern studies suggest shifting perspective from a "Due Date" to a "Due Month".
                                </p>
                                <div className="space-y-3 mt-4">
                                    <div className="flex justify-between text-sm items-center border-b border-pink-200/50 dark:border-pink-800 pb-2">
                                        <span className="font-semibold text-pink-800 dark:text-pink-300">Born on EDD</span>
                                        <span className="bg-pink-200 dark:bg-pink-900 px-2 py-1 rounded text-pink-900 dark:text-pink-200 font-mono">4.0%</span>
                                    </div>
                                    <div className="flex justify-between text-sm items-center border-b border-pink-200/50 dark:border-pink-800 pb-2">
                                        <span className="font-semibold text-pink-800 dark:text-pink-300">Days 39-40</span>
                                        <span className="bg-pink-200 dark:bg-pink-900 px-2 py-1 rounded text-pink-900 dark:text-pink-200 font-mono">≈ 26%</span>
                                    </div>
                                    <div className="flex justify-between text-sm items-center border-b border-pink-200/50 dark:border-pink-800 pb-2">
                                        <span className="font-semibold text-pink-800 dark:text-pink-300">Days 37-38 (Early Term)</span>
                                        <span className="bg-pink-200 dark:bg-pink-900 px-2 py-1 rounded text-pink-900 dark:text-pink-200 font-mono">≈ 24%</span>
                                    </div>
                                    <div className="flex justify-between text-sm items-center border-b border-pink-200/50 dark:border-pink-800 pb-2">
                                        <span className="font-semibold text-pink-800 dark:text-pink-300">Days 41+ (Late Term)</span>
                                        <span className="bg-pink-200 dark:bg-pink-900 px-2 py-1 rounded text-pink-900 dark:text-pink-200 font-mono">≈ 16%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Accordion */}
                        <FAQAccordion faqs={dueFaqs} title="Frequently Asked Questions (Pregnancy Dates)" />

                        {/* Final Disclaimer */}
                        <div className="mt-12 bg-red-100/50 dark:bg-red-950/20 p-8 rounded-3xl border border-red-200 dark:border-red-900/30 flex gap-6 items-start">
                            <ShieldAlert className="w-10 h-10 text-red-600 shrink-0 mt-1" />
                            <div>
                                <h4 className="text-xl font-bold text-red-800 dark:text-red-400">Strict Medical Disclaimer</h4>
                                <p className="text-sm text-red-700 dark:text-red-300 mt-2 leading-relaxed font-medium">
                                    The dates provided by this calculator are mathematical estimates based on global averages and standard obstetrical formulas (Naegele's rule).
                                    <br /><br />
                                    This tool is not intended to provide a medical diagnosis or substitute early pregnancy clinical dating. An ultrasound performed by a healthcare professional between weeks 8 and 12 is the only definitive way to measure fetal size (Crown-Rump Length) and establish a clinically actionable dating timeline.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <RelatedTools currentCategory="General Health / Lifestyle" currentSlug="/pregnancy-due-date-calculator-uk" />
        </div>
    );
}
