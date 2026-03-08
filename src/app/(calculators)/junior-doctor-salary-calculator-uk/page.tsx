import { HeartPulse, Stethoscope, BriefcaseMedical } from "lucide-react";
import { JuniorDoctorSalaryCalculator } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "Junior Doctor Salary Calculator UK | Estimate NHS Pay",
    description: "Calculate your estimated NHS junior doctor salary based on the latest BMA / NHS Employers pay scales, including out-of-hours, weekends, and night allowances.",
};

export default function JuniorDoctorSalaryPage() {
    const faqs = [
        {
            question: "What is a Junior Doctor's basic salary?",
            answer: "A junior doctor's basic salary depends on their grade (nodal point). Starting as a Foundation Year 1 (FY1) doctor, the 2023/2024 basic pay is approximately £32,398. This increases as you progress to FY2, Core Training (CT), and Specialty Training (ST)."
        },
        {
            question: "How are extra hours paid?",
            answer: "The standard basic contract is for 40 hours per week. If you are rostered to work more than this (up to a legal limit of 48 hours average), you are paid at your basic hourly rate for those additional hours."
        },
        {
            question: "What is the weekend allowance?",
            answer: "Under the 2016 contract (updated), doctors receive a percentage allowance based on how frequently they work weekends. This ranges from 3% (1 in 8 weekends) up to 15% (1 in 2 weekends)."
        },
        {
            question: "Are night shifts paid more?",
            answer: "Yes. Any hours worked between 21:00 and 07:00 attract a 37% enhancement on your basic hourly rate. Our calculator provides a simplified estimate based on the intensity of your night shifts."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <CalculatorSchema
                title="Junior Doctor Salary Calculator UK"
                description="Estimate your NHS junior doctor salary based on grade, rotas, and the 2016 contract updates."
                slug="/junior-doctor-salary-calculator-uk"
                faqs={faqs}
            />

            {/* Hero */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
                        <HeartPulse className="w-4 h-4" />
                        NHS Pay Tools
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Junior Doctor Pay Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Quickly estimate your gross and net salary based on the NHS 2016 Junior Doctors contract. Input your grade, weekend frequency, and night shift intensity to see your breakdown.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Calculator Component */}
                <div className="max-w-4xl mx-auto">
                    <JuniorDoctorSalaryCalculator />
                </div>

                {/* SEO Content */}
                <section className="mt-20 max-w-4xl mx-auto space-y-12">
                    <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <BriefcaseMedical className="w-8 h-8 text-blue-500" />
                            Understanding The Junior Doctor Contract (2016)
                        </h2>

                        <div className="space-y-8 text-slate-700 dark:text-slate-300">
                            <p className="text-lg leading-relaxed">
                                Calculating your pay as a junior doctor in the NHS can be incredibly complex due to the various rostering rules, out-of-hours enhancements, and nodal points introduced by the 2016 contract (and its subsequent updates). Knowing how your payslip is structured is vital to ensure you are being paid correctly.
                            </p>

                            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/40">
                                <h3 className="text-xl font-bold text-blue-900 dark:text-blue-200 mb-4 flex items-center gap-2">
                                    <Stethoscope className="w-6 h-6 text-blue-500" /> Elements of Your Pay
                                </h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-900/80 dark:text-blue-200/80 list-disc pl-5">
                                    <li><strong>Basic Pay:</strong> Based on 40 hours per week, tied to your training grade (Nodal Point 1 through 5).</li>
                                    <li><strong>Additional Rostered Hours:</strong> You are paid at your basic rate for average weekly hours worked between 40 and 48 hours.</li>
                                    <li><strong>Night Enhancements:</strong> Hours worked between 21:00 and 07:00 are paid with a 37% premium on your basic rate.</li>
                                    <li><strong>Weekend Allowance:</strong> A flat percentage added to your basic pay, depending on how many weekends you work (from 3% to 15%).</li>
                                    <li><strong>On-Call Availability:</strong> If you do non-resident on-calls, you receive an 8% allowance.</li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Nodal Points Explained</h3>
                                <p className="leading-relaxed">
                                    Instead of incremental pay progression for every year you work, the 2016 contract grouped progression into "Nodal Points". You receive a pay increase when you step up to a new level of responsibility:
                                </p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li><strong>Nodal Point 1:</strong> Foundation Year 1 (FY1).</li>
                                    <li><strong>Nodal Point 2:</strong> Foundation Year 2 (FY2).</li>
                                    <li><strong>Nodal Point 3:</strong> Core Training (CT1/CT2) and early Specialty Training (ST1/ST2).</li>
                                    <li><strong>Nodal Point 4:</strong> Higher Specialty Training (ST3, ST4, ST5).</li>
                                    <li><strong>Nodal Point 5:</strong> Senior Specialty Training (ST6, ST7, ST8).</li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Checking Your Work Schedule</h3>
                                <p className="leading-relaxed">
                                    Before starting a new rotation, you should receive a "Work Schedule" from the HR department or medical staffing. This document outlines your expected rotas, average hours, weekend frequency, and night shifts. You can use our calculator alongside your Work Schedule to estimate your take-home pay before your first payslip arrives. If your actual hours vastly exceed your work schedule, you should undergo the <em>Exception Reporting</em> process.
                                </p>
                            </div>
                        </div>
                    </div>

                    <FAQAccordion faqs={faqs} title="Junior Doctor Salary FAQs" />
                </section>
            </div>
        </div>
    );
}
