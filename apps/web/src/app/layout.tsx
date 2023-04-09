import { Metadata } from "next";
import { ReactNode } from "react";
import "../styles/globals.css";
// include styles from the ui package
import "ui/styles.css";
export const metadata: Metadata = {
  title: {
    default: "Next.js App Router",
    template: "%s | Next.js App Router",
  },
  description:
    "A playground to explore new Next.js App Router features such as nested layouts, instant loading states, streaming, and component level data fetching.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className="bg-zinc-900 text-zinc-300 overflow-x-hidden overflow-y-auto">
      <body>{children}</body>
    </html>
  );
}
