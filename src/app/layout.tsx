import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "CalZone | The Ultimate Health, Fitness & Lifestyle Calculators",
  description: "CalZone offers a comprehensive suite of free, professional, evidence-based medical, health, fitness, financial, and lifestyle calculators.",
  keywords: ["health calculators", "fitness calculators", "BMI calculator", "calorie deficit", "finance calculators", "lifestyle calculators", "CalZone"],
  openGraph: {
    title: "CalZone | Professional Calculators",
    description: "Explore dozens of health, fitness, finance, and property calculators all in one place.",
    url: "https://calzone.com",
    siteName: "CalZone",
    images: [
      {
        url: "/heroimage.jpg",
        width: 1200,
        height: 630,
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CalZone | Free Health & Fitness Calculators",
    description: "Calculate BMI, BMR, Calorie Deficit, UK Taxes, Car Costs, and much more on CalZone.",
    images: ["/heroimage.jpg"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased min-h-screen flex flex-col bg-background font-sans"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
