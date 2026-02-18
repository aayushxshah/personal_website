import { useScrollReveal } from "@/hooks/useScrollReveal";

const experiences = [
  {
    title: "Software Engineering Intern",
    company: "Ciroos",
    period: "Jul 2025 - Present",
    description: "Building AI SRE Teammate.",
  },
  {
    title: "Software Engineer",
    company: "Berkeleytime",
    period: "Jan 2025 - Present",
    description:
      "Leading observability and platform modernization for a course platform used by 30,000+ students. Instrumenting services, improving reliability, and evolving the stack toward scalable, type-safe architecture.",
  },
  {
    title: "Software Engineering Intern",
    company: "Cisco",
    period: "May 2024 - Aug 2024",
    description:
      "Built internal developer tooling and automated documentation systems, improving engineering workflows and reducing manual overhead through thoughtful full-stack design.",
  },
];

const ExperienceCard = ({
  exp,
  index,
}: {
  exp: (typeof experiences)[0];
  index: number;
}) => {
  const ref = useScrollReveal("slide-up", index * 120);

  return (
    <div ref={ref} className="glass-card p-6 opacity-0">
      <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <h3 className="font-display text-base font-semibold text-foreground">
          {exp.title}
        </h3>
        <span className="text-xs text-muted-foreground">{exp.period}</span>
      </div>
      <p className="mt-1 text-sm font-medium text-primary/80">{exp.company}</p>
      <p className="mt-2 text-sm text-muted-foreground">{exp.description}</p>
    </div>
  );
};

const ExperienceSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="experience" className="relative px-6 py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/3 bottom-1/4 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px]" />
      </div>
      <div className="mx-auto max-w-3xl">
        <div ref={ref} className="opacity-0">
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-primary">
            Experience
          </h2>
        </div>
        <div className="mt-6 space-y-4">
          {experiences.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
