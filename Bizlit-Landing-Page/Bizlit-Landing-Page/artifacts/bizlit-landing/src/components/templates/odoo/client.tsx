import {
  Banknote,
  Briefcase,
  CheckCircle2,
  Home,
  MapPin,
  MessageSquare,
  Recycle,
  Route,
  Scale,
  Truck,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CARD, Container, Eyebrow, Mark, Underline } from "./bits";

/*
 * The half of the page that talks to the person holding the problem.
 *
 * Everything below "Distress intelligence done right." used to be the desk's
 * own operating manual — the outreach scripts, the five monetization arms, the
 * runner pay table, the eight-stage pipeline. That is how the business thinks,
 * not what an owner needs to know, so it was rewritten from their side of the
 * door: how a request runs, what it costs (nothing), who the desk actually
 * works for, and who turns up to do the carrying. Every number quoted here is
 * one the business can stand behind: the 80–90% remittance, the 25% a storage
 * tenant keeps instead of zero at auction, assignment with no commission, and
 * the same-day scrap floor that pays the crews.
 */

/* ------------------------------------------------------------------- how */


type Step = { icon: ReactNode; title: string; body: string };

const STEPS: Step[] = [
  {
    icon: <MapPin size={18} />,
    title: "Send the request",
    body: "A location, a sentence about what is in there, and how to reach you. Photographs help — a room full of boxes says more than a paragraph.",
  },
  {
    icon: <Scale size={18} />,
    title: "The desk reads it",
    body: "The address is qualified against the minimum value for its class before anyone travels, so you get a real answer instead of a maybe.",
  },
  {
    icon: <Route size={18} />,
    title: "Walk-through, then a written route",
    body: "We see it in person, price what is worth selling against sold-price comps, and put the route in writing: clear, consign, buy or scrap.",
  },
  {
    icon: <Truck size={18} />,
    title: "You approve it, the work runs",
    body: "One authorization and one date. Saleable contents are sold as your agent, the rest is hauled, and the space is left broom-clean.",
  },
  {
    icon: <Banknote size={18} />,
    title: "You are paid on delivery",
    body: "Estate heirs are remitted 80–90% of the net, and the ledger behind that number is shown to you line by line.",
  },
];

export function HowBand() {
  return (
    <section id="how" className="pt-[6rem] pb-[3rem]">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="od-d2 mt-[1.5rem]">
            From one request to <Mark>an empty room.</Mark>
          </h2>
          <p className="od-lead mt-[1.5rem]">
            Five steps, and you approve the one that matters. Nothing is signed and nothing is
            paid until the route and the numbers are in front of you.
          </p>
        </div>

        <ol className="mt-[3rem] grid gap-[1.5rem] md:grid-cols-2 xl:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className={cn(CARD, "flex flex-col")}>
              <div className="flex items-center justify-between gap-[1rem]">
                <span
                  aria-hidden
                  className="flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-[0.75rem] bg-[var(--od-tone-violet-bg)] text-[var(--od-tone-violet-fg)]"
                >
                  {step.icon}
                </span>
                <span className="text-[0.75rem] font-semibold tracking-[0.16em] text-[var(--od-muted)] uppercase">
                  Step {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="od-h4 mt-[1.25rem]">{step.title}</h3>
              <p className="mt-[0.75rem] text-[0.9375rem] leading-relaxed text-[var(--od-body)]">
                {step.body}
              </p>
            </li>
          ))}

          {/* Odoo's grid keeps a gap open rather than stretching the last card. */}
          <li className="hidden rounded-[0.75rem] border border-dashed border-[var(--od-border)] p-[1.5rem] xl:flex xl:flex-col xl:justify-center">
            <p className="text-[0.9375rem] leading-relaxed text-[var(--od-muted)]">
              The date is yours to set. Jobs carrying a deadline — a closing date, a lien-sale
              date — are scheduled first, because a deadline is usually why the request exists.
            </p>
          </li>
        </ol>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ cost */

type Structure = { icon: ReactNode; name: string; chip: string; body: string };

