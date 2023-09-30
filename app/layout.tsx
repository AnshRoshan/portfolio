import "@/styles/globals.css"
import { Metadata } from "next"
import NunitoFonts from "@/utils/fonts"
import { GoogleAnalytics } from "@/components"
import {
  OFFICIAL_AUTHOR_URL,
  OFFICIAL_OG_IMAGE_URL,
  OFFICIAL_PLATOFORM_TWITTER_URL,
  OFFICIAL_TWITTER_IMAGE_URL,
} from "@/utils/constants"

/** @dev initialize nunito font */
const nunito = NunitoFonts

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={nunito.className}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: "Ansh Roshan|Portfolio",
  description: "Full-stack Software Developer | DevOps Engineer | Electrical Engineer",
  authors: {
    name: "Ansh Roshan",
    url: OFFICIAL_PLATOFORM_TWITTER_URL,
  },
  keywords: [
    "Ansh Roshan",
    "Ansh Roshan Portfolio",
    "Portfolio",
    "Electrical Engineer portfolio",
    "Full-stack software developer portfolio",
    "smart contract developer portfolio",
  ],
  icons: {
    icon: "/anshn.svg",
    shortcut: "/anshn.svg",
  },
  metadataBase: new URL(OFFICIAL_AUTHOR_URL),
  alternates: {
    canonical: "/",
  },

  // ######## OG ########
  openGraph: {
    siteName: "Ansh Roshan's Portfolio",
    title: "Ansh Roshan | Portfolio",
    description: "Full-stack Software Developer | DevOps Engineer | Electrical Engineer",
    locale: "en_US",
    type: "website",
    url: "/",
    images: {
      url: OFFICIAL_OG_IMAGE_URL,
      alt: "Ansh Roshan",
      width: 240,
      height: 240,
    },
  },

  // ######## Twitter ########
  twitter: {
    card: "summary_large_image",
    site: OFFICIAL_AUTHOR_URL,
    creator: "@anshzero",
    creatorId: "1525316662429360131",
    title: "Ansh Roshan | Portfolio",
    description: "Full-stack Software Developer | DevOps Engineer | Electrical Engineer",
    images: {
      url: OFFICIAL_TWITTER_IMAGE_URL,
      alt: "Syns Platform Social Image",
      width: 120,
      height: 120,
    },
  },
}
