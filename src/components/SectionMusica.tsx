import { useRef, useEffect, useState } from "react";

const SectionMusica = () => {
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
          {/* Spotify Embed */}
          <iframe
            src="https://open.spotify.com/embed/track/3mBP4pnUfrvWNaYE6dJhFq?utm_source=generator&theme=0"
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-t-2xl"
            title="Litrão - Matheus & Kauan"
          />

          {/* Caption */}
          <div className="p-5 text-center border-t border-border">
            <p className="text-sm text-muted-foreground italic">
              "Essa música que marcou nossa história"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionMusica;
