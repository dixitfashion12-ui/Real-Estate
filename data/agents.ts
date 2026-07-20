export type Agent = {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  phone: string;
  email: string;
  photo: string;
  years: number;
  salesVolume: string;
  rating: number;
  listingIds: string[];
};

export const agents: Agent[] = [
  {
    id: "a1",
    slug: "sophia-bennett",
    name: "Sophia Bennett",
    role: "Luxury Homes",
    bio: "Sophia specializes in high-end estates and waterfront properties across California. With over a decade guiding discerning buyers, she blends white-glove service with sharp negotiation to close above-target deals.",
    phone: "+1 (415) 555-0112",
    email: "sophia@homzy.com",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    years: 12,
    salesVolume: "$180M",
    rating: 4.9,
    listingIds: ["p1", "p5", "p9", "p13"],
  },
  {
    id: "a2",
    slug: "marcus-reed",
    name: "Marcus Reed",
    role: "Urban Condos",
    bio: "Marcus knows every tower in the metro core. He helps first-time buyers and investors find smart, well-priced condos with strong appreciation and rental potential.",
    phone: "+1 (212) 555-0148",
    email: "marcus@homzy.com",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    years: 9,
    salesVolume: "$96M",
    rating: 4.8,
    listingIds: ["p2", "p6", "p10", "p14"],
  },
  {
    id: "a3",
    slug: "aiko-tanaka",
    name: "Aiko Tanaka",
    role: "Investment Specialist",
    bio: "Aiko advises investors on yield, cash flow, and long-term growth. Her data-driven approach has helped clients build portfolios across emerging tech corridors.",
    phone: "+1 (512) 555-0175",
    email: "aiko@homzy.com",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    years: 11,
    salesVolume: "$142M",
    rating: 5.0,
    listingIds: ["p3", "p7", "p11", "p15"],
  },
  {
    id: "a4",
    slug: "david-whitmore",
    name: "David Whitmore",
    role: "Suburban & Family",
    bio: "David has helped hundreds of families find their forever home. He's an expert on school districts, commute times, and neighborhoods that grow with you.",
    phone: "+1 (617) 555-0193",
    email: "david@homzy.com",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    years: 18,
    salesVolume: "$212M",
    rating: 4.9,
    listingIds: ["p4", "p8", "p12", "p16"],
  },
  {
    id: "a5",
    slug: "elena-rossi",
    name: "Elena Rossi",
    role: "New Developments",
    bio: "Elena partners with premier developers to bring buyers early access to new-construction projects, from pre-launch pricing to final walkthrough.",
    phone: "+1 (305) 555-0210",
    email: "elena@homzy.com",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    years: 7,
    salesVolume: "$74M",
    rating: 4.7,
    listingIds: ["p17", "p18"],
  },
  {
    id: "a6",
    slug: "james-okafor",
    name: "James Okafor",
    role: "Commercial",
    bio: "James handles retail, office, and mixed-use commercial deals. He helps business owners and investors evaluate location, zoning, and return on investment.",
    phone: "+1 (312) 555-0236",
    email: "james@homzy.com",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    years: 14,
    salesVolume: "$158M",
    rating: 4.8,
    listingIds: ["p19", "p20"],
  },
];
