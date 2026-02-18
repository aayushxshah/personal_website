import { useScrollReveal } from "@/hooks/useScrollReveal";

const skills = [
  "Python",
  "Java",
  "C++",
  "TypeScript",
  "React",
  "Next.js",
  "Express.js",
  "MongoDB",
  "GraphQL",
  "Tailwind CSS",
  "Docker",
  "Kubernetes",
  "Terraform",
  "Redis",
  "Kafka",
  "NumPy",
  "Pandas",
  "Scikit-Learn",
  "Matplotlib",
  "LangChain",
  "AWS",
  "GCP",
];

const SkillsSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="skills" className="relative px-6 py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-1/3 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[100px]" />
      </div>
      <div ref={ref} className="mx-auto max-w-3xl opacity-0">
        <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-primary">
          Skills
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="glass-chip cursor-default text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
