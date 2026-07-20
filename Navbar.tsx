import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Home, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "./button";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import { useAuth } from "./context/AuthContext";

const menu: { label: string; to: string; search?: Record<string, unknown> }[] = [
  { label: "Home", to: "/" },
  { label: "Buy", to: "/properties", search: { type: "sale" } },
  { label: "Rent", to: "/properties", search: { type: "rent" } },
  { label: "Commercial", to: "/properties", search: { type: "commercial" } },
  { label: "Agents", to: "/agents" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user, hydrated, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "glass" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-accent shadow-glow">
            <Home className="h-4 w-4 text-white" strokeWidth={2.5} />
          </span>
          <span className="text-lg font-bold tracking-tight text-primary">Homzy</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {menu.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              search={item.search as never}
              className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-foreground/5 text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {hydrated && user ? (
            <>
              <Button asChild variant="ghost" size="sm" className="rounded-full">
                <Link to="/dashboard">
                  <LayoutDashboard className="h-4 w-4" /> {user.name.split(" ")[0]}
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="rounded-full border-foreground/15" onClick={logout}>
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="rounded-full">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="rounded-full border-foreground/15">
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
          <Button
            asChild
            size="sm"
            className="rounded-full bg-gradient-accent text-white shadow-soft hover:opacity-95"
          >
            <Link to="/post-property">Post Property</Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] p-6">
            <div className="mb-8 flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-accent">
                <Home className="h-4 w-4 text-white" strokeWidth={2.5} />
              </span>
              <span className="text-lg font-bold">Homzy</span>
            </div>
            <nav className="flex flex-col gap-1">
              {menu.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  search={item.search as never}
                  className="rounded-lg px-3 py-3 text-base font-medium hover:bg-muted"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-2">
              {hydrated && user ? (
                <>
                  <Button asChild variant="outline" className="rounded-full">
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                  <Button variant="ghost" className="rounded-full" onClick={logout}>
                    Logout
                  </Button>
                </>
              ) : (
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/login">Login</Link>
                </Button>
              )}
              <Button asChild className="rounded-full bg-gradient-accent text-white">
                <Link to="/post-property">Post Property</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
