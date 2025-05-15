import "@/styles/globals.css";

import { TRPCReactProvider } from "@/trpc/react";
import { HydrateClient } from "@/trpc/server";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Geist } from "next/font/google";
import { ToastContainer } from "react-toastify";
import Header from "./_layout/header";

export const metadata: Metadata = {
  title: "Iris Blog - Find tech news and articles",
  authors: [{ name: "Tokiniaina" }],
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <SessionProvider>
          <TRPCReactProvider>
            <HydrateClient>
              <Header />
              <main>{children}</main>
              <ToastContainer />
            </HydrateClient>
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
