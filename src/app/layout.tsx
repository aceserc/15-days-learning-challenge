import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { Providers } from "@/providers";

export const metadata: Metadata = {
  title: "ACES 15-Day Learning Challenge",
  description:
    "Join the ACES 15-Day Learning Challenge and showcase your daily learning journey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SessionProvider>
          <Providers>{children}</Providers>
          <Toaster position="bottom-right" />
        </SessionProvider>
      </body>
    </html>
  );
}
