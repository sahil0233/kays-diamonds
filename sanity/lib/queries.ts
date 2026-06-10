export const queries = {
  // -------------------------
  // ALL PRODUCTS
  // -------------------------
  allProducts: `
    *[_type == "product"] | order(_createdAt desc) {
      _id,
      name,
      slug,
      variants{
        colors[]{
          label,
          value,
          swatch,
          images
        },
        metalPurity,
        stoneType
      },
      category->{
        title,
        slug
      },
      tags,
      collections[]->{
        title,
        slug
      },
      description,
      specifications,
      featured
    }
  `,

  // -------------------------
  // FEATURED PRODUCTS
  // -------------------------
  featuredProducts: `
    *[_type == "product" && featured == true]
    | order(_createdAt desc)[0...6] {
      _id,
      name,
      slug,
      variants{
        colors[]{
          label,
          value,
          swatch,
          images
        },
        metalPurity,
        stoneType
      },
      category->{
        title,
        slug
      },
      tags,
      collections[]->{
        title,
        slug
      },
      featured
    }
  `,

  // -------------------------
  // SINGLE PRODUCT BY SLUG
  // -------------------------
  productBySlug: `
    *[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      variants{
        colors[]{
          label,
          value,
          swatch,
          images
        },
        metalPurity,
        stoneType
      },
      category->{
        title,
        slug
      },
      tags,
      collections[]->{
        title,
        slug
      },
      description,
      specifications,
      featured
    }
  `,

  // -------------------------
  // TAGS (UNCHANGED)
  // -------------------------
  tags: `
    array::unique(
      array::compact(*[_type == "product"].tags[])
    )
  `,

  // -------------------------
  // CATEGORIES LIST
  // -------------------------
  categoriesList: `
    *[_type == "category"] | order(title asc) {
      _id,
      title,
      slug
    }
  `,

  // -------------------------
  // COLLECTIONS LIST
  // -------------------------
  collectionsList: `
    *[_type == "collection"] | order(title asc) {
      _id,
      title,
      slug,
      image
    }
  `,

  // -------------------------
  // BLOGS LIST
  // -------------------------
  blogsList: `
    *[_type == "blog" && status == "published"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      "featuredImage": featuredImage{ "url": asset->url, alt },
      "categories": categories[]-> { _id, title, "slug": slug.current },
      "author": author-> { _id, name, "slug": slug.current, "image": image.asset->url },
      publishedAt,
      featured,
      seoTitle,
      seoDescription
    }
  `,

  // -------------------------
  // SINGLE BLOG BY SLUG
  // -------------------------
  blogBySlug: `
    *[_type == "blog" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      body,
      "featuredImage": featuredImage{ "url": asset->url, alt },
      "categories": categories[]-> { _id, title, "slug": slug.current },
      "author": author-> { _id, name, bio, "slug": slug.current, "image": image.asset->url },
      publishedAt,
      relatedPosts[]-> { _id, title, "slug": slug.current },
      featured,
      status,
      seoTitle,
      seoDescription,
      seoKeywords,
      "ogImage": ogImage.asset->url
    }
  `,

  // -------------------------
  // PRODUCTS BY COLLECTION
  // -------------------------
  productsByCollection: `
    *[_type == "product" && references($collectionId)] | order(_createdAt desc) {
      _id,
      name,
      slug,
      variants{
        colors[]{
          label,
          value,
          swatch,
          images
        },
        metalPurity,
        stoneType
      },
      category->{
        title,
        slug
      },
      tags,
      collections[]->{
        title,
        slug
      },
      description,
      specifications,
      featured
    }
  `,
};