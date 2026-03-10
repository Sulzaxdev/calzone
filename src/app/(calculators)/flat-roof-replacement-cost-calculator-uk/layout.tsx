import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Flat Roof Cost | CalZone UK",
    description: "Estimate flat roof replacement",
    alternates: {
        canonical: "/flat-roof-replacement-cost-calculator-uk"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
