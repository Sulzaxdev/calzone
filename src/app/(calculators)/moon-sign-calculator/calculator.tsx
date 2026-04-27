"use client";

import { AstrologyCalculator } from "@/components/astrology/AstrologyCalculator";

export default function MoonSignCalculator() {
    return (
        <AstrologyCalculator 
            type="moon" 
            title="Moon Sign Calculator" 
            description="The Moon represents your emotional nature, your instincts, and your subconscious mind. Discover how you feel and react."
        />
    );
}
