import Link from "next/link";
import { PregnancyBMIForm } from "./calculator";
import {
    Activity,
    Baby,
    ShieldAlert,
    Heart,
    ChevronRight,
    CheckCircle2,
    Info,
    HelpCircle,
    ArrowRight,
    Scale,
    Timer,
    Utensils,
    AlertCircle
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { allCalculators } from "@/lib/calculators";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";

export const metadata = {
    title: "Pregnancy Weight Gain Calculator UK",
    description: "Not sure how much weight to gain during pregnancy? Use our free Pregnancy Weight Gain Calculator UK to get a personalized guide based on your BMI and week of pregnancy. Based on IoM, NICE, and RCOG guidelines.",
};

export default function PregnancyWeightGainPage() {
    const relatedCalculators = allCalculators
        .filter(c => c.href !== "/pregnancy-weight-gain-calculator" && (c.name.toLowerCase().includes("bmi") || c.name.toLowerCase().includes("calorie") || c.name.toLowerCase().includes("weight") || c.name.toLowerCase().includes("pregnancy")))
        .slice(0, 3);

    const faqs = [
        {
            question: "How much weight should I gain during pregnancy in the UK?",
            answer: "It depends on your pre-pregnancy BMI. For most women with a normal BMI, the recommended total weight gain is between 11.5 and 16 kg across the full pregnancy. If you were underweight before pregnancy, you may need to gain a little more, up to 18 kg. If you were overweight or obese, target is lower, typically between 5 and 11.5 kg. These figures are based on IoM guidelines and are widely used by UK healthcare professionals."
        },
        {
            question: "When do you start gaining weight in pregnancy?",
            answer: "Most women gain very little weight in the first trimester, often less than 2 kg in total. Weight gain really picks up from the second trimester onwards, with a steady gain of around 0.4 to 0.5 kg per week. By the third trimester, you may notice the gain feels more significant as your baby grows rapidly."
        },
        {
            question: "What is a normal weight gain in pregnancy?",
            answer: "Normal weight gain in pregnancy varies depending on your starting BMI. For women with a normal pre-pregnancy BMI, gaining between 11.5 and 16 kg over 40 weeks is considered appropriate. However, individual variation is normal, some women gain a little more or less and still have perfectly healthy pregnancies."
        },
        {
            question: "How much weight do you gain in the third trimester?",
            answer: "Third trimester weight gain is usually around 0.5 kg per week. This is the most active growth period for your baby, so it's natural to gain weight more quickly during these final weeks. In total, you might gain around 4 to 6 kg between weeks 28 and 40."
        },
        {
            question: "How much weight do you gain in early pregnancy?",
            answer: "Weight gain in early pregnancy is usually minimal. Most women gain somewhere between 0.5 and 2 kg in the first trimester. Some women gain nothing at all, especially if morning sickness is a factor."
        },
        {
            question: "How much does the placenta weigh?",
            answer: "The placenta typically weighs around 0.6 to 0.7 kg at full term. It's a remarkable organ that delivers oxygen and nutrients to your baby throughout pregnancy. After birth, it's delivered separately, this is what's often referred to as the \"third stage\" of labour."
        },
        {
            question: "Is it normal to lose weight in the first trimester?",
            answer: "Yes, it can be. If you are experiencing morning sickness or food aversions, losing a small amount of weight in the first trimester is quite common. As long as you are keeping fluids down and eating when you can, this usually isn't a concern. If you're losing significant weight or can't keep food or water down, speak to your GP or midwife."
        },
        {
            question: "How many extra calories do you need when pregnant?",
            answer: "You don't need extra calories in the first trimester. From the second trimester, most women need around an extra 200 calories per day, rising to approximately 300 extra calories in the third trimester. These are rough estimates, your actual needs will depend on your activity level, BMI and how your pregnancy is progressing."
        },
        {
            question: "What is a healthy BMI before pregnancy?",
            answer: "A BMI between 18.5 and 24.9 is considered a healthy weight range for adults. Before pregnancy, knowing your BMI helps you and your healthcare team set appropriate weight gain targets for the months ahead. You can calculate yours using our free BMI Calculator UK."
        },
        {
            question: "Does weight gain differ for twin pregnancies?",
            answer: "Yes, significantly. Women carrying twins are generally advised to gain more weight overall. The recommended range for a twin pregnancy is around 16.8 to 24.5 kg, compared to 11.5 to 16 kg for a singleton pregnancy with a normal BMI. If you are carrying twins, your consultant or specialist midwife will give you more tailored guidance."
        }
    ];

    return (
        <div className="animate-in fade-in duration-700">
            <BreadcrumbSchema items={[
                { name: "Home", item: "/" },
                { name: "Health & Fitness", item: "/fitness-diet" },
                { name: "Pregnancy Weight Gain Calculator", item: "/pregnancy-weight-gain-calculator" }
            ]} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org/",
                        "@type": "SoftwareApplication",
                        "name": "Pregnancy Weight Gain Calculator UK",
                        "description": "Not sure how much weight to gain during pregnancy? Use our free Pregnancy Weight Gain Calculator UK to get a personalized guide based on your BMI and week of pregnancy. The good news is, you don't have to guess. CalZone’s  free UK pregnancy weight gain calculator works it all out for you, based on guidelines from the Institute of Medicine (IoM) and supported by NICE and RCOG recommendations.",
                        "operatingSystem": "Web",
                        "applicationCategory": "SAAS",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "GBP"
                        },
                        "downloadUrl": "https://www.thecalzone.co.uk/pregnancy-weight-gain-calculator",
                        "author": {
                            "@type": "Person",
                            "name": "CalZone"
                        }
                    })
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "http://schema.org",
                        "@type": "Product",
                        "name": "Pregnancy Weight Gain Calculator UK",
                        "url": "https://www.thecalzone.co.uk/pregnancy-weight-gain-calculator",
                        "image": "https://www.thecalzone.co.uk/_next/image?url=%2Flogo.png",
                        "description": "Not sure how much weight to gain during pregnancy? Use our free Pregnancy Weight Gain Calculator UK to get a personalized guide based on your BMI and week of pregnancy. The good news is, you don't have to guess. CalZone’s  free UK pregnancy weight gain calculator works it all out for you, based on guidelines from the Institute of Medicine (IoM) and supported by NICE and RCOG recommendations.",
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
                            "priceCurrency": "GBP",
                            "price": "0",
                            "priceValidUntil": "2030-01-01",
                            "itemCondition": "NewCondition",
                            "availability": "InStock"
                        }
                    })
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "http://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "How much weight should I gain during pregnancy in the UK?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "It depends on your pre-pregnancy BMI. For most women with a normal BMI, the recommended total weight gain is between 11.5 and 16 kg across the full pregnancy. If you were underweight before pregnancy, you may need to gain a little more, up to 18 kg. If you were overweight or obese, target is lower, typically between 5 and 11.5 kg. These figures are based on IoM guidelines and are widely used by UK healthcare professionals."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "When do you start gaining weight in pregnancy?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Most women gain very little weight in the first trimester, often less than 2 kg in total. Weight gain really picks up from the second trimester onwards, with a steady gain of around 0.4 to 0.5 kg per week. By the third trimester, you may notice the gain feels more significant as your baby grows rapidly."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "What is a normal weight gain in pregnancy?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Normal weight gain in pregnancy varies depending on your starting BMI. For women with a normal pre-pregnancy BMI, gaining between 11.5 and 16 kg over 40 weeks is considered appropriate. However, individual variation is normal, some women gain a little more or less and still have perfectly healthy pregnancies."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "How much weight do you gain in the third trimester?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Third trimester weight gain is usually around 0.5 kg per week. This is the most active growth period for your baby, so it's natural to gain weight more quickly during these final weeks. In total, you might gain around 4 to 6 kg between weeks 28 and 40."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "How much weight do you gain in early pregnancy?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Weight gain in early pregnancy is usually minimal. Most women gain somewhere between 0.5 and 2 kg in the first trimester. Some women gain nothing at all, especially if morning sickness is a factor."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "How much does the placenta weigh?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "The placenta typically weighs around 0.6 to 0.7 kg at full term. It's a remarkable organ that delivers oxygen and nutrients to your baby throughout pregnancy. After birth, it's delivered separately, this is what's often referred to as the third stage of labour."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Is it normal to lose weight in the first trimester?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes, it can be. If you are experiencing morning sickness or food aversions, losing a small amount of weight in the first trimester is quite common. As long as you are keeping fluids down and eating when you can, this usually isn't a concern. If you're losing significant weight or can't keep food or water down, speak to your GP or midwife."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "How many extra calories do you need when pregnant?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "You don't need extra calories in the first trimester. From the second trimester, most women need around an extra 200 calories per day, rising to approximately 300 extra calories in the third trimester. These are rough estimates, your actual needs will depend on your activity level, BMI and how your pregnancy is progressing."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "What is a healthy BMI before pregnancy?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "A BMI between 18.5 and 24.9 is considered a healthy weight range for adults. Before pregnancy, knowing your BMI helps you and your healthcare team set appropriate weight gain targets for the months ahead. You can calculate yours using our free BMI Calculator UK."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Does weight gain differ for twin pregnancies?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes, significantly. Women carrying twins are generally advised to gain more weight overall. The recommended range for a twin pregnancy is around 16.8 to 24.5 kg, compared to 11.5 to 16 kg for a singleton pregnancy with a normal BMI. If you are carrying twins, your consultant or specialist midwife will give you more tailored guidance."
                                }
                            }
                        ]
                    })
                }}
            />
            {/* HERO & CALCULATOR SECTION */}
            <section className="container mx-auto px-4 pb-12">
                <PregnancyBMIForm />
            </section>

            {/* CONTENT & INFORMATION SECTION */}
            <section className="container mx-auto px-4 py-16 max-w-5xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-16">
                        {/* Intro */}
                        <div className="space-y-6">


                            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">How Much Weight Should You Gain During Pregnancy?</h2> <br />
                                <p>
                                    Pregnancy is one of the most incredible journeys a woman can go through. But it comes with a lot of questions and one of the most common ones is: "Am I gaining the right amount of weight?"
                                </p>
                                <p>The honest answer? It depends on your body.</p>  <br />
                                <p>
                                    Your healthy weight gain range during pregnancy is based on your pre-pregnancy BMI. That means two women at the same stage of pregnancy might have completely different targets and both can be perfectly healthy.
                                </p> <br />
                                <p>
                                    As a general guide, most women with a normal BMI should gain around 11.5 to 16 kg over their entire pregnancy. But if you were underweight before pregnancy, you may need to gain a little more. If you were overweight, a little less.
                                </p> <br />
                                <p>
                                    The good news is, you don't have to guess. <Link href="/" className="text-pink-600 hover:text-pink-700 font-semibold underline decoration-pink-200 underline-offset-4">CalZone’s</Link> free UK pregnancy weight gain calculator works it all out for you, based on guidelines from the Institute of Medicine (IoM) and supported by NICE and RCOG recommendations.
                                </p>
                                <p>
                                    Simply enter your height, pre-pregnancy weight, current weight and your week of pregnancy. We will do the rest.
                                </p>
                            </div>
                        </div>

                        {/* Chart Section */}
                        <div className="space-y-8 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                                <span className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-xl">
                                    <Activity className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                                </span>
                                Pregnancy Weight Gain Chart by Week (UK Guide)
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Not everyone gains weight at the same pace and that's completely normal. Weight gain tends to be slow in the first trimester and then picks up steadily from around week 13 onwards.
                            </p>

                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">The chart below gives you a rough idea of how much weight you might expect to gain each week, broken down by your pre-pregnancy BMI category.</p>

                            <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold tracking-widest">
                                        <tr>
                                            <th className="px-4 py-4">Week of Pregnancy</th>
                                            <th className="px-4 py-4">Underweight (BMI &lt; 18.5)</th>
                                            <th className="px-4 py-4">Normal (BMI 18.5–24.9)</th>
                                            <th className="px-4 py-4">Overweight (BMI 25–29.9)</th>
                                            <th className="px-4 py-4">Obese (BMI &gt; 30)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                        <tr>
                                            <td className="px-4 py-4 font-semibold">Week 12</td>
                                            <td className="px-4 py-4">1.5 – 2 kg</td>
                                            <td className="px-4 py-4">1 – 1.5 kg</td>
                                            <td className="px-4 py-4">0.5 – 1 kg</td>
                                            <td className="px-4 py-4">0 – 0.5 kg</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-4 font-semibold">Week 20</td>
                                            <td className="px-4 py-4">4 – 5 kg</td>
                                            <td className="px-4 py-4">3.5 – 4.5 kg</td>
                                            <td className="px-4 py-4">2.5 – 3.5 kg</td>
                                            <td className="px-4 py-4">1.5 – 2.5 kg</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-4 font-semibold">Week 28</td>
                                            <td className="px-4 py-4">7 – 8 kg</td>
                                            <td className="px-4 py-4">6.5 – 7.5 kg</td>
                                            <td className="px-4 py-4">5 – 6 kg</td>
                                            <td className="px-4 py-4">3.5 – 4.5 kg</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-4 font-semibold">Week 36</td>
                                            <td className="px-4 py-4">11 – 12 kg</td>
                                            <td className="px-4 py-4">10 – 11 kg</td>
                                            <td className="px-4 py-4">8 – 9 kg</td>
                                            <td className="px-4 py-4">6 – 7 kg</td>
                                        </tr>
                                        <tr className="bg-pink-50/30 dark:bg-pink-900/10">
                                            <td className="px-4 py-4 font-bold text-pink-600 dark:text-pink-400">Week 40</td>
                                            <td className="px-4 py-4 font-semibold">12.5 – 18 kg</td>
                                            <td className="px-4 py-4 font-semibold">11.5 – 16 kg</td>
                                            <td className="px-4 py-4 font-semibold">7 – 11.5 kg</td>
                                            <td className="px-4 py-4 font-semibold">5 – 9 kg</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                                These figures are based on IoM 2009 pregnancy weight gain guidelines, which are widely used by healthcare professionals across the UK. They give a realistic pregnancy weight graph to follow, not a strict rulebook.
                                If your weight gain looks a bit different week to week, don't panic. Fluctuations are normal. What matters more is the overall trend across your pregnancy.

                            </p>
                        </div>

                        {/* BMI Categories */}
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">

                                Understanding Your BMI and Pregnancy Weight Gain
                            </h2>
                            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed">
                                <p>
                                    Your pre-pregnancy BMI (body mass index) plays a big role in how much weight you should gain. It helps your midwife or GP set a healthy target that's right for your body, not just an average number pulled from a chart.
                                </p> <br />
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">What Is a Healthy BMI Before Pregnancy?</h3>
                                <p className="">
                                    BMI is calculated using your height and weight. It gives a general indication of whether your weight is in a healthy range for your height. Before pregnancy, a BMI between 18.5 and 24.9 is considered normal.Once you are pregnant, your pre-pregnancy BMI is used to estimate your recommended weight gain range across all 40 weeks.

                                </p> <br />
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recommended Weight Gain by BMI Category
                                </h3>
                                <p>Here is a simple breakdown of what's generally recommended, based on IoM guidelines:
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
                                    <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">Underweight (BMI under 18.5)</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">If you were underweight before pregnancy, you will likely need to gain a bit more weight than average. The recommended range is around 12.5 to 18 kg for a single baby pregnancy.</p>
                                </div>
                                <div className="p-6 bg-green-50/50 dark:bg-green-900/20 rounded-2xl border border-green-100 dark:border-green-800">
                                    <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">Normal Weight (BMI 18.5–24.9)</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">For most women, the recommended total weight gain sits between 11.5 and 16 kg. Aiming for around 0.4 kg per week in the second and third trimesters is a good rule of thumb.</p>
                                </div>
                                <div className="p-6 bg-yellow-50/50 dark:bg-yellow-900/20 rounded-2xl border border-yellow-100 dark:border-yellow-800">
                                    <h4 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">Overweight (BMI 25–29.9)</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">The guidance is to gain a little less, around 7 to 11.5 kg in total. This helps reduce the risk of complications during labour and delivery.</p>
                                </div>
                                <div className="p-6 bg-red-50/50 dark:bg-red-900/20 rounded-2xl border border-red-100 dark:border-red-800">
                                    <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">Obese (BMI over 30)</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Generally advised to gain between 5 and 9 kg during pregnancy. It's still important to gain some weight, your baby needs it.</p>
                                </div>
                            </div>

                            <div className="p-6 bg-slate-900 dark:bg-slate-800 rounded-3xl text-white">
                                <h4 className="font-bold text-pink-400 mb-2 flex items-center gap-2">
                                    <Baby className="w-5 h-5" /> Twin or Multiple Pregnancy
                                </h4>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    Carrying twins? The targets are higher. The National Academy of Medicine recommends a total gain of around 16.8 to 24.5 kg for twin pregnancies and approximately 23 to 36 kg for triplets.
                                </p>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="space-y-10">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                                <span className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-xl">
                                    <Timer className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                                </span>
                                When Do You Start Gaining Weight in Pregnancy?
                            </h2>

                            <div className="space-y-12">
                                <div className="relative pl-8 border-l-2 border-pink-100 dark:border-pink-900/40">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-pink-500"></div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Weight Gain in the First Trimester</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Most women gain very little in the first 12 weeks. We are talking somewhere between 0.5 and 2 kg in total, sometimes even less. In fact, if you are suffering from morning sickness, you might actually lose a little weight early on.
                                    </p> <br />

                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">That's completely normal and nothing to worry about.
                                        Your baby is tiny at this stage. The weight gain you experience in early pregnancy is mostly down to changes in your blood volume and your body starting to build up its stores.
                                    </p>
                                </div>

                                <div className="relative pl-8 border-l-2 border-pink-100 dark:border-pink-900/40">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-pink-500"></div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Weight Gain in the Second Trimester</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        From around week 13, most women begin gaining weight more steadily, roughly 0.4 to 0.5 kg per week if your BMI is in the normal range. Your body is expanding blood volume and laying down fat stores to prepare for breastfeeding.
                                    </p>
                                </div>

                                <div className="relative pl-8 border-l-2 border-pink-100 dark:border-pink-900/40">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-pink-500"></div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Weight Gain in the Third Trimester</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        The third trimester brings the most noticeable weight gain. Your baby is putting on weight rapidly in these final weeks, and most women gain around 0.5 kg per week during this stage.
                                    </p> <br />
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Third trimester weight gain can feel quite sudden, but it's your body doing exactly what it should. Your baby is building fat under their skin, your amniotic fluid levels are at their highest and your body is preparing for labour</p>
                                </div>
                            </div>
                        </div>

                        {/* Breakdown Table */}
                        <div className="space-y-8 bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Where Does Pregnancy Weight Gain Actually Go?</h2>
                            <p className="text-slate-600 dark:text-slate-400">
                                A lot of women are surprised to learn that pregnancy weight gain isn't just body fat. In fact, the majority of the weight you gain goes towards supporting your baby and your body's changing needs. Here is a realistic breakdown of where that weight typically goes.


                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { item: "Baby", weight: "~3.4 kg" },
                                    { item: "Placenta", weight: "~0.7 kg" },
                                    { item: "Amniotic fluid", weight: "~0.8 kg" },
                                    { item: "Uterine growth", weight: "~0.9 kg" },
                                    { item: "Increased blood volume", weight: "~1.2 – 1.5 kg" },
                                    { item: "Extra body fluid", weight: "~1.2 – 1.5 kg" },
                                    { item: "Breast tissue growth", weight: "~0.4 kg" },
                                    { item: "Fat and nutrient stores", weight: "~2.7 – 3.6 kg" },
                                ].map((row, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                                        <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">{row.item}</span>
                                        <span className="text-sm font-bold text-pink-600 dark:text-pink-400">{row.weight}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400">So when you look at it this way, a significant portion of your pregnancy weight gain is made up of your baby, placenta, amniotic fluid and the essential fluids your body needs to keep everything running. The fat stores are there for a reason too, they fuel breastfeeding and recovery after birth.
                            <br />
                            Research behind these figures comes from the IoM's 2009 report and the foundational work by Hytten and Chamberlain in Clinical Physiology in Obstetrics. These are the most widely cited sources used to understand maternal weight gain components during singleton pregnancies.
                        </p>
                        {/* Nutrition */}
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                                <span className="p-2 bg-green-100 dark:bg-green-900/30 rounded-xl">
                                    <Utensils className="w-6 h-6 text-green-600 dark:text-green-400" />
                                </span>
                                What Should You Eat?
                            </h2>
                            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed">
                                <p>
                                    You don't need to "eat for two", that's a myth. But you do need to eat well. From around the second trimester, most women need roughly an extra 200–300 calories per day.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { title: "Folate & Folic Acid", desc: "Helps protect against neural tube defects. NHS recommends 400 mcg daily until 12 weeks." },
                                    { title: "Iron", desc: "Body needs nearly double to produce more blood. Found in red meat, lentils, and spinach." },
                                    { title: "Calcium", desc: "Supports baby's bones and teeth. Dairy, fortified milks, and broccoli are great sources." },
                                    { title: "Vitamin D", desc: "Works with calcium for strong bones. NHS recommends 10 mcg daily supplement." },
                                    { title: "Protein", desc: "Essential for growth. Eggs, chicken, fish, beans, and tofu are excellent choices." }
                                ].map((nut, i) => (
                                    <div key={i} className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                                        <h4 className="font-bold text-slate-900 dark:text-white mb-2">{nut.title}</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">{nut.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="p-8 bg-red-50/50 dark:bg-red-900/20 rounded-[2rem] border border-red-100 dark:border-red-900/40">
                                <h4 className="font-bold text-red-700 dark:text-red-300 mb-4 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-red-500" /> What to Avoid
                                </h4>
                                <p className="text-sm text-red-900/70 dark:text-red-300/70 leading-relaxed">
                                    Some foods carry risks during pregnancy: raw or undercooked meat, unpasteurised dairy, raw shellfish, high-mercury fish (shark, swordfish) and alcohol.The NHS has a full list of foods to avoid during pregnancy, it is worth a read if you haven't already.
                                    Want to know exactly how many calories you need each week? Try our Pregnancy <a href="https://www.thecalzone.co.uk/calorie-deficit-calculator-uk" className="text-pink-600 hover:text-pink-700 font-semibold underline decoration-pink-200 underline-offset-4">Pregnancy Calorie Calculator</a> for a trimester-by-trimester breakdown.

                                </p>
                            </div>
                        </div>

                        {/* FAQ SECTION */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                                <HelpCircle className="w-6 h-6 text-primary" />
                                <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
                            </div>
                            <Accordion type="single" collapsible className="w-full space-y-4">
                                {faqs.map((faq, i) => (
                                    <AccordionItem key={i} value={`item-${i}`} className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden px-4 sm:px-6">
                                        <AccordionTrigger className="text-left font-bold py-6 hover:no-underline hover:text-primary transition-colors">
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-slate-600 dark:text-slate-400 pb-6">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* MEDICAL DISCLAIMER */}
                        <div className="p-8 rounded-3xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 relative overflow-hidden group">
                            <div className="relative z-10 space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 text-[10px] font-bold uppercase tracking-widest">
                                    <ShieldAlert className="w-3 h-3" />
                                    Medical Disclaimer
                                </div>
                                <h3 className="text-xl font-bold text-amber-700 dark:text-amber-400">Consult Your Doctor</h3>
                                <p className="text-amber-600/80 dark:text-amber-400/80 text-sm leading-relaxed">
                                    This calculator is for educational purposes only and does not replace professional medical advice. Always consult your healthcare provider or midwife for personalized health plans.
                                </p>
                            </div>
                        </div>

                        {/* RELATED CALCULATORS */}
                        <div className="p-8 rounded-3xl bg-slate-900 dark:bg-slate-900 border border-slate-800 text-white space-y-6">
                            <h3 className="text-xl font-bold border-b border-white/10 pb-4">Up Next</h3>
                            <div className="space-y-4">
                                {relatedCalculators.map((calc) => (
                                    <Link key={calc.name} href={calc.href} className="flex items-center justify-between group p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-primary/20 rounded-lg text-primary group-hover:scale-110 transition-transform">
                                                <Activity className="w-4 h-4" />
                                            </div>
                                            <span className="text-sm font-semibold">{calc.name}</span>
                                        </div>
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                    </Link>
                                ))}
                            </div>
                            <Button variant="outline" className="w-full border-white/20 hover:bg-white text-white hover:text-slate-900 font-bold py-6 rounded-2xl transition-all" asChild>
                                <Link href="/">Explore All Tools</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
