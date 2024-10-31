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
import { ScrollBarProps } from "@/components/Scrollbar";

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
          'font-satoshi antialiased bg-[#FEFDFC] dark:bg-[#3e3e3e]',
          satoshi.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange >
          <CodeProvider>
            <ScrollBarProps >
              <NextTopLoader
                showSpinner={false}
              />
              <Navbar />
              <OfflineNotification />
              {children}
              <Toaster />
            </ScrollBarProps>
          </CodeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
