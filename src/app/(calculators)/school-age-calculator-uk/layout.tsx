import { Metadata } from "next";

export const metadata: Metadata = {
    title: "School Age | CalZone UK",
    description: "Find which school year a child belongs in",
    alternates: {
        canonical: "/school-age-calculator-uk"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
