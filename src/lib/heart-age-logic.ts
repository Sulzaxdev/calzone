export type HeartAgeInputs = {
    age: number;
    gender: "male" | "female";
    systolicBP: number;
    treatedBP?: boolean;
    totalCholesterol: number; // mg/dL
    hdl: number; // mg/dL
    smoker: boolean;
    diabetes: boolean;
};

export type HeartAgeResult = {
    riskPercentage: number;
    heartAge: number;
    riskCategory: "Low Risk" | "Borderline" | "Intermediate" | "High Risk";
};

// Simplified Framingham Risk Score (FRS) point-based model estimation
export function calculateHeartAge(inputs: HeartAgeInputs): HeartAgeResult {
    const { age, gender, systolicBP, totalCholesterol, hdl, smoker, diabetes, treatedBP = false } = inputs;

    let points = 0;

    if (gender === "male") {
        // Men Age points
        if (age <= 34) points -= 9;
        else if (age <= 39) points -= 4;
        else if (age <= 44) points += 0;
        else if (age <= 49) points += 3;
        else if (age <= 54) points += 6;
        else if (age <= 59) points += 8;
        else if (age <= 64) points += 10;
        else if (age <= 69) points += 11;
        else if (age <= 74) points += 12;
        else points += 13;

        // Men Total Cholesterol (mg/dL)
        if (age <= 39) {
            if (totalCholesterol >= 160 && totalCholesterol <= 199) points += 4;
            else if (totalCholesterol >= 200 && totalCholesterol <= 239) points += 7;
            else if (totalCholesterol >= 240 && totalCholesterol <= 279) points += 9;
            else if (totalCholesterol >= 280) points += 11;
        } else if (age <= 49) {
            if (totalCholesterol >= 160 && totalCholesterol <= 199) points += 3;
            else if (totalCholesterol >= 200 && totalCholesterol <= 239) points += 5;
            else if (totalCholesterol >= 240 && totalCholesterol <= 279) points += 6;
            else if (totalCholesterol >= 280) points += 8;
        } else if (age <= 59) {
            if (totalCholesterol >= 160 && totalCholesterol <= 199) points += 2;
            else if (totalCholesterol >= 200 && totalCholesterol <= 239) points += 3;
            else if (totalCholesterol >= 240 && totalCholesterol <= 279) points += 4;
            else if (totalCholesterol >= 280) points += 5;
        } else if (age <= 69) {
            if (totalCholesterol >= 160 && totalCholesterol <= 199) points += 1;
            else if (totalCholesterol >= 200 && totalCholesterol <= 239) points += 1;
            else if (totalCholesterol >= 240 && totalCholesterol <= 279) points += 2;
            else if (totalCholesterol >= 280) points += 3;
        }

        // Men Smoking Status
        if (smoker) {
            if (age <= 39) points += 8;
            else if (age <= 49) points += 5;
            else if (age <= 59) points += 3;
            else if (age <= 69) points += 1;
            else points += 1;
        }

        // Men HDL
        if (hdl >= 60) points -= 1;
        else if (hdl < 40) points += 2;
        else if (hdl >= 40 && hdl <= 49) points += 1;

        // Men Systolic BP
        if (systolicBP >= 120 && systolicBP <= 129) points += treatedBP ? 1 : 0;
        else if (systolicBP >= 130 && systolicBP <= 139) points += treatedBP ? 2 : 1;
        else if (systolicBP >= 140 && systolicBP <= 159) points += treatedBP ? 3 : 1;
        else if (systolicBP >= 160) points += treatedBP ? 4 : 2;

        // Diabetes mapping (approximate weight for men)
        if (diabetes) points += 3;

    } else {
        // Women Age points
        if (age <= 34) points -= 7;
        else if (age <= 39) points -= 3;
        else if (age <= 44) points += 0;
        else if (age <= 49) points += 3;
        else if (age <= 54) points += 6;
        else if (age <= 59) points += 8;
        else if (age <= 64) points += 10;
        else if (age <= 69) points += 12;
        else if (age <= 74) points += 14;
        else points += 16;

        // Women Total Cholesterol
        if (age <= 39) {
            if (totalCholesterol >= 160 && totalCholesterol <= 199) points += 4;
            else if (totalCholesterol >= 200 && totalCholesterol <= 239) points += 8;
            else if (totalCholesterol >= 240 && totalCholesterol <= 279) points += 11;
            else if (totalCholesterol >= 280) points += 13;
        } else if (age <= 49) {
            if (totalCholesterol >= 160 && totalCholesterol <= 199) points += 3;
            else if (totalCholesterol >= 200 && totalCholesterol <= 239) points += 6;
            else if (totalCholesterol >= 240 && totalCholesterol <= 279) points += 8;
            else if (totalCholesterol >= 280) points += 10;
        } else if (age <= 59) {
            if (totalCholesterol >= 160 && totalCholesterol <= 199) points += 2;
            else if (totalCholesterol >= 200 && totalCholesterol <= 239) points += 4;
            else if (totalCholesterol >= 240 && totalCholesterol <= 279) points += 5;
            else if (totalCholesterol >= 280) points += 7;
        } else if (age <= 69) {
            if (totalCholesterol >= 160 && totalCholesterol <= 199) points += 1;
            else if (totalCholesterol >= 200 && totalCholesterol <= 239) points += 2;
            else if (totalCholesterol >= 240 && totalCholesterol <= 279) points += 3;
            else if (totalCholesterol >= 280) points += 4;
        }

        // Women Smoking Status
        if (smoker) {
            if (age <= 39) points += 9;
            else if (age <= 49) points += 7;
            else if (age <= 59) points += 4;
            else if (age <= 69) points += 2;
            else points += 1;
        }

        // Women HDL
        if (hdl >= 60) points -= 1;
        else if (hdl < 40) points += 2;
        else if (hdl >= 40 && hdl <= 49) points += 1;

        // Women Systolic BP
        if (systolicBP >= 120 && systolicBP <= 129) points += treatedBP ? 3 : 1;
        else if (systolicBP >= 130 && systolicBP <= 139) points += treatedBP ? 4 : 2;
        else if (systolicBP >= 140 && systolicBP <= 159) points += treatedBP ? 5 : 3;
        else if (systolicBP >= 160) points += treatedBP ? 6 : 4;

        // Diabetes mapping (approximate weight for women)
        if (diabetes) points += 4;
    }

    // Convert points to 10-year risk percentage (General approximation of Framingham)
    let riskPercentage = 1.0;
    if (gender === "male") {
        if (points <= 0) riskPercentage = 1;
        else if (points === 1 || points === 2) riskPercentage = 1.5;
        else if (points === 3 || points === 4) riskPercentage = 2;
        else if (points === 5 || points === 6) riskPercentage = 3;
        else if (points === 7) riskPercentage = 4;
        else if (points === 8) riskPercentage = 5;
        else if (points === 9) riskPercentage = 6;
        else if (points === 10) riskPercentage = 8;
        else if (points === 11) riskPercentage = 10;
        else if (points === 12) riskPercentage = 12;
        else if (points === 13) riskPercentage = 16;
        else if (points === 14) riskPercentage = 20;
        else if (points === 15) riskPercentage = 25;
        else riskPercentage = 30; // >15 points
    } else {
        // Female translation
        if (points <= 8) riskPercentage = 1;
        else if (points === 9 || points === 10) riskPercentage = 1.5;
        else if (points === 11 || points === 12) riskPercentage = 2;
        else if (points === 13) riskPercentage = 3;
        else if (points === 14) riskPercentage = 4;
        else if (points === 15) riskPercentage = 5;
        else if (points === 16) riskPercentage = 6;
        else if (points === 17) riskPercentage = 8;
        else if (points === 18) riskPercentage = 11;
        else if (points === 19) riskPercentage = 14;
        else if (points === 20) riskPercentage = 17;
        else if (points === 21) riskPercentage = 22;
        else riskPercentage = 30; // >21 points
    }

    // Cap risk percentage
    riskPercentage = Math.min(riskPercentage, 99);

    // Determine Risk Category based on ASCVD/AHA guidelines
    let riskCategory: HeartAgeResult["riskCategory"] = "Low Risk";
    if (riskPercentage >= 20) {
        riskCategory = "High Risk";
    } else if (riskPercentage >= 7.5) {
        riskCategory = "Intermediate";
    } else if (riskPercentage >= 5) {
        riskCategory = "Borderline";
    } else {
        riskCategory = "Low Risk";
    }

    // Estimate Heart Age
    // Standard approximation: a person's heart age is the age of a healthy person (normal chol, no smoking, no diabetes, normal BP) with the same risk percentage.
    // Simplified mathematical translation for UI
    let heartAgeOffset = 0;

    if (riskCategory === "Low Risk") {
        heartAgeOffset = - (Math.max(0, 5 - points)); // Slightly lower than real age if extremely healthy
    } else if (riskCategory === "Borderline") {
        heartAgeOffset = + 3;
    } else if (riskCategory === "Intermediate") {
        heartAgeOffset = + 7;
    } else if (riskCategory === "High Risk") {
        heartAgeOffset = + 12;

        // Additional penalty for severe risk
        if (smoker) heartAgeOffset += 3;
        if (diabetes) heartAgeOffset += 3;
        if (systolicBP > 140) heartAgeOffset += 2;
    }

    let calculatedHeartAge = age + heartAgeOffset;

    // Floor at 20, ceiling at 90
    calculatedHeartAge = Math.max(20, Math.min(90, calculatedHeartAge));
    // A person's heart age can't realistically be much less than their actual age unless they are elite. Limit negative offset.
    if (calculatedHeartAge < age - 5) {
        calculatedHeartAge = age - 5;
    }

    return {
        riskPercentage,
        heartAge: calculatedHeartAge,
        riskCategory
    };
}
