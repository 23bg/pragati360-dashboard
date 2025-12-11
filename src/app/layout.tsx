import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/shared/providers/ReduxProvider";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner"

// ✅ Load DM Sans (modern, balanced sans-serif)
const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Pragati360 - Empower Business Growth",
  description:
    "Join Pragati360 early access - an AI-powered growth intelligence suite for modern businesses.",
};

// ensureInitialUser();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} font-sans antialiased `}
      >
        <ReduxProvider>
          <NextTopLoader
            // showAtBottom={true}
            showSpinner={false}
            color="var(--color-blue-600)"
            shadow={false}

          />
          <main>{children}</main>
          <Toaster
            duration={3000}
            position={"bottom-right"}
          />
        </ReduxProvider>
      </body>
    </html>
  );
}
