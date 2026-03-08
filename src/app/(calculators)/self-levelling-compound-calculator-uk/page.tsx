import { Ruler, HardHat, Beaker } from "lucide-react";
import { SelfLevellingCompoundCalculator } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "Self Levelling Compound Calculator UK | Floor Screed App",
    description: "Calculate exactly how many bags of self-levelling compound (SLC) or screed you need for your floor based on room dimensions and average depth.",
};

export default function SelfLevellingCompoundPage() {
    const faqs = [
        {
            question: "How much a 20kg bag of levelling compound covers?",
            answer: "A standard 20kg bag of self-levelling compound typically covers around 5 square metres (m²) at a depth of 3mm. However, if your floor is particularly uneven and requires an average depth of 6mm, that same bag will only cover 2.5m²."
        },
        {
            question: "How do I calculate the 'average depth'?",
            answer: "Unless your floor is perfectly flat, the depth will vary across the room. Measure the depth in the deepest dip (e.g., 8mm) and the shallowest point (e.g., 2mm), then find the middle ground. Always buy 10% more compound than calculated so you don't run out mid-pour."
        },
        {
            question: "Can I pour self-levelling compound over 10mm?",
            answer: "Standard latex-based compounds are usually designed for depths between 2mm and 10mm. If your floor needs 20mm to 50mm of fill, you must buy a 'Deep Pour' or high-build thick screed compound, otherwise standard SLC can crack as it cures."
        },
        {
            question: "Do I need to prime the floor first?",
            answer: "Yes, 100%. If you pour self-levelling compound onto unprimed concrete or wood, the subfloor will rapidly suck the moisture out of the wet compound. This causes the compound to dry too fast, leading to catastrophic cracking and 'dusting'."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <CalculatorSchema
                title="Self Levelling Compound Calculator UK"
                description="Find exactly how many bags of self-levelling floor compound you need for your project."
                slug="/self-levelling-compound-calculator-uk"
                faqs={faqs}
            />

            {/* Hero */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-50 dark:bg-stone-900/30 text-stone-600 dark:text-stone-400 text-sm font-semibold mb-6">
                        <HardHat className="w-4 h-4" />
                        Home & DIY
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Self Levelling Compound Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Takes the guesswork out of floor prep. Instantly calculate how many 20kg bags of self-levelling compound (SLC) or latex screed you need for your room.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Calculator Component */}
                <div className="max-w-4xl mx-auto">
                    <SelfLevellingCompoundCalculator />
                </div>

                {/* SEO Content */}
                <section className="mt-20 max-w-4xl mx-auto space-y-12">
                    <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <Beaker className="w-8 h-8 text-stone-500" />
                            Getting Your Pour Right
                        </h2>

                        <div className="space-y-8 text-slate-700 dark:text-slate-300">
                            <p className="text-lg leading-relaxed">
                                Running out of self-levelling compound mid-pour is a DIY disaster. Because the compound begins to 'go off' (cure) within 15 to 30 minutes, you cannot stop pouring to run to the builders' merchant. You must have every single bag you need staged and ready before you mix the first bucket.
                            </p>

                            <div className="bg-stone-50 dark:bg-stone-900/20 p-6 rounded-2xl border border-stone-100 dark:border-stone-900/40">
                                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-200 mb-4 flex items-center gap-2">
                                    <Ruler className="w-6 h-6 text-stone-500" /> How The Maths Works
                                </h3>
                                <p className="mb-4 text-sm text-stone-800 dark:text-stone-300">
                                    Almost all standard floor levelling compounds (like Setcrete, Bostik, or Mapei) share a very similar density and weight ratio after mixing.
                                </p>
                                <p className="text-sm text-stone-800 dark:text-stone-300">
                                    The industry standard formulation ratio is <strong>1.5 kilograms of dry powder per 1 square metre, per 1 millimetre of depth</strong>.
                                </p>
                                <p className="font-mono bg-white dark:bg-slate-900 p-3 rounded-lg border border-stone-200 mt-4 text-sm text-center">
                                    Floor Area (m²) × Depth Required (mm) × 1.5kg = Total Kg Needed
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Tips for a Perfect Pour</h3>
                                <ul className="list-decimal pl-5 space-y-4">
                                    <li>
                                        <strong>Prime Everything:</strong> Buy a specialist acrylic floor primer. Dilute it as per the instructions and roll it onto the subfloor the day before. This stops 'pin-holing' bubbles and rapid drying.
                                    </li>
                                    <li>
                                        <strong>Measure Your Water Perfectly:</strong> Do not guess the water ratio. Use a marked bucket. If the bag says 4.2 litres, use exactly 4.2 litres. Too much water ruins the structural integrity and causes a dusty white finish. Too little water stops the product 'self-levelling' across the floor.
                                    </li>
                                    <li>
                                        <strong>Use a Spiked Roller:</strong> As soon as you pour a puddle, roll over it with a spiked roller. This drags the compound smoothly over imperfections, breaks surface tension, and pops air bubbles to leave a glass-like finish.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <FAQAccordion faqs={faqs} title="Self Levelling Compound FAQs" />
                </section>
            </div>
        </div>
    );
}
