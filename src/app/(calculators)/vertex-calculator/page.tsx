import VertexCalculator from "./calculator";
import Link from "next/link";
import { Shield, Sparkles, ChevronRight } from "lucide-react";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export default function VertexPage() {
    const faqs = [
        {
            question: "What is the Vertex in astrology?",
            answer: "The Vertex is a mathematical point located at the intersection of the prime vertical and the ecliptic. It is often referred to as the 'Third Angle' of the chart and represents fated encounters, serendipitous events, and people who enter our lives to change our direction."
        },
        {
            question: "How does the Vertex feel in real life?",
            answer: "Activation of the Vertex often feels like a 'turning point' or a 'stroke of fate.' You might meet someone who feels instantly familiar or experience a sudden opportunity that seems meant to be."
        },
        {
            question: "Why do I need an exact birth time?",
            answer: "The Vertex is extremely sensitive to time and location. Even a few minutes difference in birth time can shift the Vertex to a different sign or degree, making precise data essential."
        },
        {
            question: "Is the Vertex always positive?",
            answer: "Not necessarily 'positive' in a simple way, but always significant. It represents experiences that are necessary for your soul's growth, even if they are challenging at first."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <div className="container mx-auto px-4 pt-12">
                <VertexCalculator />
                
                <section className="mt-20 max-w-6xl mx-auto space-y-16">
                    <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 md:p-20 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none transition-all">
                        {/* Title and Intro */}
                        <div className="space-y-8 mb-16">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shadow-inner border border-slate-200 dark:border-slate-700">
                                    <Shield className="w-8 h-8 text-slate-600 dark:text-slate-400" />
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                                    The Gate of Fate: <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-indigo-600">Deep Dive into Your Vertex</span>
                                </h2>
                            </div>
                            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl font-medium">
                                The Vertex is one of the most mysterious points in modern astrology. It is often called the "destiny point" because it represents experiences and relationships that feel beyond our conscious control.
                            </p>
                        </div>

                        {/* Detailed Long-Form Sections */}
                        <div className="space-y-24">
                            {/* Section 1: The Third Angle */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">01</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">What is the Vertex?</h3>
                                </div>
                                <div className="grid lg:grid-cols-2 gap-16">
                                    <div className="space-y-8">
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            Mathematically, the Vertex is the point where the prime vertical intersects the ecliptic in the western hemisphere. In simpler terms, it is a point on the right side of your chart that acts as a "secondary descendant." While the Ascendant/Descendant axis is about your conscious self and partners, the Vertex/Anti-Vertex axis is about **fate**.
                                        </p>
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            The Vertex is often activated by transits or through synastry with others. When a person's planet touches your Vertex, they often feel like they were "meant" to meet you. These encounters are rarely small; they usually signal a significant shift in your life direction.
                                        </p>
                                    </div>
                                    <div className="bg-slate-50/50 dark:bg-slate-800/30 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-700">
                                        <h4 className="text-xl font-bold mb-6">Vertex Core Pillars:</h4>
                                        <div className="space-y-6">
                                            {[
                                                { title: "Serendipity", desc: "Finding exactly what you need when you least expect it." },
                                                { title: "Turning Points", desc: "Major life events that re-orient your soul's compass." },
                                                { title: "Fated Connections", desc: "Meeting 'soulmates' or individuals who trigger massive growth." },
                                                { title: "Karmic Appointments", desc: "Events that feel predestined or 'written in the stars'." }
                                            ].map((item, i) => (
                                                <div key={i} className="flex gap-4 items-start">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-1.5 shrink-0" />
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

                            {/* Section 2: Anti-Vertex and Polarity */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">02</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">The Mirror Point: Anti-Vertex</h3>
                                </div>
                                <div className="prose prose-slate dark:prose-invert max-w-none">
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Opposite the Vertex lies the Anti-Vertex. While the Vertex is about what the world "does" to you or who you "meet," the Anti-Vertex is more about your own internal drive and how you initiate these fated moments. Understanding the balance between these two points is key to mastering your destiny.
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-12 my-12">
                                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 shadow-sm">
                                            <h4 className="text-xl font-bold mb-4">The Synastry Link</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed">
                                                In relationship astrology, Vertex contacts are some of the strongest indicators of a "fated" bond. If your partner's Sun or Venus is on your Vertex, the relationship will likely feel like a significant part of your life's purpose.
                                            </p>
                                        </div>
                                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 shadow-sm">
                                            <h4 className="text-xl font-bold mb-4">Timing Your Fate</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed">
                                                By tracking when planets transit over your Vertex sign, you can predict windows of time when significant "fate-driven" events are more likely to occur.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Vertex by Element */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">03</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">Fate Styles by Element</h3>
                                </div>
                                <div className="grid md:grid-cols-4 gap-8">
                                    {[
                                        { el: "Fire Vertex", effect: "Fate enters through sudden inspiration, bold actions, or creative sparks." },
                                        { el: "Earth Vertex", effect: "Fate enters through material changes, career shifts, or physical encounters." },
                                        { el: "Air Vertex", effect: "Fate enters through information, social connections, or new ideas." },
                                        { el: "Water Vertex", effect: "Fate enters through emotional breakthroughs, dreams, or intuitive bonds." }
                                    ].map((item, i) => (
                                        <div key={i} className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-inner">
                                            <h4 className="font-black text-slate-600 mb-4 uppercase text-sm tracking-widest">{item.el}</h4>
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
                        <div className="mt-24 p-12 rounded-[3.5rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden text-center md:text-left">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                                <div className="space-y-6 max-w-xl">
                                    <h3 className="text-3xl md:text-4xl font-black tracking-tight">Map Your Destiny</h3>
                                    <p className="text-slate-400 text-lg leading-relaxed">
                                        The Vertex shows the moments of fate, but your Big Three (Sun, Moon, Rising) show how you handle them. Calculate your full profile now.
                                    </p>
                                </div>
                                <Link href="/sun-moon-rising-calculator" className="px-12 py-6 bg-white text-slate-900 rounded-[2rem] font-black text-xl hover:scale-105 transition-transform shadow-xl whitespace-nowrap">
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

