import { Metadata } from "next";

export const metadata: Metadata = {
    title: "University Grade | CalZone UK",
    description: "Calculate degree classification",
    alternates: {
        canonical: "/university-grade-calculator-uk"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
