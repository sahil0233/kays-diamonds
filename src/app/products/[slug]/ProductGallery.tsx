'use client'

import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'

interface ProductGalleryImage {
  hero: string
  thumb: string
}

interface ProductGalleryProps {
  images: ProductGalleryImage[]
  productName: string
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoom, setZoom] = useState(1)

  const totalImages = images.length

  const currentImage = useMemo(
    () => (images[currentImageIndex] ? images[currentImageIndex].hero : '/placeholder.svg'),
    [currentImageIndex, images]
  )

  const nextImage = () => {
    if (totalImages <= 1) {
      return
    }
    setCurrentImageIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    if (totalImages <= 1) {
      return
    }
    setCurrentImageIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1))
  }

  useEffect(() => {
    if (!carouselApi || totalImages <= 1) {
      return
    }
    carouselApi.scrollTo(currentImageIndex)
  }, [carouselApi, currentImageIndex, totalImages])

  return (
    <div className="space-y-6">
      <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-muted shadow-soft">
        <button
          type="button"
          onClick={() => {
            setZoom(1)
            setIsFullscreen(true)
          }}
          aria-label="View image fullscreen"
          className="h-full w-full cursor-zoom-in"
        >
          <img src={currentImage} alt={productName} className="h-full w-full object-contain" />
        </button>

        {totalImages > 1 && (
          <>
            <button
              type="button"
              onClick={prevImage}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-primary bg-background/80 p-2 text-primary shadow-subtle backdrop-blur transition hover:bg-background"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-primary bg-background/80 p-2 text-primary shadow-subtle backdrop-blur transition hover:bg-background"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {totalImages > 1 && (
        <Carousel
          className="relative"
          opts={{ align: 'start', dragFree: true }}
          setApi={setCarouselApi}
        >
          <CarouselContent className="-ml-3">
            {images.map((image, index) => (
              <CarouselItem
                key={`${image.thumb}-${index}`}
                className="basis-1/3 pl-3 sm:basis-1/4 lg:basis-1/5"
              >
                <button
                  type="button"
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-4/5 w-full overflow-hidden rounded-2xl bg-muted shadow-subtle transition ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    currentImageIndex === index
                      ? 'border-2 border-yellow-400'
                      : 'border border-transparent'
                  }`}
                >
                  <img
                    src={image.thumb}
                    alt={`${productName} detail ${index + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}

      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsFullscreen(false)}
        >
          <button
            type="button"
            onClick={() => setIsFullscreen(false)}
            aria-label="Close fullscreen"
            className="fixed right-6 top-6 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
          >
            ✕
          </button>
          <div
            className="flex h-full w-full items-center justify-center overflow-auto"
            onWheel={(event) => {
              if (!event.ctrlKey) {
                return
              }
              event.preventDefault()
              const direction = event.deltaY > 0 ? -0.2 : 0.2
              setZoom((prev) => {
                const next = Math.round((prev + direction) * 100) / 100
                return Math.min(3, Math.max(1, next))
              })
            }}
          >
            <img
              src={currentImage}
              alt={productName}
              className="block h-auto w-auto max-h-full max-w-full transition-[width,height] duration-200"
              style={{ width: zoom === 1 ? 'auto' : `${zoom * 100}%`, height: 'auto' }}
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  )
}
