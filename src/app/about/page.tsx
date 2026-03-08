import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { Calculator, ShieldCheck, HeartPulse, CheckCircle2, Download, MessagesSquare } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | CalZone UK",
    description: "Learn about CalZone: Our mission, methodology, and commitment to providing accurate, algorithmic calculators for the UK public.",
};

export default function AboutPage() {
    const breadcrumbs = [
        { name: "Home", item: "/" },
        { name: "About Us", item: "/about" },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
            {/* Header Section */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="mb-8 flex justify-center">
                        <BreadcrumbSchema items={breadcrumbs} />
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
                        <HeartPulse className="w-4 h-4" />
                        About CalZone
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Welcome To The <span className="text-blue-600 dark:text-blue-400">CalZone</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                        We believe the UK public deserves access to transparent, algorithmic clarity, free from paywalls, generic estimates & confusing jargon.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <div className="space-y-16">

                    {/* Who We Are */}
                    <section className="prose prose-slate dark:prose-invert prose-lg max-w-none">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">Who We Are</h2>
                        <p>
                            CalZone was built with one straightforward idea in mind: every person in the UK deserves access to accurate, reliable calculators without paywalls, sign-ups or unnecessary complexity.
                        </p>
                        <p>
                            We are a UK-based team of developers, data-engineers, mathematicians and researchers who got tired of hunting across multiple websites just to answer everyday questions. Whether it was working out a calorie deficit, estimating a mortgage repayment or figuring out road tax on a new car, the tools were either outdated, US-focused or buried behind registration walls.
                        </p>
                        <p className="text-xl font-bold text-slate-800 dark:text-slate-200 border-l-4 border-blue-600 pl-6 my-8 italic">
                            So we built CalZone. A single hub. Hundreds of precision-built calculators. All free. All built specifically for the UK.
                        </p>
                    </section>

                    {/* Our Mission */}
                    <section className="bg-white dark:bg-slate-950 p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">Our Mission</h2>
                            <p className="text-xl font-medium mb-6 font-serif italic text-blue-600 dark:text-blue-400">
                                "Complex decisions require precise data."
                            </p>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                Whether you are attempting to lose weight safely utilizing biological equations, planning a highly detailed household budget or calculating exact road tax brackets, generic advice is no longer sufficient. Our mission is to translate complex, clinical & institutional formulas into beautifully simple calculators.
                            </p>
                        </div>
                    </section>

                    {/* What Makes Us Unique */}
                    <section>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-8">What Makes CalZone Unique?</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                            There are plenty of calculator websites out there. Here is why CalZone stands apart:
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 hover:-translate-y-1 transition-transform">
                                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center mb-6">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Built for Britain, Not Borrowed from Abroad</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Every calculator on CalZone is engineered specifically for UK users. Our financial tools reference HMRC guidelines. Our health tools align with NHS benchmarks. Our driving calculators reflect current UK fuel rates, road tax bands and penalty guidelines.
                                </p>
                            </div>

                            <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 hover:-translate-y-1 transition-transform">
                                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-6">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Precision You Can Actually Trust</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    We don't cut corners on accuracy. Every tool is built on verified UK data sources, regularly reviewed and updated to reflect the latest rates, guidelines, and laws. When you get a result from CalZone, it is a result you can act on.
                                </p>
                            </div>

                            <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 hover:-translate-y-1 transition-transform">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">No Barriers. Ever.</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    No account needed. No email required. No subscription fees. No adverts interrupting your flow. CalZone is and always will be completely free to use. Open the tool, enter your numbers, get your answer. That's it.
                                </p>
                            </div>

                            <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 hover:-translate-y-1 transition-transform">
                                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mb-6">
                                    <Calculator className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">A Tool for Every Stage of Life</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    From tracking a child's growth percentile to planning your retirement investment, CalZone covers the full spectrum of life's calculations. Health, fitness, finance, property, sleep, investments, lifestyle, all under one roof.
                                </p>
                            </div>

                            <div className="md:col-span-2 bg-linear-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 p-8 rounded-3xl shadow-sm border border-indigo-100 dark:border-indigo-900/50 hover:-translate-y-1 transition-transform">
                                <div className="flex flex-col md:flex-row gap-8 items-center">
                                    <div className="flex-1">
                                        <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-6">
                                            <Download className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Save, Export & Share Your Results</h3>
                                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                            Most calculator websites give you a number and leave you to figure out the rest. CalZone goes further. Every calculation result can be exported as a clean, professional PDF. So you can save it, share it with your mortgage adviser, show it to your GP or simply keep it for your own records. It is a small feature that makes a big real-life difference.
                                        </p>
                                    </div>
                                    <div className="w-full md:w-auto shrink-0">
                                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800">
                                            <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-bold">
                                                <Download className="w-5 h-5" /> Export Result to PDF
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Data Sources */}
                    <section className="prose prose-slate dark:prose-invert prose-lg max-w-none">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">Our Data Sources & Methodology</h2>
                        <p>
                            We take accuracy seriously. Every calculator on CalZone is built on real data from sources that are established, publicly verified and widely respected across the UK.
                        </p>
                        <p>Here is exactly where our numbers come from:</p>

                        <ul className="space-y-4 my-8 list-none pl-0">
                            <li className="flex gap-4">
                                <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                                <div>
                                    <strong className="text-slate-900 dark:text-white">Health and Nutrition:</strong> Our health calculators are based on the same formulas and guidelines used by the NHS and the British Dietetic Association. We also reference peer reviewed research published in leading medical journals to make sure everything lines up with current science.
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                                <div>
                                    <strong className="text-slate-900 dark:text-white">Finance and Property:</strong> Our financial tools use the latest tax rates and brackets published directly by HMRC. We also draw on real market data from trusted UK financial institutions so your results reflect what is actually happening in the UK right now.
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <CheckCircle2 className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
                                <div>
                                    <strong className="text-slate-900 dark:text-white">Energy and Lifestyle:</strong> Our energy and utility calculators are built using figures from Ofgem and real data from UK domestic energy providers. No made up averages. No outdated estimates.
                                </div>
                            </li>
                        </ul>
                    </section>

                    {/* Footer CTA */}
                    <section className="text-center pt-8 border-t border-slate-200 dark:border-slate-800">
                        <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">Thanks for Being Here</h3>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
                            CalZone started with a simple frustration, too many calculator websites built for everywhere except the UK. So we built our own. One tool at a time, for real people making real decisions.
                        </p>
                        <div className="bg-slate-100 dark:bg-slate-800/50 p-8 rounded-3xl inline-block w-full max-w-2xl mx-auto border border-slate-200 dark:border-slate-700">
                            <p className="font-medium text-slate-800 dark:text-slate-200 mb-6 flex items-center justify-center gap-2">
                                <MessagesSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                Got an idea? Found a bug? Just want to reach out?
                            </p>
                            <Link
                                href="/contact-us"
                                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-xl shadow-blue-600/20"
                            >
                                Contact Us <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </Link>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
