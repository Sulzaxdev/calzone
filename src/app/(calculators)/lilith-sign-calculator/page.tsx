import LilithCalculator from "./calculator";
import Link from "next/link";
import { Moon, Sparkles, ChevronRight } from "lucide-react";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export default function LilithPage() {
    const faqs = [
        {
            question: "What is Black Moon Lilith?",
            answer: "Black Moon Lilith is not a planet but a mathematical point in space—the lunar apogee. In astrology, it represents your shadow self, your raw instincts, and the part of you that refuses to conform or compromise."
        },
        {
            question: "How does Lilith influence my personality?",
            answer: "It shows where you seek absolute freedom and independence. It can reveal hidden desires, suppressed power, and areas where you may experience intense passion or rebellion."
        },
        {
            question: "Is Lilith the same as the Moon sign?",
            answer: "No. Your Moon sign represents your nurturing, emotional needs. Lilith represents your primal, untamed nature and your 'shadow' side."
        },
        {
            question: "Why is Lilith often called 'dark'?",
            answer: "In mythology, Lilith was the first woman who refused to be subservient. Astrologically, 'dark' refers to the parts of our psyche that are often hidden, taboo, or difficult to express in polite society."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <div className="container mx-auto px-4 pt-12">
                <LilithCalculator />
                
                <section className="mt-20 max-w-6xl mx-auto space-y-16">
                    <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 md:p-20 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none transition-all">
                        {/* Title and Intro */}
                        <div className="space-y-8 mb-16">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-3xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center shadow-inner">
                                    <Moon className="w-8 h-8 text-red-600" />
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                                    The Dark Moon: <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-black">Deep Dive into Your Lilith Sign</span>
                                </h2>
                            </div>
                            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl font-medium">
                                Black Moon Lilith is the point in your chart where you are the most untamed and unapologetic. It represents your shadow self—the parts of you that contain your most primal strength and creative fire.
                            </p>
                        </div>

                        {/* Detailed Long-Form Sections */}
                        <div className="space-y-24">
                            {/* Section 1: Mythology and Power */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">01</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">The Legend of Lilith</h3>
                                </div>
                                <div className="grid lg:grid-cols-2 gap-16">
                                    <div className="space-y-8">
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            In ancient lore, Lilith was said to be the first woman, created from the same earth as man, who refused to be subservient and chose exile over compromise. In astrology, Black Moon Lilith is not a planet but a mathematical point—the lunar apogee, where the Moon is farthest from the Earth. 
                                        </p>
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            This distance represents our detachment from societal norms and our connection to a deeper, more primal source of power. Lilith is where we are "wild," where we refuse to settle, and where we may encounter themes of exile, rebellion, and ultimate self-sovereignty.
                                        </p>
                                    </div>
                                    <div className="bg-red-50/50 dark:bg-red-900/10 p-10 rounded-[3rem] border border-red-100 dark:border-red-800/50">
                                        <h4 className="text-xl font-bold mb-6">Lilith's Core Pillars:</h4>
                                        <div className="space-y-6">
                                            {[
                                                { title: "Primal Instincts", desc: "Your rawest, most visceral reactions to life." },
                                                { title: "Shadow Empowerment", desc: "Integrating the parts of yourself that others find 'too much'." },
                                                { title: "Personal Sovereignty", desc: "The refusal to be controlled or diminished by external forces." },
                                                { title: "Creative Rebellion", desc: "Using your unique fire to break through stagnation." }
                                            ].map((item, i) => (
                                                <div key={i} className="flex gap-4 items-start">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
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

                            {/* Section 2: Lilith in the Signs */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">02</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">Expression of the Shadow</h3>
                                </div>
                                <div className="prose prose-slate dark:prose-invert max-w-none">
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Lilith's sign reveals the specific flavor of your rebellion and shadow power. It is often where you feel a deep, burning desire for truth and authenticity, even if it makes others uncomfortable. 
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-12 my-12">
                                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 shadow-sm">
                                            <h4 className="text-xl font-bold mb-4">The Untamed Desire</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed">
                                                Lilith governs the parts of our sexuality and desire that are beyond "civilized" control. It is raw, honest, and deeply personal.
                                            </p>
                                        </div>
                                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 shadow-sm">
                                            <h4 className="text-xl font-bold mb-4">Exile and Return</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed">
                                                In the area of life where Lilith sits (her house placement), you may have felt like an outsider. Healing comes through returning to that place with your head held high.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Lilith by Element */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">03</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">Rebellion Styles by Element</h3>
                                </div>
                                <div className="grid md:grid-cols-4 gap-8">
                                    {[
                                        { el: "Fire Lilith", effect: "Rebellion through action and direct confrontation. You refuse to be silenced." },
                                        { el: "Earth Lilith", effect: "Rebellion through material independence and bodily autonomy." },
                                        { el: "Air Lilith", effect: "Rebellion through unconventional ideas and freedom of speech." },
                                        { el: "Water Lilith", effect: "Rebellion through emotional depth and psychic boundaries." }
                                    ].map((item, i) => (
                                        <div key={i} className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-inner">
                                            <h4 className="font-black text-red-600 mb-4 uppercase text-sm tracking-widest">{item.el}</h4>
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
                        <div className="mt-24 p-12 rounded-[3.5rem] bg-slate-950 text-white shadow-2xl relative overflow-hidden text-center md:text-left border border-slate-800">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full -mr-48 -mt-48 blur-3xl" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                                <div className="space-y-6 max-w-xl">
                                    <h3 className="text-3xl md:text-4xl font-black tracking-tight">Balance Your Shadows</h3>
                                    <p className="text-slate-400 text-lg leading-relaxed">
                                        Understanding your Lilith sign is the first step toward true integration. See how it balances with your Sun, Moon, and Rising signs.
                                    </p>
                                </div>
                                <Link href="/sun-moon-rising-calculator" className="px-12 py-6 bg-red-600 text-white rounded-[2rem] font-black text-xl hover:scale-105 transition-transform shadow-xl whitespace-nowrap">
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

