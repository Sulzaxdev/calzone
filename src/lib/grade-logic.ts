export type GradingScale = 4.0 | 5.0 | 10.0;

export interface SubjectGrade {
    id: string;
    name: string;
    grade: string; // A1, A2, etc or numeric
    credits: number;
}

export function cgpaToPercentage(cgpa: number, scale: GradingScale = 10.0): number {
    if (scale === 10.0) {
        // Standard CBSE multiplier is 9.5
        return cgpa * 9.5;
    } else if (scale === 4.0) {
        // Simple linear mapping for US scale
        return (cgpa / 4.0) * 100;
    } else {
        return (cgpa / scale) * 100;
    }
}

export function percentageToCgpa(percentage: number, scale: GradingScale = 10.0): number {
    if (scale === 10.0) {
        return percentage / 9.5;
    } else {
        return (percentage / 100) * scale;
    }
}

export function calculateGpa(subjects: SubjectGrade[]): number {
    let totalPoints = 0;
    let totalCredits = 0;

    const gradePointsMap: Record<string, number> = {
        "A1": 10, "A2": 9, "B1": 8, "B2": 7, "C1": 6, "C2": 5, "D": 4, "E": 0
    };

    subjects.forEach(s => {
        const points = gradePointsMap[s.grade] || parseFloat(s.grade) || 0;
        totalPoints += points * s.credits;
        totalCredits += s.credits;
    });

    return totalCredits > 0 ? totalPoints / totalCredits : 0;
}

export function marksToPercentage(obtained: number, total: number): number {
    return total > 0 ? (obtained / total) * 100 : 0;
}

export function sgpaToCgpa(sgpas: number[]): number {
    if (sgpas.length === 0) return 0;
    const sum = sgpas.reduce((a, b) => a + b, 0);
    return sum / sgpas.length;
}
