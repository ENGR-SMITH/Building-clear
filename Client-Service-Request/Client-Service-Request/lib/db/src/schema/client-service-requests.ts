import {
  boolean,
  date,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const clientServiceRequestsTable = pgTable(
  "client_service_requests",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    serviceClass: text("service_class").notNull(),
    fullName: text("full_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    jobLocation: text("job_location").notNull(),
    description: text("description").notNull(),
    preferredDate: date("preferred_date", { mode: "string" }),
    consentToContact: boolean("consent_to_contact").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("client_service_requests_created_idx").on(table.createdAt),
  ],
);
