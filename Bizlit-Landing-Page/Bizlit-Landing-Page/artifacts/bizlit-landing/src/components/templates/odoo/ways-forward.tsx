import { ArrowRight } from "lucide-react";
import { Container, Mark, odBtn } from "./bits";

/*
 * What happens after the form: the same request, four ways out. The pictures
 * are rooms as they arrive — cluttered, boxed-in, hard to walk through — one
 * per route the desk can take them, capped with the route's name and what it
 * is worth to the owner.
 *
 * This is the band that used to be odoo.com's "Level up your deal flow" — a
 * collage of overlapping mock panels. The panels are gone; what is left is the
 * row of rooms, which is the only part of it that carried meaning. The
 * photographs are credited on /credits.html.
 */

type Route = { src: string; alt: string; name: string; body: string };

const ROUTES: Route[] = [
  {
    src: "/img/services/hoard-living-room.jpg",
    alt: "A living room packed with boxes, bags and stored belongings",
    name: "Cleared and consigned",
    body: "Sorted on site, valued against sold-price comps, and the net remitted to whoever owns the contents.",
  },
  {
    src: "/img/services/hoard-bedroom.jpg",
    alt: "A bedroom filled with stacked belongings and furnishings",
    name: "Bought as it stands",
    body: "Where the building is the play, a mapped cash buyer takes it full — no repairs, no listing, no commissions.",
  },
  {
    src: "/img/services/hoard-dining-room.jpg",
    alt: "A dining room crowded with furniture and stored goods",
    name: "Boxed, and put in store",
    body: "What the family keeps is packed, labelled and held before anything leaves the room.",
  },
  {
    src: "/img/services/hoard-sitting-room.jpg",
    alt: "A sitting room cluttered with accumulated household items",
    name: "Sorted and scrapped",
    body: "Metal, appliances and e-waste go to the yard the same day, and that cash pays the crew on the spot.",
  },
];

export default function WaysForwardBand() {
  return (
    <section id="ways" className="pt-[6rem] pb-[3rem]">
      <Container>
        <div className="max-w-3xl">
          <h2 className="od-d2 mt-[1.5rem]">
            One request. <Mark tone="coral">Many ways forward.</Mark>
          </h2>
          <p className="od-lead mt-[1.5rem]">
            A flat nobody can walk through, a unit past its notice, a house to close out — the
            request goes in the same way for all of them. The desk then picks the route that
            leaves the owner furthest ahead and puts the numbers in writing first. Nothing moves
            until you approve it.
          </p>
        </div>

        <div className="mt-[3rem] grid gap-[1.25rem] sm:grid-cols-2 xl:grid-cols-4">
          {ROUTES.map((route) => (
            <figure
              key={route.name}
              className="m-0 overflow-hidden rounded-[0.75rem] border border-[var(--od-border)] bg-[var(--od-surface)]"
            >
              <img
                src={route.src}
                alt={route.alt}
                width={1200}
                height={900}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="p-[1.25rem]">
                <p className="text-[1.0625rem] leading-tight font-semibold text-[var(--od-ink)]">
                  {route.name}
                </p>
                <p className="mt-[0.5rem] text-[0.9375rem] leading-relaxed text-[var(--od-body)]">
                  {route.body}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-[2.5rem]">
          <a href="#request" className={odBtn}>
            Start a request
            <ArrowRight size={15} aria-hidden className="ms-[0.5rem] inline-block align-[-2px]" />
          </a>
        </div>
      </Container>
    </section>
  );
}
