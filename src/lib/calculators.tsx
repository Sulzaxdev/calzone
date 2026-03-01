import { Activity, Scale, Coffee, Moon } from "lucide-react";

export const categories = [
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

export const allCalculators = categories.flatMap(c => c.calculators);
