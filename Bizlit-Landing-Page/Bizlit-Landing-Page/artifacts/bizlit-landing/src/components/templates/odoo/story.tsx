import {
  BellRing,
  BadgeCheck,
  ClipboardList,
  Gavel,
  Mail,
  Radar,
  Recycle,
  ShieldCheck,
  Truck,
  Wallet,
} from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "@/components/primitives";
import { cn } from "@/lib/utils";
import { Band, Container, Doodle, Mark, Underline, odBtn, odBtnLight } from "./bits";

/*
 * The middle of the odoo.com landing page, in order: what the product does, the
 * "level up" card row, the native-AI band and the "done right" leaf that closes
 * with the plan.
 *
 * Every band carries odoo.com's own padding (`pb-5 pb-lg-6`, `py-5 py-lg-7`,
 * `pb-5 pb-lg-10`, `pt-7`), its headings are display-2 with `mb-6`, and each
 * card is Odoo's white `s_wd_features_item`: 2rem of padding, 0.75rem radius,
 * a 1px #E9E3F7 border and a 70px leaf-shaped icon tile in the top corner.
 */

/* --------------------------------------------------------------- features */

/*
 * Odoo puts a quotation above the company artwork in the card under the
 * sources wall; we keep the card, the two-column split and the mark on the
 * right, and put the product's own list where the quotation was — one icon
 * tile per thing the desk does, in the order the pipeline runs: detect,
 * research, score, route, contact, monetize.
 */
type Tone = "violet" | "orchid" | "indigo" | "fuchsia" | "gold";

/** The tile a feature wears: the page's own violets at 12% behind its icon. */
const FEATURE_TONES: Record<Tone, string> = {
  violet: "bg-[var(--od-tone-violet-bg)] text-[var(--od-tone-violet-fg)]",
  orchid: "bg-[var(--od-tone-orchid-bg)] text-[var(--od-tone-orchid-fg)]",
  indigo: "bg-[var(--od-tone-indigo-bg)] text-[var(--od-tone-indigo-fg)]",
  gold: "bg-[var(--od-tone-gold-bg)] text-[var(--od-tone-gold-fg)]",
  fuchsia: "bg-[var(--od-tone-fuchsia-bg)] text-[var(--od-tone-fuchsia-fg)]",
};

const FEATURES: { icon: ReactNode; label: string; note: string; tone: Tone }[] = [
  {
    icon: <Radar size={17} />,
    label: "Signal sweep",
    note: "Storage lien lists, recorder notices, probate dockets and free sections, pulled on a set cadence",
    tone: "violet",
  },
  {
    icon: <ClipboardList size={17} />,
    label: "Four scoring engines",
    note: "Storage, wholesale, estate and scrap math that is fixed — same inputs, same score, every time",
    tone: "orchid",
  },
  {
    icon: <Gavel size={17} />,
    label: "The master router",
    note: "Every lead leaves with one play: bid, wholesale, cleanout, runner-scrap or pass",
    tone: "gold",
  },
  {
    icon: <Mail size={17} />,
    label: "Owner outreach",
    note: "Storage tenants, executors and homeowners get a plain-English offer before anything else happens",
    tone: "indigo",
  },
  {
    icon: <Truck size={17} />,
    label: "Cleanout crews",
    note: "Estates cleared free, resold as agent, with heirs remitted 80–90% of net proceeds",
    tone: "fuchsia",
  },
  {
    icon: <Recycle size={17} />,
    label: "Scrap floor",
    note: "Same-day cash runs that fund the whole operation — runners paid the day the yard pays us",
    tone: "violet",
  },
  {
    icon: <BellRing size={17} />,
    label: "Watchlist re-scores",
    note: "Every timeline event — auction date, foreclosure date, house closing — wakes its lead and rescores it",
    tone: "indigo",
  },
  {
    icon: <Wallet size={17} />,
    label: "Deal ledger & calibration",
    note: "Predicted vs. realized on every deal, feeding the category probabilities each month",
    tone: "orchid",
  },
];

