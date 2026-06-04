import type { Metadata } from "next"
import { Cinzel, Inter, Be_Vietnam_Pro } from "next/font/google"
import "./globals.css"

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-display" })
const inter = Inter({ subsets: ["latin", "vietnamese"], variable: "--font-sans" })
const beVietnam = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-vn",
})

export const metadata: Metadata = {
  title: "Build Forge — Random Build Generator",
  description: "Random build cho Elden Ring, Dark Souls, Bloodborne, Cyberpunk 2077",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="dark">
      <body className={`${cinzel.variable} ${inter.variable} ${beVietnam.variable} font-sans bg-forge-bg text-forge-text antialiased`}>
        {children}
      </body>
    </html>
  )
}
