import { ArrowLeft } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProductBySlugFromSanity } from '@/sanity/lib/fetchers'
import { urlFor } from '@/sanity/lib/image'
import ProductGallery from './ProductGallery'
import ColorSwatches from './ColorSwatches'
import MetalOptions from './MetalOptions'
import StoneTypeOptions from './StoneTypeOptions'
import Image from 'next/image'
import { Metadata } from 'next'

export const revalidate = 60

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlugFromSanity(slug)

  // Fallback if product not found
  if (!product) {
    return {
      title: 'Product Not Found',
      robots: { index: false, follow: false }
    }
  }

  return {
    title: product.name,
    description: product.description?.slice(0, 160),
    alternates: {
      canonical: `https://www.kaysdiamonds.com/products/${slug}`
    },
    openGraph: {
      title: product.name,
      description: product.description?.slice(0, 160),
      url: `https://www.kaysdiamonds.com/products/${slug}`,
      // images: product.ogImage
      //   ? [{ url: product.ogImage, width: 800, height: 800, alt: product.title }]
      //   : undefined  // falls back to layout default OG image
    }
  }
}



export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProductBySlugFromSanity(slug)

  if (!product) {
    notFound()
  }

  const colors = product.variants?.colors ?? []
  const metalPurities = product.variants?.metalPurity ?? []
  const stoneTypes = product.variants?.stoneType ?? []
  const images = colors.flatMap((color) => color.images ?? [])
  const imageUrls = images.map((image) => ({
    hero: urlFor(image).width(1200).url(),
    thumb: urlFor(image).width(600).url(),
  }))
  const colorSwatches = colors.map((color, index) => ({
    label: color.label ?? `Color ${index + 1}`,
    swatch: color.swatch ?? null,
    imageUrl: color.images?.[0]
      ? urlFor(color.images[0]).width(120).url()
      : null,
  }))

   const waHref = `https://wa.me/?text=${encodeURIComponent(
    `I'm interested in ${product.name}`
  )}`

  return (
    <div className="section-padding">
      <div className="container-main">
        <Link
          href="/collections"
          className="inline-flex items-center text-small text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Collections
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <ProductGallery images={imageUrls} productName={product.name} />

          <div className="space-y-8">
            <div className='lg:sticky lg:top-24 rounded-2xl border border-border/60 bg-background/80 backdrop-blur-sm p-6 md:p-8 shadow-sm'>
                <h1 className='text-display text-primary mb-4'>
                  {product.name}
                </h1>
                <p className='text-body-large text-muted-foreground mb-6'>
                  {product.description}
                </p>
                {colorSwatches.length > 0 && (
                  <ColorSwatches colors={colorSwatches} />
                )}
              {metalPurities.length > 0 && (
                <MetalOptions metals={metalPurities} />
              )}
              {stoneTypes.length > 0 && (
                <StoneTypeOptions stoneTypes={stoneTypes} />
              )}

            {product.specifications && product.specifications.length > 0 && (
              <div className="rounded-3xl border border-border bg-background p-6 shadow-subtle">
                <h2 className="text-subheading text-foreground mb-4">Specifications</h2>
                <div className="prose prose-neutral max-w-none text-foreground">
                  <PortableText value={product.specifications} />
                </div>
              </div>
            )}
            
                            {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                  <div className='flex flex-wrap gap-2 mb-8'>
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className='px-3 py-1.5 bg-secondary/70 text-secondary-foreground text-caption rounded-full'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                                {/* CTA */}
                <div className='space-y-4'>
                  <div className='flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-4'>
                    <Link
                      href='/inquire'
                      className='btn-primary px-5 py-2.5 text-sm h-11'
                    >
                      Inquire More
                    </Link>
                    <a
                      href={waHref}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label='Contact on WhatsApp'
                      className='inline-flex items-center'
                    >
                      <Image
                        src="/assets/icons/whatsapp-icon-with-text.svg"
                        height={100}
                        width={100}
                        alt='WhatsApp'
                        className='h-11 w-auto'
                      />
                    </a>
                  </div>
                  <div className='flex items-center gap-2 text-small text-muted-foreground'>
                    <span className='inline-flex h-2 w-2 rounded-full bg-emerald-500' />
                    Our team will respond within 24 hours
                  </div>
                </div>
                </div>

          </div>
        </div>
      </div>
    </div>
  )
}

