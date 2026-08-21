import type { Elements, IContentItem } from "@kontent-ai/delivery-sdk";

export const homepageContentTypes = {
  clientAdvisory: "client_advisory",
  companyAnnouncement: "company_annoucement",
  exposureNotice: "exposure_notice",
  marketUpdate: "market_update",
  regulatoryNotice: "regulatory_notice",
  riskAlert: "risk_alert",
} as const;

export const homepageTypeCodenames = Object.values(homepageContentTypes);

export const homepageElements = {
  title: "title",
  body: "body",
  summary: "summary",
  department: "department",
  advisoryType: "advisory_type",
  exposureType: "exposure_type",
  severity: "severity",
  marketingSummary: "marketing_fields__summary",
  ctaLabel: "marketing_fields__cta_label",
  ctaUrl: "marketing_fields__cta_url",
  effectiveDate: "compliance_fields__effective_date",
  audience: "compliance_fields__audience",
  documentClass: "compliance_fields__document_class",
} as const;

type ComplianceFields = {
  readonly [homepageElements.effectiveDate]: Elements.DateTimeElement;
  readonly [homepageElements.audience]: Elements.TaxonomyElement;
  readonly [homepageElements.documentClass]: Elements.TaxonomyElement;
};

type TitleAndBody = {
  readonly title: Elements.TextElement;
  readonly body: Elements.RichTextElement;
};

export type RegulatoryNotice = IContentItem<
  TitleAndBody & ComplianceFields,
  typeof homepageContentTypes.regulatoryNotice
>;

export type RiskAlert = IContentItem<
  TitleAndBody & ComplianceFields,
  typeof homepageContentTypes.riskAlert
>;

export type MarketUpdate = IContentItem<
  TitleAndBody &
    ComplianceFields & {
      readonly [homepageElements.marketingSummary]: Elements.TextElement;
      readonly [homepageElements.ctaLabel]: Elements.TextElement;
      readonly [homepageElements.ctaUrl]: Elements.TextElement;
    },
  typeof homepageContentTypes.marketUpdate
>;

export type CompanyAnnouncement = IContentItem<
  TitleAndBody &
    ComplianceFields & {
      readonly [homepageElements.summary]: Elements.TextElement;
      readonly [homepageElements.department]: Elements.TextElement;
    },
  typeof homepageContentTypes.companyAnnouncement
>;

export type ClientAdvisoryItem = IContentItem<
  TitleAndBody &
    ComplianceFields & {
      readonly [homepageElements.summary]: Elements.TextElement;
      readonly [homepageElements.advisoryType]: Elements.MultipleChoiceElement;
    },
  typeof homepageContentTypes.clientAdvisory
>;

export type ExposureNotice = IContentItem<
  TitleAndBody &
    ComplianceFields & {
      readonly [homepageElements.exposureType]: Elements.MultipleChoiceElement;
      readonly [homepageElements.severity]: Elements.MultipleChoiceElement;
    },
  typeof homepageContentTypes.exposureNotice
>;

export type HomepageItem =
  | ClientAdvisoryItem
  | CompanyAnnouncement
  | ExposureNotice
  | MarketUpdate
  | RegulatoryNotice
  | RiskAlert;

export const isRiskAlert = (item: HomepageItem): item is RiskAlert =>
  item.system.type === homepageContentTypes.riskAlert;

export const isMarketUpdate = (item: HomepageItem): item is MarketUpdate =>
  item.system.type === homepageContentTypes.marketUpdate;

export const isCompanyAnnouncement = (item: HomepageItem): item is CompanyAnnouncement =>
  item.system.type === homepageContentTypes.companyAnnouncement;

export const isClientAdvisoryItem = (item: HomepageItem): item is ClientAdvisoryItem =>
  item.system.type === homepageContentTypes.clientAdvisory;

export const isExposureNotice = (item: HomepageItem): item is ExposureNotice =>
  item.system.type === homepageContentTypes.exposureNotice;
