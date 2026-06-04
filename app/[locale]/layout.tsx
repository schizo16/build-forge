import { NextIntlClientProvider } from "next-intl"
import { notFound } from "next/navigation"
import { Nav } from "@/components/layout/nav"
import { Footer } from "@/components/layout/footer"
import { PageTransition } from "@/components/page-transition"
import { routing } from "@/lib/routing"

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!(routing.locales as readonly string[]).includes(locale)) notFound()

  return (
    <NextIntlClientProvider locale={locale}>
      <Nav />
      <main className="min-h-screen"><PageTransition>{children}</PageTransition></main>
      <Footer />
    </NextIntlClientProvider>
  )
}
