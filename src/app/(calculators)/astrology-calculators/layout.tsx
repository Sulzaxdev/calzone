import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Astrology Calculators | Precise Zodiac Insights",
    description: "Explore our suite of 10+ free astrology calculators. From Big Three to Vertex, get 100% accurate astronomical calculations for your birth chart.",
    alternates: { canonical: "/astrology-calculators" }
};

export default function AstrologyLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
