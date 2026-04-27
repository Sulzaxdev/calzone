import { Metadata } from "next";

export const metadata: Metadata = {
    title: "GPA Calculator | Weighted Grade Point Average",
    description: "Calculate your weighted GPA based on subject grades and credits. Supports multiple grading systems.",
    alternates: { canonical: "/gpa-calculator" }
};

export default function GPALayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
