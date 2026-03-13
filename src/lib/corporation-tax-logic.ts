
export interface CorpTaxResult {
    taxableProfit: number;
    mainRateTax: number; // The tax if full 25% was applied
    marginalRelief: number; // How much relief got deducted
    finalTaxDue: number; // What they actually pay
    effectiveRate: number; // e.g., 22.5%
    taxBand: 'Small Profits (19%)' | 'Marginal Relief (19% - 25%)' | 'Main Rate (25%)';
    success: boolean;
}

export function calculateCorporationTax(
    grossProfit: number,
    allowableExpenses: number
): CorpTaxResult {
    const taxableProfit = Math.max(0, grossProfit - allowableExpenses);

    if (taxableProfit === 0) {
        return {
            taxableProfit: 0, mainRateTax: 0, marginalRelief: 0,
            finalTaxDue: 0, effectiveRate: 0,
            taxBand: 'Small Profits (19%)', success: false
        };
    }

    const lowerLimit = 50000;
    const upperLimit = 250000;

    let finalTaxDue = 0;
    const mainRateTax = taxableProfit * 0.25; // Standard 25% starting point for calculations
    let marginalRelief = 0;
    let taxBand: CorpTaxResult['taxBand'] = 'Small Profits (19%)';

    if (taxableProfit <= lowerLimit) {
        // Small profits rate: exactly 19%
        finalTaxDue = taxableProfit * 0.19;
        taxBand = 'Small Profits (19%)';
    } else if (taxableProfit > upperLimit) {
        // Main rate: exactly 25% on EVERYTHING
        finalTaxDue = taxableProfit * 0.25;
        taxBand = 'Main Rate (25%)';
    } else {
        // Marginal Relief applies (profits between £50,001 and £250,000)
        taxBand = 'Marginal Relief (19% - 25%)';
        
        // The HMRC formula:
        // 1. Calculate Corporation Tax at the main rate of 25%
        // 2. Subtract Marginal Relief
        // Relief Formula: (Upper Limit - Profits) * Marginal Relief Fraction (3/200 or 0.015)
        
        const fraction = 3 / 200;
        marginalRelief = (upperLimit - taxableProfit) * fraction;
        finalTaxDue = mainRateTax - marginalRelief;
    }

    return {
        taxableProfit,
        mainRateTax,
        marginalRelief,
        finalTaxDue,
        effectiveRate: (finalTaxDue / taxableProfit) * 100,
        taxBand,
        success: true
    };
}
