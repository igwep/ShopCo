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
  description:
    "Shop smarter with Shop.co — your go-to online convenience store for everyday essentials.",
  metadataBase: new URL("https://shop-co-three-blue.vercel.app/"),
  openGraph: {
    title: "Shop.co | Convenience E-commerce Store",
    description:
      "Shop smarter with Shop.co — your go-to online convenience store for everyday essentials.",
    url: "https://shop-co-three-blue.vercel.app/",
    type: "website",
    siteName: "Shop.co",
    images: [
      {
        url: "/images/bigS.png", 
        width: 1200,
        height: 630,
        alt: "Shop.co - Your Everyday Essentials Delivered",
      },
    ],
  },
  twitter: {
    card: "summary_large_image", 
    title: "Shop.co | Convenience E-commerce Store",
    description:
      "Shop smarter with Shop.co — your go-to online convenience store for everyday essentials.",
    images: ["/images/bigS.png"], 
  },
  robots: {
    index: true,
    follow: true,
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
