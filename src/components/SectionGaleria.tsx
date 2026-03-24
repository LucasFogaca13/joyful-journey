import { useState, useRef, useEffect } from "react";
import { ImageIcon } from "lucide-react";
import primeiroEncontro from "@/assets/primeiro-encontro.jpeg";

const categories = ["Todos", "Momentos", "Família", "Viagens"];

const photos = [
  { id: 1, category: "Momentos", label: "Nosso primeiro encontro", src: primeiroEncontro },
  { id: 2, category: "Momentos", label: "Cinema juntos", src: null },
  { id: 3, category: "Família", label: "Natal em família", src: null },
  { id: 4, category: "Família", label: "Almoço de domingo", src: null },
  { id: 5, category: "Viagens", label: "Praia", src: null },
  { id: 6, category: "Viagens", label: "Montanha", src: null },
  { id: 7, category: "Momentos", label: "Piquenique", src: null },
  { id: 8, category: "Viagens", label: "Cachoeira", src: null },
];

const SectionGaleria = () => {
  const [filter, setFilter] = useState("Todos");
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const filtered = filter === "Todos" ? photos : photos.filter((p) => p.category === filter);

  return (
    <section id="galeria" ref={ref} className="min-h-screen px-6 py-24">
      <div className="max-w-4xl mx-auto space-y-10">
        <div
          className={`text-center space-y-4 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Nossa Galeria</h2>
          <p className="text-muted-foreground text-sm">Momentos que guardaremos para sempre</p>
        </div>

        {/* Filter tabs */}
        <div
          className={`flex justify-center gap-2 flex-wrap transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === cat
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((photo, i) => (
            <div
              key={photo.id}
              className={`group relative aspect-square bg-gradient-to-br from-primary/10 via-secondary to-accent/10 rounded-xl overflow-hidden shadow-[0_4px_16px_hsl(340,20%,88%,0.3)] hover:shadow-[0_8px_30px_hsl(340,20%,88%,0.5)] transition-all duration-500 cursor-pointer ${
                visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: `${300 + i * 80}ms` }}
            >
              {photo.src ? (
                <img src={photo.src} alt={photo.label} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/50 gap-2">
                  <ImageIcon className="w-8 h-8" />
                  <span className="text-[10px] font-medium">{photo.label}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300 flex items-end p-3">
                <span className="text-primary-foreground text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md">
                  {photo.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionGaleria;
