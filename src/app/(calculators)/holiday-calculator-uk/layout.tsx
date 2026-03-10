import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Holiday Budget | CalZone UK",
    description: "Estimate your vacation cost",
    alternates: {
        canonical: "/holiday-calculator-uk"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
