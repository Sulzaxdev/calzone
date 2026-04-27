import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Lilith Sign Calculator | Hidden Desires",
    description: "Calculate your Black Moon Lilith sign to understand your raw energy and hidden traits.",
    alternates: { canonical: "/lilith-sign-calculator" }
};

export default function LilithLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
