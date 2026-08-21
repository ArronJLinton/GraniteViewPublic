import type { PerCollection } from "../types/perCollection.ts";

export const perCollectionSEOTitle = {
  marketing: "Marketing",
  client_advisory: "Client Advisory",
  trading___markets: "Trading & Markets",
  risk_management: "Risk Management",
} as const satisfies PerCollection<string>;

export const perCollectionSiteName: PerCollection<string> = {
  marketing: "| Marketing",
  client_advisory: "| Client Advisory",
  trading___markets: "| Trading & Markets",
  risk_management: "| Risk Management",
};
