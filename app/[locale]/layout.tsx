import { NextIntlClientProvider } from "next-intl"
import { notFound } from "next/navigation"
import { Nav } from "@/components/layout/nav"
import { Footer } from "@/components/layout/footer"

const locales = ["en", "vi"]

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!locales.includes(locale)) notFound()

  return (
    <NextIntlClientProvider locale={locale}>
      <Nav />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  )
}
