import { Activity, Scale, Coffee, Moon } from "lucide-react";

export const categories = [
    {
        title: "General Health / Lifestyle",
        icon: <Activity className="h-6 w-6 text-primary" />,
        calculators: [
            { name: "Bra Size Calculator", href: "/bra-size-calculator-uk", desc: "US Standard Sizing" },
            { name: "Child Growth Chart", href: "/child-growth-chart-calculator-uk", desc: "Estimate height/weight percentiles" },
            { name: "BMI Calculator", href: "/bmi-calculator-uk", desc: "Body Mass Index" },
            { name: "Reverse BMI", href: "/reverse-bmi-calculator", desc: "Find weight for a target BMI" },
            { name: "Child BMI", href: "/child-bmi-calculator", desc: "BMI percentile for children" },
            { name: "Pregnancy BMI", href: "/pregnancy-bmi", desc: "Healthy weight gain during pregnancy" },
            { name: "BMR Calculator", href: "/bmr-calculator-to-lose-weight", desc: "Basal Metabolic Rate" },
            { name: "Heart Age", href: "/heart-age-calculator-uk", desc: "Estimate your cardiovascular age" },
            { name: "Waist-to-Height", href: "/waist-to-height-ratio-calculator", desc: "Better indicator than BMI" },
            { name: "Life Expectancy", href: "/life-expectancy-calculator-uk", desc: "Estimate based on habits" },
            { name: "Frailty Score", href: "/frailty-score-calculator-uk", desc: "Assess physical decline" },
            { name: "Ape Index", href: "/ape-index-calculator", desc: "Arm span vs height ratio" },
            { name: "Visceral Fat", href: "/visceral-fat-calculator", desc: "Estimate hidden belly fat" },
        ],
    },
    {
        title: "Fitness & Diet",
        icon: <Scale className="h-6 w-6 text-primary" />,
        calculators: [
            { name: "Calorie Deficit", href: "/calorie-deficit-calculator-uk", desc: "Calculate weight loss calories" },
            { name: "VO2 Max", href: "/vo2-max-calculator", desc: "Maximal oxygen uptake" },
            { name: "Water Intake", href: "/water-intake-calculator", desc: "Daily hydration needs" },
            { name: "Intermittent Fasting", href: "/intermittent-fasting-calculator", desc: "Eating window planner" },
            { name: "Water Fast", href: "/water-fast-calculator", desc: "Estimate weight loss during fast" },
        ],
    },
    {
        title: "Finance & Driving",
        icon: <Activity className="h-6 w-6 text-primary" />,
        calculators: [
            { name: "Holiday Budget", href: "/calculators/holiday-calculator-uk", desc: "Estimate your vacation cost" },
            { name: "Annual Leave", href: "/annual-leave-calculator-uk", desc: "UK statutory holiday entitlement" },
            { name: "Mileage Claim", href: "/mileage-calculator-uk", desc: "Calculate business travel expense" },
            { name: "Road Tax", href: "/road-tax-calculator-uk", desc: "UK Vehicle Excise Duty" },
            { name: "Fuel Cost", href: "/fuel-cost-calculator-uk", desc: "Journey petrol/diesel cost" },
            { name: "Speeding Fine", href: "/speeding-fine-calculator-uk", desc: "UK Penalty Guidelines" },
            { name: "Car Insurance", href: "/car-insurance-calculator-uk", desc: "Rough premium estimator" },
            { name: "Car Write-Off", href: "/car-insurance-write-off-calculator-uk", desc: "Estimate damage vs value" },
            { name: "Drink Drive Limit", href: "/drink-drive-limit-calculator-uk", desc: "Estimate BAC levels" },
            { name: "Taxi Fare", href: "/taxi-fare-calculator-uk", desc: "UK cab fare estimator" },
            { name: "EV Charging Cost", href: "/ev-charging-cost-calculator-uk", desc: "Calculate home/public charging" },
        ],
    },
    {
        title: "Home & Property",
        icon: <Activity className="h-6 w-6 text-primary" />,
        calculators: [
            { name: "BTU Radiator", href: "/btu-calculator-uk", desc: "Calculate room heating needs" },
            { name: "Roof Replacement", href: "/roof-replacement-cost-calculator-uk", desc: "Estimate new pitched roof cost" },
            { name: "Flat Roof Cost", href: "/flat-roof-replacement-cost-calculator-uk", desc: "Estimate flat roof replacement" },
            { name: "Removal Costs", href: "/removal-costs-calculator-uk", desc: "Estimate house moving fees" },
            { name: "Heat Pump Cost", href: "/heat-pump-cost-calculator-uk", desc: "UK heat pump estimator" },
            { name: "Double Glazing", href: "/double-glazing-cost-calculator-uk", desc: "Estimate new windows cost" },
            { name: "Tree Removal", href: "/tree-removal-cost-calculator-uk", desc: "Estimate tree felling costs" },
            { name: "Soffit & Fascia", href: "/soffit-and-fascia-cost-calculator", desc: "Estimate roofline replacement" },
        ],
    },
    {
        title: "Misc & Lifestyle",
        icon: <Coffee className="h-6 w-6 text-primary" />,
        calculators: [
            { name: "Tattoo Cost", href: "/tattoo-cost-calculator-uk", desc: "Estimate UK tattoo pricing" },
            { name: "University Grade", href: "/university-grade-calculator-uk", desc: "Calculate degree classification" },
        ],
    },
    {
        title: "Sleep",
        icon: <Moon className="h-6 w-6 text-primary" />,
        calculators: [
            { name: "Epworth Sleepiness", href: "/epworth-sleepiness-scale-calculator", desc: "Daytime sleepiness scale" },
            { name: "Sleep Debt", href: "/sleep-debt-calculator", desc: "Calculate accumulated lost sleep" },
        ],
    },
];

export const allCalculators = categories.flatMap(c => c.calculators);
