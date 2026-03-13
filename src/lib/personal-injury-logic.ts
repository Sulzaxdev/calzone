
export type InjuryType = 
    | 'whiplash_minor' 
    | 'whiplash_moderate' 
    | 'broken_arm' 
    | 'broken_leg' 
    | 'minor_hand'
    | 'broken_nose';

export interface InjuryBracket {
    label: string;
    low: number;
    high: number;
}

export const INJURY_BRACKETS: Record<InjuryType, InjuryBracket> = {
    'whiplash_minor': { label: 'Whiplash (under 3 months recovery)', low: 240, high: 240 }, // Fixed tariff
    'whiplash_moderate': { label: 'Whiplash (1 to 2 years recovery)', low: 1320, high: 3005 }, // JCG approx
    'broken_arm': { label: 'Simple fracture of forearm', low: 6605, high: 19200 },
    'broken_leg': { label: 'Simple fracture of tibia/fibula', low: 9000, high: 27000 },
    'minor_hand': { label: 'Minor hand/finger injury', low: 900, high: 4300 },
    'broken_nose': { label: 'Broken nose (simple, no surgery)', low: 1600, high: 2400 },
};

export interface InjuryResult {
    generalDamagesLow: number;
    generalDamagesHigh: number;
    specialDamages: number;
    totalLow: number;
    totalHigh: number;
}

export function calculatePersonalInjury(
    injuryType: InjuryType,
    lossOfEarnings: number,
    medicalExpenses: number,
    otherExpenses: number
): InjuryResult {
    const bracket = INJURY_BRACKETS[injuryType];
    const specialDamages = lossOfEarnings + medicalExpenses + otherExpenses;

    const totalLow = bracket.low + specialDamages;
    const totalHigh = bracket.high + specialDamages;

    return {
        generalDamagesLow: bracket.low,
        generalDamagesHigh: bracket.high,
        specialDamages,
        totalLow,
        totalHigh
    };
}
