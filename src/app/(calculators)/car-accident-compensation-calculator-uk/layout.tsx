import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Car Accident Comp | CalZone UK",
    description: "Estimate injury settlement",
    alternates: {
        canonical: "/car-accident-compensation-calculator-uk"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
