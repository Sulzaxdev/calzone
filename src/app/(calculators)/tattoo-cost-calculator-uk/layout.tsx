import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tattoo Cost | CalZone UK",
    description: "Estimate UK tattoo pricing",
    alternates: {
        canonical: "/tattoo-cost-calculator-uk"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
