import { useEffect, useRef, useState } from "react";

export function Counter({
  to,
  suffix = "",
  duration = 1800,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const step = (now: number) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setN(Math.round(to * eased));
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to, duration]);

  const formatted =
    to >= 1_000_000
      ? `${(n / 1_000_000).toFixed(1)}M`
      : to >= 1000
      ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K`
      : n.toString();

  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  );
}
