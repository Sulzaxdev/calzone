import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Water Intake Calculator | Daily Hydration Planner",
    description: "Calculate exactly how much water you should drink daily based on your weight, exercise routine, and local climate.",
    alternates: {
        canonical: "/water-intake-calculator"
    }
};

export default function WaterIntakeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
