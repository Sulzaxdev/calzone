import SunSignCalculator from "./calculator";
import Link from "next/link";
import { Sun, Sparkles, HelpCircle, ChevronRight } from "lucide-react";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export default function SunSignCalculatorPage() {
    const faqs = [
        {
            question: "What is a Sun sign?",
            answer: "In astrology, the Sun represents your ego, your basic personality, and the spirit that drives you. It is the fundamental energy that defines your core identity and life purpose."
        },
        {
            question: "What does it mean to be born on the 'cusp'?",
            answer: "Being born on the cusp means your birthday falls on the transition day between two zodiac signs. Our calculator uses precise astronomical data to determine exactly which sign the Sun was in at your specific moment of birth."
        },
        {
            question: "How often does the Sun sign change?",
            answer: "The Sun stays in each zodiac sign for approximately 30 days, completing a full journey through all 12 signs of the zodiac in one year."
        },
        {
            question: "Do I need my exact birth time for my Sun sign?",
            answer: "While the Sun sign is primarily determined by your birth date, an exact birth time is highly recommended if you were born on a transition day (cusp) to ensure 100% accuracy."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <div className="container mx-auto px-4 pt-12">
                <SunSignCalculator />
                
                <section className="mt-20 max-w-6xl mx-auto space-y-16">
                    <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 md:p-20 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none transition-all">
                        {/* Title and Intro */}
                        <div className="space-y-8 mb-16">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-3xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shadow-inner">
                                    <Sun className="w-8 h-8 text-orange-600" />
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                                    The Core Of Your Being: <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">Deep Dive into Your Sun Sign</span>
                                </h2>
                            </div>
                            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl font-medium">
                                Your Sun sign is the most influential placement in your entire birth chart. It represents your ego, your basic personality, and the spirit that drives you. It is the fundamental energy that defines your core identity and life purpose.
                            </p>
                        </div>

                        {/* Feature Grid */}
                        <div className="grid md:grid-cols-2 gap-12 mb-24">
                            <div className="space-y-6">
                                <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-wider">The Solar Engine</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                                    Just as the Sun is the center of our solar system, your Sun sign is the center of your personality. It governs the way you present yourself to the world, your conscious mind, and your primary motivations. When people talk about their "zodiac sign," they are almost always referring to their Sun sign.
                                </p>
                                <div className="p-8 rounded-[2rem] bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/50">
                                    <h4 className="font-bold mb-4 flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-amber-600" />
                                        Did You Know?
                                    </h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                                        "The Sun moves through the zodiac at a rate of approximately one degree per day. This means each of the 12 signs gets its turn for about 30 days every year."
                                    </p>
                                </div>
                            </div>
                            <div className="grid gap-6">
                                {[
                                    { title: "Core Identity", desc: "The essence of your personality." },
                                    { title: "Ego and Will", desc: "Your conscious drive and determination." },
                                    { title: "Life Force", desc: "Your vitality and overall energy levels." },
                                    { title: "Creative Spirit", desc: "How you express your unique gifts." }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-6 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm group hover:shadow-md transition-all">
                                        <div className="w-2 h-2 rounded-full bg-orange-500 group-hover:scale-150 transition-transform" />
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white uppercase tracking-tight">{item.title}</p>
                                            <p className="text-xs text-slate-500">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Detailed Long-Form Sections */}
                        <div className="space-y-24">
                            {/* Elements Section */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">01</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">Sun Signs by Element</h3>
                                </div>
                                <div className="grid md:grid-cols-4 gap-8">
                                    <div className="space-y-4">
                                        <h4 className="font-black text-orange-600 uppercase">Fire</h4>
                                        <p className="text-sm text-slate-500 leading-relaxed italic">Aries, Leo, Sagittarius</p>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                            Passionate, bold, and leader-oriented. Fire signs are the spark that ignites action and creativity in the zodiac.
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="font-black text-emerald-600 uppercase">Earth</h4>
                                        <p className="text-sm text-slate-500 leading-relaxed italic">Taurus, Virgo, Capricorn</p>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                            Practical, grounded, and persistent. Earth signs provide the foundation and structure for material success.
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="font-black text-blue-600 uppercase">Air</h4>
                                        <p className="text-sm text-slate-500 leading-relaxed italic">Gemini, Libra, Aquarius</p>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                            Social, intellectual, and communicative. Air signs focus on ideas, connection, and social progress.
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="font-black text-indigo-600 uppercase">Water</h4>
                                        <p className="text-sm text-slate-500 leading-relaxed italic">Cancer, Scorpio, Pisces</p>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                            Intuitive, empathetic, and deeply feeling. Water signs navigate the depths of the soul and human connection.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Modalities Section */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">02</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">Modality: How You Express Your Energy</h3>
                                </div>
                                <div className="prose prose-slate dark:prose-invert max-w-none">
                                    <div className="grid md:grid-cols-3 gap-12">
                                        <div className="space-y-6">
                                            <h4 className="text-xl font-bold">Cardinal (The Initiators)</h4>
                                            <p className="text-slate-500 leading-relaxed text-sm">
                                                Aries, Cancer, Libra, and Capricorn are the starters of the zodiac. They possess the drive to launch new projects and lead the way into uncharted territory.
                                            </p>
                                        </div>
                                        <div className="space-y-6">
                                            <h4 className="text-xl font-bold">Fixed (The Sustuners)</h4>
                                            <p className="text-slate-500 leading-relaxed text-sm">
                                                Taurus, Leo, Scorpio, and Aquarius are the builders. They have the endurance and focus to see projects through to completion and maintain stability.
                                            </p>
                                        </div>
                                        <div className="space-y-6">
                                            <h4 className="text-xl font-bold">Mutable (The Adaptors)</h4>
                                            <p className="text-slate-500 leading-relaxed text-sm">
                                                Gemini, Virgo, Sagittarius, and Pisces are the flexible signs. They excel at adapting to change, communicating ideas, and finalizing transitions.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Impact Section */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">03</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">How Your Sun Affects Your Life</h3>
                                </div>
                                <div className="grid lg:grid-cols-2 gap-16 items-start">
                                    <div className="space-y-8">
                                        <h4 className="text-2xl font-bold">Career & Ambition</h4>
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            Your Sun sign heavily influences your professional drive. It dictates the kind of work that makes you feel fulfilled and the environments where you are most likely to excel. Understanding your solar traits can help you choose a career path that aligns with your natural strengths.
                                        </p>
                                    </div>
                                    <div className="space-y-8">
                                        <h4 className="text-2xl font-bold">Personal Relationships</h4>
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            In relationships, your Sun sign represents your basic needs for recognition and how you express love. It determines your compatibility with others on a fundamental personality level.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Final FAQ */}
                            <div className="pt-20">
                                <FAQAccordion faqs={faqs} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

