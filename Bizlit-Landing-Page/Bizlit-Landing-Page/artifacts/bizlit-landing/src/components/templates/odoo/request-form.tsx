import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Archive,
  Building2,
  Check,
  CircleAlert,
  FileBox,
  Home,
  LockKeyhole,
  PackageCheck,
  Send,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Container, Eyebrow, Mark } from "./bits";

/*
 * The request form — the one thing on this page that has to work.
 *
 * The field set is the client-service desk's own intake form: what the job is,
 * where and what it is, and how to reach whoever sent it, with the same three
 * numbered sections, the same consent line and the same confirmation card. What
 * changed is the skin: everything here wears the landing page's own tokens, so
 * the form looks like the rest of the page instead of like a form dropped on
 * top of it.
 *
 * Where the request goes: `POST` to `VITE_SERVICE_REQUEST_ENDPOINT` as JSON, if
 * that variable is set — the response may carry `requestId`, `submittedAt` and
 * `message`, and they are used when present. With no endpoint configured the
 * request is kept in `localStorage` under `bizlit-service-requests` and the
 * confirmation says so plainly, rather than pretending something was sent.
 */

type ServiceClass = "storage" | "real_estate" | "estate" | "commercial" | "junk" | "package";

const SERVICE_OPTIONS: { value: ServiceClass; label: string; icon: typeof Archive }[] = [
  { value: "storage", label: "Storage unit", icon: Archive },
  { value: "real_estate", label: "House or property", icon: Home },
  { value: "estate", label: "Estate or probate", icon: FileBox },
  { value: "commercial", label: "Commercial closure", icon: Building2 },
  { value: "junk", label: "Junk, scrap & haul-away", icon: Trash2 },
  { value: "package", label: "Item or pick-up", icon: PackageCheck },
];

const ENDPOINT = String(import.meta.env.VITE_SERVICE_REQUEST_ENDPOINT ?? "").trim();
const QUEUE_KEY = "bizlit-service-requests";

type RequestPayload = {
  serviceClass: ServiceClass;
  jobLocation: string;
  description: string;
  preferredDate: string | null;
  fullName: string;
  email: string;
  phone: string | null;
  consentToContact: true;
  submittedAt: string;
  source: "landing";
};

type Accepted = {
  reference: string;
  submittedAt: string;
  message: string;
  savedLocally: boolean;
};

