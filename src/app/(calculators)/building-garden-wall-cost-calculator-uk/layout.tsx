import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Garden Wall Cost Calculator UK | Brick & Block Wall Pricing",
    description: "Estimate the cost of building a garden wall in the UK. Calculate materials (bricks, sand, cement) and labor costs for different wall heights and lengths.",
    alternates: {
        canonical: "/building-garden-wall-cost-calculator-uk"
    }
};

export default function GardenWallLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
