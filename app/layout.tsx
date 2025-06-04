import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";

//import NavBar from "./Components/Navbar/NavBar";
//import { Footer } from "./Components/Footer";
//import { CartProvider } from "./Context/cartquantityContext";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const monsterrat = Montserrat({
  variable: "--font-monsterrat",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shop.co | Convenience E-commerce Store",
  description: "Shop smarter with Shop.co — your go-to online convenience store for everyday essentials.",
  metadataBase: new URL("https://shop-co-three-blue.vercel.app/"),
  openGraph: {
    title: "Shop.co | Convenience E-commerce Store",
    description: "Shop smarter with Shop.co — your go-to online convenience store for everyday essentials.",
    url: "https://shop-co-three-blue.vercel.app/",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Shop.co | Convenience E-commerce Store",
    description: "Shop smarter with Shop.co — your go-to online convenience store for everyday essentials.",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${monsterrat} ${geistMono.variable} antialiased`}
      >
      
        {children}
      </body>
    </html>
  );
}
