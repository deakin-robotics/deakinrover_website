import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

export const metadata: Metadata = {
  title: "Deakin Rover Team",
  description: "Deakin Rover project and mission information.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en-AU">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
