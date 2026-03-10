import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Pregnancy Due Date Calculator UK | Estimated Date of Delivery",
    description: "Calculate your estimated pregnancy due date (EDD) and track your trimesters using your last period (LMP), conception date, or IVF transfer.",
    alternates: {
        canonical: "https://www.thecalzone.co.uk/pregnancy-due-date-calculator-uk",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Pregnancy Due Date Calculator",
                        "operatingSystem": "Web",
                        "applicationCategory": "HealthApplication",
                        "url": "https://www.thecalzone.co.uk/pregnancy-due-date-calculator-uk",
                        "description": "Calculate your estimated pregnancy due date (EDD) and track your trimesters using your last period (LMP), conception date, or IVF transfer.",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "GBP"
                        }
                    })
                }}
            />
            {children}
        </>
    );
}
