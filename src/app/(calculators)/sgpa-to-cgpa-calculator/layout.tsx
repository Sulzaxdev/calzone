import { Metadata } from "next";

export const metadata: Metadata = {
    title: "SGPA to CGPA Calculator | Aggregate Your Semester Grades",
    description: "Convert your semester SGPA scores into a final Cumulative CGPA. Easy to use tool for students.",
    alternates: { canonical: "/sgpa-to-cgpa-calculator" }
};

export default function SGPALayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
