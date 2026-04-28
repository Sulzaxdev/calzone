import MoonSignCalculator from "./calculator";
import Link from "next/link";
import { Moon, Sparkles, ChevronRight } from "lucide-react";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export default function MoonSignCalculatorPage() {
    const faqs = [
        {
            question: "What does my Moon sign represent?",
            answer: "Your Moon sign governs your inner emotional world, your subconscious needs, and your intuitive reactions. While the Sun is your outward identity, the Moon is your private self."
        },
        {
            question: "Why do I need my birth time for my Moon sign?",
            answer: "The Moon is one of the fastest-moving celestial bodies in astrology, changing zodiac signs roughly every 2.5 days. Knowing your exact birth time is essential to ensure the Moon hadn't moved into a different sign during that day."
        },
        {
            question: "How does my Moon sign affect my relationships?",
            answer: "It dictates how you express affection, how you handle conflict, and what you need from a partner to feel emotionally secure and nurtured."
        },
        {
            question: "What is the 'Big Three' in astrology?",
            answer: "The 'Big Three' consists of your Sun, Moon, and Rising signs. Together, they provide the most comprehensive overview of your personality and life path."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <div className="container mx-auto px-4 pt-12">
                <MoonSignCalculator />
                
                <section className="mt-20 max-w-6xl mx-auto space-y-16">
                    <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 md:p-20 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none transition-all">
                        {/* Title and Intro */}
                        <div className="space-y-8 mb-16">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-3xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shadow-inner">
                                    <Moon className="w-8 h-8 text-blue-600" />
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                                    The Soul's Mirror: <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Deep Dive into Your Moon Sign</span>
                                </h2>
                            </div>
                            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl font-medium">
                                While your Sun sign represents who you are becoming, your Moon sign is who you already are deep down. It governs your moods, your instincts, and your relationship with your home and family. Understanding your lunar placement is the key to mastering your emotional intelligence.
                            </p>
                        </div>

                        {/* Detailed Long-Form Sections */}
                        <div className="space-y-24">
                            {/* Section 1: The Inner Self */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">01</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">Understanding Your Lunar Identity</h3>
                                </div>
                                <div className="grid lg:grid-cols-2 gap-16">
                                    <div className="space-y-8">
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            The Moon is the fastest-moving body in our astrological sky, completing a full circuit of the zodiac every 28 days. Because of this speed, its influence is incredibly personal and fluctuates more rapidly than any other planetary placement. In your natal chart, the Moon represents your subconscious mind, your past, and your most basic emotional needs.
                                        </p>
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            It governs how you handle stress, how you seek comfort, and how you nurture yourself and others. If you've ever felt that your Sun sign doesn't capture your "true" feelings, it's likely because your Moon sign is taking the lead in your private life.
                                        </p>
                                    </div>
                                    <div className="bg-blue-50/50 dark:bg-blue-900/10 p-10 rounded-[3rem] border border-blue-100 dark:border-blue-800/50">
                                        <h4 className="text-xl font-bold mb-6">Lunar Core Pillars:</h4>
                                        <div className="space-y-6">
                                            {[
                                                { title: "Emotional Processing", desc: "How you digest your feelings and experiences." },
                                                { title: "Subconscious Habits", desc: "The automatic behaviors you fall into when tired or stressed." },
                                                { title: "Nurturing Style", desc: "How you show care and how you wish to be cared for." },
                                                { title: "Intuition", desc: "Your gut feelings and psychic sensitivity." }
                                            ].map((item, i) => (
                                                <div key={i} className="flex gap-4 items-start">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                                                    <div>
                                                        <p className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</p>
                                                        <p className="text-xs text-slate-500">{item.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Moon by Element */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">02</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">Emotional Landscapes by Element</h3>
                                </div>
                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {[
                                        { title: "Fire Moon", signs: "Aries, Leo, Sagittarius", effect: "Needs excitement, expresses emotions boldly and quickly." },
                                        { title: "Earth Moon", signs: "Taurus, Virgo, Capricorn", effect: "Needs stability, expresses emotions through practical care." },
                                        { title: "Air Moon", signs: "Gemini, Libra, Aquarius", effect: "Needs communication, processes emotions through logic and talk." },
                                        { title: "Water Moon", signs: "Cancer, Scorpio, Pisces", effect: "Needs depth, processes emotions through intuition and silence." }
                                    ].map((item, i) => (
                                        <div key={i} className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
                                            <h4 className="font-black text-blue-600 mb-2 uppercase tracking-tight">{item.title}</h4>
                                            <p className="text-xs text-slate-500 italic mb-4">{item.signs}</p>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.effect}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Section 3: The Importance of Birth Time */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">03</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">Why Your Birth Time is Non-Negotiable</h3>
                                </div>
                                <div className="grid lg:grid-cols-2 gap-16 items-center">
                                    <div className="space-y-8">
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            Unlike the Sun, which stays in a sign for 30 days, the Moon shifts signs every two to three days. If you were born on a day when the Moon was transitioning between signs, your birth time could be the difference between having a fiery Aries Moon or a grounded Taurus Moon.
                                        </p>
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            Our calculator uses the highest-grade astronomical data to pinpoint the exact degree of the Moon at the moment of your birth, ensuring your emotional profile is 100% accurate.
                                        </p>
                                    </div>
                                    <div className="p-10 rounded-[3rem] bg-slate-900 text-white shadow-2xl border border-slate-800">
                                        <h4 className="text-2xl font-bold mb-6">Lunar Statistics</h4>
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                                                <span className="text-slate-400">Transit Speed</span>
                                                <span className="font-mono text-blue-400">13° per day</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                                                <span className="text-slate-400">Sign Duration</span>
                                                <span className="font-mono text-blue-400">~2.5 Days</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-slate-400">Full Zodiac Cycle</span>
                                                <span className="font-mono text-blue-400">27.3 Days</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* FAQ Section */}
                            <div className="pt-20">
                                <FAQAccordion faqs={faqs} />
                            </div>
                        </div>

                        {/* CTA Footer */}
                        <div className="mt-24 p-12 rounded-[3.5rem] bg-linear-to-br from-indigo-600 to-blue-700 text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                                <div className="space-y-6 max-w-xl text-center md:text-left">
                                    <h3 className="text-3xl md:text-4xl font-black tracking-tight">The Big Three Connection</h3>
                                    <p className="text-indigo-100 text-lg leading-relaxed">
                                        Your Moon sign is just one piece of the puzzle. Combine it with your Sun and Rising signs to see the full architecture of your personality.
                                    </p>
                                </div>
                                <Link href="/sun-moon-rising-calculator" className="px-12 py-6 bg-white text-indigo-600 rounded-[2rem] font-black text-xl hover:scale-105 transition-transform shadow-xl whitespace-nowrap">
                                    Calculate Big Three
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

