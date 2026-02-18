import { useScrollReveal } from "@/hooks/useScrollReveal";

const AboutSection = () => {
  const ref = useScrollReveal("scale-in");

  return (
    <section id="about" className="relative px-6 py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/4 top-1/2 h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />
      </div>
      <div ref={ref} className="mx-auto max-w-3xl opacity-0">
        <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-primary">
          About
        </h2>
        <div className="glass-card mt-6 p-8">
          <p className="text-base leading-relaxed text-muted-foreground">
            I’m a Computer Science and Data Science student at UC Berkeley who
            loves building things that are both intelligent and scalable.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            I’m especially drawn to machine learning and AI agents, not just
            training models, but figuring out how they live inside real systems.
            I enjoy thinking about how data flows through an application, how
            decisions get made, and how everything can be made observable,
            reliable, and easy to improve. Most of what I build sits somewhere
            between distributed systems and applied AI. I like taking ambitious
            ideas and turning them into real, working software with architecture
            that’s clean, thoughtful, and built to evolve over time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
