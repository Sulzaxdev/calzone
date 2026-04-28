import RisingSignCalculator from "./calculator";
import Link from "next/link";
import { ArrowUpRight, Sparkles, ChevronRight } from "lucide-react";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export default function RisingSignCalculatorPage() {
    const faqs = [
        {
            question: "What is a Rising sign (Ascendant)?",
            answer: "The Rising sign, or Ascendant, is the zodiac sign that was ascending on the eastern horizon at the exact moment of your birth. It represents your outward persona and the first impression you make on others."
        },
        {
            question: "Why is birth time mandatory for the Rising sign?",
            answer: "The Earth rotates 360 degrees in 24 hours, meaning the Rising sign changes roughly every two hours. Even a difference of a few minutes can result in a different Rising sign, which is why an accurate birth certificate time is essential."
        },
        {
            question: "What if I don't know my exact birth time?",
            answer: "Without an exact time, it is impossible to calculate a precise Rising sign. You can try to estimate if you have a general idea (e.g., 'dawn' or 'late afternoon'), but the result may not be accurate."
        },
        {
            question: "How does the Rising sign affect my personality?",
            answer: "It influences your physical appearance, your style, your social behavior, and how you instinctively react to new environments and people."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <div className="container mx-auto px-4 pt-12">
                <RisingSignCalculator />
                
                <section className="mt-20 max-w-6xl mx-auto space-y-16">
                    <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 md:p-20 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none transition-all">
                        {/* Title and Intro */}
                        <div className="space-y-8 mb-16">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-3xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shadow-inner">
                                    <ArrowUpRight className="w-8 h-8 text-indigo-600" />
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                                    The Social Mask: <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Deep Dive into Your Rising Sign</span>
                                </h2>
                            </div>
                            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl font-medium">
                                The Rising sign, also known as the Ascendant, is the "front door" of your astrological house. While your Sun sign represents your core and your Moon sign is your soul, your Rising sign is the lens through which you experience the world and the mask you wear in social interactions.
                            </p>
                        </div>

                        {/* Detailed Long-Form Sections */}
                        <div className="space-y-24">
                            {/* Section 1: The Ascendant */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">01</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">What is the Ascendant?</h3>
                                </div>
                                <div className="grid lg:grid-cols-2 gap-16">
                                    <div className="space-y-8">
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            Technically, the Rising sign is the exact degree of the zodiac sign that was ascending on the eastern horizon at the very second of your birth. This is why an accurate birth time is so critical—every two hours, the Earth rotates enough to bring a new sign onto the horizon. 
                                        </p>
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            In your birth chart, the Ascendant marks the beginning of the First House (the House of Self). It dictates the layout of the rest of the twelve houses, meaning your Rising sign literally sets the stage for every other placement in your chart. It is the "I" that meets the world.
                                        </p>
                                    </div>
                                    <div className="bg-indigo-50/50 dark:bg-indigo-900/10 p-10 rounded-[3rem] border border-indigo-100 dark:border-indigo-800/50">
                                        <h4 className="text-xl font-bold mb-6">Rising Sign Domains:</h4>
                                        <div className="space-y-6">
                                            {[
                                                { title: "Physical Appearance", desc: "Often dictates your style, body type, and overall vibe." },
                                                { title: "First Impressions", desc: "How strangers and acquaintances perceive you initially." },
                                                { title: "Defensive Layer", desc: "The automatic social response you use to navigate new environments." },
                                                { title: "Vitality", desc: "In classical astrology, the Ascendant represents physical health and vigor." }
                                            ].map((item, i) => (
                                                <div key={i} className="flex gap-4 items-start">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
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

                            {/* Section 2: The Chart Ruler */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">02</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">Your Chart Ruler: The Key to Your Destiny</h3>
                                </div>
                                <div className="prose prose-slate dark:prose-invert max-w-none">
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                        The planet that rules your Rising sign is considered your **Chart Ruler**. This planet is the captain of your astrological ship. For example, if you are an Aries Rising, Mars is your chart ruler. Its position (sign and house) in your chart will tell you even more about your primary motivations and the themes that will dominate your life journey.
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-12 my-12">
                                        <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100">
                                            <h4 className="text-xl font-bold mb-4">Finding Your Ruler</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed">
                                                To find your Chart Ruler, first determine your Rising sign using our calculator. Then, identify its traditional ruling planet. If you're a Leo Rising, the Sun is your ruler; if Pisces, Jupiter (traditional) or Neptune (modern) rules your chart.
                                            </p>
                                        </div>
                                        <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100">
                                            <h4 className="text-xl font-bold mb-4">Ruler Influence</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed">
                                                The house where your ruler resides is where you focus your greatest energy. A Sagittarius Rising with Jupiter in the 10th house will be highly career-driven and public-facing.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Rising by Element */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">03</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">How Others See You</h3>
                                </div>
                                <div className="grid md:grid-cols-4 gap-8">
                                    {[
                                        { el: "Fire Rising", effect: "Energetic, bold, and noticeable. You enter a room with confidence and warmth." },
                                        { el: "Earth Rising", effect: "Reserved, stable, and practical. You appear reliable and perhaps a bit formal at first." },
                                        { el: "Air Rising", effect: "Talkative, curious, and friendly. You come across as intellectual and approachable." },
                                        { el: "Water Rising", effect: "Mysterious, quiet, and empathetic. You absorb the energy of the room before acting." }
                                    ].map((item, i) => (
                                        <div key={i} className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
                                            <h4 className="font-black text-indigo-600 mb-4 uppercase text-sm tracking-widest">{item.el}</h4>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.effect}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* FAQ Section */}
                            <div className="pt-20">
                                <FAQAccordion faqs={faqs} />
                            </div>
                        </div>

                        {/* CTA Footer */}
                        <div className="mt-24 p-12 rounded-[3.5rem] bg-linear-to-br from-indigo-600 to-purple-700 text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                                <div className="space-y-6 max-w-xl text-center md:text-left">
                                    <h3 className="text-3xl md:text-4xl font-black tracking-tight">Complete Your Big Three</h3>
                                    <p className="text-indigo-100 text-lg leading-relaxed">
                                        Your Rising sign sets the stage, but your Sun and Moon fill in the character. Calculate all three together for the full picture.
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

