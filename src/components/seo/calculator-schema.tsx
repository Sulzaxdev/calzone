import React from 'react';

type FAQ = {
    question: string;
    answer: string;
};

interface CalculatorSchemaProps {
    title: string;
    description: string;
    slug: string;
    faqs?: FAQ[];
}

export function CalculatorSchema({ title, description, slug, faqs }: CalculatorSchemaProps) {
    const url = `https://www.thecalzone.co.uk${slug}`;

    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": title,
        "description": description,
        "url": url,
        "applicationCategory": "CalculatorApplication",
        "operatingSystem": "All",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "GBP"
        }
    };

    const faqSchema = faqs && faqs.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    } : null;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
            />
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}
        </>
    );
}
