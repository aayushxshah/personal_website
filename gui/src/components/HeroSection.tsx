const HeroSection = () => (
  <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
    {/* Background glow */}
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
    </div>

    <div className="relative z-10 mx-auto max-w-3xl text-center">
      <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
        Software Engineer
      </p>
      <h1 className="font-display text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-7xl">
        Aayush Shah
      </h1>
      <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
        Turning ideas into real, working systems.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <a
          href="#contact"
          className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Get in Touch
        </a>
        <a
          href="#experience"
          className="glass-chip text-muted-foreground transition-colors hover:text-foreground"
        >
          View Experience
        </a>
      </div>
    </div>
  </section>
);

export default HeroSection;
