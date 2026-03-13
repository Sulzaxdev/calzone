
/**
 * Equity Release Logic for UK Market
 * Based on Age, Property Value, and Health Factors (Estimates only)
 */

export interface EquityReleaseResult {
    maxEstimate: number;
    interestRateEstimate: number;
    availableCash: number;
    success: boolean;
}

export function calculateEquityRelease(
    age: number,
    propertyValue: number,
    outstandingMortgage: number = 0
): EquityReleaseResult {
    // Basic LTV (Loan to Value) estimates based on age in UK (typically 20% to 50%)
    // Age 55: ~20% LTV
    // Age 85: ~55% LTV
    
    if (age < 55) {
        return { maxEstimate: 0, interestRateEstimate: 0, availableCash: 0, success: false };
    }

    // Rough LTV calculation: starting at 20% for 55, +1% for every year older approx.
    let ltvPercentage = 20 + (age - 55);
    if (ltvPercentage > 58) ltvPercentage = 58; // Cap at 58% for UK market standard

    const totalEquityAvailable = (propertyValue * (ltvPercentage / 100));
    const availableCash = totalEquityAvailable - outstandingMortgage;

    // Typical interest rates for Equity Release in UK (Fixed) approx 6-8%
    const interestRateEstimate = 6.8; 

    return {
        maxEstimate: totalEquityAvailable,
        interestRateEstimate,
        availableCash: Math.max(0, availableCash),
        success: true
    };
}
