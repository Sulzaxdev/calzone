import BigThreeCalculator from "./calculator";
import Link from "next/link";
import { Sun, Moon, ArrowUpRight, BookOpen, ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { SocialShare } from "@/components/ui/social-share";
import { FAQAccordion } from "@/components/ui/faq-accordion";

const SUN_MOON_RISING_FAQS = [
    {
        question: "How To Calculate Sun Moon And Rising Sign?",
        answer: "Enter your birth date, exact time, birth city into our Sun Moon and Rising sign calculator. Your birth date determines your Sun sign. Your birth time and location are needed for your Moon and Rising signs. Hit calculate and your Big Three results appear instantly."
    },
    {
        question: "Where Can I Find An Online Sun Moon Rising Sign Calculator?",
        answer: "CalZone's free Sun Moon and Rising Sign Calculator is a great place to start, just enter your birth details and get your Big Three instantly, no sign-up needed."
    },
    {
        question: "What Do My Sun, Moon And Ascendant Signs Mean?",
        answer: "Your Sun sign is your core self, who you are at your most essential. Your Moon sign is your emotional interior, how you feel, what you need and how you react when your guard is down. Your Ascendant (Rising sign) is energy you project outward, the version of you that people meet before they truly know you. Together they tell a far more complete story than any single sign can."
    },
    {
        question: "How To Use A Sun Moon And Rising Sign Calculator Tool?",
        answer: "It is straightforward. Enter your date of birth, your exact birth time, the city where you were born. The calculator does the rest, pinpointing where the Sun, Moon and horizon were positioned at your birth moment. Within seconds you will see all three signs along with what each one means for your personality and emotional life."
    },
    {
        question: "How important is birth time for my rising sign?",
        answer: "Your birth time is everything for your Rising sign. The Ascendant shifts into a new zodiac sign roughly every two hours, so even a 30-minute difference can change your result entirely. Your Sun sign is fine with just your birth date. Your Moon sign is usually fine too, unless you were born on a day the Moon was changing signs. But your Rising sign simply cannot be calculated without an accurate birth time, which is why checking your birth certificate is always worth it."
    },
    {
        question: "What is my ascendant and moon sign?",
        answer: "Your Ascendant is the zodiac sign that was rising on the eastern horizon at the exact moment you were born. It shapes your appearance, your instinctive approach to life and the first impression you make. Your Moon sign is where the Moon was positioned in the zodiac at your birth, it governs your emotions, your inner world and what you need to feel safe and settled. Both require your birth time and location to calculate accurately."
    }
];

export default function BigThreeCalculatorPage() {
    return (
        <>
            <JsonLd 
                type="SoftwareApplication"
                name="Sun Moon and Rising Sign Calculator"
                description="Reveal your Sun sign, Moon sign and Rising sign instantly using our free calculator. Just enter your birth date, time and location to discover three astrological placements that shape your personality, emotions and energy you project to the world."
                url="https://www.thecalzone.co.uk"
                path="/sun-moon-rising-calculator"
                faqs={SUN_MOON_RISING_FAQS}
            />
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">


            <div className="container mx-auto px-4 pt-8">
                <Breadcrumbs items={[{ label: "Astrology", href: "/astrology-calculators" }, { label: "Sun Moon and Rising Sign Calculator" }]} />
                <BigThreeCalculator />
                <SocialShare title="Free Sun Moon and Rising Sign Calculator" />

                <section className="mt-20 max-w-6xl mx-auto">
                    <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-8 md:p-16 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none">
                        
                        <div className="space-y-12">
                            {/* H1 Section */}
                            <div className="space-y-6">
                                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white">
                                    Sun Moon and Rising Sign Calculator
                                </h1>
                                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl font-medium">
                                    Reveal your Sun sign, Moon sign and Rising sign instantly using our free calculator. Just enter your birth date, time and location to discover three astrological placements that shape your personality, emotions and energy you project to the world.
                                </p>
                            </div>

                            {/* H2: What Are Sun, Moon and Rising Signs? */}
                            <div className="space-y-6">
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                                    What Are Sun, Moon and Rising Signs?
                                </h2>
                                <div className="space-y-4 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                    <p>
                                        Your Sun, Moon, and Rising signs together known as your Big Three, are three most important placements in your birth chart. While most people only know their Sun sign from their birthday, your Big Three gives a far richer and more accurate picture of who you really are.
                                    </p>
                                    <p className="font-bold text-slate-900 dark:text-white">Think of it this way:</p>
                                    <ul className="space-y-3 list-none pl-0">
                                        <li className="flex items-start gap-3">
                                            <div className="mt-1.5 w-2 h-2 rounded-full bg-indigo-600" />
                                            <span>Your Sun sign is who you are at your core</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="mt-1.5 w-2 h-2 rounded-full bg-indigo-600" />
                                            <span>Your Moon sign is how you feel on inside</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="mt-1.5 w-2 h-2 rounded-full bg-indigo-600" />
                                            <span>Your Rising sign is how the world sees you</span>
                                        </li>
                                    </ul>
                                    <p>
                                        All three work together. Two people born on same day can have completely different personalities simply because their Moon and Rising signs differ. Knowing all three is real starting point for understanding your astrological identity.
                                    </p>
                                </div>
                            </div>

                            {/* H2: How Our Sun Moon and Rising Sign Calculator Works */}
                            <div className="space-y-6">
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                                    How Our Sun Moon and Rising Sign Calculator Works
                                </h2>
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Our Sun Moon and Rising Sign Calculator uses high-precision astronomical calculations to pinpoint the exact positions of the Sun, Moon and Ascendant at your birth moment. Here is what happens when you hit calculate:
                                </p>
                                <ul className="space-y-4 list-none pl-0">
                                    {[
                                        "Your birth location is converted to precise geographic coordinates (latitude and longitude)",
                                        "Your birth time is adjusted to Universal Time (UTC) based on the historical timezone of your birth city",
                                        "The calculator determines the exact position of the Sun in the zodiac at your birth moment, giving your Sun sign",
                                        "The same process pinpoints the Moon's position, giving your Moon sign",
                                        "The zodiac sign rising on the eastern horizon at that exact moment becomes your Rising sign (Ascendant)"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 flex items-center justify-center font-bold text-sm">{i+1}</span>
                                            <span className="text-slate-600 dark:text-slate-400">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                    The more precise your birth details, the more accurate your results, particularly for the Moon and Rising signs.
                                </p>
                            </div>

                            {/* H2: Your Sun Sign */}
                            <div className="space-y-6">
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                                    Your Sun Sign
                                </h2>
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Your Sun sign is determined by position of the Sun in the zodiac at the moment of your birth. Because the Sun moves through each of the twelve zodiac signs over the course of a year, it stays in each sign for roughly one month. This is the sign most people know, the one you find in daily horoscopes.
                                </p>
                                <div className="p-8 rounded-[2.5rem] bg-orange-50/50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-800/50">
                                    <h4 className="text-xl font-bold text-orange-900 dark:text-orange-200 mb-4">Your Sun sign represents:</h4>
                                    <ul className="space-y-3 list-none pl-0">
                                        {[
                                            "Your core personality and fundamental character",
                                            "Your ego, how you see yourself and want to be seen",
                                            "Your life direction and what energises you most",
                                            "The qualities you express most consciously and naturally"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center gap-3">
                                                <Sun className="w-5 h-5 text-orange-500" />
                                                <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                    If you have ever felt like your Sun sign description does not quite fit you, that is completely normal. Your Moon and Rising signs can be so different from your Sun sign that they significantly colour your outward personality and emotional life. The Sun sign is just one layer of the picture.
                                </p>
                            </div>

                            {/* H3: Sun Sign Dates Table */}
                            <div className="space-y-8">
                                <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                    Sun Sign Dates
                                </h3>
                                <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50 dark:bg-slate-800/50">
                                                <th className="p-6 font-black text-slate-900 dark:text-white">Zodiac Sign</th>
                                                <th className="p-6 font-black text-slate-900 dark:text-white">Dates</th>
                                                <th className="p-6 font-black text-slate-900 dark:text-white">Element</th>
                                                <th className="p-6 font-black text-slate-900 dark:text-white">Key Traits</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                            {[
                                                { sign: "Aries", dates: "21 Mar - 19 Apr", element: "Fire", traits: "Bold, ambitious, pioneering" },
                                                { sign: "Taurus", dates: "20 Apr - 20 May", element: "Earth", traits: "Reliable, patient, sensual" },
                                                { sign: "Gemini", dates: "21 May - 20 Jun", element: "Air", traits: "Curious, adaptable, witty" },
                                                { sign: "Cancer", dates: "21 Jun - 22 Jul", element: "Water", traits: "Nurturing, intuitive, protective" },
                                                { sign: "Leo", dates: "23 Jul - 22 Aug", element: "Fire", traits: "Confident, generous, creative" },
                                                { sign: "Virgo", dates: "23 Aug - 22 Sep", element: "Earth", traits: "Analytical, detail-oriented, helpful" },
                                                { sign: "Libra", dates: "23 Sep - 22 Oct", element: "Air", traits: "Diplomatic, fair, harmonious" },
                                                { sign: "Scorpio", dates: "23 Oct - 21 Nov", element: "Water", traits: "Intense, passionate, transformative" },
                                                { sign: "Sagittarius", dates: "22 Nov - 21 Dec", element: "Fire", traits: "Adventurous, optimistic, philosophical" },
                                                { sign: "Capricorn", dates: "22 Dec - 19 Jan", element: "Earth", traits: "Ambitious, disciplined, responsible" },
                                                { sign: "Aquarius", dates: "20 Jan - 18 Feb", element: "Air", traits: "Innovative, independent, humanitarian" },
                                                { sign: "Pisces", dates: "19 Feb - 20 Mar", element: "Water", traits: "Compassionate, imaginative, intuitive" }
                                            ].map((row, i) => (
                                                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                                    <td className="p-6 font-bold text-slate-900 dark:text-white">{row.sign}</td>
                                                    <td className="p-6 text-slate-600 dark:text-slate-400">{row.dates}</td>
                                                    <td className="p-6 text-slate-600 dark:text-slate-400">{row.element}</td>
                                                    <td className="p-6 text-slate-600 dark:text-slate-400">{row.traits}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* H2: Your Moon Sign */}
                            <div className="space-y-6">
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                                    Your Moon Sign
                                </h2>
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Your Moon sign is one of the most personal and revealing placements in your entire birth chart, yet it is also one most people overlook. The Moon moves through all twelve zodiac signs in just one month, spending roughly two and a half days in each sign. This means your Moon sign is far more individual than your Sun sign and calculating it accurately requires your birth date, birth time and birth location.
                                </p>
                                <div className="p-8 rounded-[2.5rem] bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/50">
                                    <h4 className="text-xl font-bold text-blue-900 dark:text-blue-200 mb-4">Your Moon sign governs:</h4>
                                    <ul className="space-y-3 list-none pl-0">
                                        {[
                                            "Your emotional nature, how you feel and process feelings",
                                            "Your inner world, the private self most people do not see",
                                            "What makes you feel safe, nurtured and at home",
                                            "Your instinctive reactions when life gets difficult",
                                            "How you comfort yourself and what you need from close relationships"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center gap-3">
                                                <Moon className="w-5 h-5 text-blue-500" />
                                                <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Here is why the Moon sign matters so much: when someone meets you, they see your Rising sign first. When they get to know you, they understand your Sun sign. But when you are truly yourself, in private, in relationships, in moments of stress, that is your Moon sign showing up.
                                </p>
                            </div>

                            {/* H2: Your Rising Sign */}
                            <div className="space-y-6">
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                                    Your Rising Sign
                                </h2>
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Your Rising sign (also called your Ascendant) is the zodiac sign that was coming up over the eastern horizon at exact minute you were born. Because the Earth rotates once every 24 hours, Rising sign shifts approximately every two hours throughout the day. This makes it the most time-sensitive placement in your entire chart and reason why this calculator needs your exact birth time.
                                </p>
                                <div className="p-8 rounded-[2.5rem] bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/50">
                                    <h4 className="text-xl font-bold text-indigo-900 dark:text-indigo-200 mb-4">Your Rising sign shapes:</h4>
                                    <ul className="space-y-3 list-none pl-0">
                                        {[
                                            "The first impression you make on strangers",
                                            "Your physical appearance and personal style",
                                            "The energy and vibe you naturally project",
                                            "How you approach new situations and beginnings",
                                            "The structure of your twelve astrological houses"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center gap-3">
                                                <ArrowUpRight className="w-5 h-5 text-indigo-500" />
                                                <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Your Rising sign is essentially a filter through which your entire chart is experienced. It sets the scene for your life. The backdrop against which your Sun and Moon play their roles. Many people feel their Rising sign describes how others perceive them more accurately than their Sun sign describes how they see themselves.
                                </p>
                            </div>

                            {/* H3: Why Your Rising Sign Changes Every Two Hours */}
                            <div className="space-y-6">
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                    Why Your Rising Sign Changes Every Two Hours
                                </h3>
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                    A small difference in birth time can mean a completely different Rising sign. If you were born at 11:45pm versus 12:05am, your Ascendant could shift into an entirely new sign, changing the interpretation significantly. This is why astrologers always ask for your exact birth time and why a birth certificate is the most reliable source.
                                </p>
                            </div>

                            {/* H2: How Your Big Three Work Together */}
                            <div className="space-y-8">
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                                    How Your Big Three Work Together
                                </h2>
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Understanding each sign individually is useful. But the real insight comes from seeing how your Sun, Moon and Rising signs interact as a system.
                                </p>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                        <h4 className="font-bold text-slate-900 dark:text-white mb-4">Example 1: The Reserved Charismatic</h4>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 italic">Sun in Leo, Moon in Pisces, Rising in Capricorn</p>
                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                            On the surface: responsible, reserved, serious (Capricorn Rising). Inside: deeply sensitive, empathetic, dreamy (Pisces Moon). At the core: naturally charismatic, expressive, wanting to be seen (Leo Sun). The result? Someone who appears disciplined and professional but has a rich emotional interior and a genuine need for creative expression.
                                        </p>
                                    </div>
                                    <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                        <h4 className="font-bold text-slate-900 dark:text-white mb-4">Example 2: The Mysterious Communicator</h4>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 italic">Sun in Gemini, Moon in Taurus, Rising in Scorpio</p>
                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                            First impression: intense, magnetic, mysterious (Scorpio Rising). Emotional core: grounded, comfort-seeking, resistant to sudden change (Taurus Moon). Core identity: curious, communicative, adaptable (Gemini Sun). This person might come across as more serious and guarded than they actually feel, with an inner need for stability that contradicts their natural curiosity.
                                        </p>
                                    </div>
                                </div>
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                    This is exactly why knowing all three signs matters. Your Sun sign alone only tells a fraction of the story.
                                </p>
                            </div>

                            {/* H2: The Four Elements */}
                            <div className="space-y-8">
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                                    The Four Elements
                                </h2>
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Each of the twelve zodiac signs belongs to one of four elements. Understanding which elements your Sun, Moon and Rising fall into helps you understand the overall energy of your Big Three.
                                </p>
                                <div className="grid md:grid-cols-2 gap-8">
                                    {[
                                        { title: "Fire Signs", signs: "Aries, Leo, Sagittarius", desc: "Passionate, spontaneous and action-oriented. Fire placements bring enthusiasm, courage and natural leadership energy. When multiple placements fall in fire signs, a person tends to be bold, expressive and driven." },
                                        { title: "Earth Signs", signs: "Taurus, Virgo, Capricorn", desc: "Grounded, practical and reliable. Earth placements bring stability, patience and a focus on the material world. A strong earth influence means someone who values security and builds things that last." },
                                        { title: "Air Signs", signs: "Gemini, Libra, Aquarius", desc: "Intellectual, communicative and socially oriented. Air placements bring curiosity, flexibility and a love of ideas. Air-dominant charts tend toward analytical thinking and strong people skills." },
                                        { title: "Water Signs", signs: "Cancer, Scorpio, Pisces", desc: "Emotional, intuitive and deeply perceptive. Water placements bring sensitivity, empathy and rich inner lives. A water-heavy chart often means someone who feels everything deeply, sometimes more than they show." }
                                    ].map((el, i) => (
                                        <div key={i} className="space-y-4">
                                            <h3 className="text-2xl font-black text-slate-900 dark:text-white">{el.title} : {el.signs}</h3>
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{el.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* H2: What If I Don't Know My Birth Time? */}
                            <div className="space-y-6">
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                                    What If I Don't Know My Birth Time?
                                </h2>
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                    This is the most common question people have and it comes up constantly. Here is what you need to know.
                                </p>
                                <div className="space-y-4">
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Your Sun sign does not need a birth time. The Sun moves slowly enough that your date of birth is sufficient in almost all cases (unless you were born right on a cusp, where the sign was changing that day).
                                    </p>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Your Moon sign may be affected. The Moon spends about two and a half days in each sign. If you were born on a day when the Moon was transitioning between signs, your exact birth time matters. Without it, you may get the wrong Moon sign.
                                    </p>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Your Rising sign absolutely requires your birth time. Without it, it is impossible to calculate your Ascendant accurately. The Rising sign changes every two hours, so even a rough estimate can produce the wrong result.
                                    </p>
                                </div>
                            </div>

                            {/* H3: Where to Find Your Birth Time in the UK */}
                            <div className="space-y-6">
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                    Where to Find Your Birth Time in the UK
                                </h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {[
                                        "Birth certificate: The most reliable source. Long-form UK birth certificates often include the time of birth",
                                        "Hospital records: Contact the hospital where you were born and request your medical birth records",
                                        "Baby book: Parents often recorded the time of birth in baby books or birth announcements",
                                        "Family members: Ask parents, grandparents or relatives who were present at your birth",
                                        "GP records: Your GP may have access to early health records that include birth time"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
                                            <div className="w-2 h-2 rounded-full bg-indigo-600" />
                                            <p className="text-slate-600 dark:text-slate-400 font-medium">{item}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-6 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic">
                                        If you genuinely cannot find your birth time, enter 12:00 noon as a placeholder. Your Sun sign result will still be accurate, your Moon sign will be approximate and your Rising sign should be treated as unknown.
                                    </p>
                                </div>
                            </div>

                            {/* H2: Tropical vs Sidereal Zodiac */}
                            <div className="space-y-6">
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                                    Tropical vs Sidereal Zodiac : Which Does This Calculator Use?
                                </h2>
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                    If you have explored astrology at all, you may have come across two different systems: tropical and sidereal. Here is a simple explanation of both.
                                </p>
                                <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                                    <p>
                                        <span className="font-bold text-slate-900 dark:text-white">Tropical zodiac (used by this calculator)</span> is the system used in Western astrology. It is based on the seasons and the position of the Sun relative to the Earth's equinoxes. This is the system behind the familiar date-based zodiac signs most people know.
                                    </p>
                                    <p>
                                        <span className="font-bold text-slate-900 dark:text-white">Sidereal zodiac</span> is used in Vedic (Hindu) astrology. It is based on the actual positions of the constellations in the sky. Because the Earth's axis slowly wobbles over thousands of years (a movement called precession), the sidereal zodiac has drifted roughly 23–24 degrees from the tropical zodiac. This means your Vedic signs are typically one sign earlier than your Western signs.
                                    </p>
                                    <p>
                                        Neither system is more "correct", they simply answer different questions and come from different cultural traditions. This calculator uses the tropical zodiac, which is the standard for Western astrology.
                                    </p>
                                </div>
                            </div>

                            {/* H2: Frequently Asked Questions */}
                            <div className="space-y-12">
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight text-center">
                                    Frequently Asked Questions
                                </h2>
                                <FAQAccordion faqs={SUN_MOON_RISING_FAQS} withSchema={false} />
                            </div>

                            {/* Other Internal Linking */}
                            <div className="pt-12 border-t border-slate-100 dark:border-slate-800">
                                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Other internal linking</h4>
                                <p className="text-slate-600 dark:text-slate-400 mb-6">Once you know your Big Three, there is much more to discover in your birth chart.</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { label: "Moon Sign Calculator", href: "/moon-sign-calculator" },
                                        { label: "Rising Sign Calculator", href: "/rising-sign-calculator" },
                                        { label: "Sun Sign Calculator", href: "/sun-sign-calculator" },
                                        { label: "Venus Sign Calculator", href: "/venus-sign-calculator" },
                                        { label: "Chiron Sign Calculator", href: "/chiron-sign-calculator" },
                                        { label: "Lilith Sign Calculator", href: "/lilith-sign-calculator" },
                                        { label: "North Node Calculator", href: "/north-node-calculator" }
                                    ].map((link) => (
                                        <Link key={link.href} href={link.href} className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
                                            <ChevronRight className="w-4 h-4" />
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* References */}
                            <div className="pt-12 border-t border-slate-100 dark:border-slate-800">
                                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-6">References</h4>
                                <ul className="space-y-4 list-none pl-0">
                                    {[
                                        "Astro.com (Astrodienst), Swiss Ephemeris: High-precision astronomical calculation library used in professional astrology software",
                                        "Wikipedia, Ascendant (Rising Sign): The zodiac sign rising on the eastern horizon at the time of birth",
                                        "Wikipedia, Astrological Sign: Overview of the Western zodiac system and tropical zodiac",
                                        "Wikipedia, Astrology and Classical Elements: Fire, Earth, Air, and Water signs in Western astrology",
                                        "International Society for Astrological Research (ISAR), Western astrology standards and tropical zodiac methodology",
                                        "Café Astrology, Birth Chart Interpretation Guidelines: Sun, Moon, and Ascendant placements"
                                    ].map((reference, i) => (
                                        <li key={`ref-${i}`} className="flex items-start gap-3 text-sm text-slate-500 dark:text-slate-500">
                                            <BookOpen className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                            <span>{reference}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
            </div>
        </>
    );
}
