import BigThreeCalculator from "./calculator";
import Link from "next/link";
import { BookOpen, Sparkles, HelpCircle, Info, ChevronRight, Activity, TrendingUp } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { SocialShare } from "@/components/ui/social-share";

export default function BigThreeCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <JsonLd 
                type="WebApplication"
                name="Sun Moon and Rising Sign Calculator"
                description="Find your Big Three - your Sun, Moon, and Rising signs - with our free astrology calculator. Reveal the core of your personality and emotions."
                url="https://www.thecalzone.co.uk"
                path="/sun-moon-rising-calculator"
                faqs={[
                    {
                        question: "Is the Sun, Moon, and Rising the Same as a Full Birth Chart?",
                        answer: "Not exactly. Your Sun, Moon, and Rising signs are the foundation of your astrology chart, but a full birth chart (also called a natal chart) goes much deeper."
                    },
                    {
                        question: "How Accurate Is the Sun, Moon, and Rising Calculator?",
                        answer: "Our calculator uses NASA's JPL Ephemeris data to provide astronomical precision. The accuracy depends on providing your exact birth time and location."
                    }
                ]}
            />
            <div className="container mx-auto px-4 pt-8">
                <Breadcrumbs items={[{ label: "Astrology", href: "/astrology-calculators" }, { label: "Big Three Calculator" }]} />
                <BigThreeCalculator />
                <SocialShare title="Free Sun, Moon, and Rising Sign Calculator" />

                {/* SEO Content Section */}
                <section className="mt-20 max-w-5xl mx-auto">
                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 md:p-16 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full -mr-32 -mt-32"></div>
                        
                        <div className="relative z-10 space-y-12">
                            <div className="space-y-6">
                                <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-4">
                                    <Sparkles className="w-8 h-8 text-indigo-500" />
                                    What Are Sun, Moon, and Rising Signs?
                                </h2>
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Your Sun, Moon, and Rising signs are the three key parts of your birth chart in astrology. Together, they give a fuller picture of who you are - your core personality, emotional world, and how you show up to others.
                                </p>
                                <div className="grid md:grid-cols-3 gap-6 pt-4">
                                    <div className="p-6 rounded-3xl bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30">
                                        <h3 className="font-bold text-orange-800 dark:text-orange-300 mb-2">Sun Sign</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Represents your main identity and life force.</p>
                                    </div>
                                    <div className="p-6 rounded-3xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30">
                                        <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Moon Sign</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Reveals your inner feelings and emotional needs.</p>
                                    </div>
                                    <div className="p-6 rounded-3xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/30">
                                        <h3 className="font-bold text-indigo-800 dark:text-indigo-400 mb-2">Rising Sign</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">The first impression you give and your lens on life.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                    How Our Calculator Works
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Enter your birth date, exact time, and location, and our free Sun, Moon, and Rising sign calculator will reveal your complete Big Three in astrology. Using your personal birth details, we generate an accurate reading to help you understand the core layers of your personality.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        "Your Sun sign and what it reveals about your identity and life purpose.",
                                        "Your Moon sign for deeper insight into your emotions and intuition.",
                                        "Your Rising sign (Ascendant) to understand how others see you.",
                                        "How your Big Three work together to shape your growth journey."
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 font-medium">
                                            <ChevronRight className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Inter-linking with other calculators */}
                            <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Holistic Wellness Planning</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                                    While astrology provides spiritual insight, tracking your physical health is equally important. Once you've found your Big Three, why not check your <Link href="/bmi-calculator-uk" className="text-indigo-600 font-bold hover:underline">BMI Calculator</Link> or plan your fitness with our <Link href="/calorie-deficit-calculator-uk" className="text-indigo-600 font-bold hover:underline">Calorie Deficit Tool</Link>?
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link href="/bmi-calculator-uk" className="px-4 py-2 bg-white dark:bg-slate-900 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-colors">BMI Calc</Link>
                                    <Link href="/salary-calculator-uk" className="px-4 py-2 bg-white dark:bg-slate-900 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-colors">Salary Calc</Link>
                                    <Link href="/mortgage-calculator-uk" className="px-4 py-2 bg-white dark:bg-slate-900 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-colors">Mortgage Calc</Link>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Frequently Asked Questions</h2>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">Is the Sun, Moon, and Rising the Same as a Full Birth Chart?</h4>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                            Not exactly. Your Sun, Moon, and Rising signs are the foundation of your astrology chart, but a full birth chart (also called a natal chart) goes much deeper. Your full chart includes all the planets, zodiac signs, houses, and aspects that work together to shape your life path.
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">How Accurate Is the Sun, Moon, and Rising Calculator?</h4>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                            Our calculator uses NASA's JPL Ephemeris data to provide astronomical precision. The accuracy depends on providing your exact birth time and location, as the Rising sign changes every two hours.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
