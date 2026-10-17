import { Container, Mark, odBtn, odBtnLight } from "./bits";
import { RoomCompare } from "./clearance";

/*
 * The top of the page, in two columns: the promise on the left, the proof of it
 * on the right. The left column carries the display-2 line with the marker
 * stroke behind its last words, one calm paragraph of context and the two
 * buttons; the right column carries the room the whole service is about — the
 * same living room furnished and then cleared, which the visitor can wipe
 * across. Nothing else is asked for here: no handwritten note, no doodle, no
 * second stroke. The offer they used to carry lives further down the page.
 */

/** The three promises that decide whether an owner picks up. */
const ASSURANCES = ["Nothing paid upfront", "One written agreement", "Heirs remitted 80–90%"];

export default function Hero() {
  return (
    <section id="top" className="pt-[calc(3rem+80px)] pb-[3rem]">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="grid items-center gap-[3rem] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-[3.5rem]">
          {/* the promise */}
          <div className="text-center lg:text-start">
            <h1 className="od-d1 mt-[1.25rem] mb-[1.25rem] leading-[1.05]">
              From cluttered to <Mark>clear, with care.</Mark>
            </h1>

            <p className="od-lead mt-[1.25rem] max-w-[48rem] text-[1.05rem] leading-relaxed text-[var(--od-body)]">
              Send us a room, a unit or a whole house. We sort what is worth selling, clear the
              rest, and hand the space back empty — and you are paid out of what it held, not the
              other way round.
            </p>

            <div className="mt-[2rem] flex flex-col items-center gap-[0.75rem] sm:flex-row sm:justify-center lg:justify-start">
              <a href="#request" className={odBtn + " !text-base !px-6 !py-3 !no-underline"}>
                Start a request
              </a>
              <a href="#services" className={odBtnLight + " !text-base !px-6 !py-3 !no-underline"}>
                See the work
              </a>
            </div>

            <ul className="mt-[1.5rem] flex flex-wrap justify-center gap-x-[1.5rem] gap-y-[0.5rem] lg:justify-start">
              {ASSURANCES.map((line) => (
                <li
                  key={line}
                  className="flex items-center gap-[0.5rem] text-[0.9375rem] font-medium text-[var(--od-ink)]"
                >
                  <span aria-hidden className="flex h-[7px] w-[7px] shrink-0 items-center justify-center rounded-full bg-[var(--od-orchid)]">
                    <span className="h-[3px] w-[3px] rounded-full bg-white scale-0" />
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </div>

          {/* the proof */}
          <figure className="m-0">
            <RoomCompare />
          </figure>
        </div>
      </div>
    </section>
  );
}
