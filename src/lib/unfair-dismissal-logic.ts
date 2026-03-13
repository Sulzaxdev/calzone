
export interface UnfairDismissalResult {
    basicAward: number;
    yearsCounted: number;
    weeklyPayCapped: number;
    ageMultiplierTotal: number;
    success: boolean;
    errorMsg?: string;
}

export function calculateUnfairDismissal(
    ageAtDismissal: number,
    yearsOfService: number,
    grossWeeklyPay: number
): UnfairDismissalResult {
    // Basic eligibility check
    if (yearsOfService < 2) {
        return {
            basicAward: 0, yearsCounted: 0, weeklyPayCapped: 0, ageMultiplierTotal: 0,
            success: false,
            errorMsg: "You usually need at least 2 years of continuous service to claim unfair dismissal."
        };
    }

    // Statutory caps (2024/2025 rates)
    const MAX_YEARS_COUNTED = 20;
    const STATUTORY_WEEKLY_PAY_CAP = 700; // As of April 2024
    
    // Apply caps
    const yearsToCalculate = Math.min(yearsOfService, MAX_YEARS_COUNTED);
    const applicableWeeklyPay = Math.min(grossWeeklyPay, STATUTORY_WEEKLY_PAY_CAP);

    let basicAward = 0;
    let ageMultiplierTotal = 0;
    
    // The calculation works BACKWARDS from the date of dismissal
    let currentAge = ageAtDismissal;

    for (let i = 0; i < yearsToCalculate; i++) {
        let multiplier = 0;

        if (currentAge >= 41) {
            multiplier = 1.5;
        } else if (currentAge >= 22) {
            multiplier = 1.0;
        } else {
            // Age 21 and under
            multiplier = 0.5;
        }

        basicAward += applicableWeeklyPay * multiplier;
        ageMultiplierTotal += multiplier;
        currentAge--; // Step backward 1 year
    }

    return {
        basicAward,
        yearsCounted: yearsToCalculate,
        weeklyPayCapped: applicableWeeklyPay,
        ageMultiplierTotal,
        success: true
    };
}
