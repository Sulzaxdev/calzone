export interface ApeIndexInputs {
    armSpan: number; // in cm
    height: number;  // in cm
}

export interface ApeIndexResult {
    ratio: number;
    differenceCm: number;
    differenceInches: number;
    category: "Negative Ape Index" | "Neutral Ape Index" | "Positive Ape Index";
    description: string;
    sportsAdvantage: string[];
}

export function calculateApeIndex(inputs: ApeIndexInputs): ApeIndexResult {
    const { armSpan, height } = inputs;

    const ratio = parseFloat((armSpan / height).toFixed(3));
    const differenceCm = parseFloat((armSpan - height).toFixed(1));
    const differenceInches = parseFloat((differenceCm / 2.54).toFixed(1));

    let category: "Negative Ape Index" | "Neutral Ape Index" | "Positive Ape Index";
    let description = "";
    let sportsAdvantage: string[] = [];

    if (differenceCm < -2) {
        category = "Negative Ape Index";
        description = "Your arm span is significantly shorter than your height. You have a 'Negative Ape Index', also known as a T-Rex index.";
        sportsAdvantage = [
            "Olympic Weightlifting: Shorter arms provide massive mechanical advantages in the bench press and strict overhead press.",
            "Gymnastics: Shorter levers make complex bodyweight movements and rotational maneuvers highly efficient.",
            "Sumo Deadlift: Often benefits from a more compact setup and leverage."
        ];
    } else if (differenceCm >= -2 && differenceCm <= 2) {
        category = "Neutral Ape Index";
        description = "Your arm span is almost exactly equal to your height. This represents the average human anatomical proportion (Leonardo da Vinci's Vitruvian Man).";
        sportsAdvantage = [
            "General Athletics: Balanced leverages offer excellent versatility across most sports without major biomechanical disadvantages.",
            "Running & Sprinting: Average arm lengths maintain optimal pendulum momentum without excessive drag.",
            "Squatting: Good, balanced mechanics for both high-bar and low-bar squatting."
        ];
    } else {
        category = "Positive Ape Index";
        description = "Your arm span is significantly longer than your height. You have a 'Positive Ape Index', an anatomical trait highly prized in many elite sports.";
        sportsAdvantage = [
            "Rock Climbing & Bouldering: Exceptional reach allows you to grab holds others physically cannot reach while keeping your center of gravity low.",
            "Swimming: Elite swimmers (like Michael Phelps) rely on a massively positive ape index for water displacement.",
            "Boxing / MMA: A longer reach allows you to strike opponents while staying safely out of their strike zone.",
            "Basketball & Goalkeeping: Expanded defensive wingspan intercepts passes and blocks shots easily."
        ];
    }

    return {
        ratio,
        differenceCm,
        differenceInches,
        category,
        description,
        sportsAdvantage
    };
}
