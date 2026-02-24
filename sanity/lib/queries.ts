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