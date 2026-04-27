import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Final Grade Calculator | Plan Your Academic Success",
    description: "Determine the grade you need on your final exam to reach your target course grade.",
    alternates: { canonical: "/final-grade-calculator" }
};

export default function FinalGradeLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
