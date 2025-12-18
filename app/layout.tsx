import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nicholas Terrel, PhD",
  description: "Nicholas Terrel — computational chemistry, ML interatomic potentials, HPC, and scientific software.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer className="wrap foot">
          <small>© {new Date().getFullYear()} Nick Terrel</small>
        </footer>
      </body>
    </html>
  );
}
