import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Decking Cost Calculator UK | Installation & Material Estimates",
    description: "Calculate the total cost of your decking project including materials and labor. Estimates for timber, composite, and PVC decking in the UK.",
    alternates: {
        canonical: "/decking-cost-calculator-uk"
    }
};

export default function DeckingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
