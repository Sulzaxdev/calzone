import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Scale, Heart, Baby, Droplets, Moon, Coffee, Accessibility } from "lucide-react";

export default function Home() {
  const categories = [
    {
      title: "General Health / Lifestyle",
      icon: <Activity className="h-6 w-6 text-primary" />,
      calculators: [
        { name: "Bra Size Calculator", href: "/calculators/bra-size", desc: "US Standard Sizing" },
        { name: "Child Growth Chart", href: "/calculators/child-growth", desc: "Estimate height/weight percentiles" },
        { name: "BMI Calculator", href: "/calculators/bmi", desc: "Body Mass Index" },
        { name: "Reverse BMI", href: "/calculators/reverse-bmi", desc: "Find weight for a target BMI" },
        { name: "Child BMI", href: "/calculators/child-bmi", desc: "BMI percentile for children" },
        { name: "Pregnancy BMI", href: "/calculators/pregnancy-bmi", desc: "Healthy weight gain during pregnancy" },
        { name: "BMR Calculator", href: "/calculators/bmr", desc: "Basal Metabolic Rate" },
        { name: "Heart Age", href: "/calculators/heart-age", desc: "Estimate your cardiovascular age" },
        { name: "Waist-to-Height", href: "/calculators/waist-height-ratio", desc: "Better indicator than BMI" },
        { name: "Life Expectancy", href: "/calculators/life-expectancy", desc: "Estimate based on habits" },
        { name: "Frailty Score", href: "/calculators/frailty-score", desc: "Assess physical decline" },
        { name: "Ape Index", href: "/calculators/ape-index", desc: "Arm span vs height ratio" },
        { name: "Visceral Fat", href: "/calculators/visceral-fat", desc: "Estimate hidden belly fat" },
      ],
    },
    {
      title: "Fitness & Diet",
      icon: <Scale className="h-6 w-6 text-primary" />,
      calculators: [
        { name: "Calorie Deficit", href: "/calculators/calorie-deficit", desc: "Calculate weight loss calories" },
        { name: "VO2 Max", href: "/calculators/vo2-max", desc: "Maximal oxygen uptake" },
        { name: "Water Intake", href: "/calculators/water-intake", desc: "Daily hydration needs" },
        { name: "Intermittent Fasting", href: "/calculators/intermittent-fasting", desc: "Eating window planner" },
        { name: "Water Fast", href: "/calculators/water-fast", desc: "Estimate weight loss during fast" },
      ],
    },
    {
      title: "Finance & Driving",
      icon: <Activity className="h-6 w-6 text-primary" />,
      calculators: [
        { name: "Holiday Budget", href: "/calculators/holiday", desc: "Estimate your vacation cost" },
        { name: "Annual Leave", href: "/calculators/annual-leave", desc: "UK statutory holiday entitlement" },
        { name: "Mileage Claim", href: "/calculators/mileage", desc: "Calculate business travel expense" },
        { name: "Road Tax", href: "/calculators/road-tax", desc: "UK Vehicle Excise Duty" },
        { name: "Fuel Cost", href: "/calculators/fuel-cost", desc: "Journey petrol/diesel cost" },
        { name: "Speeding Fine", href: "/calculators/speeding-fine", desc: "UK Penalty Guidelines" },
        { name: "Car Insurance", href: "/calculators/car-insurance", desc: "Rough premium estimator" },
        { name: "Car Write-Off", href: "/calculators/car-write-off", desc: "Estimate damage vs value" },
        { name: "Drink Drive Limit", href: "/calculators/drink-drive-limit", desc: "Estimate BAC levels" },
        { name: "Taxi Fare", href: "/calculators/taxi-fare", desc: "UK cab fare estimator" },
        { name: "EV Charging Cost", href: "/calculators/ev-charging-cost", desc: "Calculate home/public charging" },
      ],
    },
    {
      title: "Home & Property",
      icon: <Activity className="h-6 w-6 text-primary" />,
      calculators: [
        { name: "BTU Radiator", href: "/calculators/btu", desc: "Calculate room heating needs" },
        { name: "Roof Replacement", href: "/calculators/roof-replacement-cost", desc: "Estimate new pitched roof cost" },
        { name: "Flat Roof Cost", href: "/calculators/flat-roof-replacement-cost", desc: "Estimate flat roof replacement" },
        { name: "Removal Costs", href: "/calculators/removal-costs", desc: "Estimate house moving fees" },
        { name: "Heat Pump Cost", href: "/calculators/heat-pump-cost", desc: "UK heat pump estimator" },
        { name: "Double Glazing", href: "/calculators/double-glazing-cost", desc: "Estimate new windows cost" },
        { name: "Tree Removal", href: "/calculators/tree-removal-cost", desc: "Estimate tree felling costs" },
        { name: "Soffit & Fascia", href: "/calculators/soffit-fascia-cost", desc: "Estimate roofline replacement" },
      ],
    },
    {
      title: "Misc & Lifestyle",
      icon: <Coffee className="h-6 w-6 text-primary" />,
      calculators: [
        { name: "Tattoo Cost", href: "/calculators/tattoo-cost", desc: "Estimate UK tattoo pricing" },
        { name: "University Grade", href: "/calculators/university-grade", desc: "Calculate degree classification" },
      ],
    },
    {
      title: "Sleep",
      icon: <Moon className="h-6 w-6 text-primary" />,
      calculators: [
        { name: "Epworth Sleepiness", href: "/calculators/epworth-sleepiness", desc: "Daytime sleepiness scale" },
        { name: "Sleep Debt", href: "/calculators/sleep-debt", desc: "Calculate accumulated lost sleep" },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 animate-in fade-in duration-700">
      <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
          Health & Fitness Calculators
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          Professional, evidence-based health tools to help you track vital metrics, optimize your fitness, and improve your life.
        </p>
      </div>

      <div className="grid gap-12 md:gap-16">
        {categories.map((category) => (
          <div key={category.title} className="space-y-6">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="p-2.5 bg-primary/10 rounded-xl">
                {category.icon}
              </div>
              <h2 className="text-2xl font-bold tracking-tight">{category.title}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.calculators.map((calc) => (
                <Link key={calc.name} href={calc.href} className="block group outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl rounded-tr-xl">
                  <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 group-hover:-translate-y-1 bg-card/60 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">{calc.name}</CardTitle>
                      <CardDescription className="text-sm mt-1">{calc.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
