import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const slides = useMemo(
    () => [
      "/assets/Royal Elegance.png",
      "/assets/Runway Model.png",
      "/assets/Rock Star.png",
      "/assets/Disco Queen.png",
      "/assets/Cultural Icon.png",
      "/assets/Glam Diva.png",
      "/assets/Pop Star.png",
      "/assets/Hollywood Classic.png",
      "/assets/Latin Queen.png",
      "/assets/Futuristic Star.png",
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  return (
    <div className="grid gap-6 md:grid-cols-2 items-center">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome to Dolls Store</h1>
        <p className="text-gray-600 mb-6">
          Explore our curated collection of dolls complete with descriptions, categories,
          and pricing. Add your favorites to the cart and check out in test mode.
        </p>
        <a
          href="/catalog"
          className="inline-block bg-black text-white px-4 py-2 rounded"
        >
          Browse Catalog
        </a>
      </div>

      
      <section
        className="relative w-full rounded-lg overflow-hidden shadow"
        aria-roledescription="carousel"
        aria-label="Featured dolls"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        
        <div className="slider" aria-live="polite">
          {slides.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`Featured doll ${i + 1} of ${slides.length}`}
              className={`slide ${i === index ? "active" : ""}`}
              style={{ objectFit: "contain", backgroundColor: "#0d0f15" }}
            />
          ))}
        </div>

        
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {slides.map((_, i) => (
            <span
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full cursor-pointer ${
                i === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>

        
        <button
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white text-sm px-2 py-1 rounded"
          onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
        >
          ‹
        </button>
        <button
          aria-label="Next slide"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white text-sm px-2 py-1 rounded"
          onClick={() => setIndex((i) => (i + 1) % slides.length)}
        >
          ›
        </button>
      </section>
    </div>
  );
}
