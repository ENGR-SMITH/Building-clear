import { Container } from "./bits";

/*
 * Odoo's footer: a deep aubergine band (`--od-footer`) with the wordmark
 * centred at the top, four link groups, a short description with its social
 * icons, and a darker copyright strip (`--od-footer-deep`) underneath.
 */

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "The service",
    links: [
      { label: "How it works", href: "#how" },
      { label: "Services in pictures", href: "#services" },
      { label: "What it costs", href: "#cost" },
      { label: "Who we help", href: "#clients" },
      { label: "Who turns up", href: "#network" },
      { label: "Class dashboards", href: "#dashboards" },
    ],
  },
  {
    title: "What we watch for",
    links: [
      { label: "Storage liens & auctions", href: "#sources" },
      { label: "Pre-foreclosures & tax sales", href: "#sources" },
      { label: "Probate & obituaries", href: "#sources" },
      { label: "Closures & UCC liens", href: "#sources" },
      { label: "Free sections & junk removals", href: "#sources" },
      { label: "Sold-price comps", href: "#sources" },
    ],
  },
  {
    title: "Get started",
    links: [
      { label: "Send a request", href: "#request" },
      { label: "Common questions", href: "#faq" },
      { label: "Pricing", href: "#pricing" },
      { label: "Photo credits", href: "/credits.html" },
    ],
  },
];

const SOCIALS = [
  { label: "X", icon: "/icons/x.svg" },
  { label: "LinkedIn", icon: "/icons/linkedin.svg" },
  { label: "Facebook", icon: "/icons/facebook.svg" },
  { label: "Instagram", icon: "/icons/instagram.svg" },
  { label: "TikTok", icon: "/icons/tiktok.svg" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--od-footer)] text-[#cec7e4]">
      <Container className="py-14">
        <div className="flex justify-center">
          <a href="/" className="flex items-center gap-2" aria-label="BIZLIT home">
            <img src="/logo.png" alt="" className="h-8 w-8 rounded-lg object-cover" />
            <span
              className="text-2xl font-bold text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              bizlit
            </span>
          </a>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[repeat(3,minmax(0,1fr))_1.4fr]">
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="mb-4 text-lg font-semibold text-white">{column.title}</p>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[15px] text-[#cec7e4] transition-colors hover:text-white hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <span className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-sm text-white">
              English
              <span aria-hidden>▾</span>
            </span>

            <p className="mt-5 text-[15px] leading-relaxed">
              BIZLIT clears the buildings other people cannot face: storage units past their
              notice, houses nobody can walk through, estates, and closed businesses. One
              request, one written route, and the space handed back empty — contents sold as
              your agent and the proceeds remitted to you.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed">
              Nothing is paid upfront. Every job is structured as consignment, assignment or
              pay-after-sale, and the crews are paid the day the work is done.
            </p>

            <ul className="mt-5 flex items-center gap-4">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href="#"
                    aria-label={social.label}
                    className="block opacity-70 transition-opacity hover:opacity-100"
                  >
                    <img src={social.icon} alt="" className="h-[18px] w-[18px] invert" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <div className="bg-[var(--od-footer-deep)] py-4">
        <Container>
          <p className="text-center text-sm text-[#a49ec2]">
            © {new Date().getFullYear()} BIZLIT. All rights reserved. · Built with React, Vite and
            Supabase
          </p>
        </Container>
      </div>
    </footer>
  );
}
