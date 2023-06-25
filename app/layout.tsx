import "./globals.css";
import { Providers } from "@/components/ThemeProvider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className="h-screen overflow-hidden">
        <Providers>
          <main className="h-full flex-1">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
