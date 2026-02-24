"use client";
import { useMemo, useState, useEffect } from "react";
import SearchAndFilters from "@/src/components/SearchAndFilters";
import ProductCard from "@/components/ui/ProductCard";
import { Loader2, ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { getCollectionsWithMeta, getProductsByCollection } from "@/sanity/lib/fetchers";
import { normalizeSanityProduct } from "@/sanity/lib/normalizers";
import type { NormalizedProduct } from "@/sanity/lib/normalizers";
import type { SanityCollection, SanityProduct } from "@/sanity/lib/types";

const CollectionPage = () => {
  const pathname = usePathname();
  const collectionSlug = pathname.split("/").pop();

  const [collections, setCollections] = useState<SanityCollection[]>([]);
  const [collectionsLoading, setCollectionsLoading] = useState(true);
  const [collectionsError, setCollectionsError] = useState<Error | null>(null);

  const [products, setProducts] = useState<SanityProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState<Error | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    let isMounted = true;
    const loadCollections = async () => {
      setCollectionsLoading(true);
      setCollectionsError(null);
      try {
        const data = await getCollectionsWithMeta();
        if (!isMounted) return;
        setCollections(data);
      } catch (error) {
        if (!isMounted) return;
        setCollectionsError(error as Error);
      } finally {
        if (!isMounted) return;
        setCollectionsLoading(false);
      }
    };

    loadCollections();

    return () => {
      isMounted = false;
    };
  }, []);

  const activeCollection = useMemo(
    () => collections.find((c) => c.slug?.current === collectionSlug),
    [collections, collectionSlug]
  );

  useEffect(() => {
    let isMounted = true;
    const loadProducts = async () => {
      if (!activeCollection?._id) {
        setProducts([]);
        setProductsLoading(false);
        return;
      }
      setProductsLoading(true);
      setProductsError(null);
      try {
        const data = await getProductsByCollection(activeCollection._id);
        if (!isMounted) return;
        setProducts(data);
      } catch (error) {
        if (!isMounted) return;
        setProductsError(error as Error);
      } finally {
        if (!isMounted) return;
        setProductsLoading(false);
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, [activeCollection?._id]);

  const filterProducts = (
    items: SanityProduct[],
    category: string,
    query: string
  ) => {
    const normalizedQuery = query.trim().toLowerCase();

    return items.filter((product) => {
      const matchesCategory =
        category === "All" || product.category?.title === category;

      const matchesQuery =
        normalizedQuery.length === 0 ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.category?.title?.toLowerCase().includes(normalizedQuery) ||
        product.collections?.some((c) =>
          c.title.toLowerCase().includes(normalizedQuery)
        ) ||
        product.tags?.some((tag) => tag.toLowerCase().includes(normalizedQuery));

      return matchesCategory && matchesQuery;
    });
  };

  const displayProducts = useMemo(() => {
    return filterProducts(products, categoryFilter, searchQuery);
  }, [products, categoryFilter, searchQuery]);

  const normalizedProducts = useMemo<NormalizedProduct[]>(() => {
    return displayProducts.map(normalizeSanityProduct);
  }, [displayProducts]);

  const collectionName = activeCollection?.title ?? (collectionSlug ?? "").replace(/-/g, " ");

  const isLoading = collectionsLoading || productsLoading;
  const hasError = Boolean(collectionsError || productsError);

  return (
    <>
      {/* Header */}
      <section className="section-padding pb-8">
        <div className="container-main">
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all collections
            </Link>
          </div>

          <div className="max-w-2xl">
            <p className="text-caption text-muted-foreground mb-2">
              Collection
            </p>
            <h1 className="text-display mb-4">
              {collectionName || "Collection"}
            </h1>
            {activeCollection && (
              <p className="text-body-large text-muted-foreground">
                A curated selection from our <span className="font-semibold">{activeCollection.title}</span> collection.
              </p>
            )}
            {!activeCollection && (
              <p className="text-body-large text-muted-foreground">
                Showing products tagged with this collection.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="pb-20">
        <div className="container-main">
          <div className="mb-12">
            <SearchAndFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              categoryFilter={categoryFilter}
              onCategoryChange={setCategoryFilter}
              resultCount={displayProducts.length}
            />
          </div>

          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          )}

          {hasError && !isLoading && (
            <div className="text-center py-20">
              <p className="text-heading text-destructive mb-4">
                Error loading products
              </p>
              <p className="text-body text-muted-foreground">
                Please try refreshing the page.
              </p>
            </div>
          )}

          {!isLoading && !hasError && displayProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-heading text-muted-foreground mb-4">
                No products found
              </p>
              <p className="text-body text-muted-foreground">
                Try adjusting your filters or search query.
              </p>
            </div>
          )}

          {!isLoading && !hasError && normalizedProducts.length > 0 && (
            <div className="grid grid-cols-1 min-[380px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {normalizedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CollectionPage;


