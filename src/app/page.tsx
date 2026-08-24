/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Command,
  Play,
  Radio,
  Sparkles,
} from "lucide-react";

const features = [
  {
    code: "CORE.01",
    title: "Secure sign-in",
    text: "Register, log in, and return to a protected workspace with an authenticated session.",
    tone: "acid",
  },
  {
    code: "CORE.02",
    title: "Tenant boundaries",
    text: "Create and select organizations while keeping every project and task in the right workspace.",
    tone: "coral",
  },
  {
    code: "CORE.03",
    title: "Work that moves",
    text: "Connect projects to tasks, owners, priorities, due dates, and the next clear action.",
    tone: "blue",
  },
];

export default function HomePage() {
  return (
    <main className="retro-site min-h-screen overflow-hidden">
      <nav
        className="retro-nav mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5 lg:px-10"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="brand-mark shrink-0"
          aria-label="ProjectHub home"
        >
          <span className="brand-dot" /> PROJECTHUB
          <span className="brand-caret">_</span>
        </Link>
        <div className="hidden items-center gap-7 text-xs uppercase tracking-[0.2em] text-cream/70 md:flex">
          <a href="#signal" className="hover:text-acid">
            Overview
          </a>
          <a href="#modules" className="hover:text-acid">
            Capabilities
          </a>
          <a href="#protocol" className="hover:text-acid">
            Flow
          </a>
          <a
            href="#coming-soon"
            className="flex items-center gap-2 text-coral hover:text-acid"
          >
            <span className="nav-live-dot" /> Coming soon
          </a>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-[10px] uppercase tracking-[0.18em] text-cream/45 lg:inline">
            BUILD 1.0.0
          </span>
          <Link href="/dashboard" className="retro-outline-button">
            Open workspace <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </nav>

      <section
        id="signal"
        className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-14 lg:grid-cols-[1.08fr_.92fr] lg:px-10 lg:pb-28 lg:pt-20"
      >
        <div className="relative z-10">
          <div className="eyebrow mb-8">
            <Radio className="h-3.5 w-3.5" /> MULTI-TENANT WORKSPACES{" "}
            <span className="text-coral">//</span> BUILD 1.0.0
          </div>
          <h1 className="retro-title max-w-4xl text-balance">
            ORGANIZE
            <br />
            <span className="text-acid">THE WORK.</span>
            <br />
            <span className="outline-type">MOVE IT</span> FORWARD.
          </h1>
          <p className="mt-8 max-w-xl text-base leading-7 text-cream/70 md:text-lg">
            ProjectHub is a multi-tenant project workspace built for secure
            teams: authenticate once, choose an organization, and keep every
            project and task properly scoped.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/dashboard" className="retro-button">
              Create your organization <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a href="#protocol" className="retro-text-button">
              <Play className="h-4 w-4 fill-current" /> Documentation
            </a>
          </div>
          <div className="mt-14 flex items-center gap-5 text-xs uppercase tracking-[0.15em] text-cream/50">
            <span className="flex -space-x-2">
              <i className="avatar a1" />
              <i className="avatar a2" />
              <i className="avatar a3" />
              <i className="avatar a4" />
            </span>
            <span>Trusted by operators</span>
          </div>
        </div>
        <div
          className="workstream-wrap relative self-center"
          aria-label="ProjectHub workstream overview"
        >
          <div className="workstream-card">
            <div className="workstream-top">
              <div>
                <span className="workstream-label">WORKSTREAM RADAR</span>
                <h2>
                  YOUR WORK,
                  <br />
                  <span className="text-acid">IN FORMATION.</span>
                </h2>
              </div>
            </div>
            <div className="workstream-map" aria-hidden="true">
              <span className="map-line line-one" />
              <span className="map-line line-two" />
              <span className="map-line line-three" />
              <span className="map-node node-org">
                <b>03</b>
                <small>ORGS</small>
              </span>
              <span className="map-node node-project">
                <b>12</b>
                <small>PROJECTS</small>
              </span>
              <span className="map-node node-task">
                <b>48</b>
                <small>TASKS</small>
              </span>
              <span className="map-pulse" />
            </div>
            <div className="workstream-legend">
              <div>
                <span className="legend-dot acid-dot" />
                <span>SCOPED</span>
                <b>18</b>
              </div>
              <div>
                <span className="legend-dot coral-dot" />
                <span>IN MOTION</span>
                <b>07</b>
              </div>
              <div>
                <span className="legend-dot blue-dot" />
                <span>SHIPPED</span>
                <b>23</b>
              </div>
            </div>
            <div className="workstream-next">
              <span className="next-tag">NEXT CLEAR ACTION</span>
              <strong>
                Website redesign <span>→</span> ship preview
              </strong>
              <span className="next-meta">DUE FRI / OWNER: MAYA</span>
            </div>
          </div>
          <div className="workstream-sticker">
            <Sparkles className="h-4 w-4" /> SCOPE KEEPS ITS SHAPE
          </div>
        </div>
      </section>

      <div className="marquee-band" aria-label="ProjectHub capabilities">
        <div className="marquee-track">
          PLAN / CREATE / MANAGE / SHIP / REPEAT <span>✦</span> ORGANIZATIONS /
          PROJECTS / TASKS / MEMBERS / ROLES <span>✦</span>
        </div>
      </div>

      <section
        id="modules"
        className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28"
      >
        <div className="section-intro">
          <span className="section-kicker">THE FOUNDATION / 03 LAYERS</span>
          <h2 className="section-title">
            Less noise.
            <br />
            <span className="text-acid">More signal.</span>
          </h2>
          <p>
            A clear path from account creation to an authorized organization,
            scoped project, and actionable task.
          </p>
        </div>
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {features.map((feature, i) => (
            <article
              key={feature.code}
              className={`module-card ${feature.tone}`}
            >
              <div className="flex items-start justify-between">
                <span className="module-code">{feature.code}</span>
                <span className="module-index">0{i + 1}</span>
              </div>
              <div className="module-icon">
                {i === 0 ? (
                  <Command />
                ) : i === 1 ? (
                  <Sparkles />
                ) : (
                  <ArrowUpRight />
                )}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
              <Link href="/dashboard" className="module-link">
                EXPLORE MODULE <ArrowUpRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section
        id="protocol"
        className="protocol-section mx-auto max-w-7xl px-6 pb-20 lg:px-10 lg:pb-32"
      >
        <div className="protocol-panel">
          <div className="protocol-copy">
            <span className="section-kicker">THE PROTOCOL / HOW IT WORKS</span>
            <h2 className="section-title">
              FROM USER
              <br />
              <span className="text-coral">TO TASK</span>
              <br />
              WITHOUT DRIFT.
            </h2>
            <p>
              A layered workflow keeps responsibility clear: the server
              validates input, services enforce authorization, repositories
              isolate database access, and your team sees only its
              organization’s work.
            </p>
            <Link href="/dashboard" className="retro-button mt-7">
              Enter ProjectHub <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="protocol-steps">
            {[
              "Authenticate your account",
              "Select the organization",
              "Manage project tasks",
            ].map((step, i) => (
              <div className="protocol-step" key={step}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{step}</h3>
                  <p>
                    {
                      [
                        "Register or log in, then access protected dashboard routes with a maintained session.",
                        "Choose a workspace and verify membership before loading organization-scoped projects.",
                        "Create, assign, prioritize, schedule, update, and complete tasks without crossing tenant boundaries.",
                      ][i]
                    }
                  </p>
                </div>
                <Check className="h-5 w-5 text-acid" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="coming-soon"
        className="coming-soon-section mx-auto max-w-7xl px-6 pb-20 lg:px-10 lg:pb-28"
      >
        <div className="coming-soon-panel">
          <div className="coming-soon-copy">
            <span className="section-kicker">TRANSMISSION / NEXT RELEASE</span>
            <h2 className="section-title">
              THE CONSOLE
              <br />
              <span className="text-acid">IS LOADING.</span>
            </h2>
            <p>
              We are preparing a terminal-inspired command layer for ProjectHub.
              Soon, teams will be able to inspect workspace context, navigate
              projects, and trigger task actions from one focused interface.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <span className="roadmap-chip">COMMAND PALETTE</span>
              <span className="roadmap-chip">LIVE WORKSPACE SIGNALS</span>
              <span className="roadmap-chip">TASK AUTOMATIONS</span>
            </div>
          </div>
          <div
            className="future-console"
            aria-label="Upcoming terminal feature preview"
          >
            <div className="future-console-bar">
              <span className="console-lights">
                <i />
                <i />
                <i />
              </span>
              <span>PROJECTHUB / FUTURE_CONSOLE</span>
              <span className="text-coral">SOON</span>
            </div>
            <div className="future-console-body">
              <p>
                <span className="console-prompt">&gt;</span> boot workspace
                navigator<span className="blink-caret">_</span>
              </p>
              <p className="console-muted">
                Preparing secure project context...
              </p>
              <div className="console-progress">
                <span />
              </div>
              <div className="console-grid">
                <span>ORG_SCOPE</span>
                <b>READY</b>
                <span>PROJECT_ACTIONS</span>
                <b>QUEUED</b>
                <span>TASK_AUTOMATION</span>
                <b className="text-coral">IN DESIGN</b>
              </div>
              <p className="console-footer">
                TERMINAL ACCESS / ARRIVING IN A FUTURE BUILD
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="retro-footer mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-xs uppercase tracking-[.18em] text-cream/50 md:flex-row md:items-center md:justify-between lg:px-10">
        <span className="brand-mark">
          <span className="brand-dot" /> PROJECTHUB
          <span className="brand-caret">_</span>
        </span>
        <span>© 2026 PROJECTHUB SYSTEMS / KEEP MOVING</span>
        <Link href="/dashboard" className="text-acid hover:text-cream">
          LAUNCH ORGANIZATION MANAGEMENT SYSTEM →
        </Link>
      </footer>
    </main>
  );
}
