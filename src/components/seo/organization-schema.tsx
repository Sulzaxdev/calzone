import React from 'react';

export function OrganizationSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "CalZone",
        "url": "https://www.thecalzone.co.uk",
        "logo": "https://www.thecalzone.co.uk/logo.png",
        "sameAs": [
            "https://twitter.com/thecalzoneuk",
            "https://www.facebook.com/thecalzoneuk"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "email": "hello@thecalzone.co.uk",
            "contactType": "customer service"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
