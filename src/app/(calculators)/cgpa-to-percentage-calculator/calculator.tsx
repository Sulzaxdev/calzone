"use client";

import { GradeCalculator } from "@/components/education/GradeCalculator";

export default function CGPACalculator() {
    return (
        <GradeCalculator 
            mode="cgpa-to-percent" 
            title="CGPA to Percentage Calculator" 
            description="Standardized tool to convert your Cumulative Grade Point Average (CGPA) into an equivalent percentage score."
        />
    );
}
