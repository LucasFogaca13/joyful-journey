import { useState, useRef, useEffect } from "react";
import { Play, Pause, Music } from "lucide-react";

const SectionMusica = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="musica"
      ref={ref}
      className="min-h-screen flex items-center justify-center px-6 py-24"
    >
      <div
        className={`max-w-sm w-full transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="bg-card rounded-2xl shadow-[0_8px_40px_hsl(340,20%,88%,0.5)] overflow-hidden">
          {/* Album cover */}
          <div className="relative aspect-square bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 flex items-center justify-center">
            <div className="text-center space-y-3">
              <Music className="w-16 h-16 text-primary/40 mx-auto" />
              <p className="text-xs text-muted-foreground">Capa do álbum</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
          </div>

          {/* Song info */}
          <div className="p-6 space-y-4 text-center">
            <div>
              <h3 className="text-xl font-bold text-foreground">Litrão</h3>
              <p className="text-sm text-muted-foreground mt-1">Matheus & Kauan</p>
            </div>

            {/* Progress bar */}
            <div className="space-y-1">
              <div className="h-1 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: isPlaying ? "45%" : "0%" }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>{isPlaying ? "1:32" : "0:00"}</span>
                <span>3:24</span>
              </div>
            </div>

            {/* Play button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-0.5" />
              )}
            </button>

            <p className="text-sm text-muted-foreground italic pt-2 border-t border-border">
              "Essa música que marcou nossa história"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionMusica;
