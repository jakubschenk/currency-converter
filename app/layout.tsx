import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Providers from "@/app/providers";
import { ThemeProvider } from "@/lib/theme-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Currency Converter",
  description: "Convert currency and stuff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
