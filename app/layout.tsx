import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { CursorProvider } from "@/components/cursor/CursorProvider";
import { ScrollProgress } from "@/components/scroll-progress/ScrollProgress";
import { MobileMenuProvider } from "@/components/layout/MobileMenuProvider";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { MotionProvider } from "@/components/motion/MotionProvider";

const clash = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-clash",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://Shivam.runs-on.dev"),
  title: {
    default: "Shivam Shelatkar — Creative Technologist",
    template: "%s | Shivam Shelatkar",
  },
  description:
    "Creative technologist and product designer building the space between ideas and the people who use them.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://Shivam.runs-on.dev",
    siteName: "Shivam Shelatkar",
    title: "Shivam Shelatkar — Creative Technologist",
    description:
      "Creative technologist and product designer building the space between ideas and the people who use them.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivam Shelatkar — Creative Technologist",
    description:
      "Creative technologist and product designer building the space between ideas and the people who use them.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0e10",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${clash.variable} ${inter.variable}`} suppressHydrationWarning>
      <body>
        <MotionProvider>
          <CursorProvider>
            <MobileMenuProvider>
              <ScrollProgress />
              <CustomCursor />
              <div className="shell">
                <SiteHeader />
                <main id="main" className="page-transition" tabIndex={-1}>
                  {children}
                </main>
                <SiteFooter />
              </div>
            </MobileMenuProvider>
          </CursorProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
