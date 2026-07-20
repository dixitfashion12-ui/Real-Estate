export type PropertyType = "sale" | "rent" | "commercial";

export type Property = {
  id: string;
  slug: string;
  title: string;
  type: PropertyType;
  status: string; // "For Sale" | "For Rent" | "For Lease"
  priceValue: number; // numeric for filtering/sorting (monthly for rentals)
  priceLabel: string; // formatted, e.g. "$4,250,000" or "$8,200 / mo"
  location: { city: string; state: string; address: string; lat: number; lng: number };
  beds: number;
  baths: number;
  garage: number;
  areaSqft: number;
  images: string[];
  description: string;
  features: string[];
  agentId: string;
  verified?: boolean;
  isNew?: boolean;
  yearBuilt: number;
};

const GALLERY = {
  villa: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=800&fit=crop",
  ],
  penthouse: [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop",
  ],
  house: [
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&h=800&fit=crop",
  ],
  suite: [
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&h=800&fit=crop",
  ],
  ocean: [
    "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
  ],
  brownstone: [
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
  ],
  commercial: [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop",
  ],
};

const FEATURES_HOME = [
  "Central air conditioning",
  "Hardwood flooring",
  "Chef's kitchen with island",
  "Walk-in closets",
  "Smart-home system",
  "Private garden",
];
const FEATURES_CONDO = [
  "Floor-to-ceiling windows",
  "Concierge & doorman",
  "Fitness center",
  "Rooftop terrace",
  "In-unit laundry",
  "Secured parking",
];
const FEATURES_COMMERCIAL = [
  "High foot traffic location",
  "Flexible open floor plan",
  "Loading dock access",
  "Ample parking",
  "Modern HVAC",
  "Fiber internet ready",
];

