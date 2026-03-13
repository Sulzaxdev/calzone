
export type HairLossZone = 'front' | 'mid' | 'crown';
export type Technique = 'fue' | 'fut';

export interface HairTransplantResult {
    estimatedGraftsMin: number;
    estimatedGraftsMax: number;
    estimatedCostUKMin: number;
    estimatedCostUKMax: number;
    estimatedCostTurkeyMin: number;
    estimatedCostTurkeyMax: number;
    hoursRequired: number;
    success: boolean;
}

export function calculateHairTransplant(
    zones: HairLossZone[],
    technique: Technique
): HairTransplantResult {
    if (zones.length === 0) {
        return {
            estimatedGraftsMin: 0, estimatedGraftsMax: 0,
            estimatedCostUKMin: 0, estimatedCostUKMax: 0,
            estimatedCostTurkeyMin: 0, estimatedCostTurkeyMax: 0,
            hoursRequired: 0, success: false
        };
    }

    let minGrafts = 0;
    let maxGrafts = 0;

    // Rough graft estimates per zone based on Norwood/Hamilton scales
    if (zones.includes('front')) {
        minGrafts += 1000;
        maxGrafts += 2000;
    }
    if (zones.includes('mid')) {
        minGrafts += 800;
        maxGrafts += 1500;
    }
    if (zones.includes('crown')) {
        minGrafts += 1200;
        maxGrafts += 2500;
    } // Max possible for all 3 is roughly 3000-6000

    // Average Price per Graft Models
    // UK FUE: £2.50 - £4.00
    // UK FUT: £2.00 - £3.50
    // Turkey (Packages usually flat rate, but per graft roughly £0.80 - £1.50)

    const ukMinRate = technique === 'fue' ? 2.50 : 2.00;
    const ukMaxRate = technique === 'fue' ? 4.00 : 3.50;

    const turkeyMinRate = 0.80; // Typically packages start around £1500 regardless of grafts, but per graft estimate
    const turkeyMaxRate = 1.50;

    const ukCostMin = minGrafts * ukMinRate;
    const ukCostMax = maxGrafts * ukMaxRate;
    const turkeyCostMin = Math.max(1500, minGrafts * turkeyMinRate); // Base minimum package £1500
    const turkeyCostMax = Math.max(1800, maxGrafts * turkeyMaxRate);

    // Hard cap FUE grafts in a single day session to ~4000 for safety
    if (technique === 'fue' && maxGrafts > 4500) {
        // Needs 2 sessions
    }

    return {
        estimatedGraftsMin: minGrafts,
        estimatedGraftsMax: maxGrafts,
        estimatedCostUKMin: ukCostMin,
        estimatedCostUKMax: ukCostMax,
        estimatedCostTurkeyMin: turkeyCostMin,
        estimatedCostTurkeyMax: turkeyCostMax,
        hoursRequired: Math.ceil(maxGrafts / 500), // Roughly 500 grafts per hour depending on team
        success: true
    };
}
