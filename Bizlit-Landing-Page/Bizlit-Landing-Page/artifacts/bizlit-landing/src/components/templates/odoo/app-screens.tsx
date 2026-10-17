import { useState } from "react";
import type { ReactNode } from "react";
import { Boxes, Mail, Radar, Users } from "lucide-react";
import { Badge, Td, Th } from "@/components/primitives";
import { BarList, DeltaPill, ProgressRing } from "@/components/charts";
import { Band, Mark } from "./bits";

/*
 * Odoo gives its product a full-width screenshot band in the middle of the
 * page, so this is ours: the real workspace layouts, rendered from the app's
 * own primitives with the distress desk behind them, swapped by a small
 * slider. Everything below is the app's own light palette on purpose — it is
 * the product itself, not the marketing page.
 */

type ScreenId = "pipeline" | "engine" | "network" | "outreach";

const SCREENS: { id: ScreenId; label: string; icon: ReactNode; render: () => ReactNode }[] = [
  {
    id: "pipeline",
    label: "Lead pipeline",
    icon: <Radar size={14} />,
    render: () => <PipelineScreen />,
  },
  {
    id: "engine",
    label: "Storage engine",
    icon: <Boxes size={14} />,
    render: () => <EngineScreen />,
  },
  {
    id: "network",
    label: "Runner network",
    icon: <Users size={14} />,
    render: () => <NetworkScreen />,
  },
  {
    id: "outreach",
    label: "Owner outreach",
    icon: <Mail size={14} />,
    render: () => <OutreachScreen />,
  },
];

