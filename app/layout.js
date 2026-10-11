import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({ subsets: ["latin"], weight: ["200", "300", "500"] });

export const metadata = {
  title: "Nayl × Izik Visuals",
  description: "NAYL × IZIK. Black and white motion visuals, art by Mari Summers."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jost.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </head>
      <body>{children}</body>
    </html>
  );
}
