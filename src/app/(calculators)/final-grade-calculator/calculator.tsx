"use client";

import { GradeCalculator } from "@/components/education/GradeCalculator";

export default function FinalGradeCalculator() {
    return (
        <GradeCalculator 
            mode="gpa-calc" 
            title="Final Grade Calculator" 
            description="Work out your final grades based on current scores and weighted assignments." 
        />
    );
}
