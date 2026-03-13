
export type CGTAssetType = 'residential' | 'other';
export type CGTTaxBand = 'basic' | 'higher';

export interface CGTResult {
    totalGain: number;
    taxableGain: number;
    taxRateApplied: string;
    finalTaxDue: number;
    allowanceUsed: number;
    success: boolean;
}

export function calculateCGT(
    purchasePrice: number,
    salePrice: number,
    costs: number, // Legal fees, estate agent fees, improvements
    assetType: CGTAssetType,
    taxBand: CGTTaxBand
): CGTResult {
    const ANNUAL_EXEMPT_AMOUNT = 3000; // 2024/2025 tax year allowance

    const totalGain = salePrice - purchasePrice - costs;

    if (totalGain <= 0) {
        return {
            totalGain, taxableGain: 0, taxRateApplied: '0%',
            finalTaxDue: 0, allowanceUsed: 0, success: true
        };
    }

    const taxableGain = Math.max(0, totalGain - ANNUAL_EXEMPT_AMOUNT);
    const allowanceUsed = Math.min(totalGain, ANNUAL_EXEMPT_AMOUNT);

    let taxRate = 0;
    let rateDescription = "";

    if (assetType === 'residential') {
        // Residential property rates (not main home)
        if (taxBand === 'basic') {
            taxRate = 0.18; // 18% basic rate for property
            rateDescription = "18% (Basic Rate Property)";
        } else {
            taxRate = 0.24; // 24% higher rate for property (reduced from 28% in April 2024)
            rateDescription = "24% (Higher Rate Property)";
        }
    } else {
        // Other assets (Shares, crypto, business assets usually)
        if (taxBand === 'basic') {
            taxRate = 0.10; // 10% basic rate
            rateDescription = "10% (Basic Rate Shares/Other)";
        } else {
            taxRate = 0.20; // 20% higher rate
            rateDescription = "20% (Higher Rate Shares/Other)";
        }
    }

    const finalTaxDue = taxableGain * taxRate;

    return {
        totalGain,
        taxableGain,
        taxRateApplied: rateDescription,
        finalTaxDue,
        allowanceUsed,
        success: true
    };
}
