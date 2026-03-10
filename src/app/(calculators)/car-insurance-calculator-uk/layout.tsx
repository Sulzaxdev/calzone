import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Car Insurance | CalZone UK",
    description: "Rough premium estimator",
    alternates: {
        canonical: "/car-insurance-calculator-uk"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
