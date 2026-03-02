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
