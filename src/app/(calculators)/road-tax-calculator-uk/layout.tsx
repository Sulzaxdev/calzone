import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Road Tax | CalZone UK",
    description: "UK Vehicle Excise Duty",
    alternates: {
        canonical: "/road-tax-calculator-uk"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
