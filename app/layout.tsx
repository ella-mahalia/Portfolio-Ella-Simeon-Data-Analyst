import { ReactNode } from "react";
import { Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Ella Portfolio Website",
  description: "Full Stack Developer Portfolio",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${syne.className} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
