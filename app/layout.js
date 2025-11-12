import "./globals.css";

export const metadata = {
  title: "Draz Visuals",
  description: "Black and white motion visuals featuring Draz."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

