import { Home, Ruler, Coins } from "lucide-react";
import { LoftConversionCostCalculator } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "Loft Conversion Cost Calculator UK 2026 | Price Estimator",
    description: "Estimate the true cost of a loft conversion in the UK. Includes prices for Dormer, Velux, Hip-to-Gable, and Mansard conversions with VAT and fees.",
};

export default function LoftConversionCostPage() {
    const faqs = [
        {
            question: "Which type of loft conversion is the cheapest?",
            answer: "A 'Roof Light' or 'Velux' conversion is significantly cheaper than the others. This is because it doesn't involve altering the pitch or shape of the roof itself; you simply add skylights to the existing roofline, reinforce the floor, and add stairs. Prices for these often start around £15,000 to £20,000."
        },
        {
            question: "Do I need planning permission for a loft conversion?",
            answer: "In most cases, loft conversions fall under 'Permitted Development' rights and do not require full planning permission. However, exceptions apply if you live in a conservation area, a listed building, or if your conversion (like a Mansard or large Dormer) exceeds the volume allowance (usually 40m³ for terraced, 50m³ for detached/semi-detached). You will ALWAYS need Building Regulations approval regardless of planning permission."
        },
        {
            question: "How long does a loft conversion take to build?",
            answer: "A standard rear dormer conversion usually takes between 4 to 6 weeks. A simpler Roof Light conversion might take 3 to 4 weeks, whereas a complex Hip-to-Gable or Mansard conversion can take 6 to 8 weeks."
        },
        {
            question: "Does a loft conversion add value to my house?",
            answer: "Yes, substantially. According to the Nationwide Building Society, a well-executed loft conversion incorporating a double bedroom and en-suite bathroom can add up to 20% to the value of a typical three-bedroom house. In areas like London where moving costs are exorbitantly high due to Stamp Duty, extending upwards is often far more economical."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <CalculatorSchema
                title="Loft Conversion Cost Calculator UK"
                description="Get an accurate estimate for building a loft conversion, including Dormer, Hip-to-Gable, Mansard, and Roof Light styles."
                slug="/loft-conversion-cost-calculator-uk"
                faqs={faqs}
            />

            {/* Hero */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-semibold mb-6">
                        <Home className="w-4 h-4" />
                        Home Improvements
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Loft Conversion Cost Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Thinking of extending upwards? Estimate the total cost of a loft conversion in the UK based on the type of roof alteration, finish, and professional fees.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Calculator Component */}
                <div className="max-w-4xl mx-auto">
                    <LoftConversionCostCalculator />
                </div>

                {/* SEO Content */}
                <section className="mt-20 max-w-4xl mx-auto space-y-12">
                    <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <Ruler className="w-8 h-8 text-purple-500" />
                            A Guide to Loft Conversions
                        </h2>

                        <div className="space-y-8 text-slate-700 dark:text-slate-300">
                            <p className="text-lg leading-relaxed">
                                Moving house in the UK has become incredibly expensive. Between stamp duty, estate agent fees, and legal costs, you can easily spend £20,000+ just on the act of moving. That is why extending your current home with a loft conversion is often the smartest financial decision you can make. It unlocks dead space, gives you an exceptional master suite or home office, and significantly increases your property value.
                            </p>

                            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-2xl border border-purple-100 dark:border-purple-900/40">
                                <h3 className="text-xl font-bold text-purple-900 dark:text-purple-200 mb-4 flex items-center gap-2">
                                    <Coins className="w-6 h-6 text-purple-500" /> Understanding the Hidden Costs
                                </h3>
                                <p className="mb-4 text-sm text-purple-800 dark:text-purple-300">
                                    When builders quote for a loft conversion, their initial figure often excludes vital elements that you are legally required to pay for. Our calculator includes these to give you a realistic final bill.
                                </p>
                                <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-300 font-medium list-disc pl-5">
                                    <li><strong>Professional Fees:</strong> You must hire a structural engineer to ensure the new floor joists and roof alterations are safe. You also need architectural drawings, even for permitted development. (Usually 10% of build cost).</li>
                                    <li><strong>Building Control:</strong> The local council or a private inspector must sign off the work to prove it complies with fire safety and insulation regulations. This costs around £700-£1000.</li>
                                    <li><strong>Party Wall Agreements:</strong> If you share a wall with a neighbour (semi-detached or terraced), you must serve them notice. If they dissent, you pay for their surveyors too (£1,000 - £2,000+).</li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">The 4 Main Types of Loft Conversion</h3>

                                <div className="space-y-6">
                                    <div className="border-l-4 border-purple-500 pl-4">
                                        <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">1. Roof Light / Velux Conversion</h4>
                                        <p className="leading-relaxed text-sm">The most cost-effective solution. You don't alter the shape of the roof; instead, you add skylight windows to the existing slant. This relies entirely on you already having adequate head height in the centre of your loft (at least 2.2m from floor joist to ridge board). Best for adding a simple home office or small spare room.</p>
                                    </div>

                                    <div className="border-l-4 border-purple-500 pl-4">
                                        <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">2. Dormer Conversion</h4>
                                        <p className="leading-relaxed text-sm">The undisputed most popular choice in the UK. A dormant extends horizontally out of the existing roof slant, creating a box-like structure. This instantly gives you vertical walls and a flat ceiling, massively increasing the usable floor space and head height. You can usually fit a large master bedroom and an en-suite inside a dormer.</p>
                                    </div>

                                    <div className="border-l-4 border-purple-500 pl-4">
                                        <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">3. Hip-to-Gable Conversion</h4>
                                        <p className="leading-relaxed text-sm">Common on semi-detached houses with a hipped roof (a roof that slopes down on the side as well as the front and back). This conversion involves extending the sloping side wall straight up to form a vertical 'gable' end. This is a massive structural alteration but completely opens up the stairwell and loft space.</p>
                                    </div>

                                    <div className="border-l-4 border-purple-500 pl-4">
                                        <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">4. Mansard Conversion</h4>
                                        <p className="leading-relaxed text-sm">Often seen in central London and on terraced houses. A mansard essentially replaces one entire side of your roof (usually the rear) with an almost vertical wall (sloping at 72 degrees) and a flat roof across the top. It provides the maximum amount of space possible, practically building a whole new storey, but almost always requires planning permission and is the most expensive option.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <FAQAccordion faqs={faqs} title="Loft Conversion FAQs" />
                </section>
            </div>
        </div>
    );
}
