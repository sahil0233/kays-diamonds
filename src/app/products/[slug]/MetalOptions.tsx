'use client'

import { useMemo, useState } from 'react'

interface MetalOptionsProps {
  metals: string[]
}

export default function MetalOptions({ metals }: MetalOptionsProps) {
  const options = useMemo(
    () => metals.filter((metal) => Boolean(metal)),
    [metals]
  )
  const [selectedMetalIndex, setSelectedMetalIndex] = useState(0)

  if (options.length === 0) {
    return null
  }

  return (
    <div className="mb-6">
      <h3 className="text-subheading text-primary mb-2">Metal</h3>
      <div className="flex items-center gap-3 flex-wrap">
        {options.map((metal, idx) => (
          <button
            key={`${metal}-${idx}`}
            type="button"
            onClick={() => setSelectedMetalIndex(idx)}
            aria-pressed={idx === selectedMetalIndex}
            className={`px-3 py-1.5 rounded-full border text-small transition-colors ${
              idx === selectedMetalIndex
                ? 'border-foreground bg-primary/10'
                : 'border-transparent bg-primary/60 hover:border-border'
            }`}
          >
            {metal}
          </button>
        ))}
      </div>
    </div>
  )
}
