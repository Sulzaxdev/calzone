import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Venus Sign Calculator | Love and Attraction",
    description: "Calculate your Venus sign to discover your love style, attraction patterns, and aesthetic preferences.",
    alternates: { canonical: "/venus-sign-calculator" }
};

export default function VenusLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
