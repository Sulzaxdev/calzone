import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dog Bite Comp | CalZone UK",
    description: "Estimate animal attack settlement",
    alternates: {
        canonical: "/dog-bite-compensation-calculator-uk"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
