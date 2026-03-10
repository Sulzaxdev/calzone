import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Annual Leave | CalZone UK",
    description: "UK statutory holiday entitlement",
    alternates: {
        canonical: "/annual-leave-calculator-uk"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
