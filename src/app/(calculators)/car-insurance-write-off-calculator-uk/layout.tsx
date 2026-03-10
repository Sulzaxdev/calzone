import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Car Write-Off | CalZone UK",
    description: "Estimate damage vs value",
    alternates: {
        canonical: "/car-insurance-write-off-calculator-uk"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
