import React from "react";
import { Info, CheckCircle2, FileText, PoundSterling } from "lucide-react";
import { SalaryCalculatorClient } from "./calculator-client";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "Salary Calculator UK | Take-Home Pay & Tax Estimator 24/25",
    description: "Calculate your UK take-home pay with precision. Our expert salary calculator accounts for Income Tax, National Insurance (8%), Pensions, and Student Loans.",
};

export default function SalaryCalculatorPage() {
    const salaryFaqs = [
        {
            question: "How is UK Income Tax calculated?",
            answer: "The UK uses a marginal tax system. You pay 0% on your first £12,570 (Personal Allowance), 20% on income between £12,571 and £50,270 (Basic Rate), and 40% on income between £50,271 and £125,140 (Higher Rate)."
        },
        {
            question: "What is the current National Insurance rate?",
            answer: "As of April 2024, the main rate of Class 1 National Insurance for employees was reduced to 8% on earnings between the primary threshold (£12,570) and the upper earnings limit (£50,270)."
        },
        {
            question: "Does this calculator include the £100k tax trap?",
            answer: "Yes. Our engine automatically calculates the reduction in Personal Allowance for those earning over £100,000, where you lose £1 of allowance for every £2 of income."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20 mt-12">
            <BreadcrumbSchema items={[
                { name: "Home", item: "/" },
                { name: "Finance", item: "/finance-driving" },
                { name: "Salary Calculator UK", item: "/salary-calculator-uk" }
            ]} />
            <CalculatorSchema
                title="Salary Calculator UK | Take-Home Pay & Tax Estimator 24/25"
                description="Calculate your UK take-home pay with precision. Our expert salary calculator accounts for Income Tax, National Insurance (8%), Pensions, and Student Loans."
                slug="/salary-calculator-uk"
                faqs={salaryFaqs}
            />

            {/* Hero Section */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
                        <PoundSterling className="w-4 h-4" />
                        UK Finance Toolkit
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        UK Salary & Take-Home Pay Calculator
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Find out exactly how much you take home after Income Tax, National Insurance, Pension contributions, and Student Loans under current UK standards.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                <SalaryCalculatorClient />

                {/* Right Col: SEO Highlights Sidebar */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white dark:bg-slate-950 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-4 dark:text-white">
                            <Info className="w-5 h-5 text-blue-500" /> UK Tax Highlights
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Tax-Free Allowance</p>
                                    <p className="text-xs text-slate-500 mt-1">In the UK, your first £12,570 earned is entirely tax-free (Standard Tax Code).</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">National Insurance Rate</p>
                                    <p className="text-xs text-slate-500 mt-1">Class 1 National Insurance was reduced to 8% for main rate earners in 2024.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">The £100k Tax Trap</p>
                                    <p className="text-xs text-slate-500 mt-1">Earnings over £100,000 cause your tax-free allowance to scale down by £1 for every £2 earned.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-linear-to-br from-indigo-600 to-blue-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-600/20">
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-3">
                            <FileText className="w-5 h-5 text-blue-200" /> Export Breakdowns
                        </h3>
                        <p className="text-sm text-blue-100 mb-6 leading-relaxed">
                            Negotiating a new job offer? Need proof of net income for a mortgage application? Download your detailed salary breakdown into a clean PDF using the button in the calculator.
                        </p>
                    </div>
                </div>
            </div>

            {/* --- SEO Deep Content Section --- */}
            <div className="container mx-auto px-4 max-w-4xl mt-24">
                <article className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400">
                    <h2>The Complete UK Salary & Tax Guide</h2>
                    <p>
                        Understanding your paycheck can sometimes feel like trying to decipher a foreign language. The jump from Gross Salary (what your employer pays you on paper) to Net Salary (what actually lands in your bank account) is intercepted by several UK taxation bodies, primarily HMRC. This page acts as your ultimate <strong>Take-Home Pay Calculator</strong> to help you budget properly.
                    </p>

                    <h3>How UK Income Tax is Calculated</h3>
                    <p>
                        The UK operates on a progressive or "marginal" tax system. This means that you do not pay a flat tax rate on your entire salary. Instead, your income is divided into specific bands, and each band is taxed at a different percentage.
                    </p>
                    <div className="overflow-x-auto not-prose my-6">
                        <table className="min-w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm">
                            <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-left">
                                <tr>
                                    <th className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">Band</th>
                                    <th className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">Taxable Income Range (Above £12,570)</th>
                                    <th className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">Tax Rate</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                <tr>
                                    <td className="py-3 px-4 font-semibold">Personal Allowance</td>
                                    <td className="py-3 px-4">Up to £12,570</td>
                                    <td className="py-3 px-4">0%</td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4 font-semibold">Basic Rate</td>
                                    <td className="py-3 px-4">£12,571 to £50,270</td>
                                    <td className="py-3 px-4">20%</td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4 font-semibold">Higher Rate</td>
                                    <td className="py-3 px-4">£50,271 to £125,140</td>
                                    <td className="py-3 px-4">40%</td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4 font-semibold">Additional Rate</td>
                                    <td className="py-3 px-4">Over £125,140</td>
                                    <td className="py-3 px-4">45%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3>National Insurance (NI) Contributions</h3>
                    <p>
                        National Insurance is a secondary tax that all UK workers pay to qualify for certain state benefits, primarily the State Pension. Recent fiscal policies have reduced the main rate of Class 1 National Insurance from 12% to 10% and most recently down to <strong>8%</strong>.
                    </p>
                    <p>
                        You only pay NI on earnings above the Primary Threshold (£12,570 per year). Between £12,570 and £50,270 you pay 8%. On earnings above £50,270, the rate drops significantly to just 2%.
                    </p>

                    <h3>Workplace Pensions and Auto-Enrolment</h3>
                    <p>
                        By law, employers in the UK must automatically enrol you into a workplace pension scheme if you are aged between 22 and State Pension age and earn more than £10,000 a year.
                    </p>
                    <ul>
                        <li>The minimum total contribution is 8%.</li>
                        <li>Usually, the employer pays 3% and the employee pays 5%.</li>
                    </ul>
                    <p>
                        In our calculator, you can adjust your contributions accordingly. Many large corporations offer matching schemes, where if you put in 8%, they put in 8%. Note that pension contributions are technically tax-deductible, meaning they lower your total taxable income.
                    </p>

                    <h3>Student Loan Repayments (Plan 2)</h3>
                    <p>
                        If you graduated from a UK university after 2012, you are likely on a Plan 2 Student Loan. You are required to pay back 9% of everything you earn <strong>over £27,295</strong> per year.
                    </p>
                    <p>
                        For example, if you earn £30,000 a year, you are £2,705 over the threshold. You will pay 9% of £2,705 over the course of the year, which comes to £243.45 annually.
                    </p>

                    <FAQAccordion faqs={salaryFaqs} title="Frequently Asked Questions (Salary)" />
                </article>
            </div>
        </div>
    );
}