/** A reference the sender can quote back, with no backend needed to mint one. */
function newReference(): string {
  return `BIZ-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}

/** Keeps an un-sent request on the device rather than losing it to a reload. */
function remember(payload: RequestPayload): void {
  try {
    const stored = window.localStorage.getItem(QUEUE_KEY);
    const queue: unknown = stored ? JSON.parse(stored) : [];
    const list = Array.isArray(queue) ? queue : [];
    list.push(payload);
    window.localStorage.setItem(QUEUE_KEY, JSON.stringify(list.slice(-25)));
  } catch {
    /* a browser that blocks storage still gets the confirmation */
  }
}

async function describeFailure(response: Response): Promise<string> {
  try {
    const data: unknown = await response.json();
    if (data && typeof data === "object") {
      const record = data as Record<string, unknown>;
      for (const key of ["error", "message", "detail"]) {
        if (typeof record[key] === "string") return record[key];
      }
    }
  } catch {
    /* the body was not JSON — fall through to the status line */
  }
  return `We could not send this request just now (error ${response.status}). Please try again.`;
}

async function sendRequest(payload: RequestPayload): Promise<Accepted> {
  if (!ENDPOINT) {
    remember(payload);
    return {
      reference: newReference(),
      submittedAt: payload.submittedAt,
      message:
        "Your request is saved on this device. No intake endpoint is configured in this build, so nothing has left the browser — the desk will pick it up as soon as one is set.",
      savedLocally: true,
    };
  }

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(await describeFailure(response));

  const data: unknown = await response.json().catch(() => null);
  const record = (data && typeof data === "object" ? data : {}) as Record<string, unknown>;
  const text = (key: string): string | null =>
    typeof record[key] === "string" && (record[key] as string).trim() ? (record[key] as string) : null;

  return {
    reference: text("requestId") ?? text("reference") ?? newReference(),
    submittedAt: text("submittedAt") ?? payload.submittedAt,
    message:
      text("message") ??
      "Your request has reached the desk. We will come back with a route and the numbers on it.",
    savedLocally: false,
  };
}

/* The page's own field styling: 8px radius, the band's soft surface, the violet
 * edge on focus, and the small caps labels the rest of the landing page uses. */
const FIELD =
  "w-full rounded-[0.5rem] border border-[var(--od-border)] bg-[var(--od-surface-soft)] px-[0.875rem] py-[0.625rem] text-[0.9375rem] text-[var(--od-ink)] outline-none transition-[border-color,background-color] placeholder:text-[var(--od-muted)] focus:border-[var(--od-violet)] focus:bg-[var(--od-surface)]";
const LABEL =
  "mb-[0.375rem] flex items-baseline justify-between gap-[0.5rem] text-[0.8125rem] font-semibold text-[var(--od-ink)]";
const HINT = "text-[0.75rem] font-normal text-[var(--od-muted)]";
const SECTION = "border-t border-[var(--od-border)] pt-[1.75rem] first:border-t-0 first:pt-0";
const LEGEND = "mb-[1rem] flex items-center gap-[0.625rem] text-[0.9375rem] font-semibold text-[var(--od-ink)]";

/** What happens after the send button: four short promises, in order. */
const AFTER: { title: string; body: string }[] = [
  { title: "We read it", body: "Same or next working day, by a person, not a form receipt." },
  { title: "We qualify it", body: "The address is checked against its class before anyone travels." },
  { title: "You get a route", body: "In writing, with what is sellable priced and what it costs you — nothing." },
  { title: "You decide", body: "Nothing is signed and no date is set until you say so." },
];

export function RequestBand() {
  const [serviceClass, setServiceClass] = useState<ServiceClass | "">("");
  const [serviceError, setServiceError] = useState("");
  const [consented, setConsented] = useState(false);
  const [serverError, setServerError] = useState("");
  const [pending, setPending] = useState(false);
  const [accepted, setAccepted] = useState<Accepted | null>(null);
  const card = useRef<HTMLDivElement | null>(null);

  // The confirmation card is shorter than the form it replaces, so bring it
  // back into view instead of leaving the sender looking at empty space.
  useEffect(() => {
    if (accepted) card.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [accepted]);

  function startAnother() {
    setAccepted(null);
    setServerError("");
    setServiceError("");
    setServiceClass("");
    setConsented(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    if (!serviceClass) {
      setServiceError("Choose the closest kind of job to continue.");
      document.getElementById("service-type")?.focus();
      return;
    }

    const formData = new FormData(event.currentTarget);
    const phone = String(formData.get("phone") ?? "").trim();
    const preferredDate = String(formData.get("preferredDate") ?? "").trim();
    setServerError("");
    setPending(true);

    const payload: RequestPayload = {
      serviceClass,
      fullName: String(formData.get("fullName") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: phone || null,
      jobLocation: String(formData.get("jobLocation") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
      preferredDate: preferredDate || null,
      consentToContact: true,
      submittedAt: new Date().toISOString(),
      source: "landing",
    };

    try {
      setAccepted(await sendRequest(payload));
    } catch (error) {
      setServerError(
        error instanceof Error && error.message
          ? error.message
          : "We could not send your request right now. Please try again.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <section id="request" className="pt-[6rem] pb-[4rem]">
      <Container>
        <div className="grid items-start gap-[2.5rem] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-[3.5rem]">
          {/* the title, beside the form */}
          <div className="lg:sticky lg:top-[5.5rem]">
            <Eyebrow>Start here</Eyebrow>
            <h2 className="od-d2 mt-[1.5rem]">
              Tell us about <Mark>the space.</Mark>
            </h2>
            <p className="od-lead mt-[1.5rem] text-[var(--od-body)]">
              One short form: what kind of job it is, where it is, and how to reach you. Nothing is
              signed, nothing is paid, and a photograph of the room tells us more than a paragraph
              ever will.
            </p>

            <ol className="mt-[2.5rem] space-y-[1.25rem]">
              {AFTER.map((step, index) => (
                <li key={step.title} className="flex gap-[1rem]">
                  <span
                    aria-hidden
                    className="flex h-[2rem] w-[2rem] shrink-0 items-center justify-center rounded-full bg-[var(--od-tone-violet-bg)] text-[0.8125rem] font-semibold text-[var(--od-tone-violet-fg)]"
                  >
                    {index + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[1rem] font-semibold text-[var(--od-ink)]">
                      {step.title}
                    </span>
                    <span className="mt-[0.25rem] block text-[0.9375rem] leading-relaxed text-[var(--od-body)]">
                      {step.body}
                    </span>
                  </span>
                </li>
              ))}
            </ol>

            <p className="mt-[2rem] flex items-start gap-[0.5rem] border-t border-[var(--od-border)] pt-[1.5rem] text-[0.875rem] text-[var(--od-muted)]">
              <LockKeyhole size={14} aria-hidden className="mt-[0.125rem] shrink-0" />
              Your details are used to answer this request and nothing else.
            </p>
          </div>

          {/* the form */}
          <div
            ref={card}
            className="od-tile-shadow rounded-[1rem] border border-[var(--od-border)] bg-[var(--od-surface)] p-[1.5rem] md:p-[2.25rem]"
          >
            {accepted ? (
              <div role="status" aria-live="polite" className="text-center">
                <span className="mx-auto flex h-[3rem] w-[3rem] items-center justify-center rounded-full bg-[var(--od-tone-violet-bg)] text-[var(--od-violet)]">
                  <Check size={25} strokeWidth={2.3} aria-hidden />
                </span>
                <p className="mt-[1.25rem] text-[0.75rem] font-semibold tracking-[0.16em] text-[var(--od-violet)] uppercase">
                  Request received
                </p>
                <h3 className="od-h4 mt-[0.5rem] text-[1.75rem]">Thank you for reaching out.</h3>
                <p className="mx-auto mt-[0.75rem] max-w-md text-[0.9375rem] leading-relaxed text-[var(--od-body)]">
                  {accepted.message}
                </p>

                <div className="mx-auto mt-[1.75rem] max-w-sm rounded-[0.5rem] border border-dashed border-[var(--od-border)] bg-[var(--od-surface-soft)] px-[1rem] py-[0.875rem]">
                  <span className="block text-[0.75rem] tracking-[0.12em] text-[var(--od-muted)] uppercase">
                    Request reference
                  </span>
                  <strong className="mt-[0.125rem] block text-[1.125rem] text-[var(--od-ink)]">
                    {accepted.reference}
                  </strong>
                </div>

                {Number.isFinite(Date.parse(accepted.submittedAt)) && (
                  <p className="mt-[1rem] text-[0.875rem] text-[var(--od-muted)]">
                    Submitted{" "}
                    {new Intl.DateTimeFormat(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(accepted.submittedAt))}
                  </p>
                )}

                {accepted.savedLocally && (
                  <p className="mx-auto mt-[0.75rem] max-w-sm text-[0.8125rem] leading-relaxed text-[#b45309]">
                    Nothing left this device: the form has no intake endpoint configured yet.
                  </p>
                )}

                <button
                  type="button"
                  onClick={startAnother}
                  className="od-btn od-btn-light mt-[1.75rem]"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="flex items-start justify-between gap-[1rem]">
                  <div>
                    <p className="text-[0.75rem] font-semibold tracking-[0.16em] text-[var(--od-violet)] uppercase">
                      Request service · 01
                    </p>
                    <h3 className="od-h4 mt-[0.5rem]">Send it to the desk</h3>
                    <p className="mt-[0.5rem] text-[0.9375rem] text-[var(--od-muted)]">
                      Fields marked required need an answer before the form will send.
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="flex h-[2.5rem] w-[2.5rem] shrink-0 items-center justify-center rounded-full bg-[var(--od-tone-violet-bg)] text-[var(--od-violet)]"
                  >
                    <Send size={17} />
                  </span>
                </div>

                <fieldset disabled={pending} className="mt-[2rem] space-y-[1.75rem]">
                  <section className={SECTION}>
                    <p className={LEGEND}>
                      <span aria-hidden className="text-[var(--od-violet)]">01</span>
                      What do you need cleared?
                    </p>
                    <div
                      id="service-type"
                      role="radiogroup"
                      aria-label="Kind of job"
                      tabIndex={-1}
                      aria-describedby={serviceError ? "service-type-error" : undefined}
                      className="grid gap-[0.625rem] sm:grid-cols-2"
                    >
                      {SERVICE_OPTIONS.map(({ value, label, icon: Icon }) => (
                        <button
                          key={value}
                          type="button"
                          role="radio"
                          aria-checked={serviceClass === value}
                          onClick={() => {
                            setServiceClass(value);
                            setServiceError("");
                            setServerError("");
                          }}
                          className={cn(
                            "flex cursor-pointer items-center gap-[0.5rem] rounded-[0.5rem] border px-[0.75rem] py-[0.625rem] text-start text-[0.9375rem] font-medium transition-colors",
                            serviceClass === value
                              ? "border-[var(--od-violet)] bg-[var(--od-tone-violet-bg)] text-[var(--od-tone-violet-fg)]"
                              : "border-[var(--od-border)] bg-[var(--od-surface-soft)] text-[var(--od-body)] hover:border-[var(--od-violet)]",
                          )}
                        >
                          <Icon size={16} strokeWidth={1.7} aria-hidden className="shrink-0" />
                          <span>{label}</span>
                        </button>
                      ))}
                    </div>
                    {serviceError && (
                      <span
                        id="service-type-error"
                        role="alert"
                        className="mt-[0.5rem] block text-[0.8125rem] font-medium text-[#f43f5e]"
                      >
                        {serviceError}
                      </span>
                    )}
                  </section>

                  <section className={SECTION}>
                    <p className={LEGEND}>
                      <span aria-hidden className="text-[var(--od-violet)]">02</span>
                      Where, and what is in there?
                    </p>
                    <div className="grid gap-[1.25rem]">
                      <div>
                        <label htmlFor="jobLocation" className={LABEL}>
                          Where the job is <small className={HINT}>Required</small>
                        </label>
                        <input
                          id="jobLocation"
                          name="jobLocation"
                          required
                          minLength={2}
                          maxLength={240}
                          autoComplete="street-address"
                          placeholder="Street, city, or the general area"
                          className={FIELD}
                        />
                      </div>
                      <div>
                        <label htmlFor="description" className={LABEL}>
                          What is in there <small className={HINT}>Required</small>
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          required
                          minLength={10}
                          maxLength={1600}
                          rows={5}
                          placeholder="A houseful, a unit past its notice, one room, a garage full of tools — and anything that has to be kept."
                          className={cn(FIELD, "resize-y")}
                        />
                      </div>
                      <div className="max-w-[16rem]">
                        <label htmlFor="preferredDate" className={LABEL}>
                          Preferred date <small className={HINT}>Optional</small>
                        </label>
                        <input
                          id="preferredDate"
                          name="preferredDate"
                          type="date"
                          className={FIELD}
                        />
                      </div>
                    </div>
                  </section>

                  <section className={SECTION}>
                    <p className={LEGEND}>
                      <span aria-hidden className="text-[var(--od-violet)]">03</span>
                      How can we reach you?
                    </p>
                    <div className="grid gap-[1.25rem] sm:grid-cols-2">
                      <div>
                        <label htmlFor="fullName" className={LABEL}>
                          Full name <small className={HINT}>Required</small>
                        </label>
                        <input
                          id="fullName"
                          name="fullName"
                          required
                          maxLength={160}
                          autoComplete="name"
                          placeholder="Your name"
                          className={FIELD}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className={LABEL}>
                          Email address <small className={HINT}>Required</small>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          maxLength={254}
                          autoComplete="email"
                          placeholder="you@example.com"
                          className={FIELD}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="phone" className={LABEL}>
                          Phone number <small className={HINT}>Optional</small>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          maxLength={80}
                          autoComplete="tel"
                          placeholder="A number we can reach you on"
                          className={FIELD}
                        />
                      </div>
                    </div>
                  </section>

                  <section className={SECTION}>
                    <label
                      htmlFor="consentToContact"
                      className="flex cursor-pointer items-start gap-[0.75rem] text-[0.9375rem] leading-relaxed text-[var(--od-body)]"
                    >
                      <input
                        id="consentToContact"
                        name="consentToContact"
                        type="checkbox"
                        required
                        checked={consented}
                        onChange={(event) => setConsented(event.target.checked)}
                        className="mt-[0.25rem] h-[1rem] w-[1rem] shrink-0 accent-[var(--od-violet-solid)]"
                      />
                      <span>
                        I am happy for the desk to contact me about this request.{" "}
                        <strong className="font-semibold text-[var(--od-ink)]">Required</strong>
                      </span>
                    </label>
                  </section>
                </fieldset>

                {serverError && (
                  <div
                    role="alert"
                    className="mt-[1.5rem] flex items-start gap-[0.5rem] rounded-[0.5rem] bg-[rgba(244,63,94,0.10)] px-[0.875rem] py-[0.75rem] text-[0.875rem] text-[#e11d48]"
                  >
                    <CircleAlert size={15} aria-hidden className="mt-[0.125rem] shrink-0" />
                    <span>{serverError}</span>
                  </div>
                )}

                <div className="mt-[1.75rem] flex flex-col-reverse items-stretch gap-[1rem] border-t border-[var(--od-border)] pt-[1.5rem] sm:flex-row sm:items-center sm:justify-between">
                  <span className="flex items-center gap-[0.375rem] text-[0.8125rem] text-[var(--od-muted)]">
                    <LockKeyhole size={13} aria-hidden />
                    Used to answer this request only
                  </span>
                  <button
                    type="submit"
                    disabled={pending}
                    className="od-btn od-btn-primary disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {pending ? "Sending request…" : "Send the request"}
                    {!pending && (
                      <Send size={14} aria-hidden className="ms-[0.5rem] inline-block align-[-2px]" />
                    )}
                  </button>
                </div>

                {pending && (
                  <p role="status" className="mt-[0.75rem] text-[0.8125rem] text-[var(--od-muted)]">
                    Your request is being sent. Please keep this page open.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
