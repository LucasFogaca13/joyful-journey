import { useState, useEffect, useRef } from "react";
import { Heart, Calendar } from "lucide-react";

// Data do início do relacionamento — ajuste aqui!
const START_DATE = new Date("2023-08-25T00:00:00");

const milestones = [
  { date: "4 de Agosto, 2023", text: "Conheceu meus pais." },
  { date: "31 de Dezembro, 2023", text: "Primeiro Ano Novo juntos!" },
  { date: "1 de Fevereiro, 2025", text: "Nossa primeira viagem juntos." },
  { date: "24 de Agosto, 2025", text: "Seu primeiro buquê." },
];

const SectionTimeline = () => {
  const [elapsed, setElapsed] = useState(getElapsed());
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  function getElapsed() {
    const now = new Date();
    const diff = now.getTime() - START_DATE.getTime();
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);
    const d = days - years * 365 - months * 30;
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { years, months, days: d, hours, minutes, seconds, totalDays: days };
  }

  useEffect(() => {
    const timer = setInterval(() => setElapsed(getElapsed()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const timeUnits = [
    { value: elapsed.years, label: "Anos" },
    { value: elapsed.months, label: "Meses" },
    { value: elapsed.days, label: "Dias" },
    { value: elapsed.hours, label: "Horas" },
    { value: elapsed.minutes, label: "Minutos" },
    { value: elapsed.seconds, label: "Segundos" },
  ];

  return (
    <section id="timeline" ref={ref} className="min-h-screen px-6 py-24">
      <div className="max-w-3xl mx-auto space-y-16">
        {/* Counter */}
        <div
          className={`text-center space-y-6 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Juntos há <span className="text-primary">{elapsed.totalDays}</span> dias
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {timeUnits.map((unit) => (
              <div
                key={unit.label}
                className="bg-card rounded-xl p-3 shadow-[0_4px_20px_hsl(340,20%,88%,0.4)]"
              >
                <div className="text-2xl md:text-3xl font-bold text-primary tabular-nums">
                  {String(unit.value).padStart(2, "0")}
                </div>
                <div className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
          <div className="space-y-10">
            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`relative transition-all duration-600 ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${400 + i * 150}ms` }}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1.5 mt-5 shadow-md z-10" />

                  {/* Card - mobile always right, desktop alternates */}
                  <div className={`ml-10 md:ml-0 md:flex ${isLeft ? "md:justify-start" : "md:justify-end"}`}>
                    <div className={`md:w-[calc(50%-28px)] ${isLeft ? "md:mr-auto md:pr-0" : "md:ml-auto md:pl-0"}`}>
                      <div className={`bg-card rounded-xl p-5 shadow-[0_4px_24px_hsl(340,20%,88%,0.35)] hover:shadow-[0_6px_30px_hsl(340,20%,88%,0.5)] transition-shadow duration-300 ${isLeft ? "md:text-right" : "md:text-left"}`}>
                        <div className={`flex items-center gap-2 text-xs text-muted-foreground mb-2 ${isLeft ? "md:justify-end" : ""}`}>
                          <Calendar className="w-3.5 h-3.5" />
                          <span className="font-medium">{m.date}</span>
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">{m.text}</p>
                        <Heart className={`w-3.5 h-3.5 text-primary/30 fill-primary/20 mt-3 ${isLeft ? "md:ml-auto" : ""}`} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionTimeline;
