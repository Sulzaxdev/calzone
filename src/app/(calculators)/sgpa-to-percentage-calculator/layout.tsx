import { Metadata } from "next";

export const metadata: Metadata = {
    title: "SGPA to Percentage Calculator | Semester Mark Finder",
    description: "Convert your semester SGPA into a percentage score instantly using standard academic formulas.",
    alternates: { canonical: "/sgpa-to-percentage-calculator" }
};

export default function SgpaToPercentLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
