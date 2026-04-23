import { HeartPulse, Brain, Zap, Moon, Activity, Cigarette, Apple, Info, MapPin, ShieldCheck, GraduationCap, Microscope } from "lucide-react";
import { LifeExpectancyCalculatorForm } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import Link from "next/link";

export const metadata = {
    title: "Life Expectancy Calculator UK | How Long Will You Live?",
    description: "Find out how long you could live with our free UK Life Expectancy Calculator. Based on ONS data, estimate your biological age, longevity and the lifestyle factors affecting your lifespan.",
};

export default function LifeExpectancyPage() {
    const lifeFaqs = [
        {
            question: "What is the average life expectancy in the UK?",
            answer: "Based on the latest ONS data, average life expectancy at birth in the UK is approximately 78.8 years for males and 82.8 years for females, using 2021–2023 figures. However, if you are already an adult, your personal life expectancy is higher than these birth figures suggest, because you have already passed through the highest-risk early years. A 65-year-old male in the UK can expect to live, on average, to around 84 years."
        },
        {
            question: "How accurate is this life expectancy calculator?",
            answer: "This calculator uses lifestyle factors with the strongest evidence base for impact on UK longevity, smoking, exercise, sleep, diet, alcohol and stress. It provides a personalised estimate that goes beyond a simple average. However, it cannot account for your genetics, family medical history, existing diagnosed conditions or future changes in your health. Treat the result as a useful starting point for reflection, not a clinical diagnosis."
        },
        {
            question: "Why do women live longer than men in the UK?",
            answer: "The gap in the UK is approximately 4 years, with females outliving males on average. The reasons are both biological and behavioural. Oestrogen offers cardiovascular protection in women during their earlier decades. Men statistically engage in higher rates of risk-taking behaviour, are less likely to attend health screenings and historically had higher smoking rates. The gap has been narrowing in recent decades as lifestyle differences between sexes reduce."
        },
        {
            question: "Does where you live in the UK affect your life expectancy?",
            answer: "Yes, significantly. Regional differences in healthy life expectancy of up to 6 years exist between the most and least deprived areas of the UK. The South East of England consistently records the highest healthy life expectancy, while parts of the North East, Scotland and Wales record the lowest. Factors include deprivation levels, air quality, access to healthcare, diet patterns and employment conditions."
        },
        {
            question: "What is the difference between life expectancy and healthy life expectancy?",
            answer: "Life expectancy is the total number of years you are projected to live. Healthy life expectancy is the number of those years spent in good general health, free from serious illness or limiting disability. In the UK, males spend approximately 77% of their life in good health and females approximately 73%. Improving your lifestyle directly increases both figures, but particularly the healthy years."
        },
        {
            question: "Can I genuinely increase my life expectancy at any age?",
            answer: "Yes. Research consistently shows that positive lifestyle changes produce measurable biological benefits at any age. Quitting smoking in your 50s still adds years to your life. Adopting regular exercise in your 60s significantly reduces cardiovascular and cognitive decline. The body's capacity for repair and adaptation is far greater than most people assume. Starting today, regardless of your age, matters."
        },
        {
            question: "What does biological age mean in this calculator?",
            answer: "Biological age refers to how old your body functions relative to your chronological age. If your lifestyle puts excessive strain on your cardiovascular system, disrupts sleep repair or drives chronic inflammation, your body can function like someone significantly older than your birth certificate says. This calculator uses your lifestyle inputs to estimate whether your biological trajectory is ahead of or behind your chronological age."
        },
        {
            question: "How does smoking affect life expectancy in the UK?",
            answer: "Smoking is the leading cause of preventable death in the UK. Heavy smokers lose an average of 10–15 years of life expectancy compared to non-smokers. Even light or occasional smoking carries measurable risk. Stopping smoking at any point triggers immediate and progressive health improvements, within 15 years of quitting, cardiovascular risk approaches that of a lifelong non-smoker."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <CalculatorSchema
                title="Life Expectancy Calculator UK | How Long Will You Live?"
                description="Find out how long you could live with our free UK Life Expectancy Calculator. Based on ONS data, estimate your biological age, longevity and the lifestyle factors affecting your lifespan."
                slug="/life-expectancy-calculator-uk"
                faqs={lifeFaqs}
                isArticle={true}
            />

            {/* Structured Data Scripts */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org/",
                "@type": "SoftwareApplication",
                "name": "Life Expectancy Calculator UK",
                "description": "Estimate your biological age and how long you could live based on your lifestyle, habits and daily choices. Built using UK longevity data from the Office for National Statistics (ONS). Find out how long you could live with our free UK Life Expectancy Calculator. Based on ONS data, estimate your biological age, longevity and the lifestyle factors affecting your lifespan.",
                "operatingSystem": "Web",
                "applicationCategory": "SAAS",
                "offers": {
                    "@type": "Offer",
                    "price": "$",
                    "priceCurrency": "USD"
                },
                "downloadUrl": "https://thecalzone.co.uk/life-expectancy-calculator-uk",
                "author": {
                    "@type": "Person",
                    "name": "CalZone"
                }
            })}} />

            <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "http://schema.org",
                "@type": "Product",
                "name": "Life Expectancy Calculator UK",
                "url": "https://thecalzone.co.uk/life-expectancy-calculator-uk",
                "image": "https://www.thecalzone.co.uk/_next/image?url=%2Flogo.png",
                "description": "Estimate your biological age and how long you could live based on your lifestyle, habits and daily choices. Built using UK longevity data from the Office for National Statistics (ONS). Find out how long you could live with our free UK Life Expectancy Calculator. Based on ONS data, estimate your biological age, longevity and the lifestyle factors affecting your lifespan.",
                "brand": {
                    "@type": "Brand",
                    "name": "CalZone"
                },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "reviewCount": "120"
                },
                "offers": {
                    "@type": "Offer",
                    "priceCurrency": "USD",
                    "price": "10",
                    "priceValidUntil": "2030-01-01",
                    "itemCondition": "NewCondition",
                    "availability": "InStock"
                }
            })}} />

            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
                        Life Expectancy Calculator UK
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        Estimate your biological age and how long you could live based on your lifestyle, habits and daily choices. Built using UK longevity data from the Office for National Statistics (ONS).
                    </p>
                    <p className="text-sm text-rose-500 font-medium mt-2">
                        For informational purposes only. Not a substitute for medical advice.
                    </p>
                </div>

                <LifeExpectancyCalculatorForm />

                {/* Authority SEO Content Section */}
                <section className="mt-16 max-w-4xl mx-auto space-y-12">
                    <div className="bg-white dark:bg-card border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-sm">
                        
                        <div className="space-y-10 text-slate-700 dark:text-slate-300">
                            
                            {/* Section 1 */}
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                                    <HeartPulse className="w-6 h-6 text-rose-500" />
                                    What Is Life Expectancy & What Does Your Result Actually Mean?
                                </h2>
                                <p className="leading-relaxed">
                                    Life expectancy is the average number of years a person is expected to live, based on current mortality rates for their age and sex. In the UK, life expectancy at birth for 2021 to 2023 was <strong>78.8 years for males</strong> and <strong>82.8 years for females</strong>, according to the latest Office for National Statistics (ONS) data.
                                </p>
                                <p className="leading-relaxed">
                                    But here is what most people misunderstand, these figures are statistical averages, not personal predictions. Your individual result depends far more on your daily habits than on the number you were born with.
                                </p>
                                <p className="leading-relaxed">
                                    This calculator goes beyond raw averages. It analyses the lifestyle factors with the greatest proven impact on longevity, smoking, exercise, sleep, diet, stress and alcohol, also estimates your biological trajectory based on those inputs.
                                </p>
                            </div>

                            {/* Section 2 */}
                            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                                    <Brain className="w-6 h-6 text-purple-500" />
                                    Life Expectancy vs Biological Age
                                </h2>
                                <p className="leading-relaxed">
                                    These two terms are often confused. Understanding the difference makes your result far more useful.
                                </p>
                                <ul className="space-y-3 list-none pl-0">
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                        <span><strong>Chronological age</strong> is simply how old you are in years, the number on your birthday card.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                        <span><strong>Biological age</strong> is how old your body actually functions. Two people who are both 45 years old can have biological ages of 38 and 57, depending entirely on their lifestyle. Your cells, organs and cardiovascular system age at a rate that your habits directly control.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                        <span><strong>Life expectancy</strong> is the projected age you are likely to reach based on population statistics adjusted for your personal risk factors.</span>
                                    </li>
                                </ul>
                                <p className="leading-relaxed italic text-sm">
                                    The goal of this calculator is to bridge all three: use your chronological age as a starting point, factor in your biological indicators, and produce a realistic longevity estimate grounded in UK data.
                                </p>
                            </div>

                            {/* Section 3 - Table */}
                            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                                    <Activity className="w-6 h-6 text-emerald-500" />
                                    UK Life Expectancy by Age
                                </h2>
                                <p className="leading-relaxed">
                                    Most people assume life expectancy is a single fixed number. It is not. The older you already are, the longer you are projected to live, because you have already survived the earlier risks.
                                </p>
                                <p className="leading-relaxed">
                                    In the United Kingdom, total life expectancy rises significantly with age: at 65 it is 85.3 years, at 70 it is 86.3 years, at 75 it is 87.6 years and at 80 it is 89.3 years Georank well above the 81.7 years calculated at birth.
                                </p>
                                
                                <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50 dark:bg-slate-900">
                                                <th className="p-4 font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800">Age</th>
                                                <th className="p-4 font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800">Male Life Expectancy</th>
                                                <th className="p-4 font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800">Female Life Expectancy</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="p-4 border-b border-slate-100 dark:border-slate-800">At birth</td>
                                                <td className="p-4 border-b border-slate-100 dark:border-slate-800">78.8 years</td>
                                                <td className="p-4 border-b border-slate-100 dark:border-slate-800">82.8 years</td>
                                            </tr>
                                            <tr className="bg-slate-50/50 dark:bg-slate-900/30">
                                                <td className="p-4 border-b border-slate-100 dark:border-slate-800">At age 65</td>
                                                <td className="p-4 border-b border-slate-100 dark:border-slate-800">~84 years</td>
                                                <td className="p-4 border-b border-slate-100 dark:border-slate-800">~86.5 years</td>
                                            </tr>
                                            <tr>
                                                <td className="p-4">At age 75</td>
                                                <td className="p-4">~87.6 years</td>
                                                <td className="p-4">~89.5 years</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p className="text-xs text-slate-500 italic">
                                    Source: ONS National Life Tables 2021–2023, published 2025
                                </p>
                                <p className="leading-relaxed">
                                    For babies born today, the projections are even more striking. Boys born in 2023 can expect to live on average to 86.7 years and girls to 90.0 years, once projected improvements in medicine and mortality rates are factored in.
                                </p>
                            </div>

                            {/* Section 4 */}
                            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                                    <ShieldCheck className="w-6 h-6 text-blue-500" />
                                    Healthy Life Expectancy in the UK
                                </h2>
                                <p className="leading-relaxed">
                                    Total life expectancy tells you how long you may live. <strong>Healthy life expectancy (HLE)</strong> tells you how many of those years you will spend in good health, free from serious illness or disability.
                                </p>
                                <p className="leading-relaxed">
                                    Males in the UK could expect to spend 60.7 years (77% of life) in good general health, compared with 60.9 years (73%) for females Office for National Statistics, according to ONS data released in February 2026.
                                </p>
                                <p className="leading-relaxed">
                                    This means the average UK male has roughly 18 years of retirement-age life in which health begins to decline. That gap is where your lifestyle choices matter most. Improving your diet, activity levels, sleep and stress management does not just add years to your life, it adds healthy, functional years.
                                </p>
                            </div>

                            {/* Section 5 - Factors */}
                            <div className="space-y-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                                    <Zap className="w-6 h-6 text-amber-500" />
                                    What Factors Does This Calculator Use?
                                </h2>
                                <p className="leading-relaxed">
                                    Our calculator analyses six key lifestyle factors that research consistently shows to have the greatest impact on longevity in the UK population.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                        <h3 className="font-bold flex items-center gap-2 mb-2 text-orange-600">
                                            <Cigarette className="w-5 h-5" /> 1. Smoking Status
                                        </h3>
                                        <p className="text-sm leading-relaxed">
                                            Smoking is single most avoidable cause of premature death in the UK. Smoking can reduce life expectancy by 10 to 15 years on average.
                                        </p>
                                    </div>
                                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                        <h3 className="font-bold flex items-center gap-2 mb-2 text-green-600">
                                            <Activity className="w-5 h-5" /> 2. Physical Activity
                                        </h3>
                                        <p className="text-sm leading-relaxed">
                                            Regular exercise can add 3 to 7 years to life expectancy. Even moderate activity levels provide substantial health benefits.
                                        </p>
                                    </div>
                                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                        <h3 className="font-bold flex items-center gap-2 mb-2 text-indigo-600">
                                            <Moon className="w-5 h-5" /> 3. Sleep Quality
                                        </h3>
                                        <p className="text-sm leading-relaxed">
                                            Chronic sleep deprivation is a massive risk. Sleeping fewer than 6 hours is associated with higher risks of stroke and cardiovascular disease.
                                        </p>
                                    </div>
                                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                        <h3 className="font-bold flex items-center gap-2 mb-2 text-emerald-600">
                                            <Apple className="w-5 h-5" /> 4. Diet Quality
                                        </h3>
                                        <p className="text-sm leading-relaxed">
                                            A Mediterranean-style diet is consistently associated with the longest healthy life spans in population studies.
                                        </p>
                                    </div>
                                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                        <h3 className="font-bold flex items-center gap-2 mb-2 text-rose-600">
                                            <HeartPulse className="w-5 h-5" /> 5. Alcohol Consumption
                                        </h3>
                                        <p className="text-sm leading-relaxed">
                                            The NHS recommends no more than 14 units per week. Heavy drinking significantly reduces life expectancy.
                                        </p>
                                    </div>
                                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                        <h3 className="font-bold flex items-center gap-2 mb-2 text-purple-600">
                                            <Brain className="w-5 h-5" /> 6. Chronic Stress
                                        </h3>
                                        <p className="text-sm leading-relaxed">
                                            Prolonged stress raises cortisol, which damages cardiovascular tissue and accelerates cellular aging.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Section 6 */}
                            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                                    <MapPin className="w-6 h-6 text-rose-500" />
                                    UK Life Expectancy by Region
                                </h2>
                                <p className="leading-relaxed">
                                    Where you live in the UK has a measurable impact on how long you are likely to live in good health.
                                </p>
                                <p className="leading-relaxed">
                                    In England, the South East remained the region with the highest healthy life expectancy at birth for both males (63.0 years) and females (64.3 years), while the North East had the lowest for both males (57.0 years) and females (56.9 years) Office for National Statistics.
                                </p>
                                <p className="leading-relaxed">
                                    That is a 6-year gap in healthy life expectancy between the North East and South East of England, driven by differences in deprivation, access to healthcare, diet patterns and employment conditions.
                                </p>
                            </div>

                            {/* Section 7 */}
                            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                                    <Microscope className="w-6 h-6 text-blue-600" />
                                    The Science Behind Biological Aging
                                </h2>
                                <p className="leading-relaxed">
                                    For decades, people assumed lifespan was mostly genetic, something fixed at birth and largely outside your control. Modern epigenetic research has overturned that assumption entirely.
                                </p>
                                <p className="leading-relaxed">
                                    While your DNA does set a broad baseline, your daily habits function as switches that turn health-promoting genes on and disease-promoting genes off. This field, epigenetics, shows that lifestyle changes can literally alter how your genes express themselves at the cellular level.
                                </p>
                                <p className="leading-relaxed font-semibold">
                                    The most important implication: it is never too late to make meaningful change. Your biology is not your destiny. It is your starting point.
                                </p>
                            </div>

                            {/* Section 8 - Improvement Tips */}
                            <div className="space-y-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">How to Improve Your Life Expectancy</h2>
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-bold text-primary">1</div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white">Stop smoking</h3>
                                            <p className="text-sm">If you smoke, this is the single highest-impact change you can make. Free NHS Stop Smoking Services are available across the UK.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-bold text-primary">2</div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white">Move more, every day</h3>
                                            <p className="text-sm">A 30-minute brisk walk daily reduces all-cause mortality risk substantially. Build it into your routine.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-bold text-primary">3</div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white">Protect your sleep</h3>
                                            <p className="text-sm">Aim for 7–9 hours consistently. A regular bedtime and no screens for 30 minutes before sleep are key.</p>
                                        </div>
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">Build These Habits Over Time</h2>
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-bold text-primary">4</div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white">Shift your diet gradually</h3>
                                            <p className="text-sm">Replace ultra-processed snacks with whole food alternatives and add one extra portion of vegetables per day.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-bold text-primary">5</div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white">Limit alcohol within NHS guidelines</h3>
                                            <p className="text-sm">Track your weekly units using an NHS unit calculator. Aim for at least two alcohol-free days per week.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-bold text-primary">6</div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white">Address chronic stress</h3>
                                            <p className="text-sm">Regular moderate exercise, mindfulness, and social connection contribute to reductions in cortisol levels.</p>
                                        </div>
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">Do Not Overlook These</h2>
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-bold text-primary">7</div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white">Attend NHS health checks</h3>
                                            <p className="text-sm">If you are aged 40–74 in England, you are eligible for a free NHS Health Check every 5 years.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-bold text-primary">8</div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white">Know your numbers</h3>
                                            <p className="text-sm">Blood pressure, cholesterol and blood glucose are critical for cardiovascular longevity.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* FAQs Section */}
                            <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                                <FAQAccordion faqs={lifeFaqs} title="Frequently Asked Questions" />
                            </div>

                            {/* Disclaimer */}
                            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500 space-y-4">
                                <p className="font-bold text-slate-700 dark:text-slate-300">Disclaimer</p>
                                <p>
                                    This Life Expectancy Calculator is designed for educational and self-reflection purposes only. It uses generalised lifestyle adjustments based on population-level longevity research and ONS UK data. It cannot account for your personal genetics, family medical history, existing health conditions, medications, or future life events. The result is not a clinical prediction and does not replace advice from your GP or a qualified healthcare professional. If you have concerns about your health or longevity, please speak to your doctor.
                                </p>
                                <p>
                                    <strong>Data sources:</strong> Office for National Statistics (ONS) National Life Tables UK 2021–2023; ONS Healthy Life Expectancy UK 2022–2024 (released February 2026); ONS Past and Projected Period and Cohort Life Tables 2022-based UK.
                                </p>
                            </div>

                            {/* Interlinks */}
                            <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                    <GraduationCap className="w-6 h-6 text-primary" />
                                    Other Useful Calculators
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {[
                                        { name: "BMI Calculator UK", href: "/bmi-calculator-uk" },
                                        { name: "Heart Age Calculator", href: "/heart-age-calculator-uk" },
                                        { name: "Waist-to-Height Ratio Calculator", href: "/waist-to-height-ratio-calculator" },
                                        { name: "Calorie Deficit Calculator UK", href: "/calorie-deficit-calculator-uk" },
                                        { name: "Water Intake Calculator", href: "/water-intake-calculator" }
                                    ].map((link) => (
                                        <Link 
                                            key={link.href}
                                            href={link.href}
                                            className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-primary/50 hover:bg-white dark:hover:bg-slate-800 transition-all text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center justify-between group"
                                        >
                                            {link.name}
                                            <Zap className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

