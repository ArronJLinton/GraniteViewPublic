export const publicCollectionCodenames = [
  "marketing",
  "client_advisory",
  "trading___markets",
  "risk_management",
] as const;

export type ValidCollectionCodename = (typeof publicCollectionCodenames)[number];

export type PerCollection<T> = Readonly<Record<ValidCollectionCodename, T>>;

export const isValidCollectionCodename = (
  codename: string | undefined,
): codename is ValidCollectionCodename =>
  (publicCollectionCodenames as readonly string[]).includes(codename ?? "");
