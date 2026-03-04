"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalculatorCard } from "@/components/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Building2,
    Wallet,
    TrendingUp,
    Info,
    HelpCircle,
    CircleCheck,
    Landmark,
    Hammer,
    Home,
    Building,
    AlertCircle,
    ShieldCheck,
    Quote,
    Layers
} from "lucide-react";

const PROJECT_TYPES = {
    "new-build": { label: "New Build", icon: Building, base: [8, 10, 12] },
    "renovation": { label: "Renovation", icon: Hammer, base: [10, 12, 15] },
    "extension": { label: "Extension", icon: Home, base: [12, 14, 16] },
};

const formSchema = z.object({
    budget: z.coerce.number().min(10000, "Min budget £10k").max(10000000, "Max budget £10m"),
    type: z.enum(["new-build", "renovation", "extension"]),
    complexity: z.enum(["low", "standard", "high"]),
});

type FormValues = z.infer<typeof formSchema>;

interface ResultData {
    fee: string;
    percentage: number;
    total: string;
    concept: string;
    design: string;
    construction: string;
}

export function ArchitectsFeeForm() {
    const [result, setResult] = useState<ResultData | null>(null);

    const form = useForm<FormValues>({
        resolver: (zodResolver as any)(formSchema) as any,
        defaultValues: {
            budget: 150000,
            type: "extension",
            complexity: "standard",
        },
    });

    const calculateFee = (data: FormValues) => {
        const config = PROJECT_TYPES[data.type];
        let baseIdx = data.budget < 100000 ? 2 : data.budget < 500000 ? 1 : 0;
        let percentage = config.base[baseIdx];

        if (data.complexity === "high") percentage += 2;
        if (data.complexity === "low") percentage -= 1;

        const fee = data.budget * (percentage / 100);
        const total = data.budget + fee;

        setResult({
            fee: Math.round(fee).toLocaleString(),
            percentage,
            total: Math.round(total).toLocaleString(),
            concept: Math.round(fee * 0.35).toLocaleString(),
            design: Math.round(fee * 0.35).toLocaleString(),
            construction: Math.round(fee * 0.30).toLocaleString(),
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-12">
                <CalculatorCard
                    title="Architectural Fee Estimator"
                    description="Professional fee analysis for UK construction projects. Precision calculation based on RIBA Plan of Work benchmarks and technical design overheads."
                    hasResult={!!result}
                >
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(calculateFee)} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                                <FormField
                                    control={form.control}
                                    name="budget"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Build Budget (£)</FormLabel>
                                            <FormControl>
                                                <div className="relative group">
                                                    <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                                    <Input
                                                        type="number"
                                                        placeholder="150000"
                                                        {...field}
                                                        className="pl-10 h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl font-bold italic shadow-sm transition-all focus:ring-2 focus:ring-blue-500/20"
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-[10px] uppercase font-black italic" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Project Nature</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl font-bold italic shadow-sm transition-all focus:ring-2 focus:ring-blue-500/20">
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="rounded-xl font-bold italic uppercase">
                                                    {Object.entries(PROJECT_TYPES).map(([key, value]) => (
                                                        <SelectItem key={key} value={key} className="text-xs">
                                                            {value.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-[10px] uppercase font-black italic" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="complexity"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Design Complexity</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl font-bold italic shadow-sm transition-all focus:ring-2 focus:ring-blue-500/20">
                                                        <SelectValue placeholder="Select complexity" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="rounded-xl font-bold italic uppercase">
                                                    <SelectItem value="low" className="text-xs">Functional / Basic</SelectItem>
                                                    <SelectItem value="standard" className="text-xs">Modern / Bespoke</SelectItem>
                                                    <SelectItem value="high" className="text-xs">Luxury / Listed</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-[10px] uppercase font-black italic" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button type="submit" className="w-full text-lg h-14 font-black bg-slate-900 hover:bg-black text-white rounded-2xl shadow-xl transition-all active:scale-[0.98] group uppercase tracking-tighter italic">
                                <Building2 className="w-5 h-5 mr-2 group-hover:animate-pulse text-blue-400" />
                                Analyze Fee Structure
                            </Button>
                        </form>
                    </Form>

                    {result && (
                        <div className="mt-12 p-8 md:p-12 rounded-[2.5rem] bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border border-blue-100 dark:border-blue-800 animate-in zoom-in-95 duration-500 text-pretty">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10 pb-6 border-b border-blue-200/50 dark:border-blue-800/50">
                                <div className="text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                        <TrendingUp className="h-6 w-6 text-blue-600" />
                                        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight italic">Estimated Architect Fee</h3>
                                    </div>
                                    <div className="flex items-baseline justify-center md:justify-start gap-1">
                                        <span className="text-5xl md:text-6xl font-black text-blue-600 dark:text-blue-400 tabular-nums tracking-tighter italic">£{result.fee}</span>
                                    </div>
                                </div>

                                <div className="hidden sm:block">
                                    <span className="px-5 py-2 rounded-full bg-white dark:bg-slate-900 shadow-sm border border-blue-200 dark:border-blue-800 text-[10px] font-black text-blue-600 uppercase tracking-widest">
                                        {result.percentage}% OF BUDGET
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                <div className="p-6 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-blue-100 dark:border-blue-800/50 space-y-2">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block italic">Total Investment</span>
                                    <div className="text-2xl font-black text-slate-900 dark:text-white italic">£{result.total}</div>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase italic">Build + Fees</p>
                                </div>

                                <div className="p-6 bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/50 space-y-2">
                                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block italic">Service Level</span>
                                    <div className="text-2xl font-black text-blue-700 dark:text-blue-300 italic">Full Service</div>
                                    <p className="text-[10px] font-bold text-blue-600/60 uppercase italic italic">Work Stages 0-7</p>
                                </div>

                                <div className="p-6 bg-slate-50/50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 lg:col-span-1">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block italic">Regulatory Armor</span>
                                    <div className="text-xl font-black text-blue-600 italic flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4" />
                                        ARB REGISTERED
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase italic italic">Professional Indemnity</p>
                                </div>
                            </div>

                            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-4 rounded-xl bg-white/40 dark:bg-black/20 border border-blue-100/50">
                                    <span className="text-[8px] font-black text-slate-400 uppercase block mb-1">Concept (35%)</span>
                                    <span className="text-lg font-black text-slate-800 dark:text-slate-200 italic">£{result.concept}</span>
                                </div>
                                <div className="p-4 rounded-xl bg-white/40 dark:bg-black/20 border border-blue-100/50">
                                    <span className="text-[8px] font-black text-slate-400 uppercase block mb-1">Planning (35%)</span>
                                    <span className="text-lg font-black text-slate-800 dark:text-slate-200 italic">£{result.design}</span>
                                </div>
                                <div className="p-4 rounded-xl bg-white/40 dark:bg-black/20 border border-blue-100/50">
                                    <span className="text-[8px] font-black text-slate-400 uppercase block mb-1">Technical (30%)</span>
                                    <span className="text-lg font-black text-slate-800 dark:text-slate-200 italic">£{result.construction}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </CalculatorCard>
            </div>

            <div className="lg:col-span-12 mt-12 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: Layers, title: "Stages 0-4", color: "blue", text: "Covers initial feasibility, concept design, and full planning applications until 'Planning Permission Granted'." },
                        { icon: Hammer, title: "Technical Stage", color: "indigo", text: "Crucial detailed drawings for Building Regulations, structural calcs, and contractor tendering." },
                        { icon: AlertCircle, title: "Varying Fees", color: "sky", text: "Renovations carry higher risks (structural unknowns) than new builds, requiring higher percentage fees." },
                    ].map((item, i) => (
                        <div key={i} className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-md transition-all group">
                            <div className={`w-12 h-12 rounded-2xl bg-${item.color}-500/10 flex items-center justify-center text-${item.color}-600 mb-6 group-hover:scale-110 transition-transform`}>
                                <item.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-3 italic">{item.title}</h3>
                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-relaxed italic">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="bg-slate-900 text-white p-12 md:p-16 rounded-[3.5rem] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -mr-48 -mt-48 transition-all group-hover:bg-blue-600/20"></div>
                    <div className="relative z-10">
                        <h3 className="text-4xl font-black mb-12 flex items-center gap-4 italic uppercase tracking-tighter">
                            <HelpCircle className="w-10 h-10 text-blue-400" />
                            Project Intelligence
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-pretty">
                            {[
                                { q: "Percent vs Flat Fee?", a: "Residential architects usually fee on a percentage basis because build costs often inflate. Flat fees are common for simple interior refits." },
                                { q: "RIBA Stages?", a: "The RIBA Plan of Work organizes the design process into 8 stages. Stage 3 is usually the submission of planning permission." },
                                { q: "Hidden Costs?", a: "Our estimate excludes structural engineers (£1k-£3k), planning application fees (£200+), and building control inspector fees." },
                                { q: "Indemnity Insurance?", a: "Registered architects (ARB) must carry Professional Indemnity Insurance, protecting the homeowner against design errors for 6-12 years." },
                            ].map((faq, i) => (
                                <div key={i} className="space-y-3 group">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-6 bg-blue-500 rounded-full group-hover:h-8 transition-all"></div>
                                        <h4 className="text-lg font-black text-white italic uppercase tracking-tight">{faq.q}</h4>
                                    </div>
                                    <p className="text-sm font-medium text-slate-400 leading-relaxed italic border-l border-slate-800 pl-4 ml-0.5">
                                        {faq.a}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
