import { MetadataRoute } from 'next'
import { getCollectionsWithMeta, getProductsByCollection } from '@/sanity/lib/fetchers'

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
  ];

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

  return [...staticUrls, ...collectionUrls, ...productUrls];
}