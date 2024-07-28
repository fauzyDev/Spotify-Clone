import { Inter } from "next/font/google";
import "./globals.css";
import SessionProviders from "@/app/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

const APP_NAME = "Spotify Clone";
const APP_DEFAULT_TITLE = "Spotify Clone";
const APP_TITLE_TEMPLATE = "Spotify Clone";
const APP_DESCRIPTION = "Spotify Clone with Next Js 14";

export const metadata = {
    applicationName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    manifest: "/manifest.json",
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
