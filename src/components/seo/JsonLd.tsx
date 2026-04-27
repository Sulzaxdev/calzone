import Script from "next/script";

interface JsonLdProps {
    type: "WebApplication" | "SoftwareApplication" | "FAQPage";
    name: string;
    description: string;
    url: string;
    path: string;
    faqs?: { question: string; answer: string }[];
}

export function JsonLd({ type, name, description, url, path, faqs }: JsonLdProps) {
    const fullUrl = `${url}${path}`;
    
    const webAppSchema = {
        "@context": "https://schema.org",
        "@type": type,
        "name": name,
        "description": description,
        "url": fullUrl,
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "GBP"
        }
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": url
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": name,
                "item": fullUrl
            }
        ]
    };

    const faqSchema = faqs ? {
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
            <Script
                id={`schema-webapp-${path}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
            />
            <Script
                id={`schema-breadcrumb-${path}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {faqSchema && (
                <Script
                    id={`schema-faq-${path}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}
        </>
    );
}
