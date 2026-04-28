import BigThreeCalculator from "./calculator";
import Link from "next/link";
import { BookOpen, Sparkles, HelpCircle, Info, ChevronRight, Activity, TrendingUp, Sun, Moon, ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { SocialShare } from "@/components/ui/social-share";
import { FAQAccordion } from "@/components/ui/faq-accordion";

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

                <section className="mt-20 max-w-6xl mx-auto space-y-16">
                    <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 md:p-20 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none transition-all">
                        {/* Hero Section of Content */}
                        <div className="space-y-8 mb-16">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-3xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shadow-inner">
                                    <Sparkles className="w-8 h-8 text-indigo-600" />
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                                    The Celestial Blueprint: <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Your Astrological Big Three</span>
                                </h2>
                            </div>
                            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl font-medium">
                                In the vast universe of astrology, your birth chart serves as a complex map of the soul. While many focus solely on their Sun sign, the true core of your personality is found in the "Big Three"—the Sun, Moon, and Rising signs. Understanding these three components provides a profound, layered look at who you are, how you feel, and how you navigate the world.
                            </p>
                        </div>

                        {/* Detailed Grid of the Big Three */}
                        <div className="grid md:grid-cols-3 gap-8 mb-20">
                            <div className="group p-8 rounded-[2.5rem] bg-orange-50/50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-800/50 hover:bg-white dark:hover:bg-slate-800 transition-all hover:shadow-xl">
                                <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Sun className="w-6 h-6 text-orange-600" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-wider">The Sun</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 font-medium">Your Core Identity</p>
                                <p className="text-sm text-slate-500 dark:text-slate-500 leading-relaxed">
                                    The Sun represents your ego, your conscious mind, and the "hero" of your life's journey. It is what you are striving to become and where you find your greatest vitality. It is the central star of your internal solar system.
                                </p>
                            </div>
                            <div className="group p-8 rounded-[2.5rem] bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/50 hover:bg-white dark:hover:bg-slate-800 transition-all hover:shadow-xl">
                                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Moon className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-wider">The Moon</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 font-medium">Your Inner World</p>
                                <p className="text-sm text-slate-500 dark:text-slate-500 leading-relaxed">
                                    The Moon governs your emotions, instincts, and your private self. It is how you react to the world and what you need to feel safe, nurtured, and emotionally secure. It is your instinctual reaction to life's ebb and flow.
                                </p>
                            </div>
                            <div className="group p-8 rounded-[2.5rem] bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/50 hover:bg-white dark:hover:bg-slate-800 transition-all hover:shadow-xl">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <ArrowUpRight className="w-6 h-6 text-indigo-600" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-wider">The Rising</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 font-medium">Your Social Mask</p>
                                <p className="text-sm text-slate-500 dark:text-slate-500 leading-relaxed">
                                    Your Rising sign (Ascendant) is the "front door" of your personality. It dictates how others perceive you upon first meeting and the lens through which you view the world. It sets the house structure for your entire chart.
                                </p>
                            </div>
                        </div>

                        {/* Long-form Content Sections */}
                        <div className="space-y-24">
                            {/* Section 1: Sun Sign Deep Dive */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">01</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">The Sun: Your Conscious Ego and Life Force</h3>
                                </div>
                                <div className="grid lg:grid-cols-2 gap-16">
                                    <div className="space-y-8">
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            The Sun is the most commonly recognized aspect of astrology. When someone asks, "What’s your sign?" they are referring to your Sun sign. It is determined by the position of the Sun in the zodiac at the time of your birth. The Sun is the blazing, central star of our solar system, and astrologically, it represents the core of your personality.
                                        </p>
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            It governs your Ego: how you perceive yourself and your fundamental sense of identity. It defines your Life Purpose: what drives you, what energizes you, and what you are striving to become. It is also your source of Vitality: your main source of personal power and how you "shine" in the world.
                                        </p>
                                        <div className="p-8 rounded-[2rem] bg-orange-50/30 dark:bg-orange-900/5 border border-orange-100/50 dark:border-orange-800/20">
                                            <h4 className="font-black text-orange-800 dark:text-orange-300 uppercase tracking-widest text-sm mb-4">Pro Tip:</h4>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed italic">
                                                "If your Sun sign is in a fire sign, you may feel most 'like yourself' when taking action. If in an earth sign, you likely find fulfillment in building stability."
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-8">
                                        <h4 className="text-2xl font-black text-slate-900 dark:text-white">Core Solar Attributes:</h4>
                                        <div className="grid gap-4">
                                            {[
                                                { title: "Identity", desc: "The 'I am' of your chart." },
                                                { title: "Ego", desc: "Your conscious awareness of self." },
                                                { title: "Direction", desc: "The path of self-realization and growth." },
                                                { title: "Willpower", desc: "The engine that drives your ambitions." }
                                            ].map((attr, i) => (
                                                <div key={i} className="flex items-center gap-6 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
                                                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                                                    <div>
                                                        <p className="font-bold text-slate-900 dark:text-white">{attr.title}</p>
                                                        <p className="text-xs text-slate-500">{attr.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Moon Sign Deep Dive */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">02</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">The Moon: Your Inner Soul and Emotional Truth</h3>
                                </div>
                                <div className="prose prose-slate dark:prose-invert max-w-none">
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                        While the Sun is the "main character" of your personality, the Moon represents the "behind-the-scenes" truth. Because the Moon moves through the zodiac quickly (changing signs roughly every 2.5 days), knowing your Moon sign requires your exact time and location of birth. The Moon reflects the Sun's light, and in your chart, it represents your internal, intuitive nature.
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-12 my-12">
                                        <div className="space-y-6">
                                            <h4 className="text-xl font-bold">Emotional Needs</h4>
                                            <p className="text-slate-500 leading-relaxed">
                                                Your Moon sign tells you what you need to feel safe, comforted, and nurtured. It describes your "happy place"—the conditions under which you feel most at peace.
                                            </p>
                                        </div>
                                        <div className="space-y-6">
                                            <h4 className="text-xl font-bold">Instinctual Reactions</h4>
                                            <p className="text-slate-500 leading-relaxed">
                                                When life throws a curveball, your Moon sign takes over. It governs how you instinctively react to stressors, challenges, or emotional triggers before your Sun sign has time to think.
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                        A person with an analytical Sun sign but a sensitive, water-based Moon sign may surprise others by having a deeply emotional interior that isn't immediately obvious in their day-to-day interactions. Understanding this dichotomy is key to self-acceptance.
                                    </p>
                                </div>
                            </div>

                            {/* Section 3: Rising Sign Deep Dive */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">03</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">The Rising Sign: The Mask and the Lens</h3>
                                </div>
                                <div className="grid lg:grid-cols-2 gap-16 items-center">
                                    <div className="space-y-8">
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            The Rising sign, or Ascendant, is the zodiac sign that was ascending over the eastern horizon at the exact minute of your birth. Because the Earth rotates fully every 24 hours, the Rising sign changes approximately every two hours. This makes it perhaps the most personal and specific point in your entire birth chart.
                                        </p>
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            Think of your Rising sign as the "lens" through which you view the world, and the "mask" or filter that the world sees when they meet you. It governs First Impressions: the immediate vibe you project to strangers and acquaintances.
                                        </p>
                                    </div>
                                    <div className="p-10 rounded-[3rem] bg-indigo-600 text-white shadow-2xl">
                                        <h4 className="text-2xl font-bold mb-6">Why Time Matters</h4>
                                        <p className="text-indigo-100 leading-relaxed mb-8">
                                            The Rising sign is the most time-sensitive point in your chart. A difference of just 15 minutes can shift your Ascendant degree or even the sign itself, completely altering your House placements.
                                        </p>
                                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 border border-white/20">
                                            <Info className="w-6 h-6 text-indigo-200" />
                                            <p className="text-sm font-medium">Use a verified birth certificate for 100% accuracy.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 4: The Interplay Table */}
                            <div className="pt-20 border-t border-slate-100 dark:border-slate-800">
                                <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-12 text-center tracking-tight">The Dynamic Trio in Action</h3>
                                <div className="grid md:grid-cols-4 gap-8">
                                    {[
                                        { el: "Fire", sun: "Passionate leader.", moon: "Reactive enthusiast.", rise: "Visible dynamo.", color: "text-orange-500" },
                                        { el: "Earth", sun: "Practical builder.", moon: "Grounded anchor.", rise: "Reliable presence.", color: "text-emerald-500" },
                                        { el: "Air", sun: "Social intellectual.", moon: "Analytical observer.", rise: "Curious diplomat.", color: "text-blue-500" },
                                        { el: "Water", sun: "Intuitive empath.", moon: "Sensitive protector.", rise: "Mysterious soul.", color: "text-indigo-500" }
                                    ].map((row, i) => (
                                        <div key={i} className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                            <p className={`text-2xl font-black mb-6 ${row.color}`}>{row.el}</p>
                                            <div className="space-y-4 text-sm">
                                                <p><span className="font-bold text-slate-900 dark:text-white">Sun:</span> {row.sun}</p>
                                                <p><span className="font-bold text-slate-900 dark:text-white">Moon:</span> {row.moon}</p>
                                                <p><span className="font-bold text-slate-900 dark:text-white">Rising:</span> {row.rise}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Final FAQ Section */}
                            <div className="pt-20">
                                <FAQAccordion faqs={[
                                    {
                                        question: "What is the 'Big Three' in astrology?",
                                        answer: "The 'Big Three' refers to your Sun, Moon, and Rising signs. They are considered the three most important points in your birth chart, explaining your core self, your inner emotions, and your outward persona."
                                    },
                                    {
                                        question: "Why do I need my birth time for this calculator?",
                                        answer: "The Rising sign changes every two hours, and the Moon moves quickly through the zodiac. An exact birth time ensures that all three placements are calculated with 100% astronomical accuracy."
                                    },
                                    {
                                        question: "What if I don't know my birth city?",
                                        answer: "The birth city is used to determine the exact horizon at the moment of your birth. Without it, the Rising sign cannot be calculated accurately."
                                    },
                                    {
                                        question: "Is the Big Three the same as a full birth chart?",
                                        answer: "No, but it's the foundation. A full birth chart includes all planets, houses, and complex aspects, while the Big Three provides the essential summary of your personality."
                                    }
                                ]} />
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
