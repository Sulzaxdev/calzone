
/**
 * Dental Implant Cost Logic for UK Market
 */

export interface DentalImplantResult {
    lowEstimate: number;
    highEstimate: number;
    additionalCosts: {
        boneGraft?: number;
        sinusLift?: number;
        extractions?: number;
    };
    success: boolean;
}

export function calculateDentalImplantCost(
    numImplants: number,
    materialType: 'standard' | 'premium' | 'zirconia',
    needsBoneGraft: boolean,
    needsSinusLift: boolean,
    numExtractions: number
): DentalImplantResult {
    // UK Average Prices 2024-2026
    const rates = {
        standard: { low: 1500, high: 2500 },
        premium: { low: 2500, high: 3500 },
        zirconia: { low: 3000, high: 4500 }
    };

    const baseLow = rates[materialType].low * numImplants;
    const baseHigh = rates[materialType].high * numImplants;

    let extraLow = 0;
    let extraHigh = 0;
    const additionalCosts: { boneGraft?: number; sinusLift?: number; extractions?: number; } = {};

    if (needsBoneGraft) {
        additionalCosts.boneGraft = 500;
        extraLow += 400;
        extraHigh += 800;
    }

    if (needsSinusLift) {
        additionalCosts.sinusLift = 800;
        extraLow += 600;
        extraHigh += 1500;
    }

    if (numExtractions > 0) {
        additionalCosts.extractions = numExtractions * 150;
        extraLow += numExtractions * 100;
        extraHigh += numExtractions * 300;
    }

    return {
        lowEstimate: baseLow + extraLow,
        highEstimate: baseHigh + extraHigh,
        additionalCosts,
        success: true
    };
}
