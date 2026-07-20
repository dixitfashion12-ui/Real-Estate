// Small client-only persistence helpers for the demo (inquiries, listings, orders).
// All guarded so they are safe to import anywhere; they no-op during SSR.

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  propertyId?: string;
  propertyTitle?: string;
  agentSlug?: string;
  createdAt: string;
};

export type PostedListing = {
  id: string;
  title: string;
  type: string;
  price: string;
  city: string;
  beds: number;
  baths: number;
  description: string;
  createdAt: string;
};

export type Order = {
  id: string;
  propertySlug: string;
  propertyTitle: string;
  amount: number;
  kind: string; // "Reservation deposit" | "Booking fee"
  name: string;
  email: string;
  last4: string;
  createdAt: string;
};

const INQUIRIES = "homzy:inquiries";
const LISTINGS = "homzy:listings";
const ORDERS = "homzy:orders";

function read<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function write<T>(key: string, items: T[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(items));
  } catch {
    /* ignore */
  }
}

export function makeId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

export const getInquiries = () => read<Inquiry>(INQUIRIES);
export function addInquiry(inq: Omit<Inquiry, "id" | "createdAt">): Inquiry {
  const record: Inquiry = { ...inq, id: makeId("inq"), createdAt: new Date().toISOString() };
  write(INQUIRIES, [record, ...getInquiries()]);
  return record;
}

export const getListings = () => read<PostedListing>(LISTINGS);
export function addListing(listing: Omit<PostedListing, "id" | "createdAt">): PostedListing {
  const record: PostedListing = { ...listing, id: makeId("lst"), createdAt: new Date().toISOString() };
  write(LISTINGS, [record, ...getListings()]);
  return record;
}

export const getOrders = () => read<Order>(ORDERS);
export function addOrder(order: Omit<Order, "id" | "createdAt">): Order {
  const record: Order = { ...order, id: makeId("ord"), createdAt: new Date().toISOString() };
  write(ORDERS, [record, ...getOrders()]);
  return record;
}
