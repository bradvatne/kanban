import "./globals.css";
import { Providers } from "@/components/ThemeProvider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className="min-h-screen">
        <Providers>
          <main className="h-full">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
