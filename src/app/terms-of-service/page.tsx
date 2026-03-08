import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { Scale, CheckCircle2, Calculator, ShieldCheck, FileText, Link as LinkIcon, AlertTriangle, Clock, MapPin, Mail, Globe } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Terms of Service | CalZone",
    description: "Read CalZone's Terms & Conditions. By accessing our platform, you agree to these terms governing your use of our calculators and content.",
};

export default function TermsOfServicePage() {
    const breadcrumbs = [
        { name: "Home", item: "/" },
        { name: "Terms of Service", item: "/terms-of-service" },
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
                        <Scale className="w-4 h-4" />
                        Legal Information
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Terms of Services
                    </h1>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">
                        <span>Last Updated: March 2026</span>
                        <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
                        <span>Platform: CalZone</span>
                    </div>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                        Welcome to CalZone. By accessing or using any part of our website, including our calculators, blog content and reference tools, you agree to be bound by the Terms & Conditions outlined below. Please read them carefully before continuing.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <div className="space-y-12">

                    {/* Intro paragraphs */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <section className="bg-white dark:bg-slate-950 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6">
                                <Globe className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 mt-0">About CalZone</h2>
                            <div className="prose prose-slate dark:prose-invert prose-base max-w-none">
                                <p>CalZone is a free, UK-based online calculator platform offering tools across health and fitness, personal finance, home and property, driving, investments, sleep and lifestyle. The platform is owned and operated based in the United Kingdom. These Terms govern your use of thecalzone.co.uk and all content and tools available on it.</p>
                            </div>
                        </section>

                        <section className="bg-white dark:bg-slate-950 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
                            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-6">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 mt-0">Acceptance of Terms</h2>
                            <div className="prose prose-slate dark:prose-invert prose-base max-w-none">
                                <p>By using CalZone, you confirm that you are at least 18 years of age, that you have read and understood these Terms and that you agree to comply with them. If you do not agree, you must stop using the platform immediately. We reserve the right to update these Terms at any time. Continued use of CalZone following any update constitutes your acceptance of the revised Terms.</p>
                            </div>
                        </section>
                    </div>

                    {/* Highly important disclaimer section */}
                    <section className="bg-linear-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-blue-950/40 p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-indigo-100 dark:border-indigo-900/50">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="w-16 h-16 bg-indigo-500 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/30">
                                <Calculator className="w-8 h-8" />
                            </div>
                            <div className="prose prose-slate dark:prose-invert prose-lg max-w-none">
                                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 mt-0">Nature of Our Tools and Content</h2>
                                <p className="text-slate-700 dark:text-slate-300">
                                    All calculators and tools on CalZone are provided for <strong>general informational and educational purposes only</strong>.
                                </p>
                                <p className="text-slate-700 dark:text-slate-300">
                                    Results generated by our tools are mathematical estimates based on publicly available UK data sources, including HMRC guidelines, NHS statistics and Bank of England rates. They are not professional advice of any kind and should not be treated as such.
                                </p>
                                <div className="bg-white/60 dark:bg-slate-900/60 p-6 rounded-2xl border border-indigo-200/50 dark:border-indigo-800/50 mt-6 backdrop-blur-sm">
                                    <p className="font-bold text-slate-800 dark:text-slate-200 m-0 italic">
                                        CalZone accepts no responsibility for decisions made based solely on our results.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Acceptable Use and IP */}
                    <div className="space-y-8">
                        <section className="bg-white dark:bg-slate-950 p-8 md:p-10 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
                            <div className="prose prose-slate dark:prose-invert prose-lg max-w-none">
                                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3 mt-0 mb-6">
                                    <span className="bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 p-2 rounded-xl">
                                        <ShieldCheck className="w-6 h-6" />
                                    </span>
                                    Acceptable Use
                                </h2>
                                <p>When using CalZone, you agree that you will not:</p>

                                <ul className="space-y-3">
                                    <li>Use our platform for any unlawful or fraudulent purpose</li>
                                    <li>Attempt to interfere with, damage or disrupt the website or its infrastructure</li>
                                    <li>Scrape, copy or systematically extract data or content from CalZone</li>
                                    <li>Use automated tools, bots or scripts to access our calculators at scale</li>
                                    <li>Misrepresent CalZone's results as official, professional or legally certified figures</li>
                                </ul>

                                <p className="font-bold text-red-600 dark:text-red-400 mt-6">
                                    We reserve the right to restrict access to any user or entity found to be in breach of these conditions.
                                </p>
                            </div>
                        </section>

                        <section className="bg-white dark:bg-slate-950 p-8 md:p-10 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
                            <div className="prose prose-slate dark:prose-invert prose-lg max-w-none">
                                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3 mt-0 mb-6">
                                    <span className="bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 p-2 rounded-xl">
                                        <FileText className="w-6 h-6" />
                                    </span>
                                    Intellectual Property
                                </h2>
                                <p>
                                    All content published on CalZone, including calculator logic, written content, design elements, graphics and branding, is the intellectual property of Nova Tech Studio unless otherwise stated.
                                </p>
                                <p>
                                    You may not reproduce, copy, redistribute or commercially exploit any part of CalZone's content without our express written permission. You are welcome to share links to our tools and pages for personal or informational purposes.
                                </p>
                            </div>
                        </section>
                    </div>

                    {/* Platform constraints */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <section className="bg-slate-100 dark:bg-slate-800/40 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
                            <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-2xl flex items-center justify-center mb-6">
                                <LinkIcon className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 mt-0">Third-Party Links and Services</h2>
                            <div className="prose prose-slate dark:prose-invert prose-base max-w-none">
                                <p>CalZone may contain links to external websites such as GOV.UK, HMRC, or the NHS for reference purposes. These links are provided as a convenience and do not imply endorsement. We have no control over the content or availability of third-party websites and accept no liability for any loss or damage arising from your use of them.</p>
                                <p>CalZone also integrates third-party services including Google Analytics and Google AdSense, each governed by their own terms and privacy policies.</p>
                            </div>
                        </section>

                        <section className="bg-slate-100 dark:bg-slate-800/40 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
                            <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center mb-6">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 mt-0">Limitation of Liability</h2>
                            <div className="prose prose-slate dark:prose-invert prose-base max-w-none">
                                <p>To the fullest extent permitted by UK law, CalZone shall not be held liable for any direct, indirect, incidental or consequential loss or damage arising from your use of our platform, reliance on our calculator results or any inaccuracies within our tools. This includes financial loss, health-related decisions or property and legal matters. All use of CalZone is entirely at your own risk.</p>
                            </div>
                        </section>

                        <section className="bg-slate-100 dark:bg-slate-800/40 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
                            <div className="w-12 h-12 bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-2xl flex items-center justify-center mb-6">
                                <Clock className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 mt-0">Availability and Changes</h2>
                            <div className="prose prose-slate dark:prose-invert prose-base max-w-none">
                                <p>CalZone is provided on an "as is" and "as available" basis. We do not guarantee uninterrupted access to the platform and reserve the right to modify, suspend or discontinue any tool, page or feature at any time without prior notice. We will not be liable for any loss resulting from such changes.</p>
                            </div>
                        </section>

                        <section className="bg-slate-100 dark:bg-slate-800/40 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
                            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center mb-6">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 mt-0">Governing Law</h2>
                            <div className="prose prose-slate dark:prose-invert prose-base max-w-none">
                                <p>These Terms & Conditions are governed by and construed in accordance with the laws of England and Wales. Any disputes arising from your use of CalZone shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
                            </div>
                        </section>
                    </div>

                    {/* Contact Us Footer */}
                    <section className="text-center pt-8 border-t border-slate-200 dark:border-slate-800">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">Contact Us</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
                            If you have any questions about these Terms, please reach out to us:
                        </p>
                        <div className="bg-slate-100 dark:bg-slate-800/50 p-8 rounded-3xl inline-block w-full max-w-2xl mx-auto border border-slate-200 dark:border-slate-700 text-left">
                            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                                <Scale className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                                <div>
                                    <div className="font-bold text-slate-900 dark:text-white text-lg">CalZone Legal Enquiries</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Globe className="w-5 h-5 text-slate-400" />
                                    <a href="https://thecalzone.co.uk" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">thecalzone.co.uk</a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-slate-400" />
                                    <a href="mailto:info@thecalzone.co.uk" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">info@thecalzone.co.uk</a>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 text-center">
                                <Link
                                    href="/contact-us"
                                    className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-all hover:scale-105 shadow-xl shadow-blue-600/20"
                                >
                                    Go to Contact Form
                                </Link>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
