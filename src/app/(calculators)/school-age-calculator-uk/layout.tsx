import { Metadata } from "next";

export const metadata: Metadata = {
    title: "School Age | CalZone UK",
    description: "Find which school year a child belongs in",
    alternates: {
        canonical: "/school-age-calculator-uk"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const softwareAppSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "UK School Age Calculator",
        "url": "https://www.thecalzone.co.uk/school-age-calculator-uk",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "All",
        "description": "UK School Age Calculator helps parents determine their child’s school year, starting age, and academic stage based on date of birth and UK education rules.",
        "browserRequirements": "Requires JavaScript enabled",
        "softwareVersion": "1.0",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "GBP"
        },
        "featureList": [
            "Calculate school year group instantly",
            "Supports UK education system (England, Wales, Scotland)",
            "Provides school starting age",
            "Easy date of birth input",
            "Free online tool"
        ],
        "author": {
            "@type": "Organization",
            "name": "The Calzone"
        }
    };

    const productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "UK School Age Calculator",
        "image": "https://www.thecalzone.co.uk/images/school-age-calculator.jpg",
        "description": "A free online UK School Age Calculator that determines your child’s school year, age group, and starting year based on date of birth.",
        "brand": {
            "@type": "Brand",
            "name": "The Calzone"
        },
        "offers": {
            "@type": "Offer",
            "url": "https://www.thecalzone.co.uk/school-age-calculator-uk",
            "priceCurrency": "GBP",
            "price": "0",
            "availability": "https://schema.org/InStock"
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is a UK School Age Calculator?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A UK School Age Calculator is an online tool that determines a child’s school year group and starting age based on their date of birth and UK education system rules."
                }
            },
            {
                "@type": "Question",
                "name": "At what age do children start school in the UK?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Children usually start school in Reception at age 4 to 5, depending on their date of birth and the academic year cutoff of 1st September."
                }
            },
            {
                "@type": "Question",
                "name": "How does the UK school year system work?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The UK school year runs from 1st September to 31st August. Children born within this period are grouped into the same academic year."
                }
            },
            {
                "@type": "Question",
                "name": "Can I delay my child’s school start?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, in some cases parents can defer school entry, especially for children born between April and August, subject to local authority approval."
                }
            },
            {
                "@type": "Question",
                "name": "Is this calculator accurate?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, the calculator follows standard UK education guidelines, but final placement decisions are made by local schools or councils."
                }
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            {children}
        </>
    );
}
