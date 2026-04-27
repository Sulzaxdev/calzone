import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Vertex Calculator | Fated Encounters",
    description: "Calculate your Vertex sign to understand fated relationships and karmic connections.",
    alternates: { canonical: "/vertex-calculator" }
};

export default function VertexLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
