import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Percentage to CGPA Calculator | Reverse Academic Conversion",
    description: "Convert your percentage score back to CGPA for 10.0, 4.0, or 5.0 scales accurately.",
    alternates: { canonical: "/percentage-to-cgpa-calculator" }
};

export default function PercentToCgpaLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
