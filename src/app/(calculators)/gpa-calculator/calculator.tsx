"use client";

import { GradeCalculator } from "@/components/education/GradeCalculator";

export default function GPACalculator() {
    return (
        <GradeCalculator 
            mode="gpa-calc" 
            title="GPA Calculator" 
            description="Calculate your Grade Point Average (GPA) by entering your subjects, grades, and credit hours." 
        />
    );
}
