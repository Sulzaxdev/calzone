import { BlogPostLayout } from "@/components/blog/blog-post-layout";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import Link from "next/link";

// Problem-Based Intent Article
export default function NotLosingWeight() {

    const articleFaqs = [
        {
            question: "Why am I gaining weight in a calorie deficit?",
            answer: "If the scale goes up despite a true deficit, it is almost entirely due to water retention. High sodium intake, a sudden increase in carbohydrates, intense weightlifting (causing muscle inflammation), or hormonal fluctuations (cortisol, menstrual cycle) can cause temporary scale spikes of 2-5lbs."
        },
        {
            question: "Did my metabolism slow down and stop my weight loss?",
            answer: "Metabolic adaptation (adaptive thermogenesis) is real but vastly overstated. As you lose weight, a smaller body requires fewer calories to merely exist. Your TDEE drops. If you do not recalculate your deficit every 10-15 pounds, you will eventually hit maintenance and stop losing."
        },
        {
            question: "Do cheat days ruin a calorie deficit?",
            answer: "Yes, easily. If you maintain a 500-calorie deficit Monday through Friday, you 'bank' a deficit of 2,500 calories. If you overeat by 3,000 calories via takeaways and alcohol on Saturday, you have effectively erased your entire week's progress."
        }
    ];

    const authoritySources = [
        {
            title: "NHS: Why you might not be losing weight",
            url: "https://www.nhs.uk/live-well/healthy-weight/managing-your-weight/understanding-calories/"
        },
        {
            title: "Study: Discrepancy between self-reported and actual caloric intake",
            url: "https://pubmed.ncbi.nlm.nih.gov/1454084/"
        }
    ];

    return (
        <>
            <CalculatorSchema
                title="Not Losing Weight in a Calorie Deficit? Here's Why."
                description="Troubleshoot your diet plateau. Discover the hidden UK dietary mistakes, metabolic adaptations, and tracking errors stalling your fat loss."
                slug="/blog/not-losing-weight-in-calorie-deficit-uk"
                faqs={articleFaqs}
                isArticle={true}
            />
            <BlogPostLayout
                title="Not Losing Weight in a Calorie Deficit? 5 Reasons Why."
                description="It is incredibly frustrating to feel ravenously hungry, track your food, and see the scale refuse to budge. If you are 'eating in a deficit' but not losing fat, the laws of thermodynamics haven't broken—your data has."
                date="2026-03-04"
                author="Dr. Alan Richards"
                readTime="7"
                category="Diet Troubleshooting"
                slug="not-losing-weight-in-calorie-deficit-uk"
                sources={authoritySources}
                relatedCalculator={{
                    name: "Calorie Deficit Calculator",
                    href: "/calorie-deficit-calculator-uk",
                    description: "Have you recalculated your numbers recently? A smaller body burns fewer calories. Update your metrics now."
                }}
            >
                <h2>The Hard Truth About Plateaus</h2>
                <p>
                    Let's establish an uncomfortable reality right off the bat: If you have not lost a single pound over a rolling 4-week period, <strong>you are not in a calorie deficit</strong>.
                </p>
                <p>
                    This is never an issue of broken biology. The human body cannot synthesize tissue out of thin air. Instead, the problem invariably falls into one of two categories: you are calculating your maintenance incorrectly, or you are systematically under-reporting your true caloric intake.
                </p>
                <p>
                    Here are the five primary reasons your weight loss has stalled, and exactly how to fix them.
                </p>

                <h2>1. You Are "Eyeballing" Portion Sizes</h2>
                <p>
                    Humans are spectacularly terrible at estimating caloric densities visually. Clinical studies consistently demonstrate that individuals attempting to lose weight under-report their daily caloric intake by as much as 30-40%.
                </p>
                <ul>
                    <li>A "tablespoon" of olive oil poured freely from the bottle is rarely 119 calories; it's usually closer to 250.</li>
                    <li>A "handful" of almonds can easily exceed 300 calories.</li>
                </ul>
                <p>
                    <strong>The Fix:</strong> Weigh your food. For 14 days, utilize a digital kitchen scale for every gram of food that enters your mouth, especially calorie-dense fats and carbohydrates.
                </p>

                <h2>2. The "Weekend Erase" Phenomenon</h2>
                <p>
                    Your <Link href="/blog/calorie-deficit-guide">daily calorie deficit</Link> is a micro-view; your body operates on the macro-view of the total weekly energy balance.
                </p>
                <p>
                    You can restrict yourself to a pristine 500-calorie deficit from Monday to Friday, heavily restricting carbohydrates. By Friday night, you are physically exhausted and psychologically depleted. A weekend consisting of a few pints at the pub, a heavy Sunday roast, and grazing can instantly inject an uncounted 3,000 surplus calories into your week.
                </p>
                <p>
                    <strong>The Fix:</strong> Adopt a sustainable daily target that prevents the restrictive binge-cycle, and log your weekend intake with the exact same rigor as your Tuesday intake.
                </p>

                <h2>3. A Smaller Body Requires Less Fuel</h2>
                <p>
                    This is the most common reason for a true dietary plateau. Let's say you started at 100kg and successfully lost 10kg. Congratulations! However, a 90kg body requires significantly less energy to oxygenate cells, pump blood, and move around than a 100kg body.
                </p>
                <p>
                    Your basal metabolic rate (BMR) has dropped. The 2,000 calories that used to constitute a deficit are now merely your maintenance level.
                </p>
                <p>
                    <strong>The Fix:</strong> You must <strong>recalculate your TDEE every 10 to 15 lbs lost</strong>.
                </p>

                <h2>4. Uncounted Liquid Calories</h2>
                <p>
                    Liquid calories do not trigger the same satiety signals in the brain as solid food. A large vanilla latte from Costa or Starbucks can easily pack 250-350 calories. Two of those a day entirely wipes out a standard deficit, yet leaves you feeling like you haven't eaten anything.
                </p>
                <p>
                    <strong>The Fix:</strong> Transition to black coffee, Americanos, green tea, or zero-calorie diet beverages. Do not drink your daily caloric budget.
                </p>

                <h2>5. High Cortisol and Water Retention</h2>
                <p>
                    Sometimes, you truly are in a caloric deficit, and you are actively losing fat tissue, but the bathroom scale lies to you.
                </p>
                <p>
                    Severe caloric restriction acts as a deep physiological stressor. This releases <strong>cortisol</strong>. Chronically elevated cortisol levels cause extreme fluid retention. You might lose 2lbs of fat in a week, but retain 3lbs of water due to stress, lack of sleep, or a heavy weightlifting session. The scale goes up, inducing panic.
                </p>
                <p>
                    <strong>The Fix:</strong> Look at 4-week moving averages, not daily fluctuations. Prioritize 8 hours of sleep. If the plateau persists despite verified tracking, take a 3-day "Diet Break" and eat at maintenance calories to flush the stress and drop the water weight.
                </p>

                <div className="space-y-6 mt-12 mb-8 border-t border-slate-200 dark:border-slate-800 pt-8">
                    <h3 className="text-2xl font-bold pb-2">Frequently Asked Diagnostics</h3>
                    {articleFaqs.map((faq, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <h4 className="font-bold mb-2">{faq.question}</h4>
                            <p className="text-sm m-0 text-slate-600 dark:text-slate-400">{faq.answer}</p>
                        </div>
                    ))}
                </div>

            </BlogPostLayout>
        </>
    );
}
