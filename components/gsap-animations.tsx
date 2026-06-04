'use client'

import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function GsapAnimations() {
  useGSAP(() => {
    const words = gsap.utils.toArray<HTMLElement>(".gsap-word")
    if (words.length === 0) return
    gsap.fromTo(words,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power3.out" }
    )
  })

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".gsap-card")
    if (cards.length === 0) return
    gsap.fromTo(cards,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power2.out",
        scrollTrigger: { trigger: cards[0].parentElement, start: "top 85%" }
      }
    )
  })

  useGSAP(() => {
    const bars = gsap.utils.toArray<HTMLElement>(".gsap-bar")
    if (bars.length === 0) return
    bars.forEach((el) => {
      const w = el.getAttribute("data-width") || "0%"
      gsap.fromTo(el,
        { width: "0%" },
        {
          width: w, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" }
        }
      )
    })
  })

  useGSAP(() => {
    const phases = gsap.utils.toArray<HTMLElement>(".gsap-phase")
    if (phases.length === 0) return
    gsap.fromTo(phases,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: phases[0].parentElement, start: "top 85%" }
      }
    )
  })

  return null
}
