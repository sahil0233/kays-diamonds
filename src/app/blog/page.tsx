import { client } from '@/sanity/lib/client'
import { queries } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import HeroSection from './components/HeroSection'
import CTASection from './components/CTASection'


export const revalidate = 60; // revalidate every 60 seconds

interface BlogCategory {
  _id: string;
  title: string;
  slug?: string;
}

interface BlogAuthor {
  _id: string;
  name?: string;
  slug?: string;
  image?: string; // image url
  bio?: string;
}

export interface BlogListItem {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  featuredImage?: {
    url: string;
    alt?: string;
  };
  categories?: BlogCategory[];
  author?: BlogAuthor;
  publishedAt?: string;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export default async function BlogPage() {
const blogList = await client.fetch<BlogListItem[]>(queries.blogsList)

  return (
    <>
    <section className='top-section-padding'>
        <HeroSection />
    </section>
        {/* <CategoryNav />  */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Featured Articles</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
          Featured insights, expert guides, and industry updates from the world of diamonds and fine jewelry.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogList.map((blog) => (
            <article 
              key={blog._id} 
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-md overflow-hidden group"
            >
              {blog.featuredImage?.url? (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={urlFor(blog.featuredImage.url).url()}
                    alt={blog.featuredImage.alt || blog.title}
                    fill
                    sizes='100vw'
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="relative h-48 w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  {blog.author?.image && blog.author?.name && (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                      <Image
                        src={urlFor(blog.author.image).url()}
                        alt={blog.author.name}
                        fill
                        sizes='100vw'
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <span className="text-sm font-medium text-gray-900">{blog.author?.name}</span>
                    <p className="text-xs text-gray-500">{new Date(blog.publishedAt?.toString() || '').toLocaleDateString()}</p>
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold text-[#07215e] mb-3 group-hover:text-blue-600 transition-colors">
                  <Link href={`/blog/${blog.slug}`}>
                    {blog.title}
                  </Link>
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
                
                <div className="flex flex-wrap gap-2">
                  {blog.categories?.map((category) => (
                    <span
                      key={category.title}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full font-medium"
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <CTASection />
    </>
  )
}