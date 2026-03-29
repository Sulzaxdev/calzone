import { NextResponse } from "next/server";
import { z } from "zod";

const pregnancyBMISchema = z.object({
    height: z.number().min(120).max(220),
    weight: z.number().min(30).max(200), // pre-pregnancy weight
    unit: z.enum(["metric", "imperial"]),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validated = pregnancyBMISchema.parse(body);

        let heightM = 0;
        let weightKg = 0;

        if (validated.unit === "metric") {
            heightM = validated.height / 100;
            weightKg = validated.weight;
        } else {
            // Height in inches, Weight in lbs
            heightM = (validated.height * 2.54) / 100;
            weightKg = validated.weight * 0.453592;
        }

        const bmiValue = weightKg / (heightM * heightM);
        const bmi = parseFloat(bmiValue.toFixed(2));

        let category = "";
        let weightGain = "";
        let riskLevel = "";
        let color = "";

        if (bmi < 18.5) {
            category = "Underweight";
            weightGain = "12.5 – 18 kg";
            riskLevel = "Higher risk";
            color = "blue";
        } else if (bmi < 25) {
            category = "Normal";
            weightGain = "11.5 – 16 kg";
            riskLevel = "Lowest risk";
            color = "green";
        } else if (bmi < 30) {
            category = "Overweight";
            weightGain = "7 – 11.5 kg";
            riskLevel = "Moderate risk";
            color = "yellow";
        } else {
            category = "Obese";
            weightGain = "5 – 9 kg";
            riskLevel = "Higher risk";
            color = "red";
        }

        return NextResponse.json({
            bmi,
            category,
            weightGain,
            riskLevel,
            color,
            success: true
        });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
        }
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
