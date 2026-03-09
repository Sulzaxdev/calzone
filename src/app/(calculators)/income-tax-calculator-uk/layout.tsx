import { Metadata } from "next";

export const metadata: Metadata = {
    title: "UK Income Tax Calculator | HMRC Tax Band Estimator 24/25",
    description: "Discover exactly how much Income Tax you owe to HMRC. Break down your salary into the Basic, Higher, and Additional tax bands.",
    alternates: {
        canonical: "/income-tax-calculator-uk"
    }
};

export default function IncomeTaxLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
