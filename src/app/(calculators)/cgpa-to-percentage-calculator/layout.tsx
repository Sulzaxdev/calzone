import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CGPA to Percentage Calculator | Standard Academic Conversion",
    description: "Convert your CGPA to percentage easily for 4.0, 5.0, and 10.0 grading scales. Free accurate academic tool for UK and international students.",
    alternates: {
        canonical: "/cgpa-to-percentage-calculator"
    }
};

export default function CGPALayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
