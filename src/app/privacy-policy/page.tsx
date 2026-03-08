import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { ShieldCheck, HardDrive, Cookie, Scale, Users, Lock, Clock, Globe, BellRing, Mail } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy | CalZone",
    description: "At CalZone, your privacy is a founding principle. Read our clear, plain-English Privacy Policy on how we protect your data.",
};

export default function PrivacyPolicyPage() {
    const breadcrumbs = [
        { name: "Home", item: "/" },
        { name: "Privacy Policy", item: "/privacy-policy" },
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
                        <ShieldCheck className="w-4 h-4" />
                        Data Protection & Privacy
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Privacy Policy
                    </h1>
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">
                        Last updated: March 2026 | Effective immediately upon publication.
                    </p>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                        At CalZone, your privacy is not an afterthought, it is a founding principle. This Privacy Policy explains in plain English, exactly what information we handle, why we handle it and what rights you hold as a visitor to our platform. We encourage you to read it in full.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <div className="space-y-16">

                    {/* About section */}
                    <section className="bg-white dark:bg-slate-950 p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                        <div className="relative z-10 prose prose-slate dark:prose-invert prose-lg max-w-none">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 p-2 rounded-xl">
                                    <Globe className="w-6 h-6" />
                                </span>
                                About CalZone and This Policy
                            </h2>
                            <p>
                                CalZone ("we", "us", "our") is a free UK-based calculator platform, accessible at <a href="https://www.thecalzone.co.uk">thecalzone.co.uk</a>. We provide a comprehensive suite of online tools covering health and fitness, personal finance, home and property, driving, investments, sleep and lifestyle, all free of charge with no account required.
                            </p>
                            <p>
                                This Privacy Policy governs how CalZone processes data in connection with your use of our website and tools. It has been drafted in accordance with the UK General Data Protection Regulation (UK GDPR), the Data Protection Act 2018 and the Privacy and Electronic Communications Regulations (PECR).
                            </p>
                            <p>
                                CalZone is the data controller for the purposes of applicable data protection legislation. If you have any questions or concerns about this policy, please see last section for how to reach us.
                            </p>
                        </div>
                    </section>

                    {/* Inputs Stay on Your Device - Highlighted Section */}
                    <section className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-emerald-100 dark:border-emerald-900/50">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30">
                                <HardDrive className="w-8 h-8" />
                            </div>
                            <div className="prose prose-slate dark:prose-invert prose-lg max-w-none">
                                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 mt-0">Your Calculator Inputs Stay on Your Device</h2>

                                <div className="bg-white/60 dark:bg-slate-900/60 p-6 rounded-2xl border border-emerald-200/50 dark:border-emerald-800/50 mb-6 backdrop-blur-sm">
                                    <p className="font-bold text-slate-800 dark:text-slate-200 m-0 italic">
                                        Plain English summary: Whatever you type into any CalZone calculator, whether it is your weight, calorie intake, salary, mortgage figures or investment amounts, never leaves your browser. We never see it, store it or transmit it.
                                    </p>
                                </div>

                                <p className="text-slate-700 dark:text-slate-300">
                                    Every calculator on CalZone, from our BMI and calorie deficit tools to our Capital Gains Tax and mortgage calculators, processes your input data entirely within your own browser on your own device.
                                </p>
                                <p className="text-slate-700 dark:text-slate-300">
                                    This is sometimes referred to as "client-side processing." No figure, value or personal measurement that you enter into any CalZone tool is ever sent to our servers, logged in any database or made accessible to us or any third party.
                                </p>
                                <p className="text-slate-700 dark:text-slate-300">
                                    Our infrastructure is architecturally incapable of receiving this data, because we simply do not request it. This design is intentional. We built CalZone so that you can get accurate, useful results without compromising your personal information in any way.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Auto collection data */}
                    <section className="prose prose-slate dark:prose-invert prose-lg max-w-none">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">Information We Collect Automatically</h2>
                        <p>
                            Although we have no access to your calculator inputs, CalZone does automatically receive a limited set of technical and behavioural data whenever you visit our website. This is standard practice for virtually all websites and is necessary for us to keep CalZone secure, functional, and improving over time.
                        </p>
                        <p>The data we collect automatically includes:</p>

                        <div className="grid sm:grid-cols-2 gap-6 my-8 not-prose">
                            <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-2">Device and browser information</h4>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">Your browser type and version, operating system, device category (desktop, tablet or mobile) and screen resolution.</p>
                            </div>
                            <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-2">Network information</h4>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">Your anonymised IP address and approximate geographic region (country or city level). We do not store full IP addresses.</p>
                            </div>
                            <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-2">Usage and navigation data</h4>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">The pages and calculator tools you visited, how long you spent on each page, the order in which you navigated the site and the source that referred you to us (e.g., a search engine or a link from another website).</p>
                            </div>
                            <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-2">Performance data</h4>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">Page load times, error events and technical signals that help us identify and resolve issues.</p>
                            </div>
                        </div>

                        <p>
                            None of this data is linked to your identity and none of it includes the content of your calculations. It is collected and processed in aggregate form to help us understand how CalZone is used and where we can improve.
                        </p>
                    </section>

                    {/* Cookies Section */}
                    <section className="bg-white dark:bg-slate-950 p-8 md:p-10 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
                        <div className="prose prose-slate dark:prose-invert prose-lg max-w-none">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3 mt-0 mb-6">
                                <span className="bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 p-2 rounded-xl">
                                    <Cookie className="w-6 h-6" />
                                </span>
                                Cookies and Similar Technologies
                            </h2>
                            <p>
                                CalZone uses cookies, small text files placed on your device, to deliver a consistent, functional experience. Below is a plain-English breakdown of the types of cookies we use and why.
                            </p>

                            <ul>
                                <li>
                                    <strong>Essential Cookies:</strong> These are required for the basic operation of our website, such as remembering your cookie preferences and enabling secure browsing. You cannot opt out of these without affecting site functionality.
                                </li>
                                <li>
                                    <strong>Analytical Cookies:</strong> We use services such as Google Analytics to gather aggregated, anonymous data about how visitors use CalZone. This helps us understand which calculators are most popular, where people encounter difficulties and how we can improve the overall experience. No personally identifiable information is captured through these cookies.
                                </li>
                                <li>
                                    <strong>Advertising Cookies:</strong> As a free platform, CalZone is supported by advertising. We work with trusted advertising partners, including Google AdSense, who may use cookies to serve ads that are relevant to your general interests. These advertising cookies do not use or expose your calculator input data in any way.
                                </li>
                            </ul>

                            <p>
                                You can manage, restrict or delete cookies at any time through your browser settings. For a comprehensive guide on cookie management across all major browsers, please visit <a href="https://allaboutcookies.org" target="_blank" rel="noopener noreferrer">allaboutcookies.org</a>. Please be aware that disabling certain cookies may affect how some features of CalZone function.
                            </p>
                        </div>
                    </section>

                    {/* Legal Basis & Third Party Services */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <section className="bg-slate-100 dark:bg-slate-800/40 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-6">
                                <Scale className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 mt-0">Why We Process This Data (Legal Basis)</h2>
                            <div className="prose prose-slate dark:prose-invert prose-base max-w-none">
                                <p>UK GDPR requires that any processing of personal data be grounded on a lawful basis. For the limited technical and usage data that CalZone collects automatically, our lawful basis is <strong>Legitimate Interests</strong> under Article 6(1)(f) of the UK GDPR.</p>
                                <p>Our legitimate interests in processing this data include:</p>
                                <ul>
                                    <li>Keeping CalZone secure, stable and protected against abuse or malicious activity.</li>
                                    <li>Improving the quality, accuracy, and range of our calculator tools.</li>
                                    <li>Understanding how users interact with our platform so we can make informed design and content decisions.</li>
                                    <li>Sustaining CalZone as a free service through appropriate, privacy-respecting advertising.</li>
                                </ul>
                                <p>We have assessed these interests against your rights as a data subject and are confident that our processing is proportionate and does not override your fundamental privacy interests.</p>
                            </div>
                        </section>

                        <section className="bg-slate-100 dark:bg-slate-800/40 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
                            <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-2xl flex items-center justify-center mb-6">
                                <Users className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 mt-0">Third-Party Services We Work With</h2>
                            <div className="prose prose-slate dark:prose-invert prose-base max-w-none">
                                <p>To deliver and maintain CalZone, we integrate with a small number of trusted third-party service providers. Each of these providers operates under its own privacy policy, which we encourage you to review:</p>
                                <ul>
                                    <li>
                                        <strong>Google Analytics:</strong> Provides anonymised website traffic and usage analytics. Governed by Google's Privacy Policy.
                                    </li>
                                    <li>
                                        <strong>Google AdSense:</strong> Serves contextually relevant advertisements to support our free platform. Governed by Google's Privacy Policy.
                                    </li>
                                </ul>
                                <p>We do not sell, rent, trade or otherwise share your data with any third party for their own commercial purposes. Any data shared with the above providers is strictly limited to what is necessary for them to perform their services on our behalf.</p>
                            </div>
                        </section>
                    </div>

                    {/* How We Keep Data Safe & Retention */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <section className="bg-white dark:bg-slate-950 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
                            <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-2xl flex items-center justify-center mb-6">
                                <Lock className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 mt-0">How We Keep Your Data Safe</h2>
                            <div className="prose prose-slate dark:prose-invert prose-base max-w-none">
                                <p>CalZone takes data security seriously. We have implemented a range of technical and organisational safeguards to protect the limited data we process from unauthorised access, loss, misuse or disclosure. These include:</p>
                                <ul>
                                    <li>Full-site SSL/TLS encryption, ensuring all data transmitted between your browser and our servers is protected in transit.</li>
                                    <li>Regular security reviews of our infrastructure and third-party integrations.</li>
                                    <li>Strict access controls limiting who within our team can access operational data.</li>
                                </ul>
                                <p>No system can guarantee absolute security, but we are committed to applying industry-standard protections and responding promptly to any identified vulnerabilities.</p>
                            </div>
                        </section>

                        <section className="bg-white dark:bg-slate-950 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
                            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-2xl flex items-center justify-center mb-6">
                                <Clock className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 mt-0">How Long We Retain Data</h2>
                            <div className="prose prose-slate dark:prose-invert prose-base max-w-none">
                                <p>We retain the limited technical data we collect only for as long as it serves a clear purpose:</p>
                                <ul>
                                    <li><strong>Security and server logs:</strong> Retained for up to 90 days to allow us to investigate technical issues or security incidents, after which they are automatically deleted.</li>
                                    <li><strong>Anonymised analytics data:</strong> May be retained for longer periods (up to 26 months) as aggregated, non identifiable trends to inform ongoing platform improvements.</li>
                                    <li><strong className="text-emerald-600 dark:text-emerald-400">Your calculator inputs:</strong> Never retained, they are processed in your browser only and are never received by us.</li>
                                </ul>
                            </div>
                        </section>
                    </div>

                    {/* UK GDPR Rights */}
                    <section className="prose prose-slate dark:prose-invert prose-lg max-w-none">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">Your Rights Under UK GDPR</h2>
                        <p>
                            As a UK resident, you are entitled to a set of rights in relation to your personal data. While CalZone's data collection is minimal by design, we are fully committed to upholding these rights:
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 not-prose">
                            {['Right to be Informed', 'Right of Access', 'Right to Rectification', 'Right to Erasure', 'Right to Restrict Processing', 'Right to Data Portability', 'Right to Object', 'Rights re: Automated Decisions'].map((right, idx) => (
                                <div key={idx} className="bg-slate-100 dark:bg-slate-800/50 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center text-center">
                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">✓ {right}</span>
                                </div>
                            ))}
                        </div>

                        <p>
                            To exercise any of the above rights, please contact us using the details provided in last section. We will respond to all legitimate requests within 30 days in line with our obligations under UK GDPR. Please note that CalZone does not engage in any form of automated decision-making or profiling of its users.
                        </p>
                    </section>

                    {/* Other Legal Aspects */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <section className="prose prose-slate dark:prose-invert prose-base max-w-none">
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">International Data Transfers</h2>
                            <p>
                                CalZone is a UK-based platform. However, some of our third-party service providers (such as Google) may process data in countries outside the United Kingdom. Where such transfers occur.
                            </p>
                            <p>
                                We ensure that appropriate safeguards are in place to maintain the equivalent level of protection required under UK data protection law, including reliance on the UK Government's Adequacy Regulations and, where applicable, International Data Transfer Agreements (IDTAs).
                            </p>
                        </section>

                        <section className="prose prose-slate dark:prose-invert prose-base max-w-none">
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">Your Right to Complain to the ICO</h2>
                            <p>
                                If you are dissatisfied with how CalZone has handled your personal data, or if you feel your data protection rights have not been respected, you have the right to lodge a complaint with the United Kingdom's data protection supervisory authority.
                            </p>
                            <p>
                                We would, however, always appreciate the opportunity to address your concern directly before you escalate to the ICO. Please contact us first using the details below.
                            </p>
                        </section>
                    </div>

                    {/* Updates */}
                    <section className="bg-amber-50 dark:bg-amber-950/20 p-8 rounded-3xl border border-amber-200 dark:border-amber-900/30">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center shrink-0 mt-1 shadow-md shadow-amber-500/30">
                                <BellRing className="w-5 h-5" />
                            </div>
                            <div className="prose prose-amber dark:prose-invert prose-lg max-w-none">
                                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 mt-0">Updates to This Privacy Policy</h2>
                                <p className="text-base">
                                    We may revise this Privacy Policy from time to time to reflect changes in our services, legal obligations or best practices. When we make material changes, we will update the "Last updated" date at the top of this page and where appropriate, draw your attention to the changes on our website.
                                </p>
                                <p className="text-base mb-0">
                                    We encourage you to check this page periodically so that you are always aware of our current privacy practices. Continued use of CalZone following any update constitutes your acknowledgement of the revised policy.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Contact Us Footer */}
                    <section className="text-center pt-8 border-t border-slate-200 dark:border-slate-800">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">Contact Us</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
                            If you have any questions, concerns or requests relating to this Privacy Policy or how CalZone handles your data, please do not hesitate to get in touch with us. We aim to respond to all privacy-related enquiries within 5 business days.
                        </p>
                        <div className="bg-slate-100 dark:bg-slate-800/50 p-8 rounded-3xl inline-block w-full max-w-2xl mx-auto border border-slate-200 dark:border-slate-700 text-left">
                            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                                <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                                <div>
                                    <div className="font-bold text-slate-900 dark:text-white text-lg">CalZone | Data & Privacy Enquiries</div>
                                    <div className="text-slate-500 dark:text-slate-400 text-sm">Operated by: Nova Tech Studio | United Kingdom</div>
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
