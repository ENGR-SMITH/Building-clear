import { useState } from "react";
import { MoveHorizontal } from "lucide-react";

/*
 * One room, two states. Both frames are the same drawn living room — the left
 * one furnished and full, the right one cleared and swept — generated from a
 * single geometry by `scripts/make-room-pair.py`, so the wipe lines up by
 * construction rather than by eye.
 *
 * The toggle is a button with a marker stroke behind its label, sitting over
 * the frame. A click (or the arrow keys) wipes the room from furnished to
 * cleared, one percent at a time.
 */

export function RoomCompare() {
  const [reveal, setReveal] = useState(52);

  const toggle = () => setReveal((v) => (v >= 100 ? 52 : 100));

  return (
    <div className="od-tile-shadow rounded-[1rem] bg-[var(--od-surface)] p-[0.5rem]">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[0.75rem] bg-[var(--od-band)] select-none">
        {/* the room as the owner hands it over */}
        <img
          src="/img/services/room-furnished.svg"
          alt="A furnished living room — sofa, table, bookcase and boxes still in place"
          className="absolute inset-0 h-full w-full object-cover"
          width={1600}
          height={900}
          fetchPriority="high"
        />

        {/* the same room, cleared, revealed from the right */}
        <img
          src="/img/services/room-cleared.svg"
          alt="The same living room after the clearout: bare boards, swept and handed back"
          className="absolute inset-0 h-full w-full object-cover"
          width={1600}
          height={900}
          loading="lazy"
          style={{ clipPath: `inset(0 0 0 ${reveal}%)` }}
        />

        {/* marker stroke behind the toggle label, exactly as Odoo paints it */}
        <span
          aria-hidden
          className="od-mark od-mark-coral absolute bottom-[1.5rem] start-0 text-[0.875rem]"
          style={{ display: "inline-block", width: "14rem", paddingBottom: "0.35em" }}
        >
          Furnished to cleared
        </span>

        <button
          type="button"
          onClick={toggle}
          aria-label="Toggle the room: furnished to cleared"
          className="absolute inset-0 h-full w-full cursor-pointer"
        >
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="relative rounded-full border border-[var(--od-violet-solid)] bg-[var(--od-violet-solid)]/15 px-3 py-1 text-[0.75rem] font-semibold uppercase text-[var(--od-violet-solid)] transition-transform duration-300 ease-out shadow-lg">
              <MoveHorizontal size={16} aria-hidden />
              <span className="ml-1">wipe</span>
            </span>
          </span>
        </button>

        <span className="pointer-events-none absolute end-[1.25rem] top-[1.25rem] rounded-full bg-[var(--od-violet-solid)] px-[1rem] py-[0.5rem] text-[0.9375rem] font-semibold tracking-wide text-white uppercase shadow-[0_0.5rem_1rem_rgba(109,40,217,0.4)]">
          Cleared
        </span>

        <span className="pointer-events-none absolute start-[1.25rem] top-[1.25rem] rounded-full bg-[rgba(23,16,43,0.85)] px-[1rem] py-[0.5rem] text-[0.9375rem] font-semibold tracking-wide text-white uppercase shadow-[0_0.5rem_1rem_rgba(23,16,43,0.3)]">
          Furnished
        </span>
      </div>
    </div>
  );
}
