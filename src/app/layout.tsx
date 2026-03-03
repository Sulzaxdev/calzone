import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thecalzone.co.uk"),
  title: "CalZone | The Ultimate UK Health, Fitness & Financial Calculators",
  description: "CalZone offers a comprehensive suite of free, professional UK medical, health, fitness, financial (FTSE, SIP, CGT), and lifestyle calculators.",
  keywords: ["UK health calculators", "FTSE return calculator", "SIP calculator UK", "UK tax calculators", "BMI calculator UK", "calorie deficit", "finance calculators UK", "lifestyle calculators", "CalZone"],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "CalZone | Professional Calculators",
    description: "Explore dozens of health, fitness, finance, and property calculators all in one place.",
    url: "https://www.thecalzone.co.uk",
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
  },
  verification: {
    google: "f-oWBmjAAp2whf_9EsUKqoPOVVsoZJZMplxIHyuMmcY",
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

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YE0RFNZFM4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-YE0RFNZFM4');
          `}
        </Script>
      </body>
    </html>
  );
}
