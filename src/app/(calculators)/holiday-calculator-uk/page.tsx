"use client";

import { useState } from "react";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plane, BookOpen, Calculator, Target, Info, Flame, Scale, TrendingDown, HelpCircle, Activity, PoundSterling, Palmtree } from "lucide-react";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { LearnMore } from "@/components/seo/learn-more";

export default function HolidayCalculator() {
    const [flights, setFlights] = useState("");
    const [accommodation, setAccommodation] = useState("");
    const [dailyBudget, setDailyBudget] = useState("");
    const [days, setDays] = useState("");
    const [excursions, setExcursions] = useState("");
    const [insurance, setInsurance] = useState("");

    const [result, setResult] = useState<{ total: string; perPerson: string } | null>(null);

    const calculateCost = (e: React.FormEvent) => {
        e.preventDefault();

        const f = parseFloat(flights) || 0;
        const a = parseFloat(accommodation) || 0;
        const dBudget = parseFloat(dailyBudget) || 0;
        const numDays = parseFloat(days) || 0;
        const exc = parseFloat(excursions) || 0;
        const ins = parseFloat(insurance) || 0;

        const total = f + a + (dBudget * numDays) + exc + ins;

        if (total > 0) {
            setResult({
                total: total.toFixed(2),
                perPerson: "N/A" // Simple version, could add adults/children
            });
        }
    };

    const holidayFaqs = [
        {
            question: "How much spending money do I need per day?",
            answer: "A comfortable average for European holidays is £50-£100 per person per day. This usually covers meals, local transport, and minor entertainment. For luxury destinations or places like Dubai or New York, budget at least £150-£200 per day."
        },
        {
            question: "Should I buy travel insurance?",
            answer: "Absolutely. Travel insurance is essential. It protects you against medical emergencies, flight cancellations, and lost baggage. The cost is usually negligible compared to the total holiday budget, but the financial protection is immense."
        },
        {
            question: "Is it cheaper to book all-inclusive?",
            answer: "All-inclusive packages can be highly cost-effective for families or those who plan to stay at the resort. However, if you plan to eat out frequently and explore, paying for accommodation separately and budgeting daily spending is often cheaper."
        },
        {
            question: "Don't forget the hidden costs!",
            answer: "Remember to budget for airport parking, transfers, tourist taxes (often paid locally), and visa costs. These 'hidden' extras frequently blow holiday budgets if not planned for in advance."
        }
    ];

    const blogLinks = [
        {
            title: "The Ultimate UK Holiday Budgeting Guide",
            description: "Discover top strategies to save money on flights, hotels, and travel insurance.",
            href: "/blog/holiday-budgeting-tips",
            category: "Finance"
        },
        {
            title: "Hidden Travel Fees You Need to Know",
            description: "Avoid the common traps like tourist taxes and exorbitant airport parking fees.",
            href: "/blog/hidden-holiday-fees",
            category: "Travel"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <CalculatorSchema
                title="Holiday Budget Calculator UK | Plan Your Trip Cost"
                description="Easily estimate your total holiday costs, including flights, accommodation, and daily spending money, to ensure a stress-free trip."
                slug="/holiday-calculator-uk"
                faqs={holidayFaqs}
            />
            <CalculatorCard
                title="Holiday Cost Calculator"
                description="Estimate the total budget required for your next vacation or holiday."
            >
                <form onSubmit={calculateCost} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="flights">Travel / Flights (£)</Label>
                            <Input
                                id="flights"
                                type="number"
                                placeholder="e.g. 500"
                                value={flights}
                                onChange={(e) => setFlights(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="accommodation">Accommodation (£)</Label>
                            <Input
                                id="accommodation"
                                type="number"
                                placeholder="e.g. 800"
                                value={accommodation}
                                onChange={(e) => setAccommodation(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="days">Duration (Days)</Label>
                            <Input
                                id="days"
                                type="number"
                                placeholder="e.g. 7"
                                value={days}
                                onChange={(e) => setDays(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dailyBudget">Daily Spending Budget (£)</Label>
                            <Input
                                id="dailyBudget"
                                type="number"
                                placeholder="e.g. 100"
                                value={dailyBudget}
                                onChange={(e) => setDailyBudget(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="excursions">Excursions & Activities (£)</Label>
                            <Input
                                id="excursions"
                                type="number"
                                placeholder="e.g. 200"
                                value={excursions}
                                onChange={(e) => setExcursions(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="insurance">Travel Insurance (£)</Label>
                            <Input
                                id="insurance"
                                type="number"
                                placeholder="e.g. 50"
                                value={insurance}
                                onChange={(e) => setInsurance(e.target.value)}
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full text-lg h-12">Calculate Holiday Cost</Button>
                </form>

                {result && (
                    <div className="mt-8 p-6 rounded-xl bg-sky-50 dark:bg-sky-950/30 text-center animate-in zoom-in-95 duration-300">
                        <div className="flex justify-center items-center gap-2 mb-4">
                            <Plane className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                            <h3 className="text-xl font-bold text-sky-800 dark:text-sky-200">Total Estimated Cost</h3>
                        </div>
                        <div className="text-5xl font-extrabold mb-2 text-sky-600 dark:text-sky-400">
                            £{result.total}
                        </div>
                        <p className="text-sm font-medium text-sky-700 dark:text-sky-300">
                            Includes daily spending for {days} days.
                        </p>
                    </div>
                )}
            </CalculatorCard>

            {/* Massive SEO Content Section */}
            <section className="mt-16 max-w-4xl mx-auto space-y-12">
                <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-lg">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                        <Palmtree className="w-8 h-8 text-sky-500" />
                        The Science of Holiday Budgeting
                    </h2>

                    <div className="space-y-10 text-slate-700 dark:text-slate-300">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                <Info className="w-6 h-6 text-sky-500" /> Why Budget Your Holiday?
                            </h3>
                            <p className="text-lg leading-relaxed">
                                A holiday should be a time of relaxation and rejuvenation, not financial stress. Unfortunately, UK travellers consistently underestimate their holiday expenses by over 30%, primarily due to "hidden" local costs and a lack of daily spending discipline. A structured budget eliminates post-holiday financial hangovers.
                            </p>
                        </div>

                        <div className="bg-sky-50 dark:bg-sky-950/20 p-6 rounded-2xl border border-sky-100 dark:border-sky-900/30">
                            <h3 className="text-xl font-bold text-sky-900 dark:text-sky-300 mb-4 flex items-center gap-2">
                                <Calculator className="w-6 h-6 text-sky-500" /> How Our Algorithm Works
                            </h3>
                            <p className="mb-4">Our calculator categorizes your expenses into fixed (pre-departure) and variable (in-destination) costs to ensure maximum accuracy:</p>
                            <ul className="space-y-3">
                                <li className="flex gap-2"><strong className="text-sky-600 dark:text-sky-400">Fixed Costs:</strong> We tally the upfront capital required for Flights, Accommodation, and Travel Insurance.</li>
                                <li className="flex gap-2"><strong className="text-sky-600 dark:text-sky-400">Variable Matrix:</strong> We multiply your projected <span className="font-mono">Daily Spending Money</span> by your total <span className="font-mono">Number of Days</span>.</li>
                                <li className="flex gap-2"><strong className="text-sky-600 dark:text-sky-400">Excursions:</strong> Specific, high-ticket activities (like a boat tour or theme park) are added as a separate line item to prevent daily budget distortion.</li>
                            </ul>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 items-start">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                    <Target className="w-6 h-6 text-green-500" /> A Real UK Example
                                </h3>
                                <p className="leading-relaxed">
                                    Consider a couple flying from Manchester to Tenerife for a 7-day getaway:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
                                    <li><strong>Flights & Hotel:</strong> £850 total.</li>
                                    <li><strong>Daily Budget:</strong> £100/day for food and drinks.</li>
                                    <li><strong>1x Boat Excursion:</strong> £120.</li>
                                    <li><strong>Insurance:</strong> £35.</li>
                                    <li><strong>Calculation:</strong> £850 + (£100 × 7) + £120 + £35 = <strong>£1,705</strong> estimated requirement.</li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                    <TrendingDown className="w-6 h-6 text-red-500" /> The Hidden Cost Trap
                                </h3>
                                <p className="leading-relaxed">
                                    When planning, many forget the "Door-to-Door" costs. Airport parking in the UK can easily exceed £100 for a week. Overseas transfers, unanticipated city tourist taxes, and roaming data charges can push an uncalculated budget into overdraft territory. Always add a 10% contingency buffer to your final number.
                                </p>
                            </div>
                        </div>

                        {/* FAQs Section */}
                        <div className="space-y-6 pt-8 border-t border-slate-200 dark:border-slate-800">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                <HelpCircle className="w-6 h-6 text-sky-500" /> Frequently Asked Questions
                            </h3>
                            <div className="grid md:grid-cols-1 gap-6">
                                {holidayFaqs.map((faq, idx) => (
                                    <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800">
                                        <h5 className="font-bold text-slate-900 dark:text-slate-100 mb-2">{faq.question}</h5>
                                        <p className="text-sm">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <LearnMore links={blogLinks} />
            </section>
        </div>
    );
}
