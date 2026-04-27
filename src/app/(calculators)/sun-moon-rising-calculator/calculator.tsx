"use client";

import { AstrologyCalculator } from "@/components/astrology/AstrologyCalculator";

export default function BigThreeCalculator() {
    return (
        <AstrologyCalculator 
            type="big-three" 
            title="Sun Moon and Rising Sign Calculator" 
            description="Find your 'Big Three' - the core layers of your personality, emotions, and outward persona - using our high-precision astronomical engine."
        />
    );
}
