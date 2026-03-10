import { FAQSchema } from './faq-schema';
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
    isArticle?: boolean;
}

export function CalculatorSchema({ title, description, slug, faqs, isArticle }: CalculatorSchemaProps) {
    const url = `https://www.thecalzone.co.uk${slug}`;

    const softwareSchema = !isArticle ? {
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
    } : null;

    return (
        <>
            {softwareSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
                />
            )}
            {faqs && faqs.length > 0 && <FAQSchema items={faqs} />}
        </>
    );
}