export function ScreensBand() {
  const [screen, setScreen] = useState<ScreenId>("pipeline");
  const active = SCREENS.find((s) => s.id === screen) ?? SCREENS[0];

  return (
    <Band id="screens" className="overflow-hidden pt-[3rem] pb-[3rem] lg:pb-[12rem]">
      <h2 className="od-d2 mb-[4rem] lg:text-center">
        Every screen, <Mark tone="coral">before</Mark> you sign up.
      </h2>
      <p className="mx-auto max-w-2xl text-[1.25rem] text-[var(--od-body)] lg:text-center">
        The real workspace layouts, shown with sample deals. Pick one and look around.
      </p>

      <div className="mt-8 flex justify-center">
        <div
          role="tablist"
          aria-label="Workspace screens"
          className="flex gap-1 overflow-x-auto rounded-full bg-[var(--od-surface)] p-1 ring-1 ring-[var(--od-border)]"
        >
          {SCREENS.map((s) => {
            const isActive = s.id === active.id;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setScreen(s.id)}
                className={`inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-[var(--od-violet-solid)] font-semibold text-white"
                    : "font-medium text-[var(--od-ink)] hover:text-[var(--od-violet)]"
                }`}
              >
                {s.icon}
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="od-tile-shadow mt-7 rounded-2xl bg-[var(--od-surface)] p-2 sm:p-3">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-900">
          {active.render()}
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-[var(--od-muted)]">
        Screens shown with sample deals. Your own board fills in as soon as your first sweep
        runs.
      </p>
    </Band>
  );
}

/* --------------------------------------------------------- screen mocks */

function MiniStat({ label, value, delta }: { label: string; value: ReactNode; delta?: number }) {
  return (
    <div className="rounded-xl border border-slate-200 p-3">
      <p className="text-[10px] tracking-wide text-slate-500 uppercase">{label}</p>
      <p className="mt-1 flex items-center gap-2 text-xl font-semibold text-slate-900">
        {value}
        {delta !== undefined ? <DeltaPill value={delta} /> : null}
      </p>
    </div>
  );
}

function RingTile({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
      <ProgressRing value={value} size={46} stroke={6} color={color} />
      <div className="min-w-0">
        <p className="text-[10px] tracking-wide text-slate-500 uppercase">{label}</p>
        <p className="text-lg font-semibold text-slate-900">{value}/100</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ pipeline */

type Row = {
  id: string;
  lead: string;
  assetClass: "storage" | "real estate" | "estate" | "commercial" | "junk";
  stage: string;
  score: number | null;
  play: string;
};

const LEADS: Row[] = [
  { id: "L-1141", lead: "Unit 214 · Valley Self-Storage", assetClass: "storage", stage: "Contacted", score: 81, play: "BID to $290" },
  { id: "L-1138", lead: "142 Wilson Ave · probate heir", assetClass: "real estate", stage: "Negotiating", score: 80, play: "CONTRACT" },
  { id: "L-1136", lead: "Est. of R. Alvarez · 2-bed house", assetClass: "estate", stage: "Under Contract", score: 72, play: "CLEANOUT-CONSIGN" },
  { id: "L-1131", lead: "Curb alerts · 6 items this week", assetClass: "junk", stage: "Monetizing", score: null, play: "RUN" },
  { id: "L-1126", lead: "Defunct print shop · UCC liens", assetClass: "commercial", stage: "Researched", score: 43, play: "WATCH" },
  { id: "L-1119", lead: "Unit 87 · paper-only contents", assetClass: "storage", stage: "Dead", score: 31, play: "PASS veto" },
];

function PipelineScreen() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MiniStat label="Leads detected this week" value={47} delta={12} />
        <MiniStat label="Reply rate" value={17} delta={2} />
        <MiniStat label="Signed deals" value={4} />
        <MiniStat label="Days to cash" value={19} />
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="bg-slate-50">
            <tr>
              <Th>Lead</Th>
              <Th>Asset class</Th>
              <Th>Stage</Th>
              <Th className="text-right">Score</Th>
              <Th className="text-right">Play</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {LEADS.map((row) => (
              <tr key={row.id}>
                <Td className="text-xs text-slate-700">{row.lead}</Td>
                <Td className="text-xs text-slate-600">{row.assetClass}</Td>
                <Td className="text-xs text-slate-600">{row.stage}</Td>
                <Td className="text-right">
                  {row.score === null ? (
                    <Badge tone="neutral">scrap gate</Badge>
                  ) : (
                    <Badge tone={row.score >= 70 ? "good" : row.score >= 55 ? "info" : "warn"}>
                      {row.score}
                    </Badge>
                  )}
                </Td>
                <Td className="text-right">
                  <Badge
                    tone={
                      row.play.startsWith("PASS")
                        ? "neutral"
                        : row.play.startsWith("WATCH")
                          ? "warn"
                          : "good"
                    }
                  >
                    {row.play}
                  </Badge>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-[10px] text-slate-500">
        Every stage has exit criteria. A dead lead keeps its reason code — it feeds
        calibration.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------- engine */

const SUBSCORES = [
  { label: "Brand visibility", weight: 25, value: 94 },
  { label: "Container composition", weight: 15, value: 60 },
  { label: "Facility tier", weight: 15, value: 50 },
  { label: "Scrap floor coverage", weight: 10, value: 100 },
  { label: "Owner / context", weight: 10, value: 80 },
  { label: "Unit visibility", weight: 10, value: 90 },
  { label: "Cleanout complexity", weight: 10, value: 90 },
  { label: "Auction horizon", weight: 5, value: 60 },
];

function EngineScreen() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <RingTile label="Weighted score" value={81} color="#6366f1" />
        <MiniStat label="Expected value" value="$642" />
        <MiniStat label="Bid ceiling (EV × 0.45)" value="$290" />
        <MiniStat label="Decision" value="BID" />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 p-3">
          <p className="text-[10px] tracking-wide text-slate-500 uppercase">Sub-scores</p>
          <div className="mt-2">
            <BarList
              data={SUBSCORES.map((s) => ({ label: `${s.label} (${s.weight}%)`, value: s.value }))}
              color="#8b5cf6"
              valueFormat={(n) => `${n}`}
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 p-3">
          <p className="text-[10px] tracking-wide text-slate-500 uppercase">The EV math</p>
          <ul className="mt-2 space-y-1.5 text-xs text-slate-700">
            {[
              ["Snap-on chest", "0.7 × $800", "$560"],
              ["Golf clubs", "0.6 × $120", "$72"],
              ["Flat-screen TV", "0.5 × $150", "$75"],
              ["Scrap floor", "guaranteed", "$85"],
              ["Cleanout + dump", "cost", "−$150"],
            ].map(([item, how, value]) => (
              <li key={item} className="flex items-center justify-between rounded-lg bg-slate-50 px-2.5 py-1.5">
                <span className="font-medium">{item}</span>
                <span className="text-slate-500">{how}</span>
                <span className="font-semibold">{value}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[10px] text-slate-500">
            Hard vetoes checked: biohazard, firearms (FFL), titles — none tripped.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- network */

type Runner = {
  name: string;
  distance: string;
  rating: string;
  completion: number;
  pay: string;
  status: "available" | "on a run" | "new";
};

const RUNNERS: Runner[] = [
  { name: "Marcus T.", distance: "1.4 mi from unit", rating: "★ 4.9", completion: 94, pay: "35% of net", status: "available" },
  { name: "Runner crew #12", distance: "3.0 mi", rating: "★ 4.6", completion: 88, pay: "30% of net", status: "on a run" },
  { name: "Chris O.", distance: "0.8 mi", rating: "★ 4.2", completion: 76, pay: "30% of net", status: "new" },
  { name: "Estate crew · Ortiz", distance: "4.9 mi", rating: "★ 4.8", completion: 91, pay: "day rate from proceeds", status: "available" },
];

function NetworkScreen() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-3">
        <MiniStat label="In radius" value={12} />
        <MiniStat label="Job completion" value="94%" />
        <MiniStat label="Paid same day" value="Always" />
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-slate-50">
            <tr>
              <Th>Runner / crew</Th>
              <Th>Distance to job</Th>
              <Th className="text-right">Completion</Th>
              <Th className="text-right">Pay structure</Th>
              <Th className="text-right">Status</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {RUNNERS.map((r) => (
              <tr key={r.name}>
                <Td>
                  <span className="block text-xs font-medium text-slate-900">{r.name}</span>
                  <span className="text-[10px] text-slate-500">{r.rating}</span>
                </Td>
                <Td className="text-xs text-slate-600">{r.distance}</Td>
                <Td className="text-right text-xs font-semibold text-slate-900">{r.completion}%</Td>
                <Td className="text-right text-xs text-slate-600">{r.pay}</Td>
                <Td className="text-right">
                  <Badge tone={r.status === "available" ? "good" : r.status === "new" ? "info" : "neutral"}>
                    {r.status}
                  </Badge>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-[10px] text-slate-500">
        Scrap gate rule: run only when the yard estimate clears 1.5× the runner payout plus
        dump fees.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------ outreach */

/*
 * The contact sheet behind the outreach scripts: who was contacted, which lead
 * they belong to, the exact offer on the table and the stage it sits at. Only
 * qualified leads reach this list — the skip-trace spend comes after the gate.
 */

type Contact = {
  who: string;
  lead: string;
  offer: string;
  stage: "sent" | "reply" | "signed" | "pilot";
};

const CONTACTS: Contact[] = [
  {
    who: "Storage tenant",
    lead: "Unit 214 · Valley Self-Storage",
    offer: "Keeps 25% of resale",
    stage: "reply",
  },
  {
    who: "Facility manager",
    lead: "Valley Self-Storage · 2 abandoned units",
    offer: "Broom-clean in 48h · 20% remit",
    stage: "pilot",
  },
  {
    who: "Estate executor",
    lead: "Est. of R. Alvarez · county case 813",
    offer: "Cleared free · 85% of net remitted",
    stage: "signed",
  },
  {
    who: "Homeowner",
    lead: "142 Wilson Ave · auction in 26 days",
    offer: "Assignment offer · zero commissions",
    stage: "sent",
  },
  {
    who: "Runner applicant",
    lead: "1.2 mi from the next pickup",
    offer: "30–40% of net, paid same day",
    stage: "sent",
  },
];

const CONTACT_TONE = {
  signed: "good",
  reply: "info",
  pilot: "brand",
  sent: "neutral",
} as const;

function OutreachScreen() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-3">
        <MiniStat label="Qualified before skip-trace" value="6 of 9" />
        <MiniStat label="Attempts cap" value="3 in 7 days" />
        <MiniStat label="DNC checked" value="Always" />
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[620px]">
          <thead className="bg-slate-50">
            <tr>
              <Th>Who</Th>
              <Th>Lead</Th>
              <Th>Offer on the table</Th>
              <Th className="text-right">Stage</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {CONTACTS.map((contact) => (
              <tr key={contact.who + contact.lead}>
                <Td className="text-xs font-medium text-slate-900">{contact.who}</Td>
                <Td className="text-xs text-slate-600">{contact.lead}</Td>
                <Td className="text-xs text-slate-600">{contact.offer}</Td>
                <Td className="text-right">
                  <Badge tone={CONTACT_TONE[contact.stage]}>{contact.stage}</Badge>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-[10px] text-slate-500">
        Message preview — homeowner: “I&rsquo;m not an agent — I buy through assignment with local
        cash investors. If your numbers work, I can have an offer this week and you pay zero
        commissions.”
      </p>
    </div>
  );
}
