import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./lib/i18n.ts")

const config: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "eldenring.wiki.fextralife.com" },
      { protocol: "https", hostname: "darksouls3.wiki.fextralife.com" },
      { protocol: "https", hostname: "darksouls2.wiki.fextralife.com" },
      { protocol: "https", hostname: "darksouls.wiki.fextralife.com" },
      { protocol: "https", hostname: "bloodborne.wiki.fextralife.com" },
      { protocol: "https", hostname: "cyberpunk.wiki.fextralife.com" },
      { protocol: "https", hostname: "wiki.fextralife.com" },
    ],
  },
}

export default withNextIntl(config)
