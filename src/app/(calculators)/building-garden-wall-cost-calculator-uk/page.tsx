import { BrickWall, Pickaxe, Ruler } from "lucide-react";
import { BuildingGardenWallCostCalculator } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { RelatedTools } from "@/components/layout/related-tools";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Building Garden Wall Cost Calculator UK 2026",
    description: "Estimate the cost of building a brick, blockwork, or stone garden wall in the UK. Includes labour (bricklayers), materials, and concrete foundations.",
    alternates: {
        canonical: "/building-garden-wall-cost-calculator-uk"
    }
};

export default function BuildingGardenWallCostPage() {
    const faqs = [
        {
            question: "How much does a bricklayer charge per day in the UK?",
            answer: "In 2026, a skilled bricklayer typically charges between £250 and £350 per day depending on location. They will often require a 'labourer' (hod carrier) to mix mortar, fetch bricks, and keep the site clean, which costs an additional £130 to £160 per day. Together, a two-man 'gang' normally costs £400 - £500 per day."
        },
        {
            question: "How many bricks are in a square metre?",
            answer: "For a standard single-skin / half-brick wall (the thickness of one standard UK brick widthways), there are 60 bricks per square metre. For a double-skin / one-brick wall (the thickness of a full brick lengthways), there are 120 bricks per square metre."
        },
        {
            question: "Do I need a foundation for a garden wall?",
            answer: "Almost always, yes. Unless your wall is purely decorative and under 300mm high, building on top of soil or patio slabs is a recipe for disaster. The wall will eventually sink, crack, or blow over in the wind. A proper concrete 'strip foundation' must be dug into the ground to support the immense weight of the masonry."
        },
        {
            question: "What is the maximum height for a garden wall without planning permission?",
            answer: "If the wall is next to a highway (road or pavement) used by vehicles, the maximum height you can build without planning permission is 1 metre. For any other boundary not fronting a highway (e.g., between your back garden and a neighbour's), the maximum permitted development height is 2 metres."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <BreadcrumbSchema items={[
                { name: "Home", item: "/" },
                { name: "Home & Property", item: "/home-property" },
                { name: "Garden Wall Cost Calculator", item: "/building-garden-wall-cost-calculator-uk" }
            ]} />
            <CalculatorSchema
                title="Building Garden Wall Cost Calculator UK"
                description="Easily estimate how much it costs to build a masonry garden boundary wall based on exact brick counts, foundation requirements, and UK labour rates."
                slug="/building-garden-wall-cost-calculator-uk"
                faqs={faqs}
            />

            {/* Hero */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-sm font-semibold mb-6">
                        <Pickaxe className="w-4 h-4" />
                        Garden & Landscaping
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Garden Wall Cost Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Calculate exactly how much a new masonry boundary wall will cost, factoring in hundreds of heavy bricks, concrete foundations, and the daily rate of UK bricklayers.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Calculator Component */}
                <div className="max-w-4xl mx-auto">
                    <BuildingGardenWallCostCalculator />
                </div>

                {/* SEO Content */}
                <section className="mt-20 max-w-4xl mx-auto space-y-12">
                    <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <BrickWall className="w-8 h-8 text-orange-500" />
                            A Guide to Brick Walls & Boundaries
                        </h2>

                        <div className="space-y-8 text-slate-700 dark:text-slate-300">
                            <p className="text-lg leading-relaxed">
                                Replacing a flimsy wooden fence panel with a solid brick wall is a completely different tier of landscaping. While a fence can be erected in hours by a handyman, a structural masonry wall requires thousands of kilograms of dense materials to be manually laid by a skilled tradesperson using wet mortar.
                            </p>

                            <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-2xl border border-orange-100 dark:border-orange-900/40">
                                <h3 className="text-xl font-bold text-orange-900 dark:text-orange-200 mb-4 flex items-center gap-2">
                                    Why is a garden wall so expensive?
                                </h3>
                                <p className="mb-4 text-sm text-orange-800 dark:text-orange-300">
                                    When homeowners are shocked by quotes for garden walls, it is usually because they underestimate the sheer volume of hidden work and raw materials required for structural stability:
                                </p>
                                <ul className="space-y-2 text-sm text-orange-800 dark:text-orange-300 font-medium list-disc pl-5">
                                    <li><strong>The Trench:</strong> You cannot build a wall on dirt. A trench must be dug (usually 300mm to 600mm deep depending on ground type and wall height), generating tons of waste soil that requires a skip to dispose of.</li>
                                    <li><strong>The Concrete:</strong> That trench must then be heavily flooded with wet concrete to form a perfectly level "strip foundation". This requires cement mixers, aggregates, and time to cure.</li>
                                    <li><strong>Double Skin Thickness:</strong> If a wall is over 600mm tall, it generally cannot be a single-skin (one brick wide) wall without intermediate reinforcing piers. It must be built double-skin to prevent it blowing over in high winds. This instantly doubles the brick count and the labour time.</li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Choosing the Right Material</h3>

                                <div className="space-y-6">
                                    <div className="border border-slate-200 dark:border-slate-800 p-5 rounded-2xl">
                                        <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">1. Standard Facing Bricks</h4>
                                        <p className="leading-relaxed text-sm">Facing bricks are manufactured explicitly to look visually appealing while withstanding the weather (unlike cheaper 'engineering' bricks meant for hidden utility). They strike a perfect balance between traditional aesthetics and cost, widely available in hundreds of colors at most builders merchants for roughly £0.80 to £1.20 a brick.</p>
                                    </div>

                                    <div className="border border-slate-200 dark:border-slate-800 p-5 rounded-2xl">
                                        <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">2. Reclaimed / Premium Bricks</h4>
                                        <p className="leading-relaxed text-sm">If you own an older Victorian or Georgian property, starkly new factory-fresh bricks will look awful next to your weathered house. To match the aesthetic, you need 'reclaimed' bricks taken from demolished old buildings, or heavily tumbled modern replicas. Because they are rare or highly processed, expect to pay double or even triple the price per brick.</p>
                                    </div>

                                    <div className="border border-slate-200 dark:border-slate-800 p-5 rounded-2xl">
                                        <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">3. Blockwork & Render</h4>
                                        <p className="leading-relaxed text-sm">Often the fastest way to build a wall. Builders use massive, ugly hollow concrete breezeblocks. Because one breezeblock covers the area of many smaller bricks, the wall goes up incredibly fast, saving huge amounts on labour. However, the wall is incredibly ugly. To make it presentable, a plasterer must come and apply a smooth coat of external sand/cement render, which is then painted white or grey. Very popular in modern, minimalist garden redesigns.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <FAQAccordion faqs={faqs} title="Bricklaying FAQs" />
                </section>
            </div>
            <RelatedTools currentCategory="Home & Property" currentSlug="/building-garden-wall-cost-calculator-uk" />
        </div>
    );
}
