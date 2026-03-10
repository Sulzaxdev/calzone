import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Garage Roof | CalZone UK",
    description: "Replace felt or metal garage roofs",
    alternates: {
        canonical: "/garage-roof-replacement-cost-calculator-uk"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
