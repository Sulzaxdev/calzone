import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pet Transport | CalZone UK",
    description: "Estimate animal relocation fees",
    alternates: {
        canonical: "/pet-transport-cost-calculator-uk"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
