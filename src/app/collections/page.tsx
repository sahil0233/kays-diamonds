import { getCollectionsWithMeta } from "@/sanity/lib/fetchers";
import { urlFor } from "@/sanity/lib/image";
import { Loader2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Collections = async () => {
  const collections = await getCollectionsWithMeta();

  return (
    <>
      <section className="section-padding pb-6">
        <div className="container-main">
          <div className="text-center max-w-xl mx-auto mb-6">
            <p className="text-xs sm:text-sm uppercase tracking-wider text-primary font-semibold mb-1">Collections</p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-2 text-foreground">Jewelry Collections</h1>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-main">
          {/* {isLoading && (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          )} */}

          {/* {error && (
            <div className="text-center py-16">
              <p className="text-heading text-destructive mb-3">Unable to load collections</p>
              <p className="text-body text-muted-foreground">
                Please refresh or try again later.
              </p>
            </div>
          )} */}

          {collections.length === 0 && (
            <div className="text-center py-16">
              <p className="text-heading text-muted-foreground mb-3">No collections yet</p>
              <p className="text-body text-muted-foreground">
                Add collections in Sanity to see them here.
              </p>
            </div>
          )}

          {collections.length > 0 && (
            <div className="grid gap-3 sm:gap-5 md:gap-8 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
              {collections.map((collection) => (
                <Link
                  key={collection._id}
                  href={`/collections/${encodeURIComponent(collection.slug!.current)}`}
                  className="group border border-border rounded-3xl overflow-hidden flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary/60"
                >
                  {collection.image && (
                    <div className="aspect-square w-full overflow-hidden bg-muted relative">
                      <Image
                        src={urlFor(collection.image).width(800).height(800).url()}
                        width={100}
                        height={100}
                        alt={collection.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                  )}
                  <div className="pt-2 pb-3 px-2 sm:px-4 flex flex-col gap-1 flex-1 justify-between">
                    <h3 className="text-base sm:text-lg font-display font-semibold text-foreground  transition-colors mb-1 text-center">{collection.title}</h3>
                    <div className="mt-auto flex justify-center">
                      <span className="inline-flex items-center gap-1 sm:gap-2 text-foreground font-medium sm:font-semibold group-hover:underline underline-offset-4 text-sm sm:text-base">
                        View collection
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Collections;

