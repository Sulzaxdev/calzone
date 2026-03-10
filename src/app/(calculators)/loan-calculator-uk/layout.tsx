import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Loan Calculator | CalZone UK",
    description: "Monthly payments and total interest",
    alternates: {
        canonical: "/loan-calculator-uk"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
