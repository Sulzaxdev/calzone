import React from 'react';

export function FAQSchema() {
    const schema = {
        "@context": "http://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is CalZone?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "CalZone is a free UK calculator hub covering everything from health and fitness to finance, property and investments. Whatever you need to work out, there is a tool here for it. No sign-up, no cost, no hassle."
                }
            },
            {
                "@type": "Question",
                "name": "Can I save or share my calculation results?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. Unlike most calculator websites, CalZone lets you export your results as a PDF in one click. Perfect for sharing with your doctor, mortgage adviser or just keeping for your own records."
                }
            },
            {
                "@type": "Question",
                "name": "How accurate are the results?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Very. Every calculator is built on verified UK data sources and updated regularly to reflect the latest rates, tax bands and official guidelines. That said, for major financial or medical decisions, always back your results up with a qualified professional."
                }
            },
            {
                "@type": "Question",
                "name": "How often are calculators updated?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Regularly. Whenever tax rates change, HMRC updates its guidelines or NHS benchmarks shift, we update the relevant tools to match. You will always get results based on current UK standards."
                }
            },
            {
                "@type": "Question",
                "name": "Are CalZone results good enough for professional use?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our results are highly accurate and great for planning, budgeting and informed decision-making. However, CalZone is an informational tool, for anything with serious financial, legal or medical consequences, we would always recommend speaking to a qualified professional too."
                }
            },
            {
                "@type": "Question",
                "name": "Are your calculators built for the UK?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, and this matters more than people realise. Every tool on CalZone is built specifically for UK users. Our financial calculators follow HMRC guidelines, our health tools align with NHS benchmarks & our driving calculators reflect current UK rates and legislation."
                }
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
