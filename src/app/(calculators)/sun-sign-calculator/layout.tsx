import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sun Sign Calculator | Discover Your Core Essence",
    description: "Calculate your Sun sign accurately based on your birth date and time. Understand your basic identity and purpose in life.",
    alternates: { canonical: "/sun-sign-calculator" }
};

export default function SunLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
