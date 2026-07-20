import { useState, useEffect } from "react";
import { MessageCircle, Phone, X, Mail } from "lucide-react";

export function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {open && (
        <>
          <a
            href="tel:+17754749842"
            aria-label="Call us"
            className="flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-white shadow-elevated hover:opacity-95"
          >
            <Phone className="h-4 w-4" />
            <span className="text-sm font-semibold">Call</span>
          </a>
          <a
            href="mailto:hello@homzy.com"
            aria-label="Email us"
            className="flex items-center gap-2 rounded-full bg-accent px-4 py-3 text-white shadow-elevated hover:opacity-95"
          >
            <Mail className="h-4 w-4" />
            <span className="text-sm font-semibold">Email</span>
          </a>
        </>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close contact" : "Open contact"}
        aria-expanded={open}
        className="grid h-14 w-14 place-items-center rounded-full bg-success text-white shadow-elevated transition-transform hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
