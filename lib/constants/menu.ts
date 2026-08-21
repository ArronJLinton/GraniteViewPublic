import type { PerCollection, ValidCollectionCodename } from "../types/perCollection.ts";

export const perCollectionRootItems = {
  marketing: "marketing",
  client_advisory: "client_advisory",
  trading___markets: "trading___markets",
  risk_management: "risk_management",
} as const satisfies PerCollection<string>;

export const getRootCodename = (siteCodename: ValidCollectionCodename) =>
  perCollectionRootItems[siteCodename];
