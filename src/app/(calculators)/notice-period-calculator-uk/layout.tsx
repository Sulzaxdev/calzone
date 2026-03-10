import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Notice Period | CalZone UK",
    description: "Statutory and contractual notice helper",
    alternates: {
        canonical: "/notice-period-calculator-uk"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
