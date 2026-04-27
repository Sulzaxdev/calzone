import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Sun, Moon, ArrowUpRight, Heart, Star, Compass, Anchor, Zap, Shield } from "lucide-react";

const astrologyCalculators = [
    { name: "Sun Sign Calculator", href: "/sun-sign-calculator", icon: <Sun className="w-8 h-8 text-orange-500" />, desc: "Your core identity and life purpose." },
    { name: "Moon Sign Calculator", href: "/moon-sign-calculator", icon: <Moon className="w-8 h-8 text-blue-500" />, desc: "Your emotional world and inner self." },
    { name: "Rising Sign Calculator", href: "/rising-sign-calculator", icon: <ArrowUpRight className="w-8 h-8 text-indigo-500" />, desc: "How you appear to the world." },
    { name: "Big Three Calculator", href: "/sun-moon-rising-calculator", icon: <Sparkles className="w-8 h-8 text-purple-500" />, desc: "Sun, Moon, and Rising signs together." },
    { name: "Venus Sign Calculator", href: "/venus-sign-calculator", icon: <Heart className="w-8 h-8 text-pink-500" />, desc: "Love, beauty, and attraction." },
    { name: "Chiron Sign Calculator", href: "/chiron-sign-calculator", icon: <Zap className="w-8 h-8 text-amber-500" />, desc: "Your deepest wounds and healing power." },
    { name: "Lilith Sign Calculator", href: "/lilith-sign-calculator", icon: <Star className="w-8 h-8 text-red-500" />, desc: "Hidden desires and raw energy." },
    { name: "North Node Calculator", href: "/north-node-calculator", icon: <Compass className="w-8 h-8 text-emerald-500" />, desc: "Your destiny and soul's direction." },
    { name: "Part of Fortune", href: "/part-of-fortune-calculator", icon: <Anchor className="w-8 h-8 text-yellow-600" />, desc: "Where you find success and joy." },
    { name: "Vertex Calculator", href: "/vertex-calculator", icon: <Shield className="w-8 h-8 text-slate-500" />, desc: "Fated encounters and destiny." }
];

export default function AstrologyLandingPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-7xl">
            <div className="text-center mb-16 space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest border border-indigo-100 dark:border-indigo-900/40">
                    Cosmic Insights
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter">
                    Astrology <span className="text-indigo-600">Calculators</span>
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Discover the secrets of your birth chart with our high-precision astrology tools. From your Big Three to hidden destiny points.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {astrologyCalculators.map((calc, i) => (
                    <Link key={i} href={calc.href} className="group">
                        <Card className="h-full rounded-[2rem] border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-all hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                            <CardHeader className="pt-8 pb-4">
                                <div className="mb-4 transform group-hover:rotate-12 transition-transform duration-500">
                                    {calc.icon}
                                </div>
                                <CardTitle className="text-2xl font-black group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    {calc.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-sm font-medium leading-relaxed">
                                    {calc.desc}
                                </CardDescription>
                                <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                                    Launch Tool <ArrowUpRight className="w-3 h-3" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Bottom info section */}
            <div className="mt-32 p-12 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden text-center">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                <div className="relative z-10 space-y-6">
                    <h2 className="text-4xl font-black tracking-tight">Unlock Your Birth Chart</h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">
                        Our calculators use real-time astronomical data (NASA JPL) to ensure your planetary positions are calculated to the exact minute of your birth.
                    </p>
                    <div className="flex justify-center gap-8 pt-4">
                        <div className="text-center">
                            <div className="text-3xl font-black text-indigo-400">100%</div>
                            <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Accurate</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-black text-indigo-400">FREE</div>
                            <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Always</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-black text-indigo-400">PDF</div>
                            <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Export</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
