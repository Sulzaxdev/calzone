import { Metadata } from "next";

export const metadata: Metadata = {
    title: "EV Charging Cost | CalZone UK",
    description: "Calculate home/public charging",
    alternates: {
        canonical: "/ev-charging-cost-calculator-uk"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
