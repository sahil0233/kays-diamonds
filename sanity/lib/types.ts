import { SanityImageSource } from "@sanity/image-url";

export type PortableTextBlock = {
  _type: string;
  _key: string;
  [key: string]: unknown;
};

export interface SanityProduct {
  _id: string;
  name: string;
  slug: {
    current: string;
  };

  variants: {
    colors: {
      label: string;        // e.g. "Yellow Gold"
      value: string;        // e.g. "yellow"
      swatch?: string;      // hex color
      images: SanityImageSource[];
    }[];
    metalPurity?: string[]; // e.g. ["14K", "18K"]
    stoneType?: string[]; // e.g. ["Diamond", "Ruby"]
  };

  category?: {
    title: string;
    slug?: {
      current: string;
    };
  };

  tags?: string[];

  collections?: {
    title: string;
    slug?: {
      current: string;
    };
  }[];

  description?: string;
  specifications?: PortableTextBlock[];
  featured?: boolean;
}

export interface SanityCollection {
  _id: string;
  title: string;
  slug?: { current: string };
  image?: SanityImageSource;
}