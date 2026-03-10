import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Car Tax Refund | CalZone UK",
    description: "Estimated VED refund amount",
    alternates: {
        canonical: "/car-tax-refund-calculator-uk"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
