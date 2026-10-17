import Header from "@/components/templates/odoo/header";
import Hero from "@/components/templates/odoo/hero";
import { WorkflowChart } from "@/components/templates/odoo/workflow-chart";
import SourcesBand from "@/components/templates/odoo/apps-grid";
import { DoneRightBand, FaqBand, FeaturesBand, type FaqItem } from "@/components/templates/odoo/story";
import { ServicesGalleryBand } from "@/components/templates/odoo/sections";
import { ClientsBand, CostBand, CrewBand, HowBand } from "@/components/templates/odoo/client";
import { RequestBand } from "@/components/templates/odoo/request-form";
import Cta from "@/components/templates/odoo/cta";
import Footer from "@/components/templates/odoo/footer";

/*
 * The landing page, in the order a visitor needs it.
 *
 * The top is the offer and the proof of it: the promise beside the same living
 * room furnished and cleared, then the four ways one request can go, then the
 * signals the desk watches and the work it does in pictures.
 *
 * "Distress intelligence done right." is the pivot. Above it the page explains
 * the machine; below it every band is written for the person holding the
 * problem — how a request runs, what it costs them (nothing), who the desk
 * works for, who turns up to do the carrying, and the questions they ask before
 * they send anything — and then the form itself, which is the only thing on the
 * page that has to work.
 *
 * Three bands the reference carries were dropped on purpose, because they
 * stacked decoration on top of decoration: the collage of overlapping mock
 * panels, the bare doodled arrow, and the 35-tile icon mosaic. Two more went
 * with the rewrite: the native-AI band and the eight-stage pipeline, both of
 * which described how the desk scores and routes work rather than what happens
 * to a room nobody can walk through.
 *
 * The skin lives in `.theme-odoo` (src/index.css) so none of it reaches the
 * signed-in workspace, and every section it composes is in
 * src/components/templates/odoo/.
 */

const FAQ: FaqItem[] = [
  {
    q: "What does a clearout cost me?",
    a: "Nothing upfront. A property clearout is free to the estate: we clear it, sell what is saleable as your agent and remit 80–90% of the net resale. If there is nothing in the building worth selling, you hear that on the walk-through instead of an invented fee.",
  },
  {
    q: "So how do you make money?",
    a: "One of three ways, and which one it is gets written down before work starts: a share of the resale on a consigned clearout, an assignment fee paid by the cash buyer on a property deal, or the resale margin on a unit's contents.",
  },
  {
    q: "How soon can someone come out?",
    a: "Requests are read the day they arrive and the walk-through sets the date. Jobs carrying a deadline — a closing date, a lien-sale date, a foreclosure date — are scheduled first, because a deadline is usually why the request exists at all.",
  },
  {
    q: "What happens to the things I want to keep?",
    a: "Anything the family wants is boxed and laid out before anything is moved. It's later settled, after a written route is agreed.",
  },
  {
    q: "Is there work you will not take on?",
    a: "Yes. Biohazards and hazardous waste, unresolved title defects, firearms outside a licensed transfer, and any work needing a licence we do not hold. Those are referred to a vetted partner rather than attempted, and you are told which one it is.",
  },
  {
    q: "Will you buy the property as well?",
    a: "Where the numbers work, yes — through assignment to a mapped local cash buyer, taking the property as it stands, contents and all. The owner pays no commission and pays for no repairs first.",
  },
];

export function LandingPage() {
  return (
    <div className="theme-odoo w-full overflow-x-clip bg-white text-[var(--od-body)] px-2 sm:px-4 lg:px-8">
      <Header />
      <main>
        {/* the offer, beside the same room furnished and cleared */}
        <Hero />

        <WorkflowChart />

        <SourcesBand />
        <FeaturesBand />
        <ServicesGalleryBand />

        {/* the pivot: above this the machine, below it the client */}
        <DoneRightBand />

        <HowBand />
        <CostBand />
        <ClientsBand />
        <CrewBand />
        <FaqBand items={FAQ} />

        {/* the one thing that has to work */}
        <RequestBand />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
