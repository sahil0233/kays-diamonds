'use client'

import { useMemo, useState } from 'react'

interface StoneTypeOptionsProps {
  stoneTypes: string[]
}

export default function StoneTypeOptions({ stoneTypes }: StoneTypeOptionsProps) {
  const options = useMemo(
    () => stoneTypes.filter((stoneType) => Boolean(stoneType)),
    [stoneTypes]
  )
  const [selectedStoneTypeIndex, setSelectedStoneTypeIndex] = useState(0)

  if (options.length === 0) {
    return null
  }

  return (
    <div className="mb-6">
      <h3 className="text-subheading text-primary mb-2">Stone Type</h3>
      <div className="flex items-center gap-3 flex-wrap">
        {options.map((stoneType, idx) => (
          <button
            key={`${stoneType}-${idx}`}
            type="button"
            onClick={() => setSelectedStoneTypeIndex(idx)}
            aria-pressed={idx === selectedStoneTypeIndex}
            className={`px-3 py-1.5 rounded-full border text-small transition-colors ${
              idx === selectedStoneTypeIndex
                ? 'border-foreground bg-primary/10'
                : 'border-transparent bg-primary/60 hover:border-border'
            }`}
          >
            {stoneType}
          </button>
        ))}
      </div>
    </div>
  )
}
