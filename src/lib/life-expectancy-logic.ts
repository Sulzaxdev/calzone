export type LifeExpectancyInputs = {
    gender: "male" | "female";
    currentAge: number;
    smoking: "never" | "former" | "current_light" | "current_heavy";
    alcohol: "never" | "occasional" | "moderate" | "heavy";
    exerciseHoursPerWeek: number;
    dietQuality: "poor" | "average" | "excellent";
    sleepHours: number;
    stressLevel: "low" | "moderate" | "high";
};

export type LifeExpectancyResult = {
    baseExpectancy: number;
    finalExpectancy: number;
    yearsGainedOrLost: number;
    biologicalAge: number;
    insights: string[];
};

export function calculateLifeExpectancy(inputs: LifeExpectancyInputs): LifeExpectancyResult {
    // UK Baseline (approx)
    const baseExpectancy = inputs.gender === "female" ? 83.6 : 79.9;

    let modifier = 0;
    const insights: string[] = [];

    // 1. Smoking (Massive impact)
    switch (inputs.smoking) {
        case "never":
            modifier += 2;
            insights.push("Never smoking is the single best decision for your longevity.");
            break;
        case "former":
            modifier -= 2;
            insights.push("Quitting smoking has recovered years of your life, though some past impact remains.");
            break;
        case "current_light":
            modifier -= 5;
            insights.push("Light smoking still significantly increases cardiovascular and cancer risk. Consider quitting.");
            break;
        case "current_heavy":
            modifier -= 10;
            insights.push("Heavy smoking severely caps life expectancy. Seeking clinical help to quit is highly recommended.");
            break;
    }

    // 2. Alcohol
    switch (inputs.alcohol) {
        case "never":
        case "occasional":
            modifier += 1;
            break;
        case "moderate":
            modifier -= 1;
            insights.push("Moderate alcohol consumption has a slight negative impact on long-term organ health.");
            break;
        case "heavy":
            modifier -= 4;
            insights.push("Heavy alcohol consumption greatly increases the risk of liver disease and metabolic strain.");
            break;
    }

    // 3. Exercise
    if (inputs.exerciseHoursPerWeek >= 5) {
        modifier += 3;
        insights.push("Excellent exercise routine! You are actively reducing all-cause mortality.");
    } else if (inputs.exerciseHoursPerWeek >= 2.5) {
        modifier += 1.5;
        insights.push("Good physical activity level, meeting the minimum medical recommendations.");
    } else if (inputs.exerciseHoursPerWeek > 0) {
        modifier -= 1;
        insights.push("Some exercise is better than none, but aiming for 150 minutes a week will boost your lifespan.");
    } else {
        modifier -= 3;
        insights.push("A sedentary lifestyle is a major risk factor for early decline. Start with 30-minute daily walks.");
    }

    // 4. Diet
    switch (inputs.dietQuality) {
        case "poor":
            modifier -= 3;
            insights.push("A diet high in processed foods accelerates cellular aging and metabolic syndrome.");
            break;
        case "average":
            break; // Neutral
        case "excellent":
            modifier += 2;
            insights.push("A nutrient-dense diet acts as anti-aging fuel for your cells.");
            break;
    }

    // 5. Sleep
    if (inputs.sleepHours >= 7 && inputs.sleepHours <= 9) {
        modifier += 2;
        insights.push("Optimal sleep protects your brain from cognitive decline.");
    } else if (inputs.sleepHours < 5) {
        modifier -= 2.5;
        insights.push("Chronic severe sleep deprivation massively spikes heart attack risk.");
    } else {
        modifier -= 1;
        insights.push("Improving sleep to 7-8 hours a night allows your brain to flush out neurotoxins.");
    }

    // 6. Stress
    switch (inputs.stressLevel) {
        case "low":
            modifier += 1;
            break;
        case "moderate":
            modifier -= 0.5;
            break;
        case "high":
            modifier -= 2;
            insights.push("High chronic stress releases cortisol, which damages heart tissue and causes premature aging.");
            break;
    }

    // Calculate final metrics
    let finalExpectancy = baseExpectancy + modifier;

    // Ensure we don't return an expectancy lower than current age if they are already super old
    if (finalExpectancy <= inputs.currentAge) {
        finalExpectancy = inputs.currentAge + 2; // Baseline buffer
    }

    const yearsGainedOrLost = finalExpectancy - baseExpectancy;

    // Biological age concept: Current age minus years gained/lost
    let biologicalAge = inputs.currentAge - yearsGainedOrLost;
    if (biologicalAge < 18) biologicalAge = 18; // Cap at bottom

    return {
        baseExpectancy: Number(baseExpectancy.toFixed(1)),
        finalExpectancy: Number(finalExpectancy.toFixed(1)),
        yearsGainedOrLost: Number(yearsGainedOrLost.toFixed(1)),
        biologicalAge: Number(biologicalAge.toFixed(1)),
        insights,
    };
}
