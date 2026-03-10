import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tree Removal | CalZone UK",
    description: "Estimate tree felling costs",
    alternates: {
        canonical: "/tree-removal-cost-calculator-uk"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
