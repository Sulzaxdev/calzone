"use client";

import { AstrologyCalculator } from "@/components/astrology/AstrologyCalculator";

export default function RisingSignCalculator() {
    return (
        <AstrologyCalculator 
            type="rising" 
            title="Rising Sign Calculator" 
            description="Your Rising sign, or Ascendant, represents the mask you wear and the first impression you make on others."
        />
    );
}
