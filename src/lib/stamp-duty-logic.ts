
export type BuyerType = 'first-time' | 'next-home' | 'additional-property';

export interface SDLTResult {
    totalTax: number;
    effectiveRate: number;
    bands: {
        range: string;
        taxInBand: number;
        rateStr: string;
    }[];
    surchargeApplied: number; // e.g., 2% non-resident
    success: boolean;
}

export function calculateSDLT(
    propertyValue: number,
    buyerType: BuyerType,
    isNonResident: boolean = false
): SDLTResult {
    if (propertyValue <= 0) {
        return { totalTax: 0, effectiveRate: 0, bands: [], surchargeApplied: 0, success: false };
    }

    let totalTax = 0;
    const bands: { range: string; taxInBand: number; rateStr: string; }[] = [];
    const surcharge = isNonResident ? 0.02 : 0; // 2% surcharge for non-UK residents

    // First-Time Buyer Logic (Special thresholds up to £625k)
    // First-time buyer relief is only valid for properties up to £625k
    if (buyerType === 'first-time' && propertyValue <= 625000) {
        // Band 1: £0 - £425k (0%)
        const band1Limit = 425000;
        const band1Tax = Math.max(0, Math.min(propertyValue, band1Limit)) * surcharge;
        bands.push({ range: 'Up to £425,000', taxInBand: band1Tax, rateStr: `${surcharge * 100}%` });
        totalTax += band1Tax;

        // Band 2: £425,001 - £625k (5%)
        if (propertyValue > band1Limit) {
            const band2Amount = propertyValue - band1Limit;
            const rate = 0.05 + surcharge;
            const band2Tax = band2Amount * rate;
            bands.push({ range: '£425,001 - £625,000', taxInBand: band2Tax, rateStr: `${(rate * 100).toFixed(0)}%` });
            totalTax += band2Tax;
        }

        return {
            totalTax,
            effectiveRate: (totalTax / propertyValue) * 100,
            bands,
            surchargeApplied: surcharge * 100,
            success: true
        };
    }

    // Standard Rates (Next Home or First-Time over £625k)
    // Or Additional Property (includes a 3% surcharge on all bands)
    const additionalSurcharge = buyerType === 'additional-property' ? 0.03 : 0;

    // Standard Bands 2024-2025 onwards
    // 0 - 250,000 (0%)
    // 250,001 - 925,000 (5%)
    // 925,001 - 1,500,000 (10%)
    // 1,500,001+ (12%)

    const calcBand = (start: number, end: number, baseRate: number, label: string) => {
        if (propertyValue > start) {
            const amountInBand = Math.min(propertyValue, end || Infinity) - start;
            const rate = baseRate + additionalSurcharge + surcharge;
            const tax = amountInBand * rate;
            bands.push({ range: label, taxInBand: tax, rateStr: `${(rate * 100).toFixed(0)}%` });
            totalTax += tax;
        } else {
            bands.push({ range: label, taxInBand: 0, rateStr: `${((baseRate + additionalSurcharge + surcharge) * 100).toFixed(0)}%` });
        }
    };

    calcBand(0, 250000, 0, 'Up to £250,000');
    calcBand(250000, 925000, 0.05, '£250,001 - £925,000');
    calcBand(925000, 1500000, 0.10, '£925,001 - £1.5m');
    calcBand(1500000, Infinity, 0.12, 'Over £1.5m');

    return {
        totalTax,
        effectiveRate: (totalTax / propertyValue) * 100,
        bands: bands.filter(b => propertyValue > parseInt(b.range.replace(/[^0-9\.]/g, '') || '0') || b.range.startsWith('Up to')), // Clean up empty top bands
        surchargeApplied: (surcharge + additionalSurcharge) * 100,
        success: true
    };
}
