import { Metadata } from "next";

export const metadata: Metadata = {
    title: "BMR Calculator | CalZone UK",
    description: "Basal Metabolic Rate",
    alternates: {
        canonical: "/bmr-calculator-to-lose-weight"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
