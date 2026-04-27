"use client";

import { GradeCalculator } from "@/components/education/GradeCalculator";

export default function PercentageToCGPACalculator() {
    return (
        <GradeCalculator 
            mode="percent-to-cgpa" 
            title="Percentage to CGPA Calculator" 
            description="Reverse calculation tool to find your CGPA based on your percentage score." 
        />
    );
}
