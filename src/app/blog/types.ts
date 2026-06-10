import type { PortableTextBlock } from "@portabletext/types";

export type BlogPost = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  featuredImage?: {
    url: string
    alt?: string
  }
  categories?: {
    _id: string
    title: string
    slug?: string
  }[]
  author?: {
    _id: string
    name?: string
    slug?: string
    image?: string // image url
    bio?: string
  }
  body: PortableTextBlock[]
  publishedAt?: string
  featured?: boolean
  seoTitle?: string
  seoDescription?: string
}
