export interface FrailtyInputs {
    fatigue: boolean;    // "Are you fatigued most of the time?"
    resistance: boolean; // "Do you have difficulty climbing a flight of stairs?"
    ambulation: boolean; // "Do you have difficulty walking one block?"
    illnesses: number;   // Number of chronic illnesses from a predefined list (e.g., >5 = true)
    weightLoss: boolean; // "Have you lost more than 5% of your body weight in the last year unintentionally?"
}

export interface FrailtyResult {
    score: number;
    category: "Robust" | "Pre-frail" | "Frail";
    description: string;
    clinicalInsights: string[];
}

export function calculateFrailtyScore(inputs: FrailtyInputs): FrailtyResult {
    let score = 0;

    if (inputs.fatigue) score += 1;
    if (inputs.resistance) score += 1;
    if (inputs.ambulation) score += 1;
    if (inputs.illnesses >= 5) score += 1;
    if (inputs.weightLoss) score += 1;

    let category: "Robust" | "Pre-frail" | "Frail";
    let description = "";
    let clinicalInsights: string[] = [];

    if (score === 0) {
        category = "Robust";
        description = "You show no signs of clinical frailty. Your physical resilience and mobility are excellent.";
        clinicalInsights = [
            "Maintain your current lifestyle with a balance of aerobic and resistance training.",
            "Continue eating a protein-rich diet to preserve muscle mass.",
            "Stay socially and mentally active to support holistic well-being."
        ];
    } else if (score >= 1 && score <= 2) {
        category = "Pre-frail";
        description = "You are exhibiting early signs of physical decline, putting you at higher risk of progressing to frailty.";
        clinicalInsights = [
            "This stage is highly reversible with targeted interventions.",
            "Focus heavily on resistance training (weight lifting) to combat sarcopenia (muscle loss).",
            "Increase daily protein intake to at least 1.2g per kg of body weight.",
            "Have a doctor review your medications, as polypharmacy can cause fatigue and weakness."
        ];
    } else {
        category = "Frail";
        description = "You meet the clinical criteria for frailty. This indicates a significant decline in physical reserve and increased vulnerability to health stressors.";
        clinicalInsights = [
            "Fall prevention is currently your top physical priority. Clear tripping hazards at home.",
            "Work with a physical therapist to safely rebuild strength and balance.",
            "Consult a physician or geriatric specialist to create a comprehensive care plan.",
            "Ensure you are eating nutrient-dense foods; malnutrition accelerates frailty."
        ];
    }

    return {
        score,
        category,
        description,
        clinicalInsights
    };
}
