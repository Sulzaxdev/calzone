import ChironCalculator from "./calculator";
import Link from "next/link";
import { Zap, Sparkles, ChevronRight } from "lucide-react";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export default function ChironPage() {
    const faqs = [
        {
            question: "What does Chiron represent in astrology?",
            answer: "Chiron is known as the 'Wounded Healer.' In your natal chart, it represents your deepest emotional or spiritual wounds and the unique wisdom you gain by healing them."
        },
        {
            question: "How does Chiron affect my life path?",
            answer: "Chiron often points to an area where you feel insecure or 'broken,' but through working on these vulnerabilities, you develop the power to guide and heal others in that same area."
        },
        {
            question: "Is Chiron a planet?",
            answer: "Astronomically, Chiron is a minor planet or centaur (part comet, part asteroid). In astrology, it is treated as a highly significant point for psychological and spiritual growth."
        },
        {
            question: "Why do I need an accurate birth time for Chiron?",
            answer: "While Chiron moves slowly, its house placement and aspects to other planets depend entirely on your exact birth time and location."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <div className="container mx-auto px-4 pt-12">
                <ChironCalculator />
                
                <section className="mt-20 max-w-6xl mx-auto space-y-16">
                    <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 md:p-20 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none transition-all">
                        {/* Title and Intro */}
                        <div className="space-y-8 mb-16">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shadow-inner">
                                    <Zap className="w-8 h-8 text-amber-600" />
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                                    The Wounded Healer: <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Deep Dive into Your Chiron Sign</span>
                                </h2>
                            </div>
                            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl font-medium">
                                Chiron represents the bridge between the inner and outer planets. In your birth chart, its placement reveals where you have experienced core wounds—often from early life—that eventually become your greatest source of wisdom and strength.
                            </p>
                        </div>

                        {/* Detailed Long-Form Sections */}
                        <div className="space-y-24">
                            {/* Section 1: Mythology and Symbolism */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">01</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">The Myth of the Centaur</h3>
                                </div>
                                <div className="grid lg:grid-cols-2 gap-16">
                                    <div className="space-y-8">
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            In Greek mythology, Chiron was a centaur—half-man, half-horse—who was a master of the healing arts, music, and prophecy. Unlike other centaurs, he was wise and disciplined. However, he was accidentally wounded by a poisoned arrow. Being immortal, he could not die, but he also could not heal himself. 
                                        </p>
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            This paradox is the heart of Chiron's astrological meaning. It represents a part of us that is "broken" but through that very brokenness, we gain the ability to heal others. It is the "Sacred Wound" that drives our soul's evolution.
                                        </p>
                                    </div>
                                    <div className="bg-amber-50/50 dark:bg-amber-900/10 p-10 rounded-[3rem] border border-amber-100 dark:border-amber-800/50">
                                        <h4 className="text-xl font-bold mb-6">Chiron's Core Themes:</h4>
                                        <div className="space-y-6">
                                            {[
                                                { title: "The Primal Wound", desc: "A deep sense of inadequacy or rejection often dating back to childhood." },
                                                { title: "The Master Teacher", desc: "The wisdom gained through suffering and integration." },
                                                { title: "The Bridge", desc: "Connecting our material existence (horse) with our spiritual consciousness (man)." },
                                                { title: "Self-Sacrifice", desc: "Learning when to heal others and when to focus on our own recovery." }
                                            ].map((item, i) => (
                                                <div key={i} className="flex gap-4 items-start">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
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

                            {/* Section 2: Healing Potential */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">02</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">Turning Pain into Purpose</h3>
                                </div>
                                <div className="prose prose-slate dark:prose-invert max-w-none">
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Chiron's sign in your chart describes the *nature* of your wound, while its house placement shows the *area of life* where it manifests. For example, Chiron in Aries may struggle with self-assertion and identity, while Chiron in the 7th house may experience wounds through partnerships and social interaction.
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-12 my-12">
                                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 shadow-sm">
                                            <h4 className="text-xl font-bold mb-4">Integration Over Cure</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed">
                                                In astrology, we don't "fix" Chiron. Instead, we integrate the wound. By accepting our vulnerabilities, we stop fighting ourselves and start using our experiences to empower others.
                                            </p>
                                        </div>
                                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 shadow-sm">
                                            <h4 className="text-xl font-bold mb-4">The Gift of Empathy</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed">
                                                Because you have felt the specific pain of your Chiron placement, you possess a "superpower" of empathy for others suffering in that same way. This is why many therapists and healers have strong Chiron placements.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Chiron Through the Zodiac */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">03</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">Sign Interpretations</h3>
                                </div>
                                <div className="grid md:grid-cols-3 gap-8">
                                    {[
                                        { el: "Fire Signs", effect: "Wounds around action, ego, and inspiration. Healing comes through finding true courage." },
                                        { el: "Earth Signs", effect: "Wounds around security, body image, and productivity. Healing comes through self-worth." },
                                        { el: "Air Signs", effect: "Wounds around communication, social belonging, and ideas. Healing comes through truth." },
                                        { el: "Water Signs", effect: "Wounds around intimacy, boundaries, and grief. Healing comes through emotional depth." }
                                    ].map((item, i) => (
                                        <div key={i} className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-inner">
                                            <h4 className="font-black text-amber-600 mb-4 uppercase text-sm tracking-widest">{item.el}</h4>
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
                        <div className="mt-24 p-12 rounded-[3.5rem] bg-linear-to-br from-amber-600 to-orange-700 text-white shadow-2xl relative overflow-hidden text-center md:text-left">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                                <div className="space-y-6 max-w-xl">
                                    <h3 className="text-3xl md:text-4xl font-black tracking-tight">The Big Three Connection</h3>
                                    <p className="text-amber-100 text-lg leading-relaxed">
                                        How does your "Sacred Wound" interact with your core identity? Combine Chiron with your Sun, Moon, and Rising signs.
                                    </p>
                                </div>
                                <Link href="/sun-moon-rising-calculator" className="px-12 py-6 bg-white text-amber-600 rounded-[2rem] font-black text-xl hover:scale-105 transition-transform shadow-xl whitespace-nowrap">
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

