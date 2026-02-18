import { Mail, Github, Linkedin } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const socials = [
  { icon: Mail, href: "mailto:aayush30shah@berkeley.edu", label: "Email" },
  { icon: Github, href: "https://github.com/aayushxshah", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/aayushshah300/",
    label: "LinkedIn",
  },
];

const ContactSection = () => {
  const ref = useScrollReveal("scale-in");

  return (
    <section id="contact" className="relative px-6 py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-primary/5 blur-[100px]" />
      </div>
      <div ref={ref} className="mx-auto max-w-3xl text-center opacity-0">
        <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-primary">
          Contact
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Have a project in mind? Let's talk.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="glass-card flex h-12 w-12 items-center justify-center text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>

      <footer className="mt-24 text-center text-xs text-muted-foreground/50">
        © {new Date().getFullYear()} Aayush Shah
      </footer>
    </section>
  );
};

export default ContactSection;
