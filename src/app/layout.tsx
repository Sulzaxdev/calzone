import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thecalzone.co.uk"),
  title: "CalZone | Specialist Calculator Hub For UK",
  description: "Trusted by 100,000+ UK users. Explore 1,000+ free calculators for health, finance, property, solar energy, and home renovations. Accurate results built on verified UK data, export results as PDF.",
  keywords: [
    "mortgage calculator UK", "property calculators", "UK health calculators", "FTSE return calculator",
    "SIP calculator UK", "UK tax calculators", "BMI calculator UK", "calorie deficit",
    "finance calculators UK", "lifestyle calculators", "solar panel cost calculator UK",
    "bathroom renovation cost UK", "EV charging cost calculator", "salary calculator UK", "CalZone"
  ],
  authors: [{ name: "CalZone Team" }],
  publisher: "CalZone",
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "CalZone | Professional Calculators & Tools",
    description: "Explore dozens of health, fitness, finance, property, and energy calculators all in one place. Tailored for the UK market.",
    url: "https://www.thecalzone.co.uk",
    siteName: "CalZone",
    images: [
      {
        url: "/heroimage.jpg",
        width: 1200,
        height: 630,
        alt: "CalZone - UK Calculator Hub"
      }
    ],
    locale: "en_GB",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  twitter: {
    card: "summary_large_image",
    title: "CalZone | Free UK Health, Finance & Property Calculators",
    description: "Calculate BMI, BMR, Calorie Deficit, UK Taxes, Car Costs, Solar Savings, and much more on CalZone.",
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
