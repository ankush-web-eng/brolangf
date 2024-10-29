import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/context/ThemeProvider";
import { CodeProvider } from "@/context/CodeContext";
import { cn } from "@/lib/utils";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "@/components/ui/toaster";
import OfflineNotification from "@/components/Offline-navigator";
import CustomHead from "@/components/custom-head";
import { metadata as siteMetadata } from "@/config/metadata";

const satoshi = localFont({
  display: 'swap',
  src: [
    {
      path: './fonts/satoshi.ttf',
    },
  ],
  variable: '--font-satoshi',
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <CustomHead />
      </head>
      <body
        suppressHydrationWarning={true}
        className={cn(
          'font-satoshi antialiased',
          satoshi.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange >
          <CodeProvider>
            <NextTopLoader
              showSpinner={false}
            />
            <Navbar />
            <OfflineNotification />
            {children}
            <Toaster />
          </CodeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
