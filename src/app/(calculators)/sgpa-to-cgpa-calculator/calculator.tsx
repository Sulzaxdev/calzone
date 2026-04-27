"use client";

import { GradeCalculator } from "@/components/education/GradeCalculator";

export default function SGPAToCGPACalculator() {
    return (
        <GradeCalculator 
            mode="gpa-calc" 
            title="SGPA to CGPA Calculator" 
            description="Average your semester-wise SGPA to find your final cumulative grade point average." 
        />
    );
}
