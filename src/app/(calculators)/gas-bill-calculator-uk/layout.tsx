import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gas Bill | CalZone UK",
    description: "Estimate monthly gas expenditure",
    alternates: {
        canonical: "/gas-bill-calculator-uk"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
