import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";
import { ToastProvider } from "@/components/shared/toastContainer";
import "./globals.css";
import SuccessLogoutToast from "@/components/shared/successLogoutToast";
import SuccessLoggedInToast from "@/components/shared/successLogInToast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Health care",
  description: "Remagine your better health with us",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ToastProvider />
        <SuccessLoggedInToast/>
        <SuccessLogoutToast />
      </body>
    </html>
  );
}
