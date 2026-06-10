import { MetadataRoute } from 'next'
import { getCollectionsWithMeta, getProductsByCollection } from '@/sanity/lib/fetchers'
import { queries } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';

interface BlogSlug {
  slug: string;
  date: string;
}

async function getBlogsUrls(): Promise<MetadataRoute.Sitemap> {
  const blogslugs = await client.fetch<BlogSlug[]>(queries.getallblogslugs);
  
  return blogslugs.map((post: BlogSlug) => ({
    url: `https://www.kaysdiamonds.com/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: 'https://www.kaysdiamonds.com/',
      priority: 1,
    },
    {
      url: 'https://www.kaysdiamonds.com/about',
    },
    {
      url: 'https://www.kaysdiamonds.com/collections',
    },
    {
      url: 'https://www.kaysdiamonds.com/custom-manufacturing',
    },
    {
      url: 'https://www.kaysdiamonds.com/factory-video',
    },
        {
      url: 'https://www.kaysdiamonds.com/blog',
      changeFrequency: "daily",
      lastModified: new Date(),
    },
  ];

  const blogUrls = await getBlogsUrls();

  // Fetch collections from Sanity
  const collections = await getCollectionsWithMeta();

  // Map collections to sitemap entries
  const collectionUrls: MetadataRoute.Sitemap = collections.map((c) => ({
    url: `https://www.kaysdiamonds.com/collections/${c.slug?.current ?? c._id}`,
  }));

  // Fetch products for each collection and map to product URLs
  const productsByCollection = await Promise.all(
    collections.map((c) => getProductsByCollection(c._id))
  );

  const productUrls: MetadataRoute.Sitemap = [];
  for (const products of productsByCollection) {
    for (const p of products) {
      const slug = p.slug?.current;
      if (slug) {
        productUrls.push({ url: `https://www.kaysdiamonds.com/products/${slug}` });
      }
    }
  }

  return [...staticUrls, ...collectionUrls, ...productUrls, ...blogUrls];
}