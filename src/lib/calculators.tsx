import { Activity, Scale, Coffee, Moon, TrendingUp, Calculator, Hammer } from "lucide-react";

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
            { name: "Salary Calculator", href: "/salary-calculator-uk", desc: "Calculate take-home pay after tax and NI" },
            { name: "Income Tax Calculator", href: "/income-tax-calculator-uk", desc: "UK Income Tax and National Insurance" },
            { name: "VAT Calculator", href: "/vat-calculator-uk", desc: "Add or remove UK VAT" },
            { name: "Redundancy Calculator", href: "/redundancy-calculator-uk", desc: "Calculate Statutory Redundancy Pay (SRP)" },
            { name: "Holiday Budget", href: "/holiday-calculator-uk", desc: "Estimate your vacation cost" },
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
            { name: "Mortgage Calculator UK", href: "/mortgage-calculator-uk", desc: "Calculate monthly EMI and total interest" },
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
        title: "Maths & Percentages",
        icon: <Calculator className="h-6 w-6 text-primary" />,
        calculators: [
            { name: "Percentage Calculator", href: "/percentage-calculator-uk", desc: "Calculate fractions, differences, and percentage increases" },
        ],
    },
    {
        title: "Construction & DIY",
        icon: <Hammer className="h-6 w-6 text-primary" />,
        calculators: [
            { name: "Concrete Calculator", href: "/concrete-calculator-uk", desc: "Calculate concrete volume and bags needed" },
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
    {
        title: "UK Stock Market & Investments",
        icon: <TrendingUp className="h-6 w-6 text-primary" />,
        calculators: [
            { name: "UK Capital Gains Tax (CGT)", href: "/uk-stock-capital-gains-tax-calculator", desc: "Calculate tax on share/investment sales" },
            { name: "UK Dividend Tax", href: "/uk-dividend-tax-calculator", desc: "Calculate tax on UK dividend income" },
            { name: "Stamp Duty Calculator (UK Shares)", href: "/uk-shares-stamp-duty-calculator", desc: "Calculate 0.5% SDRT on UK share purchases." },
            { name: "Share Dealing Fee Calculator", href: "/uk-share-dealing-fee-calculator", desc: "Analyze broker commissions, FX fees, and total trading costs." },
            { name: "Investment Growth Calculator", href: "/uk-investment-growth-calculator", desc: "Project future wealth using compound interest logic." },
            { name: "Dividend Yield Calculator", href: "/uk-dividend-yield-calculator", desc: "Calculate annual return % based on payouts and price." },
            { name: "Stocks & Shares ISA Calculator", href: "/uk-stocks-shares-isa-calculator", desc: "Track ISA allowance and project tax-free growth." },
            { name: "P/E Ratio Calculator", href: "/uk-pe-ratio-calculator", desc: "Calculate Price-to-Earnings ratio for UK stocks valuation." },
            { name: "Portfolio Return Calculator", href: "/portfolio-return-calculator-uk", desc: "Calculate weighted annual portfolio performance and CAGR." },
            { name: "Compound Interest Calculator", href: "/uk-compound-interest-calculator", desc: "Project long-term wealth growth with SIP and compounding frequency." },
            { name: "Risk & Volatility Calculator", href: "/risk-volatility-calculator-uk", desc: "Calculate Standard Deviation and Beta for UK stocks." },
            { name: "SIP Calculator", href: "/sip-calculator-uk", desc: "Calculate future value of monthly investments." },
            { name: "Inflation Adjusted Return", href: "/inflation-adjusted-return-calculator-uk", desc: "Calculate real returns after UK inflation." },
            { name: "FTSE Index Return", href: "/ftse-index-return-calculator-uk", desc: "Calculate historical CAGR for FTSE 100/250." },
        ],
    },
];

export const allCalculators = categories.flatMap(c => c.calculators);
