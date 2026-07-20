import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, MapPin, DollarSign, BedDouble, Building2 } from "lucide-react";
import { Button } from "./button";
import { Tabs, TabsList, TabsTrigger } from "./tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Input } from "./input";
import { searchTabs, priceRanges, bedroomOptions } from "./data/filters";
import type { PropertyType } from "./data/properties";

export function SearchCard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<string>("Buy");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("any");
  const [beds, setBeds] = useState("any");

  const submit = () => {
    const tabDef = searchTabs.find((t) => t.label === tab);
    const range = priceRanges.find((r) => r.value === price);
    const search: Record<string, unknown> = {};
    if (tabDef && tabDef.type !== "all") search.type = tabDef.type as PropertyType;
    if (location.trim()) search.location = location.trim();
    if (range && range.value !== "any") {
      search.minPrice = range.min;
      if (range.max !== Number.MAX_SAFE_INTEGER) search.maxPrice = range.max;
    }
    if (beds !== "any") search.beds = Number(beds);
    navigate({ to: "/properties", search });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="mx-auto mb-3 grid w-full max-w-md grid-cols-4 rounded-full glass p-1 h-11">
          {searchTabs.map((t) => (
            <TabsTrigger
              key={t.label}
              value={t.label}
              className="rounded-full text-white/90 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-soft text-xs sm:text-sm font-medium"
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="rounded-3xl glass p-2 shadow-elevated">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_auto]">
            {/* Location */}
            <div className="group flex h-14 items-center gap-3 rounded-2xl bg-white/95 px-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                <MapPin className="h-4 w-4" />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Location
                </span>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submit()}
                  placeholder="City, neighborhood, ZIP"
                  className="h-auto border-0 bg-transparent p-0 text-sm font-medium text-foreground shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/70"
                />
              </span>
            </div>

            {/* Price */}
            <SelectField icon={DollarSign} label="Price" value={price} onChange={setPrice}
              options={priceRanges.map((r) => ({ value: r.value, label: r.label }))} />

            {/* Bedrooms */}
            <SelectField icon={BedDouble} label="Bedrooms" value={beds} onChange={setBeds}
              options={bedroomOptions} />

            <Button
              onClick={submit}
              size="lg"
              className="h-14 rounded-2xl bg-gradient-accent text-white shadow-glow hover:opacity-95 lg:w-14 lg:min-w-14 lg:px-0"
              aria-label="Search"
            >
              <Search className="h-5 w-5" strokeWidth={2.5} />
              <span className="lg:hidden ml-2 font-semibold">Search 250K+ homes</span>
            </Button>
          </div>
        </div>
      </Tabs>
    </div>
  );
}

function SelectField({
  icon: Icon,
  label,
  value,
  onChange,
  options,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="group flex h-14 items-center gap-3 rounded-2xl bg-white/95 px-4">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
        <Icon className="h-4 w-4" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="h-auto border-0 bg-transparent p-0 text-sm font-medium text-foreground shadow-none focus:ring-0 [&>svg]:hidden">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </span>
    </div>
  );
}
