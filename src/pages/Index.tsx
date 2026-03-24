import Navbar from "@/components/Navbar";
import SectionInicio from "@/components/SectionInicio";
import SectionMusica from "@/components/SectionMusica";
import SectionTimeline from "@/components/SectionTimeline";
import SectionGaleria from "@/components/SectionGaleria";
import SectionCarta from "@/components/SectionCarta";
import { Heart } from "lucide-react";

const FloatingHearts = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {[...Array(12)].map((_, i) => (
      <Heart
        key={i}
        className="absolute text-primary/[0.07] fill-primary/[0.04]"
        style={{
          width: `${14 + (i % 5) * 7}px`,
          left: `${5 + (i * 8.3) % 90}%`,
          top: `${(i * 17.3) % 95}%`,
          animation: `float ${5 + (i % 4) * 2}s ease-in-out infinite alternate`,
          animationDelay: `${i * 0.6}s`,
        }}
      />
    ))}
    <style>{`
      @keyframes float {
        0% { transform: translateY(0) rotate(0deg); }
        100% { transform: translateY(-25px) rotate(12deg); }
      }
    `}</style>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative">
      <FloatingHearts />
      <Navbar />
      <SectionInicio />
      <SectionMusica />
      <SectionTimeline />
      <SectionGaleria />
      <SectionCarta />

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center border-t border-border">
        <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
          <span>Feito com</span>
          <Heart className="w-3.5 h-3.5 text-primary fill-primary" />
          <span>para nós</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
