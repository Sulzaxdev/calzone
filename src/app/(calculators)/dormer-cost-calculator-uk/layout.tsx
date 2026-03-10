import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dormer Cost | CalZone UK",
    description: "Estimate UK dormer loft conversion costs",
    alternates: {
        canonical: "/dormer-cost-calculator-uk"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
