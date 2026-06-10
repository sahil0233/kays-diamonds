import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import { ArrowLeft, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react'
import CTASection from '../components/CTASection'
import ShareButton from '../components/ShareButton'
import { client } from '@/sanity/lib/client'
import { queries } from '@/sanity/lib/queries'
import { BlogPost as PostType } from '../types'
import { ResolvingMetadata } from 'next'
import imageUrlBuilder from '@sanity/image-url'
import PortableTextRenderer from '../components/PortableTextRenderer'

export const revalidate = 60 // revalidate every 60 seconds

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata (
  props: Props,
  parent: ResolvingMetadata
) {
  const params = await props.params

  const blogPost = await client.fetch<PostType>(queries.blogBySlug, {
    slug: params.slug
  })

  if (!blogPost) {
    return {}
  }

  const previousImages = (await parent).openGraph?.images || []

  const image = blogPost.ogImage || blogPost.featuredImage

  const imageUrl = blogPost.ogImage || blogPost.featuredImage?.url

  const title = blogPost.seoTitle || blogPost.title

  const description = blogPost.seoDescription || blogPost.excerpt || ''

  return {
    title,
    description,

    alternates: {
      canonical: `/blog/${params.slug}`
    },

    openGraph: {
      title,
      description,
      type: 'article',
      images: imageUrl ? [imageUrl, ...previousImages] : previousImages
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : []
    },

    robots: {
      index: true,
      follow: true
    }
  }
}

const components = {
  marks: {
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className='font-bold'>{children}</strong>
    )
  }
}

export default async function BlogPostPage (props: Props) {
  const params = await props.params
  const blogPost = await client.fetch<PostType>(queries.blogBySlug, {
    slug: params.slug
  })

  if (!blogPost) {
    notFound()
  }

  return (
    <>
      <main className='pt-2 flex-grow'>
        <div className='relative h-[60vh] min-h-[400px] bg-gray-600'>
          {blogPost.featuredImage ? (
            <Image
              src={urlFor(blogPost.featuredImage.url).url()}
              alt={blogPost.featuredImage.alt || blogPost.title}
              fill
              priority
              sizes='100vw'
              className='absolute inset-0 h-full w-full object-cover opacity-80'
            />
          ) : (
            <div className='h-full w-full bg-gray-200 rounded-lg mb-8 flex items-center justify-center'>
              <span className='text-gray-500'>No image available</span>
            </div>
          )}
          <div className='absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent' />

          <div className='relative container mx-auto px-4 h-full flex items-end pb-16'>
            <div className='max-w-3xl'>
              <Link
                href='/blog'
                className='inline-flex items-center text-white mb-6 hover:text-purple-300 transition-colors'
              >
                <ArrowLeft className='h-4 w-4 mr-2' />
                Back to Articles
              </Link>
              <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
                {blogPost.title}
              </h1>
              <div className='flex items-center space-x-4 text-white'>
                {blogPost.author?.image ? (
                  <div className='relative w-12 h-12 rounded-full overflow-hidden'>
                    <Image
                      src={urlFor(blogPost.author.image).url()}
                      alt={blogPost.author.name?.toString() || 'Author Image'}
                      fill
                      sizes='100vw'
                      className='object-cover'
                    />
                  </div>
                ) : (
                  <div className='w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center'>
                    <span className='text-gray-500 text-xs'>NA</span>
                  </div>
                )}
                <div>
                  <p className='font-medium'>
                    {blogPost.author?.name?.toString() || 'Guest Post'}
                  </p>
                  <p className='text-sm opacity-75'>
                    {new Date(
                      blogPost.publishedAt?.toString() || ''
                    ).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='container mx-auto px-4 py-12'>
          <div className='flex gap-8'>
            {/* Social Share Sidebar */}
            <div className='hidden lg:block w-16'>
              <div className='sticky top-34 flex flex-col items-center space-y-4'>
                <a
                  href='https://www.instagram.com/kaysdiamonds_export/'
                  target='_blank'
                  className='p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'
                >
                  <Instagram className='h-5 w-5 text-gray-700' />
                </a>
                <ShareButton title={blogPost.title} />
                {/* <a
                                    href="https://www.facebook.com/payshri"
                                    target="_blank"
                                    className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                    <Facebook className="h-5 w-5 text-gray-700" />
                                </a>
                                <a
                                    href="https://x.com/PayShri"
                                    target="_blank"
                                    className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                    <Twitter className="h-5 w-5 text-gray-700" />
                                </a> */}
                <a
                  href='https://www.linkedin.com/company/kays-diamonds/'
                  target='_blank'
                  className='p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'
                >
                  <Linkedin className='h-5 w-5 text-gray-700' />
                </a>
              </div>
            </div>

            {/* Main Content and Sidebar Container */}
            <div className='flex-1 flex gap-8'>
              {/* Article Content */}
              <article className='flex-1'>
                <div className='prose prose-lg prose-purple max-w-none'>
                  <PortableTextRenderer value={blogPost.body} />
                </div>
                {/* Mobile Social Share */}
                <div className='lg:hidden mt-8'>
                  <div className='flex items-center space-x-4'>
                    <a
                      href='https://www.instagram.com/kaysdiamonds_export/'
                      target='_blank'
                      className='p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'
                    >
                      <Instagram className='h-5 w-5 text-gray-700' />
                    </a>
                    <ShareButton title={blogPost.title} />
                    {/* <a
                                                href="https://www.facebook.com/payshri"
                                                target="_blank"
                                                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                                            >
                                                <Facebook className="h-5 w-5 text-gray-700" />
                                            </a>
                                            <a
                                                href="https://x.com/PayShri"
                                                target="_blank"
                                                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                                            >
                                                <Twitter className="h-5 w-5 text-gray-700" />
                                            </a> */}
                    <a
                      href='https://www.linkedin.com/company/kays-diamonds/'
                      target='_blank'
                      className='p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'
                    >
                      <Linkedin className='h-5 w-5 text-gray-700' />
                    </a>
                  </div>
                </div>
              </article>

              {/* Author and Categories Sidebar */}
              <div className='hidden lg:block w-64'>
                <div>
                  {/* Author Info */}
                  <div className='bg-white p-6 rounded-lg shadow-sm mb-6'>
                    <h3 className='text-sm font-medium text-gray-500 mb-4'>
                      WRITTEN BY
                    </h3>
                    <div className='flex items-center space-x-4'>
                      {blogPost.author?.image ? (
                        <div className='relative w-16 h-16 rounded-full overflow-hidden'>
                          <Image
                            src={urlFor(blogPost.author.image).url()}
                            alt={
                              blogPost.author.name?.toString() || 'Author Image'
                            }
                            fill
                            className='object-cover'
                          />
                        </div>
                      ) : (
                        <div className='w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center'>
                          <span className='text-gray-500 text-xs'>NA</span>
                        </div>
                      )}
                      <div>
                        <p className='font-medium'>
                          {blogPost.author?.name?.toString() || 'Guest Post'}
                        </p>
                        {blogPost.author?.bio && (
                          <p className='text-sm text-gray-600 mt-1'>
                            {blogPost.author.bio}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Categories */}
                  {blogPost.categories && blogPost.categories.length > 0 && (
                    <div className='bg-white p-6 rounded-lg shadow-sm'>
                      <h3 className='text-sm font-medium text-gray-500 mb-4'>
                        CATEGORIES
                      </h3>
                      <div className='flex flex-wrap gap-2'>
                        {blogPost.categories.map(
                          (category: { title: string }) => (
                            <span
                              key={category.title}
                              className='px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium'
                            >
                              {category.title}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <CTASection />
    </>
  )
}
