import { perCollectionSEOTitle } from "../constants/labels.ts";
import {
  type HomepageItem,
  homepageElements,
  isClientAdvisoryItem,
  isCompanyAnnouncement,
  isExposureNotice,
  isMarketUpdate,
  isRiskAlert,
} from "../types/homepageContent.ts";
import { publicCollectionCodenames, type ValidCollectionCodename } from "../types/perCollection.ts";

export type HomepageCollectionGroup = Readonly<{
  codename: ValidCollectionCodename;
  heading: string;
  items: ReadonlyArray<HomepageItem>;
  sectionId: string;
}>;

export const collectionSectionIds = {
  marketing: "marketing",
  client_advisory: "client-advisory",
  trading___markets: "trading-markets",
  risk_management: "risk-management",
} as const satisfies Record<ValidCollectionCodename, string>;

const getEffectiveDate = (item: HomepageItem) =>
  item.elements[homepageElements.effectiveDate].value ?? "";

export const groupHomepageItemsByCollection = (
  items: ReadonlyArray<HomepageItem>,
): ReadonlyArray<HomepageCollectionGroup> =>
  publicCollectionCodenames.flatMap((codename) => {
    const groupedItems = items
      .filter((item) => item.system.collection === codename)
      .toSorted((left, right) => getEffectiveDate(right).localeCompare(getEffectiveDate(left)));

    if (groupedItems.length === 0) {
      return [];
    }

    return [
      {
        codename,
        heading: perCollectionSEOTitle[codename],
        items: groupedItems,
        sectionId: collectionSectionIds[codename],
      },
    ];
  });

export const getItemSummary = (item: HomepageItem) => {
  if (isMarketUpdate(item)) {
    return item.elements[homepageElements.marketingSummary].value;
  }

  if (isCompanyAnnouncement(item) || isClientAdvisoryItem(item)) {
    return item.elements[homepageElements.summary].value;
  }

  return "";
};

export const getItemCallToAction = (item: HomepageItem) => {
  if (isMarketUpdate(item)) {
    const label = item.elements[homepageElements.ctaLabel].value;
    const href = item.elements[homepageElements.ctaUrl].value;

    return {
      href: href || "#",
      label: label || "Read Full Analysis",
    };
  }

  return {
    href: "#",
    label: "Read Full Analysis",
  };
};

export const getItemBadgeLabel = (item: HomepageItem) => {
  if (isRiskAlert(item)) {
    return "High Priority Alert";
  }

  if (isExposureNotice(item)) {
    const severity = item.elements[homepageElements.severity].value[0]?.name;
    return severity ? `${severity} Exposure Notice` : "Exposure Notice";
  }

  if (isMarketUpdate(item)) {
    return "Market Update";
  }

  if (isCompanyAnnouncement(item)) {
    return "Company Announcement";
  }

  if (isClientAdvisoryItem(item)) {
    return "Client Advisory";
  }

  return "Regulatory Notice";
};

export const getItemExtraTags = (item: HomepageItem) => {
  if (isExposureNotice(item)) {
    return [
      ...item.elements[homepageElements.exposureType].value,
      ...item.elements[homepageElements.severity].value,
    ].map((option) => option.name);
  }

  if (isClientAdvisoryItem(item)) {
    return item.elements[homepageElements.advisoryType].value.map((option) => option.name);
  }

  if (isCompanyAnnouncement(item)) {
    const department = item.elements[homepageElements.department].value;
    return department ? [department] : [];
  }

  return [];
};

export const isPriorityHomepageItem = (item: HomepageItem) => {
  if (isRiskAlert(item)) {
    return true;
  }

  if (isExposureNotice(item)) {
    return item.elements[homepageElements.severity].value.some(
      (option) => option.codename === "high",
    );
  }

  return false;
};
