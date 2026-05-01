import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Sun Moon and Rising Sign Calculator",
    description: "Calculate your Sun, Moon and Rising signs free with our Big Three calculator. Enter your birth date, time, location to reveal your core personality, emotional world and rising sign instantly.",
    alternates: {
        canonical: "https://www.thecalzone.co.uk/sun-moon-rising-calculator"
    }
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
