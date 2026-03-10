import { Metadata } from "next";

export const metadata: Metadata = {
    title: "BTU Radiator | CalZone UK",
    description: "Calculate room heating needs",
    alternates: {
        canonical: "/btu-calculator-uk"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
