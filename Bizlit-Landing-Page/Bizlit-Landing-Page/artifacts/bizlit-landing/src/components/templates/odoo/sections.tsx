import { Boxes, Briefcase, Home, Recycle, Scale } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CARD, Container, Mark } from "./bits";

/*
 * The two bands above the pivot that the odoo.com template did not have: one
 * board per asset class, and the work itself in pictures.
 *
 * This file used to carry four more — the eight-stage pipeline, the outreach
 * scripts, the five monetization arms and the runner network — all written from
 * inside the business. They now live nowhere on the page: the client-facing
 * rewrites of them are in `./client.tsx`. The markup here follows the same
 * rules as the rest of the page — the theme's card, display and marker classes
 * in `.theme-odoo`, so no geometry is invented here.
 */

/** The tile a class board wears: the page's own violets at 12% behind its icon. */
const TONES = {
  violet: "bg-[var(--od-tone-violet-bg)] text-[var(--od-tone-violet-fg)]",
  orchid: "bg-[var(--od-tone-orchid-bg)] text-[var(--od-tone-orchid-fg)]",
  indigo: "bg-[var(--od-tone-indigo-bg)] text-[var(--od-tone-indigo-fg)]",
  fuchsia: "bg-[var(--od-tone-fuchsia-bg)] text-[var(--od-tone-fuchsia-fg)]",
  gold: "bg-[var(--od-tone-gold-bg)] text-[var(--od-tone-gold-fg)]",
} as const;

/* ------------------------------------------------------- class dashboards */

/*
 * Detection, scoring and outreach all run per asset class, so the workspace
 * keeps a board per class instead of one undifferentiated list. Each board
 * names the signals it ever sees and the one thing it turns them into.
 */

type ClassBoard = {
  icon: ReactNode;
  tone: keyof typeof TONES;
  name: string;
  image: string;
  imageAlt: string;
  signals: string;
  board: string;
};

const CLASS_BOARDS: ClassBoard[] = [
  {
    icon: <Boxes size={18} />,
    tone: "violet",
    name: "Storage units",
    image: "/img/services/storage-unit.jpg",
    imageAlt: "Rows of self-storage units at a facility",
    signals: "StorageTreasures · LockerFox · iBid4Storage · county legal notices",
    board:
      "Auction calendar, the unit photo feed, the eight weighted sub-scores, EV and the bid ceiling.",
  },
  {
    icon: <Home size={18} />,
    tone: "orchid",
    name: "Real estate",
    image: "/img/services/real-estate.jpg",
    imageAlt: "A derelict, boarded-up house",
    signals: "Recorder NODs · tax delinquency · sheriff sales · probate cases",
    board:
      "Timeline pressure, MAO at the 70% rule, title clarity and the mapped cash buyers by ZIP.",
  },
  {
    icon: <Scale size={18} />,
    tone: "indigo",
    name: "Estates & probate",
    image: "/img/services/estate-contents.jpg",
    imageAlt: "A furnished room of household contents",
    signals: "Legacy.com obituaries · probate portals · EstateSales.net",
    board:
      "Executor pipeline, contents EV, the consignment ledger and heir remittance per job.",
  },
  {
    icon: <Briefcase size={18} />,
    tone: "gold",
    name: "Commercial closures",
    image: "/img/services/commercial-closure.jpg",
    imageAlt: "Shuttered storefronts in a mall",
    signals: "SOS dissolutions · UCC liens · PACER bankruptcy dockets",
    board:
      "Closure alerts, lien history, liquidation windows and package pricing for multi-asset owners.",
  },
  {
    icon: <Recycle size={18} />,
    tone: "fuchsia",
    name: "Junk & scrap",
    image: "/img/services/junk-scrap.jpg",
    imageAlt: "Used household goods and appliances laid out for sale at a car boot market",
    signals: "Craigslist free · Marketplace · Nextdoor · Buy Nothing groups",
    board: "The daily sweep, the 1.5× scrap gate, yard cash and runner dispatch.",
  },
];

