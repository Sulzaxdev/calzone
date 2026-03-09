import { Metadata } from "next";

export const metadata: Metadata = {
    title: "VAT Calculator UK | Add or Remove UK Value Added Tax",
    description: "Instantly add or remove Value Added Tax from any amount. Select current UK rates (20%, 5%, or 0%) to find gross, net, and total tax amounts instantly.",
    alternates: {
        canonical: "/vat-calculator-uk"
    }
};

export default function VATLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
