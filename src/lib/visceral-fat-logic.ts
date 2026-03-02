export interface VisceralFatInputs {
    age: number;
    gender: "male" | "female";
    height: number; // cm
    weight: number; // kg
    waist: number; // cm
    unit: "metric" | "imperial";
}

export interface VisceralFatResult {
    vfl: number; // Visceral Fat Level (1-20 scale)
    riskCategory: "Low" | "Moderate" | "High" | "Very High";
    whtr: number;
    bmi: number;
    idealWaist: number;
    metabolicRiskScore: number; // 0-100
}

/**
 * Estimates Visceral Fat Level (VFL) and associated risks.
 * Note: This is an estimation based on anthropometric measurements.
 */
export function calculateVisceralFat(inputs: VisceralFatInputs): VisceralFatResult {
    const { age, gender, height, weight, waist } = inputs;

    // 1. BMI Calculation
    const bmi = weight / ((height / 100) ** 2);

    // 2. WHtR Calculation
    const whtr = waist / height;

    // 3. VFL Estimation (Simplified Regression)
    // Based on research suggesting VFL correlates highly with Age, BMI, and Waist
    let baseVFL = 0;
    if (gender === "male") {
        baseVFL = (0.15 * age) + (0.4 * bmi) + (0.25 * waist) - 35;
    } else {
        baseVFL = (0.12 * age) + (0.35 * bmi) + (0.22 * waist) - 32;
    }

    // Clamp VFL to 1-20 scale
    const vfl = Math.max(1, Math.min(20, Math.round(baseVFL)));

    // 4. Metabolic Risk Score (0-100)
    let riskScore = 0;
    riskScore += vfl * 4; // Max 80
    if (whtr > 0.5) riskScore += 10;
    if (bmi > 25) riskScore += 10;
    const metabolicRiskScore = Math.min(100, riskScore);

    // 5. Risk Category
    let riskCategory: VisceralFatResult["riskCategory"] = "Low";
    if (vfl <= 9) riskCategory = "Low";
    else if (vfl <= 12) riskCategory = "Moderate";
    else if (vfl <= 15) riskCategory = "High";
    else riskCategory = "Very High";

    // 6. Ideal Waist (WHO targets WHtR < 0.5)
    const idealWaist = Math.round(height * 0.45);

    return {
        vfl,
        riskCategory,
        whtr: parseFloat(whtr.toFixed(2)),
        bmi: parseFloat(bmi.toFixed(1)),
        idealWaist,
        metabolicRiskScore
    };
}
