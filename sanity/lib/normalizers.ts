import { createImageUrlBuilder, SanityImageSource } from "@sanity/image-url";
import { PortableTextBlock, SanityCollection, SanityProduct } from "./types";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
export interface NormalizedProduct {
  id: string;
  name: string;
  slug: string;

  variants: {
    colors: {
      label: string;
      value: string;
      swatch?: string;
      images: string[]; // URLs (already built)
    }[];
    metalPurity: string[];
    stoneType: string[]; // e.g. ["Diamond", "Ruby"]
  };

  category: string;
  tags: string[];
  collections: string[];

  description: string;
  specifications?: PortableTextBlock[];
  featured: boolean;
}

export interface NormalizedCollection {
  id: string;
  title: string;
  slug: string;
  image?: string;
}

export function normalizeSanityProduct(
  product: SanityProduct
): NormalizedProduct {
  return {
    id: product._id,
    name: product.name,
    slug: product.slug.current,

    variants: {
      colors: (product.variants?.colors ?? []).map((color) => ({
        label: color.label,
        value: color.value,
        swatch: color.swatch,
        images: (color.images ?? []).map((img) =>
          urlFor(img).width(800).url()
        ),
      })),
      metalPurity: product.variants?.metalPurity ?? [],
      stoneType: product.variants?.stoneType ?? [],
    },

    category: product.category?.title ?? "",
    tags: product.tags ?? [],
    collections: (product.collections ?? []).map((c) => c.title),

    description: product.description ?? '',
    specifications: product.specifications,
    featured: product.featured ?? false,
  };
}

export function normalizeSanityCollection(collection: SanityCollection): NormalizedCollection {
  const fallbackSlug = collection.title?.toLowerCase().replace(/\s+/g, "-") || collection._id;
  return {
    id: collection._id,
    title: collection.title,
    slug: collection.slug?.current || fallbackSlug,
    image: collection.image ? urlFor(collection.image).width(800).url() : undefined,
  };
}