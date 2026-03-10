import React from 'react';

export interface FAQItem {
    question: string;
    answer: string | React.ReactNode;
}

interface FAQSchemaProps {
    items?: FAQItem[];
    id?: string;
}

export const DEFAULT_FAQS: FAQItem[] = [
    {
        question: "What is CalZone?",
        answer: "CalZone is a free UK calculator hub covering everything from health and fitness to finance, property and investments. Whatever you need to work out, there is a tool here for it. No sign-up, no cost, no hassle."
    },
    {
        question: "Can I save or share my calculation results?",
        answer: "Absolutely. Unlike most calculator websites, CalZone lets you export your results as a PDF in one click. Perfect for sharing with your doctor, mortgage adviser or just keeping for your own records."
    },
    {
        question: "How accurate are the results?",
        answer: "Very. Every calculator is built on verified UK data sources and updated regularly to reflect the latest rates, tax bands and official guidelines. That said, for major financial or medical decisions, always back your results up with a qualified professional."
    },
    {
        question: "How often are calculators updated?",
        answer: "Regularly. Whenever tax rates change, HMRC updates its guidelines or NHS benchmarks shift, we update the relevant tools to match. You will always get results based on current UK standards."
    },
    {
        question: "Are CalZone results good enough for professional use?",
        answer: "Our results are highly accurate and great for planning, budgeting and informed decision-making. However, CalZone is an informational tool, for anything with serious financial, legal or medical consequences, we would always recommend speaking to a qualified professional too."
    },
    {
        question: "Are your calculators built for the UK?",
        answer: "Yes, and this matters more than people realise. Every tool on CalZone is built specifically for UK users. Our financial calculators follow HMRC guidelines, our health tools align with NHS benchmarks & our driving calculators reflect current UK rates and legislation."
    }
];

export function FAQSchema({ items = DEFAULT_FAQS, id = "faq-schema" }: FAQSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": items
            .map(item => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": typeof item.answer === 'string' ? item.answer : ""
                }
            }))
            .filter(f => f.acceptedAnswer.text !== "")
    };

    if (schema.mainEntity.length === 0) return null;

    return (
        <script
            id={id}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
