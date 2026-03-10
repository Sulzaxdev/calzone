import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sleep Debt | CalZone UK",
    description: "Calculate accumulated lost sleep",
    alternates: {
        canonical: "/sleep-debt-calculator"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
