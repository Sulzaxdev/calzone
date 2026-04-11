import { Car, Info, AlertTriangle, FileText, BadgePercent, ArrowRight, ShieldAlert } from "lucide-react";
import { PCPCalculatorForm } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { Metadata } from "next";
import { RelatedTools } from "@/components/layout/related-tools";

export const metadata: Metadata = {
    title: "PCP Car Finance Calculator UK",
    description: "Don't sign a PCP deal blind. Use our free UK calculator to work out your monthly payments, balloon payment and total cost in under 60 seconds.",
    alternates: {
        canonical: "/pcp-car-finance-calculator-uk"
    }
};

export default function PCPPage() {
    const faqs = [
        {
            question: "What is PCP car finance?",
            answer: "PCP (Personal Contract Purchase) is a type of car finance where you pay a deposit, followed by fixed monthly payments, and then have the option to pay a final balloon payment to own the car. It's the most widely used car finance product in the UK."
        },
        {
            question: "Is PCP just like renting a car?",
            answer: "Not exactly. You have the right to own the car by paying the balloon payment at the end. But if you choose to return it, the monthly payments you've made don't give you ownership, which is similar to renting in that sense. The key difference is that you have the choice to own it."
        },
        {
            question: "Can I end my PCP agreement early?",
            answer: "Yes. Under the Consumer Credit Act, you can voluntarily terminate a PCP agreement once you've paid 50% of the total amount payable. This is a legal right, but early settlement charges may apply depending on your agreement."
        },
        {
            question: "What happens if I go over my mileage limit?",
            answer: "You'll be charged for every excess mile, typically between 5p and 25p per mile, depending on your lender and vehicle type. It's always worth negotiating a realistic mileage limit upfront rather than trying to fix it at the end."
        },
        {
            question: "Is the balloon payment guaranteed?",
            answer: "Yes. The GMFV (Guaranteed Minimum Future Value) is fixed at the start of your contract and won't change, regardless of what happens to the car market. If the car is worth less than the GMFV when you return it, the lender absorbs the difference, not you."
        },
        {
            question: "Can I modify a car on PCP?",
            answer: "Generally no. Since you don't own the car during the agreement, modifications are usually not permitted unless they're reversible and approved by the finance company in advance."
        },
        {
            question: "What condition does the car need to be in when I return it?",
            answer: "It should be in good condition with only fair wear and tear. Scratches, dents, or interior damage beyond normal use may result in additional charges. Ask your lender for their return condition standards before the end of your agreement."
        },
        {
            question: "Does PCP affect my credit score?",
            answer: "Applying for PCP finance involves a hard credit check, which can temporarily affect your score. Making all your monthly payments on time can help build your credit history positively over the term."
        },
        {
            question: "Is PCP more expensive than a personal loan?",
            answer: "It depends on the deal. PCP often has a lower monthly payment than a personal loan, but you pay interest on the GMFV throughout the term, even though you're not paying it off monthly. A manufacturer's subsidised PCP rate can sometimes work out cheaper overall. Always compare the total cost of credit, not just the monthly payment."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <BreadcrumbSchema items={[
                { name: "Home", item: "/" },
                { name: "Automotive Calculators", item: "/automotive" },
                { name: "PCP Car Finance Calculator UK", item: "/pcp-car-finance-calculator-uk" }
            ]} />
            
            <section className="container mx-auto px-4 pt-16 text-center max-w-4xl">
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50/50 dark:bg-sky-950/20 text-sky-600 dark:text-sky-400 text-[10px] font-black uppercase tracking-widest mb-6 border border-sky-100 dark:border-sky-900/40">
                    <Car className="w-3 h-3" /> The UK's Most Popular Car Finance Method
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tighter">
                    PCP Car Finance Calculator UK
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto opacity-90 font-medium">
                    Work out your monthly PCP payments in seconds, free, simple and built for UK drivers. 
                </p>
            </section>

            <PCPCalculatorForm />

            {/* SEO Content Section */}
            <section className="container mx-auto px-4 max-w-4xl mt-24 space-y-16">
                
                <div className="max-w-none text-slate-700 dark:text-slate-300 text-lg leading-relaxed [&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-slate-900 dark:[&_h2]:text-white [&_h2]:mt-12 [&_h2]:mb-6 [&_h2:first-child]:mt-0 [&_p]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-3 [&_ul]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-3 [&_ol]:mb-6 [&_li]:pl-2 [&_strong]:text-slate-900 dark:[&_strong]:text-white bg-white/90 dark:bg-card/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-[2rem] shadow-xl">
                    <h2>How to Use This PCP Car Finance Calculator</h2>
                    <p>Using this calculator is straightforward. You will need a few basic figures, most of which you can get from a dealer quote or a quick online search.</p>
                    <p>Here's what to enter:</p>
                    <ul>
                        <li><strong>Car Price:</strong> The full on-the-road price of the vehicle, including any extras.</li>
                        <li><strong>Your Deposit:</strong> How much you're paying upfront. A bigger deposit means lower monthly payments.</li>
                        <li><strong>Dealer Contribution:</strong> Some manufacturers offer a cash contribution. Add it here if applicable.</li>
                        <li><strong>Final Balloon Payment (GMFV):</strong> The guaranteed future value set by the lender. Your dealer will provide this figure.</li>
                        <li><strong>Finance Term:</strong> Most UK PCP deals run for 24, 36 or 48 months.</li>
                        <li><strong>Annual Mileage:</strong> Be realistic. Underestimating your mileage can lead to charges at the end.</li>
                        <li><strong>APR:</strong> Use the rate from your lender quote for the most accurate result.</li>
                    </ul>
                    <p>Results update instantly. Use it to compare different deposit amounts, terms, and APRs before speaking to a dealer.</p>
                    <p>This calculator provides estimates only. Actual payments will depend on your credit score, chosen vehicle and lender criteria. Always get an official quote from an FCA-authorised provider.</p>

                    <h2>How PCP Car Finance Works</h2>
                    <p>PCP stands for Personal Contract Purchase. It's the most popular car finance option in the UK and for good reason.</p>
                    <p>With a standard car loan, you pay off the full value of the car over time. PCP works differently. You only pay for the depreciation, the portion of the car's value that drops during your contract. A chunk of the car's value is set aside as a final payment at the end.</p>
                    <p>This is why PCP monthly payments are lower than hire purchase on the same car.</p>
                    <p>A PCP agreement has three parts:</p>
                    <ol>
                        <li><strong>Your deposit:</strong> paid upfront at the start.</li>
                        <li><strong>Monthly payments:</strong> fixed payments over your agreed term, usually 24 to 48 months.</li>
                        <li><strong>The final balloon payment:</strong> also called the GMFV (Guaranteed Minimum Future Value). This is the lender's prediction of what your car will be worth at the end of the deal.</li>
                    </ol>
                    <p>You are not obligated to pay the balloon payment. Which brings us to your options at the end.</p>

                    <h2>What Is the Balloon Payment (GMFV)?</h2>
                    <p>The balloon payment, formally called the Guaranteed Minimum Future Value is the single most misunderstood part of PCP finance.</p>
                    <p>Here's the simple version:</p>
                    <p>At the start of your agreement, the lender estimates what your car will be worth at the end of the term, based on mileage and condition. That figure becomes your GMFV.</p>
                    <p>The word "guaranteed" is important. If the car's actual market value turns out to be lower than the GMFV when you return it, that's the lender's problem, not yours. You walk away with nothing extra to pay.</p>
                    <p><strong>Example:</strong></p>
                    <ul>
                        <li>Car price: £25,000</li>
                        <li>GMFV set at: £10,000</li>
                        <li>Your monthly payments cover the £15,000 difference, plus interest</li>
                    </ul>
                    <p>The higher the GMFV, the lower your monthly payments, because less is being financed each month.</p>
                    <p>One tip: Before signing, check the balloon figure against current used car valuations for the same model at the end of your term. If it looks higher than realistic market value, you may have no equity at the end.</p>

                    <h2>Your 3 Options at the End of a PCP Deal</h2>
                    <p>This is where PCP stands out from other finance products. At the end of your agreement, you have three choices, not one.</p>
                    <ul>
                        <li><strong>Option 1: Hand the Car Back</strong> Return the car and walk away. Nothing more to pay, as long as you've stayed within your mileage limit and the car is in reasonable condition. The depreciation risk sits with the lender.</li>
                        <li><strong>Option 2: Pay the Balloon and Keep It</strong> Pay the GMFV to take full ownership. This makes financial sense if the car's market value is higher than the balloon figure, you'd essentially be buying a car for less than it's worth.</li>
                        <li><strong>Option 3: Part-Exchange and Roll Into a New Deal</strong> If the car is worth more than the GMFV, you have equity. You can use that as a deposit on your next car. This is the most common route for UK drivers who change their car every 2–4 years.</li>
                    </ul>

                    <h2>PCP vs HP vs Personal Loan : Which Is Right for You?</h2>
                    <p>Not sure which type of finance suits you best? Here's a quick side-by-side comparison:</p>
                    <div className="overflow-x-auto my-6 not-prose">
                        <table className="w-full text-left border-collapse text-sm md:text-base text-slate-700 dark:text-slate-300">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-700">
                                    <th className="p-3 font-semibold">Finance Type</th>
                                    <th className="p-3 font-semibold">Monthly Payments</th>
                                    <th className="p-3 font-semibold">Own the Car?</th>
                                    <th className="p-3 font-semibold">Flexibility</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-slate-100 dark:border-slate-800/50">
                                    <td className="p-3 font-semibold">PCP</td>
                                    <td className="p-3">Lower</td>
                                    <td className="p-3">Optional at end</td>
                                    <td className="p-3">High : 3 end options</td>
                                </tr>
                                <tr className="border-b border-slate-100 dark:border-slate-800/50">
                                    <td className="p-3 font-semibold">Hire Purchase (HP)</td>
                                    <td className="p-3">Higher</td>
                                    <td className="p-3">Yes, automatically</td>
                                    <td className="p-3">Low : must complete</td>
                                </tr>
                                <tr className="border-b border-slate-100 dark:border-slate-800/50">
                                    <td className="p-3 font-semibold">Personal Loan</td>
                                    <td className="p-3">Fixed</td>
                                    <td className="p-3">Immediately</td>
                                    <td className="p-3">High : your car to sell</td>
                                </tr>
                                <tr className="border-b border-slate-100 dark:border-slate-800/50">
                                    <td className="p-3 font-semibold">Leasing</td>
                                    <td className="p-3">Lower</td>
                                    <td className="p-3">Never</td>
                                    <td className="p-3">Low : must return</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>Choose <strong>PCP</strong> if you want lower monthly payments, change your car regularly and want flexibility at the end of the contract.</p>
                    <p>Choose <strong>HP</strong> if you want to own the car outright, plan to keep it long-term and prefer a straightforward agreement with no balloon decision.</p>
                    <p>Choose a <strong>Personal Loan</strong> if you want immediate ownership and the freedom to sell at any time.</p>

                    <h2>What Affects Your Monthly PCP Payment?</h2>
                    <p>Four things drive your monthly payment up or down:</p>
                    <ol>
                        <li><strong>The Sum Financed:</strong> Car price minus your deposit minus the GMFV. The lower this figure, the lower your monthly payment.</li>
                        <li><strong>Your APR:</strong> The Annual Percentage Rate determines how much interest you pay. Even a small difference in APR has a noticeable impact over a 36 or 48 month term.</li>
                        <li><strong>The Finance Term:</strong> A longer term means lower monthly payments — but more total interest paid overall. A shorter term costs more per month but less overall.</li>
                        <li><strong>Your Annual Mileage:</strong> Higher mileage reduces the car's residual value, which lowers the GMFV and raises your monthly payment. It also means potential excess mileage charges at the end, typically 5p to 25p per mile over the agreed limit.</li>
                    </ol>
                    <p>Use the calculator above to test different combinations before committing to anything.</p>

                    <h2>Things to Think About Before You Apply</h2>
                    <p>A few practical points worth considering before signing a PCP agreement:</p>
                    <ul>
                        <li><strong>Be honest about your mileage.</strong> Underestimating to get a lower monthly payment often backfires at the end of the contract.</li>
                        <li><strong>Factor in the full cost of ownership.</strong> Insurance, servicing, and tyres all add up on top of your monthly payment.</li>
                        <li><strong>Check your credit score first.</strong> Your APR is directly linked to your creditworthiness. A better score usually means a better rate.</li>
                        <li><strong>Don't rush the deposit decision.</strong> A larger deposit reduces your monthly payment, but if you plan to return the car, you're putting money into something you won't own. Run the numbers both ways using the calculator.</li>
                    </ul>
                    
                    <h2>Sources</h2>
                    <ul>
                        <li>Financial Conduct Authority (FCA) , Motor Finance Guidance</li>
                        <li>Competition and Markets Authority (CMA) , Motor Finance Market Study</li>
                        <li>Society of Motor Manufacturers and Traders (SMMT) , UK Car Finance Statistics</li>
                        <li>Consumer Credit Act 1974</li>
                        <li>Bank of England , Interest Rate Data</li>
                    </ul>
                </div>

                {/* FAQ Section */}
                <FAQAccordion faqs={faqs} title="Frequently Asked Questions" />

                 {/* Final Legal Disclaimer */}
                <div className="bg-slate-100/50 dark:bg-slate-900/50 p-12 rounded-[3rem] border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-8 items-center text-center md:text-left shadow-sm">
                    <ShieldAlert className="w-16 h-16 text-slate-400 shrink-0" />
                    <div>
                        <h4 className="text-2xl font-black text-slate-800 dark:text-slate-200 mb-3 tracking-tight">Financial Disclaimer</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                            This calculator provides an estimate of your monthly car finance payments based on standard amortisation formulas typical of UK lenders. Actual quotes from a dealership may vary slightly due to daily interest compounding or documentation/option to purchase fees being rolled into the first or final payment. We are not financial advisors or a credit broker.
                        </p>
                    </div>
                </div>

            </section>

            <RelatedTools currentCategory="Automotive" currentSlug="/pcp-car-finance-calculator-uk" />
            
            <CalculatorSchema 
                title="PCP Car Finance Calculator UK"
                description="Don't sign a PCP deal blind. Use our free UK calculator to work out your monthly payments, balloon payment and total cost in under 60 seconds."
                slug="/pcp-car-finance-calculator-uk"
                faqs={faqs}
            />
        </div>
    );
}
