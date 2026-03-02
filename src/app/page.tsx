import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Scale, Heart, Baby, Droplets, ChevronRight } from "lucide-react";

import Image from "next/image";

import { categories } from "@/lib/calculators";

export default function Home() {

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative z-0 w-full min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden mb-16">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/heroimage.jpg"
            alt="CalZone - Professional Health & Fitness Calculators background"
            fill
            priority
            className="object-cover object-center brightness-[0.7] dark:brightness-[0.4]"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center pt-60 pb-20">
          <div className="max-w-4xl mx-auto bg-white/10 dark:bg-black/40 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/20 shadow-2xl">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 drop-shadow-lg">
              Unlock Your Potential with <span className="text-primary">CalZone.</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/90 leading-relaxed mb-8 drop-shadow-md">
              The ultimate suite of fast, professional, and free calculators for health, fitness, finance, and daily life. Track vital metrics, optimize your well-being, and make data-driven decisions.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-white/80">
              <span className="bg-primary/20 px-4 py-2 rounded-full backdrop-blur-sm border border-primary/30">Trusted by Professionals</span>
              <span className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">100% Free Forever</span>
              <span className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">Instant Results</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- DETAILED STATS & INTELLIGENCE SECTION --- */}
      <section className="container mx-auto px-4 mb-24">
        <div className="bg-slate-50 dark:bg-slate-900/40 rounded-[3rem] border border-slate-200 dark:border-slate-800 p-8 md:p-16 overflow-hidden relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold mb-8 uppercase tracking-widest border border-primary/20">
                <Activity className="w-4 h-4" />
                Scale & Precision v4.0
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-slate-100 mb-8 leading-[1.1] tracking-tight">
                Empowering Decisions with <br />
                <span className="text-primary">1,000+ Intelligence Models.</span>
              </h2>
              <div className="space-y-6 text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-12">
                <p>
                  CalZone isn't just a collection of tools; it's a massive ecosystem of curated algorithms. We've integrated over 1,000 specialized calculators across 40+ biological and financial domains.
                </p>
                <p>
                  Our engine processes complex data points—from statutory UK tax codes and real-world fuel indices to advanced biometric markers—delivering clinical precision in milliseconds.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-8">
                <div className="group">
                  <div className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">40+</div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Logic Categories</div>
                </div>
                <div className="group">
                  <div className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">24/7</div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Live API Sync</div>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 relative">
              {/* Decorative elements */}
              <div className="absolute -inset-10 bg-primary/5 blur-3xl rounded-full z-0 opacity-50"></div>

              <div className="bg-white dark:bg-slate-950 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl relative z-10 hover:-translate-y-2 transition-transform h-fit">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-6">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Statutory Compliance</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  Real-time synchronization with HMRC, IRS, and EU fiscal guidelines for 2024-2025.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-950 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl relative z-10 hover:-translate-y-2 transition-transform mt-8 sm:mt-16 h-fit">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Biometric IQ</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  Advanced metabolic modeling for precision fitness and nutritional intelligence tracking.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-950 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl relative z-10 hover:-translate-y-2 transition-transform h-fit sm:-mt-16">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6">
                  <Droplets className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Live Index Tracking</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  Automatic calibration with global fuel prices and inflation data for accurate cost forecasting.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-950 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl relative z-10 hover:-translate-y-2 transition-transform h-fit">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6">
                  <Baby className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Precision Life Cycle</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  Calculators tailored for every stage of life, from growth percentiles to retirement planning.
                </p>
              </div>
            </div>
          </div>

          {/* Background Decorative Blobs */}
          <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-linear-to-bl from-primary/5 to-transparent rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-linear-to-tr from-primary/5 to-transparent rounded-full blur-[100px] pointer-events-none"></div>
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
    </div>
  );
}
