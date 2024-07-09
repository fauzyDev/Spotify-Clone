import { Inter } from "next/font/google";
import "./globals.css";
import SessionProviders from "@/app/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify clone",
  description: "Project spotify clone",
}; 

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <SessionProviders session={session}>
      {children}
      </SessionProviders>
      </body>
    </html>
  );
}
