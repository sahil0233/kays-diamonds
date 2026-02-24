import { client } from "./client";
import { queries } from "./queries";
import { SanityCollection, SanityProduct } from "./types";

export async function getAllProducts(): Promise<SanityProduct[]> {
  try {
    return await client.fetch(queries.allProducts);
  } catch (error) {
    console.error('Failed to fetch products from Sanity:', error);
    return [];
  }
}

export async function getFeaturedProductsFromSanity(): Promise<SanityProduct[]> {
  try {
    return await client.fetch(queries.featuredProducts);
  } catch (error) {
    console.error('Failed to fetch featured products from Sanity:', error);
    return [];
  }
}

export async function getProductBySlugFromSanity(slug: string): Promise<SanityProduct | null> {
  try {
    return await client.fetch(queries.productBySlug, { slug });
  } catch (error) {
    console.error('Failed to fetch product from Sanity:', error);
    return null;
  }
}

export async function getTags(): Promise<string[]> {
  try {
    return await client.fetch(queries.tags);
  } catch (error) {
    console.error('Failed to fetch tags from Sanity:', error);
    return [];
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const categories = await client.fetch(queries.categoriesList);
    if (!Array.isArray(categories)) return [];
    return categories
      .map((category: { title?: string }) => category?.title)
      .filter((title: string | undefined): title is string => Boolean(title));
  } catch (error) {
    console.error('Failed to fetch categories from Sanity:', error);
    return [];
  }
}

export async function getCollections(): Promise<string[]> {
  try {
    // Use collectionsList query for fetching collections
    const collections = await client.fetch(queries.collectionsList);
    if (!Array.isArray(collections)) return [];
    return collections
      .map((collection: SanityCollection) => collection?.title)
      .filter((title: string | undefined): title is string => Boolean(title));
  } catch (error) {
    console.error('Failed to fetch collections from Sanity:', error);
    return [];
  }
}

export async function getCollectionsWithMeta(): Promise<SanityCollection[]> {

  try {
    return await client.fetch(queries.collectionsList);
  } catch (error) {
    console.error('Failed to fetch collections (full) from Sanity:', error);
    return [];
  }
}

export async function getProductsByCollection(collectionId: string): Promise<SanityProduct[]> {
  try {
    return await client.fetch(queries.productsByCollection, { collectionId });
  } catch (error) {
    console.error('Failed to fetch products by collection from Sanity:', error);
    return [];
  }
}