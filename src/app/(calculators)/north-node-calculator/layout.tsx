import { Metadata } from "next";

export const metadata: Metadata = {
    title: "North Node Calculator | Your Soul's Destiny",
    description: "Calculate your North Node to find your soul's purpose and destiny in this lifetime.",
    alternates: { canonical: "/north-node-calculator" }
};

export default function NorthNodeLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
