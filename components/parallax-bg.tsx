'use client'

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function ParallaxBg({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        {children}
      </motion.div>
    </div>
  )
}
