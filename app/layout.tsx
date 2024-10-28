import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/context/ThemeProvider";
import { CodeProvider } from "@/context/CodeContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Bhai++ - A fun programming language",
    template: "%s | Bhai++ - A fun programming language"
  },
  description: "A fun programming language developed by Ankush for fun.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange >
          <CodeProvider>
            <Navbar />
            {children}
          </CodeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
