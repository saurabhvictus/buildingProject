import "./globals.css";

export const metadata = {
  title: "Building Dashboard",
  description: "Apartment Building Control System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}