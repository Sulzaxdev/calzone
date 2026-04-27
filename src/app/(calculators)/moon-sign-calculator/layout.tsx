import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Moon Sign Calculator | Your Emotional Blueprint",
    description: "Calculate your Moon sign to understand your emotional needs, instincts, and how you process feelings.",
    alternates: { canonical: "/moon-sign-calculator" }
};

export default function MoonLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
