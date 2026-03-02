import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { Scale, HeartPulse, Calculator, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "About Us | CalZone UK",
    description: "Learn about CalZone: Our mission, methodology, and commitment to providing accurate, algorithmic calculators for the UK public.",
};

export default function AboutPage() {
    const breadcrumbs = [
        { name: "Home", item: "/" },
        { name: "About Us", item: "/about" },
    ];

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <BreadcrumbSchema items={breadcrumbs} />

            <header className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50 mb-6">
                    Meticulous Math for<br className="hidden md:block" />
                    <span className="text-primary">Everyday Decisions</span>
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    We believe the UK public deserves access to transparent, algorithmic clarity—free from paywalls, generic estimates, and confusing jargon.
                </p>
            </header>

            <div className="prose prose-slate dark:prose-invert prose-lg max-w-none">
                <h2>Our Mission</h2>
                <p>
                    CalZone was founded on a simple premise: <strong>Complex decisions require precise data.</strong>
                </p>
                <p>
                    Whether you are attempting to lose weight safely utilizing biological equations, planning a highly detailed household budget, or calculating exact road tax brackets, generic advice is no longer sufficient. Our mission is to translate complex, clinical, and institutional formulas into beautifully simple, instantaneous calculators.
                </p>

                <div className="grid md:grid-cols-2 gap-8 my-12">
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
                        <Calculator className="w-10 h-10 text-sky-500 mb-4" />
                        <h3 className="mt-0 group-hover:text-primary transition-colors">Algorithmic Precision</h3>
                        <p className="text-base text-slate-600 dark:text-slate-400 mb-0">
                            We don't guess. We utilize globally recognized formulas (such as Mifflin-St Jeor for metabolics) and hard-coded UK regulatory data to ensure your results are mathematically sound.
                        </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
                        <ShieldCheck className="w-10 h-10 text-green-500 mb-4" />
                        <h3 className="mt-0 group-hover:text-primary transition-colors">Radical Transparency</h3>
                        <p className="text-base text-slate-600 dark:text-slate-400 mb-0">
                            We show you our work. Every calculator on our site explains exactly <em>how</em> the number was derived, so you never have to blindly trust a black box.
                        </p>
                    </div>
                </div>

                <h2>Our Data Sources & Methodology</h2>
                <p>
                    Our authority stems from our strict adherence to established, verifiable data sources. We do not invent health advice or financial forecasts. Our calculations are strictly derived from:
                </p>
                <ul>
                    <li>
                        <strong>Health & Nutrition:</strong> Baseline formulas utilized by the
                        <a href="https://www.nhs.uk" target="_blank" rel="noopener noreferrer"> National Health Service (NHS)</a>, the
                        <a href="https://www.bda.uk.com/" target="_blank" rel="noopener noreferrer"> British Dietetic Association (BDA)</a>, and peer-reviewed metabolic research (e.g., The American Journal of Clinical Nutrition).
                    </li>
                    <li>
                        <strong>Finance & Property:</strong> Current taxation brackets from
                        <a href="https://www.gov.uk" target="_blank" rel="noopener noreferrer"> HM Revenue & Customs (HMRC)</a>, and aggregate market data from leading UK financial institutions.
                    </li>
                    <li>
                        <strong>Lifestyle & Energy:</strong> Averages and formulas derived from
                        <a href="https://www.ofgem.gov.uk" target="_blank" rel="noopener noreferrer"> Ofgem</a> and domestic utility providers.
                    </li>
                </ul>

                <h2>Who We Are</h2>
                <p>
                    We are a team of data-engineers, mathematicians, and researchers based in the UK. We are obsessed with creating digital tools that provide actionable utility. We do not mass-produce generic content; we engineer solutions.
                </p>
                <p>
                    Every calculator deployed on CalZone has been rigorously tested against edge-cases to ensure you receive a robust, dependable metric.
                </p>

                <hr className="my-12 border-slate-200 dark:border-slate-800" />

                <div className="bg-primary/5 p-8 rounded-3xl border border-primary/20 text-center">
                    <HeartPulse className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mt-0 mb-2">Explore Our Tools</h3>
                    <p className="mb-6">Start taking control of your health, finances, and property today.</p>
                    <Link href="/" className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-full font-bold transition-all no-underline">
                        View All Calculators
                    </Link>
                </div>
            </div>
        </div>
    );
}
