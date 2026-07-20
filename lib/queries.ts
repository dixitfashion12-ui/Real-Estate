import { properties, type Property, type PropertyType } from "../data/properties";
import { agents, type Agent } from "../data/agents";
import { PAGE_SIZE, type SortOption } from "../data/filters";

export function getAllProperties(): Property[] {
  return properties;
}

export function getFeaturedProperties(limit = 6): Property[] {
  return properties.slice(0, limit);
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getAgentById(id: string): Agent | undefined {
  return agents.find((a) => a.id === id);
}

export function getAgentBySlug(slug: string): Agent | undefined {
  return agents.find((a) => a.slug === slug);
}

export function getAllAgents(): Agent[] {
  return agents;
}

export function getListingsByAgent(agentId: string): Property[] {
  return properties.filter((p) => p.agentId === agentId);
}

export type PropertyFilters = {
  type?: PropertyType | "all";
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number; // minimum bedrooms
  sort?: SortOption;
  page?: number;
};

export type FilterResult = {
  items: Property[];
  total: number;
  page: number;
  pageCount: number;
  pageSize: number;
};

export function filterProperties(filters: PropertyFilters = {}): FilterResult {
  const {
    type = "all",
    location = "",
    minPrice = 0,
    maxPrice = Number.MAX_SAFE_INTEGER,
    beds = 0,
    sort = "featured",
    page = 1,
  } = filters;

  const loc = location.trim().toLowerCase();

  let items = properties.filter((p) => {
    if (type !== "all" && p.type !== type) return false;
    if (p.priceValue < minPrice || p.priceValue > maxPrice) return false;
    if (beds > 0 && p.beds < beds) return false;
    if (loc) {
      const haystack = `${p.location.city} ${p.location.state} ${p.location.address} ${p.title}`.toLowerCase();
      if (!haystack.includes(loc)) return false;
    }
    return true;
  });

  items = sortProperties(items, sort);

  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), pageCount);
  const start = (safePage - 1) * PAGE_SIZE;
  const paged = items.slice(start, start + PAGE_SIZE);

  return { items: paged, total, page: safePage, pageCount, pageSize: PAGE_SIZE };
}

function sortProperties(items: Property[], sort: SortOption): Property[] {
  const copy = [...items];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.priceValue - b.priceValue);
    case "price-desc":
      return copy.sort((a, b) => b.priceValue - a.priceValue);
    case "newest":
      return copy.sort((a, b) => b.yearBuilt - a.yearBuilt);
    case "area-desc":
      return copy.sort((a, b) => b.areaSqft - a.areaSqft);
    case "featured":
    default:
      return copy;
  }
}
