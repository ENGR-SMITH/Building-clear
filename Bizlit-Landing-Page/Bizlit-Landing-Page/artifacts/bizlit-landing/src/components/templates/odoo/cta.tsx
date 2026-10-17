import { Container, Doodle, odBtnLg } from "./bits";

/*
 * The close of the page: `pt-10 pb-7` (12rem/6rem), one display-1 line whose
 * first word wears the sketched fireworks, the tail in the page's orchid, the
 * large violet button, then the small violet arrow pointing back up at it and
 * the two reassurances underneath.
 *
 * The button used to open an account on a product that has no sign-up screen.
 * It now does the only thing this page can actually do: takes the visitor to
 * the request form.
 */

export default function Cta() {
  return (
    <section className="overflow-hidden pt-[12rem] pb-[6rem] text-center">
      <Container>
        <h3 className="od-d1 mb-[3rem]">
          <span className="od-fireworks">One request,</span>
          <br />
          and it is <span className="text-[var(--od-accent)]">off your hands</span>
        </h3>

        <a href="#request" className={odBtnLg + " mb-[1rem]"}>
          Tell us about the space
        </a>

        <Doodle src="/img/odoo/green_arrow_sm_01.svg" width={15} className="mx-auto mb-[0.5rem]" />

        <small className="block text-[0.875rem] leading-normal">
          Nothing paid upfront
          <br />
          No obligation to accept the route we quote
        </small>
      </Container>
    </section>
  );
}
