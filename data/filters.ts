import type { PropertyType } from "./properties";

export type SortOption = "featured" | "price-asc" | "price-desc" | "newest" | "area-desc";

export const propertyTypeOptions: { value: PropertyType | "all"; label: string }[] = [
  { value: "all", label: "All properties" },
  { value: "sale", label: "For Sale" },
  { value: "rent", label: "For Rent" },
  { value: "commercial", label: "Commercial" },
];

// Tab labels used by the hero search widget → mapped to a PropertyType filter.
export const searchTabs: { label: string; type: PropertyType | "all" }[] = [
  { label: "Buy", type: "sale" },
  { label: "Rent", type: "rent" },
  { label: "Commercial", type: "commercial" },
  { label: "Projects", type: "all" },
];

export const bedroomOptions: { value: string; label: string }[] = [
  { value: "any", label: "Any" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
  { value: "5", label: "5+" },
];

export const priceRanges: { value: string; label: string; min: number; max: number }[] = [
  { value: "any", label: "Any price", min: 0, max: Number.MAX_SAFE_INTEGER },
  { value: "0-500k", label: "Up to $500K", min: 0, max: 500000 },
  { value: "500k-1m", label: "$500K – $1M", min: 500000, max: 1000000 },
  { value: "1m-3m", label: "$1M – $3M", min: 1000000, max: 3000000 },
  { value: "3m-6m", label: "$3M – $6M", min: 3000000, max: 6000000 },
  { value: "6m+", label: "$6M+", min: 6000000, max: Number.MAX_SAFE_INTEGER },
];

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
  { value: "area-desc", label: "Largest area" },
];

export const cities: string[] = [
  "Beverly Hills", "Manhattan", "Austin", "Miami", "Malibu", "Boston",
  "Denver", "Nashville", "Seattle", "Los Angeles", "Portland", "Chicago",
  "San Diego", "Raleigh", "San Francisco",
];

export const PAGE_SIZE = 6;
