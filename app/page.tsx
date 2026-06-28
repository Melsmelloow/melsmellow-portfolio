"use client";

import { useEffect, useRef, useState } from "react";

// ──────────────────────────────────────────────────────────────
// Content — edit this block with your real info. Everything below
// just renders whatever's in here, styled like a terminal session.
// ──────────────────────────────────────────────────────────────

const PROFILE = {
  user: "mel",
  host: "portfolio",
  name: "Mel Carlo Iguis",
  role: "Software Engineer (Frontend / Full Stack)",
  location: "Taguig, Philippines",
  bio: "4+ years building scalable web apps, frontend systems, REST APIs, and deployment workflows. Started in frontend, grew into full-stack and DevOps along the way.",
  status: "open to opportunities",
};

const SOCIALS = [
  { label: "github (new)", href: "https://github.com/Melsmelloow" },
  { label: "github (old)", href: "https://github.com/melsmellow" },
  { label: "linkedin", href: "https://linkedin.com/in/mel-carlo-iguis" },
  { label: "email", href: "mailto:melcarlo.iguis@gmail.com" },
  { label: "phone", href: "tel:+639958470384" },
];

const SKILLS = [
  {
    category: "languages",
    items: ["JavaScript", "TypeScript", "Java", "Python", "SQL"],
  },
  {
    category: "frontend",
    items: ["React", "Next.js", "Redux", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    category: "backend",
    items: ["Node.js", "Express.js", "Java Spring Boot", "Django", "REST APIs"],
  },
  {
    category: "databases",
    items: ["PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    category: "cloud / devops",
    items: ["AWS", "Docker", "GitHub Actions", "Linux", "Nginx"],
  },
  {
    category: "tools",
    items: ["Git", "Postman", "Jira", "Confluence", "Grafana"],
  },
];

// Lines that "type" out on boot, in order.
const BOOT_LINES = [
  { type: "cmd", text: "whoami" },
  { type: "out", text: PROFILE.name },
  { type: "cmd", text: "cat status.txt" },
  { type: "out", text: `${PROFILE.role} — ${PROFILE.location}` },
  {
    type: "out",
    text: "Started as a frontend dev, then stepped into full-stack work at Teravibe — shipping a Node.js API and later picking up Django to match the team's stack.",
  },
  {
    type: "out",
    text: "Currently a React Developer at Samsung, building internal portals and admin dashboards, and have since expanded into backend work with Java and Spring Boot.",
  },
  {
    type: "out",
    text: "Lately, focused on infrastructure and DevOps — improving CI/CD pipelines and leading frontend post-deployment testing.",
  },
  {
    type: "out",
    text: "Comfortable across the stack, adaptable across technologies, and experienced end-to-end from development through production support.",
  },
];

// Sections available as "commands" — clicking one runs it and prints
// its content into the session, like a real shell would.
type Section = {
  id: string;
  cmd: string;
  label: string;
  render: () => React.ReactNode;
};

const SECTIONS: Section[] = [
  {
    id: "about",
    cmd: "cd ./about",
    label: "about",
    render: () => (
      <div className="space-y-3">
        <Line label="role">{PROFILE.role}</Line>
        <Line label="based in">{PROFILE.location}</Line>
        <Line label="stack">
          JavaScript/TypeScript, React, Next.js, Node.js, Java (Spring Boot),
          Python (Django), PostgreSQL/MySQL/MongoDB, Docker, AWS
        </Line>
        <p className="pt-1 text-[#a1a1aa]">
          I build scalable web apps and the pipelines that ship them — from
          frontend systems and REST APIs to CI/CD and cloud deployments. 4+
          years across enterprise and client-facing teams, with a focus on
          performance, reliability, and developer productivity.
        </p>
      </div>
    ),
  },
  {
    id: "skills",
    cmd: "cat skills.json",
    label: "skills",
    render: () => (
      <div className="space-y-4">
        {SKILLS.map((group) => (
          <div key={group.category} className="flex items-start gap-2">
            <span className="w-32 shrink-0 whitespace-nowrap text-[#52525b]">
              {group.category}
            </span>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded border border-[#27272a] px-2 py-0.5 text-xs text-[#a1a1aa]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "projects",
    cmd: "ls ./projects",
    label: "projects",
    render: () => (
      <div className="space-y-4">
        <ProjectEntry
          name="dev-preview-pipeline/"
          desc="Sandbox build pipeline that deploys temporary preview builds to S3 in DEV, speeding up feature review and stakeholder feedback."
          tags={["AWS S3", "CI/CD", "GitHub Actions"]}
        />
        <ProjectEntry
          name="release-validation-suite/"
          desc="Post-deployment automated validation workflows with Playwright, reducing manual QA effort and improving release confidence."
          tags={["Playwright", "CI/CD"]}
        />
        <ProjectEntry
          name="onward-flashcard/"
          desc="AI-powered educational web app where users upload lecture text or images and automatically generate flashcards for studying."
          tags={["Next.js", "Google Gemini"]}
          href="https://github.com/melsmellow/Onward-Flashcard"
        />
        <ProjectEntry
          name="cat-rescue-website/"
          desc="Full-stack site built for a student cat rescuer to showcase rescued cats through stories and profiles — designed to reach more donors and manage rescue content dynamically."
          tags={["Next.js", "MongoDB"]}
          href="https://github.com/Melsmelloow/cat-rescue"
        />
        <ProjectEntry
          name="quiz-app-flask/"
          desc="Web-based quiz application built with Flask."
          tags={["Flask", "Python"]}
          href="https://github.com/Melsmelloow/quiz-app-flask"
        />
      </div>
    ),
  },
  {
    id: "resume",
    cmd: "cat resume.pdf",
    label: "resume",
    render: () => (
      <div className="space-y-2">
        <p className="text-[#a1a1aa]">Opening resume.pdf...</p>
        <a
          href="/MEL CARLO IGUIS.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded border border-[#27272a] px-3 py-2 text-[#4ade80] transition-colors hover:border-[#4ade80]/40"
        >
          → view / download resume.pdf
        </a>
      </div>
    ),
  },
  {
    id: "contact",
    cmd: "cd ./contact",
    label: "contact",
    render: () => (
      <div className="space-y-2">
        {SOCIALS.map((s) => (
          <Line key={s.label} label={s.label}>
            <a
              href={s.href}
              className="text-[#4ade80] underline-offset-4 hover:underline"
            >
              {s.href.replace("mailto:", "")}
            </a>
          </Line>
        ))}
      </div>
    ),
  },
];

function Line({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-2">
      <span className="w-20 shrink-0 text-[#52525b]">{label}</span>
      <span className="text-[#a1a1aa]">{children}</span>
    </div>
  );
}

function ProjectEntry({
  name,
  desc,
  tags,
  href,
}: {
  name: string;
  desc: string;
  tags: string[];
  href?: string;
}) {
  return (
    <div className="border-l border-[#27272a] pl-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[#e4e4e7]">{name}</p>
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-xs text-[#52525b] underline-offset-4 hover:text-[#4ade80] hover:underline"
          >
            github →
          </a>
        )}
      </div>
      <p className="mt-1 text-[#a1a1aa]">{desc}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="rounded border border-[#27272a] px-2 py-0.5 text-xs text-[#52525b]"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);

  // Sections currently "run" in the session, in the order they were opened.
  const [openSections, setOpenSections] = useState<string[]>([]);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (lineIndex >= BOOT_LINES.length) {
      setDone(true);
      return;
    }

    const current = BOOT_LINES[lineIndex];

    // Command lines type out character by character.
    // Output lines appear instantly (like real shell output would).
    if (current.type === "cmd") {
      if (charIndex < current.text.length) {
        const t = setTimeout(() => setCharIndex((c) => c + 1), 28);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          setLineIndex((i) => i + 1);
          setCharIndex(0);
        }, 180);
        return () => clearTimeout(t);
      }
    } else {
      const t = setTimeout(() => setLineIndex((i) => i + 1), 120);
      return () => clearTimeout(t);
    }
  }, [lineIndex, charIndex]);

  function runSection(id: string) {
    const isOpen = openSections.includes(id);

    if (isOpen) {
      // Running the same command again closes it — toggle, don't stack.
      setOpenSections((prev) => prev.filter((s) => s !== id));
      return;
    }

    setOpenSections((prev) => [...prev, id]);

    // Scroll the freshly opened section into view once it's rendered.
    requestAnimationFrame(() => {
      setTimeout(() => {
        sectionRefs.current[id]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);
    });
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0b] text-[#e4e4e7]">
      <DotGrid />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-16 sm:px-10">
        {/* Top bar — looks like a terminal window chrome */}
        <div className="mb-10 flex items-center justify-between border-b border-[#27272a] pb-4 font-mono text-xs text-[#71717a]">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full border border-[#3f3f46]" />
            <span className="h-2.5 w-2.5 rounded-full border border-[#3f3f46]" />
            <span className="h-2.5 w-2.5 rounded-full border border-[#3f3f46]" />
            <span className="ml-2">
              {PROFILE.user}@{PROFILE.host}: ~
            </span>
          </div>
          <span className="hidden sm:inline">zsh — 80x24</span>
        </div>

        {/* Boot sequence */}
        <section className="font-mono text-sm leading-relaxed sm:text-base">
          {BOOT_LINES.slice(0, lineIndex + 1).map((line, i) => {
            const isCurrentTyping =
              i === lineIndex && line.type === "cmd" && !done;
            const text = isCurrentTyping
              ? line.text.slice(0, charIndex)
              : line.text;

            if (line.type === "cmd") {
              return (
                <div key={i} className="flex items-baseline gap-2">
                  <Prompt />
                  <span className="text-[#e4e4e7]">
                    {text}
                    {isCurrentTyping && <Cursor />}
                  </span>
                </div>
              );
            }

            return (
              <p key={i} className="mb-3 pl-5 text-[#a1a1aa]">
                {text}
              </p>
            );
          })}
        </section>

        {/* Nav — presented as available commands. Clicking one "runs" it
            and prints its output into the session below, like a real shell. */}
        <nav
          className={`mt-8 grid grid-cols-2 gap-3 font-mono text-sm transition-opacity duration-700 sm:grid-cols-3 ${
            done ? "opacity-100" : "opacity-0"
          }`}
        >
          {SECTIONS.map((section) => {
            const isOpen = openSections.includes(section.id);
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => runSection(section.id)}
                aria-expanded={isOpen}
                className={`group rounded border px-3 py-2.5 text-left transition-colors cursor-pointer ${
                  isOpen
                    ? "border-[#4ade80]/40 text-[#4ade80]"
                    : "border-[#27272a] text-[#a1a1aa] hover:border-[#4ade80]/40 hover:text-[#4ade80]"
                }`}
              >
                <span
                  className={
                    isOpen
                      ? "text-[#4ade80]/60"
                      : "text-[#52525b] group-hover:text-[#4ade80]/60"
                  }
                >
                  {isOpen ? "× " : "$ "}
                </span>
                {section.cmd}
              </button>
            );
          })}
        </nav>

        {/* Opened sections — appended in the order they were run, like
            shell history. Each prints its own prompt line + output block. */}
        <div className="mt-2 font-mono text-sm leading-relaxed sm:text-base">
          {openSections.map((id) => {
            const section = SECTIONS.find((s) => s.id === id)!;
            return (
              <div
                key={id}
                ref={(el) => {
                  sectionRefs.current[id] = el;
                }}
                className="animate-[fadeIn_0.3s_ease-out] border-t border-[#27272a] py-6 first:mt-6"
              >
                <div className="mb-4 flex items-baseline gap-2">
                  <Prompt />
                  <span className="text-[#e4e4e7]">{section.cmd}</span>
                </div>
                <div className="pl-5">{section.render()}</div>
              </div>
            );
          })}
        </div>

        {/* Footer — status + socials, like a shell status line */}
        <footer
          className={`mt-auto flex flex-col gap-4 border-t border-[#27272a] pt-6 font-mono text-xs text-[#52525b] transition-opacity delay-200 duration-700 sm:flex-row sm:items-center sm:justify-between ${
            done ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
            <span>{PROFILE.status}</span>
          </div>
          <div className="flex gap-5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="transition-colors hover:text-[#e4e4e7]"
              >
                {s.label}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </main>
  );
}

function Prompt() {
  return (
    <span className="select-none text-[#4ade80]">
      {PROFILE.user}@{PROFILE.host}
      <span className="text-[#52525b]">:~$</span>
    </span>
  );
}

function Cursor() {
  return (
    <span className="ml-0.5 inline-block h-[1em] w-[0.55ch] translate-y-[0.1em] animate-[blink_1s_steps(1)_infinite] bg-[#e4e4e7] align-middle" />
  );
}

// Subtle dotted background — same low-contrast grid as the reference design.
function DotGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-40"
      style={{
        backgroundImage:
          "radial-gradient(circle, #3f3f46 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        maskImage:
          "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 100%)",
      }}
    />
  );
}
