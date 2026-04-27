import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Part of Fortune Calculator | Luck and Success",
    description: "Calculate your Part of Fortune in astrology to find where you'll find success and joy.",
    alternates: { canonical: "/part-of-fortune-calculator" }
};

export default function POFLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
