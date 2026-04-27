import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Sun Moon and Rising Sign Calculator | Find Your Big Three",
    description: "Find your Big Three - your Sun, Moon, and Rising signs - with our free astrology calculator. Reveal the core of your personality and emotions.",
    alternates: { canonical: "/sun-moon-rising-calculator" }
};

export default function SMRLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
