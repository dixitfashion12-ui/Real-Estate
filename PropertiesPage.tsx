import { getRouteApi, Link } from "@tanstack/react-router";
import { SlidersHorizontal, MapPin, X } from "lucide-react";
import { PropertyCard } from "./PropertyCard";
import { Button } from "./button";
import { Input } from "./input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { filterProperties } from "./lib/queries";
import {
  propertyTypeOptions,
  bedroomOptions,
  priceRanges,
  sortOptions,
  type SortOption,
} from "./data/filters";
import type { PropertyType } from "./data/properties";

const routeApi = getRouteApi("/properties/");

export type PropertiesSearch = {
  type?: PropertyType | "all";
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  sort?: SortOption;
  page?: number;
};

function priceValueFromSearch(minPrice?: number, maxPrice?: number): string {
  const match = priceRanges.find(
    (r) => r.min === (minPrice ?? 0) && (maxPrice ?? Number.MAX_SAFE_INTEGER) === r.max,
  );
  return match ? match.value : "any";
}

export function PropertiesPage() {
  const search = routeApi.useSearch() as PropertiesSearch;
  const navigate = routeApi.useNavigate();

  const result = filterProperties({
    type: search.type ?? "all",
    location: search.location ?? "",
    minPrice: search.minPrice,
    maxPrice: search.maxPrice,
    beds: search.beds,
    sort: search.sort ?? "featured",
    page: search.page ?? 1,
  });

  const update = (patch: Partial<PropertiesSearch>) =>
    navigate({
      search: (prev: PropertiesSearch) => {
        const next: PropertiesSearch = { ...prev, ...patch };
        // Reset to page 1 whenever a filter (not the page itself) changes.
        if (!("page" in patch)) next.page = 1;
        return next;
      },
    });

  const priceValue = priceValueFromSearch(search.minPrice, search.maxPrice);
  const hasFilters =
    (search.type && search.type !== "all") ||
    !!search.location ||
    priceValue !== "any" ||
    (search.beds ?? 0) > 0;

  return (
    <div className="bg-gradient-soft">
      {/* Header */}
      <div className="border-b border-border/60 bg-primary/95 py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold sm:text-4xl">Browse properties</h1>
          <p className="mt-2 text-white/75">
            {result.total} {result.total === 1 ? "home" : "homes"} matching your search
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter bar */}
        <div className="mb-8 rounded-3xl border border-border/60 bg-card p-4 shadow-soft">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search.location ?? ""}
                onChange={(e) => update({ location: e.target.value || undefined })}
                placeholder="Search city or address"
                className="pl-9 rounded-xl"
              />
            </div>

            <FilterSelect
              value={search.type ?? "all"}
              onChange={(v) => update({ type: v === "all" ? undefined : (v as PropertyType) })}
              options={propertyTypeOptions}
              placeholder="Type"
            />

            <FilterSelect
              value={priceValue}
              onChange={(v) => {
                const r = priceRanges.find((x) => x.value === v);
                update({
                  minPrice: r && r.value !== "any" ? r.min : undefined,
                  maxPrice: r && r.value !== "any" && r.max !== Number.MAX_SAFE_INTEGER ? r.max : undefined,
                });
              }}
              options={priceRanges.map((r) => ({ value: r.value, label: r.label }))}
              placeholder="Price"
            />

            <FilterSelect
              value={search.beds ? String(search.beds) : "any"}
              onChange={(v) => update({ beds: v === "any" ? undefined : Number(v) })}
              options={bedroomOptions}
              placeholder="Beds"
            />

            <FilterSelect
              value={search.sort ?? "featured"}
              onChange={(v) => update({ sort: v as SortOption })}
              options={sortOptions}
              placeholder="Sort"
            />
          </div>

          {hasFilters && (
            <div className="mt-3 flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full text-muted-foreground"
                onClick={() =>
                  navigate({ search: {} as PropertiesSearch })
                }
              >
                <X className="h-3.5 w-3.5" /> Clear filters
              </Button>
            </div>
          )}
        </div>

        {/* Results */}
        {result.items.length === 0 ? (
          <div className="rounded-3xl border border-border/60 bg-card p-16 text-center shadow-soft">
            <SlidersHorizontal className="mx-auto h-10 w-10 text-muted-foreground/50" />
            <h3 className="mt-4 font-display text-lg font-semibold text-primary">No properties found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try widening your price range or clearing some filters.
            </p>
            <Button className="mt-6 rounded-full" onClick={() => navigate({ search: {} as PropertiesSearch })}>
              Reset search
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {result.items.map((p) => (
                <PropertyCard key={p.id} p={p} />
              ))}
            </div>

            {/* Pagination */}
            {result.pageCount > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  disabled={result.page <= 1}
                  onClick={() => update({ page: result.page - 1 })}
                >
                  Previous
                </Button>
                {Array.from({ length: result.pageCount }).map((_, i) => (
                  <Button
                    key={i}
                    variant={result.page === i + 1 ? "default" : "outline"}
                    size="icon"
                    className="h-9 w-9 rounded-full"
                    onClick={() => update({ page: i + 1 })}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  disabled={result.page >= result.pageCount}
                  onClick={() => update({ page: result.page + 1 })}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="rounded-xl">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
