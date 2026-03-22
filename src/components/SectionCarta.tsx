import { useEffect, useRef, useState, useMemo } from "react";
import { Heart, RefreshCw } from "lucide-react";

const lovePhrases = [
  "Você é o melhor capítulo da minha história.",
  "Com você, cada segundo vira eternidade.",
  "Meu lugar favorito é ao seu lado.",
  "Você me faz acreditar que contos de fadas existem.",
  "Amar você é o meu superpoder.",
  "Cada dia ao seu lado é um presente.",
  "Você é meu amanhecer e meu entardecer.",
  "Nosso amor é a melodia mais bonita que já ouvi.",
  "Em um mundo de escolhas, eu sempre escolheria você.",
  "Você faz meu coração dançar sem música.",
  "Seu sorriso ilumina até os dias mais cinzas.",
  "Amar você é respirar — natural e essencial.",
  "Você é a razão dos meus sorrisos mais sinceros.",
  "Meu coração encontrou o lar quando encontrou você.",
  "Cada momento com você é um tesouro que guardo no coração.",
];

const SectionCarta = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const todayPhrase = useMemo(() => {
    const day = Math.floor(Date.now() / 86400000);
    return lovePhrases[day % lovePhrases.length];
  }, []);

  const [phrase, setPhrase] = useState(todayPhrase);

  const randomize = () => {
    let next: string;
    do {
      next = lovePhrases[Math.floor(Math.random() * lovePhrases.length)];
    } while (next === phrase && lovePhrases.length > 1);
    setPhrase(next);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="carta" ref={ref} className="min-h-screen flex items-center justify-center px-6 py-24">
      <div
        className={`max-w-lg w-full text-center space-y-8 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <Heart className="w-10 h-10 text-primary fill-primary mx-auto animate-[heartbeat_1.2s_ease-in-out_infinite]" />

        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Carta de Amor</h2>

        <div className="relative bg-card rounded-2xl p-8 md:p-10 shadow-[0_8px_40px_hsl(340,20%,88%,0.5)]">
          {/* Decorative corner */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-primary/20 rounded-tl-lg" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-primary/20 rounded-br-lg" />

          <p className="text-lg md:text-xl text-foreground leading-relaxed italic font-light">
            "{phrase}"
          </p>

          <button
            onClick={randomize}
            className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors group"
          >
            <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
            Nova frase
          </button>
        </div>

        <p className="text-sm text-muted-foreground">
          Uma frase especial para cada dia do nosso amor 💕
        </p>

        <style>{`
          @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            15% { transform: scale(1.25); }
            30% { transform: scale(1); }
            45% { transform: scale(1.15); }
            60% { transform: scale(1); }
          }
        `}</style>
      </div>
    </section>
  );
};

export default SectionCarta;
