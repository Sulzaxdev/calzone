import React from 'react';

export function ProductSchema() {
    const schema = {
        "@context": "http://schema.org",
        "@type": "Product",
        "name": "CalZone - Calculator Hub For UK",
        "url": "https://www.thecalzone.co.uk/",
        "image": "https://www.thecalzone.co.uk/_next/image?url=%2Flogo.png",
        "description": "CalZone is a free UK-based calculator hub offering 1,000+ specialist tools across health, finance, tax, automotive, construction, and more. Trusted by 100,000+ UK users, it delivers fast, accurate results with zero complexity.",
        "brand": {
            "@type": "Brand",
            "name": "CalZone"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "120"
        },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": "10",
            "priceValidUntil": "2030-01-01",
            "itemCondition": "NewCondition",
            "availability": "InStock"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
