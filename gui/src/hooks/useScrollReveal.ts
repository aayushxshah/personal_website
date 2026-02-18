import { useEffect, useRef } from "react";

type AnimationType = "fade-up" | "slide-up" | "scale-in";

export function useScrollReveal(animation: AnimationType = "fade-up", delay = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            const classMap: Record<AnimationType, string> = {
              "fade-up": "animate-fade-up",
              "slide-up": "animate-slide-up",
              "scale-in": "animate-scale-in",
            };
            el.classList.add(classMap[animation]);
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animation, delay]);

  return ref;
}
