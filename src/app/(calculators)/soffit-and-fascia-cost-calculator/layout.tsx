import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Soffit & Fascia | CalZone UK",
    description: "Estimate roofline replacement",
    alternates: {
        canonical: "/soffit-and-fascia-cost-calculator"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
