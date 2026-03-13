
export interface PensionDrawdownResult {
    taxFreeCash: number;
    remainingPot: number;
    yearsLasted: number;
    totalWithdrawn: number;
    success: boolean;
}

export function calculatePensionDrawdown(
    potSize: number,
    takeTaxFreeCash: boolean,
    annualWithdrawal: number,
    annualGrowthRate: number = 4.0,
    inflationRate: number = 2.0
): PensionDrawdownResult {
    if (potSize <= 0 || annualWithdrawal <= 0) {
        return { taxFreeCash: 0, remainingPot: 0, yearsLasted: 0, totalWithdrawn: 0, success: false };
    }

    // Tax-Free Cash calculation (Under UK rules, typically 25% max, capped at £268,275)
    let taxFreeCash = 0;
    if (takeTaxFreeCash) {
        taxFreeCash = Math.min(potSize * 0.25, 268275);
    }

    let currentPot = potSize - taxFreeCash;
    const initialRemainingPot = currentPot;
    
    let years = 0;
    let totalWithdrawnFromDrawdown = 0;
    const maxYears = 100; // Cap to prevent infinite loops

    let currentAnnualWithdrawal = annualWithdrawal;

    while (currentPot > 0 && years < maxYears) {
        // Assume withdrawal happens at start of year
        if (currentPot >= currentAnnualWithdrawal) {
            currentPot -= currentAnnualWithdrawal;
            totalWithdrawnFromDrawdown += currentAnnualWithdrawal;
        } else {
            // Withdraw whatever is left
            totalWithdrawnFromDrawdown += currentPot;
            currentPot = 0;
            break; // Pot is empty
        }

        // Apply growth to remaining pot
        currentPot = currentPot * (1 + (annualGrowthRate / 100));

        // Adjust next year's withdrawal for inflation
        currentAnnualWithdrawal = currentAnnualWithdrawal * (1 + (inflationRate / 100));

        years++;
    }

    return {
        taxFreeCash: taxFreeCash,
        remainingPot: initialRemainingPot,
        yearsLasted: years,
        totalWithdrawn: taxFreeCash + totalWithdrawnFromDrawdown,
        success: true
    };
}