export const properties: Property[] = [
  {
    id: "p1", slug: "palm-grove-villa", title: "Palm Grove Villa", type: "sale", status: "For Sale",
    priceValue: 4250000, priceLabel: "$4,250,000",
    location: { city: "Beverly Hills", state: "CA", address: "1420 Palm Grove Dr", lat: 34.0736, lng: -118.4004 },
    beds: 5, baths: 4, garage: 2, areaSqft: 4820, images: GALLERY.villa,
    description: "A sun-drenched modern villa in the heart of Beverly Hills. Soaring ceilings, an open chef's kitchen, and seamless indoor-outdoor living around a resort-style pool make this a rare offering.",
    features: FEATURES_HOME, agentId: "a1", verified: true, isNew: true, yearBuilt: 2019,
  },
  {
    id: "p2", slug: "skyline-penthouse", title: "Skyline Penthouse", type: "sale", status: "For Sale",
    priceValue: 7900000, priceLabel: "$7,900,000",
    location: { city: "Manhattan", state: "NY", address: "88 Central Park W, PH", lat: 40.7736, lng: -73.9712 },
    beds: 4, baths: 3, garage: 1, areaSqft: 3600, images: GALLERY.penthouse,
    description: "Perched above the city, this penthouse frames uninterrupted skyline and park views through floor-to-ceiling glass. A private elevator opens into a gallery-like great room.",
    features: FEATURES_CONDO, agentId: "a2", verified: true, yearBuilt: 2016,
  },
  {
    id: "p3", slug: "willow-creek-house", title: "Willow Creek House", type: "sale", status: "For Sale",
    priceValue: 1180000, priceLabel: "$1,180,000",
    location: { city: "Austin", state: "TX", address: "305 Willow Creek Ln", lat: 30.2672, lng: -97.7431 },
    beds: 4, baths: 3, garage: 2, areaSqft: 2750, images: GALLERY.house,
    description: "A warm, contemporary family home minutes from the tech corridor. Vaulted living spaces, a large backyard, and top-rated schools nearby.",
    features: FEATURES_HOME, agentId: "a3", verified: true, isNew: true, yearBuilt: 2021,
  },
  {
    id: "p4", slug: "azure-tower-suite", title: "Azure Tower Suite", type: "rent", status: "For Rent",
    priceValue: 8200, priceLabel: "$8,200 / mo",
    location: { city: "Miami", state: "FL", address: "1 Azure Tower, Unit 2201", lat: 25.7617, lng: -80.1918 },
    beds: 3, baths: 2, garage: 1, areaSqft: 1950, images: GALLERY.suite,
    description: "A turnkey luxury rental with bay views, resort amenities, and walkable access to the beach and dining. Fully furnished options available.",
    features: FEATURES_CONDO, agentId: "a4", verified: true, yearBuilt: 2018,
  },
  {
    id: "p5", slug: "oceanview-residence", title: "Oceanview Residence", type: "sale", status: "For Sale",
    priceValue: 12500000, priceLabel: "$12,500,000",
    location: { city: "Malibu", state: "CA", address: "27000 Pacific Coast Hwy", lat: 34.0259, lng: -118.7798 },
    beds: 6, baths: 5, garage: 3, areaSqft: 6400, images: GALLERY.ocean,
    description: "An architectural masterpiece on the sand. Walls of glass dissolve into the Pacific, with an infinity pool, home theater, and private beach access.",
    features: FEATURES_HOME, agentId: "a1", verified: true, isNew: true, yearBuilt: 2020,
  },
  {
    id: "p6", slug: "historic-brownstone", title: "Historic Brownstone", type: "sale", status: "For Sale",
    priceValue: 2350000, priceLabel: "$2,350,000",
    location: { city: "Boston", state: "MA", address: "42 Beacon St", lat: 42.3576, lng: -71.0689 },
    beds: 4, baths: 3, garage: 1, areaSqft: 3200, images: GALLERY.brownstone,
    description: "A meticulously restored brownstone blending period detail with modern comfort. Original moldings, a chef's kitchen, and a landscaped garden.",
    features: FEATURES_HOME, agentId: "a2", verified: true, yearBuilt: 1904,
  },
  {
    id: "p7", slug: "cedar-park-bungalow", title: "Cedar Park Bungalow", type: "sale", status: "For Sale",
    priceValue: 685000, priceLabel: "$685,000",
    location: { city: "Denver", state: "CO", address: "1180 Cedar Park Ave", lat: 39.7392, lng: -104.9903 },
    beds: 3, baths: 2, garage: 1, areaSqft: 1680, images: GALLERY.house,
    description: "A charming, move-in ready bungalow with mountain views, a renovated kitchen, and a covered porch perfect for Colorado evenings.",
    features: FEATURES_HOME, agentId: "a3", verified: true, yearBuilt: 1998,
  },
  {
    id: "p8", slug: "maple-ridge-estate", title: "Maple Ridge Estate", type: "sale", status: "For Sale",
    priceValue: 3120000, priceLabel: "$3,120,000",
    location: { city: "Nashville", state: "TN", address: "9 Maple Ridge Ct", lat: 36.1627, lng: -86.7816 },
    beds: 5, baths: 5, garage: 3, areaSqft: 5100, images: GALLERY.villa,
    description: "A gated estate on two private acres with a guest house, saltwater pool, and a wine cellar. Timeless craftsmanship throughout.",
    features: FEATURES_HOME, agentId: "a4", verified: true, isNew: true, yearBuilt: 2017,
  },
  {
    id: "p9", slug: "harbor-point-loft", title: "Harbor Point Loft", type: "rent", status: "For Rent",
    priceValue: 5400, priceLabel: "$5,400 / mo",
    location: { city: "Seattle", state: "WA", address: "700 Harbor Point, Loft 5", lat: 47.6062, lng: -122.3321 },
    beds: 2, baths: 2, garage: 1, areaSqft: 1520, images: GALLERY.suite,
    description: "An industrial-chic waterfront loft with exposed brick, 14-foot ceilings, and a private balcony over the marina.",
    features: FEATURES_CONDO, agentId: "a1", verified: true, yearBuilt: 2012,
  },
  {
    id: "p10", slug: "sunset-boulevard-condo", title: "Sunset Boulevard Condo", type: "rent", status: "For Rent",
    priceValue: 3950, priceLabel: "$3,950 / mo",
    location: { city: "Los Angeles", state: "CA", address: "8500 Sunset Blvd, Unit 410", lat: 34.0900, lng: -118.3859 },
    beds: 2, baths: 2, garage: 1, areaSqft: 1280, images: GALLERY.penthouse,
    description: "A stylish condo on the Strip with pool, gym, and concierge. Steps from the best dining and nightlife in West Hollywood.",
    features: FEATURES_CONDO, agentId: "a2", verified: true, isNew: true, yearBuilt: 2015,
  },
  {
    id: "p11", slug: "riverside-townhome", title: "Riverside Townhome", type: "sale", status: "For Sale",
    priceValue: 940000, priceLabel: "$940,000",
    location: { city: "Portland", state: "OR", address: "220 Riverside Way", lat: 45.5152, lng: -122.6784 },
    beds: 3, baths: 3, garage: 2, areaSqft: 2100, images: GALLERY.house,
    description: "A modern townhome along the river with rooftop deck, EV charging, and energy-efficient design. Walk to parks and cafes.",
    features: FEATURES_HOME, agentId: "a3", verified: true, yearBuilt: 2022,
  },
  {
    id: "p12", slug: "greenwood-family-home", title: "Greenwood Family Home", type: "sale", status: "For Sale",
    priceValue: 1450000, priceLabel: "$1,450,000",
    location: { city: "Chicago", state: "IL", address: "5410 Greenwood Ave", lat: 41.8781, lng: -87.6298 },
    beds: 4, baths: 3, garage: 2, areaSqft: 2980, images: GALLERY.brownstone,
    description: "A classic Chicago family home on a tree-lined street. Updated systems, finished basement, and a fenced yard in a top school district.",
    features: FEATURES_HOME, agentId: "a4", verified: true, yearBuilt: 1962,
  },
  {
    id: "p13", slug: "vista-hills-mansion", title: "Vista Hills Mansion", type: "sale", status: "For Sale",
    priceValue: 8750000, priceLabel: "$8,750,000",
    location: { city: "San Diego", state: "CA", address: "3 Vista Hills Rd", lat: 32.7157, lng: -117.1611 },
    beds: 6, baths: 6, garage: 4, areaSqft: 7200, images: GALLERY.villa,
    description: "A hilltop mansion with panoramic ocean and city views, a resort pool, home gym, and a 12-seat theater. The pinnacle of coastal living.",
    features: FEATURES_HOME, agentId: "a1", verified: true, isNew: true, yearBuilt: 2018,
  },
  {
    id: "p14", slug: "midtown-studio", title: "Midtown Studio", type: "rent", status: "For Rent",
    priceValue: 2600, priceLabel: "$2,600 / mo",
    location: { city: "Manhattan", state: "NY", address: "245 W 40th St, Studio 12B", lat: 40.7549, lng: -73.9884 },
    beds: 1, baths: 1, garage: 0, areaSqft: 640, images: GALLERY.suite,
    description: "An efficient, light-filled studio in the center of it all. Doorman building with gym and roof deck; transit at your doorstep.",
    features: FEATURES_CONDO, agentId: "a2", verified: true, yearBuilt: 2010,
  },
  {
    id: "p15", slug: "lakefront-cottage", title: "Lakefront Cottage", type: "sale", status: "For Sale",
    priceValue: 775000, priceLabel: "$775,000",
    location: { city: "Raleigh", state: "NC", address: "18 Lakefront Trail", lat: 35.7796, lng: -78.6382 },
    beds: 3, baths: 2, garage: 1, areaSqft: 1740, images: GALLERY.house,
    description: "A serene lakefront cottage with a private dock, screened porch, and open living spaces. Ideal for weekend escapes or full-time calm.",
    features: FEATURES_HOME, agentId: "a3", verified: true, isNew: true, yearBuilt: 2005,
  },
  {
    id: "p16", slug: "the-grand-colonial", title: "The Grand Colonial", type: "sale", status: "For Sale",
    priceValue: 2680000, priceLabel: "$2,680,000",
    location: { city: "Boston", state: "MA", address: "77 Colonial Dr", lat: 42.3601, lng: -71.0589 },
    beds: 5, baths: 4, garage: 2, areaSqft: 4100, images: GALLERY.brownstone,
    description: "A stately colonial with grand entry, formal dining, library, and a chef's kitchen. Set on manicured grounds in a prestigious enclave.",
    features: FEATURES_HOME, agentId: "a4", verified: true, yearBuilt: 1988,
  },
  {
    id: "p17", slug: "aurora-new-tower", title: "Aurora New Tower", type: "sale", status: "For Sale",
    priceValue: 1650000, priceLabel: "$1,650,000",
    location: { city: "Miami", state: "FL", address: "500 Aurora Blvd, Res 1804", lat: 25.7907, lng: -80.1300 },
    beds: 2, baths: 2, garage: 1, areaSqft: 1420, images: GALLERY.penthouse,
    description: "Pre-launch pricing at Miami's newest luxury tower. Smart residences, spa-level amenities, and bay views. Delivery next year.",
    features: FEATURES_CONDO, agentId: "a5", verified: true, isNew: true, yearBuilt: 2025,
  },
  {
    id: "p18", slug: "solaris-garden-flats", title: "Solaris Garden Flats", type: "sale", status: "For Sale",
    priceValue: 890000, priceLabel: "$890,000",
    location: { city: "Austin", state: "TX", address: "12 Solaris Way, Flat 3", lat: 30.2849, lng: -97.7341 },
    beds: 2, baths: 2, garage: 1, areaSqft: 1300, images: GALLERY.suite,
    description: "Brand-new garden flats with private patios, rooftop solar, and a shared courtyard. Sustainable design in a vibrant neighborhood.",
    features: FEATURES_CONDO, agentId: "a5", verified: true, isNew: true, yearBuilt: 2024,
  },
  {
    id: "p19", slug: "market-street-retail", title: "Market Street Retail", type: "commercial", status: "For Lease",
    priceValue: 14500, priceLabel: "$14,500 / mo",
    location: { city: "San Francisco", state: "CA", address: "200 Market St, Ground Fl", lat: 37.7936, lng: -122.3965 },
    beds: 0, baths: 2, garage: 0, areaSqft: 3200, images: GALLERY.commercial,
    description: "Prime ground-floor retail on a high-traffic corridor. Floor-to-ceiling storefront glass, flexible layout, and heavy pedestrian flow.",
    features: FEATURES_COMMERCIAL, agentId: "a6", verified: true, yearBuilt: 2008,
  },
  {
    id: "p20", slug: "gateway-office-suite", title: "Gateway Office Suite", type: "commercial", status: "For Lease",
    priceValue: 22000, priceLabel: "$22,000 / mo",
    location: { city: "Chicago", state: "IL", address: "310 Gateway Plaza, Fl 9", lat: 41.8858, lng: -87.6229 },
    beds: 0, baths: 3, garage: 0, areaSqft: 6800, images: GALLERY.commercial,
    description: "A full-floor office suite with skyline views, modern conference rooms, and abundant natural light. Move-in ready with fiber connectivity.",
    features: FEATURES_COMMERCIAL, agentId: "a6", verified: true, isNew: true, yearBuilt: 2014,
  },
];