export function ClassDashboardsBand() {
  return (
    <section id="dashboards" className="pt-[6rem] pb-[3rem]">
      <Container>
        <div className="max-w-3xl">
          <h2 className="od-d2 mt-[1.5rem]">
            Each asset class gets <Mark>its own board</Mark>.
          </h2>
          <p className="od-lead mt-[1.5rem]">
            One lead table underneath — every lead tagged by class, signal, source, owner and
            stage — but a board tuned to how each class actually gets worked.
          </p>
        </div>

        <div className="mt-[3rem] grid gap-[1.5rem] md:grid-cols-2 xl:grid-cols-3">
          {CLASS_BOARDS.map((board) => (
            <div key={board.name} className={cn(CARD, "flex flex-col overflow-hidden p-0")}>
              {/* the class, in one picture: what we walk into and what we leave behind */}
              <img
                src={board.image}
                alt={board.imageAlt}
                width={1600}
                height={1000}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />

              <div className="flex flex-1 flex-col p-[1.5rem]">
                <span
                  aria-hidden
                  className={cn(
                    "flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-[0.75rem]",
                    TONES[board.tone],
                  )}
                >
                  {board.icon}
                </span>

                <h3 className="od-h4 mt-[1.25rem]">{board.name}</h3>

                <p className="mt-[1rem] text-[0.75rem] font-semibold tracking-[0.12em] text-[var(--od-muted)] uppercase">
                  Signals it sweeps
                </p>
                <p className="mt-[0.375rem] text-[0.9375rem] leading-relaxed text-[var(--od-body)]">
                  {board.signals}
                </p>

                <p className="mt-[1.25rem] text-[0.75rem] font-semibold tracking-[0.12em] text-[var(--od-muted)] uppercase">
                  On the board
                </p>
                <p className="mt-[0.375rem] text-[0.9375rem] leading-relaxed text-[var(--od-body)]">
                  {board.board}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------------- services */

/*
 * The reference's screenshot band, rebuilt for a client-facing page: instead of
 * pictures of the app, the work itself — one photograph per service the desk
 * runs, captioned with what is actually happening and what it is worth to the
 * owner. Every picture is credited on /credits.html.
 */

type Shot = { src: string; alt: string; caption: string; note: string };

const SHOTS: Shot[] = [
  {
    src: "/img/services/unit-contents.jpg",
    alt: "Stacked boxes and household contents packed for removal",
    caption: "Storage units",
    note: "Photographed, scored, bid to a ceiling — then cleared and resold.",
  },
  {
    src: "/img/services/tools.jpg",
    alt: "Hand tools laid out on a workbench",
    caption: "Tools & equipment",
    note: "Pulled before the scrap run and listed at sold-price comps.",
  },
  {
    src: "/img/services/estate-contents.jpg",
    alt: "A furnished room of household goods",
    caption: "Estates & contents",
    note: "Cleared free for the executor, heirs remitted 80–90% of net.",
  },
  {
    src: "/img/services/cleanout.jpg",
    alt: "Boxes and furniture carried out to a roll-off container",
    caption: "Cleanouts & haul-away",
    note: "Same-day crews, dump fees budgeted into the contents EV.",
  },
  {
    src: "/img/services/liquidation.jpg",
    alt: "Furniture loaded from a closing store into a van",
    caption: "Commercial liquidations",
    note: "Closure dockets worked into a bulk buy before the doors shut.",
  },
  {
    src: "/img/services/furniture-lot.jpg",
    alt: "A warehouse showroom of second-hand furniture",
    caption: "Resale lots",
    note: "Furniture, appliances and lots sold as liquidation agent.",
  },
  {
    src: "/img/services/keys.jpg",
    alt: "House keys held in front of a door lock",
    caption: "Wholesale & assignments",
    note: "Homes closed through mapped cash buyers — zero commissions.",
  },
  {
    src: "/img/services/moving.jpg",
    alt: "Stacked moving boxes ready for a pickup",
    caption: "Pickups & transfers",
    note: "Dispatch finds the runner nearest the job and pays them same day.",
  },
];

export function ServicesGalleryBand() {
  return (
    <section id="services" className="pt-[6rem] pb-[3rem]">
      <Container>
        <div className="max-w-3xl">
          <h2 className="od-d2 mt-[1.5rem]">
            Every service, in <Mark tone="coral">its own picture</Mark>.
          </h2>
          <p className="od-lead mt-[1.5rem]">
            Storage units, houses, estates, closures and junk — the same desk, the same proof,
            the same paper trail. Here is what each job looks like from the owner's side of the
            door.
          </p>
        </div>

        <div className="mt-[3rem] grid gap-[1.25rem] sm:grid-cols-2 xl:grid-cols-4">
          {SHOTS.map((shot) => (
            <figure
              key={shot.src}
              className="overflow-hidden rounded-[0.75rem] border border-[var(--od-border)] bg-[var(--od-surface)]"
            >
              <img
                src={shot.src}
                alt={shot.alt}
                width={1600}
                height={1200}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="p-[1.25rem]">
                <span className="block text-[1rem] leading-tight font-semibold text-[var(--od-ink)]">
                  {shot.caption}
                </span>
                <span className="mt-[0.5rem] block text-[0.875rem] leading-relaxed text-[var(--od-body)]">
                  {shot.note}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-[2rem] text-[0.875rem] text-[var(--od-muted)]">
          Photographs are illustrative and credited at{" "}
          <a href="/credits.html" className="text-[var(--od-violet)] no-underline hover:underline">
            /credits.html
          </a>
          .
        </p>
      </Container>
    </section>
  );
}

