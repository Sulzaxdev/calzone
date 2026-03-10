import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Redundancy Calculator | CalZone UK",
    description: "Calculate Statutory Redundancy Pay (SRP)",
    alternates: {
        canonical: "/redundancy-calculator-uk"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
