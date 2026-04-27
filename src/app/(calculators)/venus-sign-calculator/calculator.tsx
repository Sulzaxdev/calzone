"use client";

import { AstrologyCalculator } from "@/components/astrology/AstrologyCalculator";

export default function VenusSignCalculator() {
    return (
        <AstrologyCalculator 
            type="venus" 
            title="Venus Sign Calculator" 
            description="Venus governs love, money, beauty, and what you find attractive. Discover your romantic style."
        />
    );
}
