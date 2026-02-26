import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://kaysdiamonds.com'),
  title: {
    default: 'Kays Diamonds | Diamond Jewellery Manufacturer',
    template: '%s | Kays Diamonds'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' }
  },
  openGraph: {
    siteName: 'Kays Diamonds',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/kays-diamond-og.png', width: 1200, height: 630 }]
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} min-h-screen flex flex-col bg-primary text-primary-foreground antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