const STRUCTURES: Structure[] = [
  {
    icon: <Home size={18} />,
    name: "Cleared and consigned",
    chip: "80–90% to the estate",
    body: "We clear the property free and sell the contents as your liquidation agent, remitting 80–90% of net resale to the estate.",
  },
  {
    icon: <Recycle size={18} />,
    name: "Contents share",
    chip: "25% to the tenant",
    body: "A unit heading to lien sale is cleared and its contents resold — the tenant keeps 25% of resale instead of the $0 an auction pays.",
  },
  {
    icon: <Briefcase size={18} />,
    name: "Assignment",
    chip: "Zero commission",
    body: "For a property, we contract and assign to a mapped cash buyer. The owner pays no commission; the fee is the buyer's side of the deal.",
  },
];

export function CostBand() {
  return (
    <section id="cost" className="pt-[6rem] pb-[3rem]">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>What it costs</Eyebrow>
          <h2 className="od-d2 mt-[1.5rem]">
            Nothing upfront — <Mark tone="yellow-03">the deal pays itself.</Mark>
          </h2>
          <p className="od-lead mt-[1.5rem]">
            Every engagement is one of three structures, and which one you get is decided by what
            is actually inside the building. There is no listing fee, no commission and no invoice
            at the door.
          </p>
        </div>

        <div className="mt-[3rem] grid gap-[1.5rem] md:grid-cols-2 xl:grid-cols-3">
          {STRUCTURES.map((structure) => (
            <div key={structure.name} className={cn(CARD, "flex flex-col")}>
              <div className="flex items-center justify-between gap-[1rem]">
                <span
                  aria-hidden
                  className="flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-[0.75rem] bg-[var(--od-tone-gold-bg)] text-[var(--od-tone-gold-fg)]"
                >
                  {structure.icon}
                </span>
                <span className="rounded-full bg-[var(--od-tone-violet-bg)] px-[0.75rem] py-[0.25rem] text-[0.75rem] font-semibold text-[var(--od-tone-violet-fg)]">
                  {structure.chip}
                </span>
              </div>
              <h3 className="od-h4 mt-[1.25rem]">{structure.name}</h3>
              <p className="mt-[0.75rem] flex-1 text-[0.9375rem] leading-relaxed text-[var(--od-body)]">
                {structure.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-[2rem] max-w-3xl text-[0.9375rem] leading-relaxed text-[var(--od-body)]">
          The crews are paid out of what the job recovers — the same-day scrap floor settles first
          — so nobody is waiting on your signature to get paid, and you are never asked for a
          deposit.
        </p>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------------- clients */

type Client = { icon: ReactNode; who: string; when: string; body: string; gets: string };

const CLIENTS: Client[] = [
  {
    icon: <Scale size={18} />,
    who: "Executors & heirs",
    when: "A house to close out",
    body: "One authorization, no cost to the estate, and the family decides what is kept before anything is loaded.",
    gets: "Cleared free · 80–90% of net remitted",
  },
  {
    icon: <Users size={18} />,
    who: "Tenants on a lien notice",
    when: "A unit heading to auction",
    body: "The notice already says what an auction pays. A cleared unit pays the tenant a share of the resale instead of zero.",
    gets: "25% of resale · fees dealt with",
  },
  {
    icon: <Home size={18} />,
    who: "Owners who must sell",
    when: "Pre-foreclosure, tax sale, probate",
    body: "An offer through mapped local cash buyers, worked out on the property's own numbers rather than a listing price.",
    gets: "No commission · no repairs first",
  },
];

export function ClientsBand() {
  return (
    <section id="clients" className="pt-[6rem] pb-[3rem]">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>Who we work for</Eyebrow>
          <h2 className="od-d2 mt-[1.5rem]">
            The calls come in on <Mark tone="coral">the worst week of someone's year.</Mark>
          </h2>
          <p className="od-lead mt-[1.5rem]">
            An executor with a closing date, a tenant whose unit is heading to lien sale, an owner
            whose numbers stopped working. Different rooms, different deadlines — the same
            promise: one route, in writing, with the numbers on it.
          </p>
        </div>

        <div className="mt-[3rem] grid gap-[1.5rem] md:grid-cols-2 xl:grid-cols-3">
          {CLIENTS.map((client) => (
            <div key={client.who} className={cn(CARD, "flex flex-col")}>
              <div className="flex items-start gap-[0.875rem]">
                <span
                  aria-hidden
                  className="flex h-[2.5rem] w-[2.5rem] shrink-0 items-center justify-center rounded-[0.75rem] bg-[var(--od-tone-indigo-bg)] text-[var(--od-tone-indigo-fg)]"
                >
                  {client.icon}
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.9375rem] leading-tight font-semibold text-[var(--od-ink)]">
                    {client.who}
                  </span>
                  <span className="mt-[0.25rem] block text-[0.75rem] text-[var(--od-muted)]">
                    {client.when}
                  </span>
                </span>
              </div>

              <p className="mt-[1.25rem] flex-1 text-[0.9375rem] leading-relaxed text-[var(--od-body)]">
                {client.body}
              </p>

              <p className="mt-[1.25rem] flex items-start gap-[0.5rem] border-t border-[var(--od-border)] pt-[1rem] text-[0.875rem] font-semibold text-[var(--od-violet)]">
                <CheckCircle2 size={15} aria-hidden className="mt-[0.125rem] shrink-0" />
                {client.gets}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ----------------------------------------------------------------- crews */

type Crew = { icon: ReactNode; name: string; pay: string; body: string };

const CREWS: Crew[] = [
  {
    icon: <Truck size={18} />,
    name: "Cleanout crews",
    pay: "Paid per job, from proceeds",
    body: "Load, sort, haul and broom-clean, with the dump fees already budgeted into the job rather than added afterwards.",
  },
  {
    icon: <Recycle size={18} />,
    name: "Runners",
    pay: "30–40% of what the run nets, same day",
    body: "Local pickups, scrap deliveries and curb alerts. Scrap yards settle the same day, so the runner is paid the same day.",
  },
  {
    icon: <Briefcase size={18} />,
    name: "Mapped cash buyers",
    pay: "They pay the assignment at closing",
    body: "Local investors matched to the property's profile before it is contracted, so an offer is not waiting on a buyer to appear.",
  },
  {
    icon: <MessageSquare size={18} />,
    name: "Referral partners",
    pay: "The job we pass on, done properly",
    body: "Biohazard, unresolved title, or work needing a licence we do not hold: it goes to a vetted partner instead of into a skip.",
  },
];

export function CrewBand() {
  return (
    <section id="network" className="pt-[6rem] pb-[3rem]">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>Who comes to the door</Eyebrow>
          <h2 className="od-d2 mt-[1.5rem]">
            The desk is software. <Mark>The crews are people.</Mark>
          </h2>
          <p className="od-lead mt-[1.5rem]">
            No call centre and no subcontractor roulette. The carrying is done by local crews and
            runners who are paid the day the work is finished — which is precisely why they keep
            turning up.
          </p>
        </div>

        <div className="mt-[3rem] grid gap-[1.5rem] md:grid-cols-2">
          {CREWS.map((crew) => (
            <div key={crew.name} className={cn(CARD, "flex flex-col")}>
              <div className="flex items-center justify-between gap-[1rem]">
                <span
                  aria-hidden
                  className="flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-[0.75rem] bg-[var(--od-tone-fuchsia-bg)] text-[var(--od-tone-fuchsia-fg)]"
                >
                  {crew.icon}
                </span>
                <span className="text-end text-[0.75rem] font-semibold text-[var(--od-muted)]">
                  {crew.pay}
                </span>
              </div>
              <h3 className="od-h4 mt-[1.25rem]">{crew.name}</h3>
              <p className="mt-[0.75rem] flex-1 text-[0.9375rem] leading-relaxed text-[var(--od-body)]">
                {crew.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
