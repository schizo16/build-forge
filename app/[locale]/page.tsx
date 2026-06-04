import { useTranslations } from "next-intl"

export default function HomePage() {
  const t = useTranslations("landing")

  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <h1 className="font-display text-5xl text-accent-gold whitespace-pre-line">
        {t("hero")}
      </h1>
      <p className="mt-4 max-w-xl text-forge-muted">
        {t("subtitle")}
      </p>
    </section>
  )
}
