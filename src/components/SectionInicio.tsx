import { Heart, ChevronDown } from "lucide-react";

const SectionInicio = () => {
  const scrollToMusica = () => {
    document.getElementById("musica")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
    >
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-primary/10 fill-primary/5"
            style={{
              width: `${20 + i * 8}px`,
              left: `${10 + i * 15}%`,
              top: `${15 + (i % 3) * 25}%`,
              animation: `float ${4 + i}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center space-y-8 animate-[fadeUp_1s_ease-out]">
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground tracking-tight">
            Laís
          </h1>
          <Heart
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 text-primary fill-primary animate-[heartbeat_1.2s_ease-in-out_infinite]"
          />
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground tracking-tight">
            Lucas
          </h1>
        </div>

        <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto leading-relaxed italic font-light">
          "Em cada batida do meu coração, existe um pedaço de nós dois."
        </p>

        <button
          onClick={scrollToMusica}
          className="group inline-flex flex-col items-center gap-2 mt-8 text-primary hover:text-primary/80 transition-colors"
        >
          <span className="text-sm font-medium tracking-wider uppercase">Nossa Música</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>

      <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.25); }
          30% { transform: scale(1); }
          45% { transform: scale(1.15); }
          60% { transform: scale(1); }
        }
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(24px); filter: blur(4px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
      `}</style>
    </section>
  );
};

export default SectionInicio;
