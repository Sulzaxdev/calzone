"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, GraduationCap } from "lucide-react";

// Using a dynamic form schema with field arrays
const formSchema = z.object({
    modules: z.array(
        z.object({
            grade: z.number().min(0).max(100, { message: "Grade must be 0-100" }),
            credits: z.number().min(1, { message: "Credits must be > 0" }),
        })
    ).min(1, { message: "Add at least one module." }),
});

type ResultData = {
    weightedAverage: number;
    classification: string;
};

export default function UniversityGradeCalculator() {
    const [result, setResult] = useState<ResultData | null>(null);

    const { register, control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            modules: [
                { grade: 70, credits: 20 },
                { grade: 65, credits: 20 },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        name: "modules",
        control,
    });

    const getClassification = (average: number) => {
        if (average >= 70) return "First Class Honours (1st)";
        if (average >= 60) return "Upper Second Class (2:1)";
        if (average >= 50) return "Lower Second Class (2:2)";
        if (average >= 40) return "Third Class (3rd)";
        return "Fail";
    };

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        let totalWeightedGrades = 0;
        let totalCredits = 0;

        values.modules.forEach((mod) => {
            totalWeightedGrades += mod.grade * mod.credits;
            totalCredits += mod.credits;
        });

        const average = totalCredits === 0 ? 0 : totalWeightedGrades / totalCredits;

        setResult({
            weightedAverage: Number(average.toFixed(2)),
            classification: getClassification(average),
        });
    };

    return (
        <CalculatorCard
            title="UK University Grade Calculator"
            description="Calculate your weighted module average and predict your degree classification."
            hasResult={!!result}
            icon={<GraduationCap className="w-6 h-6" />}
            heroImage="https://images.unsplash.com/photo-1523050853064-850162fdb9f1?q=80&w=2070&auto=format&fit=crop"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                <div className="space-y-4">
                    <div className="grid grid-cols-12 gap-2 text-sm font-semibold text-muted-foreground pb-2 border-b">
                        <div className="col-span-1">#</div>
                        <div className="col-span-5">Grade (%)</div>
                        <div className="col-span-5">Credits</div>
                        <div className="col-span-1"></div>
                    </div>

                    {fields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-12 gap-2 items-center">
                            <div className="col-span-1 text-sm text-muted-foreground">{index + 1}</div>

                            <div className="col-span-5">
                                <Input
                                    type="number"
                                    min={0}
                                    max={100}
                                    {...register(`modules.${index}.grade` as const, { valueAsNumber: true })}
                                />
                                {errors?.modules?.[index]?.grade && (
                                    <p className="text-xs text-destructive mt-1">{errors.modules[index]?.grade?.message}</p>
                                )}
                            </div>

                            <div className="col-span-5">
                                <Input
                                    type="number"
                                    min={1}
                                    {...register(`modules.${index}.credits` as const, { valueAsNumber: true })}
                                />
                            </div>

                            <div className="col-span-1 text-right">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    data-pdf-export-ignore
                                    className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                    onClick={() => remove(index)}
                                    disabled={fields.length === 1}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        data-pdf-export-ignore
                        className="w-full mt-2 border-dashed"
                        onClick={() => append({ grade: 60, credits: 20 })}
                    >
                        <Plus className="h-4 w-4 mr-2" /> Add Module
                    </Button>
                </div>

                <Button type="submit" className="w-full" data-pdf-export-ignore>
                    Calculate Overall Grade
                </Button>
            </form>

            {result && (
                <div className="mt-8 p-6 bg-muted/50 rounded-lg space-y-4 text-center border-t-4 border-primary shadow-sm">
                    <h3 className="text-lg font-bold text-muted-foreground">Weighted Average</h3>
                    <div className="text-5xl font-extrabold text-foreground pb-2">
                        {result.weightedAverage}%
                    </div>

                    <div className="bg-background rounded-md border p-3 mt-4">
                        <p className="text-sm text-muted-foreground mb-1">Predicted Classification</p>
                        <p className="font-bold text-lg text-primary">{result.classification}</p>
                    </div>
                </div>
            )}
        </CalculatorCard>
    );
}
