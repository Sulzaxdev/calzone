import PartOfFortuneCalculator from "./calculator";
import Link from "next/link";
import { Anchor, Sparkles, ChevronRight } from "lucide-react";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export default function PartOfFortunePage() {
    const faqs = [
        {
            question: "What is the Part of Fortune?",
            answer: "The Part of Fortune (Pars Fortunae) is an Arabic Part or mathematical point in the natal chart calculated using the positions of the Sun, Moon, and Rising sign (Ascendant). It represents an area of life where you can find great success, joy, and prosperity."
        },
        {
            question: "How is it calculated?",
            answer: "The formula changes depending on whether you were born during the day or night. Day birth: Ascendant + Moon - Sun. Night birth: Ascendant + Sun - Moon. This ensures the point reflects the unique relationship between your physical self, your soul, and your identity."
        },
        {
            question: "What does its sign tell me?",
            answer: "The zodiac sign of your Part of Fortune indicates the *quality* or *manner* in which you attract luck and fulfillment. For example, in Leo, success may come through creative self-expression."
        },
        {
            question: "Does it guarantee wealth?",
            answer: "Not necessarily material wealth in the traditional sense, but it points to 'spiritual wealth'—where things feel easy, harmonious, and naturally abundant for you."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <div className="container mx-auto px-4 pt-12">
                <PartOfFortuneCalculator />
                
                <section className="mt-20 max-w-6xl mx-auto space-y-16">
                    <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 md:p-20 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none transition-all">
                        {/* Title and Intro */}
                        <div className="space-y-8 mb-16">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-3xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center shadow-inner">
                                    <Anchor className="w-8 h-8 text-yellow-600" />
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                                    The Golden Point: <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-600">Deep Dive into Your Part of Fortune</span>
                                </h2>
                            </div>
                            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl font-medium">
                                In Hellenistic astrology, the Part of Fortune is considered a key indicator of your physical well-being and worldly success. It is the place in your chart where the Sun, Moon, and Ascendant come into perfect alignment.
                            </p>
                        </div>

                        {/* Detailed Long-Form Sections */}
                        <div className="space-y-24">
                            {/* Section 1: The Arabic Parts */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">01</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">Mathematics of the Soul</h3>
                                </div>
                                <div className="grid lg:grid-cols-2 gap-16">
                                    <div className="space-y-8">
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            The Part of Fortune (Pars Fortunae) is the most famous of the "Arabic Parts"—mathematical points calculated from the positions of the planets and house cusps. For the Part of Fortune, we look at the relationship between the Sun (your spirit), the Moon (your soul), and the Ascendant (your physical body). 
                                        </p>
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            The calculation is unique because it accounts for whether you were born during the day or night. This ensures that the point accurately reflects how you ground your spiritual energy into the material world. It is the "lucky spot" where your core internal and external energies harmonize perfectly.
                                        </p>
                                    </div>
                                    <div className="bg-yellow-50/50 dark:bg-yellow-900/10 p-10 rounded-[3rem] border border-yellow-100 dark:border-yellow-800/50">
                                        <h4 className="text-xl font-bold mb-6">Fortune Core Pillars:</h4>
                                        <div className="space-y-6">
                                            {[
                                                { title: "Physical Vitality", desc: "Your natural health and energy levels." },
                                                { title: "Worldly Success", desc: "Where you find the path of least resistance to prosperity." },
                                                { title: "Emotional Peace", desc: "The activities that bring you a sense of quiet joy." },
                                                { title: "Karmic Reward", desc: "The fruits of your soul's efforts coming into fruition." }
                                            ].map((item, i) => (
                                                <div key={i} className="flex gap-4 items-start">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5 shrink-0" />
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

                            {/* Section 2: Finding Your Prosperity */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">02</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">Unlocking Your Luck</h3>
                                </div>
                                <div className="prose prose-slate dark:prose-invert max-w-none">
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Your Part of Fortune doesn't just mean "money." It means "wholeness." When you lean into the sign and house placement of your Part of Fortune, you feel a sense of alignment and ease. It is where you don't have to "try" as hard to be successful because you are working with the natural grain of your life path.
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-12 my-12">
                                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 shadow-sm">
                                            <h4 className="text-xl font-bold mb-4">The Sign Influence</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed">
                                                The sign indicates the *manner* of your success. If your Part of Fortune is in Taurus, you find luck through persistence and sensory experiences. In Aquarius, success comes through innovation and community.
                                            </p>
                                        </div>
                                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 shadow-sm">
                                            <h4 className="text-xl font-bold mb-4">The House Influence</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed">
                                                The house indicates the *area* of life. In the 2nd house, fortune relates to personal finances; in the 10th house, it relates to career and public reputation.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Elements of Success */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                    <span className="text-7xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">03</span>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white">Prosperity by Element</h3>
                                </div>
                                <div className="grid md:grid-cols-4 gap-8">
                                    {[
                                        { el: "Fire Fortune", effect: "Success through bold action, creativity, and leadership." },
                                        { el: "Earth Fortune", effect: "Success through persistence, building, and physical mastery." },
                                        { el: "Air Fortune", effect: "Success through communication, ideas, and networking." },
                                        { el: "Water Fortune", effect: "Success through intuition, empathy, and emotional depth." }
                                    ].map((item, i) => (
                                        <div key={i} className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-inner">
                                            <h4 className="font-black text-yellow-600 mb-4 uppercase text-sm tracking-widest">{item.el}</h4>
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
                        <div className="mt-24 p-12 rounded-[3.5rem] bg-linear-to-br from-yellow-500 to-amber-600 text-white shadow-2xl relative overflow-hidden text-center md:text-left">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                                <div className="space-y-6 max-w-xl">
                                    <h3 className="text-3xl md:text-4xl font-black tracking-tight">Your Complete Map</h3>
                                    <p className="text-amber-100 text-lg leading-relaxed">
                                        The Part of Fortune is your pot of gold, but you need your Sun, Moon, and Rising signs to find it. Calculate them all together for the full picture.
                                    </p>
                                </div>
                                <Link href="/sun-moon-rising-calculator" className="px-12 py-6 bg-white text-yellow-600 rounded-[2rem] font-black text-xl hover:scale-105 transition-transform shadow-xl whitespace-nowrap">
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

