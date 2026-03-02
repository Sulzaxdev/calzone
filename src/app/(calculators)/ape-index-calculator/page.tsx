import { Ruler, Award, TrendingUp, TrendingDown } from "lucide-react";
import { ApeIndexCalculatorForm } from "./calculator";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export const metadata = {
    title: "Ape Index Calculator | Arm Span vs Height Ratio",
    description: "Calculate your Ape Index and discover your unique biomechanical advantages in sports like climbing, swimming, and weightlifting. Understand the science of arm span vs height.",
};

export default function ApeIndexPage() {
    const apeFaqs = [
        {
            question: "What is a good Ape Index?",
            answer: "There is no universally 'good' or 'bad' Ape Index—it depends entirely on your athletic goals. A Positive Ape Index (>0) is highly advantageous in climbing, swimming, boxing, and basketball. A Negative Ape Index (<0) is highly advantageous in Olympic weightlifting, gymnastics, and powerlifting."
        },
        {
            question: "Is it normal to have a Negative Ape Index?",
            answer: "Yes, absolutely. A negative Ape Index (where arm span is shorter than height) is very common and perfectly normal. It's often colloquially referred to as a 'T-Rex' index and gives individuals a massive biomechanical advantage in pressing movements, like the bench press."
        },
        {
            question: "How do climbers use their Ape Index?",
            answer: "In rock climbing and bouldering, a high positive Ape Index provides a distinct advantage. Longer arms allow climbers to reach holds that are further apart, while their relatively shorter torso keeps their center of gravity close to the wall, saving core strength."
        },
        {
            question: "Can my Ape Index change?",
            answer: "For adults whose growth plates have fused, your Ape Index is permanently fixed. However, for children and teenagers, the Ape Index will fluctuate rapidly as their long bones grow at different rates during puberty."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            <CalculatorSchema
                title="Ape Index Calculator | Arm Span vs Height"
                description="Determine your biomechanical advantages in sports by comparing your wingspan to your height."
                slug="/ape-index-calculator"
                faqs={apeFaqs}
            />

            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <ApeIndexCalculatorForm />

                {/* Massive Authority SEO Content Section */}
                <section className="mt-16 max-w-4xl mx-auto space-y-12">
                    <div className="bg-white/80 dark:bg-card/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-lg">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                            <Ruler className="w-8 h-8 text-blue-500" />
                            The Biomechanics of the Ape Index
                        </h2>

                        <div className="space-y-10 text-slate-700 dark:text-slate-300">

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                    What is the Ape Index?
                                </h3>
                                <p className="text-lg leading-relaxed">
                                    The Ape Index, sometimes called the Gorilla Index or wingspan-to-height ratio, is a measure used in anatomy and sports science to describe the ratio of an individual's arm span relative to their standing height.
                                </p>
                                <p className="leading-relaxed">
                                    According to classical proportions (like Leonardo da Vinci’s <em>Vitruvian Man</em>), the average human arm span exactly matches their height, giving a ratio of 1.0, or a difference of 0 inches. However, millions of people naturally deviate from this, granting them unique physiological advantages.
                                </p>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                                    <TrendingUp className="w-6 h-6 text-green-500" /> The Positive Ape Index Advantage
                                </h3>
                                <p className="text-sm dark:text-slate-400 mb-4">
                                    A Positive Ape Index means your arm span is longer than your height. In many elite sports, this is a highly sought-after anatomical trait:
                                </p>
                                <ul className="list-disc pl-5 space-y-2 text-sm dark:text-slate-400">
                                    <li><strong>Swimming:</strong> Elite swimmers typically have a massively positive Ape Index. Michael Phelps, for example, is 6'4" (193 cm) tall but has a wingspan of 6'7" (201 cm). Long arms act like massive paddles, displacing more water per stroke.</li>
                                    <li><strong>Rock Climbing:</strong> Long arms allow climbers to reach distant holds while maintaining a low center of gravity.</li>
                                    <li><strong>Combat Sports:</strong> In boxing and MMA (like Jon Jones or Conor McGregor), a longer wingspan means you can hit your opponent without entering their striking range.</li>
                                </ul>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                                    <TrendingDown className="w-6 h-6 text-red-500" /> The Negative Ape Index Advantage
                                </h3>
                                <p className="text-sm dark:text-slate-400 mb-4">
                                    A Negative Ape Index means your arm span is noticeably shorter than your height. While often jokingly referred to as a "T-Rex" index, it provides massive mechanical leverage in strength sports:
                                </p>
                                <ul className="list-disc pl-5 space-y-2 text-sm dark:text-slate-400">
                                    <li><strong>Powerlifting (Bench Press):</strong> Having shorter arms means the barbell has a significantly shorter distance to travel to complete a literal rep. This is a massive mechanical advantage that allows athletes to lift vastly heavier weights.</li>
                                    <li><strong>Gymnastics:</strong> Shorter levers make complex rotational maneuvers and strict bodyweight holds (like the Iron Cross) far easier on the shoulder joints.</li>
                                </ul>
                            </div>

                            <div className="bg-blue-50 dark:bg-blue-950/30 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/50">
                                <h3 className="text-xl font-bold text-blue-900 dark:text-blue-200 mb-4 flex items-center gap-2">
                                    <Award className="w-6 h-6 text-blue-500" /> Accuracy & Measurement
                                </h3>
                                <p className="text-sm text-blue-800 dark:text-blue-300">
                                    To get the most accurate result, stand flat against a blank wall and spread your arms entirely parallel to the floor. Have a partner measure from the tip of your longest finger on one hand, straight across the back of your shoulders, to the tip of your longest finger on the other hand.
                                </p>
                            </div>

                            {/* FAQs Section */}
                            <FAQAccordion faqs={apeFaqs} title="Biomechanical FAQs" />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
