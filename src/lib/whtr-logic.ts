export type WhtrInputs = {
    waist: number;
    waistUnit: "cm" | "in";
    height: number;
    heightUnit: "cm" | "in";
};

export type WhtrResult = {
    ratio: number;
    riskLevel: "Underweight risk" | "Healthy" | "Increased Risk" | "High Risk";
    idealWaistCm: number;
    idealWaistIn: number;
    differenceCm: number;
    differenceIn: number;
};

export function calculateWhtr(inputs: WhtrInputs): WhtrResult {
    // Convert everything to cm for calculation
    const waistCm = inputs.waistUnit === "in" ? inputs.waist * 2.54 : inputs.waist;
    const heightCm = inputs.heightUnit === "in" ? inputs.height * 2.54 : inputs.height;

    // Calculate ratio
    const ratio = waistCm / heightCm;

    // Determine Risk Level
    let riskLevel: WhtrResult["riskLevel"] = "Healthy";
    if (ratio >= 0.60) {
        riskLevel = "High Risk";
    } else if (ratio >= 0.50) {
        riskLevel = "Increased Risk";
    } else if (ratio >= 0.40) {
        riskLevel = "Healthy";
    } else {
        riskLevel = "Underweight risk";
    }

    // Ideal Waist (Half of height)
    const idealWaistCm = heightCm * 0.5;
    const idealWaistIn = idealWaistCm / 2.54;

    // Difference (how much to lose/gain)
    const differenceCm = waistCm - idealWaistCm;
    const differenceIn = differenceCm / 2.54;

    return {
        ratio: Number(ratio.toFixed(2)),
        riskLevel,
        idealWaistCm: Number(idealWaistCm.toFixed(1)),
        idealWaistIn: Number(idealWaistIn.toFixed(1)),
        differenceCm: Number(differenceCm.toFixed(1)),
        differenceIn: Number(differenceIn.toFixed(1)),
    };
}
