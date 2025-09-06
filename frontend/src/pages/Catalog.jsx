import { useMemo, useState } from "react";

const PRODUCTS = [
  { id: "royal-elegance", name: "Royal Elegance", price: 39.99, category: "Gala", image: "/assets/Royal Elegance.png", description: "Princess-style gala dress with tiara and white gloves." },
  { id: "runway-model", name: "Runway Model", price: 34.99, category: "Runway", image: "/assets/Runway Model.png", description: "Futuristic runway outfit with oversized glasses and high heels." },
  { id: "rock-star", name: "Rock Star", price: 32.50, category: "Music", image: "/assets/Rock Star.png", description: "Leather jacket, black boots, and a pink electric guitar." },
  { id: "disco-queen", name: "Disco Queen", price: 31.50, category: "Music", image: "/assets/Disco Queen.png", description: "Sparkly sequin suit with a voluminous afro hairstyle." },
  { id: "cultural-icon", name: "Cultural Icon", price: 36.00, category: "Cultural", image: "/assets/Cultural Icon.png", description: "Traditional African-inspired fashion with vibrant prints." },
  { id: "glam-diva", name: "Glam Diva", price: 38.00, category: "Gala", image: "/assets/Glam Diva.png", description: "Shimmering silver dress and elegant red-carpet hairstyle." },
  { id: "pop-star", name: "Pop Star", price: 29.99, category: "Music", image: "/assets/Pop Star.png", description: "Bold pop-star look with handheld microphone." },
  { id: "hollywood-classic", name: "Hollywood Classic", price: 33.00, category: "Classics", image: "/assets/Hollywood Classic.png", description: "Timeless elegance inspired by Golden-Age Hollywood." },
  { id: "latin-queen", name: "Latin Queen", price: 35.00, category: "Cultural", image: "/assets/Latin Queen.png", description: "Colorful, vibrant outfit inspired by Latin rhythms." },
  { id: "futuristic-star", name: "Futuristic Star", price: 37.75, category: "Futuristic", image: "/assets/Futuristic Star.png", description: "Metallic silver dress, neon makeup, and light-up hair." }
];

export default function Catalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(PRODUCTS.map(p => p.category)))],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter(p => {
      const byCat = category === "All" || p.category === category;
      const byText = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      return byCat && byText;
    });
  }, [query, category]);

  function addToCart(p) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const i = cart.findIndex(x => x.id === p.id);
    if (i >= 0) cart[i].qty += 1;
    else cart.push({ ...p, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  }

  return (
    <div className="px-4 sm:px-6 lg:px-0">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-2xl font-semibold">Catalog</h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dolls…"
            className="w-full sm:w-64 border rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by category"
            className="w-full sm:w-44 border rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <span className="self-start sm:self-center text-xs bg-gray-100 border border-gray-200 rounded-full px-2 py-1 text-gray-600">
            {filtered.length} items
          </span>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map(p => (
          <article key={p.id} className="bg-white border rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-56 md:h-60 object-contain object-top bg-gray-900"
              onError={(e) => { e.currentTarget.src = "/assets/Royal Elegance.png"; }}
            />
            <div className="p-3 flex flex-col gap-2">
              <h3 className="text-sm font-medium">{p.name}</h3>
              <p className="text-xs text-gray-600 min-h-[44px] leading-5">{p.description}</p>
              <div className="flex items-center justify-between pt-1">
                <span className="font-semibold">${p.price.toFixed(2)}</span>
                <button
                  className="px-3 py-2 text-sm bg-black text-white rounded-xl transition hover:bg-gray-800 active:scale-[.98]"
                >
                  Add
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
