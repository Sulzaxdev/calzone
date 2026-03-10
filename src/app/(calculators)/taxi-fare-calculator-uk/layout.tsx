import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Taxi Fare | CalZone UK",
    description: "UK cab fare estimator",
    alternates: {
        canonical: "/taxi-fare-calculator-uk"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
