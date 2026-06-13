import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "David Diema - Portfolio Développeur Full-Stack",
  description: "Portfolio de David Diema, étudiant en BUT 3 Informatique. Découvrez mes projets, mon parcours et mes compétences.",
  openGraph: {
    title: "David Diema - Portfolio",
    description: "Développeur Full-Stack. Découvrez mon parcours et mes projets comme Upger ou Ultimate Neon Space.",
    url: "https://ton-lien-ici.vercel.app", // N'oublie pas de mettre ton vrai lien une fois le site en ligne !
    siteName: "Portfolio David Diema",
    images: [
      {
        url: "/photo_david.png", // L'image qui apparaîtra en grand sur Discord
        width: 800,
        height: 600,
        alt: "Portrait de David Diema",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} antialiased`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}