"use client"

import React, { useState } from "react"
import { Share2, Check } from "lucide-react"

export default function ShareButton({ title }: { title?: string }) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : ""
    try {
      if (navigator.share) {
        await navigator.share({ title: title || document.title, text: title, url })
      } else {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (err) {
      try {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (e) {
        // ignore
      }
    }
  }

  return (
    <button
      onClick={handleShare}
      aria-label="Share"
      className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
    >
      {copied ? (
        <Check className="h-5 w-5 text-green-600" />
      ) : (
        <Share2 className="h-5 w-5 text-gray-700" />
      )}
    </button>
  )
}
