'use client'

import { useMemo, useState } from 'react'

interface ColorOption {
  label: string
  swatch?: string | null
  imageUrl?: string | null
}

interface ColorSwatchesProps {
  colors: ColorOption[]
}

export default function ColorSwatches({ colors }: ColorSwatchesProps) {
  const safeColors = useMemo(
    () =>
      colors.map((color, index) => ({
        label: color.label || `Color ${index + 1}`,
        swatch: color.swatch ?? null,
        imageUrl: color.imageUrl ?? null,
      })),
    [colors]
  )

  const [selectedColorIndex, setSelectedColorIndex] = useState(0)

  if (safeColors.length === 0) {
    return null
  }

  return (
    <div className="mb-6">
      <h3 className="text-subheading text-primary mb-2">Colors</h3>
      <div className="flex items-center gap-3 flex-wrap">
        {safeColors.map((color, idx) => (
          <button
            key={`${color.label}-${idx}`}
            type="button"
            onClick={() => setSelectedColorIndex(idx)}
            aria-pressed={idx === selectedColorIndex}
            aria-label={color.label}
            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center overflow-hidden shadow-sm transition-colors ${
              idx === selectedColorIndex
                ? 'border-foreground'
                : 'border-transparent hover:border-border'
            }`}
          >
            {color.swatch ? (
              <span
                className="block w-full h-full"
                style={{ backgroundColor: color.swatch }}
              />
            ) : color.imageUrl ? (
              <img
                src={color.imageUrl}
                alt={color.label}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            ) : (
              <span className="text-small px-2">{color.label}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
