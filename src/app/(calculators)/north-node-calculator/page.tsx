import NorthNodeCalculator from "./calculator";
import Link from "next/link";
import { Compass, Sparkles, ChevronRight } from "lucide-react";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export default function NorthNodePage() {
    const faqs = [
        {
            question: "What is the North Node in astrology?",
            answer: "The North Node (also called Rahu) is a mathematical point where the Moon's orbit intersects the ecliptic. In astrology, it represents your soul's purpose, your destiny, and the lessons you are meant to learn in this lifetime."
        },
        {
            question: "How is it different from the South Node?",
            answer: "The South Node represents your past lives, innate talents, and comfort zone. The North Node represents the unfamiliar territory you must explore to find true spiritual fulfillment and growth."
        },
        {
            question: "Does the North Node change often?",
            answer: "The Nodes stay in a pair of opposite signs for about 18 months. Because they move slowly, they are often associated with collective generations as well as personal destiny."
        },
        {
            question: "Why is it called the 'Dragon's Head'?",
            answer: "In Vedic and ancient astrology, the North Node is known as the 'Head of the Dragon' (Rahu) and the South Node as the 'Tail' (Ketu), symbolizing the points where eclipses occur."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <div className="container mx-auto px-4 pt-12">
                <NorthNodeCalculator />
                
                <section className="mt-20 max-w-6xl mx-auto space-y-16">
                    <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 md:p-20 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none transition-all">
                        {/* Title and Intro */}
                        <div className="space-y-8 mb-16">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shadow-inner">
                                    <Compass className="w-8 h-8 text-emerald-600" />
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                                    The Path of Destiny: <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Deep Dive into Your North Node</span>
                                </h2>
                            </div>
                            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl font-medium">
                                The North Node is the most important point in your birth chart for understanding your soul's purpose. While other placements describe who you are, the North Node describes who you are *becoming*.
                            </p>
                        </div>

                        {/* Detailed Long-Form Sections */}
                        <div className="space-y-24">
                            {/* Section 1: The Lunar Nodes */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">01</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">Understanding the Nodal Axis</h3>
                                </div>
                                <div className="grid lg:grid-cols-2 gap-16">
                                    <div className="space-y-8">
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            The North and South Nodes are not physical bodies; they are mathematical points where the Moon's orbit crosses the ecliptic (the Sun's apparent path). They always sit exactly opposite each other in the zodiac, creating an "axis of destiny." 
                                        </p>
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            The **South Node** represents where you've come from—your past lives, innate talents, and the comfort zone that is easy to fall back into but ultimately stagnating. The **North Node** represents your future—the qualities you need to develop and the experiences you need to have to reach your highest potential.
                                        </p>
                                    </div>
                                    <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-10 rounded-[3rem] border border-emerald-100 dark:border-emerald-800/50">
                                        <h4 className="text-xl font-bold mb-6">Nodal Core Pillars:</h4>
                                        <div className="space-y-6">
                                            {[
                                                { title: "Karmic Direction", desc: "The transition from past patterns to future possibilities." },
                                                { title: "Spiritual Growth", desc: "The lessons that feel challenging but lead to deep satisfaction." },
                                                { title: "Soul Mission", desc: "The primary purpose for your current incarnation." },
                                                { title: "Eclipse Points", desc: "The Nodes are where solar and lunar eclipses occur, signifying major life shifts." }
                                            ].map((item, i) => (
                                                <div key={i} className="flex gap-4 items-start">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
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

                            {/* Section 2: Moving Toward the North Node */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">02</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">The Challenge of Growth</h3>
                                </div>
                                <div className="prose prose-slate dark:prose-invert max-w-none">
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Embracing your North Node often feels uncomfortable. It is unfamiliar territory. If your North Node is in Aries, you are learning to be independent and bold, which might feel scary if your South Node is in Libra (over-reliance on others). Our calculator helps you identify this path so you can lean into the growth that will bring you the most reward.
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-12 my-12">
                                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 shadow-sm">
                                            <h4 className="text-xl font-bold mb-4">The Comfort Zone Trap</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed">
                                                The South Node is like an old pair of slippers—comfortable, but you can't walk very far in them. True evolution happens when you step out of the South Node's ease and into the North Node's effort.
                                            </p>
                                        </div>
                                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 shadow-sm">
                                            <h4 className="text-xl font-bold mb-4">Destiny and Timing</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed">
                                                Major life events often happen when planets transit over your North or South Node. These are "appointments with destiny" that push you further along your path.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Nodes by Element */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">03</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">Growth Themes by Element</h3>
                                </div>
                                <div className="grid md:grid-cols-4 gap-8">
                                    {[
                                        { el: "Fire North Node", effect: "Learning to lead, inspire, and act with individual courage." },
                                        { el: "Earth North Node", effect: "Learning to build, manifest, and find value in the physical world." },
                                        { el: "Air North Node", effect: "Learning to communicate, connect, and share ideas objectively." },
                                        { el: "Water North Node", effect: "Learning to feel, intuit, and connect with the spiritual depths." }
                                    ].map((item, i) => (
                                        <div key={i} className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-inner">
                                            <h4 className="font-black text-emerald-600 mb-4 uppercase text-sm tracking-widest">{item.el}</h4>
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
                        <div className="mt-24 p-12 rounded-[3.5rem] bg-linear-to-br from-emerald-600 to-teal-700 text-white shadow-2xl relative overflow-hidden text-center md:text-left">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                                <div className="space-y-6 max-w-xl">
                                    <h3 className="text-3xl md:text-4xl font-black tracking-tight">Your Complete Destiny</h3>
                                    <p className="text-emerald-100 text-lg leading-relaxed">
                                        The North Node is your compass, but your Sun, Moon, and Rising signs are your vehicle. Calculate all of them for a complete life map.
                                    </p>
                                </div>
                                <Link href="/sun-moon-rising-calculator" className="px-12 py-6 bg-white text-emerald-600 rounded-[2rem] font-black text-xl hover:scale-105 transition-transform shadow-xl whitespace-nowrap">
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
