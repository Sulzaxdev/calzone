import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Roof Replacement | CalZone UK",
    description: "Estimate new pitched roof cost",
    alternates: {
        canonical: "/roof-replacement-cost-calculator-uk"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
