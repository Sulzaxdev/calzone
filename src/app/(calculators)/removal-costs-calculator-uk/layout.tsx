import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Removal Costs | CalZone UK",
    description: "Estimate house moving fees",
    alternates: {
        canonical: "/removal-costs-calculator-uk"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
