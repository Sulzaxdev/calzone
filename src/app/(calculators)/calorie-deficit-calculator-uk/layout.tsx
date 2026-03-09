import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Calorie Deficit Calculator UK | Safe Weight Loss Planner",
    description: "Calculate your exact daily caloric needs to safely lose weight. Based on the Mifflin-St Jeor equation and UK NHS weekly guidelines.",
    alternates: {
        canonical: "/calorie-deficit-calculator-uk"
    }
};

export default function CalorieDeficitLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
