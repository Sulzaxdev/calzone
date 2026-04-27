"use client";

import { GradeCalculator } from "@/components/education/GradeCalculator";

export default function MarksPercentageCalculator() {
    return (
        <GradeCalculator 
            mode="marks-to-percent" 
            title="Marks Percentage Calculator" 
            description="Calculate your percentage by entering your obtained marks and total marks." 
        />
    );
}
