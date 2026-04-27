"use client";

import { GradeCalculator } from "@/components/education/GradeCalculator";

export default function SGPAToPercentageCalculator() {
    return (
        <GradeCalculator 
            mode="cgpa-to-percent" 
            title="SGPA to Percentage Calculator" 
            description="Convert your Semester Grade Point Average (SGPA) into an equivalent percentage." 
        />
    );
}
