import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "TDEE Calculator UK | Total Daily Energy Expenditure & Macros",
    description: "Calculate your Total Daily Energy Expenditure (TDEE) and get personalized calorie targets for weight loss, maintenance, or muscle gain.",
    alternates: {
        canonical: "https://www.thecalzone.co.uk/tdee-calculator-uk",
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
                        "name": "TDEE Calculator",
                        "operatingSystem": "Web",
                        "applicationCategory": "HealthApplication",
                        "url": "https://www.thecalzone.co.uk/tdee-calculator-uk",
                        "description": "Calculate your Total Daily Energy Expenditure (TDEE) and get personalized calorie and macro recommendations for health and fitness.",
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
