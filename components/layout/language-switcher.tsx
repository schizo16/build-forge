'use client'

import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/lib/navigation"

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const toggle = () => {
    const next = locale === 'en' ? 'vi' : 'en'
    router.replace(pathname, { locale: next })
  }

  return (
    <button
      onClick={toggle}
      className="text-xs uppercase tracking-wider text-forge-muted transition-colors hover:text-forge-text"
      aria-label="Switch language"
    >
      {locale === 'en' ? 'VI' : 'EN'}
    </button>
  )
}
