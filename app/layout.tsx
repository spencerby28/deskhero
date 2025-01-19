
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata = {
  title: "DeskHero - Customer Support Made Simple",
  description: "A modern help desk solution for managing customer support tickets",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <head>
        <script src="https://unpkg.com/react-scan/dist/auto.global.js" async />
      </head>
      <body className="bg-gray-100 dark:bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>
            <div className="w-full">
              {children}
            </div>  
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
