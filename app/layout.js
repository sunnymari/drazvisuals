import "./globals.css";

export const metadata = {
  title: "Draz Visuals",
  description: "Black and white motion visuals featuring Draz."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </head>
      <body>{children}</body>
    </html>
  );
}

