import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Rising Sign Calculator | Your Ascendant Sign",
    description: "Discover your Rising sign (Ascendant) based on your exact birth time and location. Understand your outward personality.",
    alternates: { canonical: "/rising-sign-calculator" }
};

export default function RisingLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
