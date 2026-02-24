"use client";

import { getCategories } from "@/sanity/lib/fetchers";
import { Search, X, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categoryFilter: string;
  onCategoryChange: (category: string) => void;
  resultCount: number;
}

const SearchAndFilters = ({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  resultCount,
}: SearchAndFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>(["All"]);

  useEffect(() => {
    let isMounted = true;

    const loadFilters = async () => {
      const cats = await getCategories();
      if (!isMounted) return;
      setCategories(["All", ...cats]);
    };

    loadFilters();

    return () => {
      isMounted = false;
    };
  }, []);

  const hasActiveFilters = 
    categoryFilter !== "All" || 
    searchQuery !== "";


  const clearAllFilters = () => {
    onSearchChange("");
    onCategoryChange("All");
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <Search className="z-10 absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-card/70 border border-border rounded-2xl text-body placeholder:text-muted-foreground text-primary focus:outline-none focus:ring-1 focus:ring-foreground transition-all backdrop-blur-sm"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-sm transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filters Dropdown */}
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full flex items-center justify-between py-2 text-small text-muted-foreground hover:text-foreground transition-colors"
          aria-expanded={isOpen}
        >
          <span>Filters</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
          />
        </button>

        {isOpen && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              {/* Category Filter */}
              <div className="flex-1 min-w-40">
                <label className="text-caption text-muted-foreground block mb-2">
                  Category
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => onCategoryChange(e.target.value)}
                  className="w-full px-4 py-3 bg-card border border-border rounded-sm text-small focus:outline-none focus:ring-1 focus:ring-foreground appearance-none cursor-pointer text-muted-foreground"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            <div className="flex justify-between items-center pt-2">
              <p className="text-small text-muted-foreground">
                {resultCount} {resultCount === 1 ? "product" : "products"} found
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-small link-underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilters;
