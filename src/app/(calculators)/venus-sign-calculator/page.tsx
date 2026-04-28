import VenusSignCalculator from "./calculator";
import Link from "next/link";
import { Heart, Sparkles, ChevronRight } from "lucide-react";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export default function VenusSignCalculatorPage() {
    const faqs = [
        {
            question: "What does my Venus sign represent?",
            answer: "In astrology, Venus is the planet of love, beauty, and value. Your Venus sign governs how you express affection, what you find attractive, your relationship style, and even your approach to money and aesthetics."
        },
        {
            question: "How does Venus affect my romantic life?",
            answer: "Your Venus placement shows what you need in a partner to feel loved and how you attract others. For example, Venus in Taurus values stability, while Venus in Gemini values intellectual connection."
        },
        {
            question: "What is the connection between Venus and finances?",
            answer: "Venus governs what we value. This includes both personal values and material wealth. It can indicate your spending habits and your relationship with luxury and comfort."
        },
        {
            question: "Does Venus sign change often?",
            answer: "Venus stays in a zodiac sign for about 3 to 4 weeks on average. However, when it goes retrograde, it can stay in a single sign for several months."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <div className="container mx-auto px-4 pt-12">
                <VenusSignCalculator />
                
                <section className="mt-20 max-w-6xl mx-auto space-y-16">
                    <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 md:p-20 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none transition-all">
                        {/* Title and Intro */}
                        <div className="space-y-8 mb-16">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-3xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center shadow-inner">
                                    <Heart className="w-8 h-8 text-pink-600" />
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                                    The Language of Love: <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">Deep Dive into Your Venus Sign</span>
                                </h2>
                            </div>
                            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl font-medium">
                                Your Venus sign reveals the blueprint of your heart. While your Sun sign is your identity and your Moon is your soul, Venus dictates how you relate to others, what you value, and what brings you pleasure and beauty.
                            </p>
                        </div>

                        {/* Detailed Long-Form Sections */}
                        <div className="space-y-24">
                            {/* Section 1: Love and Attraction */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">01</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">Venus: The Planet of Affection</h3>
                                </div>
                                <div className="grid lg:grid-cols-2 gap-16">
                                    <div className="space-y-8">
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            In the study of astrology, Venus is the planet that governs love, beauty, and money. It describes your personal "style" of affection. Are you a bold and direct lover (Venus in Aries), or do you prefer the slow, steady build of a lasting commitment (Venus in Taurus)? Your Venus sign answer these questions by defining what you find attractive and how you seek to attract others.
                                        </p>
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            Beyond romance, Venus represents your social grace and your ability to find harmony with others. It is the diplomat of your birth chart, helping you navigate the complexities of human interaction with charm and balance.
                                        </p>
                                    </div>
                                    <div className="bg-pink-50/50 dark:bg-pink-900/10 p-10 rounded-[3rem] border border-pink-100 dark:border-pink-800/50">
                                        <h4 className="text-xl font-bold mb-6">Venusian Core Pillars:</h4>
                                        <div className="space-y-6">
                                            {[
                                                { title: "Romantic Attraction", desc: "What sparks your interest in a potential partner." },
                                                { title: "Personal Values", desc: "What you truly care about and what you're willing to invest in." },
                                                { title: "Financial Habits", desc: "How you approach wealth, luxury, and material comfort." },
                                                { title: "Artistic Expression", desc: "Your aesthetic taste and creative inclinations." }
                                            ].map((item, i) => (
                                                <div key={i} className="flex gap-4 items-start">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 shrink-0" />
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

                            {/* Section 2: Values and Finances */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">02</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">Venus and the Art of Value</h3>
                                </div>
                                <div className="prose prose-slate dark:prose-invert max-w-none">
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Many people are surprised to learn that Venus also rules money. This is because Venus is about what we *value*. Your spending habits are often a direct reflection of your Venus sign. A Venus in Leo might spend generously on high-quality experiences and gifts for loved ones, while a Venus in Virgo might be more frugal, valuing utility and long-term security.
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-12 my-12">
                                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 shadow-sm">
                                            <h4 className="text-xl font-bold mb-4">The Aesthetic Lens</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed">
                                                Your Venus sign determines your "look." It influences the colors you prefer, the way you decorate your home, and the type of art that moves you. It is your personal filter for beauty.
                                            </p>
                                        </div>
                                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 shadow-sm">
                                            <h4 className="text-xl font-bold mb-4">Financial Flow</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed">
                                                By understanding your Venus sign, you can gain insights into your relationship with abundance and how you attract resources into your life.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Venus by Element */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">03</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">Relating Styles by Element</h3>
                                </div>
                                <div className="grid md:grid-cols-4 gap-8">
                                    {[
                                        { el: "Fire Venus", effect: "Adventurous and passionate. Values excitement, directness, and playfulness in love." },
                                        { el: "Earth Venus", effect: "Sensual and committed. Values stability, physical touch, and material security." },
                                        { el: "Air Venus", effect: "Intellectual and social. Values conversation, freedom, and mental connection." },
                                        { el: "Water Venus", effect: "Deeply emotional and devoted. Values intimacy, soul connection, and empathy." }
                                    ].map((item, i) => (
                                        <div key={i} className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-inner">
                                            <h4 className="font-black text-pink-600 mb-4 uppercase text-sm tracking-widest">{item.el}</h4>
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
                        <div className="mt-24 p-12 rounded-[3.5rem] bg-linear-to-br from-pink-600 to-rose-700 text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
                                <div className="space-y-6 max-w-xl">
                                    <h3 className="text-3xl md:text-4xl font-black tracking-tight">Expand Your Chart</h3>
                                    <p className="text-pink-100 text-lg leading-relaxed">
                                        Venus is just one planet in your cosmic blueprint. See how it interacts with your Sun, Moon, and Rising signs for the full picture.
                                    </p>
                                </div>
                                <Link href="/sun-moon-rising-calculator" className="px-12 py-6 bg-white text-pink-600 rounded-[2rem] font-black text-xl hover:scale-105 transition-transform shadow-xl whitespace-nowrap">
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

