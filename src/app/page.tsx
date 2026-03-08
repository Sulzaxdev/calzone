import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Scale, Heart, Baby, Droplets, ChevronRight } from "lucide-react";

import Image from "next/image";

import { categories, allCalculators } from "@/lib/calculators";

import { StatCounter } from "@/components/ui/stat-counter";

export default function Home() {

  return (
    <div className="animate-in fade-in duration-700">


      {/* --- REFINED HERO SECTION --- */}
      <section className="container mx-auto px-4 pt-20 pb-16 text-center max-w-7xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50/50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-widest mb-10 border border-rose-100 dark:border-rose-900/40">
          UK Standardized Calculators
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white mb-8 leading-[1.1] tracking-tighter">
          CalZone <span className="text-slate-400">-</span> Calculator Hub For UK
        </h1>
        <p className="text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto opacity-80 font-serif italic">
          Free UK-based calculators for health, finance, tax and more.
          Precise tools. Real answers. Zero complexity.
        </p>
      </section>

      {/* --- REFINED STATS SECTION (Inspired by input_file_2.png) --- */}
      <section className="container mx-auto px-4 mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Stat Card 1 */}
          <div className="bg-white dark:bg-slate-950 p-8 rounded-[2rem] shadow-2xl shadow-slate-200/60 dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center group hover:-translate-y-1 transition-all">
            <div className="text-5xl font-black bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 tracking-tighter group-hover:scale-105 transition-transform duration-500">
              <StatCounter value={100000} suffix="+" />
            </div>
            <div className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em]">
              Trusted UK Users
            </div>
          </div>

          {/* Stat Card 2 */}
          <div className="bg-white dark:bg-slate-950 p-8 rounded-[2rem] shadow-2xl shadow-slate-200/60 dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center group hover:-translate-y-1 transition-all">
            <div className="text-5xl font-black bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 tracking-tighter group-hover:scale-105 transition-transform duration-500">
              <StatCounter value={1000} suffix="+" />
            </div>
            <div className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em]">
              Specialist Calculators
            </div>
          </div>

          {/* Stat Card 3 */}
          <div className="bg-white dark:bg-slate-950 p-8 rounded-[2rem] shadow-2xl shadow-slate-200/60 dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center group hover:-translate-y-1 transition-all">
            <div className="text-5xl font-black bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 tracking-tighter group-hover:scale-105 transition-transform duration-500">
              <StatCounter value={800} suffix="+" />
            </div>
            <div className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em]">
              Live Calculations Today
            </div>
          </div>

          {/* Stat Card 4 */}
          <div className="bg-white dark:bg-slate-950 p-8 rounded-[2rem] shadow-2xl shadow-slate-200/60 dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center group hover:-translate-y-1 transition-all">
            <div className="text-5xl font-black bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 tracking-tighter group-hover:scale-105 transition-transform duration-500">
              <StatCounter value={100} suffix="%" />
            </div>
            <div className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em]">
              Free to Use
            </div>
          </div>
        </div>
      </section>

      {/* --- POPULAR CALCULATORS SECTION (Inspired by input_file_3.png) --- */}
      <section className="container mx-auto px-4 mb-24 max-w-[1600px] text-center">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
          Popular Calculators
        </h2>
        <h3 className="text-lg text-slate-600 dark:text-slate-400 mb-16 max-w-2xl mx-auto opacity-80">
          From BMI to mortgage estimates, find the most popular free UK calculators used by real people every day.
        </h3>
        <div className="w-12 h-1.5 bg-blue-600 rounded-full mx-auto mb-10"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { name: "Mortgage Calculator", href: "/mortgage-calculator-uk", desc: "Calculate monthly payments", icon: "🏠", color: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400" },
            { name: "Tax Calculator", href: "/income-tax-calculator-uk", desc: "Work out your income tax", icon: "💰", color: "bg-yellow-50 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400" },
            { name: "BMI Calculator", href: "/bmi-calculator-uk", desc: "Check your body mass index", icon: "💪", color: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400" },
            { name: "VAT Calculator", href: "/vat-calculator-uk", desc: "Add or remove UK VAT", icon: "📊", color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" },
            { name: "Salary Calculator", href: "/salary-calculator-uk", desc: "Calculate take-home pay", icon: "💷", color: "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400" },
            { name: "Percentage Calc", href: "/percentage-calculator-uk", desc: "Quick math calculations", icon: "％", color: "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400" },
            { name: "Loan Calculator", href: "/loan-calculator-uk", desc: "Calculate loan repayments", icon: "💳", color: "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400" },
            { name: "Road Tax Calc", href: "/road-tax-calculator-uk", desc: "Calculate vehicle tax costs", icon: "🚗", color: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400" },
            { name: "Concrete Calculator", href: "/concrete-calculator-uk", desc: "Calculate concrete needed", icon: "🏗️", color: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300" },
            { name: "Redundancy Calc", href: "/redundancy-calculator-uk", desc: "Calculate statutory pay", icon: "📋", color: "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400" },
            { name: "Mileage Calculator", href: "/mileage-calculator-uk", desc: "Calculate mileage claim", icon: "📍", color: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400" },
            { name: "Compound Interest", href: "/uk-compound-interest-calculator", desc: "See investment growth", icon: "📈", color: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400" }
          ].map((calc, idx) => (
            <Link
              key={idx}
              href={calc.href}
              className="bg-white dark:bg-slate-950 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_32px_-8px_rgba(0,0,0,0.08)] dark:hover:shadow-none hover:border-slate-300 dark:hover:border-slate-600 transition-all group flex flex-col items-center justify-center text-center h-full hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 transition-transform group-hover:scale-110 duration-300 ${calc.color}`}>
                {calc.icon}
              </div>
              <span className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1.5">
                {calc.name}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-tight">
                {calc.desc}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* --- BROWSE BY CATEGORY SECTION --- */}
      <section className="bg-slate-50/40 dark:bg-slate-900/40 py-24 mb-24 border-y border-slate-200/50 dark:border-slate-800/50">
        <div className="container mx-auto px-4 max-w-[1400px]">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter">
              Browse by Category
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-slate-600 dark:text-slate-400">
              <span className="text-lg">Find the perfect <Link href="#" className="underline decoration-blue-300 dark:decoration-blue-700 underline-offset-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">calculator</Link> for your needs</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600 text-white text-sm font-bold shadow-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                Calculators & Reference Tools
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: "finance",
                title: "Finance",
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>,
                links: [
                  { name: "Mortgage Calculator", href: "/mortgage-calculator-uk" },
                  { name: "Tax Calculator", href: "#" },
                  { name: "Salary Calculator", href: "#" },
                  { name: "VAT Calculator", href: "/vat-calculator-uk" },
                  { name: "Loan Calculator", href: "#" },
                  { name: "Compound Interest", href: "/uk-compound-interest-calculator" }
                ]
              },
              {
                id: "construction",
                title: "Construction",
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
                links: ["Concrete Mix Calculator", "Sand & Cement", "House Extension Cost", "Fencing Cost", "Beam Deflection", "Loft Insulation"]
              },
              {
                id: "automotive",
                title: "Automotive",
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><circle cx="15.5" cy="8.5" r="1.5"></circle><path d="M8 15h.01"></path><path d="M16 15h.01"></path></svg>,
                links: ["Road Tax Calculator", "Car Insurance", "Speeding Fine", "Mileage Calculator", "EV Charging Cost", "PCP Calculator"]
              },
              {
                id: "maths",
                title: "Maths",
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>,
                links: ["Percentage Calculator", "Percentage Off", "Ratio Calculator", "Standard Deviation", "Quadratic Formula", "Matrix Calculator"]
              },
              {
                id: "food",
                title: "Food & Cooking",
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path></svg>,
                links: ["Turkey Crown Time", "Roast Pork Time", "Gammon Cooking Time", "Goose Cooking Time", "Turkey Defrost Time", "Beef Fillet Time"]
              },
              {
                id: "science",
                title: "Science",
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3v12a6 6 0 0 0 12 0V3"></path><path d="M6 3h12"></path></svg>,
                links: ["Earth Curve", "Wavelength Calculator", "Resistor Calculator", "Dilution Calculator", "Second Moment", "Saturn Return"]
              },
              {
                id: "health",
                title: "Health & Fitness",
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>,
                links: ["BMI Calculator", "Calorie Maintenance", "Pregnancy Due Date", "Sleep Time", "VO2 Max", "Bra Size"]
              },
              {
                id: "education",
                title: "Education",
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>,
                links: ["School Age", "University Grade", "Childcare Cost", "Term Time Salary", "Tariff Point", "Moon Sign"]
              },
              {
                id: "time",
                title: "Time",
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
                links: ["Time Difference", "Time Duration", "Holiday Calculator", "Annual Leave", "Work Time", "Birthday Calculator"]
              }
            ].map((cat) => (
              <div key={cat.id} className="bg-white dark:bg-slate-950 rounded-[2rem] p-8 md:p-10 border border-slate-100 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-none dark:hover:border-slate-700 transition-all duration-300">
                {/* Decorative Top Right Circle */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-slate-100/80 dark:bg-slate-800/50 rounded-full transition-transform group-hover:scale-110 duration-500"></div>

                <div className="flex items-center gap-4 mb-8 relative z-10">
                  <div className="w-14 h-14 bg-[#1e5eb8] rounded-2xl flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:bg-[#164a93] transition-colors">
                    {cat.icon}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{cat.title}</h3>
                </div>

                <ul className="space-y-4 mb-10 relative z-10">
                  {cat.links.map((linkObj, idx) => (
                    <li key={idx}>
                      <Link
                        href={typeof linkObj === 'string' ? '#' : linkObj.href}
                        className="flex items-center gap-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-blue-400 transition-colors group/link text-[15px] font-medium tracking-tight"
                      >
                        <span className="text-slate-400 dark:text-slate-500 transition-transform">→</span>
                        {typeof linkObj === 'string' ? linkObj : linkObj.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="relative z-10 w-full">
                  <Link href="#" className="inline-flex items-center gap-1 text-[13px] font-bold text-[#1e5eb8] dark:text-blue-400 hover:text-[#164a93] dark:hover:text-blue-300 transition-colors tracking-tight">
                    View all {cat.title} calculators
                    <span className="translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHAT'S NEW SECTION (Inspired by input_file_4.png) --- */}
      <section className="container mx-auto px-4 mb-24 max-w-[1400px]">
        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {["Finance", "Health & Fitness", "Maths", "Construction", "Automotive", "Cooking", "Education", "Time", "Science", "Area", "Volume", "Length", "Mass", "Speed", "Pressure", "Force", "Power", "Density", "Currency", "Gardening", "Sports"].map((tag, i) => (
            <button
              key={i}
              className={`px-6 py-2 rounded-full text-sm font-bold border transition-colors shadow-sm ${["Finance", "Health & Fitness", "Maths"].includes(tag)
                ? "bg-[#1e5eb8] text-white border-[#1e5eb8] hover:bg-[#164a93]"
                : "bg-white text-[#1e5eb8] border-blue-200 hover:border-[#1e5eb8] hover:bg-blue-50 dark:bg-slate-900 dark:border-slate-800 dark:text-blue-400 dark:hover:border-blue-500"
                }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Section Header */}
        <div className="text-center mb-16 relative">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white inline-flex items-center gap-3 tracking-tighter">
            What's New
            <span className="bg-[#ff6b4a] text-white text-[10px] uppercase font-black tracking-widest px-2 py-0.5 rounded-full translate-y-[-10px]">New</span>
          </h2>
          <div className="w-12 h-1 bg-blue-600 rounded-full mx-auto mt-4 mb-6"></div>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Fresh calculators added to help you with your calculations{" "}
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-[#1e5eb8] px-2 py-0.5 rounded-full ml-2">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
              Mathematics
            </span>
          </p>
        </div>

        {/* Recent Calculators Grid */}
        <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl p-8 md:p-12 border border-slate-100 dark:border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              { name: "Convert Fathoms to Feet | Maritime Length Chart", date: "2 March 2026" },
              { name: "Metres to Micrometres Converter | m to μm", date: "2 March 2026" },
              { name: "Centimetres to Micrometres Converter | cm to μm", date: "2 March 2026" },
              { name: "RPM to MPH Converter - Engine Speed to Vehicle Speed", date: "2 March 2026" },
              { name: "Is 1 Hour Worth £50 Savings? | Price Comparison Value", date: "1 March 2026" },
              { name: "Apple Music Royalty Calculator | Stream Earnings", date: "1 March 2026" },
              { name: "M/S to Mach Converter | Metres per Second to Mach", date: "1 March 2026" },
              { name: "BST to CST: British Summer Time to Central Time", date: "1 March 2026" },
              { name: "Visceral Fat Calculator - Assess Your Health Risk", date: "28 February 2026" },
              { name: "Bike Gear Ratio Calculator | Calculate Gear Inches", date: "27 February 2026" },
              { name: "Taylor Series Calculator | Expand Functions Online", date: "26 February 2026" },
              { name: "Manchester vs Birmingham | £4,800/Year Gap", date: "25 February 2026" }
            ].map((item, idx) => (
              <div key={idx} className="group">
                <Link href="#" className="text-[15px] font-bold text-[#1e5eb8] dark:text-blue-400 group-hover:text-[#164a93] dark:group-hover:text-blue-300 transition-colors block mb-1">
                  {item.name}
                </Link>
                <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  {item.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* --- TRENDING CALCULATORS (Inspired by input_file_0.png) --- */}
      <section className="bg-slate-50/50 dark:bg-slate-900/50 py-24 mb-24 border-y border-slate-200/50 dark:border-slate-800/50">
        <div className="mx-auto px-6 max-w-[1600px]">
          <h3 className="text-center text-[10px] font-black tracking-[0.4em] uppercase text-slate-400 dark:text-slate-500 mb-16 font-serif">
            Trending Suite
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
            {allCalculators.slice(0, 6).map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="bg-white dark:bg-slate-950 p-8 rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all border border-slate-100 dark:border-slate-800 group h-full flex flex-col justify-center text-center hover:-translate-y-1"
              >
                <div className="font-bold text-slate-800 dark:text-slate-200 text-lg mb-2 font-serif group-hover:text-blue-600 transition-colors italic">
                  {calc.name}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight italic font-serif opacity-70">
                  {calc.desc}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Categories Section */}
      <div className="mx-auto px-6 pb-40 max-w-[1600px]">
        <div className="grid gap-32">
          {categories.map((category) => (
            <div key={category.title} className="space-y-16">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="text-[10px] font-black tracking-[0.4em] uppercase text-blue-600 dark:text-blue-400 font-serif">
                  Specialized Modules
                </div>
                {(category.title === "General Health / Lifestyle" || category.title === "Fitness & Diet" || category.title === "UK Stock Market & Investments") ? (
                  <Link
                    href={category.title === "General Health / Lifestyle" ? "/general-health" : category.title === "Fitness & Diet" ? "/fitness-diet" : "/uk-stocks-investments"}
                    className="group"
                  >
                    <h2 className="text-5xl md:text-6xl font-black tracking-tighter font-serif italic group-hover:text-blue-600 transition-colors text-glass">
                      {category.title}
                    </h2>
                  </Link>
                ) : (
                  <h2 className="text-5xl md:text-6xl font-black tracking-tighter font-serif italic text-glass">{category.title}</h2>
                )}
                <div className="w-20 h-1 bg-linear-to-r from-blue-600 to-transparent rounded-full opacity-20"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {category.calculators.map((calc) => (
                  <Link key={calc.name} href={calc.href} className="group h-full">
                    <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-10 h-full transition-all hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] dark:hover:shadow-none hover:-translate-y-2 flex flex-col">
                      <div className="flex items-center justify-between mb-8">
                        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors text-slate-400 group-hover:text-blue-600">
                          {category.icon}
                        </div>
                        <div className="w-10 h-10 rounded-full border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-300 group-hover:text-blue-600 group-hover:border-blue-200 transition-all">
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 font-serif italic tracking-tight">
                        {calc.name}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8 font-serif italic opacity-70">
                        {calc.desc}
                      </p>
                      <div className="mt-auto pt-8 border-t border-slate-50 dark:border-slate-900 flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 group-hover:text-blue-600 transition-colors">
                          Access Tool
                        </span>
                        <div className="w-2 h-2 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-600 transition-colors"></div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
}
