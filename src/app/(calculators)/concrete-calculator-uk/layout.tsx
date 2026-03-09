import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Concrete Calculator | Volume & Bag Estimator for UK Slabs",
    description: "Calculate exactly how much concrete volume (m³) you need for your slab, patio, or footings. It also estimates the number of premixed bags required.",
    alternates: {
        canonical: "/concrete-calculator-uk"
    }
};

export default function ConcreteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
