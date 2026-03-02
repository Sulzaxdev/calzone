import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Scale, Heart, Baby, Droplets, ChevronRight } from "lucide-react";

import Image from "next/image";

import { categories } from "@/lib/calculators";

export default function Home() {

  return (
    <div className="animate-in fade-in duration-700">


      {/* --- PREMIUM SAAS FEATURE SECTION --- */}
      <section className="container mx-auto px-4 mb-32 relative pt-12">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full md:w-3/4 h-[400px] bg-linear-to-b from-primary/5 via-primary/2 to-transparent blur-3xl -z-10 rounded-[100%] pointer-events-none"></div>

        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-sm font-semibold mb-8 border border-rose-100 dark:border-rose-900/50 shadow-sm">
            <Activity className="w-4 h-4" />
            Built on Verified UK Data & Research Sources
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-[4rem] font-bold text-slate-900 dark:text-white mb-8 leading-[1.1] tracking-tight font-serif">
            Free UK Calculators for Health, Finance & Everyday Decisions<br className="hidden md:block" />
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
            From calorie deficits and hydration tracking to holiday budgeting and tax estimates, our UK-based calculators provide accurate, instant results designed for real-life decisions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link href="/general-health" className="px-8 py-4 rounded-full bg-[#6a3045] hover:bg-[#582738] text-white font-semibold transition-all shadow-xl shadow-[#6a3045]/20 flex items-center gap-2">
              Explore Health Calculators <ChevronRight className="w-5 h-5" />
            </Link>
            <Link href="/finance-driving" className="px-8 py-4 rounded-full bg-white dark:bg-transparent text-slate-900 dark:text-white font-semibold border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all shadow-sm">
              View Financial Calculators
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5"><span className="text-emerald-500">✔</span> No registration required</span>
            <span className="flex items-center gap-1.5"><span className="text-emerald-500">✔</span> Free to use</span>
            <span className="flex items-center gap-1.5"><span className="text-emerald-500">✔</span> Updated for UK standards</span>
          </div>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 max-w-7xl mx-auto">
          <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-md p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl hover:-translate-y-2 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-800 dark:text-slate-200 mb-6 border border-slate-200 dark:border-slate-700">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Statutory Compliance</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Real-time synchronization with HMRC, IRS, and EU fiscal guidelines for unmatched financial precision.
            </p>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-md p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl hover:-translate-y-2 transition-transform lg:translate-y-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-6 border border-amber-100 dark:border-amber-900/50">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Biometric IQ</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Advanced metabolic modeling for precision fitness, caloric deficits, and nutritional intelligence tracking.
            </p>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-md p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl hover:-translate-y-2 transition-transform h-fit">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 border border-emerald-100 dark:border-emerald-900/50">
              <Droplets className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Live Index Tracking</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Automatic calibration with global fuel prices and inflation data for hyper-accurate cost forecasting.
            </p>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-md p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl hover:-translate-y-2 transition-transform lg:translate-y-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 border border-blue-100 dark:border-blue-900/50">
              <Baby className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Precision Life Cycle</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Calculators tailored for every stage of life, from growth percentiles to sophisticated retirement planning.
            </p>
          </div>
        </div>
      </section>

      {/* Main Categories Section */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid gap-12 md:gap-16">
          {categories.map((category) => (
            <div key={category.title} className="space-y-6">
              <div className="flex items-center gap-3 border-b pb-4">
                <div className="p-2.5 bg-primary/10 rounded-xl">
                  {category.icon}
                </div>
                {(category.title === "General Health / Lifestyle" || category.title === "Fitness & Diet") ? (
                  <Link
                    href={category.title === "General Health / Lifestyle" ? "/general-health" : "/fitness-diet"}
                    className="group flex items-center gap-2"
                  >
                    <h2 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">{category.title}</h2>
                    <ChevronRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                ) : (
                  <h2 className="text-2xl font-bold tracking-tight">{category.title}</h2>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.calculators.map((calc) => (
                  <Link key={calc.name} href={calc.href} className="block group outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-2xl">
                    <Card className="h-full transition-all duration-300 hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 group-hover:-translate-y-1 bg-white border border-slate-200/80 shadow-sm rounded-2xl overflow-hidden flex flex-col p-6 dark:bg-card dark:border-border">

                      {/* Top Icon */}
                      <div className="mb-6 w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center bg-transparent group-hover:bg-slate-50 dark:group-hover:bg-slate-800 transition-colors">
                        {/* We use a cloned version of the category icon to control its size/color safely */}
                        <div className="text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors flex items-center justify-center">
                          {category.icon}
                        </div>
                      </div>

                      {/* Title with vertical accent line */}
                      <div className="flex items-center mb-4">
                        <div className="w-1 h-6 bg-[#0f172a] dark:bg-slate-100 rounded-full mr-3 group-hover:bg-primary transition-colors"></div>
                        <h3 className="text-xl font-bold text-[#0f172a] dark:text-slate-100">
                          {calc.name}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-[#334155] dark:text-slate-400 mb-8 grow leading-relaxed">
                        {calc.desc}
                      </p>

                      {/* Learn More Action */}
                      <div className="flex items-center gap-3 mt-auto">
                        <div className="w-10 h-10 rounded-[10px] bg-[#0f172a] dark:bg-slate-100 flex items-center justify-center text-white dark:text-slate-900 group-hover:bg-primary group-hover:shadow-md transition-all">
                          <ChevronRight className="w-5 h-5" />
                        </div>
                        <span className="font-semibold text-[#0f172a] dark:text-slate-100 group-hover:text-primary transition-colors">
                          Learn more
                        </span>
                      </div>

                    </Card>
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
