import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Chiron Sign Calculator | The Wounded Healer",
    description: "Discover your Chiron sign and understand your deepest wounds and healing path.",
    alternates: { canonical: "/chiron-sign-calculator" }
};

export default function ChironLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
