import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Fuel Cost Calculator UK | Journey Price & MPG Estimator",
    description: "Calculate how much a journey will cost in fuel based on your vehicle's MPG and current UK petrol/diesel prices. Estimate total litres and cost for any trip.",
    alternates: {
        canonical: "/fuel-cost-calculator-uk"
    }
};

export default function FuelCostLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
