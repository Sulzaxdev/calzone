import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Double Glazing | CalZone UK",
    description: "Estimate new windows cost",
    alternates: {
        canonical: "/double-glazing-cost-calculator-uk"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
