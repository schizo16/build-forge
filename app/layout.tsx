import type { Metadata } from "next"
import { Cinzel, Inter } from "next/font/google"
import "./globals.css"

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-display" })
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Build Forge — Random Build Generator",
  description: "Random build cho Elden Ring, Dark Souls, Bloodborne, Cyberpunk 2077",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="dark">
      <body className={`${cinzel.variable} ${inter.variable} font-sans bg-forge-bg text-forge-text antialiased`}>
        {children}
      </body>
    </html>
  )
}
