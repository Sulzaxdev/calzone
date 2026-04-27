"use client";

import { AstrologyCalculator } from "@/components/astrology/AstrologyCalculator";

export default function SunSignCalculator() {
    return (
        <AstrologyCalculator 
            type="sun" 
            title="Sun Sign Calculator" 
            description="Your Sun sign represents your main identity, your will, and your life force. It's the core of who you are."
        />
    );
}
