import { Metadata } from "next";

export const metadata: Metadata = {
    title: "House Extension | CalZone UK",
    description: "General guide for extension budgeting",
    alternates: {
        canonical: "/house-extension-cost-calculator-uk"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
