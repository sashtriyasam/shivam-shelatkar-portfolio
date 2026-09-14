import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CursorProvider } from "@/components/cursor/CursorProvider";
import { ScrollProgress } from "@/components/scroll-progress/ScrollProgress";
import { MobileMenuProvider } from "@/components/layout/MobileMenuProvider";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { MotionProvider } from "@/components/motion/MotionProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://Shivam.runs-on.dev"),
  title: {
    default: "Shivam Shelatkar — Product Designer & Frontend Engineer",
    template: "%s | Shivam Shelatkar",
  },
  description:
    "Product designer and frontend engineer crafting clear, expressive digital products from concept to code.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://Shivam.runs-on.dev",
    siteName: "Shivam Shelatkar",
    title: "Shivam Shelatkar — Product Designer & Frontend Engineer",
    description:
      "Product designer and frontend engineer crafting clear, expressive digital products from concept to code.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivam Shelatkar — Product Designer & Frontend Engineer",
    description:
      "Product designer and frontend engineer crafting clear, expressive digital products from concept to code.",
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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
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
        <script
          dangerouslySetInnerHTML={{
            __html: `if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.style.scrollBehavior='auto'}`,
          }}
        />
      </body>
    </html>
  );
}
