import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EPC Project Manager AI",
  description: "AI-powered bid automation for EPC contractors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased overflow-hidden">
        {children}
      </body>
    </html>
  );
}
