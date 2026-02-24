import { NormalizedProduct } from "@/sanity/lib/normalizers";
import Link from "next/link";

interface ProductCardProps {
  product: NormalizedProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden focus-visible:ring-2 focus-visible:ring-primary/60"
    >
      {/* Image Container */}
      <div className="aspect-[4/5] overflow-hidden bg-muted mb-4 relative">
        <img
          src={product.variants?.colors?.[0]?.images?.[0] || '/placeholder.svg'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Product Info */}
      <div className="space-y-2 px-4 pb-4">
        {product.tags && product.tags.length > 0 && (
          <p className=" text-[8px] sm:text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1">
            {product.tags.join(", ")}
          </p>
        )}
        <h3 className="font-display text-xl font-semibold text-foreground transition-colors mb-1 line-clamp-2">
          {product.name}
        </h3>
      </div>
    </Link>
  );
};

export default ProductCard;
