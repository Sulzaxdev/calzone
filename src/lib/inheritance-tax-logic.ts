
export interface IHTResult {
    taxableEstate: number;
    totalTaxable: number;
    taxDue: number;
    effectiveRate: number;
    allowancesUsed: {
        nilRateBand: number;
        residenceNilRateBand: number;
        totalAllowance: number;
    };
    success: boolean;
}

export function calculateIHT(
    totalEstateValue: number,
    propertyValue: number,
    isMarried: boolean,
    passingToDescendants: boolean
): IHTResult {
    if (totalEstateValue <= 0) {
        return {
            taxableEstate: 0,
            totalTaxable: 0,
            taxDue: 0,
            effectiveRate: 0,
            allowancesUsed: { nilRateBand: 0, residenceNilRateBand: 0, totalAllowance: 0 },
            success: false
        };
    }

    // Allowances
    let nilRateBand = 325000;
    let residenceNilRateBand = 0;

    // Spouses can inherit their deceased partner's unused allowances (effectively doubling them)
    if (isMarried) {
        nilRateBand *= 2;
    }

    // Residence Nil Rate Band (RNRB) applies if passing a main residence to direct descendants (children, grandchildren)
    if (passingToDescendants && propertyValue > 0) {
        const potentialRnrb = isMarried ? 350000 : 175000;
        // RNRB is capped at the property value itself
        residenceNilRateBand = Math.min(propertyValue, potentialRnrb);

        // Tapering rules: RNRB reduces by £1 for every £2 the estate is worth over £2 million
        if (totalEstateValue > 2000000) {
            const excess = totalEstateValue - 2000000;
            const reduction = excess / 2;
            residenceNilRateBand = Math.max(0, residenceNilRateBand - reduction);
        }
    }

    const totalAllowance = nilRateBand + residenceNilRateBand;

    // Calculate Tax
    const taxableEstate = Math.max(0, totalEstateValue - totalAllowance);
    const taxDue = taxableEstate * 0.40; // Standard IHT rate is 40%

    return {
        taxableEstate: totalEstateValue,
        totalTaxable: taxableEstate,
        taxDue,
        effectiveRate: (taxDue / totalEstateValue) * 100,
        allowancesUsed: {
            nilRateBand,
            residenceNilRateBand,
            totalAllowance
        },
        success: true
    };
}