export function FeaturesBand() {
  return (
    <Band className="pb-[3rem] lg:pb-[4rem]">
      <div className="overflow-hidden rounded-[0.75rem] border border-[var(--od-border)] bg-[var(--od-surface)]">
        {/* every job the desk runs, under the mark that runs it */}
        <div className="p-[1.5rem] md:p-[2.5rem] xl:p-[3rem]">
          <div className="flex items-start justify-between gap-[1.5rem] md:gap-[3rem]">
            <div className="min-w-0">
              <p className="flex items-center gap-[0.625rem] text-[0.75rem] font-semibold tracking-[0.16em] text-[var(--od-violet)] uppercase">
                <span aria-hidden className="h-[1px] w-[1.75rem] bg-[rgba(109,40,217,0.35)]" />
                One desk, eight jobs
              </p>

              <h3 className="od-h4 mt-[1rem]">
                Everything the desk does <Mark>for you</Mark>
              </h3>

              <p className="mt-[0.75rem] max-w-[42rem] text-[1rem] leading-relaxed text-[var(--od-body)]">
                Every distress signal lands in one place, gets scored by fixed math and comes
                out the other end with a single play attached — nothing sits around as a vague
                maybe.
              </p>
            </div>

            <span className="inline-flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-[1.2rem] bg-[var(--od-surface)] shadow-[0_0.5rem_1.25rem_rgba(109,40,217,0.10)] ring-1 ring-[rgba(109,40,217,0.16)] xl:h-[5.5rem] xl:w-[5.5rem] xl:rounded-[1.4rem]">
              <img
                src="/logo.png"
                width={72}
                height={72}
                alt="BIZLIT"
                loading="lazy"
                className="h-[3.5rem] w-[3.5rem] xl:h-[4.25rem] xl:w-[4.25rem]"
              />
            </span>
          </div>

          <ul className="mt-[2rem] grid gap-x-[2.5rem] gap-y-[1.5rem] sm:grid-cols-2">
            {FEATURES.map((feature) => (
              <li key={feature.label} className="flex items-start gap-[0.875rem]">
                <span
                  aria-hidden
                  className={cn(
                    "flex h-[2.25rem] w-[2.25rem] shrink-0 items-center justify-center rounded-[0.7rem]",
                    FEATURE_TONES[feature.tone],
                  )}
                >
                  {feature.icon}
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.9375rem] leading-tight font-semibold text-[var(--od-ink)]">
                    {feature.label}
                  </span>
                  <span className="mt-[0.3rem] block text-[0.875rem] leading-relaxed text-[var(--od-body)]">
                    {feature.note}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </Band>
  );
}

/* --------------------------------------------------------------- level up */

/*
 * The screens band below shows the workspace; this band is odoo.com's collage
 * band, so it carries four small panels of the same desk instead — each drawn
 * from the lead pipeline's own shape rather than stock imagery.
 */

/** The strip every workspace card wears: its icon, its title, one chip. */
function ScreenHead({
  title,
  chip,
  tone = "neutral",
}: {
  title: string;
  chip: string;
  tone?: "neutral" | "good" | "warn" | "bad" | "info" | "brand";
}) {
  return (
    <div className="flex items-center gap-[0.375rem] border-b border-slate-100 pb-[0.375rem]">
      <span className="text-[0.6875rem] font-semibold text-slate-900">{title}</span>
      <Badge tone={tone} className="ms-auto">
        {chip}
      </Badge>
    </div>
  );
}

/** One row of a workspace list, at the size these cards can hold. */
const MOCK_ROW =
  "flex items-center gap-[0.5rem] rounded-[0.5rem] bg-slate-50 px-[0.5rem] py-[0.25rem] leading-tight";

/*
 * `area` is the cell, `shift` nudges it over its neighbour, and `z` decides
 * who lies on top where the two mats meet — the same tuck Odoo's own cells get
 * from their overlapping spans.
 */
const PANELS: { title: string; area: string; z: number; shift?: string; body: ReactNode }[] = [
  {
    title: "Scoring",
    area: "7 / 7 / 14 / 13",
    z: 9,
    shift: "-ml-[3rem]",
    body: (
      <div className="text-[0.6875rem]">
        <ScreenHead title="Storage engine" chip="Score 81" tone="good" />

        <ul className="mt-[0.5rem] space-y-[0.375rem]">
          {[
            ["Brand visibility", "94", "Snap-on chest, pro audio"],
            ["Container mix", "60", "Uniform moving boxes"],
            ["Scrap floor cover", "100", "≥ 1.5× cleanout cost"],
          ].map(([label, score, note]) => (
            <li key={label} className={MOCK_ROW}>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[0.6875rem] font-medium text-slate-900">
                  {label}
                </span>
                <span className="block truncate text-[0.625rem] text-slate-500">{note}</span>
              </span>
              <span className="shrink-0 rounded-full bg-[rgba(168,85,247,0.14)] px-[0.375rem] py-[0.0625rem] text-[0.625rem] font-semibold text-[var(--od-accent)]">
                {score}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-[0.5rem] text-[0.625rem] text-slate-500">
          EV $642 → bid ceiling EV × 0.45 = <strong>$290</strong>
        </p>
      </div>
    ),
  },
  {
    title: "Router",
    area: "7 / 1 / 14 / 7",
    z: 8,
    shift: "ml-[2.5rem]",
    body: (
      <div className="text-[0.6875rem]">
        <ScreenHead title="Master router" chip="1 decision" tone="brand" />

        <div className="mt-[0.5rem] space-y-[0.375rem]">
          {[
            ["Storage unit — 81", "BID to $290"],
            ["Property — 80", "CONTRACT · fee $10k"],
            ["Estate — 72", "CLEANOUT-CONSIGN"],
            ["Bulk junk", "RUN · scrap 1.6× cost"],
            ["Commercial — 38", "PASS · logged"],
          ].map(([lead, play]) => (
            <div key={lead} className={MOCK_ROW}>
              <span className="min-w-0 flex-1 truncate text-[0.6875rem] font-medium text-slate-900">
                {lead}
              </span>
              <Badge
                tone={play.startsWith("PASS") ? "neutral" : play.startsWith("RUN") ? "info" : "good"}
              >
                {play.split(" ")[0]}
              </Badge>
            </div>
          ))}
        </div>

        <p className="mt-[0.5rem] text-[0.625rem] text-slate-500">
          Marginals fall to the scrap gate before any pass is final
        </p>
      </div>
    ),
  },
  {
    title: "Outreach",
    area: "1 / 1 / 8 / 7",
    z: 2,
    body: (
      <div className="text-[0.6875rem]">
        <ScreenHead title="Owner outreach" chip="3 sent today" tone="good" />

        <ul className="mt-[0.5rem] space-y-[0.375rem]">
          {[
            ["Storage tenant — last notice", "keep 25% of resale"],
            ["Executor — county case 813", "clear free, 85% remit"],
            ["Facility manager — pilot", "broom-clean in 48h"],
          ].map(([who, hook]) => (
            <li key={who} className={MOCK_ROW}>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[0.6875rem] font-medium text-slate-900">
                  {who}
                </span>
                <span className="block truncate text-[0.625rem] text-slate-500">{hook}</span>
              </span>
              <Badge tone="neutral">sent</Badge>
            </li>
          ))}
        </ul>

        <p className="mt-[0.5rem] text-[0.625rem] text-slate-500">
          Reply or three attempts inside seven days, then the stage moves
        </p>
      </div>
    ),
  },
  {
    title: "Runner network",
    area: "1 / 7 / 8 / 13",
    z: 4,
    shift: "-ml-[3rem] -mt-[2.5rem]",
    body: (
      <div className="text-[0.6875rem]">
        <ScreenHead title="Runners near the job" chip="5 in radius" tone="info" />

        <ul className="mt-[0.5rem] space-y-[0.375rem]">
          {[
            ["Marcus T.", "1.4 mi · 94% done · paid same day"],
            ["Runner crew #12", "3 mi · 30–40% of net"],
            ["Chris O.", "0.8 mi · student pool"],
          ].map(([who, note]) => (
            <li key={who} className={MOCK_ROW}>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[0.6875rem] font-medium text-slate-900">
                  {who}
                </span>
                <span className="block truncate text-[0.625rem] text-slate-500">{note}</span>
              </span>
              <Badge tone="good">hire</Badge>
            </li>
          ))}
        </ul>

        <p className="mt-[0.5rem] text-[0.625rem] text-slate-500">
          Nobody is paid upfront — pay fast, pay exactly, publish the math
        </p>
      </div>
    ),
  },
];

export function LevelUpBand() {
  return (
    <section className="od-round-bottom relative bg-[var(--od-band)] py-[3rem] lg:py-[6rem]">
      {/* `o_illustration_doodle_02`, the orange doodle behind this band. */}
      <div className="od-shape od-shape-02" aria-hidden />

      <Container className="relative z-[1]">
        <h2 className="od-d2 mb-[4rem] lg:text-center">
          Level up your deal <Mark tone="yellow-03">flow</Mark>
        </h2>

        {/* Odoo's `o_grid_mode` collage: 12 columns, 50px rows, 10px of
            padding on every cell — ours carries the desk's own panels. */}
        <div className="mx-[-10px] hidden lg:grid lg:grid-cols-12 lg:auto-rows-[50px]">
          {PANELS.map((panel) => (
            <figure
              key={panel.title}
              className={cn(
                "relative p-[10px] transition-transform duration-200 ease-out hover:z-[20] hover:-translate-y-[0.25rem]",
                panel.shift,
              )}
              style={{ gridArea: panel.area, zIndex: panel.z }}
            >
              <div className="od-shot-frame od-panel-shot h-full">{panel.body}</div>
            </figure>
          ))}
        </div>

        {/* Below `lg` the overlap would be unreadable, so the same four stack. */}
        <div className="od-mobile-panels mt-[2rem] grid gap-[1.5rem] sm:grid-cols-2 lg:hidden">
          {PANELS.map((panel) => (
            <div key={panel.title} className="od-shot-frame min-h-0">
              {panel.body}
            </div>
          ))}
        </div>

        {/* `col-lg-6 col-xl-5 pt-6 text-lg-center`: the lead line, a doodled
            arrow, then the play-styled link into the workspace screens. */}
        <div className="flex justify-center">
          <div className="pt-[4rem] lg:w-5/12 lg:text-center">
            <p className="od-lead mb-[1.5rem]">
              <strong className="font-medium">Everything on one desk,</strong> scored as it
              moves — signals swept on schedule, every lead carrying its own number, and a
              bid ceiling computed before you ever raise a paddle.
            </p>

            <Doodle
              src="/img/odoo/arrow_doodle_3.svg"
              width={44}
              className="mx-auto mb-[1.5rem] rotate-[40deg]"
            />

            <a
              href="#screens"
              className="od-doodle mx-auto rotate-[350deg] text-[2rem] no-underline"
            >
              See it on the live board
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------------- native AI */

const AI_ITEMS = [
  {
    title: "Photo reads before bids",
    body: "Auction and listing photos are read for brands, containers, hazards and scrap — the extraction that feeds the storage score.",
  },
  {
    title: "Fixed math, not vibes",
    body: "The AI does the looking; the engines do the scoring. Same inputs always produce the same score and the same play.",
  },
  {
    title: "Calibrated probabilities",
    body: "Predicted vs. realized is logged deal by deal. A category that misses by 30% gets its probabilities cut and its bid multiplier tightened.",
  },
];

export function AiBand() {
  return (
    <section className="pt-[6rem] pb-[3rem] lg:text-center">
      <Container>
        <h2 className="od-d2 mb-[4rem]">
          AI that reads the <Mark tone="coral">records</Mark> for you
        </h2>

        <div className="grid gap-x-[2rem] md:grid-cols-3 lg:text-left">
          {AI_ITEMS.map((item) => (
            <div key={item.title} className="od-card">
              <h4 className="od-card-title od-h4">{item.title}</h4>
              <p className="text-[1rem] leading-relaxed text-[var(--od-body)]">{item.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------- done right */

const PRINCIPLES: { title: string; body: string; icon: ReactNode }[] = [
  {
    title: "One desk, every asset class",
    body: "Storage, real estate, estates, commercial closures and junk all share one lead database, one pipeline and one sign-in.",
    icon: <BadgeCheck />,
  },
  {
    title: "Deterministic scoring",
    body: "Four engines with published weights and a master router that rejects what it should. The gambling happens at auction only when the math says to.",
    icon: <ClipboardList />,
  },
  {
    title: "Nothing paid upfront",
    body: "Revenue share, assignment and pay-after-sale structures. The float comes from scrap runs — never from the reserve.",
    icon: <Wallet />,
  },
  {
    title: "Hard vetoes built in",
    body: "Biohazards, unresolvable title defects, unlicensed jurisdictions — an automatic pass, whatever the score says.",
    icon: <ShieldCheck />,
  },
];

const PLAN_FEATURES = [
  "Storage engine with comped bid ceilings",
  "Wholesale engine at the 70% rule",
  "Estate cleanout-consign at 80–90% remit",
  "Scrap gate and same-day runner payouts",
  "Master router and watchlist re-scores",
  "Deal ledger with predicted-vs-realized",
];

export function DoneRightBand() {
  return (
    <Band leaf className="py-[3rem] lg:py-[6rem]">
      <h2 className="od-d2 mb-[4rem] lg:text-center">
        Distress intelligence
        <br />
        done <Underline>right</Underline>.
      </h2>

      <div className="grid gap-x-[2rem] md:grid-cols-2">
        {PRINCIPLES.map((item) => (
          <div key={item.title} className="od-card">
            <span className="od-card-icon" style={{ color: "var(--od-orchid)" }} aria-hidden>
              {item.icon}
            </span>
            <h4 className="od-card-title od-h4">{item.title}</h4>
            <p className="text-[1rem] leading-relaxed text-[var(--od-body)]">{item.body}</p>
          </div>
        ))}
      </div>

      {/* Odoo's editions block, holding our single plan. */}
      <div
        id="pricing"
        className="mt-[4rem] rounded-[0.75rem] border border-[var(--od-border)] bg-[var(--od-surface)] p-[2rem] md:p-[4rem]"
      >
        <div className="grid gap-[2rem] md:grid-cols-[1fr_1.25fr] md:gap-[4rem]">
          <div>
            <h3 className="od-h4 mb-[1rem]">One plan, every asset class</h3>
            <p className="text-[var(--od-body)]">For solo and small distressed-asset teams.</p>
            <p className="mt-[1.5rem] text-[1.5rem] font-semibold text-[var(--od-ink)]">
              $0{" "}
              <span className="text-[1rem] font-normal text-[var(--od-muted)]">
                upfront — we take a share of each deal we monetize
              </span>
            </p>
            <div className="mt-[1.5rem] flex flex-wrap gap-[1rem]">
              <a href="/sign-up" className={odBtn}>
                Start free
              </a>
              <a href="/sign-in" className={odBtnLight}>
                Sign in
              </a>
            </div>
            <p className="mt-[1rem] text-[0.875rem] text-[var(--od-muted)]">
              Every deal is structured as revenue share, assignment or pay-after-sale
            </p>
          </div>

          <ul className="grid gap-[0.75rem] self-center sm:grid-cols-2">
            {PLAN_FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-[0.75rem]">
                <BadgeCheck
                  size={18}
                  className="mt-[0.25rem] shrink-0"
                  style={{ color: "var(--od-orchid)" }}
                  aria-hidden
                />
                <span className="text-[1rem] text-[var(--od-ink)]">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Band>
  );
}

/* -------------------------------------------------------------------- faq */

export type FaqItem = { q: string; a: string };

export function FaqBand({ items }: { items: FaqItem[] }) {
  return (
    <section id="faq" className="pt-[6rem] pb-[3rem]">
      <Container>
        <h2 className="od-d2 mb-[4rem] lg:text-center">Before you sign up.</h2>

        <div className="mx-auto mt-[1.5rem] max-w-3xl">
          {items.map((item) => (
            <details key={item.q} className="group border-t border-[var(--od-border)] py-[1rem]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-[1.5rem] text-[1.25rem] font-semibold text-[var(--od-ink)] marker:hidden">
                {item.q}
                <ChevronDown
                  size={20}
                  className="shrink-0 text-[var(--od-muted)] transition group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <p className="mt-[0.75rem] max-w-2xl text-[1rem] leading-relaxed text-[var(--od-body)]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------- faq */