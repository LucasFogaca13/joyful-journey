import Navbar from "@/components/Navbar";
import SectionInicio from "@/components/SectionInicio";
import SectionMusica from "@/components/SectionMusica";
import SectionTimeline from "@/components/SectionTimeline";
import SectionGaleria from "@/components/SectionGaleria";
import SectionCarta from "@/components/SectionCarta";
import { Heart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <SectionInicio />
      <SectionMusica />
      <SectionTimeline />
      <SectionGaleria />
      <SectionCarta />

      {/* Footer */}
      <footer className="py-8 text-center border-t border-border">
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
