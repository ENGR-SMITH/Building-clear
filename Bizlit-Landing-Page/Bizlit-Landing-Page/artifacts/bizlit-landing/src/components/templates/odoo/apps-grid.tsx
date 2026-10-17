import { CalendarDays } from "lucide-react";
import { Container } from "./bits";

/*
 * The signal wall: one grey band, a weekly sweep pill and a single row of
 * tiles, each naming a source the desk sweeps.
 *
 * This band used to carry odoo.com's "Imagine without odoo" switch as well —
 * a checkbox that wrote a sheet of hand-drawn arrows and fourteen scrawled
 * product names over the wall. It read as clutter at the top of the page, so
 * the switch and its overlay are gone; the wall and the pill carry the point
 * on their own.
 *
 * Every tile is a door into the request form rather than an account: the wall
 * answers "how did you find me?", and the answer to that is a conversation.
 */

/** One tile: the reference's app icon over one of the signal sources we sweep. */
type Source = { slug: string; label: string };

export const SOURCES: Source[] = [
  { slug: "accountant", label: "Storage units" },
  { slug: "knowledge", label: "Storage auctions" },
  { slug: "sign", label: "Self-storage liens" },
  { slug: "crm", label: "Real estate" },
  { slug: "web_studio", label: "Pre-foreclosures" },
  { slug: "sale_subscription", label: "Tax delinquency" },
  { slug: "ai_app", label: "Sheriff sales" },
  { slug: "point_of_sale", label: "Probate estates" },
  { slug: "mail", label: "Obituaries" },
  { slug: "documents", label: "Estate sales" },
  { slug: "project", label: "Executors & heirs" },
  { slug: "hr_timesheet", label: "Business closures" },
  { slug: "industry_fsm", label: "Dissolutions" },
  { slug: "planning", label: "UCC liens" },
  { slug: "helpdesk", label: "Bankruptcies" },
  { slug: "website_sale", label: "Free sections" },
  { slug: "website", label: "Junk removals" },
  { slug: "mass_mailing", label: "Curb alerts" },
  { slug: "purchase", label: "Scrap metal" },
  { slug: "stock", label: "E-waste" },
  { slug: "mrp", label: "Tools & equipment" },
  { slug: "sale", label: "Furniture lots" },
  { slug: "hr", label: "Electronics" },
  { slug: "spreadsheet_dashboard", label: "Vehicles & titles" },
];

/*
 * The white announcement pill — `x_wd_notification_box` on odoo.com: a mark on
 * the left, the bold line, a note a margin away, and the link stretched over
 * the whole card. Ours is the weekly sweep digest: how many signals the
 * cadence pulled this week, and the way into the board that scores them.
 */
function DigestPill() {
  return (
    <div className="od-notif">
      <CalendarDays
        aria-hidden
        size={16}
        className="me-[0.25rem] shrink-0 text-[var(--od-violet)] md:ms-[0.5rem] md:me-[1rem]"
      />
      <span className="align-middle text-start font-bold">
        This week&rsquo;s sweep &middot; 47 new signals
      </span>
      <div className="hidden text-nowrap text-[var(--od-body)] md:ms-[1rem] md:block">
        Liens, probate, tax sales and free sections
      </div>
      <a
        href="#request"
        className="od-stretched text-nowrap text-[var(--od-violet)] no-underline md:mx-[1rem] lg:ms-[3rem]"
      >
        Tell us what you have ⟶
      </a>
    </div>
  );
}

/**
 * The wall of tiles — `x_wd_apps_row` / `x_wd_app_entry`: an `<img
 * class="img-thumbnail rounded-1 mb-3">` over a truncated caption. Every tile
 * is a door into the request form: the wall is the pitch.
 */
function AppWall() {
  return (
    <div className="od-apps-row">
      {SOURCES.map((source) => (
        <a key={source.label} href="#request" className="od-app-entry">
          <figure>
            <img
              width={80}
              className="od-app-icon"
              src={`/icons/apps/${source.slug}.svg`}
              alt={`${source.label} icon`}
              loading="lazy"
            />
            <figcaption className="od-app-caption">{source.label}</figcaption>
          </figure>
        </a>
      ))}
    </div>
  );
}

export default function SourcesBand() {
  return (
    <section
      id="sources"
      className="relative overflow-x-clip bg-[var(--od-band)] px-0 pt-[1.5rem] pb-[3rem] md:pt-[4rem] lg:pb-[4rem]"
    >
      {/* `o_illustration_doodle_03`: the white wave across the top. */}
      <div className="od-shape od-shape-03" aria-hidden />

      <Container className="relative z-[1]">
        <div className="mx-[-1rem] flex justify-center">
          <div className="w-full px-[1rem] text-center min-[1200px]:w-3/4 min-[1400px]:w-2/3">
            <DigestPill />
            <AppWall />
          </div>
        </div>

        <div className="pt-[40px] text-center">
          <a href="#services" className="text-[var(--od-violet)] no-underline">
            See every service
            <img
              src="/img/odoo/secondary_arrow_sm_03.svg"
              width={40}
              alt=""
              loading="lazy"
              className="ms-[0.5rem] me-[1rem] inline-block align-top"
            />
          </a>
        </div>
      </Container>
    </section>
  );
}
