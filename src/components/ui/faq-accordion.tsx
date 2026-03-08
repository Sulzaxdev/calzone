import { HelpCircle } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

export interface FAQ {
    question: string;
    answer: string | React.ReactNode;
}

export interface FAQAccordionProps {
    faqs: FAQ[];
    title?: string;
}

export function FAQAccordion({ faqs, title = "Frequently Asked Questions" }: FAQAccordionProps) {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": typeof faq.answer === 'string' ? faq.answer : "" // Only strings are valid for JSON-LD text
            }
        })).filter(f => f.acceptedAnswer.text !== "")
    };

    return (
        <div className="space-y-6 pt-8 border-t border-slate-200 dark:border-slate-800 w-full mb-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-blue-500" /> {title}
            </h3>
            <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                    <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 data-[state=open]:shadow-md transition-all"
                    >
                        <AccordionTrigger className="hover:no-underline py-6">
                            <span className="font-bold text-slate-900 dark:text-slate-100 text-left">
                                {faq.question}
                            </span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-6 text-slate-600 dark:text-slate-400 leading-relaxed sm:text-lg">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
