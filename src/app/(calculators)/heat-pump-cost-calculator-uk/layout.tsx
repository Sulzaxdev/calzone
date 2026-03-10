import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Heat Pump Cost | CalZone UK",
    description: "UK heat pump estimator",
    alternates: {
        canonical: "/heat-pump-cost-calculator-uk"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
