import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Speeding Fine | CalZone UK",
    description: "UK Penalty Guidelines",
    alternates: {
        canonical: "/speeding-fine-calculator-uk"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
