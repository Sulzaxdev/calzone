import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mileage Reimbursement Calculator | HMRC AMAP Claim Estimator",
    description: "Calculate your tax-free mileage claim amount for business travel using official HMRC AMAP rates. Support for cars, vans, motorcycles, and bicycles.",
    alternates: {
        canonical: "/mileage-calculator-uk"
    }
};

export default function MileageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
