import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { Mail, MessageSquareText, ShieldAlert, Sparkles } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | CalZone",
    description: "CalZone gets better because of its users. Share your feedback, suggest a new calculator or report an issue. Our UK based team responds to every single message.",
};

export default function ContactUsPage() {
    const breadcrumbs = [
        { name: "Home", item: "/" },
        { name: "Contact Us", item: "/contact-us" },
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
                        <MessageSquareText className="w-4 h-4" />
                        Get In Touch
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Welcome To The <span className="text-blue-600 dark:text-blue-400">Contact Us</span> Page
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-16 max-w-3xl">
                <div className="space-y-12">

                    {/* Intro paragraph */}
                    <section className="prose prose-slate dark:prose-invert prose-lg max-w-none text-center">
                        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                            This is not one of those contact pages where messages disappear into a void. Every enquiry sent to CalZone lands with a real human being who genuinely cares about making this website better. Your feedback shapes what we build next. Your bug reports help us keep things running smoothly. And your calculator ideas, well, more than a few of our tools exist because someone just like you suggested them.
                        </p>
                    </section>

                    {/* How to Reach Us */}
                    <section className="bg-white dark:bg-slate-950 p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden text-center mt-12">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">Get in Touch</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                                We love hearing from our users. Whether you have spotted an issue, have an idea for a new calculator or just want to say hello, we are always listening.
                            </p>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                                Feel free to reach us anytime and we will get back to you as soon as we can.
                            </p>

                            <div className="inline-flex items-center gap-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 hover:-translate-y-1 transition-transform">
                                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center shrink-0">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Email Us</div>
                                    <a href="mailto:info@thecalzone.co.uk" className="text-2xl font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        info@thecalzone.co.uk
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Contact reasons grid */}
                    <section className="grid sm:grid-cols-2 gap-6 mt-12">
                        <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
                            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mb-6">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-white">Suggest a Calculator</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Missing a specific calculation tool? Let us know what you need and our team will look into building it for the UK public.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
                            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center mb-6">
                                <ShieldAlert className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-white">Report an Issue</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Found a bug or an inaccuracy in our data? Please let us know so we can fix it immediately and maintain our standard of precision.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
