import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Drink Drive Limit | CalZone UK",
    description: "Estimate BAC levels",
    alternates: {
        canonical: "/drink-drive-limit-calculator-uk"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
