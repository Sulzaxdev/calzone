
export type UKNation = 'england' | 'scotland' | 'wales' | 'northern_ireland';

export interface CareHomeResult {
    selfFunded: boolean;
    localAuthorityContribution: boolean;
    tariffIncome: number; // £1 per £250 between limits
    upperCapitalLimit: number;
    lowerCapitalLimit: number;
    eligibilityMessage: string;
}

export function calculateCareHomeFees(
    nation: UKNation,
    propertyValue: number,
    savingsValue: number,
    includeProperty: boolean // Property is often excluded if a spouse still lives there
): CareHomeResult {
    
    // Capital limits for 2024/25
    let upperCapitalLimit = 0;
    let lowerCapitalLimit = 0;

    switch (nation) {
        case 'england':
        case 'northern_ireland':
            upperCapitalLimit = 23250;
            lowerCapitalLimit = 14250;
            break;
        case 'wales':
            // Wales has a single capital limit for residential care (£50,000 for 2024)
            upperCapitalLimit = 50000;
            lowerCapitalLimit = 50000;
            break;
        case 'scotland':
            upperCapitalLimit = 32950; // 2024 limit
            lowerCapitalLimit = 20250; // 2024 limit
            break;
    }

    const assessableAssets = savingsValue + (includeProperty ? propertyValue : 0);

    let selfFunded = true;
    let localAuthorityContribution = false;
    let tariffIncome = 0;
    let eligibilityMessage = "";

    if (assessableAssets > upperCapitalLimit) {
        // Above upper limit: fully self-funded
        selfFunded = true;
        localAuthorityContribution = false;
        eligibilityMessage = "Your assessable capital is above the Upper Capital Limit. You will need to self-fund your care completely until your assets deplete below this limit.";
    } else if (assessableAssets > lowerCapitalLimit && assessableAssets <= upperCapitalLimit) {
        // Between limits: local authority helps, but user pays tariff income from savings
        selfFunded = false;
        localAuthorityContribution = true;
        
        // Tariff income calculation: £1 per week for every £250 (or part thereof) above lower limit
        const excess = assessableAssets - lowerCapitalLimit;
        tariffIncome = Math.ceil(excess / 250); 
        
        eligibilityMessage = "Your assets fall between the limits. The Local Authority will contribute to your care costs, but you must make a contribution from your capital known as 'Tariff Income', plus any contribution from your regular income.";
    } else {
        // Below lower limit: fully state funded (user still contributes from income/pension but capital is safe)
        selfFunded = false;
        localAuthorityContribution = true;
        tariffIncome = 0;
        eligibilityMessage = "Your assessable capital is below the Lower Capital Limit. The Local Authority will fully fund your care costs from a capital perspective, though ALL your regular income/pensions (minus a small Personal Expenses Allowance) will go towards the fees.";
    }

    // In Wales, there's a hard £50k limit, no sliding scale / tariff income
    if (nation === 'wales' && assessableAssets <= upperCapitalLimit) {
        eligibilityMessage = "Your assets are below the £50,000 limit. The Local Authority will fund your care, though your regular income/pensions will be assessed to contribute.";
        tariffIncome = 0;
    }

    return {
        selfFunded,
        localAuthorityContribution,
        tariffIncome,
        upperCapitalLimit,
        lowerCapitalLimit,
        eligibilityMessage
    };
}
