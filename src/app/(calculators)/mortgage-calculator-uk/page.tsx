import { MortgageCalculator } from "./calculator";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { Metadata } from "next";
import { Home, PoundSterling, Building, ShieldCheck, TrendingDown } from "lucide-react";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { RelatedTools } from "@/components/layout/related-tools";

export const metadata: Metadata = {
    title: "Mortgage Calculator UK: Monthly Repayment & EMI Estimator",
    description: "Calculate your monthly mortgage payments in the UK. Estimate EMI, total interest, and property affordability with our free Mortgage Calculator.",
    keywords: "Mortgage Calculator UK, Home Loan Calculator, Monthly Mortgage Payment Calculator, EMI Mortgage Calculator, UK Mortgage Repayment Calculator, Fixed vs Variable Mortgage, Mortgage Interest Calculator, Buy to Let Mortgage Calculator, First Time Buyer Mortgage Calculator, How much mortgage can I afford UK, How to calculate mortgage payments UK, 25 year mortgage calculator UK, Mortgage with 5% deposit UK, Bank of England base rate impact on mortgage",
    alternates: {
        canonical: "/mortgage-calculator-uk"
    }
};

export default function MortgageCalculatorPage() {
    const faqs = [
        {
            question: "How do I calculate my mortgage payments in the UK?",
            answer: "Enter your property price, your deposit amount (typically 5%–20%), the interest rate offered by your lender, and the loan term (often 25–30 years) into our calculator. It will automatically calculate your monthly Equated Monthly Installment (EMI) and the total interest payable over the term."
        },
        {
            question: "What is an Amortization Schedule?",
            answer: "An amortization schedule is a table that shows exactly how each monthly payment is split between the principal (the amount you borrowed) and the interest. In the early years of your mortgage, a larger portion of your EMI goes towards interest. In the later years, you pay off more of the principal."
        },
        {
            question: "Fixed vs Variable Rate Mortgage - What's the difference?",
            answer: "A Fixed Rate Mortgage locks in your interest rate for a setup period (usually 2, 3, or 5 years), meaning your payments stay exactly the same. A Variable or Tracker Mortgage is linked to the Bank of England's base rate—so if the base rate goes up, your monthly payments will increase, but if it goes down, your payments will decrease."
        },
        {
            question: "How does the Bank of England base rate impact my mortgage?",
            answer: "If you are on a tracker or standard variable rate (SVR) mortgage, your interest rate is directly affected by the Bank of England base rate. An increase in the base rate means higher monthly payments. If you are on a fixed rate, your payments won't change until your fixed period ends."
        },
        {
            question: "What is an Interest-Only Mortgage?",
            answer: "With an interest-only mortgage, your monthly payments only cover the interest charges on the loan, not the principal amount. This makes monthly payments much lower, but you still owe the original amount borrowed at the end of the term, and you must have a solid plan (like selling the property or cashing in investments) to repay it."
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <BreadcrumbSchema items={[
                { name: "Home", item: "/" },
                { name: "Home & Property", item: "/home-property" },
                { name: "Mortgage Calculator UK", item: "/mortgage-calculator-uk" }
            ]} />
            <CalculatorSchema
                title="Mortgage Calculator UK: Monthly Repayment & EMI Estimator"
                description="Calculate your monthly mortgage payments in the UK. Estimate EMI, total interest, and property affordability with our free Mortgage Calculator."
                slug="/mortgage-calculator-uk"
                faqs={faqs}
            />
            {/* Header Section */}
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-[1.1]">
                    Mortgage <span className="text-primary italic">Calculator UK</span>
                </h1>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
                    Plan your property purchase with precision. Calculate your monthly EMI, total interest, and total repayment amount instantly.
                </p>
            </div>

            {/* Calculator Component */}
            <div className="mb-24">
                <MortgageCalculator />
            </div>

            {/* SEO Content Section */}
            <div className="grid lg:grid-cols-2 gap-16 mb-24">
                <div className="space-y-8">
                    <section>
                        <h2 className="text-3xl font-black tracking-tight mb-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <Home className="w-6 h-6" />
                            </div>
                            Understanding Your Mortgage
                        </h2>
                        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                            <p>
                                A <strong>Mortgage Calculator</strong> is an essential financial tool for anyone looking to buy a home, remortgage, or invest in property in the UK. It helps you calculate three major components of your loan:
                            </p>
                            <ul className="list-disc pl-5 mt-4 space-y-2 marker:text-primary">
                                <li><strong>Monthly EMI:</strong> The Equated Monthly Installment you need to pay the bank every month.</li>
                                <li><strong>Total Interest:</strong> The total cost of borrowing the money over the entire term.</li>
                                <li><strong>Total Repayment:</strong> The combined total of your principal loan amount plus all the interest.</li>
                            </ul>
                            <p className="mt-4">
                                Whether you're a first-time buyer exploring schemes with a 5% deposit or a seasoned buy-to-let landlord, predicting your cash flow is critical to ensuring long-term affordability.
                            </p>
                        </div>
                    </section>

                    <section className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem]">
                        <h3 className="text-2xl font-bold tracking-tight mb-4 italic">Types of UK Mortgages</h3>
                        <p className="text-slate-600 dark:text-slate-400 font-medium mb-6">
                            Choosing the right mortgage type is just as important as securing a low interest rate. The main types in the UK include:
                        </p>
                        <div className="space-y-4">
                            <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                                <span className="text-[12px] font-black uppercase text-primary block mb-1">Fixed Rate</span>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">Your interest rate and monthly payments stay exactly the same for a set period (usually 2, 3, or 5 years).</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                                <span className="text-[12px] font-black uppercase text-primary block mb-1">Tracker / Variable</span>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">Your rate is directly linked to the Bank of England's base rate. If the base rate drops, your payments drop.</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                                <span className="text-[12px] font-black uppercase text-primary block mb-1">Interest-Only</span>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">Your monthly payments only cover the interest. You must pay back the full loan amount at the end of the term.</p>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-3xl font-black tracking-tight mb-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                                <TrendingDown className="w-6 h-6" />
                            </div>
                            How We Calculate Your EMI
                        </h2>
                        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                            <p className="mb-4">
                                Our calculator uses the standard banking formula for amortized loans. While you don't need to do the math yourself, here is the formula behind the scenes:
                            </p>
                            <div className="p-6 bg-slate-950 text-orange-500 font-mono text-center rounded-2xl border border-white/10 mb-6 text-sm lg:text-base overflow-x-auto">
                                EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
                            </div>
                            <ul className="list-disc pl-5 space-y-2 opacity-80 text-sm">
                                <li><strong>P</strong> = Principal Loan Amount (Property Price - Deposit)</li>
                                <li><strong>r</strong> = Monthly Interest Rate (Annual Rate ÷ 12)</li>
                                <li><strong>n</strong> = Total number of monthly payments (Years × 12)</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-2xl font-bold tracking-tight mb-3">Key Factors Affecting Your Mortgage</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary transition-colors">
                                <div className="p-2 bg-primary/20 rounded-full"><PoundSterling className="w-5 h-5 text-primary" /></div>
                                <div>
                                    <p className="font-bold text-slate-900 dark:text-white leading-none">Your Deposit Size</p>
                                    <span className="text-xs text-slate-500">A larger deposit unlocks lower interest rates (known as LTV - Loan to Value).</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary transition-colors">
                                <div className="p-2 bg-primary/20 rounded-full"><Building className="w-5 h-5 text-primary" /></div>
                                <div>
                                    <p className="font-bold text-slate-900 dark:text-white leading-none">Loan Term Length</p>
                                    <span className="text-xs text-slate-500">A 35-year term lowers monthly payments, but you pay thousands more in total interest.</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* FAQS Section */}
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-black tracking-tight mb-2 uppercase">Frequently Asked Questions</h2>
                    <p className="text-slate-500 font-medium">Expert answers to common UK mortgage queries.</p>
                </div>
                <FAQAccordion faqs={faqs} />
            </div>

            <div className="mt-24 p-12 rounded-[3rem] bg-slate-950 text-white relative overflow-hidden group">
                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center text-center md:text-left">
                    <div>
                        <h2 className="text-4xl font-black mb-6 italic tracking-tight">Secure Your <span className="text-primary underline decoration-primary/30 underline-offset-8">Dream Home</span></h2>
                        <p className="text-slate-400 font-medium leading-relaxed text-lg mb-8 italic opacity-80">
                            "A mortgage is likely the largest financial commitment you'll ever make. Understand the numbers before you sign."
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="px-5 py-2 rounded-full bg-white/10 border border-white/10 text-[10px] font-black tracking-widest uppercase">First Time Buyers</div>
                            <div className="px-5 py-2 rounded-full bg-white/10 border border-white/10 text-[10px] font-black tracking-widest uppercase">Buy to Let</div>
                        </div>
                    </div>
                    <div className="flex justify-center md:justify-end">
                        <div className="w-48 h-48 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center relative scale-110 group-hover:scale-125 transition-transform duration-700">
                            <ShieldCheck className="w-24 h-24 text-primary" />
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
            </div>
            <RelatedTools currentCategory="Home & Property" currentSlug="/mortgage-calculator-uk" />
        </div>
    );
}
