import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Marks Percentage Calculator | Calculate Your Exam Score %",
    description: "Quickly find your percentage based on obtained and total marks. Perfect for school and college exams.",
    alternates: { canonical: "/marks-percentage-calculator" }
};

export default function MarksLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
