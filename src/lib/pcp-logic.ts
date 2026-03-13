
export interface PCPResult {
    monthlyPayment: number;
    totalAmountPayable: number;
    totalInterest: number;
    amountFinanced: number;
    totalDeposit: number;
    success: boolean;
}

export function calculatePCP(
    carPrice: number,
    customerDeposit: number,
    dealerContribution: number,
    termMonths: number,
    gmfv: number, // Guaranteed Minimum Future Value (Balloon)
    apr: number // Annual Percentage Rate (e.g., 7.9)
): PCPResult {
    const totalDeposit = customerDeposit + dealerContribution;
    const amountFinanced = carPrice - totalDeposit;

    if (amountFinanced <= 0 || termMonths <= 0) {
         return {
            monthlyPayment: 0,
            totalAmountPayable: 0,
            totalInterest: 0,
            amountFinanced: 0,
            totalDeposit,
            success: false
         };
    }

    if (apr === 0) {
        // 0% APR scenario
        const amountToRepay = amountFinanced - gmfv;
        const monthlyPayment = amountToRepay / termMonths;
        return {
            monthlyPayment,
            totalAmountPayable: carPrice,
            totalInterest: 0,
            amountFinanced,
            totalDeposit,
            success: true
        }
    }

    // Convert APR to a monthly interest rate
    // UK car finance usually uses the formula: (1 + APR/100)^(1/12) - 1
    const r = Math.pow(1 + (apr / 100), 1 / 12) - 1;
    const n = termMonths;
    const P = amountFinanced;
    const F = gmfv;

    // Standard formula for a loan with a balloon payment:
    // M = [ P * (1 + r)^n - F ] * r / [ (1 + r)^n - 1 ]
    
    // To handle potential precision issues and make it clearer:
    const rn = Math.pow(1 + r, n);
    const monthlyPayment = (P * rn - F) * r / (rn - 1);

    const totalPaidOverTerm = (monthlyPayment * n);
    const totalAmountPayable = totalPaidOverTerm + totalDeposit + gmfv;
    const totalInterest = totalAmountPayable - carPrice;

    return {
        monthlyPayment,
        totalAmountPayable,
        totalInterest,
        amountFinanced,
        totalDeposit,
        success: true
    };
}
