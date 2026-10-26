import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { Braces, File, FileText, Files, Folder, FolderOpen, Github, Mail, PanelLeftClose, Search } from "lucide-react";
import AsciiSculpture from "@/components/AsciiSculpture";
import "./ExplorerPage.css";

const experience = [
  { slug: "ciroos", name: "Ciroos", role: "Member of Technical Staff", period: "2026—present", type: "AI / SRE", detail: "Building and evaluating an AI teammate for incident diagnosis and resolution across realistic cloud systems." },
  { slug: "berkeleytime", name: "Berkeleytime", role: "Software Engineer", period: "2025—2026", type: "Platform", detail: "Led observability and platform modernization for a course platform used by more than 30,000 students." },
  { slug: "cisco", name: "Cisco", role: "Software Engineering Intern", period: "2024", type: "Developer tools", detail: "Built internal developer tooling and automated documentation workflows to make technical content easier to create and explore." },
] as const;

const files = [
  { id: "readme", name: "README.md" },
  { id: "about", name: "about.md" },
  ...experience.map(item => ({ id: item.slug, name: `${item.slug}.md` })),
  { id: "skills", name: "skills.json" },
  { id: "contact", name: "contact.txt" },
] as const;
type FileId = (typeof files)[number]["id"];
type ExperienceId = (typeof experience)[number]["slug"];

function isExperienceFile(id: FileId): id is ExperienceId {
  return experience.some(item => item.slug === id);
}

function FileIcon({ name }: { name: string }) {
  const Icon = name.endsWith(".md") ? FileText : name.endsWith(".json") ? Braces : File;
  const type = name.endsWith(".md") ? "markdown-icon" : name.endsWith(".json") ? "json-icon" : "text-icon";
  return <span className={`file-icon ${type}`} aria-hidden="true"><Icon size={14} strokeWidth={1.8} /></span>;
}

const skillGroups = [
  { key: "languages", values: ["Python", "TypeScript", "Java", "C++"] },
  { key: "frontend", values: ["React", "Next.js", "Tailwind CSS", "GraphQL"] },
  { key: "systems", values: ["Docker", "Kubernetes", "Terraform", "AWS", "GCP", "Redis", "Kafka"] },
  { key: "data_ai", values: ["NumPy", "Pandas", "Scikit-Learn", "LangChain"] },
];

function fileFromHash(): FileId {
  const id = window.location.hash.slice(1);
  if (id === "experience") return "ciroos";
  return files.find(file => file.id === id)?.id ?? "readme";
}

function MobilePortfolio() {
  return <main className="mobile-portfolio">
    <header className="mobile-topbar"><a href="#mobile-top" className="mobile-brand">~/aayushah.com</a><a href="mailto:aayush30shah@berkeley.edu">email ↗</a></header>
    <nav className="mobile-section-nav" aria-label="Page sections"><a href="#mobile-about">About</a><a href="#mobile-experience">Experience</a><a href="#mobile-skills">Skills</a><a href="#mobile-contact">Contact</a></nav>
    <section className="mobile-hero" id="mobile-top"><div className="mobile-path">README.md <span>● ONLINE</span></div><h1>Aayush Shah<span>_</span></h1><p className="mobile-tagline">Building working systems.</p><p>I turn ambitious ideas into useful software and build the reliable infrastructure that keeps it running.</p><div className="mobile-hero-links"><a href="#mobile-experience">View experience ↓</a><a href="#mobile-contact">Get in touch ↗</a></div><div className="mobile-ascii"><div>ascii.visual <span>LIVE</span></div><AsciiSculpture /></div></section>
    <section className="mobile-section" id="mobile-about"><div className="mobile-section-path">01 / about.md</div><h2>About</h2><p>I&apos;m a Computer Science and Data Science graduate from UC Berkeley, drawn to applied AI and distributed systems.</p><p>I like understanding how ideas behave in production: how data moves, how decisions get made, and how to make systems observable and reliable.</p></section>
    <section className="mobile-section" id="mobile-experience"><div className="mobile-section-path">02 / experience/</div><h2>Experience</h2><div className="mobile-work-list">{experience.map(item => <article key={item.slug}><div className="mobile-work-file"><FileIcon name={`${item.slug}.md`} />{item.slug}.md <span>{item.period}</span></div><h3>{item.name}</h3><div className="mobile-work-role">{item.role} · {item.type}</div><p>{item.detail}</p></article>)}</div></section>
    <section className="mobile-section" id="mobile-skills"><div className="mobile-section-path">03 / skills.json</div><h2>Skills</h2><div className="mobile-skills-list">{skillGroups.map(group => <div key={group.key}><span>{group.key}</span><p>{group.values.join(" · ")}</p></div>)}</div></section>
    <section className="mobile-section mobile-contact" id="mobile-contact"><div className="mobile-section-path">04 / contact.txt</div><h2>Let&apos;s talk.</h2><p>Have a project, a problem, or a good systems question?</p><a href="mailto:aayush30shah@berkeley.edu">aayush30shah@berkeley.edu ↗</a><a href="https://github.com/aayushxshah" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/aayushshah300/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></section>
    <footer className="mobile-footer">© {new Date().getFullYear()} Aayush Shah <a href="#mobile-top">↑ top</a></footer>
  </main>;
}

