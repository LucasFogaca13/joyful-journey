import { useState, useEffect } from "react";
import { Heart, Moon, Sun } from "lucide-react";

const navItems = [
  { id: "inicio", label: "Início" },
  { id: "musica", label: "Nossa Música" },
  { id: "timeline", label: "Linha do Tempo" },
  { id: "galeria", label: "Galeria" },
  { id: "carta", label: "Carta" },
];

const Navbar = () => {
  const [active, setActive] = useState("inicio");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActive(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md shadow-[0_2px_20px_hsl(340,20%,88%,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center">
        <button onClick={() => scrollTo("inicio")} className="flex items-center gap-1.5 group shrink-0">
          <Heart className="w-5 h-5 text-primary fill-primary transition-transform group-hover:scale-110" />
          <span className="font-semibold text-sm text-foreground tracking-wide">Nós</span>
        </button>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-1 mx-auto">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollTo(item.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  active === item.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/70 transition-colors shrink-0"
          aria-label="Alternar tema"
        >
          {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-2 ml-auto">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/70 transition-colors"
            aria-label="Alternar tema"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1 p-2"
          aria-label="Menu"
        >
          <span className={`block w-5 h-0.5 bg-foreground transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
          <span className={`block w-5 h-0.5 bg-foreground transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-foreground transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border px-4 pb-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active === item.id ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
