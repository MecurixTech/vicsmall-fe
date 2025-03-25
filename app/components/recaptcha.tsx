"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface RecaptchaProps {
  onVerify: (token: string) => void
  onExpire?: () => void
  siteKey?: string
}

declare global {
  interface Window {
    grecaptcha: any
    onRecaptchaLoad: () => void
  }
}

export default function Recaptcha({
  onVerify,
  onExpire,
  siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
}: RecaptchaProps) {
  const recaptchaRef = useRef<HTMLDivElement>(null)
  const recaptchaWidgetId = useRef<number | null>(null)

  useEffect(() => {
 
    if (!window.grecaptcha) {
      const script = document.createElement("script")
      script.src = `https://www.google.com/recaptcha/api.js?render=explicit&onload=onRecaptchaLoad`
      script.async = true
      script.defer = true

      window.onRecaptchaLoad = initializeRecaptcha

      document.head.appendChild(script)
    } else if (window.grecaptcha.render) {
    
      initializeRecaptcha()
    }

    function initializeRecaptcha() {
      if (recaptchaRef.current && !recaptchaWidgetId.current) {
        try {
          recaptchaWidgetId.current = window.grecaptcha.render(recaptchaRef.current, {
            sitekey: siteKey,
            callback: onVerify,
            "expired-callback": onExpire,
          })
        } catch (error) {
          console.error("Error rendering reCAPTCHA:", error)
        }
      }
    }

    return () => {
    
      window.onRecaptchaLoad = () => {}
    }
  }, [onVerify, onExpire, siteKey])

  return (
    <motion.div
      ref={recaptchaRef}
      className="g-recaptcha my-4 flex justify-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    />
  )
}