export default function ExplorerPage() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia("(max-width: 760px)").matches);
  const [activeFile, setActiveFile] = useState<FileId>(fileFromHash);
  const [openTabs, setOpenTabs] = useState<FileId[]>(() => [fileFromHash()]);
  const [folderOpen, setFolderOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const saved = Number(window.localStorage.getItem("explorer-width"));
    return Number.isFinite(saved) && saved >= 180 && saved <= 420 ? saved : 245;
  });
  const [activity, setActivity] = useState<"explorer" | "search">("explorer");
  const [searchQuery, setSearchQuery] = useState("");
  const editorRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const resizeStartRef = useRef<{ x: number; width: number } | null>(null);

  const selectFile = (id: FileId) => {
    setOpenTabs(current => current.includes(id) ? current : [...current, id]);
    setActiveFile(id);
    window.history.replaceState(null, "", `#${id}`);
    editorRef.current?.scrollTo?.({ top: 0 });
  };

  const closeTab = (id: FileId) => {
    const next = openTabs.filter(tab => tab !== id);
    if (!next.length) next.push("readme");
    setOpenTabs(next);
    if (activeFile === id) {
      const replacement = next[Math.max(0, Math.min(openTabs.indexOf(id) - 1, next.length - 1))];
      setActiveFile(replacement);
      window.history.replaceState(null, "", `#${replacement}`);
    }
  };

  useEffect(() => {
    const onHashChange = () => {
      const id = fileFromHash();
      setOpenTabs(current => current.includes(id) ? current : [...current, id]);
      setActiveFile(id);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px)");
    const onChange = () => setIsMobile(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("explorer-width", String(sidebarWidth));
  }, [sidebarWidth]);

  useEffect(() => {
    if (activity === "search") searchRef.current?.focus();
  }, [activity]);

  const openActivity = (view: "explorer" | "search") => {
    if (activity === view) setSidebarCollapsed(collapsed => !collapsed);
    else { setActivity(view); setSidebarCollapsed(false); }
  };

  const resizePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!Number.isFinite(event.clientX)) return;
    resizeStartRef.current = { x: event.clientX, width: sidebarWidth };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const resizePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!resizeStartRef.current || !Number.isFinite(event.clientX)) return;
    setSidebarWidth(Math.max(180, Math.min(420, resizeStartRef.current.width + event.clientX - resizeStartRef.current.x)));
  };

  const resizePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    resizeStartRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const resizeKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    setSidebarWidth(width => Math.max(180, Math.min(420, width + (event.key === "ArrowRight" ? 20 : -20))));
  };

  const searchResults = files.filter(file => file.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const currentFile = files.find(file => file.id === activeFile)!;
  const activeExperience = experience.find(item => item.slug === activeFile);

  if (isMobile) return <MobilePortfolio />;

  return (
    <main className="explorer-page">
      <div className="explorer-shell">
        <header className="explorer-header">
          <div className="window-controls" aria-hidden="true"><span /><span /><span /></div>
          <div className="titlebar-title">{currentFile.name} <span>— aayushah.com</span></div>
          <div className="titlebar-workspace">portfolio.code-workspace</div>
        </header>
        <div className={`explorer-body ${sidebarCollapsed ? "sidebar-collapsed" : ""}`} style={{ "--sidebar-width": `${sidebarWidth}px` } as CSSProperties}>
          <nav className="activity-bar" aria-label="Workspace views">
            <button type="button" aria-label="Explorer" aria-pressed={activity === "explorer"} aria-expanded={activity === "explorer" && !sidebarCollapsed} className={activity === "explorer" ? "active" : ""} onClick={() => openActivity("explorer")}><Files size={22} strokeWidth={1.7} /></button>
            <button type="button" aria-label="Search files" aria-pressed={activity === "search"} className={activity === "search" ? "active" : ""} onClick={() => openActivity("search")}><Search size={22} strokeWidth={1.7} /></button>
            <div className="activity-spacer" />
            <a href="https://github.com/aayushxshah" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={21} strokeWidth={1.7} /></a>
            <button type="button" aria-label="Open contact file" onClick={() => selectFile("contact")}><Mail size={21} strokeWidth={1.7} /></button>
          </nav>
          <aside className="explorer-sidebar" aria-label={activity === "search" ? "File search" : "File explorer"} aria-hidden={sidebarCollapsed}>
            {activity === "explorer" ? <>
              <div className="sidebar-heading">EXPLORER <button type="button" className="collapse-explorer" onClick={() => setSidebarCollapsed(true)} aria-label="Collapse Explorer"><PanelLeftClose size={15} /></button></div>
              <div className="sidebar-section-title">⌄ &nbsp; OPEN EDITORS <span>{openTabs.length}</span></div>
              <div className="sidebar-open-editors">{openTabs.map(id => { const file = files.find(item => item.id === id)!; return <button type="button" key={id} className={activeFile === id ? "active" : ""} onClick={() => selectFile(id)}><FileIcon name={file.name} />{file.name}</button>; })}</div>
              <div className="sidebar-section-title workspace-title">⌄ &nbsp; AAYUSH</div>
              <div className="sidebar-files">
                {files.map(file => {
                  if (isExperienceFile(file.id) && file.id !== "ciroos") return null;
                  if (file.id === "ciroos") return <div key="experience-folder">
                    <button type="button" className="sidebar-file sidebar-folder" onClick={() => setFolderOpen(open => !open)} aria-label={`${folderOpen ? "Collapse" : "Expand"} experience folder`} aria-expanded={folderOpen}><span className="folder-caret">{folderOpen ? "⌄" : "›"}</span><span className="file-icon folder-icon" aria-hidden="true">{folderOpen ? <FolderOpen size={14} strokeWidth={1.8} /> : <Folder size={14} strokeWidth={1.8} />}</span>experience/</button>
                    {folderOpen && <div className="sidebar-children">{experience.map(item => <button type="button" key={item.slug} className={activeFile === item.slug ? "active" : ""} onClick={() => selectFile(item.slug)}><FileIcon name={`${item.slug}.md`} />{item.slug}.md</button>)}</div>}
                  </div>;
                  return <button type="button" key={file.id} className={`sidebar-file ${activeFile === file.id ? "active" : ""}`} onClick={() => selectFile(file.id)}><FileIcon name={file.name} />{file.name}</button>;
                })}
              </div>
            </> : <>
              <div className="sidebar-heading">SEARCH <button type="button" className="collapse-explorer" onClick={() => setSidebarCollapsed(true)} aria-label="Collapse Explorer"><PanelLeftClose size={15} /></button></div>
              <label className="sidebar-search"><span className="sr-only">Search files</span><input ref={searchRef} value={searchQuery} onChange={event => setSearchQuery(event.target.value)} placeholder="Search files" /></label>
              <div className="sidebar-section-title">FILES <span>{searchResults.length}</span></div>
              <div className="sidebar-search-results">
                {searchResults.map(file => <button type="button" key={file.id} onClick={() => selectFile(file.id)}><FileIcon name={file.name} />{isExperienceFile(file.id) ? `experience/${file.name}` : file.name}</button>)}
                {!searchResults.length && <p>No matching files.</p>}
              </div>
            </>}
            <div className="sidebar-footer"><span className="online-dot" /> SYSTEM ONLINE<br /><span>AAYUSH / PORTFOLIO</span></div>
            <div className="sidebar-resize-handle" role="separator" aria-label="Resize Explorer" aria-orientation="vertical" aria-valuemin={180} aria-valuemax={420} aria-valuenow={sidebarWidth} tabIndex={0} onPointerDown={resizePointerDown} onPointerMove={resizePointerMove} onPointerUp={resizePointerUp} onPointerCancel={resizePointerUp} onKeyDown={resizeKeyDown} />
          </aside>
          <div className="explorer-workspace"><div className="editor-tabs" role="tablist" aria-label="Open files">{openTabs.map(id => { const file = files.find(item => item.id === id)!; return <div className={`editor-tab ${activeFile === id ? "active" : ""}`} key={id}><button type="button" role="tab" aria-selected={activeFile === id} onClick={() => selectFile(id)}><FileIcon name={file.name} />{file.name}</button><button type="button" className="close-tab" aria-label={`Close ${file.name}`} onClick={() => closeTab(id)}>×</button></div>; })}</div>
            <section className="editor-content" id="editor-panel" ref={editorRef} role="tabpanel" aria-label={currentFile.name}><div className="editor-breadcrumb">aayush <span>›</span> {isExperienceFile(activeFile) && <>experience <span>›</span> </>}{currentFile.name}</div>
              {activeFile === "readme" && <div className="readme-file">
                <div className="readme-source">
                  <div className="source-line"><span className="line-number">01</span><span className="syntax-comment">---</span></div>
                  <div className="source-line"><span className="line-number">02</span><span><span className="source-key">name:</span> Aayush Shah</span></div>
                  <div className="source-line"><span className="line-number">03</span><span><span className="source-key">role:</span> Software Engineer</span></div>
                  <div className="source-line"><span className="line-number">04</span><span><span className="source-key">focus:</span> AI agents, distributed systems, observability</span></div>
                  <div className="source-line"><span className="line-number">05</span><span className="syntax-comment">---</span></div>
                  <div className="source-line source-heading"><span className="line-number">07</span><h1><span className="syntax-hash">#</span> Aayush Shah<span className="cursor-block">_</span></h1></div>
                  <div className="source-line source-subheading"><span className="line-number">09</span><h2>Building <span>working systems.</span></h2></div>
                  <div className="source-line source-paragraph"><span className="line-number">11</span><p>I turn ambitious ideas into useful software and build the reliable infrastructure that keeps it running.</p></div>
                  <div className="source-line source-links"><span className="line-number">13</span><div><button type="button" onClick={() => selectFile("ciroos")}>[ experience/ciroos.md ↗ ]</button><button type="button" onClick={() => selectFile("about")}>[ about.md ↗ ]</button><button type="button" onClick={() => selectFile("contact")}>[ contact.txt ↗ ]</button></div></div>
                  <div className="source-line source-note"><span className="line-number">15</span><span className="syntax-comment">// Select a file in Explorer to keep reading.</span></div>
                </div>
                <div className="readme-art"><div className="art-heading"><span>ascii.visual</span><span>PREVIEW</span></div><AsciiSculpture /><div className="art-foot">THREE.JS / ASCII EFFECT <span>● LIVE</span></div></div>
              </div>}
              {activeFile === "about" && <div className="document-file"><div className="syntax-comment">// about.md</div><h1><span className="syntax-hash">#</span> About me</h1><p className="document-lead">I&apos;m a Computer Science and Data Science graduate from UC Berkeley who likes building things that are both intelligent and scalable.</p><div className="document-divider" /><h2><span className="syntax-hash">##</span> What I work on</h2><p>I&apos;m especially drawn to machine learning and AI agents: how they fit into real systems, how decisions get made, and how those systems stay observable, reliable, and easy to improve.</p><p>Most of what I build sits between distributed systems and applied AI. I enjoy taking ambitious ideas and turning them into working software with architecture that can evolve.</p><h2><span className="syntax-hash">##</span> Education</h2><div className="document-callout"><span>university:</span> UC Berkeley<br /><span>studied:</span> Computer Science + Data Science<br /><span>graduated:</span> May 2026</div></div>}
              {activeExperience && <div className="document-file experience-document"><div className="syntax-comment">// experience/{activeExperience.slug}.md</div><h1><span className="syntax-hash">#</span> {activeExperience.name}</h1><p className="document-lead">{activeExperience.role}</p><div className="experience-frontmatter"><div><span>period:</span> {activeExperience.period}</div><div><span>area:</span> {activeExperience.type}</div></div><h2><span className="syntax-hash">##</span> Work</h2><p>{activeExperience.detail}</p><div className="experience-siblings"><span>OTHER FILES IN EXPERIENCE/</span>{experience.filter(item => item.slug !== activeFile).map(item => <button type="button" key={item.slug} onClick={() => selectFile(item.slug)}>{item.slug}.md ↗</button>)}</div></div>}
              {activeFile === "skills" && <div className="document-file skills-file"><div className="syntax-comment">// skills.json</div><h1><span className="syntax-hash">#</span> Skills</h1><p className="document-lead">Tools change. The habit of learning and building stays.</p><div className="json-file"><div className="json-brace">&#123;</div>{skillGroups.map((group, index) => <div className="json-group" key={group.key}><div><span className="json-key">"{group.key}"</span>: <span className="json-bracket">[</span></div><div className="json-values">{group.values.map((value, itemIndex) => <span key={value}><span className="json-string">"{value}"</span>{itemIndex < group.values.length - 1 ? ", " : ""}</span>)}</div><div className="json-bracket">]{index < skillGroups.length - 1 ? "," : ""}</div></div>)}<div className="json-brace">&#125;</div></div></div>}
              {activeFile === "contact" && <div className="document-file contact-file"><div className="syntax-comment">// contact.txt</div><h1><span className="syntax-hash">#</span> Let&apos;s talk<span className="cursor-block">_</span></h1><p className="document-lead">Have a project, a problem, or a good systems question? I&apos;d like to hear about it.</p><div className="contact-list"><a href="mailto:aayush30shah@berkeley.edu"><span>email</span><strong>aayush30shah@berkeley.edu</strong><b>↗</b></a><a href="https://github.com/aayushxshah" target="_blank" rel="noopener noreferrer"><span>github</span><strong>@aayushxshah</strong><b>↗</b></a><a href="https://www.linkedin.com/in/aayushshah300/" target="_blank" rel="noopener noreferrer"><span>linkedin</span><strong>/in/aayushshah300</strong><b>↗</b></a></div><div className="contact-signoff">guest@aayushah.com:~$ <span>see you soon_</span></div></div>}
            </section>
          </div>
        </div>
        <footer className="explorer-status"><span>● &nbsp; READY</span><span>{currentFile.name} &nbsp; · &nbsp; UTF-8</span><span>© {new Date().getFullYear()} AAYUSH SHAH</span></footer>
      </div>
    </main>
  );
}
